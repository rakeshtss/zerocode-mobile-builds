var zc;
if (window.jQuery) {
    var $ = jQuery;
    var apiUrl = zc.config.apiUrl;
    if (!$) {
        var $ = jQuery;
    }
    var categories = [];
    var zcCategories = [];
    var allCategories = [];
    $(document).ready(function () {
        getAllCategories();
        getNews();
        getDistricts({ name: 'AndhraPradesh', uid: 43, default: 'ఆంధ్రప్రదేశ్' }, 'apDistricts');
        getDistricts({ name: 'Telangana', uid: 44, default: 'తెలంగాణ' }, 'tsDistricts');
    })
}
function getAllCategories() {
    $('.loader-wrap').fadeIn();
    var rssFeedUrl = 'https://rss.andhrajyothy.com/ZNews/category?catg=parentcategories';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            categoriesData(this);
        }
    };
    xmlhttp.open("GET", rssFeedUrl, true);
    xmlhttp.send();
}
function categoriesData(xml) {
    var data, i, xmlDoc, title, name, uid;
    xmlDoc = xml.responseXML;
    data = xmlDoc.getElementsByTagName("item");
    var select = $("#allCategories");
    select.children().remove();
    select.append($("<option>").val(0).text('Select'));
    for (i = 0; i < data.length; i++) {
        name = data[i].getElementsByTagName("categoryName")[0].textContent;
        uid = data[i].getElementsByTagName("categoryId")[0].textContent;
        title = data[i].getElementsByTagName("categoryTname")[0].textContent;
        select.append($("<option>").val(uid).text(title));
    }
    $("#allCategories").change(function () {
        var selectedCategory = $(this).find(':selected').val();
        if (selectedCategory) {
            zc.actionService.navigateByUrl('/epaper/news/telugunews/' + selectedCategory);
        }
    });
}
function getNews() {
    $('.loader-wrap').fadeIn();
    var rssFeedUrl = 'https://rss.andhrajyothy.com/ZNews/Home%20Page%20News?SupId=0&SubId=0';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            newsData(this);
        }
    };
    xmlhttp.open("GET", rssFeedUrl, true);
    xmlhttp.send();
}
function newsData(xml) {
    var data, i, xmlDoc, category, news, articles;
    xmlDoc = xml.responseXML;
    data = xmlDoc.getElementsByTagName("item");
    for (i = 0; i < data.length; i++) {
        category = {};
        category.name = data[i].getElementsByTagName("categoryName")[0].textContent;
        category.uid = data[i].getElementsByTagName("categoryId")[0].textContent;
        category.title = data[i].getElementsByTagName("categoryTname")[0].textContent;
        category.news = [];
        articles = data[i].getElementsByTagName("article");
        for (a = 0; a < articles.length; a++) {
            news = {};
            news.title = articles[a].getElementsByTagName("title")[0].textContent;
            news.description = articles[a].getElementsByTagName("description")[0].textContent;
            news.image = articles[a].getElementsByTagName("thumbimage")[0].textContent;
            news.image = news.image.trim();
            if (!news.image) {
                news.image = "https://yt3.ggpht.com/ytc/AAUvwniduiP6bymWVZg6z3Ckxuk09muy-hzUwNH4hXDVrxI=s900-c-k-c0x00ffffff-no-rj";
            }
            news.uid = articles[a].getElementsByTagName("guid")[0].textContent;
            news.date = articles[a].getElementsByTagName("pubDate")[0].textContent;
            category.news.push(news);
        }
        if (category.uid == 169) {
            sliderNews(category);
        } else {
            categories.push(category);
        }
    }
    sectionNews();
}
function sectionNews() {
    var secDiv = '';
    var newsDiv = '';
    $(categories).each(function (ci, cat) {
        secDiv = '';
        secDiv += `<div class="news-section">
            <div class="news-section-content">
                <h2>${cat.title}</h2>`
        // if (cat.uid == 43 || cat.uid == 44) {
        //      secDiv += `<p onclick="zc.actionService.navigateByUrl('/epaper/news/telugunews/${cat.uid}?type=districts')"><a>Districts</a>`
        // }
        secDiv += `<p><a onclick="zc.actionService.navigateByUrl('/epaper/news/telugunews/${cat.uid}')"> View all</a></p>
            </div>`;
        // if (cat.uid == 43 || cat.uid == 44) {
        //     var districtsId = cat.name + "districts";
        //     secDiv += `<div class="district-select"><div class="dist-name">జిల్లాలు</div><div class="dist-select"><select id="${districtsId}" name="${districtsId}"></select></div>
        //             </div>`
        //     getDistricts(cat, districtsId);
        // }
        secDiv += `<ul class="shortnews-list">`;
        $(cat.news).each(function (ni, news) {
            newsDiv = `<li>`;
            if (cat.uid == 47 && ni == 0) {
                newsDiv = `<li class="chitrajoythi-newscard">`;
            }
            newsDiv += `<a onclick="zc.actionService.navigateByUrl('/epaper/news/telugunews-details/${news.uid}')" class="short-news">
                <div class="news-img">
                    <img src="${news.image}">
                </div>
                <div class="news-content">
                    <h3>${news.title}</h3>
                </div></a>
                <div class="video-time-div"><span class="source"><img src="assets/themes/abn/images/abn-logo.png"></span><p class="news-time"><span>5 minutes ago</span></p></div>
            </li>`;
            secDiv += newsDiv;
        });
        secDiv += `</ul></div>`;
        $('.news-home-page').append(secDiv);
    });
}
function getDistricts(cat, divId) {
    // $('.loader-wrap').fadeIn();
    var rssFeedUrl = 'https://rss.andhrajyothy.com/ZNews/districts?category=' + cat.name;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            districtsData(this, cat, divId);
        }
    };
    xmlhttp.open("GET", rssFeedUrl, true);
    xmlhttp.send();
}
function districtsData(xml, cat, divId) {
    var data, i, xmlDoc, title, name, uid;
    xmlDoc = xml.responseXML;
    data = xmlDoc.getElementsByTagName("item");
    var select = $("#" + divId);
    select.children().remove();
    select.append($("<option>").val(0).text(cat.default));
    for (i = 0; i < data.length; i++) {
        name = data[i].getElementsByTagName("districtName")[0].textContent;
        uid = data[i].getElementsByTagName("districtId")[0].textContent;
        title = data[i].getElementsByTagName("districtTname")[0].textContent;
        select.append($("<option>").val(uid).text(title));
    }
    $("#" + divId).change(function () {
        var selectedItem = $(this).find(':selected').val();
        if (selectedItem) {
            zc.actionService.navigateByUrl('/epaper/news/telugunews/' + selectedItem + '?categoryId=' + cat.uid + '&type=districts');
        }
    });
}
function sliderNews(cat) {
    $('.epaper-slider').empty('');
    var newsDiv = '';
    $(cat.news).each(function (i, news) {
        newsDiv = '';
        newsDiv += `<div class="slider-div">
        <a onclick="zc.actionService.navigateByUrl('/epaper/news/telugunews-details/${news.uid}')">
        <div class="news-imgs">
        <img src="${news.image}">
        </div>
        <div class="news-headline">
        <h2>${news.title}</h2>`;
        //var time = moment(new Date(news.date)).format('YYYY-MM-DD HH:mm');
        //var timeDuration = moment(time, 'YYYY-MM-DD HH:mm').fromNow();
        var current = new Date();
        var timeDuration = timeDifference(current, new Date(news.date));
        newsDiv += `<p>${timeDuration}</p>
        </div>
        </a>
        </div>`;
        $('.epaper-slider').append(newsDiv);
    });
    $('.epaper-slider').slick({
        arrows: false,
        dots: true,
        infinite: true,
        autoplay: false,
        speed: 900,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '40px',
        responsive: [{
            breakpoint: 425,
            settings: {
                centerPadding: '30px',
            }
        },
        {
            breakpoint: 375,
            settings: {
                centerPadding: '20px',
            }
        }
        ]
    });
    $('.epaper-slider')[0].slick.refresh();
    $('.loader-wrap').fadeOut();
}
function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago';
    }

    else {
        return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
    }
}