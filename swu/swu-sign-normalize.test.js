
const { signNormalize } = require('./swu-sign-normalize');

it('should normalize a sign', done => {
  signNormalize('𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭',
    (err, result) => {
      expect(err).toBeFalsy();
      expect(result).toBe('𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭')
      done();
    }
  )
})

it('should normalize a sign with a styling string', done => {
  signNormalize('𝠀񀀒񀀚񋚥񋛩𝠃𝤆𝤆񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭-C',
    (err, result) => {
      expect(err).toBeFalsy();
      expect(result).toBe('𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭-C')
      done();
    }
  )
})
