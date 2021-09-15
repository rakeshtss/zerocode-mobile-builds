if (window.jQuery) {
    var $ = jQuery;
    var apiUrl = zc.config.apiUrl;
    if (!$) {
        var $ = jQuery;
    }
    $(document).ready(function () {
        var patner_slick = [
            {
                "imgURL": "assets/themes/tems/images/naarm.jpg"
            },
            {
                "imgURL": "assets/themes/tems/images/krishitantra.png"
            },
            {
                "imgURL": "assets/themes/tems/images/icarbharath.png"
            },
            {
                "imgURL": "assets/themes/tems/images/kerala.jpg"
            },
            {
                "imgURL": "assets/themes/tems/images/nahep.png"
            },
            {
                "imgURL": "assets/themes/tems/images/naip-logo.gif"
            },
            {
                "imgURL": "assets/themes/tems/images/smart_class.png"
            },
        ];
        $('.partner-slider').slick({
            centerMode: true,
            centerPadding: '60px',
            slidesToShow: 6,
            arrows: true,
            autoplay: false,
            dots: false,
        });

        var patner_programer = "";
        patner_slick.forEach(function(items,index){
            patner_programer +='<div class="partner-main">'+
             '<div class="partner-images">'+
                  `<img  alt="" src="${items.imgURL}"/>` +
            '</div>'+
          '</div>'
    });
    if ($('div').hasClass('partner-slider')) {
        $('.partner-slider').append(patner_programer);
        $('.partner-slider')[0].slick.refresh();
       }
});
}