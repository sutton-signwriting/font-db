
const { signSvg } = require('./fsw-sign-svg');

it('should handle a stylized size', async () => {
  const svg = await signSvg('AS10011S10019S2e704S2e748M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475-CP10G_blue_D_red,Cyan_Z1.5-D01_blue_D02_yellow,green_-primary blinking!cursor!');
  expect(svg).toEqual(`<svg class="primary blinking" id="cursor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="103.5" height="133.5" viewBox="466 456 69 89">
  <text font-size="0">AS10011S10019S2e704S2e748M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475-CP10G_blue_D_red,Cyan_Z1.5-D01_blue_D02_yellow,green_-primary blinking!cursor!</text>
  <rect x="466" y="456" width="69" height="89" style="fill:blue;" />
  <svg x="483" y="510"><g transform="translate(0.149365953647,24.738779916) scale(0.00971920231764,-0.00983613696638)"><path class="sym-fill" fill="Cyan" d="M895 1350 l-150 -150 305 0 305 0 -150 150 c-82 83 -152 150 -155 150 -3 0 -73 -67 -155 -150z"/><path class="sym-line" fill="blue" d="M345 2481 c-157 -72 -271 -271 -325 -565 -18 -101 -20 -153 -20 -666 0 -513 2 -565 20 -666 54 -294 168 -493 325 -565 59 -27 351 -27 410 0 208 96 345 425 345 828 l0 153 -100 0 -100 0 0 -42 c0 -24 -5 -119 -10 -211 -17 -297 -76 -508 -167 -602 -68 -70 -145 -37 -205 87 -92 189 -118 411 -118 1018 0 607 26 829 118 1018 132 271 314 70 364 -403 l12 -115 103 0 103 0 -6 58 c-34 316 -166 586 -326 666 -50 25 -60 26 -217 26 -140 0 -172 -3 -206 -19z M770 1375 l-275 -275 555 0 555 0 -275 275 c-151 151 -277 275 -280 275 -3 0 -129 -124 -280 -275z m435 -25 l150 -150 -305 0 -305 0 150 150 c82 83 152 150 155 150 3 0 73 -67 155 -150z"/></g></svg>
  <svg x="501" y="466"><g transform="translate(0.0827624000386,29.8972374025) scale(0.00988338120185,-0.00991626663417)"><path class="sym-fill" fill="green" d="M601 1204 l-191 -197 42 -46 c23 -25 182 -189 353 -365 l310 -318 193 197 193 198 -128 131 c-71 72 -230 236 -355 363 l-226 233 -191 -196z"/><path class="sym-line" fill="yellow" d="M76 2931 l-69 -69 486 -498 485 -498 -371 -381 c-204 -209 -393 -403 -419 -431 l-49 -51 481 -494 c264 -272 487 -494 495 -494 8 0 231 222 495 494 l481 494 -49 51 c-152 158 -1893 1946 -1895 1946 -2 0 -33 -31 -71 -69z m1020 -1838 c165 -170 324 -334 353 -365 l54 -58 -188 -192 c-104 -106 -194 -193 -200 -193 -12 0 -696 698 -703 716 -4 9 367 398 379 399 3 0 140 -138 305 -307z"/></g></svg>
  <svg x="510" y="500"><g transform="translate(0.149734255248,24.7534479855) scale(0.0097007872376,-0.00988628722284)"><path class="sym-line" fill="#CC0000" d="M345 2481 c-157 -72 -271 -271 -325 -565 -18 -101 -20 -153 -20 -666 0 -513 2 -565 20 -666 54 -294 168 -493 325 -565 34 -16 66 -19 205 -19 141 0 171 3 207 20 94 42 195 168 253 315 27 66 70 221 70 253 0 9 -47 12 -200 12 -110 0 -200 -2 -200 -4 0 -24 -44 -226 -59 -268 -118 -344 -294 -274 -381 151 -28 136 -40 372 -40 771 0 607 26 829 118 1018 39 80 84 122 132 122 86 0 162 -133 210 -369 20 -101 40 -355 40 -528 l0 -93 200 0 200 0 0 203 c0 160 -4 227 -20 313 -54 294 -168 493 -325 565 -59 27 -351 27 -410 0z M598 998 l302 -303 302 303 303 302 -605 0 -605 0 303 -302z"/></g></svg>
  <svg x="476" y="475"><g transform="translate(0.0510391045243,29.9008597381) scale(0.00989444017531,-0.00992010945328)"><path class="sym-fill" fill="Cyan" d="M1204 1296 c-54 -58 -213 -222 -351 -365 l-253 -259 193 -197 192 -198 353 363 352 362 -89 97 c-49 53 -136 142 -193 199 l-104 103 -100 -105z"/><path class="sym-line" fill="#0000CC" d="M1080 2109 c-476 -489 -911 -938 -968 -998 l-102 -108 480 -494 c264 -272 487 -494 495 -494 8 0 231 222 495 494 l481 495 -59 60 c-32 34 -221 228 -419 431 l-361 371 485 498 485 498 -68 69 c-38 38 -71 69 -74 68 -3 0 -394 -401 -870 -890z m424 -906 c103 -106 186 -197 184 -202 -7 -18 -692 -716 -703 -716 -7 0 -97 87 -200 193 l-187 192 48 53 c126 136 659 677 664 675 4 -2 91 -90 194 -195z"/></g></svg>
</svg>`)
})

