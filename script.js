class Vliegtuig {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vy = 0;
    this.gravity = 0.2;
  }

  drawVliegtuig() {
    fill("red");
    image(img, this.x, this.y, 98, 45)

    this.vy += this.gravity;

    this.y += this.vy;

    if (this.y > 393   ) {
      this.vy = 0;
      this.y = 393;
    }

    if (this.y < 3) {
      this.vy = 0;
      this.y = 3;
    }
  }
}


var vliegtuig;

function preload() {
  img = loadImage("images/vliegtuig.png");
  img2 = loadImage("images/achtergrond.jpg");
}

function setup() {
  createCanvas(500, 400);

  vliegtuig = new Vliegtuig(100,200);

  image(img, 100, 200);
  image(img2, 500, 400)
}


function draw() {
  background(img2);
  
  vliegtuig.drawVliegtuig();

}

function keyPressed() {
  if (keyCode == 32) {
    vliegtuig.vy -= 5;
  }
}