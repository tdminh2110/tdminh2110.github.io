const socket = io('https://testleonid.herokuapp.com/');
//const socket = io('http://localhost:3000');

const peer = new Peer({
    config: {'iceServers': [{   url: 'stun:eu-turn1.xirsys.com', 
        username : '3be6db1a-495e-11e9-8859-8741069e5961',
        credential: '3be6db88-495e-11e9-aef3-1b4a17b9ce1b'
    },
    {   url: 'turn:eu-turn1.xirsys.com:3478?transport=udp', 
        username : '3be6db1a-495e-11e9-8859-8741069e5961',
        credential: '3be6db88-495e-11e9-aef3-1b4a17b9ce1b' }
    ]} 
  });

//const peer = new Peer();

/////////////////////////////////////////////////////////////////////////

openStream_local()
.then(stream => {
    playStream('localStream', stream);
});

//////////////////////////////////////////////////////////////////////////////

socket.on("Chao", function(data) {
    //alert(data.language);
});

socket.on("IDVideo_Of_Friend", function(data) {
    openStream_remote()
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
    openStream_remote()
    .then(stream => {
        call.answer(stream);
        call.on('stream', remoteStream => {
            playStream('remoteStream', remoteStream);
        });        
    })
    .catch(err => alert(err));
})

/////////////////////////////////////////////////////////////////////////////////

function openStream_local() {
    const config = {
        audio : false,
        video : {
            width : { exact : 320 },
            height : { exact : 240 }
        }
    };

    return navigator.mediaDevices.getUserMedia(config);
}

function openStream_remote() {
    const config = {
        audio : true,
        video : {
            width : { exact : 320 },
            height : { exact : 240 }
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