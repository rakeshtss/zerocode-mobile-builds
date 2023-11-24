if (!$) {
    var $ = jQuery;
}
var selectedDate = null;
var date = new Date();
let day = date.getDay();
let currentDate = date.getDate();
var month = date.getMonth();
let year = date.getFullYear().toString().substr(-2);
let dayText = '';
var monthText;
var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var fullNameDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var formatedDate;
var setDate;
var getDate = localStorage.getItem('date');
var formatedDateSpan = $('#formatedDate');
var categoryName = localStorage.getItem('categoryName');
$(document).ready(function () {
    document.getElementById('editionSelector').innerText = categoryName;
    // var currentDateText = $('#currentDate');
    // var yearText = $('#year');
    
    days.forEach((element, index) => {
        if (index == day) {
            dayText = element;
        }
        return dayText;
    });
    // console.log('dayTextdayText', dayText);
    months.forEach((element, index) => {
        if (index == month) {
            monthText = element;
        }
    });

    // currentDateText.append(currentDate);
    // yearText.append(year);
    // console.log('year', year);
    // debugger;
    if (getDate) {
        formatedDateSpan.append(getDate);
    } else {
        formatedDate = dayText + ',' + currentDate + ' ' + monthText + ' ' + year;
        setDate = localStorage.setItem('date', formatedDate);
        getDate = localStorage.getItem('date');
        formatedDateSpan.append(getDate);
        // setDate;
    }
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
        lastWeekDaysList.append(lastWeekDay);
    })
    var array = ["2021-01-15", "2020-01-15"];
    $("#datepicker").datepicker({
        changeMonth: true,
        changeYear: true,
        maxDate: new Date(),
        showAnim: "fadeIn",
        beforeShowDay: function (date) {
            var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
            return [array.indexOf(string) == -1]
        },
        onSelect: function () {
            formatedDateSpan.empty();
            selectedDate = $(this).val();
            date = new Date(selectedDate);
            console.log('datedd', date);
            day = date.getDay();
            currentDate = date.getDate();
            month = date.getMonth();
            year = date.getFullYear().toString().substr(-2);
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
            // window.location.reload();
            let urlDate = window.location.pathname.split('/').pop();
            let pathnames = window.location.pathname.split('/');
            let pathFirst = pathnames[0];
            let pathSecond = pathnames[1];
            let pathThird = pathnames[2];
            let pathFourth = pathnames[3];
            let selectedDateFormat = selectedDate.split("/");
            let selectedDateFormatMonth = selectedDateFormat[0];
            let selectedDateFormatDay = selectedDateFormat[1];
            let selectedDateFormatYear = selectedDateFormat[2];
            let urlFormatDate = selectedDateFormatDay+'-'+selectedDateFormatMonth+'-'+selectedDateFormatYear;

            // console.log('selectedDateFormat', selectedDateFormat);
            // console.log('pathFirst', pathFirst);
            // console.log('pathSecond', pathSecond);
            // console.log('pathThird', pathThird);
            // console.log('pathFourth', pathFourth);
            // console.log('selectedDate', selectedDate);
            // console.log('urlDate', urlDate);
            console.log('urlll', "/"+pathSecond+"/"+pathThird+"/"+urlFormatDate);
            window.location.replace("/"+pathSecond+"/"+pathThird+"/"+urlFormatDate)
            // console.log(' href => ' + window.location.href);
            // console.log(' host => ' + window.location.host);
            // console.log(' hostname => ' + window.location.hostname);
            // console.log(' port => ' + window.location.port);
            // console.log(' protocol => ' + window.location.protocol);
            console.log(' pathname => ' + window.location.pathname.split('/').pop());
            // console.log(' hashpathname => ' + window.location.hash);
            // console.log(' search=> ' + window.location.search);
        },
        onChangeMonthYear: function (year, month, inst) {
            console.log('y', year);
            console.log('m', month);
            console.log('inst', inst);
        }
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
        console.log('getDay', getDay);
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