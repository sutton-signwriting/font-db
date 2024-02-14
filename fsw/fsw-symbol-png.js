
const { svg2png } = require('../common/svg2png')
const { symbolSvg } = require('./fsw-symbol-svg');
const fs = require('fs');

/**
 * Function that creates a binary PNG image from an FSW symbol key with an optional style string
 * @function fsw.symbolPng
 * @param {string} fswSym - an FSW symbol key with optional style string
 * @param {{width?: number, height?: number} | undefined} scale - options for scaling
 * @returns {ArrayBuffer} symbol png
 * @example
 * // using promise.then
 * fsw.symbolPng('S20500-C').then( png => {
 *   console.log(png)
 * })
 * @example
 * // using promise.then with options which scales the image to 100 pixels width
 * fsw.symbolPng('S20500-C', { width: 100 }).then( png => {
 *   console.log(png)
 * })
 * @example
 * // using async/await
 * const png = await fsw.symbolPng('S20500-C')
 * @example
 * // using async/await with options which scales the image to 100 pixels width
 * const png = await fsw.symbolPng('S20500-C', { width: 100 })
 */
 const symbolPng = async (fswSym, scale) => {
  let svg = await symbolSvg(fswSym);
  svg = svg.replace(/<text.*text>/g, "");
  const png = await svg2png(svg, scale);
  return png;
}

/**
 * Function that creates a data url PNG image from an FSW symbol key with an optional style string
 * @function fsw.symbolPngDataUrl
 * @param {string} fswSym - an FSW symbol key with optional style string
 * @param {{width?: number, height?: number} | undefined} scale - options for scaling
 * @returns {string} symbol png
 * @example
 * // using promise.then
 * fsw.symbolPngDataUrl('S20500-C').then( png => {
 *   console.log(png)
 * })
 * @example
 * // using promise.then with options which scales the image to 100 pixels width
 * fsw.symbolPngDataUrl('S20500-C', { width: 100 }).then( png => {
 *  console.log(png)
 * })
 * @example
 * // using async/await
 * const png = await fsw.symbolPngDataUrl('S20500-C')
 * @example
 * // using async/await with options which scales the image to 100 pixels width
 * const png = await fsw.symbolPngDataUrl('S20500-C', { width: 100 })
 */
const symbolPngDataUrl = async (fswSym, scale) => {
  const res = await symbolPng(fswSym, scale);
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
