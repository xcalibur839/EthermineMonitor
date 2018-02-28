$.each(wallets, function(wk, wv) {
	$.getJSON("https://api.ethermine.org/miner/" + wv + "/currentStats", function (data) {
		var rootData = data.data;
		var items = [];
		
		items.push("<h3 class=\"" + wk + "\">" + wk + "'s Miner</h3>");
		
		$.each(rootData, function(key, val) {
			var returnVal = val, returnKey = key;
			
			if(key.indexOf("Hashrate") !== -1) {
				returnVal = (val / mHashOffset).toFixed(2);
				returnVal += " Mh/s";
			}
			else if(key.indexOf("time") !== -1) {
				var tempDate = new Date(val * timeOffset);
				
				returnVal = 
				tempDate.getHours() + ":" 
				+ ("00" + tempDate.getMinutes()).slice(-2) + ":"
				+ ("00" + tempDate.getSeconds()).slice(-2) + " UTC"
				+ -(tempDate.getTimezoneOffset() / perHourOffset);
				
				returnKey = "Last Pool Refresh";
			}
			else if(key.indexOf("lastSeen") !== -1) {
				var tempDate = new Date(val * timeOffset);
				
				returnVal = 
				tempDate.getHours() + ":" 
				+ ("00" + tempDate.getMinutes()).slice(-2) + ":"
				+ ("00" + tempDate.getSeconds()).slice(-2) + " UTC"
				+ -(tempDate.getTimezoneOffset() / perHourOffset);
				
				returnKey = "Miner Last Seen";
			}
			else if(key.indexOf("unpaid") !== -1) {
				returnVal = (val / ethOffset).toFixed(6);
				returnVal += " ETH";
				returnKey = "Unpaid Balance";
			}
			else if(key.indexOf("coinsPerMin") !== -1) {
				
				returnVal = 
				(val * perWeekOffset).toFixed(6) + " / "
				+ (val * perMonthOffset).toFixed(6) + " / "
				+ (val * perYearOffset).toFixed(6);
				
				returnKey = "ETH per Week/Month/Year";
			}
			else if(key.indexOf("usdPerMin") !== -1) {
				
				returnVal = "$"
				+ (val * perWeekOffset).toFixed(2) + " / $"
				+ (val * perMonthOffset).toFixed(2) + " / $"
				+ (val * perYearOffset).toFixed(2);
				
				returnKey = "USD per Week/Month/Year";
			}
			
			if(key.indexOf("btcPerMin") === -1 && key.indexOf("unconfirmed") === -1) {
				items.push("<li id='" + key + "'>" + returnKey + ": " + returnVal + "</li>");
			}
		});


		$( "<div/>", {
			"id": wk + "Section",
			"class": "Section"
		}).appendTo("#current");

		$( "<ul/>", {
			"class": "current " + wk,
			html: items.join( "" )
		}).appendTo( "#" + wk + "Section" );

		$( "<div/>", {
			"class": "chart",
			"id": wk
		}).appendTo( "#" + wk + "Section" );
	});
});