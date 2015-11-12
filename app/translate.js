$$ = jQuery;
function getTranslate(key){
	var flag = $('.translate-flag-dot').className.indexOf('on') > -1 ? false : true;
	if(flag) {

		var url = "https://openapi.baidu.com/public/2.0/bmt/translate?client_id=bGpu4r0ICxzOgLgjWTstC12r&q=" + key +"&from=auto&to=auto";
		var mean;
		$$.getJSON(url,function(data){
			if(!data) return;
			mean = !data.error_code ?　data.trans_result[0].dst : 'no word';
			$('.translate-dialog').innerHTML = mean;
		})
	}else{
		var url,
			from,
			to,
			enFlag,
			spacing;
		var test = /\w/g;
		if(key.match(test)){
			enFlag = true;
		} else {
			enFlag = false;
		}
		if(enFlag) {
			from = "en";
			to = "zh";
			spacing = "";
		} else {
			from = "zh";
			to = "en";
			spacing = "<br />"
		}

		url = "https://openapi.baidu.com/public/2.0/translate/dict/simple?client_id=bGpu4r0ICxzOgLgjWTstC12r&q=" + key + "&from=" + from + "&to=" + to;

		var means = [];
		var i = 0;
		$$.getJSON(url,function(data){
			if(data.errno != 0) {
				$('.translate-dialog').innerHTML = "Error!";
				if (!key){
					$('.translate-dialog').innerHTML = "";
					return;
				}
				return;
			}
			if(!data.data.symbols) {
				$('.translate-dialog').innerHTML = "No have this word";
				return;
			}
				var means = data.data.symbols[0].parts;
				means.forEach(function(e){
					means[i] = e.part + spacing;
					e.means.forEach(function (f) {
						means[i] += f + spacing;
					});
					i ++;
				});
				var ul = document.createDocumentFragment('ul')
				ul.className = "means-ul";
				means.forEach(function (e) {
					var li = document.createElement('li');
						li.innerHTML = e;
					ul.appendChild(li);
				})

			$('.translate-dialog').innerHTML = "";
			$('.translate-dialog').appendChild(ul);
		})
	}
}