//Register displayCurrentStats as an event handler for ajaxStop to run each time the data finishes loading
$(document).ajaxStop(displayCurrentStats);

function displayCurrentStats() {
    //Remove any existing items from the page
    var current = document.getElementById("current");

     while (current.hasChildNodes()) {
        current.removeChild(current.firstChild);
    }

    //Add each item from WalletArray to the page
    for (var i = 0; i <  WalletArray.length; i++) {
        var items = [];
            
        //Header section
        items.push("<h3 class=\"" + WalletArray[i].name + "\">" + WalletArray[i].name + "'s Miner</h3>");

        items.push("<span class='subHeaders'>Active Workers: " + WalletArray[i].currentStats.activeWorkers + "</span>");

        items.push("<span class='subHeaders'>Wallet:</span> <a class=\"link\" target=\"_blank\" href=\"https://www.ethermine.org/miners/" 
        + WalletArray[i].wallet + "\">" + WalletArray[i].wallet + "</a>");

        items.push("<a class=\"link\" target=\"_blank\" href=\"https://www.etherchain.org/account/" + WalletArray[i].wallet + "\">" + "(etherchain.org)"
        + "</a>");
        
        //Payment section
        items.push("<li>Unpaid ETH: " 
        + (WalletArray[i].currentStats.unpaid / ethOffset).toFixed(6) + " ($" 
        + ((WalletArray[i].currentStats.unpaid / ethOffset) * ValuesArray[0].value[0].USD).toFixed(2)
        + " USD)</li>");

        //Hashrate section
        items.push("<li><ul>Hashrate:");
        items.push("<li>Current: "
        + (WalletArray[i].currentStats.currentHashrate / mHashOffset).toFixed(2) + " Mh/s"
        + " (" + WalletArray[i].currentStats.validShares + " shares)</li>");
        
        items.push("<li>Reported: " 
        + (WalletArray[i].currentStats.reportedHashrate / mHashOffset).toFixed(2) + " Mh/s</li>");

        items.push("<li>Average: " 
        + (WalletArray[i].currentStats.averageHashrate / mHashOffset).toFixed(2) + " Mh/s</li>");

        items.push("</ul></li>");

        //Payrate section
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

        //Time section
        //The slice method below forces minutes < 10 to start with a 0
        var tempDate = new Date(WalletArray[i].currentStats.lastSeen * timeOffset);
        var returnDate = tempDate.getHours() + ":" 
        + ("00" + tempDate.getMinutes()).slice(-2) + " UTC"
        + -(tempDate.getTimezoneOffset() / perHourOffset);

        items.push("<li>Miner last seen: " + returnDate + "</li>");

        var tempDate = new Date(WalletArray[i].currentStats.time * timeOffset);
        var returnDate = tempDate.getHours() + ":" 
        + ("00" + tempDate.getMinutes()).slice(-2) + " UTC"
        + -(tempDate.getTimezoneOffset() / perHourOffset);

        items.push("<li>Last Pool Refresh: " + returnDate + "</li>");

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
}