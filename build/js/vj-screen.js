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
	console.log(e.keyCode);
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
	video = document.createElement("video");
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
	(function () {
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
		requestAnimationFrame(arguments.callee);
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzXFx2ai1zY3JlZW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBO0FBQ0EsSUFBSSxDQUFKO0FBQ0EsSUFBSSxJQUFFLElBQUksS0FBSixFQUFOO0FBQ0EsSUFBSSxLQUFHLEVBQUUsUUFBRixDQUFXLEVBQUUsTUFBRixFQUFYLENBQVA7QUFDQSxJQUFJLE1BQUo7QUFDQSxJQUFJLE1BQUo7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkE7QUFDQSxJQUFJLFdBQVMsQ0FBYjtBQUNBLElBQUksZUFBYSxDQUFqQjs7QUFFQTtBQUNBLElBQUksWUFBSjtBQUNBLElBQUksTUFBSjtBQUNBLElBQUksUUFBSjtBQUNBLElBQUksU0FBSjs7QUFFQSxJQUFJLFdBQVMsS0FBYjtBQUNBLElBQUksUUFBTSxHQUFWO0FBQ0E7QUFDQSxTQUFTLFNBQVQsQ0FBbUIsQ0FBbkIsRUFBcUI7QUFDcEIsS0FBSSxLQUFHLEVBQUUsS0FBVDtBQUNBLEtBQUksS0FBRyxFQUFFLE1BQVQ7QUFDQSxLQUFJLEtBQUcsSUFBRSxLQUFLLElBQUwsQ0FBVSxLQUFHLEVBQUgsR0FBTSxLQUFHLEVBQW5CLENBQVQ7QUFDQSxLQUFJLElBQUUsRUFBRSxPQUFGLEdBQVUsRUFBRSxVQUFaLEdBQXVCLEtBQUcsR0FBaEM7QUFDQSxLQUFJLElBQUUsRUFBRSxPQUFGLEdBQVUsRUFBRSxTQUFaLEdBQXNCLEtBQUcsR0FBL0I7QUFDQSxLQUFJLEtBQUcsS0FBSyxJQUFMLENBQVUsSUFBRSxDQUFGLEdBQUksSUFBRSxDQUFoQixDQUFQO0FBQ0EsS0FBSSxJQUFFLEtBQUcsR0FBSCxHQUFPLEtBQUssRUFBWixHQUFlLEVBQXJCO0FBQ0EsS0FBRyxNQUFJLENBQVAsRUFBUztBQUNSLE9BQUcsSUFBRSxFQUFMO0FBQ0EsT0FBRyxFQUFIO0FBQ0EsT0FBRyxF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QTdCO0FBQ0EsS0FBRyxVQUFILENBQWMsR0FBRyxVQUFqQixFQUE0QixDQUE1QixFQUE4QixHQUFHLElBQWpDLEVBQXNDLEdBQUcsSUFBekMsRUFBOEMsR0FBRyxhQUFqRCxFQUErRCxPQUEvRDtBQUNBLEtBQUcsYUFBSCxDQUFpQixHQUFHLFVBQXBCLEVBQStCLEdBQUcsa0JBQWxDLEVBQXFELEdBQUcsTUFBeEQ7QUFDQSxLQUFHLGFBQUgsQ0FBaUIsR0FBRyxVQUFwQixFQUErQixHQUFHLGtCQUFsQyxFQUFxRCxHQUFHLE1BQXhEO0FBQ0EsS0FBRyxhQUFILENBQWlCLEdBQUcsVUFBcEIsRUFBK0IsR0FBRyxjQUFsQyxFQUFpRCxHQUFHLGFBQXBEO0FBQ0EsS0FBRyxhQUFILENBQWlCLEdBQUcsVUFBcEIsRUFBK0IsR0FBRyxjQUFsQyxFQUFpRCxHQUFHLGFBQXBEOztBQUVBLEtBQUcsV0FBSCxDQUFlLEdBQUcsVUFBbEIsRUFBNkIsSUFBN0I7QUFDTSxVQUFPLE9BQVA7QUFDSSxRQUFLLENBQUw7QUFDSSxvQkFBZ0IsWUFBaEI7QUFDQTtBQUNKLFFBQUssQ0FBTDtBQUNJLG9CQUFnQixZQUFoQjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQ0o7QUFDSTtBQTdDUjtBQStDTjtBQUNEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vY2FuYXZz44Go44Kv44Kp44O844K/44OL44Kq44Oz44CB44OT44OH44Kq44Ko44Os44Oh44Oz44OI44KS44Kw44Ot44O844OQ44Or44Gr5omx44GGXHJcbnZhciBjO1xyXG52YXIgcT1uZXcgcXRuSVYoKTtcclxudmFyIHF0PXEuaWRlbnRpdHkocS5jcmVhdGUoKSk7XHJcbnZhciB2aWRlbzE7XHJcbnZhciB2aWRlbzI7XHJcbi8qXHJcbnZhciB2aWRlbzM7XHJcblxyXG52YXIgdmlkZW80O1xyXG52YXIgdmlkZW81O1xyXG52YXIgdmlkZW82O1xyXG52YXIgdmlkZW83O1xyXG52YXIgdmlkZW84O1xyXG52YXIgdmlkZW85O1xyXG52YXIgdmlkZW8xMDtcclxudmFyIHZpZGVvMTE7XHJcbnZhciB2aWRlbzEyO1xyXG5cclxudmFyIHZpZGVvMTM7XHJcbnZhciB2aWRlbzE0O1xyXG4qL1xyXG5cclxuLy/jg5Pjg4fjgqrjgpLjg63jg7zjg4njgZfjgZ/mlbDjgpLmlbDjgYjjgotcclxudmFyIGxvYWRfbnVtPTA7XHJcbnZhciBzZWxlY3RfdmlkZW89MTtcclxuXHJcbi8vYXVkaW/plqLpgKNcclxudmFyIEF1ZGlvY29udGV4dDtcclxudmFyIHNvdXJjZTtcclxudmFyIGFuYWx5c2VyO1xyXG52YXIgZnJlcXVlbmN5O1xyXG5cclxudmFyIGZmdF9mbGFnPWZhbHNlO1xyXG52YXIgc3BlZWQ9MC4wO1xyXG4vL+ODnuOCpuOCueODoOODvOODluOCpOODmeODs+ODiOOBq+eZu+mMsuOBmeOCi+WHpueQhlxyXG5mdW5jdGlvbiBtb3VzZU1vdmUoZSl7XHJcblx0dmFyIGN3PWMud2lkdGg7XHJcblx0dmFyIGNoPWMuaGVpZ2h0O1xyXG5cdHZhciB3aD0xL01hdGguc3FydChjdypjdytjaCpjaCk7XHJcblx0dmFyIHg9ZS5jbGllbnRYLWMub2Zmc2V0TGVmdC1jdyowLjU7XHJcblx0dmFyIHk9ZS5jbGllbnRZLWMub2Zmc2V0VG9wLWNoKjAuNTtcclxuXHR2YXIgc3E9TWF0aC5zcXJ0KHgqeCt5KnkpO1xyXG5cdHZhciByPXNxKjIuMCpNYXRoLlBJKndoO1xyXG5cdGlmKHNxIT0xKXtcclxuXHRcdHNxPTEvc3E7XHJcblx0XHR4Kj1zcTtcclxuXHRcdHkqPXNxO1xyXG5cdH1cclxuXHRxLnJvdGF0ZShyLFt5LHgsMC4wXSxxdCk7XHJcbn1cclxuXHJcbi8v44Oc44K/44Oz44KS44GK44GX44Gf44GL44Gp44GG44GLXHJcbmZ1bmN0aW9uIEtleURvd24oZSl7XHJcblx0Y29uc29sZS5sb2coZS5rZXlDb2RlKTtcclxuXHRpZihlLmtleUNvZGU9PTQ5KXtcclxuXHRcdC8vMeOCkuaKvOOBl+OBn+OCiVxyXG5cdFx0dmlkZW8xLnBsYXkoKTtcclxuXHRcdHNlbGVjdF92aWRlbz0xO1xyXG5cdH1lbHNlIGlmKGUua2V5Q29kZT09NTApe1xyXG5cdFx0Ly8y44KS5oq844GX44Gf44KJXHJcblx0XHR2aWRlbzIucGxheSgpO1xyXG5cdFx0c2VsZWN0X3ZpZGVvPTI7XHJcblx0fVxyXG4vKlxyXG5cdGVsc2UgaWYoZS5rZXlDb2RlPT01MSl7XHJcblx0XHR2aWRlbzMucGxheSgpO1xyXG5cdFx0c2VsZWN0X3ZpZGVvPTM7XHJcblx0fWVsc2UgaWYoZS5rZXlDb2RlPT01Mil7XHJcblx0XHR2aWRlbzQucGxheSgpO1xyXG5cdFx0c2VsZWN0X3ZpZGVvPTQ7XHJcblx0fWVsc2UgaWYoZS5rZXlDb2RlPT01Myl7XHJcblx0XHR2aWRlbzUucGxheSgpO1xyXG5cdFx0c2VsZWN0X3ZpZGVvPTU7XHJcblx0fWVsc2UgaWYoZS5rZXlDb2RlPT01NCl7XHJcblx0XHR2aWRlbzYucGxheSgpO1xyXG5cdFx0c2VsZWN0X3ZpZGVvPTY7XHJcblx0fWVsc2UgaWYoZS5rZXlDb2RlPT01NSl7XHJcblx0XHR2aWRlbzcucGxheSgpO1xyXG5cdFx0c2VsZWN0X3ZpZGVvPTc7XHJcblx0fWVsc2UgaWYoZS5rZXlDb2RlPT01Nil7XHJcblx0XHR2aWRlbzgucGxheSgpO1xyXG5cdFx0c2VsZWN0X3ZpZGVvPTg7XHJcblx0fWVsc2UgaWYoZS5rZXlDb2RlPT01Nyl7XHJcblx0XHR2aWRlbzkucGxheSgpO1xyXG5cdFx0c2VsZWN0X3ZpZGVvPTk7XHJcblx0fWVsc2UgaWYoZS5rZXlDb2RlPT00OCl7XHJcblx0XHR2aWRlbzEwLnBsYXkoKTtcclxuXHRcdHNlbGVjdF92aWRlbz0xMDtcclxuXHR9ZWxzZSBpZihlLmtleUNvZGU9PTgxKXtcclxuXHRcdC8vceODnOOCv+ODs1xyXG5cdFx0dmlkZW8xMS5wbGF5KCk7XHJcblx0XHRzZWxlY3RfdmlkZW89MTE7XHJcblx0fWVsc2UgaWYoZS5rZXlDb2RlPT04Nyl7XHJcblx0XHQvL3fjg5zjgr/jg7NcclxuXHRcdHZpZGVvMTIucGxheSgpO1xyXG5cdFx0c2VsZWN0X3ZpZGVvPTEyO1xyXG5cdH1lbHNlIGlmKGUua2V5Q29kZT09Njkpe1xyXG5cdFx0Ly9l44Oc44K/44OzXHJcblx0XHR2aWRlbzEzLnBsYXkoKTtcclxuXHRcdHNlbGVjdF92aWRlbz0xMztcclxuXHR9ZWxzZSBpZihlLmtleUNvZGU9PTgyKXtcclxuXHRcdC8vcuODnOOCv+ODs1xyXG5cdFx0dmlkZW8xNC5wbGF5KCk7XHJcblx0XHRzZWxlY3RfdmlkZW89MTQ7XHJcblx0fVxyXG4qL1xyXG5cdC8vc+ODnOOCv+ODs+OBrzgzXHJcblx0aWYoZS5rZXlDb2RlPT04MyYmZmZ0X2ZsYWc9PWZhbHNlKXtcclxuXHRcdGZmdF9mbGFnPXRydWU7XHJcblx0fWVsc2UgaWYoZS5rZXlDb2RlPT04MyYmZmZ0X2ZsYWc9PXRydWUpe1xyXG5cdFx0ZmZ0X2ZsYWc9ZmFsc2U7XHJcblx0fVxyXG5cdC8v44K544Oa44O844K544GvMzJcclxuXHRpZihlLmtleUNvZGU9PTMyKXtcclxuXHRcdGlmKHNwZWVkPT0yMC4wKXtcclxuXHRcdFx0c3BlZWQ9MC4wO1xyXG5cdFx0fVxyXG5cdFx0c3BlZWQrPTEuMDtcclxuXHRcdGNvbnNvbGUubG9nKHNwZWVkKTtcclxuXHR9XHJcbn1cclxuLy/lho3nlJ/lj6/og73jgarjg5Pjg4fjgqrjgr/jgqTjg5fjgpLoqr/jgbnjgotcclxuZnVuY3Rpb24gY2hlY2tWaWRlb1R5cGUoX3ZpZGVvKXtcclxuXHRpZihfdmlkZW8uY2FuUGxheVR5cGUoXCJ2aWRlby9naWZcIik9PT0nbWF5YmUnKXtcclxuXHRcdHJldHVybiAnZ2lmJztcclxuXHR9ZWxzZSBpZihfdmlkZW8uY2FuUGxheVR5cGUoXCJ2aWRlby9tcDRcIik9PT0nbWF5YmUnKXtcclxuXHRcdHJldHVybiAnbXA0JztcclxuXHR9ZWxzZXtcclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxufVxyXG5cclxub25sb2FkPWZ1bmN0aW9uKCl7XHJcblx0bmF2aWdhdG9yLmdldE1lZGlhPW5hdmlnYXRvci5nZXRVc2VyTWVkaWF8fFxyXG5cdG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWF8fFxyXG5cdG5hdmlnYXRvci5tb3pHZXRVc2VyTWVkaWF8fFxyXG5cdG5hdmlnYXRvci5tc0dldFVzZXJNZWRpYTtcclxuXHJcblx0Ly/nq6/mnKvjga7jg5Pjg4fjgqrjgIHpn7Plo7Djgrnjg4jjg6rjg7zjg6DjgpLmiYDlvpdcclxuXHRuYXZpZ2F0b3IuZ2V0TWVkaWEoe2F1ZGlvOnRydWV9LFxyXG5cdFx0ZnVuY3Rpb24oc3RyZWFtKXtcclxuXHRcdFx0dmFyIGFuaW1hdGlvbklkO1xyXG5cdFx0XHRBdWRpb2NvbnRleHQ9bmV3IHdlYmtpdEF1ZGlvQ29udGV4dCgpO1xyXG5cdFx0XHQvL+ODnuOCpOOCr+mfs+WjsOOBruaJgOW+l1xyXG5cdFx0XHRzb3VyY2U9QXVkaW9jb250ZXh0LmNyZWF0ZU1lZGlhU3RyZWFtU291cmNlKHN0cmVhbSk7XHJcblx0XHRcdC8v44Ki44OK44Op44Kk44K244O8XHJcblx0XHRcdGFuYWx5c2VyPUF1ZGlvY29udGV4dC5jcmVhdGVBbmFseXNlcigpO1xyXG5cclxuXHRcdFx0Ly/pq5jpgJ/jg5Xjg7zjg6rjgqjlpInmj5vjga7jg4fjg7zjgr/jgrXjgqTjgrpcclxuXHRcdFx0YW5hbHlzZXIuZmZ0U2l6ZT0yMDQ4O1xyXG5cdFx0XHQvL+aMr+W5heOCueODmuOCr+ODiOODq+OBjOWFpeOBo+OBpuOBhOOCi+mFjeWIl1xyXG5cdFx0XHRmcmVxdWVuY3k9bmV3IFVpbnQ4QXJyYXkoYW5hbHlzZXIuZnJlcXVlbmN5QmluQ291bnQpO1xyXG5cdFx0XHQvL+OBiuOBneOCieOBj+mfs+WjsOODh+ODvOOCv+OBqOOCouODiuODqeOCpOOCtuODvOOCkuOBj+OBo+OBpOOBkeOCi1xyXG5cdFx0XHRzb3VyY2UuY29ubmVjdChhbmFseXNlcik7XHJcblx0XHRcdGluaXQoKTtcclxuXHJcblx0fSxmdW5jdGlvbihlcnIpe1xyXG5cdFx0Ly/jgqjjg6njg7zlh6bnkIZcclxuXHR9KTtcclxuXHJcblxyXG5cdHZhciBzb2NrZXQgPWlvKCk7XHJcblx0Ly/jgrXjg7zjg5Djg7zjgYvjgonjg4fjg7zjgr/jgpLlj5fjgZHlj5bjgotcclxuXHRzb2NrZXQub24oXCJ2akFjdGlvbkZyb21TZXJ2ZXJcIixmdW5jdGlvbihtc2cpe1xyXG5cdFx0JCgnI21lc3NhZ2VzJykuYXBwZW5kKCQoJzxsaT4nKS50ZXh0KG1zZykpO1xyXG5cdFx0aWYobXNnPT0xKXtcclxuXHRcdFx0dmlkZW8xLnBsYXkoKTtcclxuXHRcdFx0c2VsZWN0X3ZpZGVvPTE7XHJcblx0XHR9ZWxzZSBpZihtc2c9PTIpe1xyXG5cdFx0XHR2aWRlbzIucGxheSgpO1xyXG5cdFx0XHRzZWxlY3RfdmlkZW89MjtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5mdW5jdGlvbiBpbml0KCl7XHJcblx0Ly9jYW52YXPjgqjjg6zjg6Hjg7Pjg4jjgpLmiYDlvpdcclxuXHRjPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpO1xyXG5cdGMud2lkdGg9NzIwO1xyXG5cdGMuaGVpZ2h0PTQ4MDtcclxuLy9cdGMud2lkdGg9d2luZG93LmlubmVyV2lkdGg7XHJcbi8vXHRjLmhlaWdodD13aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG5cdHZpZGVvMT12aWRlb19jcmVhdGUoXCIuLi9pbWcvb3JpZ2luYWwuXCIpO1xyXG5cdHZpZGVvMj12aWRlb19jcmVhdGUoXCIuLi9pbWcvaGFuZC5cIik7XHJcblx0LypcclxuXHR2aWRlbzM9dmlkZW9fY3JlYXRlKFwicG9rZW1vbi5cIik7XHJcblx0dmlkZW80PXZpZGVvX2NyZWF0ZShcImNhcmRjYXB0ZXIyLlwiKTtcclxuXHR2aWRlbzU9dmlkZW9fY3JlYXRlKFwiY2FyZGNhcHRlcjMuXCIpO1xyXG5cdHZpZGVvNj12aWRlb19jcmVhdGUoXCJjYXJkY2FwdGVyNC5cIik7XHJcblx0dmlkZW83PXZpZGVvX2NyZWF0ZShcImRhbnNoaS5cIik7XHJcblx0dmlkZW84PXZpZGVvX2NyZWF0ZShcImdpcGh5LlwiKTtcclxuXHR2aWRlbzk9dmlkZW9fY3JlYXRlKFwibWFnaWMuXCIpO1xyXG5cdHZpZGVvMTA9dmlkZW9fY3JlYXRlKFwibmljaGlqby5cIik7XHJcblx0dmlkZW8xMT12aWRlb19jcmVhdGUoXCJvc28uXCIpO1xyXG5cdHZpZGVvMTI9dmlkZW9fY3JlYXRlKFwib3NvMi5cIik7XHJcblx0dmlkZW8xMz12aWRlb19jcmVhdGUoXCJTYWlsb3Jtb29uLlwiKTtcclxuXHR2aWRlbzE0PXZpZGVvX2NyZWF0ZShcIlNhaWxvcm1vb24yLlwiKTtcclxuKi9cclxuXHJcblx0dmlkZW9fYWN0aW9ucyh2aWRlbzEpO1xyXG5cdHZpZGVvX2FjdGlvbnModmlkZW8yKTtcclxuXHQvKlxyXG5cdHZpZGVvX2FjdGlvbnModmlkZW8zKTtcclxuXHR2aWRlb19hY3Rpb25zKHZpZGVvNCk7XHJcblx0dmlkZW9fYWN0aW9ucyh2aWRlbzUpO1xyXG5cdHZpZGVvX2FjdGlvbnModmlkZW82KTtcclxuXHR2aWRlb19hY3Rpb25zKHZpZGVvNyk7XHJcblx0dmlkZW9fYWN0aW9ucyh2aWRlbzgpO1xyXG5cdHZpZGVvX2FjdGlvbnModmlkZW85KTtcclxuXHR2aWRlb19hY3Rpb25zKHZpZGVvMTApO1xyXG5cdHZpZGVvX2FjdGlvbnModmlkZW8xMSk7XHJcblx0dmlkZW9fYWN0aW9ucyh2aWRlbzEyKTtcclxuXHR2aWRlb19hY3Rpb25zKHZpZGVvMTMpO1xyXG5cdHZpZGVvX2FjdGlvbnModmlkZW8xNCk7XHJcbiovXHJcblx0XHQvL+ODnOOCv+ODs+OCkuaKvOOBl+OBn+OBi+OBqeOBhuOBi1xyXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIgLCBLZXlEb3duKTtcclxufVxyXG5mdW5jdGlvbiB2aWRlb19hY3Rpb25zKF92aWRlbyl7XHJcblx0X3ZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoXCJjYW5wbGF5dGhyb3VnaFwiLGZ1bmN0aW9uKCl7XHJcblx0XHRhY3Rpb24oKTtcclxuXHR9LHRydWUpO1xyXG5cdF92aWRlby5hZGRFdmVudExpc3RlbmVyKFwiZW5kZWRcIixmdW5jdGlvbigpe1xyXG5cdFx0X3ZpZGVvLnBsYXkoKTtcclxuXHR9LHRydWUpO1xyXG5cclxufVxyXG5mdW5jdGlvbiBhY3Rpb24oKXtcclxuXHRsb2FkX251bSsrO1xyXG5cdC8qXHJcblx0aWYobG9hZF9udW09PTE0KXtcclxuXHRcdHJlbmRlcigpO1xyXG5cdH0qL1xyXG5cdGlmKGxvYWRfbnVtPT0yKXtcclxuXHRcdHJlbmRlcigpO1xyXG5cdH1cclxufVxyXG5mdW5jdGlvbiB2aWRlb19jcmVhdGUoX3NyYyl7XHJcblx0Ly/jg5Pjg4fjgqrjgqjjg6zjg6Hjg7Pjg4jjgpLnlJ/miJBcclxuXHR2aWRlbz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidmlkZW9cIik7XHJcblx0Ly/jg5Pjg4fjgqrjgr/jgqTjg5fjga7jg4Hjgqfjg4Pjgq9cclxuXHR2YXIgdmlkZW9FeHQ9Y2hlY2tWaWRlb1R5cGUodmlkZW8pO1xyXG5cdGlmKHZpZGVvRXh0PT09bnVsbCl7XHJcblx0XHRhbGVydChcIm5vdCBzdXBwb3J0ZWRcIik7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdC8v44K944O844K544Gu6Kqt44G/6L6844G/XHJcblx0dmlkZW8uc3JjPV9zcmMrdmlkZW9FeHQ7XHJcblx0cmV0dXJuIHZpZGVvO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXIoKXtcclxuXHQvL+ODk+ODh+OCqu+8keOCkuWGjeeUn1xyXG5cdHZpZGVvMS5wbGF5KCk7XHJcblx0Yy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsbW91c2VNb3ZlLHRydWUpO1xyXG5cdHZhciBnbD1jLmdldENvbnRleHQoXCJ3ZWJnbFwiKXx8Yy5nZXRDb250ZXh0KFwiZXhwZXJpbWVudGFsLXdlYmdsXCIpO1xyXG5cclxuXHR2YXIgdl9zaGFkZXI9Y3JlYXRlX3NoYWRlcihcInZzXCIpO1xyXG5cdHZhciBmX3NoYWRlcj1jcmVhdGVfc2hhZGVyKFwiZnNcIik7XHJcblxyXG5cdHZhciBwcmc9Y3JlYXRlX3Byb2dyYW0odl9zaGFkZXIsZl9zaGFkZXIpO1xyXG5cdHZhciBhdHRMb2NhdGlvbj1uZXcgQXJyYXkoKTtcclxuXHRhdHRMb2NhdGlvblswXT1nbC5nZXRBdHRyaWJMb2NhdGlvbihwcmcsXCJwb3NpdGlvblwiKTtcclxuXHRhdHRMb2NhdGlvblsxXT1nbC5nZXRBdHRyaWJMb2NhdGlvbihwcmcsXCJjb2xvclwiKTtcclxuXHRhdHRMb2NhdGlvblsyXT1nbC5nZXRBdHRyaWJMb2NhdGlvbihwcmcsXCJ0ZXh0dXJlQ29vcmRcIik7XHJcblx0YXR0TG9jYXRpb25bM109Z2wuZ2V0QXR0cmliTG9jYXRpb24ocHJnLFwiaW5zdGFuY2VQb3NpdGlvblwiKTtcclxuXHJcblx0dmFyIGF0dFN0cmlkZT1uZXcgQXJyYXkoKTtcclxuXHRhdHRTdHJpZGVbMF09MztcclxuXHRhdHRTdHJpZGVbMV09NDtcclxuXHRhdHRTdHJpZGVbMl09MjtcclxuXHRhdHRTdHJpZGVbM109MztcclxuXHJcblx0dmFyIHVuaUxvY2F0aW9uPW5ldyBBcnJheSgpO1xyXG5cdHVuaUxvY2F0aW9uWzBdPWdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcmcsXCJtdnBNYXRyaXhcIik7XHJcblx0dW5pTG9jYXRpb25bMV09Z2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByZyxcInRleHR1cmVcIik7XHJcblxyXG5cdC8v44Kt44Ol44O844OW44OH44O844K/XHJcblx0dmFyIGN1YmVEYXRhPWN1YmUoMSxbMS4wLDEuMCwxLjAsMS4wXSk7XHJcblx0dmFyIGNQb3NpdGlvbj1jcmVhdGVfdmJvKGN1YmVEYXRhLnApO1xyXG5cdHZhciBjQ29sb3I9Y3JlYXRlX3ZibyhjdWJlRGF0YS5jKTtcclxuXHR2YXIgY1RleHR1cmVDb29yZD1jcmVhdGVfdmJvKGN1YmVEYXRhLnQpO1xyXG5cdHZhciBjVkJPTGlzdD1bY1Bvc2l0aW9uLGNDb2xvcixjVGV4dHVyZUNvb3JkXTtcclxuXHR2YXIgY0luZGV4PWNyZWF0ZV9pYm8oY3ViZURhdGEuaSk7XHJcblx0Lyrmi6HlvLXmqZ/og73jgpLmnInlirnljJYqL1xyXG5cdHZhciBleHQ7XHJcblx0ZXh0PWdsLmdldEV4dGVuc2lvbihcIkFOR0xFX2luc3RhbmNlZF9hcnJheXNcIik7XHJcblx0aWYoZXh0PT1udWxsKXtcclxuXHRcdGFsZXJ0KFwiQU5HTEVfaW5zdGFuY2VkX2FycmF5cyBub3Qgc3VwcG9ydGVkXCIpO1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0Ly/lkITjgqTjg7Pjgrnjgr/jg7PjgrnjgavpgannlKjjgZnjgovjg4fjg7zjgr9cclxuXHJcblx0Ly/jgqTjg7Pjgrnjgr/jg7Pjgrnjga7mlbBcclxuXHR2YXIgaW5zdGFuY2VDb3VudD0xMjU7XHJcblxyXG5cdC8v44Kk44Oz44K544K/44Oz44K555So6YWN5YiXXHJcblx0dmFyIGluc3RhbmNlUG9zaXRpb25zPW5ldyBBcnJheSgpO1xyXG5cclxuXHQvL+mFjeWIl+eUqOOBruOCueODiOODqeOCpOODiVxyXG5cdHZhciBvZmZzZXRQb3NpdGlvbj0zO1xyXG5cclxuXHRmb3IodmFyIGk9MDtpPGluc3RhbmNlQ291bnQ7aSsrKXtcclxuXHRcdGluc3RhbmNlUG9zaXRpb25zW2kqb2Zmc2V0UG9zaXRpb25dPS0oaSU1LjApKjEuNSswLjA7XHJcblx0XHRpbnN0YW5jZVBvc2l0aW9uc1tpKm9mZnNldFBvc2l0aW9uKzFdPShNYXRoLmZsb29yKGkvNS4wKSU1LjApKjEuNSswLjA7XHJcblx0XHRpbnN0YW5jZVBvc2l0aW9uc1tpKm9mZnNldFBvc2l0aW9uKzJdPU1hdGguZmxvb3IoaS8yNS4wKSoxLjUrMC4wO1xyXG5cdH1cclxuXHJcblx0Ly/phY3liJfjgYvjgolWQk/jgpLnlJ/miJBcclxuXHR2YXIgaVBvc2l0aW9uPWNyZWF0ZV92Ym8oaW5zdGFuY2VQb3NpdGlvbnMpO1xyXG5cclxuXHQvL+ODiOODvOODqeOCueOBrmF0dHJpYnV0ZemWoumAo1xyXG5cdHNldF9hdHRyaWJ1dGUoY1ZCT0xpc3QsYXR0TG9jYXRpb24sYXR0U3RyaWRlKTtcclxuXHRnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLGNJbmRleCk7XHJcblxyXG5cdC8v44Kk44Oz44K544K/44Oz44K555So44Gu5bqn5qiZ5L2N572uVkJP44KS5pyJ5Yq544Gr44GZ44KLXHJcblx0Z2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsaVBvc2l0aW9uKTtcclxuXHRnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShhdHRMb2NhdGlvblszXSk7XHJcblx0Z2wudmVydGV4QXR0cmliUG9pbnRlcihhdHRMb2NhdGlvblszXSxhdHRTdHJpZGVbM10sZ2wuRkxPQVQsZmFsc2UsMCwwKTtcclxuXHQvL+OCpOODs+OCueOCv+ODs+OCueeUqOOBruacieWKueWMluOBl+mZpOaVsOOCkuaMh+WumuOBmeOCi1xyXG5cdGV4dC52ZXJ0ZXhBdHRyaWJEaXZpc29yQU5HTEUoYXR0TG9jYXRpb25bM10sMSk7XHJcblx0Ly/lkITnqK7ooYzliJfjga7nlJ/miJDjgajliJ3mnJ/ljJZcclxuXHR2YXIgbT1uZXcgbWF0SVYoKTtcclxuXHR2YXIgbU1hdHJpeD1tLmlkZW50aXR5KG0uY3JlYXRlKCkpO1xyXG5cdHZhciB2TWF0cml4PW0uaWRlbnRpdHkobS5jcmVhdGUoKSk7XHJcblx0dmFyIHBNYXRyaXg9bS5pZGVudGl0eShtLmNyZWF0ZSgpKTtcclxuXHR2YXIgdG1wTWF0cml4PW0uaWRlbnRpdHkobS5jcmVhdGUoKSk7XHJcblx0dmFyIG12cE1hdHJpeD1tLmlkZW50aXR5KG0uY3JlYXRlKCkpO1xyXG5cdHZhciBpbnZNYXRyaXg9bS5pZGVudGl0eShtLmNyZWF0ZSgpKTtcclxuXHJcblx0Z2wuZW5hYmxlKGdsLkRFUFRIX1RFU1QpO1xyXG5cdGdsLmRlcHRoRnVuYyhnbC5MRVFVQUwpO1xyXG5cdGdsLmVuYWJsZShnbC5DVUxMX0ZBQ0UpO1xyXG5cclxuXHJcblx0Z2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMCk7XHJcblxyXG5cdHZhciB2aWRlb1RleHR1cmUxPW51bGw7XHJcblx0dmFyIHZpZGVvVGV4dHVyZTI9bnVsbDtcclxuXHQvKlxyXG5cdHZhciB2aWRlb1RleHR1cmUzPW51bGw7XHJcblx0dmFyIHZpZGVvVGV4dHVyZTQ9bnVsbDtcclxuXHR2YXIgdmlkZW9UZXh0dXJlNT1udWxsO1xyXG5cdHZhciB2aWRlb1RleHR1cmU2PW51bGw7XHJcblx0dmFyIHZpZGVvVGV4dHVyZTc9bnVsbDtcclxuXHR2YXIgdmlkZW9UZXh0dXJlOD1udWxsO1xyXG5cdHZhciB2aWRlb1RleHR1cmU5PW51bGw7XHJcblx0dmFyIHZpZGVvVGV4dHVyZTEwPW51bGw7XHJcblx0dmFyIHZpZGVvVGV4dHVyZTExPW51bGw7XHJcblx0dmFyIHZpZGVvVGV4dHVyZTEyPW51bGw7XHJcblx0dmFyIHZpZGVvVGV4dHVyZTEzPW51bGw7XHJcblx0dmFyIHZpZGVvVGV4dHVyZTE0PW51bGw7XHJcbiovXHJcblxyXG5cdGNyZWF0ZV90ZXh0dXJlVmlkZW8odmlkZW8xLDEpO1xyXG5cdGNyZWF0ZV90ZXh0dXJlVmlkZW8odmlkZW8yLDIpO1xyXG4vKlxyXG5cdGNyZWF0ZV90ZXh0dXJlVmlkZW8odmlkZW8zLDMpO1xyXG5cdGNyZWF0ZV90ZXh0dXJlVmlkZW8odmlkZW80LDQpO1xyXG5cdGNyZWF0ZV90ZXh0dXJlVmlkZW8odmlkZW81LDUpO1xyXG5cdGNyZWF0ZV90ZXh0dXJlVmlkZW8odmlkZW82LDYpO1xyXG5cdGNyZWF0ZV90ZXh0dXJlVmlkZW8odmlkZW83LDcpO1xyXG5cdGNyZWF0ZV90ZXh0dXJlVmlkZW8odmlkZW84LDgpO1xyXG5cdGNyZWF0ZV90ZXh0dXJlVmlkZW8odmlkZW85LDkpO1xyXG5cdGNyZWF0ZV90ZXh0dXJlVmlkZW8odmlkZW8xMCwxMCk7XHJcblx0Y3JlYXRlX3RleHR1cmVWaWRlbyh2aWRlbzExLDExKTtcclxuXHRjcmVhdGVfdGV4dHVyZVZpZGVvKHZpZGVvMTIsMTIpO1xyXG5cdGNyZWF0ZV90ZXh0dXJlVmlkZW8odmlkZW8xMywxMyk7XHJcblx0Y3JlYXRlX3RleHR1cmVWaWRlbyh2aWRlbzE0LDE0KTtcclxuKi9cclxuXHQvL+OCq+OCpuODs+OCv+OBruWuo+iogFxyXG5cdHZhciBjb3VudD0wO1xyXG5cdHZhciBjb3VudDI9MDtcclxuXHJcblx0Ly/mgZLluLjjg6vjg7zjg5dcclxuXHQoZnVuY3Rpb24oKXtcclxuXHRcdHZhciBzY2FsZVZhbHVlPTEuMDtcclxuXHRcdGlmKGZmdF9mbGFnPT10cnVlKXtcclxuXHRcdFx0YW5hbHlzZXIuZ2V0Qnl0ZUZyZXF1ZW5jeURhdGEoZnJlcXVlbmN5KTtcclxuXHRcdFx0Ly9jb25zb2xlLmxvZyhmcmVxdWVuY3lbNjBdKTtcclxuXHRcdFx0c2NhbGVWYWx1ZT1mcmVxdWVuY3lbNTBdLzUwMCswLjY7XHJcblx0XHR9XHJcblx0XHRjb3VudCsrO1xyXG5cdFx0aWYgKGNvdW50ICUgMTAgPT0gMCkge1xyXG5cdFx0ICAgIGNvdW50MisrO1xyXG5cdFx0fVxyXG5cdFx0aWYoc2VsZWN0X3ZpZGVvPT0xKXtcclxuXHRcdFx0Ly/jg4bjgq/jgrnjg4Hjg6PjgpLmm7TmlrDjgZnjgotcclxuXHRcdFx0Z2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCxudWxsKTtcclxuXHRcdFx0Z2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCx2aWRlb1RleHR1cmUxKTtcclxuXHRcdFx0Z2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELDAsZ2wuUkdCQSxnbC5SR0JBLGdsLlVOU0lHTkVEX0JZVEUsdmlkZW8xKTtcclxuXHRcdH1lbHNlIGlmKHNlbGVjdF92aWRlbz09Mil7XHJcblx0XHRcdC8v44OG44Kv44K544OB44Oj44KS5pu05paw44GZ44KLXHJcblx0XHRcdGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsbnVsbCk7XHJcblx0XHRcdGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsdmlkZW9UZXh0dXJlMik7XHJcblx0XHRcdGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwwLGdsLlJHQkEsZ2wuUkdCQSxnbC5VTlNJR05FRF9CWVRFLHZpZGVvMik7XHJcblx0XHR9XHJcblx0XHQvKlxyXG5cdFx0ZWxzZSBpZihzZWxlY3RfdmlkZW89PTMpe1xyXG5cdFx0XHRnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELG51bGwpO1xyXG5cdFx0XHRnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELHZpZGVvVGV4dHVyZTMpO1xyXG5cdFx0XHRnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsMCxnbC5SR0JBLGdsLlJHQkEsZ2wuVU5TSUdORURfQllURSx2aWRlbzMpO1xyXG5cdFx0fWVsc2UgaWYoc2VsZWN0X3ZpZGVvPT00KXtcclxuXHRcdFx0Z2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCxudWxsKTtcclxuXHRcdFx0Z2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCx2aWRlb1RleHR1cmU0KTtcclxuXHRcdFx0Z2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELDAsZ2wuUkdCQSxnbC5SR0JBLGdsLlVOU0lHTkVEX0JZVEUsdmlkZW80KTtcclxuXHRcdH1lbHNlIGlmKHNlbGVjdF92aWRlbz09NSl7XHJcblx0XHRcdGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsbnVsbCk7XHJcblx0XHRcdGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsdmlkZW9UZXh0dXJlNSk7XHJcblx0XHRcdGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwwLGdsLlJHQkEsZ2wuUkdCQSxnbC5VTlNJR05FRF9CWVRFLHZpZGVvNSk7XHJcblx0XHR9ZWxzZSBpZihzZWxlY3RfdmlkZW89PTYpe1xyXG5cdFx0XHRnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELG51bGwpO1xyXG5cdFx0XHRnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELHZpZGVvVGV4dHVyZTYpO1xyXG5cdFx0XHRnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsMCxnbC5SR0JBLGdsLlJHQkEsZ2wuVU5TSUdORURfQllURSx2aWRlbzYpO1xyXG5cdFx0fWVsc2UgaWYoc2VsZWN0X3ZpZGVvPT03KXtcclxuXHRcdFx0Z2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCxudWxsKTtcclxuXHRcdFx0Z2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCx2aWRlb1RleHR1cmU3KTtcclxuXHRcdFx0Z2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELDAsZ2wuUkdCQSxnbC5SR0JBLGdsLlVOU0lHTkVEX0JZVEUsdmlkZW83KTtcclxuXHRcdH1lbHNlIGlmKHNlbGVjdF92aWRlbz09OCl7XHJcblx0XHRcdGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsbnVsbCk7XHJcblx0XHRcdGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsdmlkZW9UZXh0dXJlOCk7XHJcblx0XHRcdGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwwLGdsLlJHQkEsZ2wuUkdCQSxnbC5VTlNJR05FRF9CWVRFLHZpZGVvOCk7XHJcblx0XHR9ZWxzZSBpZihzZWxlY3RfdmlkZW89PTkpe1xyXG5cdFx0XHRnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELG51bGwpO1xyXG5cdFx0XHRnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELHZpZGVvVGV4dHVyZTkpO1xyXG5cdFx0XHRnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsMCxnbC5SR0JBLGdsLlJHQkEsZ2wuVU5TSUdORURfQllURSx2aWRlbzkpO1xyXG5cdFx0fWVsc2UgaWYoc2VsZWN0X3ZpZGVvPT0xMCl7XHJcblx0XHRcdGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsbnVsbCk7XHJcblx0XHRcdGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsdmlkZW9UZXh0dXJlMTApO1xyXG5cdFx0XHRnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsMCxnbC5SR0JBLGdsLlJHQkEsZ2wuVU5TSUdORURfQllURSx2aWRlbzEwKTtcclxuXHRcdH1lbHNlIGlmKHNlbGVjdF92aWRlbz09MTEpe1xyXG5cdFx0XHRnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELG51bGwpO1xyXG5cdFx0XHRnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELHZpZGVvVGV4dHVyZTExKTtcclxuXHRcdFx0Z2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELDAsZ2wuUkdCQSxnbC5SR0JBLGdsLlVOU0lHTkVEX0JZVEUsdmlkZW8xMSk7XHJcblx0XHR9ZWxzZSBpZihzZWxlY3RfdmlkZW89PTEyKXtcclxuXHRcdFx0Z2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCxudWxsKTtcclxuXHRcdFx0Z2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCx2aWRlb1RleHR1cmUxMik7XHJcblx0XHRcdGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwwLGdsLlJHQkEsZ2wuUkdCQSxnbC5VTlNJR05FRF9CWVRFLHZpZGVvMTIpO1xyXG5cdFx0fWVsc2UgaWYoc2VsZWN0X3ZpZGVvPT0xMyl7XHJcblx0XHRcdGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsbnVsbCk7XHJcblx0XHRcdGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsdmlkZW9UZXh0dXJlMTMpO1xyXG5cdFx0XHRnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsMCxnbC5SR0JBLGdsLlJHQkEsZ2wuVU5TSUdORURfQllURSx2aWRlbzEzKTtcclxuXHRcdH1lbHNlIGlmKHNlbGVjdF92aWRlbz09MTQpe1xyXG5cdFx0XHRnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELG51bGwpO1xyXG5cdFx0XHRnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELHZpZGVvVGV4dHVyZTE0KTtcclxuXHRcdFx0Z2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELDAsZ2wuUkdCQSxnbC5SR0JBLGdsLlVOU0lHTkVEX0JZVEUsdmlkZW8xNCk7XHJcblx0XHR9Ki9cclxuXHJcblxyXG5cdFx0Ly/jg5Pjg6Xjg7zDl+ODl+ODreOCuOOCp+OCr+OCt+ODp+ODs+W6p+aomeWkieaPm+ihjOWIl1xyXG5cdFx0dmFyIGV5ZVBvc2l0aW9uPW5ldyBBcnJheSgpO1xyXG5cdFx0dmFyIGNhbVVwRGlyZWN0aW9uPW5ldyBBcnJheSgpO1xyXG5cdFx0cS50b1ZlY0lJSShbMC4wLDAuMCwxNS4wXSxxdCxleWVQb3NpdGlvbik7XHJcblx0XHRxLnRvVmVjSUlJKFswLjAsMS4wLDAuMF0scXQsY2FtVXBEaXJlY3Rpb24pO1xyXG5cdFx0bS5sb29rQXQoZXllUG9zaXRpb24sWzAuMCwwLjAsMC4wXSxjYW1VcERpcmVjdGlvbix2TWF0cml4KTtcclxuXHRcdG0ucGVyc3BlY3RpdmUoNDUsYy53aWR0aC9jLmhlaWdodCwwLjEsNTAuMCxwTWF0cml4KTtcclxuXHRcdG0ubXVsdGlwbHkocE1hdHJpeCx2TWF0cml4LHRtcE1hdHJpeCk7XHJcblxyXG5cdFx0Ly9jYW52YXPjgpLliJ3mnJ/ljJZcclxuXHRcdHZhciBoc3YgPSBoc3ZhKGNvdW50MiAlIDM2MCwgMSwgMSwgMSk7XHJcbiAgICAgICAgZ2wuY2xlYXJDb2xvcihoc3ZbMF0sIGhzdlsxXSwgaHN2WzJdLCBoc3ZbM10pO1xyXG5cdFx0Z2wuY2xlYXJEZXB0aCgxLjApO1xyXG5cdFx0Z2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVCB8IGdsLkRFUFRIX0JVRkZFUl9CSVQpO1xyXG5cclxuXHRcdC8v44Kt44Ol44O844OW44Gu44Os44Oz44K/44Oq44Oz44KwXHJcblx0XHRtLmlkZW50aXR5KG1NYXRyaXgpO1xyXG5cdFx0Ly9tLnJvdGF0ZShtTWF0cml4LChjb3VudCUzNjApKk1hdGguUEkvMTgwLFswLjAsMS4wLDAuMF0sbU1hdHJpeCk7XHJcblx0XHRtLnRyYW5zbGF0ZShtTWF0cml4LFswLjAsMC4wLHNwZWVkXSxtTWF0cml4KTtcclxuXHRcdG0uc2NhbGUobU1hdHJpeCxbc2NhbGVWYWx1ZSxzY2FsZVZhbHVlLHNjYWxlVmFsdWVdLG1NYXRyaXgpO1xyXG5cdFx0bS5yb3RhdGUobU1hdHJpeCxNYXRoLlBJLFswLjAsMC4wLDEuMF0sbU1hdHJpeCk7XHJcblx0XHRtLm11bHRpcGx5KHRtcE1hdHJpeCxtTWF0cml4LG12cE1hdHJpeCk7XHJcblx0XHRtLmludmVyc2UobU1hdHJpeCxpbnZNYXRyaXgpO1xyXG5cdFx0Z2wudW5pZm9ybU1hdHJpeDRmdih1bmlMb2NhdGlvblswXSxmYWxzZSxtdnBNYXRyaXgpO1xyXG5cdFx0Z2wudW5pZm9ybTFpKHVuaUxvY2F0aW9uWzFdLDApO1xyXG5cclxuXHRcdGV4dC5kcmF3RWxlbWVudHNJbnN0YW5jZWRBTkdMRShnbC5UUklBTkdMRVMsY3ViZURhdGEuaS5sZW5ndGgsZ2wuVU5TSUdORURfU0hPUlQsMCxpbnN0YW5jZUNvdW50KTtcclxuXHJcblx0XHRnbC5mbHVzaCgpO1xyXG5cdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFyZ3VtZW50cy5jYWxsZWUpO1xyXG5cdH0pKCk7XHJcblxyXG5cdC8v44K344Kn44O844OA44KS55Sf5oiQ44GZ44KL6Zai5pWwXHJcblx0ZnVuY3Rpb24gY3JlYXRlX3NoYWRlcihpZCl7XHJcblx0XHR2YXIgc2hhZGVyO1xyXG5cclxuXHRcdHZhciBzY3JpcHRFbGVtZW50PWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuXHJcblx0XHRpZighc2NyaXB0RWxlbWVudCl7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRzd2l0Y2goc2NyaXB0RWxlbWVudC50eXBlKXtcclxuXHRcdFx0Y2FzZSAneC1zaGFkZXIveC12ZXJ0ZXgnOlxyXG5cdFx0XHRzaGFkZXI9Z2wuY3JlYXRlU2hhZGVyKGdsLlZFUlRFWF9TSEFERVIpO1xyXG5cdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgJ3gtc2hhZGVyL3gtZnJhZ21lbnQnOlxyXG5cdFx0XHRzaGFkZXI9Z2wuY3JlYXRlU2hhZGVyKGdsLkZSQUdNRU5UX1NIQURFUik7XHJcblx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdsLnNoYWRlclNvdXJjZShzaGFkZXIsc2NyaXB0RWxlbWVudC50ZXh0KTtcclxuXHJcblx0XHRnbC5jb21waWxlU2hhZGVyKHNoYWRlcik7XHJcblx0XHQvL+OCt+OCp+ODvOODgOODvOOBjOato+OBl+OBj+OCs+ODs+ODkeOCpOODq+OBleOCjOOBn+OBi+ODgeOCp+ODg+OCr1xyXG5cdFx0aWYoZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlcixnbC5DT01QSUxFX1NUQVRVUykpe1xyXG5cdFx0XHRyZXR1cm4gc2hhZGVyO1xyXG5cdFx0fWVsc2V7XHJcblx0XHRcdGFsZXJ0KGdsLmdldFNoYWRlckluZm9Mb2coc2hhZGVyKSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBjcmVhdGVfcHJvZ3JhbSh2cyxmcyl7XHJcblx0XHQvL+ODl+ODreOCsOODqeODoOOCquODluOCuOOCp+OCr+ODiOOBrueUn+aIkFxyXG5cdFx0dmFyIHByb2dyYW09Z2wuY3JlYXRlUHJvZ3JhbSgpO1xyXG5cclxuXHRcdGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLHZzKTtcclxuXHRcdGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLGZzKTtcclxuXHJcblx0XHRnbC5saW5rUHJvZ3JhbShwcm9ncmFtKTtcclxuXHJcblx0XHRpZihnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sZ2wuTElOS19TVEFUVVMpKXtcclxuXHRcdFx0Ly/miJDlip/jgZfjgabjgYTjgZ/jgonjg5fjg63jgrDjg6njg6Djgqrjg5bjgrjjgqfjgq/jg4jjgpLmnInlirnjgavjgZnjgotcclxuXHRcdFx0Z2wudXNlUHJvZ3JhbShwcm9ncmFtKTtcclxuXHJcblx0XHRcdC8v44OX44Ot44Kw44Op44Og44Kq44OW44K444Kn44Kv44OI44KS6L+U44GX44Gm57WC5LqGXHJcblx0XHRcdHJldHVybiBwcm9ncmFtO1xyXG5cdFx0fWVsc2V7XHJcblx0XHRcdGFsZXJ0KGdsLmdldFByb2dyYW1JbmZvTG9nKHByb2dyYW0pKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vVkJP44KS55Sf5oiQ44GZ44KL6Zai5pWwXHJcblx0ZnVuY3Rpb24gY3JlYXRlX3ZibyhkYXRhKXtcclxuXHRcdHZhciB2Ym89Z2wuY3JlYXRlQnVmZmVyKCk7XHJcblx0XHQvL+ODkOODg+ODleOCoeOCkuODkOOCpOODs+ODiVxyXG5cdFx0Z2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsdmJvKTtcclxuXHRcdC8v44OQ44OD44OV44Kh44Gr44OH44O844K/44KS44K744OD44OIXHJcblx0XHRnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUixuZXcgRmxvYXQzMkFycmF5KGRhdGEpLGdsLlNUQVRJQ19EUkFXKTtcclxuXHRcdC8v44OQ44OD44OV44Kh44Gu44OQ44Kk44Oz44OJ44KS54Sh5Yq55YyWXHJcblx0XHRnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUixudWxsKTtcclxuXHJcblx0XHRyZXR1cm4gdmJvO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gc2V0X2F0dHJpYnV0ZSh2Ym8sYXR0TCxhdHRTKXtcclxuXHRcdC8v5byV5pWw44Go44GX44Gm5Y+X44GR5Y+W44Gj44Gf6YWN5YiX44KS5Yem55CG44GZ44KLXHJcblx0XHRmb3IodmFyIGkgaW4gdmJvKXtcclxuXHRcdFx0Z2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsdmJvW2ldKTtcclxuXHRcdFx0Ly9hdHRyaWJ1dGVMb2NhdGlvbuOCkuacieWKueOBq+OBmeOCi1xyXG5cdFx0XHRnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShhdHRMW2ldKTtcclxuXHRcdFx0Ly9hdHRyaWJ1dGVMb2NhdGlvbuOCkumAmuefpeOBl+eZu+mMslxyXG5cdFx0XHRnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGF0dExbaV0sYXR0U1tpXSxnbC5GTE9BVCxmYWxzZSwwLDApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRmdW5jdGlvbiBjcmVhdGVfaWJvKGRhdGEpe1xyXG5cdFx0dmFyIGlibz1nbC5jcmVhdGVCdWZmZXIoKTtcclxuXHRcdGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsaWJvKTtcclxuXHRcdGdsLmJ1ZmZlckRhdGEoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsbmV3IEludDE2QXJyYXkoZGF0YSksZ2wuU1RBVElDX0RSQVcpO1xyXG5cdFx0Z2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUixudWxsKTtcclxuXHRcdHJldHVybiBpYm87XHJcblx0fVxyXG5cdC8vdmlkZW/jga7jg4bjgq/jgrnjg4Hjg6PjgpLkvZzmiJBcclxuXHRmdW5jdGlvbiBjcmVhdGVfdGV4dHVyZVZpZGVvKF9zb3VyY2UsX251bWJlcil7XHJcblx0XHR2YXIgdmlkZW9UZXh0dXJlPWdsLmNyZWF0ZVRleHR1cmUoZ2wuVEVYVFVSRV8yRCk7XHJcblx0XHRnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELHZpZGVvVGV4dHVyZSk7XHJcblx0XHRnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsMCxnbC5SR0JBLGdsLlJHQkEsZ2wuVU5TSUdORURfQllURSxfc291cmNlKTtcclxuXHRcdGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCxnbC5URVhUVVJFX01BR19GSUxURVIsZ2wuTElORUFSKTtcclxuXHRcdGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCxnbC5URVhUVVJFX01JTl9GSUxURVIsZ2wuTElORUFSKTtcclxuXHRcdGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCxnbC5URVhUVVJFX1dSQVBfUyxnbC5DTEFNUF9UT19FREdFKTtcclxuXHRcdGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCxnbC5URVhUVVJFX1dSQVBfVCxnbC5DTEFNUF9UT19FREdFKTtcclxuXHJcblx0XHRnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELG51bGwpO1xyXG4gICAgICAgIHN3aXRjaChfbnVtYmVyKXtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgdmlkZW9UZXh0dXJlMSA9IHZpZGVvVGV4dHVyZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICB2aWRlb1RleHR1cmUyID0gdmlkZW9UZXh0dXJlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICB2aWRlb1RleHR1cmUzID0gdmlkZW9UZXh0dXJlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIHZpZGVvVGV4dHVyZTQgPSB2aWRlb1RleHR1cmU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgdmlkZW9UZXh0dXJlNSA9IHZpZGVvVGV4dHVyZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICB2aWRlb1RleHR1cmU2ID0gdmlkZW9UZXh0dXJlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNzpcclxuICAgICAgICAgICAgICAgIHZpZGVvVGV4dHVyZTcgPSB2aWRlb1RleHR1cmU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA4OlxyXG4gICAgICAgICAgICAgICAgdmlkZW9UZXh0dXJlOCA9IHZpZGVvVGV4dHVyZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDk6XHJcbiAgICAgICAgICAgICAgICB2aWRlb1RleHR1cmU5ID0gdmlkZW9UZXh0dXJlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTA6XHJcbiAgICAgICAgICAgICAgICB2aWRlb1RleHR1cmUxMCA9IHZpZGVvVGV4dHVyZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDExOlxyXG4gICAgICAgICAgICAgICAgdmlkZW9UZXh0dXJlMTEgPSB2aWRlb1RleHR1cmU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxMjpcclxuICAgICAgICAgICAgICAgIHZpZGVvVGV4dHVyZTEyID0gdmlkZW9UZXh0dXJlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTM6XHJcbiAgICAgICAgICAgICAgICB2aWRlb1RleHR1cmUxMyA9IHZpZGVvVGV4dHVyZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE0OlxyXG4gICAgICAgICAgICAgICAgdmlkZW9UZXh0dXJlMTQgPSB2aWRlb1RleHR1cmU7XHJcbiAgICAgICAgICAgICAgICBicmVhazsqL1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cdH1cclxufSJdfQ==
