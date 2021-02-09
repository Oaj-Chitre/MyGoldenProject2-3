class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(520,200);
    car1.addImage(car1Img);
    car1.scale = 0.6;
    car2 = createSprite(1000,200);
    car2.addImage(car2Img);
    car2.scale = 0.25;

    cars = [car1, car2];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();

    player.getcarsAtEnd();

    
    if(allPlayers !== undefined){
      //var display_position = 100;
      background(ground);
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
      //index of the array
      var index = 0;

      car1.collide(leftBoundary);
      car1.collide(midBoundary);

      car2.collide(midBoundary);
      car2.collide(rightBoundary);

      //x and y position of the cars
      //var x = 200;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        //x = x + 450;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        //cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          stroke(10);
          fill('red');
          ellipse(cars[index-1].x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      if(leftObstacleGroup.isTouching(cars[player.index-1]) || rightObstacleGroup.isTouching(cars[player.index-1])){
        player.distance -= 500;
      } 
      else{
        player.distance +=10
      }
      console.log(player.distance);
      player.update();
    }

    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      cars[player.index-1].x -=5;
    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      cars[player.index-1].x +=5;
    }

    if(player.distance > 4110){
      gameState = 2;
      player.rank += 1;
      Player.updatecarsAtEnd(player.rank)
    }

    drawSprites();
  }

    end(){
      console.log("Game Ended");
      console.log(player.rank);
    }

}
