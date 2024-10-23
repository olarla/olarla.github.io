let currentLevel = 1;
let health = 100; // Health starts at 100
let exp = 0; // Experience starts at 0
const maxHealth = 100;
const maxExp = 100;

const characterElement = document.getElementById("current-character");
const backgroundElement = document.getElementById("current-bg");
const healthFill = document.getElementById("health-fill");
const expFill = document.getElementById("exp-fill");

// Array of background and character image paths
const backgrounds = [
  "image/bg1.png",
  "image/bg2.png",
  "image/bg3.png",
  "image/bg4.png",
];
const characters = [
  "image/lv1.png",
  "image/lv2.png",
  "image/lv3.png",
  "image/lv4.png",
];

// Sound elements
const bgMusic = document.getElementById("bg-music");
const danceSound = document.getElementById("sound-dance");
const tvSound = document.getElementById("sound-tv");
const recordSound = document.getElementById("sound-record");
const concertSound = document.getElementById("sound-concert");

// Play background music
bgMusic.play();

// Function to update health and experience bars
function updateBars() {
  healthFill.style.width = (health / maxHealth) * 100 + "%";
  expFill.style.width = (exp / maxExp) * 100 + "%";
}

// Function to change background and play sound
function changeBackground(index, sound) {
  backgroundElement.src = backgrounds[index];
  sound.play();
}

// Button listeners
document.getElementById("dance-button").addEventListener("click", () => {
  changeBackground(0, danceSound);
  health -= 10;
  exp += 15;
  updateBars();
});

document.getElementById("tv-button").addEventListener("click", () => {
  changeBackground(1, tvSound);
  health -= 5;
  exp += 10;
  updateBars();
});

document.getElementById("recorder-button").addEventListener("click", () => {
  changeBackground(2, recordSound);
  health -= 20;
  exp += 25;
  updateBars();
});

document.getElementById("concert-button").addEventListener("click", () => {
  changeBackground(3, concertSound);
  health -= 15;
  exp += 20;
  updateBars();
});

// Initialize bars
updateBars();
