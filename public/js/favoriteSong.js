document.addEventListener("DOMContentLoaded", () => {
  const favoriteStar = document.querySelector("#favorite-star");

  favoriteStar.addEventListener("click", async function () {
    const isFavorited = !this.classList.contains('fa-regular'); // Check if the star is filled
    const userId = document.querySelector("#userId").value;
    const youtubeId = document.querySelector("#youtubeId").value;
    const title = document.querySelector("#title").value;
    const artist = document.querySelector("#artist").value;
    const album = document.querySelector("#album").value;
    const genre = document.querySelector("#genre").value;
    const time = document.querySelector("#time").value;
    const releaseDate = document.querySelector("#releaseDate").value;
    const artwork = document.querySelector("#artwork").value;

    const action = isFavorited ? 'remove' : 'add'; // Determine action based on current state

    const response = await fetch(`/song/${action}/favorite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, youtubeId, title, artist, album, genre, time, releaseDate, artwork }),
    });

    if (response.ok) {
      // Toggle the icon based on the current state
      this.classList.toggle('fa-regular');
    }
  });
});