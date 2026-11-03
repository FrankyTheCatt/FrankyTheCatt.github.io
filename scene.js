// Chibis, gatito y banner dibujados en SVG (todo original, sin imágenes externas).
// Las animaciones viven en style.css (parpadeo, balanceo, destellos y corazones).
(function () {
  var OUT = "#4b3a78", SKIN = "#fff1e8", PINK = "#ff6fb5";

  var presets = {
    momo: { hair: "#ffb3d9", dress: "#cfe9ff", shoe: "#ff9fcf", eye: "#5b3d8f", acc: "bow", cls: "" },
    sora: { hair: "#a9d8ff", dress: "#ffd6ec", shoe: "#b79cf0", eye: "#3d5a99", acc: "cat", cls: "chibi--b" },
    mint: { hair: "#bff0d8", dress: "#e6d7ff", shoe: "#ff9fcf", eye: "#2f7a62", acc: "phones", cls: "chibi--c" },
    yume: { hair: "#d9c2ff", dress: "#fff1b8", shoe: "#a9d8ff", eye: "#6a3fa0", acc: "flower", cls: "chibi--d" }
  };

  function accessory(kind, hair) {
    if (kind === "bow") {
      return '<g transform="translate(70 27)">' +
        '<path d="M0 0L-13 -7L-13 7Z" fill="' + PINK + '" stroke="' + OUT + '" stroke-width="1.4" stroke-linejoin="round"/>' +
        '<path d="M0 0L13 -7L13 7Z" fill="' + PINK + '" stroke="' + OUT + '" stroke-width="1.4" stroke-linejoin="round"/>' +
        '<circle r="3.4" fill="#ffb3d9" stroke="' + OUT + '" stroke-width="1.4"/></g>';
    }
    if (kind === "phones") {
      return '<path d="M21 50C21 12 79 12 79 50" fill="none" stroke="#7a4fd6" stroke-width="4" stroke-linecap="round"/>' +
        '<rect x="14" y="44" width="10" height="17" rx="4.5" fill="#ffb3d9" stroke="' + OUT + '" stroke-width="1.5"/>' +
        '<rect x="76" y="44" width="10" height="17" rx="4.5" fill="#ffb3d9" stroke="' + OUT + '" stroke-width="1.5"/>';
    }
    if (kind === "flower") {
      var petals = "";
      for (var i = 0; i < 5; i++) {
        var a = (i * 72 - 90) * Math.PI / 180;
        petals += '<circle cx="' + (Math.cos(a) * 5.4).toFixed(1) + '" cy="' + (Math.sin(a) * 5.4).toFixed(1) + '" r="4.2" fill="#fff" stroke="' + OUT + '" stroke-width="1.2"/>';
      }
      return '<g transform="translate(71 30)">' + petals + '<circle r="3.2" fill="#ffd95e" stroke="' + OUT + '" stroke-width="1.2"/></g>';
    }
    return "";
  }

  // Devuelve el dibujo de una chibi en un lienzo de 100x124.
  function chibi(o) {
    var s = 'stroke="' + OUT + '" stroke-width="1.6" stroke-linejoin="round"';
    var catEars = o.acc === "cat"
      ? '<path d="M24 34L25 9L43 24Z" fill="' + o.hair + '" ' + s + '/><path d="M29 29L29.500 16L38 24Z" fill="#ffb3d9"/>' +
        '<path d="M76 34L75 9L57 24Z" fill="' + o.hair + '" ' + s + '/><path d="M71 29L70.500 16L62 24Z" fill="#ffb3d9"/>'
      : "";
    return '<g class="chibi ' + o.cls + '">' +
      '<path class="chibi__tail-l" d="M22 46C6 58 6 92 20 101C26 87 26 68 32 56Z" fill="' + o.hair + '" ' + s + '/>' +
      '<path class="chibi__tail-r" d="M78 46C94 58 94 92 80 101C74 87 74 68 68 56Z" fill="' + o.hair + '" ' + s + '/>' +
      '<ellipse cx="50" cy="50" rx="33" ry="30" fill="' + o.hair + '" ' + s + '/>' +
      '<rect x="38" y="108" width="8" height="10" rx="3" fill="' + SKIN + '" ' + s + '/>' +
      '<rect x="54" y="108" width="8" height="10" rx="3" fill="' + SKIN + '" ' + s + '/>' +
      '<rect x="35" y="116" width="13" height="7" rx="3.500" fill="' + o.shoe + '" ' + s + '/>' +
      '<rect x="52" y="116" width="13" height="7" rx="3.500" fill="' + o.shoe + '" ' + s + '/>' +
      '<path d="M36 76L64 76L71 110L29 110Z" fill="' + o.dress + '" ' + s + '/>' +
      '<ellipse cx="31" cy="92" rx="4.500" ry="8" transform="rotate(14 31 92)" fill="' + SKIN + '" ' + s + '/>' +
      '<ellipse cx="69" cy="92" rx="4.500" ry="8" transform="rotate(-14 69 92)" fill="' + SKIN + '" ' + s + '/>' +
      '<path d="M43 77L50 82L57 77L57 85L50 82L43 85Z" fill="' + PINK + '" ' + s + '/>' +
      '<ellipse cx="50" cy="52" rx="29" ry="26" fill="' + SKIN + '" ' + s + '/>' +
      catEars +
      '<path d="M20 50C17 18 83 18 80 50C74 42 68 38 60 40C56 46 44 46 40 40C32 38 26 42 20 50Z" fill="' + o.hair + '" ' + s + '/>' +
      '<path d="M32 30C38 24 48 22 56 24" fill="none" stroke="#fff" stroke-opacity=".65" stroke-width="3" stroke-linecap="round"/>' +
      '<g class="chibi__eyes">' +
        '<ellipse cx="38" cy="55" rx="5.800" ry="8" fill="' + o.eye + '"/><ellipse cx="62" cy="55" rx="5.800" ry="8" fill="' + o.eye + '"/>' +
        '<circle cx="36" cy="52" r="2.400" fill="#fff"/><circle cx="60" cy="52" r="2.400" fill="#fff"/>' +
        '<circle cx="40" cy="58.500" r="1.200" fill="#fff"/><circle cx="64" cy="58.500" r="1.200" fill="#fff"/>' +
      '</g>' +
      '<ellipse cx="30" cy="64" rx="4.500" ry="2.600" fill="#ffb3c9" opacity=".85"/><ellipse cx="70" cy="64" rx="4.500" ry="2.600" fill="#ffb3c9" opacity=".85"/>' +
      '<path d="M45.500 65Q48 68 50 65Q52 68 54.500 65" fill="none" stroke="' + OUT + '" stroke-width="1.5" stroke-linecap="round"/>' +
      accessory(o.acc, o.hair) +
      '</g>';
  }

  function star(x, y, r, fill, cls) {
    return '<path class="' + (cls || "") + '" fill="' + fill + '" d="M' + x + " " + (y - r) + "Q" + x + " " + y + " " + (x + r) + " " + y +
      "Q" + x + " " + y + " " + x + " " + (y + r) + "Q" + x + " " + y + " " + (x - r) + " " + y + "Q" + x + " " + y + " " + x + " " + (y - r) + 'Z"/>';
  }

  function heart(x, y, k, fill, delay) {
    return '<g transform="translate(' + x + " " + y + ") scale(" + k + ')"><path class="float-heart" style="animation-delay:' + delay + 's" fill="' + fill + '" d="M0 6C-10 -2 -7 -9 0 -4C7 -9 10 -2 0 6Z"/></g>';
  }

  function cloud(x, y, k, cls) {
    return '<g class="' + (cls || "") + '"><g transform="translate(' + x + " " + y + ") scale(" + k + ')" fill="#fff" opacity=".88">' +
      '<ellipse cx="0" cy="0" rx="34" ry="12"/><circle cx="-14" cy="-9" r="12"/><circle cx="8" cy="-14" r="15"/><circle cx="24" cy="-6" r="10"/></g></g>';
  }

  function place(kind, x, y, w, h) {
    return '<svg x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" viewBox="0 0 100 124" overflow="visible">' + chibi(presets[kind]) + "</svg>";
  }

  // Banner
  var scene = document.getElementById("scene");
  if (scene) {
    var b = "";
    b += '<circle cx="748" cy="62" r="40" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="3"/>';
    b += '<circle cx="748" cy="62" r="30" fill="#fff7d6" opacity=".95"/>';
    b += '<g stroke="#fff" stroke-opacity=".55" stroke-width="1.2" stroke-dasharray="6 5"><path d="M0 14H800"/><path d="M0 22H800"/></g>';
    b += cloud(120, 150, 1.5, "cloud-drift") + cloud(600, 40, 1, "cloud-drift") + cloud(760, 150, 1.1, "cloud-drift");
    var spark = [[60, 80, 7, "#fff"], [210, 48, 5, "#fff3a8"], [270, 120, 6, "#ff9fcf"], [330, 40, 8, "#fff"], [470, 30, 5, "#fff"],
      [540, 62, 7, "#fff3a8"], [640, 118, 6, "#fff"], [760, 28, 6, "#ff9fcf"], [160, 190, 5, "#fff"], [400, 78, 4, "#b79cf0"], [20, 150, 5, "#fff3a8"], [720, 190, 5, "#fff"]];
    spark.forEach(function (p) { b += star(p[0], p[1], p[2], p[3], "sparkle"); });
    b += '<text x="28" y="44" font-size="26" fill="#5a4a86" opacity=".85" style="font-family:var(--font-pixel)">ようこそ</text>';
    b += '<text x="30" y="66" font-size="13" fill="#5a4a86" opacity=".75" style="font-family:var(--font-pixel)">present day, present time</text>';
    b += '<path d="M0 206C60 192 90 206 150 199S260 187 330 201S470 185 560 199S700 189 800 201L800 230L0 230Z" fill="#fff" opacity=".95"/>';
    b += '<path d="M0 218C80 208 150 220 240 214S420 206 520 216S720 208 800 216L800 230L0 230Z" fill="#ffe7f4"/>';
    b += place("momo", 236, 52, 124, 154) + place("sora", 350, 52, 124, 154) + place("mint", 464, 52, 124, 154) + place("yume", 578, 52, 124, 154);
    [[270, 150, 1.2, "#ff9fcf", 0], [400, 130, 1, "#fff", 1.6], [520, 140, 1.3, "#ff6fb5", 3], [650, 130, 1.1, "#b79cf0", 4.4], [740, 160, 1, "#ff9fcf", 2.4]].forEach(function (h) {
      b += heart(h[0], h[1], h[2], h[3], h[4]);
    });
    scene.innerHTML = b;
  }

  // Chibi con globo de texto en la barra lateral
  document.querySelectorAll(".chibi-slot").forEach(function (el) {
    var kind = presets[el.getAttribute("data-chibi")] ? el.getAttribute("data-chibi") : "momo";
    var say = el.getAttribute("data-say") || "";
    var bubble = say
      ? '<g class="bubble"><path d="M88 4H138a8 8 0 0 1 8 8V28a8 8 0 0 1-8 8H108L98 46V36H96a8 8 0 0 1-8-8V12a8 8 0 0 1 8-8Z" fill="#fff" stroke="#a98aef" stroke-width="2" stroke-linejoin="round"/>' +
        '<text x="117" y="25" text-anchor="middle" font-size="12" fill="#3b2a63" style="font-family:var(--font-pixel)">' + say + "</text></g>"
      : "";
    el.innerHTML = '<svg viewBox="0 0 150 150">' + star(14, 30, 6, "#ff9fcf", "sparkle") + star(136, 112, 5, "#b79cf0", "sparkle") +
      '<svg x="22" y="22" width="100" height="124" viewBox="0 0 100 124" overflow="visible">' + chibi(presets[kind]) + "</svg>" + bubble + "</svg>";
  });

  // Gatito
  document.querySelectorAll(".cat-slot").forEach(function (el) {
    var s = 'stroke="' + OUT + '" stroke-width="1.6" stroke-linejoin="round"';
    el.innerHTML = '<svg viewBox="0 0 80 72">' +
      '<g class="cat__tail"><path d="M58 58C76 56 78 38 66 34" fill="none" stroke="' + OUT + '" stroke-width="9.500" stroke-linecap="round"/>' +
      '<path d="M58 58C76 56 78 38 66 34" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/></g>' +
      '<ellipse cx="40" cy="54" rx="21" ry="14" fill="#fff" ' + s + '/>' +
      '<ellipse cx="31" cy="65" rx="6" ry="4" fill="#fff" ' + s + '/><ellipse cx="49" cy="65" rx="6" ry="4" fill="#fff" ' + s + '/>' +
      '<path d="M23 24L23 7L37 17Z" fill="#fff" ' + s + '/><path d="M27 20L27 12L33 17Z" fill="#ffb3d9"/>' +
      '<path d="M57 24L57 7L43 17Z" fill="#fff" ' + s + '/><path d="M53 20L53 12L47 17Z" fill="#ffb3d9"/>' +
      '<ellipse cx="40" cy="33" rx="20" ry="17" fill="#fff" ' + s + '/>' +
      '<path d="M40 17V22M35 18.500L36 22.500M45 18.500L44 22.500" stroke="#b79cf0" stroke-width="2" stroke-linecap="round"/>' +
      '<path d="M26 44Q40 53 54 44" fill="none" stroke="' + PINK + '" stroke-width="4" stroke-linecap="round"/>' +
      '<circle cx="40" cy="50" r="2.800" fill="#ffe27a" ' + s + '/>' +
      '<g class="chibi__eyes"><ellipse cx="32" cy="33" rx="2.500" ry="3.400" fill="' + OUT + '"/><ellipse cx="48" cy="33" rx="2.500" ry="3.400" fill="' + OUT + '"/>' +
      '<circle cx="31.200" cy="31.800" r="1" fill="#fff"/><circle cx="47.200" cy="31.800" r="1" fill="#fff"/></g>' +
      '<ellipse cx="25" cy="39" rx="3.600" ry="2.200" fill="#ffb3c9" opacity=".85"/><ellipse cx="55" cy="39" rx="3.600" ry="2.200" fill="#ffb3c9" opacity=".85"/>' +
      '<path d="M38.500 37.500h3L40 39.500Z" fill="' + PINK + '"/>' +
      '<path d="M40 39.500Q38 42 35.500 40.500M40 39.500Q42 42 44.500 40.500" fill="none" stroke="' + OUT + '" stroke-width="1.300" stroke-linecap="round"/>' +
      "</svg>";
  });

  // Estela de destellos del cursor (solo con mouse y si no se pidió menos movimiento)
  var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia && window.matchMedia("(pointer: fine)").matches;
  if (!calm && fine) {
    var last = 0, live = 0, glyphs = ["✦", "♡", "✧"], colors = ["#ff6fb5", "#a98aef", "#6bb8ff", "#ffb14d"];
    document.addEventListener("mousemove", function (e) {
      var now = Date.now();
      if (now - last < 45 || live > 18) return;
      last = now; live++;
      var t = document.createElement("span");
      t.className = "trail";
      t.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
      t.style.left = e.clientX + 6 + "px";
      t.style.top = e.clientY + 6 + "px";
      t.style.color = colors[Math.floor(Math.random() * colors.length)];
      t.style.setProperty("--dx", Math.round(Math.random() * 28 - 14) + "px");
      document.body.appendChild(t);
      setTimeout(function () { t.remove(); live--; }, 800);
    });
  }
})();
