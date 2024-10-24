let health = 100; // 초기 체력
let exp = 0; // 초기 경험치
let level = 1; // 초기 레벨

// 각 배경 이미지
const backgrounds = {
  dance: "image/bg1.png",
  tv: "image/bg2.png",
  record: "image/bg3.png",
  concert: "image/bg4.png",
  sleep: "image/bg1.png", // 기본 배경
};

// 캐릭터 이미지들 (레벨에 따른 복장 변화)
const characters = {
  1: "image/lv1.png",
  2: "image/lv2.png",
  3: "image/lv3.png",
  4: "image/lv4.png",
};

// 배경 이미지, 캐릭터 요소 가져오기
const background = document.getElementById("background");
const character = document.getElementById("character");

// 체력/경험치 바 요소 가져오기
const healthInner = document.getElementById("health-inner");
const expInner = document.getElementById("exp-inner");

// 레벨 텍스트 요소 가져오기
const levelText = document.getElementById("level-text");

// 버튼에 이벤트 리스너 추가
document.getElementById("dance-button").addEventListener("click", () => {
  updateBackground("dance");
  updateStats(-20, 10); // 체력 -20, 경험치 +10
});

document.getElementById("tv-button").addEventListener("click", () => {
  updateBackground("tv");
  updateStats(-15, 15); // 체력 -15, 경험치 +15
});

document.getElementById("record-button").addEventListener("click", () => {
  updateBackground("record");
  updateStats(-10, 20); // 체력 -10, 경험치 +20
});

document.getElementById("concert-button").addEventListener("click", () => {
  updateBackground("concert");
  updateStats(-25, 25); // 체력 -25, 경험치 +25
});

document.getElementById("sleep-button").addEventListener("click", () => {
  updateBackground("sleep");
  updateStats(50, 0); // 체력 +50, 경험치 변화 없음
});

// 배경 업데이트 함수
function updateBackground(activity) {
  background.src = backgrounds[activity]; // 배경 이미지 변경
}

// 체력 및 경험치 업데이트 함수
function updateStats(healthChange, expChange) {
  // 체력 업데이트
  health += healthChange;
  if (health < 0) health = 0; // 체력이 0 아래로 떨어지지 않도록
  if (health > 100) health = 100; // 체력이 100 이상으로 올라가지 않도록
  healthInner.styles.height = health + "%"; // 체력 게이지 업데이트

  // 경험치 업데이트
  exp += expChange;
  if (exp >= 100) {
    exp = 0; // 경험치가 100이 넘으면 다시 0으로
    levelUp(); // 레벨업 호출
  }
  expInner.style.height = exp + "%"; // 경험치 게이지 업데이트
}

// 레벨업 함수
function levelUp() {
  level++;
  if (level > 4) level = 4; // 레벨 4 이상으로 올라가지 않도록
  levelText.textContent = `Lv.${level}`; // 레벨 텍스트 업데이트
  character.src = characters[level]; // 캐릭터 이미지 변경
}
