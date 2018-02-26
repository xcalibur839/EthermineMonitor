$.getJSON("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD", function(data) {
   var items = [];
   
   $.each(data, function(key, val) {
       items.push("<li id='" + key +"'>" + key + ": " + val + "</li>");
   });

   items.reverse();

   $( "<ul/>", {
        "class": "values",
        html: items.join( "" )
    }).appendTo( "#values" );
});