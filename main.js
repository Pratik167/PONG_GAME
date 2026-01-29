import Ball from "./ball.js";
import Box from "./box.js";


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.style.backgroundColor="green";

  ctx.beginPath();
  ctx.lineWidth = 6;
  ctx.moveTo(0,50);
  ctx.lineTo(0,0);
  ctx.lineTo(1000,0);
  ctx.lineTo(1000,50);
  ctx.strokeStyle="white";
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(canvas.width/2,canvas.height/2,5,0,360);
  ctx.fillStyle="white";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.moveTo(canvas.width/2,0);
  ctx.lineTo(canvas.width/2,canvas.height);
  ctx.strokeStyle="white";
  ctx.stroke();
  ctx.closePath();


  ctx.beginPath();
  ctx.lineWidth = 6;
  ctx.moveTo(0,450);
  ctx.lineTo(0,500);
  ctx.lineTo(1000,500);
  ctx.lineTo(1000,450);
  ctx.strokeStyle="white";
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(canvas.width/2,canvas.height/2,60,0,360);
  ctx.stokeStyle="white";
  ctx.stroke();
  ctx.closePath();


const ball=new Ball(ctx);
const box1 = new Box(ctx,canvas,10,230);
const box2= new Box(ctx,canvas,985,230);



box1.draw();
box2.draw();
ball.draw();

const p1Score=document.getElementById("p1Score");
const p2Score=document.getElementById("p2Score");

let leftScore=0;
let rightScore=0;
p1Score.textContent="P1 Score:"+leftScore;
p2Score.textContent="P2 Score:"+rightScore;


function ballLoop(){
  const DIRECTIONS=[1,-1];

  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.beginPath();
  ctx.arc(canvas.width/2,canvas.height/2,5,0,360);
  ctx.fillStyle="white";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.moveTo(canvas.width/2,0);
  ctx.lineTo(canvas.width/2,canvas.height);
  ctx.strokeStyle="white";
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.lineWidth = 6;
  ctx.moveTo(0,50);
  ctx.lineTo(0,0);
  ctx.lineTo(1000,0);
  ctx.lineTo(1000,50);
  ctx.strokeStyle="white";
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.lineWidth = 6;
  ctx.moveTo(0,450);
  ctx.lineTo(0,500);
  ctx.lineTo(1000,500);
  ctx.lineTo(1000,450);
  ctx.strokeStyle="white";
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(canvas.width/2,canvas.height/2,60,0,360);
  ctx.stokeStyle="white";
  ctx.stroke();
  ctx.closePath();
  


  ball.update();

  //collide with box1(P1)
  if (
          ball.position.x-ball.size.radius<=box1.position.x+box1.size.width &&
          ball.position.y+ball.size.radius>=box1.position.y&&
          ball.position.y-ball.size.radius<=box1.position.y+box1.size.height
      ) 
      {
        ball.speed +=0.25;
        ball.direction.x *= -1;
        ball.direction.y = DIRECTIONS[Math.floor(Math.random()*DIRECTIONS.length)],
        playMusic("paddle.MP3");
    }
    //collide with box2(P2)
  if (
          ball.position.x+ball.size.radius>=box2.position.x-box2.size.width &&
          ball.position.y+ball.size.radius>=box2.position.y&&
          ball.position.y-ball.size.radius<=box2.position.y+box2.size.height
      ) 
      {
        ball.speed +=0.25;
        ball.direction.x *= -1;
        ball.direction.y= DIRECTIONS[Math.floor(Math.random()*DIRECTIONS.length)],
        playMusic("paddle.MP3");
    }
  
    // MAX Scoreee
    if(leftScore==10||rightScore==10)
    {
      leftScore=0;
      rightScore=0;
      ball.speed=2;
      p1Score.textContent="P1 Score:"+leftScore;
      p2Score.textContent="P2 Score:"+rightScore;
    }
    // leftwall collision logic
  if (
  ball.position.x-ball.size.radius<=0&&
  (ball.position.y-ball.size.radius<50||ball.position.y+ball.size.radius>450)
) {
  console.log("left wall");
  ball.direction.x *= -1;
  playMusic("wall.MP3");
}
  //left wall goal logic
  if(ball.position.x+ball.size.radius <0){
    playy();
    console.log("left goal");
    ball.position.x=250;
    ball.position.y=  20+ Math.floor(Math.random()*(canvas.height-40));
    ball.direction.x=1;
    ball.speed=2;
    rightScore+=1;
    p2Score.textContent="P2 Score:"+rightScore;
  }

  //right wall collison
  if (
  ball.position.x+ball.size.radius>=1000 &&
  (ball.position.y-ball.size.radius<50||ball.position.y+ball.size.radius>450
  )
) {
  console.log("right wall");
  ball.direction.x *= -1;
  playMusic("wall.MP3");
}

  //right wall goal logic

  if(ball.position.x-ball.size.radius>1000){
    playy();
    console.log("right goal");
    ball.position.x= 750;
    ball.position.y=  20+ Math.floor(Math.random()*(canvas.height-40));
    ball.direction.x=-1;
    ball.speed=2;
    leftScore+=1;
    p1Score.textContent="P1 Score:"+leftScore;
  }

  //ceiling and floor collision
    if(ball.position.y-ball.size.radius<=0||ball.position.y+ball.size.radius>=500)
    {
      ball.direction.y*=-1;
      playMusic("wall.MP3");
    }

  ball.draw();
  box1.draw();
  box2.draw();
  requestAnimationFrame(ballLoop);
}
// ballLoop();


document.addEventListener("keydown",(event)=>{
  //P1
  if(event.key=="w"||event.key=="W")
    {
      box1.moveUp();
    } 
  if (event.key=="s"||event.key=="S") 
    {
      box1.moveDown();
    }
  
  //P2
  if(event.key=="ArrowUp")
    {
      box2.moveUp();
    } 
  if (event.key=="ArrowDown") 
    {
      box2.moveDown();
    }

  //music
  if(event.key=="m"||event.key=="M")
  {
    playMusic("umchacha.mp3");
  }
});

function playy(){
  
  document.addEventListener("click",(event)=>{
    
    ballLoop();
  });
}
playy();

function playMusic(music){
  let  audio=new Audio(music);
  audio.play()
}