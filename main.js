var session = document.querySelector('.session');
var rest = document.querySelector('.rest');
var time = document.querySelector('.time');

var play = false;
var s_min = 25;
var s_sec = 0;
var minutes = 0;
var seconds = 0;
var r = 5;
var set_timer;

display(s_min,s_sec);

function changeProp(indec,sere) {
	if (play == false) {
		if (sere == "0") {
			if (indec == "0")
				s_min = s_min - 1;
			else if (indec == "1")
				s_min = s_min + 1;
			session.innerText = s_min;
			display(s_min,0);
		}
		if (sere == "1") {
			if (indec == "0")
				r = r - 1;
			else if (indec == "1")
				r = r + 1;
			rest.innerText = r;
		}
	}
}

function start(e) {
	play = true;
	var start_time = Date.now();
	if (s_sec == 0) {
		s_min = s_min - 1;
		s_sec = 59;
	}
	else {
		s_sec = s_sec - 1;
	}
	function timer(e) {
		var diff = ((Date.now() - start_time)/1000) | 0;
		minutes = s_min  - ((diff/60) | 0);
		seconds = s_sec - ((diff%60) | 0);
		display(minutes,seconds);
	}
	timer();
	set_timer = setInterval(timer, 1000);
}

function display(min,sec) {
	min =  (min < 10) ? "0" + min : min;
	sec = (sec < 10) ? "0" + sec : sec;
	time.innerText = min + " : " + sec;
}

function pause() {
	play = false;
	clearInterval(set_timer);
	s_min = minutes;
	s_sec = seconds;
	display(s_min,s_sec);
}

function stop() {
	play = false;
	clearInterval(set_timer);
	s_min = 25;
	s_sec = 0;
	display(s_min,s_sec);
}