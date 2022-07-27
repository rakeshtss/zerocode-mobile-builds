
var deadline = '08/05/2020';
var today = new Date();
var futureDate = new Date(2020, 11, 20, 14);
// var futureDate = new Date(2020, 6, 4, 19);



var futureTime = futureDate.getTime();
var todayTime = today.getTime();
var diff = futureTime - todayTime;
// var daysDiff = Math.floor(diff/1000/60/60/24); 
var hoursDiff = Math.floor(diff / 1000 / 60 / 60);
diff -= hoursDiff * 1000 * 60 * 60;
var minDiff = Math.floor(diff / 1000 / 60);
// console.log('diff', diff);
// console.log('hoursDiff', hoursDiff);
// console.log('minDiff', minDiff);

function remainingTime(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    // console.log('tt', t);
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
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
        hourSpan.innerHTML = ((t.days > 0) && (t.hours > 0) ? t.hours : 0);
        minuteSpan.innerHTML = ((t.days > 0) || (t.hours > 0) || (t.minutes > 0) ? t.minutes : 0);
        secondSpan.innerHTML = (((t.days > 0) || (t.hours > 0) || (t.minutes > 0) || (t.minutes > 0))?('0' + t.seconds).slice(-2): 0);
        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    }, 1000);
}
initTime('timer', futureDate);
