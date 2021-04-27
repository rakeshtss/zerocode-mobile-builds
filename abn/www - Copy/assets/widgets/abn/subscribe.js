if(!$){
  var $ = jQuery;
}
$(document).ready(function () {
  var emailValue = document.getElementById('subscribeEmail');
  var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  $('#subscribe').click(function(){
    $('#subscribeEmail').css({
      width: '250px',
      transition: 'all 0.3s'
    });
    if(emailValue.value){
      if(emailValue.value.match(mailformat)){
        localStorage.setItem('SUBSCRIBER', emailValue.value);
        window.location.replace('/zcbase/account/subscriber');
      } else{
        alert('Please enter valid email');
      }
    } else {
    emailValue.focus(); 
  }
})
$('#subscribeEmail').click(function(){
  $(this).css({
    width: '250px',
    transition: 'all 0.3s'
  })
})
$('body').click(function(evt){    
  if(!$(evt.target).is('#subscribe') && !$(evt.target).is('#subscribeEmail') ) {
      //event handling code
      // alert(21);
      $('#subscribeEmail').css({
        width: '50px',
        transition: 'all 0.3s'
      });
  }
});
})