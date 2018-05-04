/* 
	WALLETS
*/
//Wallets can be added in the JSON format "Name": "Address"
//Wallets will be displayed in the order they are entered
//CSS can be applied to the class that matches each Name
//For example: .Name {background-color: dodgerblue;}
var ethermine = {"Michael": "49B9Da60c5256A8428BcF331c92aeBe80C9E04b4", 
"Kevin": "00693Ed1A9541d84849Ccf2D01a2637a42757e3D", 
"Josh": "3e5aaae2f27233ec7af634b14b6ef324e1fa0f60"};

var nicehash = {"Michael": "3GAkii8Hks7u9thFxM5e383XVFJ35XRjM4"};

//Idea for new value loading method 
var fiat = {"USD", "CAD", "AUD"}; 
var crypto = {"ETH", "BTC", "XMR"};

/*
	CONSTANTS
*/
let valueHistoryLimit = 30;
let mHashOffset = 1000000;
let ethOffset = 1000000000000000000;
let timeOffset = 1000;
let perHourOffset = 60;
let perDayOffset = perHourOffset * 24;
let perWeekOffset = perDayOffset * 7;
let perYearOffset = perWeekOffset * 52;
let perMonthOffset = perYearOffset / 12;

/*
	CLASSES
*/
function JSWallet(name, wallet) {
	this.name = name;
	this.wallet = wallet;
	this.currentStats = [];
	this.history = [];
}

function JSValues(coin) {
	this.coin = coin;
	this.value = [];
	this.history = [];
}

/*
	DATA ARRAYS
*/
var WalletArray = [];
var ValuesArray = [];