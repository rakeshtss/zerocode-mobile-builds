var channels = [];
var temporaryChannels = [];
var temporaryMonths = [];
var temporaryTypes = [];
var channelsList = [];
var totalMonthsTSV = 0;
var totalMonthsSALES = 0;
var totalMonthsPER = 0;
var totalChannelsTSV = 0;
var totalChannelsSALES = 0;
var totalChannelsPER = 0;
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
    url = zc.config.apiUrl + zc.config.app + '/api/incor/reports/channel-performance/channel-performance';
    var payload = { project: { uid: zc.wdProjectForm.model.project.uid } };
    zc_req('/api/incor/reports/channel-performance/channel-performance', payload, function (response) {
      channels = response.data.listData.rows;
      inital();
    })

  });

  function inital() {
    var tableRow = '';
    var channelObj = {}, channelRes = [];
    var monthObj = {}, monthRes = [];
    var typesObj = {}, typesRes = [];
    $.each(channels, function (inx, val) {
      var channelName = val.name;
      var monthName = val.month;
      var typeName = val.type;
      if (!(channelName in channelObj) && channelName != '') {
        channelObj[channelName] = 1;
        channelRes.push({ channelName: channelName });
      }
      if (!(monthName in monthObj) && monthName != '') {
        monthObj[monthName] = 1;
        monthRes.push({ monthName: monthName });
      }
      if (!(typeName in typesObj) && typeName != '') {
        typesObj[typeName] = 1;
        typesRes.push({ typeName: typeName });
      }


    });;
    var _tr = $('<tr/>')
    var _trFoot = $('<tr/>')
    $.each(monthRes, function (i, o) {
      ;
      if (i === 0) {
        var _th1 = $(`<th class="th-first" name="${o.monthName}"><span class="bg-danger">TSV</span> / <span class="bg-info">SALES</span></th>`);
        _tr.append(_th1);
        var _tdFootFirst = $(`<td class="th-first" name="${o.monthName}"></td>`);
        _trFoot.append(_tdFootFirst);
      }
      var _th = $('<th/>', { text: o.monthName });
      var _tdFoot = $(`<td class="th-first" name="${o.monthName}"></td>`);
      var totalMonthsTSV = $('<p/>', { class: o.monthName + 'totalTsv' + ' ' + 'bg-danger' });
      var totalMonthsSALES = $('<p/>', { class: o.monthName + 'totalSales' + ' ' + 'bg-info' });
      var totalMonthsPER = $('<p/>', { class: o.monthName + 'totalPer' });
      _tdFoot.append(totalMonthsTSV);
      _tdFoot.append(totalMonthsSALES);
      _tdFoot.append(totalMonthsPER);
      _trFoot.append(_tdFoot);
      // var _thLast = $('<th/>', { text: 'TOTAL' });
      _tr.append(_th);
      // _tr.append(_thLast);
      $('#channelTableHeader').append(_tr);
      $('#channelTableFoot').append(_trFoot);
    });
    _tr.append('<th>TOTAL</th>');
    $.each(channelRes, function (ind, obj) {
      var channelFullName = obj.channelName;
      obj.channelName = obj.channelName.replace('/', '');
      obj.channelName = obj.channelName.replace(/\s/g, '');

      var _trBody = $('<tr/>');
      var channelBgColor = ["#70C149", "#E6B211", "#EE5641", "#ED008C", "#40B4D9", "#9A6AB6", "#AE8C4C"];
      var _td1 = $(`<td name="${obj.channelName}"><div class="channel-info"><span class="channel-name" style="background-color: ${channelBgColor[ind]};color:#fff;">${channelFullName}</span>
                  <span class="channel-type">
                    <p name="${obj.channelName}tsv" class="tsv">TSV</p>
                    <p name="${obj.channelName}sales" class="sales">SALES</p>
                    <p name="${obj.channelName}per" class="percentage">%</p>
                  </span>
                </div>
              </td>`);
      _trBody.append(_td1);
      $.each(monthRes, function (i, o) {
        var _td = $('<td/>', { class: obj.channelName + o.monthName });
        var tsv = $('<p/>', { class: obj.channelName + o.monthName + 'tsv' });
        var sales = $('<p/>', { class: obj.channelName + o.monthName + 'sales' });
        var per = $('<p/>', { class: obj.channelName + o.monthName + 'per' });
        _td.append(tsv);
        _td.append(sales);
        _td.append(per);
        _trBody.append(_td);
        $('#channelTableBody').append(_trBody);
      })
      _trBody.append(`<td class="total-td"><p class='bg-danger totalChaneelTSV${obj.channelName}'></p>
            <p class='bg-info totalChaneelSALES${obj.channelName}'></p>
            <p class='totalChaneelPER${obj.channelName}'></p></td>`);
    })
    var saleVal = 0;
    var tsvVal = 0
    $.each(channels, function (i, o) {
      o.name = o.name.replace('/', '');
      o.name = o.name.replace(/\s/g, '');

      if (o.type == "SALES") {
        $('p.' + o.name + o.month + 'sales').text(o.value);
        saleVal = o.value
      } else if (o.type == "TSV") {
        $('p.' + o.name + o.month + 'tsv').text(o.value);
        tsvVal = o.value
      } else {
        $('p.' + o.name + o.month + 'per').text(o.value + '%');
        $('p.' + o.name + o.month + 'per').css(
          {
            'background-color': '#ebebeb',
            'color': '#000'
          });

      }
    });
    $.each(monthRes, function (inx, obj) {
      totalMonthsTSV = 0;
      totalMonthsSALES = 0;
      totalMonthsPER = 0;
      $.each(channels, function (i, o) {

        if ((obj.monthName === o.month) && (o.type === "TSV")) {
          totalMonthsTSV += parseInt(o.value);
        } else if ((obj.monthName === o.month) && (o.type === "SALES")) {
          totalMonthsSALES += parseInt(o.value);
        } else if ((obj.monthName === o.month) && (o.type === "PER")) {
          if(totalMonthsSALES !==0){
            totalMonthsPER = ((totalMonthsSALES / totalMonthsTSV)* 100).toFixed(2);
          }
        }
      });
      $('p.' + obj.monthName + 'totalTsv').text(totalMonthsTSV);
      $('p.' + obj.monthName + 'totalSales').text(totalMonthsSALES);
      $('p.' + obj.monthName + 'totalPer').text((( totalMonthsPER === 0) ? '--' : totalMonthsPER + '%' ));
    })
    // $.each(channelRes, function (i, o) {
    //   totalChannelsTSV = 0;
    //   totalChannelsSALES = 0;
    //   totalChannelsPER = 0;
    //   o.channelName = o.channelName.replace('/', '');
    //   $.each(channels, function (inx, obj) {
    //     obj.name = obj.name.replace('/', '');;
    //     if ((o.channelName === obj.name) && (obj.type === "TSV")) {
    //       ;
    //       totalChannelsTSV += parseInt(obj.value);;
    //     } else if ((o.channelName === obj.name) && (obj.type === "SALES")) {
    //       totalChannelsSALES += parseInt(obj.value);
    //     } else if ((o.channelName === obj.name) && (obj.type === "PER")) {
    //       totalChannelsPER += parseInt(obj.value);
    //     }
    //   });
    //   $('p.totalChaneelTSV' + o.channelName).text(totalChannelsTSV);
    //   $('p.totalChaneelSALES' + o.channelName).text(totalChannelsSALES);
    //   if (totalChannelsSALES !== 0) {
    //     $('p.totalChaneelPER' + o.channelName).text((totalChannelsSALES * 100 / totalChannelsTSV).toFixed(2) + '%');
    //   } else {
    //     $('p.totalChaneelPER' + o.channelName).text("--");
    //   }
    // })
    

    $.each(channelRes, function (i, o) {
      totalChannelsTSV = 0;
      totalChannelsSALES = 0;
      totalChannelsPER = 0;
      
      o.channelName = o.channelName.replace('/', '');
      $.each(channels, function (inx, obj) {
        obj.name = obj.name.replace('/', '');;
        if ((o.channelName === obj.name) && (obj.type === "TSV")) {
          ;
          totalChannelsTSV += parseInt(obj.value);;
        } else if ((o.channelName === obj.name) && (obj.type === "SALES")) {
          totalChannelsSALES += parseInt(obj.value);
        } else if ((o.channelName === obj.name) && (obj.type === "PER")) {
          if(totalChannelsSALES !==0){
            totalChannelsPER = ((totalChannelsSALES  / totalChannelsTSV)* 100).toFixed(2);
          }
        }
      });
      $('p.totalChaneelTSV' + o.channelName).text(totalChannelsTSV);
      $('p.totalChaneelSALES' + o.channelName).text(totalChannelsSALES);
      // if (totalChannelsSALES !== 0) {
      // }
      $('p.totalChaneelPER' + o.channelName).text(((totalChannelsPER === 0)?'--':totalChannelsPER + '%'));
    })

  }

}