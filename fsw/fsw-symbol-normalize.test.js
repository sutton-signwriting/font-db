
const { symbolNormalize } = require('./fsw-symbol-normalize');

it('should normalize a symbol', async () => {
  const norm = await symbolNormalize('S20500');
  expect(norm).toBe('S20500495x494')
})

it('should normalize a spatial', async () => {
  const norm = await symbolNormalize('S20500500x500');
  expect(norm).toBe('S20500495x494')
})

it('should normalize a spatial with styling', async () => {
  const norm = await symbolNormalize('S20500500x500-C');
  expect(norm).toBe('S20500495x494-C')
})

it('should return empty string for invalid symbol', async () => {
  const norm = await symbolNormalize('S2055f');
  expect(norm).toBe('')
})
