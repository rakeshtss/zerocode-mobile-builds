var type = [{}]

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
        if (zc.form_filter && zc.form_filter.model.month) {
            month = zc.form_filter.model.month;
        } else {
            window.zc.form_filter.model.month = month;
        }
        url = zc.config.apiUrl + zc.config.app + '/api/incor/reports/executive-vs-sales/executive-vs-sales';
        var payload = { project: { uid: zc.wdProjectForm.model.project.uid, month: month } };
        zc_req('/api/incor/reports/executive-vs-sales/executive-vs-sales', payload, function (response) {
            periodArr = response.data.listData.zc_extra.data1;
            channelArr = response.data.listData.zc_extra.data2;
            excutiveNameArr = response.data.listData.zc_extra.data3;
            excutiveSaleData = response.data.listData.zc_extra.data4;
            excutiveSales = response.data.listData.zc_extra.data5;
            reloadData();
        });
        // details of excutive

    });
};
function reloadData() {
    $('.executive-vs-sales').html('');
    var _thead = $('<thead/>');
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var now = new Date(month);
    // for header
    var _htr = $('<tr/>');
    _htr.append($('<th/>', { rowspan: 2, class: 'first', html: monthNames[now.getMonth()] + '-' + now.getFullYear().toString().substr(-2), style: 'font-weight:bold;text-align:left;' }));
    var channelBgColor = ["#70c149", "#e6b211", "#ee5545", "#3fb4d8", "#9a6ab6", "#ae8c4c", "#AE8C4C"];
    var _htr2 = $('<tr/>');
    // _htr2.append($('<th/>'));
    $.each(periodArr, function (i, o) {
        var _th = $('<th/>', { colspan: channelArr.length + 3, text: o.periodName, style: 'background-color: #000;color:#fff;' });
        _htr.append(_th);
        var emptyTh = $('<th/>', { style: 'width:3px;border:none;background:#f6f8fa;' })
        _htr.append(emptyTh);
        $.each(channelArr, function (chn, name) {
            var _hTh = $(`<th style="background-color: ${channelBgColor[chn]};color:#fff;">${name.channel}</th>`);
            _htr2.append(_hTh);
        });
        _htr2.append("<th class=''>TAR</th><th class='' style='padding-right: 15px;'>ACHV</th><th class=''>BAL</th><th style='width:3px;border:none;background:#f6f8fa;'></th>");
    });
    _htr.append("<th colspan='3' style='background: #000 !important;color:#fff !important;'>Total</th>");

    _thead.append(_htr);
    _thead.append(_htr2);
    $('.executive-vs-sales').append(_thead);

    // var _tfoot = $('<tfoot/>', { class: 'executive-vs-sales-footer' });
    var _ftr = $('<tr/>', { class: 'tfoot-cls' })
    _ftr.append($('<td/>', { html: '<b>TOTAL</b>', style: 'background:#ffe0c1;text-align:left;' }));
    $.each(periodArr, function (i, o) {
        $.each(channelArr, function (chn, name) {
            var _fTd = $('<td/>', { style: 'background:#ffe0c1;', id: o.periodName.replace(/\s/g, '') + (name.channel.replace(/\//g, '')).replace(/\s/g, '') + 'total' });
            _ftr.append(_fTd);
        });
        _ftr.append("<td style='background:#8DE34E;' id=" + idCreator(o.periodName + "tar") + ">22</td><td style='background:#FF8383;' id=" + idCreator(o.periodName + "achv") + ">4</td><td id=" + idCreator(o.periodName + "bal") + " style='background:#40B4D9;'>3</td><td style='border:none;background:transparent;'></td>");
    });
    _tdEmptyGap1 = $('<td/>', { id: 'finalTotalTar', style: 'background-color: #8DE34E;color: #000;' });
    _tdEmptyGap2 = $('<td/>', { id: 'finalTotalAchv', style: 'background-color: #FF8383;color: #000;' });
    _tdEmptyGap3 = $('<td/>', { id: 'finalTotalBal', style: 'background-color: #40B4D9;color: #000;' });
    _ftr.append(_tdEmptyGap1);
    _ftr.append(_tdEmptyGap2);
    _ftr.append(_tdEmptyGap3);
    $('.executive-vs-sales').append(_ftr);
    // $('.executive-vs-sales').append(_tfoot);

    // body data
    var _tbody = $('<tbody/>');
    $('.executive-vs-sales').append(_tbody);
    $.each(excutiveNameArr, function (ei, eo) {
        var _tr = $('<tr/>');
        var _td = $('<td/>', { text: eo.excutiveName, class: 'excutiveNameCls' });
        _tr.append(_td);

        $.each(periodArr, function (pi, po) {
          eo.excutiveName = eo.excutiveName.split(" ").join("");
            $.each(channelArr, function (ci, co) {
                _td = $('<td/>', { id: eo.excutiveName + po.periodName.replace(/\s/g, '') + (co.channel.replace(/\//g, '')).replace(/\s/g, '') });
                _tr.append(_td);
            });
            // target
            _td = $('<td/>', { id: eo.excutiveName + po.periodName.replace(/\s/g, '') + 'tar', style: 'background-color: #8DE34E;color: #000;' });
            _tr.append(_td);
            // achive
            _td = $('<td/>', { id: eo.excutiveName + po.periodName.replace(/\s/g, '') + 'achv', style: 'background-color: #FF8383;color: #000;' });
            _tr.append(_td);
            // balance
            _td = $('<td/>', { id: eo.excutiveName + po.periodName.replace(/\s/g, '') + 'bal', style: 'background-color: #40B4D9;color: #000;' });
            _tr.append(_td);
            // empty
            _td = $('<td/>', { style: 'width:3px;border:none;background:transparent;' });
            _tr.append(_td);
        });
        _td = $('<td/>', { id: eo.excutiveName + 'tarTotal', style: 'background-color: #8DE34E;color: #000;' });
        _tr.append(_td);
        // achive
        _td = $('<td/>', { id: eo.excutiveName + 'achvTotal', style: 'background-color: #FF8383;color: #000;' });
        _tr.append(_td);
        // balance
        _td = $('<td/>', { id: eo.excutiveName + 'balTotal', style: 'background-color: #40B4D9;color: #000;' });
        _tr.append(_td);
        _td = $('<td/>', { style: 'width:3px;border:none;background:#f6f8fa;' });
        _tr.append(_td);
        _tbody.append(_tr);
    });

    $.each(excutiveSales, function (i, o) {
      o.excutiveName = o.excutiveName.split(" ").join("");
        $('#' + o.excutiveName + o.period.replace(/\s/g, '') + (o.channel.replace(/\//g, '')).replace(/\s/g, '')).text(o.value);
    });
    var tarTotal = 0, achvTotal = 0, balTotal = 0;
    // target achv balance values assigning
    $.each(excutiveSaleData, function (i, o) {
      o.excutive = o.excutive.split(" ").join("");
        tarTotal = 0, achvTotal = 0, balTotal = 0;
        $('#' + o.excutive + o.period.replace(/\s/g, '') + 'tar').text(o.target);
        $('#' + o.excutive + o.period.replace(/\s/g, '') + 'achv').text(o.actual);
        $('#' + o.excutive + o.period.replace(/\s/g, '') + 'bal').text(o.balance);
    });

    $.each(excutiveNameArr, function (ei, eo) {
      eo.excutiveName = eo.excutiveName.split(" ").join("");
        tarTotal = 0, achvTotal = 0, balTotal = 0;
        $.each(periodArr, function (pi, po) {
            $.each(excutiveSaleData, function (i, o) {
              o.excutive = o.excutive.split(" ").join("");
                if (o.excutive === eo.excutiveName && o.period === po.periodName) {
                    tarTotal += o.target;
                    achvTotal += o.actual;
                    balTotal += o.balance;
                }
            })
            $('#' + eo.excutiveName + 'tarTotal').text(tarTotal);
            $('#' + eo.excutiveName + 'achvTotal').text(achvTotal);
            $('#' + eo.excutiveName + 'balTotal').text(balTotal);
        });
    });


    var Total = 0;
    $.each(channelArr, function (ind, chn) {
        $.each(periodArr, function (inx, pe) {
            Total = 0;
            $.each(excutiveSales, function (i, o) {
              o.excutiveName = o.excutiveName.split(" ").join("");
                $.each(excutiveNameArr, function (nu, ex) {
                    if (pe.periodName.replace(/\s/g, '') === o.period.replace(/\s/g, '') && o.excutiveName === ex.excutiveName && (o.channel.replace(/\//g, '')).replace(/\s/g, '') === (chn.channel.replace(/\//g, '')).replace(/\s/g, '')) {
                        Total += parseInt(o.value);
                        // $('.'+o.period+'')
                    }
                });
            });
            $('#' + pe.periodName.replace(/\s/g, '') + (chn.channel.replace(/\//g, '')).replace(/\s/g, '') + 'total').text(Total);
            // $('#' + pe.periodName.replace(/\s/g, '') + 'tar').text(totalTAR);
            // $('#' + pe.periodName.replace(/\s/g, '') + 'bal').text('a');
            // $('#' + pe.periodName.replace(/\s/g, '') + 'achv').text('j');
            // $('#' + pe.periodName.replace(/\s/g, '') + 'rsv').text('');
        });
    });
    var totalTAR=0;
    var totalBALA=0;
    var totalACHV=0;
    var finalTotalTar=0;
    var finalTotalAchv=0;
    var finalTotalBal=0;
    $.each(periodArr, function (tin, pob) {
      totalTAR=0;
      totalBALA=0;
      totalACHV=0;
      $.each(excutiveSaleData, function (i, o) {
        if(pob.periodName === o.period){

          // console.log('tobtarget', o.target);
          // console.log('o.balance', o.balance);
          totalTAR += o.target;
          totalACHV += o.actual;
          totalBALA += o.balance;
        }
      })
      // console.log('totalBAL2', totalBALA);
      $("#" + idCreator(pob.periodName + 'tar')).text(totalTAR);
      $("#" + idCreator(pob.periodName + 'achv')).text(totalACHV);
      $("#" + idCreator(pob.periodName + 'bal')).text(totalBALA);
      finalTotalTar += totalTAR;
      finalTotalAchv += totalACHV;
      finalTotalBal += totalBALA;
      // console.log('finalTotalTar', finalTotalTar);
    })
    // console.log('finalTotalTar2', finalTotalTar);
    $('#finalTotalTar').text(finalTotalTar);
    $('#finalTotalAchv').text(finalTotalAchv);
    $('#finalTotalBal').text(finalTotalBal);
    // $('.excutiveNameCls').click(function () {
    //     detailsFun(this);
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
    var channelBgColor = ["#70c149", "#e6b211", "#ee5545", "#3fb4d8", "#9a6ab6", "#ae8c4c", "#AE8C4C"];
    var _htr2 = $('<tr/>');
    _htr2.append('<th></th>');
    $.each(periodArr, function (i, o) {
        var _th = $('<th/>', { colspan: channelArr.length + 3, text: o.periodName, style: 'background-color: #000;color:#fff;' });
        _htr.append(_th);
        _htr.append($('<td/>', { style: 'width:3px;border:none;background:#f6f8fa;' }))
        $.each(channelArr, function (chn, name) {
            var _hTh = $(`<th style="background-color: ${channelBgColor[chn]};color:#fff;">${name.channel}</th>`);
            _htr2.append(_hTh);
        });
        _htr2.append("<th class=''>TAR</th><th class='' style='padding-right: 15px;'>ACHV</th><th class=''>BAL</th>");
        _htr2.append($('<td/>', { style: 'width:3px;border:none;background:#f6f8fa;' }))
    });
    _htr.append("<th colspan='3' style='background-color: #000 !important;color:#fff !important;'>Total</th>");

    _thead.append(_htr);
    _thead.append(_htr2);
    $('.excutive-sale-info').append(_thead);

    var _tbody = $('<tbody/>');
    $('.excutive-sale-info').append(_tbody);
    $.each(excutiveNameArr, function (ei, eo) {
        if (eo.excutiveName === _execName) {
            var _tr = $('<tr/>');
            var _td = $('<td/>', { text: _execName });
            _tr.append(_td);

            $.each(periodArr, function (pi, po) {
                $.each(channelArr, function (ci, co) {
                    _td = $('<td/>', { class: eo.excutiveName + po.periodName.replace(/\s/g, '') + (co.channel.replace(/\//g, '')).replace(/\s/g, '') });
                    _tr.append(_td);
                });
                // target
                _td = $('<td/>', { class: eo.excutiveName + po.periodName.replace(/\s/g, '') + 'tar', style: 'background-color: #8DE34E;color: #000;' });
                _tr.append(_td);
                // achive
                _td = $('<td/>', { class: eo.excutiveName + po.periodName.replace(/\s/g, '') + 'achv', style: 'background-color: #FF8383;color: #000;padding-right:15px;' });
                _tr.append(_td);
                // balance
                _td = $('<td/>', { class: eo.excutiveName + po.periodName.replace(/\s/g, '') + 'bal', style: 'background-color: #40B4D9;color: #000;' });
                _tr.append(_td);
                _td = $('<td/>', { style: 'width:3px;border:none;background:#f6f8fa;' });
                _tr.append(_td);
            });
            _td = $('<td/>', { class: eo.excutiveName + 'tarTotal', style: 'background-color: #8DE34E;color: #000;' });
            _tr.append(_td);
            // achive
            _td = $('<td/>', { class: eo.excutiveName + 'achvTotal', style: 'background-color: #FF8383;color: #000;padding-right:15px;' });
            _tr.append(_td);
            // balance
            _td = $('<td/>', { class: eo.excutiveName + 'balTotal', style: 'background-color: #40B4D9;color: #000;' });
            _tr.append(_td);

            _tbody.append(_tr);
        }
    });
    $.each(excutiveSales, function (i, o) {
        $('.' + o.excutiveName + o.period.replace(/\s/g, '') + (o.channel.replace(/\//g, '')).replace(/\s/g, '')).text(o.value);
    });
    var tarTotal = 0, achvTotal = 0, balTotal = 0;
    // target achv balance values assigning
    $.each(excutiveSaleData, function (i, o) {
        tarTotal = 0, achvTotal = 0, balTotal = 0;
        $('.' + o.excutive + o.period.replace(/\s/g, '') + 'tar').text(o.target);
        $('.' + o.excutive + o.period.replace(/\s/g, '') + 'achv').text(o.actual);
        $('.' + o.excutive + o.period.replace(/\s/g, '') + 'bal').text(o.balance);
    });

    $.each(excutiveNameArr, function (ei, eo) {
        tarTotal = 0, achvTotal = 0, balTotal = 0;
        $.each(periodArr, function (pi, po) {
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
function idCreator(data) {
  return data.replace(/\s/g, '_');
}
