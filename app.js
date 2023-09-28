const container = document.querySelector(".container");

let gridSize = 128;
let color = "black";
let brushSize = 1;

container.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

// grid dimensions
const gridDimentionsSelector = document.querySelector("#grid-dimensions-range");
const gridDimensionsText = document.querySelector(".grid-dimensions-text");
gridDimentionsSelector.addEventListener("change", changeGridDimensions);

function changeGridDimensions() {
  gridDimensionsText.textContent = `Current: ${gridDimentionsSelector.value}`;

  clearAll();

  gridSize = gridDimentionsSelector.value;
  container.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
  container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
}

// main logic
for (let i = 0; i < gridSize ** 2; i++) {
  let newDiv = document.createElement("div");
  newDiv.classList.add("pixel");
  container.appendChild(newDiv);
}

const divs = document.querySelectorAll(".pixel");

for (let i of divs) {
  i.addEventListener("mouseover", () => {
    changeColor(i);
  });
}

function changeColor(targetDiv) {
  // Get the row and column index of the target div
  const rowIndex = Array.from(divs).indexOf(targetDiv) % gridSize;
  const colIndex = Math.floor(Array.from(divs).indexOf(targetDiv) / gridSize);

  // Loop through surrounding divs based on brush size
  for (let row = rowIndex - brushSize; row <= rowIndex + brushSize; row++) {
    for (let col = colIndex - brushSize; col <= colIndex + brushSize; col++) {
      // Check if the div is within the grid bounds
      if (row >= 0 && row < gridSize && col >= 0 && col < gridSize) {
        // Calculate the index of the div in the flattened grid
        const index = row + col * gridSize;
        const divToColor = divs[index];

        // Apply the color
        divToColor.style.backgroundColor = color;
      }
    }
  }
}

const clearBtn = document.querySelector("#clear-btn");
clearBtn.addEventListener("click", clearAll);

function clearAll() {
  for (let i of divs) {
    console.log("cleared");
    i.style.backgroundColor = "white";
  }
}
