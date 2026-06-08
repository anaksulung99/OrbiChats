import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);
const KEY_LENGTH = 64;

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scryptAsync(password, salt, KEY_LENGTH)) as Buffer;

  return `scrypt:${salt}:${derivedKey.toString("hex")}`;
}

export async function verifyPassword(password: string, passwordHash: string) {
  const [algorithm, salt, hash] = passwordHash.split(":");

  if (algorithm !== "scrypt" || !salt || !hash) {
    return false;
  }

  const derivedKey = (await scryptAsync(password, salt, KEY_LENGTH)) as Buffer;
  const storedKey = Buffer.from(hash, "hex");

  if (storedKey.length !== derivedKey.length) {
    return false;
  }

  return timingSafeEqual(storedKey, derivedKey);
}
