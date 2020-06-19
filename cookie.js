
// TODO: Cookies hallucinogènes.

class Cookie {
  constructor(img) {
    this.pos = createVector(100, 100);
    this.setRandomPos();
    this.img = img;
    this.size = 75;
  }

  display() {
    image(this.img, this.pos.x, this.pos.y, this.size, this.size);
    // circle(this.pos.x, this.pos.y, this.size / 2);
    // circle(this.pos.x, this.pos.y, this.size / 2  )
  }

  eated() {
    crunch.play();
    this.setRandomPos();
  }

  setRandomPos() {
    this.size = random(30, 80);
    this.pos.set(createVector(random(this.size * 2, width - this.size * 2 - 50),
      random(this.size * 2, height - this.size * 2 - 50)));
  }
}
