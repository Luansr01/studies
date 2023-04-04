let tiles = [];
let btn;
let btn2;
let canvasSize = [400, 400];
let btnWidth = 200;
let frictionOn = true;
let backgroundDraw = true;

let tileAmmount = 50;

function setup() {
  
  btn = createButton("Toggle Friction");
  btn.position((canvasSize[0]/2)-(btnWidth/2), canvasSize[1]);
  btn.size(btnWidth);
  btn.mousePressed(( () => frictionOn = !frictionOn));
  
  btn2 = createButton("Toggle Background Draw");
  btn2.position((canvasSize[0]/2)-(btnWidth/2), canvasSize[1]+25);
  btn2.size(btnWidth);
  btn2.mousePressed(( () => backgroundDraw = !backgroundDraw));
  
  let canvasArea = canvasSize[0] * canvasSize[1];
  
  let tileSize = 5;
  
  createCanvas(canvasSize[0], canvasSize[1]);


  for(let i = 0; i < tileAmmount; i++){
    tiles[i] = new Tile(random(0, canvasSize[0]),random(0, canvasSize[1]), tileSize);
  }
  
}

function draw(){
  if(backgroundDraw){
    background(0);  
  }
  
  for(let i = 0; i < tiles.length; i++){
    tiles[i].place();
    tiles[i].gravity(200, 200);
    tiles[i].move();
    if(frictionOn){
      tiles[i].friction();
    }
    tiles[i].zigzag();
    tiles[i].mouseInteract(mouseX, mouseY);
  }
  
}

class Tile{
  constructor(x, y, size){
    this.x = x
    this.y = y
    this.size = size;
    this.xVel = 0;
    this.yVel = 0;
  }
  place(){
    square(this.x, this.y, this.size);
  }
  zigzag(){
    this.x += random(-3, 3);
    this.y += random(-3, 3);
  }
  gravity(gx, gy){
    this.xdiff = this.x - gx;
    this.ydiff = this.y - gy;
    this.distance = Math.sqrt(
      Math.abs(this.ydiff) *
      Math.abs(this.ydiff) + 
      Math.abs(this.xdiff) * 
      Math.abs(this.xdiff))
    
    this.xVel -= constrain(this.xdiff, -1, 1);
    this.yVel -= constrain(this.ydiff, -1, 1);
  }
  mouseInteract(mx, my){
    this.xVel -= constrain(this.x - mx, -1, 1) * 0.5;
    this.yVel -= constrain(this.y - my, -1, 1) * 0.5;
  }
  move(){
    this.x = constrain(this.x+this.xVel, 1, 400);
    this.y = constrain(this.y+this.yVel, 1, 400);
  }
  friction(v=1){
    this.yVel -= (constrain(this.yVel, -1, 1) * random(0.05, 0.1)) *
    constrain(v, -1, 1);
    this.xVel -= (constrain(this.xVel, -1, 1) * random(0.05, 0.1)) * 
    constrain(v, -1, 1);
  }
}

