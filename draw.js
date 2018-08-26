/* Draws each component of the graph */
function draw_graph(inputs) {
  var canvas = document.getElementById('graph-area');
  var context = canvas.getContext('2d');

  // Clear the canvas before drawing the graph
  context.clearRect(0, 0, canvas.width, canvas.height);

  draw_axis(canvas, context);
  draw_steps(canvas, context);
  draw_curve(canvas, context, inputs);
  draw_curve_equation(inputs);
}

/* Draws the x-axis and y-axis in the middle of the canvas */
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

/* Draws evenly spaced tick marks on the canvas */
function draw_steps(canvas, context) {
  const middleX = canvas.height / 2;
  const middleY = canvas.width / 2;
  const numSteps = 20;
  const xStep = canvas.width / numSteps;
  const yStep = canvas.height / numSteps;
  const delta = canvas.width * 0.02; // half of the length of each tick mark
  const xOffset = middleX - delta;
  const yOffset = middleY - delta;

  for (var i = 1; i < numSteps; i++) {
    if (i !== numSteps / 2) {
      // Draw tick mark on the x-axis
      context.beginPath();
      context.moveTo(xStep * i, xOffset);
      context.lineTo(xStep * i, xOffset + 2 * delta);
      context.stroke();
      context.closePath();

      // Draw tick mark on the y-axis
      context.beginPath();
      context.moveTo(yOffset, yStep * i);
      context.lineTo(yOffset + 2 * delta, yStep * i);
      context.stroke();
      context.closePath();
    }
  }
}

/* Plots the curve determined by the inputs parameter on the canvas */
function draw_curve(canvas, context, inputs) {
  var x = 0;
  var y = [null, null]; // For each x value there is a possibility of two y values
  var curve_width = 2;

  context.fillStyle = 'green';
  while (x <= canvas.width) {
    y = calculate_curve(canvas, inputs, x);
    // If y[0] is null then x is not a valid point on the curve
    if (y[0] !== null) {
      context.fillRect(x - curve_width / 2, y[0] - curve_width / 2, curve_width, curve_width);
      context.fillRect(x - curve_width / 2, y[1] - curve_width / 2, curve_width, curve_width);
    }
    x += 0.005;
  }
}

/* Determines the y values of the curve for a given x value */
function calculate_curve(canvas, inputs, x) {
  /* Change canvas coordinate so values lie in [-inputs.xRange, inputs.xRange] */
  const xCoord = (2 * x / canvas.width - 1) * inputs.xRange;
  const radical = Math.pow(xCoord, 3) + inputs.a * xCoord + inputs.b;
  var yCoord = 0;

  if (radical >= 0) {
    yCoord = Math.sqrt(radical);
    /* Change yCoord back in to canvas coordinates */
    y1 = (canvas.height / 2) * (1 - yCoord / inputs.xRange);
    y2 = (canvas.height / 2) * (1 + yCoord / inputs.xRange);
    return [y1, y2];
  }
  return [null, null];
}

/* Draws the equation of the curve beneath the graph */
function draw_curve_equation(inputs) {
  document.getElementById('curve-equation').innerHTML = 'y<sup>2</sup> = x<sup>3</sup> + ' + inputs.a + 'x + ' + inputs.b;
}
