
// var more_images= [

//     {
//         image_path: "login-bg.png"
//     },
//     {
//         image_path: "login-bg.png"
//     },
//     {
//         image_path: "login-bg.png"
//     }
// ];
// if (window.jQuery) {
//     var $ = jQuery;
//     var apiUrl = zc.config.apiUrl;
//     if (!$) {
//         var $ = jQuery;
//     }

//     var slide="";
// $(document).ready(function(){


//     more_images.forEach(function(ans,i){
//         slide += "<div class='more-slider-img'><img width='100%' src='assets/themes/morefresh/images/" + ans.image_path + "' /></div>"
//     console.log(i);
//     });
//     $(".more-slider").append(slide);
//     if ($('div').hasClass('more-slider')) {
//         $('.more-slider')[0].slick.refresh();
//     }
//     $('.more-slider').slick({
//         dots: false,
//         infinite: false,
//         speed: 400,
//         autoplay: true,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         arrows: false
//     });
// })
// }



if (window.jQuery) {
    var $ = jQuery;
    var apiUrl = zc.config.apiUrl;
    if (!$) {
        var $ = jQuery;
    }
    $(document).ready(function () {
        var more_images = [];
        var url = zc.config.apiUrl
        var header = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + zc.user.token };
        function getSliderList() {
            $.ajax({
                url: url + '/morefresh/api/banner/list/banner-list',
                type: 'POST',
                dataType: 'json',
                headers: header,
                data: JSON.stringify({ page: 1, rows: 500, sort: [], dependents: { forHome: "true" } }),
                success: function (res) {
                    if (res && res.data && res.data.listData) {
                        more_images = res.data.listData.rows;
                        console.log('more_images', more_images);
                        var slide = "";
                        more_images.forEach(function (item) {
                            if(item.banner_image[0]){
                            slide += '<div>'+
                                       '<img  alt="" src="' + zc.config.fileServer + 'get/' + item?.banner_image[0]?.path + '" />' +
                                      // '<img  alt="" width="100%" src="assets/themes/morefresh/images/groceries.jpg" />' +
                                     '</div>'
                            }
                        });
                        $(".more-slider").append(slide);
                        if ($('div').hasClass('more-slider')) {
                            $('.more-slider')[0].slick.refresh()
                        }
                    }
                }

            })
        }
        getSliderList();
        $('.more-slider').slick({
            dots: false,
            infinite: true,
            speed: 900,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1
        });
    })
}