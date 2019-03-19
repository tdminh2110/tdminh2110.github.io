const socket = io('https://testdeepspa.herokuapp.com/');
//const socket = io('http://localhost:8080');

socket.on("Chao", function(data) {
    alert(data.language);
});

/////////////////////////////////////////////////////////////////////////

const peer = new Peer();

openStream()
.then(stream => {
    playStream('localStream', stream);
});

peer.on('call', call => {
    openStream()
    .then(stream => {
        call.answer(stream);
        call.on('stream', remoteStream => {
            playStream('remoteStream', remoteStream);
        });        
    })
    .catch(err => alert(err));
})

function openStream() {
    const config = {
        audio : true,
        video : {
            width : { exact : 1280 },
            height : { exact : 720 }
        }
    };

    return navigator.mediaDevices.getUserMedia(config);
}

function playStream(idVideoTag, stream) {
    const video = document.getElementById(idVideoTag);
    video.srcObject = stream;
    video.controls = false;
    video.play();
}