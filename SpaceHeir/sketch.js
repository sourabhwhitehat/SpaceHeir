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

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  edges = createEdgeSprites();

  foodGroup = new Group();
  obstacleGroup = new Group();

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

}

function draw() {
  background(0);  

  player.debug = true;

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


  if(obstacleGroup.isTouching(player)){
     player.destroy();
  }
  for (var i = 0; i < foodGroup.maxDepth(); i++) {
    if(foodGroup.get(i) != null  && player.isTouching(foodGroup.get(i)) ){
      foodGroup.get(i).destroy();
      score++;
    }}
   
  obstacles();
  food();

  console.log(score);
  
  textSize(18);
  text("SCORE : "+score,windowWidth/2+650, windowHeight/2-240);

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
    obstacle.debug = true;
    var rand2 = Math.round(random(1,2,3));
    obstacle.addImage(asteroid_Image2);
    obstacle.scale = 0.5;
    obstacleGroup.add(obstacle);

  }
 
}

function food(){
  if(frameCount%80===0){
     var food = createSprite(random(10,windowWidth),random(10,windowHeight),10,10);
     food.addImage(food_Image);
     food.scale = 0.5;

     food.debug = true;

     food.setCollider("circle")
     foodGroup.add(food);
  }
}