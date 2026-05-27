import Database from "better-sqlite3";
import path from "path";
import type { PlanId } from "./planes";

let _db: ReturnType<typeof Database> | null = null;

function getDb() {
  if (!_db) {
    _db = new Database(path.join(process.cwd(), "data", "lexcr.db"));
    _db.pragma("journal_mode = WAL");

    _db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        nombre TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        provincia TEXT NOT NULL,
        plan TEXT NOT NULL DEFAULT 'gratis',
        created_at TEXT DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS consultas (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        pregunta TEXT NOT NULL,
        respuesta TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (user_id) REFERENCES users(id)
      );

      CREATE TABLE IF NOT EXISTS suscripciones (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        plan TEXT NOT NULL,
        estado TEXT NOT NULL DEFAULT 'pendiente',
        fecha_inicio TEXT,
        fecha_vencimiento TEXT,
        stripe_subscription_id TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (user_id) REFERENCES users(id)
      );

      CREATE TABLE IF NOT EXISTS pagos (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        plan TEXT NOT NULL,
        monto INTEGER NOT NULL,
        metodo TEXT NOT NULL,
        estado TEXT NOT NULL DEFAULT 'pendiente',
        referencia_sinpe TEXT,
        comprobante_sinpe TEXT,
        stripe_session_id TEXT,
        created_at TEXT DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS creditos (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL UNIQUE,
        cantidad INTEGER NOT NULL DEFAULT 0,
        updated_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (user_id) REFERENCES users(id)
      );

      CREATE TABLE IF NOT EXISTS referencias_abogado (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        nombre TEXT NOT NULL,
        email TEXT NOT NULL,
        telefono TEXT,
        descripcion TEXT NOT NULL,
        estado TEXT DEFAULT 'pendiente',
        created_at TEXT DEFAULT (datetime('now'))
      );
    `);

    // Safe migration: add plan column if it doesn't exist in users
    const cols = _db.prepare("PRAGMA table_info(users)").all() as { name: string }[];
    if (!cols.find((c) => c.name === "plan")) {
      _db.prepare("ALTER TABLE users ADD COLUMN plan TEXT NOT NULL DEFAULT 'gratis'").run();
    }
  }
  return _db;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DbUser {
  id: string;
  nombre: string;
  email: string;
  password: string;
  provincia: string;
  plan: PlanId;
  created_at: string;
}

export interface DbConsulta {
  id: string;
  user_id: string;
  pregunta: string;
  respuesta: string;
  created_at: string;
}

export interface DbPago {
  id: string;
  user_id: string | null;
  plan: string;
  monto: number;
  metodo: string;
  estado: string;
  referencia_sinpe: string | null;
  comprobante_sinpe: string | null;
  stripe_session_id: string | null;
  created_at: string;
}

export interface DbPagoConUsuario extends DbPago {
  nombre: string | null;
  email: string | null;
}

// ─── Users ────────────────────────────────────────────────────────────────────

export function getUserByEmail(email: string): DbUser | undefined {
  return getDb().prepare("SELECT * FROM users WHERE email = ?").get(email) as DbUser | undefined;
}

export function getUserById(id: string): DbUser | undefined {
  return getDb().prepare("SELECT * FROM users WHERE id = ?").get(id) as DbUser | undefined;
}

export function createUser(data: {
  nombre: string;
  email: string;
  password: string;
  provincia: string;
}): string {
  const id = crypto.randomUUID();
  getDb()
    .prepare(
      "INSERT INTO users (id, nombre, email, password, provincia) VALUES (?, ?, ?, ?, ?)"
    )
    .run(id, data.nombre, data.email, data.password, data.provincia);
  return id;
}

// ─── Plan ─────────────────────────────────────────────────────────────────────

export function getUserPlan(userId: string): PlanId {
  const sub = getDb()
    .prepare(
      `SELECT plan FROM suscripciones
       WHERE user_id = ? AND estado = 'activa'
         AND (fecha_vencimiento IS NULL OR fecha_vencimiento > datetime('now'))
       ORDER BY created_at DESC LIMIT 1`
    )
    .get(userId) as { plan: PlanId } | undefined;
  if (sub) return sub.plan;
  const user = getUserById(userId);
  return user?.plan ?? "gratis";
}

export function activarSuscripcion(userId: string, plan: PlanId): void {
  const db = getDb();
  db.prepare(
    `UPDATE suscripciones SET estado = 'cancelada' WHERE user_id = ? AND estado = 'activa'`
  ).run(userId);
  const id = crypto.randomUUID();
  const fechaInicio = new Date().toISOString();
  const fechaVencimiento = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  db.prepare(
    `INSERT INTO suscripciones (id, user_id, plan, estado, fecha_inicio, fecha_vencimiento)
     VALUES (?, ?, ?, 'activa', ?, ?)`
  ).run(id, userId, plan, fechaInicio, fechaVencimiento);
  db.prepare("UPDATE users SET plan = ? WHERE id = ?").run(plan, userId);
}

// ─── Consultas ────────────────────────────────────────────────────────────────

export function saveConsulta(userId: string, pregunta: string, respuesta: string): void {
  const id = crypto.randomUUID();
  getDb()
    .prepare("INSERT INTO consultas (id, user_id, pregunta, respuesta) VALUES (?, ?, ?, ?)")
    .run(id, userId, pregunta, respuesta);
}

export function getConsultasByUser(userId: string): DbConsulta[] {
  return getDb()
    .prepare(
      "SELECT * FROM consultas WHERE user_id = ? ORDER BY created_at DESC LIMIT 50"
    )
    .all(userId) as DbConsulta[];
}

export function contarConsultasMes(userId: string): number {
  const result = getDb()
    .prepare(
      `SELECT COUNT(*) as count FROM consultas
       WHERE user_id = ? AND strftime('%Y-%m', created_at) = strftime('%Y-%m', 'now')`
    )
    .get(userId) as { count: number };
  return result.count;
}

// ─── Créditos (plan individual) ───────────────────────────────────────────────

export function getCreditos(userId: string): number {
  const result = getDb()
    .prepare("SELECT cantidad FROM creditos WHERE user_id = ?")
    .get(userId) as { cantidad: number } | undefined;
  return result?.cantidad ?? 0;
}

export function addCreditos(userId: string, cantidad: number): void {
  getDb()
    .prepare(
      `INSERT INTO creditos (id, user_id, cantidad) VALUES (?, ?, ?)
       ON CONFLICT(user_id) DO UPDATE SET cantidad = cantidad + ?, updated_at = datetime('now')`
    )
    .run(crypto.randomUUID(), userId, cantidad, cantidad);
}

export function deductirCredito(userId: string): boolean {
  const result = getDb()
    .prepare(
      `UPDATE creditos SET cantidad = cantidad - 1, updated_at = datetime('now')
       WHERE user_id = ? AND cantidad > 0`
    )
    .run(userId);
  return result.changes > 0;
}

// ─── Pagos ────────────────────────────────────────────────────────────────────

export function crearPagoSinpe(
  userId: string,
  plan: PlanId,
  monto: number
): { id: string; referencia: string } {
  const id = crypto.randomUUID();
  const referencia = `LEXCR-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  getDb()
    .prepare(
      `INSERT INTO pagos (id, user_id, plan, monto, metodo, estado, referencia_sinpe)
       VALUES (?, ?, ?, ?, 'sinpe', 'pendiente', ?)`
    )
    .run(id, userId, plan, monto, referencia);
  return { id, referencia };
}

export function registrarComprobanteSinpe(pagoId: string, comprobante: string): boolean {
  const result = getDb()
    .prepare(
      `UPDATE pagos SET comprobante_sinpe = ?
       WHERE id = ? AND metodo = 'sinpe' AND estado = 'pendiente'`
    )
    .run(comprobante, pagoId);
  return result.changes > 0;
}

export function confirmarPagoSinpe(pagoId: string): boolean {
  const pago = getDb()
    .prepare(
      "SELECT * FROM pagos WHERE id = ? AND metodo = 'sinpe' AND estado = 'pendiente'"
    )
    .get(pagoId) as DbPago | undefined;
  if (!pago) return false;
  getDb().prepare("UPDATE pagos SET estado = 'completado' WHERE id = ?").run(pagoId);
  if (pago.user_id) activarSuscripcion(pago.user_id, pago.plan as PlanId);
  return true;
}

export function crearPagoStripe(
  userId: string,
  plan: PlanId,
  monto: number,
  stripeSessionId: string
): string {
  const id = crypto.randomUUID();
  getDb()
    .prepare(
      `INSERT INTO pagos (id, user_id, plan, monto, metodo, estado, stripe_session_id)
       VALUES (?, ?, ?, ?, 'tarjeta', 'pendiente', ?)`
    )
    .run(id, userId, plan, monto, stripeSessionId);
  return id;
}

export function confirmarPagoStripe(stripeSessionId: string): void {
  const pago = getDb()
    .prepare(
      "SELECT * FROM pagos WHERE stripe_session_id = ? AND estado = 'pendiente'"
    )
    .get(stripeSessionId) as DbPago | undefined;
  if (!pago) return;
  getDb()
    .prepare("UPDATE pagos SET estado = 'completado' WHERE stripe_session_id = ?")
    .run(stripeSessionId);
  if (pago.user_id) {
    if (pago.plan === "individual") {
      addCreditos(pago.user_id, 1);
    } else {
      activarSuscripcion(pago.user_id, pago.plan as PlanId);
    }
  }
}

export function getPagoSinpe(pagoId: string): DbPago | undefined {
  return getDb()
    .prepare("SELECT * FROM pagos WHERE id = ? AND metodo = 'sinpe'")
    .get(pagoId) as DbPago | undefined;
}

export function getPagosSinpePendientes(): DbPagoConUsuario[] {
  return getDb()
    .prepare(
      `SELECT p.*, u.nombre, u.email FROM pagos p
       LEFT JOIN users u ON p.user_id = u.id
       WHERE p.metodo = 'sinpe' AND p.estado = 'pendiente'
       ORDER BY p.created_at DESC`
    )
    .all() as DbPagoConUsuario[];
}

// ─── Abogados ─────────────────────────────────────────────────────────────────

export function guardarReferenciaAbogado(data: {
  userId?: string;
  nombre: string;
  email: string;
  telefono?: string;
  descripcion: string;
}): string {
  const id = crypto.randomUUID();
  getDb()
    .prepare(
      `INSERT INTO referencias_abogado (id, user_id, nombre, email, telefono, descripcion)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
    .run(id, data.userId ?? null, data.nombre, data.email, data.telefono ?? null, data.descripcion);
  return id;
}
