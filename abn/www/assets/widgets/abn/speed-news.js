// if (!$) {
//     var $ = jQuery;
// }

// youtube state change

function stopAllVideos() {
    $('.youTube').each(function () {
        this.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
    });
}
function speedNewsModalClose() {
    $('#newsModal .modal-header h5').empty();
    $('#newsModal .modal-body').empty();
    $('#newsModal .modal-body').empty();
}
var menuClass = "";
var oprionsList = [];
var selectedCategory;
var no_data = "";
var header = { 'Content-Type': 'application/json' };
var newsInfo = {};
var baseUrl = zc.config.apiUrl + zc.config.client;
var totalRecords = 0;
var rows = 5;
var page = 1;
var swiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'vertical',
    mousewheel: true,
    // speed: 700,
    autoHeight: true,
    loop: true,
    on: {
        slideChange: function () {
             $('html, body').animate({
            scrollTop: $(".zc-speed-news-block").offset().top - 0}, 1000);
            console.log('swiper slideChange');
            stopAllVideos();
        },
        transitionEnd: function () {
            var currentIndex = swiper.realIndex;
            var totalSlides = swiper.slides.length;
            console.log('*** currentIndex', currentIndex);
            console.log('*** totalSlides', totalSlides);
            if(currentIndex !== 0 && currentIndex % 5 == 0){
                showInterstitialAds();
            }
            if ((totalRecords >= totalSlides) && currentIndex > 0 && currentIndex == totalSlides - 2) {
                page = (totalSlides / rows) + 1;
                getSpeednewsListByCategory();
            }
        }
    },
});
var modalLoader = `<div class="spin-loader"><span class=""></span></div>`;
$(document).ready(function () {
    $.ajax({
        url: `${baseUrl}/api/speednews_category/list/`,
        type: "GET",
        dataType: "json",
        //  headers: header,
        data: {},
        success: function (res) {
            var select = $("#speedNews");
            select.children().remove();
            select.append($("<option>").val(0).text('All'));
            selectedCategory = 0;
            if (res.data && res.data.listData && res.data.listData.rows) {
                oprionsList = res.data.listData.rows;
                $(oprionsList).each(function (index, item) {
                    select.append($("<option>").val(item.uid).text(item.name));
                    if (index === 0) {
                        if (zc.queryParams && zc.queryParams.category) {
                            selectedCategory = zc.queryParams.category;
                        } else {
                            // selectedCategory = item.uid;
                        }
                    }
                });

            }
            // console.log('zc.queryParams.category -->', zc.queryParams.category);
            if (zc.queryParams.category) {
                $('#speedNews option[value="' + zc.queryParams.category + '"]').attr("selected", "selected");
            }

            // $('select[name^="speedNews"] option[value="'+zc.queryParams.category+'"]').attr("selected","selected");

            // $("#speedNews").val(zc.queryParams.category);
            page = 1;
            getSpeednewsListByCategory(selectedCategory);
        }
    })
    $("#speedNews").change(function () {
        selectedCategory = $(this).find(':selected').val();
        $('.loader-wrap').fadeIn();
        $('.swiper-wrapper').empty('');
        page = 1;
        swiper.realIndex = 0;
        getSpeednewsListByCategory();
        $('html, body').animate({
            scrollTop: $(".zc-speed-news-block").offset().top - 0
        }, 1000);
        // $('.swiper-wrapper').css({
        //     transform: 'translate3d(0px, 0px, 0px)'
        // });
    });

    $('.loader-wrap').fadeOut();
})

