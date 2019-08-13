

$(function() {
	//слайдер документы
	let documentSlider = new Swiper('#document-slider', {
		loop: true,
		speed: 4000,
		autoplay: {
			delay: 500,
			disableOnInteraction: true,
	
		},
		observer: true,
		observeParents: true,
		slidesPerView: 4,
		navigation: {
			nextEl: '.document-slider-next',
			prevEl: '.document-slider-prev',
		},
		loopedSlides:	4,
		breakpoints: {
			0:{
				slidesPerView: 1,
			},			
			576:{
				slidesPerView: 1,
			},		    			
			768:{
				slidesPerView: 2,
			},			
			992:{
				slidesPerView: 4,
			},
			1200:{
				slidesPerView: 4,
			}		
		}
	});
		

	$('.open-popup').magnificPopup({
		type:'inline',
		mainClass: 'mfp-forms',
		fixedContentPos: false,
		fixedBgPos: false	
	});
	
	$('.open').click( function(){
		$.magnificPopup.open({
			items: {
					src: '#podp',
					type: 'inline',
					mainClass: 'mfp-forms',
			},
			fixedContentPos: false,
			fixedBgPos: false,
			callbacks: {
				beforeOpen: function() {
						var $triggerEl = $(this.st.el),
								newClass = "modal-transparent";
						if (newClass) {
								this.st.mainClass = this.st.mainClass + ' ' + newClass;
						}
					}
			}
		});
});

	$('.close-popup').click( function(){
		$.magnificPopup.close();
	});

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("#callback-form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Спасибо за заявку!");	
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
				$.magnificPopup.close();
			}, 1000);
		});
		return false;
	});	

// окно popup для изображений
$('.image-popup').magnificPopup({
	type: 'image',
	closeOnContentClick: true,
	closeBtnInside: false,
	fixedContentPos: false,
	fixedBgPos: true,
	mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
	image: {
		verticalFit: false
	},
	zoom: {
		enabled: true,
		duration: 300 // don't foget to change the duration also in CSS
	},
	callbacks: {
		open: function() {
			// $('.document-slider').trigger('stop.owl.autoplay');
			documentSlider.autoplay.stop();
		},
	  close: function() {
			// $('.document-slider').trigger('play.owl.autoplay', [6000, 900]);
			documentSlider.autoplay.start();
	  }
	}	
});

	// footer bottom

	function footerToBottom() {
		var browserHeight = $(window).height(),
		footerOuterHeight = $('#footer').outerHeight(true),
		mainHeightMarginPaddingBorder = $('#wrapper').outerHeight(true) - $('#wrapper').height();
		$('#wrapper').css({
			'min-height': browserHeight - footerOuterHeight - mainHeightMarginPaddingBorder,
		});
	};

// выпадающее меню

	//const burger = document.querySelector('.hamburger');
	//const menu = document.querySelector('#navigation');

	$(".sf-menu").after("<div id='my-menu'>");
	$(".sf-menu").clone().appendTo("#my-menu");
	$("#my-menu").find("*").attr("style", "");
	$("#my-menu").find("ul").removeClass("menu").removeClass("list");
	$("#my-menu").mmenu({
		extensions : [ 
			// 'widescreen', 
			'theme-white', 
			'effect-menu-slide', 
			'pagedim-black',
			'position-right',
			'position-front' 
		],
		navbar: {
			title: 'Меню'
		}
	}, {
		// configuration
		classNames: {
			 fixedElements: {
					fixed: "Fixed",
					sticky: "stick"
			 }
		}
 });

 $(".hamburger").click(function(){
	var mmAPI = $("#my-menu").data( "mmenu" );
	mmAPI.open();	
	return false;
});

	var api = $("#my-menu").data("mmenu");
	api.bind('open:start', function (){
		$(".hamburger").addClass("is-active");
	});
	api.bind("close:finish", function () {
		$(".hamburger").removeClass("is-active");
	});




// --------- 
$(window).on("resize", function () {
	let windowWidth = $(window).width();
	let hTop = $('.header-nav-block').outerHeight();

	footerToBottom();	
}).resize();



 });

