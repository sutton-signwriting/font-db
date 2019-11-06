
const { db } = require('../db/db');
const { swu, convert } = require('@sutton-signwriting/core');

const blank = null;

/**
 * Function that normalizes an SWU sign for a center of 500,500
 * @function swu.signNormalize
 * @param {string} swuSign - an SWU sign with optional style string
 * @param {function} callback - a callback function with error and result parameters
 * @example
 * const callback = (error, result) => {
 *   if (error) {
 *     console.log(error)
 *   } else {
 *     console.log(result + " is '𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭'")
 *   }
 * }
 * 
 * swu.signNormalize('𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭', callback )
 */
const signNormalize = (swuSign, callback) => {
  const parsed = swu.parse.sign(swuSign);
  if (parsed.spatials) {
    const symbols = parsed.spatials.map((spatial) => spatial.symbol);
    db.all(`select id, width, height from symbol where id in (${symbols.map(s => convert.swu2id(s)).join(',')})`, (err, res) => {
      if (err) {
        callback(err, res);
      } else {
        if (!res) {
          callback(err, null)
        } else {
          const symbolsizes = res.reduce((obj, row) => {
            obj[convert.id2swu(row.id)] = row
            return obj;
          }, {})
          const bbox = (symbols) => {
            const x1 = Math.min(...symbols.map(spatial => spatial.coord[0]));
            const y1 = Math.min(...symbols.map(spatial => spatial.coord[1]));
            const x2 = Math.max(...symbols.map(spatial => spatial.coord[0] + parseInt(symbolsizes[spatial.symbol].width)));
            const y2 = Math.max(...symbols.map(spatial => spatial.coord[1] + parseInt(symbolsizes[spatial.symbol].height)));
            return {
              x1: x1,
              y1: y1,
              x2: x2,
              y2: y2
            };
          }

          const hrange = swu.ranges['hcenter'];
          const hsyms = parsed.spatials.filter((spatial) => {
            const dec = parseInt(spatial.symbol.slice(1, 4), 16);
            return (hrange[0] <= dec && hrange[1] >= dec);
          })

          const vrange = swu.ranges['vcenter'];
          const vsyms = parsed.spatials.filter((spatial) => {
            const dec = parseInt(spatial.symbol.slice(1, 4), 16);
            return (vrange[0] <= dec && vrange[1] >= dec);
          })

          let abox = bbox(parsed.spatials);
          let max = [abox.x2, abox.y2];
          if (hsyms.length) {
            const hbox = bbox(hsyms);
            abox.x1 = hbox.x1;
            abox.x2 = hbox.x2;
          }
          if (vsyms.length) {
            const vbox = bbox(vsyms);
            abox.y1 = vbox.y1;
            abox.y2 = vbox.y2;
          }

          const offset = [parseInt((abox.x2 + abox.x1) / 2) - 500, parseInt((abox.y2 + abox.y1) / 2) - 500]
          const swuout = (parsed.sequence ? '𝠀' + parsed.sequence.join('') : '') +
            parsed.box + convert.coord2swu([max[0] - offset[0], max[1] - offset[1]]) +
            parsed.spatials.map(spatial => spatial.symbol + convert.coord2swu([spatial.coord[0] - offset[0], spatial.coord[1] - offset[1]])).join('') +
            (parsed.style || '');

          callback(null, swuout);
        }
      }
    })
  } else {
    callback(null, null);
  }
}

if (require.main === module) {
  signNormalize(process.argv[2], (err, res) => {
    console.log(err || res);
  })
} else {
  module.exports = { signNormalize }
}