it('should not break when a sign contains an invalid symbol key', async () => {
  const svg = await signSvg('AS10011S10019S2e704S2e748M525x535S2e748483x510S10011501x466S20544510x500S10019476x475');
  expect(svg).toEqual(`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="49" height="69" viewBox="476 466 49 69">
  <text font-size="0">AS10011S10019S2e704S2e748M525x535S2e748483x510S10011501x466S20544510x500S10019476x475</text>
  <svg x="483" y="510"><g transform="translate(0.149365953647,24.738779916) scale(0.00971920231764,-0.00983613696638)"><path class="sym-fill" fill="#ffffff" d="M895 1350 l-150 -150 305 0 305 0 -150 150 c-82 83 -152 150 -155 150 -3 0 -73 -67 -155 -150z"/><path class="sym-line" d="M345 2481 c-157 -72 -271 -271 -325 -565 -18 -101 -20 -153 -20 -666 0 -513 2 -565 20 -666 54 -294 168 -493 325 -565 59 -27 351 -27 410 0 208 96 345 425 345 828 l0 153 -100 0 -100 0 0 -42 c0 -24 -5 -119 -10 -211 -17 -297 -76 -508 -167 -602 -68 -70 -145 -37 -205 87 -92 189 -118 411 -118 1018 0 607 26 829 118 1018 132 271 314 70 364 -403 l12 -115 103 0 103 0 -6 58 c-34 316 -166 586 -326 666 -50 25 -60 26 -217 26 -140 0 -172 -3 -206 -19z M770 1375 l-275 -275 555 0 555 0 -275 275 c-151 151 -277 275 -280 275 -3 0 -129 -124 -280 -275z m435 -25 l150 -150 -305 0 -305 0 150 150 c82 83 152 150 155 150 3 0 73 -67 155 -150z"/></g></svg>
  <svg x="501" y="466"><g transform="translate(0.0827624000386,29.8972374025) scale(0.00988338120185,-0.00991626663417)"><path class="sym-fill" fill="#ffffff" d="M601 1204 l-191 -197 42 -46 c23 -25 182 -189 353 -365 l310 -318 193 197 193 198 -128 131 c-71 72 -230 236 -355 363 l-226 233 -191 -196z"/><path class="sym-line" d="M76 2931 l-69 -69 486 -498 485 -498 -371 -381 c-204 -209 -393 -403 -419 -431 l-49 -51 481 -494 c264 -272 487 -494 495 -494 8 0 231 222 495 494 l481 494 -49 51 c-152 158 -1893 1946 -1895 1946 -2 0 -33 -31 -71 -69z m1020 -1838 c165 -170 324 -334 353 -365 l54 -58 -188 -192 c-104 -106 -194 -193 -200 -193 -12 0 -696 698 -703 716 -4 9 367 398 379 399 3 0 140 -138 305 -307z"/></g></svg>
  <svg x="510" y="500"></svg>
  <svg x="476" y="475"><g transform="translate(0.0510391045243,29.9008597381) scale(0.00989444017531,-0.00992010945328)"><path class="sym-fill" fill="#ffffff" d="M1204 1296 c-54 -58 -213 -222 -351 -365 l-253 -259 193 -197 192 -198 353 363 352 362 -89 97 c-49 53 -136 142 -193 199 l-104 103 -100 -105z"/><path class="sym-line" d="M1080 2109 c-476 -489 -911 -938 -968 -998 l-102 -108 480 -494 c264 -272 487 -494 495 -494 8 0 231 222 495 494 l481 495 -59 60 c-32 34 -221 228 -419 431 l-361 371 485 498 485 498 -68 69 c-38 38 -71 69 -74 68 -3 0 -394 -401 -870 -890z m424 -906 c103 -106 186 -197 184 -202 -7 -18 -692 -716 -703 -716 -7 0 -97 87 -200 193 l-187 192 48 53 c126 136 659 677 664 675 4 -2 91 -90 194 -195z"/></g></svg>
</svg>`)
})

it('should return a blank svg for invalid sign', async () => {
  const svg = await signSvg('x');
  expect(svg).toEqual(`<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"1\" height=\"1\"></svg>`)
})
