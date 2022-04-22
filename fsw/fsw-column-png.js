
const { svg2png } = require('../common/svg2png');
const { columnSvg } = require('./fsw-column-svg');
const fs = require('fs');

/**
 * Function that creates an PNG image for a column of FSW
 * @function fsw.columnPng
 * @param {ColumnData} fswColumn - an array of objects with information about FSW signs and punctuation
 * @param {ColumnOptions} options - an object of column options
 * @returns {ArrayBuffer} column png
 * @example
 * const columnData = [
 *   {"x":56,"y":20,"minX":481,"minY":471,"width":37,"height":58,"lane":0,"padding":0,"segment":"sign","text":"AS14c20S27106M518x529S14c20481x471S27106503x489","zoom":1},
 *   {"x":57,"y":118,"minX":482,"minY":468,"width":36,"height":65,"lane":0,"padding":0,"segment":"sign","text":"AS18701S1870aS2e734S20500M518x533S1870a489x515S18701482x490S20500508x496S2e734500x468","zoom":1},
 *   {"x":39,"y":203,"minX":464,"minY":496,"width":72,"height":8,"lane":0,"padding":0,"segment":"symbol","text":"S38800464x496","zoom":1}
 * ];
 * const columnOptions = {"height": 250, "width": 150};
 * @example
 * // using promise.then
 * fsw.columnPng(columnData, columnOptions).then( png => {
 *   console.log(png)
 * })
 * @example
 * // using async/await
 * const png = await fsw.columnPng(columnData, columnOptions)
 */
 const columnPng = async (fswColumn, options) => {
  let svg = await columnSvg(fswColumn, options);
  svg = svg.replace(/<text.*text>/g, "");
  const png = await svg2png(svg);
  return png;
}

/**
 * Function that creates a data url PNG image from an FSW sign with an optional style string
 * @function fsw.columnPngDataUrl
 * @param {string} fswSign - an FSW sign with optional style string
 * @returns {string} column png
 * @example
 * const columnData = [
 *   {"x":56,"y":20,"minX":481,"minY":471,"width":37,"height":58,"lane":0,"padding":0,"segment":"sign","text":"AS14c20S27106M518x529S14c20481x471S27106503x489","zoom":1},
 *   {"x":57,"y":118,"minX":482,"minY":468,"width":36,"height":65,"lane":0,"padding":0,"segment":"sign","text":"AS18701S1870aS2e734S20500M518x533S1870a489x515S18701482x490S20500508x496S2e734500x468","zoom":1},
 *   {"x":39,"y":203,"minX":464,"minY":496,"width":72,"height":8,"lane":0,"padding":0,"segment":"symbol","text":"S38800464x496","zoom":1}
 * ];
 * const columnOptions = {"height": 250, "width": 150};
 * @example
 * // using promise.then
 * fsw.columnPngDataUrl(columnData, columnOptions).then( png => {
 *   console.log(png)
 * })
 * @example
 * // using async/await
 * const png = await fsw.columnPngDataUrl(columnData, columnOptions)
 */
 const columnPngDataUrl = async (fswSign) => {
  const res = await columnPng(fswSign);
  return 'data:image/png;base64,' + res.toString('base64');
}

const parseArg = (val) => {
  try {
    return JSON.parse(val)
  } catch {
    return undefined
  }
}

const helpArgs = () => {
  console.log("FSW Column PNG\n")
  console.log("Usage: node fsw/fsw-column-png.js ColumnData [OutputFile] [Arguments]\n");
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
  if (file) {
    columnPng(segments,args.options).then( png => {
      fs.writeFileSync(file, png);
    })
  } else {
    columnPngDataUrl(segments,args.options).then( png => {
      console.log(png);
    })
  }
} else {
  module.exports = { columnPng, columnPngDataUrl }
}
