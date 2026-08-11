import crypto from "crypto";

export function signSession() {
  const exp = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const payload = String(exp);
  const sig = crypto.createHmac("sha256", process.env.APP_SESSION_SECRET).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function validSession(token) {
  if (!token || !process.env.APP_SESSION_SECRET) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const expected = crypto.createHmac("sha256", process.env.APP_SESSION_SECRET).update(exp).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}
