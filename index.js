const wordSpan = document.querySelector("#word");
const pronunciationSpan = document.querySelector("#pronunciation");
const definitionsDiv = document.querySelector("#definitions");

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
    console.log(meaning, exampleSentence, exampleSentenceMeaning);
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
    let tokens = definition.split('|');

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

// -- make definitions
const definitions = url.searchParams.get("definition")?.split("\n");
definitions.forEach(definition => {
    makeDefinition(definition);
});
