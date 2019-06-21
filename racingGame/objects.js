import { ctx, canvas } from "./settings.js";
import { ROTATE_LIMIT } from "./constants.js";

let speedMultiplier;

export class Cube {
  constructor(x, y, width, height, color = 'black', image = './src/cars/stinger_small.png', angle = 0, keys = { r: 68, l: 65, u: 87, d: 83 }) {
    this.pos = { x: x, y: y };
    this.width = width;
    this.acceleration = 1;
    this.height = height;
    this.color = color;
    this.speed = 0;
    this.angle = angle;
    this.moveAngle = 0;
    this.slowerAmount = 0;
    this.keys = {
      [keys.r]: "right",
      [keys.l]: "left",
      [keys.u]: "up",
      [keys.d]: "down"
    };
    this.pressedKeys = {
      left: false,
      right: false,
      up: false,
      down: false
    }
    this.image = new Image(); 
    this.image.src = image
  }

  checkBoundaries() {
    if (this.pos.x > canvas.width) this.pos.x = 0
    else if (this.pos.x < 0) this.pos.x = canvas.width
    if (this.pos.y > canvas.height) this.pos.y = 0
    else if (this.pos.y < 0) this.pos.y = canvas.height
    
    if (this.speed > 8) this.speed = 8
    else if (this.speed < -2) this.speed = -2

    if (this.speed > -0.005 && this.speed < 0.005) this.speed = 0
  }

  drawSpeedometer(color = 'red') {
    ctx.fillStyle = color
    ctx.font = '50px serif';
    let text
    text = Math.abs((this.speed * 22).toFixed())
    
    ctx.fillText(text, canvas.width - 100, canvas.height - 70)
  }

  move(p) {
    if (this.pressedKeys.up) { 
      this.speed += (this.speed >= 0)? p / (600 + this.slowerAmount) : p / 70;
    }
    else if (this.pressedKeys.down) { 
      this.speed -= (this.speed <= 0)? p / (800 + this.slowerAmount) : p / 70;
    }
    else {
      this.speed /= 1.01
    }
    if (this.pressedKeys.left) { this.moveAngle = -2.5;this.slowerAmount += 40 } 
    else if (this.pressedKeys.right) { this.moveAngle = 2.5;this.slowerAmount += 40 }
    else this.slowerAmount = 0
    
    this.checkBoundaries()
    speedMultiplier = (this.speed < 3.5)? this.speed / 4 : ROTATE_LIMIT
    this.angle += this.moveAngle * Math.PI / 180 * speedMultiplier;
    this.pos.y -= this.speed * Math.cos(this.angle);
    this.pos.x += this.speed * Math.sin(this.angle);
    
    this.moveAngle = 0;
  }

  draw() {
    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.angle);
    ctx.drawImage(this.image, this.image.width / -1.35, this.image.height / -1.5)
    ctx.fillStyle = 'white'
    ctx.fillRect(this.width / -2, this.height / -2, 2, 2 )
    ctx.restore();    
  }
}
