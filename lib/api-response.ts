import { NextResponse } from "next/server";

type ErrorBody = {
  ok: false;
  error: string;
  code?: string;
};

export function apiError(error: string, status = 400, code?: string) {
  const body: ErrorBody = { ok: false, error };
  if (code) body.code = code;
  return NextResponse.json(body, { status });
}

export function apiOk<T extends Record<string, unknown>>(data?: T, init?: ResponseInit) {
  return NextResponse.json({ ok: true, ...(data ?? {}) }, init);
}
