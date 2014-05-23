## Playhead
window scroll event listener wrapper

#### Install
include the script in your page

	<script type="text/javascript" src="playhead.js"></script>

#### Set zones
use pixel number for start and stop range
	/* Set a single zone */
	var zone = {
			range : {
				in : 100,
				out: 500
			},
			playIn: function() {
				document.body.style.background = "#333";
			},
			playOut: function() {
				document.body.style.background = "#FFF";
			}
		};

	/* Or create an array of zones */
	var zones = [
		{
			range : {
				in : 100,
				out: 500
			},
			playIn: function() {
				document.body.style.background = "#333";
			},
			playOut: function() {
				document.body.style.background = "#FFF";
			}
		},
		{
			range : {
				in : 600,
				out: 1000
			},
			playIn: function() {
				alert("I'm in range!");
			},
			playOut: function() {
				alert("I'm leaving the range.");
			}
		},
		{
			range : {
				in : 950,
				out: 1200
			},
			playIn: function() {
				console.log("I'm overlapping another zone");
			},
			playOut: function() {
				console.log("I'm leaving this range too");
			}
		}
	];

#### Options
zone.orientation defaults to "portrait", but accepts "landscape" as well

zone.destroy will remove the listener, so after playIn and playOut trigger, will never call again

Global options can be set for playHead.setTracks by adding the options after the array. playHead.setTracks(zones, {destroy: true});


#### Init
playHead.setTrack(zone);
playHead.setTracks(zones);