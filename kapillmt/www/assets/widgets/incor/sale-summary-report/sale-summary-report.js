
var currentDate = new Date();
var month = currentDate.getFullYear() + '-' + (parseInt(currentDate.getMonth()) + 1) + '-1';
var by_category = "by-employee";
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
    if (zc.form_9691 && zc.form_9691.model.by_channel.uid) {
      by_category = zc.form_9691.model.by_channel.uid;
    }
    if (zc.form_9691 && zc.form_9691.model.date_1001) {
      month = zc.form_9691.model.date_1001
    } else {
      window.zc.form_9691.model.date_1001 = month;
    }
    url = zc.config.apiUrl + zc.config.app + '/api/incor/reports/sale-summary-report/sale-summary-report';
    var payload = { project: { uid: zc.wdProjectForm.model.project.uid, month: month, by_category: by_category } };
    zc_req('/api/incor/reports/sale-summary-report/sale-summary-report', payload, function (response) {
      // channels = response.data.listData.rows;
      if (response.data.listData.zc_extra) {
        periodRes = response.data.listData.zc_extra.data1;
        if (by_category === "by-employee") {
          execRes = response.data.listData.zc_extra.data2;
        } else if (by_category === "by-channel") {
          channelsRes = response.data.listData.zc_extra.data2;
        }
        siteVisits2 = response.data.listData.zc_extra.data3;
        siteVisits1 = response.data.listData.zc_extra.data4;
        total_val = response.data.listData.zc_extra.data5;
        grandTotals = response.data.listData.zc_extra.data6;
        monthInfo = response.data.listData.zc_extra.data7;
      }
      reloadData();
    });
  });
}

var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var tableRow = '';


