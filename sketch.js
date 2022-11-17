var ufo, ufoImg;
var space, spaceImg;
var meteor, meteorImg, meteorGroup;
var gameover, gameoverImg;
var gameState = "start";


function preload() {
  spaceImg = loadImage("space.png");
  meteorImg = loadImage("meteor.png");
  ufoImg = loadImage("ufo.png");
  gameoverImg = loadImage("gameover.png");
}

function setup() {
  createCanvas(600,300);

  space = createSprite(450,150);
  space.addImage("space",spaceImg);
  space.scale = 2.5;
  
  gameover = createSprite(300,150);
  gameover.addImage("gameover",gameoverImg);
  gameover.scale = 0.5;
  gameover.visible = false;

  ufo = createSprite(75,225);
  ufo.addImage("ufo",ufoImg);
  ufo.scale = 0.025;


  invisibleBlockGroup = createGroup();
}

function draw() {
  
  if(gameState === "end"){
    gameover.visible = true;
  }

  if(gameState === "play"){
  
    space.velocityX =-1;

    if(space.x < 200){
      space.x = 400;
    }

    ufo.velocityY += 0.5;

    if(keyDown("SPACE")){
      ufo.velocityY =-5;
    }
  }
  
  drawSprites()
  spawnMeteor()

  if(gameState === "start"){
    if(keyDown("SPACE")){
      gameState = "play";
    }
    text("Click Space To Start",225,150);
  }

  if(ufo.isTouching(invisibleBlockGroup)){
    gameState = "end";
    ufo.visible = false;
    meteor.visible = false;
    space.velocityX = 0;
  }

}


function spawnMeteor(){
  if(gameState === "play"){
    if(frameCount % 250 === 0){
      y = random(50,250);
      meteor = createSprite(600,y);
      meteor.addImage(meteorImg);
      meteor.velocityX = -2;
      meteor.scale = 0.15;

      invisibleBlockGroup = createSprite(meteor.x-20,meteor.y,75,75)
      invisibleBlockGroup.velocityX = -2
      invisibleBlockGroup.visible = false
      invisibleBlockGroup.depth = invisibleBlockGroup.depth-1

    }
  }
}