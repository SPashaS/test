// Подключение функционала "Чертогов Фрилансера"
// import { cli } from "webpack-dev-server";
import { isMobile, bodyLockToggle, bodyUnlock, bodyLockStatus, menuClose, bodyLock } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

document.querySelector('.themetoggle').addEventListener('click', (e) => {
    // e.preventDefault();
    if(localStorage.getItem('theme') === 'dark') {
        localStorage.removeItem('theme');
    } else {
        localStorage.setItem('theme', 'dark');
    }
    addDarkClassToHTML();
});

function addDarkClassToHTML() {
    try {
        if(localStorage.getItem('theme') === 'dark') {
            document.querySelector('html').classList.add('dark');
        } else {
            document.querySelector('html').classList.remove('dark');
        }
        
    } catch (err) {}
}

addDarkClassToHTML();

// document.addEventListener('click', documentActions, {passive: true});

window.onload = function () {
    document.addEventListener('click', documentActions);

    //Actions делегирование события click
    function documentActions(e) {
        const targetElement = e.target;
        if(targetElement.classList.contains('search-menu__icon')) {
            document.querySelector('.search-menu').classList.toggle('_active');
            document.documentElement.classList.add("popup-open");
            // document.body.classList.toggle('popup-show');
        } else if(!targetElement.closest('.search-menu') && document.querySelectorAll('.search-menu._active')) {
            document.querySelector('.search-menu').classList.remove('_active');
            document.documentElement.classList.remove("popup-open");
            // document.body.classList.remove('popup-show');
        }

        if(targetElement.classList.contains('button-contacts-header') ||           
            targetElement.classList.contains('button-contacts-header__mobile') ||
            targetElement.classList.contains('button-contacts-header__label') || 
            targetElement.classList.contains('button-contacts-header__label-text')) {
            
            document.documentElement.classList.toggle("contacts-open");
            if(window.innerWidth < 767.98) {
                bodyLockToggle();
                // console.log(document.querySelector(".menu-open"));
                if (document.querySelector(".menu-open")) {
                    document.documentElement.classList.remove("menu-open");
                }
            }
        } else if( !targetElement.closest('.contacts') && document.querySelectorAll('.contacts-open') ) {
            document.documentElement.classList.remove("contacts-open");
        }

        // if(targetElement.classList.contains('menu__button-sub-open')) {
        //     const parentElement = targetElement.parentElement;
        //     console.log(parentElement);
        //     if (parentElement && parentElement.querySelector('.menu__sub-list')) {
        //         let subMenuList = parentElement.querySelector('.menu__sub-list');
        //         subMenuList.classList.toggle('_open');
        //         parentElement.classList.toggle('_hover');
                
        //         // console.log(sub);
        //         console.log('кек');
        //         // open sub menu logic
        //     }
        // }

        // if(targetElement.classList.contains('menu__back-sub')){
        //     subMenuList.classList.remove('_open');
        //     console.log('menu__back-sub');
        // }

    }
}


document.querySelector('.menu__body').onclick = function(e) {
    const targetElement = e.target;
    console.log(targetElement );
    if(targetElement.classList.contains('menu__button-sub-open')) {
        const parentElement = targetElement.parentElement;
        console.log(parentElement);
        if (parentElement && parentElement.querySelector('.menu__sub-list')) {
            let subMenuList = parentElement.querySelector('.menu__sub-list');

            // closeAllSubMenu()
            subMenuList.classList.toggle('_open');
            parentElement.classList.toggle('_hover');
        }
    }
}

function closeAllSubMenu() {
    const activeSubMenu = document.querySelectorAll('.menu__sub-list._open');
    console.log(activeSubMenu );
    Array.from(activeSubMenu).forEach(item => item.classList.remove('_open'));
}

console.log(window.innerWidth);



//   var app = {
//     init: function init() {
//       app.windowResize();
//       app.fullScreenHeight();
//       app.modals();
//       app.fancybox();
//       app.menu();
//       app.submenu();
//       app.custom();
//       app.selectric();
//       app.sliders();
//       app.tabs();
//       app.validate();
//       app.accordeon();
//       app.masonry();
//     },
  
//     fullScreenHeight: function fullScreenHeight() {
//       var headHeight = 0,
//           footHeight = 0;
//       if (document.querySelector('header').length) {
//         headHeight = document.querySelector('header').outerHeight();
//       }
//       if (document.querySelector('footer').length) {
//         footHeight = document.querySelector('footer').outerHeight();
//       }
  
