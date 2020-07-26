var player;
var obstacle;
var edges;
var foodGroup;
var obstacleGroup;
var life1, life2, life3;
var player_Image, playerLeft_Image, playerRight_Image, playerDown_Image;
var food_image, asteroid_Image1, asteroid_Image2, asteroid_Image3;
var life1_Image, life2_Image, life3_Image;
var score = 0;
var lifeCount = 3;
var enemyShooter, enemyGroup;
var enemy_Image;
var pointGroup;
var bulletGroup;
const play =  1;
const end = 2;
var gameState = 1;
var bullet_Image;

function preload(){
  player_Image = loadImage("Images/player.png");
  playerLeft_Image = loadImage("Images/playerLeft.png");
  playerRight_Image = loadImage("Images/playerRight.png");
  playerDown_Image = loadImage("Images/playerDown.png");

  food_Image = loadImage("Images/food.png");
  asteroid_Image1 = loadImage("Images/asteroidGrey.png");
  asteroid_Image2 = loadImage("Images/asteroidGrey2.png");
  asteroid_Image3 = loadImage("Images/asteroidOrange.png");

  life1_Image = loadImage("Images/life1.png");
  life2_Image = loadImage("Images/life2.png");
  life3_Image = loadImage("Images/life3.png");

  enemy_Image = loadImage("Images/enemy.png");
  bullet_Image = loadImage("Images/bullet.png")

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  edges = createEdgeSprites();

  foodGroup = new Group();
  obstacleGroup = new Group();
  enemyGroup = new Group();
  pointGroup = new Group();
  bulletGroup = new Group();

  player = createSprite(windowWidth/2,windowHeight/2,20,20);
  player.addImage(player_Image);

  life1 = createSprite(windowWidth-105, windowHeight/13,20,20);
  life1.addImage(life1_Image);
  life1.scale = 0.7;
  life2 = createSprite(windowWidth-70, windowHeight/13,20,20);
  life2.addImage(life2_Image);
  life2.scale = 0.7;
  life3 = createSprite(windowWidth-35, windowHeight/13,20,20);
  life3.addImage(life3_Image);
  life3.scale = 0.7;

  enemyShooter = createSprite(windowWidth/2, windowHeight/2-500, 10,10);
  enemyShooter.addImage(enemy_Image);
  enemyShooter.scale = 0.1;

}

function draw() {
  background(0);

  if(gameState===1){

  if(keyDown(UP_ARROW)){
    player.velocityY = -5;
    player.velocityX = 0;
    player.addImage(player_Image)
  }
  if(keyDown(LEFT_ARROW)){
    player.velocityX = -5;
    player.velocityY = 0;
    player.addImage(playerLeft_Image);
  }
  if(keyDown(DOWN_ARROW)){
    player.velocityY = 5;
    player.velocityX = 0;
    player.addImage(playerDown_Image);
  }
  if(keyDown(RIGHT_ARROW)){
    player.velocityX = 5;
    player.velocityY = 0;
    player.addImage(playerRight_Image);
  }

  player.bounceOff(edges);


  if(pointGroup.isTouching(player)){
     lifeCount = lifeCount-1;
     player.velocityX = 0;
     player.velocityY = 0;
     player.x = windowWidth/2;
     player.y = windowHeight/2;
  }

  if(lifeCount===2){
    life3.visible = false;
  }
   else if(lifeCount===1){
     life2.visible = false;
   }
   else if(lifeCount===0){
     life1.visible = false;
   }


  for (var i = 0; i < foodGroup.maxDepth(); i++) {
    if(foodGroup.get(i) != null  && player.isTouching(foodGroup.get(i)) ){
      foodGroup.get(i).destroy();
      score++;
    }}

  obstacles();
  food();

  if(score===1){
    enemyShooter.velocityY = 2;
  }
  if(score===1 && frameCount%100===0){
      enemyShooter.x = random(10,windowWidth);
      enemyShooter.y = random(10, windowHeight-200);
      enemyShooter.velocityX = 1.5;
      enemyShooter.velocityY = 0;
  }
  if(enemyShooter.x>windowWidth/2){
     enemyShooter.velocityY = 1.5;
     enemyShooter.velocityX = 0;
  }
  if(enemyShooter.y>windowWidth/2+300){
    enemyShooter.velocityX = -1.5;
    enemyShooter.velocityY = 0;
  }
  if(lifeCount===0){
    player.destroy();
    obstacleGroup.destroyEach();
    foodGroup.destroyEach();
    gameState = 2;
  }
}
 else if(gameState===2){
   textSize(20);
   text("SCORE : "+score, windowWidth/2-100, windowHeight/2-200);
   text("GAME OVER", windowWidth/2-100, windowHeight/2-50);
 }

  textSize(18);
  text("SCORE : "+score,windowWidth/2+650, windowHeight/2-240);

  bullets();
  drawSprites();
}


function obstacles(){
  if(frameCount%120===0){

    var rand = Math.round(random(1,2));
    obstacle = createSprite(-10, random(0,windowHeight),20,20)

    if(rand===1){
      obstacle.x = windowWidth+400;
      obstacle.velocityX = -3;
    }
    else if(rand===2){
      obstacle.x = random(0,50);
      obstacle.velocityX = 3
    }

    var rand2 = Math.round(random(1,3));

    if(rand2===1){
      obstacle.addImage(asteroid_Image1);
      obstacle.scale = 0.5;
    }
    else if(rand2===2){
      obstacle.addImage(asteroid_Image2);
      obstacle.scale = 0.5;
    }
    else if(rand2===3){
      obstacle.addImage(asteroid_Image3);
      obstacle.scale = 0.5;
    }

    obstacleGroup.add(obstacle);

    var point = createSprite(0, 0, 1,1);
    point.velocityX = obstacle.velocityX;
    point.x = obstacle.x;
    point.y = obstacle.y;
    point.debug = true;
    point.depth = obstacle.depth +1;
    pointGroup.add(point);
  }

}
function food(){
  if(frameCount%80===0){
     var food = createSprite(random(10,windowWidth),random(10,windowHeight),10,10);
     food.addImage(food_Image);
     food.scale = 0.5;
     food.setCollider("circle")
     foodGroup.add(food);
  }
}

function bullets(){
  if(score>1 && frameCount%100===0){
    var bullets  = createSprite(enemyShooter.x, enemyShooter.y, 10,10);
    bullets.addImage(bullet_Image);
    bullets.scale = 0.1;
    bullets.velocityX = 5;
    bullets.velocityY = 5;
    bulletGroup.add(bullets);
  }

}
