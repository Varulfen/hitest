

const videoContainer = document.getElementById("video-container");
const controlDiv = document.getElementById('control-div');
const playPauseButton = document.getElementById('play-pause-button');
let player;  // YouTube Player-Objekt
let playing = false;


//todo
/*
// API-Skript laden
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


 */

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
                'onReady': onPlayerReady
            }
        });

        // Steuerelemente anzeigen
        controlDiv.hidden = false;
    } else {
        showMessage("Ungültige URL: " + url);
    }
}

// player loaded
function onPlayerReady() { // event
    playVideo();
}
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
        //playPauseButton.textContent = pauseIcon;
        playing = true;
    }
}
function pauseVideo() {
    if (player) {
        player.pauseVideo();
        playing = false;
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
        player.stopVideo();  // stop video
        videoContainer.innerHTML = ''; // remove embedded video
        playing = false;
        controlDiv.hidden = true; // hide controls
        hideConclusion();
        player = null;
    }
}