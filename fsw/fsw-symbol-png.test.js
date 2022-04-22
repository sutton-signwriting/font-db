
const { symbolPng, symbolPngDataUrl } = require('./fsw-symbol-png');

it('should have S10000', async () => {
  const res = await symbolPng('S10000');
  expect(res.toString('base64').substring(0,20)).toBe('iVBORw0KGgoAAAANSUhEUgAAAA8AAAAeCAYAAADzXER0AAAABmJLR0QA/wD/AP+gvaeTAAAAO0lEQVQ4jWNkIA/8Z2BgYGAiUzPDqOZRzaOacQBGBmj2orvNLDDG///EO4CRkZFym0c1j2omCAYuYwAA9XQGOby+Wx8AAAAASUVORK5CYII='.substring(0,20));
})

it('should return a blank png for invalid key', async () => {
  const res = await symbolPng('S20544');
  expect(res.toString('base64')).toBe('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABmJLR0QA/wD/AP+gvaeTAAAAC0lEQVQImWNgAAIAAAUAAWJVMogAAAAASUVORK5CYII=')
})

it('should have S10000 data url', async () => {
  const res = await symbolPngDataUrl('S10000');
  expect(res).toBe('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAeCAYAAAAl+Z4RAAAABmJLR0QA/wD/AP+gvaeTAAAAQUlEQVQ4je2TMQoAIAzEcuL/v1wHi7O0gssFbg1ZDmpEjlEUHCywwILNJF/1tQCAiPsQSe8KLLDgiUD0zqR2QZsF/6kHOePg1oUAAAAASUVORK5CYII=');
})

it('should return a blank data url for invalid key', async () => {
  const res = await symbolPngDataUrl('S20544');
  expect(res).toBe('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABmJLR0QA/wD/AP+gvaeTAAAAC0lEQVQImWNgAAIAAAUAAWJVMogAAAAASUVORK5CYII=')
})
