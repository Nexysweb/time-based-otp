import test, { describe } from "node:test";
import * as assert from "assert";

import {
  generateSecret,
  decodeSecret,
  generateTOTP,
  verifyTOTP,
} from "./index.js";

describe("Generated test suite", () => {
  // Test generateSecret
  test("generateSecret", (t) => {
    const secret = generateSecret();
    assert.strictEqual(typeof secret, "string", "Secret should be a string");
    assert.strictEqual(
      secret.length,
      32,
      "Default secret length should be 32 characters after Base32 encoding"
    );
  });

  // Test decodeSecret
  test("decodeSecret", (t) => {
    const secret = "JBSWY3DPEHPK3PXP";
    const decoded = decodeSecret(secret);
    assert.strictEqual(
      Buffer.isBuffer(Buffer.from(decoded)),
      true,
      "Decoded secret should be a byte array"
    );
  });

  // Test
  test("generateTOTP", (t) => {
    const secret = generateSecret();
    const totp = generateTOTP(secret);
    assert.strictEqual(typeof totp, "number", "TOTP should be a number");
    assert.strictEqual(
      totp >= 0 && totp < 1000000,
      true,
      "TOTP should be a 6-digit number"
    );
  });

  // Test
  test("verifyTOTP", (t) => {
    const secret = generateSecret();
    const totp = generateTOTP(secret);
    const isVerified = verifyTOTP(totp, secret);
    assert.strictEqual(
      isVerified,
      true,
      "TOTP verification should succeed with the correct token"
    );
  });
});
