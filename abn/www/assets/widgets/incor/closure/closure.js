var closures1 = [
    {
        "periodName": "0-7 DAYS",
        "month": "JAN",
        "value": 0
    },
    {
        "periodName": "0-7 DAYS",
        "month": "MAR",
        "value": 20
    },
    {
        "periodName": "7-13 DAYS",
        "month": "FEB",
        "value": 1
    },
    {
        "periodName": ">13 DAYS",
        "month": "APR",
        "value": 10
    },
    {
        "periodName": "0-7 DAYS",
        "month": "APR",
        "value": 14
    }
];
var channels1 = [
    {
        "channelName": "DGW",
        "period": "1st to 7th",
        "value": 22
    },
    {
        "channelName": "DGW",
        "period": "8th to 14th",
        "value": 15
    },
    {
        "channelName": "DGW",
        "period": "15th to 21st",
        "value": 22
    },
    {
        "channelName": "CPW",
        "period": "1st to 7th",
        "value": 10
    },
    {
        "channelName": "CPW",
        "period": "8th to 14th",
        "value": 68
    },
    {
        "channelName": "CPW",
        "period": "15th to 21st",
        "value": 10
    },
    {
        "channelName": "DWL",
        "period": "1st to 7th",
        "value": 02
    },
    {
        "channelName": "DWL",
        "period": "8th to 14th",
        "value": 83
    },
    {
        "channelName": "DWL",
        "period": "15th to 21st",
        "value": 02
    },
    {
        "channelName": "DIGITAL",
        "period": "1st to 7th",
        "value": 10
    },
    {
        "channelName": "DIGITAL",
        "period": "8th to 14th",
        "value": 68
    },
    {
        "channelName": "DIGITAL",
        "period": "15th to 21st",
        "value": 10
    },
    {
        "channelName": "RWI",
        "period": "1st to 7th",
        "value": 02
    },
    {
        "channelName": "RWI",
        "period": "8th to 14th",
        "value": 83
    },
    {
        "channelName": "RWI",
        "period": "15th to 21st",
        "value": 02
    },
    {
        "channelName": "EVENTS/ADS",
        "period": "1st to 7th",
        "value": 02
    },
    {
        "channelName": "EVENTS/ADS",
        "period": "8th to 14th",
        "value": 83
    },
    {
        "channelName": "EVENTS/ADS",
        "period": "15th to 21st",
        "value": 02
    },
    {
        "channelName": "SELF",
        "period": "1st to 7th",
        "value": 02
    },
    {
        "channelName": "SELF",
        "period": "8th to 14th",
        "value": 83
    },
    {
        "channelName": "SELF",
        "period": "15th to 21st",
        "value": 02
    }
];
var uniquData1 = [
    {
        "period": "2nd to 8th",
        "usv": 62,
        "rsv": 08,
        "total": 72,
        "sale": 04
    },
    {
        "period": "9th to 15th",
        "usv": 62,
        "rsv": 08,
        "total": 72,
        "sale": 04
    },
    {
        "period": "15th to 21st",
        "usv": 62,
        "rsv": 08,
        "total": 72,
        "sale": 04
    }
];
var staticValues = [
    { 'name': 'USV' },
    { 'name': 'RSV' },
    { 'name': 'TOTAL' },
    { 'name': 'SALE' }
];
var totalChannelVal = 0;

