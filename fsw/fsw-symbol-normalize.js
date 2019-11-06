
const { db } = require('../db/db');
const fsw = require('@sutton-signwriting/core/fsw');

const blank = null;

/**
 * Function that normalizes a symbol with a minimum coordinate for a center of 500,500
 * @function fsw.symbolNormalize
 * @param {string} fswSym - an FSW symbol key with optional coordinate and style string
 * @param {function} callback - a callback function with error and result parameters
 * @example
 * const callback = (error, result) => {
 *   if (error) {
 *     console.log(error)
 *   } else {
 *     console.log(result + " is 'S20500495x495-C'")
 *   }
 * }
 * 
 * fsw.symbolNormalize('S20500-C', callback )
 */
const symbolNormalize = (fswSym, callback) => {
  const parsed = fsw.parse.symbol(fswSym);
  if (parsed.symbol) {
    db.get('select width,height from symbol where symkey=?', [parsed.symbol], (err, res) => {
      if (err) {
        callback(err, res);
      } else {
        if (!res) {
          callback(err, blank)
        } else {
          callback(null, `${parsed.symbol}${500 - parseInt(res.width / 2)}x${500 - parseInt(res.width / 2)}${parsed.style || ''}`);
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