//       var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  
//       document.querySelector('.jsHeightWithoutHeader').css('min-height', height - headHeight);
//       document.querySelector('.jsHeightHF').css('min-height', height - headHeight - footHeight);
//     },
//     menu: function menu() {
//       var $tablet = false;
//       var $mobile = false;
//       document.querySelector(window).addEventListener('ready resize load', function () {
//         if (document.querySelector(window).width() <= 768) {
//           $mobile = true;
//         } else {
//           $mobile = false;
//         }
//         if (document.querySelector(window).width() <= 992) {
//           $tablet = true;
//         } else {
//           $tablet = false;
//         }
//       });
  
//       var $btnMenu = document.querySelector('.jsMenu');
//       $btnMenu.click(function () {
//         document.querySelector(this).classList.toggle('menu-is-active');
//         document.querySelector('.header_menu_wrapper').classList.toggle('open');
//         document.querySelector('body').classList.toggle('menuopen');
//       });
  
//       contactsPosition();
  
//       document.querySelector(window).addEventListener('resize', function () {
//         contactsPosition();
//       });
  
//       document.querySelector(window).addEventListener('load', function () {
//         setTimeout(() => contactsPosition() , 10);
//       });
  
//       document.querySelector('.header_menu .navigation > li.menu-item-has-children').classList.add('level-1');
//       document.querySelector('.header_menu .navigation > li.menu-item-has-children > .sub-menu > li.menu-item-has-children').classList.add('level-2');
//       document.querySelector('.header_menu .navigation > li.menu-item-has-children > .sub-menu > li.menu-item-has-children > .sub-menu > li.menu-item-has-children').classList.add('level-3');
//       document.querySelector('.header_menu .navigation > li.menu-item-has-children > .sub-menu > li.menu-item-has-children > .sub-menu > li.menu-item-has-children > .sub-menu > li.menu-item-has-children').classList.add('level-4');
  
//       var $all_level = 0;
  
//       for (var i = 1; i <= 4; i++) {
//         document.querySelector('.level-' + i + ' > ul.sub-menu').attr('data-level', i);
//       }
  
//       document.querySelector('.menu-item-has-children').each(function () {
//         var $this = document.querySelector(this);
  
//         $this.insertAdjacentHTML("beforeend",'<div class="button"></div>');
  
//         var $level = $this.children('.sub-menu').attr('data-level');
  
//         var $titlemenu = $this.children('a'),
//             $title = $titlemenu.text();
//         $this.querySelector('.sub-menu').insertAdjacentHTML("beforeend",'<div class="back_button" data-back="' + $level + '">' + $title + '</div>');
  
//         if ($level >= $all_level) {
//           $all_level = $level;
//         }
//       });
  
//       document.querySelector(document).addEventListener('click', '.menu-item-has-children .button', function () {
//         var $this = document.querySelector(this);
//         $this.parents('.menu-item-has-children').children('.sub-menu').classList.add('open');
//       });
  
//       document.querySelector(document).addEventListener('click', '.menu-item-has-children .back_button', function () {
//         var $this = document.querySelector(this), i = 0;
//         var $level_back = $this.attr('data-back');
  
//         for (i = $level_back; i <= $all_level; i++) {
//           document.querySelector(document).querySelector('[data-level="'+i+'"]').removeClass('open');
//           console.log( i, $level_back );
//         }
//       });
  
//       document.querySelector(document).addEventListener('click', function (e) {
//         var $headermenu = document.querySelector('.header_menu_wrapper');
//         if (!$btnMenu.is(e.target) && $btnMenu.has(e.target).length === 0 &&
//          !$headermenu.is(e.target) && $headermenu.has(e.target).length === 0 &&
//          !document.querySelector('.mfp-wrap').is(e.target) && document.querySelector('.mfp-wrap').has(e.target).length === 0) {
//           $btnMenu.removeClass('menu-is-active');
//           if ($mobile) {
//             document.querySelector('.header_menu_wrapper').removeClass('open');
//           }
//           document.querySelector('body').removeClass('menuopen');
//         }
  
//         if (!document.querySelector('.btn_phone').is(e.target) && document.querySelector('.btn_phone').has(e.target).length === 0 && 
//             !document.querySelector('.jsBtnContacts').is(e.target) && document.querySelector('.jsBtnContacts').has(e.target).length === 0 && 
//             !document.querySelector('.mobile_contacts_wrap').is(e.target) && document.querySelector('.mobile_contacts_wrap').has(e.target).length === 0 &&
//             !document.querySelector('.mfp-wrap').is(e.target) && document.querySelector('.mfp-wrap').has(e.target).length === 0) {
//           document.querySelector('.mobile_contacts_wrap').removeClass('opened');
//           document.querySelector('.jsBtnContacts').removeClass('active');
//         }
//       });
  
