var target = 0;
var operations = [];
var solution = [];

const parsedElement = document.getElementById("parsed");
const resultContainerElement = document.getElementById("result-container");
const resultElement = document.getElementById("result");
const solutionContainerElement = document.getElementById("solution-container");
const solutionElement = document.getElementById("solution");

function handleSubmit(event) {
  event.preventDefault();
  solution = [];
  operations = [];

  const form = event.target;
  target = form.target.value;
  nums = form.values.value.split(" ").map(Number).filter(Number);
  if (nums.length > 6) {
    alert("Warning: >6 numbers may take very long.");
  }

  resultContainerElement.style.display = "block";
  parsedElement.innerText = nums.join(", ");
  resultElement.innerText = "Calculating...";
  solutionContainerElement.style.display = "none";
  solutionContainerElement.open = false;

  setTimeout(() => {
    solve(nums);

    if (solution.length > 0) {
      resultElement.innerText = "There exists a solution.";
      solutionElement.innerText = solution.join("\n");
      solutionContainerElement.style.display = "block";
    } else {
      resultElement.innerText = "No solutions!";
    }
  }, 0);
}

function solve(nums) {
  if (solution.length > 0) return;
  if (nums.length == 1) {
    if (Math.abs(nums[0] - target) < 0.0001) {
      solution = operations.slice();
      solution.push("Got " + target);
    }
    return;
  }

  for (var i = 0; i < nums.length; i++) {
    for (var j = i + 1; j < nums.length; j++) {
      var next = nums.slice();
      const vj = next.splice(j, 1)[0];
      const vi = next.splice(i, 1)[0];

      for (var o = 0; o < 5; o++) {
        var res, op;
        if (o == 0) {
          res = vi + vj;
          op = vi + " + " + vj;
        } else if (o == 1) {
          res = Math.abs(vi - vj);
          op = Math.max(vi, vj) + " - " + Math.min(vi, vj);
        } else if (o == 2) {
          res = vi * vj;
          op = vi + " * " + vj;
        } else if (o == 3) {
          if (vj == 0) continue;
          res = vi / vj;
          op = vi + " / " + vj;
        } else {
          if (vi == 0) continue;
          res = vj / vi;
          op = vj + " / " + vi;
        }

        operations.push(op + " = " + res);
        next.push(res);
        solve(next);
        next.pop();
        operations.pop();
      }
    }
  }
}
