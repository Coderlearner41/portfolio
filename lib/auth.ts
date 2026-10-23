import { timingSafeEqual } from "node:crypto"

/** Write endpoints require `Authorization: Bearer <API_KEY>`. */
export function isAuthorized(request: Request) {
  const key = process.env.API_KEY
  const header = request.headers.get("authorization") ?? ""
  if (!key || !header.startsWith("Bearer ")) return false
  const given = Buffer.from(header.slice(7))
  const expected = Buffer.from(key)
  return given.length === expected.length && timingSafeEqual(given, expected)
}
