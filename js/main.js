/*
 * @description mhMainSlide slider
 */
function mhMainSlide(){
	
	$('.mh_main_wrap').slick({
		 fade:true,
		 speed:300,
		 cssEase: 'linear',
		 autoplaySpeed:4000,
		 infinite:true,
		 autoplay:true,
		 arrows:false,
		 dots: true,
		 pauseOnHover:false,
		 customPaging    : function (slider, i) 
	     {
			return  '<strong>0' + (i + 1) + '<span>/</span></strong>0' + slider.slideCount;
	     },
	     responsive : 
	     [{
	     	breakpoint: 375,
	        settings: 
	        {
	        	centerPadding:'60',
	        	slideToShow:1,
	        	variableWidth:false
	        }
	     }]
	});
	$('#section0 .slick-slide').removeClass('slick-active');
	$('#section0 .slick-dots li').removeClass('slick-active');
	
}

/*
 * @description busiSlide slider 
 */

function busiSlide(){
	
	$('.business_slider_wrap').slick({
		cssEase:'linear',
        arrows:true,
        dots:true,
        customPaging    : function (slider, i) 
        {
            return  '<strong>0' + (i + 1) + '<span>/</span></strong>0' + slider.slideCount;
        },	
        responsive      : 
            [{
                breakpoint  : 1025,
                settings    : 
                {
                    centerPadding   : '0',
                    variableWidth   : false
                }
            }]
        
	});
		
}

/*
 * @description coulmnSlide slider
 */

function coulmnSlide(){
	
	$(".health_column_wrap").slick({
		cssEase         : 'linear',
        infinite        : false,    
        variableWidth   : true,
        autoplay        : false,
        arrows          : false,
        dots            : false,
        responsive      : 
        [
	        
	        {
	            breakpoint  : 768,
	            settings    : 
	            {
	            	touchMove   : true,
	                infinite    : true,    
	                dots        : true,
	                autoplay    : true,
	                swipeToSlide: true,
	                slideToShow : 1
	            }
	        }
        ]
	});
		
}

function mainSlide(){
	mhMainSlide();
	busiSlide();
	coulmnSlide();
}

/**
 * @description columnCardControl 
 */
function columnCardControl(){

    var time = 500;
    var idx = idx2 = 0;
    var slide_width = $("#slider").width();
    

    $("#prev_btn").click(function() {
    	var slide_count = $("#slider li").length;
        if(slide_count > 1) {
       		$(".btn").css("display", "inline");
    	    if(idx == 0) $("#prev_btn").css("display", "none");
        }
        if(slide_count > 1) {
            idx2 = (idx - 1) % slide_count;
            if(idx2 < 0)
                idx2 = slide_count - 1;
            $("#slider li:hidden").css("left", "-"+slide_width+"px");
            $("#slider li:eq("+idx+")").animate({ left: "+="+slide_width+"px" }, time, function() {
                $(this).css("display", "none").css("left", "-"+slide_width+"px");
            });
            $("#slider li:eq("+idx2+")").css("display", "block").animate({ left: "+="+slide_width+"px" }, time);
            idx = idx2;
            if(idx == 0) $("#prev_btn").css("display", "none");  
        }
    });
 

    $("#next_btn").click(function() {
    	var slide_count = $("#slider li").length;
        if(slide_count > 1) {
       		$(".btn").css("display", "inline");
    	    if(idx == 0) $("#prev_btn").css("display", "none");
        }
        if(slide_count > 1) {

        	idx2 = (idx + 1) % slide_count;
            $("#slider li:hidden").css("left", slide_width+"px");
            $("#slider li:eq("+idx+")").animate({ left: "-="+slide_width+"px" }, time, function() {
                $(this).css("display", "none").css("left", slide_width+"px");
            });
            $("#slider li:eq("+idx2+")").css("display", "block").animate({ left: "-="+slide_width+"px" }, time);
            idx = idx2;
            if(idx != 0) $("#prev_btn").css("display", "inline");
            if(idx == 0) $("#prev_btn").css("display", "none");  
        }
    });	
}


//공지사항닫기이벤트
function noticePopClose() {
	$('.notice_popup').removeClass('on');
	//onepage scroll event 
	$.fn.fullpage.setMouseWheelScrolling(true);
	$.fn.fullpage.setAllowScrolling(true);
}

//공지사항팝업
function goNoticeDetail() {
	$(".notice_popup").addClass('on');	
	//onepage scroll event
	if($(".notice_popup").hasClass('on')){
	 	$.fn.fullpage.setMouseWheelScrolling(false);
		$.fn.fullpage.setAllowScrolling(false);
	}
			
	$("body").css("overflow-y" , "hidden");
}


//모바일버튼 클릭이벤트
function m_button_click(){
	
	var $mBtn = $("#m_buttom"),
		$mMenu = $("#menu"),
		$mLink = $(".menu-links");
	
	if(($mBtn).hasClass("on")){
		$mBtn.removeClass("on");
		$mMenu.slideUp("900");
	}else{
		$mBtn.addClass("on");
		$mMenu.slideDown("900");
	}
	
	$(".menu-links , .logo").click(function(){
		setTimeout(function(){$mMenu.slideUp("800")},800);
		$mBtn.removeClass("on");
	});
	
}