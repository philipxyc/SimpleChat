function removeHTMLTag(str) {
	str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
	str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
	//str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
	str=str.replace(/&nbsp;/ig,'');//去掉&nbsp;
	return str;
}
function getCookie(c_name) {
	if (document.cookie.length>0) {
		c_start=document.cookie.indexOf(c_name + "=")
		if (c_start!=-1) {
			c_start=c_start + c_name.length+1
			c_end=document.cookie.indexOf(";",c_start)
			if (c_end==-1) c_end=document.cookie.length
			return unescape(document.cookie.substring(c_start,c_end))
		}
	}
	return undefined;
}
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}
function sendMsg(name, content) {
	data={
		'name': name,
		'content': content,
		'robot': false,
	}
	socket.emit('chat message', data);
}
function onReceiveMsg(msg) {
	msg.name = removeHTMLTag(msg.name);
	msg.content = removeHTMLTag(msg.content);
	
	var t = '<div class="message_box">';
	t += '<div class="username">';
	if (msg.robot) t+= '<span class="label label-success">Robot</span> ';
	t += msg.name + ':&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	t += '</div>';
	t += '<div class="content">' + msg.content + '</div>';
	t += '</div>';
	var endSig = $('#messages').height() - $('#messagesContainer').height() + 110 < 0 || $("#messagesContainer").scrollTop() >= $('#messages').height() - 2 * $('#messagesContainer').height() + 110;
	$('#messages').append(t);
	if (endSig) $("#messagesContainer").animate({"scrollTop": $('#messages').height() - $('#messagesContainer').height() + 110}, 100);
}
function onReceivePlayer0(msg){
	var t = '<div class="message_box">';
	t += '<div class="username">';
	t += '<span class="label label-success">player0</span> ';
	t += ':&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	t += '</div>';
	t += '<div class="content">' + msg + '</div>';
	t += '</div>';
	var endSig = $('#messages').height() - $('#messagesContainer').height() + 110 < 0 || $("#messagesContainer").scrollTop() >= $('#messages').height() - 2 * $('#messagesContainer').height() + 110;
	$('#messages').append(t);
	if (endSig) $("#messagesContainer").animate({"scrollTop": $('#messages').height() - $('#messagesContainer').height() + 110}, 100);
}
function onReceivePlayer1(msg){
	var t = '<div class="message_box">';
	t += '<div class="username">';
	t += '<span class="label label-success">player1</span> ';
	t += ':&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	t += '</div>';
	t += '<div class="content">' + msg + '</div>';
	t += '</div>';
	var endSig = $('#messages').height() - $('#messagesContainer').height() + 110 < 0 || $("#messagesContainer").scrollTop() >= $('#messages').height() - 2 * $('#messagesContainer').height() + 110;
	$('#messages').append(t);
	if (endSig) $("#messagesContainer").animate({"scrollTop": $('#messages').height() - $('#messagesContainer').height() + 110}, 100);
}
function onchangeEdit() {
	if ($('#nameContainer').hasClass('edit')) {
		$('#nameContainer').removeClass('edit');
		setName($('#nameEdit').val());
	} else {
		$('#nameContainer').addClass('edit')
	}
}
function setName(c_name) {
	name = c_name;
	$('#name').html(c_name);
	$('#nameEdit').val(c_name);
	setCookie('name', c_name, 30);
}
function init() {
	socket.on('chat message', onReceiveMsg);
	socket.on('player0', onReceivePlayer0);
	socket.on('player1', onReceivePlayer1);
	socket.on('Alvolus', function(msg){console.log('turn to '+msg+' plz')});

	$('#sendForm').submit(function(){
		var content = $('#content').val();
		if (content) sendMsg(name, content);
		$('#content').val('');
		return false;
	});
	t = getCookie('name');
	var first_flag = false;
	if (t == undefined || t == '') {
		name = "Player";
		first_flag = true;
		setName(name);
	} else setName(t);
	if (first_flag){
		onReceiveMsg({
			'name': 'ShadowScent Assistant',
			'content': 'Debug only',
			'robot': true,
		});
	} else
		onReceiveMsg({
			'name': 'ShadowScent Assistant',
			'content': 'Debug only',
			'robot': true,
		});
}

var name = undefined;
var socket = io();
init();
$('body > div').removeClass('inactive');


function success(pos) {
	var crd = pos.coords;
}

function error(err) {
	console.warn('ERROR(' + err.code + '): ' + err.message);
}