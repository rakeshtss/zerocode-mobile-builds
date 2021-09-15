$(window).scroll(function(){
    if($(window).scrollTop()>30){
        $(".zc-course-overview-left").addClass("zc-course-overview-scroll");
    }
    else{
        $(".zc-course-overview-left").removeClass("zc-course-overview-scroll");
    }
})