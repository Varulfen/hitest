
class ControlArea extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <!-- Control Buttons -->
        <div class="card m-3 border-0">
            <div id="control-button-grp" class="btn-group gap-3" role="group">
                <button type="button" class="btn btn-outline-secondary" id="seek-backward-button" onclick="seekBackward()"><i class="fas fa-backward"></i></button>
                <button type="button" class="btn btn-outline-primary" id="play-pause-button" onclick="playOrPauseVideo()"><i id="play-pause-button-icon" class="fas fa-play"></i></button>
                <button type="button" class="btn btn-outline-secondary" id="seek-forward-button" onclick="seekForward()"><i class="fas fa-forward"></i></button>
                <button type="button" class="btn btn-outline-danger" id="stop-player-button" onclick="stopPlayer()"><i class="fas fa-stop"></i></button>
            </div>
        
            <!-- Fortschrittsanzeige -->
            <div class="progress mb-2 mt-2" id="progressContainer">
                <div id="progressBar" class="progress-bar bg-warning" style="width: 0%"></div>
            </div>
    
            <div class="row">
                <!-- Zeit -->
                <div class="col time-text">
                    <span id="currentTime">00:00</span>
                    <span>/</span>
                    <span id="duration">00:00</span>
                </div>
        
                <!-- Name -->
                <div class="col">
                    <span>Ente(n): <span id="duck">XXX</span></span>
                </div>
            </div>
        </div>  
    `;
    }
}

customElements.define("my-controls", ControlArea);
