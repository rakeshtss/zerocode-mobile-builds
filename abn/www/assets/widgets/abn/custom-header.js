if (!$) {
    var $ = jQuery;
}
var zc;
var selectedDate = null;
var baseUrl = zc.config.apiUrl;
var date = new Date(zc.params.page.split("-").reverse().join("-"));
var day = date.getDay();
var currentDate = date.getDate();
var header = { 'Content-Type': 'application/json' };
var month = date.getMonth();
var year = date.getFullYear().toString().substr(-2);
var dayText = '';
var monthText;
var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var fullNameDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var formatedDate;
var setDate;
var getDate = localStorage.getItem('date');
var selectedDate = new Date(zc.params.page.split("-").reverse().join("-"));
var formatedDateSpan = $('#formatedDate');
var categoryName = localStorage.getItem('categoryName');
var editions = [];
var availableDates = [];
$(document).ready(function () {
    $('.edition-date-selector .dropdown-toggle').dropdown();
    if (document.getElementById('editionSelector')) {
        document.getElementById('editionSelector').innerText = zc.params.module.replace('_', ' ').toUpperCase();
        document.getElementById('divEditionSelector').style.display = "block";
    }
    // var currentDateText = $('#currentDate');
    // var yearText = $('#year');

    days.forEach((element, index) => {
        if (index == selectedDate.getDay()) {
            dayText = element;
        }
        return dayText;
    });
    // console.log('dayTextdayText', dayText);
    months.forEach((element, index) => {
        if (index == selectedDate.getMonth()) {
            monthText = element;
        }
    });

    // currentDateText.append(currentDate);
    // yearText.append(year);
    // console.log('year', year);
    // debugger;
    formatedDate = dayText + ',' + selectedDate.getDate() + ' ' + monthText + ' ' + selectedDate.getFullYear().toString().substr(-2);
    formatedDateSpan.append(formatedDate);
    if (document.getElementById('divDateSelector')) {
        document.getElementById('divDateSelector').style.display = "block";
    }

    let payload = {};
    if (zc.queryParams.s) {
        payload.childs = true;
        payload.sub_category = null;
        payload.sub_sub_category = zc.params.module;
    } else {
        payload.sub_category = zc.params.module;
    }
    var firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    var lastDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
    payload.start_date = selectedDate.getFullYear() + '-' + (selectedDate.getMonth() + 1) + '-' + firstDay.getDate();
    payload.end_date = selectedDate.getFullYear() + '-' + (selectedDate.getMonth() + 1) + '-' + lastDay.getDate();

    $.ajax({
        url: `${baseUrl}abn/api/edition/list/publish`,
        type: "POST",
        dataType: "json",
        data: JSON.stringify(payload),
        headers: header,
        success: function (res) {
            editions = res.data.listData.rows;
            // var tempDate = new Date();
            var todayDate = new Date();

            var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var dayName;
            var lastWeekDaysId = $("#lastWeekDaysList");
            var lastWeekDayDiv = "";
            for (var i = 0; i < 7; i++) {
                todayDate = new Date();
                todayDate.setDate(todayDate.getDate() - i);
                todayDate.setHours(0, 0, 0);
                todayDate.setMinutes(0);
                todayDate.setSeconds(0);
                todayDate.setMilliseconds(0);
                if (i === 0) {
                    dayName = "Today's issue";
                } else if (i === 1) {
                    dayName = "Yesterday";
                } else {
                    dayName = weekDays[todayDate.getDay()];
                }
                editions.forEach(item => {
                    var eDate = new Date(item.date);
                    eDate.setHours(0, 0, 0);
                    //  console.log(eDate, eDate.getTime(), eDate.toJSON().slice(0, 10).replace(/-/g, '-'), todayDate, todayDate.getTime(), todayDate.toJSON().slice(0, 10).replace(/-/g, '-'));
                    if (eDate.getTime() === todayDate.getTime()) {
                        var eCategory = (item.sub_sub_category.code) ? item.sub_sub_category.code : item.sub_category.code;
                        var url = "/" + item.uid_actual + "/" + eCategory + "/" + item.date.split("-").reverse().join("-");
                        if (zc.queryParams.s) {
                            url = url + '?s=' + zc.queryParams.s;
                        }
                        lastWeekDayDiv = `<a class="week" onclick="zc.actionService.navigateByUrl('${url}')"> ${dayName}</a>`;
                        lastWeekDaysId.append(lastWeekDayDiv);
                    }
                });

            }
            availableDates = [];
            if (editions.length > 0) {
                editions.forEach(edition => {
                    availableDates.push(edition.date);
                });
            }
            $("#datepicker").datepicker({
                changeMonth: true,
                changeYear: true,
                maxDate: new Date(),
                showAnim: "fadeIn",
                defaultDate: selectedDate,
                beforeShowDay: function (date) {
                    var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
                    return [availableDates.indexOf(string) != -1]
                },
                onSelect: function () {

                    formatedDateSpan.empty();
                    selectedDate = $(this).val();
                    selectedDate = new Date(selectedDate);
                    date = new Date(selectedDate);
                    // var editionDate = new Date('2021-02-09 00:00:00');
                    // editionDate = editionDate.setHours(0,0,0);

                    console.log('selectedDate -->', selectedDate.getTime());
                    console.log('editions -->', editions);
                    var editionDetails;
                    var actualDate;
                    editions.forEach(item => {
                        editionDate = new Date(item.date + ' 00:00:00').getTime();
                        actualDate = selectedDate.getTime();
                        console.log('editionDate', editionDate, actualDate);
                        if (editionDate == actualDate) {
                            editionDetails = item;
                        }
                    });
                    // editionDetails = editions.filter(item => { console.log(new Date(item.date + ' 00:00:00').getTime()); return new Date(item.date + ' 00:00:00') === selectedDate.getDate()});
                    if (!editionDetails) {
                        return false;
                    }
                    var eCategory = (editionDetails.sub_sub_category.code) ? editionDetails.sub_sub_category.code : editionDetails.sub_category.code;
                    // window.location.replace("/" + editionDetails.uid_actual + "/" + eCategory + "/" + editionDetails.date.split("-").reverse().join("-"))
                    var turl = "/" + editionDetails.uid_actual + "/" + eCategory + "/" + editionDetails.date.split("-").reverse().join("-");
                    if(zc.queryParams.s) {
                        turl = turl + '?s='+ zc.queryParams.s;
                    }
                    zc.actionService.navigateByUrl(turl);
                    return false;
                    // day = date.getDay();
                    // currentDate = date.getDate();
                    // month = date.getMonth();

                    // year = date.getFullYear().toString().substr(-2);
                    // days.forEach((element, index) => {
                    //     if (index == day) {
                    //         dayText = element;
                    //     }
                    // });
                    // months.forEach((element, index) => {
                    //     if (index == month) {
                    //         monthText = element;
                    //     }
                    // });
                    // formatedDate = dayText + ',' + currentDate + ' ' + monthText + ' ' + year;
                    // setDate = localStorage.setItem('date', formatedDate);
                    // getDate = localStorage.getItem('date');
                    // if (getDate) {
                    //     formatedDateSpan.append(getDate);
                    // } else {
                    //     setDate;
                    // }
                    // let urlDate = window.location.pathname.split('/').pop();
                    // let pathnames = window.location.pathname.split('/');
                    // let pathFirst = pathnames[0];
                    // let pathSecond = pathnames[1];
                    // let pathThird = pathnames[2];
                    // let pathFourth = pathnames[3];
                    // let selectedDateFormat = selectedDate.split("/");
                    // let selectedDateFormatMonth = selectedDateFormat[0];
                    // let selectedDateFormatDay = selectedDateFormat[1];
                    // let selectedDateFormatYear = selectedDateFormat[2];
                    // let urlFormatDate = selectedDateFormatDay + '-' + selectedDateFormatMonth + '-' + selectedDateFormatYear;


                },
                onChangeMonthYear: function (year, month, inst) {
                    let payload = {};
                    if (zc.queryParams.s) {
                        payload.childs = true;
                        payload.sub_category = null;
                        payload.sub_sub_category = zc.params.module;
                    } else {
                        payload.sub_category = zc.params.module;
                    }
                    // payload.sub_category = zc.params.module;
                    var flDate = new Date(year, month - 1, 1);
                    var fDay = new Date(flDate.getFullYear(), flDate.getMonth(), 1);
                    // var lDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
                    var lDay = new Date(flDate.getFullYear(), flDate.getMonth() + 1, 0);
                    payload.start_date = year + '-' + month + '-' + fDay.getDate();
                    payload.end_date = year + '-' + month + '-' + lDay.getDate();
                    // console.log('flDate -->', flDate);
                    // console.log('selectedDate -->', selectedDate);
                    $.ajax({
                        url: `${baseUrl}abn/api/edition/list/publish`,
                        type: "POST",
                        dataType: "json",
                        data: JSON.stringify(payload),
                        headers: header,
                        success: function (res) {
                           // $('#datepicker').datepicker("destroy");

                            availableDates = [];
                            if(res.data.listData && res.data.listData.rows) {
                                editions = res.data.listData.rows;
                            } else {
                                editions = [];
                            }
                            // alert(1);
                            if (editions.length > 0) {
                                editions.forEach(edition => {
                                    availableDates.push(edition.date);
                                });
                            }
                            console.log('availableDates', availableDates);
                        },
                        complete: function () {
                            $("#datepicker").datepicker("refresh");
                            console.log('request completed -->');
                        }
                    });
                }
            })

        },
        complete: function () {
        }
    })

    function available(date) {
        alert(1);
        var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
        return [availableDates.indexOf(string) != -1];
      }


    // if (getDate) {
    //     formatedDateSpan.append(getDate);
    // } else {
    //     formatedDate = dayText + ',' + currentDate + ' ' + monthText + ' ' + year;
    //     setDate = localStorage.setItem('date', formatedDate);
    //     getDate = localStorage.getItem('date');
    //     formatedDateSpan.append(getDate);
    // }
    var lastWeekDays = ["Today's issue", "Friday", "Thursday", "Wednesday", "Tuesday", "Monday", "Sunday"];
    var lastWeekDaysList = $("#lastWeekDaysList");
    fullNameDays.forEach((element, index) => {
        getLastWeekDay(index);
        var lastWeekDay = `<div class="week" onclick="getLastWeek(${index})">${getDay}</div>`
        // var lastWeekDay = $("<div />", { class: "week", text: element, click: function(inx) {
        //     var today = new Date();
        //     var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - inx);
        //     console.log('lastWeek', lastWeek);
        //     return lastWeek;
        // } });
        //  lastWeekDaysList.append(lastWeekDay);
    })



    var getDay;
    function getLastWeekDay(number) {
        var today = new Date();
        var lastWeekDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() - number);
        getDayIndex = lastWeekDay.getDay();
        fullNameDays.forEach((element, index) => {
            if (index === getDayIndex) {
                getDay = element
            }
            if (today.getDay() === getDayIndex) {
                getDay = "Today's Issue";
            }
            if (today.getDay() === getDayIndex + 1) {
                getDay = "Yesterday";
            }
        })
        // console.log('getDay', getDay);
        return getDay;
    }

    $("#nav-toggle").click(function () {
        $("body").removeClass("hide-menu")
        $("body").addClass("show-menu")
    })
    $("#nav-close").click(function () {
        $("body").removeClass("show-menu")
        $("body").addClass("hide-menu")
    })
    // $('body').click(function(evt){    
    //     if(!$(evt.target).is('#divDateSelector') && !($('#divDateSelector').find('ul').hasClass('show'))) {
    //         $('#divDateSelector').addClass('show');
    //         $('#divDateSelector').find('ul').addClass('show');
    //     } else {
    //         $('#divDateSelector').removeClass('show');
    //         $('#divDateSelector').find('ul').removeClass('show');
    //     }
    // });
    // $('#divDateSelector').click(function () {
    //     // debugger;
    //     if ($(this).hasClass('show')) {
    //         $('#divDateSelector').removeClass('show');
    //         $('#divDateSelector').find('ul').removeClass('show');
    //     } else {
    //         $('#divDateSelector').addClass('show');
    //         $('#divDateSelector').find('ul').addClass('show');
    //     }
    // })
    if (window.innerWidth > 768) {
        $('.zoomin').click(function () {
            $('.zc-clip-right-block').hide();
            $('.zc-google-ad').hide();
            $(".pinch-zoom-content").draggable({
                disabled: false
            });
            $(".pinch-zoom-content").css({
                'cursor': 'all-scroll'
            });
        })
        $('.main-img').click(function () {
            $('.zc-clip-right-block').hide();
            $('.zc-google-ad').hide();
            $(".pinch-zoom-content").draggable({
                disabled: false
            });
            $(".pinch-zoom-content").css({
                'cursor': 'all-scroll'
            });
        })
        $('.zoomout').click(function () {
            $('.zc-clip-right-block').show();
            $('.zc-google-ad').show();
            $(".pinch-zoom-content").draggable({
                disabled: true
            });
            $(".pinch-zoom-content").css({
                'cursor': 'default',
                'left': 0,
                'top': 0,
                'transform': 'matrix(1, 0, 0, 1, 0, 0)'
            });
        })
    }

})
var lastWeek;
function getLastWeek(number) {
    formatedDateSpan.empty();
    var today = new Date();
    lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - number);
    console.log('lastWeek', lastWeek);
    day = lastWeek.getDay();
    currentDate = lastWeek.getDate();
    month = lastWeek.getUTCMonth();
    year = lastWeek.getUTCFullYear().toString().substr(-2);
    days.forEach((element, index) => {
        if (index == day) {
            dayText = element;
        }
    });
    months.forEach((element, index) => {
        if (index == month) {
            monthText = element;
        }
    });
    formatedDate = dayText + ',' + currentDate + ' ' + monthText + ' ' + year;
    setDate = localStorage.setItem('date', formatedDate);
    getDate = localStorage.getItem('date');
    if (getDate) {
        formatedDateSpan.append(getDate);
    } else {
        setDate;
    }
    window.location.reload();
    return lastWeek;
}
$(document).on('click.dropdown', '.dropdown.keep-inside-clicks-open', function (e) {
    e.stopPropagation();
});
$(document).on('click', '.ui-datepicker-next', function (e) {
    console.log('next');
    e.stopPropagation();
})

