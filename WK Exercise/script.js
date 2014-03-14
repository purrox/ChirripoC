
	var el = document.querySelector("#csvFileInput");
	el.onchange = function(){
		handleFiles( this.files );
	}

	function handleFiles(files) {
		if (window.FileReader) {
			getAsText(files[0]);
		} 
		else {
			alert('FileReader are not supported in this browser.');
		}
	}

	function getAsText(fileToRead) {
		var reader = new FileReader();
		// Read file into memory as UTF-8      
		reader.readAsText(fileToRead);
		// Handle errors load
		reader.onload = loadHandler;
		reader.onerror = errorHandler;
	}

	function loadHandler( event ) {
		var csv = event.target.result;
		processData(csv);             
	}

	function processData(csv) {
	    var allTextLines = csv.split(/\r\n|\n/),
	    coordinates = [];
	    allTextLines.forEach( function( e ) {
			var data = e.split(',');
			if (data[0]=="")
				 return;
			coordinates.push({
				lat: data[0],
				lngt: data[1]
			})
	    });
	    console.table(coordinates);
	    initialize( coordinates );
	}

	function errorHandler(evt) {
		if(evt.target.error.name == "NotReadableError") {
			alert("Canno't read file !");
		}
	}


	var map;

	var directionsService = new google.maps.DirectionsService();
	var iterator = 0;
	var iterator = 0,
		init, end;


	function initialize( coordinates ) {
		directionsDisplay = new google.maps.DirectionsRenderer();

	    map =
	   		 new google.maps.Map(document.getElementById('map-canvas'));
	   		 
	   		directionsDisplay.setMap(map);

	    var bounds = new google.maps.LatLngBounds();
	    var infowindow = new google.maps.InfoWindow();
	    var p = coordinates;
	    var num=0;	
	    for (var i in  coordinates)
	    { 
	        num = num+1
	        var b = num;
	        b += '' ; 
	    	var latlng = new google.maps.LatLng(coordinates[i].lat , coordinates[i].lngt);
	        bounds.extend(latlng);
	         
	        var marker = new google.maps.Marker({
	            position: latlng,
	            map: map,
	            title: b, 
	        	icon: 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld='+ (num) +'|0B3B39|FFFFFF',
	        	animation: google.maps.Animation.DROP

	          
	        });
	        setTimeout (3000);
	            google.maps.event.addListener(marker, 'click', function() {
	            infowindow.setContent(this.title);
	            infowindow.open(map, this);
	            calcDistance( this );


	            if( iterator == 2){
	            	 removingCircle();
	            	 iterator = 0;
	            }	
	            if( iterator != 2) {
					circle = new google.maps.Circle({
						center: this.position,
						radius: 100,
						strokeColor: "#FF0000",
						strokeOpacity: 0.8,
						strokeWeight: 2,
						fillColor: "#FF0000",
						fillOpacity: 0.35,
						map: map
					});
					iterator=iterator+1;
					circleArrray.push(circle);
	             }
	    });

	     		 map.fitBounds(bounds);

	    }
	    DrawRoute ( 0, coordinates, map );

	}

	function DrawRoute ( i, coordinates, map ) {
		if( i >= coordinates.length - 1 ) return;

		var  cdteOrigen = coordinates[ i ],
			cdte = coordinates[ i + 1 ];

		var request = {
			origin:       cdteOrigen.lat +','+ cdteOrigen.lngt,
			destination:  cdte.lat +','+ cdte.lngt,
			travelMode:   google.maps.TravelMode.DRIVING 
		};

		
		directionsService.route(request, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				
				var pointsArray = [];
				pointsArray = response.routes[0].overview_path;

				var flightPath = new google.maps.Polyline({
				    path: pointsArray,
				    geodesic: true,
				    strokeColor: '000000',
				    strokeOpacity: 1.0,
				    strokeWeight: 6
				});
			
				flightPath.setMap(map);

				setTimeout( function () {
					DrawRoute( ++i, coordinates, map );
				}, 800 );

			}
		});
	}
	 
	var start, 
		end ;

	function calcDistance( marker ){
		if(start == null) {
			start=  marker.position.d+ ','+ marker.position.e;
		}
		else{
		 var request = { 
		      origin:start,
		      destination: marker.position.d+ ','+ marker.position.e,
		      travelMode: google.maps.TravelMode.DRIVING 

		  };

		  directionsService.route(request, function(response, status) {
		    if (status == google.maps.DirectionsStatus.OK) {
		      var summaryPanel = document.getElementById('directions_panel');
		      summaryPanel.innerHTML = '';

		     for (var i = 0; i <response.routes[0].legs.length; i++) {
		        var routeSegment = i + 1;
		        summaryPanel.innerHTML += "Origin: ";
				summaryPanel.innerHTML += response.routes[0].legs[i].start_address + '<br><br>';
				summaryPanel.innerHTML += "Destiny: ";
				summaryPanel.innerHTML += response.routes[0].legs[i].end_address + '<br><br>';
				summaryPanel.innerHTML += "Distance: ";
				summaryPanel.innerHTML += response.routes[0].legs[i].distance.text + '<br><br>';
		      }

		    }
		  });
		    start = null, 
			end   = null;
		    
		    }

	}

	 var circle;
	 var circleArrray= [];
	 
	 function removingCircle(){

	for (var i = 0; i < circleArrray.length; i++) {
		circleArrray[i].setMap(null);
	};

	 }

