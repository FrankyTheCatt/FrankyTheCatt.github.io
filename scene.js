// Busca tus imágenes y GIFs en la carpeta gifs/ y los pone en su lugar.
// Si un archivo no existe, su espacio muestra el nombre que debes usar.
(function () {
  var imageExts = ["gif", "webp", "png", "jpg", "jpeg"];
  var videoExts = ["webm"];

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
