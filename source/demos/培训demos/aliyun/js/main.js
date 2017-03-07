//点击箭头旋转动画
		function click (obj,fn) {
			if(obj.length) {
				len = obj.length;
			} else {
				len = 1;
			}
			for (var i = 0; i < len; i++) {
				obj[i].addEventListener('click', fn,false);
				
			}
		}
		(function(window, document) {
			var topBarListBtns = document.querySelectorAll(".bar-top .bar-top-list-btn");
			click.call(topBarListBtns,topBarListBtns,function(event) {
					for (var i = 0,len = topBarListBtns.length; i < len; i++) {
						if( topBarListBtns[i] != this ) {
							topBarListBtns[i].classList.remove("click");
						}else {
							this.classList.toggle('click');
						}
					}
			});

			//头部下啦菜单按钮的按钮本身动画

			var topListTitle = document.querySelectorAll(".list .list-title");

			for (var i = 0, len = topListTitle.length; i < len; i++) {
				topListTitle[i].addEventListener("click", function(event) {
					this.classList.toggle("red");
					this.nextElementSibling.classList.toggle("close");
					event.stopPropagation();
				});
			};

			//头部右侧1190px以下，按钮以及菜单下拉动画
			var topRightBtn = document.querySelector(".bar-top-right .bar-top-nav-btn");
			topRightBtn.addEventListener('click', function() {
				this.classList.toggle('click');
				this.nextElementSibling.classList.toggle('show');
			})

			//头部左侧1190px以下，按钮点击动画
			var topLeftBtn = document.querySelector(".bar-top-left .showbtn");
			topLeftBtn.addEventListener('mousedown', function(event) {
				this.classList.toggle('click');
			});
			topLeftBtn.addEventListener('mouseup', function(event) {
				this.classList.toggle('click');
				this.previousElementSibling.classList.toggle('hidden');
			});


			//左侧工具栏标题点击时候，下啦菜单收起和展开
			var barSideTitle = document.querySelectorAll(".barside-title");
			click.call(barSideTitle,barSideTitle,function() {

					for (var i = 0, len = barSideTitle.length; i < len; i++) {
						if( barSideTitle[i] != this ) {
							barSideTitle[i].classList.remove('click');
							barSideTitle[i].nextElementSibling.classList.remove('open');
						}else {
							this.classList.toggle('click');
							this.nextElementSibling.classList.toggle('open');
						}
					}
				});


		//边侧工具栏顶部按钮
		var sideButton = document.querySelector(".barside-w-btn");
		var sideItem = document.querySelectorAll(".barside-list-item");
		var mainContent = document.querySelector(".main-content");
		sideButton.onclick = function() {
			this.classList.toggle("click");
			for (var i = 0, len = barSideTitle.length; i <  len; i++) {
				barSideTitle[i].classList.toggle("short");
			}
			for (var i = 0 ,len = sideItem.length; i < len; i++) {
				sideItem[i].classList.toggle("short");
			}
			mainContent.classList.toggle("big")
		}
		
		var warningBtn = document.querySelector('.main-top .warning .warning-btn');
		var warningCheckBox = document.querySelector('.main-top .warning #valid');
		warningCheckBox.onclick = function(e) {
			if (warningBtn.getAttribute('disabled') == 'disabled') {
				warningBtn.removeAttribute('disabled');
			} else {
				warningBtn.setAttribute('disabled', 'disabled');
			}
			warningBtn.classList.toggle('disable');
			e.stopPropagation();
		}
	})(window, document);