
const { columnsPng } = require('./swu-columns-png');
const len = 45;

it('should handle column data', async () => {
  const swuText = "𝠀񁲡񈩧𝠃𝤘𝤣񁲡𝣳𝣩񈩧𝤉𝣻 𝠀񃊢񃊫񋛕񆇡𝠃𝤘𝤧񃊫𝣻𝤕񃊢𝣴𝣼񆇡𝤎𝤂񋛕𝤆𝣦 񏌁𝣢𝤂";
  const columnOptions = {"height": 250, "width": 150};
  const res = await columnsPng(swuText,columnOptions);
  expect(res[0].toString('base64').substring(0,len)).toBe('iVBORw0KGgoAAAANSUhEUgAAAJYAAAD6CAYAAABDN77DAAAABmJLR0QA/wD/'.substring(0,len))
})
