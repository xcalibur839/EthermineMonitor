$(document).ajaxStop(updateValues);

function updateValues() {
    //Remove any existing items from the page
    var values = document.getElementById("values");

    while (values.hasChildNodes()) {
        values.removeChild(values.firstChild);
    }

    //Add ETH Values
    $( "<div/>", {
        "class": "values",
        "id": "ETH"
    }).appendTo("#values");

    var ethItems = [];
    
    $("<h3/>", {
        "class": "valueData",
        html: "1 ETH = "
    }).appendTo("#ETH");

    $.each(EthValues, function(key, val) {
        $.each(val, function(name, value) {
            ethItems.push("<li>" + name + ": " + value + "</li>");
        })
    });

    $( "<ul/>", {
        "class": "valueData",
        html: ethItems.join( "" )
    }).appendTo( "#ETH" );


    //Add BTC Values
    $( "<div/>", {
        "class": "values",
        "id": "BTC"
    }).appendTo("#values");

    var btcItems = [];
    
    $("<h3/>", {
        "class": "valueData",
        html: "1 BTC = "
    }).appendTo("#BTC");

    $.each(BtcValues, function(key, val) {
        $.each(val, function(name, value) {
            btcItems.push("<li>" + name + ": " + value + "</li>");
        })
    });

    //btcItems.reverse();

    $( "<ul/>", {
        "class": "valueData",
        html: btcItems.join( "" )
    }).appendTo( "#BTC" );
    
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