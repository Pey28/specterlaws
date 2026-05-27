type Registro = { count: number; resetAt: number };

const store = new Map<string, Registro>();

// Limpiar entradas viejas cada 5 minutos
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of store) {
    if (now > val.resetAt) store.delete(key);
  }
}, 5 * 60 * 1000);

export function checkRateLimit(
  ip: string,
  ruta: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetIn: number } {
  const key = `${ip}:${ruta}`;
  const now = Date.now();
  const registro = store.get(key);

  if (!registro || now > registro.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, resetIn: windowMs };
  }

  if (registro.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetIn: registro.resetAt - now,
    };
  }

  registro.count++;
  return {
    allowed: true,
    remaining: maxRequests - registro.count,
    resetIn: registro.resetAt - now,
  };
}

export function getClientIP(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}
