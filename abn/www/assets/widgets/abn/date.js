try {
  var nth = function (d) {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  }
  var day;
  var todayDate = new Date();
  var date = ("0" + todayDate.getDate()).slice(-2);
  var fullNameDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var n = todayDate.getDay();
  fullNameDays.forEach((ele, ind) => {
    if (n == ind) {
      day = ele;
    }
  })
  var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][todayDate.getMonth()];
  var output = day + ', &nbsp' + month + ' &nbsp' + date + ',  &nbsp' + todayDate.getFullYear() + ' - ' + formatAMPM(todayDate);
  // console.log(output);
  document.getElementById("date").innerHTML = output;
  // document.getElementById("logo-date").innerHTML = output;
  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
} catch (error) {
  console.error('datejs', error);
}