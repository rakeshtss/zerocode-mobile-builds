var json_data = [{ id: 1, Period_name: "1-15 Days", USV: 0, sold: 0, month: "Jan", saleConv: "45%", usvSaleConv: "5%" },
{ id: 2, Period_name: "16-31 Days", USV: 0, sold: 0, month: "Jan", saleConv: "45%", usvSaleConv: "5%" },
{ id: 3, Period_name: "1-15 Days", USV: 0, sold: 0, month: "Feb", saleConv: "45%", usvSaleConv: "5%" },
{ id: 4, Period_name: "16-31 Days", USV: 0, sold: 0, month: "Feb", saleConv: "45%", usvSaleConv: "5%" },
{ id: 5, Period_name: "1-15 Days", USV: 0, sold: 0, month: "Mar", saleConv: "45%", usvSaleConv: "5%" },
{ id: 6, Period_name: "16-31 Days", USV: 0, sold: 0, month: "Mar", saleConv: "45%", usvSaleConv: "5%" },
{ id: 7, Period_name: "1-15 Days", USV: 0, sold: 0, month: "Apr", saleConv: "45%", usvSaleConv: "5%" },
{ id: 8, Period_name: "16-31 Days", USV: 0, sold: 0, month: "Apr", saleConv: "45%", usvSaleConv: "5%" },
{ id: 9, Period_name: "1-15 Days", USV: 0, sold: 0, month: "May", saleConv: "45%", usvSaleConv: "5%" },
{ id: 10, Period_name: "16-31 Days", USV: 666, sold: 05, month: "May", saleConv: "45%", usvSaleConv: "5%" },
{ id: 11, Period_name: "1-15 Days", USV: 220, sold: 02, month: "Jun", saleConv: "45%", usvSaleConv: "5%" },
{ id: 12, Period_name: "16-31 Days", USV: 212, sold: 05, month: "Jun", saleConv: "45%", usvSaleConv: "5%" },
{ id: 13, Period_name: "1-15 Days", USV: 222, sold: 03, month: "Jul", saleConv: "45%", usvSaleConv: "5%" },
{ id: 14, Period_name: "16-31 Days", USV: 232, sold: 05, month: "Jul", saleConv: "45%", usvSaleConv: "5%" },
{ id: 15, Period_name: "1-15 Days", USV: 242, sold: 01, month: "Aug", saleConv: "45%", usvSaleConv: "5%" },
{ id: 16, Period_name: "16-31 Days", USV: 252, sold: 05, month: "Aug", saleConv: "45%", usvSaleConv: "5%" },
{ id: 17, Period_name: "1-15 Days", USV: 262, sold: 00, month: "Sep", saleConv: "45%", usvSaleConv: "5%" },
{ id: 18, Period_name: "16-31 Days", USV: 272, sold: 05, month: "Sep", saleConv: "45%", usvSaleConv: "5%" },
{ id: 19, Period_name: "1-15 Days", USV: 282, sold: 06, month: "Oct", saleConv: "45%", usvSaleConv: "5%" },
{ id: 20, Period_name: "16-31 Days", USV: 292, sold: 05, month: "Oct", saleConv: "45%", usvSaleConv: "5%" },
{ id: 21, Period_name: "1-15 Days", USV: 202, sold: 07, month: "Nov", saleConv: "45%", usvSaleConv: "5%" },
{ id: 22, Period_name: "16-31 Days", USV: 221, sold: 05, month: "Nov", saleConv: "45%", usvSaleConv: "5%" },
{ id: 23, Period_name: "1-15 Days", USV: 233, sold: 08, month: "Dec", saleConv: "45%", usvSaleConv: "5%" },
{ id: 24, Period_name: "16-31 Days", USV: 234, sold: 05, month: "Dec", saleConv: "45%", usvSaleConv: "5%" }]
// { id: 25, Period_name: "32-45 Days", USV: 234, sold: 05, month: "Jan", saleConv: "45%", usvSaleConv: "5%" },
// { id: 26, Period_name: "32-45 Days", USV: 234, sold: 05, month: "Feb", saleConv: "45%", usvSaleConv: "5%" },
// { id: 27, Period_name: "32-45 Days", USV: 234, sold: 05, month: "Mar", saleConv: "45%", usvSaleConv: "5%" },
// { id: 28, Period_name: "32-45 Days", USV: 234, sold: 05, month: "Apr", saleConv: "45%", usvSaleConv: "5%" },
// { id: 29, Period_name: "32-45 Days", USV: 234, sold: 05, month: "May", saleConv: "45%", usvSaleConv: "5%" },
// { id: 30, Period_name: "32-45 Days", USV: 234, sold: 05, month: "Jun", saleConv: "45%", usvSaleConv: "5%" },
// { id: 31, Period_name: "32-45 Days", USV: 234, sold: 05, month: "Jul", saleConv: "45%", usvSaleConv: "5%" },
// { id: 32, Period_name: "32-45 Days", USV: 234, sold: 05, month: "Aug", saleConv: "45%", usvSaleConv: "5%" },
// { id: 33, Period_name: "32-45 Days", USV: 234, sold: 05, month: "Sep", saleConv: "45%", usvSaleConv: "5%" },
// { id: 34, Period_name: "32-45 Days", USV: 234, sold: 05, month: "Oct", saleConv: "45%", usvSaleConv: "5%" },
// { id: 34, Period_name: "46-55 Days", USV: 234, sold: 05, month: "Oct", saleConv: "45%", usvSaleConv: "5%" }];

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
        if (zc.form_2041 && zc.form_2041.model.radio_4191.uid) {
            by_category = zc.form_2041.model.radio_4191.uid;
        }
        url = zc.config.apiUrl + zc.config.app + '/api/incor/reports/site-visit-vs-sales/site-visit-vs-sales';
        var payload = { project: { uid: zc.wdProjectForm.model.project.uid, by_category: by_category } };
        zc_req('/api/incor/reports/site-visit-vs-sales/site-visit-vs-sales', payload, function (response) {
            //channels = response.data.listData.rows;
            result = response.data.listData.zc_extra.data1;
            mRes = response.data.listData.zc_extra.data2;
            json_data = response.data.listData.zc_extra.data3;
            month_week_data = response.data.listData.zc_extra.data3;
            weekly_totals = response.data.listData.zc_extra.data4;
            monthly_totals = response.data.listData.zc_extra.data5;
            final_totals = response.data.listData.zc_extra.data6;
            reloadData();
        });
    });
};

