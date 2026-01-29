class Box{
  constructor(ctx,canvas,x,y){
    this.ctx=ctx;
    this.canvas=canvas;
    this.position={
      x:x,
      y:y,
    };
    this.size={
      width:5,
      height:50,
    };
    this.speed=20;
    this.color="black";
  }

 draw(){
    this.ctx.beginPath();
    this.ctx.rect(
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    
  }

  moveUp(){
    this.position.y-=this.speed;
    if(this.position.y<0)
    { 
        this.position.y =0;
    }
    
  }

  moveDown(){
    this.position.y+=this.speed;
    if(this.position.y>440)
    {
      this.position.y=440;
    }
  }

  
}

export default Box;
