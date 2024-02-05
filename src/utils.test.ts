import test from "node:test";
import * as assert from "assert";
import * as U from "./utils";

test("secretFromUrl", () => {
  const url =
    "otpauth://totp/Digis?secret=JTYH5G4IZPVMSQK3CVF5DH6IT3HDV3NI&algorithm=SHA256&digits=6&period=1";
  const secret = "JTYH5G4IZPVMSQK3CVF5DH6IT3HDV3NI";

  assert.strictEqual(U.secretFromUrl(url), secret);
});
