var player,playerImage;
var gun,gunImage;
var pbullet,pbulletImage;
var bg
var obstacle,obstacleImage;
var obstacle1,stone4Image;
var fire1
var bulletGroup;
var enemy,enemyImage;
var fireGroup;
var fire1Group;
var edges;
var fire,fireImage;
var GameState="level1"
var health=200
var energy=30
var enemy1;
function preload(){
pbulletImage=loadImage("images/bullet1.png")
playerImage=loadImage("images/player.png")
gunImage=loadImage("images/gun.png")
bg=loadImage("images/background.png")
obstacleImage=loadImage("images/stone1.png")
stone4Image=loadImage("images/stone4.png")
enemyImage=loadImage("images/enemy.png.png")
fireImage=loadImage("images/bullet.png")
}

function setup() {
  createCanvas(1700,800);
  edges=createEdgeSprites()
 
  fireGroup=new Group()
  fire1Group=new Group()

 player= createSprite(90, 400, 50, 50);
player.addImage(playerImage)
player.scale=0.7
gun=createSprite(100,400,50,50)
gun.addImage(gunImage)
gun.scale=0.5
bulletGroup=new Group()
obstacle=createSprite(850,400,50,50)
obstacle.addImage(obstacleImage)

obstacle.setCollider("circle",20,20,110)

enemy=createSprite(1500,400,50,50)
enemy.addImage(enemyImage)
enemy.velocityX=-6
enemy.velocityY=7



enemy1=createSprite(1500,400,50,50)
enemy1.addImage(enemyImage)
enemy1.velocityX=-6
enemy1.velocityY=7
enemy1.visible=false


obstacle1=createSprite(1100,600,50,50)
obstacle1.addImage(stone4Image)
obstacle1.scale=0.5
obstacle1.debug=true
obstacle1.setCollider("circle",-20,20,250)
player.debug=true
player.setCollider("circle",0,0,120)
obstacle.debug=true
}

function draw() {
  background(bg);
  enemy1.bounceOff(edges)
  if(GameState==="level1"){
     
    if(bulletGroup.isTouching(obstacle)||bulletGroup.isTouching(obstacle1)){
      bulletGroup.destroyEach()
    
    }

    if(bulletGroup.isTouching(enemy)){
      bulletGroup.destroyEach()
      energy=energy-30
    
    if(energy===0){
      GameState="level2"
     textSize(48)
        text("LEVEL2 BEGINS",500,500)
      }
    


    }
   
    

    if(fireGroup.isTouching(obstacle1)||fireGroup.isTouching(obstacle)){
      fireGroup.destroyEach()
      
      }

      if(fireGroup.isTouching(player)){
        fireGroup.destroyEach()
        health=health-20
        }
             

        if(health===0){
          GameState="end"
         
        }






  }


if(GameState==="end"){
  fireGroup.destroyEach()
  bulletGroup.destroyEach()
  gun.destroy()
  player.destroy()
  enemy.destroy()
  obstacle.destroy()
  obstacle1.destroy()
textSize(48)
  text("game ended ",500,500)
}

  textSize(24)
  stroke("white")
  text("PLAYERS HEALTH  : "+health,100,30)
  text("ENEMY  HEALTH  : "+energy,1400,30)

gun.x=player.x+40
gun.y=player.y-20

enemy.bounceOff(edges)

enemy.bounceOff(obstacle1)
enemy.bounceOff(obstacle)








  if(keyDown(UP_ARROW)){
player.y=player.y-10

  }
  
  if(keyDown(DOWN_ARROW)){
    player.y=player.y+10
    
      }


      if(keyDown(RIGHT_ARROW)){
        player.x=player.x+10
        
          }

          if(keyDown(LEFT_ARROW)){
            player.x=player.x-10
            
              }
              if(keyDown("space")){
                if(frameCount%20===0){
                BULLET()

              }}

            
                FIRE()
   if(GameState==="level2"){
obstacle1.destroy()
health=200
energy=30

  enemy1.visible=true




if(energy===0){
  GameState="level3"
}


if(bulletGroup.isTouching(enemy)){
  bulletGroup.destroyEach()
  energy=energy-30
}


   }




  drawSprites();
  
}




function BULLET(){
pbullet=createSprite(50,40,20,20)
pbullet.addImage(pbulletImage)
pbullet.scale=0.1
pbullet.x=gun.x+40
pbullet.y=gun.y
pbullet.velocityX=5


bulletGroup.add(pbullet)

}

function FIRE(){
  if(frameCount%100===0){
    fire=createSprite(200,200,40,40)
    fire.addImage(fireImage)
    fire.velocityX=-5
    fire.scale=0.1
    fire.x=enemy.x
  fire.y=enemy.y
  fire.debug=true
  
  fireGroup.add(fire)
  
  }
  if(GameState==="level2"){
  if(frameCount%100===0){
    fire1=createSprite(200,200,40,40)
    fire1.addImage(fireImage)
    fire1.velocityX=-5
    fire1.scale=0.1
    fire1.x=enemy1.x
  fire1.y=enemy1.y
 
  
  fire1Group.add(fire)
  }}
  

}


