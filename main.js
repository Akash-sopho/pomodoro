var session = document.querySelector('.session');
var rest = document.querySelector('.rest');
var time = document.querySelector('.time');

var s_min = 25;
var s_sec = 0;
var r = 5;

var minutes = 0;
var seconds = 0;

var play = false;
var set_timer;
var next = "rest";

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

function start(min_inp, sec_inp) {
	play = true;
	var start_time = Date.now();
	var tmpm = min_inp;
	var tmps = 0;
	if (sec_inp == 0) {
		tmpm = min_inp;
		tmps = 59;
	}
	else {
		tmps = sec_inp - 1;
	}
	function timer(e) {
		var diff = ((Date.now() - start_time)/1000) | 0;
		minutes = tmpm  - ((diff/60) | 0);
		seconds = tmps - ((diff%60) | 0);
		display(minutes,seconds);
		if (minutes == 0 && seconds == 0) {
			clearInterval(set_timer);
			if (next == "rest") {
				next = "session"
				start(parseInt(rest.innerText), 0);
			}
			else {
				next = "rest";
				start(parseInt(session.innerText), 0);
			}
		}
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

function reset() {
	play = false;
	clearInterval(set_timer);
	s_min = 25;
	s_sec = 0;
	display(s_min,s_sec);
	session.innerText = 25;
	rest.innerText = 5;
}

function stop() {
	play = false;
	clearInterval(set_timer);
	s_min = parseInt(session.innerText);
	s_sec = 0;
	display(s_min,s_sec);
}