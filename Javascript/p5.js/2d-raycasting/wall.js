class Wall{
  constructor(x1, y1, x2, y2){
    this.pt1 = {x: x1, y: y1};
    this.pt2 = {x: x2, y: y2};
  }
  instantiate(){
    stroke(255);
    strokeWeight(1)
    line(this.pt1.x, this.pt1.y, this.pt2.x, this.pt2.y);
  }
  jitter(mag){
    this.pt1.x = constrain(this.pt1.x + random(-mag, mag), 0, 400)
    this.pt1.y = constrain(this.pt1.y + random(-mag, mag), 0, 400)
    this.pt2.x = constrain(this.pt2.x + random(-mag, mag), 0, 400)
    this.pt2.y = constrain(this.pt2.y + random(-mag, mag), 0, 400)
  }
}
