(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//canavsとクォータニオン、ビデオエレメントをグローバルに扱う
var c;
var q = new qtnIV();
var qt = q.identity(q.create());
var video1;
var video2;
/*
var video3;

var video4;
var video5;
var video6;
var video7;
var video8;
var video9;
var video10;
var video11;
var video12;

var video13;
var video14;
*/

//ビデオをロードした数を数える
var load_num = 0;
var select_video = 1;

//audio関連
var Audiocontext;
var source;
var analyser;
var frequency;

var fft_flag = false;
var speed = 0.0;
//マウスムーブイベントに登録する処理
function mouseMove(e) {
	var cw = c.width;
	var ch = c.height;
	var wh = 1 / Math.sqrt(cw * cw + ch * ch);
	var x = e.clientX - c.offsetLeft - cw * 0.5;
	var y = e.clientY - c.offsetTop - ch * 0.5;
	var sq = Math.sqrt(x * x + y * y);
	var r = sq * 2.0 * Math.PI * wh;
	if (sq != 1) {
		sq = 1 / sq;
		x *= sq;
		y *= sq;
	}
	q.rotate(r, [y, x, 0.0], qt);
}

//ボタンをおしたかどうか
function KeyDown(e) {
	//console.log(e.keyCode);
	if (e.keyCode == 49) {
		//1を押したら
		video1.play();
		select_video = 1;
	} else if (e.keyCode == 50) {
		//2を押したら
		video2.play();
		select_video = 2;
	}
	/*
 	else if(e.keyCode==51){
 		video3.play();
 		select_video=3;
 	}else if(e.keyCode==52){
 		video4.play();
 		select_video=4;
 	}else if(e.keyCode==53){
 		video5.play();
 		select_video=5;
 	}else if(e.keyCode==54){
 		video6.play();
 		select_video=6;
 	}else if(e.keyCode==55){
 		video7.play();
 		select_video=7;
 	}else if(e.keyCode==56){
 		video8.play();
 		select_video=8;
 	}else if(e.keyCode==57){
 		video9.play();
 		select_video=9;
 	}else if(e.keyCode==48){
 		video10.play();
 		select_video=10;
 	}else if(e.keyCode==81){
 		//qボタン
 		video11.play();
 		select_video=11;
 	}else if(e.keyCode==87){
 		//wボタン
 		video12.play();
 		select_video=12;
 	}else if(e.keyCode==69){
 		//eボタン
 		video13.play();
 		select_video=13;
 	}else if(e.keyCode==82){
 		//rボタン
 		video14.play();
 		select_video=14;
 	}
 */
	//sボタンは83
	if (e.keyCode == 83 && fft_flag == false) {
		fft_flag = true;
	} else if (e.keyCode == 83 && fft_flag == true) {
		fft_flag = false;
	}
	//スペースは32
	if (e.keyCode == 32) {
		if (speed == 20.0) {
			speed = 0.0;
		}
		speed += 1.0;
		console.log(speed);
	}
}
//再生可能なビデオタイプを調べる
function checkVideoType(_video) {
	if (_video.canPlayType("video/gif") === 'maybe') {
		return 'gif';
	} else if (_video.canPlayType("video/mp4") === 'maybe') {
		return 'mp4';
	} else {
		return null;
	}
}

onload = function onload() {
	navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

	//端末のビデオ、音声ストリームを所得
	navigator.getMedia({ audio: true }, function (stream) {
		var animationId;
		Audiocontext = new webkitAudioContext();
		//マイク音声の所得
		source = Audiocontext.createMediaStreamSource(stream);
		//アナライザー
		analyser = Audiocontext.createAnalyser();

		//高速フーリエ変換のデータサイズ
		analyser.fftSize = 2048;
		//振幅スペクトルが入っている配列
		frequency = new Uint8Array(analyser.frequencyBinCount);
		//おそらく音声データとアナライザーをくっつける
		source.connect(analyser);
		init();
	}, function (err) {
		//エラー処理
	});

	var socket = io();
	//サーバーからデータを受け取る
	socket.on("vjActionFromServer", function (msg) {
		$('#messages').append($('<li>').text(msg));
		if (msg == 1) {
			video1.play();
			select_video = 1;
		} else if (msg == 2) {
			video2.play();
			select_video = 2;
		}
	});
};
function init() {
	//canvasエレメントを所得
	c = document.getElementById("canvas");
	c.width = 720;
	c.height = 480;
	//	c.width=window.innerWidth;
	//	c.height=window.innerHeight;

	video1 = video_create("../img/original.");
	video2 = video_create("../img/hand.");
	/*
 video3=video_create("pokemon.");
 video4=video_create("cardcapter2.");
 video5=video_create("cardcapter3.");
 video6=video_create("cardcapter4.");
 video7=video_create("danshi.");
 video8=video_create("giphy.");
 video9=video_create("magic.");
 video10=video_create("nichijo.");
 video11=video_create("oso.");
 video12=video_create("oso2.");
 video13=video_create("Sailormoon.");
 video14=video_create("Sailormoon2.");
 */

	video_actions(video1);
	video_actions(video2);
	/*
 video_actions(video3);
 video_actions(video4);
 video_actions(video5);
 video_actions(video6);
 video_actions(video7);
 video_actions(video8);
 video_actions(video9);
 video_actions(video10);
 video_actions(video11);
 video_actions(video12);
 video_actions(video13);
 video_actions(video14);
 */
	//ボタンを押したかどうか
	document.addEventListener("keydown", KeyDown);
}
function video_actions(_video) {
	_video.addEventListener("canplaythrough", function () {
		action();
	}, true);
	_video.addEventListener("ended", function () {
		_video.play();
	}, true);
}
function action() {
	load_num++;
	/*
 if(load_num==14){
 	render();
 }*/
	if (load_num == 2) {
		render();
	}
}
function video_create(_src) {
	//ビデオエレメントを生成
	var video = document.createElement("video");
	//ビデオタイプのチェック
	var videoExt = checkVideoType(video);
	if (videoExt === null) {
		alert("not supported");
		return;
	}
	//ソースの読み込み
	video.src = _src + videoExt;
	return video;
}

function render() {
	//ビデオ１を再生
	video1.play();
	c.addEventListener("mousemove", mouseMove, true);
	var gl = c.getContext("webgl") || c.getContext("experimental-webgl");

	var v_shader = create_shader("vs");
	var f_shader = create_shader("fs");

	var prg = create_program(v_shader, f_shader);
	var attLocation = new Array();
	attLocation[0] = gl.getAttribLocation(prg, "position");
	attLocation[1] = gl.getAttribLocation(prg, "color");
	attLocation[2] = gl.getAttribLocation(prg, "textureCoord");
	attLocation[3] = gl.getAttribLocation(prg, "instancePosition");

	var attStride = new Array();
	attStride[0] = 3;
	attStride[1] = 4;
	attStride[2] = 2;
	attStride[3] = 3;

	var uniLocation = new Array();
	uniLocation[0] = gl.getUniformLocation(prg, "mvpMatrix");
	uniLocation[1] = gl.getUniformLocation(prg, "texture");

	//キューブデータ
	var cubeData = cube(1, [1.0, 1.0, 1.0, 1.0]);
	var cPosition = create_vbo(cubeData.p);
	var cColor = create_vbo(cubeData.c);
	var cTextureCoord = create_vbo(cubeData.t);
	var cVBOList = [cPosition, cColor, cTextureCoord];
	var cIndex = create_ibo(cubeData.i);
	/*拡張機能を有効化*/
	var ext;
	ext = gl.getExtension("ANGLE_instanced_arrays");
	if (ext == null) {
		alert("ANGLE_instanced_arrays not supported");
		return;
	}

	//各インスタンスに適用するデータ

	//インスタンスの数
	var instanceCount = 125;

	//インスタンス用配列
	var instancePositions = new Array();

	//配列用のストライド
	var offsetPosition = 3;

	for (var i = 0; i < instanceCount; i++) {
		instancePositions[i * offsetPosition] = -(i % 5.0) * 1.5 + 0.0;
		instancePositions[i * offsetPosition + 1] = Math.floor(i / 5.0) % 5.0 * 1.5 + 0.0;
		instancePositions[i * offsetPosition + 2] = Math.floor(i / 25.0) * 1.5 + 0.0;
	}

	//配列からVBOを生成
	var iPosition = create_vbo(instancePositions);

	//トーラスのattribute関連
	set_attribute(cVBOList, attLocation, attStride);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cIndex);

	//インスタンス用の座標位置VBOを有効にする
	gl.bindBuffer(gl.ARRAY_BUFFER, iPosition);
	gl.enableVertexAttribArray(attLocation[3]);
	gl.vertexAttribPointer(attLocation[3], attStride[3], gl.FLOAT, false, 0, 0);
	//インスタンス用の有効化し除数を指定する
	ext.vertexAttribDivisorANGLE(attLocation[3], 1);
	//各種行列の生成と初期化
	var m = new matIV();
	var mMatrix = m.identity(m.create());
	var vMatrix = m.identity(m.create());
	var pMatrix = m.identity(m.create());
	var tmpMatrix = m.identity(m.create());
	var mvpMatrix = m.identity(m.create());
	var invMatrix = m.identity(m.create());

	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);
	gl.enable(gl.CULL_FACE);

	gl.activeTexture(gl.TEXTURE0);

	var videoTexture1 = null;
	var videoTexture2 = null;
	/*
 var videoTexture3=null;
 var videoTexture4=null;
 var videoTexture5=null;
 var videoTexture6=null;
 var videoTexture7=null;
 var videoTexture8=null;
 var videoTexture9=null;
 var videoTexture10=null;
 var videoTexture11=null;
 var videoTexture12=null;
 var videoTexture13=null;
 var videoTexture14=null;
 */

	create_textureVideo(video1, 1);
	create_textureVideo(video2, 2);
	/*
 	create_textureVideo(video3,3);
 	create_textureVideo(video4,4);
 	create_textureVideo(video5,5);
 	create_textureVideo(video6,6);
 	create_textureVideo(video7,7);
 	create_textureVideo(video8,8);
 	create_textureVideo(video9,9);
 	create_textureVideo(video10,10);
 	create_textureVideo(video11,11);
 	create_textureVideo(video12,12);
 	create_textureVideo(video13,13);
 	create_textureVideo(video14,14);
 */
	//カウンタの宣言
	var count = 0;
	var count2 = 0;

	//恒常ループ
	(function loop() {
		var scaleValue = 1.0;
		if (fft_flag == true) {
			analyser.getByteFrequencyData(frequency);
			//console.log(frequency[60]);
			scaleValue = frequency[50] / 500 + 0.6;
		}
		count++;
		if (count % 10 == 0) {
			count2++;
		}
		if (select_video == 1) {
			//テクスチャを更新する
			gl.bindTexture(gl.TEXTURE_2D, null);
			gl.bindTexture(gl.TEXTURE_2D, videoTexture1);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video1);
		} else if (select_video == 2) {
			//テクスチャを更新する
			gl.bindTexture(gl.TEXTURE_2D, null);
			gl.bindTexture(gl.TEXTURE_2D, videoTexture2);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video2);
		}
		/*
  else if(select_video==3){
  	gl.bindTexture(gl.TEXTURE_2D,null);
  	gl.bindTexture(gl.TEXTURE_2D,videoTexture3);
  	gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,video3);
  }else if(select_video==4){
  	gl.bindTexture(gl.TEXTURE_2D,null);
  	gl.bindTexture(gl.TEXTURE_2D,videoTexture4);
  	gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,video4);
  }else if(select_video==5){
  	gl.bindTexture(gl.TEXTURE_2D,null);
  	gl.bindTexture(gl.TEXTURE_2D,videoTexture5);
  	gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,video5);
  }else if(select_video==6){
  	gl.bindTexture(gl.TEXTURE_2D,null);
  	gl.bindTexture(gl.TEXTURE_2D,videoTexture6);
  	gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,video6);
  }else if(select_video==7){
  	gl.bindTexture(gl.TEXTURE_2D,null);
  	gl.bindTexture(gl.TEXTURE_2D,videoTexture7);
  	gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,video7);
  }else if(select_video==8){
  	gl.bindTexture(gl.TEXTURE_2D,null);
  	gl.bindTexture(gl.TEXTURE_2D,videoTexture8);
  	gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,video8);
  }else if(select_video==9){
  	gl.bindTexture(gl.TEXTURE_2D,null);
  	gl.bindTexture(gl.TEXTURE_2D,videoTexture9);
  	gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,video9);
  }else if(select_video==10){
  	gl.bindTexture(gl.TEXTURE_2D,null);
  	gl.bindTexture(gl.TEXTURE_2D,videoTexture10);
  	gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,video10);
  }else if(select_video==11){
  	gl.bindTexture(gl.TEXTURE_2D,null);
  	gl.bindTexture(gl.TEXTURE_2D,videoTexture11);
  	gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,video11);
  }else if(select_video==12){
  	gl.bindTexture(gl.TEXTURE_2D,null);
  	gl.bindTexture(gl.TEXTURE_2D,videoTexture12);
  	gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,video12);
  }else if(select_video==13){
  	gl.bindTexture(gl.TEXTURE_2D,null);
  	gl.bindTexture(gl.TEXTURE_2D,videoTexture13);
  	gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,video13);
  }else if(select_video==14){
  	gl.bindTexture(gl.TEXTURE_2D,null);
  	gl.bindTexture(gl.TEXTURE_2D,videoTexture14);
  	gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,video14);
  }*/

		//ビュー×プロジェクション座標変換行列
		var eyePosition = new Array();
		var camUpDirection = new Array();
		q.toVecIII([0.0, 0.0, 15.0], qt, eyePosition);
		q.toVecIII([0.0, 1.0, 0.0], qt, camUpDirection);
		m.lookAt(eyePosition, [0.0, 0.0, 0.0], camUpDirection, vMatrix);
		m.perspective(45, c.width / c.height, 0.1, 50.0, pMatrix);
		m.multiply(pMatrix, vMatrix, tmpMatrix);

		//canvasを初期化
		var hsv = hsva(count2 % 360, 1, 1, 1);
		gl.clearColor(hsv[0], hsv[1], hsv[2], hsv[3]);
		gl.clearDepth(1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		//キューブのレンタリング
		m.identity(mMatrix);
		//m.rotate(mMatrix,(count%360)*Math.PI/180,[0.0,1.0,0.0],mMatrix);
		m.translate(mMatrix, [0.0, 0.0, speed], mMatrix);
		m.scale(mMatrix, [scaleValue, scaleValue, scaleValue], mMatrix);
		m.rotate(mMatrix, Math.PI, [0.0, 0.0, 1.0], mMatrix);
		m.multiply(tmpMatrix, mMatrix, mvpMatrix);
		m.inverse(mMatrix, invMatrix);
		gl.uniformMatrix4fv(uniLocation[0], false, mvpMatrix);
		gl.uniform1i(uniLocation[1], 0);

		ext.drawElementsInstancedANGLE(gl.TRIANGLES, cubeData.i.length, gl.UNSIGNED_SHORT, 0, instanceCount);

		gl.flush();
		//requestAnimationFrame(a);
		//requestAnimationFrame(arguments.callee);
		requestAnimationFrame(loop);
		//setTimeout(a,1000/30);
	})();

	//シェーダを生成する関数
	function create_shader(id) {
		var shader;

		var scriptElement = document.getElementById(id);

		if (!scriptElement) {
			return;
		}

		switch (scriptElement.type) {
			case 'x-shader/x-vertex':
				shader = gl.createShader(gl.VERTEX_SHADER);
				break;

			case 'x-shader/x-fragment':
				shader = gl.createShader(gl.FRAGMENT_SHADER);
				break;

			default:
				return;
		}

		gl.shaderSource(shader, scriptElement.text);

		gl.compileShader(shader);
		//シェーダーが正しくコンパイルされたかチェック
		if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			return shader;
		} else {
			alert(gl.getShaderInfoLog(shader));
		}
	}

	function create_program(vs, fs) {
		//プログラムオブジェクトの生成
		var program = gl.createProgram();

		gl.attachShader(program, vs);
		gl.attachShader(program, fs);

		gl.linkProgram(program);

		if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
			//成功していたらプログラムオブジェクトを有効にする
			gl.useProgram(program);

			//プログラムオブジェクトを返して終了
			return program;
		} else {
			alert(gl.getProgramInfoLog(program));
		}
	}

	//VBOを生成する関数
	function create_vbo(data) {
		var vbo = gl.createBuffer();
		//バッファをバインド
		gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
		//バッファにデータをセット
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
		//バッファのバインドを無効化
		gl.bindBuffer(gl.ARRAY_BUFFER, null);

		return vbo;
	}

	function set_attribute(vbo, attL, attS) {
		//引数として受け取った配列を処理する
		for (var i in vbo) {
			gl.bindBuffer(gl.ARRAY_BUFFER, vbo[i]);
			//attributeLocationを有効にする
			gl.enableVertexAttribArray(attL[i]);
			//attributeLocationを通知し登録
			gl.vertexAttribPointer(attL[i], attS[i], gl.FLOAT, false, 0, 0);
		}
	}
	function create_ibo(data) {
		var ibo = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
		return ibo;
	}
	//videoのテクスチャを作成
	function create_textureVideo(_source, _number) {
		var videoTexture = gl.createTexture(gl.TEXTURE_2D);
		gl.bindTexture(gl.TEXTURE_2D, videoTexture);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, _source);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

		gl.bindTexture(gl.TEXTURE_2D, null);
		switch (_number) {
			case 1:
				videoTexture1 = videoTexture;
				break;
			case 2:
				videoTexture2 = videoTexture;
				break;
			/*
   case 3:
   videoTexture3 = videoTexture;
   break;
   case 4:
   videoTexture4 = videoTexture;
   break;
   case 5:
   videoTexture5 = videoTexture;
   break;
   case 6:
   videoTexture6 = videoTexture;
   break;
   case 7:
   videoTexture7 = videoTexture;
   break;
   case 8:
   videoTexture8 = videoTexture;
   break;
   case 9:
   videoTexture9 = videoTexture;
   break;
   case 10:
   videoTexture10 = videoTexture;
   break;
   case 11:
   videoTexture11 = videoTexture;
   break;
   case 12:
   videoTexture12 = videoTexture;
   break;
   case 13:
   videoTexture13 = videoTexture;
   break;
   case 14:
   videoTexture14 = videoTexture;
   break;*/
			default:
				break;
		}
	}
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzXFx2ai1zY3JlZW4tdGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7QUFDQSxJQUFJLENBQUo7QUFDQSxJQUFJLElBQUUsSUFBSSxLQUFKLEVBQU47QUFDQSxJQUFJLEtBQUcsRUFBRSxRQUFGLENBQVcsRUFBRSxNQUFGLEVBQVgsQ0FBUDtBQUNBLElBQUksTUFBSjtBQUNBLElBQUksTUFBSjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQTtBQUNBLElBQUksV0FBUyxDQUFiO0FBQ0EsSUFBSSxlQUFhLENBQWpCOztBQUVBO0FBQ0EsSUFBSSxZQUFKO0FBQ0EsSUFBSSxNQUFKO0FBQ0EsSUFBSSxRQUFKO0FBQ0EsSUFBSSxTQUFKOztBQUVBLElBQUksV0FBUyxLQUFiO0FBQ0EsSUFBSSxRQUFNLEdBQVY7QUFDQTtBQUNBLFNBQVMsU0FBVCxDQUFtQixDQUFuQixFQUFxQjtBQUNwQixLQUFJLEtBQUcsRUFBRSxLQUFUO0FBQ0EsS0FBSSxLQUFHLEVBQUUsTUFBVDtBQUNBLEtBQUksS0FBRyxJQUFFLEtBQUssSUFBTCxDQUFVLEtBQUcsRUFBSCxHQUFNLEtBQUcsRUFBbkIsQ0FBVDtBQUNBLEtBQUksSUFBRSxFQUFFLE9BQUYsR0FBVSxFQUFFLFVBQVosR0FBdUIsS0FBRyxHQUFoQztBQUNBLEtBQUksSUFBRSxFQUFFLE9BQUYsR0FBVSxFQUFFLFNBQVosR0FBc0IsS0FBRyxHQUEvQjtBQUNBLEtBQUksS0FBRyxLQUFLLElBQUwsQ0FBVSxJQUFFLENBQUYsR0FBSSxJQUFFLENBQWhCLENBQVA7QUFDQSxLQUFJLElBQUUsS0FBRyxHQUFILEdBQU8sS0FBSyxFQUFaLEdBQWUsRUFBckI7QUFDQSxLQUFHLE1BQUksQ0FBUCxFQUFTO0FBQ1IsT0FBRyxJQUFFLEVBQUw7QUFDQSxPQUFHLEVBQUg7QUFDQSxP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NkIsWUFBN0I7QUFDQSxLQUFHLFVBQUgsQ0FBYyxHQUFHLFVBQWpCLEVBQTRCLENBQTVCLEVBQThCLEdBQUcsSUFBakMsRUFBc0MsR0FBRyxJQUF6QyxFQUE4QyxHQUFHLGFBQWpELEVBQStELE9BQS9EO0FBQ0EsS0FBRyxhQUFILENBQWlCLEdBQUcsVUFBcEIsRUFBK0IsR0FBRyxrQkFBbEMsRUFBcUQsR0FBRyxNQUF4RDtBQUNBLEtBQUcsYUFBSCxDQUFpQixHQUFHLFVBQXBCLEVBQStCLEdBQUcsa0JBQWxDLEVBQXFELEdBQUcsTUFBeEQ7QUFDQSxLQUFHLGFBQUgsQ0FBaUIsR0FBRyxVQUFwQixFQUErQixHQUFHLGNBQWxDLEVBQWlELEdBQUcsYUFBcEQ7QUFDQSxLQUFHLGFBQUgsQ0FBaUIsR0FBRyxVQUFwQixFQUErQixHQUFHLGNBQWxDLEVBQWlELEdBQUcsYUFBcEQ7O0FBRUEsS0FBRyxXQUFILENBQWUsR0FBRyxVQUFsQixFQUE2QixJQUE3QjtBQUNNLFVBQU8sT0FBUDtBQUNJLFFBQUssQ0FBTDtBQUNJLG9CQUFnQixZQUFoQjtBQUNBO0FBQ0osUUFBSyxDQUFMO0FBQ0ksb0JBQWdCLFlBQWhCO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFDSjtBQUNJO0FBN0NSO0FBK0NOO0FBQ0QiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy9jYW5hdnPjgajjgq/jgqnjg7zjgr/jg4vjgqrjg7PjgIHjg5Pjg4fjgqrjgqjjg6zjg6Hjg7Pjg4jjgpLjgrDjg63jg7zjg5Djg6vjgavmibHjgYZcclxudmFyIGM7XHJcbnZhciBxPW5ldyBxdG5JVigpO1xyXG52YXIgcXQ9cS5pZGVudGl0eShxLmNyZWF0ZSgpKTtcclxudmFyIHZpZGVvMTtcclxudmFyIHZpZGVvMjtcclxuLypcclxudmFyIHZpZGVvMztcclxuXHJcbnZhciB2aWRlbzQ7XHJcbnZhciB2aWRlbzU7XHJcbnZhciB2aWRlbzY7XHJcbnZhciB2aWRlbzc7XHJcbnZhciB2aWRlbzg7XHJcbnZhciB2aWRlbzk7XHJcbnZhciB2aWRlbzEwO1xyXG52YXIgdmlkZW8xMTtcclxudmFyIHZpZGVvMTI7XHJcblxyXG52YXIgdmlkZW8xMztcclxudmFyIHZpZGVvMTQ7XHJcbiovXHJcblxyXG4vL+ODk+ODh+OCquOCkuODreODvOODieOBl+OBn+aVsOOCkuaVsOOBiOOCi1xyXG52YXIgbG9hZF9udW09MDtcclxudmFyIHNlbGVjdF92aWRlbz0xO1xyXG5cclxuLy9hdWRpb+mWoumAo1xyXG52YXIgQXVkaW9jb250ZXh0O1xyXG52YXIgc291cmNlO1xyXG52YXIgYW5hbHlzZXI7XHJcbnZhciBmcmVxdWVuY3k7XHJcblxyXG52YXIgZmZ0X2ZsYWc9ZmFsc2U7XHJcbnZhciBzcGVlZD0wLjA7XHJcbi8v44Oe44Km44K544Og44O844OW44Kk44OZ44Oz44OI44Gr55m76Yyy44GZ44KL5Yem55CGXHJcbmZ1bmN0aW9uIG1vdXNlTW92ZShlKXtcclxuXHR2YXIgY3c9Yy53aWR0aDtcclxuXHR2YXIgY2g9Yy5oZWlnaHQ7XHJcblx0dmFyIHdoPTEvTWF0aC5zcXJ0KGN3KmN3K2NoKmNoKTtcclxuXHR2YXIgeD1lLmNsaWVudFgtYy5vZmZzZXRMZWZ0LWN3KjAuNTtcclxuXHR2YXIgeT1lLmNsaWVudFktYy5vZmZzZXRUb3AtY2gqMC41O1xyXG5cdHZhciBzcT1NYXRoLnNxcnQoeCp4K3kqeSk7XHJcblx0dmFyIHI9c3EqMi4wKk1hdGguUEkqd2g7XHJcblx0aWYoc3EhPTEpe1xyXG5cdFx0c3E9MS9zcTtcclxuXHRcdHgqPXNxO1xyXG5cdFx0eSo9c3E7XHJcblx0fVxyXG5cdHEucm90YXRlKHIsW3kseCwwLjBdLHF0KTtcclxufVxyXG5cclxuLy/jg5zjgr/jg7PjgpLjgYrjgZfjgZ/jgYvjganjgYbjgYtcclxuZnVuY3Rpb24gS2V5RG93bihlKXtcclxuXHQvL2NvbnNvbGUubG9nKGUua2V5Q29kZSk7XHJcblx0aWYoZS5rZXlDb2RlPT00OSl7XHJcblx0XHQvLzHjgpLmirzjgZfjgZ/jgolcclxuXHRcdHZpZGVvMS5wbGF5KCk7XHJcblx0XHRzZWxlY3RfdmlkZW89MTtcclxuXHR9ZWxzZSBpZihlLmtleUNvZGU9PTUwKXtcclxuXHRcdC8vMuOCkuaKvOOBl+OBn+OCiVxyXG5cdFx0dmlkZW8yLnBsYXkoKTtcclxuXHRcdHNlbGVjdF92aWRlbz0yO1xyXG5cdH1cclxuLypcclxuXHRlbHNlIGlmKGUua2V5Q29kZT09NTEpe1xyXG5cdFx0dmlkZW8zLnBsYXkoKTtcclxuXHRcdHNlbGVjdF92aWRlbz0zO1xyXG5cdH1lbHNlIGlmKGUua2V5Q29kZT09NTIpe1xyXG5cdFx0dmlkZW80LnBsYXkoKTtcclxuXHRcdHNlbGVjdF92aWRlbz00O1xyXG5cdH1lbHNlIGlmKGUua2V5Q29kZT09NTMpe1xyXG5cdFx0dmlkZW81LnBsYXkoKTtcclxuXHRcdHNlbGVjdF92aWRlbz01O1xyXG5cdH1lbHNlIGlmKGUua2V5Q29kZT09NTQpe1xyXG5cdFx0dmlkZW82LnBsYXkoKTtcclxuXHRcdHNlbGVjdF92aWRlbz02O1xyXG5cdH1lbHNlIGlmKGUua2V5Q29kZT09NTUpe1xyXG5cdFx0dmlkZW83LnBsYXkoKTtcclxuXHRcdHNlbGVjdF92aWRlbz03O1xyXG5cdH1lbHNlIGlmKGUua2V5Q29kZT09NTYpe1xyXG5cdFx0dmlkZW84LnBsYXkoKTtcclxuXHRcdHNlbGVjdF92aWRlbz04O1xyXG5cdH1lbHNlIGlmKGUua2V5Q29kZT09NTcpe1xyXG5cdFx0dmlkZW85LnBsYXkoKTtcclxuXHRcdHNlbGVjdF92aWRlbz05O1xyXG5cdH1lbHNlIGlmKGUua2V5Q29kZT09NDgpe1xyXG5cdFx0dmlkZW8xMC5wbGF5KCk7XHJcblx0XHRzZWxlY3RfdmlkZW89MTA7XHJcblx0fWVsc2UgaWYoZS5rZXlDb2RlPT04MSl7XHJcblx0XHQvL3Hjg5zjgr/jg7NcclxuXHRcdHZpZGVvMTEucGxheSgpO1xyXG5cdFx0c2VsZWN0X3ZpZGVvPTExO1xyXG5cdH1lbHNlIGlmKGUua2V5Q29kZT09ODcpe1xyXG5cdFx0Ly9344Oc44K/44OzXHJcblx0XHR2aWRlbzEyLnBsYXkoKTtcclxuXHRcdHNlbGVjdF92aWRlbz0xMjtcclxuXHR9ZWxzZSBpZihlLmtleUNvZGU9PTY5KXtcclxuXHRcdC8vZeODnOOCv+ODs1xyXG5cdFx0dmlkZW8xMy5wbGF5KCk7XHJcblx0XHRzZWxlY3RfdmlkZW89MTM7XHJcblx0fWVsc2UgaWYoZS5rZXlDb2RlPT04Mil7XHJcblx0XHQvL3Ljg5zjgr/jg7NcclxuXHRcdHZpZGVvMTQucGxheSgpO1xyXG5cdFx0c2VsZWN0X3ZpZGVvPTE0O1xyXG5cdH1cclxuKi9cclxuXHQvL3Pjg5zjgr/jg7Pjga84M1xyXG5cdGlmKGUua2V5Q29kZT09ODMmJmZmdF9mbGFnPT1mYWxzZSl7XHJcblx0XHRmZnRfZmxhZz10cnVlO1xyXG5cdH1lbHNlIGlmKGUua2V5Q29kZT09ODMmJmZmdF9mbGFnPT10cnVlKXtcclxuXHRcdGZmdF9mbGFnPWZhbHNlO1xyXG5cdH1cclxuXHQvL+OCueODmuODvOOCueOBrzMyXHJcblx0aWYoZS5rZXlDb2RlPT0zMil7XHJcblx0XHRpZihzcGVlZD09MjAuMCl7XHJcblx0XHRcdHNwZWVkPTAuMDtcclxuXHRcdH1cclxuXHRcdHNwZWVkKz0xLjA7XHJcblx0XHRjb25zb2xlLmxvZyhzcGVlZCk7XHJcblx0fVxyXG59XHJcbi8v5YaN55Sf5Y+v6IO944Gq44OT44OH44Kq44K/44Kk44OX44KS6Kq/44G544KLXHJcbmZ1bmN0aW9uIGNoZWNrVmlkZW9UeXBlKF92aWRlbyl7XHJcblx0aWYoX3ZpZGVvLmNhblBsYXlUeXBlKFwidmlkZW8vZ2lmXCIpPT09J21heWJlJyl7XHJcblx0XHRyZXR1cm4gJ2dpZic7XHJcblx0fWVsc2UgaWYoX3ZpZGVvLmNhblBsYXlUeXBlKFwidmlkZW8vbXA0XCIpPT09J21heWJlJyl7XHJcblx0XHRyZXR1cm4gJ21wNCc7XHJcblx0fWVsc2V7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcbn1cclxuXHJcbm9ubG9hZD1mdW5jdGlvbigpe1xyXG5cdG5hdmlnYXRvci5nZXRNZWRpYT1uYXZpZ2F0b3IuZ2V0VXNlck1lZGlhfHxcclxuXHRuYXZpZ2F0b3Iud2Via2l0R2V0VXNlck1lZGlhfHxcclxuXHRuYXZpZ2F0b3IubW96R2V0VXNlck1lZGlhfHxcclxuXHRuYXZpZ2F0b3IubXNHZXRVc2VyTWVkaWE7XHJcblxyXG5cdC8v56uv5pyr44Gu44OT44OH44Kq44CB6Z+z5aOw44K544OI44Oq44O844Og44KS5omA5b6XXHJcblx0bmF2aWdhdG9yLmdldE1lZGlhKHthdWRpbzp0cnVlfSxcclxuXHRcdGZ1bmN0aW9uKHN0cmVhbSl7XHJcblx0XHRcdHZhciBhbmltYXRpb25JZDtcclxuXHRcdFx0QXVkaW9jb250ZXh0PW5ldyB3ZWJraXRBdWRpb0NvbnRleHQoKTtcclxuXHRcdFx0Ly/jg57jgqTjgq/pn7Plo7Djga7miYDlvpdcclxuXHRcdFx0c291cmNlPUF1ZGlvY29udGV4dC5jcmVhdGVNZWRpYVN0cmVhbVNvdXJjZShzdHJlYW0pO1xyXG5cdFx0XHQvL+OCouODiuODqeOCpOOCtuODvFxyXG5cdFx0XHRhbmFseXNlcj1BdWRpb2NvbnRleHQuY3JlYXRlQW5hbHlzZXIoKTtcclxuXHJcblx0XHRcdC8v6auY6YCf44OV44O844Oq44Ko5aSJ5o+b44Gu44OH44O844K/44K144Kk44K6XHJcblx0XHRcdGFuYWx5c2VyLmZmdFNpemU9MjA0ODtcclxuXHRcdFx0Ly/mjK/luYXjgrnjg5rjgq/jg4jjg6vjgYzlhaXjgaPjgabjgYTjgovphY3liJdcclxuXHRcdFx0ZnJlcXVlbmN5PW5ldyBVaW50OEFycmF5KGFuYWx5c2VyLmZyZXF1ZW5jeUJpbkNvdW50KTtcclxuXHRcdFx0Ly/jgYrjgZ3jgonjgY/pn7Plo7Djg4fjg7zjgr/jgajjgqLjg4rjg6njgqTjgrbjg7zjgpLjgY/jgaPjgaTjgZHjgotcclxuXHRcdFx0c291cmNlLmNvbm5lY3QoYW5hbHlzZXIpO1xyXG5cdFx0XHRpbml0KCk7XHJcblxyXG5cdH0sZnVuY3Rpb24oZXJyKXtcclxuXHRcdC8v44Ko44Op44O85Yem55CGXHJcblx0fSk7XHJcblxyXG5cclxuXHR2YXIgc29ja2V0ID1pbygpO1xyXG5cdC8v44K144O844OQ44O844GL44KJ44OH44O844K/44KS5Y+X44GR5Y+W44KLXHJcblx0c29ja2V0Lm9uKFwidmpBY3Rpb25Gcm9tU2VydmVyXCIsZnVuY3Rpb24obXNnKXtcclxuXHRcdCQoJyNtZXNzYWdlcycpLmFwcGVuZCgkKCc8bGk+JykudGV4dChtc2cpKTtcclxuXHRcdGlmKG1zZz09MSl7XHJcblx0XHRcdHZpZGVvMS5wbGF5KCk7XHJcblx0XHRcdHNlbGVjdF92aWRlbz0xO1xyXG5cdFx0fWVsc2UgaWYobXNnPT0yKXtcclxuXHRcdFx0dmlkZW8yLnBsYXkoKTtcclxuXHRcdFx0c2VsZWN0X3ZpZGVvPTI7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG5cdC8vY2FudmFz44Ko44Os44Oh44Oz44OI44KS5omA5b6XXHJcblx0Yz1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiKTtcclxuXHRjLndpZHRoPTcyMDtcclxuXHRjLmhlaWdodD00ODA7XHJcbi8vXHRjLndpZHRoPXdpbmRvdy5pbm5lcldpZHRoO1xyXG4vL1x0Yy5oZWlnaHQ9d2luZG93LmlubmVySGVpZ2h0O1xyXG5cclxuXHR2aWRlbzE9dmlkZW9fY3JlYXRlKFwiLi4vaW1nL29yaWdpbmFsLlwiKTtcclxuXHR2aWRlbzI9dmlkZW9fY3JlYXRlKFwiLi4vaW1nL2hhbmQuXCIpO1xyXG5cdC8qXHJcblx0dmlkZW8zPXZpZGVvX2NyZWF0ZShcInBva2Vtb24uXCIpO1xyXG5cdHZpZGVvND12aWRlb19jcmVhdGUoXCJjYXJkY2FwdGVyMi5cIik7XHJcblx0dmlkZW81PXZpZGVvX2NyZWF0ZShcImNhcmRjYXB0ZXIzLlwiKTtcclxuXHR2aWRlbzY9dmlkZW9fY3JlYXRlKFwiY2FyZGNhcHRlcjQuXCIpO1xyXG5cdHZpZGVvNz12aWRlb19jcmVhdGUoXCJkYW5zaGkuXCIpO1xyXG5cdHZpZGVvOD12aWRlb19jcmVhdGUoXCJnaXBoeS5cIik7XHJcblx0dmlkZW85PXZpZGVvX2NyZWF0ZShcIm1hZ2ljLlwiKTtcclxuXHR2aWRlbzEwPXZpZGVvX2NyZWF0ZShcIm5pY2hpam8uXCIpO1xyXG5cdHZpZGVvMTE9dmlkZW9fY3JlYXRlKFwib3NvLlwiKTtcclxuXHR2aWRlbzEyPXZpZGVvX2NyZWF0ZShcIm9zbzIuXCIpO1xyXG5cdHZpZGVvMTM9dmlkZW9fY3JlYXRlKFwiU2FpbG9ybW9vbi5cIik7XHJcblx0dmlkZW8xND12aWRlb19jcmVhdGUoXCJTYWlsb3Jtb29uMi5cIik7XHJcbiovXHJcblxyXG5cdHZpZGVvX2FjdGlvbnModmlkZW8xKTtcclxuXHR2aWRlb19hY3Rpb25zKHZpZGVvMik7XHJcblx0LypcclxuXHR2aWRlb19hY3Rpb25zKHZpZGVvMyk7XHJcblx0dmlkZW9fYWN0aW9ucyh2aWRlbzQpO1xyXG5cdHZpZGVvX2FjdGlvbnModmlkZW81KTtcclxuXHR2aWRlb19hY3Rpb25zKHZpZGVvNik7XHJcblx0dmlkZW9fYWN0aW9ucyh2aWRlbzcpO1xyXG5cdHZpZGVvX2FjdGlvbnModmlkZW84KTtcclxuXHR2aWRlb19hY3Rpb25zKHZpZGVvOSk7XHJcblx0dmlkZW9fYWN0aW9ucyh2aWRlbzEwKTtcclxuXHR2aWRlb19hY3Rpb25zKHZpZGVvMTEpO1xyXG5cdHZpZGVvX2FjdGlvbnModmlkZW8xMik7XHJcblx0dmlkZW9fYWN0aW9ucyh2aWRlbzEzKTtcclxuXHR2aWRlb19hY3Rpb25zKHZpZGVvMTQpO1xyXG4qL1xyXG5cdFx0Ly/jg5zjgr/jg7PjgpLmirzjgZfjgZ/jgYvjganjgYbjgYtcclxuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiICwgS2V5RG93bik7XHJcbn1cclxuZnVuY3Rpb24gdmlkZW9fYWN0aW9ucyhfdmlkZW8pe1xyXG5cdF92aWRlby5hZGRFdmVudExpc3RlbmVyKFwiY2FucGxheXRocm91Z2hcIixmdW5jdGlvbigpe1xyXG5cdFx0YWN0aW9uKCk7XHJcblx0fSx0cnVlKTtcclxuXHRfdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihcImVuZGVkXCIsZnVuY3Rpb24oKXtcclxuXHRcdF92aWRlby5wbGF5KCk7XHJcblx0fSx0cnVlKTtcclxuXHJcbn1cclxuZnVuY3Rpb24gYWN0aW9uKCl7XHJcblx0bG9hZF9udW0rKztcclxuXHQvKlxyXG5cdGlmKGxvYWRfbnVtPT0xNCl7XHJcblx0XHRyZW5kZXIoKTtcclxuXHR9Ki9cclxuXHRpZihsb2FkX251bT09Mil7XHJcblx0XHRyZW5kZXIoKTtcclxuXHR9XHJcbn1cclxuZnVuY3Rpb24gdmlkZW9fY3JlYXRlKF9zcmMpe1xyXG5cdC8v44OT44OH44Kq44Ko44Os44Oh44Oz44OI44KS55Sf5oiQXHJcblx0dmFyIHZpZGVvPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ2aWRlb1wiKTtcclxuXHQvL+ODk+ODh+OCquOCv+OCpOODl+OBruODgeOCp+ODg+OCr1xyXG5cdHZhciB2aWRlb0V4dD1jaGVja1ZpZGVvVHlwZSh2aWRlbyk7XHJcblx0aWYodmlkZW9FeHQ9PT1udWxsKXtcclxuXHRcdGFsZXJ0KFwibm90IHN1cHBvcnRlZFwiKTtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0Ly/jgr3jg7zjgrnjga7oqq3jgb/ovrzjgb9cclxuXHR2aWRlby5zcmM9X3NyYyt2aWRlb0V4dDtcclxuXHRyZXR1cm4gdmlkZW87XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlcigpe1xyXG5cdC8v44OT44OH44Kq77yR44KS5YaN55SfXHJcblx0dmlkZW8xLnBsYXkoKTtcclxuXHRjLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIixtb3VzZU1vdmUsdHJ1ZSk7XHJcblx0dmFyIGdsPWMuZ2V0Q29udGV4dChcIndlYmdsXCIpfHxjLmdldENvbnRleHQoXCJleHBlcmltZW50YWwtd2ViZ2xcIik7XHJcblxyXG5cdHZhciB2X3NoYWRlcj1jcmVhdGVfc2hhZGVyKFwidnNcIik7XHJcblx0dmFyIGZfc2hhZGVyPWNyZWF0ZV9zaGFkZXIoXCJmc1wiKTtcclxuXHJcblx0dmFyIHByZz1jcmVhdGVfcHJvZ3JhbSh2X3NoYWRlcixmX3NoYWRlcik7XHJcblx0dmFyIGF0dExvY2F0aW9uPW5ldyBBcnJheSgpO1xyXG5cdGF0dExvY2F0aW9uWzBdPWdsLmdldEF0dHJpYkxvY2F0aW9uKHByZyxcInBvc2l0aW9uXCIpO1xyXG5cdGF0dExvY2F0aW9uWzFdPWdsLmdldEF0dHJpYkxvY2F0aW9uKHByZyxcImNvbG9yXCIpO1xyXG5cdGF0dExvY2F0aW9uWzJdPWdsLmdldEF0dHJpYkxvY2F0aW9uKHByZyxcInRleHR1cmVDb29yZFwiKTtcclxuXHRhdHRMb2NhdGlvblszXT1nbC5nZXRBdHRyaWJMb2NhdGlvbihwcmcsXCJpbnN0YW5jZVBvc2l0aW9uXCIpO1xyXG5cclxuXHR2YXIgYXR0U3RyaWRlPW5ldyBBcnJheSgpO1xyXG5cdGF0dFN0cmlkZVswXT0zO1xyXG5cdGF0dFN0cmlkZVsxXT00O1xyXG5cdGF0dFN0cmlkZVsyXT0yO1xyXG5cdGF0dFN0cmlkZVszXT0zO1xyXG5cclxuXHR2YXIgdW5pTG9jYXRpb249bmV3IEFycmF5KCk7XHJcblx0dW5pTG9jYXRpb25bMF09Z2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByZyxcIm12cE1hdHJpeFwiKTtcclxuXHR1bmlMb2NhdGlvblsxXT1nbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJnLFwidGV4dHVyZVwiKTtcclxuXHJcblx0Ly/jgq3jg6Xjg7zjg5bjg4fjg7zjgr9cclxuXHR2YXIgY3ViZURhdGE9Y3ViZSgxLFsxLjAsMS4wLDEuMCwxLjBdKTtcclxuXHR2YXIgY1Bvc2l0aW9uPWNyZWF0ZV92Ym8oY3ViZURhdGEucCk7XHJcblx0dmFyIGNDb2xvcj1jcmVhdGVfdmJvKGN1YmVEYXRhLmMpO1xyXG5cdHZhciBjVGV4dHVyZUNvb3JkPWNyZWF0ZV92Ym8oY3ViZURhdGEudCk7XHJcblx0dmFyIGNWQk9MaXN0PVtjUG9zaXRpb24sY0NvbG9yLGNUZXh0dXJlQ29vcmRdO1xyXG5cdHZhciBjSW5kZXg9Y3JlYXRlX2libyhjdWJlRGF0YS5pKTtcclxuXHQvKuaLoeW8teapn+iDveOCkuacieWKueWMliovXHJcblx0dmFyIGV4dDtcclxuXHRleHQ9Z2wuZ2V0RXh0ZW5zaW9uKFwiQU5HTEVfaW5zdGFuY2VkX2FycmF5c1wiKTtcclxuXHRpZihleHQ9PW51bGwpe1xyXG5cdFx0YWxlcnQoXCJBTkdMRV9pbnN0YW5jZWRfYXJyYXlzIG5vdCBzdXBwb3J0ZWRcIik7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHQvL+WQhOOCpOODs+OCueOCv+ODs+OCueOBq+mBqeeUqOOBmeOCi+ODh+ODvOOCv1xyXG5cclxuXHQvL+OCpOODs+OCueOCv+ODs+OCueOBruaVsFxyXG5cdHZhciBpbnN0YW5jZUNvdW50PTEyNTtcclxuXHJcblx0Ly/jgqTjg7Pjgrnjgr/jg7PjgrnnlKjphY3liJdcclxuXHR2YXIgaW5zdGFuY2VQb3NpdGlvbnM9bmV3IEFycmF5KCk7XHJcblxyXG5cdC8v6YWN5YiX55So44Gu44K544OI44Op44Kk44OJXHJcblx0dmFyIG9mZnNldFBvc2l0aW9uPTM7XHJcblxyXG5cdGZvcih2YXIgaT0wO2k8aW5zdGFuY2VDb3VudDtpKyspe1xyXG5cdFx0aW5zdGFuY2VQb3NpdGlvbnNbaSpvZmZzZXRQb3NpdGlvbl09LShpJTUuMCkqMS41KzAuMDtcclxuXHRcdGluc3RhbmNlUG9zaXRpb25zW2kqb2Zmc2V0UG9zaXRpb24rMV09KE1hdGguZmxvb3IoaS81LjApJTUuMCkqMS41KzAuMDtcclxuXHRcdGluc3RhbmNlUG9zaXRpb25zW2kqb2Zmc2V0UG9zaXRpb24rMl09TWF0aC5mbG9vcihpLzI1LjApKjEuNSswLjA7XHJcblx0fVxyXG5cclxuXHQvL+mFjeWIl+OBi+OCiVZCT+OCkueUn+aIkFxyXG5cdHZhciBpUG9zaXRpb249Y3JlYXRlX3ZibyhpbnN0YW5jZVBvc2l0aW9ucyk7XHJcblxyXG5cdC8v44OI44O844Op44K544GuYXR0cmlidXRl6Zai6YCjXHJcblx0c2V0X2F0dHJpYnV0ZShjVkJPTGlzdCxhdHRMb2NhdGlvbixhdHRTdHJpZGUpO1xyXG5cdGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsY0luZGV4KTtcclxuXHJcblx0Ly/jgqTjg7Pjgrnjgr/jg7PjgrnnlKjjga7luqfmqJnkvY3nva5WQk/jgpLmnInlirnjgavjgZnjgotcclxuXHRnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUixpUG9zaXRpb24pO1xyXG5cdGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGF0dExvY2F0aW9uWzNdKTtcclxuXHRnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGF0dExvY2F0aW9uWzNdLGF0dFN0cmlkZVszXSxnbC5GTE9BVCxmYWxzZSwwLDApO1xyXG5cdC8v44Kk44Oz44K544K/44Oz44K555So44Gu5pyJ5Yq55YyW44GX6Zmk5pWw44KS5oyH5a6a44GZ44KLXHJcblx0ZXh0LnZlcnRleEF0dHJpYkRpdmlzb3JBTkdMRShhdHRMb2NhdGlvblszXSwxKTtcclxuXHQvL+WQhOeoruihjOWIl+OBrueUn+aIkOOBqOWIneacn+WMllxyXG5cdHZhciBtPW5ldyBtYXRJVigpO1xyXG5cdHZhciBtTWF0cml4PW0uaWRlbnRpdHkobS5jcmVhdGUoKSk7XHJcblx0dmFyIHZNYXRyaXg9bS5pZGVudGl0eShtLmNyZWF0ZSgpKTtcclxuXHR2YXIgcE1hdHJpeD1tLmlkZW50aXR5KG0uY3JlYXRlKCkpO1xyXG5cdHZhciB0bXBNYXRyaXg9bS5pZGVudGl0eShtLmNyZWF0ZSgpKTtcclxuXHR2YXIgbXZwTWF0cml4PW0uaWRlbnRpdHkobS5jcmVhdGUoKSk7XHJcblx0dmFyIGludk1hdHJpeD1tLmlkZW50aXR5KG0uY3JlYXRlKCkpO1xyXG5cclxuXHRnbC5lbmFibGUoZ2wuREVQVEhfVEVTVCk7XHJcblx0Z2wuZGVwdGhGdW5jKGdsLkxFUVVBTCk7XHJcblx0Z2wuZW5hYmxlKGdsLkNVTExfRkFDRSk7XHJcblxyXG5cclxuXHRnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUwKTtcclxuXHJcblx0dmFyIHZpZGVvVGV4dHVyZTE9bnVsbDtcclxuXHR2YXIgdmlkZW9UZXh0dXJlMj1udWxsO1xyXG5cdC8qXHJcblx0dmFyIHZpZGVvVGV4dHVyZTM9bnVsbDtcclxuXHR2YXIgdmlkZW9UZXh0dXJlND1udWxsO1xyXG5cdHZhciB2aWRlb1RleHR1cmU1PW51bGw7XHJcblx0dmFyIHZpZGVvVGV4dHVyZTY9bnVsbDtcclxuXHR2YXIgdmlkZW9UZXh0dXJlNz1udWxsO1xyXG5cdHZhciB2aWRlb1RleHR1cmU4PW51bGw7XHJcblx0dmFyIHZpZGVvVGV4dHVyZTk9bnVsbDtcclxuXHR2YXIgdmlkZW9UZXh0dXJlMTA9bnVsbDtcclxuXHR2YXIgdmlkZW9UZXh0dXJlMTE9bnVsbDtcclxuXHR2YXIgdmlkZW9UZXh0dXJlMTI9bnVsbDtcclxuXHR2YXIgdmlkZW9UZXh0dXJlMTM9bnVsbDtcclxuXHR2YXIgdmlkZW9UZXh0dXJlMTQ9bnVsbDtcclxuKi9cclxuXHJcblx0Y3JlYXRlX3RleHR1cmVWaWRlbyh2aWRlbzEsMSk7XHJcblx0Y3JlYXRlX3RleHR1cmVWaWRlbyh2aWRlbzIsMik7XHJcbi8qXHJcblx0Y3JlYXRlX3RleHR1cmVWaWRlbyh2aWRlbzMsMyk7XHJcblx0Y3JlYXRlX3RleHR1cmVWaWRlbyh2aWRlbzQsNCk7XHJcblx0Y3JlYXRlX3RleHR1cmVWaWRlbyh2aWRlbzUsNSk7XHJcblx0Y3JlYXRlX3RleHR1cmVWaWRlbyh2aWRlbzYsNik7XHJcblx0Y3JlYXRlX3RleHR1cmVWaWRlbyh2aWRlbzcsNyk7XHJcblx0Y3JlYXRlX3RleHR1cmVWaWRlbyh2aWRlbzgsOCk7XHJcblx0Y3JlYXRlX3RleHR1cmVWaWRlbyh2aWRlbzksOSk7XHJcblx0Y3JlYXRlX3RleHR1cmVWaWRlbyh2aWRlbzEwLDEwKTtcclxuXHRjcmVhdGVfdGV4dHVyZVZpZGVvKHZpZGVvMTEsMTEpO1xyXG5cdGNyZWF0ZV90ZXh0dXJlVmlkZW8odmlkZW8xMiwxMik7XHJcblx0Y3JlYXRlX3RleHR1cmVWaWRlbyh2aWRlbzEzLDEzKTtcclxuXHRjcmVhdGVfdGV4dHVyZVZpZGVvKHZpZGVvMTQsMTQpO1xyXG4qL1xyXG5cdC8v44Kr44Km44Oz44K/44Gu5a6j6KiAXHJcblx0dmFyIGNvdW50PTA7XHJcblx0dmFyIGNvdW50Mj0wO1xyXG5cclxuXHQvL+aBkuW4uOODq+ODvOODl1xyXG5cdChmdW5jdGlvbiBsb29wKCl7XHJcblx0XHR2YXIgc2NhbGVWYWx1ZT0xLjA7XHJcblx0XHRpZihmZnRfZmxhZz09dHJ1ZSl7XHJcblx0XHRcdGFuYWx5c2VyLmdldEJ5dGVGcmVxdWVuY3lEYXRhKGZyZXF1ZW5jeSk7XHJcblx0XHRcdC8vY29uc29sZS5sb2coZnJlcXVlbmN5WzYwXSk7XHJcblx0XHRcdHNjYWxlVmFsdWU9ZnJlcXVlbmN5WzUwXS81MDArMC42O1xyXG5cdFx0fVxyXG5cdFx0Y291bnQrKztcclxuXHRcdGlmIChjb3VudCAlIDEwID09IDApIHtcclxuXHRcdCAgICBjb3VudDIrKztcclxuXHRcdH1cclxuXHRcdGlmKHNlbGVjdF92aWRlbz09MSl7XHJcblx0XHRcdC8v44OG44Kv44K544OB44Oj44KS5pu05paw44GZ44KLXHJcblx0XHRcdGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsbnVsbCk7XHJcblx0XHRcdGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsdmlkZW9UZXh0dXJlMSk7XHJcblx0XHRcdGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwwLGdsLlJHQkEsZ2wuUkdCQSxnbC5VTlNJR05FRF9CWVRFLHZpZGVvMSk7XHJcblx0XHR9ZWxzZSBpZihzZWxlY3RfdmlkZW89PTIpe1xyXG5cdFx0XHQvL+ODhuOCr+OCueODgeODo+OCkuabtOaWsOOBmeOCi1xyXG5cdFx0XHRnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELG51bGwpO1xyXG5cdFx0XHRnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELHZpZGVvVGV4dHVyZTIpO1xyXG5cdFx0XHRnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsMCxnbC5SR0JBLGdsLlJHQkEsZ2wuVU5TSUdORURfQllURSx2aWRlbzIpO1xyXG5cdFx0fVxyXG5cdFx0LypcclxuXHRcdGVsc2UgaWYoc2VsZWN0X3ZpZGVvPT0zKXtcclxuXHRcdFx0Z2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCxudWxsKTtcclxuXHRcdFx0Z2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCx2aWRlb1RleHR1cmUzKTtcclxuXHRcdFx0Z2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELDAsZ2wuUkdCQSxnbC5SR0JBLGdsLlVOU0lHTkVEX0JZVEUsdmlkZW8zKTtcclxuXHRcdH1lbHNlIGlmKHNlbGVjdF92aWRlbz09NCl7XHJcblx0XHRcdGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsbnVsbCk7XHJcblx0XHRcdGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsdmlkZW9UZXh0dXJlNCk7XHJcblx0XHRcdGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwwLGdsLlJHQkEsZ2wuUkdCQSxnbC5VTlNJR05FRF9CWVRFLHZpZGVvNCk7XHJcblx0XHR9ZWxzZSBpZihzZWxlY3RfdmlkZW89PTUpe1xyXG5cdFx0XHRnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELG51bGwpO1xyXG5cdFx0XHRnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELHZpZGVvVGV4dHVyZTUpO1xyXG5cdFx0XHRnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsMCxnbC5SR0JBLGdsLlJHQkEsZ2wuVU5TSUdORURfQllURSx2aWRlbzUpO1xyXG5cdFx0fWVsc2UgaWYoc2VsZWN0X3ZpZGVvPT02KXtcclxuXHRcdFx0Z2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCxudWxsKTtcclxuXHRcdFx0Z2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCx2aWRlb1RleHR1cmU2KTtcclxuXHRcdFx0Z2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELDAsZ2wuUkdCQSxnbC5SR0JBLGdsLlVOU0lHTkVEX0JZVEUsdmlkZW82KTtcclxuXHRcdH1lbHNlIGlmKHNlbGVjdF92aWRlbz09Nyl7XHJcblx0XHRcdGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsbnVsbCk7XHJcblx0XHRcdGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsdmlkZW9UZXh0dXJlNyk7XHJcblx0XHRcdGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwwLGdsLlJHQkEsZ2wuUkdCQSxnbC5VTlNJR05FRF9CWVRFLHZpZGVvNyk7XHJcblx0XHR9ZWxzZSBpZihzZWxlY3RfdmlkZW89PTgpe1xyXG5cdFx0XHRnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELG51bGwpO1xyXG5cdFx0XHRnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELHZpZGVvVGV4dHVyZTgpO1xyXG5cdFx0XHRnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsMCxnbC5SR0JBLGdsLlJHQkEsZ2wuVU5TSUdORURfQllURSx2aWRlbzgpO1xyXG5cdFx0fWVsc2UgaWYoc2VsZWN0X3ZpZGVvPT05KXtcclxuXHRcdFx0Z2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCxudWxsKTtcclxuXHRcdFx0Z2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCx2aWRlb1RleHR1cmU5KTtcclxuXHRcdFx0Z2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELDAsZ2wuUkdCQSxnbC5SR0JBLGdsLlVOU0lHTkVEX0JZVEUsdmlkZW85KTtcclxuXHRcdH1lbHNlIGlmKHNlbGVjdF92aWRlbz09MTApe1xyXG5cdFx0XHRnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELG51bGwpO1xyXG5cdFx0XHRnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELHZpZGVvVGV4dHVyZTEwKTtcclxuXHRcdFx0Z2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELDAsZ2wuUkdCQSxnbC5SR0JBLGdsLlVOU0lHTkVEX0JZVEUsdmlkZW8xMCk7XHJcblx0XHR9ZWxzZSBpZihzZWxlY3RfdmlkZW89PTExKXtcclxuXHRcdFx0Z2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCxudWxsKTtcclxuXHRcdFx0Z2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCx2aWRlb1RleHR1cmUxMSk7XHJcblx0XHRcdGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwwLGdsLlJHQkEsZ2wuUkdCQSxnbC5VTlNJR05FRF9CWVRFLHZpZGVvMTEpO1xyXG5cdFx0fWVsc2UgaWYoc2VsZWN0X3ZpZGVvPT0xMil7XHJcblx0XHRcdGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsbnVsbCk7XHJcblx0XHRcdGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsdmlkZW9UZXh0dXJlMTIpO1xyXG5cdFx0XHRnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsMCxnbC5SR0JBLGdsLlJHQkEsZ2wuVU5TSUdORURfQllURSx2aWRlbzEyKTtcclxuXHRcdH1lbHNlIGlmKHNlbGVjdF92aWRlbz09MTMpe1xyXG5cdFx0XHRnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELG51bGwpO1xyXG5cdFx0XHRnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELHZpZGVvVGV4dHVyZTEzKTtcclxuXHRcdFx0Z2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELDAsZ2wuUkdCQSxnbC5SR0JBLGdsLlVOU0lHTkVEX0JZVEUsdmlkZW8xMyk7XHJcblx0XHR9ZWxzZSBpZihzZWxlY3RfdmlkZW89PTE0KXtcclxuXHRcdFx0Z2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCxudWxsKTtcclxuXHRcdFx0Z2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCx2aWRlb1RleHR1cmUxNCk7XHJcblx0XHRcdGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwwLGdsLlJHQkEsZ2wuUkdCQSxnbC5VTlNJR05FRF9CWVRFLHZpZGVvMTQpO1xyXG5cdFx0fSovXHJcblxyXG5cclxuXHRcdC8v44OT44Ol44O8w5fjg5fjg63jgrjjgqfjgq/jgrfjg6fjg7PluqfmqJnlpInmj5vooYzliJdcclxuXHRcdHZhciBleWVQb3NpdGlvbj1uZXcgQXJyYXkoKTtcclxuXHRcdHZhciBjYW1VcERpcmVjdGlvbj1uZXcgQXJyYXkoKTtcclxuXHRcdHEudG9WZWNJSUkoWzAuMCwwLjAsMTUuMF0scXQsZXllUG9zaXRpb24pO1xyXG5cdFx0cS50b1ZlY0lJSShbMC4wLDEuMCwwLjBdLHF0LGNhbVVwRGlyZWN0aW9uKTtcclxuXHRcdG0ubG9va0F0KGV5ZVBvc2l0aW9uLFswLjAsMC4wLDAuMF0sY2FtVXBEaXJlY3Rpb24sdk1hdHJpeCk7XHJcblx0XHRtLnBlcnNwZWN0aXZlKDQ1LGMud2lkdGgvYy5oZWlnaHQsMC4xLDUwLjAscE1hdHJpeCk7XHJcblx0XHRtLm11bHRpcGx5KHBNYXRyaXgsdk1hdHJpeCx0bXBNYXRyaXgpO1xyXG5cclxuXHRcdC8vY2FudmFz44KS5Yid5pyf5YyWXHJcblx0XHR2YXIgaHN2ID0gaHN2YShjb3VudDIgJSAzNjAsIDEsIDEsIDEpO1xyXG4gICAgICAgIGdsLmNsZWFyQ29sb3IoaHN2WzBdLCBoc3ZbMV0sIGhzdlsyXSwgaHN2WzNdKTtcclxuXHRcdGdsLmNsZWFyRGVwdGgoMS4wKTtcclxuXHRcdGdsLmNsZWFyKGdsLkNPTE9SX0JVRkZFUl9CSVQgfCBnbC5ERVBUSF9CVUZGRVJfQklUKTtcclxuXHJcblx0XHQvL+OCreODpeODvOODluOBruODrOODs+OCv+ODquODs+OCsFxyXG5cdFx0bS5pZGVudGl0eShtTWF0cml4KTtcclxuXHRcdC8vbS5yb3RhdGUobU1hdHJpeCwoY291bnQlMzYwKSpNYXRoLlBJLzE4MCxbMC4wLDEuMCwwLjBdLG1NYXRyaXgpO1xyXG5cdFx0bS50cmFuc2xhdGUobU1hdHJpeCxbMC4wLDAuMCxzcGVlZF0sbU1hdHJpeCk7XHJcblx0XHRtLnNjYWxlKG1NYXRyaXgsW3NjYWxlVmFsdWUsc2NhbGVWYWx1ZSxzY2FsZVZhbHVlXSxtTWF0cml4KTtcclxuXHRcdG0ucm90YXRlKG1NYXRyaXgsTWF0aC5QSSxbMC4wLDAuMCwxLjBdLG1NYXRyaXgpO1xyXG5cdFx0bS5tdWx0aXBseSh0bXBNYXRyaXgsbU1hdHJpeCxtdnBNYXRyaXgpO1xyXG5cdFx0bS5pbnZlcnNlKG1NYXRyaXgsaW52TWF0cml4KTtcclxuXHRcdGdsLnVuaWZvcm1NYXRyaXg0ZnYodW5pTG9jYXRpb25bMF0sZmFsc2UsbXZwTWF0cml4KTtcclxuXHRcdGdsLnVuaWZvcm0xaSh1bmlMb2NhdGlvblsxXSwwKTtcclxuXHJcblx0XHRleHQuZHJhd0VsZW1lbnRzSW5zdGFuY2VkQU5HTEUoZ2wuVFJJQU5HTEVTLGN1YmVEYXRhLmkubGVuZ3RoLGdsLlVOU0lHTkVEX1NIT1JULDAsaW5zdGFuY2VDb3VudCk7XHJcblxyXG5cdFx0Z2wuZmx1c2goKTtcclxuXHRcdC8vcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGEpO1xyXG5cdFx0Ly9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYXJndW1lbnRzLmNhbGxlZSk7XHJcblx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XHJcblx0XHQvL3NldFRpbWVvdXQoYSwxMDAwLzMwKTtcclxuXHR9KSgpO1xyXG5cclxuXHQvL+OCt+OCp+ODvOODgOOCkueUn+aIkOOBmeOCi+mWouaVsFxyXG5cdGZ1bmN0aW9uIGNyZWF0ZV9zaGFkZXIoaWQpe1xyXG5cdFx0dmFyIHNoYWRlcjtcclxuXHJcblx0XHR2YXIgc2NyaXB0RWxlbWVudD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcblxyXG5cdFx0aWYoIXNjcmlwdEVsZW1lbnQpe1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0c3dpdGNoKHNjcmlwdEVsZW1lbnQudHlwZSl7XHJcblx0XHRcdGNhc2UgJ3gtc2hhZGVyL3gtdmVydGV4JzpcclxuXHRcdFx0c2hhZGVyPWdsLmNyZWF0ZVNoYWRlcihnbC5WRVJURVhfU0hBREVSKTtcclxuXHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlICd4LXNoYWRlci94LWZyYWdtZW50JzpcclxuXHRcdFx0c2hhZGVyPWdsLmNyZWF0ZVNoYWRlcihnbC5GUkFHTUVOVF9TSEFERVIpO1xyXG5cdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLHNjcmlwdEVsZW1lbnQudGV4dCk7XHJcblxyXG5cdFx0Z2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xyXG5cdFx0Ly/jgrfjgqfjg7zjg4Djg7zjgYzmraPjgZfjgY/jgrPjg7Pjg5HjgqTjg6vjgZXjgozjgZ/jgYvjg4Hjgqfjg4Pjgq9cclxuXHRcdGlmKGdsLmdldFNoYWRlclBhcmFtZXRlcihzaGFkZXIsZ2wuQ09NUElMRV9TVEFUVVMpKXtcclxuXHRcdFx0cmV0dXJuIHNoYWRlcjtcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRhbGVydChnbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcikpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gY3JlYXRlX3Byb2dyYW0odnMsZnMpe1xyXG5cdFx0Ly/jg5fjg63jgrDjg6njg6Djgqrjg5bjgrjjgqfjgq/jg4jjga7nlJ/miJBcclxuXHRcdHZhciBwcm9ncmFtPWdsLmNyZWF0ZVByb2dyYW0oKTtcclxuXHJcblx0XHRnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSx2cyk7XHJcblx0XHRnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSxmcyk7XHJcblxyXG5cdFx0Z2wubGlua1Byb2dyYW0ocHJvZ3JhbSk7XHJcblxyXG5cdFx0aWYoZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcm9ncmFtLGdsLkxJTktfU1RBVFVTKSl7XHJcblx0XHRcdC8v5oiQ5Yqf44GX44Gm44GE44Gf44KJ44OX44Ot44Kw44Op44Og44Kq44OW44K444Kn44Kv44OI44KS5pyJ5Yq544Gr44GZ44KLXHJcblx0XHRcdGdsLnVzZVByb2dyYW0ocHJvZ3JhbSk7XHJcblxyXG5cdFx0XHQvL+ODl+ODreOCsOODqeODoOOCquODluOCuOOCp+OCr+ODiOOCkui/lOOBl+OBpue1guS6hlxyXG5cdFx0XHRyZXR1cm4gcHJvZ3JhbTtcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRhbGVydChnbC5nZXRQcm9ncmFtSW5mb0xvZyhwcm9ncmFtKSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvL1ZCT+OCkueUn+aIkOOBmeOCi+mWouaVsFxyXG5cdGZ1bmN0aW9uIGNyZWF0ZV92Ym8oZGF0YSl7XHJcblx0XHR2YXIgdmJvPWdsLmNyZWF0ZUJ1ZmZlcigpO1xyXG5cdFx0Ly/jg5Djg4Pjg5XjgqHjgpLjg5DjgqTjg7Pjg4lcclxuXHRcdGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLHZibyk7XHJcblx0XHQvL+ODkOODg+ODleOCoeOBq+ODh+ODvOOCv+OCkuOCu+ODg+ODiFxyXG5cdFx0Z2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsbmV3IEZsb2F0MzJBcnJheShkYXRhKSxnbC5TVEFUSUNfRFJBVyk7XHJcblx0XHQvL+ODkOODg+ODleOCoeOBruODkOOCpOODs+ODieOCkueEoeWKueWMllxyXG5cdFx0Z2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsbnVsbCk7XHJcblxyXG5cdFx0cmV0dXJuIHZibztcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHNldF9hdHRyaWJ1dGUodmJvLGF0dEwsYXR0Uyl7XHJcblx0XHQvL+W8leaVsOOBqOOBl+OBpuWPl+OBkeWPluOBo+OBn+mFjeWIl+OCkuWHpueQhuOBmeOCi1xyXG5cdFx0Zm9yKHZhciBpIGluIHZibyl7XHJcblx0XHRcdGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLHZib1tpXSk7XHJcblx0XHRcdC8vYXR0cmlidXRlTG9jYXRpb27jgpLmnInlirnjgavjgZnjgotcclxuXHRcdFx0Z2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoYXR0TFtpXSk7XHJcblx0XHRcdC8vYXR0cmlidXRlTG9jYXRpb27jgpLpgJrnn6XjgZfnmbvpjLJcclxuXHRcdFx0Z2wudmVydGV4QXR0cmliUG9pbnRlcihhdHRMW2ldLGF0dFNbaV0sZ2wuRkxPQVQsZmFsc2UsMCwwKTtcclxuXHRcdH1cclxuXHR9XHJcblx0ZnVuY3Rpb24gY3JlYXRlX2libyhkYXRhKXtcclxuXHRcdHZhciBpYm89Z2wuY3JlYXRlQnVmZmVyKCk7XHJcblx0XHRnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLGlibyk7XHJcblx0XHRnbC5idWZmZXJEYXRhKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLG5ldyBJbnQxNkFycmF5KGRhdGEpLGdsLlNUQVRJQ19EUkFXKTtcclxuXHRcdGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsbnVsbCk7XHJcblx0XHRyZXR1cm4gaWJvO1xyXG5cdH1cclxuXHQvL3ZpZGVv44Gu44OG44Kv44K544OB44Oj44KS5L2c5oiQXHJcblx0ZnVuY3Rpb24gY3JlYXRlX3RleHR1cmVWaWRlbyhfc291cmNlLF9udW1iZXIpe1xyXG5cdFx0dmFyIHZpZGVvVGV4dHVyZT1nbC5jcmVhdGVUZXh0dXJlKGdsLlRFWFRVUkVfMkQpO1xyXG5cdFx0Z2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCx2aWRlb1RleHR1cmUpO1xyXG5cdFx0Z2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELDAsZ2wuUkdCQSxnbC5SR0JBLGdsLlVOU0lHTkVEX0JZVEUsX3NvdXJjZSk7XHJcblx0XHRnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsZ2wuVEVYVFVSRV9NQUdfRklMVEVSLGdsLkxJTkVBUik7XHJcblx0XHRnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsZ2wuVEVYVFVSRV9NSU5fRklMVEVSLGdsLkxJTkVBUik7XHJcblx0XHRnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsZ2wuVEVYVFVSRV9XUkFQX1MsZ2wuQ0xBTVBfVE9fRURHRSk7XHJcblx0XHRnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsZ2wuVEVYVFVSRV9XUkFQX1QsZ2wuQ0xBTVBfVE9fRURHRSk7XHJcblxyXG5cdFx0Z2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCxudWxsKTtcclxuICAgICAgICBzd2l0Y2goX251bWJlcil7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIHZpZGVvVGV4dHVyZTEgPSB2aWRlb1RleHR1cmU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgdmlkZW9UZXh0dXJlMiA9IHZpZGVvVGV4dHVyZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgdmlkZW9UZXh0dXJlMyA9IHZpZGVvVGV4dHVyZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICB2aWRlb1RleHR1cmU0ID0gdmlkZW9UZXh0dXJlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIHZpZGVvVGV4dHVyZTUgPSB2aWRlb1RleHR1cmU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgdmlkZW9UZXh0dXJlNiA9IHZpZGVvVGV4dHVyZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgICAgICB2aWRlb1RleHR1cmU3ID0gdmlkZW9UZXh0dXJlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgODpcclxuICAgICAgICAgICAgICAgIHZpZGVvVGV4dHVyZTggPSB2aWRlb1RleHR1cmU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA5OlxyXG4gICAgICAgICAgICAgICAgdmlkZW9UZXh0dXJlOSA9IHZpZGVvVGV4dHVyZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDEwOlxyXG4gICAgICAgICAgICAgICAgdmlkZW9UZXh0dXJlMTAgPSB2aWRlb1RleHR1cmU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxMTpcclxuICAgICAgICAgICAgICAgIHZpZGVvVGV4dHVyZTExID0gdmlkZW9UZXh0dXJlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTI6XHJcbiAgICAgICAgICAgICAgICB2aWRlb1RleHR1cmUxMiA9IHZpZGVvVGV4dHVyZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDEzOlxyXG4gICAgICAgICAgICAgICAgdmlkZW9UZXh0dXJlMTMgPSB2aWRlb1RleHR1cmU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxNDpcclxuICAgICAgICAgICAgICAgIHZpZGVvVGV4dHVyZTE0ID0gdmlkZW9UZXh0dXJlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7Ki9cclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHR9XHJcbn0iXX0=
