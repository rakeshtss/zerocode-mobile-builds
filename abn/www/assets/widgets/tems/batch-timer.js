$(document).ready(function () {
    var today = new Date();
    var url = zc.config.apiUrl;
    var header = { 'Content-Type': 'application/json' };
    function getTimer() {

        //getting question list
        $.ajax({
          url: url + 'tems/api/batch/select/batch-details',
          type: 'POST',
          dataType: 'json', // added data type
          headers: header,
          data: JSON.stringify({uid: zc.params.uid}),
          success: function (res) {
            if (res && res.data) {
             var timer_list = res.data;
              console.log('timer_list', timer_list);
          
                var futureDate = new Date(timer_list.start_date);
                var futureTime = futureDate.getTime();
                  var todayTime = today.getTime();
                  var diff = futureTime - todayTime;
                  console.log("diff", diff);
                  // var daysDiff = Math.floor(diff/1000/60/60/24); 
                  var hoursDiff = Math.floor(diff / 1000 / 60 / 60);
                  diff -= hoursDiff * 1000 * 60 * 60;
                  var minDiff = Math.floor(diff / 1000 / 60);
                  // console.log('diff', diff);
                  // console.log('hoursDiff', hoursDiff);
                  // console.log('minDiff', minDiff);
  
                  function remainingTime(endtime) {
                      var t = Date.parse(endtime) - Date.parse(new Date());
                    //   console.log('tt', t);
                      var seconds = Math.floor((t / 1000) % 60);
                      var minutes = Math.floor((t / 1000 / 60) % 60);
                      var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
                      // console.log("hours", hours);
                      // console.log("minutes", minutes);

                      var days = Math.floor(t / (1000 * 60 * 60 * 24));
                      return {
                          'total': t,
                          'days': days,
                          'hours': hours,
                          'minutes': minutes,
                          'seconds': seconds
                      }
                  }
                  function initTime(identifier, endtime) {
                      var timer = document.getElementById('timer');
                      var daySpan = timer.querySelector('.days');
                      var hourSpan = timer.querySelector('.hours');
                      var minuteSpan = timer.querySelector('.minutes');
                      var secondSpan = timer.querySelector('.seconds');
                      var timeInterval = setInterval(function () {
                          var t = remainingTime(endtime);
  
                          // daySpan.innerHTML = t.days;
                          // hourSpan.innerHTML = t.hours;
                          // minuteSpan.innerHTML = t.days;
                          // secondSpan.innerHTML = ('0' + t.seconds).slice(-2);
                          daySpan.innerHTML = (t.days > 0 ? t.days : 0);
                          hourSpan.innerHTML = ((t.days < 1) && (t.hours > 0) ? t.hours : 0);
                          minuteSpan.innerHTML = ((t.days > 0) || (t.hours > 0) || (t.minutes > 0) ? t.minutes : 0);
                          secondSpan.innerHTML = (((t.days > 0) || (t.hours > 0) || (t.minutes > 0) || (t.minutes > 0))?('0' + t.seconds).slice(-2): 0);
                          if (t.total <= 0) {
                              clearInterval(timeInterval);
                          }
                      }, 1000);
                  }
                  initTime('timer', futureDate);
               
              }
               
            }
        
        });
      }

      getTimer();
  
  });