//Initial helath set to 100 for a full bar, experience points, and starts level at 1
let health = 100;
let exp = 0;
let level = 1;

// Background images for each activity
const backgrounds = {
  dance: "image/bg1.png",
  tv: "image/bg2.png",
  record: "image/bg3.png",
  concert: "image/bg4.png",
  sleep: "image/bg1.png",
};

// Character images that change with each level, showing fancy progress visually
const characters = {
  1: "image/lv1.png",
  2: "image/lv2.png",
  3: "image/lv3.png",
  4: "image/lv4.png",
};

// Music files suit with game theme -Background music during gameplay
const gameBgm = new Audio("music/gamebgm.mp3");
gameBgm.volume = 0.7;
gameBgm.loop = true; // Continuous backgroundd loop for a consistence experience

//Level-up sound for positive reinforcement
const levelUpSound = new Audio("music/levelup.wav");
//Button sound on action
const buttonSound = new Audio("music/button.mp3");
buttonSound.volume = 0.7;

// Intro music for the start screen
const popupBgm = new Audio("music/popupbgm.mp3");
popupBgm.volume = 0.7;
popupBgm.loop = true;

// BGM activation button, providing control to start music, respecting user preference
document.getElementById("enable-audio").addEventListener("click", () => {
  popupBgm.play(); // Start background music when enabled
  document.getElementById("audio-prompt").style.display = "none"; // 배경음 켜달라는 메시지 숨김
});

// DOM elements for background, character, status bars, and display level
const background = document.getElementById("background");
const character = document.getElementById("character");
const healthInner = document.getElementById("health-inner");
const expInner = document.getElementById("exp-inner");
const levelText = document.getElementById("level-text");

// Play button hides the intro screen and starts the game BGM
const playButton = document.getElementById("play-button");
const howButton = document.getElementById("how-button");
const howToPopup = document.getElementById("how-to-popup");
const startPage = document.getElementById("start-page");
const glitterEffect = document.getElementById("glitter");
const closeHow = document.getElementById("close-how");

// Close instructions on click
playButton.addEventListener("click", () => {
  startPage.style.display = "none";
  popupBgm.pause();
  gameBgm.play();
  document.getElementById("audio-prompt").style.display = "none"; // 배경음 켜달라는 메시지 숨김
});

// 'How To' button shows gameplay instructions for user guidance
howButton.addEventListener("click", () => {
  howToPopup.style.display = "block";
});

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
  background.src = backgrounds[activity];
}

// Update health and EXP with visual bar and level up effect if applicable
function updateStats(healthChange, expChange) {
  health += healthChange;
  if (health < 0) health = 0;
  if (health > 100) health = 100;
  healthInner.style.height = health + "%"; // Reflect in health bar

  showStatChange(healthChange, healthChangeText);

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

  levelUpSound.play(); // Play level-up sound
  triggerGlitter(); // Trigger glitter effect
}

// Shows health/EXP change near the status bars
const healthChangeText = document.getElementById("health-change");
const expChangeText = document.getElementById("exp-change");

// Show change
function showStatChange(value, element) {
  element.textContent = value > 0 ? `+${value}` : `${value}`;
  element.classList.add("show-change");

  setTimeout(() => {
    element.classList.remove("show-change");
  }, 1200);
}

// Glitter effect on level up to add excitement
function triggerGlitter() {
  const glitterEffect = document.getElementById("glitter");
  glitterEffect.style.display = "block";
  glitterEffect.classList.add("show");

  setTimeout(() => {
    glitterEffect.classList.remove("show");
    glitterEffect.style.display = "none";
  }, 1200); // Hide glitter effect
}
