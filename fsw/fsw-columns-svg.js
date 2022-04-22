
const { columns } = require('@sutton-signwriting/core/fsw');
const { columnSvg } = require('./fsw-column-svg');
const fs = require('fs');
const path = require('path');

/**
 * Function that creates an array of SVG column images for an FSW text
 * @function fsw.columnsSvg
 * @param {string} fswText - a text of FSW signs and punctuation
 * @param {ColumnOptions} options - an object of column options
 * @returns {string[]} array of svg columns
 * @example
 * const fswText = "AS14c20S27106M518x529S14c20481x471S27106503x489 AS18701S1870aS2e734S20500M518x533S1870a489x515S18701482x490S20500508x496S2e734500x468 S38800464x496";
 * const columnOptions = {"height": 250, "width": 150};
 * @example
 * // using promise.then
 * fsw.columnsSvg(fswText, columnOptions).then( svgs => {
 *   console.log(svgs)
 * })
 * @example
 * // using async/await
 * const svgs = await fsw.columnsSvg(fswText, columnOptions)
 */
const columnsSvg = async (fswText, options) => {
  const cols = columns(fswText, options);
  let svgs = [];
  for (let i=0; i<cols.columns.length; i++){
    svgs.push(await columnSvg(cols.columns[i],{...cols.options,...{width:cols.widths[i]}}));
  }
  return svgs;
}

const parseArg = (val) => {
  try {
    return JSON.parse(val)
  } catch {
    return undefined
  }
}

const helpArgs = () => {
  console.log("FSW Columns SVG\n");
  console.log("Usage: node fsw/fsw-columns-svg.js FswText [OutputFile] [Arguments]\n");
  console.log("ColumnOptions");
  console.log("  https://www.sutton-signwriting.io/core/#columnoptions\n");
  console.log("StyleObject");
  console.log("  https://www.sutton-signwriting.io/core/#styleobject\n");
  console.log("Arguments for ColumnOptions");
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
  const fswText = args._[0];
  let file = args._[1]
  if (!fswText || args.help) helpArgs();

  args.style = parseArg(args["style"])
  args.punctuation = parseArg(args["punctuation"])
  args.detail = parseArg(args["detail"])

  args.options = parseArg(args["options"])
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
  columnsSvg(fswText,args.options).then( svgs => {
    if (file) {
      let ext = path.extname(file);
      if (!ext) {
        ext = ".svg";
        file += ext;
      }
      svgs.map( (svg,i) => {
        const out = file.replace(ext,"-" + (1+i) + ext);
        fs.writeFileSync(out, svg);
      })
    } else {
      svgs.map( (svg,i) => {
        console.log("========== SVG Column " + (1+i) + " ==========")
        console.log(svg);
      })
    }
  })

} else {
  module.exports = { columnsSvg }
}
