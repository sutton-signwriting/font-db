
/** The swu module contains functions for handling Formal SignWriitng in ASCII (SWU) characters.
 * [SWU characters definition](https://tools.ietf.org/id/draft-slevinski-formal-signwriting-07.html#rfc.section.2.2.2)
 * @module swu
 */

const { symbolSvg } = require('./swu-symbol-svg');
const { symbolPng, symbolPngDataUrl } = require('./swu-symbol-png');
const { symbolNormalize } = require('./swu-symbol-normalize');
const { signSvg } = require('./swu-sign-svg');
const { signPng, signPngDataUrl } = require('./swu-sign-png');
const { signNormalize } = require('./swu-sign-normalize');

module.exports = { symbolSvg, symbolPng, symbolPngDataUrl, symbolNormalize, signSvg, signPng, signPngDataUrl, signNormalize }
