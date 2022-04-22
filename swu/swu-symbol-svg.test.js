
const { symbolSvg } = require('./swu-symbol-svg');

it('should have 񀀁', async () => {
  const svg = await symbolSvg('񀀁');
  expect(svg).toEqual(`<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"30\" viewBox=\"492 485 16 30\">
  <text font-size=\"0\">񀀁</text>
  <svg x=\"492\" y=\"484\"><g transform=\"translate(0.0,30.0) scale(0.01,-0.01)\"><path class=\"sym-fill\" fill=\"#ffffff\" d=\"M200 750 l0 -550 550 0 550 0 0 550 0 550 -550 0 -550 0 0 -550z\"/><path class=\"sym-line\" d=\"M1300 2250 l0 -750 -650 0 -650 0 0 -750 0 -750 750 0 750 0 0 1500 0 1500 -100 0 -100 0 0 -750z m0 -1500 l0 -550 -550 0 -550 0 0 550 0 550 550 0 550 0 0 -550z\"/></g></svg>
</svg>`)
})

it('should return a blank svg for invalid key', async () => {
  const svg = await symbolSvg('񆈥');
  expect(svg).toEqual(`<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"1\" height=\"1\"></svg>`)
})
