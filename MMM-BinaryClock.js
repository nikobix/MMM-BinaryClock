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

		// Schedule update timer.
		//this.getData();
		setInterval(function() {
			self.getBinTime();
			self.updateDom();
		}, this.config.updateInterval);
	},


	/* scheduleUpdate()
	 * Schedule next update.
	 *
	 * argument delay number - Milliseconds before next update.
	 *  If empty, this.config.updateInterval is used.
	 */
	scheduleUpdate: function(delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}
		nextLoad = nextLoad ;
		var self = this;
		setTimeout(function() {
		}, nextLoad);
	},
	
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
		/* build dom
		 */
	getDom: function() {
		var self = this;
		var LEDoff = this.LEDoff;
		var LEDon = this.LEDon;
		var binHours = this.binHours;
		var binMins = this.binMins;
		var binSecs = this.binSecs;
		
		
		// create element wrapper for show into the module
		var wrapper = document.createElement("div");
		wrapper.id = 'binary_clock';
		if(binHours) {   		// split binary time into string array
			var binH = binHours.split("");
			var binM = binMins.split("");
			var binS = binSecs.split("");
		// Loop hour min and secs
			for(var a = 0; a < 3 ; a++){
				var x = 0;
		// X for correct order

		// loop for each string element
				for(var j = 5; j>-1 ; j--){
					led = document.createElement("img");
					// check which compnent H M S
					switch (a) {
						case 0:
							led.id=`hours hours_${x}`;
							bin = binH;
						break;
						case 1:
							led.id=`mins mins_${x}`;
							bin = binM;
						break;					
						case 2:
							led.id=`secs secs_${x}`;
							bin = binS;
						break;	
					};					
					// if 1 switch on or 0 switch off
					bin[x]=="1" ? this.ledOn(led) : this.ledOff(led);
					wrapper.appendChild(led);
					x++;
				}	
				// add text for HMS
				switch (a){
					case 0:
						text = document.createTextNode(" H");
						break;
					case 1:
						text = document.createTextNode(" M");
						break;
					case 2:
						text = document.createTextNode(" S");
						break;
					}
				text.id="text";
				wrapper.appendChild(text);
			}		
		}
		return wrapper;
	},
 // function to format the LED on and off
	ledOn: function(led){
		led.src=this.file(this.LEDon);
		led.alt="on";
		led.style='width: 20px';
		return led;
	},
	ledOff: function(led){
		led.src=this.file(this.LEDoff);
		led.alt="off";
		led.style='width: 20px';
		return led;
	},		
		

	// Load translations files
	getTranslations: function() {
		//FIXME: This can be load a one file javascript definition
		return {
			en: "translations/en.json",
			es: "translations/es.json"
		};
	},


	processData: function(data) {
		var self = this;
		this.dataRequest = data;
		if (this.loaded === false) { self.updateDom(self.config.animationSpeed) ; }
		this.loaded = true;

		// the data if load
		// send notification to helper
		this.sendSocketNotification("MMM-BinaryClock-NOTIFICATION_TEST", data);
	}
});
