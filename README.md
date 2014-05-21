## Playhead
window scroll event listener wrapper

#### Install
include the script in your page

	<script type="text/javascript" src="playhead.js"></script>

#### Set zones
use pixel number for start and stop range

	var my_zones = [
		{
			'id': 'zone 1',
			'start': 0,
			'stop': 400,
			'code': function (){
				document.body.style.background = "#fff";
				document.body.style.color = "#000";
			}
		},
		{
			'id': 'zone 2',
			'start': 600,
			'stop': 800,
			'code': function (){
				document.body.style.background = "#000";
				document.body.style.color = "#fff";
			}
		},
		{
			'id': 'zone 3',
			'start': 1000,
			'stop': 1200,
			'code': function (){
				document.body.style.background = "#f00";
				document.body.style.color = "#fff";
			}
		}
	];

#### Init
set mode to "portrait" or "landscape"
	
	playhead.init({mode: 'portrait', zones: my_zones});