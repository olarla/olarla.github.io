// script.js
window.addEventListener("DOMContentLoaded", () => {
  // Konva Stage 설정 등 모든 코드 여기 안에!
});
const width = window.innerWidth;
const height = window.innerHeight;

const stage = new Konva.Stage({
  container: "container",
  width: width,
  height: height,
});

const layer = new Konva.Layer();
stage.add(layer);

let isTouching = false;

stage.on("touchstart mousedown", () => {
  isTouching = true;
});

stage.on("touchend mouseup", () => {
  isTouching = false;

  // 페이드아웃 효과
  const overlay = new Konva.Rect({
    x: 0,
    y: 0,
    width: width,
    height: height,
    fill: "white",
    opacity: 0,
  });

  layer.add(overlay);
  layer.moveToTop();
  layer.draw();

  const fade = new Konva.Tween({
    node: overlay,
    duration: 1.2,
    opacity: 0.7,
    easing: Konva.Easings.EaseInOut,
  });

  fade.play();
});

function createRipple(x, y) {
  const circle = new Konva.Circle({
    x: x,
    y: y,
    radius: 10,
    fill: "rgba(173, 216, 230, 0.5)",
    stroke: "#9aefff",
    strokeWidth: 2,
  });

  layer.add(circle);
  layer.draw();

  const tween = new Konva.Tween({
    node: circle,
    duration: 0.6,
    radius: 40,
    opacity: 0,
    onFinish: () => {
      circle.destroy();
      layer.draw();
    },
  });

  tween.play();
}

const synth = new Tone.Synth().toDestination();

function playTone(x) {
  const freq = Tone.Frequency(200 + (x % 200), "hz");
  synth.triggerAttackRelease(freq, "8n");
}

stage.on("touchmove mousemove", (e) => {
  if (!isTouching) return;

  const pos = stage.getPointerPosition();
  if (!pos) return;

  createRipple(pos.x, pos.y);
  playTone(pos.x);
});
