const buttonStart = document.getElementById('startButton');
const buttonStop = document.getElementById('stopButton');

let start = 0;
let tens = 0;
let seconds = 0;

const appendTens = document.getElementById("tens");
const appendSeconds = document.getElementById("seconds");

class Timer {
  constructor(startTime, stopTime, interval) {
    this.startTime = startTime;
    this.stopTime = stopTime;
    this.interval = interval;
  }

  // геттер
  get start() {
    return `${this.startTime}`;
  }
  get stop() {
    return `${this.stopTime}`;
  }

  // сеттер
  set start(newTime) {
    [this.startTime, this.stopTime] = [newTime, newTime];
  }
  set stop(newStop) {
    [this.stopTime] = [newStop];
  }
  getTime () {
    console.log('Interval: ', parseFloat(this.stopTime) - parseFloat(this.startTime));
  }

  // возвращает кол-во дней от сегодня и до Нового Года.
  timeToNY () {
    let timeend= new Date();
    // IE и FF по разному отрабатывают getYear()
    timeend= new Date(timeend.getYear()>1900?(timeend.getYear()+1):(timeend.getYear()+1901),0,1);
    let today = new Date();
    today = Math.floor((timeend-today)/1000);
    let tsec = today%60; today = Math.floor(today/60); if( tsec<10 ) tsec='0'+tsec;
    let tmin = today%60; today = Math.floor(today/60); if( tmin<10 ) tmin='0'+tmin;
    let thour = today%24; today = Math.floor(today/24);
    let timestr = today +" days "+ thour+" hours "+tmin+" minutes "+tsec+" seconds";
    document.getElementById('timeToNewYear').textContent = timestr;
  }
}

let stopwatch = new Timer('','','');

stopwatch.timeToNY();
getTimeToNY = setInterval(() => {
  stopwatch.timeToNY();
}, 1000);

buttonStart.addEventListener('click', () => {
  buttonStart.disabled = true;
  buttonStop.disabled = false;
  stopwatch.start = `${seconds}.${tens}`; // StartTime
  console.log(`Start time: ${stopwatch.start}`);
  timer = setInterval( () => {
    tens++;

    if (tens < 9) appendTens.textContent = "0" + tens;

    if (tens > 9) appendTens.textContent = tens;

    if (tens > 99) {
        seconds++;
        appendSeconds.textContent = "0" + seconds;
        tens = 0;
        appendTens.textContent = "0" + 0;
      }

      if (seconds > 9) appendSeconds.textContent = seconds;
    }, 10);
})

buttonStop.addEventListener('click', () => {
  clearInterval(timer);
  buttonStart.disabled = false;
  buttonStop.disabled = true;
  stopwatch.stop = `${seconds}.${tens}`; // StartTime
  console.log(`Stop time: ${stopwatch.stop}`);
  stopwatch.getTime();
});
