var counter = 0;
var intervalID;

$(document).ready(function () {

    //websocket_proc();
    
    // вывод диалогового окна сообщений
    if ($.trim($('#msgtext').html()) != "") {
        $('#message').modal('show');
    }

    // включаем таймер для обратного отсчёта
    //if (timeleft != -1) {
        time(); // обратный отсчёт до посыла
        intervalID = setInterval(time, 5000);
    //}
    if (timeleft == -1) $("#timeleft").addClass('hidden');

});


// обратный отсчёт до Посыла
function time() {

    /*// отключаем таймер после Посыла
    if (timeleft < 0) {
        clearInterval(intervalID);
        return;
    }*/

    if (timeleft >= 0) {
        var today = 0;
        var thour = timeleft == -1 ? 0 : Math.floor(timeleft / 3600);
        var tmin = timeleft == -1 ? 0 : Math.floor(timeleft / 60 - 60 * thour);
        var tsec = timeleft == -1 ? 0 : timeleft % 60;

        timestr = (today > 0 ? '<span class="txt-gray">' + today + '</span>' + declOfNum(today, [' день ', ' дня ', ' дней ']) : '') + '<span class="txt-gray">' + thour + '</span>' + declOfNum(thour, [' час ', ' часа ', ' часов ']) + '<span class="txt-gray">' + tmin + '</span>' + declOfNum(tmin, [' минута ', ' минуты ', ' минут ']) + '<span class="txt-gray">' + tsec + '</span>' + " сек.";
        document.getElementById('t').innerHTML = timestr;
        timeleft -= 5;
        if ($("#timeleft").hasClass('hidden')) $("#timeleft").removeClass('hidden');
    }

    if (counter >= 300) { // через каждые 5 минут (=300) синхронизируем остаток с сервером
        time_server();
        counter = 0;
    }
    else counter += 5;
}

// получаем оставшееся время с сервера
function time_server() {

    $.post('/', { 'json': '', 'serv': 'otk', 'cmd': 'timeleft' })
    .success(function (response) {

        timeleft = JSON.parse(response);

    },
    'json'
    )
    .error(function () { /*alert("Ошибка получения оставшегося времени с сервера");*/ });

}

// склонение числительных
function declOfNum(number, titles) {
    cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}