var baseUrl = zc.config.apiUrl + zc.config.client;
var category = {};
// var newsInfo;
if (zc.params.uid) {
  if (zc.queryParams.ref) {
    setTimeout(function () { getNewsDetails(); }, 2000);
  } else {
    getNewsDetails();
  }
}

function getNewsDetails() {
  // if (zc.queryParams.categoryId && zc.queryParams.categoryName) {
  //   category.uid = zc.queryParams.categoryId;
  //   category.name = zc.queryParams.categoryName;
  // }
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      newsInformation(this);
    }
  };
  xmlhttp.open("GET", "https://rss.andhrajyothy.com/znews/article?guid=" + zc.params.uid, true);
  xmlhttp.send();
}
function newsInformation(xml) {
  $(".zc-news-description").empty();
  var x, i, xmlDoc;
  xmlDoc = xml.responseXML;
  x = xmlDoc.getElementsByTagName("item");
  var title, description, image, date, time, duration, newsDiv, titleMap = 'categoryTname', nameMap = 'categoryName', uidMap = 'categoryId';
  if (zc.queryParams.type == 'districts') {
    titleMap = 'districtTname';
    nameMap = 'districtName';
    uidMap = 'districtId';
  }
  for (i = 0; i < x.length; i++) {
    if (i == 0) {
      category.uid = x[i].getElementsByTagName(uidMap)[0].textContent;
      category.name = x[i].getElementsByTagName(nameMap)[0].textContent;
      category.title = x[i].getElementsByTagName(titleMap)[0].textContent;
      if (category.uid) {
        getRelatedNews();
      }
    }
    title = x[i].getElementsByTagName("title")[0].textContent;
    if (x[i].getElementsByTagName("content:encoded").item(0)) {
      description = x[i].getElementsByTagName("content:encoded").item(0).textContent;
    } else {
      description = x[i].getElementsByTagName("description")[0].textContent;
    }
    image = (x[i].getElementsByTagName("thumbimage")[0].textContent !== " ") ? x[i].getElementsByTagName("thumbimage")[0].textContent : "https://yt3.ggpht.com/ytc/AAUvwniduiP6bymWVZg6z3Ckxuk09muy-hzUwNH4hXDVrxI=s900-c-k-c0x00ffffff-no-rj";
    date = x[i].getElementsByTagName("pubDate")[0].textContent;
    newsDiv = "";
    time = new Date();
    duration = timeDifference(time, new Date(date));
    newsDiv += '<h3>' + title + '</h3>';
    newsDiv += '<img src="' + image + '" alt="news-img">';
    newsDiv += '<p class="zc-news-time"><span class="source"><img src="assets/themes/abn/images/abn-logo.png"></span><span> <span>' + duration + '</span></span></p>' +
      '<p class="zc-description-content">' + description + '</p>';
  }
  $(".zc-news-description").html(newsDiv);
  $('.zc-news-description').show();
  $('.zc-recent-stories').show();
  $('.loader-wrap').fadeOut("slow");
}
function getRelatedNews() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      relatedNewsInfo(this);
    }
  };
  xmlhttp.open("GET", "https://rss.andhrajyothy.com/znews/" + category.name + "?SupId=" + ((zc.queryParams.type == 'districts') ? 1 : 0) + "&SubId=" + category.uid, true);
  xmlhttp.send();
}

function relatedNewsInfo(xml) {
  $('.shortnews-list').empty();
  var x, i, xmlDoc, title, image, date, uid, time, duration;
  xmlDoc = xml.responseXML;
  x = xmlDoc.getElementsByTagName("item");
  var relatedNewsDiv = "";
  for (i = 0; i < x.length; i++) {
    title = x[i].getElementsByTagName("title")[0].textContent;
    image = (x[i].getElementsByTagName("thumbimage")[0].textContent !== " ") ? x[i].getElementsByTagName("thumbimage")[0].textContent : "https://yt3.ggpht.com/ytc/AAUvwniduiP6bymWVZg6z3Ckxuk09muy-hzUwNH4hXDVrxI=s900-c-k-c0x00ffffff-no-rj";
    date = x[i].getElementsByTagName("pubDate")[0].textContent;
    if (x[i].getElementsByTagName("Articleid").item(0)) {
      uid = x[i].getElementsByTagName("Articleid").item(0).innerHTML;
    } else if (x[i].getElementsByTagName("guid").item(0)) {
      uid = x[i].getElementsByTagName("guid").item(0).innerHTML;
    } else {
      uid = 0;
    }
    // time = moment(new Date(date)).format('YYYY-MM-DD HH:mm');
    // duration = moment(time, 'YYYY-MM-DD HH:mm').fromNow();
    time = new Date();
    duration = timeDifference(time, new Date(date));
    relatedNewsDiv += `<li id='${uid}'>`
    if (zc.queryParams.type == 'districts') {
      relatedNewsDiv += `<a onclick="zc.actionService.navigateByUrl('/epaper/news/telugunews-details/${uid}?districtId=${zc.queryParams.districtId}&categoryId=${zc.queryParams.categoryId}&type=districts')"`
    } else {
      relatedNewsDiv += `<a onclick="zc.actionService.navigateByUrl('/epaper/news/telugunews-details/${uid}?categoryId=${category.uid}')"`
    }
    relatedNewsDiv += `class="short-news"><div class="news-img">`;
    relatedNewsDiv += `<img src="${image}" alt="news-img">`;
    relatedNewsDiv += `</div><div class="news-content"><h3>${title}</h3></div></a>`;
    relatedNewsDiv += `<div class="video-time-div"><span class="source"><img src="assets/themes/abn/images/abn-logo.png" /></span><p class="news-time"> <span>${duration}</span></p></div>` +
      '</li>';
  }
  $(".shortnews-list").html(relatedNewsDiv);
  $('.shortnews-list').show();
}
function timeDifference(current, previous) {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;
  var elapsed = current - previous;
  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + ' second'+ ((Math.round(elapsed / 1000) > 1)?'s':'') +' ago';
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + ' minute'+ ((Math.round(elapsed / msPerMinute) > 1)?'s':'') +' ago';
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + ' hour'+ ((Math.round(elapsed / msPerHour) > 1)?'s':'') +' ago';
  } else if (elapsed < msPerMonth) {
    return  Math.round(elapsed / msPerDay) + ' day'+ ((Math.round(elapsed / msPerDay) > 1)?'s':'') +' ago';
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + ' month'+ ((Math.round(elapsed / msPerMonth) > 1)?'s':'') +' ago';
  } else {
    return Math.round(elapsed / msPerYear) + ' year'+ ((Math.round(elapsed / msPerYear) > 1)?'s':'') +' ago';
  }
}