(function($){
	"use strict";
	jQuery(document).ready(function($){
		$('.zoom-gallery').magnificPopup({
			delegate: '.image-source-link',
			type: 'image',
			closeOnContentClick: false,
			closeBtnInside: false,
			mainClass: 'mfp-with-zoom mfp-img-mobile',
			image: {
				verticalFit: true,
				titleSrc: function(item) {
					return '<a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
				}
			},
			gallery: {
				enabled: true
			},
			zoom: {
				enabled: true,
				duration: 300, // don't foget to change the duration also in CSS
				opener: function(element) {
					return element.find('i');
				}
			}
			
		});
		
		if($('.countdown').length > 0){
			$('.countdown').countdown({
				target : local_vars.comming_date,
				format : '4',
				timezone : '0'
			});
		}
		if($('.countdownv3').length > 0){
			$('.countdownv3').countdown({
				target : local_vars.comming_date,
				format : '7',
				timezone : '0'
			});
		}
		$(window).scroll(startCounter);
		//$(window).scroll(startcircularCounter);
		$(window).on('load', function(){
			if($('.masonary-wrapper').length > 0){
				$('.masonary-wrapper').isotope({
					itemSelector: '.masonary-item',
					//masonry: {
						//columnWidth: 350,
						//gutter: 20
					//}
				});
				$(".masonary-item").each(function() {
					$(this).css("height", $(this).outerHeight());
				});
			}
		});
		 /*--------- search icon jquery --------*/
		function startcircularCounter() {	
			if($('.section-circular-counter').length > 0){
				if(isScrolledIntoView('.section-circular-counter') == true){
					$(window).off("scroll", startcircularCounter);
					var circle_count = $('.section-circular-wrapper-listing').data('count');
					var i;
					var canvas = []; 
					var context =[];
					var x = [];
					var y =[];
					var endPercent = [];
					var start_angle = [];
					var end_angle =[];
					var z=[];
					var steps=[];
					var step = [];
					var color = [];
					for( i = 1; i <= circle_count; i++ ) {
						color[i] = $('.section-circular-wrapper-listing li').eq(i-1).data('color');
						canvas[i] = document.getElementById('myCanvas'+i);
						x[i] = canvas[i].width / 2;
						y[i] = canvas[i].height / 2;
						
						context[i] = canvas[i].getContext("2d");
						endPercent[i] = document.getElementById('skill'+i).value;
						step[i] = 0;
							abc(context[i], x[i], y[i], endPercent[i],steps[i],step[i], color[i]);
					}
				}
			}
		}
		
		$("#accordion > div .accordian-tab").click(function(e){
			e.preventDefault();
			if(false == $(this).next().is(':visible')) {
				$('#accordion .accordion-content').slideUp(300);
				$('.accordion-arrow i').removeClass('fa-minus');
				$('.accordion-arrow i').addClass('fa-plus');     
			}
			$(this).next().slideToggle(300);
			$(this).find('i').toggleClass('fa-plus fa-minus');
		});
		$('#accordion div.accordion-content:first').show();
		$('.aadi-tabs ul.our-work-listing-element li a').click(function(){
			var $container1 = $(this).closest('.aadi-isotope-wrapper').find('.our-work-gallery-grid');
			var selector = $(this).attr('data-filter');
			$container1.isotope({
				filter: selector,
				animationOptions: {
					duration: 750,
					easing: 'linear',
					queue: false,
				}
			});
			return false;
		});
		
	});
	function abc(context, x, y, endPercent,steps,step,color){
		var time = $('.section-circular-wrapper-listing').data('time');
		z = setInterval(function(){
				steps = endPercent - 0;
				var radius = 85;
				var text;
				
				if(step > steps){
					 window.clearInterval(z);
				}else{
				text = step + "%";
					start_angle = (1.5 + (step/50))*Math.PI;
					end_angle = (1.5 + (++step/50))*Math.PI;
					context.beginPath();
					context.arc(x, y, radius, start_angle, end_angle, false);
					context.lineWidth = 5;
					context.strokeStyle = color;
					context.stroke();
					context.font = '36px' + ' ' + 'open_sansbold';
					context.textAlign = 'center';
					context.textBaseline = 'middle';
					context.fillStyle = 'white';
					context.clearRect(x - 33*1.5, y - 33/2, 33*3, 30);
					context.fillText(text, x , y );	
				}
		  }, time)	
	}
	function isScrolledIntoView(elem)
	{
		var $elem = $(elem);
		var $window = $(window);
		
		var docViewTop = $window.scrollTop();
		var docViewBottom = docViewTop + $window.height();
		
		var elemTop = $elem.offset().top;
		var elemBottom = elemTop + $elem.height();
		
		return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	}
	function startCounter() {	
		if($('.count').length > 0){
			if(isScrolledIntoView('.count:eq(0)') == true){
				  $(window).off("scroll", startCounter);
				  $('.count').each(function () {
						var $this = $(this);
						jQuery({ Counter: $this.data('start') }).animate({ Counter: $this.data('count') }, {
							 duration: 2000,
							 easing: 'swing',
							 step: function () {
								  $this.text(Math.ceil(this.Counter));
							 },
							complete: function () {
								$this.text($this.data('count'));
							}
						});
				  });
			}
		}
	}
	
	jQuery(function($){$("div.quantity:not(.buttons_added), td.quantity:not(.buttons_added)").addClass("buttons_added").append('<span class="plus add">+</span>').prepend('<span class="minus sub">-</span>'),$(document).on("click",".plus, .minus",function(){var t=$(this).closest(".quantity").find(".qty"),a=parseFloat(t.val()),n=parseFloat(t.attr("max")),s=parseFloat(t.attr("min")),e=t.attr("step");a&&""!==a&&"NaN"!==a||(a=0),(""===n||"NaN"===n)&&(n=""),(""===s||"NaN"===s)&&(s=0),("any"===e||""===e||void 0===e||"NaN"===parseFloat(e))&&(e=1),$(this).is(".plus")?t.val(n&&(n==a||a>n)?n:a+parseFloat(e)):s&&(s==a||s>a)?t.val(s):a>0&&t.val(a-parseFloat(e)),t.trigger("change")})});
})(jQuery);