class Ball {
  constructor(ctx) {
    const DIRECTIONS=[1,-1];
    this.ctx = ctx;
    this.position = {
      x:500,
      y:250,
    };

    this.size = {
      radius:15
    };

    this.color = "black";
    this.speed =2;
    this.direction = {
    x:DIRECTIONS[Math.floor(Math.random()*DIRECTIONS.length)],
    y:DIRECTIONS[Math.floor(Math.random()*DIRECTIONS.length)],  
    }
  }
  // collide(){
    
  //   if(this.position.x-this.size.radius<=0||this.position.x+this.size.radius>=1000)
  //   {
  //     this.direction.x*=-1;
  //   }
  //   if(this.position.y-this.size.radius<=0||this.position.y+this.size.radius>=500)
  //   {
  //     this.direction.y*=-1;
  //   }
  
  // }
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(
      this.position.x,
      this.position.y,
      this.size.radius,
      0,360,
    );
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
  
  update(){
    // this.collide();
    this.position.x=this.position.x+this.speed*this.direction.x; 
    this.position.y=this.position.y+this.speed*this.direction.y; 
  }
  playMusic(){
          let  audio=new Audio("");
          audio.play()
        }

}
export default Ball;

