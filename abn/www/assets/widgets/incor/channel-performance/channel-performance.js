var channelBgColor = ["#70C149", "#E6B211", "#EE5641", "#ED008C", "#40B4D9", "#9A6AB6", "#AE8C4C"];
$(function () {
  // var data=[[${data}]];

  // var data=[[${data}]];
  // renderChannelData(data.rows);

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
  // $(window).on('load', function () {
  //   debugger;
  //   $('.loader-wrap').fadeOut(5000);
  // });
  $(document).ready(function () {
    url = zc.config.apiUrl + zc.config.app + '/api/incor/reports/channel-performance/channel-performance';
    var payload = { project: { uid: zc.wdProjectForm.model.project.uid } };
    zc_req('/api/incor/reports/channel-performance/channel-performance', payload, function (response) {
      channels = response.data.listData.rows;
      // inital();
      renderChannelData();
    })

  });

});
function renderChannelData() {
  $('#channel-perfomance').html('');
  var channelObj = {}, channelArr = [], monthObj = {}, monthArr = [];
  $.each(channels, function () {
    var item = this;
    if ($.trim(item.name) != '' && channelObj[item.name] == undefined) {
      channelObj[item.name] = {};
      channelArr.push(item.name);
    }
    if ($.trim(item.month) != '' && monthObj[item.month] == undefined) {
      monthObj[item.month] = {};
      monthArr.push(item.month);
    }
  });

  $('.report-head').attr('colspan', monthArr.length + 3);
  var dataHead = $('#channel-perfomance');
  var _tr = $('<tr/>');
  var _tr2 = $('<tr/>');
  var _th = $('<th/>', { html: "", rowspan: '2' });
  _tr.append(_th);
  // _th = $('<th/>', {html: "TSV / SALES" });
  _tr.append(_th);
  $.each(channelArr, function (i, o) {
    var item = this;
    _th = $('<th/>', { text: item, colspan: '3', style: "font-weight:bold;color:#EEEEEE;background:" + channelBgColor[i % channelBgColor.length] + ";" });
    _th2tsv = $('<th/>', { text: 'TSV' });
    _th2sales = $('<th/>', { text: 'SAL' });
    _th2per = $('<th/>', { text: '%' });
    _tr.append(_th);
    _th = $('<th/>', { style: 'width: 3px', class: 'extra' });
    _tr.append(_th);
    _tr2.append(_th2tsv);
    _tr2.append(_th2sales);
    _tr2.append(_th2per);
    _th = $('<th/>', { style: 'width: 3px', class: 'extra' });
    _tr2.append(_th);
  });

  _th = $('<th/>', { text: "Total", colspan: '3', style: 'background: #000; color: #FFF' });
  _th2tsv = $('<th/>', { text: 'TSV' });
  _th2sales = $('<th/>', { text: 'SAL' });
  _th2per = $('<th/>', { text: '%' });

  _tr.append(_th);
  _tr2.append(_th2tsv);
  _tr2.append(_th2sales);
  _tr2.append(_th2per);

  dataHead.append(_tr);
  dataHead.append(_tr2);

  //Final Totals
  var dataFoot = $('#channel-perfomance');
  var _tr = $('<tr/>');
  var _td = $('<td/>', { text: 'Total', style: 'font-weight:bold;' });
  _tr.append(_td);
  $.each(channelArr, function (i, o) {
    var item = o;
    _td = $('<td>', { html: '&nbsp;', id: idCreator("tsv-total-" + item.replace(/\s/g, '')), style: "background:#FE8383;" });
    _tr.append(_td);
    _td = $('<td>', { html: '&nbsp;', id: idCreator("sales-total-" + item.replace(/\s/g, '')), style: "background-color: #17a2b8 !important;" });
    _tr.append(_td);
    _td = $('<td>', { html: '&nbsp;', id: idCreator("per-total-" + item.replace(/\s/g, '')) });
    _tr.append(_td);
    _td = $('<td/>',{class:'empty-td', style:'background: #f6f8fa; border:0;'});
    _tr.append(_td);
  });
  _td = $('<td/>',{id: idCreator("tsv-total-" +'') });
  _tr.append(_td);
  _td = $('<td/>',{id: idCreator("sales-total-" + '')});
  _tr.append(_td);
  _td = $('<td/>', {id: idCreator("per-total-" + '')});
  _tr.append(_td);
  dataFoot.append(_tr);

  var dataBody = $('#channel-perfomance');
  $.each(monthArr, function (i, o) {
    var item = o.replace(/\s/g, '');
    var _tr = $('<tr/>');
    var _td = $('<td/>', { text: item, style: "font-weight:bold;" });
    _tr.append(_td);
    $.each(channelArr, function (i, o) {
      var monItem = this.replace(/\s/g, '');
      _td = $('<td>', { html: '&nbsp;', id: idCreator(item + monItem + "tsv") });
      _tr.append(_td);
      _td = $('<td>', { html: '&nbsp;', id: idCreator(item + monItem + "sales") });
      _tr.append(_td);
      _td = $('<td>', { html: '&nbsp;', id: idCreator(item + monItem + "per") });
      _tr.append(_td);
      _td = $('<td/>', { style: 'width: 3px', class: 'extra-td' });
      _tr.append(_td);
    });
    _td = $('<td/>', { html: "&nbsp;", style: "background:#FE8383;", id: idCreator(item + "-tsv-total") });//Total TSV
    _tr.append(_td);
    _td = $('<td/>', { html: "&nbsp;", style: "background:#17a2b8;", id: idCreator(item + "-sales-total") });//Total Sales
    _tr.append(_td);
    _td = $('<td/>', { html: "&nbsp;", id: idCreator(item + "-per-total") });//Total %
    _tr.append(_td);
    dataBody.append(_tr);
  });

  $.each(channels, function () {
    var item = this;
    var id = '';
    var type = item.type;
    if (type) type = (type + '').toLowerCase();
    if ('tsv' === type) {
      id = idCreator(item.month + item.name + "tsv");
    } else if ('sales' === type) {
      // id = item.month.replace(/\s/g, '') + item.name.replace(/\s/g, '') + "sales";
      id = idCreator(item.month + item.name + "sales");
    } else {
      // id = item.month.replace(/\s/g, '') + item.name.replace(/\s/g, '') + "per";
      id = idCreator(item.month + item.name + "per");
    }
    $('#' + idCreator(id)).html(item.value);
  });


  $.each(monthArr, function (inx, obj) {
    totalMonthsTSV = 0;
    totalMonthsSALES = 0;
    totalMonthsPER = 0;
    $.each(channels, function (i, o) {

      if ((obj === o.month) && (o.type === "TSV")) {
        totalMonthsTSV += parseInt(o.value);
      } else if ((obj === o.month) && (o.type === "SALES")) {
        totalMonthsSALES += parseInt(o.value);
      } else if ((obj === o.month) && (o.type === "PER")) {
        if (totalMonthsTSV !== 0) {
          totalMonthsPER = ((totalMonthsSALES / totalMonthsTSV) * 100).toFixed(2);
        } else {
          totalMonthsPER = 0;
        }
      }
    });
    $('#' + idCreator(obj + '-tsv-total')).html(totalMonthsTSV);
    $('#' + idCreator(obj + '-sales-total')).html(totalMonthsSALES);
    $('#' + idCreator(obj + '-per-total')).html(totalMonthsPER);
  })

  $.each(channelArr, function (i, o) {
    totalChannelsTSV = 0;
    totalChannelsSALES = 0;
    totalChannelsPER = 0;
    o = idCreator(o);
    $.each(channels, function (inx, obj) {
      obj.name = obj.name.replace('/', '');;
      if ((o === obj.name) && (obj.type === "TSV")) {
        totalChannelsTSV += parseInt(obj.value);;
      } else if ((o === obj.name) && (obj.type === "SALES")) {
        totalChannelsSALES += parseInt(obj.value);
      } else if ((o === obj.name) && (obj.type === "PER")) {
        if (totalChannelsTSV !== 0) {
          totalChannelsPER = ((totalChannelsSALES / totalChannelsTSV) * 100).toFixed(2);
        } else {
          totalChannelsPER = 0;
        }
      }
    });
    $('#' + idCreator('tsv-total-' + o)).html(totalChannelsTSV);
    $('#' + idCreator('sales-total-' + o)).html(totalChannelsSALES);
    if (totalChannelsTSV !== 0) {
      totalChannelsPER = ((totalChannelsSALES / totalChannelsTSV) * 100).toFixed(2);
    } else {
      totalChannelsPER = 0;
    }
    $('#' + idCreator('per-total-' + o)).html(totalChannelsPER);

  });
}
function idCreator(channels) {
  return channels.replace('\/', '_');
}
