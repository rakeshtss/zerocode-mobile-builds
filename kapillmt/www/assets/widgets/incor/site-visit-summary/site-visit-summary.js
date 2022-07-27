if (window.jQuery) {
  var currentDate = new Date();
  var month = currentDate.getFullYear() + '-' + (parseInt(currentDate.getMonth()) + 1) + '-1';
  var by_category = "by-channel";
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
    if (zc.form_2851 && zc.form_2851.model.by_channel.uid) {
      by_category = zc.form_2851.model.by_channel.uid;
    }
    if (zc.form_2851 && zc.form_2851.model.month) {
      month = zc.form_2851.model.month
    } else {
      window.zc.form_2851.model.month = month;
    }
    url = zc.config.apiUrl + zc.config.app + '/api/incor/reports/site-visit-summary/site-visit-summary';
    var payload = { project: { uid: zc.wdProjectForm.model.project.uid, month: month, by_category: by_category } };
    zc_req('/api/incor/reports/site-visit-summary/site-visit-summary', payload, function (response) {
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
        target_total = response.data.listData.zc_extra.data6;
        all_total = response.data.listData.zc_extra.data7;
        overall_total = response.data.listData.zc_extra.data8;
        monthInfo = response.data.listData.zc_extra.data9;
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
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var channelBgColor = ["#70c149", "#e6b211", "#ee5545", "#3fb4d8", "#9a6ab6", "#ae8c4c", "#34aeeb", "#92eb34", "#742cf2"];

function reloadData() {
  $('.site-visit-summary').html('');
  var now = new Date(month);
  var _month = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  var i = 1;
  var _thead = $('<thead/>')
  var _htr = $('<tr/>');
  var _htr2 = $('<tr/>');
  var _th = $('<th/>', { rowspan: 2, text: monthNames[now.getMonth()] + '-' + now.getFullYear().toString().substr(-2), style: 'background: transparent;color: #000000;' });
  _htr.append(_th);
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
    var _th = $('<th/>');
    _htr.append(_th);
    var _th = $('<th/>');
    _htr.append(_th);
    var _eth = $('<th/>', { style: 'width: 5px', class: 'extra' });
    _htr.append(_eth);
    var _th = $('<th/>', { text: 'TOT' });
    _htr2.append(_th);
    var _th = $('<th/>', { text: 'TAR' });
    _htr2.append(_th);
    var _eth = $('<th/>', { style: 'width: 5px', class: 'extra' });
    _htr2.append(_eth);
  });
  var _totTh = $('<th/>', { rowspan: 2, text: 'OVERALL' });
  _htr.append(_totTh);
  _thead.append(_htr);
  _thead.append(_htr2);
  $('.site-visit-summary').append(_thead);


  if (by_category === "by-channel") {

    // footer
    // var _tfoot = $('<tfoot/>', { class: 'executive-vs-sales-footer' });
    var _ftr = $('<tr/>', { class: 'tfoot-cls' });
    var _ftr2 = $('<tr/>', { class: 'tfoot-cls' });
    var _ftr3 = $('<tr/>', { class: 'tfoot-cls' });
    var _td = $('<td/>', { text: 'Total', class: 'totalCls', rowspan: 3 })
    _ftr.append(_td);
    var _td = $('<td/>', { text: 'USV' });
    _ftr.append(_td);
    var _td = $('<td/>', { text: 'RSV' });
    _ftr2.append(_td);
    var _td = $('<td/>', { text: 'TSV' });
    _ftr3.append(_td);
    var _data_year = monthInfo[0].monthName.split('-')[0];
    var _data_month = monthInfo[0].monthName.split('-')[1];
    $.each(periodRes, function (i, o) {
      var index = 0;
      // usv total
      for (i = o.start_date; i <= o.end_date; i++) {
        var _m = now.getMonth() + 1;
        var _y = now.getFullYear();
        var _date = _y + '-' + _m + '-' + i;
        var dateIndex = new Date(_date).getDay();
        var firstLetter = weekday[dateIndex];
        _td = $('<td/>', { 'date-attr': _data_year + '-' + _data_month + '-' + parseInt(i, 10), id: 'totalusv' + o.periodName.replace(/\s/g, '') + (i === '01' ? 1 : i) + firstLetter });
        _ftr.append(_td);
        index++;
      }
      // var _td = $('<td/>', { id: 'alltotalusv' + o.periodName.replace(/\s/g, '') + firstLetter });
      var _td = $('<td/>', { 'date-attr': _data_year + '-' + _data_month + '-' + parseInt(i, 10), id: 'alltotalusv' + o.periodName.replace(/\s/g, '') });
      _ftr.append(_td);
      // var _td = $('<td/>', { id: 'usvtar' + o.periodName.replace(/\s/g, ''), style: 'background:#8de34c;' });
      var _td = $('<td/>');
      _ftr.append(_td);
      var _etd = $('<td/>', { class: 'nullTd', style: 'width: 5px; border:0;border-left: 1px solid #ccc;background: transparent;max-width: 5px;' })
      _ftr.append(_etd);

      // rsv total
      for (i = o.start_date; i <= o.end_date; i++) {
        var _m = now.getMonth() + 1;
        var _y = now.getFullYear();
        var _date = _y + '-' + _m + '-' + i;
        var dateIndex = new Date(_date).getDay();
        var firstLetter = weekday[dateIndex];
        _td = $('<td/>', { 'date-attr': _data_year + '-' + _data_month + '-' + parseInt(i, 10), id: 'totalrsv' + o.periodName.replace(/\s/g, '') + (i === '01' ? 1 : i) + firstLetter });
        _ftr2.append(_td);
        index++;
      }
      // var _td = $('<td/>', { id: 'alltotalrsv' + o.periodName.replace(/\s/g, '') + firstLetter });
      var _td = $('<td/>', { 'date-attr': _data_year + '-' + _data_month + '-' + parseInt(i, 10), id: 'alltotalrsv' + o.periodName.replace(/\s/g, '') });
      _ftr2.append(_td);
      // var _td = $('<td/>', { id: 'rsvtar' + o.periodName.replace(/\s/g, ''), style: 'background:#ff8383;' });
      var _td = $('<td/>');
      _ftr2.append(_td);
      var _etd = $('<td/>', { class: 'nullTd', style: 'width: 5px; border:0;border-left: 1px solid #ccc;background: transparent;max-width: 5px;' })
      _ftr2.append(_etd);

      // tsv total
      for (i = o.start_date; i <= o.end_date; i++) {
        var _m = now.getMonth() + 1;
        var _y = now.getFullYear();
        var _date = _y + '-' + _m + '-' + i;
        var dateIndex = new Date(_date).getDay();
        var firstLetter = weekday[dateIndex];
        _td = $('<td/>', { 'date-attr': _data_year + '-' + _data_month + '-' + parseInt(i, 10), id: 'totaltsv' + o.periodName.replace(/\s/g, '') + (i === '01' ? 1 : i) + firstLetter });
        _ftr3.append(_td);
        index++;
      }
      // var _td = $('<td/>', { id: 'alltotaltsv' + o.periodName.replace(/\s/g, '') + firstLetter });
      var _td = $('<td/>', { 'date-attr': _data_year + '-' + _data_month + '-' + parseInt(i, 10),id: 'alltotaltsv' + o.periodName.replace(/\s/g, '') });
      _ftr3.append(_td);
      // var _td = $('<td/>', {id: 'tsvtar' + o.periodName.replace(/\s/g, '') , style: 'background:#40b5d9;' });
      // var _td = $('<td/>', { style: 'background:#ffe0c1;' });
      var _td = $('<td/>', { id: 'usvtar' + o.periodName.replace(/\s/g, ''), style: 'background:#8de34c;' });
      _ftr3.append(_td);
      var _etd = $('<td/>', { class: 'nullTd', style: 'width: 5px; border:0;border-left: 1px solid #ccc;background: transparent;max-width: 5px;' })
      _ftr3.append(_etd);
    });
    // overall totals
    var _totTd = $('<td/>', { id: 'overallUsvTot', style: 'border-right:1px solid #ccc;' });
    _ftr.append(_totTd);
    var _totTd = $('<td/>', { id: 'overallRsvTot', style: 'border-right:1px solid #ccc;' });
    _ftr2.append(_totTd);
    var _totTd = $('<td/>', { id: 'overallTsvTot', style: 'border-right:1px solid #ccc;' });
    _ftr3.append(_totTd);
    if (zc.user.role.value != "sales_executive") {
      $('.site-visit-summary').append(_ftr);
      $('.site-visit-summary').append(_ftr2);
      $('.site-visit-summary').append(_ftr3);
    }
    // $('.site-visit-summary').append(_tfoot);

    // body
    var _tbody = $('<tbody/>');
    $('.site-visit-summary').append(_tbody);
    $.each(channelsRes, function (ei, eo) {
      var _tr = $('<tr/>');
      var _tr2 = $('<tr/>');
      var _tr3 = $('<tr/>');
      var _td = $('<td/>', { text: eo.channelName, class: 'channelDetails', style: 'background: ' + channelBgColor[ei] + '', rowspan: 3 });
      _tr.append(_td);

      // USV
      var _td = $('<td/>', { text: 'USV', style: 'text-align:center;' });
      _tr.append(_td);
      $.each(periodRes, function (pi, po) {
        var index = 0;
        for (i = po.start_date; i <= po.end_date; i++) {
          var _m = now.getMonth() + 1;
          var _y = now.getFullYear();
          var _date = _y + '-' + _m + '-' + i;
          var dateIndex = new Date(_date).getDay();
          var firstLetter = weekday[dateIndex];
          _td = $('<td/>', { 'date-attr': _data_year + '-' + _data_month + '-' + parseInt(i, 10), id: 'usv' + eo.channelName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + (i === '01' ? 1 : i) + firstLetter });
          _tr.append(_td);
          index++;
        }
        var _td = $('<td/>', { 'wtotal-date-attr': _data_year + '-' + _data_month + '-'+pi, id: 'usvtar' + eo.channelName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') });
        _tr.append(_td);
        // tar
        // _td = $('<td/>', { id: 'usv' + eo.channelName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + 'tar', class: 'tar' });
        _td = $('<td/>');
        _tr.append(_td);
        var _etd = $('<td/>', { class: 'nullTd', style: 'width: 5px; border:0;border-left: 1px solid #ccc;background: transparent;max-width: 5px;' })
        _tr.append(_etd);
      });
      _tbody.append(_tr);

      // RSV
      var _td = $('<td/>', { text: 'RSV', style: 'text-align:center;' });
      _tr2.append(_td);
      $.each(periodRes, function (pi, po) {
        var index = 0;
        for (i = po.start_date; i <= po.end_date; i++) {
          var _m = now.getMonth() + 1;
          var _y = now.getFullYear();
          var _date = _y + '-' + _m + '-' + i;
          var dateIndex = new Date(_date).getDay();
          var firstLetter = weekday[dateIndex];
          _td = $('<td/>', { 'date-attr': _data_year + '-' + _data_month + '-' + parseInt(i, 10), id: 'rsv' + eo.channelName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + (i === '01' ? 1 : i) + firstLetter });
          _tr2.append(_td);
          index++;
        }
        var _td = $('<td/>', { 'wtotal-date-attr': _data_year + '-' + _data_month + '-'+pi, id: 'rsvtar' + eo.channelName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') });
        _tr2.append(_td);
        // achive
        // _td = $('<td/>', { id: 'rsv' + eo.channelName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + 'achv', class: 'achv' });
        _td = $('<td/>');
        _tr2.append(_td);
        var _etd = $('<td/>', { class: 'nullTd', style: 'width: 5px; border:0;border-left: 1px solid #ccc;background: transparent;max-width: 5px;' })
        _tr2.append(_etd);
      });
      _tbody.append(_tr2);

      // TSV
      var _td = $('<td/>', { text: 'TSV', style: 'text-align:center;' });
      _tr3.append(_td);
      $.each(periodRes, function (pi, po) {
        var index = 0;
        for (i = po.start_date; i <= po.end_date; i++) {
          var _m = now.getMonth() + 1;
          var _y = now.getFullYear();
          var _date = _y + '-' + _m + '-' + i;
          var dateIndex = new Date(_date).getDay();
          var firstLetter = weekday[dateIndex];
          _td = $('<td/>', { 'date-attr': _data_year + '-' + _data_month + '-' + parseInt(i, 10), id: 'tsv' + eo.channelName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + (i === '01' ? 1 : i) + firstLetter });
          _tr3.append(_td);
          index++;
        }
        var _td = $('<td/>', {'wtotal-date-attr': _data_year + '-' + _data_month + '-'+pi, id: 'tsvtar' + eo.channelName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') });
        _tr3.append(_td);
        // balance
        // _td = $('<td/>', { id: 'tsv' + eo.channelName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + 'bal', class: 'bal' });
        // _td = $('<td/>');
        _td = $('<td/>', { id: 'usv' + eo.channelName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + 'tar', class: 'tar' });
        _tr3.append(_td);
        var _etd = $('<td/>', { class: 'nullTd', style: 'width: 5px; border:0;border-left: 1px solid #ccc;background: transparent;max-width: 5px;' })
        _tr3.append(_etd);
      });
      _tbody.append(_tr3);

      // overall totals
      var _totTd = $('<td/>', { id: 'allUsvTot' + eo.channelName.replace(/\s/g, ''), style: 'border-right:1px solid #ccc;' });
      _tr.append(_totTd);
      var _totTd = $('<td/>', { id: 'allRsvTot' + eo.channelName.replace(/\s/g, ''), style: 'border-right:1px solid #ccc;' });
      _tr2.append(_totTd);
      var _totTd = $('<td/>', { id: 'allTsvTot' + eo.channelName.replace(/\s/g, ''), style: 'border-right:1px solid #ccc;' });
      _tr3.append(_totTd);
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

            $('#usv' + o.channel.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + o.day.replace(/^0+/, '') + firstLetter).text(o.usv);
            $('#rsv' + o.channel.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + o.day.replace(/^0+/, '') + firstLetter).text(o.rsv);
            $('#tsv' + o.channel.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + o.day.replace(/^0+/, '') + firstLetter).text(o.total);
          }
        });
      });
    });

    $.each(periodRes, function (inx, po) {
      $.each(channelsRes, function (ind, eo) {
        $.each(siteVisits2, function (index, value) {
          if (po.periodName.replace(/\s/g, '') === value.period.replace(/\s/g, '') && eo.channelName.replace(/\s/g, '') === value.channel_name.replace(/\s/g, '')) {

            $('#usv' + value.channel_name.replace(/\s/g, '') + value.period.replace(/\s/g, '') + 'tar').text(value.target);
            $('#rsv' + value.channel_name.replace(/\s/g, '') + value.period.replace(/\s/g, '') + 'achv').text(value.actual);
            $('#tsv' + value.channel_name.replace(/\s/g, '') + value.period.replace(/\s/g, '') + 'bal').text(value.balance);
          }
        })
      })
    });
    var totUSV = 0; //alltotalusv
    var totRSV = 0; //alltotalrsv
    var totTSV = 0; //alltotaltsv
    $.each(periodRes, function (inx, po) {
      var usvTar = 0;
      var rsvTar = 0;
      var tsvTar = 0;
      $.each(channelsRes, function (ind, eo) {
        console.log('eo', eo);
        if (eo.channelName !== null) {
          $.each(siteVisits2, function (index, value) {
            if (po.periodName.replace(/\s/g, '') === value.period.replace(/\s/g, '') && eo.channelName === value.channel_name) {

              $('#usv' + value.channel_name.replace(/\s/g, '') + value.period.replace(/\s/g, '') + 'tar').text(value.target);
              $('#rsv' + value.channel_name.replace(/\s/g, '') + value.period.replace(/\s/g, '') + 'achv').text(value.actual);
              $('#tsv' + value.channel_name.replace(/\s/g, '') + value.period.replace(/\s/g, '') + 'bal').text(value.balance);
              usvTar += value.target;
              rsvTar += value.actual;
              tsvTar += value.balance;
              $('#usvtar' + value.period.replace(/\s/g, '')).text(usvTar);
              $('#rsvtar' + value.period.replace(/\s/g, '')).text(rsvTar);
              $('#tsvtar' + value.period.replace(/\s/g, '')).text(tsvTar);
            }
          });
        }
      });
    });
    $.each(periodRes, function (pi, po) {
      $.each(total_val, function (i, o) {
        var _m = now.getMonth() + 1;
        var _y = now.getFullYear();
        var _date = _y + '-' + _m + '-' + o.day;
        var dateIndex = new Date(_date).getDay();
        var firstLetter = weekday[dateIndex];
        if (po.periodName.replace(/\s/g, '') === o.period.replace(/\s/g, '')) {

          totUSV += parseInt(o.usv, 10);
          totRSV += parseInt(o.rsv, 10);
          totTSV += parseInt(o.total, 10);
          $('#alltotalusv' + idCreator(o.period.replace(/\s/g, ''))).text(totUSV);
          $('#alltotalrsv' + idCreator(o.period.replace(/\s/g, ''))).text(totRSV);
          $('#alltotaltsv' + idCreator(o.period.replace(/\s/g, ''))).text(totTSV);
          $('#total' + idCreator(o.period.replace(/\s/g, '') + o.day.replace(/^0+/, '') + firstLetter)).text(o.value);
        }
      });
    });

    $.each(target_total, function (ti, to) {
      console.log('to', to);

      $('#usvtar' + to.channel.replace(/\s/g, '') + to.period.replace(/\s/g, '')).text(to.usv);
      $('#rsvtar' + to.channel.replace(/\s/g, '') + to.period.replace(/\s/g, '')).text(to.rsv);
      $('#tsvtar' + to.channel.replace(/\s/g, '') + to.period.replace(/\s/g, '')).text(to.total);
    });

    $.each(total_val, function (ti, to) {
      var _m = now.getMonth() + 1;
      var _y = now.getFullYear();
      var _date = _y + '-' + _m + '-' + to.day.replace(/^0+/, '');
      var dateIndex = new Date(_date).getDay();
      var firstLetter = weekday[dateIndex];

      $('#totalusv' + to.period.replace(/\s/g, '') + to.day.replace(/^0+/, '') + firstLetter).text(to.usv);
      $('#totalrsv' + to.period.replace(/\s/g, '') + to.day.replace(/^0+/, '') + firstLetter).text(to.rsv);
      $('#totaltsv' + to.period.replace(/\s/g, '') + to.day.replace(/^0+/, '') + firstLetter).text(to.total);
    });

    $.each(all_total, function (ai, ao) {

      $('#allUsvTot' + ao.channel.replace(/\s/g, '')).text(ao.usv);
      $('#allRsvTot' + ao.channel.replace(/\s/g, '')).text(ao.rsv);
      $('#allTsvTot' + ao.channel.replace(/\s/g, '')).text(ao.total);
    });

    $.each(overall_total, function (i, o) {

      $('#overallUsvTot').text(o.usv);
      $('#overallRsvTot').text(o.rsv);
      $('#overallTsvTot').text(o.total);
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
  } else if (by_category === "by-employee") {

    // footer
    // var _tfoot = $('<tfoot/>', { class: 'executive-vs-sales-footer' });
    var _ftr = $('<tr/>', { class: 'tfoot-cls' });
    var _ftr2 = $('<tr/>', { class: 'tfoot-cls' });
    var _ftr3 = $('<tr/>', { class: 'tfoot-cls' });
    var _td = $('<td/>', { text: 'Total', class: 'totalCls', rowspan: 3 })
    _ftr.append(_td);
    var _td = $('<td/>', { text: 'USV' });
    _ftr.append(_td);
    var _td = $('<td/>', { text: 'RSV' });
    _ftr2.append(_td);
    var _td = $('<td/>', { text: 'TSV' });
    _ftr3.append(_td);
    var _data_year = monthInfo[0].monthName.split('-')[0];
    var _data_month = monthInfo[0].monthName.split('-')[1];
    $.each(periodRes, function (i, o) {
      var index = 0;
      // usv total
      for (i = o.start_date; i <= o.end_date; i++) {
        var _m = now.getMonth() + 1;
        var _y = now.getFullYear();
        var _date = _y + '-' + _m + '-' + i;
        var dateIndex = new Date(_date).getDay();
        var firstLetter = weekday[dateIndex];
        _td = $('<td/>', { 'date-attr': _data_year + '-' + _data_month + '-' + parseInt(i, 10), id: 'totalusv' + o.periodName.replace(/\s/g, '') + (i === '01' ? 1 : i) + firstLetter });
        _ftr.append(_td);
        index++;
      }
      // var _td = $('<td/>', { id: 'alltotalusv' + o.periodName.replace(/\s/g, '') + firstLetter });
      var _td = $('<td/>', { 'date-attr': _data_year + '-' + _data_month + '-' + parseInt(i, 10), id: 'alltotalusv' + o.periodName.replace(/\s/g, '') });
      _ftr.append(_td);
      // var _td = $('<td/>', { id: 'usvtar' + o.periodName.replace(/\s/g, ''), style: 'background:#8de34c;' });
      var _td = $('<td/>');
      _ftr.append(_td);
      var _etd = $('<td/>', { class: 'nullTd', style: 'width: 5px; border:0;border-left: 1px solid #ccc;background: transparent;max-width: 5px;' })
      _ftr.append(_etd);

      // rsv total
      for (i = o.start_date; i <= o.end_date; i++) {
        var _m = now.getMonth() + 1;
        var _y = now.getFullYear();
        var _date = _y + '-' + _m + '-' + i;
        var dateIndex = new Date(_date).getDay();
        var firstLetter = weekday[dateIndex];
        _td = $('<td/>', { 'date-attr': _data_year + '-' + _data_month + '-' + parseInt(i, 10), id: 'totalrsv' + o.periodName.replace(/\s/g, '') + (i === '01' ? 1 : i) + firstLetter });
        _ftr2.append(_td);
        index++;
      }
      // var _td = $('<td/>', { id: 'alltotalrsv' + o.periodName.replace(/\s/g, '') + firstLetter });
      var _td = $('<td/>', { 'date-attr': _data_year + '-' + _data_month + '-' + parseInt(i, 10), id: 'alltotalrsv' + o.periodName.replace(/\s/g, '') });
      _ftr2.append(_td);
      // var _td = $('<td/>', { id: 'rsvtar' + o.periodName.replace(/\s/g, ''), style: 'background:#ff8383;' });
      var _td = $('<td/>');
      _ftr2.append(_td);
      var _etd = $('<td/>', { class: 'nullTd', style: 'width: 5px; border:0;border-left: 1px solid #ccc;background: transparent;max-width: 5px;' })
      _ftr2.append(_etd);

      // tsv total
      for (i = o.start_date; i <= o.end_date; i++) {
        var _m = now.getMonth() + 1;
        var _y = now.getFullYear();
        var _date = _y + '-' + _m + '-' + i;
        var dateIndex = new Date(_date).getDay();
        var firstLetter = weekday[dateIndex];
        _td = $('<td/>', { 'date-attr': _data_year + '-' + _data_month + '-' + parseInt(i, 10), id: 'totaltsv' + o.periodName.replace(/\s/g, '') + (i === '01' ? 1 : i) + firstLetter });
        _ftr3.append(_td);
        index++;
      }
      // var _td = $('<td/>', { id: 'alltotaltsv' + o.periodName.replace(/\s/g, '') + firstLetter });
      var _td = $('<td/>', { 'date-attr': _data_year + '-' + _data_month + '-' + parseInt(i, 10), id: 'alltotaltsv' + o.periodName.replace(/\s/g, '') });
      _ftr3.append(_td);
      // var _td = $('<td/>', {id: 'tsvtar' + o.periodName.replace(/\s/g, '') , style: 'background:#40b5d9;' });
      // var _td = $('<td/>', { style: 'background:#ffe0c1;' });
      var _td = $('<td/>', { id: 'usvtar' + o.periodName.replace(/\s/g, ''), style: 'background:#8de34c;' });
      _ftr3.append(_td);
      var _etd = $('<td/>', { class: 'nullTd', style: 'width: 5px; border:0;border-left: 1px solid #ccc;background: transparent;max-width: 5px;' })
      _ftr3.append(_etd);
    });
    // overall totals
    var _totTd = $('<td/>', { id: 'overallUsvTot', style: 'border-right:1px solid #ccc;' });
    _ftr.append(_totTd);
    var _totTd = $('<td/>', { id: 'overallRsvTot', style: 'border-right:1px solid #ccc;' });
    _ftr2.append(_totTd);
    var _totTd = $('<td/>', { id: 'overallTsvTot', style: 'border-right:1px solid #ccc;' });
    _ftr3.append(_totTd);
    if (zc.user.role.value != "sales_executive") {
      $('.site-visit-summary').append(_ftr);
      $('.site-visit-summary').append(_ftr2);
      $('.site-visit-summary').append(_ftr3);
      // $('.site-visit-summary').append(_tfoot);
    }

    // body
    var _tbody = $('<tbody/>');
    $('.site-visit-summary').append(_tbody);
    $.each(execRes, function (ei, eo) {
      if (eo.excutiveName !== null) {
        var _tr = $('<tr/>');
        var _tr2 = $('<tr/>');
        var _tr3 = $('<tr/>');
        var _td = $('<td/>', { text: eo.excutiveName, class: 'excutiveNameCls', rowspan: 3 });
        _tr.append(_td);

        // USV
        var _td = $('<td/>', { text: 'USV' });
        _tr.append(_td);
        $.each(periodRes, function (pi, po) {
          var index = 0;
          for (i = po.start_date; i <= po.end_date; i++) {
            var _m = now.getMonth() + 1;
            var _y = now.getFullYear();
            var _date = _y + '-' + _m + '-' + i;
            var dateIndex = new Date(_date).getDay();
            var firstLetter = weekday[dateIndex];
            _td = $('<td/>', { 'date-attr': _data_year + '-' + _data_month + '-' + parseInt(i, 10), id: 'usv' + eo.excutiveName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + (i === '01' ? 1 : i) + firstLetter });
            _tr.append(_td);
            index++;
          }
          var _td = $('<td/>', { 'wtotal-date-attr': _data_year + '-' + _data_month + '-'+pi, id: 'usvtar' + eo.excutiveName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') });
          _tr.append(_td);
          // tar
          // _td = $('<td/>', { id: 'usv' + eo.excutiveName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + 'tar', class: 'tar' });
          _td = $('<td/>');
          _tr.append(_td);
          var _etd = $('<td/>', { class: 'nullTd', style: 'width: 5px; border:0;border-left: 1px solid #ccc;background: transparent;max-width: 5px;' })
          _tr.append(_etd);
        });
        _tbody.append(_tr);

        // RSV
        var _td = $('<td/>', { text: 'RSV' });
        _tr2.append(_td);
        $.each(periodRes, function (pi, po) {
          var index = 0;
          for (i = po.start_date; i <= po.end_date; i++) {
            var _m = now.getMonth() + 1;
            var _y = now.getFullYear();
            var _date = _y + '-' + _m + '-' + i;
            var dateIndex = new Date(_date).getDay();
            var firstLetter = weekday[dateIndex];
            _td = $('<td/>', { 'date-attr': _data_year + '-' + _data_month + '-' + parseInt(i, 10), id: 'rsv' + eo.excutiveName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + (i === '01' ? 1 : i) + firstLetter });
            _tr2.append(_td);
            index++;
          }
          var _td = $('<td/>', { 'wtotal-date-attr': _data_year + '-' + _data_month + '-'+pi, id: 'rsvtar' + eo.excutiveName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') });
          _tr2.append(_td);
          // achive
          _td = $('<td/>');
          // _td = $('<td/>', { id: 'rsv' + eo.excutiveName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + 'achv', class: 'achv' });
          _tr2.append(_td);
          var _etd = $('<td/>', { class: 'nullTd', style: 'width: 5px; border:0;border-left: 1px solid #ccc;background: transparent;max-width: 5px;' })
          _tr2.append(_etd);
        });
        _tbody.append(_tr2);

        // TSV
        var _td = $('<td/>', { text: 'TSV' });
        _tr3.append(_td);
        $.each(periodRes, function (pi, po) {
          var index = 0;
          for (i = po.start_date; i <= po.end_date; i++) {
            var _m = now.getMonth() + 1;
            var _y = now.getFullYear();
            var _date = _y + '-' + _m + '-' + i;
            var dateIndex = new Date(_date).getDay();
            var firstLetter = weekday[dateIndex];
            _td = $('<td/>', { 'date-attr': _data_year + '-' + _data_month + '-' + parseInt(i, 10), id: 'tsv' + eo.excutiveName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + (i === '01' ? 1 : i) + firstLetter });
            _tr3.append(_td);
            index++;
          }
          var _td = $('<td/>', { 'wtotal-date-attr': _data_year + '-' + _data_month + '-'+pi, id: 'tsvtar' + eo.excutiveName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') });
          _tr3.append(_td);
          // balance
          // _td = $('<td/>', { id: 'tsv' + eo.excutiveName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + 'bal', class: 'bal' });
          // _td = $('<td/>');
          _td = $('<td/>', { id: 'usv' + eo.excutiveName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + 'tar', class: 'tar' });
          _tr3.append(_td);
          var _etd = $('<td/>', { class: 'nullTd', style: 'width: 5px; border:0;border-left: 1px solid #ccc;background: transparent;max-width: 5px;' })
          _tr3.append(_etd);
        });
        _tbody.append(_tr3);

        // overall totals
        var _totTd = $('<td/>', { id: 'allUsvTot' + eo.excutiveName.replace(/\s/g, ''), style: 'border-right:1px solid #ccc;' });
        _tr.append(_totTd);
        var _totTd = $('<td/>', { id: 'allRsvTot' + eo.excutiveName.replace(/\s/g, ''), style: 'border-right:1px solid #ccc;' });
        _tr2.append(_totTd);
        var _totTd = $('<td/>', { id: 'allTsvTot' + eo.excutiveName.replace(/\s/g, ''), style: 'border-right:1px solid #ccc;' });
        _tr3.append(_totTd);
      }

    });

    $.each(periodRes, function (pi, po) {
      $.each(execRes, function (ei, eo) {
        if (eo.excutiveName !== null) {
          $.each(siteVisits1, function (i, o) {
            if (po.periodName.replace(/\s/g, '') === o.period.replace(/\s/g, '') && eo.excutiveName.replace(/\s/g, '') === o.first_name.replace(/\s/g, '')) {
              var _m = now.getMonth() + 1;
              var _y = now.getFullYear();
              var _date = _y + '-' + _m + '-' + o.day.replace(/^0+/, '');
              var dateIndex = new Date(_date).getDay();
              var firstLetter = weekday[dateIndex];
              /* if(){

              } */
              $('#usv' + o.first_name.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + o.day.replace(/^0+/, '') + firstLetter).text(o.usv);
              $('#rsv' + o.first_name.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + o.day.replace(/^0+/, '') + firstLetter).text(o.rsv);
              $('#tsv' + o.first_name.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + o.day.replace(/^0+/, '') + firstLetter).text(o.total);
            }
          });
        }
      });
    });

    var totUSV = 0; //alltotalusv
    var totRSV = 0; //alltotalrsv
    var totTSV = 0; //alltotaltsv
    $.each(periodRes, function (inx, po) {
      var usvTar = 0;
      var rsvTar = 0;
      var tsvTar = 0;
      $.each(execRes, function (ind, eo) {
        if (eo.excutiveName !== null) {
          $.each(siteVisits2, function (index, value) {
            if (po.periodName.replace(/\s/g, '') === value.period.replace(/\s/g, '') && eo.excutiveName === value.excutive) {
              $('#usv' + value.excutive.replace(/\s/g, '') + value.period.replace(/\s/g, '') + 'tar').text(value.target);
              $('#rsv' + value.excutive.replace(/\s/g, '') + value.period.replace(/\s/g, '') + 'achv').text(value.actual);
              $('#tsv' + value.excutive.replace(/\s/g, '') + value.period.replace(/\s/g, '') + 'bal').text(value.balance);
              usvTar += value.target;
              rsvTar += value.actual;
              tsvTar += value.balance;
              $('#usvtar' + value.period.replace(/\s/g, '')).text(usvTar);
              $('#rsvtar' + value.period.replace(/\s/g, '')).text(rsvTar);
              $('#tsvtar' + value.period.replace(/\s/g, '')).text(tsvTar);
            }
          });
        }
      });
    });


    $.each(periodRes, function (pi, po) {
      totUSV = 0;
      totRSV = 0;
      totTSV = 0;
      $.each(total_val, function (i, o) {
        var _m = now.getMonth() + 1;
        var _y = now.getFullYear();
        var _date = _y + '-' + _m + '-' + o.day;
        var dateIndex = new Date(_date).getDay();
        var firstLetter = weekday[dateIndex];
        if (po.periodName.replace(/\s/g, '') === o.period.replace(/\s/g, '')) {
          totUSV += parseInt(o.usv, 10);
          totRSV += parseInt(o.rsv, 10);
          totTSV += parseInt(o.total, 10);
          $('#alltotalusv' + idCreator(o.period.replace(/\s/g, ''))).text(totUSV);
          $('#alltotalrsv' + idCreator(o.period.replace(/\s/g, ''))).text(totRSV);
          $('#alltotaltsv' + idCreator(o.period.replace(/\s/g, ''))).text(totTSV);
          /*  $('#alltotalusv' + idCreator(o.period.replace(/\s/g, '') + firstLetter)).text(totUSV);
           $('#alltotalrsv' + idCreator(o.period.replace(/\s/g, '') + firstLetter)).text(totRSV);
           $('#alltotaltsv' + idCreator(o.period.replace(/\s/g, '') + firstLetter)).text(totTSV); */
          $('#total' + idCreator(o.period.replace(/\s/g, '') + o.day.replace(/^0+/, '') + firstLetter)).text(o.value);
        }
      });
    });

    $.each(target_total, function (ti, to) {
      $('#usvtar' + to.first_name.replace(/\s/g, '') + to.period.replace(/\s/g, '')).text(to.usv);
      $('#rsvtar' + to.first_name.replace(/\s/g, '') + to.period.replace(/\s/g, '')).text(to.rsv);
      $('#tsvtar' + to.first_name.replace(/\s/g, '') + to.period.replace(/\s/g, '')).text(to.total);
    });


    $.each(total_val, function (ti, to) {
      var _m = now.getMonth() + 1;
      var _y = now.getFullYear();
      var _date = _y + '-' + _m + '-' + to.day.replace(/^0+/, '');
      var dateIndex = new Date(_date).getDay();
      var firstLetter = weekday[dateIndex];
      $('#totalusv' + to.period.replace(/\s/g, '') + to.day.replace(/^0+/, '') + firstLetter).text(to.usv);
      $('#totalrsv' + to.period.replace(/\s/g, '') + to.day.replace(/^0+/, '') + firstLetter).text(to.rsv);
      $('#totaltsv' + to.period.replace(/\s/g, '') + to.day.replace(/^0+/, '') + firstLetter).text(to.total);
    });

    $.each(all_total, function (ai, ao) {
      $('#allUsvTot' + ao.first_name.replace(/\s/g, '')).text(ao.usv);
      $('#allRsvTot' + ao.first_name.replace(/\s/g, '')).text(ao.rsv);
      $('#allTsvTot' + ao.first_name.replace(/\s/g, '')).text(ao.total);
    });

    $.each(overall_total, function (i, o) {
      $('#overallUsvTot').text(o.usv);
      $('#overallRsvTot').text(o.rsv);
      $('#overallTsvTot').text(o.total);
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
    $.each(periodRes, function (pi, po) {
        $.each($('td[date-attr="' + _data_year+'-'+(_data_month+1)+'-'+ parseInt(po.start_date,10)+'"]'), function (j, k) {
          var totalTxt= $(this).parent().find($('td[wtotal-date-attr="' + _data_year+'-'+(_data_month+1)+'-'+ pi+'"]'));
          if ($.trim($(this).text()).length> 0 && $.trim(totalTxt.text()).length== 0) {
            totalTxt.text("0");
          }
        });
   });

  }
  // $('.channelDetails').click(function () {
  //   detailsFunByChn(this);
  // });

  // $('.excutiveNameCls').click(function () {
  //   detailsFunByEmp(this);
  // });
}

function idCreator(channels) {
  return channels.replace('\/', '_');
}

function detailsFunByChn(e) {
  $('.site-visit-info').html('');
  $('.header-info').html('');
  var _channelName = $(e).text();
  $('.header-info').append('<h3>' + _channelName + ' site visit summary</h3>');
  // var channelBgColor = ["#70C149", "#E6B211", "#EE5641", "#ED008C", "#40B4D9", "#9A6AB6", "#AE8C4C"];

  // headers
  var now = new Date(month);
  var _month = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  var i = 1;
  var _thead = $('<thead/>')
  var _htr = $('<tr/>');
  var _htr2 = $('<tr/>');
  var _th = $('<th/>', { rowspan: 2, text: monthNames[now.getMonth()] + '-' + now.getFullYear().toString().substr(-2), style: 'background: transparent;color: #000000;' });
  _htr.append(_th);
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
    var _th = $('<th/>');
    _htr.append(_th);
    var _th = $('<th/>');
    _htr.append(_th);
    var _eth = $('<th/>', { style: 'width: 5px', class: 'extra' });
    _htr.append(_eth);
    var _th = $('<th/>', { text: 'TOT' });
    _htr2.append(_th);
    var _th = $('<th/>', { text: 'TAR' });
    _htr2.append(_th);
    var _eth = $('<th/>', { style: 'width: 5px', class: 'extra' });
    _htr2.append(_eth);
  });
  var _totTh = $('<th/>', { rowspan: 2, text: 'OVERALL' });
  _htr.append(_totTh);
  _thead.append(_htr);
  _thead.append(_htr2);
  $('.site-visit-info').append(_thead);

  // body
  var _tbody = $('<tbody/>');
  $('.site-visit-info').append(_tbody);
  $.each(channelsRes, function (ei, eo) {
    if (_channelName === eo.channelName) {
      var _tr = $('<tr/>');
      var _tr2 = $('<tr/>');
      var _tr3 = $('<tr/>');
      var _td = $('<td/>', { text: eo.channelName, class: 'channelDetails', style: 'background: ' + channelBgColor[ei] + '', rowspan: 3 });
      _tr.append(_td);

      // USV
      var _td = $('<td/>', { text: 'USV', style: 'text-align:center;' });
      _tr.append(_td);
      $.each(periodRes, function (pi, po) {
        var index = 0;
        for (i = po.start_date; i <= po.end_date; i++) {
          var _m = now.getMonth() + 1;
          var _y = now.getFullYear();
          var _date = _y + '-' + _m + '-' + i;
          var dateIndex = new Date(_date).getDay();
          var firstLetter = weekday[dateIndex];
          _td = $('<td/>', { class: 'usv' + eo.channelName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + (i === '01' ? 1 : i) + firstLetter });
          _tr.append(_td);
          index++;
        }
        var _td = $('<td/>', { class: 'usvtar' + eo.channelName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') });
        _tr.append(_td);
        // tar
        _td = $('<td/>', { class: 'usv' + eo.channelName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + 'tar tar' });
        _tr.append(_td);
        var _etd = $('<td/>', { style: 'width: 5px; border:0;border-left: 1px solid #ccc;background: transparent;max-width: 5px;' })
        _tr.append(_etd);
      });
      _tbody.append(_tr);

      // RSV
      var _td = $('<td/>', { text: 'RSV', style: 'text-align:center;' });
      _tr2.append(_td);
      $.each(periodRes, function (pi, po) {
        var index = 0;
        for (i = po.start_date; i <= po.end_date; i++) {
          var _m = now.getMonth() + 1;
          var _y = now.getFullYear();
          var _date = _y + '-' + _m + '-' + i;
          var dateIndex = new Date(_date).getDay();
          var firstLetter = weekday[dateIndex];
          _td = $('<td/>', { class: 'rsv' + eo.channelName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + (i === '01' ? 1 : i) + firstLetter });
          _tr2.append(_td);
          index++;
        }
        var _td = $('<td/>', { class: 'rsvtar' + eo.channelName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') });
        _tr2.append(_td);
        // achive
        // _td = $('<td/>', { class: 'rsv' + eo.channelName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + 'achv achv' });
        _td = $('<td/>');
        _tr2.append(_td);
        var _etd = $('<td/>', { style: 'width: 5px; border:0;border-left: 1px solid #ccc;background: transparent;max-width: 5px;' })
        _tr2.append(_etd);
      });
      _tbody.append(_tr2);

      // TSV
      var _td = $('<td/>', { text: 'TSV', style: 'text-align:center;' });
      _tr3.append(_td);
      $.each(periodRes, function (pi, po) {
        var index = 0;
        for (i = po.start_date; i <= po.end_date; i++) {
          var _m = now.getMonth() + 1;
          var _y = now.getFullYear();
          var _date = _y + '-' + _m + '-' + i;
          var dateIndex = new Date(_date).getDay();
          var firstLetter = weekday[dateIndex];
          _td = $('<td/>', { class: 'tsv' + eo.channelName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + (i === '01' ? 1 : i) + firstLetter });
          _tr3.append(_td);
          index++;
        }
        var _td = $('<td/>', { class: 'tsvtar' + eo.channelName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') });
        _tr3.append(_td);
        // balance
        _td = $('<td/>', { class: 'tsv' + eo.channelName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + 'bal bal' });
        _tr3.append(_td);
        var _etd = $('<td/>', { style: 'width: 5px; border:0;border-left: 1px solid #ccc;background: transparent;max-width: 5px;' })
        _tr3.append(_etd);
      });
      _tbody.append(_tr3);

      // overall totals
      var _totTd = $('<td/>', { class: 'allUsvTot' + eo.channelName.replace(/\s/g, ''), style: 'border-right:1px solid #ccc;' });
      _tr.append(_totTd);
      var _totTd = $('<td/>', { class: 'allRsvTot' + eo.channelName.replace(/\s/g, ''), style: 'border-right:1px solid #ccc;' });
      _tr2.append(_totTd);
      var _totTd = $('<td/>', { class: 'allTsvTot' + eo.channelName.replace(/\s/g, ''), style: 'border-right:1px solid #ccc;' });
      _tr3.append(_totTd);
    }
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
          $('.usv' + o.channel.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + o.day.replace(/^0+/, '') + firstLetter).text(o.usv);
          $('.rsv' + o.channel.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + o.day.replace(/^0+/, '') + firstLetter).text(o.rsv);
          $('.tsv' + o.channel.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + o.day.replace(/^0+/, '') + firstLetter).text(o.total);
        }
      });
    });
  });

  $.each(periodRes, function (inx, po) {
    $.each(channelsRes, function (ind, eo) {
      $.each(siteVisits2, function (index, value) {
        if (po.periodName.replace(/\s/g, '') === value.period.replace(/\s/g, '') && eo.channelName.replace(/\s/g, '') === value.channel_name.replace(/\s/g, '')) {
          $('.usv' + value.channel_name.replace(/\s/g, '') + value.period.replace(/\s/g, '') + 'tar').text(value.target);
          $('.rsv' + value.channel_name.replace(/\s/g, '') + value.period.replace(/\s/g, '') + 'achv').text(value.actual);
          $('.tsv' + value.channel_name.replace(/\s/g, '') + value.period.replace(/\s/g, '') + 'bal').text(value.balance);
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

  $.each(target_total, function (ti, to) {
    $('.usvtar' + to.channel.replace(/\s/g, '') + to.period.replace(/\s/g, '')).text(to.usv);
    $('.rsvtar' + to.channel.replace(/\s/g, '') + to.period.replace(/\s/g, '')).text(to.rsv);
    $('.tsvtar' + to.channel.replace(/\s/g, '') + to.period.replace(/\s/g, '')).text(to.total);
  });

  $.each(total_val, function (ti, to) {
    var _m = now.getMonth() + 1;
    var _y = now.getFullYear();
    var _date = _y + '-' + _m + '-' + to.day.replace(/^0+/, '');
    var dateIndex = new Date(_date).getDay();
    var firstLetter = weekday[dateIndex];
    $('.totalusv' + to.period.replace(/\s/g, '') + to.day.replace(/^0+/, '') + firstLetter).text(to.usv);
    $('.totalrsv' + to.period.replace(/\s/g, '') + to.day.replace(/^0+/, '') + firstLetter).text(to.rsv);
    $('.totaltsv' + to.period.replace(/\s/g, '') + to.day.replace(/^0+/, '') + firstLetter).text(to.total);
  });
  $.each(all_total, function (ai, ao) {
    $('.allUsvTot' + ao.channel.replace(/\s/g, '')).text(ao.usv);
    $('.allRsvTot' + ao.channel.replace(/\s/g, '')).text(ao.rsv);
    $('.allTsvTot' + ao.channel.replace(/\s/g, '')).text(ao.total);
  });
}

function detailsFunByEmp(e) {
  $('.site-visit-info').html('');
  $('.header-info').html('');
  var _empName = $(e).text();
  $('.header-info').append('<h3>' + _empName + ' site visit summary</h3>');

  var now = new Date(month);
  var _month = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  var i = 1;
  var _thead = $('<thead/>')
  var _htr = $('<tr/>');
  var _htr2 = $('<tr/>');
  var _th = $('<th/>', { rowspan: 2, text: monthNames[now.getMonth()] + '-' + now.getFullYear().toString().substr(-2), style: 'background: transparent;color: #000000;' });
  _htr.append(_th);
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
    var _th = $('<th/>');
    _htr.append(_th);
    var _th = $('<th/>');
    _htr.append(_th);
    var _eth = $('<th/>', { style: 'width: 5px', class: 'extra' });
    _htr.append(_eth);
    var _th = $('<th/>', { text: 'TOT' });
    _htr2.append(_th);
    var _th = $('<th/>', { text: 'TAR' });
    _htr2.append(_th);
    var _eth = $('<th/>', { style: 'width: 5px', class: 'extra' });
    _htr2.append(_eth);
  });
  var _totTh = $('<th/>', { rowspan: 2, text: 'OVERALL' });
  _htr.append(_totTh);
  _thead.append(_htr);
  _thead.append(_htr2);
  $('.site-visit-info').append(_thead);

  var _tbody = $('<tbody/>');
  $('.site-visit-info').append(_tbody);
  $.each(execRes, function (ei, eo) {
    if (_empName === eo.excutiveName) {
      var _tr = $('<tr/>');
      var _tr2 = $('<tr/>');
      var _tr3 = $('<tr/>');
      var _td = $('<td/>', { text: eo.excutiveName, class: 'excutiveNameCls', rowspan: 3 });
      _tr.append(_td);

      // USV
      var _td = $('<td/>', { text: 'USV' });
      _tr.append(_td);
      $.each(periodRes, function (pi, po) {
        var index = 0;
        for (i = po.start_date; i <= po.end_date; i++) {
          var _m = now.getMonth() + 1;
          var _y = now.getFullYear();
          var _date = _y + '-' + _m + '-' + i;
          var dateIndex = new Date(_date).getDay();
          var firstLetter = weekday[dateIndex];
          _td = $('<td/>', { class: 'usv' + eo.excutiveName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + (i === '01' ? 1 : i) + firstLetter });
          _tr.append(_td);
          index++;
        }
        var _td = $('<td/>', { class: 'usvtar' + eo.excutiveName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') });
        _tr.append(_td);
        // tar
        _td = $('<td/>', { class: 'usv' + eo.excutiveName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + 'tar tar' });
        _tr.append(_td);
        var _etd = $('<td/>', { style: 'width: 5px; border:0;border-left: 1px solid #ccc;background: transparent;max-width: 5px;' })
        _tr.append(_etd);
      });
      _tbody.append(_tr);

      // RSV
      var _td = $('<td/>', { text: 'RSV' });
      _tr2.append(_td);
      $.each(periodRes, function (pi, po) {
        var index = 0;
        for (i = po.start_date; i <= po.end_date; i++) {
          var _m = now.getMonth() + 1;
          var _y = now.getFullYear();
          var _date = _y + '-' + _m + '-' + i;
          var dateIndex = new Date(_date).getDay();
          var firstLetter = weekday[dateIndex];
          _td = $('<td/>', { class: 'rsv' + eo.excutiveName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + (i === '01' ? 1 : i) + firstLetter });
          _tr2.append(_td);
          index++;
        }
        var _td = $('<td/>', { class: 'rsvtar' + eo.excutiveName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') });
        _tr2.append(_td);
        // achive
        _td = $('<td/>');
        // _td = $('<td/>', { class: 'rsv' + eo.excutiveName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + 'achv achv' });
        _tr2.append(_td);
        var _etd = $('<td/>', { style: 'width: 5px; border:0;border-left: 1px solid #ccc;background: transparent;max-width: 5px;' })
        _tr2.append(_etd);
      });
      _tbody.append(_tr2);

      // TSV
      var _td = $('<td/>', { text: 'TSV' });
      _tr3.append(_td);
      $.each(periodRes, function (pi, po) {
        var index = 0;
        for (i = po.start_date; i <= po.end_date; i++) {
          var _m = now.getMonth() + 1;
          var _y = now.getFullYear();
          var _date = _y + '-' + _m + '-' + i;
          var dateIndex = new Date(_date).getDay();
          var firstLetter = weekday[dateIndex];
          _td = $('<td/>', { class: 'tsv' + eo.excutiveName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + (i === '01' ? 1 : i) + firstLetter });
          _tr3.append(_td);
          index++;
        }
        var _td = $('<td/>', { class: 'tsvtar' + eo.excutiveName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') });
        _tr3.append(_td);
        // balance
        _td = $('<td/>', { class: 'tsv' + eo.excutiveName.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + 'bal bal' });
        _tr3.append(_td);
        var _etd = $('<td/>', { style: 'width: 5px; border:0;border-left: 1px solid #ccc;background: transparent;max-width: 5px;' })
        _tr3.append(_etd);
      });
      _tbody.append(_tr3);

      // overall totals
      var _totTd = $('<td/>', { class: 'allUsvTot' + eo.excutiveName.replace(/\s/g, ''), style: 'border-right:1px solid #ccc;' });
      _tr.append(_totTd);
      var _totTd = $('<td/>', { class: 'allRsvTot' + eo.excutiveName.replace(/\s/g, ''), style: 'border-right:1px solid #ccc;' });
      _tr2.append(_totTd);
      var _totTd = $('<td/>', { class: 'allTsvTot' + eo.excutiveName.replace(/\s/g, ''), style: 'border-right:1px solid #ccc;' });
      _tr3.append(_totTd);
    }
  });

  $.each(periodRes, function (pi, po) {
    $.each(execRes, function (ei, eo) {
      $.each(siteVisits1, function (i, o) {
        if (po.periodName.replace(/\s/g, '') === o.period.replace(/\s/g, '') && eo.excutiveName.replace(/\s/g, '') === o.first_name.replace(/\s/g, '')) {
          var _m = now.getMonth() + 1;
          var _y = now.getFullYear();
          var _date = _y + '-' + _m + '-' + o.day.replace(/^0+/, '');
          var dateIndex = new Date(_date).getDay();
          var firstLetter = weekday[dateIndex];
          $('.usv' + o.first_name.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + o.day.replace(/^0+/, '') + firstLetter).text(o.usv);
          $('.rsv' + o.first_name.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + o.day.replace(/^0+/, '') + firstLetter).text(o.rsv);
          $('.tsv' + o.first_name.replace(/\s/g, '') + po.periodName.replace(/\s/g, '') + o.day.replace(/^0+/, '') + firstLetter).text(o.total);
        }
      });
    });
  });

  $.each(periodRes, function (inx, po) {
    $.each(execRes, function (ind, eo) {
      $.each(siteVisits2, function (index, value) {
        if (po.periodName.replace(/\s/g, '') === value.period.replace(/\s/g, '') && eo.excutiveName.replace(/\s/g, '') === value.excutive.replace(/\s/g, '')) {
          $('.usv' + value.excutive.replace(/\s/g, '') + value.period.replace(/\s/g, '') + 'tar').text(value.target);
          $('.rsv' + value.excutive.replace(/\s/g, '') + value.period.replace(/\s/g, '') + 'achv').text(value.actual);
          $('.tsv' + value.excutive.replace(/\s/g, '') + value.period.replace(/\s/g, '') + 'bal').text(value.balance);
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

  $.each(target_total, function (ti, to) {
    $('.usvtar' + to.first_name.replace(/\s/g, '') + to.period.replace(/\s/g, '')).text(to.usv);
    $('.rsvtar' + to.first_name.replace(/\s/g, '') + to.period.replace(/\s/g, '')).text(to.rsv);
    $('.tsvtar' + to.first_name.replace(/\s/g, '') + to.period.replace(/\s/g, '')).text(to.total);
  });

  $.each(total_val, function (ti, to) {
    var _m = now.getMonth() + 1;
    var _y = now.getFullYear();
    var _date = _y + '-' + _m + '-' + to.day.replace(/^0+/, '');
    var dateIndex = new Date(_date).getDay();
    var firstLetter = weekday[dateIndex];
    $('.totalusv' + to.period.replace(/\s/g, '') + to.day.replace(/^0+/, '') + firstLetter).text(to.usv);
    $('.totalrsv' + to.period.replace(/\s/g, '') + to.day.replace(/^0+/, '') + firstLetter).text(to.rsv);
    $('.totaltsv' + to.period.replace(/\s/g, '') + to.day.replace(/^0+/, '') + firstLetter).text(to.total);
  });

  $.each(all_total, function (ai, ao) {
    $('.allUsvTot' + ao.first_name.replace(/\s/g, '')).text(ao.usv);
    $('.allRsvTot' + ao.first_name.replace(/\s/g, '')).text(ao.rsv);
    $('.allTsvTot' + ao.first_name.replace(/\s/g, '')).text(ao.total);
  });

  $.each(overall_total, function (i, o) {
    $('.overallUsvTot').text(o.usv);
    $('.overallRsvTot').text(o.rsv);
    $('.overallTsvTot').text(o.total);
  });
}
