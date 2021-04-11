
var bg, backgroundImg;
var iron_man, pc;
var ground, ground;
var brick, bimg,brickgroup;
var diamonds, digroup;
var diimg,discore;
var sound;

function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  pc=loadImage("images/iron.png");
  bimg=loadImage("images/stone.png");
  diimg=loadImage("images/diamond.png");
  sound=loadSound("sound/coinSound.mp3")
 
}

function setup() {
  createCanvas(1000, 600);
  bg = createSprite(500,300);
  bg.addImage(backgroundImg);
  bg.scale=2;
  bg.velocityY=3;

  iron_man = createSprite(200,200);
  iron_man.addImage(pc);
  iron_man.scale =0.2;

  ground=createSprite(200,600,530,30);
  ground.visible=false;
  brickgroup=new Group();

  discore=0;
  digroup=new Group();

}

function draw()
 {
  if(bg.y>500){
    bg.y=bg.width/4;
  }

  if (keyDown("space")){
    iron_man.velocityY=-6;
  }
  if(keyDown("right")){
    iron_man.x+=4;          
  }
  if(keyDown("left")){
    iron_man.x-=4;          
  }
  if (iron_man.x > 1000){
    iron_man.x=560;
  }
  if (iron_man.x< 0){
    iron_man.x=10;
  }
  if(iron_man.y>600){
    iron_man.y=590;
}
 if(iron_man.y<10){
   iron_man.y=10;
 }
 generatebrick()
  for(var i = 0 ; i< (brickgroup).length ;i++){
    var temp = (brickgroup).get(i) ;
    
    if (temp.isTouching(iron_man)) {
      iron_man.collide(temp);
     }
        
    }
  generatediamonds()
  for(var i=0;i<(digroup).length;i++){
    var temp=(digroup).get(i)
    if(iron_man.isTouching(temp)){
      sound.play();
      discore++;
      temp.destroy();
      temp=null;
    }
  }
  
 iron_man.velocityY=iron_man.velocityY+0.5;
 iron_man.collide(ground);
    
    drawSprites();
    textSize(20);
    fill("white");
    text("COINS COLLECTED:"+discore,950,0);
   
}

function generatebrick(){
  if(frameCount%70===0){
    brick=createSprite(1200,200,40,10);
    brick.x=random(0,1000);
    brick.y=0;

    brick.addImage(bimg);
    brick.scale=0.5;
    
    brick.velocityY=random(2,4);
    brick.lifetime =250;
    brickgroup.add(brick);
    
  }
}

function generatediamonds(){
  if(frameCount%50===0){
    diamonds=createSprite(20,300,30,55);
    diamonds.addImage(diimg)
    diamonds.scale=0.5;
    diamonds.velocityY=random(2,4);
    diamonds.x=random(0,1000)
    diamonds.y=0;
    digroup.add(diamonds);

  }
}

