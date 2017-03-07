var headerBar = document.querySelector(".header-bar");

window.onscroll = function(ev) {
	if(document.body.scrollTop > 200 && document.body.scrollTop < 1000) {
		if(!headerBar.classList.contains("fixed-header-bar"))
		headerBar.classList.add("fixed-header-bar");
	}else if(headerBar.classList.contains("fixed-header-bar")) {
		headerBar.classList.remove("fixed-header-bar");
	}
}

$(function(){
	var stap = 50;
	(function () {
		var start = 0;
		var end = 0;
		$("#carousel .item").on("touchstart", function(ev) {
		    start = ev.touches[0].clientX;
		    ev.preventDefault();

		});
		$("#carousel .item").on("touchmove", function(ev) {
			end = ev.touches[0].clientX;
			ev.preventDefault();
		});
		$("#carousel .item").on("touchend", function(ev) {
		    var T = start - end;
		    if (T > stap) {
		        $(".carousel").carousel("next");
		    }
		    if (T < -stap) {
		        $(".carousel").carousel("prev");
		    }
		    ev.preventDefault();
		});

	})();
	
});