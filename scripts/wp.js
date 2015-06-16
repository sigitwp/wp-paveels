/* WP Script */

$(function() {
	$('.notifications').on('click', '.btn-delete', function(e) {
		e.preventDefault();
		$(this).parents('.item').remove();
	});
});
