
const { db } = require('../db/db');
const { style, swu, convert } = require('@sutton-signwriting/core');
const fs = require('fs');

/**
 * Function that creates an SVG image from an SWU sign with an optional style string
 * @function swu.signSvg
 * @param {string} swuSign - an SWU sign with optional style string
 * @param {function} callback - a callback function with error and result parameters
 * @example
 * const callback = (error, result) => {
 *   if (error) {
 *     console.log(error)
 *   } else {
 *     console.log(result + " is '<svg...")
 *   }
 * }
 * 
 * swu.signSvg('𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭', callback )
 */
const signSvg = (swuSign, callback) => {
  let parsed = swu.parse.sign(swuSign);
  const blank = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>';
  if (parsed.spatials) {
    const symbols = parsed.spatials.map((spatial) => spatial.symbol);
    db.all(`select id, svg, width, height from symbol where id in (${symbols.map(s => convert.swu2id(s)).join(',')})`, (err, res) => {
      if (err) {
        callback(err, res);
      } else {
        if (!res) {
          callback(err, blank)
        } else {
          const symbols = res.reduce((obj, row) => {
            obj[convert.id2swu(row.id)] = row
            return obj;
          }, {})
          let styling = style.parse(parsed.style);

          if (styling.detailsym) {
            styling.detailsym.forEach(sym => {
              parsed.spatials[sym.index - 1].detail = sym.detail;
            })
          }

          let x1 = Math.min(...parsed.spatials.map(spatial => spatial.coord[0]));
          let y1 = Math.min(...parsed.spatials.map(spatial => spatial.coord[1]));
          let x2 = parsed.max[0];
          let y2 = parsed.max[1];

          if (styling.zoomsym) {
            styling.zoomsym.forEach(sym => {
              parsed.spatials[sym.index - 1].zoom = sym.zoom;
              if (sym.offset) {
                parsed.spatials[sym.index - 1].coord[0] += sym.offset[0];
                parsed.spatials[sym.index - 1].coord[1] += sym.offset[1];
              }
              x2 = Math.max(x2, (parsed.spatials[sym.index - 1].coord[0] + (symbols[parsed.spatials[sym.index - 1].symbol].width * sym.zoom)));
              y2 = Math.max(y2, (parsed.spatials[sym.index - 1].coord[1] + (symbols[parsed.spatials[sym.index - 1].symbol].height * sym.zoom)));
            })
          }

          let classes = '';
          if (styling.classes) {
            classes = ` class="${styling.classes}"`
          }
          let id = '';
          if (styling.id) {
            id = ` id="${styling.id}"`
          }

          let background = '';
          if (styling.padding) {
            x1 -= styling.padding;
            y1 -= styling.padding;
            x2 += styling.padding;
            y2 += styling.padding;
          }
          if (styling.background) {
            background = `\n  <rect x="${x1}" y="${y1}" width="${x2 - x1}" height="${y2 - y1}" style="fill:${styling.background};" />`
          }

          let sizing = '';
          if (styling.zoom != 'x') {
            sizing = ` width="${(x2 - x1) * (styling.zoom ? styling.zoom : 1)}" height="${(y2 - y1) * (styling.zoom ? styling.zoom : 1)}"`;
          }

          let svg = `<svg${classes}${id} version="1.1" xmlns="http://www.w3.org/2000/svg"${sizing} viewBox="${x1} ${y1} ${(x2 - x1)} ${(y2 - y1)}">
  <text font-size="0">${swuSign}</text>${background}`

          const line = styling.detail && styling.detail[0];
          const fill = styling.detail && styling.detail[1];

          svg += '\n' + parsed.spatials.map(spatial => {
            let svg = symbols[spatial.symbol] ? symbols[spatial.symbol].svg : '';

            let symLine = line;
            if (spatial.detail) {
              symLine = spatial.detail[0];
            } else if (styling.colorize) {
              symLine = swu.colorize(spatial.symbol);
            }
            if (symLine) {
              svg = svg.replace(/class="sym-line"/, `class="sym-line" fill="${symLine}"`);
            }

            let symFill = fill;
            if (spatial.detail && spatial.detail[1]) {
              symFill = spatial.detail[1];
            }
            if (symFill) {
              svg = svg.replace(/class="sym-fill" fill="#ffffff"/, `class="sym-fill" fill="${symFill}"`);
            }

            if (spatial.zoom) {
              svg = `<g transform="scale(${spatial.zoom})">${svg}</g>`;
            }

            return `  <svg x="${spatial.coord[0]}" y="${spatial.coord[1]}">${svg}</svg>`;

          }).join('\n');

          svg += '\n</svg>';
          callback(null, svg);
        }
      }
    })
  } else {
    callback(null, blank);
  }
}

if (require.main === module) {
  signSvg(process.argv[2], (err, res) => {
    if (process.argv[3]) {
      fs.writeFileSync(process.argv[3], res)
    } else {
      console.log(err || res);
    }
  })
} else {
  module.exports = { signSvg }
}
