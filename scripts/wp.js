/* WP Script */

$(function() {
	$('.notification').on('click', '.btn-delete', function(e) {
		e.preventDefault();
		$(this).parents('.item').remove();
	});
});
