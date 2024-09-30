// This function ensures the navigation bar stays fixed at the top as the user scrolls down the page.
// It enhances usability by keeping important navigation links always accessible.
window.onscroll = function () {
  stickyNavBar();
};

var navbar = document.getElementById("navbar");
if (navbar) {
  var sticky = navbar.offsetTop;

  function stickyNavBar() {
    if (window.pageYOffset > sticky) {
      navbar.classList.add("sticky"); // Adds the 'sticky' class when scrolling down.
    } else {
      navbar.classList.remove("sticky"); // Removes the 'sticky' class when scrolled back to the top.
    }
  }
}

// Array holding all track data. Each object contains the title and the file path to the audio file.
// This allows for dynamic track management, making it easy to add or remove tracks without altering much of the code.
const tracks = [
  { title: "Supernova", file: "music/supernova.mp3" },
  { title: "Armageddon", file: "music/armageddon.mp3" },
  { title: "Set the Tone", file: "music/setthetone.mp3" },
  { title: "Mine", file: "music/mine.mp3" },
  { title: "Licorice", file: "music/licorice.mp3" },
  { title: "BAHAMA", file: "music/bahama.mp3" },
  { title: "Long Chat(#♥)", file: "music/longchat.mp3" },
  { title: "Prologue", file: "music/prologue.mp3" },
  { title: "Live My Life", file: "music/livemylife.mp3" },
  { title: "Melody", file: "music/melody.mp3" },
];

// Selects all elements that represent the CD images for each track.
// These images are displayed or hidden based on the current track.
const cdImages = document.querySelectorAll(".cd-half");

let currentTrackIndex = 0; // Keeps track of the currently playing track.
let isPlaying = false; // Boolean to check the current playback state (playing or paused).
const audioPlayer = document.getElementById("audio-player"); // Audio element for playing the music.
const playPauseBtn = document.getElementById("play-pause-btn"); // Play/Pause button.
const trackNumberElement = document.querySelector(".track-number"); // Element to display the track number.
const trackTitleElement = document.querySelector(".track-title"); // Element to display the track title.
const progressBar = document.getElementById("progress-bar"); // Progress bar to display playback progress.

// This function updates the track information (title, number) and changes the audio source.
// It provides feedback to the user by visually updating the interface with the correct track data.
function updateTrackInfo() {
  if (currentTrackIndex < 0 || currentTrackIndex >= tracks.length) {
    console.error("Invalid track index:", currentTrackIndex); // Error handling for invalid track index.
    return;
  }

  const currentTrack = tracks[currentTrackIndex];
  trackNumberElement.textContent = `Track ${currentTrackIndex + 1}`; // Displays the current track number.
  trackTitleElement.textContent = currentTrack.title; // Displays the current track title.
  audioPlayer.src = currentTrack.file; // Changes the audio source to the new track.

  // Updates the CD image display. The current track's CD is shown, while others are hidden.
  cdImages.forEach((cd, index) => {
    if (index === currentTrackIndex) {
      cd.classList.remove("hidden-cd", "slide-out"); // Shows the current track's CD.
      cd.classList.add("slide-in");
    } else {
      cd.classList.add("hidden-cd", "slide-out"); // Hides other CDs.
      cd.classList.remove("slide-in");
    }
  });

  progressBar.value = 0; // Resets the progress bar to the start when a new track is selected.
}

// Toggles between playing and pausing the current track. It provides feedback by updating the button icon accordingly.
function togglePlay() {
  if (isPlaying) {
    audioPlayer.pause(); // Pauses the track.
    playPauseBtn.textContent = "▶️"; // Updates the button to show the "play" icon.
  } else {
    audioPlayer.play(); // Plays the track.
    playPauseBtn.textContent = "⏸️"; // Updates the button to show the "pause" icon.
  }

  isPlaying = !isPlaying; // Switches the play state.
}

// Changes to the selected track. When a track is clicked, it updates the track and automatically starts playing.
function changeTrack(trackNumber) {
  if (trackNumber === currentTrackIndex + 1) return; // If the same track is selected, nothing happens.

  currentTrackIndex = trackNumber - 1; // Updates the current track index to the selected track.
  updateTrackInfo(); // Updates the UI and track information.

  // Automatically plays the new track and updates the button state.
  audioPlayer.play();
  playPauseBtn.textContent = "⏸️";
  isPlaying = true;
}

// Moves to the next track in the playlist. It loops back to the first track if the last track is playing.
function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length; // Loops to the first track if needed.
  updateTrackInfo(); // Updates the UI and track information.
  audioPlayer.play(); // Automatically plays the next track.
  playPauseBtn.textContent = "⏸️";
  isPlaying = true;
}

// Moves to the previous track. If the first track is playing, it loops to the last track.
function previousTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length; // Loops to the last track if needed.
  updateTrackInfo();
  audioPlayer.play();
  playPauseBtn.textContent = "⏸️";
  isPlaying = true;
}

// Volume control: increases the audio volume by 10%.
function volumeUp() {
  if (audioPlayer.volume < 1) audioPlayer.volume += 0.1; // Ensures the volume doesn't exceed the maximum value.
}

// Volume control: decreases the audio volume by 10%.
function volumeDown() {
  if (audioPlayer.volume > 0) audioPlayer.volume -= 0.1; // Ensures the volume doesn't go below 0.
}

// Toggles repeat mode on or off.
function toggleRepeat() {
  audioPlayer.loop = !audioPlayer.loop; // Changes the loop state of the audio element.
}

// Updates the progress bar as the audio plays. The progress bar provides visual feedback of how much of the track has played.
function updateProgressBar() {
  progressBar.value = audioPlayer.currentTime; // Sets the progress bar's value to match the current time of the track.
}

// Allows users to change the playback position by clicking or dragging on the progress bar.
progressBar.addEventListener("input", function () {
  audioPlayer.currentTime = progressBar.value; // Updates the current time of the track based on the progress bar's value.
});

// When the audio metadata (such as duration) is loaded, this sets the maximum value of the progress bar to the track's length.
audioPlayer.addEventListener("loadedmetadata", function () {
  progressBar.max = audioPlayer.duration; // Ensures the progress bar matches the track length.
});

// Event listener to set up everything once the page is fully loaded.
document.addEventListener("DOMContentLoaded", function () {
  updateTrackInfo(); // Sets the initial track info when the page loads.

  // Event listener for the play/pause button.
  playPauseBtn.addEventListener("click", togglePlay);

  // Event listener for each track in the playlist.
  const trackItems = document.querySelectorAll(".track-item");
  trackItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      changeTrack(index + 1); // Changes to the selected track when clicked.
    });
  });

  // Automatically moves to the next track when the current track finishes.
  audioPlayer.addEventListener("ended", function () {
    nextTrack();
  });

  // Continuously updates the progress bar as the audio plays.
  audioPlayer.addEventListener("timeupdate", updateProgressBar);

  // Sets up the volume control buttons.
  document
    .querySelector(".fast-forward-btn")
    .addEventListener("click", nextTrack);
  document
    .querySelector(".rewind-btn")
    .addEventListener("click", previousTrack);
  document.querySelector(".volume-up-btn").addEventListener("click", volumeUp);
  document
    .querySelector(".volume-down-btn")
    .addEventListener("click", volumeDown);
  document.querySelector(".repeat-btn").addEventListener("click", toggleRepeat);
});
