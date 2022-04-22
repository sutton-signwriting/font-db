
const { svg2png } = require('../common/svg2png')
const { signSvg } = require('./fsw-sign-svg');
const fs = require('fs');

/**
 * Function that creates a binary PNG image from an FSW sign with an optional style string
 * @function fsw.signPng
 * @param {string} fswSign - an FSW sign with optional style string
 * @returns {ArrayBuffer} sign png
 * @example
 * // using promise.then
 * fsw.signPng('M525x535S2e748483x510S10011501x466S20544510x500S10019476x475').then( png => {
 *   console.log(png)
 * })
 * @example
 * // using async/await
 * const png = await fsw.signPng('M525x535S2e748483x510S10011501x466S20544510x500S10019476x475')
 */ 
const signPng = async (fswSign) => {
  let svg = await signSvg(fswSign);
  svg = svg.replace(/<text.*text>/g, "");
  const png = await svg2png(svg);
  return png;
}

/**
 * Function that creates a data url PNG image from an FSW sign with an optional style string
 * @function fsw.signPngDataUrl
 * @param {string} fswSign - an FSW sign with optional style string
 * @returns {string} sign png
 * @example
 * // using promise.then
 * fsw.signPngDataUrl('M525x535S2e748483x510S10011501x466S20544510x500S10019476x475').then( png => {
 *   console.log(png)
 * })
 * @example
 * // using async/await
 * const png = await fsw.signPngDataUrl('M525x535S2e748483x510S10011501x466S20544510x500S10019476x475')
 */
const signPngDataUrl = async (fswSign) => {
  const res = await signPng(fswSign);
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
