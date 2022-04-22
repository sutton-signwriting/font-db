
const { columns } = require('@sutton-signwriting/core/swu');
const { columnSvg } = require('./swu-column-svg');
const fs = require('fs');
const path = require('path');

/**
 * Function that creates an array of SVG column images for an SWU text
 * @function swu.columnsSvg
 * @param {string} swuText - a text of SWU signs and punctuation
 * @param {ColumnOptions} options - an object of column options
 * @returns {string[]} array of svg columns
 * @example
 * const swuText = "𝠀񁲡񈩧𝠃𝤘𝤣񁲡𝣳𝣩񈩧𝤉𝣻 𝠀񃊢񃊫񋛕񆇡𝠃𝤘𝤧񃊫𝣻𝤕񃊢𝣴𝣼񆇡𝤎𝤂񋛕𝤆𝣦 񏌁𝣢𝤂";
 * const columnOptions = {"height": 250, "width": 150};
 * @example
 * // using promise.then
 * swu.columnsSvg(swuText, columnOptions).then( svgs => {
 *   console.log(svgs)
 * })
 * @example
 * // using async/await
 * const svgs = await swu.columnsSvg(swuText, columnOptions)
 */
const columnsSvg = async (swuText, options) => {
  const cols = columns(swuText, options);
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
  console.log("SWU Columns SVG\n");
  console.log("Usage: node swu/swu-columns-svg.js FswText [OutputFile] [Arguments]\n");
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
  const swuText = args._[0];
  let file = args._[1]
  if (!swuText || args.help) helpArgs();

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
  columnsSvg(swuText,args.options).then( svgs => {
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
