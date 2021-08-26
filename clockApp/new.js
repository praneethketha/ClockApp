
// home section
(() => {
    const mainSection = document.querySelector('.main-section'),
        tabsContainer = document.querySelector('.clock-tabs');

    tabsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("tab-item") &&
            !event.target.classList.contains("active")) {
            const target1 = event.target.getAttribute("data-target");

            // deactivate existing active 'tab-item'
            tabsContainer.querySelector(".active").classList.remove("active");
            //active new tab-item
            event.target.classList.add("active");

            // deactivate existing active 'tab-content'
            mainSection.querySelector(".tab-content.active").classList.remove("active");
            // activate new tab-content

            mainSection.querySelector(target1).classList.add("active");
        }
    });
})();


//clocksection
const deg = 6;
const hr = document.querySelector('#hr');
const mn = document.querySelector('#mn');
const sc = document.querySelector('#sc');
setInterval(() => {

    let day = new Date();
    let hh = day.getHours() * 30;
    let mm = day.getMinutes() * deg;
    let ss = day.getSeconds() * deg;

    hr.style.transform = `rotateZ(${(hh + (mm/12)) + 180}deg)`;
    mn.style.transform = `rotateZ(${(mm) + 180}deg)`;
    sc.style.transform = `rotateZ(${ss + 180}deg)`;
},1000);


//alarm section
var alarmSound = new Audio();
var alarmTimer;
alarmSound.src = 'alarm_sound.mp3';
function setAlarm(button) {
    var ms = document.getElementById("alarmTime").valueAsNumber;
    if (isNaN(ms)) {
        alert("Inavlid Date");
        return;
    }
    var alarm = new Date(ms);
    var alarmTime = new Date(alarm.getUTCFullYear(), alarm.getUTCMonth(), alarm.getUTCDate(), alarm.getUTCHours(), alarm.getUTCMinutes(), alarm.getUTCSeconds());
    var differences = alarmTime.getTime() - (new Date()).getTime();
    if (differences < 0) {
        alert("Specifed time is already passed.");
        return;
    }

    alarmTimer = setTimeout(initAlarm, differences);
    button.innerText = 'Cancel Alarm';
    button.setAttribute('onclick', 'cancelAlarm(this);');
};

function cancelAlarm(button) {
    button.innerText = "set Alarm";
    button.setAttribute('onclick', 'setAlarm(this);');
    clearTimeout(alarmTimer);
}
function initAlarm() {
    alarmSound.play();
    document.getElementById('alarmOptions').style.display = "";
    if (typeof alarmSound.loop == 'boolean') {
        alarmSound.loop = true;
    }
};

function stopAlarm() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
    document.getElementById('alarmOptions').style.display = 'none';
};

function snooze() {
    stopAlarm();
    setTimeout(initAlarm, 36000);
}

// stopwatch section
let [millisec, sec, min, hour] = [0, 0, 0, 0];
let timerRef = document.querySelector('.displayTimer');
let int;

document.getElementById('start').addEventListener('click', () => {
    int = setInterval(displaytimer, 10);
});

document.getElementById('pause').addEventListener('click', () => {
    clearInterval(int);
});


document.getElementById('reset').addEventListener('click', () => {
    clearInterval(int);
    [millisec, sec, min, hour] = [0, 0, 0, 0];
    timerRef.innerHTML = '00 : 00 : 00 : 000';
});


function displaytimer() {
    millisec += 10;
    if (millisec == 1000) {
        millisec = 0;
        sec++;
        if (sec == 60) {
            sec = 0;
            min++;
            if (min == 60) {
                min = 0;
                hour++;
            }
        }
    }
    let h = hour < 10 ? "0" + hour : hour;
    let m = min < 10 ? "0" + min : min;
    let s = sec < 10 ? "0" + sec : sec;
    let ms = millisec < 10 ? "00" + millisec : millisec < 100 ? "0" + millisec : millisec;


    timerRef.innerHTML = ` ${h} : ${m} : ${s} : ${ms}`;

}

//app section
const navigation = document.querySelector('.navigation');
document.querySelector('.toggle').onclick = function () {
    this.classList.toggle('active2');
    navigation.classList.toggle('active2');
}