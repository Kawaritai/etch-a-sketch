// Drawing mode
let mode = {
  black: true,
  rgb: false,
  gray: false,
  eraser: false,
};

function newGrid(num) {
  // Create new grid with correct styling
  let grid = document.createElement("div");
  grid.classList.add("grid");
  grid.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${num}, 1fr)`;

  // Create cells
  for (let i = 0; i < num ** 2; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("mouseover", trail);
    grid.appendChild(cell);
  }
  // Clear previous grid and add new one
  document.querySelector(".grid-container").innerHTML = "";
  document.querySelector(".grid-container").appendChild(grid);
}

function trail() {
  if (mode.black) {
    eraseCell(this);
    this.style.opacity = 0;
  } else if (mode.rgb) {
    eraseCell(this);
    this.style.backgroundColor = `rgba(${rand_255()},${rand_255()},${rand_255()}, 1)`;
  } else if (mode.gray && this.style.opacity !== "0") {
    if (!this.dataset.hasOwnProperty("shade")) {
      this.dataset.shade = 0;
    }
    if (this.dataset.shade < 10) {
      shade = parseInt(++this.dataset.shade);
      this.style.opacity = (10 - shade) / 10;
      if (this.style.opacity === "0") {
        this.style.removeProperty("background-color");
      }
    }
  }
  (mode.eraser) ? eraseCell(this) : this.classList.add("changed");
}

document.querySelector("#clear-btn").addEventListener("click", () => {
  document.querySelectorAll(".changed").forEach((cell) => eraseCell(cell));
});

document.querySelector("#new-btn").addEventListener("click", () => {
  let num;
  do {
    num = prompt("Enter a number");
    if (num > 100) {
      alert("Number must not exceed 100.");
    }
  } while (isNaN(num) || num > 100);
  if (num) {
    num = Math.round(num);
    newGrid(num);
  }
});

document.querySelectorAll(".mode-option").forEach((option) => {
  option.addEventListener("click", (e) => {
    Object.keys(mode).forEach((key) => {
      if (key === e.target.dataset.mode) {
        mode[key] = true;
      } else {
        mode[key] = false;
      }
    });
  });
});

function rand_255() {
  return Math.floor(Math.random() * 256);
}

function eraseCell(cell) {
  cell.removeAttribute("style");
  cell.removeAttribute("data-shade");
  cell.classList.remove("changed");
}

newGrid(16);
