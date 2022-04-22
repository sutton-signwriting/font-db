
const { svg2png } = require('../common/svg2png')
const { symbolSvg } = require('./fsw-symbol-svg');
const fs = require('fs');

/**
 * Function that creates a binary PNG image from an FSW symbol key with an optional style string
 * @function fsw.symbolPng
 * @param {string} fswSym - an FSW symbol key with optional style string
 * @returns {ArrayBuffer} symbol png
 * @example
 * // using promise.then
 * fsw.symbolPng('S20500-C').then( png => {
 *   console.log(png)
 * })
 * @example
 * // using async/await
 * const png = await fsw.symbolPng('S20500-C')
 */
 const symbolPng = async (fswSym) => {
  let svg = await symbolSvg(fswSym);
  svg = svg.replace(/<text.*text>/g, "");
  const png = await svg2png(svg);
  return png;
}

/**
 * Function that creates a data url PNG image from an FSW symbol key with an optional style string
 * @function fsw.symbolPngDataUrl
 * @param {string} fswSym - an FSW symbol key with optional style string
 * @returns {string} symbol png
 * @example
 * // using promise.then
 * fsw.symbolPngDataUrl('S20500-C').then( png => {
 *   console.log(png)
 * })
 * @example
 * // using async/await
 * const png = await fsw.symbolPngDataUrl('S20500-C')
 */
const symbolPngDataUrl = async (fswSym) => {
  const res = await symbolPng(fswSym);
  return 'data:image/png;base64,' + res.toString('base64');
}

if (require.main === module) {
  if (process.argv[3]) {
    symbolPng(process.argv[2]).then ( res => {
      fs.writeFileSync(process.argv[3], res);
    })
  } else {
    symbolPngDataUrl(process.argv[2]).then ( res => {
      console.log(res)
    })
  }
} else {
  module.exports = { symbolPng, symbolPngDataUrl }
}
