
let cookieImg;
let explosionSound;
let explosionEffect;
let laser;
let theme;
let endTheme;
let dommage;

function preload() {
  cookieImg = loadImage("textures/cookie.png");
  explosionSound = loadSound('sounds/explosion.mp3');
  explosionEffect = [];
  for (let i = 0; i < 8; i++) {
    explosionEffect.push(loadImage('textures/explosion/frame-' + i + '.png'));
  }
  laser = loadSound('sounds/laser.mp3');
  theme = loadSound('sounds/theme.mp3');
  crunch = loadSound('sounds/crunch.mp3');
  endTheme = loadSound('sounds/end.mp3');
  dommage = loadImage('textures/dommage.png');
  head = loadImage('textures/head.png');
  theme.setVolume(0.1);
}

let cookie;
let s;
let enemies = [];
let bullets = [];
let animations = [];

function setup() {
  theme.loop();
  createCanvas(displayWidth, displayHeight);

  stroke(255);
  strokeWeight(3);
  noFill();
  textSize(30);
  textFont("Comic Sans MS");
  imageMode(CENTER);
  textAlign(CENTER);
  cookie = new Cookie(cookieImg);
  s = new Snake(width / 2, height / 2);

  setTimeout(() => {
    for (let i = 0; i < 5; i++)
      genNewEnemy();
  }, 3000);
}

function draw() {
  background(0);
  cookie.display();
  s.update();
  s.display();
  s.canEat(cookie);


  enemies.forEach((e, i) => {
    e.update(s);
    enemies.forEach((o, j) => {
      if (e != o)
        e.collideOther(o, s);
    });
    e.display();
    if (e.pos.dist(s.pos[0]) < e.size + s.rad) {
      animations.push(new _Animation(explosionEffect, e.pos.x, e.pos.y));
      enemies.splice(i, 1);
      if (s.hp > 0) s.hp--;
      explosionSound.play();
    }
  });

  bullets.forEach((b, i) => {
    if (b.pos.x < 0 || b.pos.y < 0 || b.pos.x > width || b.pos.y > height) {
      bullets.splice(i, 1);
    }
    enemies.forEach((e, j) => {
      if (e.pos.dist(b.pos) < e.size * Math.sqrt(5)) {
        animations.push(new _Animation(explosionEffect, e.pos.x, e.pos.y));
        enemies.splice(j, 1);
        bullets.splice(i, 1);
        s.enemyKilled++;
        explosionSound.play();
      }
    })
    b.update();
    b.display();
  })

  animations.forEach((e, i) => {
    if (e.isOver)
      animations.splice(i, 1);
    else e.display();
  });

  //là ya le scoreboard
  textAlign(LEFT, TOP);
  noStroke();
  fill(119, 235, 52);
  text(s.cookieEated + ' coukie manger', 5, 10);
  text(s.enemyKilled + ' enemi tué', 300, 10);
  text(s.hp + ' poins de vit', 600, 10);
  //text(parseInt(frameRate()), width - 100, 10);
  textAlign(CENTER);
  stroke(255);
  strokeWeight(3);

  if (s.hp <= 0) {
    theme.stop();
    endTheme.play();
    image(dommage, width / 2, height / 3);
    noLoop();
  }
}

function mouseClicked() {
  if (s.pos.length <= 2) return
  bullets.push(s.shoot());
  laser.play()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function genNewEnemy() {
  let e;
  do {
    e = new Enemy(random(20, width - 20), random(20, height - 20));
  } while (e.pos.dist(s.pos[0]) < 100);
  enemies.push(e);
  setTimeout(genNewEnemy, 10 * 1000);
  if (Math.round(random(0, 10)) == 0) {
    setTimeout(genNewEnemy, 10 * 1000);
  }
}
