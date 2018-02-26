function testing(){
	$('#historyList').find('SPAN').click(function(e){
		$(this).parent().children('UL').toggle();
		console.log("Made it here");
	});
	console.log("Hello");
}