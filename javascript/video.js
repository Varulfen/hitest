

const videoContainer = document.getElementById("video-container");
const playPauseButtonIcon = document.getElementById('play-pause-button-icon');
const controlBtnGrp = document.querySelectorAll("#control-button-grp button");
const loadingSpinner = document.getElementById("loading-spinner");

let player;  // YouTube Player-Objekt
let playing = false;

let startTime = Date.now();
let totalDurationSeconds = 0;
let songCounter = 0;


// Funktion zum Einbetten des Videos
function embedVideo(url) {
    // RegEx, um die Video-ID aus der URL zu extrahieren
    const regex = /(?:https?:\/\/(?:www\.|music\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);

    if (match) {
        const videoId = match[1];  // Video-ID extrahieren

        // Video in den Container einfügen
        videoContainer.innerHTML = `<div id="player"></div>`;

        // Den YouTube-Player erstellen
        player = new YT.Player('player', {
            height: '315',
            width: '560',
            videoId: videoId,
            host: 'https://www.youtube-nocookie.com',
            events: {
                'onReady': onPlayerReady,
                'onError': onPlayerError,
                'onStateChange': onPlayerStateChange
            }
        });

        // disable buttons while player loads
        disableControlButtons();

    } else {
        showMessage("Ungültige URL: " + url);
        hideDiv(loadingSpinner);
    }
}

const progressBar = document.getElementById("progressBar");
const currentTime = document.getElementById("currentTime");
const durationText = document.getElementById("duration");

setInterval(() => {
    if (player && player.getDuration && playing) {
        const current = player.getCurrentTime();
        const duration = player.getDuration();

        const percent = (current / duration) * 100;
        progressBar.style.width = percent + "%";

        currentTime.textContent = formatTime(current);
        durationText.textContent = formatTime(duration);
    }
}, 1000);

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);

    const paddedMin = min < 10 ? '0' + min : min;
    const paddedSec = sec < 10 ? '0' + sec : sec;

    return `${paddedMin}:${paddedSec}`;
}

function playLastSong() {
    embedVideo(lastUrl);
}

function disableControlButtons() {
    controlBtnGrp.forEach(btn => {
        if (!btn.disabled) {
            btn.disabled = true;
        }
        if (!btn.classList.contains("disabled")) {
            btn.classList.add("disabled");
        }
    });
}
function enableControlButtons() {
    controlBtnGrp.forEach(btn => {
        if (btn.disabled) {
            btn.disabled = false;
        }
        if (btn.classList.contains("disabled")) {
            btn.classList.remove("disabled");
        }
    });
}

function onPlayerReady() { // event
    playVideo();
    enableControlButtons();
    hideDiv(loadingSpinner);
}
function onPlayerError() {
    showMessage("Player Error");
}
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        stopPlayer();
    }
}


// control functions
function playOrPauseVideo() {
    if(playing) {
        pauseVideo();
    }
    else {
        playVideo();
    }
}
function playVideo() {
    if (player) {
        player.playVideo();
        playing = true;
        setIcon(playPauseButtonIcon, "fa-pause");

        // Time Tracking
        startTime = Date.now();
        console.log(totalDurationSeconds);
    }
}
function pauseVideo() {
    if (player) {
        player.pauseVideo();
        playing = false;
        setIcon(playPauseButtonIcon, "fa-play");

        // Time Tracking
        const duration = Math.floor((Date.now() - startTime) / 1000);
        startTime = null;
        totalDurationSeconds = totalDurationSeconds + duration;
    }
}
// 10 sec forwards
function seekForward() {
    if (player) {
        const currentTime = player.getCurrentTime();
        player.seekTo(currentTime + 10, true);
    }
}
// 10 sec backwards
function seekBackward() {
    if (player) {
        const currentTime = player.getCurrentTime();
        player.seekTo(currentTime - 10, true);
    }
}
function stopPlayer() {
    pauseVideo();
    if (player) {
        player.destroy();               // stop video
        videoContainer.innerHTML = '';  // remove embedded video
        player = null;
    }
    playing = false;
    disableControlButtons();
    songCounter++;
}