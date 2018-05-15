# Gohan Ethermine Monitor

Load and display mining data from ethermine.org as well as current values for ETH and BTC from cryptocompare.com

Wallet address and a name can be provided in the globals.js file. JS files should be loaded in the header of the index.html document. They should be loaded in the following order:
- jquery
- google charts loader
- globals
- loadData/currentValues/currentStats/charts (any order after globals)
	
Two divs need to be created with ids "values" and "current" in the body of index.html. See the provided index.html for an example.

[See an example site running here.](http://gohanserver.com/minemonitor/)
