const socket = io('https://testdeepspa.herokuapp.com/');
//const socket = io('http://localhost:8080');

socket.on("Chao", function(data) {
    alert(data.language);
});