/*
Algoritmo Solar
by Luiz Felipe

Algoritmo Solar © 2025 by Luiz Felipe is licensed under CC BY 4.0
https://creativecommons.org/licenses/by-nc/4.0/
*/

let total = 500;
let c = 6;
let angleIncrement;
let colors = [], windParams = [];

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100);
  angleIncrement = radians(137.5);
  
  for (let i = 0; i < total; i++) {
    colors.push(color(random(60, 80), random(50, 100), random(80, 100)));
  }
  
  for (let i = 0; i < 5; i++) {
    windParams.push({
      amp: random(10, 50),
      freq: random(0.005, 0.02),
      speed: random(0.005, 0.05),
      yOffset: i * 30 + random(-10, 10),
      phase: random(TWO_PI)
    });
  }
}

function draw() {
  background(0);
  translate(width/2, height/2);
  
  drawWind();
  drawSunRays();

  for (let n = 0; n < total; n++) {
    let angle = n * angleIncrement;
    let r = c * sqrt(n);
    let x = r * cos(angle);
    let y = r * sin(angle);
    
    let size = map(r, 0, width/2, 4, 12);
    
    push();
    translate(x, y);
    rotate(angle + frameCount * 0.02);
    fill(100, 80, 60, 0.8);
    noStroke();
    beginShape();
    vertex(0, 0);
    bezierVertex(size/2, -size, size, -size/2, size, 0);
    bezierVertex(size, size/2, size/2, size, 0, 0);
    endShape(CLOSE);
    pop();
    
    fill(colors[n]);
    ellipse(x, y, 5);
  }
}

function drawWind() {
  noFill();
  strokeWeight(1.5);
  
  for (let p of windParams) {
    stroke(200, 80, 100, 0.3);
    beginShape();
    for (let x = -width/2; x < width/2; x += 10) {
      let y = sin(x * p.freq + frameCount * p.speed + p.phase) * p.amp + p.yOffset;
      vertex(x, y);
    }
    endShape();
    
    p.amp += random(-0.2, 0.2);
    p.amp = constrain(p.amp, 10, 50);
    p.freq += random(-0.0001, 0.0001);
    p.freq = constrain(p.freq, 0.005, 0.02);
    p.yOffset += random(-0.2, 0.2);
  }
}

function drawSunRays() {
  push();
  for (let i = 0; i < 60; i++) {
    let angle = TWO_PI / 60 * i;
    let len = 400 * (0.7 + 0.3 * sin(frameCount * 0.05 + i));
    let x = cos(angle) * len;
    let y = sin(angle) * len;
    stroke(50, 80, 100, 0.2);
    strokeWeight(2);
    line(0, 0, x, y);
  }
  pop();
}
