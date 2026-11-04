// Busca tus imágenes y GIFs en la carpeta gifs/ y los pone en su lugar.
// Si un archivo no existe, su espacio muestra el nombre que debes usar.
(function () {
  var imageExts = ["gif", "webp", "png", "jpg", "jpeg"];
  var videoExts = ["webm", "mp4"];

  function find(base, withVideo, done) {
    var exts = withVideo ? imageExts.concat(videoExts) : imageExts;
    var i = 0;
    (function next() {
      if (i >= exts.length) return;
      var ext = exts[i++];
      var url = "gifs/" + base + "." + ext;
      if (videoExts.indexOf(ext) !== -1) {
        fetch(url, { method: "HEAD" }).then(function (r) { if (r.ok) done(url, ext); else next(); }, next);
      } else {
        var probe = new Image();
        probe.onload = function () { done(url, ext); };
        probe.onerror = next;
        probe.src = url;
      }
    })();
  }

  document.querySelectorAll("[data-gif]").forEach(function (slot) {
    var asBackground = slot.hasAttribute("data-gif-bg");
    find(slot.getAttribute("data-gif"), !asBackground, function (url, ext) {
      slot.classList.add("has-gif");
      if (asBackground) {
        slot.style.backgroundImage = 'url("' + url + '")';
        return;
      }
      var media = slot.querySelector(".slot-media");
      if (!media) return;
      media.innerHTML = videoExts.indexOf(ext) !== -1
        ? '<video src="' + url + '" autoplay loop muted playsinline aria-hidden="true"></video>'
        : '<img src="' + url + '" alt="">';
    });
  });

  // Fondo de toda la página: gifs/fondo.jpg (o .png, .webp, .gif)
  find("fondo", false, function (url) {
    document.documentElement.style.setProperty("--bg-image", 'url("' + url + '")');
  });
})();

// Cinta superior: repite tu texto hasta llenar el ancho y lo mueve a velocidad constante.
// Para cambiarla, edita el texto del <span> dentro de .marquee en index.html, o PX_POR_SEGUNDO aquí.
(function () {
  var PX_POR_SEGUNDO = 180;
  var bar = document.querySelector(".marquee");
  var first = bar && bar.querySelector("span");
  if (!first) return;
  var phrase = first.textContent.trim();

  function build() {
    var old = bar.querySelector(".marquee__track") || bar.querySelector("span");
    var probe = document.createElement("span");
    probe.textContent = phrase + "   ";
    probe.style.cssText = "position:absolute;visibility:hidden;padding-right:2rem";
    bar.appendChild(probe);
    var w = probe.getBoundingClientRect().width || 200;
    bar.removeChild(probe);
    var n = Math.max(2, Math.ceil((window.innerWidth * 1.1) / w));
    var track = document.createElement("div");
    track.className = "marquee__track";
    for (var i = 0; i < 2; i++) {
      var s = document.createElement("span");
      s.textContent = new Array(n + 1).join(phrase + "   ");
      track.appendChild(s);
    }
    bar.replaceChild(track, old);
    var half = track.firstChild.getBoundingClientRect().width;
    track.style.animationDuration = Math.max(2, half / PX_POR_SEGUNDO) + "s";
  }

  build();
  var t;
  window.addEventListener("resize", function () { clearTimeout(t); t = setTimeout(build, 250); });
})();
