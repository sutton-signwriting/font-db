
const { db } = require('./db');

it("should be a Database", () => {
  expect(db.constructor.name).toBe('Database');
})

it("should work with async await", async() => {
  const result = await db.query("select count(*) as total from symbol",[]);
  const total = result[0].total;
  expect(total).toEqual(37811);
})