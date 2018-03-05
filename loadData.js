function loadData() {
	WalletArray = [];
	EthValues = [];
    BtcValues = [];

	//Load wallet data
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

	//Load value data
	$.getJSON("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,BTC", function(data) {
        $.each(data, function(key, val) {
            EthValues.push({[key]: val});
        });
	});
	$.getJSON("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,ETH", function(data) {
        $.each(data, function(key, val) {
            BtcValues.push({[key]: val});
        });
    });

	setTimeout(loadData, 60000);
}
loadData();