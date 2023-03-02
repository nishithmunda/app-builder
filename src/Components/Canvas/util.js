export function drawGrid(p) {
  let canvasContainer = document.getElementById("canvas_container");
  let parentHeight = canvasContainer.offsetHeight;
  let parentWidth = canvasContainer.offsetWidth;
  let canvas = document.getElementById("canvas");
  canvas.width = parentWidth;
  canvas.height = parentHeight;
  let context = canvas.getContext("2d");
  for (let x = 0; x <= parentWidth; x += 25) {
    context.moveTo(x, 0);
    context.lineTo(x, parentHeight);
  }

  for (let x = 0; x <= parentHeight; x += 25) {
    context.moveTo(0, x);
    context.lineTo(parentWidth, x);
  }
  context.strokeStyle = "#e9eff2";
  context.stroke();
}
