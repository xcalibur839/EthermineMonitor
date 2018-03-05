//Attempt to load Google chart library
google.charts.load('current', {packages: ['corechart', 'line']});

function drawChart() {
    //On first load, Google objects might not fully load before drawChart is called
    //Catch any errors, wait 3s, and try again to account for this
    try {
        for (var i = 0; i < WalletArray.length; i++) {
            //Prepare the chart table and columns
            var data = new google.visualization.DataTable();
            data.addColumn('datetime', 'Time');
            data.addColumn('number', 'Current');
            data.addColumn('number', 'Reported');
            data.addColumn('number', 'Average');

            //Set the chart options
            var options = {
                title: WalletArray[i].name,
                hAxis: {
                    title: 'Time (24h)',
                },
                vAxis: {
                    title: 'Hashrate (Mh/s)'
                },
                legend: { 
                    position: 'bottom',
                    display: 'none'
                },
                explorer: {}
            };

            //Add the history data from the WalletArray to the chart
            for (var j = 0; j < WalletArray[i].history.length; j ++) {
                data.addRow([
                    new Date(WalletArray[i].history[j].time * timeOffset), 
                    WalletArray[i].history[j].currentHashrate / mHashOffset,
                    WalletArray[i].history[j].reportedHashrate / mHashOffset,
                    WalletArray[i].history[j].averageHashrate / mHashOffset
                ]);
            }

            //Draw the chart
            var chart = new google.visualization.LineChart(document.getElementById(WalletArray[i].name));
            chart.draw(data, options);
        }
    }
    catch (e) {
        console.log("Error loading chart, retry in 3s\n" + e);
        setTimeout(drawChart, 3000);
    }
}