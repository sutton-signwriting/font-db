
const { symbolPng, symbolPngDataUrl } = require('./fsw-symbol-png');

it('should have S10000', done => {
  symbolPng('S10000',
    (err, res) => {
      expect(err).toBeFalsy();
      expect(res.toString('base64')).toBe('iVBORw0KGgoAAAANSUhEUgAAAA8AAAAeCAYAAADzXER0AAAABmJLR0QA/wD/AP+gvaeTAAAAO0lEQVQ4jWNkIA/8Z2BgYGAiUzPDqOZRzaOacQBGBmj2orvNLDDG///EO4CRkZFym0c1j2omCAYuYwAA9XQGOby+Wx8AAAAASUVORK5CYII=');
      done();
    }
  )
})

it('should return a blank svg for invalid key', done => {
  symbolPng('S20544',
    (err, res) => {
      expect(err).toBeFalsy();
      expect(res.toString('base64')).toBe('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABmJLR0QA/wD/AP+gvaeTAAAAC0lEQVQImWNgAAIAAAUAAWJVMogAAAAASUVORK5CYII=')
      done();
    }
  )
})

it('should have S10000', done => {
  symbolPngDataUrl('S10000',
    (err, res) => {
      expect(err).toBeFalsy();
      expect(res).toBe('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAeCAYAAADzXER0AAAABmJLR0QA/wD/AP+gvaeTAAAAO0lEQVQ4jWNkIA/8Z2BgYGAiUzPDqOZRzaOacQBGBmj2orvNLDDG///EO4CRkZFym0c1j2omCAYuYwAA9XQGOby+Wx8AAAAASUVORK5CYII=');
      done();
    }
  )
})

it('should return a blank svg for invalid key', done => {
  symbolPngDataUrl('S20544',
    (err, res) => {
      expect(err).toBeFalsy();
      expect(res).toBe('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABmJLR0QA/wD/AP+gvaeTAAAAC0lEQVQImWNgAAIAAAUAAWJVMogAAAAASUVORK5CYII=')
      done();
    }
  )
})
