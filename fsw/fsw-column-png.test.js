
const { columnPng } = require('./fsw-column-png');
const len = 60;

it('should handle column data', async () => {
  const columnData = [
      {"x":56,"y":20,"minX":481,"minY":471,"width":37,"height":58,"lane":0,"padding":0,"segment":"sign","text":"AS14c20S27106M518x529S14c20481x471S27106503x489","zoom":1},
      {"x":57,"y":118,"minX":482,"minY":468,"width":36,"height":65,"lane":0,"padding":0,"segment":"sign","text":"AS18701S1870aS2e734S20500M518x533S1870a489x515S18701482x490S20500508x496S2e734500x468","zoom":1},
      {"x":39,"y":203,"minX":464,"minY":496,"width":72,"height":8,"lane":0,"padding":0,"segment":"symbol","text":"S38800464x496","zoom":1}
  ];
  const columnOptions = {"height": 250, "width": 150};
  const res = await columnPng(columnData,columnOptions);
  expect(res.toString('base64').substring(0,len)).toBe('iVBORw0KGgoAAAANSUhEUgAAAJYAAAD6CAYAAABDN77DAAAABmJLR0QA/wD/'.substring(0,len))
})
