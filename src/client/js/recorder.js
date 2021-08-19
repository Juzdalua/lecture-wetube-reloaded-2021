const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handleDownload = () =>{
    const a = document.createElement("a");
    a.href = videoFile;
    a.download = "MyRecording.webm";
    document.body.appendChild(a);
    a.click();
};

const handleStop = () =>{
    startBtn.innerText = "Download Recording";
    startBtn.removeEventListener("click", handleStop);
    startBtn.addEventListener("click", handleDownload);

    recorder.stop();
}

const handleStart = () =>{
    startBtn.innerText = "Stop Recording";
    startBtn.removeEventListener("click", handleStart);
    startBtn.addEventListener("click", handleStop);

    recorder = new MediaRecorder(stream);    
    recorder.ondataavailable = (event) => {        
        videoFile = URL.createObjectURL(event.data);
        // 서버에는 존재하지 않는, video file을 가리키는 url. 브라우저의 메모리에 존재.
        video.srcObject = null;
        video.src = videoFile;
        video.loop = true;
        video.play();
    };
    recorder.start();    
};

//preview recording video
const init = async () => {
    stream = await navigator.mediaDevices.getUserMedia({
        audio:true,
        video:true
    });    
    video.srcObject = stream;
    video.play();
};
init();

startBtn.addEventListener("click", handleStart);