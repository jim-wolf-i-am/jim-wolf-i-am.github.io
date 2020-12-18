function Balljw (w, h, color) {
  if (w === undefined) { w = 40; }
  if (h === undefined) { h = 40; }
  if (color === undefined) { color = "#ff0000"; }
  this.x = 0;
  this.y = 0;
  this.w = w;
  this.h = h;
  this.vx = 0;
  this.vy = 0;
  this.rotation = 0;
  this.scaleX = 1;
  this.scaleY = 1;
  this.color = utils.parseColor(color);
  this.lineWidth = 1;
}

Balljw.prototype.draw = function (context) {
  context.save();
  context.translate(this.x, this.y);
//  context.rotate(this.rotation);
  context.scale(this.scaleX, this.scaleY);
  
  context.lineWidth = this.lineWidth;
  context.fillStyle = this.color;
  context.beginPath();
  //x, y, radius, start_angle, end_angle, anti-clockwise
  context.ellipse(0, 0, this.w, this.h, this.rotation, 0, (Math.PI * 2), true);
  context.closePath();
  context.fill();
  if (this.lineWidth > 0) {
    context.stroke();
  }
  context.restore();
};

Balljw.prototype.getBounds = function () {
  return {
    x: this.x - this.w,
    y: this.y - this.h,
    width: this.w * 2,
    height: this.h * 2
  };
};
