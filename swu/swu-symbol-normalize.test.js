
const { symbolNormalize } = require('./swu-symbol-normalize');

it('should normalize a symbol', async () => {
  const norm = await symbolNormalize('񆇡');
  expect(norm).toBe('񆇡𝤁𝤀')
})

it('should normalize a spatial', async () => {
  const norm = await symbolNormalize('񆇡𝤆𝤆');
  expect(norm).toBe('񆇡𝤁𝤀')
})

it('should normalize a spatial with styling', async () => {
  const norm = await symbolNormalize('񆇡𝤆𝤆-C');
  expect(norm).toBe('񆇡𝤁𝤀-C')
})
