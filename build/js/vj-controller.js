(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var socket = io();
/*
$("form").submit(function(){
	socket.emit("onVjAction",true);
//			$("#m").val("");
	return false;
});*/
$("#hello").on("click", function () {
	socket.emit("onVjAction", "hello");
	return false;
});
$("#bye").on("click", function () {
	socket.emit("onVjAction", "bye");
	return false;
});
socket.on("onVjAction", function (msg) {
	//			$('#messages').append($('<li>').text(msg));
	console.log(msg);
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzXFx2ai1jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFJLFNBQVEsSUFBWjtBQUNBOzs7Ozs7QUFNQSxFQUFFLFFBQUYsRUFBWSxFQUFaLENBQWUsT0FBZixFQUF1QixZQUFVO0FBQ2hDLFFBQU8sSUFBUCxDQUFZLFlBQVosRUFBeUIsT0FBekI7QUFDQSxRQUFPLEtBQVA7QUFDQSxDQUhEO0FBSUEsRUFBRSxNQUFGLEVBQVUsRUFBVixDQUFhLE9BQWIsRUFBcUIsWUFBVTtBQUM5QixRQUFPLElBQVAsQ0FBWSxZQUFaLEVBQXlCLEtBQXpCO0FBQ0EsUUFBTyxLQUFQO0FBQ0EsQ0FIRDtBQUlBLE9BQU8sRUFBUCxDQUFVLFlBQVYsRUFBdUIsVUFBUyxHQUFULEVBQWE7QUFDcEM7QUFDQyxTQUFRLEdBQVIsQ0FBWSxHQUFaO0FBQ0EsQ0FIRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgc29ja2V0ID1pbygpO1xyXG4vKlxyXG4kKFwiZm9ybVwiKS5zdWJtaXQoZnVuY3Rpb24oKXtcclxuXHRzb2NrZXQuZW1pdChcIm9uVmpBY3Rpb25cIix0cnVlKTtcclxuLy9cdFx0XHQkKFwiI21cIikudmFsKFwiXCIpO1xyXG5cdHJldHVybiBmYWxzZTtcclxufSk7Ki9cclxuJChcIiNoZWxsb1wiKS5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXtcclxuXHRzb2NrZXQuZW1pdChcIm9uVmpBY3Rpb25cIixcImhlbGxvXCIpO1xyXG5cdHJldHVybiBmYWxzZVxyXG59KTtcclxuJChcIiNieWVcIikub24oXCJjbGlja1wiLGZ1bmN0aW9uKCl7XHJcblx0c29ja2V0LmVtaXQoXCJvblZqQWN0aW9uXCIsXCJieWVcIik7XHJcblx0cmV0dXJuIGZhbHNlXHJcbn0pO1xyXG5zb2NrZXQub24oXCJvblZqQWN0aW9uXCIsZnVuY3Rpb24obXNnKXtcclxuLy9cdFx0XHQkKCcjbWVzc2FnZXMnKS5hcHBlbmQoJCgnPGxpPicpLnRleHQobXNnKSk7XHJcblx0Y29uc29sZS5sb2cobXNnKTtcclxufSk7Il19
