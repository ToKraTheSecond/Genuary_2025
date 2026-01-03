// Genuary 2025
// Day 01: One Color, One Shape

let hueBlue = 210;
let t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 1);
  rectMode(CENTER);
  noFill();
  strokeWeight(2);
}

function draw() {
  background(0, 0, 5);

  const doorW = min(width, height) * 0.28;
  const doorH = doorW * 2;

  const cx = width / 2;
  const cy = height / 2;

  const aBase = 0.25 + 0.2 * sin(t * 0.8);
  const aInner = 0.45 + 0.25 * sin(t * 0.9 + 0.6);
  const aOuter = 0.15 + 0.15 * sin(t * 0.7 + 1.3);

  stroke(hueBlue, 80, 95, aOuter);
  drawDoorRect(cx, cy, doorW, doorH);

  stroke(hueBlue, 80, 95, aBase);
  drawDoorRect(cx, cy, doorW * 0.75, doorH * 0.75);

  stroke(hueBlue, 80, 95, aInner);
  drawDoorRect(cx, cy, doorW * 0.5, doorH * 0.5);

  stroke(hueBlue, 80, 95, 0.35 + 0.25 * sin(t * 1.2 + 2.0));
  const handleW = doorW * 0.02;
  const handleH = doorH * 0.12;
  drawDoorRect(cx + doorW * 0.18, cy, handleW, handleH);

  t += 0.016; // ~60 FPS
}

function drawDoorRect(x, y, w, h) {
  const r = min(w, h) * 0.05;
  rect(x, y, w, h, r);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