//       document.querySelector('.jsMenuWrapper').each(function () {
//         var $thisMenuWrap = document.querySelector(this);
//         var $nav = $thisMenuWrap;
//         var $btn = $thisMenuWrap.querySelector('.jsBtnMoreWrap');
//         var $vlinks = $thisMenuWrap.querySelector('.jsMenuNavigation');
//         var $hlinks = $thisMenuWrap.querySelector('.jsDropMenu > ul');
  
//         var breaks = [];
  
//         function updateNav() {
//           var availableSpace = $btn.classList.contains('hidden') ? $nav.width() : $nav.width() - $btn.width() - 30;
//           if ($vlinks.width() > availableSpace) {
//             breaks.push($vlinks.width());
//             $vlinks.children().last().prependTo($hlinks);
//             if ($btn.classList.contains('hidden')) {
//               $btn.removeClass('hidden');
//             }
//           } else {
//             if (availableSpace > breaks[breaks.length - 1]) {
//               $hlinks.children().first().appendTo($vlinks);
//               breaks.pop();
//             }
//             if (breaks.length < 1) {
//               $btn.classList.add('hidden');
//             }
//           }
//           $btn.attr('count', breaks.length);
//           if ($vlinks.width() > availableSpace) {
//             updateNav();
//           }
//         }
//         document.querySelector(window).addEventListener('resize', function () {
//           updateNav();
//         });
//         updateNav();
//       });
//     },
  
//     submenu: function submenu() {
  
//       function SubMenu() {
//         document.querySelector('.sub-menu').each(function () {
//           var $this = document.querySelector(this);
//           var $documentWidth = document.querySelector(window).outerWidth();
//           var $thisWidth = $this.outerWidth();
//           var $check = $documentWidth - $thisWidth;
//           if ($this.offset().left > $check) {
//             $this.classList.add('pos_left');
//           } else {
//             $this.removeClass('pos_left');
//           }
//         });
//       }
  
//       SubMenu();
  
//       document.querySelector(window).addEventListener('resize', function () {
//         SubMenu();
//       });
//     },
  
//     masonry: function masonry() {
//       var $tablet = true;
//       var $mobile = true;
  
//       if (document.querySelector(window).width() <= 768) {
//         $mobile = true;
//       } else {
//         $mobile = false;
//       }
  
//       if (document.querySelector(window).width() <= 991) {
//         $tablet = true;
//       } else {
//         $tablet = false;
//       }
  
//       document.querySelector(window).addEventListener('resize load', function () {
//         if (document.querySelector(window).width() <= 768) {
//           $mobile = true;
//         } else {
//           $mobile = false;
//         }
//       });
  
//       document.querySelector(window).addEventListener('resize load', function () {
//         if (document.querySelector(window).width() <= 991) {
//           $tablet = true;
//         } else {
//           $tablet = false;
//         }
//       });
  
//       document.querySelector('.jsMasorny').each(function () {
//         var $this = document.querySelector(this);
  
//         var masonryOptions = {
//           itemSelector: '.jsMasornyItem',
//           horizontalOrder: true
//         };
  
//         var $grid = $this.masonry(masonryOptions);
//         $grid.masonry(masonryOptions);
  
//         function checkMasonry() {
//           if ($tablet) {
//             var $hasMasonry = $grid.data('masonry') ? true : false;
//             if ($grid.length > 0 && $hasMasonry) {
//               $grid.masonry('destroy');
//             }
//           } else {
//             $grid.masonry(masonryOptions);
//           }
//         }
  
//         checkMasonry();
  
//         document.querySelector(window).addEventListener('resize load', function () {
//           checkMasonry();
//         });
//       });
  
//       document.querySelector('.jsMasornyTablet').each(function () {
//         var $this = document.querySelector(this);
  
//         var masonryOptions2 = {
//           itemSelector: '.jsMasornyTabletItem',
//           horizontalOrder: true
//         };
  
//         var $grid = $this.masonry(masonryOptions2);
//         $grid.masonry(masonryOptions2);
  
//         function checkTabletMasonry() {
//           if ($tablet) {
//             var $hasMasonry = $grid.data('masonry') ? true : false;
//             if ($grid.length > 0 && $hasMasonry) {
//               $grid.masonry('destroy');
//             }
//           } else {
//             $grid.masonry(masonryOptions2);
//           }
//         }
  
//         checkTabletMasonry();
  
//         document.querySelector(window).addEventListener('resize load', function () {
//           checkTabletMasonry();
//         });
//       });
  
  
  
