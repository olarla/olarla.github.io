let health = 100; // Initial health set to 100 for a full bar
let exp = 0; // Initial experience points
let level = 1; // Start level at 1

// Background images for each activity; this allows visual feedback for actions
const backgrounds = {
  dance: "image/bg1.png",
  tv: "image/bg2.png",
  record: "image/bg3.png",
  concert: "image/bg4.png",
  sleep: "image/bg1.png", // Default background during rest
};

// Character images that change with each level, showing progress visually
const characters = {
  1: "image/lv1.png",
  2: "image/lv2.png",
  3: "image/lv3.png",
  4: "image/lv4.png",
};

// Music files provide auditory feedback and enhance immersion
const gameBgm = new Audio("music/gamebgm.mp3"); // Background music during gameplay
gameBgm.volume = 0.7; // Set volume lower to avoid overpowering
gameBgm.loop = true; // Continuous background loop for a consistent experience

const levelUpSound = new Audio("music/levelup.wav"); // Level-up sound for positive reinforcement
const buttonSound = new Audio("music/button.mp3"); // Button sound on action to confirm selection
buttonSound.volume = 0.5;

const popupBgm = new Audio("music/popupbgm.mp3"); // Intro music for the start screen
popupBgm.volume = 0.7;
popupBgm.loop = true; // Looping helps maintain continuity on the intro screen

// BGM activation button, providing control to start music, respecting user preference
document.getElementById("enable-audio").addEventListener("click", () => {
  popupBgm.play(); // Start background music when enabled
  document.getElementById("audio-prompt").style.display = "none"; // Hide prompt
});

// DOM elements for background, character, and status bars
const background = document.getElementById("background");
const character = document.getElementById("character");
const healthInner = document.getElementById("health-inner"); // Health bar
const expInner = document.getElementById("exp-inner"); // Experience bar
const levelText = document.getElementById("level-text"); // Display level

// Play button hides the intro screen and starts the game BGM
const playButton = document.getElementById("play-button");
playButton.addEventListener("click", () => {
  startPage.style.display = "none";
  popupBgm.pause(); // Stop intro BGM
  gameBgm.play(); // Start game BGM for a seamless transition
  document.getElementById("audio-prompt").style.display = "none"; // Hide prompt if still displayed
});

// 'How To' button shows gameplay instructions for user guidance
const howButton = document.getElementById("how-button");
howButton.addEventListener("click", () => {
  howToPopup.style.display = "block"; // Open the guide
});

const closeHow = document.getElementById("close-how"); // Close instructions on click
closeHow.addEventListener("click", () => {
  howToPopup.style.display = "none";
});

// Action buttons to change background and update status with each activity
document.getElementById("dance-button").addEventListener("click", () => {
  updateBackground("dance"); // Show activity background
  updateStats(-20, 10); // Adjust health and EXP
  buttonSound.play(); // Auditory feedback for selection
});

// Repeating the same pattern for other actions with adjusted stats
document.getElementById("tv-button").addEventListener("click", () => {
  updateBackground("tv");
  updateStats(-15, 15);
  buttonSound.play();
});

document.getElementById("record-button").addEventListener("click", () => {
  updateBackground("record");
  updateStats(-10, 20);
  buttonSound.play();
});

document.getElementById("concert-button").addEventListener("click", () => {
  updateBackground("concert");
  updateStats(-25, 25);
  buttonSound.play();
});

document.getElementById("sleep-button").addEventListener("click", () => {
  updateBackground("sleep"); // Rest background
  updateStats(60, 0); // Boost health only
  buttonSound.play();
});

// Updates background image to provide visual feedback for each action
function updateBackground(activity) {
  background.src = backgrounds[activity]; // Set background per activity
}

// Update health and EXP with visual bar and level up effect if applicable
function updateStats(healthChange, expChange) {
  health += healthChange; // Change health
  health = Math.max(0, Math.min(health, 100)); // Keep health between 0 and 100
  healthInner.style.height = health + "%"; // Reflect in health bar

  showStatChange(healthChange, healthChangeText); // Show health change text

  exp += expChange; // Increase EXP
  if (exp >= 100) {
    // If EXP reaches 100, level up
    exp = 0;
    levelUp();
  }
  expInner.style.height = exp + "%"; // Reflect in EXP bar
  showStatChange(expChange, expChangeText); // Show EXP change text
}

// Level up function, plays level up sound, updates level text, and character appearance
function levelUp() {
  level++;
  if (level > 4) level = 4; // Limit max level to 4
  levelText.textContent = `Lv.${level}`; // Update level text

  if (characters[level]) {
    // Change character based on level
    character.src = characters[level];
  }

  levelUpSound.play(); // Play level up sound
  triggerGlitter(); // Trigger glitter effect for visual feedback
}

// Shows health/EXP change near the status bars, a feedback style
const healthChangeText = document.getElementById("health-change");
const expChangeText = document.getElementById("exp-change");

function showStatChange(value, element) {
  element.textContent = value > 0 ? `+${value}` : `${value}`;
  element.classList.add("show-change"); // Show change

  setTimeout(() => {
    element.classList.remove("show-change"); // Remove effect
  }, 1200);
}

// Glitter effect on level up to add excitement
function triggerGlitter() {
  const glitterEffect = document.getElementById("glitter");
  glitterEffect.style.display = "block"; // Show glitter effect
  glitterEffect.classList.add("show"); // Add animation

  setTimeout(() => {
    glitterEffect.classList.remove("show"); // Remove animation
    glitterEffect.style.display = "none"; // Hide glitter effect
  }, 1200);
}
