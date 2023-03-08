const btnStart = document.querySelector("button[data-start]"),
  btnStop = document.querySelector("button[data-stop]");

btnStart.addEventListener("click", randomColor);
btnStop.addEventListener("click", stopRandomColor);
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function randomColor() {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStart.setAttribute("disabled", "disabled");
  btnStop.removeAttribute("disabled");
}

function stopRandomColor() {
  btnStart.removeAttribute("disabled");
  btnStop.setAttribute("disabled", "disabled");
  clearInterval(timerId);
}
