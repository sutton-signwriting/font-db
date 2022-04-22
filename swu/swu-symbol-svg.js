
const { db } = require('../db/db');
const { style, swu, convert } = require('@sutton-signwriting/core');
const { symbolNormalize } = require('./swu-symbol-normalize')
const fs = require('fs');

/**
 * Function that creates an SVG image from an SWU symbol key with an optional style string
 * @function swu.symbolSvgBody
 * @param {string} swuSym - an SWU symbol key with optional style string
 * @returns {string} symbol svg body
 * @example
 * // using promise.then
 * swu.symbolSvgBody('񀀁-C').then( svg => {
 *   console.log(svg)
 * })
 * @example
 * // using async/await
 * const svg = await swu.symbolSvgBody('񀀁-C')
 */
const symbolSvgBody = async (swuSym) => {
  const parsed = swu.parse.symbol(swuSym);
  const blank = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>';

  if (!parsed.symbol) return blank;

  const res = await db.query('select svg,width,height from symbol where id=?', [convert.swu2id(parsed.symbol)]);
  const sym = res[0];
  if (!sym) return blank;

  let styling = style.parse(parsed.style);

  let x1, y1, x2, y2;
  if (parsed.coord) {
    x1 = parsed.coord[0];
    y1 = parsed.coord[1];
    x2 = 500 + (500-x1);
    y2 = 500 + (500-y1);
  } else {
    x1 = parseInt( 500 - (sym.width+1)/2 );
    y1 = parseInt( 500 - (sym.height+1)/2 );
    x2 = 500 + (500-x1);
    y2 = 500 + (500-y1);
  }

  sym.svg = `  <svg x="${x1}" y="${y1}">${sym.svg}</svg>`;

  let line;
  if (styling.colorize) {
    line = swu.colorize(parsed.symbol);
  } else if (styling.detail) {
    line = styling.detail[0]
  }
  if (line) {
    sym.svg = sym.svg.replace(/class="sym-line"/, `class="sym-line" fill="${line}"`);
  }

  let fill = styling.detail && styling.detail[1];
  if (fill) {
    sym.svg = sym.svg.replace(/class="sym-fill" fill="#ffffff"/, `class="sym-fill" fill="${fill}"`);
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

  return `  <text font-size="0">${swuSym}</text>${background}
${sym.svg}`;
}

/**
 * Function that creates an SVG image from an SWU symbol key with an optional style string
 * @function swu.symbolSvg
 * @param {string} swuSym - an SWU symbol key with optional style string
 * @returns {string} symbol svg
 * @example
 * // using promise.then
 * swu.symbolSvg('񀀁-C').then( svg => {
 *   console.log(svg)
 * })
 * @example
 * // using async/await
 * const svg = await swu.symbolSvg('񀀁-C')
 */
 const symbolSvg = async (swuSym) => {
  let parsed = swu.parse.symbol(swuSym);
  const blank = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>';
  if (!parsed.symbol) return blank;

  if (!parsed.coord) {
    norm = await symbolNormalize(swuSym);
    parsed = swu.parse.symbol(norm);
    if (!parsed.symbol) return blank;
  }

  let styling = style.parse(parsed.style);

  let x1, y1, x2, y2;
  x1 = parsed.coord[0];
  y1 = parsed.coord[1];
  x2 = 500 + (500-x1);
  y2 = 500 + (500-y1);

  let classes = '';
  if (styling.classes) {
    classes = ` class="${styling.classes}"`
  }
  let id = '';
  if (styling.id) {
    id = ` id="${styling.id}"`
  }

  if (styling.padding) {
    x1 -= styling.padding;
    y1 -= styling.padding;
    x2 += styling.padding;
    y2 += styling.padding;
  }

  let sizing = '';
  if (styling.zoom != 'x') {
    sizing = ` width="${(x2 - x1) * (styling.zoom ? styling.zoom : 1)}" height="${(y2 - y1) * (styling.zoom ? styling.zoom : 1)}"`;
  }

  let svg = `<svg${classes}${id} version="1.1" xmlns="http://www.w3.org/2000/svg"${sizing} viewBox="${x1} ${y1} ${(x2 - x1)} ${(y2 - y1)}">
`

  const body = await symbolSvgBody(swuSym);

  return svg + body + '\n</svg>';
}

if (require.main === module) {
  symbolSvg(process.argv[2]).then( res => {
    if (process.argv[3]) {
      fs.writeFileSync(process.argv[3], res)
    } else {
      console.log(res);
    }
  })
} else {
  module.exports = { symbolSvgBody, symbolSvg }
}
