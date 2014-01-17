// snippet from postContent.php
// Swipe support, pagination, arrow hiding, caption switching for Michael Merrill's portfolio

// from Michael Merrill's portfolio site
// javascript contributed by Kim Slawson
// kimslawson@gmail.com
// last modified 2014-01-17


		<?php if($tab == 'portfolio') { ?>

			<!-- pagination modification for portfolio - by Kim Slawson - kimslawson@gmail.com
			================================================== -->		
			<script type="text/javascript">
				function checkCurrentChunk() {
					// hide all chunks except the one containing the current item
					$('div.chunk').hide();
					$('div.chunk:has(a.current)').show();
					// if no current chunk, still enable the user to get around using pagination
					if ($('div.chunk').not(':visible')) {
						// if current item is first, show the first chunk
						if ($('li:has(a.current)').hasClass('first')) {
							$('div.chunk').first().show();
						}
						// if current item is last, show the last chunk
						if ($('li:has(a.current)').hasClass('last')) {
							$('div.chunk').last().show();
						}
					}
				}

				// find next and previous objects that are not necessarily siblings
				$.fn.findNext = function( selector ){
					var set = $( selector );
					return set.eq( set.index( this ) + 1 )
				}
				$.fn.findPrev = function( selector ){
					var set = $( selector );
					return set.eq( set.index( this ) - 1 )
				}

				jQuery(document).ready(function($){
					// add first and last class to items
					$('a.image-link').first().addClass("first");
					$('a.image-link').last().addClass("last");

					// add listener 
					

					// count items in pagination container (but don't include prev/next controls)
					var itemCount = $('ul#image-numbers').children().length - 2;
					// if seven items then don't bother
					if (itemCount <= 7) {
						return;
					}
					// if > 7, chunk into groups of 3
					// but don't include the prev/next controls or the first or last image
					$('ul#image-numbers li.prev').next().addClass('first');
					$('ul#image-numbers li.next').prev().addClass('last');
					var $itemArr = $('ul#image-numbers li').not('.prev, .next, .first, .last');
					var itemArrLen = $itemArr.length;
					var itemPerDiv = 3;
					for (var i = 0;i < itemArrLen;i+=itemPerDiv){
						$itemArr.filter(':eq('+i+'),:lt('+(i+itemPerDiv)+'):gt('+i+')').wrapAll('<div class="chunk" />');
					}
					checkCurrentChunk();
					// prepend and append ellipses that activate the prev and next chunks
					$('div.chunk:not(:first)').prepend('<a class="prevChunk" href="#">&hellip;</a>');
					$('div.chunk:not(:last)').append('<a class="nextChunk" href="#">&hellip;</a>');
					$('a.prevChunk').click( function(e){
						var evt = e || window.event;
						var url = $(this).attr('href');
						evt.preventDefault();
						$(this).parent().hide().prev().show();
					});
					$('a.nextChunk').click( function(e){
						var evt = e || window.event;
						var url = $(this).attr('href');
						evt.preventDefault();
						$(this).parent().hide().next().show();
					});
				});
			</script>

			<!-- Show/hide arrows for portfolio
			================================================== -->		
			<script type="text/javascript">
				function checkArrows() {
					if ($('a.current').hasClass('first')) {
						// if current item is first, hide the previous arrow and show the next arrow
						$('li.prev a').addClass("hidden");
						$('li.next a').removeClass("hidden");
					} else if ($('a.current').hasClass('last')) {
						// if current item is last, hide the next arrow and show the previous arrow
						$('li.next a').addClass("hidden");
						$('li.prev a').removeClass("hidden");
					} else {
						// if current item is neither first nor last, show both arrows
						$('li.next a').removeClass("hidden");
						$('li.prev a').removeClass("hidden");
					}
				}
			</script>

			<!-- Image replacement links for portfolio
			================================================== -->		
			<script type="text/javascript">
				function switchImage() {
					// check whether to show/hide arrows
					checkArrows();

					// set random interval for fading
					var randomTime = Math.floor(Math.random()*(10*100))
					
					// get the caption from the link's title attribute
					var caption = $('.current').attr('title');
					$('.imageContainer .caption').html(caption);

					var src = $('.current').attr('href');
					// get the orientation (horizontal or vertical) for the clicked image from the data attribute
					var orientation = $('.current').attr('data');
					// get the src of the next image and previous image for use with the next / previous arrows
					var nextImg = '';
					var prevImg = '';
					var nextImg = $('.current').parent().next().find("a.image-link").attr("href");
					if(nextImg === undefined) {
						// no next image so assume next image is the first image
						var nextImg = $('a.image-link').first().attr("href");					
					}
					var prevImg = $('.current').parent().prev().find("a.image-link").attr("href");
					if(prevImg === undefined) {
						// no previous image so assume previous image is the last image
						var nextImg = $('a.image-link').last().attr("href");
					}
										
					// set the new src for the next and previous links
					$("li.next a").attr("href", nextImg);
					$("li.prev a").attr("href", prevImg);

					// set the orientation for next and previous links
					var nextOr = '';
					var prevOr = '';
					var nextOr = $('.current').parent().next().find("a.image-link").attr("data");
					if(nextOr === undefined) {
						// no next image so assume next image is the first image
						var nextOr = $('a.image-link').first().attr("data");
					}
					var prevOr = $('.current').parent().prev().find("a.image-link").attr("data");
					if(prevOr === undefined) {
						// no previous image so assume previous image is the last image
						var prevOr = $('a.image-link').last().attr("data");
					}
					// if the newly requested image is different from the current image
					// fade the old image out and the new one in
					if (src != $('img#mainImage').attr('src').replace(/\?(.*)/,'')) {
						$('img#mainImage').stop().animate({opacity:'0'},function(){
								$(this).attr('src',src+'?'+randomTime);
						}).load(function(){
								$(this).stop().animate({opacity:'1'});
						});

					}
					// set the size of the image container based on the orientation of the image
					// this keeps the text description always at the same distance away from the left
					// margin of the displayed image
					if(orientation == 'horizontal') $( "div#orientationWrapper" ).removeClass("eight columns offset-by-eight").addClass("fourteen columns offset-by-five");
					else $( "div#orientationWrapper" ).removeClass("fourteen columns offset-by-five").addClass("eight columns offset-by-eight");
					checkCurrentChunk();
				}

				jQuery(document).ready(function($){
					// check whether to show/hide arrows
					checkArrows();

					// previous
					$('li.prev a').click(function(e){
						var evt = e || window.event;
						var url = $(this).attr('href');
						evt.preventDefault();
						$('.image-link.current').removeClass("current").findPrev('.image-link').addClass("current");
						if ($('.current').length == 0) {
							// no current image and previous clicked so assume last is current
							$('a.image-link').last().addClass("current");
						}
						switchImage();
					});

					// next
					$('li.next a').click(function(e){
						var evt = e || window.event;
						var url = $(this).attr('href');
						evt.preventDefault();
						$('.image-link.current').removeClass("current").findNext('.image-link').addClass("current");
						if ($('.current').length == 0) {
							// no current image and next clicked so assume first is current
							$('a.image-link').first().addClass("current");
						}
						switchImage();
					});

					// image link clicked
					$('a.image-link').each(function(){
					    $(this).click(function(e){
						var evt = e || window.event;
						var url = $(this).attr('href');
						evt.preventDefault();
					    	// remove the .current class from the previously viewed image before showing the one the user clicked to see
   					    	$(".current").removeClass("current");	
   					    	// add the .current class to the newly clicked image
       					    $(this).addClass("current");
							
							switchImage();	
					    });
					});
				});
			</script>
			
			<!-- swipe/move for gallery images
			uses stephband's 
			https://github.com/stephband/jquery.event.move and 
			https://github.com/stephband/jquery.event.swipe
			demo here http://stephband.info/jquery.event.swipe
			================================================== -->		
			<script type="text/javascript" src="/javascripts/jquery.event.move.js"></script>
			<script type="text/javascript" src="/javascripts/jquery.event.swipe.js"></script>

			<script type="text/javascript">
				jQuery('#mainImageContainer').on('movestart', function(e) {
					// If the movestart is heading off in an upwards or downwards
					// direction, prevent it so that the browser scrolls normally.
					if ((e.distX > e.distY && e.distX < -e.distY) || (e.distX < e.distY && e.distX > -e.distY)) {
						e.preventDefault();
					}
				});

				$('#mainImage').on('swiperight', function(e) {
					// swipe right so go to previous image (the "natural" direction)
					var evt = e || window.event;
					var url = $(this).attr('href');
					evt.preventDefault();
					$('.image-link.current').removeClass("current").findPrev('.image-link').addClass("current");
					if ($('.current').length == 0) {
						// no current image and previous clicked so assume last is current
						$('a.image-link').last().addClass("current");
					}
					switchImage();
				})
				.on('swipeleft', function(e) {
					// swipe left so go to next image (the "natural" direction)
					var evt = e || window.event;
					var url = $(this).attr('href');
					evt.preventDefault();
					$('.image-link.current').removeClass("current").findNext('.image-link').addClass("current");
					if ($('.current').length == 0) {
						// no current image and next clicked so assume first is current
						$('a.image-link').first().addClass("current");
					}
					switchImage();
				});
			</script>

		<?php } ?>
