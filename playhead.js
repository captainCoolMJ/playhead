var playhead = (function (){

	this.window = undefined;
	this.body = undefined;
	this.doc = undefined;
	this.X = undefined;
	this.Y = undefined;
	
	this.init = function (options){
		this.window = window;
		this.body = document.body;
		this.doc = document.documentElement;
		this.X = this.window.scrollX || 0;
		this.Y = this.window.scrollY || 0;
		this.mode = options.mode || 'portrait';
		this.zones = options.zones || [];
		this.window.addEventListener('scroll', handleScroll, false);
	};

	function handleScroll (){
		setX(this.window.scrollX);
		setY(this.window.scrollY);

		var X = getX(),
			Y = getY(),
			len = this.zones.length,
			i = 0;
		
		for(i; i<len; i++){
			if(this.mode === 'portrait'){
				if(Y >= this.zones[i].start && Y < this.zones[i].stop){
					this.zones[i].code();
				}
			}else if(this.mode === 'landscape'){
				if(X >= this.zones[i].start && X < this.zones[i].stop){
					this.zones[i].code();
				}
			}else{
				throw new Error("mode should be set to either 'portrait' or 'landscape'");
			}
		}
	};

	function getX (){
		return this.X;
	};

	function getY (){
		return this.Y;
	};

	function setX (X){
		this.X = X;
	};

	function setY (Y){
		this.Y = Y;
	};

	return this;
})();