var channelBgColor = ["#70c149", "#e6b211", "#ee5545", "#3fb4d8", "#9a6ab6", "#ae8c4c", "#34aeeb", "#92eb34", "#742cf2"];
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function reloadData() {
  $('.sale-summary-report').html('');
  var now = new Date(month);
  var _month = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  var i = 1;
  var _thead = $('<thead/>')
  var _htr = $('<tr/>');
  var _htr2 = $('<tr/>');
  var _th = $('<th/>', { rowspan: 2, text: monthNames[now.getMonth()] + '-' + now.getFullYear().toString().substr(-2), style: 'font-weight:bold;color:#000;background: transparent;text-align:left;width:60px;' })
  _htr.append(_th);
  var _th = $('<th/>');
  // _htr2.append(_th);

  $.each(periodRes, function (pi, po) {
    for (i = po.start_date; i <= po.end_date; i++) {
      var _m = now.getMonth() + 1;
      var _y = now.getFullYear();
      var _date = _y + '-' + _m + '-' + i;
      var dateIndex = new Date(_date).getDay();
      var firstLetter = weekday[dateIndex];
      let firstChar = firstLetter.charAt(0);
      var _pdth = $('<th/>', { text: firstChar });
      _htr.append(_pdth);
      var _dTh = $('<th/>', { text: (i === '01' ? 1 : i) });
      _htr2.append(_dTh);
    }
    var _eth = $('<th/>', { style: 'width: 5px', class: 'extra' });
    _htr.append(_eth);
    var _eth = $('<th/>', { style: 'width: 5px', class: 'extra' });
    _htr2.append(_eth);
  });
  _thead.append(_htr);
  _thead.append(_htr2);
  $('.sale-summary-report').append(_thead);
  if (by_category === "by-employee") {

    // footer
    // var _tfoot = $('<tfoot/>', { class: 'executive-vs-sales-footer' });
    var _ftr = $('<tr/>', { class: 'footer-cls' });
    var _tftr = $('<tr/>', { class: 'footer-cls' });
    var _td = $('<td/>', { text: 'TOTAL', rowspan: 2, class: 'totalCls', style: 'font-weight:bold;text-align:left;' })
    _ftr.append(_td);
    // var _ftr1 = $('<tr/>');
    var _data_year = monthInfo[0].monthName.split('-')[0];
    var _data_month = monthInfo[0].monthName.split('-')[1];
    $.each(periodRes, function (i, o) {
      var index = 0;
      for (i = o.start_date; i <= o.end_date; i++) {
        var _m = now.getMonth() + 1;
        var _y = now.getFullYear();
        var _date = _y + '-' + _m + '-' + i;
        var dateIndex = new Date(_date).getDay();
        var firstLetter = weekday[dateIndex];
        _td = $('<td/>', {'date-attr': _data_year + '-' + _data_month + '-' + parseInt(i, 10), id: 'total' + o.periodName.replace(/\s/g, '') + i + firstLetter });
        _ftr.append(_td);
        index++;
      }
      var _etd = $('<td/>', { class: 'nullTd', style: 'width: 5px; border:0;border-left: 1px solid #ccc;background: transparent;max-width: 5px;' })
      _ftr.append(_etd);
      _ftr.append(_etd);
      /* if (index > 2) {
        var _td = $('<td/>', { class: "nullTd", colspan: (index - 2) });
        _tftr.append(_td);
      } */
      if (index > 1) {
        var _td = $('<td/>', { class: "nullTd", colspan: (index - 1) });
        _tftr.append(_td);
      }
      // tar
      var _td = $('<td/>', { id: o.periodName.replace(/\s/g, '') + 'tottar', class: 'tar' });
      _tftr.append(_td);
      // achive
      /* var _td = $('<td/>', { id: o.periodName.replace(/\s/g, '') + 'totachv', class: 'achv' });
      _tftr.append(_td); */
      // balance
      var _td = $('<td/>', { id: o.periodName.replace(/\s/g, '') + 'totbal', class: 'bal' });
      // _tftr.append(_td);
      var _etd = $('<td/>', { class: 'nullTd', style: 'width: 5px; border:0;border-left: 1px solid #ccc;background: transparent;max-width: 5px;' })
      _tftr.append(_etd);
    });
    if (zc.user.role.value != "sales_executive") {
      $('.sale-summary-report').append(_ftr);
      $('.sale-summary-report').append(_tftr);
    }
    // _tfoot.append(_ftr1);
    // $('.sale-summary-report').append(_tfoot);

    // body
    var _tbody = $('<tbody/>');
    $('.sale-summary-report').append(_tbody);
    $.each(execRes, function (ei, eo) {
      var _tr = $('<tr/>');
      var _tr_tartget_actual = $('<tr/>');
      var _td = $('<td/>', { text: eo.excutiveName, class: 'excutiveNameCls', rowspan: 2 });
      _tr.append(_td);
      $.each(periodRes, function (pi, po) {
        var index = 0;
        for (i = po.start_date; i <= po.end_date; i++) {
          var _m = now.getMonth() + 1;
          var _y = now.getFullYear();
          var _date = _y + '-' + _m + '-' + i;
          var dateIndex = new Date(_date).getDay();
          var firstLetter = weekday[dateIndex];
          _td = $('<td/>', {'date-attr': _data_year + '-' + _data_month + '-' + parseInt(i, 10), id: eo.excutiveName + po.periodName.replace(/\s/g, '') + i + firstLetter });
          _tr.append(_td);
          index++;
        }
        var _etd = $('<td/>', { class: 'nullTd', style: 'width: 5px; border:0;border-left: 1px solid #ccc;background: transparent;max-width: 5px;' })
        _tr.append(_etd);
        /* if (index > 2) {
          _td = $('<td/>', { class: "nullTd", colspan: (index - 2) });
          _tr_tartget_actual.append(_td);
        } */
        if (index > 1) {
          _td = $('<td/>', { class: "nullTd", colspan: (index - 1) });
          _tr_tartget_actual.append(_td);
        }
        // tar
        _td = $('<td/>', { id: eo.excutiveName + po.periodName.replace(/\s/g, '') + 'tar', class: 'tar' });
        _tr_tartget_actual.append(_td);
        // achive
      /*   _td = $('<td/>', { id: eo.excutiveName + po.periodName.replace(/\s/g, '') + 'achv', class: 'achv' });
        _tr_tartget_actual.append(_td); */
        // balance
        _td = $('<td/>', { id: eo.excutiveName + po.periodName.replace(/\s/g, '') + 'bal', class: 'bal' });
        // _tr_tartget_actual.append(_td);
        var _etd = $('<td/>', { class: 'nullTd', style: 'width: 5px; border:0;border-left: 1px solid #ccc;background: transparent;max-width: 5px;' })
        _tr_tartget_actual.append(_etd);
      });
      _tbody.append(_tr);
      _tbody.append(_tr_tartget_actual);
    });

    $.each(periodRes, function (pi, po) {
      $.each(execRes, function (ei, eo) {
        $.each(siteVisits1, function (i, o) {
          if (po.periodName.replace(/\s/g, '') === o.period.replace(/\s/g, '') && eo.excutiveName === o.first_name) {
            var _m = now.getMonth() + 1;
            var _y = now.getFullYear();
            var _date = _y + '-' + _m + '-' + o.day;
            var dateIndex = new Date(_date).getDay();
            var firstLetter = weekday[dateIndex];
            $('#' + o.first_name + po.periodName.replace(/\s/g, '') + o.day.replace(/^0+/, '') + firstLetter).text(o.value);
          }
        });
      });
    });

    $.each(periodRes, function (inx, po) {
      $.each(execRes, function (ind, eo) {
        $.each(siteVisits2, function (index, value) {
          if (po.periodName.replace(/\s/g, '') === value.period.replace(/\s/g, '') && eo.excutiveName === value.excutive) {
            $('#' + value.excutive + value.period.replace(/\s/g, '') + 'tar').text(value.target);
            $('#' + value.excutive + value.period.replace(/\s/g, '') + 'achv').text(value.actual);
            $('#' + value.excutive + value.period.replace(/\s/g, '') + 'bal').text(''); //value.balance
          }
        });
      })
    });


    $.each(periodRes, function (pi, po) {
      $.each(total_val, function (i, o) {
        var _m = now.getMonth() + 1;
        var _y = now.getFullYear();
        var _date = _y + '-' + _m + '-' + o.day;
        var dateIndex = new Date(_date).getDay();
        var firstLetter = weekday[dateIndex];
        if (po.periodName.replace(/\s/g, '') === o.period.replace(/\s/g, '')) {
          $('#total' + o.period.replace(/\s/g, '') + o.day.replace(/^0+/, '') + firstLetter).text(o.value);
        }
      });
    });

    $.each(grandTotals, function (ti, to) {
      $('#' + to.period.replace(/\s/g, '') + 'tottar').text(to.target);
      $('#' + to.period.replace(/\s/g, '') + 'totachv').text(to.actual);
      $('#' + to.period.replace(/\s/g, '') + 'totbal').text(''); // to.balance
    });
    // $.each(periodRes, function (pi, po) {
    //   var index = 0;
    //   for (i = po.start_date; i <= po.end_date; i++) {
    //     var dateIndex = new Date().getDate();

    //       $('.sale-summary-report td').each(function (){

    //         if(($(this).text() === "") && (!$(this).hasClass('nullTd')) && ((i = "01"?1:i) <= parseInt(dateIndex))) {
    //           console.log('i <= dateIndex', i, dateIndex);
    //           $(this).text('0');
    //         }
    //       })
    //     }
    // })
    var _data_year = parseInt(monthInfo[0].monthName.split('-')[0], 10);
    var _data_month = parseInt(monthInfo[0].monthName.split('-')[1], 10) - 1;

    var now = new Date();
    var daysOfYear = [];
    for (var d = new Date(_data_year, _data_month, 1); d <= now && d.getMonth() == _data_month; d.setDate(d.getDate() + 1)) {
      var _cdate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
      $.each($('td[date-attr="' + _cdate + '"]'), function (j, k) {
        if ($.trim($(this).text()).length == 0) {
          $(this).text("0");
        }
      });

    }
  } else if (by_category === "by-channel") {
    // footer
    // var _tfoot = $('<tfoot/>', { class: 'executive-vs-sales-footer',style:'text-align:left;font-weight:bold;' });
    var _ftr = $('<tr/>', { class: 'footer-cls' });
    var _tftr = $('<tr/>', { class: 'footer-cls' });
    var _td = $('<td/>', { text: 'Total', rowspan: 2, class: 'totalCls' })
    _ftr.append(_td);
    var _data_year = monthInfo[0].monthName.split('-')[0];
    var _data_month = monthInfo[0].monthName.split('-')[1];
    $.each(periodRes, function (i, o) {
      var index = 0;
      for (i = o.start_date; i <= o.end_date; i++) {
        var _m = now.getMonth() + 1;
        var _y = now.getFullYear();
        var _date = _y + '-' + _m + '-' + i;
        var dateIndex = new Date(_date).getDay();
        var firstLetter = weekday[dateIndex];
        _td = $('<td/>', {'date-attr': _data_year + '-' + _data_month + '-' + parseInt(i, 10), id: 'total' + o.periodName.replace(/\s/g, '') + i + firstLetter });
        _ftr.append(_td);
        index++;
      }
      var _etd = $('<td/>', { class: 'nullTd', style: 'width: 5px; border:0;border-left: 1px solid #ccc;background: transparent;max-width: 5px;' })
      _ftr.append(_etd);
      if (index > 1) {
        var _td = $('<td/>', { class: "nullTd", colspan: (index - 1) });
        _tftr.append(_td);
      }
      /* if (index > 2) {
        var _td = $('<td/>', { class: "nullTd", colspan: (index - 2) });
        _tftr.append(_td);
      } */
      // tar
      var _td = $('<td/>', { id: o.periodName.replace(/\s/g, '') + 'tottar', class: 'tar' });
      _tftr.append(_td);
      // achive
      /* var _td = $('<td/>', { id: o.periodName.replace(/\s/g, '') + 'totachv', class: 'achv' });
      _tftr.append(_td); */
      // balance
      var _td = $('<td/>', { id: o.periodName.replace(/\s/g, '') + 'totbal', class: 'bal' });
      // _tftr.append(_td);
      var _etd = $('<td/>', { class: 'nullTd', style: 'width: 5px; border:0;border-left: 1px solid #ccc;background: transparent;max-width: 5px;' })
      _tftr.append(_etd);
    });
    if (zc.user.role.value != "sales_executive") {
      $('.sale-summary-report').append(_ftr);
      $('.sale-summary-report').append(_tftr);
      // $('.sale-summary-report').append(_tfoot);
    }
    // body
    var _tbody = $('<tbody/>');
    $('.sale-summary-report').append(_tbody);
    $.each(channelsRes, function (ei, eo) {
      var _tr = $('<tr/>');
      var _tr_tartget_actual = $('<tr/>');
      var _td = $('<td/>', {'date-attr': _data_year + '-' + _data_month + '-' + parseInt(i, 10), text: eo.channelName, class: 'channelDetails', style: 'background: ' + channelBgColor[ei] + '', rowspan: 2 });
      _tr.append(_td);
      $.each(periodRes, function (pi, po) {
        var index = 0;
        for (i = po.start_date; i <= po.end_date; i++) {
          var _m = now.getMonth() + 1;
          var _y = now.getFullYear();
          var _date = _y + '-' + _m + '-' + i;
          var dateIndex = new Date(_date).getDay();
          var firstLetter = weekday[dateIndex];
          _td = $('<td/>', {'date-attr': _data_year + '-' + _data_month + '-' + parseInt(i, 10), id: eo.channelName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + i + firstLetter });
          _tr.append(_td);
          index++;
        }
        var _etd = $('<td/>', { class: 'nullTd', style: 'width: 5px; border:0;border-left: 1px solid #ccc;background: transparent;max-width: 5px;' })
        _tr.append(_etd);
        /* if (index > 2) {
          _td = $('<td/>', { class: "nullTd", colspan: (index - 2) });
          _tr_tartget_actual.append(_td);
        } */
        if (index > 1) {
          _td = $('<td/>', { class: "nullTd", colspan: (index - 1) });
          _tr_tartget_actual.append(_td);
        }
        // tar
        _td = $('<td/>', { id: eo.channelName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + 'tar', class: 'tar' });
        _tr_tartget_actual.append(_td);
        // achive
       /*  _td = $('<td/>', { id: eo.channelName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + 'achv', class: 'achv' });
        _tr_tartget_actual.append(_td); */
        // balance
        _td = $('<td/>', { id: eo.channelName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + 'bal', class: 'bal' });
        // _tr_tartget_actual.append(_td);
        var _etd = $('<td/>', { class: 'nullTd', style: 'width: 5px; border:0;border-left: 1px solid #ccc;background: transparent;max-width: 5px;' })
        _tr_tartget_actual.append(_etd);
      });
      _tbody.append(_tr);
      _tbody.append(_tr_tartget_actual);
    });


    $.each(periodRes, function (pi, po) {
      $.each(channelsRes, function (ei, eo) {
        $.each(siteVisits1, function (i, o) {
          if (po.periodName.replace(/\s/g, '') === o.period.replace(/\s/g, '') && eo.channelName.replace(/\s/g, '') === o.channel.replace(/\s/g, '')) {
            var _m = now.getMonth() + 1;
            var _y = now.getFullYear();
            var _date = _y + '-' + _m + '-' + o.day.replace(/^0+/, '');
            var dateIndex = new Date(_date).getDay();
            var firstLetter = weekday[dateIndex];
            $('#' + o.channel.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + o.day.replace(/^0+/, '') + firstLetter).text(o.value);
          }
        });
      });
    });

    $.each(periodRes, function (inx, po) {
      $.each(channelsRes, function (ind, eo) {
        $.each(siteVisits2, function (index, value) {
          if (po.periodName.replace(/\s/g, '') === value.period.replace(/\s/g, '') && eo.channelName.replace(/\s/g, '') === value.channel_name.replace(/\s/g, '')) {
            $('#' + value.channel_name.replace(/\s/g, '') + value.period.replace(/\s/g, '') + 'tar').text(value.target);
            $('#' + value.channel_name.replace(/\s/g, '') + value.period.replace(/\s/g, '') + 'achv').text(value.actual);
            $('#' + value.channel_name.replace(/\s/g, '') + value.period.replace(/\s/g, '') + 'bal').text(''); //value.balance
          }
        })

      })
    });

    $.each(periodRes, function (pi, po) {
      $.each(total_val, function (i, o) {
        var _m = now.getMonth() + 1;
        var _y = now.getFullYear();
        var _date = _y + '-' + _m + '-' + o.day;
        var dateIndex = new Date(_date).getDay();
        var firstLetter = weekday[dateIndex];
        if (po.periodName.replace(/\s/g, '') === o.period.replace(/\s/g, '')) {
          $('#total' + idCreator(o.period.replace(/\s/g, '') + o.day.replace(/^0+/, '') + firstLetter)).text(o.value);
        }
      });
    });
    $.each(grandTotals, function (ti, to) {
      $('#' + to.period.replace(/\s/g, '') + 'tottar').text(to.target);
      $('#' + to.period.replace(/\s/g, '') + 'totachv').text(to.actual);
      $('#' + to.period.replace(/\s/g, '') + 'totbal').text('');// to.balance
    });
    var _data_year = parseInt(monthInfo[0].monthName.split('-')[0], 10);
    var _data_month = parseInt(monthInfo[0].monthName.split('-')[1], 10) - 1;

    var now = new Date();
    var daysOfYear = [];
    for (var d = new Date(_data_year, _data_month, 1); d <= now && d.getMonth() == _data_month; d.setDate(d.getDate() + 1)) {
      var _cdate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
      $.each($('td[date-attr="' + _cdate + '"]'), function (j, k) {
        if ($.trim($(this).text()).length == 0) {
          $(this).text("0");
        }
      });

    }

  }

  // $('.excutiveNameCls').click(function () {
  //   detailsFunByEmp(this);
  // });

  // $('.channelDetails').click(function () {
  //   detailsFunByChn(this);
  // });
}

