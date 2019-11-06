
const { symbolNormalize } = require('./fsw-symbol-normalize');

it('should normalize a symbol', done => {
  symbolNormalize('S20500',
    (err, result) => {
      expect(err).toBeFalsy();
      expect(result).toBe('S20500495x495')
      done();
    }
  )
})

it('should normalize a spatial', done => {
  symbolNormalize('S20500500x500',
    (err, result) => {
      expect(err).toBeFalsy();
      expect(result).toBe('S20500495x495')
      done();
    }
  )
})

it('should normalize a spatial with styling', done => {
  symbolNormalize('S20500500x500-C',
    (err, result) => {
      expect(err).toBeFalsy();
      expect(result).toBe('S20500495x495-C')
      done();
    }
  )
})
