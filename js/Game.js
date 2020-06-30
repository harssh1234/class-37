class Game {
  constructor(){}

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

    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);

    cars = [car1,car2,car3,car3];
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      var index = 0;
      var x = 0;
      var y = 0;

      // var display_position = 130;
      for(var plr in allPlayers){
        
        x+=200;
        y = displayHeight - allPlayers[plr].distance;
        cars[index].x = x;
        cars[index].y = y;
        if(index-1 === player.index){
          cars[index].shapeColor = "red";
          console.log("car: "+index+"x= "+x+"y= "+y);
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index].y;
          }
          index+=1;
        }

        
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    drawSprites();
  }
}
