const wordSpan = document.querySelector("#word");
const pronunciationSpan = document.querySelector("#pronunciation");
const etymologySpan = document.querySelector("#etymology");
const definitionsDiv = document.querySelector("#definitions");
const wordContainer = document.querySelector(".word-container");

function makePOS(posName) {
  // -a- if already exists, skip
  if (document.querySelector(`#pos--${posName}`) !== null) {
    return;
  }

  // -a- if not, make one
  const posDiv = document.createElement("div");
  posDiv.id = `pos--${posName}`;

  const posNameP = document.createElement("p");
  posNameP.innerHTML = posName;
  posNameP.classList.add("pos-name");
  posDiv.appendChild(posNameP);

  const posList = document.createElement("ol");
  posList.id = `pos-list--${posName}`;
  posDiv.appendChild(posList);

  definitionsDiv.appendChild(posDiv);
}

function makeItem(meaning, exampleSentence, exampleSentenceMeaning) {
  const itemDiv = document.createElement("div");

  const meaningP = document.createElement("p");
  meaningP.innerHTML = meaning;
  meaningP.classList.add("item-meaning");
  itemDiv.appendChild(meaningP);

  if (exampleSentence !== undefined) {
    let exampleDiv = document.createElement("div");
    exampleDiv.classList.add("item-example");

    const exampleSentenceP = document.createElement("p");
    exampleSentenceP.innerHTML = exampleSentence;
    exampleSentenceP.classList.add("item-example-sentence");
    exampleDiv.appendChild(exampleSentenceP);

    if (exampleSentenceMeaning !== undefined) {
      const exampleSentenceMeaningP = document.createElement("p");
      exampleSentenceMeaningP.innerHTML = exampleSentenceMeaning;
      exampleSentenceMeaningP.classList.add("item-example-meaning");
      exampleDiv.appendChild(exampleSentenceMeaningP);
    }

    itemDiv.appendChild(exampleDiv);
  }

  return itemDiv;
}

function makeDefinition(definition) {
  let tokens = definition.split("|");

  // -- make pos
  if (tokens.length < 1) {
    return;
  }

  makePOS(tokens[0]);
  let posList = document.querySelector(`#pos-list--${tokens[0]}`);

  // -- make definition
  let itemLi = document.createElement("li");
  let itemDiv = makeItem(tokens[1], tokens[2], tokens[3]);
  itemLi.appendChild(itemDiv);
  posList.appendChild(itemLi);
}

// -- parse url
const url = new URL(document.URL);

// -- change word
const word = url.searchParams.get("word");
wordSpan.innerHTML = word;

// -- pronunciation
const pronunciation = url.searchParams.get("pronunciation");
if (pronunciation !== null) {
  pronunciationSpan.innerHTML = pronunciation;
}

// -- etymology
const etymology = url.searchParams.get("etymology");
if (etymology !== null) {
  etymologySpan.innerHTML = etymology;
}

document.title = `${word}${pronunciation === null ? "" : " " + pronunciation}${etymology === null ? "" : " " + etymology} - Dictform`;

// -- make definitions
const definitions = url.searchParams.get("definition")?.split("\n");
definitions.forEach((definition) => {
  makeDefinition(definition);
});

// -- add click to screenshot event handler
function download() {
  html2canvas(wordContainer, {
    backgroundColor: backgroundColor === null ? "#2c2c2c" : backgroundColor,
  }).then((canvas) => {
    const filename = `dictform-${word}`;
    const data = canvas.toDataURL("image/png;base64");
    const downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = data;
    downloadLink.click();
  });
}

wordContainer.addEventListener("dblclick", (e) => {
  download();
});

// -- colors
const backgroundColor = url.searchParams.get("backgroundcolor");
const color = url.searchParams.get("color");
const wordColor = url.searchParams.get("wordcolor");
const pronunciationColor = url.searchParams.get("pronunciationcolor");
const posNameColor = url.searchParams.get("posnamecolor");
const exampleBarColor = url.searchParams.get("examplebarcolor");
const exampleColor = url.searchParams.get("examplecolor");

const body = document.querySelector("body");
if (backgroundColor !== null) {
  body.style.setProperty("--background-color", backgroundColor);
}
if (color !== null) {
  body.style.setProperty("--color", color);
}
if (wordColor !== null) {
  body.style.setProperty("--word-color", wordColor);
}
if (pronunciationColor !== null) {
  body.style.setProperty("--pronunciation-color", pronunciationColor);
}
if (posNameColor !== null) {
  body.style.setProperty("--pos-name-color", posNameColor);
}
if (exampleBarColor !== null) {
  body.style.setProperty("--example-bar-color", exampleBarColor);
}
if (exampleColor !== null) {
  body.style.setProperty("--example-color", exampleColor);
}
