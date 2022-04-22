
const { db } = require('../db/db');
const fsw = require('@sutton-signwriting/core/fsw');

/**
 * Function that normalizes a symbol with a minimum coordinate for a center of 500,500
 * @function fsw.symbolNormalize
 * @param {string} fswSym - an FSW symbol key with optional coordinate and style string
 * @returns {string} normalized symbol
 * @example
 * // using promise.then
 * fsw.symbolNormalize('S20500-C').then( norm => {
 *   console.log(norm)
 * })
 * @example
 * // using async/await
 * const norm = await fsw.symbolNormalize('S20500-C')
 */
const symbolNormalize = async fswSym => {
  const blank = '';
  const parsed = fsw.parse.symbol(fswSym);
  if (!parsed.symbol) return blank;

  const res = await db.query('select width,height from symbol where symkey=?', [parsed.symbol]);
  const sym = res[0]
  if (!sym) return blank;

  return `${parsed.symbol}${500 - parseInt( (sym.width+1) / 2)}x${500 - parseInt( (sym.height+1) / 2)}${parsed.style || ''}`;
}

if (require.main === module) {
  symbolNormalize(process.argv[2]).then( res => {
    console.log(res)
  })
} else {
  module.exports = { symbolNormalize }
}
