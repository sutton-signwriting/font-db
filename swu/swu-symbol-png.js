
const { svg2png } = require('../common/svg2png')
const { symbolSvg } = require('./swu-symbol-svg');
const fs = require('fs');

/**
 * Function that creates a binary PNG image from an SWU symbol key with an optional style string
 * @function swu.symbolPng
 * @param {string} swuSym - an SWU symbol key with optional style string
 * @param {{width?: number, height?: number} | undefined} scale - options for scaling
 * @returns {ArrayBuffer} symbol png
 * @example
 * // using promise.then
 * swu.symbolPng('񀀁-C').then( png => {
 *   console.log(png)
 * })
 * @example
 * // using promise.then with options which scales the image to 100 pixels width
 * swu.symbolPng('񀀁-C', { width: 100 }).then( png => {
 *   console.log(png)
 * })
 * @example
 * // using async/await
 * const png = await swu.symbolPng('񀀁-C')
 * @example
 * // using async/await with options which scales the image to 100 pixels width
 * const png = await swu.symbolPng('񀀁-C', { width: 100 })
 */
const symbolPng = async (swuSym, scale) => {
  let svg = await symbolSvg(swuSym);
  svg = svg.replace(/<text.*text>/g, "");
  const png = await svg2png(svg, scale);
  return png;
}

/**
 * Function that creates a data url PNG image from an SWU symbol key with an optional stle string
 * @function swu.symbolPngDataUrl
 * @param {string} swuSym - an SWU symbol key with optional style string
 * @param {{width?: number, height?: number} | undefined} scale - options for scaling
 * @returns {string} symbol png
 * @example
 * // using promise.then
 * swu.symbolPndDataUrl('񀀁-C').then( png => {
 *   console.log(png)
 * })
 * @example
 * // using promise.then with options which scales the image to 100 pixels width
 * swu.symbolPndDataUrl('񀀁-C', { width: 100 }).then( png => {
 *  console.log(png)
 * })
 * @example
 * // using async/await
 * const png = await swu.symbolPndDataUrl('񀀁-C')
 * @example
 * // using async/await with options which scales the image to 100 pixels width
 * const png = await swu.symbolPndDataUrl('񀀁-C', { width: 100 })
 */
const symbolPngDataUrl = async (swuSym, scale) => {
  const res = await symbolPng(swuSym, scale);
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
