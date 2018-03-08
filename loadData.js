function loadData() {
	//Reset arrays to empty
	WalletArray = [];
	ValuesArray = [];
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
	var ethValue = new JSValues("ETH");
	var btcValue = new JSValues("BTC");

	//Load ETH
	$.getJSON("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,BTC", function(data) {
        $.each(data, function(key, val) {
			//EthValues.push({[key]: val});
			ethValue.value.push({[key]: val});
        });
	});
	$.getJSON("https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&limit=" 
	+ valueHistoryLimit, function(data) {
		var rootData = data.Data;
		$.each(rootData, function(key, val) {
			ethValue.history.push(val);
		});
	});

	//Load BTC
	$.getJSON("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,ETH", function(data) {
        $.each(data, function(key, val) {
			//BtcValues.push({[key]: val});
			btcValue.value.push({[key]: val});
        });
	});
	$.getJSON("https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit="
	+ valueHistoryLimit, function(data) {
		var rootData = data.Data;
		$.each(rootData, function(key, val) {
			btcValue.history.push(val);
		});
	});
	
	ValuesArray.push(ethValue);
	ValuesArray.push(btcValue);

	//Wait 60s before calling loadData again. 
	//This effectively causes the loadData function to loop every 60s
	setTimeout(loadData, 60000);
}
//Initial function call to start the loadData loop
loadData();