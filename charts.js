google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawChart);
$(document).ajaxStop(function() {
    //console.log("Ajax done with length: " + WalletArray.length);
    drawChart();
});

function drawChart() {
    //console.log("drawChart length: " + WalletArray.length);
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

        for (var j = 0; j < WalletArray[i].history.length; j ++) {
            data.addRow([
                new Date(WalletArray[i].history[j].time * timeOffset), 
                WalletArray[i].history[j].currentHashrate / mHashOffset,
                WalletArray[i].history[j].reportedHashrate / mHashOffset,
                WalletArray[i].history[j].averageHashrate / mHashOffset
            ]);
        }

        var chart = new google.visualization.LineChart(document.getElementById(WalletArray[i].name));
        chart.draw(data, options);
    }
}