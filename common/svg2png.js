
const { Resvg } = require('@resvg/resvg-js');

/**
 * Convert SVG to PNG
 * @param {string} svg SVG string
 * @param {{width?: number, height?: number}} scale Options for scaling
 * @returns {Promise<Buffer>} PNG buffer
 */
svg2png = function(svg, scale = {}) {
  const options = {};
  if (scale.width) {
    options.fitTo = {
      mode: 'width',
      value: scale.width
    };
  }
  if (scale.height) {
    options.fitTo = {
      mode: 'height',
      value: scale.height
    };
  }
  return new Promise(function (resolve, reject) {
    try {
      const resvg = new Resvg(svg, options);
      const pngData = resvg.render();
      const pngBuffer = pngData.asPng();
      resolve(pngBuffer);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { svg2png };