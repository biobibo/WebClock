
var container = document.getElementsByClassName('container')[0];
var countTime = document.getElementsByClassName('countTime')[0];
var setHours = document.getElementById('setHours');
var setMins = document.getElementById('setMins');
var btn = document.getElementById('submit');

var countHour = document.getElementsByClassName('count-hours')[0];
var countMin = document.getElementsByClassName('count-mins')[0];
var countSec = document.getElementsByClassName('count-secs')[0];
var notification = document.getElementsByClassName('notify')[0];
var alarmMusic = document.getElementsByClassName('alarm-music')[0];
var news = document.getElementsByClassName('news')[0];

//点击OK，界面切换成倒计时界面
function alarm(event) {
  var hoursTime = parseFloat(setHours.value)||0, minsTime =parseFloat(setMins.value) || 0;
  var time = (hoursTime*60+minsTime)*60*1000;//设置的毫秒时间
  var setNowTime = new Date().getTime();
  container.style.display='none';
  countTime.style.display='block';
  countDown(time,setNowTime);
}

//倒计时
function countDown(getTime,setTime) {
  function count() {
    var EndTime = setTime+getTime;
    var NowTime = new Date().getTime();
    var t =EndTime - NowTime;
    var h0,m0,s0;
    var h=0;
    var m=0;
    var s=0;
    var timer;
    if(t>=0){
      h0=Math.floor(t/1000/60/60%24);
      h = h0 >= 10? h0 : '0'+h0;
      m0=Math.floor(t/1000/60%60);
      m = m0 >= 10 ? m0 : '0' + m0;
      s0=Math.floor(t/1000%60);
      s = s0 >=10 ? s0 : '0'+s0;
    }
    countHour.innerHTML = h;
    countMin.innerHTML = m;
    countSec.innerHTML = s;

    if (t > 0 ){
      timer = setTimeout(count,1000);
    }else if (t <= 0 ){
      clearTimeout(timer);
      console.log(t);
      notify();
    }
  }
  count();
}
//时间到了，发出通知
function notify() {
  countTime.style.display='none';
  notification.style.display = 'block';
  notification.innerHTML = '<p>It is time up!</p><audio src="alarmMusic1.mp3" class="alarm-music" autoplay></audio>';
  setTimeout(resume,13000)
}

//通知结束后恢复最开始界面
function resume() {
  notification.style.display = 'none';
  setMins.value='';
  setHours.value='';
  container.style.display = 'block';
}
btn.addEventListener('click',alarm,false);
