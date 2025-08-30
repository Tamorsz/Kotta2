let availableSongs = [];

async function loadSongList() {
  try {
    const response = await fetch("songs.json");
    const data = await response.json();
    availableSongs = data.songs;
    renderSongList();
  } catch (error) {
    console.error("Hiba a lista betöltésekor:", error);
  }
}

function renderSongList() {
  const listEl = document.getElementById("allSongs");
  listEl.innerHTML = "";
  availableSongs.forEach((song, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      <span>${song.title}</span>
      <button onclick="addSong(${index})">Hozzáad</button>
    `;
    listEl.appendChild(li);
  });
}

function addSong(index) {
  selectedSongs.push(availableSongs[index]);
  if (selectedSongs.length === 1) {
    currentSong = 0;
    transposeValue = 0;
    renderSong();
  }
}

loadSongList();
