document.addEventListener("DOMContentLoaded", () => {
  const likeButton = document.querySelector("#thumbs-up");

  likeButton.addEventListener("click", async function () {
    const isFavorited = !this.classList.contains('fa-regular'); // Check if the thumb is filled
    const userId = document.querySelector("#userId").value;
    const playlistId = document.querySelector("#playlistId").value;

    const action = isFavorited ? 'unlike' : 'like'; // Determine action based on current state

    const response = await fetch(`/playlist/${action}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, playlistId }),
    });

    if (response.ok) {
      // Toggle the icon based on the current state
      this.classList.toggle('fa-regular');
      window.location.href = `/playlists/view/${playlistId}`;
    }
  });
});