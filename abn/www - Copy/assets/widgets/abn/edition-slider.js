// zc.getSliderList = () => {
//     zc.http.post('api/edition/list/publish', { page: 1, rows: 500, sort: [], dependents: { forHome: "true" }, category: "main_edition" }).subscribe((res) => {
//         if (res && res.data && res.data.listData) {
//             editions_data = res.data.listData.rows;
//             zc.editions_data = res.data.listData.rows;
//             setTimeout(function() {
//                 // $('.edition-mobile-slider').slick({
//                 //     dots: false,
//                 //     infinite: true,
//                 //     centerMode: true,
//                 //     arrows: false,
//                 //     slidesToShow: 3,
//                 //     slidesToScroll: 1,
//                 //     autoplay: false,
//                 //     responsive: [
//                 //         {
//                 //             breakpoint: 576,
//                 //             settings: {
//                 //                 slidesToShow: 1,
//                 //                 slidesToScroll: 1,
//                 //             }
//                 //         }
//                 //     ]
//                 // });
//                 // $(document.body).append(footerDiv);

//             }, 100)
//         }
//     });
// }
// zc.getSliderList();

if (window.jQuery) {
    var $ = jQuery;
    var apiUrl = zc.config.apiUrl;
    if (!$) {
        var $ = jQuery;
    }


    $(document).ready(function() {
        // debugger;
        var editions_data = [];
        var url = zc.config.apiUrl
        var header = { 'Content-Type': 'application/json' };

        function getSliderList() {
            $.ajax({
                url: url + '/abn/api/edition/list/publish',
                type: 'POST',
                dataType: 'json',
                headers: header,
                data: JSON.stringify({ 
                    category: "main_edition", 
                    childs: false, 
                    dependents: {}, 
                    is_latest: 1, 
                    page: 1, 
                    rows: 10, 
                    sort: [], 
                    sub_category: null 
                }),
                success: function(res) {
                    if (res && res.data && res.data.listData) {
                        editions_data = res.data.listData.rows;
                        zc.editions_data = editions_data;
                        // console.log('editions_data', editions_data);
                        var slide = "";
                        var category = "";
                        editions_data.forEach(function(row) {
                            category = (row.sub_sub_category.name) ? row.sub_sub_category.name : row.sub_category.name;
                            // slide += '<a onclick="navigateLink(\'/t/90/hyderabad\')" class="zc-edition-card">' +
                            //     '<div class="slider-img"><img src="' + zc.config.E_PAPER_S3_URL + row.edition_info.basePath + row.edition_info.thumbnailSmallWebp + '"/></div>' +
                            //     '<p>' + category + '</p>' +
                            //     '</a>'
                                slide += '<a onclick="navigateLink(\'/t/' + row.uid_actual + '/' + (row.sub_sub_category.code || row.sub_category.code) + '\')" class="zc-edition-card">' +
                                    '<div class="slider-img"><img src="' + zc.config.E_PAPER_S3_URL + row.edition_info.basePath + row.edition_info.thumbnailSmallWebp + '"/></div>' +
                                    '<p>' + category + '</p>' +
                                    '</a>'
                        });
                        $(".edition-mobile-slider").append(slide);
                        // if ($('div').hasClass('edition-mobile-slider')) {
                        //     $('.edition-mobile-slider')[0].slick.refresh()
                        // }
                        setTimeout(function() {
                            $('.edition-mobile-slider').slick({
                                dots: false,
                                infinite: true,
                                centerMode: true,
                                arrows: false,
                                slidesToShow: 3,
                                slidesToScroll: 1,
                                // autoplay: true,
                                responsive: [{
                                    breakpoint: 576,
                                    settings: {
                                        slidesToShow: 1,
                                        slidesToScroll: 1,
                                        centerPadding: '90px',
                                    }
                                }]
                            });
                        }, 200)
                    }
                }

            })
        }
        getSliderList();

    })

    function navigateLink(url) {
        zc.actionService.navigateByUrl(url);
    }
}