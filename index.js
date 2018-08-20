main();

function main() {
  resize_window();
}

function resize_window() {
  var box = document.getElementById('graph-box');
  var canvas = document.getElementById('graph-area');
  var m = Math.min(box.clientWidth, 660);

  if ((m % 20) !== 0) {
    m -= (m % 20);
  }

  canvas.width = m;
  canvas.height = m;

  draw_graph();
}

function draw_graph() {
  const inputs = {
    a: Number(document.getElementById('a').value),
    b: Number(document.getElementById('b').value),
    xRange: Number(document.getElementById('x-range').value),
  };
  var canvas = document.getElementById('graph-area');
  var context = canvas.getContext('2d');

  context.clearRect(0, 0, canvas.width, canvas.height);
  draw_axis(canvas, context);
  draw_steps(canvas, context);
  draw_curve(canvas, context, inputs);
}

function draw_axis(canvas, context) {
  const middleX = canvas.height / 2;
  const middleY = canvas.width / 2;

  // Draw the x-axis
  context.beginPath();
  context.moveTo(0, middleX);
  context.lineTo(canvas.width, middleX);
  context.stroke();
  context.closePath();

  // Draw the y-axis
  context.beginPath();
  context.moveTo(middleY, 0);
  context.lineTo(middleY, canvas.height);
  context.stroke();
  context.closePath();
}

function draw_steps(canvas, context) {
  const middleX = canvas.height / 2;
  const middleY = canvas.width / 2;
  const numSteps = 20;
  const xStep = canvas.width / numSteps;
  const yStep = canvas.height / numSteps;
  const delta = canvas.width * 0.02;
  const xOffset = middleX - delta;
  const yOffset = middleY - delta;

  // Draw the steps on the x-axis and y-axis
  for (var i = 1; i < numSteps; i++) {
    if (i !== numSteps / 2) {
      context.beginPath();
      context.moveTo(xStep * i, xOffset);
      context.lineTo(xStep * i, xOffset + 2 * delta);
      context.stroke();
      context.closePath();

      context.beginPath();
      context.moveTo(yOffset, yStep * i);
      context.lineTo(yOffset + 2 * delta, yStep * i);
      context.stroke();
      context.closePath();
    }
  }
}

function draw_curve(canvas, context, inputs) {
  var x = 0;
  var y = [null, null];
  var curve_width = 1;

  while (x <= canvas.width) {
    context.fillStyle = 'green';
    y = calculate_curve(canvas, inputs, x);
    if (y[0] !== null) {
      context.fillRect(x - curve_width / 2, y[0] - curve_width / 2, curve_width, curve_width);
      context.fillRect(x - curve_width / 2, y[1] - curve_width / 2, curve_width, curve_width);
    }
    x += 0.005;
  }
}

function calculate_curve(canvas, inputs, x) {
  const xCoord = (2 * x / canvas.width - 1) * inputs.xRange;
  const radical = Math.pow(xCoord, 3) + inputs.a * xCoord + inputs.b;
  var yCoord = 0;

  if (radical >= 0) {
    yCoord = Math.sqrt(radical);
    y1 = (canvas.height / 2) * (1 - yCoord / inputs.xRange);
    y2 = (canvas.height / 2) * (1 + yCoord / inputs.xRange);
    return [y1, y2];
  }
  return [null, null];
}