//------------------------


// ---------------------


document.addEventListener('DOMContentLoaded', function(){ 
	'use strict';

//


//Слайдер "Почему сев квартал"

let advantagesSwiper = new Swiper('#advantages__gallery', {
	loop: true,
	speed: 3000,
	autoplay: {
		delay: 500,
		disableOnInteraction: false,
	},
	observer: true,
	observeParents: true,
	pagination: {
		el: '#advantages__gallery .swiper-pagination',
	}
});

// Табы и слайдеры "Динамика строительства"

let dynamicSlider = [...document.querySelectorAll('.dynamics-tabs__slider')];
let dynamicSlideItem = dynamicSlider[0];
let dynamicSlide;

function initDynamicSlider(swiper) {
	dynamicSlide = new Swiper(swiper, {
		loop: true,
		speed: 3000,
		autoplay: {
			delay: 500,
			disableOnInteraction: false,
		},
		observer: true,
		observeParents: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});	
}




if(document.querySelector('.dynamics-tabs')){
	let dynTabNav = [...document.querySelectorAll('.dynamics-tabs .dynamics-tabs__tabs > div')],
				dynTabContent = [...document.querySelectorAll('.dynamics-tabs .dynamics-tabs__item')];
	dynTabNav[0].classList.add('is-active');
	dynTabContent[0].classList.add('is-active');
	 
	
	dynTabNav.forEach((item, idx) => {
		 item.addEventListener('click', function(){
			dynTabNav.forEach(item => {
				 item.classList.remove('is-active'); // Удаляем активный укласс у элемента списка
			 });
			 dynTabContent.forEach(item => {
				 item.classList.remove('is-active');
			 });
			 dynamicSlide.destroy(false,true);
			 dynamicSlideItem = dynamicSlider[idx];
			 initDynamicSlider(dynamicSlideItem);
	
			 this.classList.add('is-active');  // Добавляем активный у класс у элемента списка
			 dynTabContent[idx].classList.add('is-active');				
		 });
	 });	
};		



 window.addEventListener('load', onLoadFunction);
 window.addEventListener('resize', onResizeFunction);
 

 function onLoadFunction(e){
	initDynamicSlider(dynamicSlideItem);
	 onResizeFunction();
	};
	function onResizeFunction (e){
 };

 //
 {
	if (document.getElementById('apartment-map')) {
		let mapBlock = document.getElementById('apartment-map');
		let arrHouse = [...mapBlock.querySelectorAll('.house-box')];
		let contentHouseInfo = '';
	
			arrHouse.forEach((el) => {

				contentHouseInfo += `
				<div class="flex apartment-map-title-house" data-house="${el.dataset.house}">
					<div class="colg apartment-map-title-house__left">${el.dataset.title}</div>
					<div class="colg apartment-map-title-house__right">${el.dataset.flat} <span>кв.</span></div>
				</div>
				`
			});	
			mapBlock.insertAdjacentHTML('beforeend', contentHouseInfo);
	 
	 };
};

 //rangeSlider('range-sq', 'range_inpt1-sq', 'range_inpt2-sq');
	if(document.getElementById('range-sq')){
		let rSlider1 = document.getElementById('range-sq');
		let rSliderInputMin1 = document.getElementById('range_inpt1-sq');
		let rSliderInputMax1 = document.getElementById('range_inpt2-sq');
		let dataMin1 = +rSliderInputMin1.dataset.min;
		let dataMax1 = +rSliderInputMax1.dataset.max;
		let dataCustomMin1 = +rSliderInputMin1.dataset.custommin;
		let dataCustomMax1 = +rSliderInputMax1.dataset.custommax;
		
	
		let inputs1 = [
		 rSliderInputMin1,
		 rSliderInputMax1
	 ];
	
	 noUiSlider.create(rSlider1, {
		 start: [ dataCustomMin1, dataCustomMax1 ],
		 connect: true,
		 behaviour: 'drag',			
		 range: {
			 'min': dataMin1,
			 'max': dataMax1
		 },
		 format: wNumb({
			mark: '.',
			decimals: 2
		 })	
	 });	
	
	 rSlider1.noUiSlider.on('update', function( values, handle ) {
		 inputs1[handle].value = values[handle];
	 });
	
	 function setSliderHandle(i, value) {
		 var r = [null,null];
		 r[i] = value;
		 rSlider1.noUiSlider.set(r);
	 }		
	 inputs1.forEach(function(input, handle) {
	
		 input.addEventListener('change', function(){
			 setSliderHandle(handle, this.value);
		 });
	 });
	};
	 
	
	if(document.getElementById('range-price')){
		let rSlider2 = document.getElementById('range-price');
		let rSliderInputMin2 = document.getElementById('range_inpt1-price');
		let rSliderInputMax2 = document.getElementById('range_inpt2-price');
		let dataMin2 = +rSliderInputMin2.dataset.min;
		let dataMax2 = +rSliderInputMax2.dataset.max;
		let dataCustomMin2 = +rSliderInputMin2.dataset.custommin;
		let dataCustomMax2 = +rSliderInputMax2.dataset.custommax;
		
 
		let inputs2 = [
		 rSliderInputMin2,
		 rSliderInputMax2
	 ];
 
	 noUiSlider.create(rSlider2, {
		 start: [ dataCustomMin2, dataCustomMax2 ],
		 connect: true,
		 behaviour: 'drag',			
		 range: {
			 'min': dataMin2,
			 'max': dataMax2
		 },
		 format: wNumb({
			 decimals: 0,
			 thousand: ' '
		 })	
	 });	
 
	 rSlider2.noUiSlider.on('update', function( values, handle ) {
		 inputs2[handle].value = values[handle];
	 });
 
	 function setSliderHandle(i, value) {
		 var r = [null,null];
		 r[i] = value;
		 rSlider2.noUiSlider.set(r);
	 }		
	 inputs2.forEach(function(input, handle) {
 
		 input.addEventListener('change', function(){
			 setSliderHandle(handle, this.value);
		 });
	 
	 });		
	};
	
	
	

	const checky = document.getElementById('input-check');
	const checkyBtn = document.getElementById('form-popup__btn');

	function ChangeInputChecked() {
		if ( checky.checked ){
			checkyBtn.classList.remove('form-popup__btn--disabled');
			checkyBtn.removeAttribute("disabled");
		}else{
			checkyBtn.classList.add('form-popup__btn--disabled');
			checkyBtn.setAttribute("disabled", "disabled");
		}
	};
	checky.addEventListener('click', ChangeInputChecked);
//
	let h = document.getElementById("header-nav-block"),
			stuck = false,
			stickPoint = getDistance();
	let hTop = h.offsetHeight;
	let heightHeaderFixed = document.querySelector('.header-nav-block--fixed');		


 function getDistance() {
	 let topDist = h.offsetTop;
	 return topDist;
 };

 window.addEventListener('scroll', function(e) {
	let distance = getDistance() - window.pageYOffset;
	let offset = window.pageYOffset;
	
	
	if ( (distance <= 0) && !stuck) {
		h.classList.add('header-nav-block--fixed');
		document.getElementById('header').style.marginBottom = '72.1px';
		//document.getElementById('content').style.marginTop = hTop + 'px';
		stuck = true;
	} else if (stuck && (offset <= stickPoint)){
		h.classList.remove('header-nav-block--fixed');
		document.getElementById('header').style.marginBottom = '0px';
		stuck = false;
	}
});
	
	//"маска телефона"
	function setCursorPosition(pos, elem) {
		elem.focus();
		if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
		else if (elem.createTextRange) {
				let range = elem.createTextRange();
				range.collapse(true);
				range.moveEnd("character", pos);
				range.moveStart("character", pos);
				range.select()
			}
	};

	function mask(event) {
			let matrix = "+7 (___) ___ - __ - __",
					i = 0,
					def = matrix.replace(/\D/g, ""),
					val = this.value.replace(/\D/g, "");

			if (def.length >= val.length) val = def;
			this.value = matrix.replace(/./g, function(a) {
					return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
			});
			if (event.type == "blur") {
					if (this.value.length == 2) this.value = ""
			} else setCursorPosition(this.value.length, this)
	};

	let inputTel = document.querySelectorAll(".tel-input");

	[].forEach.call( inputTel, (el) => {
		el.addEventListener("input", mask, false);
		el.addEventListener("focus", mask, false);
		el.addEventListener("blur", mask, false);
	});
//end "маска телефона"

//табы домов
if(document.querySelector('.tabs-btn')){
	let openTab = document.querySelector('.tabs-btn');
	let houseTabs = document.querySelector('.tabs__list-tabs');

	openTab.addEventListener('click', function(){

		houseTabs.classList.toggle("tabs__list-tabs--is-active")
	})
}


(function () {

	let wrapTabNav = [...document.querySelectorAll('.house-tabs')],
			tabContent = [...document.querySelectorAll('.apartment-tabs .tabs__list-panes-item')],
			tabBtn = document.querySelector('.tabs-name > span'),
			dataTab;

	//tabContent[0].classList.add('active');
	if(tabBtn && tabContent){

		wrapTabNav.forEach((wraptabs) => {
			let tabNav = [...wraptabs.querySelectorAll('.house-tabs .house-tabs-item')];
			tabBtn.innerHTML = tabNav[0].dataset.house;
			//console.log(tabNav);
			//tabNav[0].classList.add('active');
	
			tabNav.forEach((item, idx) => {
				item.addEventListener('click', function(e){
					e.preventDefault();
					dataTab = this.dataset.house;
					tabBtn.innerHTML = dataTab;
					wrapTabNav.forEach(wraptabs => {
						let a = [...wraptabs.querySelectorAll('.house-tabs .house-tabs-item')];
						
						a.forEach( item => {
							if( item.dataset.house === dataTab ){
								item.classList.add('active')
							} else{
								item.classList.remove('active');
							}
						});
					});
	
					//console.log(dataTab);
	
					tabContent.forEach( item => {
						if( item.dataset.house === dataTab ){
							item.classList.add('active')
						} else{
							item.classList.remove('active');
						}
						
					});
				});
				
			});
	
		});
	}

	
})();


if(document.querySelector('.advantages-block')){
	// остальные табы по индексу
	tabs('.advantages-block .tab-item','.advantages-block .advantages__content');
	tabs('.buy-tabs .buy-tabs__tab','.buy-tabs .buy-tabs__item');
	
	function tabs(tabs, panes) {
		let tabNav = [...document.querySelectorAll(tabs)],
				tabContent = [...document.querySelectorAll(panes)];
				
		tabNav[0].classList.add('is-active');
		tabContent[0].classList.add('is-active');
		
	
		tabNav.forEach((item, idx) => {
			item.addEventListener('click', function(){
				tabNav.forEach(item => {
					item.classList.remove('is-active'); // Удаляем активный укласс у элемента списка
				});
				tabContent.forEach(item => {
					item.classList.remove('is-active');
				});
				this.classList.add('is-active');  // Добавляем активный у класс у элемента списка
				tabContent[idx].classList.add('is-active');				
			});
		});	
	};
};

//

let houseBox = [...document.querySelectorAll('#apartment-map .house-box')];
let apartmentTabs = document.getElementById('apartment-tabs');
if(houseBox){
	if(window.screen.width <= 768){
		houseBox.forEach( item => {
			item.addEventListener('click', function(){
				smoothScrollTo(apartmentTabs.offsetTop - 80);
			});
		});
	}
};


window.smoothScrollTo = (function () {
let timer, start, factor;

return function (target, duration = '500') {
let offset = window.pageYOffset,
	delta  = target - window.pageYOffset;
start = Date.now();                       
factor = 0;

if( timer ) {
clearInterval(timer);
}

function step() {
let y;
factor = (Date.now() - start) / duration;
if( factor >= 1 ) {
	clearInterval(timer); 
	factor = 1;           
} 
y = factor * delta + offset;
window.scrollBy(0, y - window.pageYOffset);
}

timer = setInterval(step, 10);
return timer;
};
}());



});

