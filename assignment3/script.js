// 기본 배경들
const backgrounds = {
  bg1: "image/bg1.png",
  bg2: "image/bg2.png",
  bg3: "image/bg3.png",
  bg4: "image/bg4.png",
};

// 체력 및 경험치 변수
let health = 100;
let exp = 0;

// 체력과 경험치 바 업데이트 함수
function updateBars() {
  document.querySelector(".health-inner").style.width = health + "%";
  document.querySelector(".exp-inner").style.width = exp + "%";
}

// 버튼 이벤트 설정
document.getElementById("dance-button").addEventListener("click", function () {
  document.querySelector(".background").src = backgrounds.bg1;
  health -= 20; // 체력 감소
  exp += 15; // 경험치 증가
  if (health < 0) health = 0;
  if (exp > 100) exp = 100;
  updateBars(); // 체력 및 경험치 업데이트
});

document.getElementById("tv-button").addEventListener("click", function () {
  document.querySelector(".background").src = backgrounds.bg2;
  health -= 10;
  exp += 10;
  if (health < 0) health = 0;
  if (exp > 100) exp = 100;
  updateBars();
});

document.getElementById("record-button").addEventListener("click", function () {
  document.querySelector(".background").src = backgrounds.bg3;
  health -= 15;
  exp += 20;
  if (health < 0) health = 0;
  if (exp > 100) exp = 100;
  updateBars();
});

document
  .getElementById("concert-button")
  .addEventListener("click", function () {
    document.querySelector(".background").src = backgrounds.bg4;
    health -= 25;
    exp += 30;
    if (health < 0) health = 0;
    if (exp > 100) exp = 100;
    updateBars();
  });

// 초기 상태바 설정
updateBars();
