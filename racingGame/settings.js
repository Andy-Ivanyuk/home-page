const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.sizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};
ctx.clear = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

let resize = function () {
  ctx.sizeCanvas();
};
window.onresize = resize;
resize();

canvas.isUnfocused = (func) => {
  if (!document.hasFocus())
    func.call();
}

export { ctx, canvas };
