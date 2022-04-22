
const { symbolPng } = require('./swu-symbol-png');

it('should pass', () => {
  expect(true).toBe(true);
})

it('should have S10000', async () => {
  const png = await symbolPng('񀀁');
  expect(png.toString('base64')).toBe('iVBORw0KGgoAAAANSUhEUgAAABAAAAAeCAYAAAAl+Z4RAAAABmJLR0QA/wD/AP+gvaeTAAAAQUlEQVQ4je2TMQoAIAzEcuL/v1wHi7O0gssFbg1ZDmpEjlEUHCywwILNJF/1tQCAiPsQSe8KLLDgiUD0zqR2QZsF/6kHOePg1oUAAAAASUVORK5CYII=');
})

it('should return a blank svg for invalid key', async () => {
  const png = await symbolPng('񆈥');
  expect(png.toString('base64')).toBe('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABmJLR0QA/wD/AP+gvaeTAAAAC0lEQVQImWNgAAIAAAUAAWJVMogAAAAASUVORK5CYII=')
})
