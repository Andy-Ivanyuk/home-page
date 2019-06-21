import { Cube } from "./objects.js";
import { ctx, canvas } from "./settings.js";
import { drawMap } from "./map.js";

let user = new Cube(canvas.width / 2, canvas.height / 2, 20, 50, '','./src/cars/stinger_small.png');

// * draw function
function draw() {
  ctx.clear();
  drawMap()
  user.drawSpeedometer()  
  user.draw();  
}

// * update function
function update(progress) {
  user.move(progress / 4)
}

// * loop function
function loop(timestamp) {
  let progress = timestamp - lastRender;

  canvas.isUnfocused(() => Object.keys(user.pressedKeys).forEach(v => user.pressedKeys[v] = false))
  // console.log();
  
  update(progress);
  draw();

  lastRender = timestamp;
  window.requestAnimationFrame(loop);
}
let lastRender = 0;
window.requestAnimationFrame(loop);

function keyEvent(keyCode, isDown = true) {
  if (keyCode in user.keys) {
    let key = user.keys[keyCode]
    user.pressedKeys[key] = isDown
  }
}
window.addEventListener("keydown", () => { keyEvent(event.keyCode) }, false)
window.addEventListener("keyup", () => { keyEvent(event.keyCode, false) }, false)