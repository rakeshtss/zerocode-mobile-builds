
var channels = [
    {
        "name": "A",
        "month": "Jan",
        "type": "TSV",
        "value": 22
    },
    {
        "name": "B",
        "month": "Jan",
        "type": "TSV",
        "value": 22
    },
    {
        "name": "C",
        "month": "Jan",
        "type": "TSV",
        "value": 22
    },
    {
        "name": "A",
        "month": "Jan",
        "type": "SALES",
        "value": 22
    },
    {
        "name": "B",
        "month": "Jan",
        "type": "SALES",
        "value": 22
    },
    {
        "name": "C",
        "month": "Jan",
        "type": "SALES",
        "value": 22
    },
    {
        "name": "A",
        "month": "Jan",
        "type": "PER",
        "value": 22
    },
    {
        "name": "B",
        "month": "Jan",
        "type": "PER",
        "value": 22
    },
    {
        "name": "C",
        "month": "Jan",
        "type": "PER",
        "value": 22
    },
    {
        "name": "A",
        "month": "Feb",
        "type": "TSV",
        "value": 22
    },
    {
        "name": "B",
        "month": "Feb",
        "type": "TSV",
        "value": 22
    },
    {
        "name": "C",
        "month": "Feb",
        "type": "TSV",
        "value": 22
    },
    {
        "name": "A",
        "month": "Feb",
        "type": "SALES",
        "value": 22
    },
    {
        "name": "B",
        "month": "Feb",
        "type": "SALES",
        "value": 22
    },
    {
        "name": "C",
        "month": "Feb",
        "type": "SALES",
        "value": 22
    },
    {
        "name": "A",
        "month": "Feb",
        "type": "PER",
        "value": 22
    },
    {
        "name": "B",
        "month": "Feb",
        "type": "PER",
        "value": 22
    },
    {
        "name": "C",
        "month": "Feb",
        "type": "PER",
        "value": ''
    }
];
var channelsList = [];
var months = [{ "name": "Jan" }, { "name": "Feb" }, { "name": "March" }];
var allChannelsMonths = [];
var monthsData = [
    {
        name: 'Jan',
        typeTSV: '',
        typeSALES: '',
        typePER: '',
        channelName: ''
    },
    {
        name: 'Feb',
        typeTSV: '',
        typeSALES: '',
        typePER: '',
        channelName: ''
    }
];
if (window.jQuery) {
    var $ = jQuery;
    var apiUrl = zc.config.apiUrl;
    $(document).ready(function () {
        var tableRow = '';

        var bgColor = '#' + Math.floor(Math.random() * 16777216).toString(16);
        if (bgColor === "#ffffff" || bgColor === "#FFFFFF") {
            bgColor = "#ffff00";
        }
        // var typeTSV;
        // var typeSALES;
        // var typePER;
        // var channelName = "";
        var td = [];
        var allChannels = [];
        const payload = {};
        channels.forEach(channel => {
            monthsData.forEach(month => {               //jan
                if (month.name == channel.month) { // jan = jan
                    if (channel.type === 'TSV') {
                        month.typeTSV = channel.value;
                    } else if (channel.type === 'SALES') {
                        month.typeSALES = channel.value;
                    } else if (channel.type === 'PER') {
                        month.typePER = channel.value;
                    }
                    if (channel.name) {
                        // month.channelName = channel.name;
                        allChannels.push(channel.name);
                    }
                    //  console.log('months Data', JSON.stringify(month));
                    Object.assign(payload, month);
                    payload.chanName = channel.name;
                    allChannelsMonths.push(payload);
                    //  console.log('allChannelsMonths Data', JSON.stringify(allChannelsMonths));
                }
            });
            // console.log('months Data', JSON.stringify(monthsData));
            //  allChannelsMonths.push(monthsData);




            // to order in month wise

            months.forEach((month, index) => { //jan , feb , mar
                monthsData.forEach((mData, ind) => { // feb , jan 
                    if (month.name == mData.name) {
                        td[index] = "<p>" + mData.typeTSV + "</p>" + "<p>" + mData.typeSALES + "</p>" + "<p>" + mData.typePER + "</p>";
                    }
                    else {
                        td[index] = "--";
                    }
                    // console.log("each channel mData", mData);
                    // allChannelsMonths.push(mData);
                });
            });

                tableRow = `<tr>
                <td>
                  <div class="channel-info">
                    <span class="channel-name" style="background-color: ${bgColor}">${channelName}</span>
                    <span class="channel-type">
                      <p class="tsv">TSV</p>
                      <p class="sales">SALES</p>
                      <p class="percentage">%</p>
                    </span>
                  </div>
                </td>
                <td>${td[0]}       
                </td>
                <td>${td[1]}       
                </td>
                <td>${td[2]}       
                </td>
              </tr>`;
                $('#channelTable').append(tableRow);
        });
        var myNewChannels = allChannels.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });
        // var newAllChannelsMonths = allChannelsMonths.filter(function (elem, index, self) {
        //     return index === self.indexOf(elem);
        // });
        console.log("allChannels", myNewChannels);
        console.log('allChannelsMonths Data', JSON.stringify(allChannelsMonths));
        myNewChannels.forEach(element => {

        });
    });

}

