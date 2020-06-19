
class Bullet {
    constructor(x, y, speedVec) {
        this.pos = createVector(x, y);
        this.long = 10;
        this.speedVec = speedVec;
    }

    display() {
        stroke(255, 0, 0);
        let pos2 = p5.Vector.add(this.pos, this.speedVec);
        line(this.pos.x, this.pos.y, pos2.x, pos2.y);
        stroke(255);
    }

    update() {
        this.pos.add(this.speedVec);
    }
}