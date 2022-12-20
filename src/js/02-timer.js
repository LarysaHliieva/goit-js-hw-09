import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import 'flatpickr/dist/flatpickr.min.css';

let selectedDate = null;
let timerId = null;
let isActive = false;

const refs = {
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.addEventListener('click', onStartTimer);
refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    if (isActive) {
      Notify.failure('The timer has already started');
      return;
    }

    if (selectedDates[0] < options.defaultDate) {
      refs.startBtn.disabled = true;
      Notify.failure('Please choose a date in the future');
      return;
    }

    refs.startBtn.disabled = false;
    selectedDate = new Date(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);

function onStartTimer() {
  if (isActive) {
    return;
  }

  refs.startBtn.disabled = true;
  isActive = true;

  timerId = setInterval(() => {
    const currentDate = Date.now();
    const deltaDate = selectedDate - currentDate;

    if (deltaDate < 999) {
      clearInterval(timerId);
    }

    const parseDate = convertMs(deltaDate);
    updateTimerFace(parseDate);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function updateTimerFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}
