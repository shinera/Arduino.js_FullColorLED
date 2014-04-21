var PORT = "COM3";

// 各LEDの明るさ（RGB順）
var bright = [
	[0, 200, 20],	// LED1
	[200, 200, 0],	// LED2
	[200, 0, 0],	// LED3
]

// 各LEDの接続PIN（RGB順）
var PIN = [
	[null, 5, 6],	// LED1
	[9, 10, null],	// LED2
	[11, null, null],	// LED3
]


function on_LED(LED) {	
	for(i=0; i<3; i++) {
		if( PIN[LED][i] === null ) continue;
		arduino.analogWrite(PIN[LED][i], bright[LED][i]);
	}
}

function off_LED(LED) {
	for(i=0; i<3; i++) {
		if( PIN[LED][i] === null ) continue;
		arduino.analogWrite(PIN[LED][i], 0);
	}
}


var LED = 0;
function change_LED() {

	off_LED(LED);
	
	if( LED == 2 ) {
		LED = 0;
	} else {
		LED++;
	}
	on_LED(LED);
}


if( document.arduino ) {
	
	var arduino = document.arduino;
	
	arduino.open(PORT);
	
	for(i=0; i<3; i++){ 
		for(j=0; j<3; j++){ 
			if( PIN[i][j] === null ) continue;
			arduino.pinMode(PIN[i][j], true);
		}
	}
	
	setInterval( "change_LED()", 500 );
	
} else {
	console.log("error");
}