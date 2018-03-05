$.each(wallets, function(wk, wv) {
	$.getJSON("https://api.ethermine.org/miner/" + wv + "/history", function (data) {
		var rootData = data.data.reverse();
		var items = [];
		
		items.push("<h3 class=\"" + wk + "\">" + wk + "'s History</h3>");
		
		$.each(rootData, function(key, val) {
			items.push("<li>Entry" + key);
			items.push("<ul>")
			
			$.each(val, function(key, val) {
				var returnVal = val;
			
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
				}
			
				items.push("<li>" + key + ": " + returnVal + "</li>");
			});
			items.push("</ul></li>");
		});
		
		$( "<ul/>", {
			"class": "history " + wk,
			html: items.join( "" )
		}).appendTo( "#history" );
	});
});