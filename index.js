main();

/* Draw the default graph when the page is loaded */
function main() {
  resize_window();
}

/* Redraw the graph if the window is resized */
function resize_window() {
  var box = document.getElementById('graph-box');
  var canvas = document.getElementById('graph-area');
  var m = Math.min(box.clientWidth, 560);

  // Convert the width of graphing area to be a multiple of 20
  if ((m % 20) !== 0) {
    m -= (m % 20);
  }

  canvas.width = m;
  canvas.height = m;

  submit_graph();
}

/* Draws new graph if user has entered valid input otherwise draws graph
   using saved inputs */
function submit_graph() {
  const inputs = {
    a: Number(document.getElementById('a').value),
    b: Number(document.getElementById('b').value),
    xRange: Number(document.getElementById('x-range').value),
  };

  if (check_inputs()) {
    draw_graph(inputs);
    save_inputs();
  } else {
    const saved_inputs = {
      a: Number(document.getElementById('a').save),
      b: Number(document.getElementById('b').save),
      xRange: Number(document.getElementById('x-range').save),
    };
    draw_graph(saved_inputs);
  }
}

/* Determines whether the user has entered valid input */
function check_inputs() {
  var a = document.getElementById('a');
  var b = document.getElementById('b');
  var xRange = document.getElementById('x-range');
  var valid = true;

  if (a.validationMessage !== '' || b.validationMessage !== '' || xRange.validationMessage !== '') {
    valid = false;
  }

  document.getElementById('a-valid').innerHTML = a.validationMessage;
  document.getElementById('b-valid').innerHTML = b.validationMessage;
  document.getElementById('xRange-valid').innerHTML = xRange.validationMessage;

  if (Number(xRange.value) < 1 && xRange.validationMessage === '') {
    valid = false
    document.getElementById('xRange-valid').innerHTML = "Value must be greater than or equal to 1.";
  }

  return valid;
}

/* Save inputs of last valid graph so graph can be restored if window is resized
   or user enters invalid input */
function save_inputs() {
  document.getElementById('a').save = document.getElementById('a').value;
  document.getElementById('b').save = document.getElementById('b').value;
  document.getElementById('x-range').save = document.getElementById('x-range').value;
}
