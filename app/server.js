$ = function(e) {
	return document.querySelector(e);
}
$$ = jQuery;
window.onkeydown=function(e){
	if(e.which == 115){
		 if($('.nb-box')){
		 	$('.nb-box').remove();
		 }else{
		 	renderPage();
		 	moveFunc();
		 	changeSize();
		 	createTranslateDialog();
		 }
	}else if (e.which == 27) {

		 if($('.nb-box')){
		 	$('.nb-box').remove();
		 }
	}
}
function changeSize(){
	var nbResizeLeft = $('.nb-resize-left'),
		nbResizeRight = $('.nb-resize-right'),
		nbBox = $('.nb-box'),
		isRight;

	var htmlWidth = $('html').offsetWidth,
		htmlHeight = $('html').offsetHeight,
		oldScreenX,
		oldScreenY;

	var resizeIng = false;
	nbResizeLeft.addEventListener('mousedown',start,false);
	nbResizeRight.addEventListener('mousedown',start,false);
	function start(e){
		resizeIng = true;
		isRight = this.className == 'nb-resize-right' ? true : false;

		debugFrame();
		document.addEventListener('mousemove',move,false);
		document.addEventListener('mouseup',stop,false);

		htmlWidth = $('html').offsetWidth;
		htmlHeight = $('html').offsetHeight;

		oldScreenX = e.screenX;
		oldScreenY = e.screenY;
	}
	function move(e){
		if (resizeIng){
			var moveX = e.screenX - oldScreenX,
				moveY = e.screenY - oldScreenY;
			if(htmlWidth - parseInt(nbBox.style.right) - parseInt(nbBox.style.width) + moveX > 0 
			   && htmlHeight - parseInt(nbBox.style.height) - moveY - parseInt(nbBox.style.top) > 0
			   && parseInt(nbBox.style.right) - moveX > 0){
			   	nbBox.style.height = parseInt(nbBox.style.height) + moveY + "px";
				if(!isRight){
					nbBox.style.width = parseInt(nbBox.style.width) - moveX + "px";
				}else{
					nbBox.style.width = parseInt(nbBox.style.width) + moveX + "px";
				}
				oldScreenX = e.screenX;
				oldScreenY = e.screenY;
				if(isRight){
					nbBox.style.right = parseInt(nbBox.style.right) - moveX + 'px';
				}
			}
		}
	}
	function stop(){
		resizeIng = false;
		debugFrame();
		document.removeEventListener('mousemove',move,false);
		document.removeEventListener('mouseup',stop,false);
	}

	function debugFrame(){
		if(!resizeIng){
			if(!isRight){
				$('.nb-resize-left').style.top="";
				$('.nb-resize-left').style.right="";
				$('.nb-resize-left').style.left="";
				$('.nb-resize-left').style.bottom="";
				$('.nb-resize-left').style.width="";
				$('.nb-resize-left').style.height="";
			}else{
				$('.nb-resize-right').style.top="";
				$('.nb-resize-right').style.right="";
				$('.nb-resize-right').style.left="";
				$('.nb-resize-right').style.bottom="";
				$('.nb-resize-right').style.width="";
				$('.nb-resize-right').style.height="";
			}
			$('.nb-box').removeChild($('.nb-debug-frame'));
			document.body.removeChild($('.nb-debug-body'));
		}else{
			if(!isRight){
				$('.nb-resize-left').style.top="0";
				$('.nb-resize-left').style.right="0";
				$('.nb-resize-left').style.left="-400px";
				$('.nb-resize-left').style.bottom="-400px";
				$('.nb-resize-left').style.width="initial";
				$('.nb-resize-left').style.height="initial";
			}else{
				$('.nb-resize-right').style.top="0";
				$('.nb-resize-right').style.right="-400px";
				$('.nb-resize-right').style.left="0px";
				$('.nb-resize-right').style.bottom="-400px";
				$('.nb-resize-right').style.width="initial";
				$('.nb-resize-right').style.height="initial";
			}
			if(!$('.nb-debug-frame') && !$('.nb-debug-body')){
				var div = document.createElement('div');
				div.className="nb-debug-frame";
				$('.nb-box').appendChild(div);

				var div1 = document.createElement('div');
				div1.className="nb-debug-body";
				document.body.appendChild(div1);
			}
		}
	}

}

