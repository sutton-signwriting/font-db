
const { db } = require('./db/db');
const fsw = require('./fsw');
const swu = require('./swu');

module.exports = { db, fsw, swu }

/**
 * The elements of a style string
 * @typedef {object} StyleObject
 * @property {boolean} colorize - boolean to use standardized colors for symbol groups
 * @property {number} padding - integer value for padding around symbol or sign
 * @property {string} background - css name or hex color for background
 * @property {array} detail - array for css name or hex color for line and optional fill
 * @property {number} zoom - decimal value for zoom level
 * @property {object[]} detailsym - custom colors for individual symbols
 * @property {number} detailsym.index - symbol index in sign box
 * @property {array} detailsym.detail - array for css name or hex color for line and optional fill
 * @property {string} classes - list of class names separated with spaces used for SVG
 * @property {string} id - id name used for SVG
 */

/**
 * @typedef {object} ColumnOptions
 * @property {number} height - the height of the columns
 * @property {number} width - the widths of the columns
 * @property {number} offset - the lane offset for left and right lanes
 * @property {number} pad - amount of padding before and after signs as well as at top, left, and right of columns
 * @property {number} margin - amount of space at bottom of column that is not available
 * @property {boolean} dynamic - enables variable width columns
 * @property {string} background - background color for columns
 * @property {StyleObject} style - an object of style options
 * @property {object} punctuation - an object of punctuation options
 * @property {boolean} punctuation.spacing - enables special spacing for punctuation with no space above and custom space below
 * @property {number} punctuation.pad - the amount of spacing after a punctuation if punctuation spacing is enabled
 * @property {boolean} punctuation.pull - prevents line breaks before punctuation by reducing spacing between signs in a column
 */

/**
 * @typedef {ColumnSegment[]} ColumnData
 */

/**
 * @typedef {object} ColumnSegment
 * @property {number} x - the x position in the column
 * @property {number} y - the y position in the column
 * @property {number} minX - the min x value within the segment
 * @property {number} minY - the min y value within the segment
 * @property {number} width - the width of the text segment
 * @property {number} height - the height of the text segment
 * @property {number} lane - Left as -1, Middle as 0, Right as 1
 * @property {number} padding - the padding of the text segment affects colored background
 * @property {string} segment - "sign" or "symbol"
 * @property {string} text - the text of the sign or symbol with optional style string
 * @property {number} zoom - the zoom size of the segment
 */
