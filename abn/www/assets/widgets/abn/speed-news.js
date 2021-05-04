if (!$) {
    var $ = jQuery;
}
var menuClass = "";
var oprionsList = [];
var defaultSelectedValue;
var no_data = "";
var header = { 'Content-Type': 'application/json' };
$(document).ready(function () {

    $.ajax({
        url: `${zc.config.apiUrl}abn/api/speednews_category/list/`,
        type: "POST",
        dataType: "json",
        headers: header,
        data: {},
        success: function (res) {
            console.log('res cat', res);
            var select = $("#speedNews");
            select.children().remove();
            if (res.data && res.data.listData && res.data.listData.rows) {
                oprionsList = res.data.listData.rows;
                $(oprionsList).each(function (index, item) {
                    select.append($("<option>").val(item.uid).text(item.name));
                    if (index === 0) {
                        if (zc.queryParams && zc.queryParams.category) {
                            defaultSelectedValue = zc.queryParams.category;
                        } else {
                            defaultSelectedValue = item.uid;
                        }
                        console.log('0', defaultSelectedValue);
                    }
                });

            }
            $('#speedNews option[value="' + zc.queryParams.category + '"]').attr("selected", "selected");

            // $('select[name^="speedNews"] option[value="'+zc.queryParams.category+'"]').attr("selected","selected");

            // $("#speedNews").val(zc.queryParams.category);
            getSpeednewsListByCategory(defaultSelectedValue)
        }
    })
    $("#speedNews").change(function () {
        //var news_li_data = "";
        url = $(this).find(':selected').val();
        console.log('url', url);
        $('.loader-wrap').fadeIn();
        // getspeedNews(url);
        getSpeednewsListByCategory(url);
        $('html, body').animate({
            scrollTop: $(".zc-speed-news-block").offset().top - 0
        }, 1000);
    });

    $('.loader-wrap').fadeOut();
    
})

