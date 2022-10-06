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
    image(img, this.x, this.y, this.w, this.h);

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
  constructor(x, y, w, h, img) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img;
    this.color = "red";
  }

  drawrechthoek() {
    fill(this.color);
    rect(this.img, this.x, this.y, this.w, this.h);
    this.x += -3;
  }

  hit() {
   if (vliegtuig.x < this.x + this.w && vliegtuig.x + vliegtuig.w / 2 > this.x) {
    if (vliegtuig.y < this.y + this.h && vliegtuig.y + vliegtuig.w / 2 > this.y) {
      gameState = 2;
      this.color = "green";
      knal.play();
    }
  }
    else {
      this.color = "red";
    }
  }
}


var engineCounter = 0;
var pipes = [];
var vliegtuig;
var score = 0;

let gameState = 0

function preload() {
  engine = loadSound("sounds/biplane-flying-01.mp3");
  img = loadImage("images/ryanair.webp");
  img2 = loadImage("images/achtergrondje.jpg");
  knal = loadSound("sounds/explosion-6801.mp3");
  fontRegular = loadFont("assets/trebuc.ttf");
  buis1 = loadImage("images/flatje.png");
  buis2 = loadImage("images/flatje.png");
}

function setup() {
  createCanvas(626, 368);

  vliegtuig = new Vliegtuig(100, 200);

  textFont(fontRegular);
  image(img, 100, 200);
  image(img2, 626, 368);
  pressStart = loadImage("images/ryanair(1).jpg")
  endBackground = loadImage("images/vliegtuig crash 2.jpg")
}

function draw() {


  if (gameState == 0) {
    startGame();
  } else if (gameState == 1) {
    playGame();
  }
  else if (gameState == 2) {
    finishGame();
  }
}

function game() {
  
if(frameCount % 1 == 0){
  engineCounter = engineCounter + 1
}
  if(engineCounter == 10){
    engine.play()
  }

  background(img2);

  if (frameCount % 85 == 0) {

    randomheight = random(height - 150);

    pijp1 = new rechthoek(700, 0, 50, randomheight, buis1);
    pijp2 = new rechthoek(700, randomheight + 150, 50, 300, buis2);

    pipes.push(pijp1);
    pipes.push(pijp2);

    // remove unnessecary pipes
    if (pipes.length > 6) {
      pipes.splice(0, 2);
    }
  }

   if (frameCount % 85 == 0 && pipes.length > 4) {
    score = score + 1;
   }
  
  pipes.forEach((p) => {
    p.drawrechthoek();
    p.hit();
  });

   fill('white');
  textSize(25);
  text('Score:', 10, 35)
  text(score, 90, 35);
  
  vliegtuig.drawVliegtuig();

}

function startGame() {
  background(pressStart);
}

function playGame() {
  game();
}

function finishGame() {
  engine.stop();
  
  background(endBackground);
}

function keyPressed() {
  if (keyCode == 32) {
    vliegtuig.vy -= 5;
  }
}

function mousePressed() {
  console.log(gameState);
  if (gameState == 0) {
    gameState += 1;
    engineCounter = 0

  } else if (gameState == 2) {
    pipes = [];
    score = 0;

    gameState = 0;
  }
}