function moveFunc(){
	var nbTitle = $('.nb-title'),
		nbBox = $('.nb-box');

	var htmlWidth = $('html').offsetWidth,
		htmlHeight = $('html').offsetHeight,
		oldScreenX,
		oldScreenY;

	var down = false;

	nbTitle.addEventListener('mousedown',start,false);

	function start(e){
		document.addEventListener('mousemove',move,false);
		document.addEventListener('mouseup',stop,false);
			down = true;
			debugFrame()
			htmlWidth = $('html').offsetWidth;
			htmlHeight = $('html').offsetHeight;
			oldScreenX = e.screenX;
			oldScreenY = e.screenY;
	}
	function move(e){
		if(down) {
			var moveX = e.screenX - oldScreenX,
				moveY = e.screenY - oldScreenY;

			oldScreenX = e.screenX;
			oldScreenY = e.screenY;

			var domTop = nbBox.offsetTop,
				domRight = getRight();

			if(domTop + moveY > 0 && htmlHeight - domTop - moveY - nbBox.offsetHeight > 0){
				nbBox.style.top = domTop + moveY +"px";
			}
			if(domRight - moveX > 0 && htmlWidth - domRight + moveX - nbBox.offsetWidth > 0){
				nbBox.style.right = domRight - moveX + "px";
			}
		}
	}
	function stop(){
		if(down){
			down = false;
			debugFrame();
			document.removeEventListener('mousemove',move,false);
			document.removeEventListener('mouseup',stop,false);
		}
	}
	function getRight(){
		return htmlWidth-nbBox.offsetWidth-nbBox.offsetLeft;
	}

	var appName;
	function debugFrame(){
		if(!down){
			$('.nb-box').removeChild($('.nb-debug-frame'));
			document.body.removeChild($('.nb-debug-body'));
			$('.nb-title').innerHTML=appName;
			$('.nb-title').style.top="";
			$('.nb-title').style.bottom="";
			$('.nb-title').style.height="";
		}else{
			appName = $('.nb-title').innerHTML;
			$('.nb-title').innerHTML="";
			$('.nb-title').style.top="0";
			$('.nb-title').style.bottom="0";
			$('.nb-title').style.height="initial";

			var div = document.createElement('div');
			div.className="nb-debug-frame";
			$('.nb-box').appendChild(div);

			var div1 = document.createElement('div');
			div1.className="nb-debug-body";
			document.body.appendChild(div1);	
		}
	}
}



function renderPage() {
	var div = document.createElement('div');
	div.className="nb-box";
	div.style.right="40px";
	div.style.top="40px";
	div.style.width="400px";
	div.style.height="440px";
	document.body.appendChild(div);
	addTitle();
	addFrame();
	addClose();
	addResize();
	addTranslate();
	//loadTranslate()
	function addFrame(){
	 	var url = chrome.extension.getURL('app/panel.html');
		var iframe = document.createElement('iframe');
		iframe.src=url;
		iframe.className="nb-iframe";
		var div = document.createElement('div');
		div.className = "frame-box";
		div.appendChild(iframe);
		$('.nb-box').appendChild(div);
	}
	function addClose() {
		var close=document.createElement('a');
		close.className='nb-close';
		close.innerHTML="X";
		$('.nb-box').appendChild(close);
		$('.nb-close').onclick=function(){
			document.body.removeChild($('.nb-box'));
		}
	}

	function addTitle(){
		var move = document.createElement('div');
		move.className = "nb-title";
		move.innerHTML = "NoteBook(NB)"
		$('.nb-box').appendChild(move);
	}

	function addResize() {
		var resizeLeft = document.createElement('div');
		resizeLeft.className = "nb-resize-left";
		$('.nb-box').appendChild(resizeLeft);
		var resizeRight = document.createElement('div');
		resizeRight.className = "nb-resize-right";
		$('.nb-box').appendChild(resizeRight);
	}

	function addTranslate() {
		var box = document.createElement('div');
		box.className = "translate-box";

		var input = document.createElement('input');
		input.className = "translate-input";
		box.appendChild(input);

		// var btn = document.createElement('a');
		// btn.className = "translate-btn";
		// btn.href = "javascript: void(0)";
		// btn.innerHTML = "Go!"
		// box.appendChild(btn);
		$('.nb-box').appendChild(box);
		addTranslateFlagDot();
		
	}

	function loadTranslate(){
		var script = document.createElement('script');
		script.src = chrome.extension.getURL('app/translate.js');
		document.body.appendChild(script);
	}

	function addTranslateFlagDot(){
		var div = document.createElement('a');
		div.className = "translate-flag-dot";
		$('.translate-box').appendChild(div);
		div.addEventListener('click',function(){
			var t = this;
			t.className.indexOf("on") > -1 ? t.className = "translate-flag-dot" : t.className += " on";
		});

		addDialogEvent();
	}


}

function createTranslateDialog(){
	var div = document.createElement('div');
	div.className = "translate-dialog";
	$('.nb-box').appendChild(div);
}

function addDialogEvent() {
 	$('.translate-input').addEventListener("keyup", function (e){
 		if(e.which == 13) 
 			$('.translate-flag-dot').className.indexOf("on") > -1 ?
 				$('.translate-flag-dot').className = "translate-flag-dot" :
 				 $('.translate-flag-dot').className += " on";
		var key = $('.translate-input').value;
		getTranslate(key);
	});
	$('.translate-input').addEventListener("keydown", function (e){
 		if(e.which == 9) {
 			e.preventDefault();
 			$('.translate-flag-dot').className.indexOf("on") > -1 ?
 				$('.translate-flag-dot').className = "translate-flag-dot" :
 				 $('.translate-flag-dot').className += " on";
 		}
	});
}