function idCreator(channels) {
  return channels.replace('\/', '_');
}

function detailsFunByEmp(e) {
  var now = new Date(month);
  console.log('now', now);
  $('.sale-info').html('');
  $('.sale-info-name').html('');
  var _execName = $(e).text();
  $('.sale-info-name').append('<h3>' + _execName + ' sale summary</h3>');
  var _thead = $('<thead/>')
  var _htr = $('<tr/>');
  var _htr2 = $('<tr/>');
  var _th = $('<th/>');
  _htr.append(_th);
  var _th = $('<th/>');
  _htr2.append(_th);

  $.each(periodRes, function (pi, po) {
    for (i = po.start_date; i <= po.end_date; i++) {
      var _m = now.getMonth() + 1;
      var _y = now.getFullYear();
      var _date = _y + '-' + _m + '-' + i;
      var dateIndex = new Date(_date).getDay();
      var firstLetter = weekday[dateIndex];
      let firstChar = firstLetter.charAt(0);
      var _pdth = $('<th/>', { text: firstChar });
      _htr.append(_pdth);
      var _dTh = $('<th/>', { text: (i === '01' ? 1 : i) });
      _htr2.append(_dTh);
    }
    var _eth = $('<th/>', { style: 'width: 5px', class: 'extra' });
    _htr.append(_eth);
    var _eth = $('<th/>', { style: 'width: 5px', class: 'extra' });
    _htr2.append(_eth);
  });
  _thead.append(_htr);
  _thead.append(_htr2);
  $('.sale-info').append(_thead);


  var _tbody = $('<tbody/>');
  $('.sale-info').append(_tbody);
  $.each(execRes, function (ei, eo) {
    if (_execName === eo.excutiveName) {
      var _tr = $('<tr/>');
      var _tr_tartget_actual = $('<tr/>');
      var _td = $('<td/>', { text: eo.excutiveName, class: 'excutiveNameCls', rowspan: 2 });
      _tr.append(_td);
      $.each(periodRes, function (pi, po) {
        var index = 0;
        for (i = po.start_date; i <= po.end_date; i++) {
          var _m = now.getMonth() + 1;
          var _y = now.getFullYear();
          var _date = _y + '-' + _m + '-' + i;
          var dateIndex = new Date(_date).getDay();
          var firstLetter = weekday[dateIndex];
          _td = $('<td/>', { class: eo.excutiveName + po.periodName.replace(/\s/g, '') + i + firstLetter });
          _tr.append(_td);
          index++;
        }
        var _etd = $('<td/>', { class: 'nullTd', style: 'width: 5px; border:0;border-left: 1px solid #ccc;background: transparent;max-width: 5px;' })
        _tr.append(_etd);
        if (index > 2) {
          _td = $('<td/>', { class: "nullTd", colspan: (index - 2) });
          _tr_tartget_actual.append(_td);
        }
        // tar
        _td = $('<td/>', { class: eo.excutiveName + po.periodName.replace(/\s/g, '') + 'tar' + ' ' + 'tar' });
        _tr_tartget_actual.append(_td);
        // achive
        _td = $('<td/>', { class: eo.excutiveName + po.periodName.replace(/\s/g, '') + 'achv' + ' ' + 'achv' });
        _tr_tartget_actual.append(_td);
        // balance
        _td = $('<td/>', { class: eo.excutiveName + po.periodName.replace(/\s/g, '') + 'bal' + ' ' + 'bal' });
        _tr_tartget_actual.append(_td);
        var _etd = $('<td/>', { class: 'nullTd', style: 'width: 5px; border:0;border-left: 1px solid #ccc;background: transparent;max-width: 5px;' })
        _tr_tartget_actual.append(_etd);
      });
      _tbody.append(_tr);
      _tbody.append(_tr_tartget_actual);
    }
  });

  // var _tfoot = $('<tfoot/>', { class: 'executive-vs-sales-footer' });
  // var _ftr = $('<tr/>');
  // var _td = $('<td/>', { text: 'Total', class: 'totalCls' })
  // _ftr.append(_td);
  // // var _ftr1 = $('<tr/>');
  // $.each(periodRes, function (i, o) {
  //   var index = 0;
  //   for (i = o.start_date; i <= o.end_date; i++) {
  //     var _m = now.getMonth() + 1;
  //     var _y = now.getFullYear();
  //     var _date = _y + '-' + _m + '-' + i;
  //     var dateIndex = new Date(_date).getDay();
  //     var firstLetter = weekday[dateIndex];
  //     _td = $('<td/>', { class: 'total' + o.periodName.replace(/\s/g, '') + i + firstLetter });
  //     _ftr.append(_td);
  //     index++;
  //   }
  //   var _etd = $('<td/>', { style: 'width: 5px; border:0;border-left: 1px solid #ccc;background: transparent;max-width: 5px;' })
  //   _ftr.append(_etd);
  // });
  // _tfoot.append(_ftr);
  // // _tfoot.append(_ftr1);
  // $('.sale-info').append(_tfoot);

  $.each(periodRes, function (pi, po) {
    $.each(execRes, function (ei, eo) {
      $.each(siteVisits1, function (i, o) {
        if (po.periodName.replace(/\s/g, '') === o.period.replace(/\s/g, '') && eo.excutiveName === o.first_name) {
          var _m = now.getMonth() + 1;
          var _y = now.getFullYear();
          var _date = _y + '-' + _m + '-' + o.day;
          var dateIndex = new Date(_date).getDay();
          var firstLetter = weekday[dateIndex];
          $('.' + o.first_name + po.periodName.replace(/\s/g, '') + o.day.replace(/^0+/, '') + firstLetter).text(o.value);
        }
      });
    });
  });

  $.each(periodRes, function (inx, po) {
    $.each(execRes, function (ind, eo) {
      $.each(siteVisits2, function (index, value) {
        if (po.periodName.replace(/\s/g, '') === value.period.replace(/\s/g, '') && eo.excutiveName === value.excutive) {
          $('.' + value.excutive + value.period.replace(/\s/g, '') + 'tar').text(value.target);
          $('.' + value.excutive + value.period.replace(/\s/g, '') + 'achv').text(value.actual);
          $('.' + value.excutive + value.period.replace(/\s/g, '') + 'bal').text(''); //value.balance
        }
      })

    })
  });


  $.each(periodRes, function (pi, po) {
    $.each(total_val, function (i, o) {
      var _m = now.getMonth() + 1;
      var _y = now.getFullYear();
      var _date = _y + '-' + _m + '-' + o.day;
      var dateIndex = new Date(_date).getDay();
      var firstLetter = weekday[dateIndex];
      if (po.periodName.replace(/\s/g, '') === o.period.replace(/\s/g, '')) {
        $('.total' + o.period.replace(/\s/g, '') + firstLetter).text(o.value);
      }
    });
  });
}

