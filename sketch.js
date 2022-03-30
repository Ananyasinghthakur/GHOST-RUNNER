//new variables
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
// var invisibleBlockGroup, invisibleBlock;
var gameState = "play";
function preload(){
//loading image 
towerImg = loadImage("tower.png");
doorImg = loadImage("door.png");
climberImg = loadImage("climber.png");
ghostImg = loadImage("ghost-standing.png");
spookySound = loadSound("spooky.wav");
}

function setup() {
//creating canvas 
createCanvas(600,600);
//adding spooky sound 
spookySound.loop();
//crating  tower
tower = createSprite(300,300);
tower.addImage("tower",towerImg);
tower.velocityY = 1;
//making the group for  door , climber and invisible block 
doorsGroup = new Group();
climbersGroup = new Group();
//creating the ghost
ghost = createSprite(200,200,50,50);
ghost.scale = 0.3;
ghost.addImage("ghost", ghostImg);
}

function draw() {
//making background
background("black");
//creating infinite tower  
//new game state ===play  
if (gameState === "play") {
if(keyDown("up")){
ghost.velocityY= -3;
}
if(keyDown("left")){
ghost.velocityX=-3;
}
if(keyDown("right")){
ghost.velocityX= 3;
}
if(tower.y >400 ){
  tower.y = 300
  }
ghost.velocityY = ghost.velocityY + 0.3;
//write a condition for infinte scrolling tower
    
spawnDoors();
if(doorsGroup.isTouching(ghost)){
gameState="end"
}
if(climbersGroup.isTouching(ghost)){
 ghost.velocityY = 0;
}
}
else if (gameState === "end"){
  stroke("yellow");
  fill("yellow");

  textSize(30);
  text("Game Over", 230,250)
  ghost.destroy();
  doorsGroup.destroyEach();
  climbersGroup.destroyEach();
  tower.destroy();
}
  drawSprites();
}
 
function spawnDoors()
 {
  //write code here to spawn the clouds
  if (frameCount % 240 === 0) {
    var x = random(50,450)
    var door = createSprite(x, -50);
    var climber = createSprite(x,10);
    // var invisibleBlock = createSprite(200,15);
    // invisibleBlock.width = climber.width;
    // invisibleBlock.height = 2;
    //add the random function
    //
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
 climber.velocityY = 1;
//  invisibleBlock.velocityY = 1;
//change the depth of the ghost and door
ghost.depth = door.depth;
ghost.depth =1;
door.lifetime = 800;
climber.lifetime = 800;
// invisibleBlock.lifetime = 800;
//add each obstacle to the group obstaclesGroup.add(obstacle);here  obstacle are door, climber and invisible block
doorsGroup.add(door);

climbersGroup.add(climber);
// invisibleBlockGroup.add(invisibleBlock);
}
}