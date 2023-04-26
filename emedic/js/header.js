$(document).ready(function () {
	
	//상품카테고리 메뉴 클릭 이벤트 
	$(".btn-category").click(function() {	

		if($(".btn-category").hasClass("on")) {
			$(".btn-category").removeClass("on");
			$(".category_view").removeClass("on");	

		}else{
			
			$(".btn-category").addClass("on");
			$(".category_view").addClass("on");
			
		}

	});
	
	$(".view_list").menuAim({
		activate: function(e) {
			$(e).addClass("on");
			$(e).find(".list_style").addClass("on");
		},
		deactivate: function(e) {
			$(e).removeClass("on");
			$(e).find(".list_style").removeClass("on");
		}
	});
	
	//가나다보기 메뉴 클릭 이벤트 
	/*$(".btn-sorting").click(function() {	

		if($(".btn-sorting").hasClass("on")) {

			$(".sorting_view").toggleClass("on");

		}else{
			$(".sorting_view").removeClass("on");
		}

	});
	
	header viewCode 로 이동
	$(".view_list a").click(function(){
		var viewCode = this.href.split('#')[1];
		location.href = "product/productList.action?viewCode="+viewCode;
	});
	});
	
	header viewCode 로 이동
	$(".third_cate a").click(function(){
		var viewCode = this.href.split('#')[1];
		location.href = "product/productList.action?viewCode="+viewCode;
	});
	*/
	
});
