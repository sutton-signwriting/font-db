
const { symbolPng } = require('./swu-symbol-png');
const len = 45;

it('should pass', () => {
  expect(true).toBe(true);
})

it('should have S10000', async () => {
  const res = await symbolPng('񀀁');
  expect(res.toString('base64').substring(0,len)).toBe('iVBORw0KGgoAAAANSUhEUgAAABAAAAAeCAYAAAAl+Z4RAAAABmJLR0QA/wD/AP+gvaeTAAAAQUlEQVQ4je2TMQoAIAzEcuL/v1wHi7O0gssFbg1ZDmpEjlEUHCywwILNJF/1tQCAiPsQSe8KLLDgiUD0zqR2QZsF/6kHOePg1oUAAAAASUVORK5CYII='.substring(0,len))
})

it('should return a blank svg for invalid key', async () => {
  const res = await symbolPng('񆈥');
  expect(res.toString('base64').substring(0,len)).toBe('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABmJLR0QA/wD/AP+gvaeTAAAAC0lEQVQImWNgAAIAAAUAAWJVMogAAAAASUVORK5CYII='.substring(0,len))
})
