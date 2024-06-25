const colorSchemes = [
  ["#2c2c2c", "#f7f7f9", "#ffcf00", "#808080", "#fdde59", "#666666", "#aaaaaa"],
  ["#ffffff", "#000000", "#1b47b9", "#222222", "#7a96b9", "#aaaaaa", "#666666"],
  ["#1a1929", "#ffffff", "#e8501e", "#999999", "#db9090", "#aaaaaa", "#a3a3a3"],
  ["#ffffff", "#000000", "#fea601", "#000000", "#ffc868", "#aaaaaa", "#666666"],
];

let backgroundColorInput;
let colorInput;
let wordColorInput;
let pronunciationColorInput;
let posNameColorInput;
let exampleBarColorInput;
let exampleColorInput;
function onColorSchemeChange(e) {
  const option = e.target.options[e.target.options.selectedIndex];

  [
    backgroundColorInput.value,
    colorInput.value,
    wordColorInput.value,
    pronunciationColorInput.value,
    posNameColorInput.value,
    exampleBarColorInput.value,
    exampleColorInput.value,
  ] = colorSchemes[option.value];
}

let colorScheme;
function expandColorClicked() {
  if (colorScheme.style.display === "none") {
    colorScheme.style.display = "";
  } else {
    colorScheme.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const colorSchemeSelect = document.querySelector("#color-scheme-select");
  const expandColor = document.querySelector("#expandcolor");
  colorScheme = document.querySelector("#color-scheme");
  backgroundColorInput = document.querySelector("#backgroundcolor");
  colorInput = document.querySelector("#color");
  wordColorInput = document.querySelector("#wordcolor");
  pronunciationColorInput = document.querySelector("#pronunciationcolor");
  posNameColorInput = document.querySelector("#posnamecolor");
  exampleBarColorInput = document.querySelector("#examplebarcolor");
  exampleColorInput = document.querySelector("#examplecolor");

  colorSchemeSelect.addEventListener("change", onColorSchemeChange);
  expandColor.addEventListener("click", expandColorClicked);
});
