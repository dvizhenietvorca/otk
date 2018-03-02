var selYear, selMonth;
var dataload;
var curDay = new Date();
var r1 = 199, r2 = 74, r3 = 199, r4 = 74, g1 = 239, g2 = 114, g3 = 239, g4 = 114, b1 = 254, b2 = 129, b3 = 254, b4 = 129, d1 = 1, d2 = -1, d3 = 1, d4 = -1, h = "0123456789abcdef";

//var r = [], g = [], b = [], d = [];
//r[1] = 199, r[2] = 74, r[3] = 199, r[4] = 74, r[5] = 199, g[1] = 239, g[2] = 114, g[3] = 239, g[4] = 114, g[5] = 239, b[1] = 254, b[2] = 129, b[3] = 254, b[4] = 129, b[5] = 254, d[1] = 1, d[2] = -1, d[3] = 1, d[4] = -1, d[5] = 1, h = "0123456789abcdef";
var counter;

function hex(c) { return h.charAt(c >> 4) + h.charAt(c & 15); }
function daymess() { r1 += d1; g1 += d1; b1 += d1; $(".daymsgblink").css("color", "#" + hex(r1) + hex(g1) + hex(b1)); if (b1 == 128 || b1 == 255) d1 = -d1; } // для мигания дней посылов в календаре
//function daymess(n) { r[n] += d[n]; g[n] += d[n]; b[n] += d[n]; $(".daymsgblink.d" + n).css("color", "#" + hex(r[n]) + hex(g[n]) + hex(b[n])); if (b[n] == 128 || b[n] == 255) d[n] = -d[n]; } // для мигания дней посылов в календаре

//Запрос и получение дат новостей за месяц соответствующего года
function requestData(month, year) {

    // ограничение по минимальному году
    if (year < minyear) {
        var curdate = new Date();
        year = curdate.getFullYear();
        month = curdate.getMonth() + 1;
    }

    selMonth = month;
    selYear = year;
    counter = 1;

    $.getJSON("?json&year=" + year + "&month=" + month,	//получаем с сервера файл с данными
      function (events) {
          dataload = events;
          $('#datepicker').datepicker('update', new Date(year, month - 1, 1)); //
          //$('#datepicker').datepicker('clearDates');

          // месяц год по русски
          /*var dmy = new Date(year, month - 1).toLocaleString('ru', {
              year: 'numeric',
              month: 'long'
          });*/
          monthA = 'январь,февраль,март,апрель,май,июнь,июль,август,сентябрь,октябрь,ноябрь,декабрь'.split(',');
          $('#dmy').html(monthA[month-1] + ' ' + year);
          curDay = new Date();
      });
}

// Получаем данные текущего месяца
function loadData(month, year) {
    date = new Date();
    month = month == null ? date.getMonth() + 1 : month;
    year = year == null ? date.getFullYear() : year;
    requestData(month, year);
}

