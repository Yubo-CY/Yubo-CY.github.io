/* Background music toggle. Browsers block sound until the visitor interacts,
 * so with autoplay on, playback starts on the first click, tap or key press. */
(function () {
  "use strict";
  var btn = document.getElementById("music");
  if (!btn) return;
  var audio = new Audio(btn.getAttribute("data-src"));
  audio.loop = true;
  audio.volume = 0.35;
  audio.preload = "none";

  function set(on) {
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    btn.setAttribute("aria-label", on ? "Pause music" : "Play music");
    btn.title = on ? "Pause music" : "Play music";
  }
  function play() { return audio.play().then(function () { set(true); }, function () { set(false); }); }
  function pause() { audio.pause(); set(false); }

  var userChose = false;
  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    userChose = true;
    if (audio.paused) play(); else pause();
  });

  if (btn.getAttribute("data-autoplay") === "true") {
    play(); // succeeds only where the browser allows it
    var kick = function () {
      window.removeEventListener("pointerdown", kick, true);
      window.removeEventListener("keydown", kick, true);
      if (!userChose && audio.paused) play();
    };
    window.addEventListener("pointerdown", kick, true);
    window.addEventListener("keydown", kick, true);
  }
})();
