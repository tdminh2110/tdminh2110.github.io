const socket = io('https://testleonid.herokuapp.com/');
//const socket = io('http://localhost:3000');
const peer = new Peer();

/////////////////////////////////////////////////////////////////////////

openStream()
.then(stream => {
    playStream('localStream', stream);
});

//////////////////////////////////////////////////////////////////////////////

socket.on("Chao", function(data) {
    //alert(data.language);
});

socket.on("IDVideo_Of_Friend", function(data) {
    openStream()
    .then(stream => {
        let call = peer.call(data.IDVideo, stream);
        call.on('stream', remoteStream => {
            playStream('remoteStream', remoteStream);
        })
    });
});


///////////////////////////////////////////////////////////////////////////////////////
peer.on('open', id => socket.emit('IDVideo', { IDVideo : id }));

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

/////////////////////////////////////////////////////////////////////////////////

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