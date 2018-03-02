$.each(wallets, function(wk, wv) {
	var wallet = new JSWallet(wk, wv);

	$.getJSON("https://api.ethermine.org/miner/" + wv + "/history", function (data) {
		var rootData = data.data.reverse();
		
		$.each(rootData, function(key, val) {
			wallet.history.push(val);
		});
	});

	$.getJSON("https://api.ethermine.org/miner/" + wv + "/currentStats", function (data) {
		wallet.currentStats = data.data;
	});

	WalletArray.push(wallet);
});