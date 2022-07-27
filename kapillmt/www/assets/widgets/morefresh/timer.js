if(!$){
    var $ = jQuery;
  }
  
  $(document).ready(function () {
    var mobileNumber = document.getElementById('phone');
    var sendBtn = document.getElementById('BtnSend');
    var reSendBtn = document.getElementById('resendBtn');
    $(sendBtn).click(function(){
     
      timer();
    })
    $(reSendBtn).click(function(){
      timer();
    })
    // sendBtn.addEventListener("click", timer);
    function timer(){
      reSendBtn.style.display = 'none';
      // console.log('mobileNumber', mobileNumber.value);
      if(mobileNumber.value) {
        var counter = 60;
        var interval = setInterval(function() {
            counter--;
            // Display 'counter' wherever you want to display it.
            if (counter < 0) {
                 clearInterval(interval);
                $('#timer').html("");  
                reSendBtn.style.display = 'inline-block';
                return;
            }else{
              $('#time').text(counter);
              // console.log("Timer --> " + counter);
            }
        }, 1000);
      }
    }
  });