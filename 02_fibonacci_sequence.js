// Genuary 2025
// Day 03: Fibonacci forever. Create a work that uses the Fibonacci sequence in some way.

// TODO: introduce color gradients
// TODO: draw diagonals or golden ratio curve instead of numbers

let fib = [];
let n = 15;
let s = 20;
let angle = 0;

let drawIndex = 1;
let lastStep = 0;
let stepDelay = 120;

function setup() {
  createCanvas(900, 900);
  textAlign(CENTER, CENTER);
  textSize(14);

  fib[0] = 1;
  fib[1] = 1;
  for (let i = 2; i < n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
}

function draw() {
  background(245);

  let bounds = computeBounds(drawIndex);
  // TODO make the transition more smooth
  let zoom = min(width, height) / (bounds * 1.2);

  // stroke grows as more squares are revealed
  // TODO make the transition more smooth
  let strokeW = map(drawIndex, 1, fib.length, 0.1, 4);

  push();
  translate(width / 2, height / 2);
  scale(zoom);
  rotate(angle);
  translate(-width / 2, -height / 2);

  drawSquares(drawIndex, strokeW);

  pop();

  angle += 0.002;

  if (frameCount - lastStep > stepDelay && drawIndex < fib.length) {
    drawIndex++;
    lastStep = frameCount;
  }
}

function computeBounds(limit) {
  let x = 0;
  let y = 0;
  let w = fib[0] * s;

  let left = x;
  let right = x + w;
  let top = y;
  let bottom = y + w;

  let dir = 0;

  for (let i = 1; i < limit; i++) {
    let size = fib[i] * s;

    if (dir === 0) {
      x = right;
      y = top;
      right += size;
    } else if (dir === 1) {
      x = right - size;
      y = top - size;
      top -= size;
    } else if (dir === 2) {
      x = left - size;
      y = bottom - size;
      left -= size;
    } else if (dir === 3) {
      x = left;
      y = bottom;
      bottom += size;
    }

    dir = (dir + 1) % 4;
  }

  return max(right - left, bottom - top);
}

function drawSquares(limit, strokeW) {
  let x = width / 2;
  let y = width / 2;
  let w = fib[0] * s;

  let left = x;
  let right = x + w;
  let top = y;
  let bottom = y + w;

  drawSquare(x, y, fib[0], strokeW);

  let dir = 0;

  for (let i = 1; i < limit; i++) {
    let size = fib[i] * s;

    if (dir === 0) {
      x = right;
      y = top;
      right += size;
    } else if (dir === 1) {
      x = right - size;
      y = top - size;
      top -= size;
    } else if (dir === 2) {
      x = left - size;
      y = bottom - size;
      left -= size;
    } else if (dir === 3) {
      x = left;
      y = bottom;
      bottom += size;
    }

    drawSquare(x, y, fib[i], strokeW);
    dir = (dir + 1) % 4;
  }
}

function drawSquare(x, y, value, strokeW) {
  let size = value * s;
  stroke(0);
  strokeWeight(strokeW);
  noFill();
  rect(x, y, size, size);

  noStroke();
  fill(0);
  text(value, x + size / 2, y + size / 2);
}
