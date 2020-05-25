import * as I from './index';
describe('Time-based OTP', () => {
  const l = 20
  const secret  = I.generateSecret(l);
  test('secret generation', () => {
    expect(secret.length).toEqual(32)
  })

  const token = I.generateTOTP(secret);

  test('verify token', () => {
    expect(I.verifyTOTP(token, secret)).toEqual(true)
  })
});

/*
this is a test to see if the integration actually wors with the google auth
test('manual testing', () => {
  //const secret  = I.generateSecret();
  //console.log(secret)
  const secret = 'YFA3UTGAGUPJEFQYNNR5VKBFU5GQ6H6O';
  const t = 412587//92300

  expect(I.verifyTOTP(t, secret)).toEqual(true)
})*/