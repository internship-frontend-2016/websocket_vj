var socket =io();
//サーバーからデータを受け取る
socket.on("vjActionFromServer",function(msg){
	$('#messages').append($('<li>').text(msg));
});