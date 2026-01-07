/*     ________________________
     /           ___ ___       '.
     |\ .-------|:::/:::|--------;
     | |        |:::|:::|        |
     |\|_  ___ _|:::/:::| __ ____|
     |    __  ___""" """_ ____ __`\
     | |\##\\###\\##\\###\\##\\### \
     \ \ \\\\\\\\\\\\\\\\\\\\\\\\\\ \
     |\ \||||||||||||||||||||||||||_|
     | | ;"""""""""""""""""""""""";"|
     | | |"""""".----------.""""""| |
     | | |     |\           \  |  | |
     | | |-----|\\___________\-|  | |
 jgs | | |     | |---------- |  \ | |
     `\| |     | |         | |   `| |
       \_|       |           |    `\|*/
       
const ctx = new (window.AudioContext || window.webkitAudioContext)();

const scale = [
  523.25, 587.33, 659.25,
  783.99, 880,
  1046.5, 1174.66, 1318.51
];

let lastEl = null;

let soundEnabled =
  localStorage.getItem("soundEnabled") !== null
    ? localStorage.getItem("soundEnabled") === "true"
    : true;

function play(freq) {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  const fl = ctx.createBiquadFilter();

  o.type = "sine";
  o.frequency.value = freq;

  fl.type = "lowpass";
  fl.frequency.value = 3000;
  fl.Q.value = 8;

  g.gain.value = 0;
  g.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.01);
  g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

  o.connect(fl);
  fl.connect(g);
  g.connect(ctx.destination);

  o.start(ctx.currentTime);
  o.stop(ctx.currentTime + 0.4);
}

document.addEventListener(
  "mouseover",
  () => {
    if (ctx.state === "suspended") ctx.resume();
  },
  { once: true }
);

document.addEventListener("mouseover", (e) => {
  if (!soundEnabled) return;

  const el = e.target;
  if (el !== lastEl) {
    lastEl = el;

    const r = el.getBoundingClientRect();
    const pct = r.top / window.innerHeight;
    const idx = Math.floor(pct * scale.length) % scale.length;

    play(scale[idx]);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("audioControl");
  const hint = document.getElementById("soundHint");
  if (!btn) return;

  btn.classList.toggle("muted", !soundEnabled);
  document.body.style.cursor = soundEnabled ? "crosshair" : "";

  btn.addEventListener("click", () => {
    soundEnabled = !soundEnabled;

    localStorage.setItem("soundEnabled", soundEnabled);

    btn.classList.toggle("muted", !soundEnabled);
    document.body.style.cursor = soundEnabled ? "crosshair" : "";

    if (hint) hint.classList.add("hidden");
  });

  setTimeout(() => {
    if (hint) hint.classList.add("hidden");
  }, 3000);
});
