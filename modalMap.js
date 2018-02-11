(function($){
	
	"use strict";
	
	$.fn.modalMap = function(options){
		
		// default options
		var settings = $.extend({
			width: 600,
			height: 400,
			heading: '',
			text: '',
			onOpen: null,
			onClose: null,
			fadeIn: 1000,
			fadeOut: 600,
			default: 'map',
			mapPlace: null,
			streetPlace: null
		}, options)
		
		var width = (window.innerWidth>settings.width+30) ? settings.width : window.innerWidth-30;
		
		var modal = $("<div></div>");
		
		modal.html(
			"<div class='modalMapContainer'>"+
				"<div class='modalMapContent'>"+
					"<div class='modalMapIframeMap'></div>"+
					"<div class='modalMapIframeStreet'></div>"+
					"<h2 class='modalMapHeading'>"+ settings.heading+"</h2>"+
					"<p class='modalMapText'>"+ settings.text +"</p>"+
					"<hr class='modalMapHr'/>"+
					"<button class='modalMapBtn modalMapBtnMap'>Map view</button>"+
					"<button class='modalMapBtn modalMapBtnStreet'>Street view</button>"+
					"<button class='modalMapBtn modalMapBtnClose'>Close</button>"+
				"</div>"+
			"</div>"
		);
		
		var btnStreet         = modal.find(".modalMapBtnStreet"),
		    btnMap            = modal.find(".modalMapBtnMap"),
		    btnClose          = modal.find(".modalMapBtnClose"),
		    mapContainer      = modal.find(".modalMapIframeMap"),
		    streetContainer   = modal.find(".modalMapIframeStreet"),
		    modalMapContainer = modal.find(".modalMapContainer"),
		    modalMapContent   = modal.find(".modalMapContent"),
		    heading           = modal.find(".modalMapHeading"),
		    text              = modal.find(".modalMapText"),
		    hr                = modal.find(".modalMapHr"),
		    btn               = modal.find(".modalMapBtn"),
		    btnSelected       = modal.find(".modalMapBtnSelected");
		
		styleModal();
		
		modal.appendTo("body");
		
		streetContainer.html(
			"<iframe " +
				"width='"+ width +"'" +
				"height='"+ settings.height +"'" +
				"frameborder='0'" +
				"style='border:0'" +
				"src='https://www.google.com/maps/embed/v1/streetview?key="+ options.key +"&location="+options.streetPlace+"'" +
				"allowfullscreen>" +
			"</iframe>"
		);

		mapContainer.html(
			"<iframe " +
				"width='"+ width +"'" +
				"height='"+ settings.height +"'" +
				"frameborder='0'" +
				"style='border:0'" +
				"src='https://www.google.com/maps/embed/v1/place?q="+options.mapPlace+"&key="+ options.key +"' " +
				"allowfullscreen>" +
			"</iframe>"
			
		);

		function openModal(){
			if(settings.default === 'map')
			{
				renderMap();
			}
			else
			{
				renderStreet();
			}
			modal.fadeIn(settings.fadeIn);
			if( $.isFunction(settings.onOpen) )
			{
				settings.onOpen.call(modalMapContainer);
			}
		}
		
		function closeModal(){
			modal.fadeOut(settings.fadeOut);
			if( $.isFunction(settings.onClose) ){
				settings.onClose.call(modalMapContainer);
			}
		}
		
		function renderMap(){
			btnMap.addClass("modalMapBtnSelected");
			btnStreet.removeClass("modalMapBtnSelected");
			btnMap.css({
				"border-top": "solid #3984E0 4px",
				"color": "#3984E0"
			});
			btnStreet.css({
				"color": "#444",
				"border-top": "none"
			})
			streetContainer.css("display", "none");
			mapContainer.css("display", "initial");
		}

		function renderStreet(){
			btnStreet.addClass("modalMapBtnSelected");
			btnMap.removeClass("modalMapBtnSelected");
			btnStreet.css({
				"border-top": "solid #3984E0 4px",
				"color": "#3984E0"
			});
			btnMap.css({
				"color": "#444",
				"border-top": "none"
			})
			mapContainer.css("display", "none");
			streetContainer.css("display", "initial");
		}
		
		// close modal with close button
		btnClose.on("click", closeModal);
		
		// close modal with ESC key
		$(document).on("keyup", function(e){
			if( e.keyCode === 27 || e.which === 27 )
			{
				closeModal();
			}
		})
		
		// close modal with outside click
		modalMapContainer.on("click", function(e){

			if(e.target == this)
			{
				closeModal();
			}
		})
		
		// toggle between map and street view
		btnStreet.on("click", renderStreet)
		btnMap.on("click", renderMap);

		function styleModal(){
			
			modal.css("display", "none");
			
			modalMapContainer.css({
				"width": "100vw",
				"min-height": "100vh",
				"background": "rgba(0,0,0,0.7)",
				"position": "absolute",
				"top": 0,
				"left": 0,
				"display": "flex",
				"justify-content": "center",
				"align-items": "center"
			});
			
			modalMapContent.css({
				"max-width": width + "px",
				"margin": "30px 15px",
				"background": "white",
				"border-radius": "5px",
				"overflow": "hidden",
				"text-align": "left",
				"font-family": "Roboto, sans-sarif",
				"color": "#444"
			});
			
			streetContainer.css("display", "none");
			
			heading.css({
				"font-weight": 500,
				"margin": "8px 15px 0",
				"padding": 0
			});
			
			text.css({
				"font-weight": 400,
				"margin": "6px 15px 0",
				"padding": 0
			});
			
			hr.css({
				"opacity": 0.7,
				"margin": "15px 0 0 0",
				"color": "#444"
			});
			
			btn.css({
				"font-weight": 500,
				"padding": "10px 20px",
				"margin": 0,
				"border": "none",
				"background": "white",
				"text-transform": "uppercase",
				"outline": "none",
				"position": "relative",
				bottom: "1px"
			});
			
			btnClose.css({
				"float": "right",
				bottom: "-3px"
			});
			
			btn.hover(function(){
				$(this).css("color", "#3984E0");
			}, function(){
				if(!$(this).hasClass("modalMapBtnSelected"))
				{
					$(this).css("color", "#444");
				}
			})

		}
		
		return this.each(function(){

			$(this).on("click", openModal);
			
		});
	};
	
}(jQuery));
