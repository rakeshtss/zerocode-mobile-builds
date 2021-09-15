if (window.jQuery) {
    var $ = jQuery;
    var apiUrl = zc.config.apiUrl;
    if (!$) {
        var $ = jQuery;
    }
    $(document).ready(function(){
        var aboutus_slider_data=[
            {
                imgUrl:"assets/themes/jagruthindia/images/about-slider1.png"
            },
            {
                imgUrl:"assets/themes/jagruthindia/images/about-slider2.png"
            },
            {
                imgUrl:"assets/themes/jagruthindia/images/about-slider3.png"
            },
            {
                imgUrl:"assets/themes/jagruthindia/images/about-slider4.png"
            },
            {
                imgUrl:"assets/themes/jagruthindia/images/about-slider1.png"
            },
            {
                imgUrl:"assets/themes/jagruthindia/images/about-slider2.png"
            }
        ];

        $('.aboutus-slider').slick({
            // centerMode: true,
            slidesToShow: 4,
            arrows: true,
            autoplay: false,
            dots: false,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 425,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });

        var about_us = "";
        aboutus_slider_data.forEach(function(demo,index){
                about_us +='<div class="about-us-slider-block">'+
                                '<div class="about-us-slider-img">'+
                                    `<img src="${demo.imgUrl}"/>` +
                                '</div>'+
                        '</div>';
        });
        if ($('div').hasClass('aboutus-slider')) {
            $('.aboutus-slider').append(about_us);
            $('.aboutus-slider')[0].slick.refresh();
        }
    })
}