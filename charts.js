google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    for (var i = 0; i < WalletArray.length; i++) {
        var data = new google.visualization.DataTable();
        data.addColumn('datetime', 'Time');
        data.addColumn('number', 'Current');
        data.addColumn('number', 'Reported');
        data.addColumn('number', 'Average');

        var options = {
            title: WalletArray[i].name,
            hAxis: {
                title: 'Time',
                baselineColor: 'red'
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

        for (var j = 0; j < WalletArray[i].entries.length; j ++) {
            data.addRow([
                new Date(WalletArray[i].entries[j].time * timeOffset), 
                WalletArray[i].entries[j].currentHashrate / mHashOffset,
                WalletArray[i].entries[j].reportedHashrate / mHashOffset,
                WalletArray[i].entries[j].averageHashrate / mHashOffset
            ]);
        }

        var chart = new google.visualization.LineChart(document.getElementById(WalletArray[i].name));
        chart.draw(data, options);
    }
}