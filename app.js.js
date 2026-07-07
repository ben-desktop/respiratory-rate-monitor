/* ==========================================================
   Respiratory Rate Monitor
   app.js
   Part 1 of 2
   ========================================================== */

"use strict";

/* ==========================================================
   ELEMENTS
   ========================================================== */

const rateCard = document.getElementById("rateCard");

const rateValue = document.getElementById("rateValue");

const elapsedTime = document.getElementById("elapsedTime");

const completedBreaths = document.getElementById("completedBreaths");

const lastRecorded = document.getElementById("lastRecorded");

const actionButton = document.getElementById("actionButton");

const actionEmoji = document.getElementById("actionEmoji");

const actionPhase = document.getElementById("actionPhase");

const pauseButton = document.getElementById("pauseButton");

const clearButton = document.getElementById("clearButton");

const statusPill = document.getElementById("statusPill");

const statusText = document.getElementById("statusText");

const confidenceFill = document.getElementById("confidenceFill");

const confidenceText = document.getElementById("confidenceText");

const flashOverlay = document.getElementById("flashOverlay");

/* ==========================================================
   APPLICATION STATE
   ========================================================== */

let running = false;

let paused = false;

let expecting = "INHALE";

let completed = 0;

let startTime = 0;

let pauseStarted = 0;

let pausedDuration = 0;

let lastAcceptedTap = 0;

let timer = null;

let wakeLock = null;

/* ==========================================================
   CONSTANTS
   ========================================================== */

const TAP_DELAY = 250;

const FLASH_DURATION = 120;

const TIMER_REFRESH = 100;

/* ==========================================================
   WAKE LOCK
   ========================================================== */

async function requestWakeLock(){

    if(!("wakeLock" in navigator)) return;

    try{

        wakeLock = await navigator.wakeLock.request("screen");

    }

    catch(error){

        console.log(error);

    }

}

async function releaseWakeLock(){

    if(!wakeLock) return;

    try{

        await wakeLock.release();

    }

    catch(error){}

    wakeLock = null;

}

/* ==========================================================
   HAPTICS
   ========================================================== */

function haptic(duration=10){

    if(navigator.vibrate){

        navigator.vibrate(duration);

    }

}

/* ==========================================================
   TIME
   ========================================================== */

function elapsedMilliseconds(){

    if(!running) return 0;

    return performance.now()

        - startTime

        - pausedDuration;

}

function formatTime(milliseconds){

    const totalSeconds = milliseconds/1000;

    const minutes = Math.floor(totalSeconds/60);

    const seconds = (totalSeconds%60)

        .toFixed(1)

        .padStart(4,"0");

    return String(minutes)

        .padStart(2,"0")

        + ":"

        + seconds;

}

function updateElapsed(){

    if(!running || paused) return;

    elapsedTime.textContent =

        formatTime(

            elapsedMilliseconds()

        );

}

/* ==========================================================
   RATE
   ========================================================== */

function respiratoryRate(){

    if(completed===0){

        rateValue.textContent = "—";

        return;

    }

    const seconds =

        elapsedMilliseconds()/1000;

    const bpm =

        (completed*60)/seconds;

    rateValue.textContent =

        bpm.toFixed(1);

    updateRateColour(bpm);

}

/* ==========================================================
   CARD COLOUR
   ========================================================== */

function updateRateColour(rate){

    if(rate<12){

        rateCard.style.borderColor="#0A84FF";

    }

    else if(rate<=20){

        rateCard.style.borderColor="#FFFFFF";

    }

    else if(rate<30){

        rateCard.style.borderColor="#FF9F0A";

    }

    else{

        rateCard.style.borderColor="#FF453A";

    }

}

/* ==========================================================
   CONFIDENCE
   ========================================================== */

function updateConfidence(){

    let percentage =

        Math.min(

            completed/6,

            1

        )*100;

    confidenceFill.style.width=

        percentage+"%";

    if(completed===0){

        confidenceText.textContent=

            "Waiting...";

        confidenceFill.style.background=

            "#666";

        return;

    }

    if(completed<3){

        confidenceText.textContent=

            "Low";

        confidenceFill.style.background=

            "#0A84FF";

        return;

    }

    if(completed<6){

        confidenceText.textContent=

            "Moderate";

        confidenceFill.style.background=

            "#FF9F0A";

        return;

    }

    confidenceText.textContent=

        "High";

    confidenceFill.style.background=

        "#34C759";

}

/* ==========================================================
   STATUS
   ========================================================== */

function setStatus(type,text){

    statusPill.className="status "+type;

    statusText.textContent=text;

}

/* ==========================================================
   FLASH
   ========================================================== */

function flash(type){

    flashOverlay.className="";

    flashOverlay.classList.add(type);

    flashOverlay.classList.add("show");

    setTimeout(()=>{

        flashOverlay.classList.remove("show");

    },FLASH_DURATION);

}

/* ==========================================================
   TIMER
   ========================================================== */

