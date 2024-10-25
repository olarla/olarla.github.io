let health = 100;
let exp = 0;
let level = 1;

// 각 배경 이미지
const backgrounds = {
  dance: "image/bg1.png",
  tv: "image/bg2.png",
  record: "image/bg3.png",
  concert: "image/bg4.png",
  sleep: "image/bg1.png",
};

// 캐릭터 이미지들 (레벨에 따른 복장 변화)
const characters = {
  1: "image/lv1.png",
  2: "image/lv2.png",
  3: "image/lv3.png",
  4: "image/lv4.png",
};

// 음악 파일 설정
const gameBgm = new Audio("music/gamebgm.mp3");
gameBgm.volume = 0.5;
gameBgm.loop = true;

const levelUpSound = new Audio("music/levelup.wav");
const buttonSound = new Audio("music/button.mp3");
buttonSound.volume = 0.5;

const popupBgm = new Audio("music/popupbgm.mp3");
popupBgm.volume = 0.5;
popupBgm.loop = true;

// BGM 활성화 버튼
document.getElementById("enable-audio").addEventListener("click", () => {
  popupBgm.play();
  document.getElementById("audio-prompt").style.display = "none"; // 배경음 켜달라는 메시지 숨김
});

// 배경 이미지, 캐릭터 요소 가져오기
const background = document.getElementById("background");
const character = document.getElementById("character");

// 체력/경험치 바 요소 가져오기
const healthInner = document.getElementById("health-inner");
const expInner = document.getElementById("exp-inner");

// 레벨 텍스트 요소 가져오기
const levelText = document.getElementById("level-text");

// 게임 시작 화면 팝업 버튼
const playButton = document.getElementById("play-button");
const howButton = document.getElementById("how-button");
const howToPopup = document.getElementById("how-to-popup");
const startPage = document.getElementById("start-page");
const glitterEffect = document.getElementById("glitter");

// 팝업 닫기 버튼
const closeHow = document.getElementById("close-how");

// Play 버튼 클릭 시 팝업 BGM 멈추고 게임 BGM 시작
playButton.addEventListener("click", () => {
  startPage.style.display = "none";
  popupBgm.pause();
  gameBgm.play();
  document.getElementById("audio-prompt").style.display = "none"; // 배경음 켜달라는 메시지 숨김
});

// How To 팝업 열기
howButton.addEventListener("click", () => {
  howToPopup.style.display = "block";
});

// How To 팝업 닫기
closeHow.addEventListener("click", () => {
  howToPopup.style.display = "none";
});

// 버튼에 이벤트 리스너 추가
document.getElementById("dance-button").addEventListener("click", () => {
  updateBackground("dance");
  updateStats(-20, 10);
  buttonSound.play();
});

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
  updateBackground("sleep");
  updateStats(60, 0);
  buttonSound.play();
});

// 배경 업데이트 함수
function updateBackground(activity) {
  background.src = backgrounds[activity];
}

// 체력 및 경험치 업데이트 함수
function updateStats(healthChange, expChange) {
  health += healthChange;
  if (health < 0) health = 0;
  if (health > 100) health = 100;
  healthInner.style.height = health + "%";

  showStatChange(healthChange, healthChangeText);

  exp += expChange;
  if (exp >= 100) {
    exp = 0;
    levelUp();
  }
  expInner.style.height = exp + "%";

  showStatChange(expChange, expChangeText);
}

// 레벨업 함수
function levelUp() {
  level++;
  if (level > 4) level = 4;
  levelText.textContent = `Lv.${level}`;

  if (characters[level]) {
    character.src = characters[level];
  }

  levelUpSound.play();
  triggerGlitter();
}

// 체력/경험치 변화 텍스트 요소 가져오기
const healthChangeText = document.getElementById("health-change");
const expChangeText = document.getElementById("exp-change");

// 변화 텍스트를 화면에 표시하는 함수
function showStatChange(value, element) {
  element.textContent = value > 0 ? `+${value}` : `${value}`;
  element.classList.add("show-change");

  setTimeout(() => {
    element.classList.remove("show-change");
  }, 1200);
}
function triggerGlitter() {
  const glitterEffect = document.getElementById("glitter");
  glitterEffect.style.display = "block";
  glitterEffect.classList.add("show");

  setTimeout(() => {
    glitterEffect.classList.remove("show");
    glitterEffect.style.display = "none";
  }, 1200); // 1.2초 후 글리터 효과 제거
}