function reloadData() {
    $('#site-visit-vs-sales-table').html('');
    var _thead = $('<thead/>');
    var _tbody = $('<tbody/>');

    var _htr1 = $('<tr/>');
    _htr1.append('<th></th>');
    $.each(result, function (i, val) {
        // var _th = $('<th/>', { collspan: result.length+2, text: val.PeriodName + "</p><table><tr><th class='' style='width: 100px;'>USV</th><th style='width: 100px;' class=''>SOLD</th><th class=''>SALE CONV % 1st 15 DAYS</th><th class=''>USV-SALE CONV %</th></tr></table>" });
        var _th = $('<th/>', { colspan: 4, text: val.PeriodName, style: 'background-color:#000;color:#fff;border-right:5px solid #f6f8fa;' });
        _htr1.append(_th);
    });
    _htr1.append("<th id='overall' colspan='4' style='background-color:#000;color:#fff;'>OVERALL</th>");
    // _htr1.append("<th><p>OVERALL</p><table><tr><th class='' style='width: 100px;'>USV</th><th style='width: 100px;' class=''>SOLD</th><th class=''>SALE CONV % 1st 15 DAYS</th></tr></table></th>");




    var _htr2 = $('<tr/>');
    _htr2.append('<th></th>');
    $.each(result, function (i, val) {
        // var _th = $('<th/>', { collspan: result.length+2, text: val.PeriodName + "</p><table><tr><th class='' style='width: 100px;'>USV</th><th style='width: 100px;' class=''>SOLD</th><th class=''>SALE CONV % 1st 15 DAYS</th><th class=''>USV-SALE CONV %</th></tr></table>" });
        var _thUSV = $('<th/>', { text: 'USV', id: val.PeriodName + 'USV', style: 'background-color:#70c149;color:#fff;' });
        var _thSOLD = $('<th/>', { text: 'SOLD', id: val.PeriodName + 'SOLD', style: 'background-color:#e6b211;color:#fff;' });
        var _thSALECONVEY = $('<th/>', { text: 'SALE CONV %', id: val.PeriodName + 'SALE-CONV' });
        var _thUSVSALECONVEY = $('<th/>', { text: 'USV SALE CONV %', id: val.PeriodName + 'USV-SALE-CONV', class: 'period-lst-td', style: 'border-right:5px solid #f6f8fa;' });
        _htr2.append(_thUSV);
        _htr2.append(_thSOLD);
        _htr2.append(_thSALECONVEY);
        _htr2.append(_thUSVSALECONVEY);
    });
    // _htr2.append('<th/>',{text: 'OVERALL',style:'background-color:#000;' });
    var _thUSVOVERAL = $('<th/>', { text: 'USV', style: 'background-color:#70c149;color:#fff;' });
    var _thSOLDOVERAL = $('<th/>', { text: 'SOLD', style: 'background-color:#e6b211;color:#fff;' });
    var _thUSVSALECONVEYOVERAL = $('<th/>', { text: 'USV SALE CONV %' });
    _htr2.append(_thUSVOVERAL);
    _htr2.append(_thSOLDOVERAL);
    _htr2.append(_thUSVSALECONVEYOVERAL);
    // _htr1.append("<th><p>OVERALL</p><table><tr><th class='' style='width: 100px;'>USV</th><th style='width: 100px;' class=''>SOLD</th><th class=''>SALE CONV % 1st 15 DAYS</th></tr></table></th>");

    _thead.append(_htr1);
    _thead.append(_htr2);
    $('#site-visit-vs-sales-table').append(_thead);

    var _total = $('<tr/>', { class: 'total-row' });
    var totalTd = $('<td/>', { text: "Total" });
    _total.append(totalTd);
    $.each(result, function (p, v) {
        var period_name = v.PeriodName.replace(/\s/g, '').replace(/[^a-z0-9\s]/gi, '')
        var totalFooterTdUSV = $('<td/>', { id: period_name + '-total-usv' });
        var totalFooterTdSOLD = $('<td/>', { id: period_name + '-total-sold' });
        var totalFooterTdSALECONVEY = $('<td/>', { id: period_name + '-total-sale-conv' });
        var totalFooterTdUSVSALECONVEY = $('<td/>', { id: period_name + '-total-usv-conv', class: 'period-lst-td', style: 'border-right:5px solid #f6f8fa;' });
        _total.append(totalFooterTdUSV);
        _total.append(totalFooterTdSOLD);
        _total.append(totalFooterTdSALECONVEY);
        _total.append(totalFooterTdUSVSALECONVEY);
    });
    _total.append('<td class="overall-usv"> </td><td class="overall-sold"> </td><td class="overall-usv-conv"> </td>')
    _tbody.append(_total);

    $.each(mRes, function (inx, m) {
        var _tr = $('<tr/>');
        var _td = $('<td/>', { class: m.monthName, text: m.monthName });
        _tr.append(_td)
        _tbody.append(_tr);
        var _perName;
        $.each(result, function (i, val) {
            _perName = val.PeriodName.replace(/\s/g, '').replace(/[^a-z0-9\s]/gi, '');
            var _td2;
            // if (o.usv != '' && o.sold != '') {
            // _td2 = $('<td/>', { class: m.monthName + _perName, html: '<table><td style="width: 100px;" class=' + m.monthName + _perName + '' + "usv" + '></td><td style="width: 100px;" class=' + m.monthName + _perName + '' + "sold" + '></td><td class=' + m.monthName + _perName + '' + "sale-conv" + '></td><td class=' + m.monthName + _perName + '' + "usv-conv" + '></td> </table>' });
            var _tdUSV = $('<td/>', { id: m.monthName + _perName + 'USV', style: 'background-color:#70c149;' });
            var _tdSOLD = $('<td/>', { id: m.monthName + _perName + 'SOLD', style: 'background-color:#e6b211;' });
            var _tdSALECONVEY = $('<td/>', { id: m.monthName + _perName + 'SALECONVEY' });
            var _tdUSVSALECONVEY = $('<td/>', { id: m.monthName + _perName + 'USVSALECONVEY', class: 'period-lst-td', style: 'border-right:5px solid #f6f8fa;' });
            // } else {
            //_td2 = $('<td/>', { class: m.monthName + _perName, html: '<table><td style="width: 100px;"></td><td style="width: 100px;" ></td><td ></td><td></td> </table>' });
            // }
            // _tr.append(_td2)
            _tr.append(_tdUSV)
            _tr.append(_tdSOLD)
            _tr.append(_tdSALECONVEY)
            _tr.append(_tdUSVSALECONVEY)
            _tbody.append(_tr);
        })
        // _tr.append('<td><table><td style="width: 100px;" class=' + m.monthName + '' + "overallusv" + '></td><td style="width: 100px;" class=' + m.monthName + '' + "overallsold" + '></td><td class=' + m.monthName + '' + "overallsale-conv" + '></td></table></td>');
        var _tdUSVOVERAL = $('<td/>', { id: m.monthName + 'overallusv', style: 'background-color:#70c149;' });
        var _tdSOLDOVERAL = $('<td/>', { id: m.monthName + 'overallsold', style: 'background-color:#e6b211;' });
        var _tdUSVSALECONVEYOVERAL = $('<td/>', { id: m.monthName + 'overallsale-conv' });
        _tr.append(_tdUSVOVERAL);
        _tr.append(_tdSOLDOVERAL);
        _tr.append(_tdUSVSALECONVEYOVERAL);
    });
    //_tbody.append('<tr><td>Total</td> <td> <table> <td style="width: 100px;" class="1-15Days-total-usv">hh</td> <td class="1-15Days-total-sold" style="width: 100px;">rrr</td> <td class="1-15Days-total-sale-conv">ddd</td> <td class="1-15Days-total-usv-conv">faaf</td> </table> </td> <td> <table> <td style="width: 100px;" class="16-31Days-total-usv">hh</td> <td class="16-31Days-total-sold" style="width: 100px;">rrr</td> <td class="16-31Days-total-sale-conv">ddd</td> <td class="16-31Days-total-usv-conv">faaf</td> </table> </td><td> <table> <td style="width: 100px;" class="overall-usv">hh</td> <td style="width: 100px;" class="overall-sold">rrr</td> <td class="overall-usv-conv">ddd</td> </table> </td> </tr>')
    $('#site-visit-vs-sales-table').append(_tbody);

    
    // _tbody.append('<td>Total</td> <td> <table> <td style="width: 100px;" class="1-15Days-total-usv">hh</td> <td class="1-15Days-total-sold" style="width: 100px;">rrr</td> <td class="1-15Days-total-sale-conv">ddd</td> <td class="1-15Days-total-usv-conv">faaf</td> </table> </td> <td> <table> <td style="width: 100px;" class="16-31Days-total-usv">hh</td> <td class="16-31Days-total-sold" style="width: 100px;">rrr</td> <td class="16-31Days-total-sale-conv">ddd</td> <td class="16-31Days-total-usv-conv">faaf</td> </table> </td><td> <table> <td style="width: 100px;" class="overall-usv">hh</td> <td style="width: 100px;" class="overall-sold">rrr</td> <td class="overall-usv-conv">ddd</td> </table> </td> </tr>')
    // $('.site-visits-vs-sales').append(_table);
    $.each(json_data, function (i, o) {
        var period = o.period_name.replace(/\s/g, '').replace(/[^a-z0-9\s]/gi, '');
        $('#' + o.month_name + period + 'USV').text(o.usv);
        $('#' + o.month_name + period + 'SOLD').text(o.sales);
        $('#' + o.month_name + period + 'SALECONVEY').text(o.sale_conv);
        $('#' + o.month_name + period + 'USVSALECONVEY').text(o.usv_conv);
    });
    var overallUsv = 0, overallSoldVal = 0, overallSaleConvVal = 0;
    $.each(monthly_totals, function (m, t) {
        overallUsv = 0;
        overallSoldVal = 0;
        overallSaleConvVal = 0;
        $('#' + t.month_name.replace(/\s/g, '') + 'overallusv').text(t.usv);
        $('#' + t.month_name.replace(/\s/g, '') + 'overallsold').text(t.sales);
        if (t.usv_conv === null || t.usv_conv === '') {
            $('#' + t.month_name.replace(/\s/g, '') + 'overallsale-conv').text('--');
        } else {
            $('#' + t.month_name.replace(/\s/g, '') + 'overallsale-conv').text(t.usv_conv);
        }
    });
    var totalUsvVal = 0, totalSoldVal = 0, totalSaleConvVal = 0; totalUsvSaleConvVal = 0;
    var _overallUsv = 0, overallSold = 0, overallSaleConv = 0;
    $.each(weekly_totals, function (i, val) {
        // totalUsvVal = 0;
        // totalSoldVal = 0;
        // totalSaleConvVal = 0;
        // $.each(json_data, function (i, o) {
        //     if (val.PeriodName === o.Period_name) {
        //         totalUsvVal += parseInt(o.USV);
        //         totalSoldVal += parseInt(o.sold);
        //         totalSaleConvVal += parseInt(o.saleConv);
        //         totalUsvSaleConvVal += parseInt(o.usvSaleConv);
        //     }
        // });
        // _overallUsv += totalUsvVal;
        // overallSold += totalSoldVal;
        // overallSaleConv += totalUsvSaleConvVal;
        var period = val.period_name.replace(/\s/g, '').replace(/[^a-z0-9\s]/gi, '')
        $('#' + period + '-total-usv').text(val.usv);
        $('#' + period + '-total-sold').text(val.sales);
        $('#' + period + '-total-sale-conv').text(val.sale_conv);
        if (val.usv_conv === null || val.usv_conv === '') {
            $('#' + period + '-total-usv-conv').text('--');
        } else {
            $('#' + period + '-total-usv-conv').text(val.usv_conv);
        }

    })
    $.each(final_totals, function (i, o) {
        $('.overall-usv').text(o.usv);
        $('.overall-sold').text(o.sales);
        $('.overall-usv-conv').text(o.usv_conv);
    })


    // $("#hide").click(function () {
    //     $("p").hide();
    // });

    // $("#show").click(function () {
    //     $("p").show();
    // });
    // $(document).ready(function () {
    //     $("#Ajaxbutton").click(function () {
    //         $("#div1").load("/assets/widgets/sample/demo_test.txt");
    //     });
    //     $(".descendants").children().css({ "color": "red", "border": "2px solid red" });
    //     $("#myInput").on("keyup", function () {
    //         var value = $(this).val().toLowerCase();
    //         $("#myTable tr").filter(function () {
    //             $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    //         });
    //     });
    // });

}