$(document).ready(function () {

    //setInterval("daymess()", 23);

    /*setInterval("daymess(1)", 23);
    setInterval("daymess(2)", 23);
    setInterval("daymess(3)", 23);
    setInterval("daymess(4)", 23);
    setInterval("daymess(5)", 23);*/

    var month = lastdaydict[0]; selMonth = month; //  null
    var year = lastdaydict[1]; selYear = year; //  null
    var selDate = { year: year, month: (month - 1), day: 1 };
    
    /*daymsg = {
        tooltip: 'КОЛЛЕКТИВНЫЙ ПОСЫЛ НА ДУХОВНОЕ ЕДИНЕНИЕ',
        classes: 'daymsg',
        enabled: false
    };
    daymsgactive = {
        tooltip: 'КОЛЛЕКТИВНЫЙ ПОСЫЛ НА ДУХОВНОЕ ЕДИНЕНИЕ',
        classes: 'myactive daymsg'
    };
    disabled = {
        tooltip: ' ',
        enabled: false
    };*/

    //var dictout = { 'poems/12.04.16-2': 'Катрен и Послание', 'poems/22.04.16': 'Катрен и Послание', 'poems/27.04.16': 'Катрен и Послание', 'poems/01.06.16': 'Катрен и Послание' }; // !!!НЕ ЗАБЫТЬ ДОБАВИТЬ ССЫЛКУ В datepicker.js!!! - Катрены вне Послания

    var specDate = [];
    // особые даты
    specDate['specDate1'] = { 'date': new Date('2010/08/17').toISOString(), tooltip: '', enabled: true };
    specDate['specDate2'] = { 'date': new Date('2010/07/22').toISOString(), tooltip: '', enabled: true };
    specDate['specDate3'] = { 'date': new Date('2012/11/26').toISOString(), tooltip: '26 НОЯБРЯ – ВСЕЛЕНСКИЙ СОБОР', enabled: false };
    specDate['specDate4'] = { 'date': new Date('2013/07/26').toISOString(), tooltip: '26 ИЮЛЯ – ВЕЛИКОЕ ВЕЧЕ НАЧАЛА НАЧАЛ', enabled: false };
    specDate['specDate5'] = { 'date': new Date('2014/07/26').toISOString(), tooltip: '26 ИЮЛЯ – ВЕЛИКОЕ ВЕЧЕ «МЫ ГОТОВЫ»', enabled: false };
    specDate['specDate6'] = { 'date': new Date('2014/11/17').toISOString(), tooltip: '17 НОЯБРЯ – ВЕЧЕ «МЫ В ВЕЧНОСТИ»', enabled: false };
    specDate['specDate7'] = { 'date': new Date('2015/08/26').toISOString(), tooltip: '26 АВГУСТА – ВЕЧЕ “НАДЕЖДА”', enabled: true };
    specDate['specDate8'] = { 'date': new Date('2016/05/20').toISOString(), tooltip: '20 МАЯ – НАУЧНЫЙ ФОРУМ', enabled: false };

    var params = getUrlVars();
    if ('date' in params) {
        var arrDate = params['date'].split('.');
        if (arrDate.length < 3) {
            if (!isNaN(month) && !isNaN(year)) selDate = { year: year, month: (month - 1), day: 1 };
            else selDate = null;
        }
        else {
            day = parseInt(arrDate[0]);
            month = parseInt(arrDate[1]);
            year = parseInt("20" + arrDate[2]);
            if (isNaN(day) || isNaN(month) || isNaN(year)) {
                var month = lastdaydict[0]; //  null
                var year = lastdaydict[1]; // null
                var selDate = null;
            }
            else selDate = { year: year, month: (month - 1), day: day };
            
        }
    }
    else var selDate = { year: year, month: (month - 1), day: 1 };

    $(function () {
        $("#datepicker").datepicker({
            startDate: "08/26/2004",
            language: "ru",
            todayHighlight: false,
            //defaultViewDate: selDate,
            maxViewMode: 0,
            beforeShowDay: function eventsDates(date) {
                var monthName = 'ЯНВАРЯ,ФЕВРАЛЯ,МАРТА,АПРЕЛЯ,МАЯ,ИЮНЯ,ИЮЛЯ,АВГУСТА,СЕНТЯБРЯ,ОКТЯБРЯ,НОЯБРЯ,ДЕКАБРЯ'.split(',');
                if (selMonth > (date.getMonth() + 1) || selYear > date.getFullYear()) {
                    return { url: " ", enabled: false, classes: 'hideday' };
                }
                var mdy = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() > 9 ? date.getDate() : '0' + date.getDate());
                if (dataload != undefined) {
                    var events_tmp = (mdy in dataload) ? dataload[mdy] : false;
                    if (Array.isArray(events_tmp)) {
                        for (var i = events_tmp.length - 1; i >= 0; i--) {
                            events = events_tmp[i];
                            if (events.link.indexOf('poems') === -1) break;
                        }
                        //events = events_tmp[0];
                    }
                    else events = events_tmp;

                    year = date.getFullYear();

                    // формируем ссылку для дня в календаре
                    if (Array.isArray(dataload[mdy])) {
                        /*for (var i = dataload[mdy].length-1; i >= 0; i--) {
                            link = dataload[mdy][i].link;
                            if (link.indexOf('poems') === -1) break;
                        }*/
                        link = events.link;
                    }
                    else {
                        if (dataload[mdy] != undefined) link = dataload[mdy].link;
                        else link = ' ';
                    }
                    var myRe = /^poems\/\S+/i; // для Катренов по ссылке будем переходить на страницу с несколькими Катренами
                    var myArray = myRe.exec(link);
                    var newsdate = (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
                    if (myArray != null) var newlink = "/poems/?date=" + newsdate;
                    else var newlink = "/" + link + ".html";
                    urlmy = link != ' ' ? newlink : ' '; // ссылка данного дня в календаре

                    styleday = {
                        url: urlmy,
                        enabled: true,
                        tooltip: events ? events.title : ' ',
                        classes: ''
                    };
                    /*active = {
                        enabled: true,
                        tooltip: events ? events.title : ' ',
                        classes: 'activeday'
                    };
                    katren = {
                        enabled: true,
                        tooltip: events ? events.title : ' ',
                        classes: 'katren'
                    };*/
                    for (var i = 1; i < 9; i++) {
                        if (date.toISOString() == specDate['specDate' + i].date) return { classes: 'specdate', tooltip: specDate['specDate' + i].tooltip, enabled: specDate['specDate' + i].enabled }
                    }
                    /*if (date.getDate() == 4 || date.getDate() == 17 || date.getDate() == 26 || date.getDate() == 30) {
                        daymsg.classes = date >= curDay ? 'daymsgblink' : 'daymsg';
                        daymsgactive.classes = date >= curDay ? 'myactive daymsgblink' : 'myactive daymsg';
                        return events ? daymsgactive : daymsg;
                    }
                    else*/ {
                        if (events) {
                            styleday.classes = 'activeday';
                            if (Array.isArray(events_tmp)) { // в одном дне есть несколько ссылок (напр. Послание и Катрен)
                                for (var i = 0; i < events_tmp.length; i++) {
                                    var curevents = events_tmp[i];
                                    if (Array.isArray(curevents)) { // напр. есть несколько Катренов в один день
                                        for (var j = 0; j < events_tmp.length; j++) {
                                            var cursubevents = curevents[j];
                                            //if (cursubevents.link in dictout) { styleday.classes = 'dict-poem'; styleday.tooltip = dictout[cursubevents.link]; }
                                            if (cursubevents.data.poemOutDict != undefined && cursubevents.data.poemOutDict) { styleday.classes = 'dict-poem'; styleday.tooltip = 'Катрен и Послание'/*dictout[cursubevents.link]*/; }
                                        }
                                    }
                                    //if (curevents.link in dictout) { styleday.classes = 'dict-poem'; styleday.tooltip = dictout[curevents.link]; }
                                    else if (curevents.data.poemOutDict != undefined && curevents.data.poemOutDict) { styleday.classes = 'dict-poem'; styleday.tooltip = 'Катрен и Послание'/*dictout[curevents.link]*/; }
                                }
                                //return active;
                            }
                            if (events.link && (events.link).indexOf('poems') + 1) {
                                styleday.classes = 'katren';
                                //return katren;
                            }
                        }
                        else styleday.enabled = false;
                        //return events ? active : disabled;

                        // мигание дат Посыла
                        if (date.getTime() >= 1485896400000 && date.getDay() == 3 /*date.getDate() == 4 || date.getDate() == 17 || date.getDate() == 26 || date.getDate() == 30 ||*/) {
                            styleday.classes = date >= curDay ? styleday.classes + ' d' + counter : styleday.classes + ' daymsg'; // daymsgblink
                            styleday.tooltip = date.getDate() + ' ' + monthName[date.getMonth()] + ' – КОЛЛЕКТИВНЫЙ ПОСЫЛ \nНА ЛЮБОВЬ И ДУХОВНОЕ ЕДИНЕНИЕ';
                            if (date >= curDay) {
                                counter++;
                            }
                        }
                        if (date.getTime() > (new Date(2017, 9, 26)).getTime()) {
                            styleday.tooltip = date.getDate() + ' ' + monthName[date.getMonth()] + ' – КОЛЛЕКТИВНЫЙ ПОСЫЛ \nНА ЛЮБОВЬ И ДУХОВНОЕ ЕДИНЕНИЕ';
                        }

                        return styleday;
                    }
                }
            },
            beforeShow: loadData(month, year)
        }).on('changeMonth', function (ev) {
            month = ev.date.getMonth() + 1; selMonth = month;
            year = ev.date.getFullYear(); selYear = year;
            requestData(month, year);
        }).data('datepicker')
    }).on('changeDate', function (ev) { // сейчас не используется
        year = ev.date.getFullYear();
        mdy = ev.format('yyyy-m-dd');
        if (Array.isArray(dataload[mdy])) link = dataload[mdy][0].link;
        else link = dataload[mdy].link;
        window.location.href = "/" + link + ".html"; //"/"+year+"/" + ev.format('dd.mm.yy') + ".html";
    })

    //$("#datepicker").datepicker().on('show', function (ev) { alert(); });
})


