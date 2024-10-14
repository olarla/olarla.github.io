// Scroll 이벤트를 통해 사용자가 현재 어느 위치에 있는지 표시
window.addEventListener("scroll", function () {
  const scrollPosition = window.scrollY;
  const status = document.getElementById("scroll-status");

  if (scrollPosition < window.innerHeight) {
    status.textContent = "You are at: Start";
  } else if (scrollPosition < window.innerHeight * 2) {
    status.textContent = "You are at: Middle";
  } else {
    status.textContent = "You are at: End";
  }
});

// 클릭 이벤트로 추가 정보를 표시
document.querySelectorAll(".game-element").forEach((element) => {
  element.addEventListener("click", function () {
    alert(
      "You have discovered a secret at " +
        element.querySelector("p").textContent +
        "!"
    );
  });
});
