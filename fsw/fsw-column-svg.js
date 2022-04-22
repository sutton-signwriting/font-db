
const { style, fsw } = require('@sutton-signwriting/core');
const { signSvgBody } = require('./fsw-sign-svg');
const { symbolSvgBody } = require('./fsw-symbol-svg');
const fs = require('fs');

/**
 * Function that creates an SVG image for a column of FSW
 * @function fsw.columnSvg
 * @param {ColumnData} fswColumn - an array of objects with information about FSW signs and punctuation
 * @param {ColumnOptions} options - an object of column options
 * @returns {string} column svg
 * @example
 * const columnData = [
 *   {"x":56,"y":20,"minX":481,"minY":471,"width":37,"height":58,"lane":0,"padding":0,"segment":"sign","text":"AS14c20S27106M518x529S14c20481x471S27106503x489","zoom":1},
 *   {"x":57,"y":118,"minX":482,"minY":468,"width":36,"height":65,"lane":0,"padding":0,"segment":"sign","text":"AS18701S1870aS2e734S20500M518x533S1870a489x515S18701482x490S20500508x496S2e734500x468","zoom":1},
 *   {"x":39,"y":203,"minX":464,"minY":496,"width":72,"height":8,"lane":0,"padding":0,"segment":"symbol","text":"S38800464x496","zoom":1}
 * ];
 * const columnOptions = {"height": 250, "width": 150};
 * @example
 * // using promise.then
 * fsw.columnSvg(columnData, columnOptions).then( svg => {
 *   console.log(svg)
 * })
 * @example
 * // using async/await
 * const svg = await fsw.columnSvg(columnData, columnOptions)
 */
const columnSvg = async (fswColumn, options) => {
  const blank = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>';
  //if (typeof fswColumn !== 'array') return blank;
  const values = fsw.columnDefaultsMerge(options);
  let x1 = 0;
  let y1 = 0;
  let x2 = values.width;
  let y2 = values.height;

  let background = '';
  if (values.background) {
    background = `  <rect x="${x1}" y="${y1}" width="${x2 - x1}" height="${y2 - y1}" style="fill:${values.background};" />\n`
  }

  let sizing = ` width="${values.width}" height="${values.height}"`;

  let svg = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg"${sizing} viewBox="${x1} ${y1} ${(x2 - x1)} ${(y2 - y1)}">
${background}`

  for (let i=0; i<fswColumn.length; i++){
    item = fswColumn[i];
    const dash = item.text.indexOf('-')
    if (dash>0) {
      const itemStyle = item.text.substring(dash);
      const newStyle = {
        ...values.style,
        ...parseStyle(itemStyle)
      };
      item.text = item.text.replace(itemStyle,style.compose(newStyle));
    } else {
      item.text += style.compose(values.style);
    }
    item.zoom = item.zoom * values.style.zoom;

    svg += '<g transform="translate(' + (item.x) + ',' + (item.y) + ') scale(' + item.zoom + ') translate(' + (-item.minX) + ',' + (-item.minY) + ') ">\n';
    if (item.segment=="sign"){
      svg += await signSvgBody(item.text)
    } else {
      svg += await symbolSvgBody(item.text)
    }
    svg += '\n</g>\n';
  }

  svg += '</svg>';

  return svg;
}

const parseArg = (val) => {
  try {
    return JSON.parse(val)
  } catch {
    return undefined
  }
}

const helpArgs = () => {
  console.log("FSW Column SVG\n")
  console.log("Usage: node fsw/fsw-column-svg.js ColumnData [OutputFile] [Arguments]\n");
  console.log("ColumnData");
  console.log("  https://www.sutton-signwriting.io/core/#columndata\n");
  console.log("StyleObject");
  console.log("  https://www.sutton-signwriting.io/core/#styleobject\n");
  console.log("Arguments for ColumnOptions used to create ColumnData");
  console.log("--height         the height of the column");
  console.log("--width          the width of the column");
  console.log("--offset         the lane offset for left and right lanes");
  console.log("--pad            amount of padding before and after signs as well as at top, left, and right of column");
  console.log("--margin         amount of space at bottom of column that is not available");
  console.log("--dynamic        enables variable width column");
  console.log("--background     background color for column");
  console.log("--style          an object of style options for signs");
  console.log("--puncuation     an object of punctuation options");
  process.exit(1);
}

if (require.main === module) {
  const args = require('minimist')(process.argv.slice(2));
  const segments = parseArg(args._[0]);
  const file = args._[1];
  if (!segments || args.help) helpArgs();

  args.style = parseArg(args["style"]);
  args.punctuation = parseArg(args["punctuation"]);
  args.detail = parseArg(args["detail"]);

  args.options = parseArg(args["options"]);
  args.options = (typeof args.options == 'object')?args.options:{};
  Object.keys(args).map((key)=>{
    switch (key) {
      case '_':
      case 'options':
        break;
      default:
        args.options[key] = args[key]
    }
  })
  columnSvg(segments,args.options).then( svg => {
    if (file) {
      fs.writeFileSync(file, svg);
    } else {
      console.log(svg);
    }
  })
} else {
  module.exports = { columnSvg }
}
