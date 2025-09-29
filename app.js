let selectedSongs = [];    // kiválasztott dalok (lista.js tölti fel)
let currentSong = 0;
let transposeValue = 0;

const chords = ["C","C#","D","D#","E","F","F#","G","G#","A","B","H"];
//const chords = ["C","C#","Db","D","D#","Eb","E","F","F#","Gb","G","G#","Ab","A","A#","Bb","B"];
function renderSong() {
  if (selectedSongs.length === 0) {
    document.getElementById("song").innerHTML = "<i>Nincs kiválasztott dal</i>";
    return;
  }

  let lines = selectedSongs[currentSong].lyrics.split("\n");
  let rendered = lines.map(line => {
    if (line.startsWith(".")) {
      let cleanLine = line.slice(1);
      return cleanLine.replace(/\b([A-H](?:b|#)?m?)\b/g, chord => {
        return `<span class="chord">${transposeChord(chord, transposeValue)}</span>`;
      });
    } else {
      return line;
    }
  }).join("\n");

 
  document.getElementById("song").innerHTML =
    `<h2>${selectedSongs[currentSong].title}</h2><br>` +
    rendered +
    `<br><button onclick="removeCurrentSong()">Eltávolít</button>`;
}

function transposeChord(chord, amount) {
  let minor = chord.includes("m");
  let base = chord.replace("m", "");
  let idx = chords.findIndex(c => c === base);
  if (idx === -1) return chord;
  let newIdx = (idx + amount + chords.length) % chords.length;
  return chords[newIdx] + (minor ? "m" : "");
}

function nextSong() {
  if (selectedSongs.length === 0) return;
  currentSong = (currentSong + 1) % selectedSongs.length;
  transposeValue = 0;
  renderSong();
}

function prevSong() {
  if (selectedSongs.length === 0) return;
  currentSong = (currentSong - 1 + selectedSongs.length) % selectedSongs.length;
  transposeValue = 0;
  renderSong();
}

function transpose(amount) {
  transposeValue += amount;
  renderSong();
}

function removeCurrentSong() {
  if (selectedSongs.length === 0) return;
  selectedSongs.splice(currentSong, 1);

  if (currentSong >= selectedSongs.length) {
    currentSong = selectedSongs.length - 1;
  }

  if (selectedSongs.length === 0) {
    document.getElementById("song").innerHTML = "<i>Nincs kiválasztott dal</i>";
  } else {
    renderSong();
  }
}