function getSpeednewsListByCategory() {
    const payload = {};
    if (selectedCategory != 0 || selectedCategory != '0') {
        payload.speednews_category = { uid: selectedCategory }
    }
    payload.page = page;
    payload.rows = rows;
    $.ajax({
        url: `${baseUrl}/api/speednews/list/speednews-list-by-category`,
        type: "POST",
        dataType: "json",
        headers: header,
        data: JSON.stringify(payload),
        success: function (res) {
            // res = {};
            if (res.data && res.data.listData && res.data.listData.rows && res.data.listData.rows.length) {
                // debugger;
                var newsInfo = {};
                list = res.data.listData.rows;
                totalRecords = res.data.listData.records;

                if (zc.params && zc.params.uid) {
                    newsInfo = list.find((item) => { return item.uid == zc.params.uid; });
                    list = list.filter((item) => { return item.uid != zc.params.uid });
                    // list.splice(0, 0, newsInfo);
                    if (newsInfo && newsInfo.uid) {
                        list.unshift(newsInfo);
                    }
                }
                var slide_data;
                $(list).each(function (i, o) {
                    // debugger;
                    slide_data = '';
                    slide_data += `<div class="swiper-slide" id='${o.uid}'>
                    <div class="swiper-lazy-preloader"></div>
                    <div class="swiper-lazy-loading"></div>
                    <h4>${o.title}</h4>`;
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

                        setTimeout(function () {
                            $(`.stop-video${i}`).hide();
                            $(`.play-video${i}`).click(function () {
                                $(`.youtube-video${i}`)[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
                                $(`.pause-video${i}`).show();
                                $(`.play-video${i}`).hide();
                            });

                            $(`.stop-video${i}`).click(function () {
                                $(`.youtube-video${i}`)[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
                                $(`.stop-video${i}`).hide();
                                $(`.play-video${i}`).show();
                            });

                            $(`.pause-video${i}`).click(function () {
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
                    if (o.description) {
                        if (o.news_id) {
                            slide_data += `<a href="javascript:;" class="read-full-news" onclick='showNewsModal(${JSON.stringify(o)})'>Read full news</a>`;
                        }
                        slide_data += `<p>${o.description}</p>`;
                    }
                    slide_data += `</div>`;
                    $('.swiper-wrapper').append(slide_data);
                })
                if (window.innerWidth <= 767) {

                    // swiper.updateProgress();
                    // swiper.updateSize();
                    // swiper.updateSlides();	
                    swiper.update();
                    if (page == 1) {
                        $('.swiper-wrapper').css({
                            transform: 'translate3d(0px, 0px, 0px)'
                        });
                    }

                    // setTimeout(() => {                      
                    //    swiper.update();
                    //    swiper.updateProgress();
                    //    swiper.updateSize();
                    //    swiper.updateSlides();	
                    // }, 1000);

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
    // $('iframe').css({
    //     'pointer-events': 'none'
    // });
    // $('audio').css({
    //     'pointer-events': 'none'
    // });
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
    $("#iframeId" + i)[0].src = videoUrl + '?rel=0';
    $("#iframeId" + i).parent().addClass('overlay-video');
    $("#stop" + i).hide();
    ev.preventDefault();

}
function playVideo(event, i) {
    $("#iframeId" + i)[0].src += "&autoplay=1";
    $("#iframeId" + i).parent().removeClass('overlay-video');
    $("#stop" + i).show();
    event.preventDefault();
}
// function selectedNews(uid) {
//     // alert(123);
//     $('.swiper-slide').hide();
//     $('.swiper-slide.swiper-slide-active').show();
//     swiper.detachEvents();
//     // swiper.destroy();

// }
function showNewsModal(o) {
    stopAllVideos();
    newsInfo = o;
    console.log('newsInfo -->', newsInfo);
    if (newsInfo.news_id) {
        // $('.loader-wrap').fadeIn();
        // debugger;
        $('#newsModal .modal-header h5').empty();
        $('#newsModal .modal-body').empty();
        $('#newsModal').modal('show');
        $('#newsModal .modal-body').append(modalLoader);
        getRssFeeds();
        return false;
    } else {
        // return false;
    }
}

function getRssFeeds(rssFeedUrl) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            feedData(this);
        }
    };
    xmlhttp.open("GET", "https://rss.andhrajyothy.com/znews/article?guid=" + newsInfo.news_id, true);
    xmlhttp.send();
}

function feedData(xml) {
    var x, i, xmlDoc, txt;
    xmlDoc = xml.responseXML;
    txt = "";
    x = xmlDoc.getElementsByTagName("item");
    var news_li_data = "";
    var feedUid = 0, feedTitle = "", feedDescription = "", time = "", timeDuration = "";
    for (i = 0; i < x.length; i++) {
        if (x[i].getElementsByTagName("Articleid").item(0)) {
            feedUid = x[i].getElementsByTagName("Articleid").item(0).innerHTML;
        } else if (x[i].getElementsByTagName("guid").item(0)) {
            feedUid = x[i].getElementsByTagName("guid").item(0).innerHTML;
        } else {
            feedUid = 0;
        }
        if (newsInfo.news_id == feedUid) {
            console.log('selected news id -->', feedUid);
            feedTitle = x[i].getElementsByTagName("title")[0].textContent;
            if (x[i].getElementsByTagName("content:encoded").item(0)) {
                feedDescription = x[i].getElementsByTagName("content:encoded").item(0).textContent;
            } else {
                feedDescription = x[i].getElementsByTagName("description")[0].textContent;
            }
            feedImage = (x[i].getElementsByTagName("thumbimage")[0].textContent !== " ") ? x[i].getElementsByTagName("thumbimage")[0].textContent : "https://yt3.ggpht.com/ytc/AAUvwniduiP6bymWVZg6z3Ckxuk09muy-hzUwNH4hXDVrxI=s900-c-k-c0x00ffffff-no-rj";
            // feedPubDate = x[i].getElementsByTagName("pubDate")[0].textContent;
            // time = moment(new Date(feedPubDate)).format('YYYY-MM-DD HH:mm');
            // timeDuration = moment(time, 'YYYY-MM-DD HH:mm').fromNow();


            // console.log('newsObj', o);
            let innerDiv = "";

            $('#newsModal .modal-header h5').text(feedTitle);
            innerDiv += `<div class="swiper-slider" id='${newsInfo.uid}'>`;
            if (feedImage) {
                innerDiv += `<div class="speed-image">
                            <img src="${feedImage}">
                            </div>`;
            }
            if (feedDescription) {
                innerDiv += `<p>${feedDescription}</p>`;
            }
            innerDiv += `</div>`;
            $('#newsModal .modal-body').append(innerDiv);
            break;
        }
    }
    $('.spin-loader').fadeOut();
}

