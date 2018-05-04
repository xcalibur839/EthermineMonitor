//Register loadData as an event handler for document ready to begin the loop upon page load
$(document).ready(loadData);

function loadData() {
	//Reset arrays to empty
	WalletArray = [];
	ValuesArray = [];

	//Load wallet data
	$.each(ethermine, function(wk, wv) {
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
	$.each(cryptocurrency, function(coinIndex) {
		var coinData = new JSValues(cryptocurrency[coinIndex]);
		var BaseURL = "https://min-api.cryptocompare.com/data/";
		var PriceURL = "fsym="
		var HistoryURL = "fsym="
		
		//Price can be converted to multiple currencies but history only sypports one
		PriceURL += coinData.coin + "&tsyms=";
		HistoryURL += coinData.coin + "&tsym=";

		//If there is at least one fiat currency specified, use that
		if (fiat.length >= 1) {
			PriceURL += fiat[0];
			HistoryURL += fiat[0];
		}
		else { //Otherwise default to USD
			PriceURL += "USD";
			HistoryURL += "USD";
		}

		//If there are any additional currencies specified, add them now
		for (var i = 1; i < fiat.length; i++) {
			PriceURL += "," + fiat[i];
		}
		for (var i = 0; i < cryptocurrency.length; i++) {
			if (i != coinIndex) {
				PriceURL += "," + cryptocurrency[i];
			}
		}

		//Load the current price data for the coin
		$.getJSON((BaseURL + "price?" + PriceURL), function(data) {
			$.each(data, function(key, val) {
				coinData.value.push({[key]: val});
			});
		});

		//Load the price history data for the coin
		$.getJSON((BaseURL + "histoday?" + HistoryURL + "&limit=" + (valueHistoryLimit - 1)),
		function(data) {
			var rootData = data.Data;
			$.each(rootData, function(key, val) {
				coinData.history.push(val);
			});
		});

		//Add the coin data to the global array
		ValuesArray.push(coinData);
	});

	//Wait 60s before calling loadData again. 
	//This effectively causes the loadData function to loop every 60s
	setTimeout(loadData, 60000);
}