if (window.jQuery) {
    var $ = jQuery;
    var apiUrl = zc.config.apiUrl;
    function zc_req(url, data, successCall, failureCall) {
        var header = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + zc.user.token };
        return $.ajax({
            url: zc.config.apiUrl + zc.config.app + url, //SVC_URL + CLIENT + "/" + url,
            method: "POST",
            headers: header,
            dataType: "json",
            data: JSON.stringify(data == undefined ? {} : data),
            success: successCall,
            error: failureCall
        });
    }
    $(document).ready(function () {
var payload = { project: { uid: zc.wdProjectForm.model.project.uid } };
        getClosureData(payload);
    });
}
function getClosureData(payload){
url = zc.config.apiUrl + zc.config.app + '/api/incor/reports/closure/closure';
zc_req('/api/incor/reports/closure/closure', payload, function (response) {
//   channels = response.data.listData.rows;
periodRes = response.data.listData.zc_extra.data1;
closures = response.data.listData.zc_extra.data2;
channelsRes = response.data.listData.zc_extra.data3;
inital();
periodRes2 = response.data.listData.zc_extra.data4;
channels = response.data.listData.zc_extra.data5;
uniquData = response.data.listData.zc_extra.data6;
selectedMonth = (response.data.listData.zc_extra.data7)[0].monthName;
onMonth();

})
}
function inital() {
    $('#closure').html('');
    // $('#tableBody').html('');
    // $('#tableFooter').html('');
    var _tableHeader = $('<thead/>');
    var _tableBody = $('<tbody/>');
    var _tableFooter = $('<tfoot/>');
    $('#closure').append(_tableHeader);
    $('#closure').append(_tableBody);
    $('#closure').append(_tableFooter);

    //var periodObj = {}, periodRes = [];
    var monthObj = {}, monthRes = [];
    $.each(closures, function (inx, val) {
        var monthName = val.month;

        if (!(monthName in monthObj)) {
            monthObj[monthName] = 1;
            monthRes.push({ monthName: monthName });
        }

    });
    var _tr = $('<tr/>');
    var _trFoot = $('<tr/>');
    $.each(monthRes, function (i, o) {
        if (i === 0) {
            var _th1 = $(`<th class="th-first"></th>`);
            _tr.append(_th1);
            var _tdFootFirst = $(`<td class="th-first">TOTAL</td>`);
            _trFoot.append(_tdFootFirst);
        }
        var _th = $('<th/>', { text: o.monthName });
        var _tdFoot = $('<td/>', { id: o.monthName + 'total' });

        _trFoot.append(_tdFoot);
        // var _thLast = $('<th/>', { text: 'TOTAL' });
        _tr.append(_th);
        // _tr.append(_thLast);
        _tableHeader.append(_tr);
        _tableFooter.append(_trFoot);
    });
    $.each(periodRes, function (i, o) {
        var _trBody = $('<tr/>');
        var _td1 = $('<td>', { text: o.period });
        _trBody.append(_td1);
        _tableBody.append(_trBody);
        $.each(monthRes, function (inx, obj) {
            var _td = $('<td/>', { id: idCreator(o.period + obj.monthName) });
            _trBody.append(_td);
            _tableBody.append(_trBody);
        })
    })
    $.each(closures, function (i, o) {
        $("td[id='" + idCreator(o.periodName + o.month)+ "']").text(o.value);
    })
    $.each(monthRes, function (i, o) {
        totalMonthValue = 0;
        $.each(closures, function (inx, obj) {
            if (o.monthName === obj.month) {
                totalMonthValue += parseInt(obj.value);
            }
        })
        $("td[id='" + idCreator(o.monthName + 'total')+ "']").text(totalMonthValue);
        $("td[id='" + idCreator(o.monthName + 'total')+ "']").css('cursor','pointer');
        $("td[id='" + idCreator(o.monthName + 'total')+ "']").click(function () {
            // alert(o.monthName);
            var payload = { project: { uid: zc.wdProjectForm.model.project.uid, month:o.monthName } };
            getClosureData(payload);
            // window.zc['closuerMonth']= o.monthName;
            window.zc['project']['month']=o.monthName;

        })
    })
}
function onMonth() {


    $('#monthWiseClosure').html('');
   
    // for looping periods to get table header
    var _closureMonthWiseTableThead = $('<thead/>');
    var _closureMonthWiseTableTBody = $('<tbody/>');
    $('#monthWiseClosure').append(_closureMonthWiseTableThead);
    $('#monthWiseClosure').append(_closureMonthWiseTableTBody);
    var _closureTableTR = $('<tr/>');
    var _selectedMonth = $('<table/>');
    $.each(periodRes2, function (i, o) {
        if (i === 0) {
            var _th1 = $('<th/>',{text: selectedMonth, style:'min-width:75px;'});
            _closureTableTR.append(_th1);
        }
        var _th = $('<th/>', { text: o.periodName });
        _closureTableTR.append(_th);
        _closureMonthWiseTableThead.append(_closureTableTR);
    });
    _closureTableTR.append('<th>TOTAL</th>');
    // for looping channels to get table body
    $.each(channelsRes, function (i, o) {
        var channelBgColor = ["#70C149", "#E6B211", "#EE5641", "#ED008C", "#40B4D9", "#9A6AB6", "#AE8C4C"];
        var _trBody = $('<tr/>');
        var _td1 = $('<td>', { text: o.channelName, style: `background-color: ${channelBgColor[i]};color:#fff;`, name: (o.channelName).replace(/\s/g, '') });
        _trBody.append(_td1);
        _closureMonthWiseTableTBody.append(_trBody);
        $.each(periodRes2, function (inx, obj) {
            var _td = $('<td/>', { id: idCreator(obj.periodName + o.channelName) });
            _trBody.append(_td);
            _closureMonthWiseTableTBody.append(_trBody);
        })
        _trBody.append($('<td/>', {style: 'background:#ffe0c1;', id:idCreator('total-td'+ o.channelName)}));
    });
    $.each(staticValues, function (i, o) {
        var _trBody = $('<tr/>');
        var _td = $('<td/>', { text: o.name });
        _trBody.append(_td);
        _closureMonthWiseTableTBody.append(_trBody);
        $.each(periodRes2, function (inx, obj) {
            var _td = $('<td/>', { id: idCreator(obj.periodName + o.name) });
            _trBody.append(_td);
            _closureMonthWiseTableTBody.append(_trBody);
        })
        _trBody.append($('<td/>', {style: 'background:#ffe0c1;',id:idCreator('total-td'+o.name)}));
    })
    var usvTotal = 0, rsvTotal = 0, totalVal = 0, salTotal = 0;
    $.each(uniquData, function (i, o) {
        $("td[id='" + idCreator(o.period + 'USV')+ "']").text(o.usv);
        $("td[id='" + idCreator(o.period + 'RSV')+ "']").text(o.rsv);
        $("td[id='" + idCreator(o.period + 'TOTAL')+ "']").text(o.total);
        $("td[id='" + idCreator(o.period + 'SALE')+ "']").text(o.sale);
        usvTotal += parseInt(o.usv);
        rsvTotal += parseInt(o.rsv);
        totalVal += parseInt(o.total);
        salTotal += parseInt(o.sale);
    });
    $("td[id='" +idCreator('total-tdUSV')+ "']").text(usvTotal);
    $("td[id='" +idCreator('total-tdRSV')+ "']").text(rsvTotal);
    $("td[id='" +idCreator('total-tdTOTAL')+ "']").text(totalVal);
    $("td[id='" +idCreator('total-tdSALE')+ "']").text(salTotal);

    $.each(channels, function (i, o) {
        $("td[id='" + idCreator(o.period + o.channelName)+ "']").text(o.value);
    })
    $.each(channelsRes, function (i, o) {
        totalChannelVal = 0;
        $.each(channels, function (ind, ob) {
            if (o.channelName === ob.channelName) {
                totalChannelVal += parseInt(ob.value);
            }
        })
        $("td[id='" + idCreator('total-td' + o.channelName)+ "']").text(totalChannelVal);
    })
}
function idCreator(data) {
    return data.replace(/\s/g, '_');
}