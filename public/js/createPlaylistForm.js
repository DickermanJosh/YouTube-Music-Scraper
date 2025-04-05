document.addEventListener("DOMContentLoaded", () => {
  const createPlaylistForm = document.querySelector(".create-playlist-form");
  if (createPlaylistForm) {
    createPlaylistForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      const playlistName = document.querySelector("#playlistName").value;
      const isPublic = document.querySelector("#isPublic").checked;
      // console.log('FORM\n' + isPublic);
      
      await fetch("/playlist/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isPublic, playlistName }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.playlistId) {
            window.location.href = `/playlist/edit/${data.playlistId}`;
          } else {
            console.error("Failed to create playlist.");
          }
        })
        .catch((error) => {
          console.error("Error submitting the playlist:", error);
        });
    });
  }
});
