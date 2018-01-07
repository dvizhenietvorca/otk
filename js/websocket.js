var message, cnt = 0, bcnt = 0;
var counter_el = document.querySelector("#online");

function websocket_proc() {
    var socket = new WebSocket("ws://193.106.92.210:8080");
    //console.log(socket);
    /*if(socket.readyState==1) */intervalID = setInterval(timer, 5000);



    socket.onopen = function () {
        //console.log("cоединение установлено");
    };

    socket.onclose = function (event) {
        if (event.wasClean) {
            //console.log('cоединение закрыто');
        } else {
            //console.log('соединения как-то закрыто');
        }
        //console.log('код: ' + event.code + ' причина: ' + event.reason);
    };

    socket.onmessage = function (event) {
        message = JSON.parse(event.data);
        if(cnt==0) timer();
        //counter_el.innerHTML = counter_text(cnt, bcnt);
    };

    socket.onerror = function (event) {
        //console.log("ошибка " + event.message);
    };

}

function counter_text(cnt, bcnt) {
    var msg = (bcnt==0 && cnt%10==1 && cnt%100!=11) ? 'находится<br>' : 'находятся<br>';
    msg += (cnt>0) ? '<span style="color:#eeeeee">'+cnt+'</span> посетител'+ends(cnt,'ь','я','ей') : 'ни одного посетителя';
    if (bcnt) msg += ' и <span style="color:#eeeeee">'+bcnt+'</span> робот'+ends(bcnt,'','а','ов');

    return msg;
}

function ends(n,s1,s2,s3){
    n %= 100;
    switch (n>4 && n<21 ? 5 : n%10){
        case 2:
        case 3:
        case 4: return s2;
        case 1: return s1;
        default: return s3;
    }
}

function timer() {
	if (message!=undefined) {
	    cnt = message.data.counter.guest;
	    bcnt = message.data.counter.bot;
	    counter_el.innerHTML = counter_text(cnt, bcnt);
	}
}