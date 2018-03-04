function updateValues() {
    //Remove any existing items from the page
    var values = document.getElementById("values");

    while (values.hasChildNodes()) {
        values.removeChild(values.firstChild);
    }

    $( "<div/>", {
        "class": "values",
        "id": "ETH"
    }).appendTo("#values");
    $.getJSON("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD", function(data) {
        var ethItems = [];
        
        $("<h3/>", {
            "class": "valueData",
            html: "1 ETH = "
        }).appendTo("#ETH");

        $.each(data, function(key, val) {
            ethItems.push("<li>" + key + ": " + val + "</li>");
        });

        ethItems.reverse();

        $( "<ul/>", {
            "class": "valueData",
            html: ethItems.join( "" )
        }).appendTo( "#ETH" );
    });

    $( "<div/>", {
        "class": "values",
        "id": "BTC"
    }).appendTo("#values");
    $.getJSON("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=ETH,USD", function(data) {
        var btcItems = [];
        
        $("<h3/>", {
            "class": "valueData",
            html: "1 BTC = "
        }).appendTo("#BTC");

        $.each(data, function(key, val) {
            btcItems.push("<li>" + key + ": " + val + "</li>");
        });

        btcItems.reverse();

        $( "<ul/>", {
            "class": "valueData",
            html: btcItems.join( "" )
        }).appendTo( "#BTC" );
    });
    
    $( "<div/>", {
        "id": "updateTime"
    }).appendTo("#values");

    var tempDate = new Date();
    var returnDate = "Page Last Updated: " + tempDate.getHours() + ":" 
    + ("00" + tempDate.getMinutes()).slice(-2) + ":"
    + ("00" + tempDate.getSeconds()).slice(-2) + " UTC "
    + -(tempDate.getTimezoneOffset() / perHourOffset);

    $( "<h4/>", {
        html: returnDate
    }).appendTo( "#updateTime" );
}