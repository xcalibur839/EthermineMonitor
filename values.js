function updateValues() {
    //Remove any existing items from the page
    var values = document.getElementById("values");

     while (values && values.hasChildNodes()) {
        values.removeChild(values.firstChild);
     }

    $.getJSON("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD", function(data) {
        var items = [];
        
        $("<h3/>", {
                "class": "values",
                html: "1 ETH = "
        }).appendTo("#values");

        $.each(data, function(key, val) {
            items.push("<li id='" + key +"'>" + key + ": " + val + "</li>");
        });

        items.reverse();

        $( "<ul/>", {
                "class": "values",
                html: items.join( "" )
        }).appendTo( "#values" );
    });

    $.getJSON("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=ETH,USD", function(data) {
        var items = [];
        
        $("<h3/>", {
                "class": "values",
                html: "1 BTC = "
        }).appendTo("#values");

        $.each(data, function(key, val) {
            items.push("<li id='" + key +"'>" + key + ": " + val + "</li>");
        });

        items.reverse();

        $( "<ul/>", {
                "class": "values",
                html: items.join( "" )
        }).appendTo( "#values" );
    });
}
updateValues();