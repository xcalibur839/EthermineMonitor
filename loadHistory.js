$.each(wallets, function(wk, wv) {
	$.getJSON("https://api.ethermine.org/miner/" + wv + "/history", function (data) {
		var rootData = data.data.reverse();
		var wallet = new JSWallet(wk, wv);
		
		$.each(rootData, function(key, val) {
			wallet.history.push(val);
		});
		
		WalletArray.push(wallet);
	});
});