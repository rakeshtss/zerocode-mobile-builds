var channels;
var periods;
var channelsName;
var executives;
var jsonData;
var jsonData1;

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
    /*     if (zc.form_filter && zc.form_filter.model.month) {
          month = zc.form_filter.model.month
        } */
    if (zc.form_filter && zc.form_filter.model.month) {
      month = zc.form_filter.model.month;
    } else {
      window.zc.form_filter.model.month = month;
    }

    url = zc.config.apiUrl + zc.config.app + '/api/incor/reports/executive-vs-site-visits/executive-vs-site-visits';
    var payload = { project: { uid: zc.wdProjectForm.model.project.uid, month: month } };
    zc_req('/api/incor/reports/executive-vs-site-visits/executive-vs-site-visits', payload, function (response) {
      channels = response.data.listData;
      periods = channels.zc_extra.data1;
      channelsName = channels.zc_extra.data2;
      executives = channels.zc_extra.data3;
      jsonData = channels.zc_extra.data4;
      jsonData1 = channels.zc_extra.data5;
      console.log('channels', channels);
      reloadData();
    });
  });
}

function reloadData() {
  console.log('channels ');
  $('.excutive-vs-site-visit-table').html('');
  var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var now = new Date(month);
  var _thead = $('<thead/>');
  var _tbody = $('<tbody/>');
  // for header
  var _htr = $('<tr/>');
  _htr.append($('<th/>', { rowspan: 2, text: monthNames[now.getMonth()] + '-' + now.getFullYear().toString().substr(-2), style: 'font-weight:bold;text-align:left;' }));
  var channelBgColor = ["#70c149", "#e6b211", "#ee5545", "#3fb4d8", "#9a6ab6", "#ae8c4c", "#0fad9a"];
  var _htr2 = $('<tr/>');
  // _htr2.append('<th></th>');
  $.each(periods, function (i, o) {
    var _th = $('<th/>', { colspan: channelsName.length + 5, text: o.periodName, style: 'background-color: #000;color:#fff;' });
    _htr.append(_th);
    var thEmpty = $('<th/>', { style: 'style:width:3px;' });
    _htr.append(thEmpty);
    $.each(channelsName, function (chn, name) {
      var _hTh = $(`<th style="background-color: ${channelBgColor[chn]};color:#fff;">${name.channel}</th>`);
      _htr2.append(_hTh);
    });
    _htr2.append("<th class=''>TSV-T</th><th class=''>USV</th><th class=''>RSV</th><th class=''>TSV-A</th><th class=''>BAL</th><th style='width:3px;border: none;'></th>");
  });
  _thead.append(_htr);
  _thead.append(_htr2);
  $('.excutive-vs-site-visit-table').append(_thead);

  // var _tfoot = $('<tfoot/>', { class: 'executiveSale' });
  var _ftr = $('<tr/>', { class: 'tfoot-cls' })
  _ftr.append($('<td/>', { text: 'TOTAL', style: 'text-align:left' }));
  $.each(periods, function (i, o) {
    $.each(channelsName, function (chn, name) {
      var _fTd = $('<td/>', { id: o.periodName.replace(/\s/g, '') + name.channel.replace(/\s/g, '') + 'total' });
      _ftr.append(_fTd);
    });
    _ftr.append("<td style='background: #8DE34E;color: #000;' id=" + o.periodName.replace(/\s/g, '') + "tar" + ">22</td><td style='background: #FF8383;color: #000;' id=" + o.periodName.replace(/\s/g, '') + "achv" + ">4</td><td style='background: #60adff;color: #000;' id=" + o.periodName.replace(/\s/g, '') + "rsv" + ">3</td><td style='background: #0cb6be;color: #000;' id=" + o.periodName.replace(/\s/g, '') + "tsva" + ">3</td><td style='background: #40B4D9;color: #000;' id=" + o.periodName.replace(/\s/g, '') + "bal" + ">3</td><td style='width:3px;border:none;background:transparent;'></td>");
  });

  $('.excutive-vs-site-visit-table').append(_ftr);
  // $('.excutive-vs-site-visit-table').append(_tfoot);

  // body
  var _tbody = $('<tbody/>');
  $('.excutive-vs-site-visit-table').append(_tbody);
  $.each(executives, function (ei, eo) {
    var _tr = $('<tr/>');
    var _td = $('<td/>', { text: eo.excutiveName, class: 'excutiveNameCls' });
    _tr.append(_td);

    $.each(periods, function (pi, po) {
      eo.excutiveName = eo.excutiveName.split(" ").join("");
      $.each(channelsName, function (ci, co) {
        _td = $('<td/>', { id: eo.excutiveName + po.periodName.replace(/\s/g,'') + co.channel.replace(/\s/g, '') });
        _tr.append(_td);
      });
      // target
      _td = $('<td/>', { id: eo.excutiveName + po.periodName.replace(/\s/g,'') + 'tar', style: 'background-color: #8DE34E;color: #000;' });
      _tr.append(_td);
      // achive
      _td = $('<td/>', { id: eo.excutiveName + po.periodName.replace(/\s/g,'') + 'achv', style: 'background-color: #FF8383;color: #000;' });
      _tr.append(_td);
      // rsv
      _td = $('<td/>', { id: eo.excutiveName + po.periodName.replace(/\s/g,'') + 'rsv', style: 'background-color: #60adff;color: #000;' });
      _tr.append(_td);
       // TSV-A(USV+RSV)
       _td = $('<td/>', { id: eo.excutiveName + po.periodName.replace(/\s/g,'') + 'tsva', style: 'background-color: #0cb6be;color: #000;' });
       _tr.append(_td);
      // balance
      _td = $('<td/>', { id: eo.excutiveName + po.periodName.replace(/\s/g,'') + 'bal', style: 'background-color: #40B4D9;color: #000;' });
      _tr.append(_td);
      // empty
      _td = $('<td/>', { style: 'width:3px;border: none;background:transparent;' });
      _tr.append(_td);
    });
    _tbody.append(_tr);
  });

  $.each(jsonData1, function (i, o) {
    o.excutiveName = o.excutiveName.split(" ").join("");
    $('#' + o.excutiveName + o.period.replace(/\s/g, '') + o.channel.replace(/\s/g, '')).text(o.value);
  });
  // target achv balance values assigning
  $.each(jsonData, function (i, o) {
    o.excutive = o.excutive.split(" ").join("");
    $('#' + o.excutive + o.period.replace(/\s/g, '') + 'tar').text(o.target);
    $('#' + o.excutive + o.period.replace(/\s/g, '') + 'achv').text(o.actual);
    $('#' + o.excutive + o.period.replace(/\s/g, '') + 'rsv').text(o.rsv);
    $('#' + o.excutive + o.period.replace(/\s/g, '') + 'tsva').text(o.tsva);
    $('#' + o.excutive + o.period.replace(/\s/g, '') + 'bal').text(o.balance);
  });

  var Total = 0, toTar = 0, totBal = 0, totAch = 0, totRsv = 0, totTsva=0;
  $.each(channelsName, function (ind, chn) {
    $.each(periods, function (inx, pe) {
      Total = 0, toTar = 0, totBal = 0, totAch = 0, totRsv = 0, totTsva=0;
      $.each(jsonData1, function (i, o) {
        $.each(executives, function (nu, ex) {
          ex.excutiveName = ex.excutiveName.split(" ").join("");
          if (pe.periodName.replace(/\s/g, '') === o.period.replace(/\s/g, '') && o.excutiveName === ex.excutiveName && o.channel === chn.channel) {
            Total += parseInt(o.value);
          }
        });
      });
      $.each(jsonData, function (i, o) {
        if (pe.periodName.replace(/\s/g, '') === o.period.replace(/\s/g, '')) {
          toTar += parseInt(o.target);
          totAch += parseInt(o.actual);
          totBal += parseInt(o.balance);
          totRsv += parseInt(o.rsv);
          totTsva += parseInt(o.tsva);
        }
      });
      $('#' + pe.periodName.replace(/\s/g, '') + chn.channel.replace(/\s/g, '') + 'total').text(Total);
      $('#' + pe.periodName.replace(/\s/g, '') + 'tar').text(toTar);
      $('#' + pe.periodName.replace(/\s/g, '') + 'bal').text(totBal);
      $('#' + pe.periodName.replace(/\s/g, '') + 'achv').text(totAch);
      $('#' + pe.periodName.replace(/\s/g, '') + 'rsv').text(totRsv);
      $('#' + pe.periodName.replace(/\s/g, '') + 'tsva').text(totTsva);
    });
  });
  // $('.excutiveNameCls').click(function () {
  //   detailsFun(this);
  // });
}


