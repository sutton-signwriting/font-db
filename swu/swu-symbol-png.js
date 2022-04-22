
const { svg2png } = require('../common/svg2png')
const { symbolSvg } = require('./swu-symbol-svg');
const fs = require('fs');

/**
 * Function that creates a binary PNG image from an SWU symbol key with an optional style string
 * @function swu.symbolPng
 * @param {string} swuSym - an SWU symbol key with optional style string
 * @returns {ArrayBuffer} symbol png
 * @example
 * // using promise.then
 * swu.symbolPng('񀀁-C').then( png => {
 *   console.log(png)
 * })
 * @example
 * // using async/await
 * const png = await swu.symbolPng('񀀁-C')
 */
const symbolPng = async (swuSym) => {
  let svg = await symbolSvg(swuSym);
  svg = svg.replace(/<text.*text>/g, "");
  const png = await svg2png(svg);
  return png;
}

/**
 * Function that creates a data url PNG image from an SWU symbol key with an optional stle string
 * @function swu.symbolPngDataUrl
 * @param {string} swuSym - an SWU symbol key with optional style string
 * @returns {string} symbol png
 * @example
 * // using promise.then
 * swu.symbolPndDataUrl('񀀁-C').then( png => {
 *   console.log(png)
 * })
 * @example
 * // using async/await
 * const png = await swu.symbolPndDataUrl('񀀁-C')
 */
const symbolPngDataUrl = async (swuSym) => {
  const res = await symbolPng(swuSym);
  return 'data:image/png;base64,' + res.toString('base64');
}

if (require.main === module) {
  if (process.argv[3]) {
    symbolPng(process.argv[2]).then( res => {
      fs.writeFileSync(process.argv[3], res);
    })
  } else {
    symbolPngDataUrl(process.argv[2]).then( res => {
      console.log(res)
    })
  }
} else {
  module.exports = { symbolPng, symbolPngDataUrl }
}
