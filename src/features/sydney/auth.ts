import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

export type AccessCredentials = {
  firstName: string;
  lastName: string;
  birthday: string;
};

function normalizeName(value: string): string {
  return value.trim().toLocaleLowerCase("en-US").replace(/\s+/g, " ");
}

function normalizeBirthday(value: string): string | null {
  if (!/^[\d\s,./-]+$/.test(value)) {
    return null;
  }

  return value.replace(/\D/g, "");
}

function safeEqual(left: string, right: string, secret: string): boolean {
  const leftDigest = createHmac("sha256", secret).update(left).digest();
  const rightDigest = createHmac("sha256", secret).update(right).digest();

  return timingSafeEqual(leftDigest, rightDigest);
}

function getComparisonSecret(): string | null {
  return process.env.SYDNEY_SESSION_SECRET?.trim() || null;
}

export function isExpectedInvite(invite: string): boolean {
  const expectedInvite = process.env.SYDNEY_INVITE_SLUG?.trim();
  const secret = getComparisonSecret();

  if (!expectedInvite || !secret) {
    return false;
  }

  return safeEqual(invite, expectedInvite, secret);
}

export function validateAccessCredentials(
  credentials: AccessCredentials,
): boolean {
  const expectedFirstName = process.env.SYDNEY_FIRST_NAME;
  const expectedLastName = process.env.SYDNEY_LAST_NAME;
  const expectedBirthdayShort = process.env.SYDNEY_BIRTHDATE_SHORT;
  const expectedBirthdayLong = process.env.SYDNEY_BIRTHDATE_LONG;
  const secret = getComparisonSecret();
  const birthday = normalizeBirthday(credentials.birthday);

  if (
    !expectedFirstName ||
    !expectedLastName ||
    !expectedBirthdayShort ||
    !expectedBirthdayLong ||
    !secret ||
    !birthday
  ) {
    return false;
  }

  const suppliedIdentity = [
    normalizeName(credentials.firstName),
    normalizeName(credentials.lastName),
    birthday,
  ].join("\u0000");

  const expectedBirthday =
    birthday.length === expectedBirthdayShort.replace(/\D/g, "").length
      ? expectedBirthdayShort
      : expectedBirthdayLong;

  const expectedIdentity = [
    normalizeName(expectedFirstName),
    normalizeName(expectedLastName),
    expectedBirthday.replace(/\D/g, ""),
  ].join("\u0000");

  const birthdayHasExpectedLength =
    birthday.length === expectedBirthdayShort.replace(/\D/g, "").length ||
    birthday.length === expectedBirthdayLong.replace(/\D/g, "").length;

  return (
    birthdayHasExpectedLength &&
    safeEqual(suppliedIdentity, expectedIdentity, secret)
  );
}

export function getGoogleMeetUrl(): string | null {
  const value = process.env.GOOGLE_MEET_URL?.trim();

  if (!value) {
    return null;
  }

  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "meet.google.com"
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}
