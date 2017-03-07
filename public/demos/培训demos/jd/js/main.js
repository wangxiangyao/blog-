//轮播图
var timer, timer1, timer3;
var currentUnderLine = document.querySelector(".register .reg-news .underline").offsetLeft;

(function(window) {

	timer = setTimeout(change, 5000);

	var points = window.document.querySelectorAll(".point");
	for (var i = 0; i < points.length; i++) {
		points[i].onmouseenter = function() {
			clearTimeout(timer);
			var currentPoint = window.document.querySelector(".point.chooes");
			currentPoint.classList.toggle('chooes');
			window.document.querySelector(".scroll .scroll-pic a:nth-child(" + currentPoint.dataset.index + ')').firstElementChild.classList.toggle("show");

			this.classList.toggle("chooes");
			window.document.querySelector(".scroll .scroll-pic a:nth-child(" + this.dataset.index + ')').firstElementChild.classList.toggle("show");
		}
		points[i].onmouseout = function() {
			timer = setTimeout(change, 5000);
		}
	}

	function change() {

		var scroll = window.document.querySelector(".scroll .pic.show");
		var point = window.document.querySelector(".scroll .scroll-point-list .chooes");
		scroll.classList.toggle("show");
		point.classList.toggle("chooes");

		if (scroll.parentElement.nextElementSibling.localName != "a") {
			var scroll = window.document.querySelector("#pic1")
			var point = window.document.querySelector(".point1")
			scroll.classList.toggle("show");
			point.classList.toggle("chooes");
		} else {
			scroll.parentElement.nextElementSibling.firstElementChild.classList.toggle("show");
			point.nextElementSibling.classList.toggle("chooes");
		}
		timer = setTimeout(change, 5000);
	}
})(window);

//左侧导航栏动画(失败了。。。)

// (function(window, document) {
// 	var navs = document.querySelectorAll(".nav .main-nav-list"); 
// 	for(var i = 0,len = navs.length; i < len; i++) {
// 		navs[i].onmouseenter = function () {
// 			this.lastElementChild.classList.add("show");
// 		}
// 		navs[i].onmouseout = function () {
// 			this.lastElementChild.classList.remove("show");
// 		}
// 	}
// })(window, document);

//右侧注册信息中新闻导航下的underline动画,以及分页切换

(function(window, document) {
	var kinds = document.querySelectorAll(".register .reg-news .kind");
	var pages = document.querySelectorAll(".register .page");
	for (var i = 0, len = kinds.length; i < len; i++) {
		kinds[i].onmouseenter = function() {
			clearTimeout(timer1);
			var target = this.offsetLeft + 15;
			var underLine = document.querySelector(".register .reg-news .underline");
			timer1 = setTimeout(move, 10);

			function move() {
				clearTimeout(timer1);
				if (Math.abs(target - currentUnderLine) <= 1) {
					clearTimeout(timer1);
				} else {

					currentUnderLine = currentUnderLine + (target - currentUnderLine) / 10;
					underLine.style.left = currentUnderLine + "px";
					timer1 = setTimeout(move, 10);
				}
			}
		}

		//分页切换
		if (i < len - 1) {

			kinds[i].onmouseover = function() {

				for (var i = 0, len = kinds.length - 1; i < len; i++) {
					kinds[i].lastElementChild.style.display = "none";
				}
				this.lastElementChild.style.display = "block";
			}
		}
	}
})(window, document);

//右侧注册信息,服务按钮动画


var serviceItemsHasContentPage = document.querySelectorAll(".register .service-item.tab-content .service-a");
var hiddenIcons = document.querySelectorAll(".register .service-item .service-a .glyphicon");
var hiddenTexts = document.querySelectorAll(".register .service-item:not(.tab-content) .service-a .service-text");
var serviceBar = document.querySelector(".register .reg-nav");
var contents = document.querySelectorAll(".service-bar-content");
var cancelContent = document.querySelector(".service-bar-content .cancel-content");
setEnter();

