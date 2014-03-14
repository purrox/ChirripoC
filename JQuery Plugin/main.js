$( document ).ready(function () {
	
	//$( '#patito' ).showLinkLocation( ' world' );


$("#button1").click(function (){
	var text = $("#stringInput").val();
	$( '#canvas' )
		.drawCanvas( text );

});

$("#button2").click(function (){
	$( '#canvas' ).deletedCanvas();

});

var watermark = 'Puts your string here';
 
	$('#stringInput').val(watermark).addClass('watermark');
 
 	$('#stringInput').blur(function(){
  		if ($(this).val().length == 0){
    		$(this).val(watermark).addClass('watermark');
		}
 	});
 
	$('#stringInput').focus(function(){
  		if ($(this).val() == watermark){
    		$(this).val('').removeClass('watermark');
		}
 	});

});