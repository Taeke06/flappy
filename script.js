class Rect {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.color = "green";
  }

  drawRect() {
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
    this.x += -3
  }
}