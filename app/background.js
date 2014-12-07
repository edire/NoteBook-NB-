var $ = function(e) {
	return document.querySelector(e);
}
var checking = checkChange();
$('#tb').focus();
$('#tb').value = localStorage.content;
if($('#tb').value == 'undefined'){
	$('#tb').value = 'Welcome to use the NoteBook~';
	localStorage.content = 'Welcome to use the NoteBook~';
}

var firstInput = true;
$('#tb').oninput = function(){
	if(firstInput){
		clearInterval(checking);
	}
	setTimeout(function(){
		localStorage.content = $('#tb').value;
	},0);
}
$('#tb').onblur=function(){
	clearInterval(checking);
	checking = checkChange();
}

$('#tb').onfocus=function(){
	clearInterval(checking);
}

function checkChange(){
	return setInterval(function() {
		if($('#tb').value != localStorage.content){
			$('#tb').value = localStorage.content;
		}
	},200);
}