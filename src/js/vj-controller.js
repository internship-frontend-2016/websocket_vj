var socket =io();
/*
$("form").submit(function(){
	socket.emit("onVjAction",true);
//			$("#m").val("");
	return false;
});*/
$("#hello").on("click",function(){
	socket.emit("vjActionFromClient","hello");
	return false
});
$("#bye").on("click",function(){
	socket.emit("vjActionFromClient","bye");
	return false
});
//サーバーからデータを受け取る
/*
socket.on("vjActionFromClient",function(msg){
//			$('#messages').append($('<li>').text(msg));
	console.log(msg);
});
*/