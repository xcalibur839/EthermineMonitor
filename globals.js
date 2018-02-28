var wallets = {"Michael": "49B9Da60c5256A8428BcF331c92aeBe80C9E04b4", 
"Kevin": "00693Ed1A9541d84849Ccf2D01a2637a42757e3D", 
"Josh": "3e5aaae2f27233ec7af634b14b6ef324e1fa0f60"};

var mHashOffset = 1000000;
var ethOffset = 1000000000000000000;
var timeOffset = 1000;
var perHourOffset = 60;
var perDayOffset = perHourOffset * 24;
var perWeekOffset = perDayOffset * 7;
var perYearOffset = perWeekOffset * 52;
var perMonthOffset = perYearOffset / 12;

function JSWallet(name, wallet) {
	this.name = name;
	this.wallet = wallet;
	this.currentStats = [];
	this.history = [];
}

var WalletArray = [];