function getSpeednewsListByCategory(defaultSelectedValue) {
    $('.swiper-wrapper').empty('');
    let payload = {
        "speednews_category": {
            "uid": defaultSelectedValue
        }
    };
    $.ajax({
        url: `${zc.config.apiUrl}abn/api/speednews/list/speednews-list-by-category`,
        type: "POST",
        dataType: "json",
        headers: header,
        data: JSON.stringify(payload),
        success: function (res) {
            console.log('resss', res);
            if (res.data && res.data.listData && res.data.listData.rows && res.data.listData.rows.length) {
                // debugger;
                var newsInfo = {};
                list = res.data.listData.rows;

                if (zc.params && zc.params.uid) {
                    newsInfo = list.find((item) => { return item.uid == zc.params.uid; });
                    list = list.filter((item) => { return item.uid != zc.params.uid });
                    // list.splice(0, 0, newsInfo);
                    if (newsInfo && newsInfo.uid) {
                        list.unshift(newsInfo);
                    }
                }
                console.log('list length', list.length);
                var slide_data;
                $(list).each(function (i, o) {
                    // debugger;
                    slide_data = '';
                    slide_data += `<div class="swiper-slide" id='${o.uid}'>
                    <div class="swiper-lazy-preloader"></div>
                    <div class="swiper-lazy-loading"></div>
                    <h4>${o.title}</h4>`;
                    if(o.description) {
                        slide_data += `<p>${o.description}</p>`;
                    }                    
                    if (o.speednews_type.uid == 'image') {
                        if (o.image[0]) {
                            slide_data += `<div class="speed-image">
                        <img src="${o.image[0]?.path}">
                        </div>`;
                        }
                    } else if (o.speednews_type.uid == 'video') {
                        var videoUrl = o.audio_video_url;
                        if (!videoUrl.includes('youtube') && videoUrl) {
                            videoUrl = 'https://www.youtube.com/embed/' + videoUrl;
                        }
                        // slide_data += `<div class="speed-video-widget"><div class="speed-video overlay-video" onclick="playVideo(event, ${i})">
                        // <iframe class="iframeSwipe" id="iframeId${i}" width="100%" height="315" src="${videoUrl}?rel=0" frameborder='0' allowtransparency="true" allowfullscreen allow="autoplay"></iframe>
                        // </div>
                        // <div class="stopVideo" id="stop${i}" onclick='stopVideo(event, ${JSON.stringify(videoUrl)}, ${i})'></div>
                        // </div>`;
                        slide_data += `<div class="speed-video-widget"><div class="speed-video overlay-video">
                        <iframe class="youTube youtube-video${i}" src="${videoUrl}?enablejsapi=1&version=3&playerapiid=ytplayer" width="100%" height="250" modestbranding="0" controls="0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                            <div  class="playVideo play-video${i}"></div>
                            <div  class="pauseVideo pause-video${i}"></div>
                            </div></div>`;
                            // <button type="button" class="btn  btn-warning stop-video${i}"> stop</button>
                    setTimeout(function(){
                        $(`.stop-video${i}`).hide();
                        $(`.play-video${i}`).click(function() {
                            $(`.youtube-video${i}`)[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
                            $(`.pause-video${i}`).show();
                            $(`.play-video${i}`).hide();
                        });
                    
                        $(`.stop-video${i}`).click(function() {
                            $(`.youtube-video${i}`)[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
                            $(`.stop-video${i}`).hide();
                            $(`.play-video${i}`).show();
                        });
                    
                        $(`.pause-video${i}`).click(function() {
                            $(`.youtube-video${i}`)[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
                            $(`.pause-video${i}`).hide();
                            $(`.play-video${i}`).show();
                        });
                    }, 1000)
                        // <a href="#" id="play" onclick="playVideo(event, ${i})">Play button</a>
                    } else if (o.speednews_type.uid == 'audio') {
                        slide_data += `<div class="speed-audio">
                        <audio controls>
                            <source src="${o.audio_video_url}" type="audio/ogg">
                        </audio>
                        </div>`;
                    }
                    slide_data += `</div>`;
                    $('.swiper-wrapper').append(slide_data);
                })
                if (window.innerWidth <= 767) {
                    const swiper = new Swiper('.swiper-container', {
                        // Optional parameters
                        direction: 'vertical',
                        mousewheel: true,
                        // speed: 700,
                        autoHeight: true,
                        lazy:true,
                        // If we need pagination
                        // pagination: {
                        //     el: '.swiper-pagination',
                        //     clickable: true
                        // },
                        // Navigation arrows
                        // navigation: {
                        //     nextEl: '.swiper-button-next',
                        //     prevEl: '.swiper-button-prev',
                        // },

                        // And if we need scrollbar
                        // scrollbar: {
                        //     el: '.swiper-scrollbar',
                        //     draggable: true,
                        // }
                        on: {

                            // init: function () {
                            //     console.log('swiper init');
                            //     // $('#iframeId').css({
                            //     //     'pointer-events': 'none'
                            //     // });
                            //     // $('audio').css({
                            //     //     'pointer-events': 'none'
                            //     // });
                            // },
                            // activeIndexChange: function () {
                            //     console.log('swiper activeIndexChange');
                            // },
                            // afterInit: function () {
                            //     console.log('swiper afterInit');
                            // },
                            // beforeDestroy: function () {
                            //     console.log('swiper beforeDestroy');
                            // },
                            // beforeInit: function () {
                            //     console.log('swiper beforeInit');
                            // },
                            // beforeLoopFix: function () {
                            //     console.log('swiper beforeLoopFix');
                            // },
                            // beforeResize: function () {
                            //     console.log('swiper beforeResize');
                            // },
                            // beforeSlideChangeStart: function () {
                            //     console.log('swiper beforeSlideChangeStart');
                            // },
                            // beforeTransitionStart: function () {
                            //     console.log('swiper beforeTransitionStart');
                            // },
                            // breakpoint: function () {
                            //     console.log('swiper breakpoint');
                            // },
                            // changeDirection: function () {
                            //     console.log('swiper changeDirection');
                            // },
                            // click: function () {
                            //     console.log('swiper click');
                            //     $('#iframeId').css({
                            //         'pointer-events': 'all'
                            //     });
                            //     $('audio').css({
                            //         'pointer-events': 'all'
                            //     });
                            // },
                            // destroy: function () {
                            //     console.log('swiper destroy');
                            // },
                            // doubleClick: function () {
                            //     console.log('swiper doubleClick');
                            // },
                            // doubleTap: function () {
                            //     console.log('swiper doubleTap');
                            // },
                            // fromEdge: function () {
                            //     console.log('swiper fromEdge');
                            // },
                            // imagesReady: function () {
                            //     console.log('swiper imagesReady');
                            // },
                            // loopFix: function () {
                            //     console.log('swiper loopFix');
                            // },
                            // momentumBounce: function () {
                            //     console.log('swiper momentumBounce');
                            // },
                            // observerUpdate: function () {
                            //     console.log('swiper observerUpdate');
                            // },
                            // orientationchange: function () {
                            //     console.log('swiper orientationchange');
                            // },
                            // progress: function () {
                            //     console.log('swiper progress');
                            // },
                            // reachBeginning: function () {
                            //     console.log('swiper reachBeginning');
                            // },
                            // reachEnd: function () {
                            //     console.log('swiper reachEnd');
                            // },
                            // realIndexChange: function () {
                            //     console.log('swiper realIndexChange');
                            // },
                            // resize: function () {
                            //     console.log('swiper resize');
                            // },
                            // setTransition: function () {
                            //     console.log('swiper setTransition');
                            // },
                            // setTranslate: function () {
                            //     console.log('swiper setTranslate');
                            // },
                            slideChange: function () {
                                console.log('swiper slideChange');
                                // debugger;
                                setTimeout(function(){
                                    $(`.youTube`)[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
                                    $(`.pauseVideo`).hide();
                                    $(`.playVideo`).show();
                                }, 100)
                            },
                            // slideChangeTransitionEnd: function () {
                            //     console.log('swiper slideChangeTransitionEnd');
                            // },
                            // slideChangeTransitionStart: function () {
                            //     console.log('swiper slideChangeTransitionStart');
                            // },
                            // slideNextTransitionEnd: function () {
                            //     console.log('swiper slideNextTransitionEnd');
                            // },
                            // slideNextTransitionStart: function () {
                            //     console.log('swiper slideNextTransitionStart');
                            // },
                            // slidePrevTransitionEnd: function () {
                            //     console.log('swiper slidePrevTransitionEnd');
                            // },
                            // slidePrevTransitionStart: function () {
                            //     console.log('swiper slidePrevTransitionStart');
                            // },
                            // slideResetTransitionEnd: function () {
                            //     console.log('swiper slideResetTransitionEnd');
                            // },
                            // slideResetTransitionStart: function () {
                            //     console.log('swiper slideResetTransitionStart');
                            // },
                            // sliderFirstMove: function () {
                            //     console.log('swiper sliderFirstMove');
                            // },
                            // sliderMove: function () {
                            //     console.log('swiper sliderMove');
                            // },
                            // slidesGridLengthChange: function () {
                            //     console.log('swiper slidesGridLengthChange');
                            // },
                            // slidesLengthChange: function () {
                            //     console.log('swiper slidesLengthChange');
                            // },
                            // snapGridLengthChange: function () {
                            //     console.log('swiper snapGridLengthChange');
                            // },
                            // snapIndexChange: function () {
                            //     console.log('swiper snapIndexChange');
                            // },
                            // snapIndexChange: function () {
                            //     console.log('swiper snapIndexChange');
                            // },
                            // tap: function () {
                            //     console.log('swiper tap');
                            // },
                            // toEdge: function () {
                            //     console.log('swiper toEdge');
                            // },

                            // beforeSlideChangeStart: function () {
                            //     console.log('swiper beforeSlideChangeStart');
                            // },
                            // touchStart: function () {
                            //     console.log('swiper touchStart');
                            //     $('#iframeId').css({
                            //         'pointer-events': 'none'
                            //     });
                            // },
                            // touchEnd: function () {
                            //     console.log('swiper touchEnd');
                            //     $('#iframeId').css({
                            //         'pointer-events': 'all'
                            //     });
                            // },
                            // touchMove: function () {
                            //     console.log('swiper touchMove');
                            //     $('#iframeId').css({
                            //         'pointer-events': 'none'
                            //     });
                            // },
                        },
                    });
                }
                // swiper.on('beforeInit', function () {
                //     console.log('beforeInit');
                // });
                // swiper.on('slideChange', function () {
                //     console.log('slide changed');
                // });
            } else {
                // debugger;
                no_data = "<h4 style='width:100%;text-align: center;'>No Data Found</h4>";
                $('.swiper-wrapper').html(no_data);
                // $('.swiper-wrapper').css('transform', 'inherit');
            }
            $('.loader-wrap').fadeOut();
            // $("#iframeId").touchwipe({
            //     wipeLeft: function() { alert("left"); },
            //     wipeRight: function() { alert("right"); },
            //     wipeUp: function() { alert("up"); },
            //     wipeDown: function() { alert("down"); },
            //     min_move_x: 20,
            //     min_move_y: 20,
            //     preventDefaultEvents: true 
            // });

        }
    })
}
$(window).scroll(function () {
    // alert('12');
    // debugger;
    $('iframe').css({
        'pointer-events': 'none'
    });
    $('audio').css({
        'pointer-events': 'none'
    });
})
// $("iframe").on("swipe", function () {
//     alert(123);
// });
// function playVideo(ev, id) {
//     debugger;
//     ev.preventDefault();
//     const Player = document.getElementById(`iframeId`);
//     console.log('tt', Player);
//     let times = 0, playY;
//     if (times == 0) {
//         playY = Player.src += '?autoplay=1';
//         times = 1;
//     }
// }
function stopVideo(ev, videoUrl, i) {
    $("#iframeId"+i)[0].src = videoUrl+'?rel=0';
    $("#iframeId"+i).parent().addClass('overlay-video');
    $("#stop"+i).hide();
    ev.preventDefault();
    
}
function playVideo(event, i) {
    $("#iframeId"+i)[0].src += "&autoplay=1";
    $("#iframeId"+i).parent().removeClass('overlay-video');
    $("#stop"+i).show();
    event.preventDefault();
}
