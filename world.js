const images = [
  {
    src: "obras world/quase-oraculo.png",
    caption: "volvelle quase-oráculo",
    width: 380
  },
  {
    src: "obras world/stargirl.png",
    caption: "airbrush stargirl",
    width: 280
  },
  {
    src: "world/flor.jpg",
    caption: "flor prensada",
    width: 280
  }
];

/* preload */
images.forEach(item => {
  const img = new Image();
  img.src = item.src;
});

const worldToggle = document.getElementById("world-toggle");
const worldLayer = document.getElementById("world-layer");

let worldOpen = false;

function makeDraggable(el) {
  let isDragging = false,
    startX = 0,
    startY = 0,
    offsetX = 0,
    offsetY = 0;

  const getClient = (e) => (e.touches ? e.touches[0] : e);

  const onDown = (e) => {
    const c = getClient(e);

    isDragging = false;
    startX = c.clientX;
    startY = c.clientY;

    const r = el.getBoundingClientRect();
    offsetX = startX - r.left;
    offsetY = startY - r.top;

    el.style.transition = "none";
    el.style.zIndex = 9999;

    document.addEventListener("mousemove", onMove);
    document.addEventListener("touchmove", onMove, { passive: false });
    document.addEventListener("mouseup", onUp);
    document.addEventListener("touchend", onUp);

    e.preventDefault();
  };

  const onMove = (e) => {
    const c = getClient(e);

    const dx = c.clientX - startX;
    const dy = c.clientY - startY;

    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) isDragging = true;

    if (isDragging) {
      el.style.left = c.clientX - offsetX + "px";
      el.style.top = c.clientY - offsetY + "px";
      e.preventDefault();
    }
  };

  const onUp = () => {
    el.style.zIndex = "";

    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("touchmove", onMove);
    document.removeEventListener("mouseup", onUp);
    document.removeEventListener("touchend", onUp);
  };

  el.addEventListener("mousedown", onDown);
  el.addEventListener("touchstart", onDown, { passive: false });
}

function createWorld() {

  worldLayer.innerHTML = "";

  images.forEach((item, index) => {

  const wrapper = document.createElement("div");

  wrapper.classList.add("world-item");

  wrapper.style.width = item.width + "px";

  wrapper.style.left =
    `${5 + Math.random() * 80}%`;

  wrapper.style.top =
    `${5 + Math.random() * 75}%`;

    wrapper.style.transform =
      `rotate(${Math.random() * 16 - 8}deg)`;

    wrapper.innerHTML = `
      <img src="${item.src}" alt="">
      <div class="world-caption">${item.caption}</div>
    `;

    worldLayer.appendChild(wrapper);
    makeDraggable(wrapper);

    setTimeout(() => {
      wrapper.classList.add("visible");
    }, index * 120);

  });

}

function clearWorld() {

  const items =
    document.querySelectorAll(".world-item");

  items.forEach(item => {
    item.classList.remove("visible");
  });

  setTimeout(() => {
    worldLayer.innerHTML = "";
  }, 800);

}

worldToggle.addEventListener("click", () => {

  worldOpen = !worldOpen;

  if (worldOpen) {

    createWorld();

    worldToggle.textContent =
      "✦ close world";

  } else {

    clearWorld();

    worldToggle.textContent =
      "✦ dressa's world";

  }

});