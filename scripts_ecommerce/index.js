$(function(){
	console.log('index.js called...');

	// FIXME removenya ditanam langsung aja di btn-delete?
	$('.notif').on('click', '.btn-delete', function(e) {
		e.preventDefault();
		$(this).parents('.item').remove();
	});
	
	parseApi();
	console.log('index finished...');
	
})// end $
