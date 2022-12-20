let timerId = null;

const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

refs.startBtn.addEventListener('click', onStartChangeColor);
refs.stopBtn.addEventListener('click', onStopChangeColor);

function onStartChangeColor() {
  refs.startBtn.disabled = true;
  changeBgBody();
  timerId = setInterval(() => {
    changeBgBody();
  }, 1000);
}

function onStopChangeColor() {
  refs.startBtn.disabled = false;
  clearInterval(timerId);
}

function changeBgBody() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
