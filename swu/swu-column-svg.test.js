
const { columnSvg } = require('./swu-column-svg');

it('should handle column data', async () => {
  const columnData = [
      {"x":56,"y":20,"minX":481,"minY":471,"width":37,"height":58,"lane":0,"padding":0,"segment":"sign","text":"𝠀񁲡񈩧𝠃𝤘𝤣񁲡𝣳𝣩񈩧𝤉𝣻","zoom":1},
      {"x":57,"y":118,"minX":482,"minY":468,"width":36,"height":65,"lane":0,"padding":0,"segment":"sign","text":"𝠀񃊢񃊫񋛕񆇡𝠃𝤘𝤧񃊫𝣻𝤕񃊢𝣴𝣼񆇡𝤎𝤂񋛕𝤆𝣦","zoom":1},
      {"x":39,"y":203,"minX":464,"minY":496,"width":72,"height":8,"lane":0,"padding":0,"segment":"symbol","text":"񏌁𝣢𝤂","zoom":1}
  ];
  const columnOptions = {"height": 250, "width": 150};
  const svg = await columnSvg(columnData,columnOptions);
  expect(svg).toEqual(`<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"150\" height=\"250\" viewBox=\"0 0 150 250\">
<g transform=\"translate(56,20) scale(1) translate(-481,-471) \">
  <text font-size=\"0\">𝠀񁲡񈩧𝠃𝤘𝤣񁲡𝣳𝣩񈩧𝤉𝣻-D_black,white_Z1</text>
  <svg x=\"481\" y=\"471\"><g transform=\"translate(0.169377282955,30.7516384396) scale(0.00990025187962,-0.00987200030311)\"><path class=\"sym-line\" fill=\"black\" d=\"M980 2602 l0 -498 -75 -74 c-61 -61 -77 -72 -85 -60 -5 8 -101 174 -212 369 -111 194 -207 355 -213 357 -11 5 -174 -86 -175 -96 0 -3 103 -185 229 -405 l229 -400 -44 -45 -44 -46 0 -404 0 -405 -223 223 c-122 122 -227 222 -234 222 -6 0 -39 -31 -73 -70 l-62 -70 60 -67 c34 -38 167 -174 296 -303 l236 -235 0 -297 0 -298 495 0 495 0 0 598 0 597 131 130 c72 72 229 232 350 357 l220 227 -67 70 c-36 39 -72 71 -78 71 -6 0 -133 -125 -283 -277 l-272 -278 0 105 -1 104 -44 46 -44 45 229 400 c126 220 228 402 228 405 1 8 -159 100 -172 100 -7 -1 -104 -163 -217 -361 -113 -199 -208 -366 -212 -372 -5 -8 -34 14 -83 63 l-75 74 0 498 0 498 -105 0 -105 0 0 -498z\"/></g></svg>
  <svg x=\"503\" y=\"489\"><g transform=\"translate(0.198936059556,39.7014459718) scale(0.00966859326382,-0.00987539862011)\"><path class=\"sym-line\" fill=\"black\" d=\"M800 3702 l0 -302 -350 0 -350 0 0 -100 0 -100 350 0 350 0 0 -302 0 -303 352 353 353 352 -353 352 -352 353 0 -303z M345 2350 l-350 -350 353 -353 352 -352 0 303 0 302 350 0 350 0 0 100 0 100 -350 0 -350 0 -2 300 -3 300 -350 -350z M800 1102 l0 -302 -350 0 -350 0 0 -100 0 -100 350 0 350 0 0 -302 0 -303 352 353 353 352 -353 352 -352 353 0 -303z\"/></g></svg>
</g>
<g transform=\"translate(57,118) scale(1) translate(-482,-468) \">
  <text font-size=\"0\">𝠀񃊢񃊫񋛕񆇡𝠃𝤘𝤧񃊫𝣻𝤕񃊢𝣴𝣼񆇡𝤎𝤂񋛕𝤆𝣦-D_black,white_Z1</text>
  <svg x=\"489\" y=\"515\"><g transform=\"translate(0.146473559361,17.7697467366) scale(0.00986382203195,-0.00978961624256)\"><path class=\"sym-fill\" fill=\"white\" d=\"M700 1493 c-231 -35 -425 -212 -484 -440 -21 -78 -21 -228 0 -306 51 -198 210 -365 403 -423 300 -90 630 106 711 421 85 334 -118 671 -445 740 -67 14 -130 17 -185 8z\"/><path class=\"sym-line\" fill=\"black\" d=\"M1826 1480 l-308 -320 -48 97 c-102 206 -258 342 -475 415 -61 20 -89 23 -225 23 -144 0 -161 -2 -235 -28 -263 -92 -456 -310 -519 -585 -21 -93 -21 -271 0 -364 63 -275 256 -493 519 -585 74 -26 91 -28 235 -28 136 0 164 3 225 23 217 73 373 209 475 415 l48 97 306 -317 c169 -175 313 -319 319 -321 7 -1 43 29 81 67 l69 70 -265 273 c-146 150 -289 299 -318 331 l-52 57 621 0 621 0 0 100 0 100 -621 0 -621 0 52 58 c29 31 172 180 318 330 l265 273 -68 70 c-38 38 -74 69 -80 69 -5 0 -149 -144 -319 -320z m-872 -9 c419 -150 536 -695 217 -1007 -105 -102 -222 -154 -366 -161 -170 -9 -316 48 -437 169 -143 145 -205 353 -163 553 46 219 222 407 431 460 84 21 241 14 318 -14z\"/></g></svg>
  <svg x=\"482\" y=\"490\"><g transform=\"translate(0.0509888469747,23.8889663598) scale(0.00989954570416,-0.00993124049938)\"><path class=\"sym-fill\" fill=\"white\" d=\"M1470 1356 c-196 -55 -340 -190 -407 -383 -36 -104 -38 -243 -5 -348 61 -198 215 -343 418 -395 134 -35 270 -20 399 44 137 68 235 182 288 334 50 147 37 318 -35 456 -71 134 -222 252 -373 291 -71 18 -221 18 -285 1z\"/><path class=\"sym-line\" fill=\"black\" d=\"M1060 1943 l0 -448 -445 445 -445 445 -70 -70 c-38 -38 -70 -74 -70 -80 0 -5 197 -207 437 -447 l438 -438 -448 0 -447 0 0 -105 0 -105 449 0 448 0 -35 -102 c-34 -98 -36 -109 -36 -238 0 -111 4 -149 22 -214 77 -268 270 -463 542 -547 98 -31 308 -34 410 -6 269 73 476 275 556 542 35 118 37 298 6 416 -60 224 -216 412 -425 509 -191 90 -450 96 -634 14 l-53 -23 0 450 0 449 -100 0 -100 0 0 -447z m662 -577 c232 -45 415 -222 463 -451 28 -135 15 -243 -46 -374 -31 -66 -54 -99 -116 -160 -86 -85 -162 -129 -273 -157 -87 -22 -242 -15 -324 15 -173 61 -315 205 -367 370 -120 376 153 759 548 770 23 0 74 -5 115 -13z\"/></g></svg>
  <svg x=\"508\" y=\"496\"><g transform=\"translate(-0.221878406359,10.7500002304) scale(0.0103429235226,-0.00963778430032)\"><path class=\"sym-line\" fill=\"black\" d=\"M430 895 l0 -205 -37 23 c-21 13 -95 61 -165 105 l-128 82 -36 -71 c-19 -40 -32 -75 -27 -79 4 -3 74 -48 156 -99 81 -51 147 -97 147 -101 0 -4 -66 -50 -147 -101 -82 -51 -152 -96 -156 -99 -5 -4 8 -39 27 -79 l36 -71 128 82 c70 44 144 92 165 105 l37 23 0 -205 0 -205 70 0 70 0 0 205 0 205 38 -23 c20 -13 94 -61 164 -105 l128 -82 36 71 c19 40 32 75 27 79 -4 3 -74 48 -155 99 -82 51 -148 97 -148 101 0 4 66 50 148 101 81 51 151 96 155 99 5 4 -8 39 -27 79 l-36 71 -128 -82 c-70 -44 -144 -92 -164 -105 l-38 -23 0 205 0 205 -70 0 -70 0 0 -205z\"/></g></svg>
  <svg x=\"500\" y=\"468\"><g transform=\"translate(0.197666879378,24.7530130697) scale(0.00971920231764,-0.00988927614774)\"><path class=\"sym-line\" fill=\"black\" d=\"M845 2481 c-208 -96 -345 -425 -345 -828 l0 -153 100 0 100 0 0 43 c0 23 5 118 10 210 17 297 76 508 167 602 68 70 145 37 205 -87 92 -189 118 -411 118 -1018 0 -607 -26 -829 -118 -1018 -132 -271 -314 -70 -364 403 l-12 115 -103 0 -103 0 6 -57 c34 -317 166 -587 326 -667 50 -25 60 -26 217 -26 140 0 172 3 206 19 157 72 271 271 325 565 18 101 20 153 20 666 0 513 -2 565 -20 666 -54 294 -168 493 -325 565 -59 27 -351 27 -410 0z M273 1123 l277 -278 277 278 278 277 -555 0 -555 0 278 -277z\"/></g></svg>
</g>
<g transform=\"translate(39,203) scale(1) translate(-464,-496) \">
  <text font-size=\"0\">񏌁𝣢𝤂-D_black,white_Z1</text>
  <svg x=\"464\" y=\"496\"><g transform=\"translate(0.0,8.0) scale(0.01,-0.01)\"><path class=\"sym-line\" fill=\"black\" d=\"M0 400 l0 -400 3600 0 3600 0 0 400 0 400 -3600 0 -3600 0 0 -400z\"/></g></svg>
</g>
</svg>`)
})
