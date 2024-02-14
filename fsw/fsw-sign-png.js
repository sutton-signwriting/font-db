
const { svg2png } = require('../common/svg2png')
const { signSvg } = require('./fsw-sign-svg');
const fs = require('fs');

/**
 * Function that creates a binary PNG image from an FSW sign with an optional style string
 * @function fsw.signPng
 * @param {string} fswSign - an FSW sign with optional style string
 * @param {{width?: number, height?: number} | undefined} scale - options for scaling
 * @returns {ArrayBuffer} sign png
 * @example
 * // using promise.then
 * fsw.signPng('M525x535S2e748483x510S10011501x466S20544510x500S10019476x475').then( png => {
 *   console.log(png)
 * })
 * @example
 * // using promise.then with options which scales the image to 100 pixels width
 * fsw.signPng('M525x535S2e748483x510S10011501x466S20544510x500S10019476x475', { width: 100 }).then(png => {
 *   console.log(png)
 * })
 * @example
 * // using async/await
 * const png = await fsw.signPng('M525x535S2e748483x510S10011501x466S20544510x500S10019476x475')
 * @example
 * // using async/await with options which scales the image to 100 pixels width
 * const png = await fsw.signPng('M525x535S2e748483x510S10011501x466S20544510x500S10019476x475', { width: 100 })
 */ 
const signPng = async (fswSign, scale) => {
  let svg = await signSvg(fswSign);
  svg = svg.replace(/<text.*text>/g, "");
  const png = await svg2png(svg, scale);
  return png;
}

/**
 * Function that creates a data url PNG image from an FSW sign with an optional style string
 * @function fsw.signPngDataUrl
 * @param {string} fswSign - an FSW sign with optional style string
 * @param {{width?: number, height?: number} | undefined} scale - options for scaling
 * @returns {string} sign png
 * @example
 * // using promise.then
 * fsw.signPngDataUrl('M525x535S2e748483x510S10011501x466S20544510x500S10019476x475').then( png => {
 *   console.log(png)
 * })
 * @example
 * // using promise.then with options which scales the image to 100 pixels width
 * fsw.signPngDataUrl('M525x535S2e748483x510S10011501x466S20544510x500S10019476x475', { width: 100 }).then(png => {
 *  console.log(png)
 * })
 * @example
 * // using async/await
 * const png = await fsw.signPngDataUrl('M525x535S2e748483x510S10011501x466S20544510x500S10019476x475')
 * @example
 * // using async/await with options which scales the image to 100 pixels width
 * const png = await fsw.signPngDataUrl('M525x535S2e748483x510S10011501x466S20544510x500S10019476x475', { width: 100 })
 */
const signPngDataUrl = async (fswSign, scale) => {
  const res = await signPng(fswSign, scale);
  return 'data:image/png;base64,' + res.toString('base64');
}

if (require.main === module) {
  if (process.argv[3]) {
    signPng(process.argv[2]).then( res => {
      fs.writeFileSync(process.argv[3], res);
    })
  } else {
    signPngDataUrl(process.argv[2]).then( res => {
      console.log(res)
    })
  }
} else {
  module.exports = { signPng, signPngDataUrl }
}
