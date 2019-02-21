(function(selector){const astronaut = document.querySelector(selector);
const state = {value: 0};

const intervalHandler = element => element.style.transform = `rotateY(${state.value++}deg)`;
let timerId;

astronaut.addEventListener('mousedown', (ev) => {
    timerId = window.setInterval(intervalHandler, 12, ev.currentTarget);
}, false);

astronaut.addEventListener('mouseup', (ev) => {
    window.clearInterval(timerId);
}, false);})('#neki_el')

/* window.setInterval(
}, 100); */