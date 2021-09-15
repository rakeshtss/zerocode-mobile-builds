$(window).scroll(function(){
    if($(window).scrollTop()>30){
        $(".zc-home-header").addClass("header-scroll");
    }
    else{
        $(".zc-home-header").removeClass("header-scroll");
    }
})