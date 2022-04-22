
const { signNormalize } = require('./swu-sign-normalize');

it('should normalize a sign', async () => {
  const norm = await signNormalize('𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭');
  expect(norm).toBe('𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭')
})

it('should normalize a sign with a styling string', async () => {
  const norm = await signNormalize('𝠀񀀒񀀚񋚥񋛩𝠃𝤆𝤆񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭-C');
  expect(norm).toBe('𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭-C')
})
