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

let playing=false
const Keys=[]

box1.draw();
box2.draw();
ball.draw();

const p1Score=document.getElementById("p1Score");
const p2Score=document.getElementById("p2Score");

let leftScore=0;
let rightScore=0;
p1Score.textContent="P1 Score:"+leftScore;
p2Score.textContent="P2 Score:"+rightScore;
const DIRECTIONS=[1,-1];
function update(){
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
  ball.draw();
  box1.draw();
  box2.draw();
  box1.color="black"
  box2.color="black"
  ball.color="black"
}
function ballCollide(box){
  if(ball.position.x+ball.size.radius>=box.position.x&&ball.position.x-ball.size.radius<=box.position.x+box.size.width &&
          ball.position.y+ball.size.radius>=box.position.y&&
          ball.position.y-ball.size.radius<=box.position.y+box.size.height){
          ball.speed+=0.25
          ball.direction.x *=-1
          if (ball.direction.x > 0) {
            ball.position.x = box.position.x + box.size.width + ball.size.radius;
           } else {
          ball.position.x = box.position.x - ball.size.radius;
           }
          box.color="white"
          ball.color="white"
          const dis = (box.top+box.bottom)/2-ball.position.y
          ball.direction.y = dis / (box.size.height / 2)
          ball.direction.y = Math.max(-1, Math.min(1, ball.direction.y))
          playMusic("paddle.MP3");
        }
}
function ballLoop(){
  if(playing){
  update()
  movep1()
  movep2()
  ballCollide(box1)
  ballCollide(box2)
    if(leftScore==10||rightScore==10)
    {
      leftScore=0;
      rightScore=0;
      ball.speed=2;
      p1Score.textContent="P1 Score:"+leftScore;
      p2Score.textContent="P2 Score:"+rightScore;
    }
  if (
  ball.position.x-ball.size.radius<=0&&
  (ball.position.y-ball.size.radius<50||ball.position.y+ball.size.radius>450)
) {

  ball.direction.x *= -1;
  playMusic("wall.MP3");
}
  if(ball.position.x+ball.size.radius <0){
    // playy();
    playing=false
    ball.position.x=250;
    ball.position.y= canvas.height/2;
    ball.direction.x=1;
    ball.speed=2;
    rightScore+=1;
    p2Score.textContent="P2 Score:"+rightScore;
    playMusic("score.MP3");
  }
  if (
  ball.position.x+ball.size.radius>=1000 &&
  (ball.position.y-ball.size.radius<50||ball.position.y+ball.size.radius>450
  )
) {

  ball.direction.x *= -1;
  playMusic("wall.MP3");
}

  if(ball.position.x-ball.size.radius>1000){
    // playy();
    playing=false
    ball.position.x= 750;
    ball.position.y=  canvas.height/2;
    ball.direction.x=-1;
    ball.speed=2;
    leftScore+=1;
    p1Score.textContent="P1 Score:"+leftScore;
    playMusic("score.MP3");
  }
    if(ball.position.y-ball.size.radius<=0||ball.position.y+ball.size.radius>=500)
    {
      ball.direction.y*=-1;
      playMusic("wall.MP3");
    }
  requestAnimationFrame(ballLoop);}
}
function movep1(){
  if(Keys["w"]){
    box1.moveUp()
  }
  if(Keys["s"]){
    box1.moveDown()
  }
}
function movep2(){
  if(Keys["ArrowUp"]){
    box2.moveUp()
  }
  if(Keys["ArrowDown"]){
    box2.moveDown()
  }
}
document.addEventListener("keydown",(event)=>{
  if(event.key=="w"||event.key=="s")
    {
      Keys[event.key]=true
    } 
  if(event.key=="ArrowUp"||event.key=="ArrowDown")
    {
      Keys[event.key]=true
    } 
//music
  if(event.key=="m"||event.key=="M")
  {
    playMusic("umchacha.mp3");
  }
  if(event.key==" "){
    Keys[event.key]=true
    console.log("hi")
    playy()
  }
});
document.addEventListener("keyup",(event)=>{
  Keys[event.key]=false
})
function playy(){
  if(Keys[" "]&&!playing){
    playing=true
    ballLoop()
  }
}
function playMusic(music){
  let  audio=new Audio(music);
  audio.play()
}