var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, car1, car2;
var track, car1Img, car2Img, ground;

var leftBoundary, rightBoundary, midBoundary;

var obstacleIMG;

var leftObstacleGroup, rightObstacleGroup;
var racingSounds;


function preload(){
  ground = loadImage("images/ground.png");
  track = loadImage("images/track.jpg");
  car1Img = loadImage("images/carblue.png");
  car2Img = loadImage("images/carpurple.png");
  obstacleIMG = loadImage("images/TrafficCone.png");
  racingSounds = loadSound("RacingSound.mp3");
  
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();

  leftBoundary = createSprite(310,-1300,10,displayHeight*5);
  rightBoundary = createSprite(1230,-1300,10,displayHeight*5);
  midBoundary = createSprite(760,-1300,10,displayHeight*5);

  leftBoundary.visible = false;
  rightBoundary.visible = false;
  midBoundary.visible = false;

  leftObstacleGroup = new Group();
  rightObstacleGroup = new Group();

  spawnObstacle();

  game = new Game();
  game.getState();
  game.start();

 

}


function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    racingSounds.play();
    game.play();
  }

  if(gameState === 2){
    racingSounds.stop();
    game.end();
  }

 

  

}

function spawnObstacle(){
  var x1 = 400;
  var x2 = 900;

  for(i=-2500;i<200;i+=400){
    switch(x1){
      case 400:x1 = 600;
      break;
      case 500:x1 = 400;
      break;
      case 600:x1 = 500;
      break;
      default: break;

    }
    var leftObstacle = createSprite(x1,i,10,10);
    leftObstacle.addImage(obstacleIMG);
    leftObstacle.scale = 0.5;

    leftObstacleGroup.add(leftObstacle);

    switch(x2){
      case 900:x2 = 1100;
      break;
      case 1100:x2 = 1000;
      break;
      case 1000:x2 = 900;
      break;
      default: break;
    }
    var rightObstacle = createSprite(x2,i,10,10);
    rightObstacle.addImage(obstacleIMG);
    rightObstacle.scale = 0.5;

    rightObstacleGroup.add(rightObstacle);

  }

}


