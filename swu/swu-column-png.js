
const { svg2png } = require('../common/svg2png');
const { columnSvg } = require('./swu-column-svg');
const fs = require('fs');

/**
 * Function that creates an PNG image for a column of SWU
 * @function swu.columnPng
 * @param {ColumnData} swuColumn - an array of objects with information about SWU signs and punctuation
 * @param {ColumnOptions} options - an object of column options
 * @returns {ArrayBuffer} column png
 * @example
 * const columnData = [
 *   {"x":56,"y":20,"minX":481,"minY":471,"width":37,"height":58,"lane":0,"padding":0,"segment":"sign","text":"𝠀񁲡񈩧𝠃𝤘𝤣񁲡𝣳𝣩񈩧𝤉𝣻","zoom":1},
 *   {"x":57,"y":118,"minX":482,"minY":468,"width":36,"height":65,"lane":0,"padding":0,"segment":"sign","text":"𝠀񃊢񃊫񋛕񆇡𝠃𝤘𝤧񃊫𝣻𝤕񃊢𝣴𝣼񆇡𝤎𝤂񋛕𝤆𝣦","zoom":1},
 *   {"x":39,"y":203,"minX":464,"minY":496,"width":72,"height":8,"lane":0,"padding":0,"segment":"symbol","text":"񏌁𝣢𝤂","zoom":1}
 * ];
 * const columnOptions = {"height": 250, "width": 150};
 * @example
 * // using promise.then
 * swu.columnPng(columnData, columnOptions).then( png => {
 *   console.log(png)
 * })
 * @example
 * // using async/await
 * const png = await swu.columnPng(columnData, columnOptions)
 */
 const columnPng = async (swuColumn, options) => {
  let svg = await columnSvg(swuColumn, options);
  svg = svg.replace(/<text.*text>/g, "");
  const png = await svg2png(svg);
  return png;
}

/**
 * Function that creates a data url PNG image from an SWU sign with an optional style string
 * @function swu.columnPngDataUrl
 * @param {string} swuSign - an SWU sign with optional style string
 * @returns {string} column png
 * @example
 * const columnData = [
 *   {"x":56,"y":20,"minX":481,"minY":471,"width":37,"height":58,"lane":0,"padding":0,"segment":"sign","text":"𝠀񁲡񈩧𝠃𝤘𝤣񁲡𝣳𝣩񈩧𝤉𝣻","zoom":1},
 *   {"x":57,"y":118,"minX":482,"minY":468,"width":36,"height":65,"lane":0,"padding":0,"segment":"sign","text":"𝠀񃊢񃊫񋛕񆇡𝠃𝤘𝤧񃊫𝣻𝤕񃊢𝣴𝣼񆇡𝤎𝤂񋛕𝤆𝣦","zoom":1},
 *   {"x":39,"y":203,"minX":464,"minY":496,"width":72,"height":8,"lane":0,"padding":0,"segment":"symbol","text":"񏌁𝣢𝤂","zoom":1}
 * ];
 * const columnOptions = {"height": 250, "width": 150};
 * @example
 * // using promise.then
 * swu.columnPngDataUrl(columnData, columnOptions).then( png => {
 *   console.log(png)
 * })
 * @example
 * // using async/await
 * const png = await swu.columnPngDataUrl(columnData, columnOptions)
 */
const columnPngDataUrl = async (swuSign) => {
  const res = await columnPng(swuSign);
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
  console.log("SWU Column PNG\n")
  console.log("Usage: node swu/swu-column-png.js ColumnData [OutputFile] [Arguments]\n");
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
