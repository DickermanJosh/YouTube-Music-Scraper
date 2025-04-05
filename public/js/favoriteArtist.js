document.addEventListener("DOMContentLoaded", () => {
  const favoriteStar = document.querySelector("#favorite-star");

  favoriteStar.addEventListener("click", async function () {
    const isFavorited = !this.classList.contains('fa-regular'); // Check if the star is filled
    const userId = document.querySelector("#userId").value;
    const name = document.querySelector("#name").value;
    const api_id = document.querySelector("#api_id").value;
    const bio = document.querySelector("#bio").value;
    const artwork = document.querySelector("#artwork").value;

    const action = isFavorited ? 'remove' : 'add'; // Determine action based on current state

    const response = await fetch(`/artist/${action}/favorite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, name, api_id, bio, artwork }),
    });

    if (response.ok) {
      // Toggle the icon based on the current state
      this.classList.toggle('fa-regular');
    }
  });
});