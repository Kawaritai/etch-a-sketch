// Drawing mode
let mode = {
  black: true,
  rgb: false,
  gray: false,
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
    this.style.backgroundColor = "black";
  } else if (mode.rgb) {
    this.style.backgroundColor = `rgba(${rand_255()},${rand_255()},${rand_255()}, 1)`;
  } else if (mode.gray) {
    let initial = this.style.backgroundColor;
    // Make cell grayscale
    if (initial.slice(0, 4) !== "rgba") {
      this.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
    }
    // Add colour to already grayscale cell
    else {
      opacity = parseFloat(initial.split(",")[3].slice(1, -1));
      if (opacity != 0) {
        this.style.backgroundColor = `rgba(255, 255, 255, ${opacity - 0.1})`;
      }
    }
  }
  this.classList.add("changed");
}

document.querySelector("#clear-btn").addEventListener("click", () => {
  document.querySelectorAll(".changed").forEach((cell) => {
    cell.style.backgroundColor = "white";
    cell.classList.remove("changed");
  });
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

newGrid(16);
