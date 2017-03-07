(function(window, document) {
	function Ajax(method, url, success, async, fail) {
		try {
			var xhr = new XMLHttpRequest();
		} catch(e) {
			var xhr = new ActiveXObject('Microsoft.XMLHTTP')
		}
		if (method.toLowerCase() === 'get') {
			xhr.open(method, url, async);
		} else {
			xhr,open(method, url, async);
		}
		if (method.toLowerCase() === 'post') {
			xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
			xhr.send(data);
		} else if (method.toLowerCase() === 'get') {
			xhr.send();
		} 
		xhr.addEventListener('readystatechange', function() {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					success(xhr.responseText);
				} else {
					fail();
				}
			}
		})
	};
	// function jsonpRequest( url ) {
	// 	var jsonp = createElemnt('script');
	// 	jsonp.src = url;
	// 	jsonp.type = 'text/javascript';
	// }

	//通过模版和传入的处理函数来处理新的实例
	function newItem( template, data ) {
		var newItem = template.cloneNode(true);
		// //此处想要实现对dom元素上事件的拷贝，getEventListeners()是命令行函数，用不了，有一个解决方案，就是重写addEventListener()方法，在其中创建新的属性，专门保存事件列表。
		// var listenerList = getEventListeners(template);
		// for(var i in listenerList) {
		// 	newItem[i] = listenerList[i]
		// }
		fillItem(newItem, data);
		return newItem;
	}
	//处理函数
	function fillItem(item, data) {
		item.querySelector('.user-img').src = data.src;
		item.querySelector('.user-id').innerHTML = data.username;
		item.querySelector('.content').innerHTML = data.content;
		item.querySelector('.starts-num').innerHTML = data.number1;
		item.querySelector('.starts-comment').innerHTML = data.number2;
	}
	
	//插入页面函数
	function go(data) {
		data = JSON.parse(data).data;
		var item = document.querySelector('section .box-left .item'),
			boxLeft = document.querySelector('section .box-left');
		var a;
		fillItem(item, data[0]);
		for(var i = 1, len = data.length; i < len; i++) {
			a = newItem( item, data[i] );
			boxLeft.appendChild(a);
		}
	}
	function fail() {
		alert("获取json失败");
	}
	function request(m, a) {
		var address = a;
		var data = new Date();
		data = data.getTime();
		Ajax( m, address, go, true, fail);
	}


	//最终封装出一个接口
	//传入两个参数，请求方法，请求文件名
	//最下的页码跳转不再做，
	//其基本思路为，在html元素上创建自定义特性data-filename=''，
	//并为每一个按钮设置点击事件，获取到文件名属性，并调用request()方法；
	//并且，每次点击都修改下一页按钮的data-filename
	request('get', 'info.json');
	
})(window, document);