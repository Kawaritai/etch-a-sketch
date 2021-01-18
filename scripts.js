let mode = {
  black: false,
  rgb: true,
  gray: false,
};

function newGrid(num) {
  let grid = document.createElement("div");
  grid.classList.add("grid");
  grid.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${num}, 1fr)`;

  for (let i = 0; i < num ** 2; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("mouseover", trail);
    grid.appendChild(cell);
  }
  document.querySelector(".container").innerHTML = "";
  document.querySelector(".container").appendChild(grid);
}

function trail() {
  if (mode.black) {
    this.style.backgroundColor = "black";
  } else if (mode.rgb) {
    this.style.backgroundColor = `rgba(${rand_255()},${rand_255()},${rand_255()}, 1)`;
    // this.style.backgroundColor = `rgba(50, 50, 50, 97)`;
  } else if (mode.gray) {
    let initial = this.style.backgroundColor;
    if (initial.slice(0,4) !== "rgba") {
        this.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
    }
    else {
        opacity = parseFloat(initial.split(',')[3].slice(1, -1));
        if (opacity != 0) {
            this.style.backgroundColor = `rgba(255, 255, 255, ${opacity - 0.1})`;
        }
    }
  }
  this.classList.add("changed");
}

function clearGrid(num) {
  document.querySelectorAll(".changed").forEach((cell) => {
    cell.classList.remove("changed");
    cell.style.backgroundColor = "white";
  });
}

document.querySelector("#new-btn").addEventListener("click", (e) => {
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

document.querySelector("#clear-btn").addEventListener("click", clearGrid)

document.querySelectorAll(".option").forEach((option) => {
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
