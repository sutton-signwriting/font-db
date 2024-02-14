
const { svg2png } = require('../common/svg2png')
const { signSvg } = require('./swu-sign-svg');
const fs = require('fs');

/**
 * Function that creates a binary PNG image from an SWU sign with an optional style string
 * @function swu.signPng
 * @param {string} swuSign - an SWU sign with optional style string
 * @param {{width?: number, height?: number} | undefined} scale - options for scaling
 * @returns {ArrayBuffer} sign png
 * @example
 * // using promise.then
 * swu.signPng('𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񆈥𝤐𝤆񀀚𝣮𝣭').then( png => {
 *   console.log(png)
 * })
 * @example
 * // using promise.then with options which scales the image to 100 pixels width
 * swu.signPng('𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񆈥𝤐𝤆񀀚𝣮𝣭', { width: 100 }).then( png => {
 *  console.log(png)
 * })
 * @example
 * // using async/await
 * const png = await swu.signPng('𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񆈥𝤐𝤆񀀚𝣮𝣭')
 * @example
 * // using async/await with options which scales the image to 100 pixels width
 * const png = await swu.signPng('𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񆈥𝤐𝤆񀀚𝣮𝣭', { width: 100 })
 */
const signPng = async (swuSign, scale) => {
  let svg = await signSvg(swuSign);
  svg = svg.replace(/<text.*text>/g, "");
  const png = await svg2png(svg, scale);
  return png;
}

/**
 * Function that creates a data url PNG image from an SWU sign with an optional style string
 * @function swu.signPngDataUrl
 * @param {string} swuSign - an SWU sign with optional style string
 * @param {{width?: number, height?: number} | undefined} scale - options for scaling
 * @returns {string} sign png
 * @example
 * // using promise.then
 * swu.signPngDataUrl('𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񆈥𝤐𝤆񀀚𝣮𝣭').then( png => {
 *   console.log(png)
 * })
 * @example
 * // using promise.then with options which scales the image to 100 pixels width
 * swu.signPngDataUrl('𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񆈥𝤐𝤆񀀚𝣮𝣭', { width: 100 }).then( png => {
 *   console.log(png)
 * })
 * @example
 * // using async/await
 * const png = await swu.signPngDataUrl('𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񆈥𝤐𝤆񀀚𝣮𝣭')
 * @example
 * // using async/await with options which scales the image to 100 pixels width
 * const png = await swu.signPngDataUrl('𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񆈥𝤐𝤆񀀚𝣮𝣭', { width: 100 })
 */
const signPngDataUrl = async (swuSign, scale) => {
  const res = await signPng(swuSign, scale);
  return 'data:image/png;base64,' + res.toString('base64');
}

if (require.main === module) {
  if (process.argv[3]) {
    signPng(process.argv[2], {width: 100}).then( res => {
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
