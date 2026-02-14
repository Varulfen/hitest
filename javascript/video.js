

const videoContainer = document.getElementById("video-container");
const controlDiv = document.getElementById('control-div');
const playPauseButtonIcon = document.getElementById('play-pause-button-icon');
const playPauseButton = document.getElementById('play-pause-button');
const seekBackwardsButton = document.getElementById('seek-backward-button');
const seekForwardsButton = document.getElementById('seek-forward-button');
let player;  // YouTube Player-Objekt
let playing = false;


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
                'onError': onPlayerError
            }
        });

        // show controls
        controlDiv.hidden = false;

        // disable buttons while player loads
        playPauseButton.disabled = true;
        seekForwardsButton.disabled = true;
        seekBackwardsButton.disabled = true;
    } else {
        showMessage("Ungültige URL: " + url);
    }
}

// if player loaded
function onPlayerReady() { // event
    playVideo();
    playPauseButton.disabled = false;
    seekForwardsButton.disabled = false;
    seekBackwardsButton.disabled = false;
}

function onPlayerError() {
    showMessage("Error");
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
    }
}
function pauseVideo() {
    if (player) {
        player.pauseVideo();
        playing = false;
        setIcon(playPauseButtonIcon, "fa-play");
    }
}
// 10 sec forwards
function seekForward() {
    if (player) {
        let currentTime = player.getCurrentTime();
        player.seekTo(currentTime + 10, true);
    }
}
// 10 sec backwards
function seekBackward() {
    if (player) {
        let currentTime = player.getCurrentTime();
        player.seekTo(currentTime - 10, true);
    }
}
function stopPlayer() {
    if (player) {
        player.destroy();  // stop video
        videoContainer.innerHTML = ''; // remove embedded video
        player = null;
    }
    playing = false;
    controlDiv.hidden = true; // hide controls
    hideConclusion(); // hide solution
}