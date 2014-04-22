var PORT = "COM3";

// 各LEDの明るさ（RGB順）
var brightness = [
	[0, 200, 50],	// LED1
	[200, 200, 0],	// LED2
	[200, 0, 0],	// LED3
]

// 各LEDの接続PIN（RGB順）
var PIN = [
	[null, 5, 6],	// LED1
	[9, 10, null],	// LED2
	[11, null, null],	// LED3
]

var color_dark = ["#0a8", "#aa0", "#a00"];
var color_bright = ["#0fc", "#ff0", "#f00"];

function enter(i){
	$("td").eq(i).css("background-color", color_bright[i]);
	on_LED(i);
}
function leave(i){
	$("td").eq(i).css("background-color", color_dark[i]);
	off_LED(i);
}

function on_LED(LED) {	
	for(i=0; i<3; i++) {
		if( PIN[LED][i] === null ) continue;
		document.arduino.analogWrite(PIN[LED][i], brightness[LED][i]);
	}
}

function off_LED(LED) {
	for(i=0; i<3; i++) {
		if( PIN[LED][i] === null ) continue;
		document.arduino.analogWrite(PIN[LED][i], 0);
	}
}

function setup() {

	var arduino = document.arduino;
	
	arduino.open(PORT);
	
	for(i=0; i<3; i++){ 
		for(j=0; j<3; j++){ 
			if( PIN[i][j] === null ) continue;
			arduino.pinMode(PIN[i][j], true);
		}
	}
}


$(function(){

	for(var i=0; i<3; i++) {
		$("td").eq(i).css("background-color", color_dark[i]);
	}
	$("td").hover(
		function(){ enter($(this).index());},
		function(){ leave($(this).index());}
	);
		
		
	if( document.arduino ) {
		setup();
	} else {
		alert("Arduino.js is not installed.");
	}
});



function changeDevicePort(){

    PORT = $('#devPort').val();
	try{
		setup();
	} catch(e) {
		alert("Connection failed! ("+ PORT +")");
	}
}
