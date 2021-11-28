/*Clock*/
function showTime(){
  var date = new Date();
  var h = date.getHours(); // 0 - 23
  var m = date.getMinutes(); // 0 - 59
  var s = date.getSeconds(); // 0 - 59
  var session = "AM";
  
  if(h == 0){
      h = 12;
  }
  
  if(h > 12){
      h = h - 12;
      session = "PM";
  }
  
  h = (h < 10) ? "0" + h : h;
  m = (m < 10) ? "0" + m : m;
  s = (s < 10) ? "0" + s : s;
  
  var time = h + ":" + m + ":" + s + " " + session;
  document.getElementById("MyClockDisplay").innerText = time;
  document.getElementById("MyClockDisplay").textContent = time;
  
  setTimeout(showTime, 1000);
  
}

showTime();



/*Digital clock*/
const timeElm = document.getElementById('time');
const doc = document.documentElement;
const { clientWidth, clientHeight } = doc;

const pad = val => val < 10 ? `0${val}` : val;

const animationFrame$ = Rx.Observable.interval(0, Rx.Scheduler.animationFrame);

const time$ = Rx.Observable.
interval(1000).
map(() => {
  const time = new Date();

  return {
    hours: time.getHours(),
    minutes: time.getMinutes(),
    seconds: time.getSeconds() };

}).
subscribe(({ hours, minutes, seconds }) => {
  timeElm.setAttribute('data-hours', pad(hours));
  timeElm.setAttribute('data-minutes', pad(minutes));
  timeElm.setAttribute('data-seconds', pad(seconds));
});

const mouse$ = Rx.Observable.
fromEvent(document, 'mousemove').
map(({ clientX, clientY }) => ({
  x: (clientWidth / 2 - clientX) / clientWidth,
  y: (clientHeight / 2 - clientY) / clientHeight }));


const smoothMouse$ = animationFrame$.
withLatestFrom(mouse$, (_, m) => m).
scan(RxCSS.lerp(0.1));

RxCSS({
  mouse: smoothMouse$ },
timeElm);
/*End of digital clock*/