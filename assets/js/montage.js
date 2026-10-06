/*
 * Live polysomnography-style montage for the page header.
 * Signals are synthesized (resonator-filtered noise, sleep spindles, K-complexes,
 * an ECG beat template with respiratory sinus arrhythmia, a breathing trace),
 * drawn in sweep mode the way a bedside monitor or EEG viewer does.
 */
(function () {
  "use strict";

  // nav: show the name once the big one has scrolled away
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () { nav.classList.toggle("is-scrolled", window.scrollY > 160); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  var canvas = document.getElementById("montage");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var PPS = 64;            // CSS pixels per second (matches the 1 s scale bar)
  var SPP = 2;             // samples per CSS pixel
  var FS = PPS * SPP;      // sample rate, Hz
  var DT = 1 / FS;

  // ---------- signal synthesis ----------
  var rand = Math.random;
  function gauss() {
    var u = 1 - rand(), v = rand();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }
  // two-pole resonator driven by white noise: a band-limited rhythm with wandering amplitude
  function resStep() {
    var y = this.a1 * this.y1 + this.a2 * this.y2 + gauss();
    this.y2 = this.y1; this.y1 = y;
    return y * this.norm;
  }
  function Resonator(freq, r) {
    this.step = resStep;
    var w = 2 * Math.PI * freq / FS;
    this.a1 = 2 * r * Math.cos(w); this.a2 = -r * r;
    this.y1 = 0; this.y2 = 0; this.norm = 1;
    // warm up and normalise to unit standard deviation
    var ss = 0, n = 6000;
    for (var i = 0; i < n; i++) { var v = this.step(); ss += v * v; }
    this.norm = 1 / Math.sqrt(ss / n);
  }

  var t = 0;
  var events = {
    spindleAt: 2 + rand() * 4, spindleDur: 1, spindleF: 13,
    kAt: 5 + rand() * 6,
    saccadeAt: 3 + rand() * 5, eogTarget: 0, eogPos: 0,
    nextBeat: 0.3, beats: []
  };

  function eegChannel(spec) {
    return {
      delta: new Resonator(1.1, 0.993),
      theta: new Resonator(6, 0.985),
      alpha: new Resonator(10, 0.992),
      beta: new Resonator(19, 0.96),
      spec: spec
    };
  }
  var eeg = [
    eegChannel({ delta: 0.9, theta: 0.28, alpha: 0.1, beta: 0.05, spindle: 0.85, k: 0.85 }),
    eegChannel({ delta: 0.75, theta: 0.28, alpha: 0.22, beta: 0.04, spindle: 0.45, k: 0.55 })
  ];
  var eogDrift = new Resonator(0.35, 0.999);
  var respMod = new Resonator(0.02, 0.9995);

  function spindleEnv(tt) {
    var x = (tt - events.spindleAt) / events.spindleDur;
    if (x < 0 || x > 1) return 0;
    return Math.pow(Math.sin(Math.PI * x), 2);
  }
  function kComplex(tt) {
    var x = tt - events.kAt;
    if (x < 0 || x > 1.2) return 0;
    // sharp negative wave followed by a slow positive one
    return -2.6 * Math.exp(-Math.pow((x - 0.18) / 0.09, 2)) + 1.6 * Math.exp(-Math.pow((x - 0.55) / 0.2, 2));
  }
  function ecgAt(tt) {
    var v = 0;
    for (var i = 0; i < events.beats.length; i++) {
      var x = tt - events.beats[i];
      if (x < -0.3 || x > 0.5) continue;
      v += 0.12 * Math.exp(-Math.pow((x + 0.17) / 0.035, 2))   // P
        - 0.15 * Math.exp(-Math.pow((x + 0.025) / 0.01, 2))     // Q
        + 1.6 * Math.exp(-Math.pow(x / 0.011, 2))               // R
        - 0.32 * Math.exp(-Math.pow((x - 0.028) / 0.012, 2))    // S
        + 0.3 * Math.exp(-Math.pow((x - 0.27) / 0.06, 2));      // T
    }
    return v;
  }

  function sample() {
    t += DT;
    // schedule shared events
    if (t > events.spindleAt + events.spindleDur + 0.5) {
      events.spindleAt = t + 4 + rand() * 7;
      events.spindleDur = 0.7 + rand() * 0.8;
      events.spindleF = 12 + rand() * 2;
    }
    if (t > events.kAt + 1.5) events.kAt = t + 7 + rand() * 9;
    if (t > events.saccadeAt) {
      events.eogTarget = (rand() - 0.5) * 2.4;
      events.saccadeAt = t + 1.5 + rand() * 6;
    }
    var breath = Math.sin(2 * Math.PI * 0.24 * t);
    if (t + 0.4 > events.nextBeat) {
      events.beats.push(events.nextBeat);
      if (events.beats.length > 4) events.beats.shift();
      events.nextBeat += 0.95 - 0.06 * breath + gauss() * 0.01; // respiratory sinus arrhythmia
    }

    var sp = spindleEnv(t) * Math.sin(2 * Math.PI * events.spindleF * t);
    var kc = kComplex(t);
    var out = new Array(eeg.length + 3);
    for (var i = 0; i < eeg.length; i++) {
      var c = eeg[i], s = c.spec;
      out[i] = s.delta * c.delta.step() + s.theta * c.theta.step() + s.alpha * c.alpha.step()
        + s.beta * c.beta.step() + s.spindle * 0.9 * sp + s.k * kc;
    }
    var e = eeg.length;
    events.eogPos += (events.eogTarget - events.eogPos) * 0.06;
    out[e] = events.eogPos + 0.5 * eogDrift.step() + 0.05 * gauss();
    out[e + 1] = ecgAt(t) + 0.03 * gauss();
    out[e + 2] = (1 + 0.25 * respMod.step()) * (breath + 0.18 * Math.sin(4 * Math.PI * 0.24 * t + 0.6));
    return out;
  }

  var CHANNELS = [
    { label: "C4-M1", color: "--eeg", gain: 0.15 },
    { label: "O2-M1", color: "--eeg", gain: 0.15 },
    { label: "E1-M2", color: "--eog", gain: 0.22 },
    { label: "ECG", color: "--ecg", gain: 0.24 },
    { label: "Thorax", color: "--resp", gain: 0.28 }
  ];

  // ---------- drawing ----------
  var W = 0, H = 0, N = 0, head = 0, buf = [], colors = {}, font = "";
  var hoverX = -1;

  function readColors() {
    var cs = getComputedStyle(document.documentElement);
    ["--eeg", "--eog", "--ecg", "--resp", "--grid", "--paper", "--ink-3", "--mark"].forEach(function (k) {
      colors[k] = cs.getPropertyValue(k).trim() || "#888";
    });
    font = getComputedStyle(document.body).fontFamily;
  }

  function resize() {
    var rect = canvas.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = Math.max(1, Math.round(rect.width));
    H = Math.max(1, Math.round(rect.height));
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var newN = W * SPP;
    if (newN !== N || buf.length === 0) {
      buf = CHANNELS.map(function () { return new Float32Array(newN); });
      for (var j = 0; j < newN; j++) {
        var s = sample();
        for (var c = 0; c < CHANNELS.length; c++) buf[c][j] = s[c];
      }
      N = newN; head = 0;
    }
    draw();
  }

  function labelLeft() {
    var shell = 1120, gutter = W <= 760 ? 16 : 32;
    return Math.max(gutter, (W - shell) / 2 + gutter);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    var lane = H / CHANNELS.length;

    // one-second grid
    ctx.fillStyle = colors["--grid"];
    var headX = head / SPP;
    var phase = headX % PPS;
    for (var gx = phase; gx < W; gx += PPS) ctx.fillRect(Math.round(gx), 0, 1, H);

    var gap = 14 * SPP; // blank strip ahead of the sweep head
    ctx.lineWidth = 1.1;
    ctx.lineJoin = "round";
    for (var c = 0; c < CHANNELS.length; c++) {
      var ch = CHANNELS[c], data = buf[c];
      var base = lane * (c + 0.5), amp = lane * ch.gain;
      ctx.strokeStyle = colors[ch.color];
      ctx.beginPath();
      var pen = false;
      for (var i = 0; i < N; i++) {
        var ahead = (i - head + N) % N;
        if (ahead > 0 && ahead < gap) { pen = false; continue; }
        var x = i / SPP, y = base - lane * 0.5 * Math.tanh(data[i] * amp / (lane * 0.5));
        if (pen) ctx.lineTo(x, y); else { ctx.moveTo(x, y); pen = true; }
      }
      ctx.stroke();
    }

    // sweep head
    if (!reduceMotion.matches) {
      ctx.fillStyle = colors["--mark"];
      ctx.fillRect(Math.round(headX), 0, 1.5, H);
    }

    // channel labels, on a paper-coloured tab so traces pass behind them
    var lx = labelLeft();
    ctx.font = "500 11px " + font;
    ctx.textBaseline = "middle";
    for (var k = 0; k < CHANNELS.length; k++) {
      var y0 = lane * (k + 0.5), tw = ctx.measureText(CHANNELS[k].label).width;
      ctx.fillStyle = colors["--paper"];
      ctx.fillRect(lx - 8, y0 - 8, tw + 16, 16);
      ctx.fillStyle = colors["--ink-3"];
      ctx.fillText(CHANNELS[k].label, lx, y0);
    }

    // hover cursor with time readout, like a scoring cursor
    if (hoverX >= 0) {
      ctx.fillStyle = colors["--ink-3"];
      ctx.fillRect(Math.round(hoverX), 0, 1, H);
      var ago = ((headX - hoverX + W) % W) / PPS;
      var txt = ago.toFixed(2) + " s ago";
      var w2 = ctx.measureText(txt).width;
      var tx = hoverX + 8 + w2 > W - 8 ? hoverX - 8 - w2 : hoverX + 8;
      ctx.fillStyle = colors["--paper"];
      ctx.fillRect(tx - 4, 4, w2 + 8, 20);
      ctx.fillStyle = colors["--ink-3"];
      ctx.fillText(txt, tx, 14);
    }
  }

  var last = 0, running = false, visible = true, carry = 0;
  function frame(now) {
    if (!running) return;
    if (!last) last = now;
    var dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    carry += dt * FS;
    var n = Math.floor(carry);
    carry -= n;
    for (var j = 0; j < n; j++) {
      var s = sample();
      for (var c = 0; c < CHANNELS.length; c++) buf[c][head] = s[c];
      head = (head + 1) % N;
    }
    draw();
    requestAnimationFrame(frame);
  }
  function start() {
    if (running || reduceMotion.matches || !visible) return;
    running = true; last = 0;
    requestAnimationFrame(frame);
  }
  function stop() { running = false; }

  readColors();
  resize();
  start();

  if ("ResizeObserver" in window) {
    new ResizeObserver(function () { resize(); }).observe(canvas);
  } else {
    window.addEventListener("resize", function () { resize(); });
  }
  window.addEventListener("load", function () { resize(); });
  var scheme = window.matchMedia("(prefers-color-scheme: dark)");
  var onScheme = function () { readColors(); draw(); };
  if (scheme.addEventListener) scheme.addEventListener("change", onScheme);
  if (reduceMotion.addEventListener) reduceMotion.addEventListener("change", function () {
    if (reduceMotion.matches) { stop(); draw(); } else start();
  });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) start(); else stop();
    }).observe(canvas);
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { readColors(); draw(); });

  canvas.addEventListener("pointermove", function (e) {
    var r = canvas.getBoundingClientRect();
    hoverX = e.clientX - r.left;
    if (!running) draw();
  });
  canvas.addEventListener("pointerleave", function () { hoverX = -1; if (!running) draw(); });
})();
