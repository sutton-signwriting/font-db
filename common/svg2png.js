
const svg2img = require('svg2img');

svg2png = function(svg) {
  return new Promise(function (resolve, reject) {
    svg2img(svg, (error, buffer) => {
      if (error)
        reject(error);
      else
        resolve(buffer);
    });
  });
}

module.exports = { svg2png };