function changeMonth() {
    month = $('#month').val();
    year = $('#year').val();
    if (month != "-1" && year != "-1") {
        month = parseInt(month); selMonth = month;
        year = parseInt(year) + 2004; selYear = year;
        //$('#datepicker').datepicker('update', new Date(year, month - 1, 1));
        requestData(month, year);
    }


}

function changeYear() {
    month = $('#month').val();
    year = $('#year').val();
    if (month != "-1" && year != "-1") {
        month = parseInt(month); selMonth = month;
        year = parseInt(year) + 2004; selYear = year;
        //$('#datepicker').datepicker('update', new Date(year, month - 1, 1));
        requestData(month, year);
    }
}

// получаем дату из ссылки
function getUrlVars() {

    var vars = [], hash;

    //var vars = {};
    var parts = window.location.href.replace(/([\.a-z0-9_-]+)\.html/gi, function (m, key, value) {
        vars['date'] = key;
    });

    if (vars['date']==undefined) {

        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

        for (var i = 0; i < hashes.length; i++) {

            var myRe = /^date=(\d+)-(\d+)-(\d+)/i; // для Катренов по ссылке будем переходить на страницу с несколькими Катренами
            var myArray = myRe.exec(hashes[i]);
            if(myArray != null) vars['date'] = myArray[1] + "." + myArray[2] + "."+myArray[3].substr(2,2);
            /*hash = hashes[i].split('/');

            vars.push(hash[0]);

            vars[hash[0]] = hash[1];*/

        }
    }

    return vars;
}
