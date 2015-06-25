/* WP Script */

$(function() {
	$('.notif').on('click', '.btn-del', function(e) {
		e.preventDefault();
		$(this).parents('.item').remove();
	});
});
