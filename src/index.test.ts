import test, { describe } from "node:test";
import * as assert from "assert";

import * as I from "./index";
describe("Time-based OTP", () => {
  const l = 20;
  const secret = I.generateSecret(l);
  test("secret generation", () => {
    assert.strictEqual(secret.length, 32);
  });

  const token = I.generateTOTP(secret);

  test("verify token", () => {
    assert.strictEqual(I.verifyTOTP(token, secret), true);
  });
});

test("to QR string", () => {
  const s =
    "otpauth://totp/myname?secret=asecret&algorithm=SHA256&digits=6&period=15";
  assert.strictEqual(I.toQRString("myname", "asecret"), s);
});

//this is a test to see if the integration actually wors with the google auth
// note that the key "seems to be" valid for two cycles
/*
test("manual testing", () => {
  //const secret = I.generateSecret();

  const secret = "WENBV6U26A7HXMVBRXCIBU22JTLGUFRM"; // "YFA3UTGAGUPJEFQYNNR5VKBFU5GQ6H6O";

  console.log(I.toQRString("test", secret));
  const t = 764975;

  assert.strictEqual(I.verifyTOTP(t, secret), true);
});*/
