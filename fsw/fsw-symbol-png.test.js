
const { symbolPng } = require('./fsw-symbol-png');
const len = 45;

it('should have S10000', async () => {
  const res = await symbolPng('S10000');
  expect(res.toString('base64').substring(0,len)).toBe('iVBORw0KGgoAAAANSUhEUgAAABAAAAAeCAYAAAAl+Z4RAAAABmJLR0QA/wD/AP+gvaeTAAAAO0lEQVQ4jWNkIA/8Z2BgYGAiUzPDqOZRzaOacQBGBmj2orvNLDDG///EO4CRkZFym0c1j2omCAYuYwAA9XQGOby+Wx8AAAAASUVORK5CYII='.substring(0,len))
})

it('should return a blank png for invalid key', async () => {
  const res = await symbolPng('S20544');
  expect(res.toString('base64').substring(0,len)).toBe('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABmJLR0QA/wD/AP+gvaeTAAAAC0lEQVQImWNgAAIAAAUAAWJVMogAAAAASUVORK5CYII='.substring(0,len))
})

it('should have S10000 data url', async () => {
  const res = await symbolPng('S10000');
  expect(res.toString('base64').substring(0,len)).toBe('iVBORw0KGgoAAAANSUhEUgAAABAAAAAeCAYAAAAl+Z4RAAAABmJLR0QA/wD/AP+gvaeTAAAAQUlEQVQ4je2TMQoAIAzEcuL/v1wHi7O0gssFbg1ZDmpEjlEUHCywwILNJF/1tQCAiPsQSe8KLLDgiUD0zqR2QZsF/6kHOePg1oUAAAAASUVORK5CYII='.substring(0,len))
})

it('should return a blank data url for invalid key', async () => {
  const res = await symbolPng('S20544');
  expect(res.toString('base64').substring(0,len)).toBe('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABmJLR0QA/wD/AP+gvaeTAAAAC0lEQVQImWNgAAIAAAUAAWJVMogAAAAASUVORK5CYII='.substring(0,len))
})

it('should have correct width', async () => {
  const res = await symbolPng('S10000', { width: 100 });
  expect(res.toString('base64').substring(0,len)).toBe('iVBORw0KGgoAAAANSUhEUgAAAGQAAAC8CAYAAACOjwsWAAADMklEQVR4nO3YsW0QOhRG4d9Smic9iTQZgIoybICXSJUlWCEbMEemuJYYgCEokzJ1uEiIBheJiMwpzif90q3cnM4jeguV5FPvpVZvZmP09PcqBkGpGASlYhCUikFQKgZBqRgEpWIQlIpBUCoGQakYBKViEJSKQVAqBkGpGASlYhCUikFQKgZBqRgEpWIQlIpBUCoGQakYBKViEJSKQVAqBkGpGASlYhCUikFQKgZBqRgEpWIQlIpBUCoGQakYBKViEJSKQVAqBkGpGASlYhCUikFQKgZBqRgEpWIQlIpBUCoGQakYBKViEJSKQVAqBkGpGASlYhCUikFQKgZBqRgEpWIQlIpBUCoGQakYBKViEJSKQVAqBkGpGASlYhCUikFQKgZBqRgEpWIQlIpBUCoGQakYBKViEJSKQVAqBkGpGASlYhCUikFQKgZBqRgEpWIQlIpBUCoGQakYBKViEJSKQVAqBkGpvGGQ1zykvS+9j72XWr2ZjdF77ums1ZvZGD2DnLd6MxujZ5DzVm9mY/QMct7qzWyMnkHOW72ZjdEzyHmrN7MxegY5b/VmNkbPIOet3szG6BnkvNWb2Rg9g5y3ejMbo2eQ81ZvZmP0DHLe6s1sjN6rglxfX3+9u7v7v0/9cnt7+9/T09OHPl9q9WY2Ru9VQW5ubur+/n5Gv11dXX17eHj4N7+9BvmTQWAMAmMQGIPAGATGIDAGgTEIjEFgDAJjEBiDwBgExiAwBoExCIxBYAwCYxAYg8AYBMYgMAaBMQiMQWAMAmMQGIPAGATGIDAGgTEIjEFgDAJjEBiDwBgExiAwBoExCIxBYAwCYxAYg8AYBMYgMAaBMQiMQWAMAmMQGIPAGATGIDAGgTEIjEFgDAJjEBiDwBgExiAwBoExCIxBYAwC80+DXFxcfL+8vHzoU788Pj6+f35+ftfnS63ezMbovSqI3sTqzWyMnkHOW72ZjdEzyHmrN7MxegY5b/VmNkbPIOet3szG6BnkvNWb2Rg9g5y3ejMbo2eQ81ZvZmP0DHLe6s1sjJ5Bzlu9mY3RM8h5qzezMXoVnfat97n3h59BBGIQGIPAGATGIDAGgfkBdVKb6v9o+1UAAAAASUVORK5CYII='.substring(0,len));
})
