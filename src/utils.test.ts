import * as U from "./utils";

test("secretFromUrl", () => {
  const url = "otpauth://totp/Digis?secret=JTYH5G4IZPVMSQK3CVF5DH6IT3HDV3NI&algorithm=SHA256&digits=6&period=1";
  const secret = "JTYH5G4IZPVMSQK3CVF5DH6IT3HDV3NI";

  expect(U.secretFromUrl(url)).toEqual(secret);
});
  
