const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");

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
    playBtn.innerText = video.paused ? "Play" : "Pause";
});

muteBtn.addEventListener("click", (event) =>{
    if(video.muted){
        video.muted = false;        
    } else{
        video.muted = true;        
    }
    muteBtn.innerText = video.muted ? "Unmute" : "Mute";
    volumeRange.value = video.muted ? 0 : volumeValue;
});

volumeRange.addEventListener("input", (event) => { 
    const {target: {value}} = event;   
    if(video.muted){
        video.muted = false;
        muteBtn.innerText = "Mute";
    }
    video.volume = value;
    volumeValue = value;
});