function detailsFun(e) {
  $('.excutive-sale-info').html('');
  $('.executiveNameCls').html('');
  var _execName = $(e).text();
  $('.executiveNameCls').append('<h3>' + _execName + ' site visits</h3>');
  var _thead = $('<thead/>');
  var _htr = $('<tr/>');
  _htr.append('<th></th>');
  var channelBgColor = ["#70c149", "#e6b211", "#ee5545", "#3fb4d8", "#9a6ab6", "#ae8c4c", "#0fad9a"];
  var _htr2 = $('<tr/>');
  _htr2.append('<th></th>');
  $.each(periods, function (i, o) {
    var _th = $('<th/>', { colspan: channelsName.length + 4, text: o.periodName, style: 'background-color: #000;color:#fff;' });
    _htr.append(_th);
    _htr.append("<th></th>");
    $.each(channelsName, function (chn, name) {
      var _hTh = $(`<th style="background-color: ${channelBgColor[chn]};color:#fff;">${name.channel}</th>`);
      _htr2.append(_hTh);
    });
    _htr2.append("<th class=''>TAR</th><th class=''>ACHV</th><th class=''>BAL</th><th class=''>RSV</th>");
    _htr2.append("<th></th>");
  });

  _thead.append(_htr);
  _thead.append(_htr2);
  $('.excutive-sale-info').append(_thead);

  var _tbody = $('<tbody/>');
  $('.excutive-sale-info').append(_tbody);
  $.each(executives, function (ei, eo) {
    if (eo.excutiveName === _execName) {
      var _tr = $('<tr/>');
      var _td = $('<td/>', { text: _execName });
      _tr.append(_td);

      $.each(periods, function (pi, po) {
        $.each(channelsName, function (ci, co) {
          _td = $('<td/>', { class: eo.excutiveName + po.periodName.replace(/\s/g, '') + (co.channel.replace(/\//g, '')).replace(/\s/g, '') });
          _tr.append(_td);
        });
        // target
        _td = $('<td/>', { class: eo.excutiveName + po.periodName.replace(/\s/g, '') + 'tar', style: 'background-color: #8DE34E;color: #000;' });
        _tr.append(_td);
        // achive
        _td = $('<td/>', { class: eo.excutiveName + po.periodName.replace(/\s/g, '') + 'achv', style: 'background-color: #FF8383;color: #000;' });
        _tr.append(_td);
        // balance
        _td = $('<td/>', { class: eo.excutiveName + po.periodName.replace(/\s/g, '') + 'bal', style: 'background-color: #40B4D9;color: #000;' });
        _tr.append(_td);
        // rsv
        _td = $('<td/>', { class: eo.excutiveName + po.periodName.replace(/\s/g, '') + 'rsv', style: 'background-color: #60adff;color: #000;' });
        _tr.append(_td);
        _td = $('<td/>', { style: 'width:3px;border: none;background:#f6f8fa;' });
        _tr.append(_td);
      });
      _tbody.append(_tr);
    }
  });
  $.each(jsonData1, function (i, o) {
    $('.' + o.excutiveName + o.period.replace(/\s/g, '') + (o.channel.replace(/\//g, '')).replace(/\s/g, '')).text(o.value);
  });
  var tarTotal = 0, achvTotal = 0, balTotal = 0;
  // target achv balance values assigning
  console.log('tarTotal', tarTotal);
  console.log('achvTotal', achvTotal);
  console.log('balTotal', balTotal);
  $.each(jsonData, function (i, o) {
    tarTotal = 0, achvTotal = 0, balTotal = 0;
    $('.' + o.excutive + o.period.replace(/\s/g, '') + 'tar').text(o.target);
    $('.' + o.excutive + o.period.replace(/\s/g, '') + 'achv').text(o.actual);
    $('.' + o.excutive + o.period.replace(/\s/g, '') + 'bal').text(o.balance);
    $('.' + o.excutive + o.period.replace(/\s/g, '') + 'rsv').text(o.rsv);
  });

  $.each(executives, function (ei, eo) {
    tarTotal = 0, achvTotal = 0, balTotal = 0;
    $.each(periods, function (pi, po) {
      $.each(excutiveSaleData, function (i, o) {
        if (o.excutive === eo.excutiveName && o.period.replace(/\s/g, '') === po.periodName.replace(/\s/g, '')) {
          tarTotal += o.target;
          achvTotal += o.actual;
          balTotal += o.balance;
        }
      })

      $('.' + eo.excutiveName + 'tarTotal').text(tarTotal);
      $('.' + eo.excutiveName + 'achvTotal').text(achvTotal);
      $('.' + eo.excutiveName + 'balTotal').text(balTotal);

    });
  });
}

