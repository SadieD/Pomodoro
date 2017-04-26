$(document).ready(function(){
  var timerSet = 1500;
  var pomoTime = 1500;
  var timerCurrent = 0;
  var timerReset = timerSet;
  
  var seconds = 0;
  var minutes = 25;
  var timerStatus = false;
  
  var audioAlarm = document.createElement('audio');
  audioAlarm.src = 'http://cnoss.us/static/sounds/pomoAlarm.ogg';
  
  $("#btnStart").on("click", function(){
    timerReset = timerSet;
    timerStatus = true;
  });
    
  $("#btnStop").on("click", function(){
    timerStatus = false;
  });
  
  $("#btnReset").on("click", function(){
    timerCurrent = 0;
    timerSet = timerReset;
    $('#timer-count').text(TimerFormat(timerSet));
  });
  
  $("#btnSBreak").on("click", function(){
    timerCurrent = 0;
    timerSet = 300;
    $('#timer-count').text(TimerFormat(timerSet));
  });
  
  $("#btnLBreak").on("click", function(){
    timerCurrent = 0;
    timerSet = 600;
    $('#timer-count').text(TimerFormat(timerSet));
  });
  
  $("#btnPGet").on("click", function(){
    pomoTime = timerSet;
  });
  
  $("#btnPSet").on("click", function(){
    timerCurrent = 0;
    timerSet = pomoTime;
    $('#timer-count').text(TimerFormat(timerSet));
  });
  
  $("#btnLess").on("click", function(){
    if (!timerStatus) {
      if (timerSet > 120) {
        timerSet -= 60;
      } else {
        timerSet = 60;
      }
      timerReset = timerSet;
      $('#timer-count').text(TimerFormat(timerSet));
    }
  });
  
  $("#btnMore").on("click", function(){
    if (!timerStatus) {
      if (timerSet < 3600) {
        timerSet += 60;
      }
      timerReset = timerSet;
      $('#timer-count').text(TimerFormat(timerSet));
    }
  });

  function TimerFormat(t1){
    var tMins = 0;
    var tSecs = 0;
    if (t1 > 59) {
      tMins = Math.floor(t1 / 60);
      tSecs = t1 % 60;
    } else {
      tSecs = t1;
    }
    return digitFormat(tMins) + ":" + digitFormat(tSecs);
  }
  
  function digitFormat(d1){
    return d1 = ("0" + d1).slice(-2);
  }

  setInterval(function(){
      if (timerStatus){
        if (timerCurrent != timerSet){
          timerCurrent++;
          $('#timer-count').text(TimerFormat(timerSet - timerCurrent));
          $("title").text(TimerFormat(timerSet - timerCurrent) + " Pomodoro");
          
        } else {
          audioAlarm.play();
          timerStatus = false;
        }
      }
      
    }, 1000);
  });