function startTimer(){

    clearInterval(timer);

    timer=

        setInterval(

            updateElapsed,

            TIMER_REFRESH

        );

}
/* ==========================================================
   Respiratory Rate Monitor
   app.js
   Part 1 of 2
   ========================================================== */

"use strict";

/* ==========================================================
   ELEMENTS
   ========================================================== */

const rateCard = document.getElementById("rateCard");

const rateValue = document.getElementById("rateValue");

const elapsedTime = document.getElementById("elapsedTime");

const completedBreaths = document.getElementById("completedBreaths");

const lastRecorded = document.getElementById("lastRecorded");

const actionButton = document.getElementById("actionButton");

const actionEmoji = document.getElementById("actionEmoji");

const actionPhase = document.getElementById("actionPhase");

const pauseButton = document.getElementById("pauseButton");

const clearButton = document.getElementById("clearButton");

const statusPill = document.getElementById("statusPill");

const statusText = document.getElementById("statusText");

const confidenceFill = document.getElementById("confidenceFill");

const confidenceText = document.getElementById("confidenceText");

const flashOverlay = document.getElementById("flashOverlay");

/* ==========================================================
   APPLICATION STATE
   ========================================================== */

let running = false;

let paused = false;

let expecting = "INHALE";

let completed = 0;

let startTime = 0;

let pauseStarted = 0;

let pausedDuration = 0;

let lastAcceptedTap = 0;

let timer = null;

let wakeLock = null;

/* ==========================================================
   CONSTANTS
   ========================================================== */

const TAP_DELAY = 250;

const FLASH_DURATION = 120;

const TIMER_REFRESH = 100;

/* ==========================================================
   WAKE LOCK
   ========================================================== */

async function requestWakeLock(){

    if(!("wakeLock" in navigator)) return;

    try{

        wakeLock = await navigator.wakeLock.request("screen");

    }

    catch(error){

        console.log(error);

    }

}

async function releaseWakeLock(){

    if(!wakeLock) return;

    try{

        await wakeLock.release();

    }

    catch(error){}

    wakeLock = null;

}

/* ==========================================================
   HAPTICS
   ========================================================== */

function haptic(duration=10){

    if(navigator.vibrate){

        navigator.vibrate(duration);

    }

}

/* ==========================================================
   TIME
   ========================================================== */

function elapsedMilliseconds(){

    if(!running) return 0;

    return performance.now()

        - startTime

        - pausedDuration;

}

function formatTime(milliseconds){

    const totalSeconds = milliseconds/1000;

    const minutes = Math.floor(totalSeconds/60);

    const seconds = (totalSeconds%60)

        .toFixed(1)

        .padStart(4,"0");

    return String(minutes)

        .padStart(2,"0")

        + ":"

        + seconds;

}

function updateElapsed(){

    if(!running || paused) return;

    elapsedTime.textContent =

        formatTime(

            elapsedMilliseconds()

        );

}

/* ==========================================================
   RATE
   ========================================================== */

function respiratoryRate(){

    if(completed===0){

        rateValue.textContent = "—";

        return;

    }

    const seconds =

        elapsedMilliseconds()/1000;

    const bpm =

        (completed*60)/seconds;

    rateValue.textContent =

        bpm.toFixed(1);

    updateRateColour(bpm);

}

/* ==========================================================
   CARD COLOUR
   ========================================================== */

function updateRateColour(rate){

    if(rate<12){

        rateCard.style.borderColor="#0A84FF";

    }

    else if(rate<=20){

        rateCard.style.borderColor="#FFFFFF";

    }

    else if(rate<30){

        rateCard.style.borderColor="#FF9F0A";

    }

    else{

        rateCard.style.borderColor="#FF453A";

    }

}

/* ==========================================================
   CONFIDENCE
   ========================================================== */

function updateConfidence(){

    let percentage =

        Math.min(

            completed/6,

            1

        )*100;

    confidenceFill.style.width=

        percentage+"%";

    if(completed===0){

        confidenceText.textContent=

            "Waiting...";

        confidenceFill.style.background=

            "#666";

        return;

    }

    if(completed<3){

        confidenceText.textContent=

            "Low";

        confidenceFill.style.background=

            "#0A84FF";

        return;

    }

    if(completed<6){

        confidenceText.textContent=

            "Moderate";

        confidenceFill.style.background=

            "#FF9F0A";

        return;

    }

    confidenceText.textContent=

        "High";

    confidenceFill.style.background=

        "#34C759";

}

/* ==========================================================
   STATUS
   ========================================================== */

function setStatus(type,text){

    statusPill.className="status "+type;

    statusText.textContent=text;

}

/* ==========================================================
   FLASH
   ========================================================== */

function flash(type){

    flashOverlay.className="";

    flashOverlay.classList.add(type);

    flashOverlay.classList.add("show");

    setTimeout(()=>{

        flashOverlay.classList.remove("show");

    },FLASH_DURATION);

}

/* ==========================================================
   TIMER
   ========================================================== */

function startTimer(){

    clearInterval(timer);

    timer=

        setInterval(

            updateElapsed,

            TIMER_REFRESH

        );

}