//       document.querySelector('.jsMasornyBlockWrapper').each(function () {
//         var $this = document.querySelector(this);
//         var masonryBlocks = {
//           itemSelector: '.jsMasornyContentBlock',
//           horizontalOrder: true,
//         };
//         var $grid = $this.masonry(masonryBlocks);
//         $grid.masonry(masonryBlocks);
//         function checkMasonry() {
//           if ( document.querySelector(window).width() < 1749 ) {
//             var $hasMasonry = $grid.data('masonry') ? true : false;
//             if ($grid.length > 0 && $hasMasonry) {
//               $grid.masonry('destroy');
//             }
//           } else {
//             $grid.masonry(masonryBlocks);
//           }
//         }
//         checkMasonry();
//         document.querySelector(window).addEventListener('resize load', function () {
//           checkMasonry();
//         });
//         if(document.querySelector('.more_questions .single_link').length){
//           document.querySelector('.more_questions .single_link').addEventListener('click', function(e){
//             checkMasonry();
//           });
//         }
  
//         if(document.querySelector('.b_service .jsAccordItem').length){
//           document.querySelector('.b_service .jsAccordItem').addEventListener('click', function(e){
//             setTimeout(() => checkMasonry() , 110);
//           });
//         }
//       });
//     },
  
//     custom: function custom() {
//       document.querySelector('.more_questions .single_link').addEventListener('click', function(e){
//         e.preventDefault();
//         document.querySelector('.faq_row').show();
//         document.querySelector('.more_questions').hide();
//       });
      
//       document.querySelector('.b_header .mobile_header').sticky({
//         topSpacing: 0,
//         zIndex: 20
//       });
  
//       var $mobile = false;
//       document.querySelector(window).addEventListener('ready resize load', function () {
//         if (document.querySelector(window).width() < 768) {
//           $mobile = true;
//         } else {
//           $mobile = false;
//         }
//       });
  
//       document.querySelector('.drop_menu_wrapper').each(function () {
//         var $this = document.querySelector(this),
//             $thisBtn = $this.querySelector('.jsDropMenuBtn'),
//             $thisMenu = $this.querySelector('.jsDropMenu');
  
//         $thisBtn.addEventListener('click', function () {
//           $thisMenu.fadeIn(200);
//         });
//         closeMenu($thisBtn, $thisMenu);
//       });
  
//       function closeMenu($thisBtn, $thisMenu) {
//         document.querySelector(document).addEventListener('click', function (e) {
//           if (!$thisBtn.is(e.target) && $thisBtn.has(e.target).length === 0 && !$thisMenu.is(e.target) && $thisMenu.has(e.target).length === 0) {
//             $thisMenu.fadeOut(200);
//           }
//         });
//       }
  
//       document.querySelector('.faq_title').addEventListener('click', function () {
//         var $this = document.querySelector(this);
//         if ($mobile) {
//           $this.next('.faq_content').classList.toggle('opened');
//         }
//       });
//       document.querySelector('.content_back').addEventListener('click', function () {
//         var $this = document.querySelector(this);
//         $this.parents('.faq_content').classList.toggle('opened');
//       });
  
//       document.querySelector('.btn_d_more').addEventListener('click', function (e) {
//         e.preventDefault();
//         var $this = document.querySelector(this);
//         $this.parents('.doctor_information').querySelector('.information').classList.add('more');;
//       });
  
//       document.querySelector('.jsAllPrice').each(function () {
//         var $this = document.querySelector(this);
//         var $thisPrices = $this.parents('.prices').querySelector('.row_list_wrapper');
//         $this.addEventListener('click', function () {
//           var $thisPricesList = $this.parents('.prices').querySelector('.prices_row_list').outerHeight();
//           $this.hide();
//           $thisPrices.classList.add('opened').css('max-height', $thisPricesList);
//           setTimeout(function () {
//             return $thisPrices.classList.add('noMax');
//           }, 220);
//         });
//       });
  
//       document.querySelector('.jsReadMore').addEventListener('click', function (e) {
//         e.preventDefault();
//         var $this = document.querySelector(this);
//         $this.hide().parents('.content_wrapper').querySelector('.full_content').slideDown(200);
//       });
//     },
  
//     selectric: function selectric() {
//       document.querySelector('.jsSelectricView').each(function () {
//         var $this = document.querySelector(this);
  
//         $this.selectric({
//           maxHeight: 195,
//           disableOnMobile: false,
//           nativeOnMobile: false
//         });
//       });
//     },
//   };
//   document.querySelector(document).ready(app.init());
//   app.windowLoad();