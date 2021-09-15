$(window).scroll(function(){
    if($(window).scrollTop()>30){
        $(".zc-header").addClass("header-scroll");
    }
    else{
        $(".zc-header").removeClass("header-scroll");
    }
})