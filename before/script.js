const width = window.innerWidth;
const height = window.innerHeight;

const stage = new Konva.Stage({
  container: "container",
  width: width,
  height: height,
});

const layer = new Konva.Layer();
stage.add(layer);

let isDragging = false;
let lastPos = null;
let lastTime = null;

stage.on("mousedown", () => {
  isDragging = true;
});

stage.on("mouseup", () => {
  isDragging = false;
  lastPos = null;
  lastTime = null;
});

stage.on("mousemove", (e) => {
  if (!isDragging) return;

  const pos = stage.getPointerPosition();
  const now = performance.now();

  if (lastPos && lastTime) {
    const dx = pos.x - lastPos.x;
    const dy = pos.y - lastPos.y;
    const dt = (now - lastTime) / 1000;
    const speed = Math.sqrt(dx * dx + dy * dy) / dt;

    createParticle(pos.x, pos.y, speed);
  }

  lastPos = pos;
  lastTime = now;
});

function createParticle(x, y, speed) {
  // 🎨 색상 = x 좌표 기반 무지개 hue
  const hue = (x / width) * 360;
  const color = `hsl(${hue}, 100%, 70%)`;

  const baseRadius = Math.min(60, speed / 25);

  const shape = new Konva.Circle({
    x: x,
    y: y,
    radius: baseRadius,
    opacity: 0.6,
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
  shape.blurRadius(15);

  layer.add(shape);
  layer.draw();

  new Konva.Tween({
    node: shape,
    duration: 1.2,
    opacity: 0,
    onFinish: () => {
      shape.destroy();
      layer.draw();
    },
  }).play();
}
