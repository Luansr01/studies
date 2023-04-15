class Ray {
  constructor(x, y, angle, size, startAngle) {
    this.pos = { x: x, y: y };
    this.dir = { x: 0, y: -1 };
    this.angle = angle;
    this.size = size;
    this.startAngle = startAngle;
    this.rot(startAngle);
  }
  instantiate() {
    stroke(255, 255, 255, 30);
    strokeWeight(2);
    line(
      this.pos.x,
      this.pos.y,
      this.pos.x + this.dir.x * this.size,
      this.pos.y + this.dir.y * this.size
    );
  }
  rot(ang) {
    let a;
    ang != undefined ? (a = ang) : (a = this.angle);

    let x = this.dir.x * cos(a) + this.dir.y * sin(a);
    let y = this.dir.x * -sin(a) + this.dir.y * cos(a);

    this.dir.x = x;
    this.dir.y = y;
  }

  calcDist(pt1, pt2) {
    if (pt2 == undefined) {
      return undefined;
    }
    return sqrt((pt1.x - pt2.x) ** 2 + (pt1.y - pt2.y) ** 2);
  }

  cast(wall) {
    const x1 = wall.pt1.x;
    const y1 = wall.pt1.y;
    const x2 = wall.pt2.x;
    const y2 = wall.pt2.y;

    const x3 = this.pos.x;
    const y3 = this.pos.y;
    const x4 = this.pos.x + this.dir.x;
    const y4 = this.pos.y + this.dir.y;

    const d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    if (d === 0) return;

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / d;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / d;

    if (t > 0 && t < 1 && u > 0) {
      const pt = { x: 0, y: 0 };
      pt.x = x1 + t * (x2 - x1);
      pt.y = y1 + t * (y2 - y1);
      return this.calcDist(this.pos, pt);
    } else {
      return;
    }
  }
  look(walls) {
    let d;
    for (let wall of walls) {
      if (this.cast(wall) != undefined) {
        d ? (d = min(d, this.cast(wall))) : (d = this.cast(wall));
      }
    }
    d == undefined ? (d = 400) : (d = d);
    this.size = d;
  }
  move(x, y) {
    this.pos.x = x;
    this.pos.y = y;
  }
}
