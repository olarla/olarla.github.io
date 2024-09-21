function playTrack(videoUrl) {
  var playerContainer = document.getElementById("player-container");
  var youtubePlayer = document.getElementById("youtube-player");

  youtubePlayer.src = videoUrl;
  playerContainer.classList.remove("hidden");
}
