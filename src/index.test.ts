import test, { describe } from "node:test";
import * as assert from "assert";

import * as I from "./index.js";
import { Algorithm } from "./type.js";

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

  const secret = "WENBV6U26A7HXMVBRXCIBU22JTLGUFRM"; // "YFA3UTGAGUPJEFQYNNR5VKBFU5GQ6H6O";

  console.log(I.toQRString("test", secret));
  const t = 764975;

  assert.strictEqual(I.verifyTOTP(t, secret), true);
});*/
