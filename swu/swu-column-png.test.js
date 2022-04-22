
const { columnPng } = require('./swu-column-png');
const len = 60;

it('should handle column data', async () => {
  const columnData = [
      {"x":56,"y":20,"minX":481,"minY":471,"width":37,"height":58,"lane":0,"padding":0,"segment":"sign","text":"𝠀񁲡񈩧𝠃𝤘𝤣񁲡𝣳𝣩񈩧𝤉𝣻","zoom":1},
      {"x":57,"y":118,"minX":482,"minY":468,"width":36,"height":65,"lane":0,"padding":0,"segment":"sign","text":"𝠀񃊢񃊫񋛕񆇡𝠃𝤘𝤧񃊫𝣻𝤕񃊢𝣴𝣼񆇡𝤎𝤂񋛕𝤆𝣦","zoom":1},
      {"x":39,"y":203,"minX":464,"minY":496,"width":72,"height":8,"lane":0,"padding":0,"segment":"symbol","text":"񏌁𝣢𝤂","zoom":1}
  ];
  const columnOptions = {"height": 250, "width": 150};
  const res = await columnPng(columnData,columnOptions);
  expect(res.toString('base64').substring(0,len)).toBe('iVBORw0KGgoAAAANSUhEUgAAAJYAAAD6CAYAAABDN77DAAAABmJLR0QA/wD/'.substring(0,len))
})
