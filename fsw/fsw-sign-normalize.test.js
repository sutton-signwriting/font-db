
const { signNormalize } = require('./fsw-sign-normalize');

it('should normalize a sign', async () => {
  const norm = await signNormalize('AS10011S10019S2e704S2e748M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475');
  expect(norm).toBe('AS10011S10019S2e704S2e748M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475')
})

it('should normalize a sign with a styling string', async () => {
  const norm = await signNormalize('AS10011S10019S2e704S2e748M500x500S2e748483x510S10011501x466S2e704510x500S10019476x475-C');
  expect(norm).toBe('AS10011S10019S2e704S2e748M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475-C')
})
