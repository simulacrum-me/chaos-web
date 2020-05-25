// Minified Debounce taken from UnderscoreJS (MIT)
function debounce(a,b,c){var d;return function(){var e=this,f=arguments;clearTimeout(d),d=setTimeout(function(){d=null,c||a.apply(e,f)},b),c&&!d&&a.apply(e,f)}}

var WebGalleryTrack = WebGalleryTrack || {};



    // Let's cache some stuff!
    var _$w = $(window),
        _$body = $("body"),
        _$thumbnailContainer = $("#thumbnailContainer"),
        _$thumbnailsParent = $("#thumbnailContainer div.thumbnails"),
        _$thumbnails = [],
        _$loupeContainer = $("#loupeContainer"),
        _$loupeBackground = $("#loupeContainer div.background"),


        _$buttonClose = $("#loupeCloseButton");

    var i,
        _isOpen = false,
        _$targetThumb,
        _$loupeImage,
        _loupeIsTransitioning = false,
        _currentImageIndex,
        _autoViewThumb,
        _paginationStyle = "scroll",
        _viewportHeight = 0,
        _thumbsToLoad = 0,
        _lastLoadedThumbIndex = -1,
        _currentRowContents = [];


    var onWindowResize = debounce(
        function(e) {
            _viewportHeight = _$w.height();
            _$w.trigger("scroll");
        },
        250
    );

    // Set the current height
    _viewportHeight = _$w.height();
    _$w.on(
        "resize",
        onWindowResize
    );

    function onThumbnailClick(e, mapToShow) {
		window.location.hash = mapToShow;
		mymap.setView([90, 0], 2, {"animate": false});
		tileLayer.setUrl('maps/'+mapToShow+'/{z}/{x}/{y}.jpg');
		
        _$loupeContainer.css("display", "block");
		mymap.invalidateSize();
		setTimeout(setIsOpen, 500);
		
        
    }
	function setIsOpen(){
		_isOpen=true;
	}
    // Loupe View Logic

    _$buttonClose.on(
        "click",
        closeLoupeView
    );

window.onhashchange = function() {
	if(_isOpen!=false){
		console.log("Changed");
		_isOpen = false;
		_$loupeContainer.css("display", "none");
	}
}





    function closeLoupeView() {
		window.location.hash = "";
		_isOpen = false;
		_$loupeContainer.css("display", "none");
    }

