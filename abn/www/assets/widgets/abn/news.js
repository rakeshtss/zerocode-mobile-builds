var newsDetails = [];
var url = "";
var rssFeedUrl = "";
var obj = "";
$.ajax({
  url: `${zc.config.apiUrl}abn/api/speednews_category/list/`,
  type: "GET",
  dataType: "json",
  success: function (res) {
    // console.log("data", data)
    var select = $("#example");
    select.children().remove();
    if (res.data && res.data.listData && res.data.listData.rows) {
      var oprionsList = res.data.listData.rows;
      // console.log(oprionsList)
      $(oprionsList).each(function (index, item) {
        // console.log('item -->', item);
        if (item.rss_feed_url) {
          if (!rssFeedUrl) {
            rssFeedUrl = item.rss_feed_url;
            getRssFeeds();
          }
          select.append($("<option>").val(item.rss_feed_url).text(item.name));
        }
      });
      //var news_li_data = "";
      // if(oprionsList[0].rss_feed_url) {
      // url = oprionsList[0].rss_feed_url;
     // getRssFeeds();
      // }

      // url = 'https://rss.andhrajyothy.com/RssFeed.aspx?SupId=24&SubId=0';
      //  url = 'https://rss.andhrajyothy.com/news/AndhraPradesh?SupId=0&SubId=43';


    }
  },
  error: function (err) {
    $(".shortnews-list").html('<h3>No Records Found</h3>');
  }
});

$("#example").change(function () {
  //var news_li_data = "";
  rssFeedUrl = $(this).find(':selected').val();
  $('.loader-wrap').fadeIn();
  getRssFeeds();
  $('html, body').animate({
    scrollTop: $(".zc-news-block").offset().top - 0
  }, 1000);
});
function getRssFeeds() {
  // var RSS_URL = 'https://rss.andhrajyothy.com/news/AndhraPradesh?SupId=0&SubId=43'; 
  // var RSS_URL = url;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // if(url !== 'https://rss.andhrajyothy.com/news/AndhraPradesh?SupId=0&SubId=43') {
      feedData(this);
      // }     
      console.log('this -->', this);
    }
  };
  xmlhttp.open("GET", rssFeedUrl, true);
  xmlhttp.send();
}

var feedTitle = "";
var feedShortDescription = "";
var feedDescription = "";
var feedImage = "https://yt3.ggpht.com/ytc/AAUvwniduiP6bymWVZg6z3Ckxuk09muy-hzUwNH4hXDVrxI=s900-c-k-c0x00ffffff-no-rj";
var feedPubDate = "";
var feedUid = "";