function setEnter() {
	for (var i = 0, len = serviceItemsHasContentPage.length; i < len; i++) {
		serviceItemsHasContentPage[i].addEventListener("mouseenter", hidden, true);
	}

	function hidden() {
		clearTimeout(timer3);
		event.stopPropagation();

		timer3 = setTimeout(change, 500);
		for (var i = 0, len = contents.length; i < len; i++) {
			contents[i].style.display = "none";
		}
		contents[Number(this.dataset.content) - 1].style.display = "block";
		this.removeEventListener("mouseover", hidden);

		function change() {


			for (var i = 0, len = hiddenIcons.length; i < len; i++) {
				hiddenIcons[i].style.height = "0";
				hiddenIcons[i].style.fontSize = "0";
				hiddenIcons[i].style.padding = "0";
				hiddenIcons[i].style.opacity = "0";
			}
			for (var i = 0, len = hiddenTexts.length; i < len; i++) {
				hiddenTexts[i].style.height = "0";
				hiddenTexts[i].style.fontSize = "0";
				hiddenTexts[i].style.padding = "0";
				hiddenTexts[i].style.opacity = "0";
			}
			serviceBar.addEventListener("mouseleave", function restore(e) {
				clearTimeout(timer3);
				setEnter();
				e.stopPropagation();
				if (e.target != this) {
					return;
				}
				for (var i = 0, len = hiddenIcons.length; i < len; i++) {
					hiddenIcons[i].style.height = "40px";
					hiddenIcons[i].style.fontSize = "20px";
					hiddenIcons[i].style.padding = "10px 0";
					hiddenIcons[i].style.opacity = "1";
				}
				for (var i = 0, len = hiddenTexts.length; i < len; i++) {
					hiddenTexts[i].style.height = "30px";
					hiddenTexts[i].style.fontSize = "10px";
					hiddenTexts[i].style.padding = "7px 0 6px 0";
					hiddenTexts[i].style.opacity = "1";
				}
				for (var i = 0, len = contents.length; i < len; i++) {
					contents[i].style.display = "none";
				}
				serviceBar.removeEventListener("mouseout", restore);
			}, true);
		}
	}
}


// 	serviceItemsHasContentPage[i].addEventListener("mouseenter", function(event){
// 		event.stopPropagation();
// 		clearTimeout(timer3);
// 		timer3 = setTimeout(change, 1000);
// 		this.onmouseenter = null;
// 		function change() {
// 			for(var i = 0,len = hiddenIcons.length; i < len; i++) {
// 				hiddenIcons[i].classList.remove("show");
// 				hiddenIcons[i].classList.add("hidden");
// 			}
// 			for (var i = 0,len = hiddenTexts.length; i < len; i++) {
// 				hiddenTexts[i].classList.remove("show");
// 				hiddenTexts[i].classList.add("hidden");
// 			}

// 			serviceBar.addEventListener("mouseout", function(e) {
// 				e.stopPropagation();
// 				if (e.target != this) {
// 					return;
// 				}
// 				for(var i = 0,len = hiddenIcons.length; i < len; i++) {
// 					hiddenIcons[i].classList.remove("hidden");
// 					hiddenIcons[i].classList.add("show");
// 				}
// 				for (var i = 0,len = hiddenTexts.length; i < len; i++) {
// 					hiddenTexts[i].classList.remove("hidden");
// 					hiddenTexts[i].classList.add("show");
// 				}
// 				serviceBar.onmouseout = null;
// 			}, true);

// 			// serviceBar.onmouseout = function(e) {
// 			// 	if (e.target != this) {
// 			// 		return;
// 			// 	}
// 			// 	for(var i = 0,len = hiddenIcons.length; i < len; i++) {
// 			// 		hiddenIcons[i].classList.remove("hidden");
// 			// 		hiddenIcons[i].classList.add("show");
// 			// 	}
// 			// 	for (var i = 0,len = hiddenTexts.length; i < len; i++) {
// 			// 		hiddenTexts[i].classList.remove("hidden");
// 			// 		hiddenTexts[i].classList.add("show");
// 			// 	}
// 			// 	serviceBar.onmouseout = null;
// 			// }
// 		}
// 	}, true);	
// }