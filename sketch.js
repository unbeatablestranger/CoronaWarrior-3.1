var bgImg, bg , girlImg, boyImg;
var gameState = 0;
var player, ground;
var boy, girl;
var mask, sanitizer, PPEKit, corona;
var maskImg, sanitizerImg, PPEKitImg, coronaImg;
var score = 30;
var maskGrp, saniGrp, kitGrp, coronaGrp;

function preload()
{
  bgImg = loadImage("images/backgroundcorona.jpg");
  boyImg = loadImage("images/coronaBoy.png");
  girlImg = loadImage("images/coronaGirl.png");
  maskImg = loadImage("images/mask.png");
  sanitizerImg = loadImage("images/sanitizer.png");
  PPEKitImg = loadImage("images/ppe kit.png");
  coronaImg = loadImage("images/corona.png");
}

function setup() 
{
  createCanvas(800,400);

  

  player = createSprite(100, 250);
  player.visibilty = "false";
  player.scale = 0.5;
  
  ground = createSprite(400, 380, 800, 20);

  boy = createSprite(200, 200);
    boy.addImage("k", boyImg);
    boy.scale = 0.5;

    girl = createSprite(600, 200);
    girl.addImage("j", girlImg);
    girl.scale = 0.5;

    maskGrp = new Group();
    saniGrp = new Group();
    kitGrp = new Group();
    coronaGrp = new Group();
    
}


function draw() 
{
  
  background(bgImg);
  
 
  //when the game satrts the beginning screen will be shown
  if(gameState === 0)
  {
    
  
    
    
    fill("black");
    textSize(30);
    text("Let us start! Please choose a character to continue", 20, 50);
    text("Right Arrow", 550, 80);
    text("Left Arwow", 150, 80);
    
    //if left arrow key is pressed then the boy Image will be selected
    if(keyWentDown("left_arrow"))
    {
      player.addImage("k", boyImg);
      player.visibilty = "true";
      girl.destroy();
      boy.destroy();
      gameState = 1;
    }

    //if right arrow key is presses then the girl Image will be selected
    if(keyWentDown("right_arrow"))
    {
      player.addImage("j", girlImg);
      player.visibilty = "true";
      girl.destroy();
      boy.destroy();
      gameState = 1;
    }
  }

  //when the game starts
  if(gameState === 1)
  {
    player.scale = 0.5;

    //calling the functions for mask, sanitizer, PPEKit and corona
    spawnMask();
    spawnSani();
    spawnKit();
    spawnCorona();

    //giving the player gravity
    player.velocityY = player.velocityY+0.8;
    player.collide(ground);

    
    
    //this will make the player jump only when it is touching the ground and not just float in the air
    if(player.y>250)
    {
      //making the player jump
      if(keyDown("space"))
      {
        player.velocityY = -15;
      }
    }

    //increasing the score when the player touches the sanitizer
    if(player.isTouching(maskGrp))
    {
      //if we do not destroy, then the mask will not vanish and may give the player some extra points
      maskGrp.destroyEach();
      score = score+3;
      textSize(30);
      fill("green");
      text("+3", player.x, player.y);
    }

    //increasing the score when the player touches the sanitizer
    if(player.isTouching(saniGrp))
    {
      saniGrp.destroyEach();
      score = score+1;
      textSize(30);
      fill("green");
      text("+1", player.x, player.y);
    }

    //increasing the score when the player touches the PPEKit
    if(player.isTouching(kitGrp))
    {
      kitGrp.destroyEach();
      score = score+5;
      textSize(30);
      fill("green");
      text("+5", player.x, player.y);
    }

    //decreasing th escore when the player is in contact with Corona
    if(player.isTouching(coronaGrp))
    {
      coronaGrp.destroyEach();
      score = score-5;
      textSize(30);
      fill("red");
      text("-5", player.x, player.y);
    }

    //displaying the score
    textSize(30);
    fill("black");
    text("score->"+score, 50,50);
  }
    
  

  
    
  

  
  //displaying the sprites
  drawSprites();
}

//everything has been added through functions so that each and every sprite will not need to be added manually
function spawnMask()
{
  if(frameCount%180 === 0)
  {
    mask = createSprite(820, random(50,300), 80, 80);
    mask.addImage("l", maskImg);
    mask.scale = 0.15;
    mask.velocityX = -(score*2)/8;
    mask.lifetime = 180;
    //adding the mask sprite to the mask group
    maskGrp.add(mask);
  }
}

function spawnSani()
{
  if(frameCount%80 === 0)
  {
    sanitizer = createSprite(820, random(50,300), 80, 80);
    sanitizer.addImage("l", sanitizerImg);
    sanitizer.scale = 0.15;
    sanitizer.velocityX = -(score*2)/8;
    sanitizer.lifetime = 180;
    //addding the sanetizer sprite to the sanitizer group
    saniGrp.add(sanitizer);
  }
}

function spawnKit()
{
  if(frameCount%300 === 0)
  {
    PPEKit = createSprite(820, random(50,350), 80, 80);
    PPEKit.addImage("l", PPEKitImg);
    PPEKit.scale = 0.2;
    //making the object move with respect to the score
    PPEKit.velocityX = -(score*2)/8;
    PPEKit.lifetime = 180;
    //adding the PPE Kit sprite to the PPE Kit group
    kitGrp.add(PPEKit);
  }
}

function spawnCorona()
{
  if(frameCount%200 === 0)
  {
    corona = createSprite(820, 320, 80, 80);
    corona.addImage("k", coronaImg);
    corona.scale = 0.1;
    corona.velocityX = -(score*2)/8;
    corona.lifetime = 180;
    //adding the corona Sprite to the corona group
    coronaGrp.add(corona);
  }

}
