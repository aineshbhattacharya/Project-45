var enemy, enemiesGroup, spawnEnemies, enemyImage;
var bullet, bulletGroup, bulletImage;
var player, playerImage;
var score;

function preload() {
  playerImage = loadImage("player.png");
  bulletImage = loadImage("bullet.jpg");
  enemyImage = loadImage("enemy.png");
}

function setup() {
  createCanvas(400, 400);
  
  // creating the fighter jet
  player = createSprite(200, 380, 30, 30);
  player.addImage(playerImage);
  player.scale = 0.1;
  
  score = 0;
  enemiesGroup = new Group();
  bulletGroup = new Group();
}

function draw() {
  background(0, 255, 255);
  
  fill(0, 0, 0);
  text("Score: " + score, 400, 400);
  
  if (gameState === PLAY) {
    player.x = mouseX;
    
    if (keyDown("space")) {
      createBullet();
    }
    
    if (bulletGroup.isTouching(enemiesGroup)) {
      enemiesGroup.destroyEach();
      bulletGroup.destroyEach();
      score = score + 1;
    }
  }
  else if (gameState === END) {
    text("Game Over", 170, 160);
    text("Press 'R' to Restart", 150, 180);
    player.x = 0;
    enemiesGroup.setVelocityYEach(0);
  }
  
  if (keyDown("r")) {
    reset();
  }
  
  drawSprites();
}

function spawnEnemies() {
  enemy = createSprite(Math.round(random(20, 370)), 0, 10, 10);
  enemy.addImage(enemyImage);
  enemy.velocityY = -3;
  enemy.lifetime = 150;
  enemy.scale = 0.1;
  enemiesGroup.add(enemy);
}

// creating a bullet for the jet
function createBullet() {
  bullet = createSprite(mouseX, 380, 10, 60);
  bullet.addImage(bulletImage);
  bullet.velocityY = 4;
  bullet.scale = 0.3;
  bulletGroup.add(bullet);
}

function reset() {
  gameState = PLAY;
  enemy.destroyEach();
  score = 0;
  player.x = 200;
  player.y = 380;
}