$(document).on('click', '.ui-datepicker-prev', function (e) {
    console.log('prev');
    e.stopPropagation();
})



//   var lastWeek = getLastWeek();
//   var lastWeekMonth = lastWeek.getMonth() + 1;
//   var lastWeekDay = lastWeek.getDate();
//   var lastWeekYear = lastWeek.getFullYear();

//   var lastWeekDisplay = lastWeekMonth + "/" + lastWeekDay + "/" + lastWeekYear;
//   var lastWeekDisplayPadded = ("00" + lastWeekMonth.toString()).slice(-2) + "/" + ("00" + lastWeekDay.toString()).slice(-2) + "/" + ("0000" + lastWeekYear.toString()).slice(-4);

//   console.log('lastWeekDisplay', lastWeekDisplay);
//   console.log('lastWeekDisplayPadded', lastWeekDisplayPadded);
$(window).scroll(function () {
    if (window.innerWidth >= 1024) {
        var scrollTop = window.scrollY;
        console.log('scrollTop', scrollTop);
        if (scrollTop > 50) {
            $('.e-paper-strip').addClass('fixed');
        } else {
            $('.e-paper-strip').removeClass('fixed');
        }
    }
})
function goHome() {
    zc.actionService.navigateByUrl('/');
    closeMenu();
}
function closeMenu() {
    $("body").removeClass("show-menu")
    $("body").addClass("hide-menu")
}