function detailsFunByChn(e) {
  var now = new Date(month);
  $('.sale-info').html('');
  $('.sale-info-name').html('');
  var _channelName = $(e).text();
  $('.sale-info-name').append('<h3>' + _channelName + ' sale summary</h3>');
  var _thead = $('<thead/>')
  var _htr = $('<tr/>');
  var _htr2 = $('<tr/>');
  var _th = $('<th/>');
  _htr.append(_th);
  var _th = $('<th/>');
  _htr2.append(_th);

  $.each(periodRes, function (pi, po) {
    for (i = po.start_date; i <= po.end_date; i++) {
      var _m = now.getMonth() + 1;
      var _y = now.getFullYear();
      var _date = _y + '-' + _m + '-' + i;
      var dateIndex = new Date(_date).getDay();
      var firstLetter = weekday[dateIndex];
      let firstChar = firstLetter.charAt(0);
      var _pdth = $('<th/>', { text: firstChar });
      _htr.append(_pdth);
      var _dTh = $('<th/>', { text: (i === '01' ? 1 : i) });
      _htr2.append(_dTh);
    }
    var _eth = $('<th/>', { style: 'width: 5px', class: 'extra' });
    _htr.append(_eth);
    var _eth = $('<th/>', { style: 'width: 5px', class: 'extra' });
    _htr2.append(_eth);
  });
  _thead.append(_htr);
  _thead.append(_htr2);
  $('.sale-info').append(_thead);


  var _tbody = $('<tbody/>');
  $('.sale-info').append(_tbody);
  $.each(channelsRes, function (ei, eo) {
    if (_channelName === eo.channelName) {
      var _tr = $('<tr/>');
      var _tr_tartget_actual = $('<tr/>');
      var _td = $('<td/>', { text: eo.channelName, class: 'channelDetails', style: 'background: ' + channelBgColor[ei] + '', rowspan: 2 });
      _tr.append(_td);
      $.each(periodRes, function (pi, po) {
        var index = 0;
        for (i = po.start_date; i <= po.end_date; i++) {
          var _m = now.getMonth() + 1;
          var _y = now.getFullYear();
          var _date = _y + '-' + _m + '-' + i;
          var dateIndex = new Date(_date).getDay();
          var firstLetter = weekday[dateIndex];
          _td = $('<td/>', { class: eo.channelName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + i + firstLetter });
          _tr.append(_td);
          index++;
        }
        var _etd = $('<td/>', { class: 'nullTd', style: 'width: 5px; border:0;border-left: 1px solid #ccc;background: transparent;max-width: 5px;' })
        _tr.append(_etd);
        if (index > 2) {
          _td = $('<td/>', { class: "nullTd", colspan: (index - 2) });
          _tr_tartget_actual.append(_td);
        }
        // tar
        _td = $('<td/>', { class: eo.channelName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + 'tar' + ' ' + 'tar' });
        _tr_tartget_actual.append(_td);
        // achive
        _td = $('<td/>', { class: eo.channelName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + 'achv' + ' ' + 'achv' });
        _tr_tartget_actual.append(_td);
        // balance
        _td = $('<td/>', { class: eo.channelName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + 'bal' + ' ' + 'bal' });
        _tr_tartget_actual.append(_td);
        var _etd = $('<td/>', { class: 'nullTd', style: 'width: 5px; border:0;border-left: 1px solid #ccc;background: transparent;max-width: 5px;' })
        _tr_tartget_actual.append(_etd);
      });
      _tbody.append(_tr);
      _tbody.append(_tr_tartget_actual);
    }
  });

  // var _tfoot = $('<tfoot/>', { class: 'executive-vs-sales-footer' });
  // var _ftr = $('<tr/>');
  // var _td = $('<td/>', { text: 'Total', class: 'totalCls' })
  // _ftr.append(_td);
  // $.each(periodRes, function (i, o) {
  //   var index = 0;
  //   for (i = o.start_date; i <= o.end_date; i++) {
  //     var _m = now.getMonth() + 1;
  //     var _y = now.getFullYear();
  //     var _date = _y + '-' + _m + '-' + i;
  //     var dateIndex = new Date(_date).getDay();
  //     var firstLetter = weekday[dateIndex];
  //     _td = $('<td/>', { class: 'total' + o.periodName.replace(/\s/g, '') + i + firstLetter });
  //     _ftr.append(_td);
  //     index++;
  //   }
  //   var _etd = $('<td/>', { style: 'width: 5px; border:0;border-left: 1px solid #ccc;background: transparent;max-width: 5px;' })
  //   _ftr.append(_etd);
  // });
  // _tfoot.append(_ftr);
  // $('.sale-info').append(_tfoot);

  $.each(periodRes, function (pi, po) {
    $.each(channelsRes, function (ei, eo) {
      $.each(siteVisits1, function (i, o) {
        if (po.periodName.replace(/\s/g, '') === o.period.replace(/\s/g, '') && eo.channelName.replace(/\s/g, '') === o.channel.replace(/\s/g, '')) {
          var _m = now.getMonth() + 1;
          var _y = now.getFullYear();
          var _date = _y + '-' + _m + '-' + o.day.replace(/^0+/, '');
          var dateIndex = new Date(_date).getDay();
          var firstLetter = weekday[dateIndex];
          $('.' + o.channel.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + o.day.replace(/^0+/, '') + firstLetter).text(o.value);
        }
      });
    });
  });

  $.each(periodRes, function (inx, po) {
    $.each(channelsRes, function (ind, eo) {
      $.each(siteVisits2, function (index, value) {
        if (po.periodName.replace(/\s/g, '') === value.period.replace(/\s/g, '') && eo.channelName.replace(/\s/g, '') === value.channel_name.replace(/\s/g, '')) {
          $('.' + value.channel_name.replace(/\s/g, '') + value.period.replace(/\s/g, '') + 'tar').text(value.target);
          $('.' + value.channel_name.replace(/\s/g, '') + value.period.replace(/\s/g, '') + 'achv').text(value.actual);
          $('.' + value.channel_name.replace(/\s/g, '') + value.period.replace(/\s/g, '') + 'bal').text(''); //value.balance
        }
      })

    })
  });


  $.each(periodRes, function (pi, po) {
    $.each(total_val, function (i, o) {

      var _m = now.getMonth() + 1;
      var _y = now.getFullYear();
      var _date = _y + '-' + _m + '-' + o.day;
      var dateIndex = new Date(_date).getDay();
      var firstLetter = weekday[dateIndex];
      if (po.periodName.replace(/\s/g, '') === o.period.replace(/\s/g, '')) {
        $('.total' + idCreator(o.period.replace(/\s/g, '') + o.day.replace(/^0+/, '') + firstLetter)).text(o.value);
      }
    });
  });
}
