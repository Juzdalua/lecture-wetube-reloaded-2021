const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");


let volumeValue = 0.5;
video.volume = volumeValue;

//play button
playBtn.addEventListener("click", (event) => {
    //stoped -> play, playing -> stop
    if(video.paused){        
        video.play();
    } else{        
        video.pause();
    }
    playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
});

//mute button
muteBtn.addEventListener("click", (event) =>{
    if(video.muted){
        video.muted = false;        
    } else{
        video.muted = true;        
    }
    muteBtnIcon.classList = video.muted ? "fas fa-volume-mute" : "fas fa-volume-up";
    volumeRange.value = video.muted ? 0 : volumeValue;
});

//volume range
volumeRange.addEventListener("input", (event) => { 
    const {target: {value}} = event;   
    if(video.muted){
        video.muted = false;
        muteBtn.innerText = "Mute";
    }
    video.volume = value;
    volumeValue = value;
});

//time stamp
const formatTime = (seconds) => {
    return new Date(seconds*1000).toISOString().substr(14,5);
};

video.addEventListener("loadedmetadata", () => { // loadedmetadata : video img를 제외한 모든 값.
    totalTime.innerText = formatTime(Math.floor(video.duration));
    timeline.max = Math.floor(video.duration);
});

video.addEventListener("timeupdate", () =>{    
    currentTime.innerText = formatTime(Math.floor(video.currentTime));
    timeline.value = Math.floor(video.currentTime);
});

timeline.addEventListener("input", (event) => {
    const {target: {value}} = event;
    video.currentTime = value;
});

//full screen
fullScreenIcon.addEventListener("click", () => {
    const fullscreen = document.fullscreenElement;
    if(fullscreen){
        document.exitFullscreen();
        fullScreenIcon.classList = "fas fa-expand";
    } else{
        videoContainer.requestFullscreen();
        fullScreenIcon.classList = "fas fa-compress";
    }
    
});

//hide controllers
let controlsTimout  = null; // in and out
let controlsMovementTimeout = null; // move and stop

const hideControlls = () =>{
    videoControls.classList.remove("showing");
};

videoContainer.addEventListener("mousemove", ()=>{
    if(controlsTimout){
        clearTimeout(controlsTimout); // cancel timeout
        controlsTimout = null;
    }

    //mouse가 계속 움직이면 timeout 없애기. -> mousestop이라는 event는 없음.
    if(controlsMovementTimeout){
        clearTimeout(controlsMovementTimeout);
        controlsMovementTimeout = null;        
    }
    videoControls.classList.add("showing");
    controlsMovementTimeout = setTimeout(hideControlls, 3000); // return id number
});

videoContainer.addEventListener("mouseleave", ()=>{
    //delay function
    controlsTimout = setTimeout(hideControlls(), 3000);        
});

//key down & click video
document.body.addEventListener("keydown", (event)=>{
    if(event.key === " "){
        if(video.paused){
            video.play();
            playBtnIcon.classList = "fas fa-pause";
        } else{
            video.pause();
            playBtnIcon.classList = "fas fa-play";
        }
    }
});

video.addEventListener("click", ()=>{
    if(video.paused){
        video.play();
        playBtnIcon.classList = "fas fa-pause";
    } else{
        video.pause();
        playBtnIcon.classList = "fas fa-play";
    }
});