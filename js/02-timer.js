import Notiflix from "notiflix";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
const dataPicker = document.querySelector("#datetime-picker"),
  startBtn = document.querySelector("button[data-start]"),
  daysEl = document.querySelector("span[data-days]"),
  hoursEl = document.querySelector("span[data-hours]"),
  minutesEl = document.querySelector("span[data-minutes]"),
  secondsEl = document.querySelector("span[data-seconds]");
let userDate;
startBtn.setAttribute("disabled", true);
startBtn.addEventListener("click", onStartBtn);
function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}
function onStartBtn() {
  setInterval(() => {
    if (userDate <= Date.now()) return;
    const currentTime = convertMs(userDate - Date.now());

    secondsEl.textContent = addLeadingZero(currentTime.seconds);
    minutesEl.textContent = addLeadingZero(currentTime.minutes);
    hoursEl.textContent = addLeadingZero(currentTime.hours);
    daysEl.textContent = addLeadingZero(currentTime.days);
  }, 1000);
}
flatpickr(dataPicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userDate = selectedDates[0];
    if (userDate > Date.now()) {
      startBtn.removeAttribute("disabled");
    } else {
      Notiflix.Notify.failure("Please choose a date in the future");
      startBtn.setAttribute("disabled", true);
    }
  },
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