function feedData(xml) {
  var x, i, xmlDoc, txt;
  xmlDoc = xml.responseXML;
  txt = "";
  x = xmlDoc.getElementsByTagName("item");

  var news_li_data = "";




  for (i = 0; i < x.length; i++) {
    // feedImage = "https://yt3.ggpht.com/ytc/AAUvwniduiP6bymWVZg6z3Ckxuk09muy-hzUwNH4hXDVrxI=s900-c-k-c0x00ffffff-no-rj";
    // console.log('x -->', x[i]);
    //   console.log('x -->', x[i].childNodes);
    feedTitle = x[i].getElementsByTagName("title")[0].textContent;
    feedShortDescription = x[i].getElementsByTagName("description")[0].textContent;
    feedImage = (x[i].getElementsByTagName("thumbimage")[0].textContent !== " ") ? x[i].getElementsByTagName("thumbimage")[0].textContent : "https://yt3.ggpht.com/ytc/AAUvwniduiP6bymWVZg6z3Ckxuk09muy-hzUwNH4hXDVrxI=s900-c-k-c0x00ffffff-no-rj";
    feedPubDate = x[i].getElementsByTagName("pubDate")[0].textContent;

    //console.log('description -->', x[i].getElementsByTagName("content:encoded").item(0).innerHTML);
    // console.log('description -->', x[i].getElementsByTagName("content"));

    if (x[i].getElementsByTagName("Articleid").item(0)) {
      feedUid = x[i].getElementsByTagName("Articleid").item(0).innerHTML;
    } else if (x[i].getElementsByTagName("guid").item(0)) {
      feedUid = x[i].getElementsByTagName("guid").item(0).innerHTML;
    } else {
      feedUid = 0;
    }

    if (x[i].getElementsByTagName("content:encoded").item(0)) {

    } else {
      feedShortDescription = '';
    }

    var time = moment(new Date(feedPubDate)).format('YYYY-MM-DD HH:mm');
    var timeDuration = moment(time, 'YYYY-MM-DD HH:mm').fromNow();
    news_li_data += '<li id=' + feedUid + '>' + '<a href="javascript:;" class="short-news">' +
      '<div class="news-img">';
    news_li_data += '<img src="' + feedImage + '" alt="news-img">';
    news_li_data += '</div>' +
      '<div class="news-content">' +
      '<h3>' + feedTitle + '</h3>';
    if (feedShortDescription) {
      news_li_data += '<p class="news-description">' + feedShortDescription + '</p>' + '</div>' + '</a>';
    }

    news_li_data += '<div class="video-time-div"><span class="source"><img src="assets/themes/abn/images/abn-logo.png" /></span><p class="news-time">సమయం: <span>' + timeDuration + '</span></p></div></div>' +
      '</li>'
    //  console.log('title -->', x[i].childNodes[1].textContent);
    //  console.log('short description -->', x[i].childNodes[5].textContent);
    //  console.log('description -->', x[i].childNodes[7].textContent);
    //  console.log('image -->', x[i].childNodes[9].textContent);
    //  console.log('guid -->', x[i].childNodes[11].textContent);
    //  console.log('date -->', x[i].childNodes[13].textContent);
  }
  $(".shortnews-list").html(news_li_data);
  $('.zc-news-description').hide();
  $('.zc-recent-stories').hide();
  $('.loader-wrap').fadeOut("slow");
  var newsTitle;
  $('.shortnews-list li').click(function (e) {
    newsDetails = [];

    $('.shortnews-list li').show();
    $(this).hide();
    //console.log("newsdetails", newsDetails);
    newsTitle = $(this).attr('id');
    // console.log(newsTitle)
    //console.log(x);
    for (i = 0; i < x.length; i++) {
      // var guid = x[i].childNodes[11].textContent;
      if (x[i].getElementsByTagName("Articleid").item(0)) {
        feedUid = x[i].getElementsByTagName("Articleid").item(0).innerHTML;
      } else if (x[i].getElementsByTagName("guid").item(0)) {
        feedUid = x[i].getElementsByTagName("guid").item(0).innerHTML;
      } else {
        feedUid = 0;
      }
      if (newsTitle == feedUid) {
        // console.log('------', newsTitle, '---', feedUid);
        console.log('feedTitle', feedTitle);
        obj = x[i];
        newsDetails.push(obj);
        // console.log(newsDetails);
        var desc_data = "";
        for (i = 0; i < newsDetails.length; i++) {
          $(".zc-news-description").empty();
          feedTitle = newsDetails[i].getElementsByTagName("title")[0].textContent;
          // console.log('feedTitle', feedTitle);
          if (newsDetails[i].getElementsByTagName("content:encoded").item(0)) {
            feedDescription = newsDetails[i].getElementsByTagName("content:encoded").item(0).textContent;
          } else {
            feedDescription = newsDetails[i].getElementsByTagName("description")[0].textContent;
          }
          // feedDescription = newsDetails[i].getElementsByTagName("description")[0].textContent;
          // console.log('feedDescription ->', feedDescription);
          feedImage = (newsDetails[i].getElementsByTagName("thumbimage")[0].textContent !== " ") ? newsDetails[i].getElementsByTagName("thumbimage")[0].textContent : "https://yt3.ggpht.com/ytc/AAUvwniduiP6bymWVZg6z3Ckxuk09muy-hzUwNH4hXDVrxI=s900-c-k-c0x00ffffff-no-rj";
          feedPubDate = newsDetails[i].getElementsByTagName("pubDate")[0].textContent;

          var desc_data = "";
          var time1 = moment(new Date(feedPubDate)).format('YYYY-MM-DD HH:mm');
          var timeDuration1 = moment(time1, 'YYYY-MM-DD HH:mm').fromNow();
          desc_data += '<h3>' + feedTitle + '</h3>';
          desc_data += '<img src="' + feedImage + '" alt="news-img">';
          desc_data += '<p class="zc-news-time"><span class="source"><img src="../assets/themes/abn/images/abn-logo.png"></span><span>సమయం: <span>' + timeDuration1 + '</span></span></p>' +
            '<p class="zc-description-content">' + feedDescription + '</p>'

        }
        $(".zc-news-description").html(desc_data);
        // $('html, body').animate({ scrollTop: 0 }, 'slow');
        $(window).scrollTop({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
    $('.zc-news-description').show();
    $('.zc-recent-stories').show();
  });
}

