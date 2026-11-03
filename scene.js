// Banner pixel art: faro, gato y luna sobre el mar al atardecer.
// Cada celda es 1x1 en un lienzo de 160x40; se dibuja como SVG.
(function () {
  var svg = document.getElementById("scene");
  if (!svg) return;

  var W = 160, H = 40, HORIZON = 28;
  var INK = "#0a0c24", LAMP = "#ffe9a8", MOON = "#fff4cf";

  // Generador pseudoaleatorio con semilla fija: el dibujo es igual en cada visita.
  var seed = 20261103;
  function rnd() {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  var out = [];
  function rect(x, y, w, h, fill, extra) {
    out.push('<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + fill + '"' + (extra || "") + "/>");
  }

  // Cielo en franjas, con trama en los bordes entre una franja y la siguiente.
  var bands = [
    ["#0b0f2e", 4], ["#101437", 4], ["#1a1b4b", 4], ["#2b2160", 4], ["#43276b", 3],
    ["#6a2f73", 3], ["#a23d6e", 3], ["#e0605a", 2], ["#ff8a3d", 1]
  ];
  var y = 0, i, x;
  for (i = 0; i < bands.length; i++) {
    rect(0, y, W, bands[i][1], bands[i][0]);
    if (i > 0) {
      for (x = 0; x < W; x++) if (rnd() < 0.35) rect(x, y - 1, 1, 1, bands[i][0]);
    }
    y += bands[i][1];
  }

  // Estrellas
  for (i = 0; i < 46; i++) {
    var sx = Math.floor(rnd() * W), sy = Math.floor(rnd() * 17);
    rect(sx, sy, 1, 1, rnd() < 0.3 ? LAMP : "#ffffff", i % 5 === 0 ? ' class="tw"' : "");
  }
  [[18, 5], [74, 3], [96, 11]].forEach(function (p) {
    rect(p[0], p[1] - 1, 1, 3, "#ffffff", ' class="tw"');
    rect(p[0] - 1, p[1], 3, 1, "#ffffff", ' class="tw"');
  });

  // Luna creciente
  var mx = 118, my = 7;
  for (y = my - 6; y <= my + 6; y++) {
    for (x = mx - 6; x <= mx + 6; x++) {
      var a = Math.pow(x - mx, 2) + Math.pow(y - my, 2) <= 25;
      var b = Math.pow(x - (mx + 2), 2) + Math.pow(y - (my - 1), 2) <= 20;
      if (a && !b) rect(x, y, 1, 1, MOON);
    }
  }

  // Mar
  rect(0, HORIZON, W, H - HORIZON, "#12163f");
  rect(0, HORIZON, W, 1, "#a23d6e");
  for (x = 0; x < W; x++) if (rnd() < 0.45) rect(x, HORIZON + 1, 1, 1, "#a23d6e");
  for (y = HORIZON + 1; y < H; y++) {
    for (x = 0; x < W; x++) if (rnd() < 0.1) rect(x, y, 1, 1, "#1e2a6b");
  }
  [[30, 5], [32, 4], [34, 3], [36, 2]].forEach(function (r) {
    var rx = mx - Math.floor(r[1] / 2);
    for (var k = 0; k < r[1]; k++) if (rnd() < 0.8) rect(rx + k, r[0], 1, 1, MOON);
  });

  // Haz del faro (detrás de las rocas y los sprites)
  out.push('<polygon class="beam" points="39,17 160,5 160,32 39,20" fill="' + LAMP + '" opacity="0.22"/>');

  // Rocas
  function mound(cx, top, base, hw0, grow) {
    for (var r = top; r <= base; r++) {
      var hw = hw0 + (r - top) * grow;
      rect(cx - hw, r, hw * 2 + 1, 1, INK);
    }
  }
  mound(39, 32, 39, 8, 3);
  mound(138, 33, 39, 6, 3);

  // Sprites
  function sprite(rows, x0, y0, colors) {
    rows.forEach(function (row, ry) {
      for (var cx = 0; cx < row.length; cx++) {
        var ch = row.charAt(cx);
        if (ch !== ".") rect(x0 + cx, y0 + ry, 1, 1, colors[ch] || INK);
      }
    });
  }

  sprite([
    "....##....",
    "...####...",
    "..######..",
    "..#LLLL#..",
    "..#LLLL#..",
    "..######..",
    ".########.",
    "...####...",
    "...####...",
    "...#ww#...",
    "...####...",
    "..######..",
    "..######..",
    "..##w###..",
    ".########.",
    ".########.",
    ".########.",
    "##########"
  ], 34, 15, { "#": INK, L: LAMP, w: LAMP });

  var catX = 132, catY = 21;
  sprite([
    "##........##",
    "###......###",
    "############",
    "##e######e##",
    "############",
    ".##########.",
    "..########..",
    ".##########.",
    ".##########.",
    ".##########.",
    ".####..####.",
    ".###....###."
  ], catX, catY, { "#": INK, e: "#ffd27a" });
  // Cola
  [[12, 11], [13, 11], [13, 10], [13, 9], [13, 8], [12, 8]].forEach(function (p) {
    rect(catX + p[0], catY + p[1], 1, 1, INK);
  });

  svg.innerHTML = out.join("");
})();
