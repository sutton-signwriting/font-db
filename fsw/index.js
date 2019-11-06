
/** The fsw module contains functions for handling Formal SignWriitng in ASCII (FSW) characters.
 * [FSW characters definition](https://tools.ietf.org/id/draft-slevinski-formal-signwriting-07.html#rfc.section.2.2.1)
 * @module fsw
 */

const { symbolSvg } = require('./fsw-symbol-svg');
const { symbolPng, symbolPngDataUrl } = require('./fsw-symbol-png');
const { symbolNormalize } = require('./fsw-symbol-normalize');
const { signSvg } = require('./fsw-sign-svg');
const { signPng, signPngDataUrl } = require('./fsw-sign-png');
const { signNormalize } = require('./fsw-sign-normalize');

module.exports = { symbolSvg, symbolPng, symbolPngDataUrl, symbolNormalize, signSvg, signPng, signPngDataUrl, signNormalize }
