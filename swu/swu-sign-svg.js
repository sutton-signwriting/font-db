
const { db } = require('../db/db');
const { style, swu, convert } = require('@sutton-signwriting/core');
const fs = require('fs');

/**
 * Function that creates an SVG image from an SWU sign with an optional style string
 * @function swu.signSvgBody
 * @param {string} swuSign - an SWU sign with optional style string
 * @returns {string} sign svg body
 * @example
 * // using promise.then
 * swu.signSvgBody('𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭').then( svg => {
 *   console.log(svg)
 * })
 * @example
 * // using async/await
 * const svg = await swu.signSvgBody('𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭')
 */
const signSvgBody = async (swuSign) => {
  let parsed = swu.parse.sign(swuSign);
  const blank = '';
  if (!parsed.spatials) return blank;
  const symlist = parsed.spatials.map((spatial) => spatial.symbol);
  const res = await db.query(`select id, svg, width, height from symbol where id in (${symlist.map(s => convert.swu2id(s)).join(',')})`);
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

  let svg = `  <text font-size="0">${swuSign}</text>${background}`

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

    return `  <svg x="${spatial.coord[0]}" y="${spatial.coord[1]}">${svg}</svg>`;

  }).join('\n');

  return svg;
}

/**
 * Function that creates an SVG image from an SWU sign with an optional style string
 * @function swu.signSvg
 * @param {string} swuSign - an SWU sign with optional style string
 * @returns {string} sign svg
 * @example
 * // using promise.then
 * swu.signSvg('𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭').then( svg => {
 *   console.log(svg)
 * })
 * @example
 * // using async/await
 * const svg = await swu.signSvg('𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭')
 */
 const signSvg = async (swuSign) => {
  let parsed = swu.parse.sign(swuSign);
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

  const body = await signSvgBody(swuSign);

  return svg + body + '\n</svg>';
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
