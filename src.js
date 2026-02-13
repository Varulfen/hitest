
const codeInput = document.getElementById("code-input");
const solutionDiv = document.getElementById("solution-div");
const artistSpan = document.getElementById("artist");
const yearSpan = document.getElementById("year");
const titleSpan = document.getElementById("title");
const showConclusionButton = document.getElementById("show-conclusion-button");
const messageDiv = document.getElementById("message-div");
const message = document.getElementById("message-p");
let jsonLoaded = false;
let cachedJson = null;
let showingConclusion = false;

document.addEventListener("DOMContentLoaded", () => {
    //showMessage("test");
})

codeInput.addEventListener("input", function() {
    // Nur Zahlen behalten
    let value = this.value.replace(/\D/g, "").slice(0, 6);

    // Nach der 3. Zahl ein Leerzeichen einfügen
    if (value.length > 3) {
        value = value.slice(0, 3) + " " + value.slice(3);
    }

    this.value = value;
});

function startPlay() {
    const searchCode = codeInput.value.replace(" ", "");
    //getAllCodes(); // no then needed, prints array to console
    getEntry(searchCode).then(entry => {
        if(!jsonLoaded) {
            showMessage("JSON konnte nicht geladen werden");
        }
        else if (entry) {
            hideMessageDiv();
            embedVideo(entry.url);
            hideConclusion();
            setConclusion(entry);
        } else {
            showMessage("Code wurde nicht gefunden");
            stopPlayer();
        }
    });
}

// Messages
function showMessage(content) {
    message.textContent = content;
    messageDiv.hidden = false;
}
function hideMessageDiv() {
    message.textContent = "";
    messageDiv.hidden = true;
}

function clearInput() {
    codeInput.value = "";
}

// Solutions
function showHideConclusion() {
    if(showingConclusion) {
        hideConclusion()
    }
    else {
        showConclusion();
    }
}
function showConclusion() {
    showingConclusion = true;
    showConclusionButton.textContent = "Lösung ausblenden";
    solutionDiv.hidden = false;
}
function hideConclusion() {
    showingConclusion = false;
    showConclusionButton.textContent = "Lösung anzeigen";
    solutionDiv.hidden = true;
}
function setConclusion(entry) {
    artistSpan.textContent = entry.artist;
    yearSpan.textContent = entry.year;
    titleSpan.textContent = entry.title;
}

// Funktionen zum Lesen des JSON
async function loadData() {
    if (cachedJson) return cachedJson;

    const response = await fetch("/src/next-try/codes.json");
    if (!response.ok) {
        return null;
    }
    else {
        cachedJson = await response.json();
        return cachedJson;
    }
}
async function getEntry(code) {
    const data = await loadData();
    if (!data) {
        jsonLoaded = false;
        return null;
    }
    else {
        jsonLoaded = true;
        return data[code];
    }
}
async function getAllCodes() {
    const data = await loadData();
    if (data)  {
        await (async () => {
            const codes = Object.keys(data);
            console.log(codes);
        })();
    }
}


