import * as I from './index';
describe('Time-based OTP', () => {
  const l = 20
  const secret  = I.generateSecret(l);
  test('secret generation', () => {
    expect(secret.length).toEqual(l)
  })

  const token = I.generateTOTP(secret);

  test('verify token', () => {
    expect(I.verifyTOTP(token, secret)).toEqual(true)
  })
});