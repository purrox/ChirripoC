(function ( $ ) {

	$.fn.drawCanvas = function( text ) {
		//$( this ).html ('<canvas id="e" width="200" height="200"></canvas>');
		  var canvas =$("#canvas");
		  var context = canvas[0].getContext("2d");
		  context.fillStyle = "blue";
 		  context.font = "bold 16px Arial";
  		  context.fillText( text , 0, 100);

	};

	$.fn.deletedCanvas = function() {
		var canvas =$("#canvas");
		var context = canvas[0].getContext("2d");
		context.fillStyle = "#ffffff";
		context.fillRect(0, 0, 150, 800);
	};

}( jQuery ));