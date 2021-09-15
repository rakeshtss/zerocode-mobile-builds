if (!$) {
    var $ = jQuery.noConflict();
}
var baseUrl = zc.config.apiUrl + zc.config.client;
var fadeInLoader = $("#loader").fadeIn();
var fadeOutLoader = $("#loader").fadeOut();
// var date = new Date();
// let day = date.getDay();
// var currentDate = date.getDate();
// var month = date.getMonth();
var fullYear = date.getFullYear();
var todayDate = fullYear + '-' + month + 1 + '-' + currentDate;
var categories = [];
var categoryNames = [];
var categoryName = localStorage.getItem('categoryName');
var recentVisited = [];

var d = new Date();
var dateformat = d.getDate() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + d.getFullYear();
var zc;
// console.log('todayDate', todayDate);
$(document).ready(function () {
    fadeInLoader;

    var categoryApiUrl = "assets/static-jsons/categories.json";
    if (zc.config.platform == 'mobile') {
        categoryApiUrl = 'https://epaper.andhrajyothy.com/' + categoryApiUrl;
    }

    $.ajax({
        // url: "https://jsonblob.com/api/19fcfc2e-3539-11eb-9567-6d1c924f1845",
       // url: `${baseUrl}/api/category/list/categories`,
        url: `${categoryApiUrl}`,
        type: "GET",
        dataType: "json",
        success: function (res) {
            if (res.data && res.data.listData && res.data.listData.rows) {
                categories = res.data.listData.rows;
                categories.forEach(element => {
                    element.sub_category.forEach((ele, ind) => {
                        categoryNames.push(ele);
                    })
                });
                if (categoryNames && categoryNames.length) {
                    categoryNames.forEach(ele => {
                        if (ele.sub_sub_category && ele.sub_sub_category.length) {
                            ele.sub_sub_category.forEach((obj, ind) => {
                                categoryNames.push(obj);
                            })
                        }
                    });
                }               
                var categoryData = res.data.listData.rows;
                if (categoryData[0]) {
                    const category = categoryData[0].code;
                    let date = todayDate;
                    if (zc.params && zc.params.page) {
                        date = zc.params.page.split("-").reverse().join("-");
                    }
                    const payload = { category: category, is_latest: 1, childs: childExists(categoryData[0]) };
                    $.ajax({
                        url: `${baseUrl}/api/edition/list/publish`,
                        type: "GET",
                        dataType: "json",
                        data: payload,
                        success: function (res) {
                            var editions = res.data.listData.rows;
                            var editionList = $("<ul/>", { class: "editions-data" });
                            emptyList = '<h4 class="empty-data m-0 text-center">No records found</h4>';
                            if (editions.length > 0 && editions.length != 0) {

                                $(editions).each(function (inx, s) {
                                    let reverseDate = s.date.split('-').reverse().join('-');
                                    let _editionListLi = $("<li/>", {
                                        class: "category-li", click: function () {
                                            localStorage.setItem('categoryName', s.sub_category.name);                                          
                                            $.ajax({
                                                url: `${baseUrl}/api/edition/select/publish`,
                                                type: "GET",
                                                dataType: "json",
                                                data: { uid: s.uid_actual },
                                                success: function (res) {
                                                }
                                            })
                                        }
                                    })
                                    var editionCategory = s.sub_category.name;
                                    var editionUrl = s.uid_actual + '/' + s.sub_category.code + '/' + reverseDate;
                                    if (s.sub_sub_category.code) {
                                        editionCategory = s.sub_sub_category.name;
                                        editionUrl = s.uid_actual + '/' + s.sub_sub_category.code + '/' + reverseDate + '?s=' + s.sub_category.code;
                                    }
                                    let _editionListspanImage = `<a onclick="zc.actionService.navigateByUrl('${editionUrl}')"><span><img zcImgLazy isWebp="true" src="${zc.config.E_PAPER_S3_URL}${s.edition_info.basePath}${s.edition_info.thumbnailSmall}"></span><p>${editionCategory}</p></a>`;
                                    _editionListLi.append(_editionListspanImage);
                                    editionList.append(_editionListLi);
                                });
                            } else {
                                editionList = emptyList;
                            }
                            $('.category-editon-list').html(editionList);
                        }
                    })
                }
                var categoryList = $('<ul/>', { id: 'editionsList' });
                $(categoryData).each(function (inx, o) {
                    let _li = $("<li/>", {
                        class: "category-li", click: function () {
                            fadeInLoader;
                            const category = o.code;
                            let date = todayDate;
                            if (zc.params && zc.params.page) {
                                date = zc.params.page.split("-").reverse().join("-");
                            }
                            const payload = { category: category, is_latest: 1, childs: childExists(o) };

                            $.ajax({
                                url: `${baseUrl}/api/edition/list/publish`,
                                type: "GET",
                                dataType: "json",
                                data: payload,
                                success: function (res) {
                                    var editions = res.data.listData.rows;
                                    var editionList = $("<ul/>", { class: "editions-data" });
                                    emptyList = '<h4 class="empty-data m-0 text-center">No records found</h4>';
                                    if (editions.length > 0 && editions.length != 0) {
                                        $(editions).each(function (inx, s) {
                                            let reverseDate = s.date.split('-').reverse().join('-');
                                            let _editionListLi = $("<li/>", {
                                                class: "category-li", click: function () {
                                                    $.ajax({
                                                        url: `${baseUrl}/api/edition/select/publish`,
                                                        type: "GET",
                                                        dataType: "json",
                                                        data: { uid: s.uid_actual },
                                                        success: function (res) {
                                                        }
                                                    })
                                                }
                                            })
                                            var editionCategory = s.sub_category.name;
                                            var editionUrl = s.uid_actual + '/' + s.sub_category.code + '/' + reverseDate;
                                            if (s.sub_sub_category.code) {
                                                editionCategory = s.sub_sub_category.name;
                                                editionUrl = s.uid_actual + '/' + s.sub_sub_category.code + '/' + reverseDate + '?s=' + s.sub_category.code;
                                            }
                                            let _editionListspanImage = `<a class="anc" onclick="zc.actionService.navigateByUrl('${editionUrl}')"><span><img zcImgLazy isWebp="true" src="${zc.config.E_PAPER_S3_URL}${s.edition_info.basePath}${s.edition_info.thumbnailSmall}"></span><p>${editionCategory}</p></a>`;
                                            _editionListLi.append(_editionListspanImage);
                                            editionList.append(_editionListLi);
                                        });
                                    } else {
                                        editionList = emptyList;
                                    }

                                    $('.category-editon-list').html(editionList);
                                },
                                complete: function () {
                                    fadeOutLoader;
                                }
                            })
                        }
                    });
                    let _a = $("<a/>", { id: "id_" + inx + o.name, text: o.name });
                    _li.append(_a);
                    categoryList.append(_li);
                });
                $('.edition-tab-list').html(categoryList);
                if (localStorage.getItem("recentlyVisited")) {
                    var visitedEditions = JSON.parse(localStorage.getItem("recentlyVisited"));
                    var recentlyVisitedList = $('<ul/>', { class: 'recently-visited-ul' });
                    visitedEditions = visitedEditions.filter((item) => { return item.uid_actual != zc.params.app});
                    visitedEditions.forEach((edition, ind) => {
                        let _li = $("<li/>", { class: "visited-li" });

                        var editionCategory = edition.sub_category.name;
                        var editionUrl = edition.uid_actual + '/' + edition.sub_category.code + '/' + edition.date.split("-").reverse().join("-");
                        if (edition.sub_sub_category.code) {
                            editionCategory = edition.sub_sub_category.name;
                            editionUrl = edition.uid_actual + '/' + edition.sub_sub_category.code + '/' + edition.date.split("-").reverse().join("-") + '?s=' + edition.sub_category.code;
                        }                        
                        let _a = `<a onclick="zc.actionService.navigateByUrl('/${editionUrl}')"> ${editionCategory}</a>`;
                        _li.append(_a);
                        recentlyVisitedList.append(_li);
                    });
                    $(".recent-visited-list").append(recentlyVisitedList);
                }
                $('li.category-li:first-child a').addClass('active');
                $('li.category-li a').click(function (e) {
                    $('li.category-li a.active').removeClass('active');
                    $(this).addClass('active');                   
                });
            }
        },
        complete: function () {
            fadeOutLoader;
        }

    });
    document.getElementById('modal-basic-title').innerText = zc.params.module.replace('_', ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
});

function filterEditions(arr) {
    var searchInput = document.getElementById('search').value;    
    const filteredData = arr.filter(value => {
        const searchStr = searchInput.toLowerCase();
        const nameMatches = value.name.toLowerCase().includes(searchStr);
        return nameMatches
    });  
}
function myFunction() {
    // Declare variables
    var input, filter, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    document.getElementById('searchResults').style.display = "block";
    $(".available-list").html('');
    let payload = {};
    payload.is_latest = 1;
    payload.childs = true;
    if (!input.value) return false;
    payload.globalFilter = { fieldName: 'globalFilter', key: 'globalFilter', matchType: 'any', value: input.value };
  // payload.globalSearchKey = input.value;
    $.ajax({
        url: `${baseUrl}/api/edition/list/publish`,
        type: "GET",
        dataType: "json",
        data: payload,
       // contentType: "application/json",
        success: function (res) {
            editions = res.data.listData.rows;
            var availableList = $('<ul/>', { id: 'availableList' });
            editions.forEach((edition, ind) => {
                let _li = $("<li/>", { class: "available-li" });
                var categoryCode = (edition.sub_sub_category.code) ? edition.sub_sub_category.code : edition.sub_category.code;
                var categoryName = (edition.sub_sub_category.name) ? edition.sub_sub_category.name : edition.sub_category.name;
                var url = edition.uid_actual + '/' + categoryCode + '/' + edition.date.split("-").reverse().join("-");
                let _a = `<a onclick="zc.actionService.navigateByUrl('/${url}')"> ${categoryName}</a>`;            
                _li.append(_a);
                availableList.append(_li);
            });
            $(".available-list").html(availableList);
        },
        complete: function () {
        }
    });
    return false;    
}
function childExists(category) {
    var childs = false;
    if (category.sub_category.length > 0) {
        category.sub_category.forEach(scat => {
            if (!childs && scat.sub_sub_category && scat.sub_sub_category.length > 0) {
                childs = true;
            }
        });
    }
    return childs;
}