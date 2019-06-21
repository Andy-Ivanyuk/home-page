import { ctx, canvas } from "./settings.js";

export function drawMap() {
    ctx.fillStyle = '#222e30'
    ctx.fillRect(0, 100, canvas.width, 150)
    ctx.fillRect(canvas.width / 2 - 150, 0, 150, canvas.height)
    ctx.fillRect(0, canvas.height / 2 + 100, canvas.width , 150)
    ctx.fillRect(canvas.width / 2 + 274.5, 199, 150, canvas.height / 2 - 98)
}