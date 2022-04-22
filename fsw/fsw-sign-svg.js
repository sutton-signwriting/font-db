
const { db } = require('../db/db');
const { style, fsw } = require('@sutton-signwriting/core');
const fs = require('fs');

/**
 * Function that creates an SVG image from an FSW sign with an optional style string
 * @function fsw.signSvgBody
 * @param {string} fswSign - an FSW sign with optional style string
 * @returns {string} sign svg body
 * @example
 * // using promise.then
 * fsw.signSvgBody('M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475').then( svg => {
 *   console.log(svg)
 * })
 * @example
 * // using async/await
 * const svg = await fsw.signSvgBody('M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475')
 */
const signSvgBody = async (fswSign) => {
  let parsed = fsw.parse.sign(fswSign);
  const blank = '';
  if (!parsed.spatials) return blank;

  const symlist = parsed.spatials.map((spatial) => spatial.symbol);
  const res= await db.query(`select symkey, svg, width, height from symbol where symkey in ("${symlist.join('","')}")`);
  const symbols = res.reduce((obj, row) => {
    obj[row.symkey] = row
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

  let svg = `  <text font-size="0">${fswSign}</text>${background}`

  const line = styling.detail && styling.detail[0];
  const fill = styling.detail && styling.detail[1];

  svg += '\n' + parsed.spatials.map(spatial => {
    let svg = symbols[spatial.symbol] ? symbols[spatial.symbol].svg : '';

    let symLine = line;
    if (spatial.detail) {
      symLine = spatial.detail[0];
    } else if (styling.colorize) {
      symLine = fsw.colorize(spatial.symbol);
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

    return `  <svg x="${spatial.coord[0]}" y="${spatial.coord[1]}">${svg}</svg>`;

  }).join('\n');

  return svg;
}

/**
 * Function that creates an SVG image from an FSW sign with an optional style string
 * @function fsw.signSvg
 * @param {string} fswSign - an FSW sign with optional style string
 * @returns {string} sign svg
 * @example
 * // using promise.then
 * fsw.signSvg('M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475').then( svg => {
 *   console.log(svg)
 * })
 * @example
 * // using async/await
 * const svg = await fsw.signSvg('M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475')
 */
 const signSvg = async (fswSign) => {
  let parsed = fsw.parse.sign(fswSign);
  const blank = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>';
  if (!parsed.spatials) return blank;

  let styling = style.parse(parsed.style);

  let x1 = Math.min(...parsed.spatials.map(spatial => spatial.coord[0]));
  let y1 = Math.min(...parsed.spatials.map(spatial => spatial.coord[1]));
  let x2 = parsed.max[0];
  let y2 = parsed.max[1];

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

  const body = await signSvgBody(fswSign);

  return svg + body + '\n</svg>'
}

if (require.main === module) {
  signSvg(process.argv[2]).then( res => {
    if (process.argv[3]) {
      fs.writeFileSync(process.argv[3], res)
    } else {
      console.log(res);
    }
  })
} else {
  module.exports = { signSvgBody, signSvg }
}
