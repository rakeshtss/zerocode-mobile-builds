
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function () {
	if (animating) return false;
	animating = true;
	// https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js
	//https://code.jquery.com/jquery-3.4.1.min.js

	current_fs = $(this).parent();
	next_fs = $(this).parent().next();

	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

	//show the next fieldset
	next_fs.show();
	//hide the current fieldset with style
	current_fs.animate({ opacity: 0 }, {
		step: function (now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			top = (now * 0) + "%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({
				// 'transform': 'scale('+scale+')',
				'position': 'relative'
			});
			next_fs.css({ 'top': top, 'opacity': opacity });
		},
		duration: 0,
		complete: function () {
			current_fs.hide();
			animating = false;
		},
		//this comes from the custom easing plugin
		//easing: 'easeInOutBack'
	});
});

$(".previous").click(function () {
	if (animating) return false;
	animating = true;

	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();

	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

	//show the previous fieldset
	previous_fs.show();
	//hide the current fieldset with style
	current_fs.animate({ opacity: 0 }, {
		step: function (now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1 - now) * 0) + "%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({ 'left': left });
			previous_fs.css({ 'transform': 'scale(' + scale + ')', 'opacity': opacity });
		},
		duration: 0,
		complete: function () {
			current_fs.hide();
			animating = false;
		},
		//this comes from the custom easing plugin
		//easing: 'easeInOutBack'
	});
});

// $(".submit").click(function(){
// 	return false;
// })

$(document).ready(function () {
	$('[data-toggle="popover"]').popover();
	console.log('$(window).width', $(window).width());
	if ($(window).width() > 767) {
		$('#progressbar li span').on('click', function () {
			var _attr = $(this).parent().attr('current-tab');
			$('fieldset').hide();
			$('fieldset').css({ "opacity": "0" });
			$('fieldset#' + _attr).show();
			$('fieldset#' + _attr).css({ "opacity": "1" });
			$(this).parent().addClass('active');
			$(this).parent().prevAll('li').addClass('active');
			$(this).parent().nextAll('li').removeClass('active');
		});
	} else {
		$('#progressbar li').on('click', function () {
			var _attr = $(this).attr('current-tab');
			$('fieldset').hide();
			$('fieldset').css({ "opacity": "0" });
			$('fieldset#' + _attr).show();
			$('fieldset#' + _attr).css({ "opacity": "1" });
			$(this).addClass('active');
			$(this).prevAll('li').addClass('active');
			$(this).nextAll('li').removeClass('active');
		});
	}
});

