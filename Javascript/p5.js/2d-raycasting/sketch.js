let rays = [];
let walls = [];

let pdist;

function setup() {
  createCanvas(400, 400);
  
  
  for(let i = 0; i < 720; i++){
    rays[i] = new Ray(200, 200, radians(1), 400, radians(map(i,0,720, 0, 360)))
  }
  
  for(let i = 0; i < 10; i++){
    walls[i] = new Wall(random(0,400), random(0,400), random(0,400), random(0,400));
  }
}

function draw() {
  
  background(0, 0, 0, 100)
  
  for(let wall of walls){
    wall.jitter(1);
    wall.instantiate();
  }
  
  for(let ray of rays){
    ray.move(mouseX, mouseY)
    ray.look(walls);
    ray.instantiate();
  }

  
}
  
