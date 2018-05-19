function postData() {
    var walletData = "", valueData = "", dividingLine =
    "------------------------------";
    var padding = "          ";

    walletData = (padding + "Name").slice(-padding.length) +
    (padding + "Current").slice(-padding.length) +
    (padding + "Reported").slice(-padding.length) +
    (padding + "Average").slice(-padding.length) +
    (padding + "Stale").slice(-padding.length) +
    "\n";
    
    for (var i = 0; i < WalletArray.length; i++) {
        var walletData = walletData + 
        (padding + WalletArray[i].name).slice(-padding.length) +
        (padding + (WalletArray[i].currentStats.currentHashrate / mHashOffset).toFixed(2)).slice(-padding.length) +
        (padding + (WalletArray[i].currentStats.reportedHashrate / mHashOffset).toFixed(2)).slice(-padding.length) +
        (padding + (WalletArray[i].currentStats.averageHashrate / mHashOffset).toFixed(2)).slice(-padding.length) +
        (padding + WalletArray[i].currentStats.staleShares).slice(-padding.length) +
        "\n";
    }

    for (var i = 0; i < ValuesArray.length; i++) {
        var valueData = valueData + "1 " + ValuesArray[i].coin + " = " +
        (padding + Object.values(ValuesArray[i].value[0])[0]).slice(-padding.length) + " " +
        Object.keys(ValuesArray[i].value[0])[0] + " | " +
        (padding + Object.values(ValuesArray[i].value[1])[0]).slice(-padding.length) + " " +
        Object.keys(ValuesArray[i].value[1])[0] + "\n";
    }

    if (walletData.length > 0 &&
        valueData.length > 0 &&
        webhook.id.length > 0 &&
        webhook.token.length > 0) {

        //The slice method below forces minutes < 10 to start with a 0
        var tempDate = new Date();
        var returnDate = "Data retrieved: " + tempDate.toLocaleDateString() + " " +
        tempDate.getHours() + ":" + 
        ("00" + tempDate.getMinutes()).slice(-2) + " UTC" + 
        -(tempDate.getTimezoneOffset() / perHourOffset);

        var finalPost = dividingLine + "\n" + returnDate + "\n\n```\n" +
        valueData + "\n" + walletData + "```\n" + dividingLine;

        console.log(finalPost);
        $.post(discordRoot + webhook.id + "/" + webhook.token, {content: finalPost});
    }

    setTimeout(postData, 1800000)
}