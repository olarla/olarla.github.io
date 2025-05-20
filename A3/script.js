const width = window.innerWidth;
const height = window.innerHeight;

const stage = new Konva.Stage({
  container: "container",
  width: width,
  height: height,
});

// Motion Echo Meter 피드백 표시용 DOM 생성
const feedbackDisplay = document.createElement("div");
feedbackDisplay.style.position = "absolute";
feedbackDisplay.style.top = "20px";
feedbackDisplay.style.left = "20px";
feedbackDisplay.style.color = "white";
feedbackDisplay.style.fontSize = "20px";
feedbackDisplay.style.fontFamily = "sans-serif";
feedbackDisplay.style.background = "rgba(0,0,0,0.5)";
feedbackDisplay.style.padding = "8px 14px";
feedbackDisplay.style.borderRadius = "12px";
feedbackDisplay.style.display = "none";
document.body.appendChild(feedbackDisplay);

function showMotionFeedback(speed) {
  let feedback = "";
  let color = "white";

  if (speed < 300) {
    feedback = "Calm";
    color = "#a3c9ff";
  } else if (speed < 700) {
    feedback = "Flowing";
    color = "#9ef3e0";
  } else if (speed < 1200) {
    feedback = "Burst";
    color = "#ffb4e2";
  } else {
    feedback = "Chaos";
    color = "#fffb95";
  }

  feedbackDisplay.textContent = feedback;
  feedbackDisplay.style.color = color;
  feedbackDisplay.style.display = "block";
  clearTimeout(feedbackDisplay._hideTimeout);
  feedbackDisplay._hideTimeout = setTimeout(() => {
    feedbackDisplay.style.display = "none";
  }, 1000);
}

const intro = document.getElementById("intro");
intro.addEventListener("click", () => {
  document.querySelector(".left").style.transform = "translateX(-100%)";
  document.querySelector(".right").style.transform = "translateX(100%)";
  document.querySelector(".enter-text").style.opacity = "0";
  intro.classList.add("fade-glow");
  setTimeout(() => {
    intro.style.display = "none";
  }, 1500);
});

// 정식 레이어 순서대로 배치
const baseLayer = new Konva.Layer();
stage.add(baseLayer);

// ⚫ 블랙 배경용 리셋 레이어
const layer = new Konva.Layer();
const background = new Konva.Rect({
  x: 0,
  y: 0,
  width: width,
  height: height,
  fill: "black",
  opacity: 0,
  listening: false,
});
layer.add(background);
stage.add(layer);

let isDragging = false;
let lastPos = null;
let lastTime = null;
let idleTimeout = null;
let particles = [];
let clickCount = 0;

const connectorLayer = new Konva.Layer();
stage.add(connectorLayer);

function distance(a, b) {
  const dx = a.x() - b.x();
  const dy = a.y() - b.y();
  return Math.sqrt(dx * dx + dy * dy);
}

function drawConnections() {
  connectorLayer.destroyChildren();
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dist = distance(particles[i], particles[j]);
      if (dist < 100) {
        const opacity = 1 - dist / 100;
        const line = new Konva.Line({
          points: [
            particles[i].x(),
            particles[i].y(),
            particles[j].x(),
            particles[j].y(),
          ],
          stroke: "rgba(255,255,255," + opacity + ")",
          strokeWidth: 1,
        });
        connectorLayer.add(line);
      }
    }
  }
  connectorLayer.batchDraw();
}

function startIdleTimer() {
  if (idleTimeout) clearTimeout(idleTimeout);
  idleTimeout = setTimeout(() => {
    const fade = new Konva.Tween({
      node: background,
      duration: 3,
      opacity: 0.1,
      onFinish: () => {
        background.opacity(0);
        layer.draw();
      },
    });
    fade.play();
  }, 5000);
}

stage.on("mousedown", () => {
  isDragging = true;
  startIdleTimer();
});

stage.on("mouseup", () => {
  isDragging = false;
  startIdleTimer();
  clickCount++;

  if (clickCount >= 10) {
    clickCount = 0;
    for (let i = 0; i < 30; i++) {
      const randX = Math.random() * width;
      const randY = Math.random() * height;
      createParticle(randX, randY, 300 + Math.random() * 200, true, true);
    }
  } else {
    for (let i = 0; i < 8; i++) {
      const randX = Math.random() * width;
      const randY = Math.random() * height;
      createParticle(randX, randY, 150 + Math.random() * 200, true);
    }
  }

  const fade = new Konva.Tween({
    node: background,
    duration: 1.5,
    opacity: 0.2,
    onFinish: () => {
      background.opacity(0);
      layer.draw();
    },
  });
  fade.play();
});

stage.on("mousemove", (e) => {
  if (!isDragging) return;

  const pos = stage.getPointerPosition();
  const timeNow = performance.now();
  startIdleTimer();

  if (lastPos && lastTime) {
    const dx = pos.x - lastPos.x;
    const dy = pos.y - lastPos.y;
    const dt = (timeNow - lastTime) / 1000;
    const speed = Math.sqrt(dx * dx + dy * dy) / dt;

    createParticle(pos.x + dx * 0.3, pos.y + dy * 0.3, speed);
    showMotionFeedback(speed);
  }

  lastPos = pos;
  lastTime = timeNow;
});

function createParticle(x, y, speed, isCluster = false, isHighlight = false) {
  const hue = 200 + Math.random() * 30;
  const lightness = 75 + Math.random() * 15;
  const color = `hsl(${hue}, 100%, ${lightness}%)`;

  const baseRadius = isHighlight ? 6 : Math.min(60, speed / 25);
  const opacity = isHighlight ? 1.0 : 0.6;
  const blur = isHighlight ? 5 : 15;

  const shape = new Konva.Circle({
    x: x,
    y: y,
    radius: baseRadius,
    opacity: opacity,
  });

  shape.fillRadialGradientStartPoint({ x: 0, y: 0 });
  shape.fillRadialGradientEndPoint({ x: 0, y: 0 });
  shape.fillRadialGradientStartRadius(0);
  shape.fillRadialGradientEndRadius(baseRadius);
  shape.fillRadialGradientColorStops([
    0,
    "white",
    0.3,
    color,
    1,
    "transparent",
  ]);

  shape.cache();
  shape.filters([Konva.Filters.Blur]);
  shape.blurRadius(blur);

  layer.add(shape);
  layer.draw();
  particles.push(shape);
  drawConnections();

  if (!isCluster) {
    const synth = new Tone.Synth({
      oscillator: { type: "sine" },
      envelope: { attack: 0.01, decay: 0.1, sustain: 0.2, release: 0.5 },
    }).toDestination();
    const pitch = 200 + Math.min(800, speed * 2);
    synth.triggerAttackRelease(pitch, "8n");
  }

  new Konva.Tween({
    node: shape,
    duration: 1.2,
    opacity: 0,
    onFinish: () => {
      particles = particles.filter((p) => p !== shape);
      shape.destroy();
      drawConnections();
      layer.draw();
    },
  }).play();
}
