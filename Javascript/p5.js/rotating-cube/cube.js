//set the anchors
let Ax = 200;
let Ay = 200;
let Az = 200;

//array with points to draw and their position relative to the anchor
let sqrA = [
  [ 1,  1,  1],
  [-1,  1,  1],
  [-1, -1,  1],
  [ 1, -1,  1],
  [ 1, -1, -1],
  [-1, -1, -1],
  [-1,  1, -1],
  [ 1,  1, -1]
];

//how far each point's X Y and Z are from the anchor
let howBig = 80;

//declare variables
let dots = [];
let backRefresh;
let bg = true;

function setup() {
  createCanvas(400, 400);

  //create sliders
  XSlider = createSlider(0, 0.5, random(0.1), 0.01);
  YSlider = createSlider(0, 0.5, random(0.1), 0.01);
  ZSlider = createSlider(0, 0.5, random(0.1), 0.01);
  
  //create bg refresh toggle button
  backRefresh = createButton('Toggle BG Refresh');
  backRefresh.mousePressed((() => bg = !bg));
  
  //instantiate the dots
  for(let i = 0; i < sqrA.length; i++){
    dots[i] = new Dot(
      (Ax + (howBig * sqrA[i][0])), 
      (Ay + (howBig * sqrA[i][1])),
      (Az + (howBig * sqrA[i][2])) )
  }
}

function draw() {
  
  //draw background if enabled
  if(bg){
    background(0);
  }
  
  //set point/line color
  stroke('white');
  
  //set point size
  strokeWeight(7);
  
  //rotate and draw the points
  for(let i = 0; i < dots.length; i++){
    dots[i].rotX(XSlider.value(), Ax, Ay, Az);
    dots[i].rotY(YSlider.value(), Ax, Ay, Az);
    dots[i].rotZ(ZSlider.value(), Ax, Ay, Az);
    dots[i].put();
  }
  
  //set line width
  strokeWeight(2);
  
  //draw lines (couldn't think of a better way to do this, but hey, it works)
  line(dots[0].x, dots[0].y, dots[1].x, dots[1].y);
  line(dots[1].x, dots[1].y, dots[2].x, dots[2].y);
  line(dots[2].x, dots[2].y, dots[3].x, dots[3].y);
  line(dots[3].x, dots[3].y, dots[4].x, dots[4].y);
  line(dots[4].x, dots[4].y, dots[5].x, dots[5].y);
  line(dots[5].x, dots[5].y, dots[6].x, dots[6].y);
  line(dots[6].x, dots[6].y, dots[7].x, dots[7].y);
  
  line(dots[7].x, dots[7].y, dots[0].x, dots[0].y);
  line(dots[6].x, dots[6].y, dots[1].x, dots[1].y);
  line(dots[5].x, dots[5].y, dots[2].x, dots[2].y);
  line(dots[4].x, dots[4].y, dots[3].x, dots[3].y);
  
  line(dots[0].x, dots[0].y, dots[3].x, dots[3].y);
  line(dots[7].x, dots[7].y, dots[4].x, dots[4].y);
  //end of draw lines

}

class Dot {
  constructor(x, y, z, color){
    this.x = x;
    this.y = y;
    this.z = z;
  }
  put(){
    point(this.x, this.y);
  }
  
  /*  DEPRECATED
  rot2D(angle, Ax, Ay){
    let xRot = Ax + ((Ax - this.x) * cos(angle)) - (Ax - this.y) * sin(angle);
    
    let yRot = Ay + ((Ay - this.x) * sin(angle)) + (Ay - this.y) * cos(angle);
    
    this.x = xRot;
    this.y = yRot;
  }*/
  
  //rotate in the X axis
  rotX(angle, Ax, Ay, Az){
    let xRot = Ax + (this.x - Ax);
    let yRot = Ay + (((this.y - Ay) * cos(angle)) - (this.z - Az) * sin(angle));
    let zRot = Az + (((this.y - Az) * sin(angle)) + (this.z - Az) * cos(angle));
    
    this.x = xRot;
    this.y = yRot;
    this.z = zRot;
  }
  
  //rotate in the Y axis
  rotY(angle, Ax, Ay, Az){
    let xRot = Ax + ((this.x - Ax) * cos(angle)) - (this.z - Ax) * sin(angle);
    let yRot = Ay + (this.y - Ay);
    let zRot = Az + ((this.x - Az) * sin(angle)) + (this.z - Az) * cos(angle);
    
    this.x = xRot;
    this.y = yRot;
    this.z = zRot;
  }
  
  //rotate in the Z axis
  rotZ(angle, Ax, Ay, Az){
    let xRot = Ax + ((this.x - Ax) * cos(angle)) + (this.y - Ax) * sin(angle);
    let yRot = Ay + (-((this.x - Ay) * sin(angle))) + (this.y - Ay) * cos(angle);
    let zRot = Az + (this.z - Az);
    
    this.x = xRot;
    this.y = yRot;
    this.z = zRot;
  }
}
