// 초기 설정: 체력, 경험치, 레벨
let health = 100;
let experience = 100;
let level = 1;

// 체력 및 경험치 바 업데이트 함수
function updateBars() {
  // 체력 바 너비 변경
  document.querySelector(".health-inner").style.width = health + "%";
  // 경험치 바 너비 변경
  document.querySelector(".exp-inner").style.width = experience + "%";
  // 레벨 텍스트 업데이트
  document.querySelector(".level-text").textContent = "Lv." + level;
}

// 배경 변경 함수
function changeBackground(newBg) {
  document.getElementById("background").src = newBg;
}

// 버튼 이벤트 리스너 추가
document.getElementById("dance-button").addEventListener("click", function () {
  health = Math.max(0, health - 20); // 체력 감소 (최소 0)
  experience = Math.min(100, experience + 15); // 경험치 증가 (최대 100)
  updateBars();
});

document.getElementById("tv-button").addEventListener("click", function () {
  document.getElementById("background").src = "image/bg2.png";
});

document.getElementById("record-button").addEventListener("click", function () {
  document.getElementById("background").src = "image/bg3.png";
});

document
  .getElementById("concert-button")
  .addEventListener("click", function () {
    document.getElementById("background").src = "image/bg4.png";
  });

document.getElementById("sleep-button").addEventListener("click", function () {
  document.getElementById("background").src = "image/bg1.png"; // Reset to original background
});

// 게임 초기화
updateBars(); // 처음에 체력 및 경험치 바를 가득 채운 상태로 시작
