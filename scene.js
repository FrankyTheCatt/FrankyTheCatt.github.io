// Banner con nubes, estrellas y corazones (SVG), espacios para GIFs propios y estela del cursor.
(function () {
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

  // Banner
  var scene = document.getElementById("scene");
  if (scene) {
    var b = "";
    b += '<circle cx="700" cy="76" r="46" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="3"/>';
    b += '<circle cx="700" cy="76" r="34" fill="#fff7d6" opacity=".95"/>';
    b += '<g stroke="#fff" stroke-opacity=".55" stroke-width="1.2" stroke-dasharray="6 5"><path d="M0 14H800"/><path d="M0 22H800"/></g>';
    b += cloud(130, 160, 1.6, "cloud-drift") + cloud(420, 120, 1.3, "cloud-drift") + cloud(560, 60, 1, "cloud-drift") + cloud(760, 170, 1.2, "cloud-drift");
    var spark = [[60, 90, 7, "#fff"], [210, 48, 5, "#fff3a8"], [290, 130, 6, "#ff9fcf"], [350, 44, 8, "#fff"], [470, 34, 5, "#fff"],
      [540, 140, 7, "#fff3a8"], [630, 124, 6, "#fff"], [770, 30, 6, "#ff9fcf"], [160, 196, 5, "#fff"], [400, 84, 4, "#b79cf0"], [20, 160, 5, "#fff3a8"], [720, 196, 5, "#fff"],
      [250, 80, 4, "#fff"], [600, 190, 5, "#ff9fcf"]];
    spark.forEach(function (p) { b += star(p[0], p[1], p[2], p[3], "sparkle"); });
    b += '<text x="28" y="46" font-size="28" fill="#5a4a86" opacity=".85" style="font-family:var(--font-pixel)">ようこそ</text>';
    b += '<text x="30" y="68" font-size="13" fill="#5a4a86" opacity=".75" style="font-family:var(--font-pixel)">present day, present time</text>';
    b += '<path d="M0 206C60 192 90 206 150 199S260 187 330 201S470 185 560 199S700 189 800 201L800 230L0 230Z" fill="#fff" opacity=".95"/>';
    b += '<path d="M0 218C80 208 150 220 240 214S420 206 520 216S720 208 800 216L800 230L0 230Z" fill="#ffe7f4"/>';
    [[170, 170, 1.2, "#ff9fcf", 0], [330, 150, 1, "#fff", 1.6], [470, 165, 1.3, "#ff6fb5", 3], [610, 150, 1.1, "#b79cf0", 4.4], [730, 170, 1, "#ff9fcf", 2.4]].forEach(function (h) {
      b += heart(h[0], h[1], h[2], h[3], h[4]);
    });
    scene.innerHTML = b;
  }

  // Espacios para GIFs propios: la carpeta gifs/ se revisa por nombre.
  // Si el archivo no existe, el espacio queda oculto y no se ve nada roto.
  var exts = ["gif", "webp", "png", "jpg", "jpeg"];
  function findImage(base, done) {
    var i = 0;
    (function next() {
      if (i >= exts.length) return;
      var url = "gifs/" + base + "." + exts[i++];
      var probe = new Image();
      probe.onload = function () { done(url); };
      probe.onerror = next;
      probe.src = url;
    })();
  }
  document.querySelectorAll("[data-gif]").forEach(function (slot) {
    findImage(slot.getAttribute("data-gif"), function (url) {
      var img = slot.querySelector("img");
      img.src = url;
      slot.hidden = false;
      slot.classList.add("has-gif");
    });
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
