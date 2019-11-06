
const { symbolSvg } = require('./fsw-symbol-svg');

it('should have S10000', done => {
  symbolSvg('S10000',
    (err, result) => {
      expect(err).toBeFalsy();
      expect(result).toEqual(`<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"15\" height=\"30\" viewBox=\"500 500 15 30\">
  <text font-size=\"0\">S10000</text>
  <svg x=\"500\" y=\"500\"><g transform=\"translate(0.0,30.0) scale(0.01,-0.01)\"><path class=\"sym-fill\" fill=\"#ffffff\" d=\"M200 750 l0 -550 550 0 550 0 0 550 0 550 -550 0 -550 0 0 -550z\"/><path class=\"sym-line\" d=\"M1300 2250 l0 -750 -650 0 -650 0 0 -750 0 -750 750 0 750 0 0 1500 0 1500 -100 0 -100 0 0 -750z m0 -1500 l0 -550 -550 0 -550 0 0 550 0 550 550 0 550 0 0 -550z\"/></g></svg>
</svg>`)
      done();
    }
  )
})

it('should return a blank svg for invalid key', done => {
  symbolSvg('S20544',
    (err, result) => {
      expect(err).toBeFalsy();
      expect(result).toEqual(`<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"1\" height=\"1\"></svg>`)
      done();
    }
  )
})
