
const svg2img = require('svg2img');
const { signSvg } = require('./swu-sign-svg');
const fs = require('fs');

/**
 * Function that creates a binary PNG image from an SWU sign with an optional style string
 * @function swu.signPng
 * @param {string} swuSign - an SWU sign with optional style string
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
 * swu.signPng('𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񆈥𝤐𝤆񀀚𝣮𝣭', callback )
 */
const signPng = (swuSign, callback) => {
  signSvg(swuSign, (err, res) => {
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
 * Function that creates a data url PNG image from an SWU sign with an optional style string
 * @function swu.signPngDataUrl
 * @param {string} swuSign - an SWU sign with optional style string
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
 * swu.signPngDataUrl('𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񆈥𝤐𝤆񀀚𝣮𝣭', callback )
 */
const signPngDataUrl = (swuSign, callback) => {
  signPng(swuSign, (err, res) => {
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
