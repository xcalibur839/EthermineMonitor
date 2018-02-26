$.each(wallets, function(wk, wv) {
	$.getJSON("https://api.ethermine.org/miner/" + wv + "/history", function (data) {
		var rootData = data.data.reverse();
		var items = [];
		var wallet = new JSWallet(wk, wv);
		
		items.push("<h3 class=\"" + wk + "\">" + wk + "'s History</h3>");
		
		$.each(rootData, function(key, val) {
			items.push("<li>Entry" + key);
			items.push("<ul>")
			
			wallet.entries.push(val);
			
			$.each(val, function(key, val) {
				var returnVal = val;
			
				if(key.indexOf("Hashrate") !== -1) {
					returnVal = (val / mHashOffset).toFixed(2);
					returnVal += " Mh/s";
				}
				else if(key.indexOf("time") !== -1) {
					returnVal = new Date(val * timeOffset).toString();
				}
			
				items.push("<li>" + key + ": " + returnVal + "</li>");
			});
			items.push("</ul></li>");
		});
		
		WalletArray.push(wallet);
		
		$( "<ul/>", {
			"class": "history " + wk,
			html: items.join( "" )
		}).appendTo( "#history" );
	});
});