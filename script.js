class Vliegtuig {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 98;
    this.h = 45;
    this.vy = 0;
    this.gravity = 0.2;
  }

  drawVliegtuig() {
    fill("red");
    image(img, this.x, this.y, this.w, this.h)

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

  hit() {
   if (vliegtuig.x < this.x + this.w && vliegtuig.x + vliegtuig.w / 2 > this.x) {
    if (vliegtuig.y < this.y + this.h && vliegtuig.y + vliegtuig.w / 2 > this.y) {
      this.color = "green";
    }
  }
    else {
      this.color = "red";
    }
  }
}



var pipes = [];
var vliegtuig;

function preload() {
  img = loadImage("images/ryanair.webp");
  img2 = loadImage("images/achtergrondje.jpg");
}

function setup() {
  createCanvas(626, 368);

  vliegtuig = new Vliegtuig(100, 200);

  image(img, 100, 200);
  image(img2, 626, 368);
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
    p.drawrechthoek();
    p.hit();
  });

  vliegtuig.drawVliegtuig();

}

function keyPressed() {
  if (keyCode == 32) {
    vliegtuig.vy -= 5;
  }
}
