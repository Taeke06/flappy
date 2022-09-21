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

    if (this.y > 323) {
      this.vy = 0;
      this.y = 323;
    }

    if (this.y < 0) {
      this.vy = 0;
      this.y = 0;
    }
  }
}

class rechthoek {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = "red";
  }

  drawrechthoek() {
    fill(this.color);
    rect(this.x, this.y, this.w, this.h);
    this.x += -3;
  }
}

var pipes = [];
var vliegtuig;

function preload() {
  img = loadImage("images/vliegtuig.png");
  img2 = loadImage("images/achtergrondje.jpg");
}

function setup() {
  createCanvas(626, 368);

  vliegtuig = new Vliegtuig(100,200);

  image(img, 100, 200);
  image(img2, 500, 400)
}


function draw() {
  background(img2);

  if (frameCount % 85 == 0) {


    randomheight = random(height - 150);

    pijp1 = new rechthoek(700, 0, 50, randomheight)
    pijp2 = new rechthoek(700, randomheight + 150, 50, 300)

    pipes.push(pijp1);
    pipes.push(pijp2);

    // remove unnessecary pipes
    if (pipes.length > 6) {
      pipes.splice(0, 2);
    }
  }

    pipes.forEach((p) => {
    p.drawrechthoek()
  });
  
  vliegtuig.drawVliegtuig();

}

function keyPressed() {
  if (keyCode == 32) {
    vliegtuig.vy -= 5;
  }
}
