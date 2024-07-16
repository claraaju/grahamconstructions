(function($){
	"use strict";
	var aadi_page = {
		htmlTopPOs : function(){
			var hHeight = ($('.aadi-header.aadi-header-sticky:visible,.aadi-header.aadi-header-fixed:visible').not('.aadi-header-transparent').outerHeight(true));
			if($('body').hasClass('rev_slider_disabled')){
				var hHeight = ($('.aadi-header.aadi-header-sticky:visible,.aadi-header.aadi-header-fixed:visible').outerHeight(true));
				$('html').css({'padding-top': hHeight});
				return true;
			}
			if(!hHeight){hHeight = 0;}
			$('html').css({'padding-top': hHeight});
		},
		init : function(){
			$('.top-border-menu #menu-main-menu >li > a').css({'height': $('.aadi-site-logo').outerHeight(true)+'px', 'line-height': $('.aadi-site-logo').outerHeight(true)+'px'});
			$('.aadi-vertical-tab-content:eq(0)').addClass('active');
			$('.aadi-top-header').height($('.aadi-top-header').outerHeight(true))
			$('.aadi-middle-header ').height($('.aadi-middle-header ').outerHeight(true))
			$('.aadi-header-v10 .aadi-bottom-header ').height($('.aadi-bottom-header ').outerHeight(true))
			$('.aadi-drop-nav').on('click', function(e) {
				  $('.our-work-listing-element').toggleClass('active');
				  e.stopPropagation();
			 });
			 $('body').on("click", function(ev) {
				  $('.our-work-listing-element').removeClass('active');
			 });
			 $('.aadi-vertical-tab-content:eq(0)').addClass('active');
			 if (local_vars.sticky_header == 1) {
				  aadi_page.htmlTopPOs();
					$(window).resize(function(){
						aadi_page.htmlTopPOs();
					});
			 }
			 if ($('.bg-feature-services').length > 0) {
				  var s_height = $('.bg-feature-services').outerHeight();
				  $('.bg-feature-services-image').css('height', s_height);
			 }
			
						
			aadi_page.aadi_animations();
			/****** Accordion and tab call *****/
			aadi_page.additab_acc();
			aadi_page.additab_acc('.services-wrapper-tab-links-wrapper li', '.our-services-tabs-desc-wrapper .our-services-tabs-desc',true);
			aadi_page.additab_acc('.our-history-tab-block li', '.our-history-tab-content-wrap .weclome-section-content');
			$('.fitvid').fitVids();
			/*---coming soon page counter-----*/
			$(document).delegate('.aadi-menu-overlay-icon a', 'click', function(e){
				e.preventDefault();
				$('.menu-overlay-wrapper').toggleClass('menu-overlay-top menu-overlay-open menu-overlay-complete menu-overlay-bottom');
				$('.c-hamburger.c-hamburger--htx').toggleClass('is-active');
				$('body').toggleClass('scroll-disable');
			});
			$('.aadi-serach-form #s').val('');
			$('.slimmenu').slimmenu({
            resizeWidth: '991',
            collapserTitle: 'Menu',
            animSpeed: 'medium',
            indentChildren: true,
            childrenIndenter: '<i class="fa fa-angle-right" aria-hidden="true"></i>',
            expandIcon:'<i class="fa fa-plus" aria-hidden="true"></i>',
            collapseIcon:'<i class="fa fa-minus" aria-hidden="true"></i>'
        });
			$(window).on('load',function(){
				$(".siteloader").fadeOut("slow");
				if( $( '.fitheight-wrapper' ).length > 0 ){
					$( '.fitheight-wrapper' ).each(function(){
						var height = [];
						$(this).find( ".fitheight").each(function() {
							height.push($(this).outerHeight());
						});
						$(this).find('.fitheight').css("min-height", Math.max.apply(Math,height));
					});
				}
				if( $( '.bg-feature-services' ).length > 0 ){
					var s_height = $( '.bg-feature-services' ).outerHeight();
					$('.bg-feature-services-image').css('height', s_height);
				}
				if($('.fixed-footer').length > 0){
					var hei = $('.fixed-footer').outerHeight();
					$('#content').css('padding-bottom',hei);
				}									  
			});
			
			/*------ code to align dropdown menu ------*/
			$(".aadi-menu > li").on('mouseenter mouseleave', function (e) {
				if ($('ul', this).length) {
					var elm = $('ul:first', this);
					var off = elm.offset();
					var l = off.left;
					var w = elm.width();
					var docW = $("body").width();
					var isEntirelyVisible = (l + w <= docW);
					if (!isEntirelyVisible) {
						$(this).addClass('edge');
					}
				}
			});
			
			var autoplay = [];
			autoplay[0] = false;
			autoplay[1] = true;
			$('.slideshow').slick({
			  dots: false,
			  infinite: true,
			  speed: local_vars.speed,
			  fade: true,
			  autoplay: autoplay[local_vars.autoplay],
			  cssEase: 'linear',
			  prevArrow: '<a class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></a>',
			  nextArrow: '<a class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></a>',
			});
			
			var $container = $('div.our-work-gallery-grid');
            $(window).load(function() {
                $container.isotope({
                    filter: '*',
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false
                    },
                });
            });
			
			$('.aadi-tabs ul.our-work-listing-element li a').click(function(){
				$('.aadi-tabs ul.our-work-listing-element li').removeClass('active');
				$(this).closest('li').addClass('active');
				var $container1 = $(this).closest('.aadi-gallery-full-width').find('div.our-work-gallery-grid');
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
		},
		aadi_animations : function(){
			$("#back-top").hide();
			$(window).scroll(function () {
				if ($(this).scrollTop() > 700) {
					$('#back-top').fadeIn(0);
				} else {
					$('#back-top').fadeOut(0);
				}
			});
	
			$('#back-top').click(function (e) {
				e.preventDefault();
				$('body,html').animate({ scrollTop: 0 }, 2000);
				return false;
			});
		},
		aadi_ajax : function(e, element, data_values, method_type){
			var $t = element;
			$.ajax({ 
				url: ajaxurl,
				type: method_type,
				data: data_values,
				beforeSend: function(e){
					$t.closest('form').find('.loader-icon').html('<img src="'+aadi_imgurl+'reload.gif">');
				},
				success: function(resp) {
					var response = $.parseJSON(resp);
					if(response.status == 'success'){
						$t.find('.error-message, .success-message').hide();
						$t.prepend('<p class="success-message">'+response.msg+'</p>');	
					}else{
						$t.find('.success-message, .error-message').hide();
						$t.prepend('<p class="error-message">'+response.msg+'</p>');
					}
					$('.loader-icon').html('');
				},
				error: function(errorThrown){
					console.log(errorThrown);
				}
			});
			e.preventDefault();
		},
		aadi_incsliders : function(ele, slide_show, slide_scroll, autoplay,isfade,isCenter,isVertical){
			if (typeof isCenter == 'undefined'){ isCenter = false; }
			if (typeof isVertical == 'undefined'){ isVertical = false;}
			if(isCenter){var a = [3,1,1];}
			else{var a = [3,2,1];}
			if (typeof isfade == 'undefined'){ isfade = false;}
			if(slide_show > 2){
				$('.'+ele).slick({
					slidesToShow: slide_show,
					slidesToScroll: slide_scroll,
					autoplay: true,
					speed:300,
					autoplaySpeed: $(this).data('speed'),
					prevArrow: '<a class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></a>',
					nextArrow: '<a class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></a>',
					fade : isfade,
					vertical : isVertical,
					adaptiveHeight: true,
					responsive: [{
						breakpoint: 1200,
						settings: {
						  slidesToShow: a[0],
						}
					 },
					 {
						breakpoint: 769,
						settings: {
						  slidesToShow: a[1],
						}
					 },
					 {
						breakpoint: 568,
						settings: {
						  slidesToShow: a[2],
						}
					 }
				  ]
				});
			}else if(slide_show == 2){
				$('.'+ele).slick({
					slidesToShow: slide_show,
					slidesToScroll: slide_scroll,
					autoplay: true,
					speed:300,
					autoplaySpeed: $(this).data('speed'),
					prevArrow: '<a class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></a>',
					nextArrow: '<a class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></a>',
					fade : isfade,
					vertical : isVertical,
					responsive: [{
						breakpoint: 769,
						settings: {
						  slidesToShow: 1,
						}
					 }]
				});
			}else{
				$('.'+ele).slick({
					slidesToShow: slide_show,
					slidesToScroll: slide_scroll,
					autoplay: true,
					speed:300,
					autoplaySpeed: $(this).data('speed'),
					prevArrow: '<a class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></a>',
					nextArrow: '<a class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></a>',
					fade : isfade,
					vertical : isVertical,
					responsive: [{
                            breakpoint: 769,
                            settings: {
                                slidesToShow: 1,
										  vertical:false
                            }
                        }]
				});
			}
		},
		additab_acc : function(clickele, hideshowele, anim){
			if(typeof anim === 'undefined'){ anim = false; }
			if(typeof clickele === 'undefined'){
				$("#accordion > li .accordian-tab").click(function(){
					if(false == $(this).next().is(':visible')) {
						$('#accordion .accordion-content').slideUp(300);
						$('.accordion-arrow i').removeClass('fa-angle-down');
						$('.accordion-arrow i').addClass('fa-angle-right');
						$('#accordion > li .accordian-tab').removeClass('tab-active');
						$('#accordion > li .accordian-tab').addClass('tab-inactive')
					}
					$(this).next().slideToggle(300);
               $(this).toggleClass('tab-inactive tab-active');
					$(this).find('i').toggleClass('fa-angle-right fa-angle-down');
				});
				$('#accordion div.accordion-content:first').show();
			}
			else{
				if(typeof clickele !== 'undefined' && anim == false){
					$(document).delegate(clickele, 'click', function(e){
						e.preventDefault();
						var idx = $(this).index();	
						var $t = $(this);
						$t.closest('.aadi-col-row, .aadi-row').find(hideshowele).fadeOut(0);
						$t.closest('.aadi-col-row, .aadi-row').find(hideshowele).eq(idx).fadeIn(0);
						$t.closest('.aadi-col-row, .aadi-row').find(clickele).removeClass('active');
						$t.closest(clickele).addClass('active');
					});
				}
				else{
					$(document).delegate(clickele, 'click', function(e){
						e.preventDefault();
						var idx = $(this).index();	
						var $t = $(this);
						$t.closest('.aadi-col-row, .aadi-row').find(hideshowele).removeClass('active').removeClass('rightanime').removeClass('leftanime');
						$t.closest('.aadi-col-row, .aadi-row').find(hideshowele+':lt('+idx+')').addClass('leftanime');
						$t.closest('.aadi-col-row, .aadi-row').find(hideshowele+':gt('+idx+')').addClass('rightanime');
						$t.closest('.aadi-col-row, .aadi-row').find(hideshowele).eq(idx).addClass('active');
						$t.closest('.aadi-col-row, .aadi-row').find(clickele).removeClass('active');
						$t.closest(clickele).addClass('active');
					});
				}
			}
		},
		aadi_sliders : function(){
			/*-------- team slider init callback ---------*/
			$('.center').on('init', function(event, slick, currentSlide, nextSlide){
				if ($(window).width() < 769) {
					var data = $(".slick-current").attr('data-value');
					var data_content = $(".slick-current").attr('data-content');
					var t = $(".slick-current");
				}else{
					var data = $(".slick-current").next().attr('data-value');
					var data_content = $(".slick-current").next().attr('data-content');
					var t = $(".slick-current").next();
				}
				var dataobj = JSON.parse(data);
				$('.aadi-team-center-content-wrap .aadi-data-head').html(dataobj['data-head']);
				$('.aadi-team-center-content-wrap .aadi-data-designation').html(dataobj['data-designation']);
				$('.aadi-team-center-content-wrap .aadi-data-content').html(data_content);
				$('.aadi-team-social-content li').remove();
				if(dataobj.hasOwnProperty('data-fb')  && dataobj['data-fb'] != ''){
					$('.aadi-team-center-content-wrap .aadi-team-social-content').append('<li class="facebook"> <a href="'+dataobj['data-fb']+'"><i class="fa fa-facebook"></i></a> </li>');
				}
				if(dataobj.hasOwnProperty('data-twitter') && dataobj['data-twitter'] != ''){
					$('.aadi-team-center-content-wrap .aadi-team-social-content').append('<li class="google"> <a href="'+dataobj['data-twitter']+'"><i class="fa fa-google-plus"></i></a> </li>');
				}
				if(dataobj.hasOwnProperty('data-gplus') && dataobj['data-gplus'] != ''){
					$('.aadi-team-center-content-wrap .aadi-team-social-content').append('<li class="twitter"> <a href="'+dataobj['data-gplus']+'"><i class="fa fa-twitter"></i></a> </li>');
				}
				if(dataobj.hasOwnProperty('data-linkedin') && dataobj['data-linkedin'] != ''){
					$('.aadi-team-center-content-wrap .aadi-team-social-content').append('<li class="linkedin"> <a href="'+dataobj['data-linkedin']+'"><i class="fa fa-linkedin"></i></a> </li>');
				}
			});
			
			aadi_page.aadi_incsliders('aadi-testimonial-slider-wrapper',1, 1, true, false,false,true);
			aadi_page.aadi_incsliders('aadi-clients-slider-wrapper',4, 1, true);
			aadi_page.aadi_incsliders('center',3, 1, true, false,true);
			aadi_page.aadi_incsliders('testimonial-slider-type3',3, 1, true, false,true);
			aadi_page.aadi_incsliders('grid-team-slider-v2',5, 1, true);
			aadi_page.aadi_incsliders('grid-team-slider',3, 1, true, false,true);
			aadi_page.aadi_incsliders('grid-testimonial-slider',3, 1, true,false,true);
			aadi_page.aadi_incsliders('square-team-slider',3, 1, true, false,true);
         aadi_page.aadi_incsliders('square-team-slider-team-detail',3, 1, true,false,true);
			aadi_page.aadi_incsliders('testmonial-slider-2',1, 1, true);
			aadi_page.aadi_incsliders('aadi-testimonial-grid',3, 1, true, false,true);
			aadi_page.aadi_incsliders('services-slider-shortcode', 2, 1, true);
			$('.aadi-testimonial-grid').on('afterChange', function(event, slick, currentSlide, nextSlide){
				$(".aadi-testimonial-grid .slick-slide").removeClass('slick-center-slide');
				$(".aadi-testimonial-grid .slick-current").next().removeClass('slick-center-slide');
				$(".aadi-testimonial-grid .slick-current").next().addClass('slick-center-slide');
			});
			
			$('.grid-team-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
				$(".grid-team-slider .slick-slide").removeClass('slick-center-active');
				$(".grid-team-slider .slick-current").next().removeClass('slick-center-active');
				$(".grid-team-slider .slick-current").next().addClass('slick-center-active');
			});
			$('.testimonial-slider-type3').on('afterChange', function(event, slick, currentSlide, nextSlide){
				$(".testimonial-slider-type3 .slick-slide").removeClass('slick-center-enable');
				$(".testimonial-slider-type3 .slick-current").next().removeClass('slick-center-enable');
				$(".testimonial-slider-type3 .slick-current").next().addClass('slick-center-enable');
				var data_content = $(".testimonial-slider-type3 .slick-slide").eq(currentSlide).data('content');
				$('.testimonial-slider-type3-content').html(data_content);
			});
			$('.case-study-slider').slick({
				infinite: true,
				fade: true,
				autoplay: true,
  				autoplaySpeed: $(this).data('speed'),
				pauseOnFocus: true,
				pauseOnHover:true,
				focusOnSelect: true,
				asNavFor: '.case-study-background-scroll',
				prevArrow: '<a class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></a>',
				nextArrow: '<a class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></a>',
			});
			$('.case-study-background-scroll').slick({
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: true,
				pauseOnFocus: true,
				pauseOnHover:true,
				focusOnSelect: true,
  				autoplaySpeed: $(this).data('speed'),
				asNavFor: '.case-study-slider',
				arrows: false,
			});
			
			/*------- callback functions for team slider ---------*/
			$('.center').on('beforeChange', function(event, slick, currentSlide, nextSlide){
				if ($(window).width() < 769) {
					$(".center .slick-slide").removeClass('slick-center-slide');
					$(".center .slick-slide .aadi-data-head, .slick-slide .aadi-data-designation, .slick-slide .aadi-data-content").html('');
					var slideEle = $('.center [data-slick-index="'+(nextSlide)+'"]');
					slideEle.addClass('slick-center-slide');
					var data_val = slideEle.attr('data-value');
					var data_content = slideEle.data('content');
					var t = slideEle;
				}else{
					$(".center .slick-slide").removeClass('slick-center-slide');
					$(".center .slick-slide .aadi-data-head, .slick-slide .aadi-data-designation, .slick-slide .aadi-data-content").html('');
					var slideEle = $('.center [data-slick-index="'+(nextSlide)+'"]');
					slideEle.next().addClass('slick-center-slide');
					var data_val = slideEle.next().attr('data-value');
					var data_content = slideEle.next().data('content');
					var t = slideEle.next();
				}
				var dataobj = JSON.parse(data_val);
				$('.aadi-team-center-content-wrap').fadeOut(150,function(){
					$('.aadi-team-center-content-wrap .aadi-data-head').html(dataobj['data-head']);
					$('.aadi-team-center-content-wrap .aadi-data-designation').html(dataobj['data-designation']);
					$('.aadi-team-center-content-wrap .aadi-data-content').html(data_content);
					$('.aadi-team-social-content li').remove();
					if(dataobj.hasOwnProperty('data-fb') && dataobj['data-fb'] != ''){
						$('.aadi-team-center-content-wrap .aadi-team-social-content').append('<li class="facebook"> <a href="'+dataobj['data-fb']+'"><i class="fa fa-facebook"></i></a> </li>');
					}
					if(dataobj.hasOwnProperty('data-twitter') && dataobj['data-twitter'] != ''){
						$('.aadi-team-center-content-wrap .aadi-team-social-content').append('<li class="google"> <a href="'+dataobj['data-twitter']+'"><i class="fa fa-google-plus"></i></a> </li>');
					}
					if(dataobj.hasOwnProperty('data-gplus') && dataobj['data-gplus'] != ''){
						$('.aadi-team-center-content-wrap .aadi-team-social-content').append('<li class="twitter"> <a href="'+dataobj['data-gplus']+'"><i class="fa fa-twitter"></i></a> </li>');
					}
					if(dataobj.hasOwnProperty('data-linkedin') && dataobj['data-linkedin'] != ''){
						$('.aadi-team-center-content-wrap .aadi-team-social-content').append('<li class="linkedin"> <a href="'+dataobj['data-linkedin']+'"><i class="fa fa-linkedin"></i></a> </li>');
					}
					$('.aadi-team-center-content-wrap').fadeIn(200)
				})
			});			
		},
		aadi_grid_sync : function(){
			$('.gridwrap li').each(function(index, element) {
				$(this).outerHeight($('.gridwrap li:eq(0)').css('width'));
			});
		}
	},
	
	/*-------- On Ready Method --------*/
	aadi_OnReady = {
		init : function(){
			aadi_page.init();
		},
		adScrollEvent : function(){
			var hHeight = $('.aadi-header').outerHeight();
			jQuery(window).scroll(function () {
				if(jQuery(window).scrollTop() > hHeight) {
					jQuery('.aadi-header.aadi-header-sticky').addClass('aadi-header-collaspe');
				}
				else{
					jQuery('.aadi-header.aadi-header-sticky').removeClass('aadi-header-collaspe');
				}
			});
		}
	};
	$(function(){
		aadi_page.aadi_sliders();									 
	});
	jQuery(document).ready(function(){
		aadi_OnReady.init();
		aadi_OnReady.adScrollEvent();
	});
})(jQuery);
