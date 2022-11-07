
const { columnsPng } = require('./fsw-columns-png');
const len = 45;

it('should handle column data', async () => {
  const fswText = "AS14c20S27106M518x529S14c20481x471S27106503x489 AS18701S1870aS2e734S20500M518x533S1870a489x515S18701482x490S20500508x496S2e734500x468 S38800464x496";
  const columnOptions = {"height": 250, "width": 150};
  const res = await columnsPng(fswText,columnOptions);
  expect(res[0].toString('base64').substring(0,len)).toBe('iVBORw0KGgoAAAANSUhEUgAAAJYAAAD6CAYAAABDN77DAAAABmJLR0QA/wD/'.substring(0,len))
})
