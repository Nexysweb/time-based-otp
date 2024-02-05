import test, { describe } from "node:test";
import * as assert from "assert";

import * as I from "./index.js";
import { Algorithm } from "./type.js";
import { toQRString } from "./utils.js";

const l = 20;

const algorithms: Algorithm[] = [
  "SHA1",
  "SHA224",
  "SHA256",
  "SHA384",
  "SHA512",
];

algorithms.forEach((algorithm) => {
  describe(`Testing TOTP for ${algorithm}`, () => {
    const secret = I.generateSecret(l);

    test("secret generation", () => {
      assert.strictEqual(secret.length, 32);
    });

    const token = I.generateTOTP(secret, algorithm);

    test("verify token", () => {
      assert.strictEqual(I.verifyTOTP(token, secret, algorithm), true);
    });
  });
});

//this is a test to see if the integration actually wors with the google auth
// note that the key "seems to be" valid for two cycles
/*
test("manual testing", () => {
  //const secret = I.generateSecret();

  const algorithm = "SHA256";

  const secret = "4W7STBMRFAJ2JYCDM66ZBMT47YPY7DCM";
  console.log(secret);
  console.log(toQRString("test", secret, algorithm));
  const t = 383566;

  assert.strictEqual(I.verifyTOTP(t, secret, algorithm), true);
});*/
