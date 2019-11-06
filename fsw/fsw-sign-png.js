
const svg2img = require('svg2img');
const { signSvg } = require('./fsw-sign-svg');
const fs = require('fs');

/**
 * Function that creates a binary PNG image from an FSW sign with an optional style string
 * @function fsw.signPng
 * @param {string} fswSign - an FSW sign with optional style string
 * @param {function} callback - a callback function with error and result parameters
 * @example
 * const callback = (error, result) => {
 *   if (error) {
 *     console.log(error)
 *   } else {
 *     console.log(result + " is '<Buffer 89 50 4e 47...")
 *   }
 * }
 * 
 * fsw.signPng('M525x535S2e748483x510S10011501x466S20544510x500S10019476x475', callback )
 */
const signPng = (fswSign, callback) => {
  signSvg(fswSign, (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      res = res.replace(/<text.*text>/g, "");
      svg2img(res, (error, buffer) => {
        if (error) {
          callback(error, null);
        } else {
          callback(error, buffer);
        }
      })
    }
  })
}

/**
 * Function that creates a data url PNG image from an FSW sign with an optional style string
 * @function fsw.signPngDataUrl
 * @param {string} fswSign - an FSW sign with optional style string
 * @param {function} callback - a callback function with error and result parameters
 * @example
 * const callback = (error, result) => {
 *   if (error) {
 *     console.log(error)
 *   } else {
 *     console.log(result + " is 'data:image/png;base64,iVBORw...")
 *   }
 * }
 * 
 * fsw.signPngDataUrl('M525x535S2e748483x510S10011501x466S20544510x500S10019476x475', callback )
 */
const signPngDataUrl = (fswSign, callback) => {
  signPng(fswSign, (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(err, 'data:image/png;base64,' + res.toString('base64'));
    }
  })
}

if (require.main === module) {
  if (process.argv[3]) {
    signPng(process.argv[2], (err, res) => {
      if (err) {
        console.log(err)
      } else {
        fs.writeFileSync(process.argv[3], res);
      }
    })
  } else {
    signPngDataUrl(process.argv[2], (err, res) => {
      console.log(err || res)
    })
  }
} else {
  module.exports = { signPng, signPngDataUrl }
}
