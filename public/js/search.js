document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#searchForm").onsubmit = (event) => {
    event.preventDefault();
    checkSearchQuery();
  };

  const modalSearchForm = document.querySelector("#modalSearchForm");
  modalSearchForm.addEventListener("submit", async (event) => {
    event.preventDefault(); 

    const songInput = document.getElementById("modalSongInput").value.trim();
    const artistInput = document.getElementById("modalArtistInput").value.trim();
    const resultsContainer = document.getElementById("searchResults");
    const playlistId = document.querySelector("#modalPlaylistId").value.trim();

    if (songInput) {
      const query = `song-name=${encodeURIComponent(songInput)}&artist-name=${encodeURIComponent(artistInput)}&playlistId=${playlistId}`;
      const response = await fetch(`/modal-song-search-results?${query}`);
      const htmlContent = await response.text(); 
      // console.log(htmlContent);
      // Display fetched songs in the modal
      resultsContainer.innerHTML = htmlContent; 
    } else {
      alert("Please enter a song to search.");
    }
  });
  document.querySelectorAll(".modal-song").forEach(button => {
    button.addEventListener("click", function() {
      const songData = {
        playlistId: this.getAttribute("data-playlistid"),
        youtubeId: this.getAttribute("data-youtubeid"),
        title: this.getAttribute("data-title"),
        artist: this.getAttribute("data-artist"),
        durationInSeconds: this.getAttribute("data-durationinseconds"),
        artwork: this.getAttribute("data-artwork")
      };

      fetch("/playlist/add/song", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(songData)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Song added:', data);
        // update the UI to reflect the change
      })
      .catch(error => {
        console.error('Error adding song to playlist:', error);
      });
    });
  });
});

function checkSearchQuery() {
  const songInput = document.getElementById("songInput").value.trim();
  const artistInput = document.getElementById("artistInput").value.trim();
  
  if (songInput && artistInput) { // If both fields are filled out, search for songs and attempt filtering by artist
    window.location.href = `/song-search-results?song-name=${encodeURIComponent(songInput)}&artist-name=${encodeURIComponent(artistInput)}`;
  } else if (songInput) { // If only the song fieldis filled out, search for songs without artist filter
    window.location.href = `/song-search-results?song-name=${encodeURIComponent(songInput)}`;
  } else if (artistInput) { // If only artist is filled out, search for only artists
    window.location.href = `/artist-search-results?artist-name=${encodeURIComponent(artistInput)}`;
  } else {
    alert("Please enter a song or an artist to search.");
  }
}