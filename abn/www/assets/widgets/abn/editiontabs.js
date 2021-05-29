if (!$) {
    var $ = jQuery.noConflict();
}
var baseUrl = zc.config.apiUrl;
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
// console.log('todayDate', todayDate);
$(document).ready(function () {
    fadeInLoader;

    $.ajax({
        // url: "https://jsonblob.com/api/19fcfc2e-3539-11eb-9567-6d1c924f1845",
        url: `${baseUrl}/abn/api/category/list/categories`,
        type: "GET",
        dataType: "json",
        success: function (res) {
            console.log('menu', res);
            console.log('categories', categories);
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
                console.log('categoryNames', categoryNames);
                // if (categoryNames && categoryNames.length) {
                //     var availableList = $('<ul/>', { id: 'availableList' });
                //     categoryNames.forEach((ele, ind) => {
                //         var d = new Date();
                //         var dateformat = d.getDate() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + d.getFullYear();
                //         let _li = $("<li/>", { class: "available-li" });
                //         // 
                //         let _a = $("<a/>", {
                //             id: "id_" + ind + ele.name, text: ele.name, click: function (e) {
                //                 e.preventDefault();
                //                 const payload = { category: ele.code, is_latest: 1 };
                //                 $.ajax({
                //                     url: `${baseUrl}/abn/api/edition/list/publish`,
                //                     type: "POST",
                //                     dataType: "json",
                //                     data: payload,

                //                     success: function (res) {
                //                         console.log('menu', res);
                //                         var editions = res.data.listData.rows;
                //                         console.log('editions', editions);
                //                         var editionList = $("<ul/>", { class: "editions-data" });
                //                         emptyList = '<h4 class="empty-data m-0 text-center">No records found</h4>';
                //                         if (editions.length > 0 && editions.length != 0) {

                //                             $(editions).each(function (inx, s) {
                //                                 let reverseDate = s.date.split('-').reverse().join('-');
                //                                 console.log('sdate', s.date.split('-').reverse().join('-'));
                //                                 let _editionListLi = $("<li/>", {
                //                                     class: "category-li", click: function () {
                //                                         localStorage.setItem('categoryName', s.sub_category.name);
                //                                         if (localStorage.getItem('recentVisited')) {
                //                                             recentVisited = JSON.parse(localStorage.getItem('recentVisited'));
                //                                             recentVisited.push({ "paperName": s.sub_category.name, "url_id": s.uid_actual, "url": s.uid });
                //                                             localStorage.setItem("recentVisited", JSON.stringify(recentVisited));
                //                                         }
                //                                         else {
                //                                             recentVisited.push({ "paperName": s.sub_category.name, "url_id": s.uid_actual, "url": s.uid }); localStorage.setItem("recentVisited", JSON.stringify(recentVisited));
                //                                         }
                //                                         $.ajax({
                //                                             url: `${baseUrl}/abn/api/edition/select/publish`,
                //                                             type: "POST",
                //                                             dataType: "json",
                //                                             data: JSON.stringify({ uid: s.uid_actual }),
                //                                             success: function (res) {
                //                                                 console.log('select', res);
                //                                             }
                //                                         })
                //                                     }
                //                                 })
                //                                 // routerLink ="/{{ row.uid_actual }}/{{row.sub_category.code}}/{{ row.date | date:'dd-MM-yyyy'}}"
                //                                 let _editionListspanImage = `<a href="${s.uid_actual}/${s.sub_category.code}/${reverseDate}"><span><img src="${zc.config.E_PAPER_S3_URL}${s.edition_info.basePath}${s.edition_info.thumbnailBigWebp}"></span><p>${s.sub_category.name}</p></a>`;
                //                                 _editionListLi.append(_editionListspanImage);
                //                                 editionList.append(_editionListLi);
                //                             });
                //                         } else {
                //                             editionList = emptyList;
                //                         }
                //                         // editionList += '</ul>'
                //                         $('.category-editon-list').html(editionList);
                //                     }
                //                 })
                //                 // 
                //                 localStorage.setItem('categoryName', ele.name);
                //                 categoryName = localStorage.getItem('categoryName');
                //                 document.getElementById('editionSelector').innerText = categoryName;
                //                 // window.location.replace("/"+ele.order+"/"+ele.uid+"/"+dateformat);
                //                 if (localStorage.getItem('recentVisited')) {
                //                     recentVisited = JSON.parse(localStorage.getItem('recentVisited'));
                //                     recentVisited.push({ "paperName": categoryName, "url_id": ele.order, "url": ele.uid });
                //                     localStorage.setItem("recentVisited", JSON.stringify(recentVisited));
                //                 }
                //                 else {
                //                     recentVisited.push({ "paperName": categoryName, "url_id": ele.order, "url": ele.uid });
                //                     localStorage.setItem("recentVisited", JSON.stringify(recentVisited));
                //                 }

                //             }
                //         });
                //         _li.append(_a);
                //         availableList.append(_li);
                //     })
                //     $(".available-list").html(availableList);
                // }
                var categoryData = res.data.listData.rows;
                console.log('categoryData -->', categoryData);
                if (categoryData[0]) {
                    console.log('oindex', categoryData[0].code);
                    const category = categoryData[0].code;
                    let date = todayDate;
                    if (zc.params && zc.params.page) {
                        date = zc.params.page.split("-").reverse().join("-");
                    }
                    const payload = { category: category, is_latest: 1, childs: childExists(categoryData[0]) };
                    // let payload = { category: "main_edition", date: "2021-01-20" };
                    $.ajax({
                        url: `${baseUrl}/abn/api/edition/list/publish`,
                        type: "POST",
                        dataType: "json",
                        data: payload,
                        success: function (res) {
                            console.log('menu', res);
                            var editions = res.data.listData.rows;
                            console.log('editions', editions);
                            var editionList = $("<ul/>", { class: "editions-data" });
                            emptyList = '<h4 class="empty-data m-0 text-center">No records found</h4>';
                            if (editions.length > 0 && editions.length != 0) {

                                $(editions).each(function (inx, s) {
                                    let reverseDate = s.date.split('-').reverse().join('-');
                                    console.log('sdate', s.date.split('-').reverse().join('-'));
                                    let _editionListLi = $("<li/>", {
                                        class: "category-li", click: function () {
                                            localStorage.setItem('categoryName', s.sub_category.name);
                                            // if (localStorage.getItem('recentVisited')) {
                                            //     recentVisited = JSON.parse(localStorage.getItem('recentVisited'));
                                            //     recentVisited.push({ "paperName": s.sub_category.name, "url_id": s.uid_actual, "url": s.uid });
                                            //     localStorage.setItem("recentVisited", JSON.stringify(recentVisited));
                                            // }
                                            // else {
                                            //     recentVisited.push({ "paperName": s.sub_category.name, "url_id": s.uid_actual, "url": s.uid }); localStorage.setItem("recentVisited", JSON.stringify(recentVisited));
                                            // }
                                            $.ajax({
                                                url: `${baseUrl}/abn/api/edition/select/publish`,
                                                type: "POST",
                                                dataType: "json",
                                                data: JSON.stringify({ uid: s.uid_actual }),
                                                success: function (res) {
                                                    console.log('select', res);
                                                }
                                            })
                                        }
                                    })
                                    // routerLink ="/{{ row.uid_actual }}/{{row.sub_category.code}}/{{ row.date | date:'dd-MM-yyyy'}}"
                                    var editionCategory = s.sub_category.name;
                                    var editionUrl = s.uid_actual + '/' + s.sub_category.code + '/' + reverseDate;
                                    if (s.sub_sub_category.code) {
                                        editionCategory = s.sub_sub_category.name;
                                        editionUrl = s.uid_actual + '/' + s.sub_sub_category.code + '/' + reverseDate + '?s=' + s.sub_category.code;
                                    }
                                    let _editionListspanImage = `<a onclick="zc.actionService.navigateByUrl('${editionUrl}')"><span><img src="${zc.config.E_PAPER_S3_URL}${s.edition_info.basePath}${s.edition_info.thumbnailSmall}"></span><p>${editionCategory}</p></a>`;
                                    _editionListLi.append(_editionListspanImage);
                                    editionList.append(_editionListLi);
                                });
                            } else {
                                editionList = emptyList;
                            }
                            // editionList += '</ul>'
                            $('.category-editon-list').html(editionList);
                        }
                    })
                }
                var categoryList = $('<ul/>', { id: 'editionsList' });
                $(categoryData).each(function (inx, o) {
                    // categoryList += '<li class="category-li" onclick="getEditions('+o.code+')"><a href="javascript:;" id="id_'+inx+o.name+'">'+ o.name +'</a></li>'
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
                                url: `${baseUrl}/abn/api/edition/list/publish`,
                                type: "POST",
                                dataType: "json",
                                data: payload,
                                success: function (res) {
                                    console.log('menu', res);
                                    var editions = res.data.listData.rows;
                                    console.log('editions', editions);
                                    var editionList = $("<ul/>", { class: "editions-data" });
                                    emptyList = '<h4 class="empty-data m-0 text-center">No records found</h4>';
                                    if (editions.length > 0 && editions.length != 0) {

                                        $(editions).each(function (inx, s) {
                                            let reverseDate = s.date.split('-').reverse().join('-');
                                            // editionList += `<li><a href="javascript:;"><span><img src="https://dwczn4tesysoo.cloudfront.net/${s.edition_info.basePath}${s.edition_info.thumbnailBigWebp}"></span><p>${s.category.name}</p></a></li>`;
                                            let _editionListLi = $("<li/>", {
                                                class: "category-li", click: function () {
                                                    $.ajax({
                                                        url: `${baseUrl}/abn/api/edition/select/publish`,
                                                        type: "POST",
                                                        dataType: "json",
                                                        data: JSON.stringify({ uid: s.uid_actual }),
                                                        success: function (res) {
                                                            console.log('select', res);
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
                                            let _editionListspanImage = `<a class="anc" onclick="zc.actionService.navigateByUrl('${editionUrl}')"><span><img src="${zc.config.E_PAPER_S3_URL}${s.edition_info.basePath}${s.edition_info.thumbnailSmall}"></span><p>${editionCategory}</p></a>`;
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
                //  categoryList += '</ul>'
                $('.edition-tab-list').html(categoryList);

                if (localStorage.getItem("recentlyVisited")) {
                    var visitedEditions = JSON.parse(localStorage.getItem("recentlyVisited"));
                    var recentlyVisitedList = $('<ul/>', { class: 'recently-visited-ul' });
                    console.log('visitedEditions -->', visitedEditions);
                    visitedEditions = visitedEditions.filter((item) => { return item.uid_actual != zc.params.app});
                    visitedEditions.forEach((edition, ind) => {
                        let _li = $("<li/>", { class: "visited-li" });

                        var editionCategory = edition.sub_category.name;
                        var editionUrl = edition.uid_actual + '/' + edition.sub_category.code + '/' + edition.date.split("-").reverse().join("-");
                        if (edition.sub_sub_category.code) {
                            editionCategory = edition.sub_sub_category.name;
                            editionUrl = edition.uid_actual + '/' + edition.sub_sub_category.code + '/' + edition.date.split("-").reverse().join("-") + '?s=' + edition.sub_category.code;
                        }

                        // var categoryCode = (edition.sub_sub_category.code) ? edition.sub_sub_category.code : edition.sub_category.code;
                        // var categoryName = (edition.sub_sub_category.name) ? edition.sub_sub_category.name : edition.sub_category.name;
                        // var url = edition.uid_actual + '/' + categoryCode + '/' + edition.date.split("-").reverse().join("-");
                        // let _a = "<a href='/"+url+"' > "+categoryName+"</a>";  
                        let _a = `<a onclick="zc.actionService.navigateByUrl('/${editionUrl}')"> ${editionCategory}</a>`;
                        _li.append(_a);
                        recentlyVisitedList.append(_li);
                    });
                    $(".recent-visited-list").append(recentlyVisitedList);
                }


                // if (localStorage.getItem("recentVisited")) {
                //     var visitData = JSON.parse(localStorage.getItem("recentVisited"));
                //     var reverseVisit = visitData.reverse();
                //     var visitFilter = reverseVisit.filter(function (elem, index, self) {
                //         return index === self.indexOf(elem);
                //     });
                //     var visitUl = ""
                //     visitUl += "<ul class='recently-visited-ul'>"
                //     jQuery.each(visitFilter, function (i, data) {
                //         if (i != 0 && i < 7) {
                //             console.log(data)
                //             var link = "/" + data.url_id + "/" + data.url + "/" + dateformat;
                //             visitUl += "<li class='visited-li'><a href= '" + link + "'>" + data.paperName + "</a></li>"
                //         }
                //     })
                //     visitUl += "</ul>";
                //     $(".recent-visited-list").append(visitUl);
                //     $(".visited-li a").click(function () {
                //         localStorage.setItem("categoryName", $(this).text());
                //         if (localStorage.getItem('recentVisited')) {
                //             recentVisited = JSON.parse(localStorage.getItem('recentVisited'));
                //             recentVisited.push({ "paperName": $(this).text(), "url_id": data.url, "url": data.url_id });
                //             localStorage.setItem("recentVisited", JSON.stringify(recentVisited));
                //         }
                //         else {
                //             recentVisited.push({ "paperName": $(this).text(), "url_id": data.url, "url": data.url_id });
                //             localStorage.setItem("recentVisited", JSON.stringify(recentVisited));
                //         }
                //         location.reload();
                //     })
                // }



                // console.log('list',o.sub_category.length);

                //    var editionList = '';
                //    editionList += '<ul class="editions-data">';
                //             if(categoryData[0].sub_category.length > 0 && categoryData[0].sub_category.length != 0){

                //                 $(categoryData[0].sub_category).each(function(inx, s){
                //                     if(s.sub_sub_category.length > 0 && s.sub_sub_category.length != 0){
                //                         $(s.sub_sub_category).each(function(inx, o){
                //                         editionList += '<li><a href="javascript:;"><span><img src="https://webpcache.epapr.in/index.php?in=https://cache.epapr.in/resourcethumb/e83f13760779bf65-0062c44c-785630d5-bf3be2d6-250ea9de00bafa74_300.jpg"></span><p>'+ o.name +'</p></a></li>'
                //                         });
                //                      }else{
                //                         editionList += '<li><a href="javascript:;"><span><img src="https://webpcache.epapr.in/index.php?in=https://cache.epapr.in/resourcethumb/e83f13760779bf65-0062c44c-785630d5-bf3be2d6-250ea9de00bafa74_300.jpg"></span><p>'+ s.name +'</p></a></li>'
                //                      }

                //                 });
                //              }
                //  editionList += '</ul>'
                //  $('.category-editon-list').html(editionList);
                $('li.category-li:first-child a').addClass('active');
                $('li.category-li a').click(function (e) {
                    $('li.category-li a.active').removeClass('active');
                    $(this).addClass('active');
                    // var categoryName = e.target.innerText;
                    // var editionListdata = '';
                    // $(categoryData).each(function (inx, o) {
                    //     if (o.name == categoryName) {
                    //         if (o.sub_category.length > 0 && o.sub_category.length != 0) {
                    //             $(o.sub_category).each(function (indx, e) {
                    //                 if (e.sub_sub_category.length > 0 && e.sub_sub_category.length != 0) {
                    //                     $(e.sub_sub_category).each(function (inx, s) {
                    //                         editionListdata += '<li><a href="javascript:;"><span><img src="https://webpcache.epapr.in/index.php?in=https://cache.epapr.in/resourcethumb/e83f13760779bf65-0062c44c-785630d5-bf3be2d6-250ea9de00bafa74_300.jpg"></span><p>' + s.name + '</p></a></li>'
                    //                     });
                    //                 } else {
                    //                     editionListdata += '<li><a href="javascript:;"><span><img src="https://webpcache.epapr.in/index.php?in=https://cache.epapr.in/resourcethumb/e83f13760779bf65-0062c44c-785630d5-bf3be2d6-250ea9de00bafa74_300.jpg"></span><p>' + e.name + '</p></a></li>'
                    //                 }
                    //             })
                    //         }
                    //     }
                    // });
                    // $('.editions-data').html(editionListdata);
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
    // alert(1);
    // debugger;
    console.log('searchInput', searchInput);
    const filteredData = arr.filter(value => {
        const searchStr = searchInput.toLowerCase();
        const nameMatches = value.name.toLowerCase().includes(searchStr);
        // const daysMatches = value.days.toString().includes(searchStr);
        // const oneItemMatches = value.items.some(item => item.toLowerCase().includes(searchStr));

        return nameMatches
    });
    console.log(filteredData);
    //this.setState({ list: filteredData });
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
    if (!input.value) return false;
    payload.globalFilter = { fieldName: 'globalFilter', key: 'globalFilter', matchType: 'any', value: input.value };
    $.ajax({
        url: `${baseUrl}abn/api/edition/list/publish`,
        type: "POST",
        dataType: "json",
        data: JSON.stringify(payload),
        contentType: "application/json",
        success: function (res) {
            editions = res.data.listData.rows;
            var availableList = $('<ul/>', { id: 'availableList' });
            editions.forEach((edition, ind) => {
                let _li = $("<li/>", { class: "available-li" });
                var categoryCode = (edition.sub_sub_category.code) ? edition.sub_sub_category.code : edition.sub_category.code;
                var categoryName = (edition.sub_sub_category.name) ? edition.sub_sub_category.name : edition.sub_category.name;
                var url = edition.uid_actual + '/' + categoryCode + '/' + edition.date.split("-").reverse().join("-");
                // let _a = "<a href='/"+url+"'> "+categoryName+"</a>";
                let _a = `<a onclick="zc.actionService.navigateByUrl('/${url}')"> ${categoryName}</a>`;

                // let _a = $("<a/>", {
                //     id: "id_" + ind + edition.category.name, text: edition.sub_category.name, click: function (e) {
                //        // e.preventDefault();
                //     }
                // });
                _li.append(_a);
                availableList.append(_li);
            });
            $(".available-list").html(availableList);
        },
        complete: function () {
        }
    });

    return false;


    _ul = document.getElementById("availableList");
    _li = _ul.getElementsByTagName("li");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < _li.length; i++) {
        _a = _li[i].getElementsByTagName("a")[0];
        if (_a) {
            txtValue = _a.textContent || _a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1 && filter != '') {
                console.log('txtValue.toUpperCase().indexOf(filter)', txtValue.toUpperCase().indexOf(filter));
                _li[i].style.display = "flex";
                document.getElementById('searchResults').style.display = "block";
            } else {
                _li[i].style.display = "none";
            }
            if (filter === '') {
                document.getElementById('searchResults').style.display = "none";

            }
        }
    }
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