$(document).ajaxStop(displayCurrentStats);

function displayCurrentStats() {
    for (var i = 0; i <  WalletArray.length; i++) {
        var items = [];
            
        items.push("<p><h3 class=\"" + WalletArray[i].name + "\">" + WalletArray[i].name + "'s Miner</h3></p>")
        items.push("<p>Wallet: <a class=\"link\" target=\"_blank\" href=\"https://www.etherchain.org/account/" 
        + WalletArray[i].wallet + "\">" + WalletArray[i].wallet + "</a></p>");
    
        //items.push("<li id='" + key + "'>" + returnKey + ": " + returnVal + "</li>");
        
        items.push("<li>Reported Hashrate: " 
        + (WalletArray[i].currentStats.reportedHashrate / mHashOffset).toFixed(2) + " Mh/s</li>");

        items.push("<li>Current Hashrate: " 
        + (WalletArray[i].currentStats.currentHashrate / mHashOffset).toFixed(2) + " Mh/s</li>");

        items.push("<li>Average Hashrate: " 
        + (WalletArray[i].currentStats.averageHashrate / mHashOffset).toFixed(2) + " Mh/s</li>");

        items.push("<li>Valid Shares: " 
        + WalletArray[i].currentStats.validShares + "</li>");

        items.push("<li>Invalid Shares: " 
        + WalletArray[i].currentStats.invalidShares + "</li>");

        items.push("<li>Stale Shares: " 
        + WalletArray[i].currentStats.staleShares + "</li>");

        items.push("<li>Active Workers: " 
        + WalletArray[i].currentStats.activeWorkers + "</li>");

        //Time related
        var tempDate = new Date(WalletArray[i].currentStats.lastSeen * timeOffset);
        var returnDate = tempDate.getHours() + ":" 
        + ("00" + tempDate.getMinutes()).slice(-2) + ":"
        + ("00" + tempDate.getSeconds()).slice(-2) + " UTC"
        + -(tempDate.getTimezoneOffset() / perHourOffset);

        items.push("<li>Miner last seen: " + returnDate + "</li>");

        var tempDate = new Date(WalletArray[i].currentStats.time * timeOffset);
        var returnDate = tempDate.getHours() + ":" 
        + ("00" + tempDate.getMinutes()).slice(-2) + ":"
        + ("00" + tempDate.getSeconds()).slice(-2) + " UTC"
        + -(tempDate.getTimezoneOffset() / perHourOffset);

        items.push("<li>Last Pool Refresh: " + returnDate + "</li>");

        items.push("<li>Unpaid Balance: " 
        + (WalletArray[i].currentStats.unpaid / ethOffset).toFixed(6) + " ETH</li>");

        
        items.push("<li><ul>ETH (USD) per");
        items.push("<li>Week: " 
        + (WalletArray[i].currentStats.coinsPerMin * perWeekOffset).toFixed(6) + " ($"
        + (WalletArray[i].currentStats.usdPerMin * perWeekOffset).toFixed(2) + ")"
        + "</li>");
        items.push("<li>Month: " 
        + (WalletArray[i].currentStats.coinsPerMin * perMonthOffset).toFixed(6) + " ($"
        + (WalletArray[i].currentStats.usdPerMin * perMonthOffset).toFixed(2) + ")"
        + "</li>");
        items.push("<li>Year: " 
        + (WalletArray[i].currentStats.coinsPerMin * perYearOffset).toFixed(6) + " ($"
        + (WalletArray[i].currentStats.usdPerMin * perYearOffset).toFixed(2) + ")"
        + "</li>");
        items.push("</ul></li>");

        //Add items to page
        $( "<div/>", {
            "id": WalletArray[i].name + "Section",
            "class": "Section"
        }).appendTo("#current");
    
        $( "<ul/>", {
            "class": "current " + WalletArray[i].name,
            html: items.join( "" )
        }).appendTo( "#" + WalletArray[i].name + "Section" );
    
        $( "<div/>", {
            "class": "chart",
            "id": WalletArray[i].name
        }).appendTo( "#" + WalletArray[i].name + "Section" );
    }

    drawChart();
}