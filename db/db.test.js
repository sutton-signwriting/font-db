
const { db } = require('./db');

it("should be a Database", () => {
  expect(db.constructor.name).toBe('Database');
})

it("should contain all symbols", done => {
  db.get("select count(*) as total from symbol", function (err, result) {
    expect(err).toBeFalsy();
    expect(result).toEqual({ "total": 37811 });
    done();
  })
})