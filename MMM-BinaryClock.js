/* global Module */

/* Magic Mirror
 * Module: MMM-BinaryClock
 *
 * By Nik Roberts
 * MIT Licensed.
 */

Module.register("MMM-BinaryClock", {
	defaults: {
		updateInterval: 1000,  // set to one second for testing
		retryDelay: 5000,
		size: 35,
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	// Define required scripts. ** moment is for accessing the time  **
	getScripts: function() {
		return ["moment.js"];
	},
	
	getStyles: function () {
		return [
			"MMM-BinaryClock.css",
		];
	},


	start: function() {
		var self = this;
		var dataRequest = null;
		var dataNotification = null;
		// load images for the display from the img folder
		// to change the images, download image for on and off then rename the below.
		
		this.LEDon = 'img/green-led-on.png';	
		this.LEDoff = 'img/green-led-off.png';
		
		//Flag for check if module is loaded
		this.loaded = false;
		this.running = false;
		

		// Schedule update timer.
		setInterval(function() {
			self.updateBinTime();
		}, this.config.updateInterval);
	},


	/* scheduleUpdate()
	 * Schedule next update.
	 *
	 * argument delay number - Milliseconds before next update.
	 *  If empty, this.config.updateInterval is used.
	 */
	
	// calculate time in binary as a string
	
	getBinTime: function(){
		var date = moment();
		var hours = date.hours();
		this.binHours = hours.toString(2).padStart(6,"0");
		var minutes = date.minutes();
		this.binMins = minutes.toString(2).padStart(6,"0");
		var seconds = date.seconds();
		this.binSecs = seconds.toString(2).padStart(6,"0");

	},
	
	// Update time and refresh DOM
	
	updateBinTime: function(){
		this.getBinTime();
		var h = this.binHours;
		var m = this.binMins;
		var s = this.binSecs;
		
		var binH = h.split("");
		var binM = m.split("");
		var binS = s.split("");
		// Loop hour min and secs
			for(var a = 0; a < 3 ; a++){
		// loop for each string element
				for(var j = 5; j>-1 ; j--){
					// check which compnent H M S
					switch (a) {
						case 0: //hours
							var img = document.getElementById(`Ho${j}`);
							//console.log(img);
							binH[j]==1 ? img.style.display = "block" : img.style.display = "none";
						break;
						case 1: //mins
							var img = document.getElementById(`Mo${j}`);
							//console.log(img);
							binM[j]==1 ? img.style.display = "block" : img.style.display = "none";
						break;					
						case 2: //sec
							var img = document.getElementById(`So${j}`);
							//console.log(img);
							binS[j]==1 ? img.style.display = "block" : img.style.display = "none";
						break;	
					};					

				}	
			}
	},
	
	
		/* build dom
		 */
	getDom: function() {
		var LEDoff = this.LEDoff;
		var LEDon = this.LEDon;
		var wrapper = document.createElement("div");
		wrapper.id = 'binary_clock';
		console.log("build DOM");
		var s= this.config.size;
		//loop to build DOM first load
		for(y = 0; y<3 ; y++){
			switch(y) {
				case 0:
					timeIndicator = "H";
					break;
				case 1:
					timeIndicator = "M";
					break;
				case 2:
					timeIndicator = "S";
					break;
				}
			for(var x = 0 ; x < 6 ; x++){
				var div = document.createElement("div");
				for(var z=0 ; z<2 ; z++){
					var a = document.createElement('a');
					var img = document.createElement("img");
					z==0 ? img.src=this.file(this.LEDoff) : img.src=this.file(this.LEDon);
					z==0 ? img.id = timeIndicator+"x"+x : img.id = timeIndicator+"o"+x;
					img.style.position = "absolute";
					img.style.left = x*(s+(s/10))+"px";
					img.style.top = y*(s+(s/5))+"px";
					img.width = s;
					if(z==1){img.style.display = "none"}
					a.appendChild(img);
					div.appendChild(a);	
				}
				wrapper.appendChild(div);		
			}
	
		}
		this.running = true;
		return wrapper;
	},
	
	

	// Load translations files
	getTranslations: function() {
		//FIXME: This can be load a one file javascript definition
		return {
			en: "translations/en.json",
			es: "translations/es.json"
		};
	}
});
