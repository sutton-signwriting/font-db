
const { db } = require('../db/db');
const { swu, convert } = require('@sutton-signwriting/core');

const blank = null;

/**
 * Function that normalizes a symbol with a minimum coordinate for a center of 500,500
 * @function swu.symbolNormalize
 * @param {string} swuSym - an SWU symbol with optional coordinate and style string
 * @returns {string} normalized symbol
 * @example
 * // using promise.then
 * swu.symbolNormalize('񆇡-C').then( norm => {
 *   console.log(norm)
 * })
 * @example
 * // using async/await
 * const norm = await swu.symbolNormalize('񆇡-C')
 */

const symbolNormalize = async (swuSym) => {
  const blank = '';
  const parsed = swu.parse.symbol(swuSym);
  if (!parsed.symbol) return blank;
  
  const res = await db.query('select width,height from symbol where id=?', [convert.swu2id(parsed.symbol)]);
  const sym = res[0]
  if (!sym) return blank;

  return `${parsed.symbol}${convert.coord2swu([500 - parseInt( (sym.width+1) / 2), 500 - parseInt( (sym.height+1) / 2)])}${parsed.style || ''}`;
}

if (require.main === module) {
  symbolNormalize(process.argv[2]).then( res => {
    console.log(res);
  })
} else {
  module.exports = { symbolNormalize }
}
