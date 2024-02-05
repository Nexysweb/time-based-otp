import * as Crypto from "crypto";
import Base32 from "hi-base32";
import { Algorithm } from "./type.js";

export const generateSecret = (length: number = 20): string => {
  const randomBuffer = Crypto.randomBytes(length);
  return Base32.encode(randomBuffer).replace(/=/g, "");
};

export const decodeSecret = (secret: string) => Base32.decode.asBytes(secret);

export const generateHOTP = (
  secret: string,
  counter: number,
  algorithm: Algorithm
): number => {
  const decodedSecret = decodeSecret(secret);
  const buffer = Buffer.alloc(8);

  for (let i = 0; i < 8; i++) {
    buffer[7 - i] = counter & 0xff;
    counter = counter >> 8;
  }

  //
  const hmac = Crypto.createHmac(algorithm, Buffer.from(decodedSecret));
  hmac.update(buffer);
  const hmacResult: Buffer = hmac.digest();

  const code = dynamicTruncationFn(hmacResult);

  return code % 10 ** 6;
};

const dynamicTruncationFn = (hmacValue: Buffer): number => {
  const offset = hmacValue[hmacValue.length - 1] & 0xf;

  return (
    ((hmacValue[offset] & 0x7f) << 24) |
    ((hmacValue[offset + 1] & 0xff) << 16) |
    ((hmacValue[offset + 2] & 0xff) << 8) |
    (hmacValue[offset + 3] & 0xff)
  );
};

export const generateTOTP = (
  secret: string,
  algorithm: Algorithm,
  window = 0
): number => {
  const counter = Math.floor(Date.now() / 30000);
  return generateHOTP(secret, counter + window, algorithm);
};

export const verifyTOTP = (
  token: number,
  secret: string,
  algorithm: Algorithm,
  window: number = 1
): boolean => {
  if (Math.abs(+window) > 10) {
    throw Error("window size is too large");
  }

  for (let errorWindow = -window; errorWindow <= +window; errorWindow++) {
    const totp: number = generateTOTP(secret, algorithm, errorWindow);

    if (token === totp) {
      return true;
    }
  }

  return false;
};
