
const { svg2png } = require('../common/svg2png');
const { columnsSvg } = require('./swu-columns-svg');
const fs = require('fs');
const path = require('path');

/**
 * Function that creates an array of PNG column images for an SWU text
 * @function swu.columnsPng
 * @param {string} swuText - a text of SWU signs and punctuation
 * @param {ColumnOptions} options - an object of column options
 * @returns {ArrayBuffer[]} array of PNG data urls
 * @example
 * const swuText = "𝠀񁲡񈩧𝠃𝤘𝤣񁲡𝣳𝣩񈩧𝤉𝣻 𝠀񃊢񃊫񋛕񆇡𝠃𝤘𝤧񃊫𝣻𝤕񃊢𝣴𝣼񆇡𝤎𝤂񋛕𝤆𝣦 񏌁𝣢𝤂";
 * const columnOptions = {"height": 250, "width": 150};
 * @example
 * // using promise.then
 * swu.columnsPng(swuText, columnOptions).then( pngs => {
 *   console.log(pngs)
 * })
 * @example
 * // using async/await
 * const pngs = await swu.columnsPng(swuText, columnOptions)
 */
const columnsPng = async (swuText, options) => {
  const svgs = await columnsSvg(swuText,options);
  let pngs = [];
  for (let i=0; i<svgs.length; i++){
    let svg = svgs[i].replace(/<text.*text>/g, "");
    pngs.push(await svg2png(svg));
  }
  return pngs;
}

/**
 * Function that creates an array of PNG column images for an SWU text
 * @function swu.columnsPngDataUrl
 * @param {string} swuText - a text of SWU signs and punctuation
 * @param {ColumnOptions} options - an object of column options
 * @returns {string[]} array of PNG data urls
 * @example
 * const swuText = "𝠀񁲡񈩧𝠃𝤘𝤣񁲡𝣳𝣩񈩧𝤉𝣻 𝠀񃊢񃊫񋛕񆇡𝠃𝤘𝤧񃊫𝣻𝤕񃊢𝣴𝣼񆇡𝤎𝤂񋛕𝤆𝣦 񏌁𝣢𝤂";
 * const columnOptions = {"height": 250, "width": 150};
 * @example
 * // using promise.then
 * swu.columnsPng(swuText, columnOptions).then( pngs => {
 *   console.log(pngs)
 * })
 * @example
 * // using async/await
 * const pngs = await swu.columnsPng(swuText, columnOptions)
 */
 const columnsPngDataUrl = async (swuText, options) => {
  const pngs = await columnsPng(swuText, options);
  return pngs.map ( png => 'data:image/png;base64,' + png.toString('base64'));
}

const parseArg = (val) => {
  try {
    return JSON.parse(val)
  } catch {
    return undefined
  }
}

const helpArgs = () => {
  console.log("SWU Columns PNG\n")
  console.log("Usage: node swu/swu-columns-png.js FswText [OutputFile] [Arguments]\n");
  console.log("ColumnOptions");
  console.log("  https://www.sutton-signwriting.io/core/#columnoptions\n");
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
  const swuText = args._[0];
  let file = args._[1];
  let ext;
  if (file) {
    ext = path.extname(file);
    if (!ext) {
      ext = ".png";
      file += ext;
    }
  }

  if (!swuText || args.help) helpArgs();

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
    columnsPng(swuText,args.options).then( pngs => {
      pngs.map( (png,i) => {
        const out = file.replace(ext,"-" + (1+i) + ext);
        fs.writeFileSync(out, png);
      })
    })
  } else {
    columnsPngDataUrl(swuText,args.options).then( pngs => {
      pngs.map( (png,i) => {
        console.log("========== PNG Column " + (1+i) + " ==========")
        console.log(png);
      })
    })
  }
} else {
  module.exports = { columnsPng, columnsPngDataUrl }
}
