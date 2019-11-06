
const { symbolPng } = require('./swu-symbol-png');

it('should pass', () => {
  expect(true).toBe(true);
})

it('should have S10000', done => {
  symbolPng('񀀁',
    (err, res) => {
      expect(err).toBeFalsy();
      expect(res.toString('base64')).toBe('iVBORw0KGgoAAAANSUhEUgAAAA8AAAAeCAYAAADzXER0AAAABmJLR0QA/wD/AP+gvaeTAAAAO0lEQVQ4jWNkIA/8Z2BgYGAiUzPDqOZRzaOacQBGBmj2orvNLDDG///EO4CRkZFym0c1j2omCAYuYwAA9XQGOby+Wx8AAAAASUVORK5CYII=');
      done();
    }
  )
})

it('should return a blank svg for invalid key', done => {
  symbolPng('񆈥',
    (err, res) => {
      expect(err).toBeFalsy();
      expect(res.toString('base64')).toBe('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABmJLR0QA/wD/AP+gvaeTAAAAC0lEQVQImWNgAAIAAAUAAWJVMogAAAAASUVORK5CYII=')
      done();
    }
  )
})
