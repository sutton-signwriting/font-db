
const { db } = require('../db/db');
const { style, swu, convert } = require('@sutton-signwriting/core');
const fs = require('fs');

/**
 * Function that creates an SVG image from an SWU symbol key with an optional style string
 * @function swu.symbolSvg
 * @param {string} swuSym - an SWU symbol key with optional style string
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
 * swu.symbolSvg('񀀁', callback )
 */
const symbolSvg = (swuSym, callback) => {
  const parsed = swu.parse.symbol(swuSym);
  const blank = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>';
  if (parsed.symbol) {
    db.get('select svg,width,height from symbol where id=?', [convert.swu2id(parsed.symbol)], (err, res) => {
      if (err) {
        callback(err, res);
      } else {
        if (!res) {
          callback(err, blank)
        } else {
          let styling = style.parse(parsed.style);

          let line;
          if (styling.colorize) {
            line = swu.colorize(parsed.symbol);
          } else if (styling.detail) {
            line = styling.detail[0]
          }
          if (line) {
            res.svg = res.svg.replace(/class="sym-line"/, `class="sym-line" fill="${line}"`);
          }

          let fill = styling.detail && styling.detail[1];
          if (fill) {
            res.svg = res.svg.replace(/class="sym-fill" fill="#ffffff"/, `class="sym-fill" fill="${fill}"`);
          }

          let x1 = 500;
          let y1 = 500;
          let background = '';
          if (styling.padding) {
            x1 -= styling.padding;
            y1 -= styling.padding;
            res.width += styling.padding * 2;
            res.height += styling.padding * 2;
          }
          if (styling.background) {
            background = `\n  <rect x="${x1}" y="${y1}" width="${res.width}" height="${res.height}" style="fill:${styling.background};" />`
          }
          let sizing = '';
          if (styling.zoom != 'x') {
            sizing = ` width="${res.width * (styling.zoom ? styling.zoom : 1)}" height="${res.height * (styling.zoom ? styling.zoom : 1)}"`;
          }

          let classes = '';
          if (styling.classes) {
            classes = ` class="${styling.classes}"`
          }
          let id = '';
          if (styling.id) {
            id = ` id="${styling.id}"`
          }
          callback(null, `<svg${classes}${id} version="1.1" xmlns="http://www.w3.org/2000/svg"${sizing} viewBox="${x1} ${y1} ${res.width} ${res.height}">
  <text font-size="0">${swuSym}</text>${background}
  <svg x="500" y="500">${res.svg}</svg>
</svg>`);
        }
      }
    })
  } else {
    callback(null, blank);
  }
}

if (require.main === module) {
  symbolSvg(process.argv[2], (err, res) => {
    if (process.argv[3]) {
      fs.writeFileSync(process.argv[3], res)
    } else {
      console.log(err || res);
    }
  })
} else {
  module.exports = { symbolSvg }
}
