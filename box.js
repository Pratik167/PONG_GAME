class Box{
  constructor(ctx,canvas,x,y){
    this.ctx=ctx;
    this.canvas=canvas;
    this.position={
      x:x,
      y:y,
    };
    this.size={
      width:10,
      height:100,
    };
    this.speed=2;
    this.color="black";
  }
  get left(){
    return this.position.x
  }
  get right(){
    return this.position.x+this.size.width
  }
  get top(){
    return this.position.y
  }
  get bottom(){
    return this.position.y+this.size.height
  }
 draw(){

  const r = 10; // corner radius
  const x = this.position.x;
  const y = this.position.y;
  const w = this.size.width;
  const h = this.size.height;

  this.ctx.fillStyle = this.color;
  this.ctx.beginPath();
  this.ctx.moveTo(x + r, y);
  this.ctx.lineTo(x + w - r, y);
  this.ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  this.ctx.lineTo(x + w, y + h - r);
  this.ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  this.ctx.lineTo(x + r, y + h);
  this.ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  this.ctx.lineTo(x, y + r);
  this.ctx.quadraticCurveTo(x, y, x + r, y);
  this.ctx.fill();
  this.ctx.closePath();

  }

  moveUp(){
    this.position.y-=this.speed;
    if(this.position.y<6)
    { 
        this.position.y =6;
    }
    
  }

  moveDown(){
    this.position.y+=this.speed;
    if(this.position.y+this.size.height>494)
    {
      this.position.y=494-this.size.height;
    }
  }

  
}

export default Box;
