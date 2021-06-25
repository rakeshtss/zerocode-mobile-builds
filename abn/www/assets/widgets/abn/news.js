var newsDetails = [];
var url = "";
var rssFeedUrl = "";
var obj = "";
var baseUrl = zc.config.apiUrl + zc.config.client;
var selectedCategory;
var categories = [];
var catType = 'sections';
if (zc.queryParams.type) {
  catType = zc.queryParams.type;
}

getAllCategories();
function getAllCategories() {
  $('.loader-wrap').fadeIn();
  var rssFeedUrl = 'https://rss.andhrajyothy.com/ZNews/category?catg=parentcategories';
  if (catType == 'districts') {
    var parentCategory = 'andhrapradesh';
    if (zc.queryParams.categoryId == 44) {
      parentCategory = 'telangana';
    }
    rssFeedUrl = 'https://rss.andhrajyothy.com/ZNews/districts?category=' + parentCategory;
  }
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
  var data, i, xmlDoc, title, name, uid, titleMap = 'categoryTname', nameMap = 'categoryName', uidMap = 'categoryId';
  xmlDoc = xml.responseXML;
  data = xmlDoc.getElementsByTagName("item");
  var select = $("#categories");
  select.children().remove();
  if (zc.params.uid) {
    selectedCategory = zc.params.uid;
  }
  if (catType == 'districts') {
    titleMap = 'districtTname';
    nameMap = 'districtName';
    uidMap = 'districtId';
  }
  for (i = 0; i < data.length; i++) {
    name = data[i].getElementsByTagName(nameMap)[0].textContent;
    uid = data[i].getElementsByTagName(uidMap)[0].textContent;
    title = data[i].getElementsByTagName(titleMap)[0].textContent;
    categories.push({ uid: uid, name: name, title: title });
    select.append($("<option>").val(uid).text(title));
    if (!selectedCategory && i == 0) {
      selectedCategory = uid;
    }
  }
  $('#categories option[value="' + selectedCategory + '"]').attr("selected", "selected");

  getRssFeeds();
  $("#categories").change(function () {
    selectedCategory = $(this).find(':selected').val();
    var categoryDetails = categories.filter((item) => { return item.uid == selectedCategory; });
    if (categoryDetails) {
      $('#categoryTitle').html(categoryDetails[0].title);
    }
    $('.loader-wrap').fadeIn();
    getRssFeeds();
    $('html, body').animate({
      scrollTop: $(".zc-news-block").offset().top - 0
    }, 1000);
  });
}
function getRssFeeds() {
  var rssFeedUrl = "https://rss.andhrajyothy.com/znews/";
  console.log('categories', categories);
  var categoryDetails = categories.filter((item) => { return item.uid == selectedCategory; });
  if (categoryDetails[0]) {
    $('#categoryTitle').html(categoryDetails[0].title);
    if (catType == 'districts') {
      rssFeedUrl += categoryDetails[0].name + '?SupId=1&SubId=' + categoryDetails[0].uid;
    } else {
      rssFeedUrl += categoryDetails[0].name + '?SupId=0&SubId=' + categoryDetails[0].uid;
    }
  }
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      feedData(this);
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
    feedTitle = x[i].getElementsByTagName("title")[0].textContent;
    feedShortDescription = x[i].getElementsByTagName("description")[0].textContent;
    feedImage = (x[i].getElementsByTagName("thumbimage")[0].textContent !== " ") ? x[i].getElementsByTagName("thumbimage")[0].textContent : "https://yt3.ggpht.com/ytc/AAUvwniduiP6bymWVZg6z3Ckxuk09muy-hzUwNH4hXDVrxI=s900-c-k-c0x00ffffff-no-rj";
    feedPubDate = x[i].getElementsByTagName("pubDate")[0].textContent;
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
    // var time = moment(new Date(feedPubDate)).format('YYYY-MM-DD HH:mm');
    // var timeDuration = moment(time, 'YYYY-MM-DD HH:mm').fromNow();
    var current = new Date();
    var timeDuration = timeDifference(current, new Date(feedPubDate));
    if (i == 0) {
      news_li_data = `<li id="${feedUid}" class="chitrajoythi-newscard">`;
    } else {
      news_li_data += `<li id="${feedUid}">`;
    }
    news_li_data += '<a href="javascript:;" class="short-news">' +
      '<div class="news-img">';
    news_li_data += '<img src="' + feedImage + '" alt="news-img">';
    news_li_data += '</div>' +
      '<div class="news-content">' +
      '<h3>' + feedTitle + '</h3></div></a>';
    // if (feedShortDescription) {
    //   news_li_data += '<p class="news-description">' + feedShortDescription + '</p>' + '</div>' + '</a>';
    // }
    news_li_data += '<div class="video-time-div"><span class="source"><img src="assets/themes/abn/images/abn-logo.png" /></span><p class="news-time"> <span>' + timeDuration + '</span></p></div>' +
      '</li>'
  }
  $(".shortnews-list").html(news_li_data);
  $('.zc-news-description').hide();
  $('.zc-recent-stories').hide();
  $('.loader-wrap').fadeOut("slow");
  var newsTitle;
  $('.shortnews-list li').click(function (e) {
    var newsId = $(this).attr('id');
    if (catType == 'districts') {
      zc.actionService.navigateByUrl('/epaper/news/telugunews-details/' + newsId + '?districtId=' + selectedCategory + '&categoryId=' + zc.queryParams.categoryId + '&type=' + catType);
    } else {
      zc.actionService.navigateByUrl('/epaper/news/telugunews-details/' + newsId + '?categoryId=' + selectedCategory + '&type=' + catType);
    }
    return false;
  });
}

function neswDetailsClose() {
  $('.zc-news-description').hide();
  $('.zc-news-description').empty();
  $('.zc-recent-stories').hide();
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
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + ' minutes ago';
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + ' hours ago';
  } else if (elapsed < msPerMonth) {
    return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
  } else if (elapsed < msPerYear) {
    return 'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago';
  } else {
    return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
  }
}