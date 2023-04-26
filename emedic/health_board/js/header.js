jQuery(document).ready(function () {
	$(".view_list li").hover(function() {
		if (!($(this).attr('id') == 'view_item0'
			|| $(this).attr('id') == 'view_item1'
			|| $(this).attr('id') == 'view_item2'
			|| $(this).attr('id') == 'view_item3'
			|| $(this).attr('id') == 'view_item4'
			|| $(this).attr('id') == 'view_item5'
			|| $(this).attr('id') == 'view_item6'
			|| $(this).attr('id') == 'view_item7'
			))
		{
			return;
		}
		
		$(this).addClass("on");
		
		var length = $('.category_view .view_item').length;
			
		for (var i=0; i<length; i++)
		{
			if ($($('.category_view .view_item')[i]).attr('class') == 'view_item on')
			{
				if ($($('.category_view .view_item')[i]).attr('id') != $(this).attr('id'))
				{
					$($('.category_view .view_item')[i]).removeClass("on");
				}
			}
		}
		
	}, function() {
		/*
		var length = $('.category_view .view_item').length;
			
		var isRemoveFlag = true;
		for (var i=0; i<length; i++)
		{
			if ($($('.category_view .view_item')[i]).attr('class') == 'view_item on')
			{
				isRemoveFlag = false;
			}
		}
			
		if (isRemoveFlag)
		{
			$(this).addClass("on");
		}*/
		
		//$(this).removeClass("on");
	});	

	jQuery(".btn-category").click(function() {	
		if(!jQuery(".btn-category").hasClass("main")) {
			jQuery(".category_view").toggleClass("on");
			
			$($(".view_list a")[0]).trigger("mouseover");
		}

	});
	
	jQuery(".btn-sorting").click(function() {	

		if(!jQuery(".btn-sorting").hasClass("main")) {

			jQuery(".sorting_view").toggleClass("on");

		}

	});
	
	jQuery(".sub-nav-menu").click(function() {	

		if(!jQuery(".sub-nav-menu").hasClass("main")) {

			jQuery(".sub_category_view").toggleClass("on");
			

		}

	});
	

	/*header viewCode 로 이동*/
	jQuery(".view_list a").click(function(){
		var viewCode = this.href.split('#')[1];
		location.href = "product/productList.action?viewCode="+viewCode;
	});
	
	/*header viewCode 로 이동*/
	jQuery(".third_cate a").click(function(){
		var viewCode = this.href.split('#')[1];
		location.href = "product/productList.action?viewCode="+viewCode;
	});

	
});
