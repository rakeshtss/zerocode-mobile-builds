$(window).scroll(function(){
    var scrollTop = $(window).scrollTop();
  if ( (scrollTop > 50) && (window.innerWidth <= 767) ) { 
    $('.videoFixed').addClass('top-fixed');
  } else {
    $('.videoFixed').removeClass('top-fixed');
  }
    // if($('#videoFixed').scrollTop() = 0){
    //     $('#videoFixed').css({
    //         position: 'fixed',
    //         top:'0px',
    //         left: '0px',
    //     })
    // }
  })
  $('#unlockNow').click(function () {
    $('.zc-absolute-group').hide();
});