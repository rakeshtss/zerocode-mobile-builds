var nth = function(d) {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
    }
    
    var todayDate = new Date();
    var date = ("0" + todayDate.getDate()).slice(-2);
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][todayDate.getMonth()];
    var output= date + nth(date) + " Of " + month + " " +todayDate.getFullYear();
    // console.log(output);
    document.getElementById("date").innerHTML = output;
    // document.getElementById("logo-date").innerHTML = output;