// длинное меню
function menuDotts() {
    if(window.innerWidth > 1023.98) {
        let enumeration = [];
        const menuItem = document.querySelector('.menu__list').children;
        const menu = document.querySelector('.menu');
        const menuWidth = menu.offsetWidth;
        const menuBody = document.querySelector('.menu__body');
        let left = 110;
    
        menuItem.forEach(function(item, i, menuItem) {
            let width = item.clientWidth;
            left +=  width;

            if(window.innerWidth > 1023.98 && window.innerWidth < 1365.98) {
                left +=  12;
            } else 
            if (window.innerWidth > 1365.98 && window.innerWidth < 1919.98) {
                left +=  16;
            } else if(window.innerWidth > 1919.98) {
                left +=  29;
            }
            console.log(`лево ${left}`);
            if( menuWidth < left ) {
                enumeration.push(item);
            };
        });
        if(menuWidth < left) {
            menuBody.insertAdjacentHTML("beforeend",'<div class="menu__more"><div class="menu__more-btn _icon-ellipsis-vertical"></div><ul class="menu__list"></ul></div>');
        }
        const more = document.querySelector('.menu__more>.menu__list');
        for (let i = 0; i < enumeration.length; i++) {
            more.append(enumeration[i]);
        }
    }
}
menuDotts();

const iconMore = document.querySelector(".menu__more-btn");
if(iconMore) {
	iconMore.addEventListener('click', function(e) {
        closeAllSubMenu();
		document.documentElement.classList.toggle('menu-more');
	});
}

window.onload = function () {
    document.addEventListener('click', documentActions);

    //Actions делегирование события click
    function documentActions(e) {
        const targetElement = e.target;
        if(targetElement.classList.contains('search-menu__icon')) {
            
            document.querySelector('.search-menu').classList.toggle('_active');
            document.documentElement.classList.add('search-open');

            // закрыть если проскролил
            document.addEventListener("windowScroll", function (e) {
                const startPoint = 0;
                const scrollTop = window.scrollY;
                if (scrollTop >= startPoint) {
                    document.querySelector('.search-menu').classList.remove('_active');
                    document.documentElement.classList.remove('search-open');
                } 
            })

        } else if(!targetElement.closest('.form-search') && document.querySelectorAll('.search-open')) {

            document.querySelector('.search-menu').classList.remove('_active');
            document.documentElement.classList.remove('search-open');

        }


        const btnContacts = document.querySelector('.button-contacts-header');
        const numberContacts = document.querySelector('.contacts-block__call')
        const contacts = document.querySelector('.contacts');

        if(btnContacts.contains(e.target) || numberContacts.contains(e.target)) {
            const windowWidth = document.documentElement.clientWidth;
            const btnRight = btnContacts.getBoundingClientRect().right;
            const btnBottom = btnContacts.getBoundingClientRect().bottom;
            const right = windowWidth - btnRight;
            if(window.innerWidth > 767.98  && window.innerWidth < 1023.98) {
                contacts.style.top = btnBottom + 20 + "px";
                contacts.style.right = right + "px"
            } else if(window.innerWidth > 1023.98) {
                contacts.style.top = btnBottom + 35 + "px";
                contacts.style.right = right + "px"
            }

            document.documentElement.classList.toggle("contacts-open");
            if(window.innerWidth < 767.98) {
                if (document.querySelector(".menu-open")) {
                    document.documentElement.classList.remove("menu-open");
                    document.querySelector('.menu__body').onmouseleave = closeAllSubMenu;
                }
            }

        } else if( !targetElement.closest('.contacts') && document.querySelectorAll('.contacts-open') || targetElement.closest('.call-back')) {
            document.documentElement.classList.remove("contacts-open");
        }
    }
}

document.querySelector('.menu__body').addEventListener("click", (e) => {
    const targetElement = e.target;
    const parentElement = targetElement.parentElement;
    const subMenuList = parentElement.querySelector('.menu__sub-list');
    if(targetElement.classList.contains('menu__button-sub-open')) {
        if (parentElement && subMenuList) {
            closeAllSubMenu(subMenuList);
            subMenuList.classList.toggle('_open');
            parentElement.classList.toggle('_hover');
        }
    }

    if(targetElement.classList.contains('menu__sub-list-back') && !targetElement.closest('menu__item')) {
        targetElement.parentNode.classList.remove('_open');
    }
})  
document.querySelector('.menu').onmouseleave = closeAllSubMenu;

function closeAllSubMenu(current = null) {
    let parents = [];
    if (current) {
        let currentParent = current.parentNode;
        while(currentParent) {
            if(currentParent.classList.contains('menu__list')) break;
            if(currentParent.nodeName === 'UL') parents.push(currentParent);
            currentParent = currentParent.parentNode;
        }
    }
    const subMenu = document.querySelectorAll('.menu__sub-list');
    // проверка родителей
    subMenu.forEach(item => {
        if(item != current && !parents.includes(item)) {
            item.classList.remove('_open');
            item.parentElement.classList.remove('_hover');
        }
    });
}

// SubMenu
function SubMenu() {
    const windowWidth = document.documentElement.clientWidth;
    let subMenu = document.querySelectorAll('.menu__sub-list');
        subMenu.forEach(function(item, i, subMenu) {
            let left = item.getBoundingClientRect().left;
            let width = item.clientWidth;
            let check = left + width;
    
            if( windowWidth < check ) {;
                item.classList.add('_left');
            };
        });
}
SubMenu();

//language
var buttons = document.querySelectorAll(".language-header__item");
for (var button of buttons) {
    button.addEventListener('click', function () {
        buttons.forEach(i => {i.classList.remove('language-header__item_active')});
        this.classList.toggle('language-header__item_active');
        console.log(this.dataset.language);
    });
};

const iconMenu = document.querySelector(".burger");
const menu = document.querySelector('.menu__list');
const search = document.querySelector('.search-menu__form');

document.addEventListener('click', function(e) {
    const target = e.target;
	const its_btnMenu = target == iconMenu || iconMenu.contains(target);
    const its_menu = target == menu || menu.contains(target);
	const its_search = target == search || search.contains(target);
    const menu_is_active = document.documentElement.classList.contains("menu-open");
    
    if (!its_menu && !its_btnMenu && !its_search && menu_is_active ) {
        document.documentElement.classList.toggle("menu-open");
    }
});
