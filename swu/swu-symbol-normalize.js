
const { db } = require('../db/db');
const { swu, convert } = require('@sutton-signwriting/core');

const blank = null;

/**
 * Function that normalizes a symbol with a minimum coordinate for a center of 500,500
 * @function swu.symbolNormalize
 * @param {string} swuSym - an SWU symbol with optional coordinate and style string
 * @param {function} callback - a callback function with error and result parameters
 * @example
 * const callback = (error, result) => {
 *   if (error) {
 *     console.log(error)
 *   } else {
 *     console.log(result + " is '񆇡𝤁𝤁-C'")
 *   }
 * }
 * 
 * swu.symbolNormalize('񆇡-C', callback )
 */

const symbolNormalize = (swuSym, callback) => {
  const parsed = swu.parse.symbol(swuSym);
  if (parsed.symbol) {
    db.get('select width,height from symbol where id=?', [convert.swu2id(parsed.symbol)], (err, res) => {
      if (err) {
        callback(err, res);
      } else {
        if (!res) {
          callback(err, blank)
        } else {
          callback(null, `${parsed.symbol}${convert.coord2swu([500 - parseInt(res.width / 2), 500 - parseInt(res.width / 2)])}${parsed.style || ''}`);
        }
      }
    })
  } else {
    callback(null, blank);
  }
}

if (require.main === module) {
  symbolNormalize(process.argv[2], (err, res) => {
    console.log(err || res);
  })
} else {
  module.exports = { symbolNormalize }
}
