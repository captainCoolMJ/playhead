/**************
* PLAYHEAD.JS *
***************/


// Some polyfills
(function() {
  if (!Event.prototype.preventDefault) {
	Event.prototype.preventDefault=function() {
	  this.returnValue=false;
	};
  }
  if (!Event.prototype.stopPropagation) {
	Event.prototype.stopPropagation=function() {
	  this.cancelBubble=true;
	};
  }
  if (!Element.prototype.addEventListener) {
	var eventListeners=[];
	
	var addEventListener=function(type,listener /*, useCapture (will be ignored) */) {
	  var self=this;
	  var wrapper=function(e) {
		e.target=e.srcElement;
		e.currentTarget=self;
		if (listener.handleEvent) {
		  listener.handleEvent(e);
		} else {
		  listener.call(self,e);
		}
	  };
	  if (type=="DOMContentLoaded") {
		var wrapper2=function(e) {
		  if (document.readyState=="complete") {
			wrapper(e);
		  }
		};
		document.attachEvent("onreadystatechange",wrapper2);
		eventListeners.push({object:this,type:type,listener:listener,wrapper:wrapper2});
		
		if (document.readyState=="complete") {
		  var e=new Event();
		  e.srcElement=window;
		  wrapper2(e);
		}
	  } else {
		this.attachEvent("on"+type,wrapper);
		eventListeners.push({object:this,type:type,listener:listener,wrapper:wrapper});
	  }
	};
	var removeEventListener=function(type,listener /*, useCapture (will be ignored) */) {
	  var counter=0;
	  while (counter<eventListeners.length) {
		var eventListener=eventListeners[counter];
		if (eventListener.object==this && eventListener.type==type && eventListener.listener==listener) {
		  if (type=="DOMContentLoaded") {
			this.detachEvent("onreadystatechange",eventListener.wrapper);
		  } else {
			this.detachEvent("on"+type,eventListener.wrapper);
		  }
		  break;
		}
		++counter;
	  }
	};
	Element.prototype.addEventListener=addEventListener;
	Element.prototype.removeEventListener=removeEventListener;
	if (HTMLDocument) {
	  HTMLDocument.prototype.addEventListener=addEventListener;
	  HTMLDocument.prototype.removeEventListener=removeEventListener;
	}
	if (Window) {
	  Window.prototype.addEventListener=addEventListener;
	  Window.prototype.removeEventListener=removeEventListener;
	}
  }
})();

/* CORE */
var playHead = (function() {
	'use strict';

	var valX = 0,
		valY = 0;

	// Global listener to retrieve values
	window.addEventListener('scroll', returnVals);
	function returnVals() {
		valX = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
		valY = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
	}

	var setTracks = (function(tracks, globalOptions) {
		var globalSettings;

		if( globalOptions !== 'undefined' ) {

			globalSettings = globalOptions;

		}

		tracks.forEach(function(track) {

			if( globalOptions !== 'undefined' ) {

				for( var prop in globalOptions ) {
					track[prop] = globalOptions[prop]; 
				}

			}

			setTrack(track);

		});

	});

	var setTrack = (function (options) {

		// Setting default options from call
		var inRange = Math.floor(parseInt(options.range.in)),
			outRange = Math.floor(parseInt(options.range.out)),
			playIn = options.playIn,
			playOut = options.playOut,
			orientation = options.orientation,
			destroy = !!options.destroy;

		// Trigger to make sure functions only fire once
		var hasTriggered = false;

		// Check to make sure the value is positive
		if( outRange <= inRange ) {
			console.error('Range must be a positive value!');
		}

		// Adding scroll listener
		window.addEventListener('scroll', handleRanges, false);

		function handleRanges() {

			// Determines which value to receive
			var scrollVal = orientation === 'landscape' ? valX : valY;

			if( scrollVal > inRange && scrollVal < outRange ) {

				if( !hasTriggered ) {
				
					playIn();

				}

				// Ensure playIn only calls once
				hasTriggered = true;

			} else if( scrollVal > outRange || scrollVal < inRange ) {

				if( hasTriggered ) {

					// Prevent another call
					if( destroy ) {
						window.removeEventListener('scroll', handleRanges);
					}
				
					playOut();
				
				}

				// Reset playIn
				hasTriggered = false;

			} else {
				return false;
			}

		};

	});

	return {
		setTrack: setTrack,
		setTracks: setTracks
	};

})();