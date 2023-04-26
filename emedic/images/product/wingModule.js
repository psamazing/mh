/**
 * @author jieun
 * @description initialize for the wing menu.
 */
"use strict";
var seqFlag = false; //�������� ���� üũ
var seqSortFlag = false; //ī�װ��� ���� ���� üũ
// ��ȯ�� ��ǰ ����Ʈ ��� UI ����

var wingModule = (function() {

	/***
	 * @description This function initializes events for wing-menu
	 * ������ ���� �̺�Ʈ �ʱ�ȭ (���) �Լ�
	 */
	function initEvent() {
		var eventM = eventModule;

		//������ Ŭ�� �̺�Ʈ �߰�
		eventM.addEventArray("click", document.querySelectorAll(".quick_top_menu.wing_tab"), wingEventHandler);
		//������ �ݱ� ��ư �̺�Ʈ
		eventM.addEventObject("click", document.getElementById("wing_btn"), controlWingTab);
		//2�� ������ �ݱ� ��ư �̺�Ʈ �߰�
		eventM.addEventArray("click", document.querySelectorAll(".wing_close_btn"), controlWingTab);
		//�������� Ŭ�� �̺�Ʈ �߰�
		eventM.addEventArray("click", document.querySelectorAll(".quick_sub.wing_tab"), wingEventHandler);
		//�� �������� Ŭ�� �̺�Ʈ �߰�
		eventM.addEventArray("click", document.querySelectorAll(".quick_sub.empty"), openEmptyEst);
		//�������� ���콺 ���� �������� ȿ�� �̺�Ʈ �߰�
		eventM.addEventArray("mouseenter", document.querySelectorAll("li.estTitle"), estTabHoverTitleEffect);
		eventM.addEventArray("mouseleave", document.querySelectorAll("li.estTitle"), estTabHoverTitleEffect);
		
		//������ ������ �˻� Ŭ�� �̺�Ʈ
		eventM.addEventObject("click", document.getElementById("estisearch"), openEstiSearch);
		//������ �˻� �ݱ� �̺�Ʈ
		eventM.addEventObject("click", document.querySelector(".search_close_out"), closeOutEstiSearch);
		//������ �˻� �ݱ� �̺�Ʈ
		eventM.addEventObject("click", document.querySelector(".search_close_in"), closeInEstiSearch);
		//�������˻�  �˻� â �̺�Ʈ ���
		eventM.addEventArrayKeyUp(document.querySelectorAll(".search_input"), searchProductKeyEvent);
		//�������˻� �˻� ������ �̺�Ʈ ���
		eventM.addEventArray("click", document.querySelectorAll("a.btn_esti_search"), searchProductBtnEvent);

		//[���ɻ�ǰ]
		eventM.addEventCheckBoxAll("click", document.getElementById("wish_product").querySelector(".attention_check"), "wishCheck", clickAllCheck);
		//�������� ��ư �̺�Ʈ �߰�
		eventM.addEventObject("click", document.getElementById("wish_product").querySelector(".wishSaveEst"), clickWishSaveEst);
		//üũ���� ��ư �̺�Ʈ �߰�
		eventM.addEventObject("click", document.getElementById("wish_product").querySelector(".wishCheckDel"), clickDelWishProducts);
		
		//[�ֹ���ǰ�籸��]
		//üũ ��ü���� ��ư �̺�Ʈ �߰�
		eventM.addEventCheckBoxAll("click", document.querySelector("#product_reorder .allcheck"), "reorder_check", clickAllCheck);
		//�������� ��ư �̺�Ʈ �߰�
		eventM.addEventObject("click", document.querySelector("#product_reorder #reSaveEst"), reSaveEst);
		//���ɻ�ǰ ���� ��ư �̺�Ʈ �߰�
		eventM.addEventObject("click", document.querySelector("#product_reorder #reSaveWish"), reSaveWish);

		//[���ú���ǰ]
		//�������� ��ư �̺�Ʈ ���
		eventM.addEventObject("click", document.getElementById("todaySaveEst"), clickTodaySaveEst);
		//���ɻ�ǰ���� ��ư �̺�Ʈ ���
		eventM.addEventObject("click", document.getElementById("todaySaveWish"), clickTodaySaveWish);
		//üũ���� ��ư �̺�Ʈ ���
		eventM.addEventObject("click", document.getElementById("todayCheckDel"), clickTodayDelList);
		//���ú���ǰ üũ�ڽ� ��ü ����
		eventM.addEventCheckBoxAll("click", document.querySelector("#today-product #allCheck"), "proCheck", clickAllCheck);
		
		//[�����ٱ���]
		eventM.addEventCheckBoxAll("click",document.querySelector("#make-order input.allCheck"), "est-chk", clickAllCheckCart);
		//�ֹ��ϱ� ��ư �̺�Ʈ �߰�
		eventM.addEventObject("click", document.querySelector("button.order-cart-submit"), goOrderSheet);

		//[��ǰ����]
		//��ǰ���� ��ư �̺�Ʈ �߰�
		eventM.addEventArray("click", document.querySelectorAll("li.sortCode"), clickSortByProCode);
		//��ǰ�� ���� ��ư �̺�Ʈ �߰�
		eventM.addEventArray("click", document.querySelectorAll("a.sort-pro-name"), clickSortByProName);
		
		//[���Ŵ���]
		eventM.addEventObject("click",document.querySelector(".pro_purchase_open"),openPurchaseInfo);
		eventM.addEventObject("click",document.querySelector(".pro_purchase_close"),closePurchaseInfo);

		initEstDetailEvent();
	}

	/**
	 * @description ������ ������ ���� �̺�Ʈ ���
	 */
	function initEstDetailEvent() {
		var eventM = eventModule,
			div = document.getElementById("estimate_max1");
		
		div.querySelector(".order_school").readOnly = true;
		//�������б��� ����
		eventM.addEventObject("click", div.querySelector(".modi-school"), openSchoolSearchPopup);
		eventM.addEventObject("click", div.querySelector(".order_school"), openSchoolSearchPopup);
		
		//üũ ��ü���� ��ư �̺�Ʈ �߰�
		eventM.addEventCheckBoxAll("click", div.querySelector(".allcheckDetail"), "chk_modify", clickAllCheck);
		//üũ���� ��ư �̺�Ʈ �߰�
		eventM.addEventObject("click", div.querySelector(".delPro"), clickDevareMultiBtn);
		//�����̵� ��ư �̺�Ʈ �߰�
		eventM.addEventObject("mouseover", div.querySelector(".movePro"), openContent);
		eventM.addEventObject("mouseout", div.querySelector(".movePro"), closeContent);
		// ���ɻ�ǰ���� ��ư �̺�Ʈ �߰�
		eventM.addEventObject("click", div.querySelector(".saveWish"), clickSaveWishBtn);
		//�����̵� ��ư �̺�Ʈ �߰�
		eventM.addEventObject("mouseout", div.querySelector(".estimatemove"), closeContent);
		eventM.addEventObject("mouseover", div.querySelector(".estimatemove"), openContent);
		//��ǰ ��ü ���� �̺�Ʈ �߰�
		eventM.addEventObject("click", div.querySelector(".estimatemove"), openContent);
		//������ �������� ��ư �̺�Ʈ �߰�
		eventM.addEventObject("click", div.querySelector(".modi_max_button_change"), openEstChangeOrder);
		//�����̵� ��ư �̺�Ʈ �߰�
		eventM.addEventArray("click", div.querySelectorAll(".estimatemove #menu1 li"), clickMoveEstBtn);
		//������ ���ݰ��� ��ư �̺�Ʈ �߰�
		eventM.addEventObject("click", div.querySelector("span.refreshPrice"), clickRefreshBtn);
		//������ ���ݰ��� �ȳ����� �̺�Ʈ
		eventM.addEventObject("mouseover", div.querySelector(".price_info_icon"), priceInfoOver);
		eventM.addEventObject("mouseout", div.querySelector(".price_info_icon"), priceInfoOut);
		//������������ ��ư �̺�Ʈ �߰�
		eventM.addEventObject("click", div.querySelector(".saveEdu"), clickEstModEdufine);
		//�ֹ��ϱ� ��ư �̺�Ʈ �߰�
		eventM.addEventObject("click", div.querySelector(".modi_max_order"), clickEstModSaveOrder);
		//������ ���� ��ư �̺�Ʈ �߰�
		eventM.addEventObject("click", div.querySelector(".btn-est-del-max"), clickEstDelBtnDetail);
	
		//[���� ����]
		//ī�װ���/��ǰ�� sorting
		eventM.addEventArray("click", document.querySelectorAll("#estimate_max2 img.modi_sort"), sortModifyProCode);
		//����Ȯ���ϱ� ��ư �̺�Ʈ
		eventM.addEventObject("click", document.querySelector("#estimate_max2 .btn-seq-confirm"),confirmSequence);
		//�����ʱ�ȭ ��ư �̺�Ʈ
		eventM.addEventObject("click", document.querySelector("#estimate_max2 .btn-seq-init"),initProSequence);
		//�� ���� ��ư �̺�Ʈ
		eventM.addEventObject("click", document.querySelector("#estimate_max2 .pro-sort-top"), locateRowTop);
		//�� �Ʒ��� ��ư �̺�Ʈ
		eventM.addEventObject("click", document.querySelector("#estimate_max2 .pro-sort-bottom"), locateRowBottom);
		//�� ĭ ���� ��ư �̺�Ʈ
		eventM.addEventObject("click", document.querySelector("#estimate_max2 .pro-sort-up"), locateRowUp);
		//�� ĭ �Ʒ��� ��ư �̺�Ʈ
		eventM.addEventObject("click", document.querySelector("#estimate_max2 .pro-sort-down"), locateRowDown);
		//������ �������� ���ư��� ��ư �̺�Ʈ �߰�
		eventM.addEventObject("click", document.getElementById("estimate_max2").querySelector(".modi_max_button_modify"), openEstModifyOrder);
		//������ �������� �ȳ����� 
		eventM.addEventObject("mouseover", document.querySelector(".esti_modi_info"), modiInfoOver);
		eventM.addEventObject("mouseout", document.querySelector(".esti_modi_info"), modiInfoOut);
	}
	
	/**
	 * @description ���� �� ������ �˻� ���� �̺�Ʈ ����
	 */
	function openEstiSearch(){
		var quickWrap = document.getElementById("quick_wrap"),
			searchBoxWrapOut = document.getElementsByClassName("search_box_wrap_out"),
			searchBoxWrapIn = document.getElementsByClassName("search_box_wrap_in"),
			originalOutWidth = $(".search_box_wrap_out").width(),
			originalInWidth = $(".search_box_wrap_in").width();;
		
		if($(quickWrap).hasClass("close")){
			$(searchBoxWrapOut).css("display","block");
			if(originalOutWidth == 0){
				$(searchBoxWrapOut).animate({width:"242",borderWidth:"1px"},400);
				$(".input_inner").addClass("visible");
				$(".search_box_result").css("display","block");
			}else{
				$(searchBoxWrapOut).animate({width:"0",borderWidth:"0"},400);
				$(".input_inner").removeClass("visible");
			}
			
		}else if($(quickWrap).hasClass("tab-min") || $(quickWrap).hasClass("max") ){
			$(searchBoxWrapIn).css("display","block");
			if(originalInWidth == 0){
				$(searchBoxWrapIn).animate({width:"248",borderWidth:"1px"},400);
				$(".input_search_inner").addClass("visible");
				$(".search_box_result").css("display","block");
			}else{
				$(searchBoxWrapIn).animate({width:"0",borderWidth:"0"},400);
				$(".input_search_inner").removeClass("visible");
			}
		}
		initSearchProBox();
	}
	
	/**
	 * @description ���� �� ������ �˻� �ݱ� �̺�Ʈ ����
	 */
	function closeOutEstiSearch(){
		var searchBoxWrapOut = document.getElementsByClassName("search_box_wrap_out");
		$(searchBoxWrapOut).animate({width:"0px",borderWidth:"0"},400);
		$(".input_inner").removeClass("visible");
		initSearchProBox();
	}
	function closeInEstiSearch(){
		var searchBoxWrapIn = document.getElementsByClassName("search_box_wrap_in");
		$(searchBoxWrapIn).animate({width:"0px",borderWidth:"0"},400);
		$(".input_search_inner").removeClass("visible");
		initSearchProBox();
	}
	
	/**
	 * @description html Ŭ���� ������ �˻� �ݱ� �̺�Ʈ ����
	 */
	$("html").click(function(e){
		if($(e.target).hasClass("selector") === false){
			var toggleWidthOut = $(".search_box_wrap_out").width();
			if(toggleWidthOut != 0){
				$(".search_box_wrap_out").animate({width:"0",borderWidth:"0"},400);
				$(".input_inner").removeClass("visible");
				$(".search_box_result").css("display","none");
			}
		}
		if($(e.target).hasClass("inselector") === false){
			var toggleWidthIn = $(".search_box_wrap_in").width();
			if(toggleWidthIn != 0){
				$(".search_box_wrap_in").animate({width:"0px",borderWidth:"0"},400);
				$(".input_search_inner").removeClass("visible");
				$(".search_box_result").css("display","none");
			}
		}
	});
	
	/**
	 * @description ���� ���� �� ���콺������ �̺�Ʈ ����
	 */
	function estTabHoverTitleEffect(target) {
		$(target).children("span.order-title").stop(true,false).animate({width:"toggle"},200);
		return false;
	}

	/**
	 * @param {String} tabId - ������ ���̵�
	 * @description ���� �� Ŭ�� �� �̺�Ʈ�� �������ִ� �Լ�
	 */
	var wingEventHandler = function(target) {

		var memLevel = document.getElementById("in_member_level").value;
		if(memLevel == 70){
			alert("�����ڿ� ���� ������ ���ѵǾ����ϴ�!"); return;
		}
		
		if (target) {
			var tabId = target.id.split(",")[0];
			switch (tabId) {
				case 'make-order': openMakeEstimate(); break;
				case 'estimate_max1': openEstModify(); break;
				case 'pro_purchase': openPurchase(); break;
				case 'print_doc': openPrintDoc(); break;
				case 'today-product': openTodayProduct(); break;
				case 'wish_product': openWishProduct(); break;
				case 'product_reorder': openReorder(); break;
				default: clickEstTab(tabId);
				}
			initEstimateTab();
		}
	}

	/**
	 * �������� ���� ����� �� 2���� -------------------------------------------------------------------------------------
	 * 1. ���� �޴��� ���� ���� ���� �����
	 * 2. ���� ����/�ݱ� ��ư�� ���� ���� ���
	 * 
	 * [CASE 1]
	 * 	1) wingEventHandler(tabId) �Լ����� � �޴��� �������� �Ǵ� �Ŀ� ���� �Լ��� ���� 
	 *  2) �� �޴��� ���� �ʱ� �Լ��� ����/ �����ͷε� �Ŀ� openWingMenu(tabId,mode) �� ���� ����
	 *  	openWingMenu �Լ��� ���� ���� �������� �������� �ʱ�ȭ ����� mode(1��/2��) �� �����Ͽ� ����
	 * [CASE 2]
	 * 	1) controlWingTab() �Լ����� ���� ���� ���� ����(����/1��/2��)�� �Ǵ��Ͽ�, ���� ������ ��� �� ����,1��/2���� ��� �ݱ� ��� ����
	 */

	/**
	 * @param {String}, {String} tabId - ������ ���̵�
	 * 							 mode - ���� ��ħ �� 1��(min)/2��(max) ����
	 * @description ������ 1��,2�� ��ħ �̺�Ʈ
	 */
	function openWingMenu(tabId, mode) {
		var flag = true;
		
		if(seqFlag || (seqSortFlag && tabId !='estimate_max2')){
			if(confirm("����� ������ ������� �ʾҽ��ϴ�. ��� �����Ͻðڽ��ϱ�?\n")){
				setSeqFlag(false);
				setSeqSortFlag(false);
			}
			else flag = false;
		}

		if(flag){
			var quickTabs = document.querySelectorAll(".quick_tab"),
				quickTabLen = quickTabs.length,
				quickWrap = document.getElementById("quick_wrap"),
				quickBg = document.querySelector(".quick_bg"),
				wingBtn = document.getElementById("
				"),
				searchBoxWrapOut = document.getElementsByClassName("search_box_wrap_out"),
				searchBoxWrapIn = document.getElementsByClassName("search_box_wrap_in"),
				tab, typeNum, i, MAX_TYPE = 6;
	
			$(".quick_conts").removeClass("close");	
			//�� �ʱ�ȭ
			for (var i = 0; i < quickTabLen; i++) {
				var target = quickTabs[i];
				if ($(target).hasClass("on")) {
					$(target).removeClass("on");
				}
			}
	
			if ($(quickWrap).hasClass("close")) {
				$(quickWrap).removeClass("close");
			}

			//���õ� �� ����
			tab = document.getElementById(tabId);
			typeNum = tab.dataset.type*1;
			
			//�˻��� �ڽ� ����
			$(searchBoxWrapOut).css("display","none");
			$(searchBoxWrapIn).css("display","none");
			initSearchProBox();
			
			if (!$(tab).hasClass("on")) {
				//est-tab change event ------------------------------------
				for(i =1 ;i<= MAX_TYPE; i++){
					$("#type"+i).removeClass("active_tab");	
					$("#type"+i).removeClass("after_tab");	
					$("#type"+i).removeClass("before_tab");	
				}
				for(i =1 ;i<= MAX_TYPE; i++){
					if(i < typeNum) $("#type"+i).addClass("before_tab");
					else if(i > typeNum) $("#type"+i).addClass("after_tab");
				}
				$("#type"+typeNum).addClass("active_tab");
				$(tab).addClass("on");
			}
	
			//2�� ��ħ
			if (mode == 'max') {
				
				//1�� ������ ����Ʈ �����
				$(".quick_estimate_wrap").css("display","none");
				
				if ($(quickWrap).hasClass("tab-min")) {
					$(quickWrap).removeClass("tab-min");
				}
	
				if (!$(quickWrap).hasClass("max")) {
					$(quickWrap).addClass("max");
				}
	
				if (!$("body").hasClass("prevent")) {
					$("body").addClass("prevent");
				}
				
				if (!$(quickBg).hasClass("on")) {
					$(quickBg).addClass("on");
				}
			}
			//1�� ��ħ
			else {
				$(quickWrap).addClass("tab-min");
				$(quickWrap).removeClass("max");
				$(quickBg).removeClass("on");
				$("#estimate_max1").removeClass("on");
				$("#estimate_max2").removeClass("on");
				$(".quick_estimate_wrap").css("display","block");
				if ($("body").hasClass("prevent") && !$(".popup-bg").hasClass("on")) {
					$("body").removeClass("prevent");
				}
				if (document.getElementById(tabId) != null) {
					var newDivElements = document.getElementById(tabId).querySelectorAll(".quick_estimate_table_wrap .new"),
						newDivProElements  = document.getElementById(tabId).querySelectorAll(".quick_estimate_table_wrap .proNew"),
						newDivLen = newDivElements.length,
						newProLen = newDivProElements.length;
	
					if (newDivLen > 0) {
						var elTop = $(newDivElements[newDivLen-1]).position().top,
							offSet = elTop - $("#" + tabId + " .quick_estimate_table_wrap").scrollTop() + 45;
	
						if (sessionStorage.scrollTop < offSet) {
							$("#" + tabId + " .quick_estimate_table_wrap").scrollTop(sessionStorage.scrollTop);
						}
						
						setTimeout(function() {
							for(var i=0; i<newDivLen; i++){
								newDivElements[0].style.backgroundColor = '#fff';
								newDivElements[1].style.backgroundColor = '#fff';
							}
						}, 1600);
						
						$(newDivElements[0])[0].scrollIntoView({
							behavior : 'smooth'
						});
					}
					
					if(newProLen > 0){
						drawToastWing("�������� ���� �Ǿ����ϴ�.","toast-min");
						$(newDivProElements[0])[0].scrollIntoView({
							behavior : 'smooth'
						});
					}
				}
			}
	
			wingBtn.src = PathData.getPath() + "/img/product/quick_close1.png";
			
			if(tabId=="estimate_max1" || tabId=="estimate_max2") tabId = "estimate_max";
			
			//���� �޴� ��ư Ŭ����  Ȱ��ȭ 
			var btn = document.querySelector(".icon_"+tabId),
				btnList = document.querySelectorAll(".wing-tab-icon"), len = btnList.length, i=0;
			
				for(;i<len;i++){
					if($(btnList[i]).hasClass("on")){
						$(btnList[i]).removeClass("on")
					}
				}
				$(btn).addClass("on");
		}
	}

	/**
	 * @description when user click the wing-opening button
	 */
	function openWingTab(){
		var first = document.querySelector(".first_est");
		//ù��° �������� �ִ� ��� �ش� ������ ����
		if (first != null) {
			wingAjaxDataModule.loadEstimateData(first.id.split(",")[0]);
		}
		//�������� ���� ��� ������ ����� �� ���� --> ����1 ����
		else {
			$(".quickmenu1 ").children().addClass("on");
			openWingMenu('type1', 'min');
		}
	}

	/**
	 * @description if wing tab's status is max then minimize.
	 * @param {HTMLElement} quickWrap - div has id is 'quick_wrap' 
	 */
	function minimizeWingFromMax(quickWrap){
		initEstimateTab();
		var quickBg = document.querySelector(".quick_bg"),
		    btnList = document.querySelectorAll("img.wing-tab-icon"), len = btnList.length, i=0;
		
		$(quickWrap).removeClass("max");
		$(quickWrap).addClass('close');
		$(".quick_conts").addClass("close");
		$(quickBg).removeClass("on");
		$("body").removeClass("prevent");
		$("#estimate_max1").removeClass("on");
		$("#estimate_max2").removeClass("on");

		for(; i<len; i++){
			btnList[i].src = PathData.getPath()+"/img/product/"+btnList[i].dataset.imgTitle+".png";
		}
	}

	/**
	 * @description if wing tab's status is 1-step then minimize.
	 * @param {HTMLElement} quickWrap - div has id is 'quick_wrap'
	 */
	function minimizeWing(quickWrap){
		$(quickWrap).removeClass("tab-min");
		$(quickWrap).addClass("close");
		$(".quick_conts").addClass("close");
		$("body").removeClass("prevent");
		initEstimateTab();
		document.getElementById("wing_btn").src = PathData.getPath() + "/img/product/quick_open1.png";
	}

	/**
	 * @description ���� ����/�ݱ� ��ư Ŭ���� ���� �Լ�
	 */
	function controlWingTab() {
		var quickWrap = document.getElementById("quick_wrap");

		if(seqFlag){
			if(confirm("����� ������ ������� �ʾҽ��ϴ�! ��� �����Ͻðڽ��ϱ�?\n")){setSeqFlag(false);}
			else return;
		}
		
        //���� ���� ���� �ִ� ��� (�ּ�ȭ)
        $(".quick_conts").removeClass("close");
        $(".wing-tab-icon").removeClass("on");
        if ($(quickWrap).hasClass("close")) {
            openWingTab();
        }
        //���� ���� 2�� ��ħ ������ ���
        else if ($(quickWrap).hasClass("max")) {
            minimizeWingFromMax(quickWrap);
        }
        //���� ���� 1�� ��ħ ������ ���
        else if ($(quickWrap).hasClass("tab-min")) {
            minimizeWing(quickWrap);
        }
	}

	/**
	 * @description �� ������ ����
	 */
	var openEmptyEst = function(target) {
		initEstimateTab();
		$(target).addClass("on");
		openWingMenu('type' + target.id.split(",")[0], 'min');
	}


	/**
	 * @description ������ ����� �� �̺�Ʈ --> �����ٱ��� �� ���� ����(2018.08.08)
	 */
	function openMakeEstimate() {
		wingAjaxDataModule.getOrderCartList();
	}

	/**
	 * @description ������ ������ ����
	 */
	function openEstModify(type) {
		var ests = document.querySelectorAll("#quick_wrap li a.wing_tab.est_tab"),
			estsLen = ests.length,
			selType = null;
		
		if (estsLen == 0) {
			drawToast("���� ��ǰ�� ��� �������� �����ϴ�!");
		} else {
			for (var i = 0; i < estsLen; i++) {
				if ($(ests[i]).hasClass("on")) {
					$(ests[i]).removeClass("on");
					selType = ests[i].id.split(",")[0];
				}
			}
			if(type==null){
				if(selType!=null) type = selType;
				else{
					var first = ests[0];
					type = first.id.split(",")[0];
				}
			}
			wingAjaxDataModule.getEstimateDetailData(type);
		}
	}

	/**
	 * @description ���Ŵ��� �� ����
	 */
	function openPurchase() {
		wingAjaxDataModule.loadAgentTempList();
	}

	/**
	 * @description ���Ŵ��� �ȳ����� ���ĺ���
	 */
	function openPurchaseInfo(){
		$(".pro_purchase_open").next('.pro_purchase_content').slideDown("slow");
		$(".pro_purchase_open").css("display","none");
		return false;
	}
	
	/**
	 * @description ���Ŵ��� �ȳ����� �ݱ�
	 */
	function closePurchaseInfo(){
		$('.pro_purchase_content').slideUp("slow");
		setTimeout(function() {
			$(".pro_purchase_open").slideDown("slow");
		}, 800);
		return false;
	}
	
	/**
	 * @description ���Ŵ��� ��û�� �߰�
	 */
	function makePurchaseForm(target){
		
		var forms = document.querySelector("#pro_purchase .agent-blank"), //���ۼ� ��û�� ��ȸ
			count = document.querySelector("#pro_purchase #purchase_cnt").value; //���� ��û�� ����
		
		if(forms==null){
			var div = document.querySelector("#pro_purchase .clone_blank_form"),
				forms = document.querySelectorAll("#pro_purchase .pro_purchase_clone"),
				clone = div.cloneNode(true),
				cloneForm;
			
			target.insertAdjacentHTML("beforeBegin", clone.outerHTML);
			
			if(count>0){
				document.querySelector("#pro_purchase .remain_cnt").innerHTML = count;
			}else{
				target.parentNode.removeChild(target);
			}
			
			cloneForm = document.querySelectorAll(".clone_blank_form")[1];
			$(cloneForm).addClass("agent-blank");
			$(cloneForm).removeClass("clone_blank_form");
			initAgentEvent(cloneForm);
			
		}else{
			drawToastWing("���� ������� ���� ��û���� �ֽ��ϴ�!", "toast-max");
		}
	}

	/**
	 * @description ���ú���ǰ �� ����
	 */
	function openTodayProduct() {
		wingAjaxDataModule.getTodayProducts();
	}

	/**
	 * @description ���ɻ�ǰ �� ����
	 */
	function openWishProduct() {
		wingAjaxDataModule.loadWishList();
	}
	
	/**
	 * @description ���ɻ�ǰ/�ֹ���ǰ�籸��/�ֱٺ���ǰ ��ǰ�з��� ����ó��
	 */
	function clickSortByProCode(target){
		var tabId = target.dataset.tabId,
			sortCode = target.querySelector("span").id,
			nameSort = getNameSortValue(tabId);

		switch(tabId){
			case 'wish_product': wingAjaxDataModule.loadWishList(sortCode,nameSort); break;
			case 'today-product': wingAjaxDataModule.getTodayProducts(sortCode,nameSort); break;
			case 'product_reorder': wingAjaxDataModule.getRepurchaseList(sortCode,nameSort); break;
		}
	}
	
	/**
	 * @description ���ɻ�ǰ/�ֹ���ǰ�籸��/�ֱٺ���ǰ ��ǰ�� ����ó��
	 */
	function clickSortByProName(target){
		var tabId = target.dataset.tabId,
			sortCode = getSortCodeValue(tabId),
			nameSort = target.dataset.sort,
			sortBtns = document.querySelectorAll("#"+tabId+" a.sort-pro-name");
		
		$(sortBtns[0]).removeClass("on");
		$(sortBtns[1]).removeClass("on");
		$(target).addClass("on");
		
		switch(tabId){
			case 'wish_product': wingAjaxDataModule.loadWishList(sortCode,nameSort); break;
			case 'today-product': wingAjaxDataModule.getTodayProducts(sortCode,nameSort); break;
			case 'product_reorder': wingAjaxDataModule.getRepurchaseList(sortCode,nameSort); break;
		}
	}
	
	/**
	 * @description �ֹ���ǰ�籸�� �� ����
	 */
	function openReorder() {
		wingAjaxDataModule.getRepurchaseList();
	}

	/**
	 * @description ������� �� ����
	 */
	function openPrintDoc() {
		wingAjaxDataModule.getEstDocList();
	}

	/**
	 * @description ���������� - �б��� ���� �վ� ����
	 */
	function openSchoolSearchPopup() {
		var url = "searchSchool.action";
		window.open(url, "", "width=650,height=600,menubar=no,scrollbars=yes");
	}

	/**
	 * @description ���������� - �������������� ������ �̵�
	 */
	function openEstChangeOrder(target) {
		wingAjaxDataModule.getEstimateModifyData(target.dataset.orderType);		
	}
	
	/**
	 * @description ������ �������� - �з� ���� Ŭ���� sorting �̺�Ʈ
	 */
	function sortModifyProCode(target){
		wingAjaxDataModule.getEstimateModifyData(document.getElementById("estimate_max2").dataset.selType,target.dataset.sortCode);		
	}

	/**
	 * @description �������������� - ���������� ������ �̵�
	 */
	function openEstModifyOrder(target) {
		if(seqFlag || seqSortFlag){
			if(confirm("����� ������ ������� �ʾҽ��ϴ�! ��� �����Ͻðڽ��ϱ�?\n")){
				openEstModify();
				setSeqFlag(false);
				setSeqSortFlag(false);
			}
		}
		else{
			openEstModify(target.dataset.orderType);
		}
	}

	/**
	 * @description ������ �� �ʱ�ȭ (Ȱ��ȭ�� ��ư�� ������ ���)
	 */
	function initEstimateTab() {
		var ests = document.querySelectorAll("a.quick_sub"),
			estsLen = ests.length;

		for (var i = 0; i < estsLen; i++) {
			$(ests[i]).removeClass("on");
		}
	}

	/**
	 * @param {Number} type - �������� Ŭ���� ������ȣ
	 * @description ������ �� Ŭ�� �̺�Ʈ
	 */
	function clickEstTab(type) {
		initEstimateTab();
		//������ ���� , �������� �ǿ��� �������� Ŭ���ϴ� ��쿡�� ������ ���� ������ �ε� 
		if($("#estimate_max1").hasClass("on") || $("#estimate_max2").hasClass("on")){
			wingAjaxDataModule.getEstimateDetailData(type);
		}else{
			wingAjaxDataModule.loadEstimateData(type);
		}
	}

	/**
	 * @param {Object} obj - ������ ���� - �������� ��ü
	 * @description ���������� - ������ �� Ŭ�� �̺�Ʈ
	 */
	function clickModiEstTab(obj) {
		initEstimateTab();
		wingAjaxDataModule.getEstimateDetailData(obj.value);
	}

	/**
	 * @param {HTMLElement} obj - ��ǰ���� ��ư a tag ��ü
	 * @description ������ 1�ܿ��� ��ǰ ���� ��ư Ŭ�� �� ȣ��
	 */
	function clickDevareBtn(obj) {
		var id = obj.id.split(",")[0],
			type = obj.id.split(",")[1],
			div = document.getElementById("type" + type),
			stockIdx = div.querySelector("#stock_idx" + id).value,
			name = div.querySelector("#pro_name" + id).innerHTML,
			pointView = div.querySelector("#point_view" + id).value;

		if (id != null && type != null && stockIdx != null && name != null) {
			var prods = div.querySelectorAll("div.estimate_table").length;
			
			//������ ��ǰ���� Ȯ��
			if(prods == 1){
				var obj = div.querySelector(".btn-est-del");

				//���Ŵ��� �������� ��ǰ�� �ִ��� Ȯ��
				if(div.querySelector(".estData").dataset.agentCnt>0){
					if(confirm("�� ������ ��û�� ���Ŵ��� ��û���� �����˴ϴ�.���� �Ͻðڽ��ϱ�?\n")){
						//������ ����
						wingAjaxDataModule.removeEstTemp(obj.dataset.orderIdx, obj.dataset.orderType,"min",obj.dataset.pointView);
						return false;
					}
				}else{
					//������ ����
					if (confirm("���� " + obj.dataset.orderType + " �� ���� �Ͻðڽ��ϱ�?\n")) {
						wingAjaxDataModule.removeEstTemp(obj.dataset.orderIdx, obj.dataset.orderType,"min",obj.dataset.pointView);
					}
				}
			}else{
				if (confirm("[ " + name + " ] ��ǰ�� [ ���� " + type + " ] ���� �����մϴ�\n")) {
					wingAjaxDataModule.removeProduct(type, stockIdx, pointView);
				}
			}

		} else {
			drawToastWing("�����Ͻ� ��ǰ�� ������ �� �����ϴ�.");
		}
	}

	/**
	 * @param {HTMLElement} obj - ��ǰ���� ��ư a tag ��ü
	 * @description ������ 2��(����������)���� ��ǰ ���� ��ư Ŭ�� �� ȣ��
	 */
	function clickDevareBtnMax(obj) {
		console.log(obj);
		var id = obj.id.split(",")[0],
			type = obj.id.split(",")[1],
			div = document.getElementById("estimate_max1"),
			stockIdx = div.querySelector("#stock_idx" + id).value,
			name = div.querySelector("#pro_name" + id).value,
			pointView = div.querySelector("#point_view" + id).value,
			proStandbyStock = div.querySelector("#pro_standby_stock" + id).value;

		if (id != null && type != null && stockIdx != null && name != null) {
			var prods = div.querySelectorAll("table.est_contents tr").length;

			//������ ��ǰ���� Ȯ��
			if(prods == 1){
				var obj = div.querySelector(".btn-est-del-max");

				//���Ŵ��� �������� ��ǰ�� �ִ��� Ȯ��
				if(div.querySelector(".modi_max_order").dataset.agentCnt>0){
					if(confirm("�� ������ ��û�� ���Ŵ��� ��û���� �����˴ϴ�. ���� �Ͻðڽ��ϱ�?\n")){
						//����������
						wingAjaxDataModule.removeEstTemp(obj.dataset.orderIdx, obj.dataset.orderType, "max");
						return false;
					}
				}else{
					//����������
					if ("���� " + obj.dataset.orderType + " �� ���� �Ͻðڽ��ϱ�?\n") {
						wingAjaxDataModule.removeEstTemp(obj.dataset.orderIdx, obj.dataset.orderType, "max");
					}
				}
			}else{
				if (confirm("[ " + name + " ] ��ǰ�� [ ���� " + type + " ] ���� �����մϴ�.\n")) {
					wingAjaxDataModule.removeProductMax(type, stockIdx, pointView);
				}
			}

		} else {
			drawToastWing("�����Ͻ� ��ǰ�� ������ �� �����ϴ�.", "toast-max");
		}
	}

	/**
	 * @description ���������� - üũ ���� ��ư �̺�Ʈ
	 */
	function clickDevareMultiBtn() {
		var checkBoxes = document.getElementById("estimate_max1").querySelectorAll(".chk_modify"),
			checkLen = checkBoxes.length,
			selectArr = [],
			i = 0,
			j = 0;

		for (; i < checkLen; i++) {
			if (checkBoxes[i].checked) {
				selectArr[j] = checkBoxes[i].value;
				j++;
			}
		}
		
		if (selectArr.length < 1) {
			drawToastWing("���õ� �׸��� �����ϴ�! Ȯ�� ���ּ���.", "toast-max");
		} 
		else if(checkLen == selectArr.length){
			//���Ŵ��� �������� ��ǰ�� �ִ��� Ȯ��
			if(document.querySelector("#estimate_max1 .modi_max_order").dataset.agentCnt>0){
				if(confirm("�� ������ ��û�� ���Ŵ��� ��û���� �����˴ϴ�.���� �Ͻðڽ��ϱ�?\n")){
					wingAjaxDataModule.removeMultiplePro(selectArr);
					return false;
				}
			}
			else{
				var obj = document.querySelector("#estimate_max1 .btn-est-del-max");
				if (confirm("���� "+ obj.dataset.orderType +" �� ���� �Ͻðڽ��ϱ�?\n")) {
					wingAjaxDataModule.removeEstTemp(obj.dataset.orderIdx, obj.dataset.orderType, "max");
				}
			}
		}
		else {
			if (confirm("üũ�� ��ǰ�� �������� ���� �Ͻðڽ��ϱ�?\n")) {
				wingAjaxDataModule.removeMultiplePro(selectArr);	
			}
			
		}
	}

	/**
	 * @description ������ ���� - ���ɻ�ǰ���� ��ư �̺�Ʈ
	 */
	function clickSaveWishBtn() {
		var checkBoxes = document.getElementById("estimate_max1").querySelectorAll(".chk_modify"),
			checkLen = checkBoxes.length,
			proArr = [],
			qtyArr = [],
			i = 0,
            j = 0
            ;

		for (; i < checkLen; i++) {
			if (checkBoxes[i].checked) {
				var id = checkBoxes[i].id,
					error = document.querySelector("#estimate_max1 #ecode" + id).value;

				if (error > 0) {
					if (confirm("���ɻ�ǰ�� �߰��� �� ���� ��ǰ�� ���ԵǾ��ֽ��ϴ�! �����ϰ� �߰� �Ͻðڽ��ϱ�?\n")) {
						break;
					} else {
						return false;
					}
				}
			}
		}

        for (i = 0; i < checkLen; i++) {
            if (checkBoxes[i].checked) {
                var id = checkBoxes[i].id,
                    error = document.querySelector("#estimate_max1 #ecode" + id).value;

                if (error == 0) {
                    proArr[j] = checkBoxes[i].value;
                    qtyArr[j] = document.getElementById("qty" + checkBoxes[i].id).querySelector(".input_qty").value;
                    j++;
                }
            }
        }

		if (proArr.length < 1 || qtyArr.length < 1) {
			drawToastWing("���õ� �׸��� �����ϴ�! Ȯ�� ���ּ���.", "toast-max");
		//checkbox all ����
		} else {
			wingAjaxDataModule.saveWishProducts(proArr, qtyArr);
		}

	}
	/**
	 * @param {HTMLElement} ������ �� ��ǰ�� li
	 * @description ������ ��ǰ�� Ŭ���� ��ǰ �� ���̾��˾� ����
	 */
	function clickEstProTitle(target){
		var idx = target.dataset.idx,
			proIdx = target.dataset.proIdx,
			deliveryType = target.dataset.deliveryType;
		
		if(deliveryType==3){
			window.open('proIncomingNoti.action?proIdx=' + proIdx + "&proStockIdx=" + idx, '', "width=460,height=600,top=");
		}
		else if(deliveryType==5){
			window.open('proStopInfo.action?proIdx=' + proIdx + "&proStockIdx=" + idx, '', "width=460,height=600,top=");
		}else{
			proPopupModule.makeProDetail(idx, proIdx);
		}
	}

	/**
	 * @param {HTMLElement} ������ �� ��ǰ�� li
	 * @description ������ ��ǰ�� Ŭ���� ��ǰ �� ���̾��˾� ����
	 */
	function clickReorderProTitle(target){
		var idx = target.dataset.idx,
			proIdx = target.dataset.proIdx,
			deliveryType = target.dataset.deliveryType,
			proStatus = target.dataset.proStatus;
		
		if(proStatus==1){
			if(deliveryType==3){
				window.open('proIncomingNoti.action?proIdx=' + proIdx + "&proStockIdx=" + idx, '', "width=460,height=600,top=");
			}
			else if(deliveryType!=5){
				proPopupModule.makeProDetail(idx, proIdx);
			}
		}
	}

	/**
	 * @param {HTMLElement} target - check-box element
	 * @description ������ �����ǿ��� ��ü���� üũ�ڽ� Ŭ�� �̺�Ʈ �Լ�
	 */
	function clickAllCheck(target, className) {
		allSelect(document.querySelectorAll("input." + className), target.checked);
	}
	
	/**
	 * @description 
	 */
	function clickAllCheckCart(target, className) {
		allSelectCart(document.querySelectorAll("input."+className), target.checked);
	}


	/**
	 * @description ���ɻ�ǰ �� - üũ�� ��ǰ �������� ��ư Ŭ�� �̺�Ʈ �Լ�
	 */
	function clickWishSaveEst() {
		var estSelectBox = document.querySelector("#wish_product .est_all_type"),
			type = estSelectBox.options[estSelectBox.selectedIndex].value,
			checkBoxes = document.querySelectorAll("#wish_product .wishCheck"),
			checkLen = checkBoxes.length,
			proArr = [],
			qtyArr = [],
			i = 0,
			j = 0
			;

		if (type != null) {
			for (; i < checkLen; i++) {
				if (checkBoxes[i].checked) {
					var id = checkBoxes[i].id,
						error = document.querySelector("#wish_product #ecode" + id).value;
					
					if (error > 0) {
						if (confirm("������ �߰��� �� ���� ��ǰ�� ���ԵǾ��ֽ��ϴ�! �����ϰ� �߰� �Ͻðڽ��ϱ�?\n")) {
							break;
						} else {
							return false;
						}
					}
				}
			}

            for (i = 0; i < checkLen; i++) {

                if (checkBoxes[i].checked) {
                    var id = checkBoxes[i].id,
                        error = document.querySelector("#wish_product #ecode" + id).value;

                    if (error == 0) {
                        var pro = checkBoxes[i].value;
                        var qty = document.querySelector("#wish_product #qty" + id).value;
                        if (pro)
                            proArr[j] = pro;
                        if (qty)
                            qtyArr[j] = qty;
                        j++;
                    
                    }
                }
            }

            if (proArr.length != 0) {
                var data = {
                    "proArr" : proArr,
                    "qtyArr" : qtyArr,
                    "order_type" : type,
                    "saveFlag" : 2
                };
              
               wingAjaxDataModule.addProductsToEstimate(data);
               
            } else {
                drawToastWing("���õ� �׸��� �����ϴ�! Ȯ�� ���ּ���.", "toast-max");
            }
		}
	}

	/**
	 * @description ���ú���ǰ �� - üũ�� ��ǰ �������� ��ư Ŭ�� �̺�Ʈ �Լ�
	 */
	function clickTodaySaveEst(target) {

		if(target.dataset.level==70){
			alert("�����ڿ� ���� ������ ���ѵǾ����ϴ�!\n"); return;
		}

		var type = document.querySelector("#today-product .today-sel-type").value,
			checkBoxes = document.querySelectorAll("#today-product input.proCheck"),
			checkLen = checkBoxes.length,
			proArr = [],
			qtyArr = [],
			pointViewArr = [],
			i = 0,
            j = 0
            ;

		if (type != null) {

			for (; i < checkLen; i++) {
				if (checkBoxes[i].checked) {
					var id = checkBoxes[i].id,
						error = document.querySelector("#today-product #ecode" + id).value;

					if (error > 0) {
						if (confirm("������ �߰��� �� ���� ��ǰ�� ���ԵǾ� �ֽ��ϴ�! �����ϰ� �߰��Ͻðڽ��ϱ�?\n")) {
							break;
						} else {
							return false;
						}
					}

				}
			}

            for (i = 0; i < checkLen; i++) {
                if (checkBoxes[i].checked) {
                    var id = checkBoxes[i].id,
                        error = document.querySelector("#today-product #ecode" + id).value;

                    if (error == 0) {
                        var pro = document.querySelector("#today-product ul#ul"+id).querySelector("#idx").value,
                            qty = document.querySelector("#today-product #qty" + id).value,
                            pointView = document.querySelector("#today-product #point_view").value;
                        
                        if (pro) proArr[j] = pro;
                        if (qty) qtyArr[j] = qty;
                        if (pointView) pointViewArr[j] = pointView;
                        j++;
                    }
                }
            }

            if (proArr.length != 0) {
                var data = {
                    "proArr" : proArr,
                    "qtyArr" : qtyArr,
                    "order_type" : type,
                    "pointArr" : pointViewArr,
                    "saveFlag" : 4
                };

                wingAjaxDataModule.addProductsToEstimate(data);
            } else {
                drawToastWing("���õ� �׸��� �����ϴ�! Ȯ�� ���ּ���.", "toast-max");
            }
		}
	}

	/**
	 * @description ���ú���ǰ üũ�� ��ǰ ���ɻ�ǰ ����
	 */
	function clickTodaySaveWish(target) {

		if(target.dataset.level==70){
			alert("�����ڿ� ���� ������ ���ѵǾ����ϴ�!\n"); return;
		}

		var type = document.querySelector("#today-product .today-sel-type").value,
			checkBoxes = document.querySelectorAll("#today-product input.proCheck"),
			checkLen = checkBoxes.length,
			proArr = [],
			qtyArr = [],
			i = 0,
            j = 0
            ;

		if (type != null) {

			for (; i < checkLen; i++) {
				if (checkBoxes[i].checked) {
					var id = checkBoxes[i].id,
						error = document.querySelector("#today-product #ecode" + id).value;

					if (error > 0) {
						if (confirm("������ �߰��� �� ���� ��ǰ�� ���ԵǾ� �ֽ��ϴ�! �����ϰ� �߰��Ͻðڽ��ϱ�?\n")) {
							break;
						} else {
							return false;
						}
					}

				}
			}

            for (i = 0; i < checkLen; i++) {
                if (checkBoxes[i].checked) {
                    var id = checkBoxes[i].id,
                        error = document.querySelector("#today-product #ecode" + id).value;

                    if (error == 0) {
                        var pro = checkBoxes[i].value,
                            qty = document.querySelector("#today-product #qty" + id).value;
                        if (pro)
                            proArr[j] = pro;
                        if (qty)
                            qtyArr[j] = qty;
                        j++;
                    }
                }
            }
            if (proArr.length > 0 && qtyArr.length > 0) {
                wingAjaxDataModule.saveWishTodayProducts(proArr, qtyArr);
            } else {
                drawToastWing("���õ� �׸��� �����ϴ�! Ȯ�� ���ּ���.", "toast-max");
            }
		}
	}



	/**
	 * @description ���ɻ�ǰ üũ����
	 */
	function clickDelWishProducts() {
		var checkBoxes = document.querySelectorAll("#wish_product .wishCheck"),
			checkLen = checkBoxes.length,
			proArr = [],
			qtyArr = [],
			i = 0,
			j = 0;

		for (; i < checkLen; i++) {

			if (checkBoxes[i].checked) {
				proArr[j] = checkBoxes[i].value;
				qtyArr[j] = document.getElementById("qty" + checkBoxes[i].id).value;
				j++;
			}
		}

		if (proArr.length != 0) {

			var tabs = document.querySelectorAll("#wish_product .sortCode"),
				len = tabs.length,
				sort = null;

			for (var i = 0; i < len; i++) {
				if ($(tabs[i]).hasClass("on")){
					sort = tabs[i].querySelector("span").id;
				}
			}

			if (sort == 0) sort = null;

			if (confirm("üũ�� ��ǰ�� ���ɻ�ǰ���� ���� �Ͻðڽ��ϱ�?\n")) {
				wingAjaxDataModule.removeProductsFromWish(proArr,sort,getNameSortValue("wish_product"));	
			}
			

		} else {
			drawToastWing("���õ� �׸��� �����ϴ�! Ȯ�� ���ּ���.", "toast-max");
		}
	}

	/**
	 * @description ������ǰ ��ü ����
	 */
	function allSelect(fields, check) {
		var len = fields.length,
			i = 0;

		for (; i < len; i++) {
			fields[i].checked = check;
		}
	}
	
	/**
	 * @description �����ٱ��� ��ü ����
	 */
	function allSelectCart(fields, check){
		var len = fields.length,
			i = 0;
		
		for(; i<len; i++){
			fields[i].checked = check;
		}
		changeEstCheck();
	}

	/**
	 * @description �����̵� ���콺 ���� �̺�Ʈ
	 */
	function openContent() {
		var estimateMove = document.getElementById("menu1");
		estimateMove.style.display = 'block';
	}

	/**
	 * @description �����̵� ���콺 �ƿ� �̺�Ʈ
	 */
	function closeContent() {
		var estimateMove = document.getElementById("menu1");
		estimateMove.style.display = 'none';
	}

	/**
	 * @description ���������� - �����̵� ��ư �̺�Ʈ
	 */
	function clickMoveEstBtn(obj) {
		var checkBoxes = document.getElementById("estimate_max1").querySelectorAll(".chk_modify"),
			checkLen = checkBoxes.length,
			selectArr = [],
			i = 0,
			j = 0,
			type = obj.value;
		
		for (; i < checkLen; i++) {
			if (checkBoxes[i].checked) {
				selectArr[j] = checkBoxes[i].value;
				j++;
			}
		}

		if (selectArr.length < 1) {
			drawToastWing("���õ� �׸��� �����ϴ�! Ȯ�� ���ּ���.", "toast-max");
		} 
		else {
			wingAjaxDataModule.moveEstimatePro(selectArr, type);
		}

	}

	/**
	 * @param {HTMLElement} obj - ��������Ī ������ư object
	 * @description ������ ��Ī ���� ��ư Ŭ���� �̺�Ʈ 
	 */
	function clickEstTitleModiBtn(obj) {
		if (obj.id != null) {
			var type = obj.dataset.type,
				title = document.getElementById("type" + type).querySelector("#order_title" + type).value;

			if (title == null) title = "";
			wingAjaxDataModule.modifyEstTitle(type, title);
		}
	}

	/**
	 * �������� ������ �������� ������ �̺�Ʈ ���
	 */
	function appendEstTitle(type, title) {
		var liTab = document.querySelector("#li" + type);

		if (!$(liTab).hasClass("estTitle")) {
			eventModule.addEventObject("mouseenter", liTab, estTabHoverTitleEffect);
			eventModule.addEventObject("mouseleave", liTab, estTabHoverTitleEffect);
			$(liTab).addClass("estTitle");
		}
		if(title=="") title = "��Ī ����";
		liTab.querySelector("span.order-title").innerHTML = title;
	}

	/**
	 * @param {HTMLElement} obj - ���������� - ��������Ī ������ư object
	 * @description ������ ��Ī ���� ��ư Ŭ���� �̺�Ʈ 
	 */
	function clickEstTitleModiBtnMax(obj) {
		if (obj.id != null) {
			var type = obj.dataset.type,
				title = document.getElementById("estimate_max1").querySelector(".order_title").value;

			if (title == null) title = "";
			wingAjaxDataModule.modifyEstTitleMax(type, title);
		}
	}

	/**
	 * @param {HTMLElement} obj - ���������� button element.1�� ������
	 * @description ���������� ��ư Ŭ�� �̺�Ʈ
	 */
	function clickEstDelBtn(obj) {
		if(document.querySelector("#type"+obj.dataset.orderType+" .estData").dataset.agentCnt > 0){
			if(confirm("�� ������ ��û�� ���Ŵ��� ��û���� �����˴ϴ�.���� �Ͻðڽ��ϱ�?\n")){
				wingAjaxDataModule.removeEstTemp(obj.dataset.orderIdx,obj.dataset.orderType,"min");
				return false;
			}
		}
		else{
			if (confirm("�ش� ������ ���� �����˴ϴ�!\n���� " + obj.dataset.orderType + " �� ���� �Ͻðڽ��ϱ�?\n")) {
				wingAjaxDataModule.removeEstTemp(obj.dataset.orderIdx,obj.dataset.orderType,"min");
			}
		}
	}
	
	/**
	 * @param {HTMLElement} obj - ���������� button element.2�� ����������
	 * @description ���������� ��ư Ŭ�� �̺�Ʈ
	 */
	function clickEstDelBtnDetail(obj) {
		if(document.querySelector("#estimate_max1 .modi_max_order").dataset.agentCnt > 0){
			if(confirm("�� ������ ��û�� ���Ŵ��� ��û���� �����˴ϴ�.���� �Ͻðڽ��ϱ�?\n")){
				wingAjaxDataModule.removeEstTemp(obj.dataset.orderIdx,obj.dataset.orderType,"max");
				return false;
			}
		}else{
			if (confirm("�ش� ������ ���� �����˴ϴ�!\n���� " + obj.dataset.orderType + " �� ���� �Ͻðڽ��ϱ�?\n")) {
				wingAjaxDataModule.removeEstTemp(obj.dataset.orderIdx,obj.dataset.orderType,"max");
			}
		}

	}

	/**
	 * @param {HTMLElement} div - ������ �� div object
	 * @param {Number} id - ���� �����ϴ� ��ǰ�� index
	 * @description ������ �� �ѱݾ�, �Ұ� ����
	 */
	function initEstTotal(div, id) {
		var inputArr = div.querySelectorAll(".input_qty"),
			priceArr = div.querySelectorAll("input.proPrice"),
			len = inputArr.length,
			total = 0,
			text = "",
			i = 0;

		for (; i < len; i++) {
			total += parseInt(inputArr[i].value) * parseInt(priceArr[i].value);
		}

		text = commonModule.commas(total);
		div.querySelector(".total_count_m").innerHTML = text;
		/*if (div.querySelector(".total_c") != null) {
			div.querySelector(".total_c").innerHTML = text;
		}*/
		div.querySelector("#subTotal" + id).innerHTML = commonModule.commas(parseInt(inputArr[id].value) * parseInt(priceArr[id].value));
	}

	/**
	 * @param {HTMLElement} obj - ���� ���� ��ư
	 * @description �������� ��ư Ŭ�� �̺�Ʈ
	 */
	function clickCountUp(obj) {
		var id = obj.id.split(",")[0],
			type = obj.id.split(",")[1],
			div = document.getElementById("type" + type),
			qtyText = obj.parentElement.previousSibling,
			qtyValue = qtyText.value,
			idx = div.querySelector("#stock_idx" + id).value,
			point_view = div.querySelector("#point_view" + id).value,
			pro_standby_stock = div.querySelector("#pro_standby_stock" + id).value,
			sale_qty = div.querySelector("#sale_qty" + id).value;


		if($(obj).hasClass("except_agent")){
			drawToastWing("���Ŵ��� ��ǰ�� ���������� �Ұ��մϴ�!","toast-min");
		}
		else{
			if(point_view == 1){
				if(Number(qtyValue) >= Number(pro_standby_stock)){
					drawToastWing("������ �ִ� "+pro_standby_stock+"������ ���Ű��� �մϴ�!", "toast-min");
					qtyText.value = pro_standby_stock;
					return false;
				}
			}else if(point_view == 2){
				if(Number(sale_qty) >= Number(pro_standby_stock)){
					drawToastWing("�б��� �ִ� "+pro_standby_stock+"������ ���Ű��� �մϴ�!", "toast-min");
					return false;
				}
			}
		
			if (qtyValue < 9999) {
				qtyText.value = ++qtyValue;
					
				initEstTotal(div, id);
				wingAjaxDataModule.modifyProQty(type, qtyValue, idx, "min",point_view);
				if(point_view == 2){
					sale_qty = Number(sale_qty) + 1;
				}
			} else {
				drawToastWing("�ִ� ��ǰ ������ �ʰ��Ͽ����ϴ�!", "toast-min");
				return false;
			}
	
		}
	}


	/**
	 * @param {HTMLElement} obj - ���� ���� ��ư
	 * @description �������� ��ư Ŭ�� �̺�Ʈ --> ���ɻ�ǰ
	 */
	function clickCountUpWish(obj) {
		var id = obj.id.split(",")[0],
			div = document.getElementById("wish_product"),
			qtyText = obj.parentElement.previousSibling,
			qtyValue = qtyText.value,
			idx = div.querySelector("#idx" + id).value,
			pointView = div.querySelector("#point_view" + id).value,
			proStandbyStock = div.querySelector("#pro_standby_stock" + id).value,
			sale_qty = div.querySelector("#sale_qty" + id).value;
		
		if(pointView == 1){//����� & �������� & ��������
			if(Number(qtyValue) >= Number(proStandbyStock)){
				drawToastWing("������ �ִ� "+proStandbyStock+"������ ���Ű��� �մϴ�!", "toast-max");
				qtyText.value  = proStandbyStock;
				return false;
			}
		}else if(pointView == 2){//��Ż����ũ
			if(((Number(sale_qty)) + ((Number(qtyValue)))) >= Number(proStandbyStock)){
				drawToastWing("�б��� �ִ� "+proStandbyStock+"������ ���Ű��� �մϴ�!", "toast-max");
				return false;
			}
		}

		if (qtyValue < 9999) {
			qtyText.value = ++qtyValue;
		//wingAjaxDataModule.modifyProQty(type, qtyValue, idx, "min");
		} else {
			drawToastWing("�ִ� ��ǰ ������ �ʰ��Ͽ����ϴ�!", "toast-max");
			return false;
		}
	}

	/**
	 * @param {HTMLElement} obj - ���� ���� ��ư
	 * @description �������� ��ư Ŭ�� �̺�Ʈ --> ���� �� ��ǰ
	 */
	function clickCountUpToday(obj) {
		var id = obj.id.split(",")[0],
			div = document.getElementById("today-product"),
			qtyText = obj.parentElement.previousSibling,
			qtyValue = qtyText.value,
			idx = div.querySelector("#ul" + id).querySelector("#idx").value,
			pointView = div.querySelector("#ul" + id).querySelector("#point_view").value,
			proStandbyStock = div.querySelector("#ul" + id).querySelector("#pro_standby_stock").value,
			sale_qty =  div.querySelector("#ul" + id).querySelector("#sale_qty").value;

		if(pointView == 1){//����� & �������� & ��������
			if(Number(qtyValue) >= Number(proStandbyStock)){
				drawToastWing("������ �ִ� "+proStandbyStock+"������ ���Ű��� �մϴ�!", "toast-max");
				qtyText.value  = proStandbyStock;
				return false;
			}
		}else if(pointView == 2){//��Ż����ũ
			if(((Number(sale_qty)) + ((Number(qtyValue)))) >= Number(proStandbyStock)){
				drawToastWing("�б��� �ִ� "+proStandbyStock+"������ ���Ű��� �մϴ�!", "toast-max");
				return false;
			}
		}
		
		if (qtyValue < 9999) {
			qtyText.value = ++qtyValue;
		//wingAjaxDataModule.modifyProQty(type, qtyValue, idx, "min");
		} else {
			drawToastWing("�ִ� ��ǰ ������ �ʰ��Ͽ����ϴ�!", "toast-max");
			return false;
		}
	}

	/**
	 * @param {HTMLElement} obj - ���� ���� ��ư
	 * @description �������� ��ư Ŭ�� �̺�Ʈ (�ֹ���ǰ �籸��)
	 */
	function clickCountUpRePurchase(obj) {
		var id = obj.id,
			div = document.getElementById("product_reorder"),
			qtyText = obj.parentElement.previousSibling,
			qtyValue = qtyText.value,
			idx = div.querySelector("#stock_idx" + id).value,
			pointView = div.querySelector("#point_view" + id).value,
			proStandbyStock = div.querySelector("#pro_standby_stock" + id).value,
			sale_qty = div.querySelector("#sale_qty" + id).value;

		if(pointView == 1){//����� & �������� & ��������
			if(Number(qtyValue) >= Number(proStandbyStock)){
				drawToastWing("������ �ִ� "+proStandbyStock+"������ ���Ű��� �մϴ�!", "toast-max");
				qtyText.value  = proStandbyStock;
				return false;
			}
		}else if(pointView == 2){//��Ż����ũ
			if(((Number(sale_qty)) + ((Number(qtyValue)))) >= Number(proStandbyStock)){
				drawToastWing("�б��� �ִ� "+proStandbyStock+"������ ���Ű��� �մϴ�!", "toast-max");
				return false;
			}
		}
		if (qtyValue < 9999) {
			qtyText.value = ++qtyValue;
			div.querySelector("#qty" + id).value = qtyText.value;
		} else {
			drawToastWing("�ִ� ��ǰ ������ �ʰ��Ͽ����ϴ�!", "toast-max");
			return false;
		}
	}

	/**
	 * @param {HTMLElement} obj - ���� ���� ��ư
	 * @description �������� ��ư Ŭ�� �̺�Ʈ
	 */
	function clickCountDown(obj) {
		var id = obj.id.split(",")[0],
			type = obj.id.split(",")[1],
			div = document.getElementById("type" + type),
			qtyText = obj.parentElement.previousSibling,
			qtyValue = qtyText.value,
			idx = div.querySelector("#stock_idx" + id).value,
			point_view = div.querySelector("#point_view" + id).value,
			sale_qty = div.querySelector("#sale_qty" + id).value;
		
		
		if($(obj).hasClass("except_agent")){
			drawToastWing("���Ŵ��� ��ǰ�� ���������� �Ұ��մϴ�!","toast-min");
		}
		else{
			if (qtyValue > 1) {
				qtyText.value = --qtyValue;
				
				initEstTotal(div, id);
				wingAjaxDataModule.modifyProQty(type, qtyValue, idx, "min",point_view);
				if(point_view == 2){
					document.getElementById("sale_qty"+id).value = Number(sale_qty) - 1;
				}
			} else {
				drawToastWing("��ǰ ������ �ּ� 1�� �̻��̾�� �մϴ�!", "toast-min");
				return false;
			}
		}

	}

	/**
	 * @param {HTMLElement} obj - ���� ���� ��ư
	 * @description �������� ��ư Ŭ�� �̺�Ʈ --> ���ɻ�ǰ
	 */
	function clickCountDownWish(obj) {
		var qtyText = obj.parentElement.previousSibling,
			qtyValue = qtyText.value;

		if (qtyValue > 1) {
			qtyText.value = --qtyValue;
		} else {
			drawToastWing("��ǰ ������ �ּ� 1�� �̻��̾�� �մϴ�!", "toast-max");
			return false;
		}
	}

	/**
	 * @param {HTMLElement} obj - ���� ���� ��ư
	 * @description �������� ��ư Ŭ�� �̺�Ʈ --> ���ú���ǰ
	 */
	function clickCountDownToday(obj) {
		var qtyText = obj.parentElement.previousSibling,
			qtyValue = qtyText.value;

		if (qtyValue > 1) {
			qtyText.value = --qtyValue;
		} else {
			drawToastWing("��ǰ ������ �ּ� 1�� �̻��̾�� �մϴ�!", "toast-max");
			return false;
		}
	}

	/**
	 * @param {HTMLElement} obj - ���� ���� ��ư
	 * @description �������� ��ư Ŭ�� �̺�Ʈ (�ֹ���ǰ �籸��)
	 */
	function clickCountDownRePurchase(obj) {
		var id = obj.id,
			div = document.getElementById("product_reorder"),
			qtyText = obj.parentElement.previousSibling,
			qtyValue = qtyText.value;

		if (qtyValue > 1) {
			qtyText.value = --qtyValue;
			div.querySelector("#qty" + id).value = qtyText.value;
		} else {
			drawToastWing("��ǰ ������ �ּ� 1�� �̻��̾�� �մϴ�!", "toast-max");
			return false;
		}
	}

	/**
	 * @param {HTMLElement} obj - ���� ���� ��ư
	 * @description �������� ��ư Ŭ�� �̺�Ʈ
	 */
	function clickCountUpMax(obj) {
		var id = obj.id.split(",")[0],
			type = obj.id.split(",")[1],
			div = document.getElementById("estimate_max1"),
			qtyText = obj.parentElement.previousSibling,
			qtyValue = qtyText.value,
			idx = div.querySelector("#stock_idx" + id).value,
			pointView = div.querySelector("#point_view" + id).value,
			proStandbyStock = div.querySelector("#pro_standby_stock" + id).value,
			sale_qty = div.querySelector("#sale_qty" + id).value;
			
		if($(obj).hasClass("except_agent")){
			drawToastWing("���Ŵ��� ��ǰ�� ���������� �Ұ��մϴ�!","toast-max");
		}
		else{
			if(pointView == 1){//����� & �������� & ��������
				if(Number(qtyValue) >= Number(proStandbyStock)){
					drawToastWing("������ �ִ� "+proStandbyStock+"������ ���Ű��� �մϴ�!", "toast-max");
					qtyText.value  = proStandbyStock;
					return false;
				}
			}else if(pointView == 2){//��Ż����ũ
				if(Number(sale_qty) >= Number(proStandbyStock)){
					drawToastWing("�б��� �ִ� "+proStandbyStock+"������ ���Ű��� �մϴ�!", "toast-max");
					return false;
				}
			}
			
			if (qtyValue < 9999) {
				qtyText.value = ++qtyValue;
				initEstTotal(div, id);
				wingAjaxDataModule.modifyProQty(type, qtyValue, idx, "max",pointView);
				if(pointView == 2){
					div.querySelector("#sale_qty" + id).value = Number(sale_qty) + 1;
					console.log(document.getElementById("sale_qty"+id).value);
				}
			} else {
				drawToastWing("�ִ� ��ǰ ������ �ʰ��Ͽ����ϴ�!", "toast-max");
				return false;
			}
		}

	}

	/**
	 * @param {HTMLElement} obj - ���� ���� ��ư
	 * @description �������� ��ư Ŭ�� �̺�Ʈ
	 */
	function clickCountDownMax(obj) {
		var id = obj.id.split(",")[0],
			type = obj.id.split(",")[1],
			div = document.getElementById("estimate_max1"),
			qtyText = obj.parentElement.previousSibling,
			qtyValue = qtyText.value,
			idx = div.querySelector("#stock_idx" + id).value,
			point_view = div.querySelector("#point_view" + id).value,
			sale_qty = div.querySelector("#sale_qty" + id).value;
			
		if($(obj).hasClass("except_agent")){
			drawToastWing("���Ŵ��� ��ǰ�� ���������� �Ұ��մϴ�!","toast-max");
		}
		else{
			if (qtyValue > 1) {
				qtyText.value = --qtyValue;
				initEstTotal(div, id);
				wingAjaxDataModule.modifyProQty(type, qtyValue, idx, "max",point_view);
				if(point_view == 2){
					div.querySelector("#sale_qty" + id).value = Number(sale_qty) - 1;
					console.log(document.getElementById("sale_qty"+id).value);
				}
			} else {
				drawToastWing("��ǰ ������ �ּ� 1�� �̻��̾�� �մϴ�!", "toast-max");
				return false;
			}
		}
	}

	/**
	 * @param {HTMLElement} obj - ���ɻ�ǰ �����߰� ������ ��ư
	 */
	function clickWishAddCart(obj) {
		var idx = obj.id,
			div = document.getElementById("wish_product"),
			proStockIdx = div.querySelector("#idx" + idx).value,
			proIdx = div.querySelector("#pro_idx" + idx).value,
			qty = div.querySelector("#liQty" + idx + " .input_qty").value,
			delivery_type = div.querySelector("#delivery_type" + idx).value,
			stopCont = div.querySelector("#stop_content" + idx).value,
			point_view = div.querySelector("#point_view" + idx).value,
			pro_standby_stock = div.querySelector("#pro_standby_stock" + idx).value,
			options = document.querySelector("select#estSel" + idx).options,
			optionsLen = options.length,
            type
            ;

		//�������
		if (delivery_type == 2) {
			
			if (!stopCont || stopCont == "null") {
				stopCont = "�������� �������� ����� �����Ǵ� ��ǰ�Դϴ�! ������ �߰� �Ͻðڽ��ϱ�?\n";
			}else {
				stopCont = stopCont+"\n";
			}
			if (!confirm(stopCont)) return;
		//�Ǹ��ߴ�	
		} else if (delivery_type == 4) {
			stopCont = stopCont+"\n";
			if (!confirm(stopCont)) return;
		//�Ͻ�ǰ��	
		} else if (delivery_type == 3) {
			window.open('proIncomingNoti.action?proIdx=' + proIdx + "&proStockIdx=" + proStockIdx, '', "width=460,height=600,top=");
			return;
		}

        //������ ��ȣ ���ð� ��ȸ
        for (var i = 0; i < optionsLen; i++) {
            if (options[i].selected) {
                type = options[i].value;
                break;
            }
        }

        if (type != null && proStockIdx != null && qty != null) {
            var data = {
                "order_type" : type,
                "proStockIdx" : proStockIdx,
                "proQuantity" : qty,
                "saveFlag" : 2,
                "point_view" : point_view,
                "pro_standby_stock" : pro_standby_stock
            };

            $.ajax({
                cache : false,
                type : 'POST',
                crossDomain : true,
                url : 'isExistInEstimate.action',
                data : data,
                success : function(resultData) {
                    if (resultData.result == 'success') {
                    	if(resultData.point_view != '0'){
                    		//������
                    		wingAjaxDataModule.checkLimitPro(data);
                    	}else{
                    		wingAjaxDataModule.addProToEst(data);
                    	}
                        
                    } else {
                        if (confirm('[ ����' + resultData.selOrderType + ' ] �� "' + div.querySelector("#pro_name" + idx).value + '" ��ǰ�� ����ֽ��ϴ�. �߰� �Ͻðڽ��ϱ�?\n')) {
                        	if(resultData.point_view != '0'){
                        		//������
                        		wingAjaxDataModule.checkLimitPro(data);
                        	}else{
                        		wingAjaxDataModule.addProToEst(data);
                        	}
                        } else return false;
                    }
                }
            });
        }
	}

	/**
	 * @param {HTMLElement} obj - ���ɻ�ǰ ���� ������ ��ư
	 */
	function clickDelWish(obj) {
		var idx = obj.id,
			div = document.getElementById("wish_product"),
			proStockIdx = div.querySelector("#idx" + idx).value;

		if (proStockIdx != null) {
			if (confirm("���ɻ�ǰ���� ���� �Ͻðڽ��ϱ�?\n")) {
				wingAjaxDataModule.removeProWishList(proStockIdx, getSortCodeValue("wish_product"), getNameSortValue("wish_product"));	
			}
			
		}
	}

	/**
	 * @description ���������� - ���ݰ��� ��ư �̺�Ʈ
	 */
	function clickRefreshBtn() {
		var errors = document.querySelectorAll("#estimate_max1 .ecode"),
			errLen = errors.length,
			proArr = [],
			j = 0;

		for (var i = 0; i < errLen; i++) {
			if (errors[i].value == 2) {
				proArr[j] = document.querySelector("#estimate_max1 #stock_idx" + i).value;
				j++;
			}
		}

		if (proArr.length != 0) {
			var orderIdx = document.querySelector("#estimate_max1 #order_idx_hidden").value,
				type = document.querySelector("#estimate_max1 #orderType").value;

			wingAjaxDataModule.refreshProductPrice(orderIdx, type, proArr);
		} else {
			drawToastWing("���� ������ �ʿ��� ��ǰ�� �������� �ʽ��ϴ�!", "toast-max");
		}
	}
	

	/**
	 * @description ����������- ���ݰ��� �ȳ����� ���콺���� �̺�Ʈ 
	 */
	function priceInfoOver(){
		$(".price_info").stop().slideDown("slow");
	}
	function priceInfoOut(){
		$(".price_info").stop().slideUp("slow");
	}
	
	/**
	 * @description ��������������- ������������ �ȳ����� ���콺���� �̺�Ʈ 
	 */
	function modiInfoOver(){
		$(".modify_order_info").stop().slideDown("slow");
	}
	function modiInfoOut(){
		$(".modify_order_info").stop().slideUp("slow");
	}

	/**
	 * @param {HTMLElement} obj - ������� - ��� ��ư
	 * @description ������� - ��¹�ư Ŭ�� �̺�Ʈ
	 */
	function clickPrintDoc(obj) {
		
		var val = obj.dataset.index,
			data = document.querySelector("#print_doc #data"+val),
			orderIdx = data.dataset.orderIdx,
			selDoc = document.querySelector("#print_doc #docOpt" + val),
			selVal = selDoc.options[selDoc.selectedIndex].value;
		
		if (selVal == "" || selVal == null) {
			drawToastWing("���� ������ �������ּ���!", "toast-max");
			return false;
		}
		else{
			if(data.dataset.agentCnt >0){
				alert("���ε��� ���� ���Ŵ��� ��ǰ�� �ֽ��ϴ�! ���Ŵ��� �������� �̵��մϴ�.\n");
				wingAjaxDataModule.loadAgentTempList();
				return false;
			}else{
				if(data.dataset.errorType >=3 ){
					
					if(data.dataset.errorType == 5 ){
						if(confirm("�Ͻ�ǰ���� ��ǰ�� ���ԵǾ��ֽ��ϴ�! ��� �����Ͻðڽ��ϱ�?\n")){
							printDocument(orderIdx, selVal);
						}
					}
					else{
						alert("�ֹ� �Ұ����� ��ǰ�� ���ԵǾ� �ֽ��ϴ�! ������ ���� �������� �̵��մϴ�.\n");
						wingAjaxDataModule.getEstimateDetailData(data.dataset.orderType);
						return false;
					}
				}
				else{
					printDocument(orderIdx, selVal);
				}
			}
		}
		
		//2018.09.04 �����ٱ��� ���μ����� �����ϰ� ����
		/*if (errorCode != 0) {

			if (errorCode == 3) {
				alert("���ε��� ���� ���Ŵ��� ��ǰ�� �ֽ��ϴ�.\n���� [1588-5120] �� ���� �ֹ����ֽñ� �ٶ��ϴ�.\n��ȭ�� ������ ��쿡��,\n�������� > 1:1 ��� > �ֹ� ���� �޴��� �̿��Ͽ� �ֽñ� �ٶ��ϴ�.");
				return false;
			} else if (errorCode == 1) {
				alert("�ֹ��� �Ұ����� ��ǰ�� ���Ե� �����Դϴ�.\n��Ȱ�� ǰ������� �ֹ��� ���� [����������] �޴����� Ȯ�����ֽñ� �ٶ��ϴ�.");
				return false;
			} else if (errorCode == 2) {
				if (confirm("�Ͻ�ǰ���� ��ǰ�� ���ԵǾ��ֽ��ϴ�. \n�׷��� ��� �����Ͻðڽ��ϱ�?", "toast-max")) {
					if (selVal == "" || selVal == null) {
						drawToastWing("���� ������ �������ּ���.", "toast-max");
						return false;
					} else {
						printDocument(orderIdx, selVal);
					}
				}
				return false;
			}
		} else {

			if (selVal == "" || selVal == null) {
				drawToastWing("���� ������ �������ּ���.", "toast-max");
				return false;
			} else {
				printDocument(orderIdx, selVal);
			}
		}*/
	}
	
	/**
	 * @description ǰ�Ǽ� ���� ���� �˾� ����
	 */
	function openDocSample(){
		window.open(PathData.getPath()+"/estimate/popup_doc_sample.jsp","print_sample","scrollbars=yes,width=700,height=670");
	}

	/**
	 * @param {orderIdx} - ������ �ε���
	 * @param {docType} - ���� ����
	 * @description ���� ��� ó��
	 */
	function printDocument(orderIdx, docType) {
		//������
		if (docType == 1) {
			window.open("printDocument.action?order_idx=" + orderIdx, "print_document", "menubar=yes,scrollbars=yes,width=900,height=600,top=" + ((screen.availHeight - 600) / 2) + ",left=" + ((screen.availWidth - 900) / 2));
		}
		//ǰ�Ǽ� A
		else if (docType == 2) {
			window.open('printDeliveryNote.action?type=1&order_idx=' + orderIdx + "&doc_type=1", 'emedicestimate', 'menubar=yes,scrollbars=yes,resizable=yes,width=900,height=800');
		}
		//ǰ�Ǽ� B
		else if (docType == 3) {
			window.open('printDeliveryNote.action?type=2&order_idx=' + orderIdx + "&doc_type=2", 'emedicestimate', 'menubar=yes,scrollbars=yes,resizable=yes,width=900,height=800');
		}
		//ǰ�Ǽ� C
		else if (docType == 4) {
			window.open('printDeliveryNote.action?type=3&order_idx=' + orderIdx + "&doc_type=3", 'emedicestimate', 'menubar=yes,scrollbars=yes,resizable=yes,width=900,height=800');
		}
	}

	/**
	 * @param {HTMLElement} obj - ������� - ���� ��ư
	 * @description ������� - �����ư Ŭ�� �̺�Ʈ
	 */
	function clickSaveDoc(obj) {
		var val = obj.dataset.index,
			data = document.querySelector("#print_doc #data"+val),
			orderIdx = data.dataset.orderIdx,
			selDoc = document.querySelector("#print_doc #docOpt" + val),
			selVal = selDoc.options[selDoc.selectedIndex].value;
	
		if (selVal == "" || selVal == null) {
			drawToastWing("���� ������ �������ּ���!", "toast-max");
			return false;
		}
		else{
			if(data.dataset.agentCnt >0){
				alert("���ε��� ���� ���Ŵ��� ��ǰ�� �ֽ��ϴ�! ���Ŵ��� �������� �̵��մϴ�.\n");
				wingAjaxDataModule.loadAgentTempList();
				return false;
			}
			else{
				if(data.dataset.errorType >=3 ){
					
					if(data.dataset.errorType == 5 ){
						if(confirm("�Ͻ�ǰ���� ��ǰ�� ���ԵǾ��ֽ��ϴ�! ��� �����Ͻðڽ��ϱ�?\n")){
							saveDocument(orderIdx, selVal);
						}
					}
					else{
						alert("�ֹ� �Ұ����� ��ǰ�� ���ԵǾ� �ֽ��ϴ�! ������ ���� �������� �̵��մϴ�.\n");
						wingAjaxDataModule.getEstimateDetailData(data.dataset.orderType);
						return false;
					}
				}
				else{
					saveDocument(orderIdx, selVal);
				}
			}
		}
		
		//2018.09.04 �����ٱ��� ���μ����� �����ϰ� ����
		/*if (errorCode != 0) {

			if (errorCode == 3) {
				alert("���ε��� ���� ���Ŵ��� ��ǰ�� �ֽ��ϴ�.\n���� [1588-5120] �� ���� �ֹ����ֽñ� �ٶ��ϴ�.\n��ȭ�� ������ ��쿡��,\n�������� > 1:1 ��� > �ֹ� ���� �޴��� �̿��Ͽ� �ֽñ� �ٶ��ϴ�.");
				return false;
			} else if (errorCode == 1) {
				alert("�ֹ��� �Ұ����� ��ǰ�� ���Ե� �����Դϴ�.\n��Ȱ�� ǰ������� �ֹ��� ���� [����������] �޴����� Ȯ�����ֽñ� �ٶ��ϴ�.");
				return false;
			} else if (errorCode == 2) {
				if (confirm("�Ͻ�ǰ���� ��ǰ�� ���ԵǾ��ֽ��ϴ�. \n�׷��� ��� �����Ͻðڽ��ϱ�?", "toast-max")) {
					if (selVal == "" || selVal == null) {
						drawToastWing("���� ������ �������ּ���.", "toast-max");
						return false;
					} else {
						saveDocument(orderIdx, selVal);
					}
				}
				return false;
			}
		} else {

			if (selVal == "" || selVal == null) {
				drawToastWing("���� ������ �������ּ���.", "toast-max");
				return false;
			} else {
				saveDocument(orderIdx, selVal);
			}
		}*/
	}

	/**
	 * @param {orderIdx} - ������ �ε���
	 * @param {docType} - ���� ����
	 * @description ���� ���� ó��
	 */
	function saveDocument(orderIdx, docType) {
		//������
		if (docType == 1) {
			document.location.href = "saveExcelDocument.action?order_idx=" + orderIdx;
		}
		//ǰ�Ǽ� A
		else if (docType == 2) {
			document.location.href = 'saveExcelDeliveryNote.action?type=1&order_idx=' + orderIdx + "&doc_type=1";
		}
		//ǰ�Ǽ� B
		else if (docType == 3) {
			document.location.href = 'saveExcelDeliveryNote.action?type=2&order_idx=' + orderIdx + "&doc_type=2";
		}
		//ǰ�Ǽ� C
		else if (docType == 4) {
			document.location.href = 'saveExcelDeliveryNote.action?type=3&order_idx=' + orderIdx + "&doc_type=3";
		}
	}
	
	/**
	 * @description �����ٱ��� --> ǰ�� Ŭ�� �� �������� ����
	 */
	function clickEstProName(target){
		wingAjaxDataModule.getEstimateDetailData(target.dataset.orderType);
	}
	
	/**
	 * @description �����ٱ��� --> ���� ��ư Ŭ���̺�Ʈ
	 */
	function clickEstModiBtn(target){
		wingAjaxDataModule.getEstimateDetailData(target.dataset.orderType);
	}
	
	/**
	 * @description �����ٱ��� --> ���� ��ư Ŭ�� �̺�Ʈ
	 */
	function clickEstListDelBtn(target){
		if(confirm("[ ����"+target.dataset.orderType+" ] ���� �Ͻðڽ��ϱ�?\n")){
			wingAjaxDataModule.removeOrderCart(target.dataset.orderIdx,target.dataset.orderType);
		}
	}

	/**
	 * @param {HTMLElement} obj - ������� - ������������ ��ư
	 * @description ������� - �������������ư Ŭ�� �̺�Ʈ
	 */
	function clickSaveEdufine(obj) {
		var val = obj.value,
			data = document.querySelector("#print_doc #data"+val);
		saveEdufine(data);
	}

	/**
	 * @param {HTMLElement} obj - �������� - ������������ ��ư
	 * @description ������ �ǿ��� �������� ���� ��ư Ŭ��
	 */
	function clickEstEdufine(obj) {
		var data = document.querySelector("#type"+obj.value+" .estData");
		saveEdufine(data);
	}

	/**
	 * @param {HTMLElement} obj - ������������ - ������������ ��ư
	 * @description ������ �����ǿ��� �������� ���� ��ư Ŭ��
	 */
	function clickEstModEdufine() {
		var data = document.querySelector("#estimate_max1 .modi_max_order"),
			orderIdx = data.dataset.orderIdx,
			errorType = data.dataset.errorType,
			agentCnt = data.dataset.agentCnt;

		if(agentCnt >0){
			alert("���ε��� ���� ���Ŵ��� ��ǰ�� �ֽ��ϴ�! ���Ŵ��� �������� �̵��մϴ�.");
			wingAjaxDataModule.loadAgentTempList();
			return false;
		}else{
			if(errorType >=3 ){
				if(errorType == 5 ){
					if(confirm("�Ͻ�ǰ���� ��ǰ�� ���ԵǾ��ֽ��ϴ�! ��� �����Ͻðڽ��ϱ�?\n")){
						document.location.href = "edufineExcel.action?order_idx=" + orderIdx;
					}
				}
				else{
					alert("�ֹ� �Ұ����� ��ǰ�� ���ԵǾ� �ֽ��ϴ�!\n");
					return false;
				}
			}
			else{
				document.location.href = "edufineExcel.action?order_idx=" + orderIdx;
			}
		}
	
	}

	/**
	 * @param {Number} orderIdx - ������ �ε���
	 * @param {Number} errorCode - �����ڵ�
	 * @description �������� ���� ���
	 */
	function saveEdufine(data) {
		var orderIdx = data.dataset.orderIdx,
			errorType = data.dataset.errorType,
			agentCnt = data.dataset.agentCnt;
		
		if(agentCnt >0){
			alert("���ε��� ���� ���Ŵ��� ��ǰ�� �ֽ��ϴ�. ���Ŵ��� �������� �̵��մϴ�.");
			wingAjaxDataModule.loadAgentTempList();
			return false;
		}else{
			if(errorType >=3 ){
				
				if(errorType == 5 ){
					if(confirm("�Ͻ�ǰ���� ��ǰ�� ���ԵǾ��ֽ��ϴ�! ��� �����Ͻðڽ��ϱ�?\n")){
						document.location.href = "edufineExcel.action?order_idx=" + orderIdx;
					}
				}
				else{
					alert("�ֹ� �Ұ����� ��ǰ�� ���ԵǾ� �ֽ��ϴ�! ������ ���� �������� �̵��մϴ�.\n");
					wingAjaxDataModule.getEstimateDetailData(data.dataset.orderType);
					return false;
				}
			}
			else{
				document.location.href = "edufineExcel.action?order_idx=" + orderIdx;
			}
		}
	}
	
	/**
	 * @param {Number} type - ������ ��ȣ
	 * @description ������ 1�� �� --> �ֹ��ϱ� ��ư�̺�Ʈ
	 * 1. ���Ŵ��� ���� Ȯ�� --> ���Ŵ��� ������ �̵�
	 * 2. �Ұ���ǰ ���� Ȯ�� --> ������ ���������� �̵�
	 * 3. �ֹ������� ��� --> �����ٱ��� ������ �̵�
	 */
	function clickEstTabOrder(target){
		var orderCheck = target.dataset.orderCheck,
			errorType = target.dataset.errorType,
			agentCnt = target.dataset.agentCnt,
			stopMsg = target.dataset.stopMsg.trim(),
			type = target.value;
		initEstimateTab();
		
		
		if(agentCnt>0){
			alert("���ε��� ���� ���Ŵ��� ��ǰ�� �ֽ��ϴ�. ���Ŵ��� �������� �̵��մϴ�.\n");
			wingAjaxDataModule.loadAgentTempList();
			return false;
		}
		else if(orderCheck==1){
			alert("������ ������ ������ �޶� ���� �ֹ��� �Ұ��մϴ�!\n\n���� [1588-5120] �� ���� �ֹ����ֽñ� �ٶ��ϴ�.\n");
			wingAjaxDataModule.getEstimateDetailData(type);
			return false;
		}
		else if(orderCheck==2){
			alert("��������� ����ǰ�� ���Ϸ� ���� �ֹ��� �Ұ��մϴ�!\n\n�������� [1588-5120] �� �������ֽñ� �ٶ��ϴ�.\n");
			wingAjaxDataModule.getEstimateDetailData(type);
			return false;
		}
		else if(errorType >=3){
			alert("�ֹ��� �Ұ����� ��ǰ�� ���ԵǾ� �ֽ��ϴ�! ������ ���� �������� �̵��մϴ�.\n");
			wingAjaxDataModule.getEstimateDetailData(type);
			return false;
		}
		else if(stopMsg!="null"){
			alert("�ֹ��� �� �ִ� ���� �ʰ��� ��ǰ�� �ֽ��ϴ�!\n\n�������� [1588-5120] �� �������ֽñ� �ٶ��ϴ�.\n-------------------------------------------------------------\n"+stopMsg);
			wingAjaxDataModule.getEstimateDetailData(type);
			return false;
		}
		else{
			wingAjaxDataModule.getOrderCartList(target.value);
		}
			
	}

	/**
	 * @description �������� validation 
	 */
	function confirmCount(obj, val, id) {
		if (val == "" || val == 0 || val == null ) {
			drawToastWing("��ǰ ������ �ּ� 1�� �̻��̾�� �մϴ�.", "toast-max");
			obj.value = 1;
			return false;
		}
		else{
			document.querySelector("div.estimate_reorder_scroll #qty"+id).value = val;
		}
	}

	/**
	 * @param {HTMLElement} obj - �����Է� text box
	 * @description ��ǰ ���� ���� �̺�Ʈ (�ֹ���ǰ �籸��)
	 */
	function changeCountRePurchase(obj) {
		var id = obj.id, val = obj.value
		confirmCount(obj, val, id);
	}

	/**
	 * @param {Object} obj - ������ ������ ���� DTO (OrderListDTO)
	 * @description wingAjaxDataModule.loadEstimateData() �Լ����� ���� �����ͷ� ������ �� UI �����ϴ� �Լ�
	 */
	function makeEstimateTab(obj, stockArr) {
		var type = obj.order_type,
			div = document.getElementById("type" + type),
			list = obj.products,
			maxTabCnt = 20,
			proStockIdx = 0,
			size,
			con;

		if (list != null) size = list.length;
		else size = 0;

		if (obj.order_title == null) {
			obj.order_title = "";
		}

		//������ �� ���� �ʱ�ȭ
		if (div.querySelector(".emptyEst") != null) {
			addEstimateTab(type);
		}
		
		if(stockArr != null && stockArr.length == 1) proStockIdx = stockArr[0];

		con = "";
		if (size == 0) {
			con += '<div class="pro_guide_estimade" onclick="doOpenGuide(this);" data-guidename="ordermade"><img src="' + PathData.getPath() + '/img/product/question_mark.png"></div>';
		}
		
		//�Ϲ����� ������ ���̺� ����
		if (size > 0) {
			//con += '<div class="sbox"><input name="" class="search_input" type="text" placeholder="��������ǰ�˻�"></input>';
			con += '<a href="javascript:void(0);" class="btn_esti_search"></a></div><div id="box"></div>';
			con += '<div class="esti_title"><ul><li><span class="estimate_title">����' + type + '</span></li>'
			con += '<li><input id="order_title' + type + '" class="quick_made order_title" type="text" placeholder="��Ī�� �Է����ּ���" value="' + obj.order_title + '" maxlength="6" data-type="'+type+'"></input></li></div>';
			con += '<div class="quick_estimate_title"><span class="total">��ü ' + size + '��</span>';
			con += '<span class="total_count">�� �ݾ�<span class="total_count_m">' + commonModule.commas(parseInt(obj.total)) + '</span>��</span></div>';
			con += '<input type="hidden" name="errorCode" id="errorCode" value=""></input>';
			con += '<input type="hidden" name="orderIdx" id="orderIdx" value="' + obj.order_idx + '"></input>';
			con += '<div class="quick_estimate_table_wrap scrollable">';
			con += '<div class="scrollWrap">';

			for (var i = 0; i < size; i++) {

				var pro_div = '';

				if (list[i].pro_stock_idx == proStockIdx) {
					pro_div += '<div class="estimate_table estProd'+i+' new">';
				} else {
					if(i<maxTabCnt) pro_div += '<div class="estimate_table estProd'+i+'">';
					else pro_div += '<div class="estimate_table bottom estProd'+i+'">';
				}

				pro_div += '<input type="hidden" class="stockIdx" id="stock_idx' + i + '" value="' + list[i].pro_stock_idx + '"></input>';
				pro_div += '<input type="hidden" class="proPrice" id="price' + i + '" value="' + list[i].pro_price2 + '"></input>';
				pro_div += '<input type="hidden" class="point_view" id="point_view' + i + '" value="' + list[i].point_view + '"></input>';
				pro_div += '<input type="hidden" class="pro_standby_stock" id="pro_standby_stock' + i + '" value="' + list[i].pro_standby_stock + '"></input>';
				pro_div += '<input type="hidden" class="sale_qty" id="sale_qty' + i + '" value="' + list[i].sale_qty + '"></input>';
				pro_div += '<ul class="quick_estimate_product1">';
				pro_div += '<li class="estimate_product_title" id="pro_name' + i + '" data-idx="'+list[i].pro_stock_idx+'" data-pro-idx="'+list[i].pro_idx+'" data-delivery-type="'+list[i].delivery_type+'">' + list[i].pro_name + '</li>';
				pro_div += '<li>' + list[i].pro_kind + '</li></ul>';

				if (list[i].pro_stock_idx == proStockIdx) {
					pro_div += '<ul class="quick_estimate_product3 new subEstProd'+i+'">';
				} else {
					pro_div += '<ul class="quick_estimate_product3 subEstProd'+i+'">';
				}

				pro_div += '<li>' + commonModule.commas(parseInt(list[i].pro_price2)) + '</li><li>';
				if(list[i].pro_stock_status == 6){
					pro_div += '<input type="text" class="input_qty numberOnly except_agent" value="' + list[i].pro_quantity + '"  data-old-value="'+list[i].pro_quantity+'"  maxlength="4" id="' + i + ',' + type + '" readOnly="readOnly"></input>';
					pro_div += '<span class="estimate_count"><img src="' + PathData.getPath() + '/img/product/arr_up.gif" border="0" class="count_up except_agent" id="' + i + ',' + type + '">';
					pro_div += '<img src="' + PathData.getPath() + '/img/product/arr_down.gif" border="0" class="count_down except_agent" id="' + i + ',' + type + '"></span></li>';
				}
				else{
					pro_div += '<input type="text" class="input_qty numberOnly" value="' + list[i].pro_quantity + '"  data-old-value="'+list[i].pro_quantity+'"  maxlength="4" id="' + i + ',' + type + '"></input>';
					pro_div += '<span class="estimate_count"><img src="' + PathData.getPath() + '/img/product/arr_up.gif" border="0" class="count_up" id="' + i + ',' + type + '">';
					pro_div += '<img src="' + PathData.getPath() + '/img/product/arr_down.gif" border="0" class="count_down" id="' + i + ',' + type + '"></span></li>';
				}
				
				pro_div += '<li id="subTotal' + i + '">' + commonModule.commas(parseInt(list[i].pro_price2) * parseInt(list[i].pro_quantity)) + '</li>';
				pro_div += '<li class="estimate_product_del"><a href="javascript:void(0);" class="btn-devare" id="' + i + ',' + type + '"><img src="' + PathData.getPath() + '/img/product/del.png"/></a></li></ul></div>';
				con += pro_div;
			}
			con += '</div>';
			con += '<div class="total_c"><button type="button" class="quickb btn-est-del" data-order-idx="'+obj.order_idx+'" data-order-type="'+obj.order_type+'">������ �����ϱ�</button></div></div>';
			con += '<div class="quick_order_info" onclick="openOrderInfo();">���ŷӰ�����, ���ݾ� ���� �� �ֹ��Ͻñ� �ٶ��ϴ�.</div>';
			con += '<div class="quick_button"><button type="button" class="quickb quick_button1 btnModify" value="' + type + '">����</button>';
			con += '<button type="button" class="quickb quick_button2 btnEdufine" value="' + type + '">��������</button>';
			con += '<button type="button" class="quickb quick_button3 btnOrder estData" data-hover="STEP1 �����ٱ���" data-order-type="'+type+'" data-order-idx="'+obj.order_idx+'" data-order-check="'+obj.orderCheck+'" data-agent-cnt="'+obj.agent_count+'" data-error-type="'+obj.errorType+'" value="' + type + '" data-stop-msg="'+obj.stopMessage+'"><span>�ֹ��ϱ�</span></button>';

		}
		else{ //�������� �����ϳ� ��ǰ�� ���� ���, �ǸŰ������� ������ ���Ƿ� ������ --> ���������� �ǵ����� ��� �ʿ�
			var newLi = null, newSpan = null, newTab = null, pNode = null, selDiv = null;

			/**
			 * ���� empty tab �� �̺�Ʈ�� �����ϱ� ���ؼ� ���ο� element �� �����Ͽ� ��ü,
			 * ���������� ��� 'span' element �����Ͽ� newTab element �� �߰�.
			 * ���� wingEventHandler �� click �̺�Ʈ �ڵ鷯�� ���
			 */

			newLi = document.createElement("li");
			newLi.className = "quickmenu" + type + " estmenu empty";
			newLi.id = "li" + type;

			newSpan = document.createElement("span");
			newSpan.className = "sub-order-title" + type + " order-title";

			newTab = document.createElement("a");
			newTab.className = "quick_sub est_tab empty";
			newTab.id = type + ",min";
			newTab.style.cursor = "pointer";
			newTab.innerHTML = "����" + type;

			pNode = document.querySelector(".quickwrap li#li"+type);
			pNode.parentNode.replaceChild(newLi, pNode);

			newLi.appendChild(newTab);
			newLi.appendChild(newSpan);

			eventModule.addEventObject("click", newTab, openEmptyEst);

			selDiv = document.querySelector(".quick_tab#type" + type);

			if (selDiv != null) {
				selDiv.innerHTML = '<div class="emptyEst"><p class="no_msg">�����Ͻ� ������ ��ǰ�� �����ϴ�.</p></div>';
			}
			
			con += selDiv.innerHTML;
			
		}
		div.innerHTML = con;
		
		if(stockArr!=null){
			if(stockArr.length > 1){
				for (var i = 0; i < size; i++) {
					for(var j = 0 ; j < stockArr.length; j++){
						if(list[i].pro_stock_idx == stockArr[j]){
							$(".estProd"+i).addClass("proNew");
							$(".subEstProd"+i).addClass("proNew");
						}
					}
				}
			}
		}
		

		initEstimateTab();

		//������ �� ������ CSS Ȱ��ȭ 
		var estTabs = document.querySelectorAll(".est_tab"),
			estTabsLen = estTabs.length;

		for (var i = 0; i < estTabsLen; i++) {
			var est = estTabs[i];

			if (est.id.split(",")[0] == type) {
				$(est).addClass("on");
			}
		}

		if (size > 0) {
			//������ ���� ���� �̺�Ʈ �߰�
			eventModule.addEventArray("click", div.querySelectorAll(".count_up"), clickCountUp);
			eventModule.addEventArray("click", div.querySelectorAll(".count_down"), clickCountDown);
			//���� �Է� �ؽ�Ʈ �ڽ� �̺�Ʈ ����
			eventModule.addEventArrayKeyUp(div.querySelectorAll(".input_qty"),proQtyKeyEventHandler);
			eventModule.addEventArray("change", div.querySelectorAll(".input_qty"), changeProQtyEventHandler);
			//���Ŵ��� ���� �Է� �ؽ�Ʈ �̺�Ʈ ���� �߰�
			eventModule.addEventArray("click", div.querySelectorAll(".input_qty.except_agent") , clickAgentCountText);
			
			//��ǰ���� ��ư �̺�Ʈ �߰�
			eventModule.addEventArray("click", document.querySelectorAll(".btn-devare"), clickDevareBtn);
			//��������Ī ������ư �̺�Ʈ �߰�
			eventModule.addEventObject("blur", div.querySelector("input.order_title"), clickEstTitleModiBtn);
			//������ ��ũ�� �̺�Ʈ �߰�
			eventModule.addScrollEventEstTab();
			//������ ��ǰ�˻� �̺�Ʈ �߰�
			//eventModule.addEventObjectKeyUp(div.querySelector(".sbox input"), searchEstPro);
			//���������� ��ư �̺�Ʈ �߰�
			eventModule.addEventObject("click", div.querySelector(".btnModify"), clickModiEstTab);
			//������������ ��ư �̺�Ʈ �߰�
			eventModule.addEventObject("click", div.querySelector(".btnEdufine"), clickEstEdufine);
			//�ֹ��ϱ� ��ư �̺�Ʈ �߰�
			eventModule.addEventObject("click", div.querySelector(".btnOrder"), clickEstTabOrder);
			//������ ���� ��ư �̺�Ʈ �߰�
			eventModule.addEventObject("click", div.querySelector(".btn-est-del"), clickEstDelBtn);
			//��ǰ�� Ŭ�� �̺�Ʈ �߰�
			eventModule.addEventArray("click", div.querySelectorAll(".estimate_product_title"),clickEstProTitle);

			//�������� ���� ���� errorCode ����
			var errorCode = 0;
			if (obj.errorType >= 3) {
				if (obj.errorType == 3 || obj.errorType == 4 || obj.errorType == 6) {
					errorCode = 1;
				} else if (obj.errorType == 5) {
					errorCode = 2;
				}
			}
			if (obj.agent_count >= 1) {
				errorCode = 3;
			}
            div.querySelector("#errorCode").value = errorCode;
        }
       $(div.querySelector(".scrollable")).on('mousewheel DOMMouseScroll touchstart touchmove', function (e) { 
            var e0 = e.originalEvent;
            var delta = e0.wheelDelta || -e0.detail;

            this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
            e.preventDefault();  
        });
       openWingMenu('type' + type, 'min');
	}

	/**
	 * @param {Object} obj - - ������ ������ ���� DTO (OrderListDTO)
	 * @description wingAjaxDataModule.getEstimateDetailData() �Լ����� ���� �����ͷ� ���������� �� UI �����ϴ� �Լ� (������ ���� ��)
	 */
	function makeEstimateDetail(obj) {
		var tab = document.getElementById("estimate_max1"),
			type_num = obj.order_type,
			title = tab.querySelector(".order_title"),
			school = tab.querySelector(".order_school"),
			sendBtn = tab.querySelector(".modi_max_order"),
			modifyBtn = tab.querySelector(".modi_max_button_change"),
			con,
			list,
			size;

		if (obj.order_title == null) {
			obj.order_title = "";
		}

		//������ �� ���� �ʱ�ȭ
		if ($("estmenu#li"+type_num+" a").hasClass("empty")) {
			addEstimateTab(type_num);
		}

        tab.querySelector("input.allcheckDetail").checked = false;
		tab.querySelector("input.order_title").dataset.type = type_num;
		tab.querySelector("#orderType").value = type_num;
		//tab.querySelector(".point_view").value = pointView;
		tab.querySelector(".modify-order-type").innerHTML = "&nbsp;"+type_num+"&nbsp;";
		
		sendBtn.value = type_num;
		sendBtn.dataset.orderCheck = obj.orderCheck;
		sendBtn.dataset.agentCnt = obj.agent_count;
		sendBtn.dataset.errorType = obj.errorType;
		sendBtn.dataset.orderIdx = obj.order_idx;
		sendBtn.dataset.stopMsg = obj.stopMessage;
		
		modifyBtn.dataset.orderType = type_num;
		
		title.value = obj.order_title;
		school.value = obj.school_name;

		list = obj.products; //������ ��ǰ ����Ʈ
		if (list != null)
			size = list.length;
		else
			size = 0;

		tab.querySelector(".total").innerHTML = "��ü&nbsp;<span class='total_size'>" + size + "��</span>";
		tab.querySelector(".total_count_m").innerHTML = commonModule.commas(parseInt(obj.total));
		tab.querySelector("#order_idx_hidden").value = obj.order_idx;
		tab.querySelector("#school_idx").value = obj.school_idx;
		tab.querySelector(".btn-est-del-max").dataset.orderIdx = obj.order_idx;
		tab.querySelector(".btn-est-del-max").dataset.orderType = type_num;
		
		

		//�������� ���� ���� errorCode ����
		var errorCode = 0;
		if (obj.errorType >= 3) {
			if (obj.errorType == 3 || obj.errorType == 4 || obj.errorType == 6) {
				errorCode = 1;
			} else if (obj.errorType == 5) {
				errorCode = 2;
			}
		}
		if (obj.agent_count >= 1) {
			errorCode = 3;
		}
		tab.querySelector("#errorCode").value = errorCode;

		con = "<tr>";
		if (size > 0) {
			for (var i = 0; i < size; i++) {

				var pro = list[i],
					error = 0,
					exception = 0;

				/**
				 * error 1: ��ǰ�� ���� �߻�, �ٷ� �ֹ� �Ұ�
				 * error 2: �ǸŰ��� ����Ǿ� �ٷ� �ֹ� �Ұ�
				 * error 3: �Ͻ�ǰ���Ǿ� �ٷ� �ֹ� �Ұ�
				 * error 4: �Ǹ��ߴܵǾ� �ٷ� �ֹ� �Ұ�
				 */
				if (pro.sale == 0 || pro.result == 0) {
					error = 1; exception = 1;
				} else if (pro.pro_price != pro.curr_price) {
					error = 2; exception = 2;
				} else if (pro.delivery_type == 3) {
					error = 3; exception = 3;
				} else if (pro.delivery_type == 5 || pro.delivery_type == 6) {
					error = 4; exception = 4;
				} else if (pro.pro_stock_status == 6) {
					exception = 5;
				}

				con += '<input type="hidden" id="pro_name' + i + '" value="' + pro.pro_name + '"></input>';
				con += '<input type="hidden" class="proPrice" id="price' + i + '" value="' + pro.pro_price2 + '"></input>';
				con += '<input type="hidden" class="stockIdx" id="stock_idx' + i + '" value="' + pro.pro_stock_idx + '"></input>';
				con += '<input type="hidden" class="point_view" id="point_view' + i + '" value="' + pro.point_view + '"></input>';
				con += '<input type="hidden" class="pro_standby_stock" id="pro_standby_stock' + i + '" value="' + pro.pro_standby_stock + '"></input>';
				con += '<input type="hidden" class="sale_qty" id="sale_qty' + i + '" value="' + pro.sale_qty + '"></input>';
				con += '<input type="hidden" class="ecode" id="ecode' + i + '" value="' + error + '"></input>';
				con += '<td class="proCheck"><input type="checkbox" name="chk_info" class="chk_modify" id="' + i + '" value="' + pro.pro_stock_idx+'"></td>';
				con += '<td class="proCode">' + pro.pro_sort_code + '</td><td class="saleIcon">';
				
				if(exception >=1 && exception <=4){
					con += '<a class="sale_no" href="javascript:void(0);"><img src="' + PathData.getPath() + '/img/mypage/icon_sale_no.png"></a>';
					con += '<div class="div_stop_img">';
					
					switch (exception) {
						case 1:
							con += '<img border="0" src="' + PathData.getPath() + '/img/mypage/no_order1.png"></div>';
							break;
						case 2:
							con += '<img border="0" src="' + PathData.getPath() + '/img/mypage/no_order2.png"></div>';
							break;
						case 3:
							con += '<img border="0" src="' + PathData.getPath() + '/img/mypage/no_order3.png"></div>';
							break;
						case 4:
							con += '<img border="0" src="' + PathData.getPath() + '/img/mypage/no_order4.png"></div>';
							break;
					}
				}
				else if(exception == 5){
					con += '<a href="javascript:void(0);" style="cursor:default;"><img src="' + PathData.getPath() + '/img/mypage/icon_sale_ok.png" class="icon_sale_ok"></a>&nbsp;&nbsp;';
				}

				con += '<td class="pro_name" data-idx="'+pro.pro_stock_idx+'" data-pro-idx="'+pro.pro_idx+'" data-delivery-type="'+pro.delivery_type+'">' + pro.pro_name + '</td>';
				con += '<td class="proKind">' + pro.pro_kind + '</td><td class="proPrice">' + commonModule.commas(parseInt(pro.pro_price2)) + '</td>';
				con += '<td class="proQuantity" id="qty' + i + '">';
				
				if(exception == 5){
					con += '<input type="text" class="input_qty numberOnly except_agent" value="' + pro.pro_quantity + '" data-old-value="'+pro.pro_quantity+'" maxlength="4" id="' + i + ',' + type_num + '" readOnly="readOnly"></input>';
					con += '<span class="estimate_count"><img src="' + PathData.getPath() + '/img/product/arr_up.gif" border="0" class="count_up except_agent" id="' + i + ',' + type_num + '"><img src="' + PathData.getPath() + '/img/product/arr_down.gif" border="0" class="count_down except_agent" id="' + i + ',' + type_num + '"></td>';
				}
				else{
					con += '<input type="text" class="input_qty numberOnly" value="' + pro.pro_quantity + '" data-old-value="'+pro.pro_quantity+'" maxlength="4" id="' + i + ',' + type_num + '"></input>';
					con += '<span class="estimate_count"><img src="' + PathData.getPath() + '/img/product/arr_up.gif" border="0" class="count_up" id="' + i + ',' + type_num + '"><img src="' + PathData.getPath() + '/img/product/arr_down.gif" border="0" class="count_down" id="' + i + ',' + type_num + '"></td>';
				}
				
				con += '<td class="price_total" id="subTotal' + i + '">' + commonModule.commas(parseInt(pro.pro_price2) * parseInt(pro.pro_quantity)) + '</td>';
				con += '<td class="pro_del"><a href="javascript:void(0);" class="btn-devare-max" id="' + i + ',' + type_num + '"><img src="' + PathData.getPath() + '/img/product/del.png"/></a></td></tr>';
			}
			document.querySelector(".est_contents").innerHTML = con;
		}

		initEstimateTab();

		//������ �� ������ CSS Ȱ��ȭ 
		var estTabs = document.querySelectorAll(".est_tab"),
			estTabsLen = estTabs.length;

		for (var i = 0; i < estTabsLen; i++) {
			var est = estTabs[i];

			if (est.id.split(",")[0] == type_num) {
				$(est).addClass("on");
			}
		}
		
		var est = document.querySelector(".quickwrap li#li" +type_num+" a");

		//������ �� ������ ���ٸ� ���ο� �� ����
		if ($(est).hasClass("empty")) {
			addEstimateTab(type_num);
		}
		$(est).addClass("on");

		//������ ���� ���� �̺�Ʈ �߰�
		eventModule.addEventArray("click", tab.querySelectorAll(".count_up"), clickCountUpMax);
		eventModule.addEventArray("click", tab.querySelectorAll(".count_down"), clickCountDownMax);
		//��ǰ�� Ŭ���� �̺�Ʈ �߰�
		eventModule.addEventArray("click", tab.querySelectorAll(".pro_name"), clickEstProTitle);
		//���� �Է� �ؽ�Ʈ �ڽ� �̺�Ʈ ����
		eventModule.addEventArrayKeyUp(tab.querySelectorAll(".input_qty"),proQtyKeyEventHandler);
		eventModule.addEventArray("change", tab.querySelectorAll(".input_qty"), changeProQtyEventHandlerDetail);
		//���Ŵ��� ���� �Է� �ؽ�Ʈ �̺�Ʈ ���� �߰�
		eventModule.addEventArray("click", tab.querySelectorAll(".input_qty.except_agent") , clickAgentCountTextMax);
		//��������Ī ������ư �̺�Ʈ �߰�
		eventModule.addEventObject("blur", tab.querySelector("input.order_title"), clickEstTitleModiBtnMax);
		//��ǰ���� ��ư �̺�Ʈ �߰�
		eventModule.addEventArray("click", document.querySelectorAll(".btn-devare-max"), clickDevareBtnMax);
		//�ֹ��Ұ� ��ǰ ������ ���콺 ���� �̺�Ʈ �߰�
		eventModule.addEventArray("mouseenter",tab.querySelectorAll("a.sale_no"),openStopProImage);
		eventModule.addEventArray("mouseleave",tab.querySelectorAll("a.sale_no"),closeStopProImage);
		//������� ��ư �̺�Ʈ �߰�
		eventModule.addEventObject("click",tab.querySelector("button.printDoc"),wingAjaxDataModule.getEstDocList);

		openWingMenu("estimate_max1", "max");
	}
	
	/**
	 * @param {Object} obj - - ������ ������ ���� DTO (OrderListDTO)
	 * @description ������ �������� UI ���� ����
	 */
	function makeEstimateModify(obj,type){
		
		var list = obj.proSequence,
			len = list.length,
			dataDiv = document.querySelector("#estimate_max2 .prodata"),
			numDiv = document.querySelector("#estimate_max2 .data-seq-wrap"),
			btnDiv = document.querySelector("#estimate_max2 .data-btn-wrap"),
			ul='', num='', btn='', con="", numc='', btnc='', i=0;
	
		setSeqFlag(false);
		setSeqSortFlag(obj.sorting);
		
		document.querySelector("#estimate_max2 .modify-order-type").innerHTML = "&nbsp;"+type+"&nbsp;";
		document.getElementById("estimate_max2").dataset.selType = type;
		document.querySelector("#estimate_max2 .btn-seq-init").dataset.orderType = type;
		document.querySelector("#estimate_max2 .modi_max_button_modify").dataset.orderType = type;
		
		for(; i<len; i++){
			
			num = '<li class="num_idx"><input type="" class="input_modify" value="'+(i+1)+'" readonly="readonly"></li>';
			ul = '<li class="estimate_sort_selector" draggable="true"><div>';
			ul += '<ul class="estimate_max_modify" data-owd-idx="'+list[i].owd_idx+'">';
			ul += '<li>'+list[i].class_text+'</li>';
			ul += '<li>'+list[i].pro_name+'</li>';
			ul += '<li>'+list[i].pro_kind+'</li>';
			ul += '</ul></div></li>';

			btn = '<li class="sort_data" data-seq-idx="'+i+'">';
		
			if(i==0){
				btn += '<img class="sort_down" src="'+PathData.getPath()+'/img/product_old/list_down_off.gif" title="��ĭ�Ʒ���">';
			}else if(i==len-1){
				btn += '<img class="sort_up" src="'+PathData.getPath()+'/img/product_old/list_up_off.gif"  title="��ĭ����">';
			}else{
				btn += '<img class="sort_down" src="'+PathData.getPath()+'/img/product_old/list_down_off.gif" title="��ĭ�Ʒ���">&nbsp;';
				btn += '<img class="sort_up" src="'+PathData.getPath()+'/img/product_old/list_up_off.gif" title="��ĭ����">';
			}
			btn += '</li>';
			
			con += ul;
			numc += num;
			btnc += btn;
		}
		
		dataDiv.innerHTML = con;
		numDiv.innerHTML = numc;
		btnDiv.innerHTML = btnc;
		eventModule.addEventArray("click", document.querySelectorAll(".sort_down"), clickSeqDown);
		eventModule.addEventArray("click", document.querySelectorAll(".sort_up"), clickSeqUp);
		eventModule.addEventArray("click", dataDiv.querySelectorAll("li.estimate_sort_selector"), clickProRow);
		
		// ������ ��������� drag&drop ����
		$(dataDiv).sortable({
			group : 'prodata',
			itemSelector: 'li.estimate_sort_selector',
			animation: 150,
			onDragStart: function($item, container, _super){
				initProRowSelection();
				$($item).addClass("select");
				_super($item, container);
				setSeqFlag(true);
			}
		});
		
		openWingMenu("estimate_max2", "max");
	}
	
	/**
	 * @description ���������� - �ֹ��Ұ� ������ ���콺 ������ �ȳ� �̹��� ���
	 */
	function openStopProImage(target){
		target.nextSibling.style.top = (target.offsetTop + 20 - document.querySelector("#estimate_max1 div.prodata_wrap").scrollTop)+"px";
		target.nextSibling.style.display = "block";
	}
	
	/**
	 * @description ���������� - �ֹ��Ұ� ������ ���콺 �ƿ��� �ȳ� �̹��� �����
	 */
	function closeStopProImage(target){
		target.nextSibling.style.display = "none";
	}

	/**
	 * @description ������ ������, ������ �ǰ��� �ʱ�ȭ �Լ�
	 * 2018.07.31 : ����������� ����/ ������ ���� �⺻������ �����ϰ�, ������ ������ ���� ���� empty class (CSS)�� �߰�.
	 * ������ ������ �ִ� ��쿡 wing_tab class �߰�.
	 */
	function addEstimateTab(type) {

		var first = document.querySelector(".sub-order-tab .first_est"),
			selLi = document.querySelector("#li" + type),
			selTab = selLi.querySelector("a.quick_sub"),
			selTitle = selLi.querySelector("span.order-title"),
			newTab;

		//���� �������� �ʱ�ȭ-------------------------------------------------------------
		//�ش� ������ ���� ��Ȱ��ȭ�� ��� --> Ȱ��ȭ
		$(selLi).removeClass("empty");
		$(selLi).addClass("estTitle"); //��Ī�� ���� ��쿡�� '��Ī����' ǥ���ϱ� ���� �߰�
		selTitle.innerHTML = "��Ī ����";
		
		//�������� ���콺 ���� �������� ȿ�� �̺�Ʈ �߰�
		eventModule.addEventObject("mouseenter", selLi, estTabHoverTitleEffect);
		eventModule.addEventObject("mouseleave", selLi, estTabHoverTitleEffect);
	
		/**
		 * ���� empty tab �� �̺�Ʈ�� �����ϱ� ���ؼ� ���ο� element �� �����Ͽ� ��ü,
		 * ���������� ��� 'span' element �����Ͽ� newTab element �� �߰�.
		 * ���� wingEventHandler �� click �̺�Ʈ �ڵ鷯�� ���
		 */
		newTab = document.createElement("a");
		newTab.className = "quick_sub wing_tab est_tab on";
		newTab.id = type + ",min";
		newTab.style.cursor = "pointer";
		newTab.innerHTML = "����" + type;
	
		selTab.parentNode.replaceChild(newTab, selTab);
		eventModule.addEventObject("click", newTab, wingEventHandler);
	
		if(first!=null){
			//ù��° �� �ʱ�ȭ
			if (type < first.id.split(",")[0]) {
				$(newTab).addClass("first_est");
				$(first).removeClass("first_est");
			}
		}
		else{
			$(newTab).addClass("first_est");
		}
	
		var selDiv = document.querySelector(".quick_tab#type" + type);
		if (selDiv != null) {
			selDiv.innerHTML = '';
		}
	}

	/**
	 * @param {String} type - ������ ��ȣ
	 * @description ������ ������, ������ �ǰ��� �ʱ�ȭ �Լ�
	 */
	function removeEstimateTab(type) {
		var estTabs = document.querySelectorAll(".quick_sub.wing_tab"),
			estTabLen = estTabs.length,
			newLi, pNode, newSpan, selType, newTab, selDiv,
			i = 0;

		initEstimateTab();
		for (; i < estTabLen; i++) {
			selType = estTabs[i].id.split(",")[0];
			
			//������ ������ ���� �ǿ� �����ϴ� ���
			if (selType == type) {
				/**
				 * ���� empty tab �� �̺�Ʈ�� �����ϱ� ���ؼ� ���ο� element �� �����Ͽ� ��ü,
				 * ���������� ��� 'span' element �����Ͽ� newTab element �� �߰�.
				 * ���� wingEventHandler �� click �̺�Ʈ �ڵ鷯�� ���
				 */
				newLi = document.createElement("li");
				newLi.className = "quickmenu" + type + " estmenu empty";
				newLi.id = "li" + type;
				newSpan = document.createElement("span");
				newSpan.className = "sub-order-title" + type + " order-title";

				newTab = document.createElement("a");
				newTab.className = "quick_sub est_tab empty on";
				newTab.id = type + ",min";
				newTab.style.cursor = "pointer";
				newTab.innerHTML = "����" + type;

				pNode = estTabs[i].parentNode;
				pNode.parentNode.replaceChild(newLi, pNode);
				newLi.appendChild(newTab);
				newLi.appendChild(newSpan);

				eventModule.addEventObject("click", newTab, openEmptyEst);
				
				var selDiv = document.querySelector(".quick_tab#type" + type);
				if (selDiv != null) {
					selDiv.innerHTML = '<div class="emptyEst"><p class="no_msg">�����Ͻ� ������ ��ǰ�� �����ϴ�.</p></div>';
				}
			}
		}
	}

	/**
	 * @param {String} type - ��������ȣ
	 * @description ������ ��ħ 2�� ���¿���, �������� �����Ǵ°��
	 */
	 function removeEstimateDetailTab(type, target, moveFlag) {
		var estTabs = document.querySelectorAll(".quick_sub.wing_tab"),
			first = document.querySelector(".sub-order-tab .first_est"),
			selTab = document.querySelector(".sub-order-tab li#li"+type+" a"),
			estTabLen = estTabs.length,
			newLi, pNode, newSpan, newTab, selDiv, firstType,
			i = 0;

		if(selTab!=null){
			/**
			 * ���� empty tab �� �̺�Ʈ�� �����ϱ� ���ؼ� ���ο� element �� �����Ͽ� ��ü,
			 * ���������� ��� 'span' element �����Ͽ� newTab element �� �߰�.
			 * ���� wingEventHandler �� click �̺�Ʈ �ڵ鷯�� ���
			 */
			newLi = document.createElement("li");
			newLi.className = "quickmenu" + type + " estmenu empty";
			newLi.id = "li" + type;
			newSpan = document.createElement("span");
			newSpan.className = "sub-order-title" + type + " order-title";

			newTab = document.createElement("a");
			newTab.className = "quick_sub est_tab empty on";
			newTab.id = type + ",min";
			newTab.style.cursor = "pointer";
			newTab.innerHTML = "����" + type;

			pNode = selTab.parentNode;
			pNode.parentNode.replaceChild(newLi, pNode);
			newLi.appendChild(newTab);
			newLi.appendChild(newSpan);

			eventModule.addEventObject("click", newTab, openEmptyEst);
			var selDiv = document.querySelector(".quick_tab#type" + type);
			if (selDiv != null) {
				selDiv.innerHTML = '<div class="emptyEst"><p class="no_msg">�����Ͻ� ������ ��ǰ�� �����ϴ�.</p></div>';
			}
		}

		if(first!=null){
			firstType = first.id.split(",")[0];

			//�����Ǿ�� �ϴ� ������ first_tab ���� Ȯ�� --> assgin another tab as first-tab.
			if(firstType == type){
				$(first).removeClass("first_est");
			
				for(; i<estTabLen; i++){
					if(estTabs[i].id.split(",")[0]!=firstType && !$(estTabs[i]).hasClass("empty")){
						$(estTabs[i]).addClass("first_est"); 
						firstType = estTabs[i].id.split(",")[0];
						break;
					}
				}	
			}
		}
		//���� ��������Ʈ�� ������ 2�� �̻��� ��쿡�� �ٸ� ������ �̵�
		//1. �Ϲ� ������ ��� --> first tab ���� �̵�
		//2. ������ �̵��� ��� --> �̵��� �������� �̵�
		//���� ��������Ʈ�� ������ 1�� ������ ��쿡�� ������ ���� 1�ܻ��·� ���ư�
		if(moveFlag){
			clickEstTab(target);
		}else{
			if(estTabLen <= 1){
				$("#estimate_max1").removeClass("on");
				openWingMenu("type"+firstType,"min");
			}else{
				clickEstTab(firstType);
			}
		}
	}
	
	/**
	 * @param {Number} type - ��������ȣ
	 * @description �����ٱ��� - �������� �� ������ ���� �ʱ�ȭ �Լ�
	 */
	function removeOrderListTab(type){
		var estTabs = document.querySelectorAll(".quick_sub.wing_tab"),
			estTabLen = estTabs.length,
			selType, selDiv,
			next, newTab, newLi, pNode, newSpan,
			i = 0;

		for (var i = 0; i < estTabLen; i++) {
			selType = estTabs[i].id.split(",")[0];
	
			//������ ������ ���� �ǿ� �����ϴ� ���
			if (selType == type) {
				//ù��° ���� ���
				if ($(estTabs[i]).hasClass("first_est")) {
					//���� element �� ù��° �������� ����
					next = estTabs[i + 1];
	
					if (next != null) {
						$(next).addClass("first_est");
					}
					$(estTabs[i]).removeClass("first_est");
					$(estTabs[i].querySelector("a.quick_sub")).removeClass("first_est");
				}
	
				//�ش� ������ ������, ���� ������ ��� ����
				if (estTabs[i].parentNode != null) {
					$(estTabs[i]).removeClass("wing_tab");
					$(estTabs[i]).addClass("empty");
				}
	
				/**
				 * ���� empty tab �� �̺�Ʈ�� �����ϱ� ���ؼ� ���ο� element �� �����Ͽ� ��ü,
				 * ���������� ��� 'span' element �����Ͽ� newTab element �� �߰�.
				 * ���� wingEventHandler �� click �̺�Ʈ �ڵ鷯�� ���
				 */
				newLi = document.createElement("li");
				newLi.className = "quickmenu" + type + " estmenu empty";
				newLi.id = "li" + type;
	
				newSpan = document.createElement("span");
				newSpan.className = "sub-order-title" + type + " order-title";
	
				newTab = document.createElement("a");
				newTab.className = "quick_sub est_tab empty";
				newTab.id = type + ",min";
				newTab.style.cursor = "pointer";
				newTab.innerHTML = "����" + type;
	
				pNode = estTabs[i].parentNode;
				pNode.parentNode.replaceChild(newLi, pNode);
	
				newLi.appendChild(newTab);
				newLi.appendChild(newSpan);
				eventModule.addEventObject("click", newTab, openEmptyEst);
	
				var selDiv = document.querySelector(".quick_tab#type" + type);
				if (selDiv != null) {
					selDiv.innerHTML = '<div class="emptyEst"><p class="no_msg">�����Ͻ� ������ ��ǰ�� �����ϴ�.</p></div>';
				}
	
			}
		}
	}

	/**
	 * @param {Array} list - ���ú� ��ǰ ����Ʈ <ProductListDTO>
	 * @description ���ú� ��ǰ ����Ʈ UI ����
	 */
	function makeTodayProductList(dto, sort, level) {
		var list = dto.products,
			currDiv = document.getElementById("today-product"),
			length = list.length;

		var div = "";

		currDiv.querySelector("span.total_cnt").innerHTML = "��ü&nbsp;(" + dto.totalCount + ")";
		currDiv.querySelector("span.med_cnt").innerHTML = "�Ǿ�ǰ&nbsp;(" + dto.medCount + ")";
		currDiv.querySelector("span.etc_cnt").innerHTML = "�Ǿ��ǰ&nbsp;(" + dto.etcCount + ")";
		currDiv.querySelector("span.edu_cnt").innerHTML = "�����ڷ�&nbsp;(" + dto.eduCount + ")";

		if (length > 0) {


			for (var i = 0; i < length; i++) {
				var sub = '<ul class="proInfo" id="ul' + i + '">',
					obj = list[i],
					error = 0;

				/**
				 * error 1: ��ǰ�� ���� �߻�, �ٷ� �ֹ� �Ұ�
				 * error 2: �ǸŰ��� ����Ǿ� �ٷ� �ֹ� �Ұ�
				 * error 3: �Ͻ�ǰ���Ǿ� �ٷ� �ֹ� �Ұ�
				 * error 4: �Ǹ��ߴܵǾ� �ٷ� �ֹ� �Ұ�
				 */
				if (obj.sale == 0 || obj.result == 0) {
					error = 1;
				} else if (obj.delivery_type == 3) {
					error = 3;
				} else if (obj.delivery_type == 5 || obj.delivery_type == 6) {
					error = 4;
				} else if (obj.pro_status != 1) {
					error = 5;
				}

				sub += '<li class="proCheck">';
				if(obj.pro_status == 1 && (obj.delivery_type != 5 && obj.delivery_type != 6 && obj.delivery_type != 3  && obj.point_view == 0)) {
					
					if (obj.sale_stop != 2) {
						sub += '<input type="checkbox" class="proCheck" name="proCheck" id="' + i + '" value="' + obj.pro_idx + '">';	
					}
					
				}
				sub += '</li><li>' + obj.pro_sort_code + '</li>';
				/*sub += '<li class="proImg"><img src="http://www.emedic.co.kr/proimg/170-155/' + obj.pro_listimage + '" style="width:34px;" >';*/
				
				if(obj.pro_status==1 && obj.delivery_type!=5 && obj.delivery_type!=6){
					sub += '<li class="proName today-normal-pro" data-idx="'+obj.idx+'" data-pro-idx="'+obj.pro_idx+'" data-delivery-type="'+obj.delivery_type+'" data-pro-status="'+obj.pro_status+'">'
				}else{
					sub += '<li class="proName today-stop-pro" data-idx="'+obj.idx+'" data-pro-idx="'+obj.pro_idx+'" data-delivery-type="'+obj.delivery_type+'" data-pro-status="'+obj.pro_status+'">';
				}
				
				sub += obj.pro_name + '<span class="proKind">&nbsp;/&nbsp;' + obj.pro_kind + '</li>';
				sub += '<li class="proPrice">' + commonModule.commas(obj.price) + '</li>';
				
				if(obj.pro_status == 1){
					
					if (obj.sale_stop == 2) {
					
						sub += '<li><span class="pro-result-msg">���߿���</span></li>';
						sub += '<li class="del-stop-pro"><a href="javascript:void(0);" class="btn-delete1 btnDelWish" id="' + i + '">����</a></li>';
						
					} else if(obj.sale_stop == 3){
						
						sub += '<li><span class="pro-result-msg pro-temp-stop3" data-idx="'+obj.idx+'" data-pro-idx="'+obj.pro_idx+'" data-delivery-type="'+obj.delivery_type+'" data-pro-status="'+obj.pro_status+'">�����ֹ�</span></li>';
						sub += '<li class="del-stop-pro"><a href="javascript:void(0);" class="btn-delete1 btnDelWish" id="' + i + '">����</a></li>';
						
					} else {
						
						if(obj.delivery_type==3){
							sub += '<li><span class="pro-result-msg pro-temp-stop" data-idx="'+obj.idx+'" data-pro-idx="'+obj.pro_idx+'" data-delivery-type="'+obj.delivery_type+'" data-pro-status="'+obj.pro_status+'">���԰��˸�</span></li>';
							sub += '<li class="del-stop-pro"><a href="javascript:void(0);" class="btn-delete1 btnDelWish" id="' + i + '">����</a></li>';
						}
						else if(obj.delivery_type==5 || obj.delivery_type==6){
							sub += '<li><span class="pro-result-msg">�Ǹ��ߴ�</span></li>';
							sub += '<li class="del-stop-pro"><a href="javascript:void(0);" class="btn-delete1 btnDelWish" id="' + i + '">����</a></li>';
						}
						else{
							sub += '<li class="proQty" id="liQty' + i + '"><input type="text" class="input_qty numberOnly" value="1" maxlength="4" id="qty' + i + '"></input>';
							sub += '<span class="estimate_count"><img src="' + PathData.getPath() + '/img/product/arr_up.gif" border="0" class="count_up" id="' + i + '">';
							sub += '<img src="' + PathData.getPath() + '/img/product/arr_down.gif" border="0" class="count_down" id="' + i + '"></li>'
							sub += '<li class="proEst"><span class="proest_selectbox todayproduct"><label for="selectbox"></label><select title="����" class="est_type" id="estSel' + i + '"><option value="1">����1</option><option value="2">����2</option><option value="3">����3</option>';
							sub += '<option value="4">����4</option><option value="5">����5</option><option value="6">����6</option></select></span></li>';
							if(level!=70 && level!=50){
								sub += '<li class="addEst"><a href="javascript:void(0);" class="btnAddCart2" id="' + i + '"><img src="' + PathData.getPath() + '/img/product/btn_qk_order.png" style="width:20px;"></a>';
								sub += '<a href="javascript:void(0);" class="saveWish" id="' + i + '"><img src="' + PathData.getPath() + '/img/product/btn_qk_wish.png" class="reorder_img" alt="���ɻ�ǰ����" title="���ɻ�ǰ����"></a>';
								sub += '<a href="javascript:void(0);" class="btnDelWish" id="' + i + '"><img src="' + PathData.getPath() + '/img/product/product_delete_s.png" alt="����" title="����"></a></li>';
							}
						}
					}
					
					
				}else{
					if(obj.pro_status==3) sub += '<li><span class="pro-result-msg">ǰ����ǰ</span></li>';
					else if(obj.pro_status==4 || obj.pro_status==5) sub += '<li><span class="pro-result-msg">�Ǹ��ߴ�</span></li>';
					sub += '<li class="del-stop-pro"><a href="javascript:void(0);" class="btnDelWish btn-delete1" id="' + i + '">����</a></li>';
				}
				
				sub += '<input type="hidden" id="pro_idx" value="' + obj.pro_idx + '"></input><input type="hidden" id="pro_name" value="' + obj.pro_name + '"></input><input type="hidden" id="ecode' + i + '" value="' + error + '"></input>';
				sub += '<input type="hidden" id="idx" value="' + obj.idx + '"></input><input type="hidden" id="delivery_type" value="' + obj.delivery_type + '"></input><input type="hidden" id="stop_content" value="' + obj.stop_content + '"></input><input type="hidden" id="point_view" value="' + obj.point_view + '"></input><input type="hidden" id="pro_standby_stock" value="' + obj.pro_standby_stock + '"></input><input type="hidden" id="sale_stop" value="' + obj.sale_stop + '"></input><input type="hidden" id="sale_qty" value="' + obj.sale_qty + '"></input></ul>';

				div += sub;
			}
			currDiv.querySelector("#allCheck").style.display = "block";
		} else {
			div += '<div class="emptyToday"><p class="no_msg_today">�ֱٺ� ��ǰ�� �����ϴ�.</p></div>';
			currDiv.querySelector("#allCheck").style.display = "none";
		}

		currDiv.querySelector(".today_goods_table_scroll").innerHTML = div;
		currDiv.querySelector("#allCheck").checked = false;
		//���ú���ǰ Ŭ���� ��ǰ ���˾� �̺�Ʈ ���
		eventModule.addEventArray("click", currDiv.querySelectorAll(".proName"), clickReorderProTitle);
		eventModule.addEventArray("click", currDiv.querySelectorAll(".pro-temp-stop3"), clickReorderProTitle);
		eventModule.addEventArray("click", currDiv.querySelectorAll(".pro-temp-stop"), clickReorderProTitle);
		//���ú���ǰ �������� ��ư �̺�Ʈ ���
		eventModule.addEventArray("click", currDiv.querySelectorAll(".count_up"), clickCountUpToday);
		eventModule.addEventArray("click", currDiv.querySelectorAll(".count_down"), clickCountDownToday);
		//���� �Է� �ؽ�Ʈ �ڽ� �̺�Ʈ ����
		eventModule.addEventArrayKeyUp(currDiv.querySelectorAll(".input_qty"),proQtyKeyEventHandler);
		eventModule.addEventArray("change",currDiv.querySelectorAll(".input_qty"),changeProQtyEventWingHandler);
		//���� ��ǰ �����߰� ��ư �̺�Ʈ ���
		eventModule.addEventArray("click", currDiv.querySelectorAll(".btnAddCart"), addCartTodayPro);
		//���� �� ��ǰ �����߰� ��ư �̺�Ʈ ���
		eventModule.addEventArray("click", currDiv.querySelectorAll(".btnAddCart2"), addCartTodayPro2);
		//���ɻ�ǰ ���� ��ư �̺�Ʈ ���
		eventModule.addEventArray("click", currDiv.querySelectorAll(".saveWish"), saveWishTodayPro);
		//���ú���ǰ ������ư �̺�Ʈ ���
		eventModule.addEventArray("click", currDiv.querySelectorAll(".btnDelWish"), delTodayPro);

		if (!sort)
			sort = 0;
		var tabs = document.querySelectorAll("#today-product li.sortCode"),
			len = tabs.length,
			tab = currDiv.querySelector("li#sort" + sort);

		for (var i = 0; i < len; i++) {
			$(tabs[i]).removeClass("on");
		}

		$(tab).addClass("on");

		openWingMenu("today-product", "max");
	}

	/**
	 * @param {Array} list - ���ɻ�ǰ ����Ʈ <WishListDTO>
	 * @description ���ɻ�ǰ ����Ʈ UI ����
	 */
	function makeWishList(dto, sort) {
		var list = dto.products,
			tab = document.getElementById("wish_product"),
			len,
			con = "";

		if (list != null) len = list.length;
		else len = 0;

		tab.querySelector(".attention_check").checked = false;
		tab.querySelector(".estimate_attention_total .total_cnt").innerHTML = "��ü&nbsp;(" + dto.totalCount + ")";
		tab.querySelector(".estimate_attention_total .med_cnt").innerHTML = "�Ǿ�ǰ&nbsp;(" + dto.medCount + ")";
		tab.querySelector(".estimate_attention_total .etc_cnt").innerHTML = "�Ǿ��ǰ&nbsp;(" + dto.etcCount + ")";
		tab.querySelector(".estimate_attention_total .edu_cnt").innerHTML = "�����ڷ�&nbsp;(" + dto.eduCount + ")";

		if (len > 0) {
			for (var i = 0; i < len; i++) {

				var pro = list[i],
					error = 0;

				/**
				 * error 1: ��ǰ�� ���� �߻�, �ٷ� �ֹ� �Ұ�
				 * error 2: �ǸŰ��� ����Ǿ� �ٷ� �ֹ� �Ұ�
				 * error 3: �Ͻ�ǰ���Ǿ� �ٷ� �ֹ� �Ұ�
				 * error 4: �Ǹ��ߴܵǾ� �ٷ� �ֹ� �Ұ�
				 */
				if (pro.sale == 0 || pro.result == 0) {
					error = 1;
				} else if (pro.delivery_type == 3) {
					error = 3;
				} else if (pro.delivery_type == 5 || pro.delivery_type == 6) {
					error = 4;
				} else if (pro.pro_status != 1) {
					error = 5;
				}

				con += '<div class="estimate_attention">';
				con += '<input type="hidden" id="idx' + i + '" value="' + pro.pro_stock_idx + '">';
				con += '<input type="hidden" id="pro_idx' + i + '" value="' + pro.pro_idx + '">';
				con += '<input type="hidden" id="pro_name' + i + '" value="' + pro.pro_name + '">';
				con += '<input type="hidden" id="delivery_type' + i + '" value="' + pro.delivery_type + '">';
				con += '<input type="hidden" id="stop_content' + i + '" value="' + pro.stop_content + '">';
				con += '<input type="hidden" id="point_view' + i + '" value="' + pro.point_view + '">';
				con += '<input type="hidden" id="pro_standby_stock' + i + '" value="' + pro.pro_standby_stock + '">';
				con += '<input type="hidden" id="sale_qty' + i + '" value="' + pro.sale_qty + '">';
				con += '<input type="hidden" id="ecode' + i + '" value="' + error + '">';
				con += '<ul class="estimate_attention_total_content"><li>';
				
				if(pro.pro_status ==1 && pro.delivery_type != 5 && pro.delivery_type != 6 && pro.delivery_type !=3 && pro.point_view==0) {
					if (pro.sale_stop != 2) {
						con += '<input type="checkbox" class="wishCheck" id="' + i + '" value="' + pro.pro_stock_idx + '">';					}
				}

				if (pro.pro_sort_code == "MED") con += '</li><li>��ǰ</li>';
				else if (pro.pro_sort_code == "EDU") con += '</li><li>����</li>';
				else con += '</li><li>��ǰ</li>';

				if(pro.pro_status == 1 && pro.delivery_type!=5 && pro.delivery_type!=6) {
					
					con += '<li class="wishPro wish-normal-pro" data-idx="'+pro.pro_stock_idx+'" data-pro-idx="'+pro.pro_idx+'" data-delivery-type="'+pro.delivery_type+'" data-pro-status="'+pro.pro_status+'">';
					
				}else{
					con += '<li class="wishPro wish-stop-pro" data-idx="'+pro.pro_stock_idx+'" data-pro-idx="'+pro.pro_idx+'" data-delivery-type="'+pro.delivery_type+'" data-pro-status="'+pro.pro_status+'">';
				}
				
				con += pro.pro_name + '<span class="proKind">&nbsp;/&nbsp;' + pro.pro_kind + '</span></li><li>' + commonModule.commas(parseInt(pro.pro_price)) + '</li>';
				
				if(pro.pro_status == 1){
					
					if (pro.sale_stop == 2) {
						
						con += '<li><span class="pro-result-msg">���߿���</span></li>';
						con += '<li class="del-stop-pro"><a href="javascript:void(0);" class="btn-delete1 btnDelWish" id="' + i + '">����</a></li>';
						
					} else if(pro.sale_stop == 3){
						
						con += '<li><span class="pro-result-msg pro-temp-stop3" data-idx="'+pro.pro_stock_idx+'" data-pro-idx="'+pro.pro_idx+'" data-delivery-type="'+pro.delivery_type+'" data-pro-status="'+pro.pro_status+'">�����ֹ�</span></li>';
						con += '<li class="del-stop-pro"><a href="javascript:void(0);" class="btn-delete1 btnDelWish" id="' + i + '">����</a></li>';
						
					} else {
						if(pro.delivery_type==3){
							con += '<li><span class="pro-result-msg pro-temp-stop" data-idx="'+pro.pro_stock_idx+'" data-pro-idx="'+pro.pro_idx+'" data-delivery-type="'+pro.delivery_type+'" data-pro-status="'+pro.pro_status+'">���԰��˸�</span></li>';
							con += '<li class="del-stop-pro"><a href="javascript:void(0);" class="btn-delete1 btnDelWish" id="' + i + '">����</a></li>';
						}
						else if(pro.delivery_type==5 || pro.delivery_type==6){
							con += '<li><span class="pro-result-msg">�Ǹ��ߴ�</span></li>';
							con += '<li class="del-stop-pro"><a href="javascript:void(0);" class="btn-delete1 btnDelWish" id="' + i + '">����</a></li>';
						}
						else{
							con += '<li id="liQty' + i + '"><input type="text" class="input_qty numberOnly" value="1" maxlength="4" id="qty' + i + '"></input>';
							con += '<span class="estimate_count"><img src="' + PathData.getPath() + '/img/product/arr_up.gif" border="0" class="count_up" id="' + i + '">';
							con += '<img src="' + PathData.getPath() + '/img/product/arr_down.gif" border="0" class="count_down" id="' + i + '"></li>'
							con += '<li><span class="proest_selectbox"><label for="selectbox"></label><select title="����" class="est_type" id="estSel' + i + '"><option value="1">����1</option><option value="2">����2</option><option value="3">����3</option>';
							con += '<option value="4">����4</option><option value="5">����5</option><option value="6">����6</option></select></span></li>';
							con += '<li><a href="javascript:void(0);" class="btnAddCart" id="' + i + '"><img src="' + PathData.getPath() + '/img/product/btn_qk_order.png" style="width:20px;"></a></li><li><a href="javascript:void(0);" class="btn-delete1 btnDelWish" id="' + i + '">����</a></li>';
						}
					}
					
				}else{
					if(pro.pro_status == 3){
						con += '<li><span class="pro-result-msg">ǰ����ǰ</span></li>';
					}
					else if(pro.pro_status == 4 || pro.pro_status == 5) con += '<li><span class="pro-result-msg">�Ǹ��ߴ�</span></li>';
					con += '<li class="del-stop-pro"><a href="javascript:void(0);" class="btn-delete1 btnDelWish" id="' + i + '">����</a></li>';
				}
				
				con += '</ul></div>';
			}
			
			tab.querySelector(".attention_check").style.display = "inline-block";
		} else {
			con += '<div class="emptyWish">'
			con += '<p class="no_msg_wish">���ɻ�ǰ�� ����� ��ǰ�� �����ϴ�.</p></div>';
			tab.querySelector(".attention_check").style.display = "none";
			//document.querySelector("#wish_product .estimate_attention_total ul").style.display = "none";
			//document.querySelector("#wish_product .estimate_attention_total span").style.display = "none";
		}

		document.querySelector("#wish_product .estimate_attention_scroll").innerHTML = con;

		eventModule.addEventArray("click", tab.querySelectorAll(".count_up"), clickCountUpWish);
		eventModule.addEventArray("click", tab.querySelectorAll(".count_down"), clickCountDownWish);
		
		//���� �Է� �ؽ�Ʈ �ڽ� �̺�Ʈ ����
		eventModule.addEventArrayKeyUp(tab.querySelectorAll(".input_qty"),proQtyKeyEventHandler);
        eventModule.addEventArray("change",tab.querySelectorAll(".input_qty"), changeProQtyEventWingHandler);
        //eventModule.addEventArray("change", tab.querySelectorAll(".input_qty"), changeProQty);
		
		eventModule.addEventArray("click", tab.querySelectorAll(".btnAddCart"), clickWishAddCart);
		eventModule.addEventArray("click", tab.querySelectorAll(".btnDelWish"), clickDelWish);
		// ��ǰ ���˾� �̺�Ʈ ���
		eventModule.addEventArray("click", tab.querySelectorAll(".wishPro"), clickReorderProTitle);
		eventModule.addEventArray("click", tab.querySelectorAll(".pro-temp-stop3"), clickReorderProTitle);
		eventModule.addEventArray("click", tab.querySelectorAll(".pro-temp-stop"), clickReorderProTitle);
		
        if (!sort) sort = 0;
		var tabs = document.querySelectorAll("#wish_product li.sortCode"),
			len = tabs.length,
			tab = tab.querySelector("li#sort" + sort);

		for (var i = 0; i < len; i++) {
			$(tabs[i]).removeClass("on");
		}
		$(tab).addClass("on");

		openWingMenu("wish_product", "max");
	}

	/**
	 * @description ������� UI ����
	 */
	function makeEstDocList(list, docList) {
		var size = list.length,
			div = document.getElementById("print_doc"),
			con = "", sub = "",
			est, errorCode,
			docLen = docList.length,
			i = 0, j;

		div.querySelector(".print_doc_table_content").innerHTML = "";
		if(size > 0){

			for (; i < size; i++) {
				est = list[i];
	
				sub = '<div class="print_doc_content_title"><ul class="print_doc_total_title">';
				if (est.order_title != null) {
					sub += '<li class="printdoc_title">����' + est.order_type;
					sub += '<p>' + est.order_title + '</p>';
				}else{
					sub += '<li class="printdocdoc_notitle">����' + est.order_type;
				}
				sub += '</li>';
				sub += '<li>' + est.order_date + '</li>';

				sub += '<li class="pro_name" id="data'+i+'" data-order-idx="'+est.order_idx+'" data-order-type="'+est.order_type+'" data-order-check="'+est.orderCheck+'" data-error-type="'+est.errorType+'" data-agent-cnt="'+est.agent_count+'">';
				
				if (est.errorType >= 3 || est.agent_count >=1) {
					sub += '<img src="'+PathData.getPath()+'/img/mypage/icon_sale_no.png">';
				}

				if (est.pro_count > 1) {
					sub += est.pro_name.substr(0, 20) + ' �� ' + (est.pro_count - 1) + ' ��</li>';
				} else {
					sub += est.pro_name.substr(0, 25) + '</li>';
				}
	
	
				sub += '<li><span>' + commonModule.commas(est.total) + '</span></li>';
				sub += '<li><div class="est-type-wrap"><span class="est_selectbox"><label for="selectbox"></label><select title="�������ּ���" class="print_doc_type" id="docOpt' + i + '"><option value="">�������ּ���</option>';
	
				for (j = 0; j < docLen; j++) {
					sub += '<option value="' + (j + 1) + '">' + docList[j] + '</option>';
				}
	
				sub += '</span></select></span><a href="javascript:void(0);" class="btn-print-doc" data-index="'+i+'"><span class="print_doc_bt out"><label>���</label></span></a><br>';
				sub += '<a href="javascript:void(0);" class="btn-save-doc" data-index="'+i+'"><span class="print_doc_bt save"><label>����</label></span></a></li>';
				sub += '<li><button type="button" class="print_doc_edu edufine" value="' + i + '">������������</button></li>';
				sub += '</ul><input type="hidden" id="errorCode' + i + '" value="' + errorCode + '"></input>';
				sub += '<input type="hidden" id="orderIdx' + i + '" value="' + est.order_idx + '"></input></div>';
				con += sub;
			}
			$(".print_doc_scroll .print_doc_content_title").each(function() {
				$(this).remove();
			});
			
			$(".print_doc .print-doc-content").addClass("on");
			$(".print_doc .empty-doc").removeClass("on");
		}
		else{
			$(".print_doc .empty-doc").addClass("on");
			$(".print_doc .print-doc-content").removeClass("on");
		}

		div.querySelector(".print_doc_table_content").insertAdjacentHTML("afterbegin", con);
		
		if(size >0){
			eventModule.addEventArray("click", div.querySelectorAll("a.btn-print-doc"), clickPrintDoc);
			eventModule.addEventArray("click", div.querySelectorAll("a.btn-save-doc"), clickSaveDoc);
			eventModule.addEventArray("click", div.querySelectorAll("button.edufine"), clickSaveEdufine);
			eventModule.addEventArray("click", div.querySelectorAll(".pro_name"), clickProTitle);
			eventModule.addEventObject("click",div.querySelector(".doc-type-sample"),openDocSample);
		}
		
		openWingMenu("print_doc", "max");
	}
	
	/**
	 * @param {Array} - estimates list
	 * @description �����ٱ��� UI ��������
	 */
	function makeEstOrderCart(data,typeArr){
		
		var list = data.estimates,
			len = list.length,
			currDiv = document.getElementById("make-order"),
			div = document.querySelector("#make-order div.order-cart-data-all"),
			con = "", ul="", i=0;
		if(len>0){
			
			for(; i<len; i++){
				
				var est = list[i];
				ul = '<ul class="order-cart-data" id="est-data'+est.order_type+'"  data-order-price="'+est.total+'" data-agent-count="'+est.agent_count+'" data-order-check="'+est.orderCheck+'" data-error-type="'+est.errorType+'" data-stop-msg="'+est.stopMessage+'" data-agent-type = "'+est.agentType+'">';
				
				if(typeArr!=null && typeArr.indexOf(est.order_type)!= -1){
					ul += '<li class="est-check"><input type="checkbox" checked="checked" class="est-chk" id="'+est.order_type+'" value="'+est.order_idx+'"/></li>';
				}else{
					ul += '<li class="est-check"><input type="checkbox" class="est-chk" id="'+est.order_type+'" value="'+est.order_idx+'"/></li>';
				}
				
				if(est.order_title!=null){
					ul += '<li class="est-no">����'+est.order_type;
					ul += '<span class="est-name">'+est.order_title+'</span></li>';
				}else{
					ul += '<li class="est-no no-title">����'+est.order_type+'</li>';
				}

				ul += '<li class="est-date">'+est.order_date+'</li>';
				ul += '<li class="pro-name" data-order-type="'+est.order_type+'" style="cursor:pointer;">';
				
				if(est.errorType >=3 || est.orderCheck==1 || est.agent_count>0){
					ul += '<img src="'+PathData.getPath()+'/img/mypage/icon_sale_no.png">';
				}
				
				ul += '<span class="ordercart_proname">'+est.pro_name+'</span>';
				
				if(est.pro_count>1){ ul += '�� <span class="est-cnt">'+(est.pro_count-1)+'</span>��'; }
				
				ul += '</li><li class="est-total">'+commonModule.commas(est.total)+'</li>';
				ul += '<li class="est-button"><span class="btnModi" data-order-type="'+est.order_type+'">����</span>';
				ul += '<span class="btnDel" data-order-type="'+est.order_type+'" data-order-idx="'+est.order_idx+'">����</span></li></ul>';
				con += ul;
			}
            div.innerHTML = con;
            
            if(typeArr!=null && typeArr.length==6) document.querySelector("#make-order .allCheck").checked = true;
            else document.querySelector("#make-order .allCheck").checked = false;

			document.querySelector("#make-order .order-cart-info").style.display = "block";
			document.querySelector("#make-order span.txt_total .total_price").innerHTML = commonModule.commas(data.estTotal);

			eventModule.addEventArray("click", currDiv.querySelectorAll("li.pro-name"), clickEstProName);
			eventModule.addEventArray("click", currDiv.querySelectorAll("span.btnModi"), clickEstModiBtn);
			eventModule.addEventArray("click", currDiv.querySelectorAll("span.btnDel"), clickEstListDelBtn);
			eventModule.addEventArray("change", currDiv.querySelectorAll('.est-chk'),changeEstCheck);
		
			$("#make-order .order-cart-content").addClass("on");
			$("#make-order .empty-order-cart").removeClass("on");
		
		}else{
			$("#make-order .order-cart-content").removeClass("on");
			$("#make-order .empty-order-cart").addClass("on");
		}
		changeEstCheck();
		openWingMenu("make-order", "max");
	}

	/**
	 * @description �ֹ���ǰ �籸�� UI ���� ����
	 */
	function makeRepurchaseList(dto, sort) {
		var list = dto.products,
			size = list.length,
			div = document.getElementById("product_reorder"),
			con = "",
			sub = "",
			pro,
			error,
			i = 0;

		div.querySelector(".allcheck").checked = false;
		div.querySelector(".total_cnt").innerHTML = "��ü&nbsp;(" + dto.totalCount + ")";
		div.querySelector(".med_count").innerHTML = "�Ǿ�ǰ&nbsp;(" + dto.medCount + ")";
		div.querySelector(".etc_count").innerHTML = "�Ǿ��ǰ&nbsp;(" + dto.etcCount + ")";
		div.querySelector(".edu_count").innerHTML = "�����ڷ�&nbsp;(" + dto.eduCount + ")";

		if (size > 0) {
			for (; i < size; i++) {
				pro = list[i],
				error = 0;

				/**
				 * error 1: ��ǰ�� ���� �߻�, �ٷ� �ֹ� �Ұ�
				 * error 2: �ǸŰ��� ����Ǿ� �ٷ� �ֹ� �Ұ�
				 * error 3: �Ͻ�ǰ���Ǿ� �ٷ� �ֹ� �Ұ�
				 * error 4: �Ǹ��ߴܵǾ� �ٷ� �ֹ� �Ұ�
				 */
				if (pro.sale == 0 || pro.result == 0) {
					error = 1;
				} else if (pro.delivery_type == 3) {
					error = 3;
				} else if (pro.delivery_type == 5 || pro.delivery_type == 6) {
					error = 4;
				} else if (pro.pro_status != 1) {
					error = 5;
				}

				sub = '<div class="estimate_reorder">';
				sub += '<input type="hidden" id="pro_name' + i + '" value="' + pro.pro_name + '"></input>';
				sub += '<input type="hidden" class="proPrice" id="price' + i + '" value="' + pro.curr_price + '"></input>';
				sub += '<input type="hidden" class="stockIdx" id="stock_idx' + i + '" value="' + pro.idx + '"></input>';
				sub += '<input type="hidden" class="proIdx" id="pro_idx' + i + '" value="' + pro.idx + '"></input>';
				sub += '<input type="hidden" class="delivery_type" id="delivery_type' + i + '" value="' + pro.delivery_type + '"></input>';
				sub += '<input type="hidden" id="stop_content' + i + '" value="' + pro.stop_content + '"></input>';
				sub += '<input type="hidden" class="point_view" id="point_view' + i + '" value="' + pro.point_view+ '"></input>';
				sub += '<input type="hidden" id="pro_standby_stock' + i + '" value="' + pro.pro_standby_stock + '"></input>';
				sub += '<input type="hidden" id="sale_qty' + i + '" value="' + pro.sale_qty + '"></input>';
				sub += '<input type="hidden" id="ecode' + i + '" value="' + error + '"></input>';

				sub += '<ul class="estimate_reorder_total_content"><li>';
				if(pro.pro_status==1 && (pro.delivery_type!=5 && pro.delivery_type!=6 && pro.delivery_type!=3 && pro.point_view==0)){
					if (pro.sale_stop != 2) {
						sub += '<input type="checkbox" class="reorder_check" id="' + i + '" value="' + pro.idx + '">';
					}
					
				}
				sub += '</li><li>' + pro.pro_sort_code + '</li>';
				
				if(pro.pro_status==1 && pro.delivery_type!=5  && pro.delivery_type!=6){
					sub += '<li class="reorder-normal-pro">';
				}else{
					sub += '<li class="reorder-stop-pro">';
				}
				sub += '<span class="reorder_name" data-idx="'+pro.idx+'" data-pro-idx="'+pro.pro_idx+'" data-delivery-type="'+pro.delivery_type+'" data-pro-status="'+pro.pro_status+'">' + pro.pro_name + '</span>&nbsp;/&nbsp;' + pro.pro_kind + '</li>';
				sub += '<li>' + commonModule.commas(pro.curr_price) + '</li>';
				
				if(pro.pro_status==1){
					
					if (pro.sale_stop==2) {
						
						sub += '<li><span class="pro-result-msg">���߿���</span></li>';
						
					}else if(pro.sale_stop==3){
						sub += '<li><span class="pro-result-msg pro-temp-stop3" data-idx="'+pro.idx+'" data-pro-idx="'+pro.pro_idx+'" data-delivery-type="'+pro.delivery_type+'" data-pro-status="'+pro.pro_status+'">�����ֹ�</span></li>';
					} 
					else {
						if(pro.delivery_type == 3) sub += '<li><span class="pro-result-msg pro-temp-stop" data-idx="'+pro.idx+'" data-pro-idx="'+pro.pro_idx+'" data-delivery-type="'+pro.delivery_type+'" data-pro-status="'+pro.pro_status+'">���԰��˸�</span></li>';
						else if(pro.delivery_type == 5 || pro.delivery_type == 6) sub += '<li><span class="pro-result-msg">�Ǹ��ߴ�</span></li>';
						else{
							sub += '<li><input type="hidden" class="proQty" id="qty' + i + '" value="1"></input>'
							sub += '<input type="text" class="input_qty numberOnly" name="pro_qty" id="' + i + '" value="1" maxlength="4"><span class="estimate_count">';
							sub += '<img src="' + PathData.getPath() + '/img/product/arr_up.gif" border="0" class="count_up" id="' + i + '"><img src="' + PathData.getPath() + '/img/product/arr_down.gif" border="0" class="count_down" id="' + i + '"></li>';
							sub += '<li><span class="proest_selectbox reorder"><label for="selectbox"></label><select title="����" class="reorder_type" id="order_type' + i + '"><option value="1">����1</option><option value="2">����2</option><option value="3">����3</option>';
							sub += '<option value="4">����4</option><option value="5">����5</option><option value="6">����6</option></span></select></li>';
							sub += '<li><a href="javascript:void(0);" class="saveCart" id="' + i + '"><img src="' + PathData.getPath() + '/img/product/btn_qk_order.png" class="reorder_img" alt="��������" title="��������" style="width:20px;"></a></li>';
							sub += '<li><a href="javascript:void(0);" class="saveWish" id="' + i + '"><img src="' + PathData.getPath() + '/img/product/btn_qk_wish.png" class="reorder_img" alt="���ɻ�ǰ����" title="���ɻ�ǰ����"></a></li>';
						}
					}
					
				}else{
					if(pro.pro_status == 2 || pro.pro_status == 8) sub += '<li><span class="pro-result-msg">���ǻ�ǰ</span></li>';
					else if(pro.pro_status == 3) sub += '<li><span class="pro-result-msg">ǰ����ǰ</span></li>';
					else if(pro.pro_status == 4 || pro.pro_status ==5) sub += '<li><span class="pro-result-msg">�Ǹ��ߴ�</span></li>';
					else if(pro.pro_status == 6) sub += '<li><span class="pro-result-msg">���Ŵ���</span></li>';
				}
				sub += '</ul></div>';
				con += sub;
			}
			div.querySelector(".estimate_reorder_scroll").innerHTML = con;
			div.querySelector(".allcheck").style.display = "block";
		} else {
			con = '<div class="emptyRe"><p class="no_msg_re">���� �ֹ���ǰ ������ �����ϴ�.</p></div>';
			div.querySelector(".estimate_reorder_scroll").innerHTML = con;
			div.querySelector(".estimate_reorder").innerHTML = "";
			div.querySelector(".allcheck").style.display = "none";
		}

		if (size > 0) {
			eventModule.addEventArray("click", div.querySelectorAll(".saveCart"), reAddCart);
			eventModule.addEventArray("click", div.querySelectorAll(".saveWish"), reAddWish);
			eventModule.addEventArray("click", div.querySelectorAll(".reorder_name"), clickReorderProTitle);
			eventModule.addEventArray("click", div.querySelectorAll(".reorder_name"), clickReorderProTitle);
			eventModule.addEventArray("click", div.querySelectorAll(".pro-temp-stop3"), clickReorderProTitle);
			//������ ���� ���� �̺�Ʈ �߰�
			eventModule.addEventArray("click", div.querySelectorAll(".count_up"), clickCountUpRePurchase);
			eventModule.addEventArray("click", div.querySelectorAll(".count_down"), clickCountDownRePurchase);
			eventModule.addEventArray("change", div.querySelectorAll(".input_qty"), changeCountRePurchase);
			//���� �Է� �ؽ�Ʈ �ڽ� �̺�Ʈ ����
			eventModule.addEventArrayKeyUp(div.querySelectorAll(".input_qty"),proQtyKeyEventHandler);
			//����Ʈ ���콺 �����̺�Ʈ
			eventModule.addEventArray("mouseover", div.querySelectorAll(".estimate_reorder_total_content"), overReorderList);
			eventModule.addEventArray("mouseout", div.querySelectorAll(".estimate_reorder_total_content"), outReorderList);
		}
		if (sort == null) sort = 0;

		var tabs = document.querySelectorAll("#product_reorder li.sortCode"),
			len = tabs.length,
			tab = div.querySelector("li#sort" + sort);

		for (var i = 0; i < len; i++) {
			$(tabs[i]).removeClass("on");
		}

		$(tab).addClass("on");
		openWingMenu("product_reorder", "max");
	}
	
	/**
	 * @param {Object} dto - AgentListTempDTO
	 * @description ���Ŵ��� UI ����
	 */
	function makeAgentListTemp(dto, openFlag){
		
		var maxLen = 6;
		var list = dto.agentTemps,
			size = list.length,
			remain = maxLen - size,
			div = document.getElementById("pro_purchase"),
			con = "", sub = "", i =0;
		
		div.querySelector("#phone1").value = dto.phone_num.split("-")[0];
		div.querySelector("#phone2").value = dto.phone_num.split("-")[1];
		div.querySelector("#phone3").value = dto.phone_num.split("-")[2];
		
		/**
		 * 1. ���Ŵ��� ��û�� �߰��� ���� �� ��û���� �̸� ����
		 * Ŭ������: clone_blank_form --> display: none;
		 * ���Ŵ��� ��û�� �߰� ���θ� Ȯ���ϱ� ���ؼ� ���Ŵ��� ��û ���� ������(0)/������(1)/���οϷ�(2) �� �ش��ϴ� Ŭ������ �߰� 
		 * -������ : agent-write
		 * -������ : agent-submit
		 * -���οϷ� : agent-accept
		 * + �� ������ : agent-blank
		 */
		con += '<div class="pro_purchase_clone clone_blank_form">';
		con += '<p style="padding-right:20px;">���� : ������</p>';
		con += '<ul class="pro_purchase_form_content1">';
		con += '<li><span class="purchase_title">��ǰ��</span><input type="text" class="pro_purchaseinput1 in_name enable-r-click"></li>';
		con += '<li><span class="purchase_title">�ɼ�</span><input type="text" class="pro_purchaseinput2 in_option enable-r-click"></li>';
		con += '<li><span class="purchase_title">����</span><input type="text" class="pro_purchaseinput3 in_price numberOnly"></li>';
		con += '<li><span class="purchase_title">����</span><input type="text" class="pro_purchaseinput4 in_qty numberOnly"></li>';
		con += '<li><span class="purchase_title1">URL</span><input type="text" class="pro_purchaseinput5 in_url enable-r-click"></li>';
		con += '<li><span class="purchase_title2">��������</span>';
		con += '<span class="pro_selectbox">';
		con += '<label for="selectbox"></label>';
		con += '<select title="����" class="pro_purchase_type">';
		
		if(dto.checkOrder.length >0){
			
			for(var j=0; j<dto.checkOrder.length; j++){
				con += '<option value="'+dto.checkOrder[j].idx+'">����'+dto.checkOrder[j].order_type+'</option>';
			}
			
		}else{
			con += '<option value="0">������ ������ �����ϴ�.</option>';		
		}
		
		con += '</select></span></li>';
		con += '<button type="button" class="pro_purchase_save">�ӽ�����</button>';
		con += '<button type="button" class="pro_purchase_submit" data-agent-chk="-1" data-agent-idx="-1">�����ϱ�</button></ul></div>'; 
		
		if(size > 0){
			
			for(; i<size; i++){
				var status = "", subClass="";
				
				switch(list[i].agent_chk){
					case 0: status = '������'; subClass= "agent-write"; break;
					case 1: status = 'Ȯ����'; subClass= "agent-submit"; break;
					case 2: status = '���οϷ�'; subClass= "agent-accept"; break;
				}
				
				if(list[i].agent_option==null) list[i].agent_option = "";
				
				sub += '<div class="pro_purchase_clone '+subClass+'">';
				sub += '<p style="padding-right:20px;">���� : <span>'+status+'</span></p><ul class="pro_purchase_form_content1">';
				sub += '<li><span class="purchase_title">��ǰ��</span><input type="text" class="pro_purchaseinput1 in_name enable-r-click" value="'+list[i].agent_name+'"></li>';
				sub += '<li><span class="purchase_title">�ɼ�</span><input type="text" class="pro_purchaseinput2 in_option enable-r-click" value="'+list[i].agent_option+'"></li>'
				sub += '<li><span class="purchase_title">����</span><input type="text" class="pro_purchaseinput3 in_price numberOnly" value="'+list[i].agent_price+'"></li>';
				sub += '<li><span class="purchase_title">����</span><input type="text" class="pro_purchaseinput4 in_qty numberOnly" value="'+list[i].agent_quantity+'"></li>';
				sub += '<li><span class="purchase_title1">URL</span><input type="text" class="pro_purchaseinput5 in_url enable-r-click" value="'+list[i].agent_url+'"></li>';
				sub += '<li><span class="purchase_title2">��������</span>';
				sub += '<span class="pro_selectbox">';
				sub += '<label for="selectbox"></label><select title="����" class="pro_purchase_type">';
			
				if(dto.checkOrder.length >0){
					
					for(var j=0; j<dto.checkOrder.length; j++){
						if(dto.checkOrder[j].order_type == list[i].order_type){
							sub += '<option value="'+dto.checkOrder[j].idx+'" selected="selected">����'+dto.checkOrder[j].order_type+'</option>';
						}else{
							sub += '<option value="'+dto.checkOrder[j].idx+'">����'+dto.checkOrder[j].order_type+'</option>';
						}
					}
					
				}else{
					sub += '<option value="0">������ ������ �����ϴ�.</option>';		
				}
				
				sub += '</select></span></li>';
				
				if(list[i].agent_chk<1){
					sub += '<button type="button" class="pro_purchase_modi" data-agent-chk="'+list[i].agent_chk+'" data-agent-idx="'+list[i].idx+'">�����ϱ�</button>';		
					sub += '<button type="button" class="pro_purchase_submit" data-agent-chk="'+list[i].agent_chk+'" data-agent-idx="'+list[i].idx+'">�����ϱ�</button></ul></div>';	
				}
				else if(list[i].agent_chk==1){
					sub += '<div class="info-msg">����ڰ� Ȯ�����Դϴ�. ��ø� ��ٷ��ּ���.</div></ul></div>';
				}else if(list[i].agent_chk==2){
					sub += '<div class="success-msg">���� '+list[i].order_type+' �� �߰��Ǿ����ϴ�.</div></ul></div>';
				}
			}
			con += sub;
		}else{
			remain = maxLen - 1;
			sub += '<div class="pro_purchase_clone agent-blank">';
			sub += '<p style="padding-right:20px;">���� : ������</p><ul class="pro_purchase_form_content1">';
			sub += '<li><span class="purchase_title">��ǰ��</span><input type="text" class="pro_purchaseinput1 in_name enable-r-click" value=""></li>';
			sub += '<li><span class="purchase_title">�ɼ�</span><input type="text" class="pro_purchaseinput2 in_option enable-r-click" value=""></li>'
			sub += '<li><span class="purchase_title">����</span><input type="text" class="pro_purchaseinput3 in_price numberOnly" value="" placeholder="��ۺ����� ����"></li>';
			sub += '<li><span class="purchase_title">����</span><input type="text" class="pro_purchaseinput4 in_qty numberOnly" value=""></li>';
			sub += '<li><span class="purchase_title1">URL</span><input type="text" class="pro_purchaseinput5 in_url enable-r-click" value="" placeholder="���ž�ü ����Ʈ�� ��ǰ������ URL ����"></li>';
			sub += '<li><span class="purchase_title2">��������</span>';
			sub += '<span class="pro_selectbox">';
			sub += '<label for="selectbox"></label><select title="����" class="pro_purchase_type">';
			
			if(dto.checkOrder.length >0){
				
				for(var j=0; j<dto.checkOrder.length; j++){
					sub += '<option value="'+dto.checkOrder[j].idx+'">����'+dto.checkOrder[j].order_type+'</option>';
				}
				
			}else{
				sub += '<option value="0">������ ������ �����ϴ�.</option>';		
			}
			
			sub += '</select></span></li>';
			sub += '<button type="button" class="pro_purchase_save" id="saveAgent">�ӽ�����</button><button type="button" class="pro_purchase_submit"  data-agent-chk="-1" data-agent-idx="-1">�����ϱ�</button>';
			sub += '</ul></div>';	
			con += sub;
		}
		if(remain>0){
			con += '<button type="button" class="purchase_submit" id="purchase_submit" data-remain-cnt="3"><span>���Ŵ��� ��û�� �߰�(<span class="remain_cnt">'+remain+'</span>)&nbsp;&nbsp;<img src="'+PathData.getPath()+'/img/product/icon_btn_down_w.png"></span></button>';
			con += '<input type="hidden" id="purchase_cnt" value="'+(remain-1)+'"></input>';
		}
		
		//div.querySelector(".pro_purchase_form_content").insertAdjacentHTML("beforeend", con);
		div.querySelector(".pro_purchase_form_list").innerHTML = con;
		
		if(remain>0){
			//���Ŵ��� ��û�� �߰� ��ư �̺�Ʈ
			eventModule.addEventObject("click",div.querySelector(".purchase_submit"),makePurchaseForm);
		}
		
		if(size>0){
			//�����ϱ� ��ư �̺�Ʈ �߰�
			eventModule.addEventArray("click",div.querySelectorAll(".pro_purchase_modi"),clickModiTempAgent);
		}
		//���Ŵ��� ��ư �̺�Ʈ �ʱ�ȭ(����)
		initAgentEvent(div);
		openWingMenu("pro_purchase", "max");
		
		//���Ŵ��� �̽�û�ÿ��� �ȳ����� �̺�Ʈ ����
		if(!openFlag && size == 0){
			openPurchaseInfo();
			setTimeout(function(){
				closePurchaseInfo();
			},3000);
		}
	}
	
	/**
	 * @param {HTMLElement} div - �̺�Ʈ�� �߰��ϰ����ϴ� object �� ���δ� div
	 * @description ���Ŵ��� ��û�� ���� ��ư �̺�Ʈ �ʱ�ȭ
	 */
	function initAgentEvent(div){
		
		//�ӽ����� ��ư �̺�Ʈ �߰�
		eventModule.addEventArray("click",div.querySelectorAll(".pro_purchase_save"),clickSaveTempAgent);
		//�����ϱ� ��ư �̺�Ʈ �߰�
		eventModule.addEventArray("click",div.querySelectorAll(".pro_purchase_submit"),clickSubmitAgent);
		//����,������ ���ڸ� �Է� ����
		eventModule.addEventArrayKeyUp(div.querySelectorAll(".numberOnly"), commonModule.isNumberic);
	}
	
	/**
	 * @description �ֹ���ǰ�籸�� ����Ʈ ���콺���� �̺�Ʈ
	 */
	function overReorderList(obj){
		$(obj).css("background-color","#FDEBD8")
	}
	function outReorderList(obj){
		$(obj).css("background-color","#fff")
	}

	/**
	 * @description �ֹ���ǰ�籸�� ���� �߰�
	 */
	function reAddCart(target) {
		var idx = target.id,
			div = document.getElementById("product_reorder"),
			type = div.querySelector("#order_type" + idx).value,
			stockIdx = div.querySelector("#stock_idx" + idx).value,
			proIdx = div.querySelector("#pro_idx" + idx).value,
			qty = div.querySelector("#qty" + idx).value,
			delivery_type = div.querySelector("#delivery_type" + idx).value,
			stopCont = div.querySelector("#stop_content" + idx).value,
			pointView = div.querySelector("#point_view" + idx).value,
			proStandbyStock = div.querySelector("#pro_standby_stock" + idx).value;

		if (delivery_type == 2) {
			if (!stopCont || stopCont == "null") {
				stopCont = "�������� �������� ����� �����Ǵ� ��ǰ�Դϴ�. ������ �߰� �Ͻðڽ��ϱ�?\n";
			}else{
				stopCont = stopCont+"\n";
			}
			if (!confirm(stopCont))	return;
		} else if (delivery_type == 4) {
			stopCont = stopCont+"\n";
			if (!confirm(stopCont))	return;
		} else if (delivery_type == 3) {
			window.open('proIncomingNoti.action?proIdx=' + proIdx + "&proStockIdx=" + stockIdx, '', "width=460,height=600,top=");
			return;
		}

        if (type != null && stockIdx != null && qty != null) {
            var data = {
                "order_type" : type,
                "proStockIdx" : stockIdx,
                "proQuantity" : qty,
                "point_view" : pointView,
                "pro_standby_stock" : proStandbyStock,
                "saveFlag" : 1
            };

            $.ajax({
                cache : false,
                type : 'POST',
                crossDomain : true,
                url : 'isExistInEstimate.action',
                data : data,
                success : function(resultData) {
                    if (resultData.result == 'success') {
                    	if(resultData.point_view!='0'){
                    		wingAjaxDataModule.checkLimitPro(data);
                    	}else{
                    		wingAjaxDataModule.addProToEst(data);
                    	}
                        
                    } else {
                        if (confirm('[ ����' + resultData.selOrderType + ' ] �� "' + div.querySelector("#pro_name" + idx).value + '" ��ǰ�� ����ֽ��ϴ�. �߰� �Ͻðڽ��ϱ�?\n')) {
                        	if(resultData.point_view!='0'){
                        		wingAjaxDataModule.checkLimitPro(data);
                        	}else{
                        		wingAjaxDataModule.addProToEst(data);
                        	}
                        } else return false;
                    }
                }
            });
        }
	}

	/**
	 * @description ���� ���� ��ǰ ���� �߰� ��ư �̺�Ʈ
	 */
	function addCartTodayPro(target) {
		var parent = document.querySelector("#today-product #ul" + target.id),
			idx = parent.querySelector("#idx").value,
			proIdx = parent.querySelector("#pro_idx").value,
			qty = parent.querySelector(".input_qty").value,
			delivery = parent.querySelector("#delivery_type").value,
			stop = parent.querySelector("#stop_content").value,
			proName = parent.querySelector("#pro_name").value,
			pointView = parent.querySelector("#point_view").value,
			proStandByStock = parent.querySelector("#pro_standby_stock").value,
			type = parent.querySelector(".est_type").value,
			sale_qty = parent.querySelector("#pro_standby_stock").value;
		

		if (delivery == 2) {
			if (stop==null || stop =="") {
				stop = "�������� �������� ����� �����Ǵ� ��ǰ�Դϴ�. ������ �߰� �Ͻðڽ��ϱ�?\n";
			} else{
				stop = stop+"\n";
			}
			if (!confirm(stop)) return;
		} else if (delivery == 4) {
			stop = stop+"\n";
			if (!confirm(stop)) return;
		} else if (delivery == 3) {
			window.open('proIncomingNoti.action?proIdx=' + proIdx + "&proStockIdx=" + idx, '', "width=460,height=600,top=");
			return;
		} else if (delivery == 5) {
			window.open('proStopInfo.action?proIdx=' + proIdx + "&proStockIdx=" + idx, '', "width=460,height=600,top=");
			return;
		}

		//���� ���� ��ǰ 
//		if(pointView == 1 && proStandByStock)
//		if(pointView == 2 && (Number(qty)+Number(sale_qty)) > proStandByStock){
//			alert('�б��� �ִ� '+proStandByStock+'�� ���� ���� �����մϴ�.\n (���� ���� : '+(Number(qty)+Number(sale_qty))+'��)');
//			return false;
//		}
		
        if (type != null && idx != null && qty != null) {
            var data = {
                "order_type" : type,
                "proStockIdx" : idx,
                "proQuantity" : qty,
                "point_view" : pointView,
                "pro_standby_stock" : proStandByStock,
                "saveFlag" : 2
            };

            $.ajax({
                cache : false,
                type : 'POST',
                crossDomain : true,
                url : 'isExistInEstimate.action',
                data :data,
                success : function(resultData) {
                    if (resultData.result == 'success') {
                    	if(resultData.point_view != '0'){
                    		wingAjaxDataModule.checkLimitPro(data);
                    	}else{
                    		wingAjaxDataModule.addProToEst(data);
                    	}
                       
                    } else {
                        if (confirm('[ ����' + resultData.selOrderType + ' ] �� "' + proName + '" ��ǰ�� ����ֽ��ϴ�. �߰� �Ͻðڽ��ϱ�?\n')) {
                        	if(resultData.point_view != '0'){
                        		wingAjaxDataModule.checkLimitPro(data);
                        	}else{
                        		wingAjaxDataModule.addProToEst(data);
                        	}
                        } else return false;
                    }
                }
            });
        }
	}
	
	/**
	 * @description ���ú���ǰ ���� ��ǰ ���� �߰� ��ư �̺�Ʈ
	 */
	function addCartTodayPro2(target) {
		var parent = document.querySelector("#today-product #ul" + target.id),
		idx = parent.querySelector("#idx").value,
		proIdx = parent.querySelector("#pro_idx").value,
		qty = parent.querySelector(".input_qty").value,
		delivery = parent.querySelector("#delivery_type").value,
		stop = parent.querySelector("#stop_content").value,
		proName = parent.querySelector("#pro_name").value,
		pointView = parent.querySelector("#point_view").value,
		proStandByStock = parent.querySelector("#pro_standby_stock").value,
		type = parent.querySelector(".est_type").value,
		sale_qty = parent.querySelector("#pro_standby_stock").value;
		
		
		if (delivery == 2) {
			if (stop==null || stop =="") {
				stop = "�������� �������� ����� �����Ǵ� ��ǰ�Դϴ�. ������ �߰� �Ͻðڽ��ϱ�?\n";
			} else{
				stop = stop+"\n";
			}
			if (!confirm(stop)) return;
		} else if (delivery == 4) {
			stop = stop+"\n";
			if (!confirm(stop)) return;
		} else if (delivery == 3) {
			window.open('proIncomingNoti.action?proIdx=' + proIdx + "&proStockIdx=" + idx, '', "width=460,height=600,top=");
			return;
		} else if (delivery == 5) {
			window.open('proStopInfo.action?proIdx=' + proIdx + "&proStockIdx=" + idx, '', "width=460,height=600,top=");
			return;
		}
		
		//���� ���� ��ǰ 
//		if(pointView == 1 && proStandByStock)
//		if(pointView == 2 && (Number(qty)+Number(sale_qty)) > proStandByStock){
//			alert('�б��� �ִ� '+proStandByStock+'�� ���� ���� �����մϴ�.\n (���� ���� : '+(Number(qty)+Number(sale_qty))+'��)');
//			return false;
//		}
		
		if (type != null && idx != null && qty != null) {
			var data = {
					"order_type" : type,
					"proStockIdx" : idx,
					"proQuantity" : qty,
					"point_view" : pointView,
					"pro_standby_stock" : proStandByStock,
					"saveFlag" : 4
			};
			
			$.ajax({
				cache : false,
				type : 'POST',
				crossDomain : true,
				url : 'isExistInEstimate.action',
				data :data,
				success : function(resultData) {
					if (resultData.result == 'success') {
						if(resultData.point_view != '0'){
							wingAjaxDataModule.checkLimitPro(data);
						}else{
							wingAjaxDataModule.addProToEst(data);
						}
						
					} else {
						if (confirm('[ ����' + resultData.selOrderType + ' ] �� "' + proName + '" ��ǰ�� ����ֽ��ϴ�. �߰� �Ͻðڽ��ϱ�?\n')) {
							if(resultData.point_view != '0'){
								wingAjaxDataModule.checkLimitPro(data);
							}else{
								wingAjaxDataModule.addProToEst(data);
							}
						} else return false;
					}
				}
			});
		}
	}

	/**
	 * @description �ֹ���ǰ�籸�� ���ɻ�ǰ �߰�
	 */
	function reAddWish(target) {
		var idx = target.id,
			div = document.getElementById("product_reorder"),
			stockIdx = div.querySelector("#stock_idx" + idx).value,
			qty = div.querySelector("#qty" + idx).value,
			delivery_type = div.querySelector("#delivery_type" + idx).value;

		if (delivery_type == 3) {
			window.open('proIncomingNoti.action?proIdx=' + proIdx + "&proStockIdx=" + proStockIdx, '', "width=460,height=600,top=");
			return;
		}

        if (stockIdx != null && qty != null) {

            $.ajax({
                cache : false,
                type : 'GET',
                crossDomain : true,
                url : 'addUserWishList.action',
                data : {
                    "proStockIdx" : stockIdx,
                    "proQuantity" : qty
                },
                success : function(data) {
                    if (data.result == "success") {
                        drawToastWing("���ɻ�ǰ���� �߰��Ǿ����ϴ�. ^^", "toast-max");
                    } else if (data.result == "failure") {
                        drawToastWing("�ش� ��ǰ�� ���ɻ�ǰ���� �߰��� �� �����ϴ�.", "toast-max");
                    } else if (data.result == "exception") {
                        drawToastWing("���ɻ�ǰ�� �ִ� 50�� ���� ������ �����մϴ�.", "toast-max");
                    }else if(data.result=="exception2"){
                    	drawToastWing("�ش� ��ǰ�� ���ɻ�ǰ���� ������ �� �����ϴ�.","toast-max");
                    }
                }
            });
        }
	}

	/**
	 * @description �ֹ���ǰ �籸�� - �������� 
	 */
	function reSaveEst() {
		var estSelectBox = document.querySelector("#product_reorder .reorder_type_total1"),
			type = estSelectBox.options[estSelectBox.selectedIndex].value,
			checkBoxes = document.querySelectorAll("#product_reorder .reorder_check"),
			checkLen = checkBoxes.length,
			proArr = [],
			qtyArr = [],
			i = 0,
			j = 0;

		if (type != null) {
			for (; i < checkLen; i++) {
				if (checkBoxes[i].checked) {
					var id = checkBoxes[i].id,
						error = document.querySelector("#product_reorder #ecode" + id).value;

					if (error > 0) {
						if (confirm("������ �߰��� �� ���� ��ǰ�� ���ԵǾ� �ֽ��ϴ�. �����ϰ� �߰� �Ͻðڽ��ϱ�?\n")) {
							break;
						} else {
							return;
						}
					}
				}
			}

            for (i = 0; i < checkLen; i++) {
                if (checkBoxes[i].checked) {
                    var id = checkBoxes[i].id,
                        error = document.querySelector("#product_reorder #ecode" + id).value;

                    if (error == 0) {
                        var pro = checkBoxes[i].value;
                        var qty = document.querySelector("#product_reorder #qty" + id).value;

                        if (pro)
                            proArr[j] = pro;
                        if (qty)
                            qtyArr[j] = qty;
                        j++;
                    }
                }
            }

			if (proArr.length > 0 && qtyArr.length > 0) {
				var data = {
					"proArr" : proArr,
					"qtyArr" : qtyArr,
					"order_type" : type,
					"saveFlag" : 1
				};
				wingAjaxDataModule.addProductsToEstimate(data);
			} else {
				drawToastWing("���õ� �׸��� �����ϴ�! Ȯ�� ���ּ���.", "toast-max");
			}
		} else {
			drawToastWing("�������� �������ּ���", "toast-max");
		}

	}

	/**
	 * @description �ֹ���ǰ�籸�� ���ɻ�ǰ���� �̺�Ʈ
	 */
	function reSaveWish() {
		var checkBoxes = document.querySelectorAll("#product_reorder .reorder_check"),
			checkLen = checkBoxes.length,
			proArr = [],
			qtyArr = [],
			i = 0,
			j = 0;

		for (; i < checkLen; i++) {
			if (checkBoxes[i].checked) {
				var id = checkBoxes[i].id,
					error = document.querySelector("#product_reorder #ecode" + id).value;

				if (error > 0) {
					if (confirm("���ɻ�ǰ�� �߰��� �� ���� ��ǰ�� ���ԵǾ� �ֽ��ϴ�. �����ϰ� �߰� �Ͻðڽ��ϱ�?\n")) {
						break;
					} else {
						return;
					}
				}
			}
		}

        for (i = 0; i < checkLen; i++) {
            if (checkBoxes[i].checked) {
                var id = checkBoxes[i].id,
                    error = document.querySelector("#product_reorder #ecode" + id).value;

                if (error == 0) {
                    var pro = checkBoxes[i].value;
                    var qty = document.querySelector("#product_reorder #qty" + id).value;

                    if (pro)
                        proArr[j] = pro;
                    if (qty)
                        qtyArr[j] = qty;
                    j++;
                }
            }
        }

		if (proArr.length > 0 && qtyArr.length > 0) {
			wingAjaxDataModule.saveWishReProducts(proArr, qtyArr);
		} else {
			drawToastWing("���õ� �׸��� �����ϴ�! Ȯ�� ���ּ���.", "toast-max");
		}

	}

	/**
	 * @description ���ú���ǰ ���ɻ�ǰ ���� �̺�Ʈ
	 */
	function saveWishTodayPro(target) {

		var parent = document.querySelector("#today-product #ul" + target.id),
			idx = parent.querySelector("#idx").value,
			proIdx = parent.querySelector("#pro_idx").value,
			qty = parent.querySelector(".input_qty").value,
			delivery = parent.querySelector("#delivery_type").value,
			saleStop = parent.querySelector("#sale_stop").value;
		
		//�Ǹ��ߴܿ���,�����ֹ� �� ���̾��˾� ���� 
		if(saleStop == 2 || saleStop == 3){
			proPopupModule.makeProDetail(idx,proIdx);
			return;
		}
		
		if (delivery == 3) {
            window.open('proIncomingNoti.action?proIdx=' + proIdx + "&proStockIdx=" + idx, '', "width=460,height=600,top=");
            return;
		}

        if (idx != null && qty != null) {

            $.ajax({
                cache : false,
                type : 'GET',
                crossDomain : true,
                url : 'addUserWishList.action',
                data : {
                    "proStockIdx" : idx,
                    "proQuantity" : qty
                },
                success : function(data) {
                    if (data.result == "success") {
                        drawToastWing("���ɻ�ǰ���� �߰��Ǿ����ϴ�. ^^", "toast-max");
                    } else if (data.result == "failure") {
                        drawToastWing("�ش� ��ǰ�� ���ɻ�ǰ���� �߰��� �� �����ϴ�.", "toast-max");
                    } else if (data.result == "exception") {
                        drawToastWing("���ɻ�ǰ�� �ִ� 50�� ���� ������ �����մϴ�.", "toast-max");
                    }else if(data.result=="exception2"){
                    	drawToastWing("�ش� ��ǰ�� ���ɻ�ǰ���� ������ �� �����ϴ�.", "toast-max");
                    }
                }
            });
        }
	}

	/**
	 * @description ���ú���ǰ ���� ����
	 */
	function delTodayPro(target) {
		var parent = document.querySelector("#today-product #ul" + target.id),
			proIdx = parent.querySelector("#pro_idx").value,
			tabs = document.querySelectorAll("#today-product .sortCode"),
			len = tabs.length,
			sort = null;
		
		if(proIdx!=null){
			for (var i = 0; i < len; i++) {
				if ($(tabs[i]).hasClass("on")){
					sort = tabs[i].querySelector("span").id;
				}
			}
			if (sort == 0) sort = null;
			
			if (confirm('�ֱٺ���ǰ���� ���� �Ͻðڽ��ϱ�?\n')) {
				
				wingAjaxDataModule.removeTodayProduct(proIdx,getSortCodeValue("today-product"),getNameSortValue("today-product"));	
			}
			
		}
	}
	
	/**
	 * @description ���ú���ǰ - üũ����
	 */
	function clickTodayDelList(){
		var checkBoxes = document.querySelectorAll("#today-product .proCheck"),
			checkLen = checkBoxes.length,
			proArr = [], i = 0, j = 0;
		
		for (i = 0; i < checkLen; i++) {
			if (checkBoxes[i].checked) {
				var pro = checkBoxes[i].value;
				
				if (pro) proArr[j] = pro;
				j++;
			}
		}
	
		if (proArr.length > 0 ) {
			if (confirm('üũ�� ��ǰ�� �ֱٺ���ǰ���� ���� �Ͻðڽ��ϱ�?\n')) {
				wingAjaxDataModule.removeTodayProList(proArr, getSortCodeValue("today-product"),getNameSortValue("today-product"));	
			}
		} else {
			drawToastWing("���õ� �׸��� �����ϴ�! Ȯ�� ���ּ���.", "toast-max");
		}
	}
	
	/**
	 * @description ���Ŵ��� �ӽ����� ��ư Ŭ�� �̺�Ʈ
	 */
	function clickSaveTempAgent(target){
		
		var parent = target.parentElement,
			in_name = parent.querySelector(".in_name"),
			in_option = parent.querySelector(".in_option"),
			in_price = parent.querySelector(".in_price"),
			in_qty = parent.querySelector(".in_qty"),
			in_url = parent.querySelector(".in_url"),
			order_type = parent.querySelector(".pro_purchase_type"),
			phone1 = document.querySelector(".pro_purchase_form_title #phone1"),
			phone2 = document.querySelector(".pro_purchase_form_title #phone2"),
			phone3 = document.querySelector(".pro_purchase_form_title #phone3")
			;
		
		if(!phone1.value.trim() || !phone2.value.trim() || !phone3.value.trim()){
			drawToastWing("���� ���ڸ� ������ ����ó�� �ۼ����ּ���!", "toast-max");
			phone1.focus();
			return false;
		}
		if(order_type.value==0){
			drawToastWing("����� ������ �ʿ��մϴ�!!", "toast-max");
			order_type.focus();
			return false;
		}
		if(!in_name.value.trim()){
			drawToastWing("��ǰ���� �Է����ּ���!", "toast-max");
			in_name.focus();
			return false;
		}
		if(!in_price.value.trim()){
			drawToastWing("��ǰ ������ �Է����ּ���!", "toast-max");
			in_price.focus();
			return false;
		}
		if(!in_qty.value.trim()){
			drawToastWing("��ǰ ������ �Է����ּ���!", "toast-max");
			in_qty.focus();
			return false;
		}
		if(!in_url.value.trim()){
			drawToastWing("����Ʈ �ּ�(URL)�� �Է����ּ���!", "toast-max");
			in_url.focus();
			return false;
		}
		
		var data = {
			"pro_name" :  encodeURIComponent(in_name.value),
			"option" :  encodeURIComponent(in_option.value),
			"price" : in_price.value,
			"url" : in_url.value,
			"quantity" : in_qty.value,
			"order_idx" : order_type.value,
			"phone_num" : phone1.value+phone2.value+phone3.value
		};
		
		wingAjaxDataModule.saveAgentTemp(data);
	}
	
	/**
	 * @description ���Ŵ��� �����ϱ� ��ư �̺�Ʈ
	 */
	function clickModiTempAgent(target){
		var parent = target.parentElement,
			in_name = parent.querySelector(".in_name"),
			in_option = parent.querySelector(".in_option"),
			in_price = parent.querySelector(".in_price"),
			in_qty = parent.querySelector(".in_qty"),
			in_url = parent.querySelector(".in_url"),
			idx = target.dataset.agentIdx,
			order_type = parent.querySelector(".pro_purchase_type"),
			phone1 = document.querySelector(".pro_purchase_form_title #phone1"),
			phone2 = document.querySelector(".pro_purchase_form_title #phone2"),
			phone3 = document.querySelector(".pro_purchase_form_title #phone3")
			;
		
		if(!phone1.value.trim() || !phone2.value.trim() || !phone3.value.trim()){
			drawToastWing("���� ���ڸ� ������ ����ó�� �ۼ����ּ���!", "toast-max");
			phone1.focus();
			return false;
		}
		if(order_type.value==0){
			drawToastWing("����� ������ �ʿ��մϴ�!", "toast-max");
			order_type.focus();
			return false;
		}
		if(!in_name.value.trim()){
			drawToastWing("��ǰ���� �Է����ּ���!", "toast-max");
			in_name.focus();
			return false;
		}
		if(!in_price.value.trim()){
			drawToastWing("��ǰ ������ �Է����ּ���!", "toast-max");
			in_price.focus();
			return false;
		}
		if(!in_qty.value.trim()){
			drawToastWing("��ǰ ������ �Է����ּ���!", "toast-max");
			in_qty.focus();
			return false;
		}
		if(!in_url.value.trim()){
			drawToastWing("����Ʈ �ּ�(URL)�� �Է����ּ���!", "toast-max");
			in_url.focus();
			return false;
		}
		
		var data = {
			"pro_name" :  encodeURIComponent(in_name.value),
			"option" :  encodeURIComponent(in_option.value),
			"price" : in_price.value,
			"url" : in_url.value,
			"quantity" : in_qty.value,
			"idx" : idx,
			"order_idx" : order_type.value,
			"phone_num" : phone1.value+phone2.value+phone3.value
		};
		wingAjaxDataModule.modifyAgentTemp(data);
	}
	
	/**
	 * @description ���Ŵ��� - �����ϱ� ��ư�̺�Ʈ
	 */
	function clickSubmitAgent(target){
		var parent = target.parentElement,
			in_name = parent.querySelector(".in_name"),
			in_option = parent.querySelector(".in_option"),
			in_price = parent.querySelector(".in_price"),
			in_qty = parent.querySelector(".in_qty"),
			in_url = parent.querySelector(".in_url"),
			check = target.dataset.agentChk,
			idx = target.dataset.agentIdx,
			order_type = parent.querySelector(".pro_purchase_type"),
			phone1 = document.querySelector(".pro_purchase_form_title #phone1"),
			phone2 = document.querySelector(".pro_purchase_form_title #phone2"),
			phone3 = document.querySelector(".pro_purchase_form_title #phone3")
			;
		
		if(!phone1.value.trim() || !phone2.value.trim() || !phone3.value.trim()){
			drawToastWing("���� ���ڸ� ������ ����ó�� �ۼ����ּ���!", "toast-max");
			phone1.focus();
			return false;
		}
		if(order_type.value==0){
			drawToastWing("����� ������ �ʿ��մϴ�!", "toast-max");
			order_type.focus();
			return false;
		}
		if(!in_name.value.trim()){
			drawToastWing("��ǰ���� �Է����ּ���!", "toast-max");
			in_name.focus();
			return false;
		}
		if(!in_price.value.trim()){
			drawToastWing("��ǰ ������ �Է����ּ���!", "toast-max");
			in_price.focus();
			return false;
		}
		if(!in_qty.value.trim()){
			drawToastWing("��ǰ ������ �Է����ּ���!", "toast-max");
			in_qty.focus();
			return false;
		}
		if(!in_url.value.trim()){
			drawToastWing("����Ʈ �ּ�(URL)�� �Է����ּ���!", "toast-max");
			in_url.focus();
			return false;
		}
		
		var data = {
			"pro_name" :  encodeURIComponent(in_name.value),
			"option" :  encodeURIComponent(in_option.value),
			"price" : in_price.value,
			"url" : in_url.value,
			"quantity" : in_qty.value,
			"idx" : idx,
			"order_idx" : order_type.value,
			"check" : check,
			"phone_num" : phone1.value+phone2.value+phone3.value
		};
		
		wingAjaxDataModule.submitAgentTemp(data);
	}
	
	/**
	 * @description �߹��ٱ��� üũ�ڽ� ���� �� �̺�Ʈ
	 * --> ���� ���� üũ�ڽ� ���� ���� ���� , ���� ���õ� ���� ����Ʈ�� �ϴܿ� �޽����� ���
	 */
	function changeEstCheck(){
		
		var fields = document.querySelectorAll('#make-order input.est-chk'),
			len = fields.length, 
			selEst = [], con = "",
			i=0,j=0, price=0;
		
		for(; i<len; i++){
			if(fields[i].checked){
				selEst[j] = fields[i].id;
				j++;
			}
		}

		selEst = selEst.sort();
		i=0, len = selEst.length;
		if(len > 0){
			con += '<span class="wrap-sel-est">'
			for(; i<len; i++){
				con += '<span class="sel-est">���� '+selEst[i]+'</span>';
				if(i!=(len-1)) con += ' <img src="' + PathData.getPath() + '/img/product/esti_more_icon.png" border="0"> ';
				price +=  document.querySelector("#make-order #est-data"+selEst[i]).dataset.orderPrice*1;
			}
			con += '</span> <img src="' + PathData.getPath() + '/img/product/esti_next_icon.png" border="0"> <span class="sel-total">�� �ֹ��ݾ� <span class="sub-total-price">'+commonModule.commas(price)+'</span> ��</span>';
		}else{
			con += '�����Ͻ� ������ �����ϴ�!';
		}
		
		document.querySelector("#make-order div.sel-order-list").innerHTML = con;
		
	}
	
	/**
	 * @description ���������� - �ֹ��ϱ� ��ư �̺�Ʈ
	 */
	function clickEstModSaveOrder(target){
		
		var orderCheck = target.dataset.orderCheck,
			errorType = target.dataset.errorType,
			agentCnt = target.dataset.agentCnt,
			stopMsg = target.dataset.stopMsg.trim(),
			type = target.value;
		
		if(orderCheck==1){
			alert("������ ������ ������ �޶� ���� �ֹ��� �Ұ��մϴ�!\n\n���� [1588-5120] �� ���� �ֹ����ֽñ� �ٶ��ϴ�.\n");
			return false;
		}
		else if(orderCheck==2){
			alert("��������� ����ǰ�� ���Ϸ� ���� �ֹ��� �Ұ��մϴ�!\n\n�������� [1588-5120] �� �������ֽñ� �ٶ��ϴ�.\n");
			return false;
		}
		else if(errorType >=3){
			alert("�ֹ��� �Ұ����� ��ǰ�� ���ԵǾ� �ֽ��ϴ�!\n");
			return false;
		}
		else if(agentCnt>0){
			alert("���ε��� ���� ���Ŵ��� ��ǰ�� �ֽ��ϴ�! ���Ŵ��� �������� �̵��մϴ�.\n");
			wingAjaxDataModule.loadAgentTempList();
			return false;
		}
		else if(stopMsg!="null"){
			alert("�ֹ��� �� �ִ� ���� �ʰ��� ��ǰ�� �ֽ��ϴ�!\n\n�������� [1588-5120] �� �������ֽñ� �ٶ��ϴ�.\n-------------------------------------------------------------\n"+stopMsg);
			return false;
		}
		else{
			wingAjaxDataModule.getOrderCartList(type);
		}
	}
	
	/**
	 * @description ������� - ǰ�� �� Ŭ�� �� �̺�Ʈ
	 */
	function clickProTitle(target){
		var agentCnt = target.dataset.agentCnt,
			type = target.dataset.orderType;
		
		if(agentCnt>0){
			alert("���ε��� ���� ���Ŵ��� ��ǰ�� �ֽ��ϴ�!! ���Ŵ��� �������� �̵��մϴ�.\n");
			wingAjaxDataModule.loadAgentTempList();
			return false;
		}
		else{
			wingAjaxDataModule.getEstimateDetailData(type);
		}
	}
	
	/**
	 * @description ���������� - ��������, �Ʒ� ��ĭ �̵� ��ư �̺�Ʈ
	 * 1. ���� ȭ��ǥ Ŭ���� row �� index ��ȸ
	 * 2. �ش� index ��ġ�� �ִ� li.estimate_sort_selector ��ȸ
	 * 3. index +1 ��ġ�� �ִ� li.estimate_sort_selector ��ȸ
	 * 4. [2.] �� [3.] �� element ���� ������ parentElement ã��
	 * 5. [2.] --> temp ������ ����
	 * 6. [3.] �� parentElement --> replaceChild([2.],[3.]);
	 * 7. [2.] �� parentElement --> replaceChild(temp,[2.]);
	 */
	function clickSeqDown(target){
		var index = $("ul.data-btn-wrap li").index(target.parentElement);
		changeProRowSingle(index+1,index+2);
		setSeqFlag(true);
	}
	
	/**
	 * @description ���������� - ��������, ���� ��ĭ �̵� ��ư �̺�Ʈ
	 */
	function clickSeqUp(target){
		var index = $("ul.data-btn-wrap li").index(target.parentElement);
		changeProRowSingle(index+1,index);
		setSeqFlag(true);
	}
	
	/*
	 * @description ������ �������� - [����Ȯ���ϱ�] ��ư �̺�Ʈ
	 * 1. ���� ��ȣ ����Ʈ ��ȸ
	 * 2. ������ �ε��� ��ȣ ��ȸ
	 */
	function confirmSequence(){
		
		if(seqFlag || seqSortFlag==true){
			if(confirm("����� ������ �������� �����Ͻðڽ��ϱ�?\n")){
				
				var numFields = document.querySelectorAll("#estimate_max2 .data-seq-wrap .input_modify"),
					dataFields = document.querySelectorAll("#estimate_max2 .estimate_max_modify"),
					numLen = numFields.length,
					type = document.getElementById("estimate_max2").dataset.selType,
					i=0, owdArr = [], sortArr = [];
				
				for(; i< numLen; i++){
					owdArr[i] = dataFields[i].dataset.owdIdx;
					sortArr[i] = numFields[i].value;
				}
				
				var data = {
						"owdArr" : owdArr,
						"sortArr" : sortArr,
						"order_type" : type
				};
				
				wingAjaxDataModule.modifyEstAdminSort(data, type);
			}
		}
		else{
			drawToastWing("����� ������ �����ϴ�.","toast-max");
		}
	}
	
	/**
	 * @description ������ �������� - ��ǰ (row) ���� �� �̺�Ʈ
	 */
	function clickProRow(target){
		
		var index = $("li.estimate_sort_selector").index(target)+1;
		setSelectedRow(index);
	}
	
	/**
	 * @description ������ �������� - row ���ý� �ٸ� row�� ���� �ʱ�ȭ ����
	 */
	function initProRowSelection(){
		var fields = document.querySelectorAll("#estimate_max2 ul.prodata li"),
		    len = fields.length, i=0;
	
		for(; i<len; i++){
			$(fields[i]).removeClass("select");
		}
	}
	
	/**
	 * @param {Number} index1 - ���� index ��ȣ
	 * @param {Number} index2 - �̵��� ��ġ�� index ��ȣ
	 * @description ������ �������� - ��ĭ �̵� ��ư, ������, �ǾƷ��� ��ư Ŭ�� �� ���������� ȣ���ϴ� �Լ�
	 */
	function changeProRowSingle(index1, index2){
		
		var sel1 = document.querySelector("ul.prodata li.estimate_sort_selector:nth-child("+index1+")"),
			sel2 = document.querySelector("ul.prodata li.estimate_sort_selector:nth-child("+index2+")"),
			temp = sel1.innerHTML;

		if(sel1!=null && sel2!=null){
			sel1.innerHTML = sel2.innerHTML;
			sel2.innerHTML = temp;
		}

		setSelectedRow(index2);
	}
	
	/**
	 * @param {Number} index - li index ��ȣ
	 * @description ������ �������� --> row ���ý� �ش� row �� ����(index) �� parameter �� ���� --> select class �߰�
	 */
	function setSelectedRow(index){
		initProRowSelection();
		$("ul.prodata li.estimate_sort_selector:nth-child("+index+")").addClass("select"); //������ row ����ǥ��
	}
	
	/**
	 * @description ������ �������� - �� ���� �̵�
	 * 1. ������ row �� index ��ȣ ���ϱ�.
	 * 2. index ��ȣ�� 1 : no action
	 * 3. index ��ȣ�� 2 : changeProRowSingle(1,2)
	 * 3. index �� 3 �̻��� ���
	 * 	3.1 index row --> temp �� ����
	 *  3.2 index ��ȣ�� 1~ index-1 ���� row --> ��ĭ �� �Ʒ��� �̵�.
	 *  3.3 ù��° row �� temp �� ���� 
	 */
	function locateRowTop(){
		var selected = document.querySelector("ul.prodata li.select"),
			targetRow = $("ul.prodata li.estimate_sort_selector:nth-child(1)"),
			selRow, index;
		
		if(selected!=null){
			index = $("li.estimate_sort_selector").index(selected)+1,
			selRow = $("ul.prodata li.estimate_sort_selector:nth-child("+index+")");
			
			//1.������ row �� �ֻ���� ���
			if(index==1){return;}
			//2.������ row �� �ι�° ���ΰ�� ù��° �ٰ� switching
			else if(index==2){
				changeProRowSingle(index, 1);
			}
			//3.
			else{
				//3.1
				var temp = selRow.innerHTML;
				var i=index-1;
				
				//3.2
				while(i>=1){
					changeProRowSingle(i, i+1);
					i--;
				}
				//3.3
				selRow.innerHTML = targetRow.innerHTML;
				targetRow.innerHTML = temp;
			}
			//�̵���Ų ù��°�� ����
			setSelectedRow(1);
			setSeqFlag(true);
		}
		else{
			drawToastWing("���� ������ ��ǰ�� �������ּ���!", "toast-max");
		}
	}
	
	/**
	 * @description ������ �������� - �� �Ʒ��� �̵�
	 * 1. ������ row �� index ��ȣ ���ϱ�. / ��ü ����Ʈ size(max) ���ϱ�.
	 * 2. index ��ȣ�� max : no action
	 * 3. index ��ȣ�� max-1 : changeProRowSingle(max-1,max);
	 * 3. index �� 3 �̻��� ���
	 * 	3.1 index row --> temp �� ����
	 *  3.2 index ��ȣ�� index+1 ~ max ���� row --> ��ĭ �� ���� �̵�(-1).
	 *  3.3 ������ row (max) �� temp �� ���� 
	 */
	function locateRowBottom(){
		var selected = document.querySelector("ul.prodata li.select"),
			fields = document.querySelectorAll("ul.prodata li.estimate_sort_selector"),
			max = fields.length,
			targetRow = $("ul.prodata li.estimate_sort_selector:nth-child("+max+")"),
			selRow, index;
	
		if(selected!=null){
			index = $("li.estimate_sort_selector").index(selected)+1,
			selRow = $("ul.prodata li.estimate_sort_selector:nth-child("+index+")");
			
			//1.������ row �� ���ϴ��� ���
			if(index==max){return;}
			//2.������ row �� �ؿ��� �ι�° ���ΰ�� ������ �ٰ� switching
			else if(index==max-1){
				changeProRowSingle(index, max);
			}
			//3.
			else{
				//3.1
				var temp = selRow.innerHTML;
				var i=index+1;
				
				//3.2
				while(i<=max){
					changeProRowSingle(i, i-1);
					i++;
				}
				//3.3
				selRow.innerHTML = targetRow.innerHTML;
				targetRow.innerHTML = temp;
			}
		
			//�̵���Ų ù��°�� ����
			setSelectedRow(max);
			setSeqFlag(true);
		}
		else{
			drawToastWing("���� ������ ��ǰ�� �������ּ���!", "toast-max");
		}
	}
	
	/**
	 * @description ������ �������� - �� ĭ ���� 
	 * 1. ������ row �� index ���ϱ�
	 * 2. index --> index -1 �� switching
	 */
	function locateRowUp(){
		var selected = document.querySelector("ul.prodata li.select");

		if(selected!=null){
			var index = $("li.estimate_sort_selector").index(selected)+1;
			
			if(index!=1){
				changeProRowSingle(index, index-1);
			}
			//�̵���Ų row ����
			setSelectedRow(index-1);
			setSeqFlag(true);
		}
		else{
			drawToastWing("���� ������ ��ǰ�� �������ּ���!", "toast-max");
		}
	}
	
	/**
	 * @description ������ �������� - �� ĭ �Ʒ���
	 * 1. ������ row �� index ���ϱ�
	 * 2. index --> index + 1 �� switching
	 */
	function locateRowDown(){
		var selected = document.querySelector("ul.prodata li.select");

		if(selected!=null){
			var index = $("li.estimate_sort_selector").index(selected)+1;
			
			if(index!=0){
				changeProRowSingle(index, index+1);
			}
			//�̵���Ų row ����
			setSelectedRow(index+1);
			setSeqFlag(true);
		}
		else{
			drawToastWing("���� ������ ��ǰ�� �������ּ���!", "toast-max");
		}
	}
	
	/**
	 * @description ������ �������� - �����ʱ�ȭ ��ư �̺�Ʈ
	 */
	function initProSequence(target){
		
		if(seqFlag || seqSortFlag==true){
			if(confirm("����Ȯ���ϱ� ������� ���� ���,�����Ͻ� ������ ������� �ʽ��ϴ�! �׷��� �ʱ�ȭ �Ͻðڽ��ϱ�?\n")){
				openEstChangeOrder(target);
				setSeqFlag(false);
			}
		}else{
			drawToastWing("����� ������ �����ϴ�!","toast-max");
		}
	}
	
	/**
	 * @param {bool} flag - �������� ���� üũ (F: �������� ���� / T: �������� ��)
	 * @description 
	 */
	function setSeqFlag(flag){
		seqFlag = flag;
	}
	
	/**
	 * @@param {bool} flag - ī�װ���/��ǰ�� ���� ���� üũ (F: ���� ���� / T: ���� ��)
	 */
	function setSeqSortFlag(flag){
		seqSortFlag = flag;
	}
	
	/**
	 * @description This function is called on keyboard and mouse events. --> ������ 1�� ��
	 * It sets a timeout to call changeProQty in 50 ms.
	 */
	function proQtyKeyEventHandler(event,target){
		if(timeout) clearTimeout(timeout);
		timeout = setTimeout(changeProQty(target),50);
	}
	
	/**
	 * @description This function is called 50ms after the user stops typing of product's quantity.
	 * ������ 1�� ��
	 */
	function changeProQty(target){

		var text = target.value;
	
       /* if(text=="0") {
           alert("�ּ� �Է� ������ 1�� �Դϴ�.");
           target.value = target.dataset.oldValue; return;
        }*/
		//�����Է� Ȯ��
		if(isNaN(text))
		{
			alert('���ڸ� �Է� �����մϴ�.');
			if(text.length>1){
				target.value = text.substring(0,text.length-1);
			}
            else{
				if(target.dataset.oldValue!=null){

					target.value = target.dataset.oldValue;
				}
				else{
					target.value = 1;
				}
			}
		}

		
	}
	
	/**
	 * @description ���� �Է� �� ���� ���� üũ �� DB �� ������Ʈ (AJAX) - ������ 1�� ���� ����
	 */
	function changeProQtyEventHandler(target){
		var text = target.value,
			index = target.id.split(",")[0],
			type = target.id.split(",")[1],
			stockIdx = document.querySelector("#type"+type+" #stock_idx"+index).value,
			pointView = document.querySelector("#point_view"+index).value,
			proStandbyStock = document.querySelector("#pro_standby_stock"+index).value,
			sale_qty = document.querySelector("#sale_qty" + index).value,
			chai = Number(text) - Number(target.dataset.oldValue);
		if(text.trim()=="" || text<=0){
			drawToastWing("�ּ� ���� ������ 1�� �Դϴ�.",'toast-min');
			target.value = target.dataset.oldValue;
		}else{
			

			if(pointView == 1){//����� & �������� & ��������
				if(Number(text) >= Number(proStandbyStock)){
					drawToastWing("������ �ִ� "+proStandbyStock+"������ ���Ű��� �մϴ�!", "toast-min");
/*||||||| .r4054
=======
			if((pointView == 1) && Number(target.value) >= Number(proStandbyStock)){//����� & �������� & ��������
					drawToastWing("������ �ִ� "+proStandbyStock+"������ ���Ű��� �մϴ�!", "toast-min");
>>>>>>> .r4064*/
					target.value  = proStandbyStock;

					return false;
				}

			}
			
			if(pointView == 2){//��Ż����ũ
				if(Number(sale_qty)+Number(chai) >= Number(proStandbyStock)){
					drawToastWing("�б��� �ִ� "+proStandbyStock+"������ ���Ű��� �մϴ�!", "toast-min");
					target.value = target.dataset.oldValue;
					return false;
				}
			}	
/*||||||| .r4054
=======
		
			if((pointView ==2) && Number(target.value) >= Number(proStandbyStock)){//��Ż����ũ
				drawToastWing("�б��� �ִ� "+proStandbyStock+"������ ���Ű��� �մϴ�!", "toast-min");
				target.value  = proStandbyStock;
>>>>>>> .r4064
			}*/
			
			if(target.value >=1 && target.value <= 9999){
				if( target.dataset.oldValue != target.value ){
					initEstTotal(document.getElementById("type"+type), index);
					wingAjaxDataModule.modifyProQty(type, target.value, stockIdx, "min",pointView);
					target.dataset.oldValue = target.value;
					if(point_view == 2){
					document.getElementById('sale_qty'+index).value = Number(sale_qty) + Number(chai);
					}
				}
			}	
		}
	}

	/**
	 * @description ���� �Է� �� ���� ���� üũ �� DB �� ������Ʈ (AJAX) - ������ ���� ��
	 */
	function changeProQtyEventHandlerDetail(target){
		var text = target.value,
			index = target.id.split(",")[0],
			type = target.id.split(",")[1],
			stockIdx = document.querySelector("#estimate_max1 #stock_idx"+index).value,
			pointView = document.getElementById("point_view"+index).value,
			proStandbyStock = document.querySelector("#pro_standby_stock"+index).value,
			sale_qty = document.querySelector("#sale_qty" + index).value,
			chai = Number(text) - Number(target.dataset.oldValue);
		
		if(text.trim()=="" || text<=0){
			target.value = target.dataset.oldValue;
		}else{
			

			if(pointView == 1){//����� & �������� & ��������
				if(Number(text) >= Number(proStandbyStock)){
					drawToastWing("������ �ִ� "+proStandbyStock+"������ ���Ű��� �մϴ�!", "toast-max");
					target.value  = proStandbyStock;
					return false;
				}
			}
			if(pointView == 2){//��Ż����ũ
				if(Number(sale_qty)+Number(chai) >= Number(proStandbyStock)){
					drawToastWing("�б��� �ִ� "+proStandbyStock+"������ ���Ű��� �մϴ�!", "toast-max");
					target.value = target.dataset.oldValue;
					return false;
				}
			}
/*||||||| .r4054
=======
			if((pointView == 1) && Number(target.value) >= Number(proStandbyStock)){//����� & �������� & ��������
				drawToastWing("������ �ִ� "+proStandbyStock+"������ ���Ű��� �մϴ�!", "toast-min");
				target.value  = proStandbyStock;

			}	
			
			if((pointView ==2) && Number(target.value) >= Number(proStandbyStock)){//��Ż����ũ
				drawToastWing("�б��� �ִ� "+proStandbyStock+"������ ���Ű��� �մϴ�!", "toast-min");
				target.value  = proStandbyStock;
>>>>>>> .r4064
			}*/
			
			if(target.value >=1 && target.value <= 9999){
				if( target.dataset.oldValue != target.value ){
					initEstTotal(document.getElementById("estimate_max1"), index);
					wingAjaxDataModule.modifyProQty(type, target.value, stockIdx, "max",pointView);
					target.dataset.oldValue = target.value;
					if(point_view == 2){
					document.getElementById('sale_qty'+index).value = Number(sale_qty) + Number(chai);
					}	
				}
			}
		}
	}

	/**
	 * @description ���ɻ�ǰ/�ֹ���ǰ�籸��/�ֱٺ���ǰ ���� �Է½� 0 Ȥ�� �������� textbox �� ����Ǵ� ��� Ȯ��
	 */
    function changeProQtyEventWingHandler(target){
        var text = target.value;
        if(text.trim()=="" || text<=0){
        	target.value = 1;
			drawToastWing("��ǰ ������ �ּ� 1�� �̻��̾�� �մϴ�.","toast-max");
		}
    }
	
	/**
	 * @description ������ �˻�â ����Ű �̺�Ʈ �߻� �� �˻� �Լ� ȣ��
	 */
	function searchProductKeyEvent(evt, target){
		if(window.event.keyCode == 13){
			searchProductInEst(target);
		}
	}
	
	/**
	 * @description ������ �˻�â �˻������� �̺�Ʈ �߻� �� �˻� �Լ� ȣ��
	 */
	function searchProductBtnEvent(target){
		searchProductInEst(target.previousElementSibling);
	}
	
	/**
	 * @description ������ �˻� �̺�Ʈ --> �˻� AJAX ȣ�� --> �˻� ��� ���� 
	 */
	function searchProductInEst(target){
		var text = target.value;
		
		if(text==null || text.trim()==""){
			alert("�˻��Ͻ� ��ǰ���� �Է����ּ���.\n");
		}
		else{
			wingAjaxDataModule.searchProInEstimate(text,target);
		}
	}
	
	/**
	 * @description �������˻� ��� UI ����
	 */
	function makeProSearchResult(list,input){
		
		var len = list.length,
			div = input.parentElement.nextElementSibling,
			i=0 , con ='' , sub='';
		
		if(len > 0){
			for(; i<len; i++){
				sub = '<div class="result-box" data-order-type="'+list[i].order_type+'" data-stock-idx="'+list[i].idx+'"><ul class="result-box-content">';
				sub += '<li class="result-box-left"><span class="pro-name">'+list[i].pro_name+'</span>';
				sub += '<span class="pro-kind">'+list[i].pro_kind+'</span></li>';
				sub += '<li class="result-box-right"><span class="est-type">���� '+list[i].order_type+'</span>';
				sub += '<span class="pro-qty">(����: <span class="pro-qty-num">'+list[i].pro_quantity+')</span></li></ul></div>';
				con += sub;
			}
			
			div.innerHTML = con;
			eventModule.addEventArray("click", div.querySelectorAll("div.result-box"), clickSearchProResult);
		}
		else{
			con = '<span class="no-msg">�˻� ����� �����ϴ�.</span>';
			div.innerHTML = con;
		}
	}
	
	/**
	 * @description ������ ��ǰ ��� Ŭ�� �� �̺�Ʈ
	 */
	function clickSearchProResult(target){
		var type = target.dataset.orderType,
			idx = target.dataset.stockIdx;
		$(".search_box_wrap_out").css("display","none");
		wingAjaxDataModule.loadEstimateData(type,idx);
	}
	
	/**
	 * @description ������ ��ǰ �˻� UI �ʱ�ȭ �Լ�
	 */
	function initSearchProBox(){
		var inputs = document.querySelectorAll("input.search_input"),
			results = document.querySelectorAll("div.search_box_result");
		
		for(var i=0; i<inputs.length; i++){
			inputs[i].value = "";
			results[i].innerHTML = "";
		}
	}
	
	/**
	 * @description ������ ������ ���Ŵ��� ���� �ؽ�Ʈ�ڽ� Ŭ���� �̺�Ʈ
	 */
	function clickAgentCountText(){
		drawToastWing("���Ŵ��� ��ǰ�� ���������� �Ұ��մϴ�.","toast-min");
	}
	
	/**
	 * @description ������ ������ ���Ŵ��� ���� �ؽ�Ʈ�ڽ� Ŭ���� �̺�Ʈ
	 */
	function clickAgentCountTextMax(){
		drawToastWing("���Ŵ��� ��ǰ�� ���������� �Ұ��մϴ�.","toast-max");
	}
	
	/**
	 * @description �ֹ� ���� ��ǰ �� ���� üũ ���۽�
	 * @param {Integer[]} orderIdx
	 */
	function orderLimitChk(orderIdx){

	}
	
	/**
	 * @description �����ٱ��� - �ֹ��ϱ� ��ư �̺�Ʈ
	 * 1. ������ ���� ����Ʈ ��ȸ
	 * 2. �� ���� ����Ʈ���� �ֹ����� ���� üũ
	 * 2-1. ���Ŵ��� Ȯ��
	 * 2-2. ������ ���� ������ Ȯ��
	 * 2-3. ����� �� ����ǰ ���� �ֹ�
	 * 2-4. �ֹ��Ұ����� ��ǰ Ȯ��
	 * 2-5. �ֹ����� �ʰ� ��ǰ Ȯ��
	 */
	function goOrderSheet(){
		var form = document.createElement("form");
		var node = document.createElement("input");
		var fields = document.querySelectorAll('#make-order input.est-chk'),
			len = fields.length, 
			selEst = [], 
			orderIdx = [],
			agentCount = 0,
			i=0,j=0,total = 0

		
		node.name = "orderIndex";
		for(; i<len; i++){
			if(fields[i].checked){
				selEst[j] = fields[i].id;
				node.value = fields[i].value; //order_idx
				orderIdx[j] = fields[i].value; 
				form.appendChild(node.cloneNode());
				j++;
			}
		}
		len = selEst.length;
		
		if(len <=0) return;
		
		i=0;
		for(; i<len; i++){
			var index = selEst[i],
				data  = document.getElementById("est-data"+index);
			document.getElementById("est-data"+index).value;
			
			//���Ŵ��� Ȯ��
			if(data.dataset.agentCount>0){
				alert("���ε��� ���� ���Ŵ��� ��ǰ�� �־� �ֹ��� �Ұ����մϴ�!!\n\n���� [1588-5120] �̳� 1:1 ���Ǹ� �̿���\n\n ���Ŵ��� ������ �޾��ֽñ� �ٶ��ϴ�.\n");
				return;
			}
			if(data.dataset.orderCheck==1){
				alert("����"+index+" �� ������ ������ �޶� ���� �ֹ��� �Ұ��մϴ�.\n\n���� [1588-5120] �� ���� �ֹ����ֽñ� �ٶ��ϴ�.\n");
				return;
			}
			
			if(data.dataset.orderCheck==2){
				alert("����"+index+" �� ����ǰ�� ���Եǿ��ֽ��ϴ�!!\n\n���� [1588-5120] �� ���� �ֹ����ֽñ� �ٶ��ϴ�.\n\n��ȭ�� ������ ��쿡��, \n\n�������� > 1:1���� > �ֹ����Ǹ� �̿��Ͽ� �ֽñ� �ٶ��ϴ�.\n");
				return;
			}
			
			if(data.dataset.errorType>=3){
				alert("����"+index+" �� �ֹ��� �Ұ����� ��ǰ�� ���ԵǾ� �ֽ��ϴ�!\n\n���� [1588-5120] �� ���� �ֹ����ֽñ� �ٶ��ϴ�.\n\n��ȭ�� ������ ��쿡��, \n\n�������� > 1:1���� > �ֹ����Ǹ� �̿��Ͽ� �ֽñ� �ٶ��ϴ�.\n");
				return;
			}
			if(data.dataset.stopMsg.trim()!="null"){
				alert("����"+index+" �� �ֹ��� �� �ִ� ���� �ʰ��� ��ǰ�� �ֽ��ϴ�!\n\n�������� [1588-5120] �� �������ֽñ� �ٶ��ϴ�.\n-------------------------------------------------------------\n"+data.dataset.stopMsg);
				return;
			}
			if(data.dataset.agentType!=1){
				total += data.dataset.orderPrice*1;
			}else{
				agentCount++;
			}
		}
		
		//���Ŵ��� ���� �ֹ����� Ȯ��
		if(agentCount>0){
			alert("���Ŵ��� ��ǰ�� ���� �������� �ֹ��� �Ұ��մϴ�.\n");
			return false;
		}
		else if(total == 0){
			alert("����� ���� ����ǰ�� ���Ϸ� ���� �ֹ��� �Ұ��մϴ�.\n\n�������� [1588-5120] �� �������ֽñ� �ٶ��ϴ�.\n");
			return;
		}
		
		/*�ֹ� ���� ��ǰ �� ���� üũ ���۽�*/
		$.ajax({
			async: false,
			cache: false,
			type: 'GET',
			crossDomain: true,
			traditional : true,
			url:'limitProOrderChk.action',
			data:{
				"orderIdxs" : orderIdx
			},
			success:function(data){
				if(data.result == "failure"){
					alert("�ֹ��� �� �ִ� ���� �ʰ��� ������ �ֽ��ϴ�!\n\n�������� [1588-5120] �� �������ֽñ� �ٶ��ϴ�.\n");
					return false;
				} else {
					//�ֹ��ϱ�
					form.action = "makeOrderSheet.action";
					form.method = "POST";
					form.target = "_self";
					form.style.display = "none";
					document.body.appendChild(form);
					form.submit();
					document.body.removeChild(form);
				}
			}
		});
	}
	
	/**
	 * @description ��ǰ�� ���� �ڵ� ��ȸ
	 * @param {String} ������ div id
	 */
	function getNameSortValue(tabId){
		var sortBtn = document.querySelector("#"+tabId+" a.sort-pro-name.on"),
			nameSort = null;
		if(sortBtn!=null) nameSort = sortBtn.dataset.sort;
		return nameSort;
	}
	
	/**
	 * @description ��ǰ�з��� ���� �ڵ� ��ȸ
	 */
	function getSortCodeValue(tabId){
		var codeBtn = document.querySelector("#"+tabId+" li.sortCode.on"),
			sortCode = null;
		
		if(codeBtn!=null) sortCode = codeBtn.querySelector("span").id;
		return sortCode;
	}


	var handler = {
		initEvent : initEvent,
		controlWingTab : controlWingTab,
		makeEstimateTab : makeEstimateTab,
		makeEstimateDetail : makeEstimateDetail,
		makeTodayProductList : makeTodayProductList,
		makeWishList : makeWishList,
		removeEstimateTab : removeEstimateTab,
		removeEstimateDetailTab : removeEstimateDetailTab,
		openWishProduct : openWishProduct,
		makeEstDocList : makeEstDocList,
		makeRepurchaseList : makeRepurchaseList,
		reAddCart : reAddCart,
		reAddWish : reAddWish,
		reSaveEst : reSaveEst,
		reSaveWish : reSaveWish,
		appendEstTitle : appendEstTitle,
		makeEstOrderCart : makeEstOrderCart,
		removeOrderListTab : removeOrderListTab,
		makeAgentListTemp : makeAgentListTemp,
		makeEstimateModify : makeEstimateModify,
		makeProSearchResult : makeProSearchResult,
		initEstimateTab : initEstimateTab,
		minimizeWing : minimizeWing
	};

	return handler;
})();