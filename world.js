const worldToggle = document.getElementById("world-toggle");
const worldLayer = document.getElementById("world-layer");

let worldOpen = false;

const images = [
  {
    src: "obras world/quase-oraculo.png",
    caption: "volvelle quase-oráculo",
    width: 380
  },
  {
    src: "world/perola.jpg",
    caption: "pérolas",
    width: 280
  },
  {
    src: "world/flor.jpg",
    caption: "flor prensada",
    width: 280
  }
];

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