//Register displayCurrentValues as an event handler for ajaxStop to run each time the data finishes loading
$(document).ajaxStop(displayCurrentValues);

function displayCurrentValues() {
    //Remove any existing items from the page
    var values = document.getElementById("values");

    while (values.hasChildNodes()) {
        values.removeChild(values.firstChild);
    }

    //Display all items loaded to the ValuesArray in loadData
    for (var i = 0; i < ValuesArray.length; i++) {
        var items = [];
        
        $( "<div/>", {
            "class": "valueSection",
            "id": ValuesArray[i].coin + "Section"
        }).appendTo("#values");

        /* $("<h3/>", {
            "class": "valueData",
            html: "1 " + ValuesArray[i].coin + " = "
        }).appendTo("#" + ValuesArray[i].coin + "Section"); */

        items.push("<h3 class='valueData'>1 " + ValuesArray[i].coin + " = " + "</h3>");
        $.each(ValuesArray[i].value, function(key, val) {

            $.each(val, function(name, value) {
                items.push("<li>" + name + ": " + value + "</li>");
            })
        });

        $( "<ul/>", {
            "class": "valueData",
            html: items.join( "" )
        }).appendTo( "#" + ValuesArray[i].coin + "Section" );

        $( "<div/>", {
            "class": "valueChart",
            "id": ValuesArray[i].coin
        }).appendTo( "#" + ValuesArray[i].coin + "Section" );
    }
    
    //Add last updated time
    $( "<div/>", {
        "id": "updateTime"
    }).appendTo("#values");

    //The slice method below forces minutes < 10 to start with a 0
    var tempDate = new Date();
    var returnDate = "Page Last Updated: " + tempDate.getHours() + ":" 
    + ("00" + tempDate.getMinutes()).slice(-2) + " UTC"
    + -(tempDate.getTimezoneOffset() / perHourOffset);

    $( "<h4/>", {
        html: returnDate
    }).appendTo( "#updateTime" );
}