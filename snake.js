
class Snake {
  constructor(x, y) {
    this.segLen = 20;
    this.pos = [];
    for (let i = 0; i < 10; i++)
      this.pos.push(createVector(x, y));

    this.rad = 40;
    this.speedVec = createVector(0, 0);
    this.cookieEated = 0;
    this.enemyKilled = 0;
    this.hp = 10;
  }

  display() {
    noFill();
    strokeWeight(10);
    for (let i = 0; i < this.pos.length - 1; i++) {
      line(this.pos[i].x, this.pos[i].y, this.pos[i + 1].x, this.pos[i + 1].y);
    }
    fill(255);
    //circle(this.pos[0].x, this.pos[0].y, this.rad * 2);
    let p = p5.Vector.sub(this.pos[0], this.pos[1]);
    let a = atan2(p.x, p.y);
    push();
    translate(this.pos[0].x, this.pos[0].y);
    rotate(HALF_PI - a);
    scale(0.2);
    image(head, 0, 0);
    pop();
    
    fill('red');
    noStroke();
    text('Marc', this.pos[0].x, this.pos[0].y - this.rad - 10);
    noFill();
    strokeWeight(3);
    stroke(255);
  }

  update() {
    let mouseVec = createVector(mouseX, mouseY);
    this.speedVec.set(mouseVec.sub(this.pos[0]));
    this.speedVec.setMag(0.4 * Math.sqrt(this.speedVec.mag()));

    this.pos[0].add(this.speedVec);

    for (let i = 0; i < this.pos.length - 1; i++) {
      let d = p5.Vector.sub(this.pos[i], this.pos[i + 1]);
      this.pos[i + 1].add(d.setMag(d.mag() - this.segLen));
    }
  }

  grow() {
    this.pos.push(this.pos[this.pos.length - 1].copy());
  }

  canEat(cookie) {
    if (this.pos[0].dist(cookie.pos) < cookie.size / 2 + this.rad) {
      this.grow();
      this.hp += parseInt(cookie.size / 20);
      cookie.eated();
      this.cookieEated++;
    }
  }

  shoot() {
    this.pos.splice(this.pos.length - 1, 1);
    return new Bullet(this.pos[0].x, this.pos[0].y, p5.Vector.sub(this.pos[0], this.pos[1]).setMag(20));
  }
}