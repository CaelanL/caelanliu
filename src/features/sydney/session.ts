import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const ACCESS_COOKIE = "sydney_signal_session";
const SOLVED_COOKIE = "sydney_market_solved";
const ATTEMPT_COOKIE = "sydney_signal_attempt_notice";
const SESSION_SECONDS = 6 * 60 * 60;
const ATTEMPT_COOLDOWN_SECONDS = 90;

function getSessionSecret(): string | null {
  return process.env.SYDNEY_SESSION_SECRET?.trim() || null;
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function equalSignatures(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

async function createSignedSession(
  cookieName: string,
  purpose: string,
  invite: string,
): Promise<void> {
  const secret = getSessionSecret();

  if (!secret) {
    throw new Error("Sydney session secret is not configured.");
  }

  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  const token = `${expiresAt}.${sign(`${purpose}.${invite}.${expiresAt}`, secret)}`;
  const cookieStore = await cookies();

  cookieStore.set(cookieName, token, {
    httpOnly: true,
    maxAge: SESSION_SECONDS,
    path: `/hello/${invite}`,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

async function hasValidSignedSession(
  cookieName: string,
  purpose: string,
  invite: string,
): Promise<boolean> {
  const secret = getSessionSecret();
  const token = (await cookies()).get(cookieName)?.value;

  if (!secret || !token) {
    return false;
  }

  const separator = token.indexOf(".");
  if (separator < 1) {
    return false;
  }

  const expiresAtString = token.slice(0, separator);
  const suppliedSignature = token.slice(separator + 1);
  const expiresAt = Number(expiresAtString);

  if (!Number.isSafeInteger(expiresAt) || expiresAt <= Date.now() / 1000) {
    return false;
  }

  const expectedSignature = sign(`${purpose}.${invite}.${expiresAt}`, secret);
  return equalSignatures(suppliedSignature, expectedSignature);
}

export async function createAccessSession(invite: string): Promise<void> {
  await createSignedSession(ACCESS_COOKIE, "access", invite);
}

export async function hasValidAccessSession(invite: string): Promise<boolean> {
  return hasValidSignedSession(ACCESS_COOKIE, "access", invite);
}

export async function createSolvedPuzzleSession(invite: string): Promise<void> {
  await createSignedSession(SOLVED_COOKIE, "market", invite);
}

export async function hasSolvedPuzzleSession(invite: string): Promise<boolean> {
  return hasValidSignedSession(SOLVED_COOKIE, "market", invite);
}

export async function shouldSendDeniedAttemptNotice(): Promise<boolean> {
  const cookieStore = await cookies();

  if (cookieStore.has(ATTEMPT_COOKIE)) {
    return false;
  }

  cookieStore.set(ATTEMPT_COOKIE, "1", {
    httpOnly: true,
    maxAge: ATTEMPT_COOLDOWN_SECONDS,
    path: "/hello",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return true;
}
