
const { symbolNormalize } = require('./swu-symbol-normalize');

it('should normalize a symbol', done => {
  symbolNormalize('񆇡',
    (err, result) => {
      expect(err).toBeFalsy();
      expect(result).toBe('񆇡𝤁𝤁')
      done();
    }
  )
})

it('should normalize a spatial', done => {
  symbolNormalize('񆇡𝤆𝤆',
    (err, result) => {
      expect(err).toBeFalsy();
      expect(result).toBe('񆇡𝤁𝤁')
      done();
    }
  )
})

it('should normalize a spatial with styling', done => {
  symbolNormalize('񆇡𝤆𝤆-C',
    (err, result) => {
      expect(err).toBeFalsy();
      expect(result).toBe('񆇡𝤁𝤁-C')
      done();
    }
  )
})
