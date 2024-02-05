import { Algorithm } from "./type.js";

export const secretFromUrl = (url: string): string => {
  const m = url.match(/secret=([^&]+)/);

  if (!m || m.length < 2) {
    throw Error("Couldn't read the secret");
  }

  return m[1];
};

// https://freeotp.github.io/qrcode.html
export const toQRString = (
  name: string,
  secret: string,
  algorithm: Algorithm = "SHA256",
  digits: number = 6,
  period: number = 15
) => {
  const t = { secret, algorithm, digits, period };

  const s: string = Object.entries(t)
    .map(([k, v]) => {
      return `${k}=${encodeURIComponent(v)}`;
    })
    .join("&");

  return "otpauth://totp/" + name + "?" + s;
};
