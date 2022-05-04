/******/ (() => {
  // webpackBootstrap
  /******/ "use strict";
  var __webpack_exports__ = {}; // CONCATENATED MODULE: ./src/js/files/modules.js

  const modules_flsModules = {}; // CONCATENATED MODULE: ./src/js/files/functions.js
  // Подключение списка активных модулей

  /* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
  function isWebp() {
    // Проверка поддержки webp
    function testWebP(callback) {
      let webP = new Image();
      webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
      };
      webP.src =
        "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    // Добавление класса _webp или _no-webp для HTML
    testWebP(function (support) {
      let className = support === true ? "webp" : "no-webp";
      document.documentElement.classList.add(className);
    });
  }
  /* Проверка мобильного браузера */
  let isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };
  /* Добавление класса touch для HTML если браузер мобильный */
  function addTouchClass() {
    // Добавление класса _touch для HTML если браузер мобильный
    if (isMobile.any()) document.documentElement.classList.add("touch");
  }
  // Добавление loaded для HTML после полной загрузки страницы
  function addLoadedClass() {
    window.addEventListener("load", function () {
      setTimeout(function () {
        document.documentElement.classList.add("loaded");
      }, 0);
    });
  }
  // Получение хеша в адресе сайта
  function getHash() {
    if (location.hash) {
      return location.hash.replace("#", "");
    }
  }
  // Указание хеша в адресе сайта
  function setHash(hash) {
    hash = hash ? `#${hash}` : window.location.href.split("#")[0];
    history.pushState("", "", hash);
  }
  // Учет плавающей панели на мобильных устройствах при 100vh
  function fullVHfix() {
    const fullScreens = document.querySelectorAll("[data-fullscreen]");
    if (fullScreens.length && isMobile.any()) {
      window.addEventListener("resize", fixHeight);
      function fixHeight() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      }
      fixHeight();
    }
  }
  // Вспомогательные модули плавного расскрытия и закрытия объекта ======================================================================================================================================================================
  let _slideUp = (target, duration = 500, showmore = 0) => {
    if (!target.classList.contains("_slide")) {
      target.classList.add("_slide");
      target.style.transitionProperty = "height, margin, padding";
      target.style.transitionDuration = duration + "ms";
      target.style.height = `${target.offsetHeight}px`;
      target.offsetHeight;
      target.style.overflow = "hidden";
      target.style.height = showmore ? `${showmore}px` : `0px`;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      window.setTimeout(() => {
        target.hidden = !showmore ? true : false;
        !showmore ? target.style.removeProperty("height") : null;
        target.style.removeProperty("padding-top");
        target.style.removeProperty("padding-bottom");
        target.style.removeProperty("margin-top");
        target.style.removeProperty("margin-bottom");
        !showmore ? target.style.removeProperty("overflow") : null;
        target.style.removeProperty("transition-duration");
        target.style.removeProperty("transition-property");
        target.classList.remove("_slide");
        // Создаем событие
        document.dispatchEvent(
          new CustomEvent("slideUpDone", {
            detail: {
              target: target,
            },
          })
        );
      }, duration);
    }
  };
  let _slideDown = (target, duration = 500, showmore = 0) => {
    if (!target.classList.contains("_slide")) {
      target.classList.add("_slide");
      target.hidden = target.hidden ? false : null;
      showmore ? target.style.removeProperty("height") : null;
      let height = target.offsetHeight;
      target.style.overflow = "hidden";
      target.style.height = showmore ? `${showmore}px` : `0px`;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      target.offsetHeight;
      target.style.transitionProperty = "height, margin, padding";
      target.style.transitionDuration = duration + "ms";
      target.style.height = height + "px";
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      window.setTimeout(() => {
        target.style.removeProperty("height");
        target.style.removeProperty("overflow");
        target.style.removeProperty("transition-duration");
        target.style.removeProperty("transition-property");
        target.classList.remove("_slide");
        // Создаем событие
        document.dispatchEvent(
          new CustomEvent("slideDownDone", {
            detail: {
              target: target,
            },
          })
        );
      }, duration);
    }
  };
  let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
      return _slideDown(target, duration);
    } else {
      return _slideUp(target, duration);
    }
  };
  // Вспомогательные модули блокировки прокрутки и скочка ====================================================================================================================================================================================================================================================================================
  let bodyLockStatus = true;
  let bodyLockToggle = (delay = 500) => {
    if (document.documentElement.classList.contains("lock")) {
      bodyUnlock(delay);
    } else {
      bodyLock(delay);
    }
  };
  let bodyUnlock = (delay = 500) => {
    let body = document.querySelector("body");
    if (bodyLockStatus) {
      let lock_padding = document.querySelectorAll("[data-lp]");
      setTimeout(() => {
        for (let index = 0; index < lock_padding.length; index++) {
          const el = lock_padding[index];
          el.style.paddingRight = "0px";
        }
        body.style.paddingRight = "0px";
        document.documentElement.classList.remove("lock");
      }, delay);
      bodyLockStatus = false;
      setTimeout(function () {
        bodyLockStatus = true;
      }, delay);
    }
  };
  let bodyLock = (delay = 500) => {
    let body = document.querySelector("body");
    if (bodyLockStatus) {
      let lock_padding = document.querySelectorAll("[data-lp]");
      for (let index = 0; index < lock_padding.length; index++) {
        const el = lock_padding[index];
        el.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px";
      }
      body.style.paddingRight =
        window.innerWidth -
        document.querySelector(".wrapper").offsetWidth +
        "px";
      document.documentElement.classList.add("lock");

      bodyLockStatus = false;
      setTimeout(function () {
        bodyLockStatus = true;
      }, delay);
    }
  };
  // Модуль работы со спойлерами =======================================================================================================================================================================================================================
  /*
Для родителя слойлеров пишем атрибут data-spollers
Для заголовков слойлеров пишем атрибут data-spoller
Если нужно включать\выключать работу спойлеров на разных размерах экранов
пишем параметры ширины и типа брейкпоинта.

Например: 
data-spollers="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
data-spollers="768,min" - спойлеры будут работать только на экранах больше или равно 768px

Если нужно что бы в блоке открывался болько один слойлер добавляем атрибут data-one-spoller
*/
  function spollers() {
    const spollersArray = document.querySelectorAll("[data-spollers]");
    if (spollersArray.length > 0) {
      // Получение обычных слойлеров
      const spollersRegular = Array.from(spollersArray).filter(function (
        item,
        index,
        self
      ) {
        return !item.dataset.spollers.split(",")[0];
      });
      // Инициализация обычных слойлеров
      if (spollersRegular.length) {
        initSpollers(spollersRegular);
      }
      // Получение слойлеров с медиа запросами
      let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
      if (mdQueriesArray && mdQueriesArray.length) {
        mdQueriesArray.forEach((mdQueriesItem) => {
          // Событие
          mdQueriesItem.matchMedia.addEventListener("change", function () {
            initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
          });
          initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
      }

      // Инициализация
      function initSpollers(spollersArray, matchMedia = false) {
        spollersArray.forEach((spollersBlock) => {
          spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
          if (matchMedia.matches || !matchMedia) {
            spollersBlock.classList.add("_spoller-init");
            initSpollerBody(spollersBlock);
            spollersBlock.addEventListener("click", setSpollerAction);
          } else {
            spollersBlock.classList.remove("_spoller-init");
            initSpollerBody(spollersBlock, false);
            spollersBlock.removeEventListener("click", setSpollerAction);
          }
        });
      }
      // Работа с контентом
      function initSpollerBody(spollersBlock, hideSpollerBody = true) {
        let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
        if (spollerTitles.length) {
          spollerTitles = Array.from(spollerTitles).filter(
            (item) => item.closest("[data-spollers]") === spollersBlock
          );
          spollerTitles.forEach((spollerTitle) => {
            if (hideSpollerBody) {
              spollerTitle.removeAttribute("tabindex");
              if (!spollerTitle.classList.contains("_spoller-active")) {
                spollerTitle.nextElementSibling.hidden = true;
              }
            } else {
              spollerTitle.setAttribute("tabindex", "-1");
              spollerTitle.nextElementSibling.hidden = false;
            }
          });
        }
      }
      function setSpollerAction(e) {
        const el = e.target;
        if (el.closest("[data-spoller]")) {
          const spollerTitle = el.closest("[data-spoller]");
          const spollersBlock = spollerTitle.closest("[data-spollers]");
          const oneSpoller = spollersBlock.hasAttribute("data-one-spoller")
            ? true
            : false;
          if (!spollersBlock.querySelectorAll("._slide").length) {
            if (
              oneSpoller &&
              !spollerTitle.classList.contains("_spoller-active")
            ) {
              hideSpollersBody(spollersBlock);
            }
            spollerTitle.classList.toggle("_spoller-active");
            _slideToggle(spollerTitle.nextElementSibling, 500);
          }
          e.preventDefault();
        }
      }
      function hideSpollersBody(spollersBlock) {
        const spollerActiveTitle = spollersBlock.querySelector(
          "[data-spoller]._spoller-active"
        );
        if (spollerActiveTitle) {
          spollerActiveTitle.classList.remove("_spoller-active");
          _slideUp(spollerActiveTitle.nextElementSibling, 500);
        }
      }
    }
  }
  // Модуь работы с табами =======================================================================================================================================================================================================================
  /*
Для родителя табов пишем атрибут data-tabs
Для родителя заголовков табов пишем атрибут data-tabs-titles
Для родителя блоков табов пишем атрибут data-tabs-body
Для родителя блоков табов можно указать data-tabs-hash, это втключит добавление хеша

Если нужно чтобы табы открывались с анимацией 
добавляем к data-tabs data-tabs-animate
По умолчанию, скорость анимации 500ms, 
указать свою скорость можно так: data-tabs-animate="1000"

Если нужно чтобы табы превращались в "спойлеры", на неком размере экранов, пишем параметры ширины.
Например: data-tabs="992" - табы будут превращаться в спойлеры на экранах меньше или равно 992px
*/
  function tabs() {
    const tabs = document.querySelectorAll("[data-tabs]");
    let tabsActiveHash = [];

    if (tabs.length > 0) {
      const hash = getHash();
      if (hash && hash.startsWith("tab-")) {
        tabsActiveHash = hash.replace("tab-", "").split("-");
      }
      tabs.forEach((tabsBlock, index) => {
        tabsBlock.classList.add("_tab-init");
        tabsBlock.setAttribute("data-tabs-index", index);
        tabsBlock.addEventListener("click", setTabsAction);
        initTabs(tabsBlock);
      });

      // Получение слойлеров с медиа запросами
      let mdQueriesArray = dataMediaQueries(tabs, "tabs");
      if (mdQueriesArray && mdQueriesArray.length) {
        mdQueriesArray.forEach((mdQueriesItem) => {
          // Событие
          mdQueriesItem.matchMedia.addEventListener("change", function () {
            setTitlePosition(
              mdQueriesItem.itemsArray,
              mdQueriesItem.matchMedia
            );
          });
          setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
      }
    }
    // Установка позиций заголовков
    function setTitlePosition(tabsMediaArray, matchMedia) {
      tabsMediaArray.forEach((tabsMediaItem) => {
        tabsMediaItem = tabsMediaItem.item;
        let tabsTitles = tabsMediaItem.querySelector("[data-tabs-titles]");
        let tabsTitleItems =
          tabsMediaItem.querySelectorAll("[data-tabs-title]");
        let tabsContent = tabsMediaItem.querySelector("[data-tabs-body]");
        let tabsContentItems =
          tabsMediaItem.querySelectorAll("[data-tabs-item]");
        tabsTitleItems = Array.from(tabsTitleItems).filter(
          (item) => item.closest("[data-tabs]") === tabsMediaItem
        );
        tabsContentItems = Array.from(tabsContentItems).filter(
          (item) => item.closest("[data-tabs]") === tabsMediaItem
        );
        tabsContentItems.forEach((tabsContentItem, index) => {
          if (matchMedia.matches) {
            tabsContent.append(tabsTitleItems[index]);
            tabsContent.append(tabsContentItem);
            tabsMediaItem.classList.add("_tab-spoller");
          } else {
            tabsTitles.append(tabsTitleItems[index]);
            tabsMediaItem.classList.remove("_tab-spoller");
          }
        });
      });
    }
    // Работа с контентом
    function initTabs(tabsBlock) {
      let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-titles]>*");
      let tabsContent = tabsBlock.querySelectorAll("[data-tabs-body]>*");
      const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
      const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

      if (tabsActiveHashBlock) {
        const tabsActiveTitle = tabsBlock.querySelector(
          "[data-tabs-titles]>._tab-active"
        );
        tabsActiveTitle
          ? tabsActiveTitle.classList.remove("_tab-active")
          : null;
      }
      if (tabsContent.length) {
        tabsContent = Array.from(tabsContent).filter(
          (item) => item.closest("[data-tabs]") === tabsBlock
        );
        tabsTitles = Array.from(tabsTitles).filter(
          (item) => item.closest("[data-tabs]") === tabsBlock
        );
        tabsContent.forEach((tabsContentItem, index) => {
          tabsTitles[index].setAttribute("data-tabs-title", "");
          tabsContentItem.setAttribute("data-tabs-item", "");

          if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
            tabsTitles[index].classList.add("_tab-active");
          }
          tabsContentItem.hidden =
            !tabsTitles[index].classList.contains("_tab-active");
        });
      }
    }
    function setTabsStatus(tabsBlock) {
      let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-title]");
      let tabsContent = tabsBlock.querySelectorAll("[data-tabs-item]");
      const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
      function isTabsAnamate(tabsBlock) {
        if (tabsBlock.hasAttribute("data-tabs-animate")) {
          return tabsBlock.dataset.tabsAnimate > 0
            ? Number(tabsBlock.dataset.tabsAnimate)
            : 500;
        }
      }
      const tabsBlockAnimate = isTabsAnamate(tabsBlock);
      if (tabsContent.length > 0) {
        const isHash = tabsBlock.hasAttribute("data-tabs-hash");
        tabsContent = Array.from(tabsContent).filter(
          (item) => item.closest("[data-tabs]") === tabsBlock
        );
        tabsTitles = Array.from(tabsTitles).filter(
          (item) => item.closest("[data-tabs]") === tabsBlock
        );
        tabsContent.forEach((tabsContentItem, index) => {
          if (tabsTitles[index].classList.contains("_tab-active")) {
            if (tabsBlockAnimate) {
              _slideDown(tabsContentItem, tabsBlockAnimate);
            } else {
              tabsContentItem.hidden = false;
            }
            if (isHash && !tabsContentItem.closest(".popup")) {
              setHash(`tab-${tabsBlockIndex}-${index}`);
            }
          } else {
            if (tabsBlockAnimate) {
              _slideUp(tabsContentItem, tabsBlockAnimate);
            } else {
              tabsContentItem.hidden = true;
            }
          }
        });
      }
    }
    function setTabsAction(e) {
      const el = e.target;
      if (el.closest("[data-tabs-title]")) {
        const tabTitle = el.closest("[data-tabs-title]");
        const tabsBlock = tabTitle.closest("[data-tabs]");
        if (
          !tabTitle.classList.contains("_tab-active") &&
          !tabsBlock.querySelector("._slide")
        ) {
          let tabActiveTitle = tabsBlock.querySelectorAll(
            "[data-tabs-title]._tab-active"
          );
          tabActiveTitle.length
            ? (tabActiveTitle = Array.from(tabActiveTitle).filter(
                (item) => item.closest("[data-tabs]") === tabsBlock
              ))
            : null;
          tabActiveTitle.length
            ? tabActiveTitle[0].classList.remove("_tab-active")
            : null;
          tabTitle.classList.add("_tab-active");
          setTabsStatus(tabsBlock);
        }
        e.preventDefault();
      }
    }
  }
  // Модуль работы с меню (бургер) =======================================================================================================================================================================================================================
  function menuInit() {
    let iconMenu = document.querySelector(".mobile-header__burger");
    if (iconMenu) {
      iconMenu.addEventListener("click", function (e) {
        if (bodyLockStatus) {
          if (document.querySelector(".contacts-open")) {
            document.documentElement.classList.add("menu-open");
            // bodyUnlock();
          } else {
            // bodyLockToggle();
            document.documentElement.classList.toggle("menu-open");
          }
        }
      });
      // document.querySelector('.menu__body').onmouseleave = menuClose;
    }
  }

  //------------------------------------------------------------------------------------------------------------

  function menuOpen() {
    bodyLock();
    document.documentElement.classList.add("menu-open");
  }
  function functions_menuClose() {
    bodyUnlock();
    document.documentElement.classList.remove("menu-open");
  }

  // Модуль "показать еще" =======================================================================================================================================================================================================================
  /*
Документация по работе в шаблоне:
data-showmore-media = "768,min"
data-showmore="size/items"
data-showmore-content="размер/кол-во"
data-showmore-button="скорость"
Сниппет (HTML): showmore
*/
  function showMore() {
    window.addEventListener("load", function (e) {
      const showMoreBlocks = document.querySelectorAll("[data-showmore]");
      let showMoreBlocksRegular;
      let mdQueriesArray;
      if (showMoreBlocks.length) {
        // Получение обычных объектов
        showMoreBlocksRegular = Array.from(showMoreBlocks).filter(function (
          item,
          index,
          self
        ) {
          return !item.dataset.showmoreMedia;
        });
        // Инициализация обычных объектов
        showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;

        document.addEventListener("click", showMoreActions);
        window.addEventListener("resize", showMoreActions);

        // Получение объектов с медиа запросами
        mdQueriesArray = dataMediaQueries(showMoreBlocks, "showmoreMedia");
        if (mdQueriesArray && mdQueriesArray.length) {
          mdQueriesArray.forEach((mdQueriesItem) => {
            // Событие
            mdQueriesItem.matchMedia.addEventListener("change", function () {
              initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            });
          });
          initItemsMedia(mdQueriesArray);
        }
      }
      function initItemsMedia(mdQueriesArray) {
        mdQueriesArray.forEach((mdQueriesItem) => {
          initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
      }
      function initItems(showMoreBlocks, matchMedia) {
        showMoreBlocks.forEach((showMoreBlock) => {
          initItem(showMoreBlock, matchMedia);
        });
      }
      function initItem(showMoreBlock, matchMedia = false) {
        showMoreBlock = matchMedia ? showMoreBlock.item : showMoreBlock;
        let showMoreContent = showMoreBlock.querySelectorAll(
          "[data-showmore-content]"
        );
        let showMoreButton = showMoreBlock.querySelectorAll(
          "[data-showmore-button]"
        );
        showMoreContent = Array.from(showMoreContent).filter(
          (item) => item.closest("[data-showmore]") === showMoreBlock
        )[0];
        showMoreButton = Array.from(showMoreButton).filter(
          (item) => item.closest("[data-showmore]") === showMoreBlock
        )[0];
        const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
        if (matchMedia.matches || !matchMedia) {
          if (hiddenHeight < getOriginalHeight(showMoreContent)) {
            _slideUp(showMoreContent, 0, hiddenHeight);
            showMoreButton.hidden = false;
          } else {
            _slideDown(showMoreContent, 0, hiddenHeight);
            showMoreButton.hidden = true;
          }
        } else {
          _slideDown(showMoreContent, 0, hiddenHeight);
          showMoreButton.hidden = true;
        }
      }
      function getHeight(showMoreBlock, showMoreContent) {
        let hiddenHeight = 0;
        const showMoreType = showMoreBlock.dataset.showmore
          ? showMoreBlock.dataset.showmore
          : "size";
        if (showMoreType === "items") {
          const showMoreTypeValue = showMoreContent.dataset.showmoreContent
            ? showMoreContent.dataset.showmoreContent
            : 3;
          const showMoreItems = showMoreContent.children;
          for (let index = 1; index < showMoreItems.length; index++) {
            const showMoreItem = showMoreItems[index - 1];
            hiddenHeight += showMoreItem.offsetHeight;
            if (index == showMoreTypeValue) break;
          }
        } else {
          const showMoreTypeValue = showMoreContent.dataset.showmoreContent
            ? showMoreContent.dataset.showmoreContent
            : 150;
          hiddenHeight = showMoreTypeValue;
        }
        return hiddenHeight;
      }
      function getOriginalHeight(showMoreContent) {
        let hiddenHeight = showMoreContent.offsetHeight;
        showMoreContent.style.removeProperty("height");
        let originalHeight = showMoreContent.offsetHeight;
        showMoreContent.style.height = `${hiddenHeight}px`;
        return originalHeight;
      }
      function showMoreActions(e) {
        const targetEvent = e.target;
        const targetType = e.type;
        if (targetType === "click") {
          if (targetEvent.closest("[data-showmore-button]")) {
            const showMoreButton = targetEvent.closest(
              "[data-showmore-button]"
            );
            const showMoreBlock = showMoreButton.closest("[data-showmore]");
            const showMoreContent = showMoreBlock.querySelector(
              "[data-showmore-content]"
            );
            const showMoreSpeed = showMoreBlock.dataset.showmoreButton
              ? showMoreBlock.dataset.showmoreButton
              : "500";
            const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
            if (!showMoreContent.classList.contains("_slide")) {
              showMoreBlock.classList.contains("_showmore-active")
                ? _slideUp(showMoreContent, showMoreSpeed, hiddenHeight)
                : _slideDown(showMoreContent, showMoreSpeed, hiddenHeight);
              showMoreBlock.classList.toggle("_showmore-active");
            }
          }
        } else if (targetType === "resize") {
          showMoreBlocksRegular && showMoreBlocksRegular.length
            ? initItems(showMoreBlocksRegular)
            : null;
          mdQueriesArray && mdQueriesArray.length
            ? initItemsMedia(mdQueriesArray)
            : null;
        }
      }
    });
  }
  //================================================================================================================================================================================================================================================================================================================
  // Прочие полезные функции ================================================================================================================================================================================================================================================================================================================
  //================================================================================================================================================================================================================================================================================================================

  // FLS (Full Logging System)
  function functions_FLS(message) {
    setTimeout(() => {
      if (window.FLS) {
        console.log(message);
      }
    }, 0);
  }
  // Получить цифры из строки
  function getDigFromString(item) {
    return parseInt(item.replace(/[^\d]/g, ""));
  }
  // Форматирование цифр типа 100 000 000
  function getDigFormat(item) {
    return item.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
  }
  // Убрать класс из всех элементов массива
  function removeClasses(array, className) {
    for (var i = 0; i < array.length; i++) {
      array[i].classList.remove(className);
    }
  }
  // Уникализация массива
  function uniqArray(array) {
    return array.filter(function (item, index, self) {
      return self.indexOf(item) === index;
    });
  }
  // Функция получения индекса внутри родителя
  function indexInParent(parent, element) {
    const array = Array.prototype.slice.call(parent.children);
    return Array.prototype.indexOf.call(array, element);
  }
  // Обработа медиа запросов из атрибутов
  function dataMediaQueries(array, dataSetValue) {
    // Получение объектов с медиа запросами
    const media = Array.from(array).filter(function (item, index, self) {
      if (item.dataset[dataSetValue]) {
        return item.dataset[dataSetValue].split(",")[0];
      }
    });
    // Инициализация объектов с медиа запросами
    if (media.length) {
      const breakpointsArray = [];
      media.forEach((item) => {
        const params = item.dataset[dataSetValue];
        const breakpoint = {};
        const paramsArray = params.split(",");
        breakpoint.value = paramsArray[0];
        breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
        breakpoint.item = item;
        breakpointsArray.push(breakpoint);
      });
      // Получаем уникальные брейкпоинты
      let mdQueries = breakpointsArray.map(function (item) {
        return (
          "(" +
          item.type +
          "-width: " +
          item.value +
          "px)," +
          item.value +
          "," +
          item.type
        );
      });
      mdQueries = uniqArray(mdQueries);
      const mdQueriesArray = [];

      if (mdQueries.length) {
        // Работаем с каждым брейкпоинтом
        mdQueries.forEach((breakpoint) => {
          const paramsArray = breakpoint.split(",");
          const mediaBreakpoint = paramsArray[1];
          const mediaType = paramsArray[2];
          const matchMedia = window.matchMedia(paramsArray[0]);
          // Объекты с нужными условиями
          const itemsArray = breakpointsArray.filter(function (item) {
            if (item.value === mediaBreakpoint && item.type === mediaType) {
              return true;
            }
          });
          mdQueriesArray.push({
            itemsArray,
            matchMedia,
          });
        });
        return mdQueriesArray;
      }
    }
  } // CONCATENATED MODULE: ./node_modules/ssr-window/ssr-window.esm.js
  //================================================================================================================================================================================================================================================================================================================
  /**
   * SSR Window 4.0.2
   * Better handling for window object in SSR environment
   * https://github.com/nolimits4web/ssr-window
   *
   * Copyright 2021, Vladimir Kharlampidi
   *
   * Licensed under MIT
   *
   * Released on: December 13, 2021
   */
  /* eslint-disable no-param-reassign */
  function ssr_window_esm_isObject(obj) {
    return (
      obj !== null &&
      typeof obj === "object" &&
      "constructor" in obj &&
      obj.constructor === Object
    );
  }
  function extend(target = {}, src = {}) {
    Object.keys(src).forEach((key) => {
      if (typeof target[key] === "undefined") target[key] = src[key];
      else if (
        ssr_window_esm_isObject(src[key]) &&
        ssr_window_esm_isObject(target[key]) &&
        Object.keys(src[key]).length > 0
      ) {
        extend(target[key], src[key]);
      }
    });
  }

  const ssrDocument = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: {
      blur() {},
      nodeName: "",
    },
    querySelector() {
      return null;
    },
    querySelectorAll() {
      return [];
    },
    getElementById() {
      return null;
    },
    createEvent() {
      return {
        initEvent() {},
      };
    },
    createElement() {
      return {
        children: [],
        childNodes: [],
        style: {},
        setAttribute() {},
        getElementsByTagName() {
          return [];
        },
      };
    },
    createElementNS() {
      return {};
    },
    importNode() {
      return null;
    },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
  };
  function ssr_window_esm_getDocument() {
    const doc = typeof document !== "undefined" ? document : {};
    extend(doc, ssrDocument);
    return doc;
  }

  const ssrWindow = {
    document: ssrDocument,
    navigator: {
      userAgent: "",
    },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
    history: {
      replaceState() {},
      pushState() {},
      go() {},
      back() {},
    },
    CustomEvent: function CustomEvent() {
      return this;
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle() {
      return {
        getPropertyValue() {
          return "";
        },
      };
    },
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia() {
      return {};
    },
    requestAnimationFrame(callback) {
      if (typeof setTimeout === "undefined") {
        callback();
        return null;
      }
      return setTimeout(callback, 0);
    },
    cancelAnimationFrame(id) {
      if (typeof setTimeout === "undefined") {
        return;
      }
      clearTimeout(id);
    },
  };
  function ssr_window_esm_getWindow() {
    const win = typeof window !== "undefined" ? window : {};
    extend(win, ssrWindow);
    return win;
  } // CONCATENATED MODULE: ./node_modules/dom7/dom7.esm.js

  /**
   * Dom7 4.0.4
   * Minimalistic JavaScript library for DOM manipulation, with a jQuery-compatible API
   * https://framework7.io/docs/dom7.html
   *
   * Copyright 2022, Vladimir Kharlampidi
   *
   * Licensed under MIT
   *
   * Released on: January 11, 2022
   */

  /* eslint-disable no-proto */
  function makeReactive(obj) {
    const proto = obj.__proto__;
    Object.defineProperty(obj, "__proto__", {
      get() {
        return proto;
      },

      set(value) {
        proto.__proto__ = value;
      },
    });
  }

  class Dom7 extends Array {
    constructor(items) {
      if (typeof items === "number") {
        super(items);
      } else {
        super(...(items || []));
        makeReactive(this);
      }
    }
  }

  function arrayFlat(arr = []) {
    const res = [];
    arr.forEach((el) => {
      if (Array.isArray(el)) {
        res.push(...arrayFlat(el));
      } else {
        res.push(el);
      }
    });
    return res;
  }
  function arrayFilter(arr, callback) {
    return Array.prototype.filter.call(arr, callback);
  }
  function arrayUnique(arr) {
    const uniqueArray = [];

    for (let i = 0; i < arr.length; i += 1) {
      if (uniqueArray.indexOf(arr[i]) === -1) uniqueArray.push(arr[i]);
    }

    return uniqueArray;
  }
  function toCamelCase(string) {
    return string
      .toLowerCase()
      .replace(/-(.)/g, (match, group) => group.toUpperCase());
  }

  // eslint-disable-next-line

  function qsa(selector, context) {
    if (typeof selector !== "string") {
      return [selector];
    }

    const a = [];
    const res = context.querySelectorAll(selector);

    for (let i = 0; i < res.length; i += 1) {
      a.push(res[i]);
    }

    return a;
  }

  function dom7_esm_$(selector, context) {
    const window = ssr_window_esm_getWindow();
    const document = ssr_window_esm_getDocument();
    let arr = [];

    if (!context && selector instanceof Dom7) {
      return selector;
    }

    if (!selector) {
      return new Dom7(arr);
    }

    if (typeof selector === "string") {
      const html = selector.trim();

      if (html.indexOf("<") >= 0 && html.indexOf(">") >= 0) {
        let toCreate = "div";
        if (html.indexOf("<li") === 0) toCreate = "ul";
        if (html.indexOf("<tr") === 0) toCreate = "tbody";
        if (html.indexOf("<td") === 0 || html.indexOf("<th") === 0)
          toCreate = "tr";
        if (html.indexOf("<tbody") === 0) toCreate = "table";
        if (html.indexOf("<option") === 0) toCreate = "select";
        const tempParent = document.createElement(toCreate);
        tempParent.innerHTML = html;

        for (let i = 0; i < tempParent.childNodes.length; i += 1) {
          arr.push(tempParent.childNodes[i]);
        }
      } else {
        arr = qsa(selector.trim(), context || document);
      } // arr = qsa(selector, document);
    } else if (
      selector.nodeType ||
      selector === window ||
      selector === document
    ) {
      arr.push(selector);
    } else if (Array.isArray(selector)) {
      if (selector instanceof Dom7) return selector;
      arr = selector;
    }

    return new Dom7(arrayUnique(arr));
  }

  dom7_esm_$.fn = Dom7.prototype;

  // eslint-disable-next-line

  function addClass(...classes) {
    const classNames = arrayFlat(classes.map((c) => c.split(" ")));
    this.forEach((el) => {
      el.classList.add(...classNames);
    });
    return this;
  }

  function removeClass(...classes) {
    const classNames = arrayFlat(classes.map((c) => c.split(" ")));
    this.forEach((el) => {
      el.classList.remove(...classNames);
    });
    return this;
  }

  function toggleClass(...classes) {
    const classNames = arrayFlat(classes.map((c) => c.split(" ")));
    this.forEach((el) => {
      classNames.forEach((className) => {
        el.classList.toggle(className);
      });
    });
  }

  function hasClass(...classes) {
    const classNames = arrayFlat(classes.map((c) => c.split(" ")));
    return (
      arrayFilter(this, (el) => {
        return (
          classNames.filter((className) => el.classList.contains(className))
            .length > 0
        );
      }).length > 0
    );
  }

  function attr(attrs, value) {
    if (arguments.length === 1 && typeof attrs === "string") {
      // Get attr
      if (this[0]) return this[0].getAttribute(attrs);
      return undefined;
    } // Set attrs

    for (let i = 0; i < this.length; i += 1) {
      if (arguments.length === 2) {
        // String
        this[i].setAttribute(attrs, value);
      } else {
        // Object
        for (const attrName in attrs) {
          this[i][attrName] = attrs[attrName];
          this[i].setAttribute(attrName, attrs[attrName]);
        }
      }
    }

    return this;
  }

  function removeAttr(attr) {
    for (let i = 0; i < this.length; i += 1) {
      this[i].removeAttribute(attr);
    }

    return this;
  }

  function prop(props, value) {
    if (arguments.length === 1 && typeof props === "string") {
      // Get prop
      if (this[0]) return this[0][props];
    } else {
      // Set props
      for (let i = 0; i < this.length; i += 1) {
        if (arguments.length === 2) {
          // String
          this[i][props] = value;
        } else {
          // Object
          for (const propName in props) {
            this[i][propName] = props[propName];
          }
        }
      }

      return this;
    }

    return this;
  }

  function data(key, value) {
    let el;

    if (typeof value === "undefined") {
      el = this[0];
      if (!el) return undefined; // Get value

      if (el.dom7ElementDataStorage && key in el.dom7ElementDataStorage) {
        return el.dom7ElementDataStorage[key];
      }

      const dataKey = el.getAttribute(`data-${key}`);

      if (dataKey) {
        return dataKey;
      }

      return undefined;
    } // Set value

    for (let i = 0; i < this.length; i += 1) {
      el = this[i];
      if (!el.dom7ElementDataStorage) el.dom7ElementDataStorage = {};
      el.dom7ElementDataStorage[key] = value;
    }

    return this;
  }

  function removeData(key) {
    for (let i = 0; i < this.length; i += 1) {
      const el = this[i];

      if (el.dom7ElementDataStorage && el.dom7ElementDataStorage[key]) {
        el.dom7ElementDataStorage[key] = null;
        delete el.dom7ElementDataStorage[key];
      }
    }
  }

  function dataset() {
    const el = this[0];
    if (!el) return undefined;
    const dataset = {}; // eslint-disable-line

    if (el.dataset) {
      for (const dataKey in el.dataset) {
        dataset[dataKey] = el.dataset[dataKey];
      }
    } else {
      for (let i = 0; i < el.attributes.length; i += 1) {
        const attr = el.attributes[i];

        if (attr.name.indexOf("data-") >= 0) {
          dataset[toCamelCase(attr.name.split("data-")[1])] = attr.value;
        }
      }
    }

    for (const key in dataset) {
      if (dataset[key] === "false") dataset[key] = false;
      else if (dataset[key] === "true") dataset[key] = true;
      else if (parseFloat(dataset[key]) === dataset[key] * 1) dataset[key] *= 1;
    }

    return dataset;
  }

  function val(value) {
    if (typeof value === "undefined") {
      // get value
      const el = this[0];
      if (!el) return undefined;

      if (el.multiple && el.nodeName.toLowerCase() === "select") {
        const values = [];

        for (let i = 0; i < el.selectedOptions.length; i += 1) {
          values.push(el.selectedOptions[i].value);
        }

        return values;
      }

      return el.value;
    } // set value

    for (let i = 0; i < this.length; i += 1) {
      const el = this[i];

      if (
        Array.isArray(value) &&
        el.multiple &&
        el.nodeName.toLowerCase() === "select"
      ) {
        for (let j = 0; j < el.options.length; j += 1) {
          el.options[j].selected = value.indexOf(el.options[j].value) >= 0;
        }
      } else {
        el.value = value;
      }
    }

    return this;
  }

  function value(value) {
    return this.val(value);
  }

  function transform(transform) {
    for (let i = 0; i < this.length; i += 1) {
      this[i].style.transform = transform;
    }

    return this;
  }

  function transition(duration) {
    for (let i = 0; i < this.length; i += 1) {
      this[i].style.transitionDuration =
        typeof duration !== "string" ? `${duration}ms` : duration;
    }

    return this;
  }

  function on(...args) {
    let [eventType, targetSelector, listener, capture] = args;

    if (typeof args[1] === "function") {
      [eventType, listener, capture] = args;
      targetSelector = undefined;
    }

    if (!capture) capture = false;

    function handleLiveEvent(e) {
      const target = e.target;
      if (!target) return;
      const eventData = e.target.dom7EventData || [];

      if (eventData.indexOf(e) < 0) {
        eventData.unshift(e);
      }

      if (dom7_esm_$(target).is(targetSelector))
        listener.apply(target, eventData);
      else {
        const parents = dom7_esm_$(target).parents(); // eslint-disable-line

        for (let k = 0; k < parents.length; k += 1) {
          if (dom7_esm_$(parents[k]).is(targetSelector))
            listener.apply(parents[k], eventData);
        }
      }
    }

    function handleEvent(e) {
      const eventData = e && e.target ? e.target.dom7EventData || [] : [];

      if (eventData.indexOf(e) < 0) {
        eventData.unshift(e);
      }

      listener.apply(this, eventData);
    }

    const events = eventType.split(" ");
    let j;

    for (let i = 0; i < this.length; i += 1) {
      const el = this[i];

      if (!targetSelector) {
        for (j = 0; j < events.length; j += 1) {
          const event = events[j];
          if (!el.dom7Listeners) el.dom7Listeners = {};
          if (!el.dom7Listeners[event]) el.dom7Listeners[event] = [];
          el.dom7Listeners[event].push({
            listener,
            proxyListener: handleEvent,
          });
          el.addEventListener(event, handleEvent, capture);
        }
      } else {
        // Live events
        for (j = 0; j < events.length; j += 1) {
          const event = events[j];
          if (!el.dom7LiveListeners) el.dom7LiveListeners = {};
          if (!el.dom7LiveListeners[event]) el.dom7LiveListeners[event] = [];
          el.dom7LiveListeners[event].push({
            listener,
            proxyListener: handleLiveEvent,
          });
          el.addEventListener(event, handleLiveEvent, capture);
        }
      }
    }

    return this;
  }

  function off(...args) {
    let [eventType, targetSelector, listener, capture] = args;

    if (typeof args[1] === "function") {
      [eventType, listener, capture] = args;
      targetSelector = undefined;
    }

    if (!capture) capture = false;
    const events = eventType.split(" ");

    for (let i = 0; i < events.length; i += 1) {
      const event = events[i];

      for (let j = 0; j < this.length; j += 1) {
        const el = this[j];
        let handlers;

        if (!targetSelector && el.dom7Listeners) {
          handlers = el.dom7Listeners[event];
        } else if (targetSelector && el.dom7LiveListeners) {
          handlers = el.dom7LiveListeners[event];
        }

        if (handlers && handlers.length) {
          for (let k = handlers.length - 1; k >= 0; k -= 1) {
            const handler = handlers[k];

            if (listener && handler.listener === listener) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            } else if (
              listener &&
              handler.listener &&
              handler.listener.dom7proxy &&
              handler.listener.dom7proxy === listener
            ) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            } else if (!listener) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            }
          }
        }
      }
    }

    return this;
  }

  function once(...args) {
    const dom = this;
    let [eventName, targetSelector, listener, capture] = args;

    if (typeof args[1] === "function") {
      [eventName, listener, capture] = args;
      targetSelector = undefined;
    }

    function onceHandler(...eventArgs) {
      listener.apply(this, eventArgs);
      dom.off(eventName, targetSelector, onceHandler, capture);

      if (onceHandler.dom7proxy) {
        delete onceHandler.dom7proxy;
      }
    }

    onceHandler.dom7proxy = listener;
    return dom.on(eventName, targetSelector, onceHandler, capture);
  }

  function trigger(...args) {
    const window = ssr_window_esm_getWindow();
    const events = args[0].split(" ");
    const eventData = args[1];

    for (let i = 0; i < events.length; i += 1) {
      const event = events[i];

      for (let j = 0; j < this.length; j += 1) {
        const el = this[j];

        if (window.CustomEvent) {
          const evt = new window.CustomEvent(event, {
            detail: eventData,
            bubbles: true,
            cancelable: true,
          });
          el.dom7EventData = args.filter((data, dataIndex) => dataIndex > 0);
          el.dispatchEvent(evt);
          el.dom7EventData = [];
          delete el.dom7EventData;
        }
      }
    }

    return this;
  }

  function transitionEnd(callback) {
    const dom = this;

    function fireCallBack(e) {
      if (e.target !== this) return;
      callback.call(this, e);
      dom.off("transitionend", fireCallBack);
    }

    if (callback) {
      dom.on("transitionend", fireCallBack);
    }

    return this;
  }

  function animationEnd(callback) {
    const dom = this;

    function fireCallBack(e) {
      if (e.target !== this) return;
      callback.call(this, e);
      dom.off("animationend", fireCallBack);
    }

    if (callback) {
      dom.on("animationend", fireCallBack);
    }

    return this;
  }

  function width() {
    const window = getWindow();

    if (this[0] === window) {
      return window.innerWidth;
    }

    if (this.length > 0) {
      return parseFloat(this.css("width"));
    }

    return null;
  }

  function dom7_esm_outerWidth(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        const styles = this.styles();
        return (
          this[0].offsetWidth +
          parseFloat(styles.getPropertyValue("margin-right")) +
          parseFloat(styles.getPropertyValue("margin-left"))
        );
      }

      return this[0].offsetWidth;
    }

    return null;
  }

  function height() {
    const window = getWindow();

    if (this[0] === window) {
      return window.innerHeight;
    }

    if (this.length > 0) {
      return parseFloat(this.css("height"));
    }

    return null;
  }

  function dom7_esm_outerHeight(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        const styles = this.styles();
        return (
          this[0].offsetHeight +
          parseFloat(styles.getPropertyValue("margin-top")) +
          parseFloat(styles.getPropertyValue("margin-bottom"))
        );
      }

      return this[0].offsetHeight;
    }

    return null;
  }

  function offset() {
    if (this.length > 0) {
      const window = ssr_window_esm_getWindow();
      const document = ssr_window_esm_getDocument();
      const el = this[0];
      const box = el.getBoundingClientRect();
      const body = document.body;
      const clientTop = el.clientTop || body.clientTop || 0;
      const clientLeft = el.clientLeft || body.clientLeft || 0;
      const scrollTop = el === window ? window.scrollY : el.scrollTop;
      const scrollLeft = el === window ? window.scrollX : el.scrollLeft;
      return {
        top: box.top + scrollTop - clientTop,
        left: box.left + scrollLeft - clientLeft,
      };
    }

    return null;
  }

  function hide() {
    for (let i = 0; i < this.length; i += 1) {
      this[i].style.display = "none";
    }

    return this;
  }

  function show() {
    const window = getWindow();

    for (let i = 0; i < this.length; i += 1) {
      const el = this[i];

      if (el.style.display === "none") {
        el.style.display = "";
      }

      if (
        window.getComputedStyle(el, null).getPropertyValue("display") === "none"
      ) {
        // Still not visible
        el.style.display = "block";
      }
    }

    return this;
  }

  function styles() {
    const window = ssr_window_esm_getWindow();
    if (this[0]) return window.getComputedStyle(this[0], null);
    return {};
  }

  function css(props, value) {
    const window = ssr_window_esm_getWindow();
    let i;

    if (arguments.length === 1) {
      if (typeof props === "string") {
        // .css('width')
        if (this[0])
          return window.getComputedStyle(this[0], null).getPropertyValue(props);
      } else {
        // .css({ width: '100px' })
        for (i = 0; i < this.length; i += 1) {
          for (const prop in props) {
            this[i].style[prop] = props[prop];
          }
        }

        return this;
      }
    }

    if (arguments.length === 2 && typeof props === "string") {
      // .css('width', '100px')
      for (i = 0; i < this.length; i += 1) {
        this[i].style[props] = value;
      }

      return this;
    }

    return this;
  }

  function each(callback) {
    if (!callback) return this;
    this.forEach((el, index) => {
      callback.apply(el, [el, index]);
    });
    return this;
  }

  function filter(callback) {
    const result = arrayFilter(this, callback);
    return dom7_esm_$(result);
  }

  function html(html) {
    if (typeof html === "undefined") {
      return this[0] ? this[0].innerHTML : null;
    }

    for (let i = 0; i < this.length; i += 1) {
      this[i].innerHTML = html;
    }

    return this;
  }

  function dom7_esm_text(text) {
    if (typeof text === "undefined") {
      return this[0] ? this[0].textContent.trim() : null;
    }

    for (let i = 0; i < this.length; i += 1) {
      this[i].textContent = text;
    }

    return this;
  }

  function is(selector) {
    const window = ssr_window_esm_getWindow();
    const document = ssr_window_esm_getDocument();
    const el = this[0];
    let compareWith;
    let i;
    if (!el || typeof selector === "undefined") return false;

    if (typeof selector === "string") {
      if (el.matches) return el.matches(selector);
      if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
      if (el.msMatchesSelector) return el.msMatchesSelector(selector);
      compareWith = dom7_esm_$(selector);

      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) return true;
      }

      return false;
    }

    if (selector === document) {
      return el === document;
    }

    if (selector === window) {
      return el === window;
    }

    if (selector.nodeType || selector instanceof Dom7) {
      compareWith = selector.nodeType ? [selector] : selector;

      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) return true;
      }

      return false;
    }

    return false;
  }

  function index() {
    let child = this[0];
    let i;

    if (child) {
      i = 0; // eslint-disable-next-line

      while ((child = child.previousSibling) !== null) {
        if (child.nodeType === 1) i += 1;
      }

      return i;
    }

    return undefined;
  }

  function eq(index) {
    if (typeof index === "undefined") return this;
    const length = this.length;

    if (index > length - 1) {
      return dom7_esm_$([]);
    }

    if (index < 0) {
      const returnIndex = length + index;
      if (returnIndex < 0) return dom7_esm_$([]);
      return dom7_esm_$([this[returnIndex]]);
    }

    return dom7_esm_$([this[index]]);
  }

  function append(...els) {
    let newChild;
    const document = ssr_window_esm_getDocument();

    for (let k = 0; k < els.length; k += 1) {
      newChild = els[k];

      for (let i = 0; i < this.length; i += 1) {
        if (typeof newChild === "string") {
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = newChild;

          while (tempDiv.firstChild) {
            this[i].appendChild(tempDiv.firstChild);
          }
        } else if (newChild instanceof Dom7) {
          for (let j = 0; j < newChild.length; j += 1) {
            this[i].appendChild(newChild[j]);
          }
        } else {
          this[i].appendChild(newChild);
        }
      }
    }

    return this;
  }

  function appendTo(parent) {
    dom7_esm_$(parent).append(this);
    return this;
  }

  function prepend(newChild) {
    const document = ssr_window_esm_getDocument();
    let i;
    let j;

    for (i = 0; i < this.length; i += 1) {
      if (typeof newChild === "string") {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = newChild;

        for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
          this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
        }
      } else if (newChild instanceof Dom7) {
        for (j = 0; j < newChild.length; j += 1) {
          this[i].insertBefore(newChild[j], this[i].childNodes[0]);
        }
      } else {
        this[i].insertBefore(newChild, this[i].childNodes[0]);
      }
    }

    return this;
  }

  function prependTo(parent) {
    dom7_esm_$(parent).prepend(this);
    return this;
  }

  function insertBefore(selector) {
    const before = dom7_esm_$(selector);

    for (let i = 0; i < this.length; i += 1) {
      if (before.length === 1) {
        before[0].parentNode.insertBefore(this[i], before[0]);
      } else if (before.length > 1) {
        for (let j = 0; j < before.length; j += 1) {
          before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
        }
      }
    }
  }

  function insertAfter(selector) {
    const after = dom7_esm_$(selector);

    for (let i = 0; i < this.length; i += 1) {
      if (after.length === 1) {
        after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
      } else if (after.length > 1) {
        for (let j = 0; j < after.length; j += 1) {
          after[j].parentNode.insertBefore(
            this[i].cloneNode(true),
            after[j].nextSibling
          );
        }
      }
    }
  }

  function next(selector) {
    if (this.length > 0) {
      if (selector) {
        if (
          this[0].nextElementSibling &&
          dom7_esm_$(this[0].nextElementSibling).is(selector)
        ) {
          return dom7_esm_$([this[0].nextElementSibling]);
        }

        return dom7_esm_$([]);
      }

      if (this[0].nextElementSibling)
        return dom7_esm_$([this[0].nextElementSibling]);
      return dom7_esm_$([]);
    }

    return dom7_esm_$([]);
  }

  function nextAll(selector) {
    const nextEls = [];
    let el = this[0];
    if (!el) return dom7_esm_$([]);

    while (el.nextElementSibling) {
      const next = el.nextElementSibling; // eslint-disable-line

      if (selector) {
        if (dom7_esm_$(next).is(selector)) nextEls.push(next);
      } else nextEls.push(next);

      el = next;
    }

    return dom7_esm_$(nextEls);
  }

  function prev(selector) {
    if (this.length > 0) {
      const el = this[0];

      if (selector) {
        if (
          el.previousElementSibling &&
          dom7_esm_$(el.previousElementSibling).is(selector)
        ) {
          return dom7_esm_$([el.previousElementSibling]);
        }

        return dom7_esm_$([]);
      }

      if (el.previousElementSibling)
        return dom7_esm_$([el.previousElementSibling]);
      return dom7_esm_$([]);
    }

    return dom7_esm_$([]);
  }

  function prevAll(selector) {
    const prevEls = [];
    let el = this[0];
    if (!el) return dom7_esm_$([]);

    while (el.previousElementSibling) {
      const prev = el.previousElementSibling; // eslint-disable-line

      if (selector) {
        if (dom7_esm_$(prev).is(selector)) prevEls.push(prev);
      } else prevEls.push(prev);

      el = prev;
    }

    return dom7_esm_$(prevEls);
  }

  function siblings(selector) {
    return this.nextAll(selector).add(this.prevAll(selector));
  }

  function dom7_esm_parent(selector) {
    const parents = []; // eslint-disable-line

    for (let i = 0; i < this.length; i += 1) {
      if (this[i].parentNode !== null) {
        if (selector) {
          if (dom7_esm_$(this[i].parentNode).is(selector))
            parents.push(this[i].parentNode);
        } else {
          parents.push(this[i].parentNode);
        }
      }
    }

    return dom7_esm_$(parents);
  }

  function parents(selector) {
    const parents = []; // eslint-disable-line

    for (let i = 0; i < this.length; i += 1) {
      let parent = this[i].parentNode; // eslint-disable-line

      while (parent) {
        if (selector) {
          if (dom7_esm_$(parent).is(selector)) parents.push(parent);
        } else {
          parents.push(parent);
        }

        parent = parent.parentNode;
      }
    }

    return dom7_esm_$(parents);
  }

  function closest(selector) {
    let closest = this; // eslint-disable-line

    if (typeof selector === "undefined") {
      return dom7_esm_$([]);
    }

    if (!closest.is(selector)) {
      closest = closest.parents(selector).eq(0);
    }

    return closest;
  }

  function find(selector) {
    const foundElements = [];

    for (let i = 0; i < this.length; i += 1) {
      const found = this[i].querySelectorAll(selector);

      for (let j = 0; j < found.length; j += 1) {
        foundElements.push(found[j]);
      }
    }

    return dom7_esm_$(foundElements);
  }

  function children(selector) {
    const children = []; // eslint-disable-line

    for (let i = 0; i < this.length; i += 1) {
      const childNodes = this[i].children;

      for (let j = 0; j < childNodes.length; j += 1) {
        if (!selector || dom7_esm_$(childNodes[j]).is(selector)) {
          children.push(childNodes[j]);
        }
      }
    }

    return dom7_esm_$(children);
  }

  function remove() {
    for (let i = 0; i < this.length; i += 1) {
      if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
    }

    return this;
  }

  function detach() {
    return this.remove();
  }

  function add(...els) {
    const dom = this;
    let i;
    let j;

    for (i = 0; i < els.length; i += 1) {
      const toAdd = dom7_esm_$(els[i]);

      for (j = 0; j < toAdd.length; j += 1) {
        dom.push(toAdd[j]);
      }
    }

    return dom;
  }

  function empty() {
    for (let i = 0; i < this.length; i += 1) {
      const el = this[i];

      if (el.nodeType === 1) {
        for (let j = 0; j < el.childNodes.length; j += 1) {
          if (el.childNodes[j].parentNode) {
            el.childNodes[j].parentNode.removeChild(el.childNodes[j]);
          }
        }

        el.textContent = "";
      }
    }

    return this;
  }

  // eslint-disable-next-line

  function scrollTo(...args) {
    const window = getWindow();
    let [left, top, duration, easing, callback] = args;

    if (args.length === 4 && typeof easing === "function") {
      callback = easing;
      [left, top, duration, callback, easing] = args;
    }

    if (typeof easing === "undefined") easing = "swing";
    return this.each(function animate() {
      const el = this;
      let currentTop;
      let currentLeft;
      let maxTop;
      let maxLeft;
      let newTop;
      let newLeft;
      let scrollTop; // eslint-disable-line

      let scrollLeft; // eslint-disable-line

      let animateTop = top > 0 || top === 0;
      let animateLeft = left > 0 || left === 0;

      if (typeof easing === "undefined") {
        easing = "swing";
      }

      if (animateTop) {
        currentTop = el.scrollTop;

        if (!duration) {
          el.scrollTop = top;
        }
      }

      if (animateLeft) {
        currentLeft = el.scrollLeft;

        if (!duration) {
          el.scrollLeft = left;
        }
      }

      if (!duration) return;

      if (animateTop) {
        maxTop = el.scrollHeight - el.offsetHeight;
        newTop = Math.max(Math.min(top, maxTop), 0);
      }

      if (animateLeft) {
        maxLeft = el.scrollWidth - el.offsetWidth;
        newLeft = Math.max(Math.min(left, maxLeft), 0);
      }

      let startTime = null;
      if (animateTop && newTop === currentTop) animateTop = false;
      if (animateLeft && newLeft === currentLeft) animateLeft = false;

      function render(time = new Date().getTime()) {
        if (startTime === null) {
          startTime = time;
        }

        const progress = Math.max(
          Math.min((time - startTime) / duration, 1),
          0
        );
        const easeProgress =
          easing === "linear"
            ? progress
            : 0.5 - Math.cos(progress * Math.PI) / 2;
        let done;
        if (animateTop)
          scrollTop = currentTop + easeProgress * (newTop - currentTop);
        if (animateLeft)
          scrollLeft = currentLeft + easeProgress * (newLeft - currentLeft);

        if (animateTop && newTop > currentTop && scrollTop >= newTop) {
          el.scrollTop = newTop;
          done = true;
        }

        if (animateTop && newTop < currentTop && scrollTop <= newTop) {
          el.scrollTop = newTop;
          done = true;
        }

        if (animateLeft && newLeft > currentLeft && scrollLeft >= newLeft) {
          el.scrollLeft = newLeft;
          done = true;
        }

        if (animateLeft && newLeft < currentLeft && scrollLeft <= newLeft) {
          el.scrollLeft = newLeft;
          done = true;
        }

        if (done) {
          if (callback) callback();
          return;
        }

        if (animateTop) el.scrollTop = scrollTop;
        if (animateLeft) el.scrollLeft = scrollLeft;
        window.requestAnimationFrame(render);
      }

      window.requestAnimationFrame(render);
    });
  } // scrollTop(top, duration, easing, callback) {

  function scrollTop(...args) {
    let [top, duration, easing, callback] = args;

    if (args.length === 3 && typeof easing === "function") {
      [top, duration, callback, easing] = args;
    }

    const dom = this;

    if (typeof top === "undefined") {
      if (dom.length > 0) return dom[0].scrollTop;
      return null;
    }

    return dom.scrollTo(undefined, top, duration, easing, callback);
  }

  function scrollLeft(...args) {
    let [left, duration, easing, callback] = args;

    if (args.length === 3 && typeof easing === "function") {
      [left, duration, callback, easing] = args;
    }

    const dom = this;

    if (typeof left === "undefined") {
      if (dom.length > 0) return dom[0].scrollLeft;
      return null;
    }

    return dom.scrollTo(left, undefined, duration, easing, callback);
  }

  // eslint-disable-next-line

  function animate(initialProps, initialParams) {
    const window = getWindow();
    const els = this;
    const a = {
      props: Object.assign({}, initialProps),
      params: Object.assign(
        {
          duration: 300,
          easing: "swing", // or 'linear'

          /* Callbacks
      begin(elements)
      complete(elements)
      progress(elements, complete, remaining, start, tweenValue)
      */
        },
        initialParams
      ),
      elements: els,
      animating: false,
      que: [],

      easingProgress(easing, progress) {
        if (easing === "swing") {
          return 0.5 - Math.cos(progress * Math.PI) / 2;
        }

        if (typeof easing === "function") {
          return easing(progress);
        }

        return progress;
      },

      stop() {
        if (a.frameId) {
          window.cancelAnimationFrame(a.frameId);
        }

        a.animating = false;
        a.elements.each((el) => {
          const element = el;
          delete element.dom7AnimateInstance;
        });
        a.que = [];
      },

      done(complete) {
        a.animating = false;
        a.elements.each((el) => {
          const element = el;
          delete element.dom7AnimateInstance;
        });
        if (complete) complete(els);

        if (a.que.length > 0) {
          const que = a.que.shift();
          a.animate(que[0], que[1]);
        }
      },

      animate(props, params) {
        if (a.animating) {
          a.que.push([props, params]);
          return a;
        }

        const elements = []; // Define & Cache Initials & Units

        a.elements.each((el, index) => {
          let initialFullValue;
          let initialValue;
          let unit;
          let finalValue;
          let finalFullValue;
          if (!el.dom7AnimateInstance)
            a.elements[index].dom7AnimateInstance = a;
          elements[index] = {
            container: el,
          };
          Object.keys(props).forEach((prop) => {
            initialFullValue = window
              .getComputedStyle(el, null)
              .getPropertyValue(prop)
              .replace(",", ".");
            initialValue = parseFloat(initialFullValue);
            unit = initialFullValue.replace(initialValue, "");
            finalValue = parseFloat(props[prop]);
            finalFullValue = props[prop] + unit;
            elements[index][prop] = {
              initialFullValue,
              initialValue,
              unit,
              finalValue,
              finalFullValue,
              currentValue: initialValue,
            };
          });
        });
        let startTime = null;
        let time;
        let elementsDone = 0;
        let propsDone = 0;
        let done;
        let began = false;
        a.animating = true;

        function render() {
          time = new Date().getTime();
          let progress;
          let easeProgress; // let el;

          if (!began) {
            began = true;
            if (params.begin) params.begin(els);
          }

          if (startTime === null) {
            startTime = time;
          }

          if (params.progress) {
            // eslint-disable-next-line
            params.progress(
              els,
              Math.max(Math.min((time - startTime) / params.duration, 1), 0),
              startTime + params.duration - time < 0
                ? 0
                : startTime + params.duration - time,
              startTime
            );
          }

          elements.forEach((element) => {
            const el = element;
            if (done || el.done) return;
            Object.keys(props).forEach((prop) => {
              if (done || el.done) return;
              progress = Math.max(
                Math.min((time - startTime) / params.duration, 1),
                0
              );
              easeProgress = a.easingProgress(params.easing, progress);
              const { initialValue, finalValue, unit } = el[prop];
              el[prop].currentValue =
                initialValue + easeProgress * (finalValue - initialValue);
              const currentValue = el[prop].currentValue;

              if (
                (finalValue > initialValue && currentValue >= finalValue) ||
                (finalValue < initialValue && currentValue <= finalValue)
              ) {
                el.container.style[prop] = finalValue + unit;
                propsDone += 1;

                if (propsDone === Object.keys(props).length) {
                  el.done = true;
                  elementsDone += 1;
                }

                if (elementsDone === elements.length) {
                  done = true;
                }
              }

              if (done) {
                a.done(params.complete);
                return;
              }

              el.container.style[prop] = currentValue + unit;
            });
          });
          if (done) return; // Then call

          a.frameId = window.requestAnimationFrame(render);
        }

        a.frameId = window.requestAnimationFrame(render);
        return a;
      },
    };

    if (a.elements.length === 0) {
      return els;
    }

    let animateInstance;

    for (let i = 0; i < a.elements.length; i += 1) {
      if (a.elements[i].dom7AnimateInstance) {
        animateInstance = a.elements[i].dom7AnimateInstance;
      } else a.elements[i].dom7AnimateInstance = a;
    }

    if (!animateInstance) {
      animateInstance = a;
    }

    if (initialProps === "stop") {
      animateInstance.stop();
    } else {
      animateInstance.animate(a.props, a.params);
    }

    return els;
  }

  function stop() {
    const els = this;

    for (let i = 0; i < els.length; i += 1) {
      if (els[i].dom7AnimateInstance) {
        els[i].dom7AnimateInstance.stop();
      }
    }
  }

  const noTrigger = "resize scroll".split(" ");

  function shortcut(name) {
    function eventHandler(...args) {
      if (typeof args[0] === "undefined") {
        for (let i = 0; i < this.length; i += 1) {
          if (noTrigger.indexOf(name) < 0) {
            if (name in this[i]) this[i][name]();
            else {
              dom7_esm_$(this[i]).trigger(name);
            }
          }
        }

        return this;
      }

      return this.on(name, ...args);
    }

    return eventHandler;
  }

  const click = shortcut("click");
  const dom7_esm_blur = shortcut("blur");
  const dom7_esm_focus = shortcut("focus");
  const focusin = shortcut("focusin");
  const focusout = shortcut("focusout");
  const keyup = shortcut("keyup");
  const keydown = shortcut("keydown");
  const keypress = shortcut("keypress");
  const dom7_esm_submit = shortcut("submit");
  const change = shortcut("change");
  const mousedown = shortcut("mousedown");
  const mousemove = shortcut("mousemove");
  const mouseup = shortcut("mouseup");
  const mouseenter = shortcut("mouseenter");
  const mouseleave = shortcut("mouseleave");
  const mouseout = shortcut("mouseout");
  const mouseover = shortcut("mouseover");
  const touchstart = shortcut("touchstart");
  const touchend = shortcut("touchend");
  const touchmove = shortcut("touchmove");
  const resize = shortcut("resize");
  const dom7_esm_scroll = shortcut("scroll");

  /* harmony default export */ const dom7_esm =
    /* unused pure expression or super */ null && dom7_esm_$; // CONCATENATED MODULE: ./node_modules/swiper/shared/dom.js

  const Methods = {
    addClass: addClass,
    removeClass: removeClass,
    hasClass: hasClass,
    toggleClass: toggleClass,
    attr: attr,
    removeAttr: removeAttr,
    transform: transform,
    transition: transition,
    on: on,
    off: off,
    trigger: trigger,
    transitionEnd: transitionEnd,
    outerWidth: dom7_esm_outerWidth,
    outerHeight: dom7_esm_outerHeight,
    styles: styles,
    offset: offset,
    css: css,
    each: each,
    html: html,
    text: dom7_esm_text,
    is: is,
    index: index,
    eq: eq,
    append: append,
    prepend: prepend,
    next: next,
    nextAll: nextAll,
    prev: prev,
    prevAll: prevAll,
    parent: dom7_esm_parent,
    parents: parents,
    closest: closest,
    find: find,
    children: children,
    filter: filter,
    remove: remove,
  };
  Object.keys(Methods).forEach((methodName) => {
    Object.defineProperty(dom7_esm_$.fn, methodName, {
      value: Methods[methodName],
      writable: true,
    });
  });
  /* harmony default export */ const dom = dom7_esm_$; // CONCATENATED MODULE: ./node_modules/swiper/shared/utils.js
  function deleteProps(obj) {
    const object = obj;
    Object.keys(object).forEach((key) => {
      try {
        object[key] = null;
      } catch (e) {
        // no getter for object
      }

      try {
        delete object[key];
      } catch (e) {
        // something got wrong
      }
    });
  }

  function utils_nextTick(callback, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    return setTimeout(callback, delay);
  }

  function utils_now() {
    return Date.now();
  }

  function utils_getComputedStyle(el) {
    const window = ssr_window_esm_getWindow();
    let style;

    if (window.getComputedStyle) {
      style = window.getComputedStyle(el, null);
    }

    if (!style && el.currentStyle) {
      style = el.currentStyle;
    }

    if (!style) {
      style = el.style;
    }

    return style;
  }

  function utils_getTranslate(el, axis) {
    if (axis === void 0) {
      axis = "x";
    }

    const window = ssr_window_esm_getWindow();
    let matrix;
    let curTransform;
    let transformMatrix;
    const curStyle = utils_getComputedStyle(el, null);

    if (window.WebKitCSSMatrix) {
      curTransform = curStyle.transform || curStyle.webkitTransform;

      if (curTransform.split(",").length > 6) {
        curTransform = curTransform
          .split(", ")
          .map((a) => a.replace(",", "."))
          .join(", ");
      } // Some old versions of Webkit choke when 'none' is passed; pass
      // empty string instead in this case

      transformMatrix = new window.WebKitCSSMatrix(
        curTransform === "none" ? "" : curTransform
      );
    } else {
      transformMatrix =
        curStyle.MozTransform ||
        curStyle.OTransform ||
        curStyle.MsTransform ||
        curStyle.msTransform ||
        curStyle.transform ||
        curStyle
          .getPropertyValue("transform")
          .replace("translate(", "matrix(1, 0, 0, 1,");
      matrix = transformMatrix.toString().split(",");
    }

    if (axis === "x") {
      // Latest Chrome and webkits Fix
      if (window.WebKitCSSMatrix)
        curTransform = transformMatrix.m41; // Crazy IE10 Matrix
      else if (matrix.length === 16)
        curTransform = parseFloat(matrix[12]); // Normal Browsers
      else curTransform = parseFloat(matrix[4]);
    }

    if (axis === "y") {
      // Latest Chrome and webkits Fix
      if (window.WebKitCSSMatrix)
        curTransform = transformMatrix.m42; // Crazy IE10 Matrix
      else if (matrix.length === 16)
        curTransform = parseFloat(matrix[13]); // Normal Browsers
      else curTransform = parseFloat(matrix[5]);
    }

    return curTransform || 0;
  }

  function utils_isObject(o) {
    return (
      typeof o === "object" &&
      o !== null &&
      o.constructor &&
      Object.prototype.toString.call(o).slice(8, -1) === "Object"
    );
  }

  function isNode(node) {
    // eslint-disable-next-line
    if (
      typeof window !== "undefined" &&
      typeof window.HTMLElement !== "undefined"
    ) {
      return node instanceof HTMLElement;
    }

    return node && (node.nodeType === 1 || node.nodeType === 11);
  }

  function utils_extend() {
    const to = Object(arguments.length <= 0 ? undefined : arguments[0]);
    const noExtend = ["__proto__", "constructor", "prototype"];

    for (let i = 1; i < arguments.length; i += 1) {
      const nextSource =
        i < 0 || arguments.length <= i ? undefined : arguments[i];

      if (
        nextSource !== undefined &&
        nextSource !== null &&
        !isNode(nextSource)
      ) {
        const keysArray = Object.keys(Object(nextSource)).filter(
          (key) => noExtend.indexOf(key) < 0
        );

        for (
          let nextIndex = 0, len = keysArray.length;
          nextIndex < len;
          nextIndex += 1
        ) {
          const nextKey = keysArray[nextIndex];
          const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);

          if (desc !== undefined && desc.enumerable) {
            if (
              utils_isObject(to[nextKey]) &&
              utils_isObject(nextSource[nextKey])
            ) {
              if (nextSource[nextKey].__swiper__) {
                to[nextKey] = nextSource[nextKey];
              } else {
                utils_extend(to[nextKey], nextSource[nextKey]);
              }
            } else if (
              !utils_isObject(to[nextKey]) &&
              utils_isObject(nextSource[nextKey])
            ) {
              to[nextKey] = {};

              if (nextSource[nextKey].__swiper__) {
                to[nextKey] = nextSource[nextKey];
              } else {
                utils_extend(to[nextKey], nextSource[nextKey]);
              }
            } else {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
    }

    return to;
  }

  function utils_setCSSProperty(el, varName, varValue) {
    el.style.setProperty(varName, varValue);
  }

  function animateCSSModeScroll(_ref) {
    let { swiper, targetPosition, side } = _ref;
    const window = ssr_window_esm_getWindow();
    const startPosition = -swiper.translate;
    let startTime = null;
    let time;
    const duration = swiper.params.speed;
    swiper.wrapperEl.style.scrollSnapType = "none";
    window.cancelAnimationFrame(swiper.cssModeFrameID);
    const dir = targetPosition > startPosition ? "next" : "prev";

    const isOutOfBound = (current, target) => {
      return (
        (dir === "next" && current >= target) ||
        (dir === "prev" && current <= target)
      );
    };

    const animate = () => {
      time = new Date().getTime();

      if (startTime === null) {
        startTime = time;
      }

      const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
      const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
      let currentPosition =
        startPosition + easeProgress * (targetPosition - startPosition);

      if (isOutOfBound(currentPosition, targetPosition)) {
        currentPosition = targetPosition;
      }

      swiper.wrapperEl.scrollTo({
        [side]: currentPosition,
      });

      if (isOutOfBound(currentPosition, targetPosition)) {
        swiper.wrapperEl.style.overflow = "hidden";
        swiper.wrapperEl.style.scrollSnapType = "";
        setTimeout(() => {
          swiper.wrapperEl.style.overflow = "";
          swiper.wrapperEl.scrollTo({
            [side]: currentPosition,
          });
        });
        window.cancelAnimationFrame(swiper.cssModeFrameID);
        return;
      }

      swiper.cssModeFrameID = window.requestAnimationFrame(animate);
    };

    animate();
  } // CONCATENATED MODULE: ./node_modules/swiper/shared/get-support.js

  let support;

  function calcSupport() {
    const window = ssr_window_esm_getWindow();
    const document = ssr_window_esm_getDocument();
    return {
      smoothScroll:
        document.documentElement &&
        "scrollBehavior" in document.documentElement.style,
      touch: !!(
        "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch)
      ),
      passiveListener: (function checkPassiveListener() {
        let supportsPassive = false;

        try {
          const opts = Object.defineProperty({}, "passive", {
            // eslint-disable-next-line
            get() {
              supportsPassive = true;
            },
          });
          window.addEventListener("testPassiveListener", null, opts);
        } catch (e) {
          // No support
        }

        return supportsPassive;
      })(),
      gestures: (function checkGestures() {
        return "ongesturestart" in window;
      })(),
    };
  }

  function getSupport() {
    if (!support) {
      support = calcSupport();
    }

    return support;
  } // CONCATENATED MODULE: ./node_modules/swiper/shared/get-device.js

  let deviceCached;

  function calcDevice(_temp) {
    let { userAgent } = _temp === void 0 ? {} : _temp;
    const support = getSupport();
    const window = ssr_window_esm_getWindow();
    const platform = window.navigator.platform;
    const ua = userAgent || window.navigator.userAgent;
    const device = {
      ios: false,
      android: false,
    };
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line

    let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
    const windows = platform === "Win32";
    let macos = platform === "MacIntel"; // iPadOs 13 fix

    const iPadScreens = [
      "1024x1366",
      "1366x1024",
      "834x1194",
      "1194x834",
      "834x1112",
      "1112x834",
      "768x1024",
      "1024x768",
      "820x1180",
      "1180x820",
      "810x1080",
      "1080x810",
    ];

    if (
      !ipad &&
      macos &&
      support.touch &&
      iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0
    ) {
      ipad = ua.match(/(Version)\/([\d.]+)/);
      if (!ipad) ipad = [0, 1, "13_0_0"];
      macos = false;
    } // Android

    if (android && !windows) {
      device.os = "android";
      device.android = true;
    }

    if (ipad || iphone || ipod) {
      device.os = "ios";
      device.ios = true;
    } // Export object

    return device;
  }

  function getDevice(overrides) {
    if (overrides === void 0) {
      overrides = {};
    }

    if (!deviceCached) {
      deviceCached = calcDevice(overrides);
    }

    return deviceCached;
  } // CONCATENATED MODULE: ./node_modules/swiper/shared/get-browser.js

  let browser;

  function calcBrowser() {
    const window = ssr_window_esm_getWindow();

    function isSafari() {
      const ua = window.navigator.userAgent.toLowerCase();
      return (
        ua.indexOf("safari") >= 0 &&
        ua.indexOf("chrome") < 0 &&
        ua.indexOf("android") < 0
      );
    }

    return {
      isSafari: isSafari(),
      isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
        window.navigator.userAgent
      ),
    };
  }

  function getBrowser() {
    if (!browser) {
      browser = calcBrowser();
    }

    return browser;
  } // CONCATENATED MODULE: ./node_modules/swiper/core/modules/resize/resize.js

  function Resize(_ref) {
    let { swiper, on, emit } = _ref;
    const window = ssr_window_esm_getWindow();
    let observer = null;
    let animationFrame = null;

    const resizeHandler = () => {
      if (!swiper || swiper.destroyed || !swiper.initialized) return;
      emit("beforeResize");
      emit("resize");
    };

    const createObserver = () => {
      if (!swiper || swiper.destroyed || !swiper.initialized) return;
      observer = new ResizeObserver((entries) => {
        animationFrame = window.requestAnimationFrame(() => {
          const { width, height } = swiper;
          let newWidth = width;
          let newHeight = height;
          entries.forEach((_ref2) => {
            let { contentBoxSize, contentRect, target } = _ref2;
            if (target && target !== swiper.el) return;
            newWidth = contentRect
              ? contentRect.width
              : (contentBoxSize[0] || contentBoxSize).inlineSize;
            newHeight = contentRect
              ? contentRect.height
              : (contentBoxSize[0] || contentBoxSize).blockSize;
          });

          if (newWidth !== width || newHeight !== height) {
            resizeHandler();
          }
        });
      });
      observer.observe(swiper.el);
    };

    const removeObserver = () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      if (observer && observer.unobserve && swiper.el) {
        observer.unobserve(swiper.el);
        observer = null;
      }
    };

    const orientationChangeHandler = () => {
      if (!swiper || swiper.destroyed || !swiper.initialized) return;
      emit("orientationchange");
    };

    on("init", () => {
      if (
        swiper.params.resizeObserver &&
        typeof window.ResizeObserver !== "undefined"
      ) {
        createObserver();
        return;
      }

      window.addEventListener("resize", resizeHandler);
      window.addEventListener("orientationchange", orientationChangeHandler);
    });
    on("destroy", () => {
      removeObserver();
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("orientationchange", orientationChangeHandler);
    });
  } // CONCATENATED MODULE: ./node_modules/swiper/core/modules/observer/observer.js
  function Observer(_ref) {
    let { swiper, extendParams, on, emit } = _ref;
    const observers = [];
    const window = ssr_window_esm_getWindow();

    const attach = function (target, options) {
      if (options === void 0) {
        options = {};
      }

      const ObserverFunc =
        window.MutationObserver || window.WebkitMutationObserver;
      const observer = new ObserverFunc((mutations) => {
        // The observerUpdate event should only be triggered
        // once despite the number of mutations.  Additional
        // triggers are redundant and are very costly
        if (mutations.length === 1) {
          emit("observerUpdate", mutations[0]);
          return;
        }

        const observerUpdate = function observerUpdate() {
          emit("observerUpdate", mutations[0]);
        };

        if (window.requestAnimationFrame) {
          window.requestAnimationFrame(observerUpdate);
        } else {
          window.setTimeout(observerUpdate, 0);
        }
      });
      observer.observe(target, {
        attributes:
          typeof options.attributes === "undefined" ? true : options.attributes,
        childList:
          typeof options.childList === "undefined" ? true : options.childList,
        characterData:
          typeof options.characterData === "undefined"
            ? true
            : options.characterData,
      });
      observers.push(observer);
    };

    const init = () => {
      if (!swiper.params.observer) return;

      if (swiper.params.observeParents) {
        const containerParents = swiper.$el.parents();

        for (let i = 0; i < containerParents.length; i += 1) {
          attach(containerParents[i]);
        }
      } // Observe container

      attach(swiper.$el[0], {
        childList: swiper.params.observeSlideChildren,
      }); // Observe wrapper

      attach(swiper.$wrapperEl[0], {
        attributes: false,
      });
    };

    const destroy = () => {
      observers.forEach((observer) => {
        observer.disconnect();
      });
      observers.splice(0, observers.length);
    };

    extendParams({
      observer: false,
      observeParents: false,
      observeSlideChildren: false,
    });
    on("init", init);
    on("destroy", destroy);
  } // CONCATENATED MODULE: ./node_modules/swiper/core/events-emitter.js
  /* eslint-disable no-underscore-dangle */
  /* harmony default export */ const events_emitter = {
    on(events, handler, priority) {
      const self = this;
      if (typeof handler !== "function") return self;
      const method = priority ? "unshift" : "push";
      events.split(" ").forEach((event) => {
        if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
        self.eventsListeners[event][method](handler);
      });
      return self;
    },

    once(events, handler, priority) {
      const self = this;
      if (typeof handler !== "function") return self;

      function onceHandler() {
        self.off(events, onceHandler);

        if (onceHandler.__emitterProxy) {
          delete onceHandler.__emitterProxy;
        }

        for (
          var _len = arguments.length, args = new Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          args[_key] = arguments[_key];
        }

        handler.apply(self, args);
      }

      onceHandler.__emitterProxy = handler;
      return self.on(events, onceHandler, priority);
    },

    onAny(handler, priority) {
      const self = this;
      if (typeof handler !== "function") return self;
      const method = priority ? "unshift" : "push";

      if (self.eventsAnyListeners.indexOf(handler) < 0) {
        self.eventsAnyListeners[method](handler);
      }

      return self;
    },

    offAny(handler) {
      const self = this;
      if (!self.eventsAnyListeners) return self;
      const index = self.eventsAnyListeners.indexOf(handler);

      if (index >= 0) {
        self.eventsAnyListeners.splice(index, 1);
      }

      return self;
    },

    off(events, handler) {
      const self = this;
      if (!self.eventsListeners) return self;
      events.split(" ").forEach((event) => {
        if (typeof handler === "undefined") {
          self.eventsListeners[event] = [];
        } else if (self.eventsListeners[event]) {
          self.eventsListeners[event].forEach((eventHandler, index) => {
            if (
              eventHandler === handler ||
              (eventHandler.__emitterProxy &&
                eventHandler.__emitterProxy === handler)
            ) {
              self.eventsListeners[event].splice(index, 1);
            }
          });
        }
      });
      return self;
    },

    emit() {
      const self = this;
      if (!self.eventsListeners) return self;
      let events;
      let data;
      let context;

      for (
        var _len2 = arguments.length, args = new Array(_len2), _key2 = 0;
        _key2 < _len2;
        _key2++
      ) {
        args[_key2] = arguments[_key2];
      }

      if (typeof args[0] === "string" || Array.isArray(args[0])) {
        events = args[0];
        data = args.slice(1, args.length);
        context = self;
      } else {
        events = args[0].events;
        data = args[0].data;
        context = args[0].context || self;
      }

      data.unshift(context);
      const eventsArray = Array.isArray(events) ? events : events.split(" ");
      eventsArray.forEach((event) => {
        if (self.eventsAnyListeners && self.eventsAnyListeners.length) {
          self.eventsAnyListeners.forEach((eventHandler) => {
            eventHandler.apply(context, [event, ...data]);
          });
        }

        if (self.eventsListeners && self.eventsListeners[event]) {
          self.eventsListeners[event].forEach((eventHandler) => {
            eventHandler.apply(context, data);
          });
        }
      });
      return self;
    },
  }; // CONCATENATED MODULE: ./node_modules/swiper/core/update/updateSize.js
  function updateSize() {
    const swiper = this;
    let width;
    let height;
    const $el = swiper.$el;

    if (
      typeof swiper.params.width !== "undefined" &&
      swiper.params.width !== null
    ) {
      width = swiper.params.width;
    } else {
      width = $el[0].clientWidth;
    }

    if (
      typeof swiper.params.height !== "undefined" &&
      swiper.params.height !== null
    ) {
      height = swiper.params.height;
    } else {
      height = $el[0].clientHeight;
    }

    if (
      (width === 0 && swiper.isHorizontal()) ||
      (height === 0 && swiper.isVertical())
    ) {
      return;
    } // Subtract paddings

    width =
      width -
      parseInt($el.css("padding-left") || 0, 10) -
      parseInt($el.css("padding-right") || 0, 10);
    height =
      height -
      parseInt($el.css("padding-top") || 0, 10) -
      parseInt($el.css("padding-bottom") || 0, 10);
    if (Number.isNaN(width)) width = 0;
    if (Number.isNaN(height)) height = 0;
    Object.assign(swiper, {
      width,
      height,
      size: swiper.isHorizontal() ? width : height,
    });
  } // CONCATENATED MODULE: ./node_modules/swiper/core/update/updateSlides.js
  function updateSlides() {
    const swiper = this;

    function getDirectionLabel(property) {
      if (swiper.isHorizontal()) {
      return property;
    } // prettier-ignore

      return {
        width: "height",
        "margin-top": "margin-left",
        "margin-bottom ": "margin-right",
        "margin-left": "margin-top",
        "margin-right": "margin-bottom",
        "padding-left": "padding-top",
        "padding-right": "padding-bottom",
        marginRight: "marginBottom",
      }[property];
    }

    function getDirectionPropertyValue(node, label) {
      return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
    }

    const params = swiper.params;
    const {
      $wrapperEl,
      size: swiperSize,
      rtlTranslate: rtl,
      wrongRTL,
    } = swiper;
    const isVirtual = swiper.virtual && params.virtual.enabled;
    const previousSlidesLength = isVirtual
      ? swiper.virtual.slides.length
      : swiper.slides.length;
    const slides = $wrapperEl.children(`.${swiper.params.slideClass}`);
    const slidesLength = isVirtual
      ? swiper.virtual.slides.length
      : slides.length;
    let snapGrid = [];
    const slidesGrid = [];
    const slidesSizesGrid = [];
    let offsetBefore = params.slidesOffsetBefore;

    if (typeof offsetBefore === "function") {
      offsetBefore = params.slidesOffsetBefore.call(swiper);
    }

    let offsetAfter = params.slidesOffsetAfter;

    if (typeof offsetAfter === "function") {
      offsetAfter = params.slidesOffsetAfter.call(swiper);
    }

    const previousSnapGridLength = swiper.snapGrid.length;
    const previousSlidesGridLength = swiper.slidesGrid.length;
    let spaceBetween = params.spaceBetween;
    let slidePosition = -offsetBefore;
    let prevSlideSize = 0;
    let index = 0;

    if (typeof swiperSize === "undefined") {
      return;
    }

    if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) {
      spaceBetween =
        (parseFloat(spaceBetween.replace("%", "")) / 100) * swiperSize;
    }

    swiper.virtualSize = -spaceBetween; // reset margins

    if (rtl)
      slides.css({
        marginLeft: "",
        marginBottom: "",
        marginTop: "",
      });
    else
      slides.css({
        marginRight: "",
        marginBottom: "",
        marginTop: "",
      }); // reset cssMode offsets

    if (params.centeredSlides && params.cssMode) {
      utils_setCSSProperty(
        swiper.wrapperEl,
        "--swiper-centered-offset-before",
        ""
      );
      utils_setCSSProperty(
        swiper.wrapperEl,
        "--swiper-centered-offset-after",
        ""
      );
    }

    const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;

    if (gridEnabled) {
      swiper.grid.initSlides(slidesLength);
    } // Calc slides

    let slideSize;
    const shouldResetSlideSize =
      params.slidesPerView === "auto" &&
      params.breakpoints &&
      Object.keys(params.breakpoints).filter((key) => {
        return typeof params.breakpoints[key].slidesPerView !== "undefined";
      }).length > 0;

    for (let i = 0; i < slidesLength; i += 1) {
      slideSize = 0;
      const slide = slides.eq(i);

      if (gridEnabled) {
        swiper.grid.updateSlide(i, slide, slidesLength, getDirectionLabel);
      }

      if (slide.css("display") === "none") continue; // eslint-disable-line

      if (params.slidesPerView === "auto") {
        if (shouldResetSlideSize) {
          slides[i].style[getDirectionLabel("width")] = ``;
        }

        const slideStyles = getComputedStyle(slide[0]);
        const currentTransform = slide[0].style.transform;
        const currentWebKitTransform = slide[0].style.webkitTransform;

        if (currentTransform) {
          slide[0].style.transform = "none";
        }

        if (currentWebKitTransform) {
          slide[0].style.webkitTransform = "none";
        }

        if (params.roundLengths) {
          slideSize = swiper.isHorizontal()
            ? slide.outerWidth(true)
            : slide.outerHeight(true);
        } else {
          // eslint-disable-next-line
          const width = getDirectionPropertyValue(slideStyles, "width");
          const paddingLeft = getDirectionPropertyValue(
            slideStyles,
            "padding-left"
          );
          const paddingRight = getDirectionPropertyValue(
            slideStyles,
            "padding-right"
          );
          const marginLeft = getDirectionPropertyValue(
            slideStyles,
            "margin-left"
          );
          const marginRight = getDirectionPropertyValue(
            slideStyles,
            "margin-right"
          );
          const boxSizing = slideStyles.getPropertyValue("box-sizing");

          if (boxSizing && boxSizing === "border-box") {
            slideSize = width + marginLeft + marginRight;
          } else {
            const { clientWidth, offsetWidth } = slide[0];
            slideSize =
              width +
              paddingLeft +
              paddingRight +
              marginLeft +
              marginRight +
              (offsetWidth - clientWidth);
          }
        }

        if (currentTransform) {
          slide[0].style.transform = currentTransform;
        }

        if (currentWebKitTransform) {
          slide[0].style.webkitTransform = currentWebKitTransform;
        }

        if (params.roundLengths) slideSize = Math.floor(slideSize);
      } else {
        slideSize =
          (swiperSize - (params.slidesPerView - 1) * spaceBetween) /
          params.slidesPerView;
        if (params.roundLengths) slideSize = Math.floor(slideSize);

        if (slides[i]) {
          slides[i].style[getDirectionLabel("width")] = `${slideSize}px`;
        }
      }

      if (slides[i]) {
        slides[i].swiperSlideSize = slideSize;
      }

      slidesSizesGrid.push(slideSize);

      if (params.centeredSlides) {
        slidePosition =
          slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
        if (prevSlideSize === 0 && i !== 0)
          slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
        if (i === 0)
          slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
        if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
        if (params.roundLengths) slidePosition = Math.floor(slidePosition);
        if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
        slidesGrid.push(slidePosition);
      } else {
        if (params.roundLengths) slidePosition = Math.floor(slidePosition);
        if (
          (index - Math.min(swiper.params.slidesPerGroupSkip, index)) %
            swiper.params.slidesPerGroup ===
          0
        )
          snapGrid.push(slidePosition);
        slidesGrid.push(slidePosition);
        slidePosition = slidePosition + slideSize + spaceBetween;
      }

      swiper.virtualSize += slideSize + spaceBetween;
      prevSlideSize = slideSize;
      index += 1;
    }

    swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;

    if (
      rtl &&
      wrongRTL &&
      (params.effect === "slide" || params.effect === "coverflow")
    ) {
      $wrapperEl.css({
        width: `${swiper.virtualSize + params.spaceBetween}px`,
      });
    }

    if (params.setWrapperSize) {
      $wrapperEl.css({
        [getDirectionLabel("width")]: `${
          swiper.virtualSize + params.spaceBetween
        }px`,
      });
    }

    if (gridEnabled) {
      swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
    } // Remove last grid elements depending on width

    if (!params.centeredSlides) {
      const newSlidesGrid = [];

      for (let i = 0; i < snapGrid.length; i += 1) {
        let slidesGridItem = snapGrid[i];
        if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);

        if (snapGrid[i] <= swiper.virtualSize - swiperSize) {
          newSlidesGrid.push(slidesGridItem);
        }
      }

      snapGrid = newSlidesGrid;

      if (
        Math.floor(swiper.virtualSize - swiperSize) -
          Math.floor(snapGrid[snapGrid.length - 1]) >
        1
      ) {
        snapGrid.push(swiper.virtualSize - swiperSize);
      }
    }

    if (snapGrid.length === 0) snapGrid = [0];

    if (params.spaceBetween !== 0) {
      const key =
        swiper.isHorizontal() && rtl
          ? "marginLeft"
          : getDirectionLabel("marginRight");
      slides
        .filter((_, slideIndex) => {
          if (!params.cssMode) return true;

          if (slideIndex === slides.length - 1) {
            return false;
          }

          return true;
        })
        .css({
          [key]: `${spaceBetween}px`,
        });
    }

    if (params.centeredSlides && params.centeredSlidesBounds) {
      let allSlidesSize = 0;
      slidesSizesGrid.forEach((slideSizeValue) => {
        allSlidesSize +=
          slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
      });
      allSlidesSize -= params.spaceBetween;
      const maxSnap = allSlidesSize - swiperSize;
      snapGrid = snapGrid.map((snap) => {
        if (snap < 0) return -offsetBefore;
        if (snap > maxSnap) return maxSnap + offsetAfter;
        return snap;
      });
    }

    if (params.centerInsufficientSlides) {
      let allSlidesSize = 0;
      slidesSizesGrid.forEach((slideSizeValue) => {
        allSlidesSize +=
          slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
      });
      allSlidesSize -= params.spaceBetween;

      if (allSlidesSize < swiperSize) {
        const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
        snapGrid.forEach((snap, snapIndex) => {
          snapGrid[snapIndex] = snap - allSlidesOffset;
        });
        slidesGrid.forEach((snap, snapIndex) => {
          slidesGrid[snapIndex] = snap + allSlidesOffset;
        });
      }
    }

    Object.assign(swiper, {
      slides,
      snapGrid,
      slidesGrid,
      slidesSizesGrid,
    });

    if (
      params.centeredSlides &&
      params.cssMode &&
      !params.centeredSlidesBounds
    ) {
      utils_setCSSProperty(
        swiper.wrapperEl,
        "--swiper-centered-offset-before",
        `${-snapGrid[0]}px`
      );
      utils_setCSSProperty(
        swiper.wrapperEl,
        "--swiper-centered-offset-after",
        `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`
      );
      const addToSnapGrid = -swiper.snapGrid[0];
      const addToSlidesGrid = -swiper.slidesGrid[0];
      swiper.snapGrid = swiper.snapGrid.map((v) => v + addToSnapGrid);
      swiper.slidesGrid = swiper.slidesGrid.map((v) => v + addToSlidesGrid);
    }

    if (slidesLength !== previousSlidesLength) {
      swiper.emit("slidesLengthChange");
    }

    if (snapGrid.length !== previousSnapGridLength) {
      if (swiper.params.watchOverflow) swiper.checkOverflow();
      swiper.emit("snapGridLengthChange");
    }

    if (slidesGrid.length !== previousSlidesGridLength) {
      swiper.emit("slidesGridLengthChange");
    }

    if (params.watchSlidesProgress) {
      swiper.updateSlidesOffset();
    }

    if (
      !isVirtual &&
      !params.cssMode &&
      (params.effect === "slide" || params.effect === "fade")
    ) {
      const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
      const hasClassBackfaceClassAdded =
        swiper.$el.hasClass(backFaceHiddenClass);

      if (slidesLength <= params.maxBackfaceHiddenSlides) {
        if (!hasClassBackfaceClassAdded)
          swiper.$el.addClass(backFaceHiddenClass);
      } else if (hasClassBackfaceClassAdded) {
        swiper.$el.removeClass(backFaceHiddenClass);
      }
    }
  } // CONCATENATED MODULE: ./node_modules/swiper/core/update/updateAutoHeight.js
  function updateAutoHeight(speed) {
    const swiper = this;
    const activeSlides = [];
    const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
    let newHeight = 0;
    let i;

    if (typeof speed === "number") {
      swiper.setTransition(speed);
    } else if (speed === true) {
      swiper.setTransition(swiper.params.speed);
    }

    const getSlideByIndex = (index) => {
      if (isVirtual) {
        return swiper.slides.filter(
          (el) =>
            parseInt(el.getAttribute("data-swiper-slide-index"), 10) === index
        )[0];
      }

      return swiper.slides.eq(index)[0];
    }; // Find slides currently in view

    if (
      swiper.params.slidesPerView !== "auto" &&
      swiper.params.slidesPerView > 1
    ) {
      if (swiper.params.centeredSlides) {
        swiper.visibleSlides.each((slide) => {
          activeSlides.push(slide);
        });
      } else {
        for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
          const index = swiper.activeIndex + i;
          if (index > swiper.slides.length && !isVirtual) break;
          activeSlides.push(getSlideByIndex(index));
        }
      }
    } else {
      activeSlides.push(getSlideByIndex(swiper.activeIndex));
    } // Find new height from highest slide in view

    for (i = 0; i < activeSlides.length; i += 1) {
      if (typeof activeSlides[i] !== "undefined") {
        const height = activeSlides[i].offsetHeight;
        newHeight = height > newHeight ? height : newHeight;
      }
    } // Update Height

    if (newHeight || newHeight === 0)
      swiper.$wrapperEl.css("height", `${newHeight}px`);
  } // CONCATENATED MODULE: ./node_modules/swiper/core/update/updateSlidesOffset.js
  function updateSlidesOffset() {
    const swiper = this;
    const slides = swiper.slides;

    for (let i = 0; i < slides.length; i += 1) {
      slides[i].swiperSlideOffset = swiper.isHorizontal()
        ? slides[i].offsetLeft
        : slides[i].offsetTop;
    }
  } // CONCATENATED MODULE: ./node_modules/swiper/core/update/updateSlidesProgress.js
  function updateSlidesProgress(translate) {
    if (translate === void 0) {
      translate = (this && this.translate) || 0;
    }

    const swiper = this;
    const params = swiper.params;
    const { slides, rtlTranslate: rtl, snapGrid } = swiper;
    if (slides.length === 0) return;
    if (typeof slides[0].swiperSlideOffset === "undefined")
      swiper.updateSlidesOffset();
    let offsetCenter = -translate;
    if (rtl) offsetCenter = translate; // Visible Slides

    slides.removeClass(params.slideVisibleClass);
    swiper.visibleSlidesIndexes = [];
    swiper.visibleSlides = [];

    for (let i = 0; i < slides.length; i += 1) {
      const slide = slides[i];
      let slideOffset = slide.swiperSlideOffset;

      if (params.cssMode && params.centeredSlides) {
        slideOffset -= slides[0].swiperSlideOffset;
      }

      const slideProgress =
        (offsetCenter +
          (params.centeredSlides ? swiper.minTranslate() : 0) -
          slideOffset) /
        (slide.swiperSlideSize + params.spaceBetween);
      const originalSlideProgress =
        (offsetCenter -
          snapGrid[0] +
          (params.centeredSlides ? swiper.minTranslate() : 0) -
          slideOffset) /
        (slide.swiperSlideSize + params.spaceBetween);
      const slideBefore = -(offsetCenter - slideOffset);
      const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
      const isVisible =
        (slideBefore >= 0 && slideBefore < swiper.size - 1) ||
        (slideAfter > 1 && slideAfter <= swiper.size) ||
        (slideBefore <= 0 && slideAfter >= swiper.size);

      if (isVisible) {
        swiper.visibleSlides.push(slide);
        swiper.visibleSlidesIndexes.push(i);
        slides.eq(i).addClass(params.slideVisibleClass);
      }

      slide.progress = rtl ? -slideProgress : slideProgress;
      slide.originalProgress = rtl
        ? -originalSlideProgress
        : originalSlideProgress;
    }

    swiper.visibleSlides = dom(swiper.visibleSlides);
  } // CONCATENATED MODULE: ./node_modules/swiper/core/update/updateProgress.js
  function updateProgress(translate) {
    const swiper = this;

    if (typeof translate === "undefined") {
      const multiplier = swiper.rtlTranslate ? -1 : 1; // eslint-disable-next-line

      translate =
        (swiper && swiper.translate && swiper.translate * multiplier) || 0;
    }

    const params = swiper.params;
    const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    let { progress, isBeginning, isEnd } = swiper;
    const wasBeginning = isBeginning;
    const wasEnd = isEnd;

    if (translatesDiff === 0) {
      progress = 0;
      isBeginning = true;
      isEnd = true;
    } else {
      progress = (translate - swiper.minTranslate()) / translatesDiff;
      isBeginning = progress <= 0;
      isEnd = progress >= 1;
    }

    Object.assign(swiper, {
      progress,
      isBeginning,
      isEnd,
    });
    if (
      params.watchSlidesProgress ||
      (params.centeredSlides && params.autoHeight)
    )
      swiper.updateSlidesProgress(translate);

    if (isBeginning && !wasBeginning) {
      swiper.emit("reachBeginning toEdge");
    }

    if (isEnd && !wasEnd) {
      swiper.emit("reachEnd toEdge");
    }

    if ((wasBeginning && !isBeginning) || (wasEnd && !isEnd)) {
      swiper.emit("fromEdge");
    }

    swiper.emit("progress", progress);
  } // CONCATENATED MODULE: ./node_modules/swiper/core/update/updateSlidesClasses.js
  function updateSlidesClasses() {
    const swiper = this;
    const { slides, params, $wrapperEl, activeIndex, realIndex } = swiper;
    const isVirtual = swiper.virtual && params.virtual.enabled;
    slides.removeClass(
      `${params.slideActiveClass} ${params.slideNextClass} ${params.slidePrevClass} ${params.slideDuplicateActiveClass} ${params.slideDuplicateNextClass} ${params.slideDuplicatePrevClass}`
    );
    let activeSlide;

    if (isVirtual) {
      activeSlide = swiper.$wrapperEl.find(
        `.${params.slideClass}[data-swiper-slide-index="${activeIndex}"]`
      );
    } else {
      activeSlide = slides.eq(activeIndex);
    } // Active classes

    activeSlide.addClass(params.slideActiveClass);

    if (params.loop) {
      // Duplicate to all looped slides
      if (activeSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl
          .children(
            `.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${realIndex}"]`
          )
          .addClass(params.slideDuplicateActiveClass);
      } else {
        $wrapperEl
          .children(
            `.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${realIndex}"]`
          )
          .addClass(params.slideDuplicateActiveClass);
      }
    } // Next Slide

    let nextSlide = activeSlide
      .nextAll(`.${params.slideClass}`)
      .eq(0)
      .addClass(params.slideNextClass);

    if (params.loop && nextSlide.length === 0) {
      nextSlide = slides.eq(0);
      nextSlide.addClass(params.slideNextClass);
    } // Prev Slide

    let prevSlide = activeSlide
      .prevAll(`.${params.slideClass}`)
      .eq(0)
      .addClass(params.slidePrevClass);

    if (params.loop && prevSlide.length === 0) {
      prevSlide = slides.eq(-1);
      prevSlide.addClass(params.slidePrevClass);
    }

    if (params.loop) {
      // Duplicate to all looped slides
      if (nextSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl
          .children(
            `.${params.slideClass}:not(.${
              params.slideDuplicateClass
            })[data-swiper-slide-index="${nextSlide.attr(
              "data-swiper-slide-index"
            )}"]`
          )
          .addClass(params.slideDuplicateNextClass);
      } else {
        $wrapperEl
          .children(
            `.${params.slideClass}.${
              params.slideDuplicateClass
            }[data-swiper-slide-index="${nextSlide.attr(
              "data-swiper-slide-index"
            )}"]`
          )
          .addClass(params.slideDuplicateNextClass);
      }

      if (prevSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl
          .children(
            `.${params.slideClass}:not(.${
              params.slideDuplicateClass
            })[data-swiper-slide-index="${prevSlide.attr(
              "data-swiper-slide-index"
            )}"]`
          )
          .addClass(params.slideDuplicatePrevClass);
      } else {
        $wrapperEl
          .children(
            `.${params.slideClass}.${
              params.slideDuplicateClass
            }[data-swiper-slide-index="${prevSlide.attr(
              "data-swiper-slide-index"
            )}"]`
          )
          .addClass(params.slideDuplicatePrevClass);
      }
    }

    swiper.emitSlidesClasses();
  } // CONCATENATED MODULE: ./node_modules/swiper/core/update/updateActiveIndex.js
  function updateActiveIndex(newActiveIndex) {
    const swiper = this;
    const translate = swiper.rtlTranslate
      ? swiper.translate
      : -swiper.translate;
    const {
      slidesGrid,
      snapGrid,
      params,
      activeIndex: previousIndex,
      realIndex: previousRealIndex,
      snapIndex: previousSnapIndex,
    } = swiper;
    let activeIndex = newActiveIndex;
    let snapIndex;

    if (typeof activeIndex === "undefined") {
      for (let i = 0; i < slidesGrid.length; i += 1) {
        if (typeof slidesGrid[i + 1] !== "undefined") {
          if (
            translate >= slidesGrid[i] &&
            translate <
              slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2
          ) {
            activeIndex = i;
          } else if (
            translate >= slidesGrid[i] &&
            translate < slidesGrid[i + 1]
          ) {
            activeIndex = i + 1;
          }
        } else if (translate >= slidesGrid[i]) {
          activeIndex = i;
        }
      } // Normalize slideIndex

      if (params.normalizeSlideIndex) {
        if (activeIndex < 0 || typeof activeIndex === "undefined")
          activeIndex = 0;
      }
    }

    if (snapGrid.indexOf(translate) >= 0) {
      snapIndex = snapGrid.indexOf(translate);
    } else {
      const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
      snapIndex =
        skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
    }

    if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;

    if (activeIndex === previousIndex) {
      if (snapIndex !== previousSnapIndex) {
        swiper.snapIndex = snapIndex;
        swiper.emit("snapIndexChange");
      }

      return;
    } // Get real index

    const realIndex = parseInt(
      swiper.slides.eq(activeIndex).attr("data-swiper-slide-index") ||
        activeIndex,
      10
    );
    Object.assign(swiper, {
      snapIndex,
      realIndex,
      previousIndex,
      activeIndex,
    });
    swiper.emit("activeIndexChange");
    swiper.emit("snapIndexChange");

    if (previousRealIndex !== realIndex) {
      swiper.emit("realIndexChange");
    }

    if (swiper.initialized || swiper.params.runCallbacksOnInit) {
      swiper.emit("slideChange");
    }
  } // CONCATENATED MODULE: ./node_modules/swiper/core/update/updateClickedSlide.js
  function updateClickedSlide(e) {
    const swiper = this;
    const params = swiper.params;
    const slide = dom(e).closest(`.${params.slideClass}`)[0];
    let slideFound = false;
    let slideIndex;

    if (slide) {
      for (let i = 0; i < swiper.slides.length; i += 1) {
        if (swiper.slides[i] === slide) {
          slideFound = true;
          slideIndex = i;
          break;
        }
      }
    }

    if (slide && slideFound) {
      swiper.clickedSlide = slide;

      if (swiper.virtual && swiper.params.virtual.enabled) {
        swiper.clickedIndex = parseInt(
          dom(slide).attr("data-swiper-slide-index"),
          10
        );
      } else {
        swiper.clickedIndex = slideIndex;
      }
    } else {
      swiper.clickedSlide = undefined;
      swiper.clickedIndex = undefined;
      return;
    }

    if (
      params.slideToClickedSlide &&
      swiper.clickedIndex !== undefined &&
      swiper.clickedIndex !== swiper.activeIndex
    ) {
      swiper.slideToClickedSlide();
    }
  } // CONCATENATED MODULE: ./node_modules/swiper/core/update/index.js
  /* harmony default export */ const update = {
    updateSize: updateSize,
    updateSlides: updateSlides,
    updateAutoHeight: updateAutoHeight,
    updateSlidesOffset: updateSlidesOffset,
    updateSlidesProgress: updateSlidesProgress,
    updateProgress: updateProgress,
    updateSlidesClasses: updateSlidesClasses,
    updateActiveIndex: updateActiveIndex,
    updateClickedSlide: updateClickedSlide,
  }; // CONCATENATED MODULE: ./node_modules/swiper/core/translate/getTranslate.js
  function getSwiperTranslate(axis) {
    if (axis === void 0) {
      axis = this.isHorizontal() ? "x" : "y";
    }

    const swiper = this;
    const { params, rtlTranslate: rtl, translate, $wrapperEl } = swiper;

    if (params.virtualTranslate) {
      return rtl ? -translate : translate;
    }

    if (params.cssMode) {
      return translate;
    }

    let currentTranslate = utils_getTranslate($wrapperEl[0], axis);
    if (rtl) currentTranslate = -currentTranslate;
    return currentTranslate || 0;
  } // CONCATENATED MODULE: ./node_modules/swiper/core/translate/setTranslate.js
  function setTranslate(translate, byController) {
    const swiper = this;
    const {
      rtlTranslate: rtl,
      params,
      $wrapperEl,
      wrapperEl,
      progress,
    } = swiper;
    let x = 0;
    let y = 0;
    const z = 0;

    if (swiper.isHorizontal()) {
      x = rtl ? -translate : translate;
    } else {
      y = translate;
    }

    if (params.roundLengths) {
      x = Math.floor(x);
      y = Math.floor(y);
    }

    if (params.cssMode) {
      wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] =
        swiper.isHorizontal() ? -x : -y;
    } else if (!params.virtualTranslate) {
      $wrapperEl.transform(`translate3d(${x}px, ${y}px, ${z}px)`);
    }

    swiper.previousTranslate = swiper.translate;
    swiper.translate = swiper.isHorizontal() ? x : y; // Check if we need to update progress

    let newProgress;
    const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();

    if (translatesDiff === 0) {
      newProgress = 0;
    } else {
      newProgress = (translate - swiper.minTranslate()) / translatesDiff;
    }

    if (newProgress !== progress) {
      swiper.updateProgress(translate);
    }

    swiper.emit("setTranslate", swiper.translate, byController);
  } // CONCATENATED MODULE: ./node_modules/swiper/core/translate/minTranslate.js
  function minTranslate() {
    return -this.snapGrid[0];
  } // CONCATENATED MODULE: ./node_modules/swiper/core/translate/maxTranslate.js
  function maxTranslate() {
    return -this.snapGrid[this.snapGrid.length - 1];
  } // CONCATENATED MODULE: ./node_modules/swiper/core/translate/translateTo.js
  function translateTo(
    translate,
    speed,
    runCallbacks,
    translateBounds,
    internal
  ) {
    if (translate === void 0) {
      translate = 0;
    }

    if (speed === void 0) {
      speed = this.params.speed;
    }

    if (runCallbacks === void 0) {
      runCallbacks = true;
    }

    if (translateBounds === void 0) {
      translateBounds = true;
    }

    const swiper = this;
    const { params, wrapperEl } = swiper;

    if (swiper.animating && params.preventInteractionOnTransition) {
      return false;
    }

    const minTranslate = swiper.minTranslate();
    const maxTranslate = swiper.maxTranslate();
    let newTranslate;
    if (translateBounds && translate > minTranslate)
      newTranslate = minTranslate;
    else if (translateBounds && translate < maxTranslate)
      newTranslate = maxTranslate;
    else newTranslate = translate; // Update progress

    swiper.updateProgress(newTranslate);

    if (params.cssMode) {
      const isH = swiper.isHorizontal();

      if (speed === 0) {
        wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate;
      } else {
        if (!swiper.support.smoothScroll) {
          animateCSSModeScroll({
            swiper,
            targetPosition: -newTranslate,
            side: isH ? "left" : "top",
          });
          return true;
        }

        wrapperEl.scrollTo({
          [isH ? "left" : "top"]: -newTranslate,
          behavior: "smooth",
        });
      }

      return true;
    }

    if (speed === 0) {
      swiper.setTransition(0);
      swiper.setTranslate(newTranslate);

      if (runCallbacks) {
        swiper.emit("beforeTransitionStart", speed, internal);
        swiper.emit("transitionEnd");
      }
    } else {
      swiper.setTransition(speed);
      swiper.setTranslate(newTranslate);

      if (runCallbacks) {
        swiper.emit("beforeTransitionStart", speed, internal);
        swiper.emit("transitionStart");
      }

      if (!swiper.animating) {
        swiper.animating = true;

        if (!swiper.onTranslateToWrapperTransitionEnd) {
          swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
            if (!swiper || swiper.destroyed) return;
            if (e.target !== this) return;
            swiper.$wrapperEl[0].removeEventListener(
              "transitionend",
              swiper.onTranslateToWrapperTransitionEnd
            );
            swiper.$wrapperEl[0].removeEventListener(
              "webkitTransitionEnd",
              swiper.onTranslateToWrapperTransitionEnd
            );
            swiper.onTranslateToWrapperTransitionEnd = null;
            delete swiper.onTranslateToWrapperTransitionEnd;

            if (runCallbacks) {
              swiper.emit("transitionEnd");
            }
          };
        }

        swiper.$wrapperEl[0].addEventListener(
          "transitionend",
          swiper.onTranslateToWrapperTransitionEnd
        );
        swiper.$wrapperEl[0].addEventListener(
          "webkitTransitionEnd",
          swiper.onTranslateToWrapperTransitionEnd
        );
      }
    }

    return true;
  } // CONCATENATED MODULE: ./node_modules/swiper/core/translate/index.js
  /* harmony default export */ const translate = {
    getTranslate: getSwiperTranslate,
    setTranslate: setTranslate,
    minTranslate: minTranslate,
    maxTranslate: maxTranslate,
    translateTo: translateTo,
  }; // CONCATENATED MODULE: ./node_modules/swiper/core/transition/setTransition.js
  function setTransition(duration, byController) {
    const swiper = this;

    if (!swiper.params.cssMode) {
      swiper.$wrapperEl.transition(duration);
    }

    swiper.emit("setTransition", duration, byController);
  } // CONCATENATED MODULE: ./node_modules/swiper/core/transition/transitionEmit.js
  function transitionEmit(_ref) {
    let { swiper, runCallbacks, direction, step } = _ref;
    const { activeIndex, previousIndex } = swiper;
    let dir = direction;

    if (!dir) {
      if (activeIndex > previousIndex) dir = "next";
      else if (activeIndex < previousIndex) dir = "prev";
      else dir = "reset";
    }

    swiper.emit(`transition${step}`);

    if (runCallbacks && activeIndex !== previousIndex) {
      if (dir === "reset") {
        swiper.emit(`slideResetTransition${step}`);
        return;
      }

      swiper.emit(`slideChangeTransition${step}`);

      if (dir === "next") {
        swiper.emit(`slideNextTransition${step}`);
      } else {
        swiper.emit(`slidePrevTransition${step}`);
      }
    }
  } // CONCATENATED MODULE: ./node_modules/swiper/core/transition/transitionStart.js
  function transitionStart(runCallbacks, direction) {
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }

    const swiper = this;
    const { params } = swiper;
    if (params.cssMode) return;

    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }

    transitionEmit({
      swiper,
      runCallbacks,
      direction,
      step: "Start",
    });
  } // CONCATENATED MODULE: ./node_modules/swiper/core/transition/transitionEnd.js
  function transitionEnd_transitionEnd(runCallbacks, direction) {
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }

    const swiper = this;
    const { params } = swiper;
    swiper.animating = false;
    if (params.cssMode) return;
    swiper.setTransition(0);
    transitionEmit({
      swiper,
      runCallbacks,
      direction,
      step: "End",
    });
  } // CONCATENATED MODULE: ./node_modules/swiper/core/transition/index.js
  /* harmony default export */ const core_transition = {
    setTransition: setTransition,
    transitionStart: transitionStart,
    transitionEnd: transitionEnd_transitionEnd,
  }; // CONCATENATED MODULE: ./node_modules/swiper/core/slide/slideTo.js
  function slideTo(index, speed, runCallbacks, internal, initial) {
    if (index === void 0) {
      index = 0;
    }

    if (speed === void 0) {
      speed = this.params.speed;
    }

    if (runCallbacks === void 0) {
      runCallbacks = true;
    }

    if (typeof index !== "number" && typeof index !== "string") {
      throw new Error(
        `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof index}] given.`
      );
    }

    if (typeof index === "string") {
      /**
       * The `index` argument converted from `string` to `number`.
       * @type {number}
       */
      const indexAsNumber = parseInt(index, 10);
      /**
       * Determines whether the `index` argument is a valid `number`
       * after being converted from the `string` type.
       * @type {boolean}
       */

      const isValidNumber = isFinite(indexAsNumber);

      if (!isValidNumber) {
        throw new Error(
          `The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`
        );
      } // Knowing that the converted `index` is a valid number,
      // we can update the original argument's value.

      index = indexAsNumber;
    }

    const swiper = this;
    let slideIndex = index;
    if (slideIndex < 0) slideIndex = 0;
    const {
      params,
      snapGrid,
      slidesGrid,
      previousIndex,
      activeIndex,
      rtlTranslate: rtl,
      wrapperEl,
      enabled,
    } = swiper;

    if (
      (swiper.animating && params.preventInteractionOnTransition) ||
      (!enabled && !internal && !initial)
    ) {
      return false;
    }

    const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
    let snapIndex =
      skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
    if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;

    if (
      (activeIndex || params.initialSlide || 0) === (previousIndex || 0) &&
      runCallbacks
    ) {
      swiper.emit("beforeSlideChangeStart");
    }

    const translate = -snapGrid[snapIndex]; // Update progress

    swiper.updateProgress(translate); // Normalize slideIndex

    if (params.normalizeSlideIndex) {
      for (let i = 0; i < slidesGrid.length; i += 1) {
        const normalizedTranslate = -Math.floor(translate * 100);
        const normalizedGrid = Math.floor(slidesGrid[i] * 100);
        const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);

        if (typeof slidesGrid[i + 1] !== "undefined") {
          if (
            normalizedTranslate >= normalizedGrid &&
            normalizedTranslate <
              normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2
          ) {
            slideIndex = i;
          } else if (
            normalizedTranslate >= normalizedGrid &&
            normalizedTranslate < normalizedGridNext
          ) {
            slideIndex = i + 1;
          }
        } else if (normalizedTranslate >= normalizedGrid) {
          slideIndex = i;
        }
      }
    } // Directions locks

    if (swiper.initialized && slideIndex !== activeIndex) {
      if (
        !swiper.allowSlideNext &&
        translate < swiper.translate &&
        translate < swiper.minTranslate()
      ) {
        return false;
      }

      if (
        !swiper.allowSlidePrev &&
        translate > swiper.translate &&
        translate > swiper.maxTranslate()
      ) {
        if ((activeIndex || 0) !== slideIndex) return false;
      }
    }

    let direction;
    if (slideIndex > activeIndex) direction = "next";
    else if (slideIndex < activeIndex) direction = "prev";
    else direction = "reset"; // Update Index

    if (
      (rtl && -translate === swiper.translate) ||
      (!rtl && translate === swiper.translate)
    ) {
      swiper.updateActiveIndex(slideIndex); // Update Height

      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }

      swiper.updateSlidesClasses();

      if (params.effect !== "slide") {
        swiper.setTranslate(translate);
      }

      if (direction !== "reset") {
        swiper.transitionStart(runCallbacks, direction);
        swiper.transitionEnd(runCallbacks, direction);
      }

      return false;
    }

    if (params.cssMode) {
      const isH = swiper.isHorizontal();
      const t = rtl ? translate : -translate;

      if (speed === 0) {
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;

        if (isVirtual) {
          swiper.wrapperEl.style.scrollSnapType = "none";
          swiper._immediateVirtual = true;
        }

        wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;

        if (isVirtual) {
          requestAnimationFrame(() => {
            swiper.wrapperEl.style.scrollSnapType = "";
            swiper._swiperImmediateVirtual = false;
          });
        }
      } else {
        if (!swiper.support.smoothScroll) {
          animateCSSModeScroll({
            swiper,
            targetPosition: t,
            side: isH ? "left" : "top",
          });
          return true;
        }

        wrapperEl.scrollTo({
          [isH ? "left" : "top"]: t,
          behavior: "smooth",
        });
      }

      return true;
    }

    swiper.setTransition(speed);
    swiper.setTranslate(translate);
    swiper.updateActiveIndex(slideIndex);
    swiper.updateSlidesClasses();
    swiper.emit("beforeTransitionStart", speed, internal);
    swiper.transitionStart(runCallbacks, direction);

    if (speed === 0) {
      swiper.transitionEnd(runCallbacks, direction);
    } else if (!swiper.animating) {
      swiper.animating = true;

      if (!swiper.onSlideToWrapperTransitionEnd) {
        swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
          if (!swiper || swiper.destroyed) return;
          if (e.target !== this) return;
          swiper.$wrapperEl[0].removeEventListener(
            "transitionend",
            swiper.onSlideToWrapperTransitionEnd
          );
          swiper.$wrapperEl[0].removeEventListener(
            "webkitTransitionEnd",
            swiper.onSlideToWrapperTransitionEnd
          );
          swiper.onSlideToWrapperTransitionEnd = null;
          delete swiper.onSlideToWrapperTransitionEnd;
          swiper.transitionEnd(runCallbacks, direction);
        };
      }

      swiper.$wrapperEl[0].addEventListener(
        "transitionend",
        swiper.onSlideToWrapperTransitionEnd
      );
      swiper.$wrapperEl[0].addEventListener(
        "webkitTransitionEnd",
        swiper.onSlideToWrapperTransitionEnd
      );
    }

    return true;
  } // CONCATENATED MODULE: ./node_modules/swiper/core/slide/slideToLoop.js
  function slideToLoop(index, speed, runCallbacks, internal) {
    if (index === void 0) {
      index = 0;
    }

    if (speed === void 0) {
      speed = this.params.speed;
    }

    if (runCallbacks === void 0) {
      runCallbacks = true;
    }

    const swiper = this;
    let newIndex = index;

    if (swiper.params.loop) {
      newIndex += swiper.loopedSlides;
    }

    return swiper.slideTo(newIndex, speed, runCallbacks, internal);
  } // CONCATENATED MODULE: ./node_modules/swiper/core/slide/slideNext.js
  /* eslint no-unused-vars: "off" */
  function slideNext(speed, runCallbacks, internal) {
    if (speed === void 0) {
      speed = this.params.speed;
    }

    if (runCallbacks === void 0) {
      runCallbacks = true;
    }

    const swiper = this;
    const { animating, enabled, params } = swiper;
    if (!enabled) return swiper;
    let perGroup = params.slidesPerGroup;

    if (
      params.slidesPerView === "auto" &&
      params.slidesPerGroup === 1 &&
      params.slidesPerGroupAuto
    ) {
      perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
    }

    const increment =
      swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;

    if (params.loop) {
      if (animating && params.loopPreventsSlide) return false;
      swiper.loopFix(); // eslint-disable-next-line

      swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
    }

    if (params.rewind && swiper.isEnd) {
      return swiper.slideTo(0, speed, runCallbacks, internal);
    }

    return swiper.slideTo(
      swiper.activeIndex + increment,
      speed,
      runCallbacks,
      internal
    );
  } // CONCATENATED MODULE: ./node_modules/swiper/core/slide/slidePrev.js
  /* eslint no-unused-vars: "off" */
  function slidePrev(speed, runCallbacks, internal) {
    if (speed === void 0) {
      speed = this.params.speed;
    }

    if (runCallbacks === void 0) {
      runCallbacks = true;
    }

    const swiper = this;
    const { params, animating, snapGrid, slidesGrid, rtlTranslate, enabled } =
      swiper;
    if (!enabled) return swiper;

    if (params.loop) {
      if (animating && params.loopPreventsSlide) return false;
      swiper.loopFix(); // eslint-disable-next-line

      swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
    }

    const translate = rtlTranslate ? swiper.translate : -swiper.translate;

    function normalize(val) {
      if (val < 0) return -Math.floor(Math.abs(val));
      return Math.floor(val);
    }

    const normalizedTranslate = normalize(translate);
    const normalizedSnapGrid = snapGrid.map((val) => normalize(val));
    let prevSnap =
      snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];

    if (typeof prevSnap === "undefined" && params.cssMode) {
      let prevSnapIndex;
      snapGrid.forEach((snap, snapIndex) => {
        if (normalizedTranslate >= snap) {
          // prevSnap = snap;
          prevSnapIndex = snapIndex;
        }
      });

      if (typeof prevSnapIndex !== "undefined") {
        prevSnap =
          snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
      }
    }

    let prevIndex = 0;

    if (typeof prevSnap !== "undefined") {
      prevIndex = slidesGrid.indexOf(prevSnap);
      if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;

      if (
        params.slidesPerView === "auto" &&
        params.slidesPerGroup === 1 &&
        params.slidesPerGroupAuto
      ) {
        prevIndex =
          prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
        prevIndex = Math.max(prevIndex, 0);
      }
    }

    if (params.rewind && swiper.isBeginning) {
      const lastIndex =
        swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual
          ? swiper.virtual.slides.length - 1
          : swiper.slides.length - 1;
      return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
    }

    return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
  } // CONCATENATED MODULE: ./node_modules/swiper/core/slide/slideReset.js
  /* eslint no-unused-vars: "off" */
  function slideReset(speed, runCallbacks, internal) {
    if (speed === void 0) {
      speed = this.params.speed;
    }

    if (runCallbacks === void 0) {
      runCallbacks = true;
    }

    const swiper = this;
    return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
  } // CONCATENATED MODULE: ./node_modules/swiper/core/slide/slideToClosest.js
  /* eslint no-unused-vars: "off" */
  function slideToClosest(speed, runCallbacks, internal, threshold) {
    if (speed === void 0) {
      speed = this.params.speed;
    }

    if (runCallbacks === void 0) {
      runCallbacks = true;
    }

    if (threshold === void 0) {
      threshold = 0.5;
    }

    const swiper = this;
    let index = swiper.activeIndex;
    const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
    const snapIndex =
      skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
    const translate = swiper.rtlTranslate
      ? swiper.translate
      : -swiper.translate;

    if (translate >= swiper.snapGrid[snapIndex]) {
      // The current translate is on or after the current snap index, so the choice
      // is between the current index and the one after it.
      const currentSnap = swiper.snapGrid[snapIndex];
      const nextSnap = swiper.snapGrid[snapIndex + 1];

      if (translate - currentSnap > (nextSnap - currentSnap) * threshold) {
        index += swiper.params.slidesPerGroup;
      }
    } else {
      // The current translate is before the current snap index, so the choice
      // is between the current index and the one before it.
      const prevSnap = swiper.snapGrid[snapIndex - 1];
      const currentSnap = swiper.snapGrid[snapIndex];

      if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) {
        index -= swiper.params.slidesPerGroup;
      }
    }

    index = Math.max(index, 0);
    index = Math.min(index, swiper.slidesGrid.length - 1);
    return swiper.slideTo(index, speed, runCallbacks, internal);
  } // CONCATENATED MODULE: ./node_modules/swiper/core/slide/slideToClickedSlide.js
  function slideToClickedSlide() {
    const swiper = this;
    const { params, $wrapperEl } = swiper;
    const slidesPerView =
      params.slidesPerView === "auto"
        ? swiper.slidesPerViewDynamic()
        : params.slidesPerView;
    let slideToIndex = swiper.clickedIndex;
    let realIndex;

    if (params.loop) {
      if (swiper.animating) return;
      realIndex = parseInt(
        dom(swiper.clickedSlide).attr("data-swiper-slide-index"),
        10
      );

      if (params.centeredSlides) {
        if (
          slideToIndex < swiper.loopedSlides - slidesPerView / 2 ||
          slideToIndex >
            swiper.slides.length - swiper.loopedSlides + slidesPerView / 2
        ) {
          swiper.loopFix();
          slideToIndex = $wrapperEl
            .children(
              `.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`
            )
            .eq(0)
            .index();
          utils_nextTick(() => {
            swiper.slideTo(slideToIndex);
          });
        } else {
          swiper.slideTo(slideToIndex);
        }
      } else if (slideToIndex > swiper.slides.length - slidesPerView) {
        swiper.loopFix();
        slideToIndex = $wrapperEl
          .children(
            `.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`
          )
          .eq(0)
          .index();
        utils_nextTick(() => {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else {
      swiper.slideTo(slideToIndex);
    }
  } // CONCATENATED MODULE: ./node_modules/swiper/core/slide/index.js
  /* harmony default export */ const slide = {
    slideTo: slideTo,
    slideToLoop: slideToLoop,
    slideNext: slideNext,
    slidePrev: slidePrev,
    slideReset: slideReset,
    slideToClosest: slideToClosest,
    slideToClickedSlide: slideToClickedSlide,
  }; // CONCATENATED MODULE: ./node_modules/swiper/core/loop/loopCreate.js
  function loopCreate() {
    const swiper = this;
    const document = ssr_window_esm_getDocument();
    const { params, $wrapperEl } = swiper; // Remove duplicated slides

    const $selector =
      $wrapperEl.children().length > 0
        ? dom($wrapperEl.children()[0].parentNode)
        : $wrapperEl;
    $selector
      .children(`.${params.slideClass}.${params.slideDuplicateClass}`)
      .remove();
    let slides = $selector.children(`.${params.slideClass}`);

    if (params.loopFillGroupWithBlank) {
      const blankSlidesNum =
        params.slidesPerGroup - (slides.length % params.slidesPerGroup);

      if (blankSlidesNum !== params.slidesPerGroup) {
        for (let i = 0; i < blankSlidesNum; i += 1) {
          const blankNode = dom(document.createElement("div")).addClass(
            `${params.slideClass} ${params.slideBlankClass}`
          );
          $selector.append(blankNode);
        }

        slides = $selector.children(`.${params.slideClass}`);
      }
    }

    if (params.slidesPerView === "auto" && !params.loopedSlides)
      params.loopedSlides = slides.length;
    swiper.loopedSlides = Math.ceil(
      parseFloat(params.loopedSlides || params.slidesPerView, 10)
    );
    swiper.loopedSlides += params.loopAdditionalSlides;

    if (swiper.loopedSlides > slides.length) {
      swiper.loopedSlides = slides.length;
    }

    const prependSlides = [];
    const appendSlides = [];
    slides.each((el, index) => {
      const slide = dom(el);

      if (index < swiper.loopedSlides) {
        appendSlides.push(el);
      }

      if (
        index < slides.length &&
        index >= slides.length - swiper.loopedSlides
      ) {
        prependSlides.push(el);
      }

      slide.attr("data-swiper-slide-index", index);
    });

    for (let i = 0; i < appendSlides.length; i += 1) {
      $selector.append(
        dom(appendSlides[i].cloneNode(true)).addClass(
          params.slideDuplicateClass
        )
      );
    }

    for (let i = prependSlides.length - 1; i >= 0; i -= 1) {
      $selector.prepend(
        dom(prependSlides[i].cloneNode(true)).addClass(
          params.slideDuplicateClass
        )
      );
    }
  } // CONCATENATED MODULE: ./node_modules/swiper/core/loop/loopFix.js
  function loopFix() {
    const swiper = this;
    swiper.emit("beforeLoopFix");
    const {
      activeIndex,
      slides,
      loopedSlides,
      allowSlidePrev,
      allowSlideNext,
      snapGrid,
      rtlTranslate: rtl,
    } = swiper;
    let newIndex;
    swiper.allowSlidePrev = true;
    swiper.allowSlideNext = true;
    const snapTranslate = -snapGrid[activeIndex];
    const diff = snapTranslate - swiper.getTranslate(); // Fix For Negative Oversliding

    if (activeIndex < loopedSlides) {
      newIndex = slides.length - loopedSlides * 3 + activeIndex;
      newIndex += loopedSlides;
      const slideChanged = swiper.slideTo(newIndex, 0, false, true);

      if (slideChanged && diff !== 0) {
        swiper.setTranslate(
          (rtl ? -swiper.translate : swiper.translate) - diff
        );
      }
    } else if (activeIndex >= slides.length - loopedSlides) {
      // Fix For Positive Oversliding
      newIndex = -slides.length + activeIndex + loopedSlides;
      newIndex += loopedSlides;
      const slideChanged = swiper.slideTo(newIndex, 0, false, true);

      if (slideChanged && diff !== 0) {
        swiper.setTranslate(
          (rtl ? -swiper.translate : swiper.translate) - diff
        );
      }
    }

    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
    swiper.emit("loopFix");
  } // CONCATENATED MODULE: ./node_modules/swiper/core/loop/loopDestroy.js
  function loopDestroy() {
    const swiper = this;
    const { $wrapperEl, params, slides } = swiper;
    $wrapperEl
      .children(
        `.${params.slideClass}.${params.slideDuplicateClass},.${params.slideClass}.${params.slideBlankClass}`
      )
      .remove();
    slides.removeAttr("data-swiper-slide-index");
  } // CONCATENATED MODULE: ./node_modules/swiper/core/loop/index.js
  /* harmony default export */ const loop = {
    loopCreate: loopCreate,
    loopFix: loopFix,
    loopDestroy: loopDestroy,
  }; // CONCATENATED MODULE: ./node_modules/swiper/core/grab-cursor/setGrabCursor.js
  function setGrabCursor(moving) {
    const swiper = this;
    if (
      swiper.support.touch ||
      !swiper.params.simulateTouch ||
      (swiper.params.watchOverflow && swiper.isLocked) ||
      swiper.params.cssMode
    )
      return;
    const el =
      swiper.params.touchEventsTarget === "container"
        ? swiper.el
        : swiper.wrapperEl;
    el.style.cursor = "move";
    el.style.cursor = moving ? "grabbing" : "grab";
  } // CONCATENATED MODULE: ./node_modules/swiper/core/grab-cursor/unsetGrabCursor.js
  function unsetGrabCursor() {
    const swiper = this;

    if (
      swiper.support.touch ||
      (swiper.params.watchOverflow && swiper.isLocked) ||
      swiper.params.cssMode
    ) {
      return;
    }

    swiper[
      swiper.params.touchEventsTarget === "container" ? "el" : "wrapperEl"
    ].style.cursor = "";
  } // CONCATENATED MODULE: ./node_modules/swiper/core/grab-cursor/index.js
  /* harmony default export */ const grab_cursor = {
    setGrabCursor: setGrabCursor,
    unsetGrabCursor: unsetGrabCursor,
  }; // CONCATENATED MODULE: ./node_modules/swiper/core/events/onTouchStart.js
  // Modified from https://stackoverflow.com/questions/54520554/custom-element-getrootnode-closest-function-crossing-multiple-parent-shadowd

  function closestElement(selector, base) {
    if (base === void 0) {
      base = this;
    }

    function __closestFrom(el) {
      if (
        !el ||
        el === ssr_window_esm_getDocument() ||
        el === ssr_window_esm_getWindow()
      )
        return null;
      if (el.assignedSlot) el = el.assignedSlot;
      const found = el.closest(selector);
      return found || __closestFrom(el.getRootNode().host);
    }

    return __closestFrom(base);
  }

  function onTouchStart(event) {
    const swiper = this;
    const document = ssr_window_esm_getDocument();
    const window = ssr_window_esm_getWindow();
    const data = swiper.touchEventsData;
    const { params, touches, enabled } = swiper;
    if (!enabled) return;

    if (swiper.animating && params.preventInteractionOnTransition) {
      return;
    }

    if (!swiper.animating && params.cssMode && params.loop) {
      swiper.loopFix();
    }

    let e = event;
    if (e.originalEvent) e = e.originalEvent;
    let $targetEl = dom(e.target);

    if (params.touchEventsTarget === "wrapper") {
      if (!$targetEl.closest(swiper.wrapperEl).length) return;
    }

    data.isTouchEvent = e.type === "touchstart";
    if (!data.isTouchEvent && "which" in e && e.which === 3) return;
    if (!data.isTouchEvent && "button" in e && e.button > 0) return;
    if (data.isTouched && data.isMoved) return; // change target el for shadow root component

    const swipingClassHasValue =
      !!params.noSwipingClass && params.noSwipingClass !== "";

    if (
      swipingClassHasValue &&
      e.target &&
      e.target.shadowRoot &&
      event.path &&
      event.path[0]
    ) {
      $targetEl = dom(event.path[0]);
    }

    const noSwipingSelector = params.noSwipingSelector
      ? params.noSwipingSelector
      : `.${params.noSwipingClass}`;
    const isTargetShadow = !!(e.target && e.target.shadowRoot); // use closestElement for shadow root element to get the actual closest for nested shadow root element

    if (
      params.noSwiping &&
      (isTargetShadow
        ? closestElement(noSwipingSelector, e.target)
        : $targetEl.closest(noSwipingSelector)[0])
    ) {
      swiper.allowClick = true;
      return;
    }

    if (params.swipeHandler) {
      if (!$targetEl.closest(params.swipeHandler)[0]) return;
    }

    touches.currentX =
      e.type === "touchstart" ? e.targetTouches[0].pageX : e.pageX;
    touches.currentY =
      e.type === "touchstart" ? e.targetTouches[0].pageY : e.pageY;
    const startX = touches.currentX;
    const startY = touches.currentY; // Do NOT start if iOS edge swipe is detected. Otherwise iOS app cannot swipe-to-go-back anymore

    const edgeSwipeDetection =
      params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
    const edgeSwipeThreshold =
      params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;

    if (
      edgeSwipeDetection &&
      (startX <= edgeSwipeThreshold ||
        startX >= window.innerWidth - edgeSwipeThreshold)
    ) {
      if (edgeSwipeDetection === "prevent") {
        event.preventDefault();
      } else {
        return;
      }
    }

    Object.assign(data, {
      isTouched: true,
      isMoved: false,
      allowTouchCallbacks: true,
      isScrolling: undefined,
      startMoving: undefined,
    });
    touches.startX = startX;
    touches.startY = startY;
    data.touchStartTime = utils_now();
    swiper.allowClick = true;
    swiper.updateSize();
    swiper.swipeDirection = undefined;
    if (params.threshold > 0) data.allowThresholdMove = false;

    if (e.type !== "touchstart") {
      let preventDefault = true;

      if ($targetEl.is(data.focusableElements)) {
        preventDefault = false;

        if ($targetEl[0].nodeName === "SELECT") {
          data.isTouched = false;
        }
      }

      if (
        document.activeElement &&
        dom(document.activeElement).is(data.focusableElements) &&
        document.activeElement !== $targetEl[0]
      ) {
        document.activeElement.blur();
      }

      const shouldPreventDefault =
        preventDefault &&
        swiper.allowTouchMove &&
        params.touchStartPreventDefault;

      if (
        (params.touchStartForcePreventDefault || shouldPreventDefault) &&
        !$targetEl[0].isContentEditable
      ) {
        e.preventDefault();
      }
    }

    if (
      swiper.params.freeMode &&
      swiper.params.freeMode.enabled &&
      swiper.freeMode &&
      swiper.animating &&
      !params.cssMode
    ) {
      swiper.freeMode.onTouchStart();
    }

    swiper.emit("touchStart", e);
  } // CONCATENATED MODULE: ./node_modules/swiper/core/events/onTouchMove.js
  function onTouchMove(event) {
    const document = ssr_window_esm_getDocument();
    const swiper = this;
    const data = swiper.touchEventsData;
    const { params, touches, rtlTranslate: rtl, enabled } = swiper;
    if (!enabled) return;
    let e = event;
    if (e.originalEvent) e = e.originalEvent;

    if (!data.isTouched) {
      if (data.startMoving && data.isScrolling) {
        swiper.emit("touchMoveOpposite", e);
      }

      return;
    }

    if (data.isTouchEvent && e.type !== "touchmove") return;
    const targetTouch =
      e.type === "touchmove" &&
      e.targetTouches &&
      (e.targetTouches[0] || e.changedTouches[0]);
    const pageX = e.type === "touchmove" ? targetTouch.pageX : e.pageX;
    const pageY = e.type === "touchmove" ? targetTouch.pageY : e.pageY;

    if (e.preventedByNestedSwiper) {
      touches.startX = pageX;
      touches.startY = pageY;
      return;
    }

    if (!swiper.allowTouchMove) {
      if (!dom(e.target).is(data.focusableElements)) {
        swiper.allowClick = false;
      }

      if (data.isTouched) {
        Object.assign(touches, {
          startX: pageX,
          startY: pageY,
          currentX: pageX,
          currentY: pageY,
        });
        data.touchStartTime = utils_now();
      }

      return;
    }

    if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) {
      if (swiper.isVertical()) {
        // Vertical
        if (
          (pageY < touches.startY &&
            swiper.translate <= swiper.maxTranslate()) ||
          (pageY > touches.startY && swiper.translate >= swiper.minTranslate())
        ) {
          data.isTouched = false;
          data.isMoved = false;
          return;
        }
      } else if (
        (pageX < touches.startX && swiper.translate <= swiper.maxTranslate()) ||
        (pageX > touches.startX && swiper.translate >= swiper.minTranslate())
      ) {
        return;
      }
    }

    if (data.isTouchEvent && document.activeElement) {
      if (
        e.target === document.activeElement &&
        dom(e.target).is(data.focusableElements)
      ) {
        data.isMoved = true;
        swiper.allowClick = false;
        return;
      }
    }

    if (data.allowTouchCallbacks) {
      swiper.emit("touchMove", e);
    }

    if (e.targetTouches && e.targetTouches.length > 1) return;
    touches.currentX = pageX;
    touches.currentY = pageY;
    const diffX = touches.currentX - touches.startX;
    const diffY = touches.currentY - touches.startY;
    if (
      swiper.params.threshold &&
      Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold
    )
      return;

    if (typeof data.isScrolling === "undefined") {
      let touchAngle;

      if (
        (swiper.isHorizontal() && touches.currentY === touches.startY) ||
        (swiper.isVertical() && touches.currentX === touches.startX)
      ) {
        data.isScrolling = false;
      } else {
        // eslint-disable-next-line
        if (diffX * diffX + diffY * diffY >= 25) {
          touchAngle =
            (Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180) / Math.PI;
          data.isScrolling = swiper.isHorizontal()
            ? touchAngle > params.touchAngle
            : 90 - touchAngle > params.touchAngle;
        }
      }
    }

    if (data.isScrolling) {
      swiper.emit("touchMoveOpposite", e);
    }

    if (typeof data.startMoving === "undefined") {
      if (
        touches.currentX !== touches.startX ||
        touches.currentY !== touches.startY
      ) {
        data.startMoving = true;
      }
    }

    if (data.isScrolling) {
      data.isTouched = false;
      return;
    }

    if (!data.startMoving) {
      return;
    }

    swiper.allowClick = false;

    if (!params.cssMode && e.cancelable) {
      e.preventDefault();
    }

    if (params.touchMoveStopPropagation && !params.nested) {
      e.stopPropagation();
    }

    if (!data.isMoved) {
      if (params.loop && !params.cssMode) {
        swiper.loopFix();
      }

      data.startTranslate = swiper.getTranslate();
      swiper.setTransition(0);

      if (swiper.animating) {
        swiper.$wrapperEl.trigger("webkitTransitionEnd transitionend");
      }

      data.allowMomentumBounce = false; // Grab Cursor

      if (
        params.grabCursor &&
        (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)
      ) {
        swiper.setGrabCursor(true);
      }

      swiper.emit("sliderFirstMove", e);
    }

    swiper.emit("sliderMove", e);
    data.isMoved = true;
    let diff = swiper.isHorizontal() ? diffX : diffY;
    touches.diff = diff;
    diff *= params.touchRatio;
    if (rtl) diff = -diff;
    swiper.swipeDirection = diff > 0 ? "prev" : "next";
    data.currentTranslate = diff + data.startTranslate;
    let disableParentSwiper = true;
    let resistanceRatio = params.resistanceRatio;

    if (params.touchReleaseOnEdges) {
      resistanceRatio = 0;
    }

    if (diff > 0 && data.currentTranslate > swiper.minTranslate()) {
      disableParentSwiper = false;
      if (params.resistance)
        data.currentTranslate =
          swiper.minTranslate() -
          1 +
          (-swiper.minTranslate() + data.startTranslate + diff) **
            resistanceRatio;
    } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
      disableParentSwiper = false;
      if (params.resistance)
        data.currentTranslate =
          swiper.maxTranslate() +
          1 -
          (swiper.maxTranslate() - data.startTranslate - diff) **
            resistanceRatio;
    }

    if (disableParentSwiper) {
      e.preventedByNestedSwiper = true;
    } // Directions locks

    if (
      !swiper.allowSlideNext &&
      swiper.swipeDirection === "next" &&
      data.currentTranslate < data.startTranslate
    ) {
      data.currentTranslate = data.startTranslate;
    }

    if (
      !swiper.allowSlidePrev &&
      swiper.swipeDirection === "prev" &&
      data.currentTranslate > data.startTranslate
    ) {
      data.currentTranslate = data.startTranslate;
    }

    if (!swiper.allowSlidePrev && !swiper.allowSlideNext) {
      data.currentTranslate = data.startTranslate;
    } // Threshold

    if (params.threshold > 0) {
      if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
        if (!data.allowThresholdMove) {
          data.allowThresholdMove = true;
          touches.startX = touches.currentX;
          touches.startY = touches.currentY;
          data.currentTranslate = data.startTranslate;
          touches.diff = swiper.isHorizontal()
            ? touches.currentX - touches.startX
            : touches.currentY - touches.startY;
          return;
        }
      } else {
        data.currentTranslate = data.startTranslate;
        return;
      }
    }

    if (!params.followFinger || params.cssMode) return; // Update active index in free mode

    if (
      (params.freeMode && params.freeMode.enabled && swiper.freeMode) ||
      params.watchSlidesProgress
    ) {
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }

    if (swiper.params.freeMode && params.freeMode.enabled && swiper.freeMode) {
      swiper.freeMode.onTouchMove();
    } // Update progress

    swiper.updateProgress(data.currentTranslate); // Update translate

    swiper.setTranslate(data.currentTranslate);
  } // CONCATENATED MODULE: ./node_modules/swiper/core/events/onTouchEnd.js
  function onTouchEnd(event) {
    const swiper = this;
    const data = swiper.touchEventsData;
    const { params, touches, rtlTranslate: rtl, slidesGrid, enabled } = swiper;
    if (!enabled) return;
    let e = event;
    if (e.originalEvent) e = e.originalEvent;

    if (data.allowTouchCallbacks) {
      swiper.emit("touchEnd", e);
    }

    data.allowTouchCallbacks = false;

    if (!data.isTouched) {
      if (data.isMoved && params.grabCursor) {
        swiper.setGrabCursor(false);
      }

      data.isMoved = false;
      data.startMoving = false;
      return;
    } // Return Grab Cursor

    if (
      params.grabCursor &&
      data.isMoved &&
      data.isTouched &&
      (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)
    ) {
      swiper.setGrabCursor(false);
    } // Time diff

    const touchEndTime = utils_now();
    const timeDiff = touchEndTime - data.touchStartTime; // Tap, doubleTap, Click

    if (swiper.allowClick) {
      const pathTree = e.path || (e.composedPath && e.composedPath());
      swiper.updateClickedSlide((pathTree && pathTree[0]) || e.target);
      swiper.emit("tap click", e);

      if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
        swiper.emit("doubleTap doubleClick", e);
      }
    }

    data.lastClickTime = utils_now();
    utils_nextTick(() => {
      if (!swiper.destroyed) swiper.allowClick = true;
    });

    if (
      !data.isTouched ||
      !data.isMoved ||
      !swiper.swipeDirection ||
      touches.diff === 0 ||
      data.currentTranslate === data.startTranslate
    ) {
      data.isTouched = false;
      data.isMoved = false;
      data.startMoving = false;
      return;
    }

    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;
    let currentPos;

    if (params.followFinger) {
      currentPos = rtl ? swiper.translate : -swiper.translate;
    } else {
      currentPos = -data.currentTranslate;
    }

    if (params.cssMode) {
      return;
    }

    if (swiper.params.freeMode && params.freeMode.enabled) {
      swiper.freeMode.onTouchEnd({
        currentPos,
      });
      return;
    } // Find current slide

    let stopIndex = 0;
    let groupSize = swiper.slidesSizesGrid[0];

    for (
      let i = 0;
      i < slidesGrid.length;
      i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup
    ) {
      const increment =
        i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;

      if (typeof slidesGrid[i + increment] !== "undefined") {
        if (
          currentPos >= slidesGrid[i] &&
          currentPos < slidesGrid[i + increment]
        ) {
          stopIndex = i;
          groupSize = slidesGrid[i + increment] - slidesGrid[i];
        }
      } else if (currentPos >= slidesGrid[i]) {
        stopIndex = i;
        groupSize =
          slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
      }
    }

    let rewindFirstIndex = null;
    let rewindLastIndex = null;

    if (params.rewind) {
      if (swiper.isBeginning) {
        rewindLastIndex =
          swiper.params.virtual &&
          swiper.params.virtual.enabled &&
          swiper.virtual
            ? swiper.virtual.slides.length - 1
            : swiper.slides.length - 1;
      } else if (swiper.isEnd) {
        rewindFirstIndex = 0;
      }
    } // Find current slide size

    const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
    const increment =
      stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;

    if (timeDiff > params.longSwipesMs) {
      // Long touches
      if (!params.longSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }

      if (swiper.swipeDirection === "next") {
        if (ratio >= params.longSwipesRatio)
          swiper.slideTo(
            params.rewind && swiper.isEnd
              ? rewindFirstIndex
              : stopIndex + increment
          );
        else swiper.slideTo(stopIndex);
      }

      if (swiper.swipeDirection === "prev") {
        if (ratio > 1 - params.longSwipesRatio) {
          swiper.slideTo(stopIndex + increment);
        } else if (
          rewindLastIndex !== null &&
          ratio < 0 &&
          Math.abs(ratio) > params.longSwipesRatio
        ) {
          swiper.slideTo(rewindLastIndex);
        } else {
          swiper.slideTo(stopIndex);
        }
      }
    } else {
      // Short swipes
      if (!params.shortSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }

      const isNavButtonTarget =
        swiper.navigation &&
        (e.target === swiper.navigation.nextEl ||
          e.target === swiper.navigation.prevEl);

      if (!isNavButtonTarget) {
        if (swiper.swipeDirection === "next") {
          swiper.slideTo(
            rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment
          );
        }

        if (swiper.swipeDirection === "prev") {
          swiper.slideTo(
            rewindLastIndex !== null ? rewindLastIndex : stopIndex
          );
        }
      } else if (e.target === swiper.navigation.nextEl) {
        swiper.slideTo(stopIndex + increment);
      } else {
        swiper.slideTo(stopIndex);
      }
    }
  } // CONCATENATED MODULE: ./node_modules/swiper/core/events/onResize.js
  function onResize() {
    const swiper = this;
    const { params, el } = swiper;
    if (el && el.offsetWidth === 0) return; // Breakpoints

    if (params.breakpoints) {
      swiper.setBreakpoint();
    } // Save locks

    const { allowSlideNext, allowSlidePrev, snapGrid } = swiper; // Disable locks on resize

    swiper.allowSlideNext = true;
    swiper.allowSlidePrev = true;
    swiper.updateSize();
    swiper.updateSlides();
    swiper.updateSlidesClasses();

    if (
      (params.slidesPerView === "auto" || params.slidesPerView > 1) &&
      swiper.isEnd &&
      !swiper.isBeginning &&
      !swiper.params.centeredSlides
    ) {
      swiper.slideTo(swiper.slides.length - 1, 0, false, true);
    } else {
      swiper.slideTo(swiper.activeIndex, 0, false, true);
    }

    if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
      swiper.autoplay.run();
    } // Return locks after resize

    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;

    if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
      swiper.checkOverflow();
    }
  } // CONCATENATED MODULE: ./node_modules/swiper/core/events/onClick.js
  function onClick(e) {
    const swiper = this;
    if (!swiper.enabled) return;

    if (!swiper.allowClick) {
      if (swiper.params.preventClicks) e.preventDefault();

      if (swiper.params.preventClicksPropagation && swiper.animating) {
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }
  } // CONCATENATED MODULE: ./node_modules/swiper/core/events/onScroll.js
  function onScroll() {
    const swiper = this;
    const { wrapperEl, rtlTranslate, enabled } = swiper;
    if (!enabled) return;
    swiper.previousTranslate = swiper.translate;

    if (swiper.isHorizontal()) {
      swiper.translate = -wrapperEl.scrollLeft;
    } else {
      swiper.translate = -wrapperEl.scrollTop;
    } // eslint-disable-next-line

    if (swiper.translate === 0) swiper.translate = 0;
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
    let newProgress;
    const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();

    if (translatesDiff === 0) {
      newProgress = 0;
    } else {
      newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
    }

    if (newProgress !== swiper.progress) {
      swiper.updateProgress(
        rtlTranslate ? -swiper.translate : swiper.translate
      );
    }

    swiper.emit("setTranslate", swiper.translate, false);
  } // CONCATENATED MODULE: ./node_modules/swiper/core/events/index.js
  let dummyEventAttached = false;

  function dummyEventListener() {}

  const events = (swiper, method) => {
    const document = ssr_window_esm_getDocument();
    const { params, touchEvents, el, wrapperEl, device, support } = swiper;
    const capture = !!params.nested;
    const domMethod =
      method === "on" ? "addEventListener" : "removeEventListener";
    const swiperMethod = method; // Touch Events

    if (!support.touch) {
      el[domMethod](touchEvents.start, swiper.onTouchStart, false);
      document[domMethod](touchEvents.move, swiper.onTouchMove, capture);
      document[domMethod](touchEvents.end, swiper.onTouchEnd, false);
    } else {
      const passiveListener =
        touchEvents.start === "touchstart" &&
        support.passiveListener &&
        params.passiveListeners
          ? {
              passive: true,
              capture: false,
            }
          : false;
      el[domMethod](touchEvents.start, swiper.onTouchStart, passiveListener);
      el[domMethod](
        touchEvents.move,
        swiper.onTouchMove,
        support.passiveListener
          ? {
              passive: false,
              capture,
            }
          : capture
      );
      el[domMethod](touchEvents.end, swiper.onTouchEnd, passiveListener);

      if (touchEvents.cancel) {
        el[domMethod](touchEvents.cancel, swiper.onTouchEnd, passiveListener);
      }
    } // Prevent Links Clicks

    if (params.preventClicks || params.preventClicksPropagation) {
      el[domMethod]("click", swiper.onClick, true);
    }

    if (params.cssMode) {
      wrapperEl[domMethod]("scroll", swiper.onScroll);
    } // Resize handler

    if (params.updateOnWindowResize) {
      swiper[swiperMethod](
        device.ios || device.android
          ? "resize orientationchange observerUpdate"
          : "resize observerUpdate",
        onResize,
        true
      );
    } else {
      swiper[swiperMethod]("observerUpdate", onResize, true);
    }
  };

  function attachEvents() {
    const swiper = this;
    const document = ssr_window_esm_getDocument();
    const { params, support } = swiper;
    swiper.onTouchStart = onTouchStart.bind(swiper);
    swiper.onTouchMove = onTouchMove.bind(swiper);
    swiper.onTouchEnd = onTouchEnd.bind(swiper);

    if (params.cssMode) {
      swiper.onScroll = onScroll.bind(swiper);
    }

    swiper.onClick = onClick.bind(swiper);

    if (support.touch && !dummyEventAttached) {
      document.addEventListener("touchstart", dummyEventListener);
      dummyEventAttached = true;
    }

    events(swiper, "on");
  }

  function detachEvents() {
    const swiper = this;
    events(swiper, "off");
  }

  /* harmony default export */ const core_events = {
    attachEvents,
    detachEvents,
  }; // CONCATENATED MODULE: ./node_modules/swiper/core/breakpoints/setBreakpoint.js
  const isGridEnabled = (swiper, params) => {
    return swiper.grid && params.grid && params.grid.rows > 1;
  };

  function setBreakpoint() {
    const swiper = this;
    const { activeIndex, initialized, loopedSlides = 0, params, $el } = swiper;
    const breakpoints = params.breakpoints;
    if (!breakpoints || (breakpoints && Object.keys(breakpoints).length === 0))
      return; // Get breakpoint for window width and update parameters

    const breakpoint = swiper.getBreakpoint(
      breakpoints,
      swiper.params.breakpointsBase,
      swiper.el
    );
    if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
    const breakpointOnlyParams =
      breakpoint in breakpoints ? breakpoints[breakpoint] : undefined;
    const breakpointParams = breakpointOnlyParams || swiper.originalParams;
    const wasMultiRow = isGridEnabled(swiper, params);
    const isMultiRow = isGridEnabled(swiper, breakpointParams);
    const wasEnabled = params.enabled;

    if (wasMultiRow && !isMultiRow) {
      $el.removeClass(
        `${params.containerModifierClass}grid ${params.containerModifierClass}grid-column`
      );
      swiper.emitContainerClasses();
    } else if (!wasMultiRow && isMultiRow) {
      $el.addClass(`${params.containerModifierClass}grid`);

      if (
        (breakpointParams.grid.fill &&
          breakpointParams.grid.fill === "column") ||
        (!breakpointParams.grid.fill && params.grid.fill === "column")
      ) {
        $el.addClass(`${params.containerModifierClass}grid-column`);
      }

      swiper.emitContainerClasses();
    }

    const directionChanged =
      breakpointParams.direction &&
      breakpointParams.direction !== params.direction;
    const needsReLoop =
      params.loop &&
      (breakpointParams.slidesPerView !== params.slidesPerView ||
        directionChanged);

    if (directionChanged && initialized) {
      swiper.changeDirection();
    }

    utils_extend(swiper.params, breakpointParams);
    const isEnabled = swiper.params.enabled;
    Object.assign(swiper, {
      allowTouchMove: swiper.params.allowTouchMove,
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev,
    });

    if (wasEnabled && !isEnabled) {
      swiper.disable();
    } else if (!wasEnabled && isEnabled) {
      swiper.enable();
    }

    swiper.currentBreakpoint = breakpoint;
    swiper.emit("_beforeBreakpoint", breakpointParams);

    if (needsReLoop && initialized) {
      swiper.loopDestroy();
      swiper.loopCreate();
      swiper.updateSlides();
      swiper.slideTo(
        activeIndex - loopedSlides + swiper.loopedSlides,
        0,
        false
      );
    }

    swiper.emit("breakpoint", breakpointParams);
  } // CONCATENATED MODULE: ./node_modules/swiper/core/breakpoints/getBreakpoint.js
  function getBreakpoint(breakpoints, base, containerEl) {
    if (base === void 0) {
      base = "window";
    }

    if (!breakpoints || (base === "container" && !containerEl))
      return undefined;
    let breakpoint = false;
    const window = ssr_window_esm_getWindow();
    const currentHeight =
      base === "window" ? window.innerHeight : containerEl.clientHeight;
    const points = Object.keys(breakpoints).map((point) => {
      if (typeof point === "string" && point.indexOf("@") === 0) {
        const minRatio = parseFloat(point.substr(1));
        const value = currentHeight * minRatio;
        return {
          value,
          point,
        };
      }

      return {
        value: point,
        point,
      };
    });
    points.sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10));

    for (let i = 0; i < points.length; i += 1) {
      const { point, value } = points[i];

      if (base === "window") {
        if (window.matchMedia(`(min-width: ${value}px)`).matches) {
          breakpoint = point;
        }
      } else if (value <= containerEl.clientWidth) {
        breakpoint = point;
      }
    }

    return breakpoint || "max";
  } // CONCATENATED MODULE: ./node_modules/swiper/core/breakpoints/index.js
  /* harmony default export */ const breakpoints = {
    setBreakpoint: setBreakpoint,
    getBreakpoint: getBreakpoint,
  }; // CONCATENATED MODULE: ./node_modules/swiper/core/classes/addClasses.js
  function prepareClasses(entries, prefix) {
    const resultClasses = [];
    entries.forEach((item) => {
      if (typeof item === "object") {
        Object.keys(item).forEach((classNames) => {
          if (item[classNames]) {
            resultClasses.push(prefix + classNames);
          }
        });
      } else if (typeof item === "string") {
        resultClasses.push(prefix + item);
      }
    });
    return resultClasses;
  }

  function addClasses() {
    const swiper = this;
    const {
    classNames,
    params,
    rtl,
    $el,
    device,
    support
  } = swiper; // prettier-ignore

    const suffixes = prepareClasses(
      [
        "initialized",
        params.direction,
        {
          "pointer-events": !support.touch,
        },
        {
          "free-mode": swiper.params.freeMode && params.freeMode.enabled,
        },
        {
          autoheight: params.autoHeight,
        },
        {
          rtl: rtl,
        },
        {
          grid: params.grid && params.grid.rows > 1,
        },
        {
          "grid-column":
            params.grid &&
            params.grid.rows > 1 &&
            params.grid.fill === "column",
        },
        {
          android: device.android,
        },
        {
          ios: device.ios,
        },
        {
          "css-mode": params.cssMode,
        },
        {
          centered: params.cssMode && params.centeredSlides,
        },
      ],
      params.containerModifierClass
    );
    classNames.push(...suffixes);
    $el.addClass([...classNames].join(" "));
    swiper.emitContainerClasses();
  } // CONCATENATED MODULE: ./node_modules/swiper/core/classes/removeClasses.js
  function removeClasses_removeClasses() {
    const swiper = this;
    const { $el, classNames } = swiper;
    $el.removeClass(classNames.join(" "));
    swiper.emitContainerClasses();
  } // CONCATENATED MODULE: ./node_modules/swiper/core/classes/index.js
  /* harmony default export */ const classes = {
    addClasses: addClasses,
    removeClasses: removeClasses_removeClasses,
  }; // CONCATENATED MODULE: ./node_modules/swiper/core/images/loadImage.js
  function loadImage(imageEl, src, srcset, sizes, checkForComplete, callback) {
    const window = ssr_window_esm_getWindow();
    let image;

    function onReady() {
      if (callback) callback();
    }

    const isPicture = dom(imageEl).parent("picture")[0];

    if (!isPicture && (!imageEl.complete || !checkForComplete)) {
      if (src) {
        image = new window.Image();
        image.onload = onReady;
        image.onerror = onReady;

        if (sizes) {
          image.sizes = sizes;
        }

        if (srcset) {
          image.srcset = srcset;
        }

        if (src) {
          image.src = src;
        }
      } else {
        onReady();
      }
    } else {
      // image already loaded...
      onReady();
    }
  } // CONCATENATED MODULE: ./node_modules/swiper/core/images/preloadImages.js
  function preloadImages() {
    const swiper = this;
    swiper.imagesToLoad = swiper.$el.find("img");

    function onReady() {
      if (
        typeof swiper === "undefined" ||
        swiper === null ||
        !swiper ||
        swiper.destroyed
      )
        return;
      if (swiper.imagesLoaded !== undefined) swiper.imagesLoaded += 1;

      if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
        if (swiper.params.updateOnImagesReady) swiper.update();
        swiper.emit("imagesReady");
      }
    }

    for (let i = 0; i < swiper.imagesToLoad.length; i += 1) {
      const imageEl = swiper.imagesToLoad[i];
      swiper.loadImage(
        imageEl,
        imageEl.currentSrc || imageEl.getAttribute("src"),
        imageEl.srcset || imageEl.getAttribute("srcset"),
        imageEl.sizes || imageEl.getAttribute("sizes"),
        true,
        onReady
      );
    }
  } // CONCATENATED MODULE: ./node_modules/swiper/core/images/index.js
  /* harmony default export */ const core_images = {
    loadImage: loadImage,
    preloadImages: preloadImages,
  }; // CONCATENATED MODULE: ./node_modules/swiper/core/check-overflow/index.js
  function checkOverflow() {
    const swiper = this;
    const { isLocked: wasLocked, params } = swiper;
    const { slidesOffsetBefore } = params;

    if (slidesOffsetBefore) {
      const lastSlideIndex = swiper.slides.length - 1;
      const lastSlideRightEdge =
        swiper.slidesGrid[lastSlideIndex] +
        swiper.slidesSizesGrid[lastSlideIndex] +
        slidesOffsetBefore * 2;
      swiper.isLocked = swiper.size > lastSlideRightEdge;
    } else {
      swiper.isLocked = swiper.snapGrid.length === 1;
    }

    if (params.allowSlideNext === true) {
      swiper.allowSlideNext = !swiper.isLocked;
    }

    if (params.allowSlidePrev === true) {
      swiper.allowSlidePrev = !swiper.isLocked;
    }

    if (wasLocked && wasLocked !== swiper.isLocked) {
      swiper.isEnd = false;
    }

    if (wasLocked !== swiper.isLocked) {
      swiper.emit(swiper.isLocked ? "lock" : "unlock");
    }
  }

  /* harmony default export */ const check_overflow = {
    checkOverflow,
  }; // CONCATENATED MODULE: ./node_modules/swiper/core/defaults.js
  /* harmony default export */ const defaults = {
    init: true,
    direction: "horizontal",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: false,
    updateOnWindowResize: true,
    resizeObserver: true,
    nested: false,
    createElements: false,
    enabled: true,
    focusableElements: "input, select, option, textarea, button, video, label",
    // Overrides
    width: null,
    height: null,
    //
    preventInteractionOnTransition: false,
    // ssr
    userAgent: null,
    url: null,
    // To support iOS's swipe-to-go-back gesture (when being used in-app).
    edgeSwipeDetection: false,
    edgeSwipeThreshold: 20,
    // Autoheight
    autoHeight: false,
    // Set wrapper width
    setWrapperSize: false,
    // Virtual Translate
    virtualTranslate: false,
    // Effects
    effect: "slide",
    // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
    // Breakpoints
    breakpoints: undefined,
    breakpointsBase: "window",
    // Slides grid
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: false,
    centeredSlides: false,
    centeredSlidesBounds: false,
    slidesOffsetBefore: 0,
    // in px
    slidesOffsetAfter: 0,
    // in px
    normalizeSlideIndex: true,
    centerInsufficientSlides: false,
    // Disable swiper and hide navigation when container not overflow
    watchOverflow: true,
    // Round length
    roundLengths: false,
    // Touches
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: true,
    shortSwipes: true,
    longSwipes: true,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: true,
    allowTouchMove: true,
    threshold: 0,
    touchMoveStopPropagation: false,
    touchStartPreventDefault: true,
    touchStartForcePreventDefault: false,
    touchReleaseOnEdges: false,
    // Unique Navigation Elements
    uniqueNavElements: true,
    // Resistance
    resistance: true,
    resistanceRatio: 0.85,
    // Progress
    watchSlidesProgress: false,
    // Cursor
    grabCursor: false,
    // Clicks
    preventClicks: true,
    preventClicksPropagation: true,
    slideToClickedSlide: false,
    // Images
    preloadImages: true,
    updateOnImagesReady: true,
    // loop
    loop: false,
    loopAdditionalSlides: 0,
    loopedSlides: null,
    loopFillGroupWithBlank: false,
    loopPreventsSlide: true,
    // rewind
    rewind: false,
    // Swiping/no swiping
    allowSlidePrev: true,
    allowSlideNext: true,
    swipeHandler: null,
    // '.swipe-handler',
    noSwiping: true,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    // Passive Listeners
    passiveListeners: true,
    maxBackfaceHiddenSlides: 10,
    // NS
    containerModifierClass: "swiper-",
    // NEW
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-invisible-blank",
    slideActiveClass: "swiper-slide-active",
    slideDuplicateActiveClass: "swiper-slide-duplicate-active",
    slideVisibleClass: "swiper-slide-visible",
    slideDuplicateClass: "swiper-slide-duplicate",
    slideNextClass: "swiper-slide-next",
    slideDuplicateNextClass: "swiper-slide-duplicate-next",
    slidePrevClass: "swiper-slide-prev",
    slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
    wrapperClass: "swiper-wrapper",
    // Callbacks
    runCallbacksOnInit: true,
    // Internals
    _emitClasses: false,
  }; // CONCATENATED MODULE: ./node_modules/swiper/core/moduleExtendParams.js
  function moduleExtendParams(params, allModulesParams) {
    return function extendParams(obj) {
      if (obj === void 0) {
        obj = {};
      }

      const moduleParamName = Object.keys(obj)[0];
      const moduleParams = obj[moduleParamName];

      if (typeof moduleParams !== "object" || moduleParams === null) {
        utils_extend(allModulesParams, obj);
        return;
      }

      if (
        ["navigation", "pagination", "scrollbar"].indexOf(moduleParamName) >=
          0 &&
        params[moduleParamName] === true
      ) {
        params[moduleParamName] = {
          auto: true,
        };
      }

      if (!(moduleParamName in params && "enabled" in moduleParams)) {
        utils_extend(allModulesParams, obj);
        return;
      }

      if (params[moduleParamName] === true) {
        params[moduleParamName] = {
          enabled: true,
        };
      }

      if (
        typeof params[moduleParamName] === "object" &&
        !("enabled" in params[moduleParamName])
      ) {
        params[moduleParamName].enabled = true;
      }

      if (!params[moduleParamName])
        params[moduleParamName] = {
          enabled: false,
        };
      utils_extend(allModulesParams, obj);
    };
  } // CONCATENATED MODULE: ./node_modules/swiper/core/core.js
  /* eslint no-param-reassign: "off" */

  const prototypes = {
    eventsEmitter: events_emitter,
    update: update,
    translate: translate,
    transition: core_transition,
    slide: slide,
    loop: loop,
    grabCursor: grab_cursor,
    events: core_events,
    breakpoints: breakpoints,
    checkOverflow: check_overflow,
    classes: classes,
    images: core_images,
  };
  const extendedDefaults = {};

  class core_Swiper {
    constructor() {
      let el;
      let params;

      for (
        var _len = arguments.length, args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key];
      }

      if (
        args.length === 1 &&
        args[0].constructor &&
        Object.prototype.toString.call(args[0]).slice(8, -1) === "Object"
      ) {
        params = args[0];
      } else {
        [el, params] = args;
      }

      if (!params) params = {};
      params = utils_extend({}, params);
      if (el && !params.el) params.el = el;

      if (params.el && dom(params.el).length > 1) {
        const swipers = [];
        dom(params.el).each((containerEl) => {
          const newParams = utils_extend({}, params, {
            el: containerEl,
          });
          swipers.push(new core_Swiper(newParams));
        });
        return swipers;
      } // Swiper Instance

      const swiper = this;
      swiper.__swiper__ = true;
      swiper.support = getSupport();
      swiper.device = getDevice({
        userAgent: params.userAgent,
      });
      swiper.browser = getBrowser();
      swiper.eventsListeners = {};
      swiper.eventsAnyListeners = [];
      swiper.modules = [...swiper.__modules__];

      if (params.modules && Array.isArray(params.modules)) {
        swiper.modules.push(...params.modules);
      }

      const allModulesParams = {};
      swiper.modules.forEach((mod) => {
        mod({
          swiper,
          extendParams: moduleExtendParams(params, allModulesParams),
          on: swiper.on.bind(swiper),
          once: swiper.once.bind(swiper),
          off: swiper.off.bind(swiper),
          emit: swiper.emit.bind(swiper),
        });
      }); // Extend defaults with modules params

      const swiperParams = utils_extend({}, defaults, allModulesParams); // Extend defaults with passed params

      swiper.params = utils_extend({}, swiperParams, extendedDefaults, params);
      swiper.originalParams = utils_extend({}, swiper.params);
      swiper.passedParams = utils_extend({}, params); // add event listeners

      if (swiper.params && swiper.params.on) {
        Object.keys(swiper.params.on).forEach((eventName) => {
          swiper.on(eventName, swiper.params.on[eventName]);
        });
      }

      if (swiper.params && swiper.params.onAny) {
        swiper.onAny(swiper.params.onAny);
      } // Save Dom lib

      swiper.$ = dom; // Extend Swiper

      Object.assign(swiper, {
        enabled: swiper.params.enabled,
        el,
        // Classes
        classNames: [],
        // Slides
        slides: dom(),
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],

        // isDirection
        isHorizontal() {
          return swiper.params.direction === "horizontal";
        },

        isVertical() {
          return swiper.params.direction === "vertical";
        },

        // Indexes
        activeIndex: 0,
        realIndex: 0,
        //
        isBeginning: true,
        isEnd: false,
        // Props
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: false,
        // Locks
        allowSlideNext: swiper.params.allowSlideNext,
        allowSlidePrev: swiper.params.allowSlidePrev,
        // Touch Events
        touchEvents: (function touchEvents() {
          const touch = ["touchstart", "touchmove", "touchend", "touchcancel"];
          const desktop = ["pointerdown", "pointermove", "pointerup"];
          swiper.touchEventsTouch = {
            start: touch[0],
            move: touch[1],
            end: touch[2],
            cancel: touch[3],
          };
          swiper.touchEventsDesktop = {
            start: desktop[0],
            move: desktop[1],
            end: desktop[2],
          };
          return swiper.support.touch || !swiper.params.simulateTouch
            ? swiper.touchEventsTouch
            : swiper.touchEventsDesktop;
        })(),
        touchEventsData: {
          isTouched: undefined,
          isMoved: undefined,
          allowTouchCallbacks: undefined,
          touchStartTime: undefined,
          isScrolling: undefined,
          currentTranslate: undefined,
          startTranslate: undefined,
          allowThresholdMove: undefined,
          // Form elements to match
          focusableElements: swiper.params.focusableElements,
          // Last click time
          lastClickTime: utils_now(),
          clickTimeout: undefined,
          // Velocities
          velocities: [],
          allowMomentumBounce: undefined,
          isTouchEvent: undefined,
          startMoving: undefined,
        },
        // Clicks
        allowClick: true,
        // Touches
        allowTouchMove: swiper.params.allowTouchMove,
        touches: {
          startX: 0,
          startY: 0,
          currentX: 0,
          currentY: 0,
          diff: 0,
        },
        // Images
        imagesToLoad: [],
        imagesLoaded: 0,
      });
      swiper.emit("_swiper"); // Init

      if (swiper.params.init) {
        swiper.init();
      } // Return app instance

      return swiper;
    }

    enable() {
      const swiper = this;
      if (swiper.enabled) return;
      swiper.enabled = true;

      if (swiper.params.grabCursor) {
        swiper.setGrabCursor();
      }

      swiper.emit("enable");
    }

    disable() {
      const swiper = this;
      if (!swiper.enabled) return;
      swiper.enabled = false;

      if (swiper.params.grabCursor) {
        swiper.unsetGrabCursor();
      }

      swiper.emit("disable");
    }

    setProgress(progress, speed) {
      const swiper = this;
      progress = Math.min(Math.max(progress, 0), 1);
      const min = swiper.minTranslate();
      const max = swiper.maxTranslate();
      const current = (max - min) * progress + min;
      swiper.translateTo(current, typeof speed === "undefined" ? 0 : speed);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }

    emitContainerClasses() {
      const swiper = this;
      if (!swiper.params._emitClasses || !swiper.el) return;
      const cls = swiper.el.className.split(" ").filter((className) => {
        return (
          className.indexOf("swiper") === 0 ||
          className.indexOf(swiper.params.containerModifierClass) === 0
        );
      });
      swiper.emit("_containerClasses", cls.join(" "));
    }

    getSlideClasses(slideEl) {
      const swiper = this;
      return slideEl.className
        .split(" ")
        .filter((className) => {
          return (
            className.indexOf("swiper-slide") === 0 ||
            className.indexOf(swiper.params.slideClass) === 0
          );
        })
        .join(" ");
    }

    emitSlidesClasses() {
      const swiper = this;
      if (!swiper.params._emitClasses || !swiper.el) return;
      const updates = [];
      swiper.slides.each((slideEl) => {
        const classNames = swiper.getSlideClasses(slideEl);
        updates.push({
          slideEl,
          classNames,
        });
        swiper.emit("_slideClass", slideEl, classNames);
      });
      swiper.emit("_slideClasses", updates);
    }

    slidesPerViewDynamic(view, exact) {
      if (view === void 0) {
        view = "current";
      }

      if (exact === void 0) {
        exact = false;
      }

      const swiper = this;
      const {
        params,
        slides,
        slidesGrid,
        slidesSizesGrid,
        size: swiperSize,
        activeIndex,
      } = swiper;
      let spv = 1;

      if (params.centeredSlides) {
        let slideSize = slides[activeIndex].swiperSlideSize;
        let breakLoop;

        for (let i = activeIndex + 1; i < slides.length; i += 1) {
          if (slides[i] && !breakLoop) {
            slideSize += slides[i].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize) breakLoop = true;
          }
        }

        for (let i = activeIndex - 1; i >= 0; i -= 1) {
          if (slides[i] && !breakLoop) {
            slideSize += slides[i].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize) breakLoop = true;
          }
        }
      } else {
        // eslint-disable-next-line
        if (view === "current") {
          for (let i = activeIndex + 1; i < slides.length; i += 1) {
            const slideInView = exact
              ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] <
                swiperSize
              : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;

            if (slideInView) {
              spv += 1;
            }
          }
        } else {
          // previous
          for (let i = activeIndex - 1; i >= 0; i -= 1) {
            const slideInView =
              slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;

            if (slideInView) {
              spv += 1;
            }
          }
        }
      }

      return spv;
    }

    update() {
      const swiper = this;
      if (!swiper || swiper.destroyed) return;
      const { snapGrid, params } = swiper; // Breakpoints

      if (params.breakpoints) {
        swiper.setBreakpoint();
      }

      swiper.updateSize();
      swiper.updateSlides();
      swiper.updateProgress();
      swiper.updateSlidesClasses();

      function setTranslate() {
        const translateValue = swiper.rtlTranslate
          ? swiper.translate * -1
          : swiper.translate;
        const newTranslate = Math.min(
          Math.max(translateValue, swiper.maxTranslate()),
          swiper.minTranslate()
        );
        swiper.setTranslate(newTranslate);
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }

      let translated;

      if (swiper.params.freeMode && swiper.params.freeMode.enabled) {
        setTranslate();

        if (swiper.params.autoHeight) {
          swiper.updateAutoHeight();
        }
      } else {
        if (
          (swiper.params.slidesPerView === "auto" ||
            swiper.params.slidesPerView > 1) &&
          swiper.isEnd &&
          !swiper.params.centeredSlides
        ) {
          translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true);
        } else {
          translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
        }

        if (!translated) {
          setTranslate();
        }
      }

      if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
        swiper.checkOverflow();
      }

      swiper.emit("update");
    }

    changeDirection(newDirection, needUpdate) {
      if (needUpdate === void 0) {
        needUpdate = true;
      }

      const swiper = this;
      const currentDirection = swiper.params.direction;

      if (!newDirection) {
        // eslint-disable-next-line
        newDirection =
          currentDirection === "horizontal" ? "vertical" : "horizontal";
      }

      if (
        newDirection === currentDirection ||
        (newDirection !== "horizontal" && newDirection !== "vertical")
      ) {
        return swiper;
      }

      swiper.$el
        .removeClass(
          `${swiper.params.containerModifierClass}${currentDirection}`
        )
        .addClass(`${swiper.params.containerModifierClass}${newDirection}`);
      swiper.emitContainerClasses();
      swiper.params.direction = newDirection;
      swiper.slides.each((slideEl) => {
        if (newDirection === "vertical") {
          slideEl.style.width = "";
        } else {
          slideEl.style.height = "";
        }
      });
      swiper.emit("changeDirection");
      if (needUpdate) swiper.update();
      return swiper;
    }

    mount(el) {
      const swiper = this;
      if (swiper.mounted) return true; // Find el

      const $el = dom(el || swiper.params.el);
      el = $el[0];

      if (!el) {
        return false;
      }

      el.swiper = swiper;

      const getWrapperSelector = () => {
        return `.${(swiper.params.wrapperClass || "")
          .trim()
          .split(" ")
          .join(".")}`;
      };

      const getWrapper = () => {
        if (el && el.shadowRoot && el.shadowRoot.querySelector) {
          const res = dom(el.shadowRoot.querySelector(getWrapperSelector())); // Children needs to return slot items

          res.children = (options) => $el.children(options);

          return res;
        }

        return $el.children(getWrapperSelector());
      }; // Find Wrapper

      let $wrapperEl = getWrapper();

      if ($wrapperEl.length === 0 && swiper.params.createElements) {
        const document = ssr_window_esm_getDocument();
        const wrapper = document.createElement("div");
        $wrapperEl = dom(wrapper);
        wrapper.className = swiper.params.wrapperClass;
        $el.append(wrapper);
        $el.children(`.${swiper.params.slideClass}`).each((slideEl) => {
          $wrapperEl.append(slideEl);
        });
      }

      Object.assign(swiper, {
        $el,
        el,
        $wrapperEl,
        wrapperEl: $wrapperEl[0],
        mounted: true,
        // RTL
        rtl: el.dir.toLowerCase() === "rtl" || $el.css("direction") === "rtl",
        rtlTranslate:
          swiper.params.direction === "horizontal" &&
          (el.dir.toLowerCase() === "rtl" || $el.css("direction") === "rtl"),
        wrongRTL: $wrapperEl.css("display") === "-webkit-box",
      });
      return true;
    }

    init(el) {
      const swiper = this;
      if (swiper.initialized) return swiper;
      const mounted = swiper.mount(el);
      if (mounted === false) return swiper;
      swiper.emit("beforeInit"); // Set breakpoint

      if (swiper.params.breakpoints) {
        swiper.setBreakpoint();
      } // Add Classes

      swiper.addClasses(); // Create loop

      if (swiper.params.loop) {
        swiper.loopCreate();
      } // Update size

      swiper.updateSize(); // Update slides

      swiper.updateSlides();

      if (swiper.params.watchOverflow) {
        swiper.checkOverflow();
      } // Set Grab Cursor

      if (swiper.params.grabCursor && swiper.enabled) {
        swiper.setGrabCursor();
      }

      if (swiper.params.preloadImages) {
        swiper.preloadImages();
      } // Slide To Initial Slide

      if (swiper.params.loop) {
        swiper.slideTo(
          swiper.params.initialSlide + swiper.loopedSlides,
          0,
          swiper.params.runCallbacksOnInit,
          false,
          true
        );
      } else {
        swiper.slideTo(
          swiper.params.initialSlide,
          0,
          swiper.params.runCallbacksOnInit,
          false,
          true
        );
      } // Attach events

      swiper.attachEvents(); // Init Flag

      swiper.initialized = true; // Emit

      swiper.emit("init");
      swiper.emit("afterInit");
      return swiper;
    }

    destroy(deleteInstance, cleanStyles) {
      if (deleteInstance === void 0) {
        deleteInstance = true;
      }

      if (cleanStyles === void 0) {
        cleanStyles = true;
      }

      const swiper = this;
      const { params, $el, $wrapperEl, slides } = swiper;

      if (typeof swiper.params === "undefined" || swiper.destroyed) {
        return null;
      }

      swiper.emit("beforeDestroy"); // Init Flag

      swiper.initialized = false; // Detach events

      swiper.detachEvents(); // Destroy loop

      if (params.loop) {
        swiper.loopDestroy();
      } // Cleanup styles

      if (cleanStyles) {
        swiper.removeClasses();
        $el.removeAttr("style");
        $wrapperEl.removeAttr("style");

        if (slides && slides.length) {
          slides
            .removeClass(
              [
                params.slideVisibleClass,
                params.slideActiveClass,
                params.slideNextClass,
                params.slidePrevClass,
              ].join(" ")
            )
            .removeAttr("style")
            .removeAttr("data-swiper-slide-index");
        }
      }

      swiper.emit("destroy"); // Detach emitter events

      Object.keys(swiper.eventsListeners).forEach((eventName) => {
        swiper.off(eventName);
      });

      if (deleteInstance !== false) {
        swiper.$el[0].swiper = null;
        deleteProps(swiper);
      }

      swiper.destroyed = true;
      return null;
    }

    static extendDefaults(newDefaults) {
      utils_extend(extendedDefaults, newDefaults);
    }

    static get extendedDefaults() {
      return extendedDefaults;
    }

    static get defaults() {
      return defaults;
    }

    static installModule(mod) {
      if (!core_Swiper.prototype.__modules__)
        core_Swiper.prototype.__modules__ = [];
      const modules = core_Swiper.prototype.__modules__;

      if (typeof mod === "function" && modules.indexOf(mod) < 0) {
        modules.push(mod);
      }
    }

    static use(module) {
      if (Array.isArray(module)) {
        module.forEach((m) => core_Swiper.installModule(m));
        return core_Swiper;
      }

      core_Swiper.installModule(module);
      return core_Swiper;
    }
  }

  Object.keys(prototypes).forEach((prototypeGroup) => {
    Object.keys(prototypes[prototypeGroup]).forEach((protoMethod) => {
      core_Swiper.prototype[protoMethod] =
        prototypes[prototypeGroup][protoMethod];
    });
  });
  core_Swiper.use([Resize, Observer]);
  /* harmony default export */ const core = core_Swiper; // CONCATENATED MODULE: ./node_modules/swiper/modules/virtual/virtual.js
  function Virtual(_ref) {
    let { swiper, extendParams, on, emit } = _ref;
    extendParams({
      virtual: {
        enabled: false,
        slides: [],
        cache: true,
        renderSlide: null,
        renderExternal: null,
        renderExternalUpdate: true,
        addSlidesBefore: 0,
        addSlidesAfter: 0,
      },
    });
    let cssModeTimeout;
    swiper.virtual = {
      cache: {},
      from: undefined,
      to: undefined,
      slides: [],
      offset: 0,
      slidesGrid: [],
    };

    function renderSlide(slide, index) {
      const params = swiper.params.virtual;

      if (params.cache && swiper.virtual.cache[index]) {
        return swiper.virtual.cache[index];
      }

      const $slideEl = params.renderSlide
        ? $(params.renderSlide.call(swiper, slide, index))
        : $(
            `<div class="${swiper.params.slideClass}" data-swiper-slide-index="${index}">${slide}</div>`
          );
      if (!$slideEl.attr("data-swiper-slide-index"))
        $slideEl.attr("data-swiper-slide-index", index);
      if (params.cache) swiper.virtual.cache[index] = $slideEl;
      return $slideEl;
    }

    function update(force) {
      const { slidesPerView, slidesPerGroup, centeredSlides } = swiper.params;
      const { addSlidesBefore, addSlidesAfter } = swiper.params.virtual;
      const {
        from: previousFrom,
        to: previousTo,
        slides,
        slidesGrid: previousSlidesGrid,
        offset: previousOffset,
      } = swiper.virtual;

      if (!swiper.params.cssMode) {
        swiper.updateActiveIndex();
      }

      const activeIndex = swiper.activeIndex || 0;
      let offsetProp;
      if (swiper.rtlTranslate) offsetProp = "right";
      else offsetProp = swiper.isHorizontal() ? "left" : "top";
      let slidesAfter;
      let slidesBefore;

      if (centeredSlides) {
        slidesAfter =
          Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesAfter;
        slidesBefore =
          Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesBefore;
      } else {
        slidesAfter = slidesPerView + (slidesPerGroup - 1) + addSlidesAfter;
        slidesBefore = slidesPerGroup + addSlidesBefore;
      }

      const from = Math.max((activeIndex || 0) - slidesBefore, 0);
      const to = Math.min((activeIndex || 0) + slidesAfter, slides.length - 1);
      const offset =
        (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);
      Object.assign(swiper.virtual, {
        from,
        to,
        offset,
        slidesGrid: swiper.slidesGrid,
      });

      function onRendered() {
        swiper.updateSlides();
        swiper.updateProgress();
        swiper.updateSlidesClasses();

        if (swiper.lazy && swiper.params.lazy.enabled) {
          swiper.lazy.load();
        }

        emit("virtualUpdate");
      }

      if (previousFrom === from && previousTo === to && !force) {
        if (
          swiper.slidesGrid !== previousSlidesGrid &&
          offset !== previousOffset
        ) {
          swiper.slides.css(offsetProp, `${offset}px`);
        }

        swiper.updateProgress();
        emit("virtualUpdate");
        return;
      }

      if (swiper.params.virtual.renderExternal) {
        swiper.params.virtual.renderExternal.call(swiper, {
          offset,
          from,
          to,
          slides: (function getSlides() {
            const slidesToRender = [];

            for (let i = from; i <= to; i += 1) {
              slidesToRender.push(slides[i]);
            }

            return slidesToRender;
          })(),
        });

        if (swiper.params.virtual.renderExternalUpdate) {
          onRendered();
        } else {
          emit("virtualUpdate");
        }

        return;
      }

      const prependIndexes = [];
      const appendIndexes = [];

      if (force) {
        swiper.$wrapperEl.find(`.${swiper.params.slideClass}`).remove();
      } else {
        for (let i = previousFrom; i <= previousTo; i += 1) {
          if (i < from || i > to) {
            swiper.$wrapperEl
              .find(
                `.${swiper.params.slideClass}[data-swiper-slide-index="${i}"]`
              )
              .remove();
          }
        }
      }

      for (let i = 0; i < slides.length; i += 1) {
        if (i >= from && i <= to) {
          if (typeof previousTo === "undefined" || force) {
            appendIndexes.push(i);
          } else {
            if (i > previousTo) appendIndexes.push(i);
            if (i < previousFrom) prependIndexes.push(i);
          }
        }
      }

      appendIndexes.forEach((index) => {
        swiper.$wrapperEl.append(renderSlide(slides[index], index));
      });
      prependIndexes
        .sort((a, b) => b - a)
        .forEach((index) => {
          swiper.$wrapperEl.prepend(renderSlide(slides[index], index));
        });
      swiper.$wrapperEl
        .children(".swiper-slide")
        .css(offsetProp, `${offset}px`);
      onRendered();
    }

    function appendSlide(slides) {
      if (typeof slides === "object" && "length" in slides) {
        for (let i = 0; i < slides.length; i += 1) {
          if (slides[i]) swiper.virtual.slides.push(slides[i]);
        }
      } else {
        swiper.virtual.slides.push(slides);
      }

      update(true);
    }

    function prependSlide(slides) {
      const activeIndex = swiper.activeIndex;
      let newActiveIndex = activeIndex + 1;
      let numberOfNewSlides = 1;

      if (Array.isArray(slides)) {
        for (let i = 0; i < slides.length; i += 1) {
          if (slides[i]) swiper.virtual.slides.unshift(slides[i]);
        }

        newActiveIndex = activeIndex + slides.length;
        numberOfNewSlides = slides.length;
      } else {
        swiper.virtual.slides.unshift(slides);
      }

      if (swiper.params.virtual.cache) {
        const cache = swiper.virtual.cache;
        const newCache = {};
        Object.keys(cache).forEach((cachedIndex) => {
          const $cachedEl = cache[cachedIndex];
          const cachedElIndex = $cachedEl.attr("data-swiper-slide-index");

          if (cachedElIndex) {
            $cachedEl.attr(
              "data-swiper-slide-index",
              parseInt(cachedElIndex, 10) + numberOfNewSlides
            );
          }

          newCache[parseInt(cachedIndex, 10) + numberOfNewSlides] = $cachedEl;
        });
        swiper.virtual.cache = newCache;
      }

      update(true);
      swiper.slideTo(newActiveIndex, 0);
    }

    function removeSlide(slidesIndexes) {
      if (typeof slidesIndexes === "undefined" || slidesIndexes === null)
        return;
      let activeIndex = swiper.activeIndex;

      if (Array.isArray(slidesIndexes)) {
        for (let i = slidesIndexes.length - 1; i >= 0; i -= 1) {
          swiper.virtual.slides.splice(slidesIndexes[i], 1);

          if (swiper.params.virtual.cache) {
            delete swiper.virtual.cache[slidesIndexes[i]];
          }

          if (slidesIndexes[i] < activeIndex) activeIndex -= 1;
          activeIndex = Math.max(activeIndex, 0);
        }
      } else {
        swiper.virtual.slides.splice(slidesIndexes, 1);

        if (swiper.params.virtual.cache) {
          delete swiper.virtual.cache[slidesIndexes];
        }

        if (slidesIndexes < activeIndex) activeIndex -= 1;
        activeIndex = Math.max(activeIndex, 0);
      }

      update(true);
      swiper.slideTo(activeIndex, 0);
    }

    function removeAllSlides() {
      swiper.virtual.slides = [];

      if (swiper.params.virtual.cache) {
        swiper.virtual.cache = {};
      }

      update(true);
      swiper.slideTo(0, 0);
    }

    on("beforeInit", () => {
      if (!swiper.params.virtual.enabled) return;
      swiper.virtual.slides = swiper.params.virtual.slides;
      swiper.classNames.push(`${swiper.params.containerModifierClass}virtual`);
      swiper.params.watchSlidesProgress = true;
      swiper.originalParams.watchSlidesProgress = true;

      if (!swiper.params.initialSlide) {
        update();
      }
    });
    on("setTranslate", () => {
      if (!swiper.params.virtual.enabled) return;

      if (swiper.params.cssMode && !swiper._immediateVirtual) {
        clearTimeout(cssModeTimeout);
        cssModeTimeout = setTimeout(() => {
          update();
        }, 100);
      } else {
        update();
      }
    });
    on("init update resize", () => {
      if (!swiper.params.virtual.enabled) return;

      if (swiper.params.cssMode) {
        setCSSProperty(
          swiper.wrapperEl,
          "--swiper-virtual-size",
          `${swiper.virtualSize}px`
        );
      }
    });
    Object.assign(swiper.virtual, {
      appendSlide,
      prependSlide,
      removeSlide,
      removeAllSlides,
      update,
    });
  } // CONCATENATED MODULE: ./node_modules/swiper/modules/keyboard/keyboard.js
  /* eslint-disable consistent-return */

  function Keyboard(_ref) {
    let { swiper, extendParams, on, emit } = _ref;
    const document = getDocument();
    const window = getWindow();
    swiper.keyboard = {
      enabled: false,
    };
    extendParams({
      keyboard: {
        enabled: false,
        onlyInViewport: true,
        pageUpDown: true,
      },
    });

    function handle(event) {
      if (!swiper.enabled) return;
      const { rtlTranslate: rtl } = swiper;
      let e = event;
      if (e.originalEvent) e = e.originalEvent; // jquery fix

      const kc = e.keyCode || e.charCode;
      const pageUpDown = swiper.params.keyboard.pageUpDown;
      const isPageUp = pageUpDown && kc === 33;
      const isPageDown = pageUpDown && kc === 34;
      const isArrowLeft = kc === 37;
      const isArrowRight = kc === 39;
      const isArrowUp = kc === 38;
      const isArrowDown = kc === 40; // Directions locks

      if (
        !swiper.allowSlideNext &&
        ((swiper.isHorizontal() && isArrowRight) ||
          (swiper.isVertical() && isArrowDown) ||
          isPageDown)
      ) {
        return false;
      }

      if (
        !swiper.allowSlidePrev &&
        ((swiper.isHorizontal() && isArrowLeft) ||
          (swiper.isVertical() && isArrowUp) ||
          isPageUp)
      ) {
        return false;
      }

      if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
        return undefined;
      }

      if (
        document.activeElement &&
        document.activeElement.nodeName &&
        (document.activeElement.nodeName.toLowerCase() === "input" ||
          document.activeElement.nodeName.toLowerCase() === "textarea")
      ) {
        return undefined;
      }

      if (
        swiper.params.keyboard.onlyInViewport &&
        (isPageUp ||
          isPageDown ||
          isArrowLeft ||
          isArrowRight ||
          isArrowUp ||
          isArrowDown)
      ) {
        let inView = false; // Check that swiper should be inside of visible area of window

        if (
          swiper.$el.parents(`.${swiper.params.slideClass}`).length > 0 &&
          swiper.$el.parents(`.${swiper.params.slideActiveClass}`).length === 0
        ) {
          return undefined;
        }

        const $el = swiper.$el;
        const swiperWidth = $el[0].clientWidth;
        const swiperHeight = $el[0].clientHeight;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const swiperOffset = swiper.$el.offset();
        if (rtl) swiperOffset.left -= swiper.$el[0].scrollLeft;
        const swiperCoord = [
          [swiperOffset.left, swiperOffset.top],
          [swiperOffset.left + swiperWidth, swiperOffset.top],
          [swiperOffset.left, swiperOffset.top + swiperHeight],
          [swiperOffset.left + swiperWidth, swiperOffset.top + swiperHeight],
        ];

        for (let i = 0; i < swiperCoord.length; i += 1) {
          const point = swiperCoord[i];

          if (
            point[0] >= 0 &&
            point[0] <= windowWidth &&
            point[1] >= 0 &&
            point[1] <= windowHeight
          ) {
            if (point[0] === 0 && point[1] === 0) continue; // eslint-disable-line

            inView = true;
          }
        }

        if (!inView) return undefined;
      }

      if (swiper.isHorizontal()) {
        if (isPageUp || isPageDown || isArrowLeft || isArrowRight) {
          if (e.preventDefault) e.preventDefault();
          else e.returnValue = false;
        }

        if (
          ((isPageDown || isArrowRight) && !rtl) ||
          ((isPageUp || isArrowLeft) && rtl)
        )
          swiper.slideNext();
        if (
          ((isPageUp || isArrowLeft) && !rtl) ||
          ((isPageDown || isArrowRight) && rtl)
        )
          swiper.slidePrev();
      } else {
        if (isPageUp || isPageDown || isArrowUp || isArrowDown) {
          if (e.preventDefault) e.preventDefault();
          else e.returnValue = false;
        }

        if (isPageDown || isArrowDown) swiper.slideNext();
        if (isPageUp || isArrowUp) swiper.slidePrev();
      }

      emit("keyPress", kc);
      return undefined;
    }

    function enable() {
      if (swiper.keyboard.enabled) return;
      $(document).on("keydown", handle);
      swiper.keyboard.enabled = true;
    }

    function disable() {
      if (!swiper.keyboard.enabled) return;
      $(document).off("keydown", handle);
      swiper.keyboard.enabled = false;
    }

    on("init", () => {
      if (swiper.params.keyboard.enabled) {
        enable();
      }
    });
    on("destroy", () => {
      if (swiper.keyboard.enabled) {
        disable();
      }
    });
    Object.assign(swiper.keyboard, {
      enable,
      disable,
    });
  } // CONCATENATED MODULE: ./node_modules/swiper/modules/mousewheel/mousewheel.js
  /* eslint-disable consistent-return */

  function Mousewheel(_ref) {
    let { swiper, extendParams, on, emit } = _ref;
    const window = getWindow();
    extendParams({
      mousewheel: {
        enabled: false,
        releaseOnEdges: false,
        invert: false,
        forceToAxis: false,
        sensitivity: 1,
        eventsTarget: "container",
        thresholdDelta: null,
        thresholdTime: null,
      },
    });
    swiper.mousewheel = {
      enabled: false,
    };
    let timeout;
    let lastScrollTime = now();
    let lastEventBeforeSnap;
    const recentWheelEvents = [];

    function normalize(e) {
      // Reasonable defaults
      const PIXEL_STEP = 10;
      const LINE_HEIGHT = 40;
      const PAGE_HEIGHT = 800;
      let sX = 0;
      let sY = 0; // spinX, spinY

      let pX = 0;
      let pY = 0; // pixelX, pixelY
      // Legacy

      if ("detail" in e) {
        sY = e.detail;
      }

      if ("wheelDelta" in e) {
        sY = -e.wheelDelta / 120;
      }

      if ("wheelDeltaY" in e) {
        sY = -e.wheelDeltaY / 120;
      }

      if ("wheelDeltaX" in e) {
        sX = -e.wheelDeltaX / 120;
      } // side scrolling on FF with DOMMouseScroll

      if ("axis" in e && e.axis === e.HORIZONTAL_AXIS) {
        sX = sY;
        sY = 0;
      }

      pX = sX * PIXEL_STEP;
      pY = sY * PIXEL_STEP;

      if ("deltaY" in e) {
        pY = e.deltaY;
      }

      if ("deltaX" in e) {
        pX = e.deltaX;
      }

      if (e.shiftKey && !pX) {
        // if user scrolls with shift he wants horizontal scroll
        pX = pY;
        pY = 0;
      }

      if ((pX || pY) && e.deltaMode) {
        if (e.deltaMode === 1) {
          // delta in LINE units
          pX *= LINE_HEIGHT;
          pY *= LINE_HEIGHT;
        } else {
          // delta in PAGE units
          pX *= PAGE_HEIGHT;
          pY *= PAGE_HEIGHT;
        }
      } // Fall-back if spin cannot be determined

      if (pX && !sX) {
        sX = pX < 1 ? -1 : 1;
      }

      if (pY && !sY) {
        sY = pY < 1 ? -1 : 1;
      }

      return {
        spinX: sX,
        spinY: sY,
        pixelX: pX,
        pixelY: pY,
      };
    }

    function handleMouseEnter() {
      if (!swiper.enabled) return;
      swiper.mouseEntered = true;
    }

    function handleMouseLeave() {
      if (!swiper.enabled) return;
      swiper.mouseEntered = false;
    }

    function animateSlider(newEvent) {
      if (
        swiper.params.mousewheel.thresholdDelta &&
        newEvent.delta < swiper.params.mousewheel.thresholdDelta
      ) {
        // Prevent if delta of wheel scroll delta is below configured threshold
        return false;
      }

      if (
        swiper.params.mousewheel.thresholdTime &&
        now() - lastScrollTime < swiper.params.mousewheel.thresholdTime
      ) {
        // Prevent if time between scrolls is below configured threshold
        return false;
      } // If the movement is NOT big enough and
      // if the last time the user scrolled was too close to the current one (avoid continuously triggering the slider):
      //   Don't go any further (avoid insignificant scroll movement).

      if (newEvent.delta >= 6 && now() - lastScrollTime < 60) {
        // Return false as a default
        return true;
      } // If user is scrolling towards the end:
      //   If the slider hasn't hit the latest slide or
      //   if the slider is a loop and
      //   if the slider isn't moving right now:
      //     Go to next slide and
      //     emit a scroll event.
      // Else (the user is scrolling towards the beginning) and
      // if the slider hasn't hit the first slide or
      // if the slider is a loop and
      // if the slider isn't moving right now:
      //   Go to prev slide and
      //   emit a scroll event.

      if (newEvent.direction < 0) {
        if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
          swiper.slideNext();
          emit("scroll", newEvent.raw);
        }
      } else if (
        (!swiper.isBeginning || swiper.params.loop) &&
        !swiper.animating
      ) {
        swiper.slidePrev();
        emit("scroll", newEvent.raw);
      } // If you got here is because an animation has been triggered so store the current time

      lastScrollTime = new window.Date().getTime(); // Return false as a default

      return false;
    }

    function releaseScroll(newEvent) {
      const params = swiper.params.mousewheel;

      if (newEvent.direction < 0) {
        if (swiper.isEnd && !swiper.params.loop && params.releaseOnEdges) {
          // Return true to animate scroll on edges
          return true;
        }
      } else if (
        swiper.isBeginning &&
        !swiper.params.loop &&
        params.releaseOnEdges
      ) {
        // Return true to animate scroll on edges
        return true;
      }

      return false;
    }

    function handle(event) {
      let e = event;
      let disableParentSwiper = true;
      if (!swiper.enabled) return;
      const params = swiper.params.mousewheel;

      if (swiper.params.cssMode) {
        e.preventDefault();
      }

      let target = swiper.$el;

      if (swiper.params.mousewheel.eventsTarget !== "container") {
        target = $(swiper.params.mousewheel.eventsTarget);
      }

      if (
        !swiper.mouseEntered &&
        !target[0].contains(e.target) &&
        !params.releaseOnEdges
      )
        return true;
      if (e.originalEvent) e = e.originalEvent; // jquery fix

      let delta = 0;
      const rtlFactor = swiper.rtlTranslate ? -1 : 1;
      const data = normalize(e);

      if (params.forceToAxis) {
        if (swiper.isHorizontal()) {
          if (Math.abs(data.pixelX) > Math.abs(data.pixelY))
            delta = -data.pixelX * rtlFactor;
          else return true;
        } else if (Math.abs(data.pixelY) > Math.abs(data.pixelX))
          delta = -data.pixelY;
        else return true;
      } else {
        delta =
          Math.abs(data.pixelX) > Math.abs(data.pixelY)
            ? -data.pixelX * rtlFactor
            : -data.pixelY;
      }

      if (delta === 0) return true;
      if (params.invert) delta = -delta; // Get the scroll positions

      let positions = swiper.getTranslate() + delta * params.sensitivity;
      if (positions >= swiper.minTranslate()) positions = swiper.minTranslate();
      if (positions <= swiper.maxTranslate()) positions = swiper.maxTranslate(); // When loop is true:
      //     the disableParentSwiper will be true.
      // When loop is false:
      //     if the scroll positions is not on edge,
      //     then the disableParentSwiper will be true.
      //     if the scroll on edge positions,
      //     then the disableParentSwiper will be false.

      disableParentSwiper = swiper.params.loop
        ? true
        : !(
            positions === swiper.minTranslate() ||
            positions === swiper.maxTranslate()
          );
      if (disableParentSwiper && swiper.params.nested) e.stopPropagation();

      if (!swiper.params.freeMode || !swiper.params.freeMode.enabled) {
        // Register the new event in a variable which stores the relevant data
        const newEvent = {
          time: now(),
          delta: Math.abs(delta),
          direction: Math.sign(delta),
          raw: event,
        }; // Keep the most recent events

        if (recentWheelEvents.length >= 2) {
          recentWheelEvents.shift(); // only store the last N events
        }

        const prevEvent = recentWheelEvents.length
          ? recentWheelEvents[recentWheelEvents.length - 1]
          : undefined;
        recentWheelEvents.push(newEvent); // If there is at least one previous recorded event:
        //   If direction has changed or
        //   if the scroll is quicker than the previous one:
        //     Animate the slider.
        // Else (this is the first time the wheel is moved):
        //     Animate the slider.

        if (prevEvent) {
          if (
            newEvent.direction !== prevEvent.direction ||
            newEvent.delta > prevEvent.delta ||
            newEvent.time > prevEvent.time + 150
          ) {
            animateSlider(newEvent);
          }
        } else {
          animateSlider(newEvent);
        } // If it's time to release the scroll:
        //   Return now so you don't hit the preventDefault.

        if (releaseScroll(newEvent)) {
          return true;
        }
      } else {
        // Freemode or scrollContainer:
        // If we recently snapped after a momentum scroll, then ignore wheel events
        // to give time for the deceleration to finish. Stop ignoring after 500 msecs
        // or if it's a new scroll (larger delta or inverse sign as last event before
        // an end-of-momentum snap).
        const newEvent = {
          time: now(),
          delta: Math.abs(delta),
          direction: Math.sign(delta),
        };
        const ignoreWheelEvents =
          lastEventBeforeSnap &&
          newEvent.time < lastEventBeforeSnap.time + 500 &&
          newEvent.delta <= lastEventBeforeSnap.delta &&
          newEvent.direction === lastEventBeforeSnap.direction;

        if (!ignoreWheelEvents) {
          lastEventBeforeSnap = undefined;

          if (swiper.params.loop) {
            swiper.loopFix();
          }

          let position = swiper.getTranslate() + delta * params.sensitivity;
          const wasBeginning = swiper.isBeginning;
          const wasEnd = swiper.isEnd;
          if (position >= swiper.minTranslate())
            position = swiper.minTranslate();
          if (position <= swiper.maxTranslate())
            position = swiper.maxTranslate();
          swiper.setTransition(0);
          swiper.setTranslate(position);
          swiper.updateProgress();
          swiper.updateActiveIndex();
          swiper.updateSlidesClasses();

          if (
            (!wasBeginning && swiper.isBeginning) ||
            (!wasEnd && swiper.isEnd)
          ) {
            swiper.updateSlidesClasses();
          }

          if (swiper.params.freeMode.sticky) {
            // When wheel scrolling starts with sticky (aka snap) enabled, then detect
            // the end of a momentum scroll by storing recent (N=15?) wheel events.
            // 1. do all N events have decreasing or same (absolute value) delta?
            // 2. did all N events arrive in the last M (M=500?) msecs?
            // 3. does the earliest event have an (absolute value) delta that's
            //    at least P (P=1?) larger than the most recent event's delta?
            // 4. does the latest event have a delta that's smaller than Q (Q=6?) pixels?
            // If 1-4 are "yes" then we're near the end of a momentum scroll deceleration.
            // Snap immediately and ignore remaining wheel events in this scroll.
            // See comment above for "remaining wheel events in this scroll" determination.
            // If 1-4 aren't satisfied, then wait to snap until 500ms after the last event.
            clearTimeout(timeout);
            timeout = undefined;

            if (recentWheelEvents.length >= 15) {
              recentWheelEvents.shift(); // only store the last N events
            }

            const prevEvent = recentWheelEvents.length
              ? recentWheelEvents[recentWheelEvents.length - 1]
              : undefined;
            const firstEvent = recentWheelEvents[0];
            recentWheelEvents.push(newEvent);

            if (
              prevEvent &&
              (newEvent.delta > prevEvent.delta ||
                newEvent.direction !== prevEvent.direction)
            ) {
              // Increasing or reverse-sign delta means the user started scrolling again. Clear the wheel event log.
              recentWheelEvents.splice(0);
            } else if (
              recentWheelEvents.length >= 15 &&
              newEvent.time - firstEvent.time < 500 &&
              firstEvent.delta - newEvent.delta >= 1 &&
              newEvent.delta <= 6
            ) {
              // We're at the end of the deceleration of a momentum scroll, so there's no need
              // to wait for more events. Snap ASAP on the next tick.
              // Also, because there's some remaining momentum we'll bias the snap in the
              // direction of the ongoing scroll because it's better UX for the scroll to snap
              // in the same direction as the scroll instead of reversing to snap.  Therefore,
              // if it's already scrolled more than 20% in the current direction, keep going.
              const snapToThreshold = delta > 0 ? 0.8 : 0.2;
              lastEventBeforeSnap = newEvent;
              recentWheelEvents.splice(0);
              timeout = nextTick(() => {
                swiper.slideToClosest(
                  swiper.params.speed,
                  true,
                  undefined,
                  snapToThreshold
                );
              }, 0); // no delay; move on next tick
            }

            if (!timeout) {
              // if we get here, then we haven't detected the end of a momentum scroll, so
              // we'll consider a scroll "complete" when there haven't been any wheel events
              // for 500ms.
              timeout = nextTick(() => {
                const snapToThreshold = 0.5;
                lastEventBeforeSnap = newEvent;
                recentWheelEvents.splice(0);
                swiper.slideToClosest(
                  swiper.params.speed,
                  true,
                  undefined,
                  snapToThreshold
                );
              }, 500);
            }
          } // Emit event

          if (!ignoreWheelEvents) emit("scroll", e); // Stop autoplay

          if (
            swiper.params.autoplay &&
            swiper.params.autoplayDisableOnInteraction
          )
            swiper.autoplay.stop(); // Return page scroll on edge positions

          if (
            position === swiper.minTranslate() ||
            position === swiper.maxTranslate()
          )
            return true;
        }
      }

      if (e.preventDefault) e.preventDefault();
      else e.returnValue = false;
      return false;
    }

    function events(method) {
      let target = swiper.$el;

      if (swiper.params.mousewheel.eventsTarget !== "container") {
        target = $(swiper.params.mousewheel.eventsTarget);
      }

      target[method]("mouseenter", handleMouseEnter);
      target[method]("mouseleave", handleMouseLeave);
      target[method]("wheel", handle);
    }

    function enable() {
      if (swiper.params.cssMode) {
        swiper.wrapperEl.removeEventListener("wheel", handle);
        return true;
      }

      if (swiper.mousewheel.enabled) return false;
      events("on");
      swiper.mousewheel.enabled = true;
      return true;
    }

    function disable() {
      if (swiper.params.cssMode) {
        swiper.wrapperEl.addEventListener(event, handle);
        return true;
      }

      if (!swiper.mousewheel.enabled) return false;
      events("off");
      swiper.mousewheel.enabled = false;
      return true;
    }

    on("init", () => {
      if (!swiper.params.mousewheel.enabled && swiper.params.cssMode) {
        disable();
      }

      if (swiper.params.mousewheel.enabled) enable();
    });
    on("destroy", () => {
      if (swiper.params.cssMode) {
        enable();
      }

      if (swiper.mousewheel.enabled) disable();
    });
    Object.assign(swiper.mousewheel, {
      enable,
      disable,
    });
  } // CONCATENATED MODULE: ./node_modules/swiper/shared/create-element-if-not-defined.js
  function create_element_if_not_defined_createElementIfNotDefined(
    swiper,
    originalParams,
    params,
    checkProps
  ) {
    const document = ssr_window_esm_getDocument();

    if (swiper.params.createElements) {
      Object.keys(checkProps).forEach((key) => {
        if (!params[key] && params.auto === true) {
          let element = swiper.$el.children(`.${checkProps[key]}`)[0];

          if (!element) {
            element = document.createElement("div");
            element.className = checkProps[key];
            swiper.$el.append(element);
          }

          params[key] = element;
          originalParams[key] = element;
        }
      });
    }

    return params;
  } // CONCATENATED MODULE: ./node_modules/swiper/modules/navigation/navigation.js
  function Navigation(_ref) {
    let { swiper, extendParams, on, emit } = _ref;
    extendParams({
      navigation: {
        nextEl: null,
        prevEl: null,
        hideOnClick: false,
        disabledClass: "swiper-button-disabled",
        hiddenClass: "swiper-button-hidden",
        lockClass: "swiper-button-lock",
      },
    });
    swiper.navigation = {
      nextEl: null,
      $nextEl: null,
      prevEl: null,
      $prevEl: null,
    };

    function getEl(el) {
      let $el;

      if (el) {
        $el = dom(el);

        if (
          swiper.params.uniqueNavElements &&
          typeof el === "string" &&
          $el.length > 1 &&
          swiper.$el.find(el).length === 1
        ) {
          $el = swiper.$el.find(el);
        }
      }

      return $el;
    }

    function toggleEl($el, disabled) {
      const params = swiper.params.navigation;

      if ($el && $el.length > 0) {
        $el[disabled ? "addClass" : "removeClass"](params.disabledClass);
        if ($el[0] && $el[0].tagName === "BUTTON") $el[0].disabled = disabled;

        if (swiper.params.watchOverflow && swiper.enabled) {
          $el[swiper.isLocked ? "addClass" : "removeClass"](params.lockClass);
        }
      }
    }

    function update() {
      // Update Navigation Buttons
      if (swiper.params.loop) return;
      const { $nextEl, $prevEl } = swiper.navigation;
      toggleEl($prevEl, swiper.isBeginning && !swiper.params.rewind);
      toggleEl($nextEl, swiper.isEnd && !swiper.params.rewind);
    }

    function onPrevClick(e) {
      e.preventDefault();
      if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind)
        return;
      swiper.slidePrev();
    }

    function onNextClick(e) {
      e.preventDefault();
      if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
      swiper.slideNext();
    }

    function init() {
      const params = swiper.params.navigation;
      swiper.params.navigation =
        create_element_if_not_defined_createElementIfNotDefined(
          swiper,
          swiper.originalParams.navigation,
          swiper.params.navigation,
          {
            nextEl: "swiper-button-next",
            prevEl: "swiper-button-prev",
          }
        );
      if (!(params.nextEl || params.prevEl)) return;
      const $nextEl = getEl(params.nextEl);
      const $prevEl = getEl(params.prevEl);

      if ($nextEl && $nextEl.length > 0) {
        $nextEl.on("click", onNextClick);
      }

      if ($prevEl && $prevEl.length > 0) {
        $prevEl.on("click", onPrevClick);
      }

      Object.assign(swiper.navigation, {
        $nextEl,
        nextEl: $nextEl && $nextEl[0],
        $prevEl,
        prevEl: $prevEl && $prevEl[0],
      });

      if (!swiper.enabled) {
        if ($nextEl) $nextEl.addClass(params.lockClass);
        if ($prevEl) $prevEl.addClass(params.lockClass);
      }
    }

    function destroy() {
      const { $nextEl, $prevEl } = swiper.navigation;

      if ($nextEl && $nextEl.length) {
        $nextEl.off("click", onNextClick);
        $nextEl.removeClass(swiper.params.navigation.disabledClass);
      }

      if ($prevEl && $prevEl.length) {
        $prevEl.off("click", onPrevClick);
        $prevEl.removeClass(swiper.params.navigation.disabledClass);
      }
    }

    on("init", () => {
      init();
      update();
    });
    on("toEdge fromEdge lock unlock", () => {
      update();
    });
    on("destroy", () => {
      destroy();
    });
    on("enable disable", () => {
      const { $nextEl, $prevEl } = swiper.navigation;

      if ($nextEl) {
        $nextEl[swiper.enabled ? "removeClass" : "addClass"](
          swiper.params.navigation.lockClass
        );
      }

      if ($prevEl) {
        $prevEl[swiper.enabled ? "removeClass" : "addClass"](
          swiper.params.navigation.lockClass
        );
      }
    });
    on("click", (_s, e) => {
      const { $nextEl, $prevEl } = swiper.navigation;
      const targetEl = e.target;

      if (
        swiper.params.navigation.hideOnClick &&
        !dom(targetEl).is($prevEl) &&
        !dom(targetEl).is($nextEl)
      ) {
        if (
          swiper.pagination &&
          swiper.params.pagination &&
          swiper.params.pagination.clickable &&
          (swiper.pagination.el === targetEl ||
            swiper.pagination.el.contains(targetEl))
        )
          return;
        let isHidden;

        if ($nextEl) {
          isHidden = $nextEl.hasClass(swiper.params.navigation.hiddenClass);
        } else if ($prevEl) {
          isHidden = $prevEl.hasClass(swiper.params.navigation.hiddenClass);
        }

        if (isHidden === true) {
          emit("navigationShow");
        } else {
          emit("navigationHide");
        }

        if ($nextEl) {
          $nextEl.toggleClass(swiper.params.navigation.hiddenClass);
        }

        if ($prevEl) {
          $prevEl.toggleClass(swiper.params.navigation.hiddenClass);
        }
      }
    });
    Object.assign(swiper.navigation, {
      update,
      init,
      destroy,
    });
  } // CONCATENATED MODULE: ./node_modules/swiper/shared/classes-to-selector.js
  function classes_to_selector_classesToSelector(classes) {
    if (classes === void 0) {
      classes = "";
    }

    return `.${classes
      .trim()
      .replace(/([\.:!\/])/g, "\\$1") // eslint-disable-line
      .replace(/ /g, ".")}`;
  } // CONCATENATED MODULE: ./node_modules/swiper/modules/pagination/pagination.js
  function Pagination(_ref) {
    let { swiper, extendParams, on, emit } = _ref;
    const pfx = "swiper-pagination";
    extendParams({
      pagination: {
        el: null,
        bulletElement: "span",
        clickable: false,
        hideOnClick: false,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: false,
        type: "bullets",
        // 'bullets' or 'progressbar' or 'fraction' or 'custom'
        dynamicBullets: false,
        dynamicMainBullets: 1,
        formatFractionCurrent: (number) => number,
        formatFractionTotal: (number) => number,
        bulletClass: `${pfx}-bullet`,
        bulletActiveClass: `${pfx}-bullet-active`,
        modifierClass: `${pfx}-`,
        currentClass: `${pfx}-current`,
        totalClass: `${pfx}-total`,
        hiddenClass: `${pfx}-hidden`,
        progressbarFillClass: `${pfx}-progressbar-fill`,
        progressbarOppositeClass: `${pfx}-progressbar-opposite`,
        clickableClass: `${pfx}-clickable`,
        lockClass: `${pfx}-lock`,
        horizontalClass: `${pfx}-horizontal`,
        verticalClass: `${pfx}-vertical`,
      },
    });
    swiper.pagination = {
      el: null,
      $el: null,
      bullets: [],
    };
    let bulletSize;
    let dynamicBulletIndex = 0;

    function isPaginationDisabled() {
      return (
        !swiper.params.pagination.el ||
        !swiper.pagination.el ||
        !swiper.pagination.$el ||
        swiper.pagination.$el.length === 0
      );
    }

    function setSideBullets($bulletEl, position) {
      const { bulletActiveClass } = swiper.params.pagination;
      $bulletEl[position]()
        .addClass(`${bulletActiveClass}-${position}`)
        [position]()
        .addClass(`${bulletActiveClass}-${position}-${position}`);
    }

    function update() {
      // Render || Update Pagination bullets/items
      const rtl = swiper.rtl;
      const params = swiper.params.pagination;
      if (isPaginationDisabled()) return;
      const slidesLength =
        swiper.virtual && swiper.params.virtual.enabled
          ? swiper.virtual.slides.length
          : swiper.slides.length;
      const $el = swiper.pagination.$el; // Current/Total

      let current;
      const total = swiper.params.loop
        ? Math.ceil(
            (slidesLength - swiper.loopedSlides * 2) /
              swiper.params.slidesPerGroup
          )
        : swiper.snapGrid.length;

      if (swiper.params.loop) {
        current = Math.ceil(
          (swiper.activeIndex - swiper.loopedSlides) /
            swiper.params.slidesPerGroup
        );

        if (current > slidesLength - 1 - swiper.loopedSlides * 2) {
          current -= slidesLength - swiper.loopedSlides * 2;
        }

        if (current > total - 1) current -= total;
        if (current < 0 && swiper.params.paginationType !== "bullets")
          current = total + current;
      } else if (typeof swiper.snapIndex !== "undefined") {
        current = swiper.snapIndex;
      } else {
        current = swiper.activeIndex || 0;
      } // Types

      if (
        params.type === "bullets" &&
        swiper.pagination.bullets &&
        swiper.pagination.bullets.length > 0
      ) {
        const bullets = swiper.pagination.bullets;
        let firstIndex;
        let lastIndex;
        let midIndex;

        if (params.dynamicBullets) {
          bulletSize = bullets
            .eq(0)
            [swiper.isHorizontal() ? "outerWidth" : "outerHeight"](true);
          $el.css(
            swiper.isHorizontal() ? "width" : "height",
            `${bulletSize * (params.dynamicMainBullets + 4)}px`
          );

          if (
            params.dynamicMainBullets > 1 &&
            swiper.previousIndex !== undefined
          ) {
            dynamicBulletIndex +=
              current - (swiper.previousIndex - swiper.loopedSlides || 0);

            if (dynamicBulletIndex > params.dynamicMainBullets - 1) {
              dynamicBulletIndex = params.dynamicMainBullets - 1;
            } else if (dynamicBulletIndex < 0) {
              dynamicBulletIndex = 0;
            }
          }

          firstIndex = Math.max(current - dynamicBulletIndex, 0);
          lastIndex =
            firstIndex +
            (Math.min(bullets.length, params.dynamicMainBullets) - 1);
          midIndex = (lastIndex + firstIndex) / 2;
        }

        bullets.removeClass(
          ["", "-next", "-next-next", "-prev", "-prev-prev", "-main"]
            .map((suffix) => `${params.bulletActiveClass}${suffix}`)
            .join(" ")
        );

        if ($el.length > 1) {
          bullets.each((bullet) => {
            const $bullet = dom(bullet);
            const bulletIndex = $bullet.index();

            if (bulletIndex === current) {
              $bullet.addClass(params.bulletActiveClass);
            }

            if (params.dynamicBullets) {
              if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
                $bullet.addClass(`${params.bulletActiveClass}-main`);
              }

              if (bulletIndex === firstIndex) {
                setSideBullets($bullet, "prev");
              }

              if (bulletIndex === lastIndex) {
                setSideBullets($bullet, "next");
              }
            }
          });
        } else {
          const $bullet = bullets.eq(current);
          const bulletIndex = $bullet.index();
          $bullet.addClass(params.bulletActiveClass);

          if (params.dynamicBullets) {
            const $firstDisplayedBullet = bullets.eq(firstIndex);
            const $lastDisplayedBullet = bullets.eq(lastIndex);

            for (let i = firstIndex; i <= lastIndex; i += 1) {
              bullets.eq(i).addClass(`${params.bulletActiveClass}-main`);
            }

            if (swiper.params.loop) {
              if (bulletIndex >= bullets.length) {
                for (let i = params.dynamicMainBullets; i >= 0; i -= 1) {
                  bullets
                    .eq(bullets.length - i)
                    .addClass(`${params.bulletActiveClass}-main`);
                }

                bullets
                  .eq(bullets.length - params.dynamicMainBullets - 1)
                  .addClass(`${params.bulletActiveClass}-prev`);
              } else {
                setSideBullets($firstDisplayedBullet, "prev");
                setSideBullets($lastDisplayedBullet, "next");
              }
            } else {
              setSideBullets($firstDisplayedBullet, "prev");
              setSideBullets($lastDisplayedBullet, "next");
            }
          }
        }

        if (params.dynamicBullets) {
          const dynamicBulletsLength = Math.min(
            bullets.length,
            params.dynamicMainBullets + 4
          );
          const bulletsOffset =
            (bulletSize * dynamicBulletsLength - bulletSize) / 2 -
            midIndex * bulletSize;
          const offsetProp = rtl ? "right" : "left";
          bullets.css(
            swiper.isHorizontal() ? offsetProp : "top",
            `${bulletsOffset}px`
          );
        }
      }

      if (params.type === "fraction") {
        $el
          .find(classes_to_selector_classesToSelector(params.currentClass))
          .text(params.formatFractionCurrent(current + 1));
        $el
          .find(classes_to_selector_classesToSelector(params.totalClass))
          .text(params.formatFractionTotal(total));
      }

      if (params.type === "progressbar") {
        let progressbarDirection;

        if (params.progressbarOpposite) {
          progressbarDirection = swiper.isHorizontal()
            ? "vertical"
            : "horizontal";
        } else {
          progressbarDirection = swiper.isHorizontal()
            ? "horizontal"
            : "vertical";
        }

        const scale = (current + 1) / total;
        let scaleX = 1;
        let scaleY = 1;

        if (progressbarDirection === "horizontal") {
          scaleX = scale;
        } else {
          scaleY = scale;
        }

        $el
          .find(
            classes_to_selector_classesToSelector(params.progressbarFillClass)
          )
          .transform(`translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`)
          .transition(swiper.params.speed);
      }

      if (params.type === "custom" && params.renderCustom) {
        $el.html(params.renderCustom(swiper, current + 1, total));
        emit("paginationRender", $el[0]);
      } else {
        emit("paginationUpdate", $el[0]);
      }

      if (swiper.params.watchOverflow && swiper.enabled) {
        $el[swiper.isLocked ? "addClass" : "removeClass"](params.lockClass);
      }
    }

    function render() {
      // Render Container
      const params = swiper.params.pagination;
      if (isPaginationDisabled()) return;
      const slidesLength =
        swiper.virtual && swiper.params.virtual.enabled
          ? swiper.virtual.slides.length
          : swiper.slides.length;
      const $el = swiper.pagination.$el;
      let paginationHTML = "";

      if (params.type === "bullets") {
        let numberOfBullets = swiper.params.loop
          ? Math.ceil(
              (slidesLength - swiper.loopedSlides * 2) /
                swiper.params.slidesPerGroup
            )
          : swiper.snapGrid.length;

        if (
          swiper.params.freeMode &&
          swiper.params.freeMode.enabled &&
          !swiper.params.loop &&
          numberOfBullets > slidesLength
        ) {
          numberOfBullets = slidesLength;
        }

        for (let i = 0; i < numberOfBullets; i += 1) {
          if (params.renderBullet) {
            paginationHTML += params.renderBullet.call(
              swiper,
              i,
              params.bulletClass
            );
          } else {
            paginationHTML += `<${params.bulletElement} class="${params.bulletClass}"></${params.bulletElement}>`;
          }
        }

        $el.html(paginationHTML);
        swiper.pagination.bullets = $el.find(
          classes_to_selector_classesToSelector(params.bulletClass)
        );
      }

      if (params.type === "fraction") {
        if (params.renderFraction) {
          paginationHTML = params.renderFraction.call(
            swiper,
            params.currentClass,
            params.totalClass
          );
        } else {
          paginationHTML =
            `<span class="${params.currentClass}"></span>` +
            " / " +
            `<span class="${params.totalClass}"></span>`;
        }

        $el.html(paginationHTML);
      }

      if (params.type === "progressbar") {
        if (params.renderProgressbar) {
          paginationHTML = params.renderProgressbar.call(
            swiper,
            params.progressbarFillClass
          );
        } else {
          paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
        }

        $el.html(paginationHTML);
      }

      if (params.type !== "custom") {
        emit("paginationRender", swiper.pagination.$el[0]);
      }
    }

    function init() {
      swiper.params.pagination =
        create_element_if_not_defined_createElementIfNotDefined(
          swiper,
          swiper.originalParams.pagination,
          swiper.params.pagination,
          {
            el: "swiper-pagination",
          }
        );
      const params = swiper.params.pagination;
      if (!params.el) return;
      let $el = dom(params.el);
      if ($el.length === 0) return;

      if (
        swiper.params.uniqueNavElements &&
        typeof params.el === "string" &&
        $el.length > 1
      ) {
        $el = swiper.$el.find(params.el); // check if it belongs to another nested Swiper

        if ($el.length > 1) {
          $el = $el.filter((el) => {
            if (dom(el).parents(".swiper")[0] !== swiper.el) return false;
            return true;
          });
        }
      }

      if (params.type === "bullets" && params.clickable) {
        $el.addClass(params.clickableClass);
      }

      $el.addClass(params.modifierClass + params.type);
      $el.addClass(
        swiper.isHorizontal() ? params.horizontalClass : params.verticalClass
      );

      if (params.type === "bullets" && params.dynamicBullets) {
        $el.addClass(`${params.modifierClass}${params.type}-dynamic`);
        dynamicBulletIndex = 0;

        if (params.dynamicMainBullets < 1) {
          params.dynamicMainBullets = 1;
        }
      }

      if (params.type === "progressbar" && params.progressbarOpposite) {
        $el.addClass(params.progressbarOppositeClass);
      }

      if (params.clickable) {
        $el.on(
          "click",
          classes_to_selector_classesToSelector(params.bulletClass),
          function onClick(e) {
            e.preventDefault();
            let index = dom(this).index() * swiper.params.slidesPerGroup;
            if (swiper.params.loop) index += swiper.loopedSlides;
            swiper.slideTo(index);
          }
        );
      }

      Object.assign(swiper.pagination, {
        $el,
        el: $el[0],
      });

      if (!swiper.enabled) {
        $el.addClass(params.lockClass);
      }
    }

    function destroy() {
      const params = swiper.params.pagination;
      if (isPaginationDisabled()) return;
      const $el = swiper.pagination.$el;
      $el.removeClass(params.hiddenClass);
      $el.removeClass(params.modifierClass + params.type);
      $el.removeClass(
        swiper.isHorizontal() ? params.horizontalClass : params.verticalClass
      );
      if (swiper.pagination.bullets && swiper.pagination.bullets.removeClass)
        swiper.pagination.bullets.removeClass(params.bulletActiveClass);

      if (params.clickable) {
        $el.off(
          "click",
          classes_to_selector_classesToSelector(params.bulletClass)
        );
      }
    }

    on("init", () => {
      init();
      render();
      update();
    });
    on("activeIndexChange", () => {
      if (swiper.params.loop) {
        update();
      } else if (typeof swiper.snapIndex === "undefined") {
        update();
      }
    });
    on("snapIndexChange", () => {
      if (!swiper.params.loop) {
        update();
      }
    });
    on("slidesLengthChange", () => {
      if (swiper.params.loop) {
        render();
        update();
      }
    });
    on("snapGridLengthChange", () => {
      if (!swiper.params.loop) {
        render();
        update();
      }
    });
    on("destroy", () => {
      destroy();
    });
    on("enable disable", () => {
      const { $el } = swiper.pagination;

      if ($el) {
        $el[swiper.enabled ? "removeClass" : "addClass"](
          swiper.params.pagination.lockClass
        );
      }
    });
    on("lock unlock", () => {
      update();
    });
    on("click", (_s, e) => {
      const targetEl = e.target;
      const { $el } = swiper.pagination;

      if (
        swiper.params.pagination.el &&
        swiper.params.pagination.hideOnClick &&
        $el.length > 0 &&
        !dom(targetEl).hasClass(swiper.params.pagination.bulletClass)
      ) {
        if (
          swiper.navigation &&
          ((swiper.navigation.nextEl &&
            targetEl === swiper.navigation.nextEl) ||
            (swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl))
        )
          return;
        const isHidden = $el.hasClass(swiper.params.pagination.hiddenClass);

        if (isHidden === true) {
          emit("paginationShow");
        } else {
          emit("paginationHide");
        }

        $el.toggleClass(swiper.params.pagination.hiddenClass);
      }
    });
    Object.assign(swiper.pagination, {
      render,
      update,
      init,
      destroy,
    });
  } // CONCATENATED MODULE: ./node_modules/swiper/modules/scrollbar/scrollbar.js
  function Scrollbar(_ref) {
    let { swiper, extendParams, on, emit } = _ref;
    const document = getDocument();
    let isTouched = false;
    let timeout = null;
    let dragTimeout = null;
    let dragStartPos;
    let dragSize;
    let trackSize;
    let divider;
    extendParams({
      scrollbar: {
        el: null,
        dragSize: "auto",
        hide: false,
        draggable: false,
        snapOnRelease: true,
        lockClass: "swiper-scrollbar-lock",
        dragClass: "swiper-scrollbar-drag",
      },
    });
    swiper.scrollbar = {
      el: null,
      dragEl: null,
      $el: null,
      $dragEl: null,
    };

    function setTranslate() {
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
      const { scrollbar, rtlTranslate: rtl, progress } = swiper;
      const { $dragEl, $el } = scrollbar;
      const params = swiper.params.scrollbar;
      let newSize = dragSize;
      let newPos = (trackSize - dragSize) * progress;

      if (rtl) {
        newPos = -newPos;

        if (newPos > 0) {
          newSize = dragSize - newPos;
          newPos = 0;
        } else if (-newPos + dragSize > trackSize) {
          newSize = trackSize + newPos;
        }
      } else if (newPos < 0) {
        newSize = dragSize + newPos;
        newPos = 0;
      } else if (newPos + dragSize > trackSize) {
        newSize = trackSize - newPos;
      }

      if (swiper.isHorizontal()) {
        $dragEl.transform(`translate3d(${newPos}px, 0, 0)`);
        $dragEl[0].style.width = `${newSize}px`;
      } else {
        $dragEl.transform(`translate3d(0px, ${newPos}px, 0)`);
        $dragEl[0].style.height = `${newSize}px`;
      }

      if (params.hide) {
        clearTimeout(timeout);
        $el[0].style.opacity = 1;
        timeout = setTimeout(() => {
          $el[0].style.opacity = 0;
          $el.transition(400);
        }, 1000);
      }
    }

    function setTransition(duration) {
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
      swiper.scrollbar.$dragEl.transition(duration);
    }

    function updateSize() {
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
      const { scrollbar } = swiper;
      const { $dragEl, $el } = scrollbar;
      $dragEl[0].style.width = "";
      $dragEl[0].style.height = "";
      trackSize = swiper.isHorizontal()
        ? $el[0].offsetWidth
        : $el[0].offsetHeight;
      divider =
        swiper.size /
        (swiper.virtualSize +
          swiper.params.slidesOffsetBefore -
          (swiper.params.centeredSlides ? swiper.snapGrid[0] : 0));

      if (swiper.params.scrollbar.dragSize === "auto") {
        dragSize = trackSize * divider;
      } else {
        dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
      }

      if (swiper.isHorizontal()) {
        $dragEl[0].style.width = `${dragSize}px`;
      } else {
        $dragEl[0].style.height = `${dragSize}px`;
      }

      if (divider >= 1) {
        $el[0].style.display = "none";
      } else {
        $el[0].style.display = "";
      }

      if (swiper.params.scrollbar.hide) {
        $el[0].style.opacity = 0;
      }

      if (swiper.params.watchOverflow && swiper.enabled) {
        scrollbar.$el[swiper.isLocked ? "addClass" : "removeClass"](
          swiper.params.scrollbar.lockClass
        );
      }
    }

    function getPointerPosition(e) {
      if (swiper.isHorizontal()) {
        return e.type === "touchstart" || e.type === "touchmove"
          ? e.targetTouches[0].clientX
          : e.clientX;
      }

      return e.type === "touchstart" || e.type === "touchmove"
        ? e.targetTouches[0].clientY
        : e.clientY;
    }

    function setDragPosition(e) {
      const { scrollbar, rtlTranslate: rtl } = swiper;
      const { $el } = scrollbar;
      let positionRatio;
      positionRatio =
        (getPointerPosition(e) -
          $el.offset()[swiper.isHorizontal() ? "left" : "top"] -
          (dragStartPos !== null ? dragStartPos : dragSize / 2)) /
        (trackSize - dragSize);
      positionRatio = Math.max(Math.min(positionRatio, 1), 0);

      if (rtl) {
        positionRatio = 1 - positionRatio;
      }

      const position =
        swiper.minTranslate() +
        (swiper.maxTranslate() - swiper.minTranslate()) * positionRatio;
      swiper.updateProgress(position);
      swiper.setTranslate(position);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }

    function onDragStart(e) {
      const params = swiper.params.scrollbar;
      const { scrollbar, $wrapperEl } = swiper;
      const { $el, $dragEl } = scrollbar;
      isTouched = true;
      dragStartPos =
        e.target === $dragEl[0] || e.target === $dragEl
          ? getPointerPosition(e) -
            e.target.getBoundingClientRect()[
              swiper.isHorizontal() ? "left" : "top"
            ]
          : null;
      e.preventDefault();
      e.stopPropagation();
      $wrapperEl.transition(100);
      $dragEl.transition(100);
      setDragPosition(e);
      clearTimeout(dragTimeout);
      $el.transition(0);

      if (params.hide) {
        $el.css("opacity", 1);
      }

      if (swiper.params.cssMode) {
        swiper.$wrapperEl.css("scroll-snap-type", "none");
      }

      emit("scrollbarDragStart", e);
    }

    function onDragMove(e) {
      const { scrollbar, $wrapperEl } = swiper;
      const { $el, $dragEl } = scrollbar;
      if (!isTouched) return;
      if (e.preventDefault) e.preventDefault();
      else e.returnValue = false;
      setDragPosition(e);
      $wrapperEl.transition(0);
      $el.transition(0);
      $dragEl.transition(0);
      emit("scrollbarDragMove", e);
    }

    function onDragEnd(e) {
      const params = swiper.params.scrollbar;
      const { scrollbar, $wrapperEl } = swiper;
      const { $el } = scrollbar;
      if (!isTouched) return;
      isTouched = false;

      if (swiper.params.cssMode) {
        swiper.$wrapperEl.css("scroll-snap-type", "");
        $wrapperEl.transition("");
      }

      if (params.hide) {
        clearTimeout(dragTimeout);
        dragTimeout = nextTick(() => {
          $el.css("opacity", 0);
          $el.transition(400);
        }, 1000);
      }

      emit("scrollbarDragEnd", e);

      if (params.snapOnRelease) {
        swiper.slideToClosest();
      }
    }

    function events(method) {
      const {
        scrollbar,
        touchEventsTouch,
        touchEventsDesktop,
        params,
        support,
      } = swiper;
      const $el = scrollbar.$el;
      const target = $el[0];
      const activeListener =
        support.passiveListener && params.passiveListeners
          ? {
              passive: false,
              capture: false,
            }
          : false;
      const passiveListener =
        support.passiveListener && params.passiveListeners
          ? {
              passive: true,
              capture: false,
            }
          : false;
      if (!target) return;
      const eventMethod =
        method === "on" ? "addEventListener" : "removeEventListener";

      if (!support.touch) {
        target[eventMethod](
          touchEventsDesktop.start,
          onDragStart,
          activeListener
        );
        document[eventMethod](
          touchEventsDesktop.move,
          onDragMove,
          activeListener
        );
        document[eventMethod](
          touchEventsDesktop.end,
          onDragEnd,
          passiveListener
        );
      } else {
        target[eventMethod](
          touchEventsTouch.start,
          onDragStart,
          activeListener
        );
        target[eventMethod](touchEventsTouch.move, onDragMove, activeListener);
        target[eventMethod](touchEventsTouch.end, onDragEnd, passiveListener);
      }
    }

    function enableDraggable() {
      if (!swiper.params.scrollbar.el) return;
      events("on");
    }

    function disableDraggable() {
      if (!swiper.params.scrollbar.el) return;
      events("off");
    }

    function init() {
      const { scrollbar, $el: $swiperEl } = swiper;
      swiper.params.scrollbar = createElementIfNotDefined(
        swiper,
        swiper.originalParams.scrollbar,
        swiper.params.scrollbar,
        {
          el: "swiper-scrollbar",
        }
      );
      const params = swiper.params.scrollbar;
      if (!params.el) return;
      let $el = $(params.el);

      if (
        swiper.params.uniqueNavElements &&
        typeof params.el === "string" &&
        $el.length > 1 &&
        $swiperEl.find(params.el).length === 1
      ) {
        $el = $swiperEl.find(params.el);
      }

      let $dragEl = $el.find(`.${swiper.params.scrollbar.dragClass}`);

      if ($dragEl.length === 0) {
        $dragEl = $(`<div class="${swiper.params.scrollbar.dragClass}"></div>`);
        $el.append($dragEl);
      }

      Object.assign(scrollbar, {
        $el,
        el: $el[0],
        $dragEl,
        dragEl: $dragEl[0],
      });

      if (params.draggable) {
        enableDraggable();
      }

      if ($el) {
        $el[swiper.enabled ? "removeClass" : "addClass"](
          swiper.params.scrollbar.lockClass
        );
      }
    }

    function destroy() {
      disableDraggable();
    }

    on("init", () => {
      init();
      updateSize();
      setTranslate();
    });
    on("update resize observerUpdate lock unlock", () => {
      updateSize();
    });
    on("setTranslate", () => {
      setTranslate();
    });
    on("setTransition", (_s, duration) => {
      setTransition(duration);
    });
    on("enable disable", () => {
      const { $el } = swiper.scrollbar;

      if ($el) {
        $el[swiper.enabled ? "removeClass" : "addClass"](
          swiper.params.scrollbar.lockClass
        );
      }
    });
    on("destroy", () => {
      destroy();
    });
    Object.assign(swiper.scrollbar, {
      updateSize,
      setTranslate,
      init,
      destroy,
    });
  } // CONCATENATED MODULE: ./node_modules/swiper/modules/parallax/parallax.js
  function Parallax(_ref) {
    let { swiper, extendParams, on } = _ref;
    extendParams({
      parallax: {
        enabled: false,
      },
    });

    const setTransform = (el, progress) => {
      const { rtl } = swiper;
      const $el = $(el);
      const rtlFactor = rtl ? -1 : 1;
      const p = $el.attr("data-swiper-parallax") || "0";
      let x = $el.attr("data-swiper-parallax-x");
      let y = $el.attr("data-swiper-parallax-y");
      const scale = $el.attr("data-swiper-parallax-scale");
      const opacity = $el.attr("data-swiper-parallax-opacity");

      if (x || y) {
        x = x || "0";
        y = y || "0";
      } else if (swiper.isHorizontal()) {
        x = p;
        y = "0";
      } else {
        y = p;
        x = "0";
      }

      if (x.indexOf("%") >= 0) {
        x = `${parseInt(x, 10) * progress * rtlFactor}%`;
      } else {
        x = `${x * progress * rtlFactor}px`;
      }

      if (y.indexOf("%") >= 0) {
        y = `${parseInt(y, 10) * progress}%`;
      } else {
        y = `${y * progress}px`;
      }

      if (typeof opacity !== "undefined" && opacity !== null) {
        const currentOpacity =
          opacity - (opacity - 1) * (1 - Math.abs(progress));
        $el[0].style.opacity = currentOpacity;
      }

      if (typeof scale === "undefined" || scale === null) {
        $el.transform(`translate3d(${x}, ${y}, 0px)`);
      } else {
        const currentScale = scale - (scale - 1) * (1 - Math.abs(progress));
        $el.transform(`translate3d(${x}, ${y}, 0px) scale(${currentScale})`);
      }
    };

    const setTranslate = () => {
      const { $el, slides, progress, snapGrid } = swiper;
      $el
        .children(
          "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
        )
        .each((el) => {
          setTransform(el, progress);
        });
      slides.each((slideEl, slideIndex) => {
        let slideProgress = slideEl.progress;

        if (
          swiper.params.slidesPerGroup > 1 &&
          swiper.params.slidesPerView !== "auto"
        ) {
          slideProgress +=
            Math.ceil(slideIndex / 2) - progress * (snapGrid.length - 1);
        }

        slideProgress = Math.min(Math.max(slideProgress, -1), 1);
        $(slideEl)
          .find(
            "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
          )
          .each((el) => {
            setTransform(el, slideProgress);
          });
      });
    };

    const setTransition = function (duration) {
      if (duration === void 0) {
        duration = swiper.params.speed;
      }

      const { $el } = swiper;
      $el
        .find(
          "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
        )
        .each((parallaxEl) => {
          const $parallaxEl = $(parallaxEl);
          let parallaxDuration =
            parseInt($parallaxEl.attr("data-swiper-parallax-duration"), 10) ||
            duration;
          if (duration === 0) parallaxDuration = 0;
          $parallaxEl.transition(parallaxDuration);
        });
    };

    on("beforeInit", () => {
      if (!swiper.params.parallax.enabled) return;
      swiper.params.watchSlidesProgress = true;
      swiper.originalParams.watchSlidesProgress = true;
    });
    on("init", () => {
      if (!swiper.params.parallax.enabled) return;
      setTranslate();
    });
    on("setTranslate", () => {
      if (!swiper.params.parallax.enabled) return;
      setTranslate();
    });
    on("setTransition", (_swiper, duration) => {
      if (!swiper.params.parallax.enabled) return;
      setTransition(duration);
    });
  } // CONCATENATED MODULE: ./node_modules/swiper/modules/zoom/zoom.js
  function Zoom(_ref) {
    let { swiper, extendParams, on, emit } = _ref;
    const window = getWindow();
    extendParams({
      zoom: {
        enabled: false,
        maxRatio: 3,
        minRatio: 1,
        toggle: true,
        containerClass: "swiper-zoom-container",
        zoomedSlideClass: "swiper-slide-zoomed",
      },
    });
    swiper.zoom = {
      enabled: false,
    };
    let currentScale = 1;
    let isScaling = false;
    let gesturesEnabled;
    let fakeGestureTouched;
    let fakeGestureMoved;
    const gesture = {
      $slideEl: undefined,
      slideWidth: undefined,
      slideHeight: undefined,
      $imageEl: undefined,
      $imageWrapEl: undefined,
      maxRatio: 3,
    };
    const image = {
      isTouched: undefined,
      isMoved: undefined,
      currentX: undefined,
      currentY: undefined,
      minX: undefined,
      minY: undefined,
      maxX: undefined,
      maxY: undefined,
      width: undefined,
      height: undefined,
      startX: undefined,
      startY: undefined,
      touchesStart: {},
      touchesCurrent: {},
    };
    const velocity = {
      x: undefined,
      y: undefined,
      prevPositionX: undefined,
      prevPositionY: undefined,
      prevTime: undefined,
    };
    let scale = 1;
    Object.defineProperty(swiper.zoom, "scale", {
      get() {
        return scale;
      },

      set(value) {
        if (scale !== value) {
          const imageEl = gesture.$imageEl ? gesture.$imageEl[0] : undefined;
          const slideEl = gesture.$slideEl ? gesture.$slideEl[0] : undefined;
          emit("zoomChange", value, imageEl, slideEl);
        }

        scale = value;
      },
    });

    function getDistanceBetweenTouches(e) {
      if (e.targetTouches.length < 2) return 1;
      const x1 = e.targetTouches[0].pageX;
      const y1 = e.targetTouches[0].pageY;
      const x2 = e.targetTouches[1].pageX;
      const y2 = e.targetTouches[1].pageY;
      const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
      return distance;
    } // Events

    function onGestureStart(e) {
      const support = swiper.support;
      const params = swiper.params.zoom;
      fakeGestureTouched = false;
      fakeGestureMoved = false;

      if (!support.gestures) {
        if (
          e.type !== "touchstart" ||
          (e.type === "touchstart" && e.targetTouches.length < 2)
        ) {
          return;
        }

        fakeGestureTouched = true;
        gesture.scaleStart = getDistanceBetweenTouches(e);
      }

      if (!gesture.$slideEl || !gesture.$slideEl.length) {
        gesture.$slideEl = $(e.target).closest(`.${swiper.params.slideClass}`);
        if (gesture.$slideEl.length === 0)
          gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
        gesture.$imageEl = gesture.$slideEl
          .find(`.${params.containerClass}`)
          .eq(0)
          .find("picture, img, svg, canvas, .swiper-zoom-target")
          .eq(0);
        gesture.$imageWrapEl = gesture.$imageEl.parent(
          `.${params.containerClass}`
        );
        gesture.maxRatio =
          gesture.$imageWrapEl.attr("data-swiper-zoom") || params.maxRatio;

        if (gesture.$imageWrapEl.length === 0) {
          gesture.$imageEl = undefined;
          return;
        }
      }

      if (gesture.$imageEl) {
        gesture.$imageEl.transition(0);
      }

      isScaling = true;
    }

    function onGestureChange(e) {
      const support = swiper.support;
      const params = swiper.params.zoom;
      const zoom = swiper.zoom;

      if (!support.gestures) {
        if (
          e.type !== "touchmove" ||
          (e.type === "touchmove" && e.targetTouches.length < 2)
        ) {
          return;
        }

        fakeGestureMoved = true;
        gesture.scaleMove = getDistanceBetweenTouches(e);
      }

      if (!gesture.$imageEl || gesture.$imageEl.length === 0) {
        if (e.type === "gesturechange") onGestureStart(e);
        return;
      }

      if (support.gestures) {
        zoom.scale = e.scale * currentScale;
      } else {
        zoom.scale = (gesture.scaleMove / gesture.scaleStart) * currentScale;
      }

      if (zoom.scale > gesture.maxRatio) {
        zoom.scale =
          gesture.maxRatio - 1 + (zoom.scale - gesture.maxRatio + 1) ** 0.5;
      }

      if (zoom.scale < params.minRatio) {
        zoom.scale =
          params.minRatio + 1 - (params.minRatio - zoom.scale + 1) ** 0.5;
      }

      gesture.$imageEl.transform(`translate3d(0,0,0) scale(${zoom.scale})`);
    }

    function onGestureEnd(e) {
      const device = swiper.device;
      const support = swiper.support;
      const params = swiper.params.zoom;
      const zoom = swiper.zoom;

      if (!support.gestures) {
        if (!fakeGestureTouched || !fakeGestureMoved) {
          return;
        }

        if (
          e.type !== "touchend" ||
          (e.type === "touchend" &&
            e.changedTouches.length < 2 &&
            !device.android)
        ) {
          return;
        }

        fakeGestureTouched = false;
        fakeGestureMoved = false;
      }

      if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
      zoom.scale = Math.max(
        Math.min(zoom.scale, gesture.maxRatio),
        params.minRatio
      );
      gesture.$imageEl
        .transition(swiper.params.speed)
        .transform(`translate3d(0,0,0) scale(${zoom.scale})`);
      currentScale = zoom.scale;
      isScaling = false;
      if (zoom.scale === 1) gesture.$slideEl = undefined;
    }

    function onTouchStart(e) {
      const device = swiper.device;
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
      if (image.isTouched) return;
      if (device.android && e.cancelable) e.preventDefault();
      image.isTouched = true;
      image.touchesStart.x =
        e.type === "touchstart" ? e.targetTouches[0].pageX : e.pageX;
      image.touchesStart.y =
        e.type === "touchstart" ? e.targetTouches[0].pageY : e.pageY;
    }

    function onTouchMove(e) {
      const zoom = swiper.zoom;
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
      swiper.allowClick = false;
      if (!image.isTouched || !gesture.$slideEl) return;

      if (!image.isMoved) {
        image.width = gesture.$imageEl[0].offsetWidth;
        image.height = gesture.$imageEl[0].offsetHeight;
        image.startX = getTranslate(gesture.$imageWrapEl[0], "x") || 0;
        image.startY = getTranslate(gesture.$imageWrapEl[0], "y") || 0;
        gesture.slideWidth = gesture.$slideEl[0].offsetWidth;
        gesture.slideHeight = gesture.$slideEl[0].offsetHeight;
        gesture.$imageWrapEl.transition(0);
      } // Define if we need image drag

      const scaledWidth = image.width * zoom.scale;
      const scaledHeight = image.height * zoom.scale;
      if (
        scaledWidth < gesture.slideWidth &&
        scaledHeight < gesture.slideHeight
      )
        return;
      image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
      image.maxX = -image.minX;
      image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
      image.maxY = -image.minY;
      image.touchesCurrent.x =
        e.type === "touchmove" ? e.targetTouches[0].pageX : e.pageX;
      image.touchesCurrent.y =
        e.type === "touchmove" ? e.targetTouches[0].pageY : e.pageY;

      if (!image.isMoved && !isScaling) {
        if (
          swiper.isHorizontal() &&
          ((Math.floor(image.minX) === Math.floor(image.startX) &&
            image.touchesCurrent.x < image.touchesStart.x) ||
            (Math.floor(image.maxX) === Math.floor(image.startX) &&
              image.touchesCurrent.x > image.touchesStart.x))
        ) {
          image.isTouched = false;
          return;
        }

        if (
          !swiper.isHorizontal() &&
          ((Math.floor(image.minY) === Math.floor(image.startY) &&
            image.touchesCurrent.y < image.touchesStart.y) ||
            (Math.floor(image.maxY) === Math.floor(image.startY) &&
              image.touchesCurrent.y > image.touchesStart.y))
        ) {
          image.isTouched = false;
          return;
        }
      }

      if (e.cancelable) {
        e.preventDefault();
      }

      e.stopPropagation();
      image.isMoved = true;
      image.currentX =
        image.touchesCurrent.x - image.touchesStart.x + image.startX;
      image.currentY =
        image.touchesCurrent.y - image.touchesStart.y + image.startY;

      if (image.currentX < image.minX) {
        image.currentX =
          image.minX + 1 - (image.minX - image.currentX + 1) ** 0.8;
      }

      if (image.currentX > image.maxX) {
        image.currentX =
          image.maxX - 1 + (image.currentX - image.maxX + 1) ** 0.8;
      }

      if (image.currentY < image.minY) {
        image.currentY =
          image.minY + 1 - (image.minY - image.currentY + 1) ** 0.8;
      }

      if (image.currentY > image.maxY) {
        image.currentY =
          image.maxY - 1 + (image.currentY - image.maxY + 1) ** 0.8;
      } // Velocity

      if (!velocity.prevPositionX)
        velocity.prevPositionX = image.touchesCurrent.x;
      if (!velocity.prevPositionY)
        velocity.prevPositionY = image.touchesCurrent.y;
      if (!velocity.prevTime) velocity.prevTime = Date.now();
      velocity.x =
        (image.touchesCurrent.x - velocity.prevPositionX) /
        (Date.now() - velocity.prevTime) /
        2;
      velocity.y =
        (image.touchesCurrent.y - velocity.prevPositionY) /
        (Date.now() - velocity.prevTime) /
        2;
      if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2)
        velocity.x = 0;
      if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2)
        velocity.y = 0;
      velocity.prevPositionX = image.touchesCurrent.x;
      velocity.prevPositionY = image.touchesCurrent.y;
      velocity.prevTime = Date.now();
      gesture.$imageWrapEl.transform(
        `translate3d(${image.currentX}px, ${image.currentY}px,0)`
      );
    }

    function onTouchEnd() {
      const zoom = swiper.zoom;
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;

      if (!image.isTouched || !image.isMoved) {
        image.isTouched = false;
        image.isMoved = false;
        return;
      }

      image.isTouched = false;
      image.isMoved = false;
      let momentumDurationX = 300;
      let momentumDurationY = 300;
      const momentumDistanceX = velocity.x * momentumDurationX;
      const newPositionX = image.currentX + momentumDistanceX;
      const momentumDistanceY = velocity.y * momentumDurationY;
      const newPositionY = image.currentY + momentumDistanceY; // Fix duration

      if (velocity.x !== 0)
        momentumDurationX = Math.abs(
          (newPositionX - image.currentX) / velocity.x
        );
      if (velocity.y !== 0)
        momentumDurationY = Math.abs(
          (newPositionY - image.currentY) / velocity.y
        );
      const momentumDuration = Math.max(momentumDurationX, momentumDurationY);
      image.currentX = newPositionX;
      image.currentY = newPositionY; // Define if we need image drag

      const scaledWidth = image.width * zoom.scale;
      const scaledHeight = image.height * zoom.scale;
      image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
      image.maxX = -image.minX;
      image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
      image.maxY = -image.minY;
      image.currentX = Math.max(
        Math.min(image.currentX, image.maxX),
        image.minX
      );
      image.currentY = Math.max(
        Math.min(image.currentY, image.maxY),
        image.minY
      );
      gesture.$imageWrapEl
        .transition(momentumDuration)
        .transform(`translate3d(${image.currentX}px, ${image.currentY}px,0)`);
    }

    function onTransitionEnd() {
      const zoom = swiper.zoom;

      if (gesture.$slideEl && swiper.previousIndex !== swiper.activeIndex) {
        if (gesture.$imageEl) {
          gesture.$imageEl.transform("translate3d(0,0,0) scale(1)");
        }

        if (gesture.$imageWrapEl) {
          gesture.$imageWrapEl.transform("translate3d(0,0,0)");
        }

        zoom.scale = 1;
        currentScale = 1;
        gesture.$slideEl = undefined;
        gesture.$imageEl = undefined;
        gesture.$imageWrapEl = undefined;
      }
    }

    function zoomIn(e) {
      const zoom = swiper.zoom;
      const params = swiper.params.zoom;

      if (!gesture.$slideEl) {
        if (e && e.target) {
          gesture.$slideEl = $(e.target).closest(
            `.${swiper.params.slideClass}`
          );
        }

        if (!gesture.$slideEl) {
          if (
            swiper.params.virtual &&
            swiper.params.virtual.enabled &&
            swiper.virtual
          ) {
            gesture.$slideEl = swiper.$wrapperEl.children(
              `.${swiper.params.slideActiveClass}`
            );
          } else {
            gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
          }
        }

        gesture.$imageEl = gesture.$slideEl
          .find(`.${params.containerClass}`)
          .eq(0)
          .find("picture, img, svg, canvas, .swiper-zoom-target")
          .eq(0);
        gesture.$imageWrapEl = gesture.$imageEl.parent(
          `.${params.containerClass}`
        );
      }

      if (
        !gesture.$imageEl ||
        gesture.$imageEl.length === 0 ||
        !gesture.$imageWrapEl ||
        gesture.$imageWrapEl.length === 0
      )
        return;

      if (swiper.params.cssMode) {
        swiper.wrapperEl.style.overflow = "hidden";
        swiper.wrapperEl.style.touchAction = "none";
      }

      gesture.$slideEl.addClass(`${params.zoomedSlideClass}`);
      let touchX;
      let touchY;
      let offsetX;
      let offsetY;
      let diffX;
      let diffY;
      let translateX;
      let translateY;
      let imageWidth;
      let imageHeight;
      let scaledWidth;
      let scaledHeight;
      let translateMinX;
      let translateMinY;
      let translateMaxX;
      let translateMaxY;
      let slideWidth;
      let slideHeight;

      if (typeof image.touchesStart.x === "undefined" && e) {
        touchX = e.type === "touchend" ? e.changedTouches[0].pageX : e.pageX;
        touchY = e.type === "touchend" ? e.changedTouches[0].pageY : e.pageY;
      } else {
        touchX = image.touchesStart.x;
        touchY = image.touchesStart.y;
      }

      zoom.scale =
        gesture.$imageWrapEl.attr("data-swiper-zoom") || params.maxRatio;
      currentScale =
        gesture.$imageWrapEl.attr("data-swiper-zoom") || params.maxRatio;

      if (e) {
        slideWidth = gesture.$slideEl[0].offsetWidth;
        slideHeight = gesture.$slideEl[0].offsetHeight;
        offsetX = gesture.$slideEl.offset().left + window.scrollX;
        offsetY = gesture.$slideEl.offset().top + window.scrollY;
        diffX = offsetX + slideWidth / 2 - touchX;
        diffY = offsetY + slideHeight / 2 - touchY;
        imageWidth = gesture.$imageEl[0].offsetWidth;
        imageHeight = gesture.$imageEl[0].offsetHeight;
        scaledWidth = imageWidth * zoom.scale;
        scaledHeight = imageHeight * zoom.scale;
        translateMinX = Math.min(slideWidth / 2 - scaledWidth / 2, 0);
        translateMinY = Math.min(slideHeight / 2 - scaledHeight / 2, 0);
        translateMaxX = -translateMinX;
        translateMaxY = -translateMinY;
        translateX = diffX * zoom.scale;
        translateY = diffY * zoom.scale;

        if (translateX < translateMinX) {
          translateX = translateMinX;
        }

        if (translateX > translateMaxX) {
          translateX = translateMaxX;
        }

        if (translateY < translateMinY) {
          translateY = translateMinY;
        }

        if (translateY > translateMaxY) {
          translateY = translateMaxY;
        }
      } else {
        translateX = 0;
        translateY = 0;
      }

      gesture.$imageWrapEl
        .transition(300)
        .transform(`translate3d(${translateX}px, ${translateY}px,0)`);
      gesture.$imageEl
        .transition(300)
        .transform(`translate3d(0,0,0) scale(${zoom.scale})`);
    }

    function zoomOut() {
      const zoom = swiper.zoom;
      const params = swiper.params.zoom;

      if (!gesture.$slideEl) {
        if (
          swiper.params.virtual &&
          swiper.params.virtual.enabled &&
          swiper.virtual
        ) {
          gesture.$slideEl = swiper.$wrapperEl.children(
            `.${swiper.params.slideActiveClass}`
          );
        } else {
          gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
        }

        gesture.$imageEl = gesture.$slideEl
          .find(`.${params.containerClass}`)
          .eq(0)
          .find("picture, img, svg, canvas, .swiper-zoom-target")
          .eq(0);
        gesture.$imageWrapEl = gesture.$imageEl.parent(
          `.${params.containerClass}`
        );
      }

      if (
        !gesture.$imageEl ||
        gesture.$imageEl.length === 0 ||
        !gesture.$imageWrapEl ||
        gesture.$imageWrapEl.length === 0
      )
        return;

      if (swiper.params.cssMode) {
        swiper.wrapperEl.style.overflow = "";
        swiper.wrapperEl.style.touchAction = "";
      }

      zoom.scale = 1;
      currentScale = 1;
      gesture.$imageWrapEl.transition(300).transform("translate3d(0,0,0)");
      gesture.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)");
      gesture.$slideEl.removeClass(`${params.zoomedSlideClass}`);
      gesture.$slideEl = undefined;
    } // Toggle Zoom

    function zoomToggle(e) {
      const zoom = swiper.zoom;

      if (zoom.scale && zoom.scale !== 1) {
        // Zoom Out
        zoomOut();
      } else {
        // Zoom In
        zoomIn(e);
      }
    }

    function getListeners() {
      const support = swiper.support;
      const passiveListener =
        swiper.touchEvents.start === "touchstart" &&
        support.passiveListener &&
        swiper.params.passiveListeners
          ? {
              passive: true,
              capture: false,
            }
          : false;
      const activeListenerWithCapture = support.passiveListener
        ? {
            passive: false,
            capture: true,
          }
        : true;
      return {
        passiveListener,
        activeListenerWithCapture,
      };
    }

    function getSlideSelector() {
      return `.${swiper.params.slideClass}`;
    }

    function toggleGestures(method) {
      const { passiveListener } = getListeners();
      const slideSelector = getSlideSelector();
      swiper.$wrapperEl[method](
        "gesturestart",
        slideSelector,
        onGestureStart,
        passiveListener
      );
      swiper.$wrapperEl[method](
        "gesturechange",
        slideSelector,
        onGestureChange,
        passiveListener
      );
      swiper.$wrapperEl[method](
        "gestureend",
        slideSelector,
        onGestureEnd,
        passiveListener
      );
    }

    function enableGestures() {
      if (gesturesEnabled) return;
      gesturesEnabled = true;
      toggleGestures("on");
    }

    function disableGestures() {
      if (!gesturesEnabled) return;
      gesturesEnabled = false;
      toggleGestures("off");
    } // Attach/Detach Events

    function enable() {
      const zoom = swiper.zoom;
      if (zoom.enabled) return;
      zoom.enabled = true;
      const support = swiper.support;
      const { passiveListener, activeListenerWithCapture } = getListeners();
      const slideSelector = getSlideSelector(); // Scale image

      if (support.gestures) {
        swiper.$wrapperEl.on(
          swiper.touchEvents.start,
          enableGestures,
          passiveListener
        );
        swiper.$wrapperEl.on(
          swiper.touchEvents.end,
          disableGestures,
          passiveListener
        );
      } else if (swiper.touchEvents.start === "touchstart") {
        swiper.$wrapperEl.on(
          swiper.touchEvents.start,
          slideSelector,
          onGestureStart,
          passiveListener
        );
        swiper.$wrapperEl.on(
          swiper.touchEvents.move,
          slideSelector,
          onGestureChange,
          activeListenerWithCapture
        );
        swiper.$wrapperEl.on(
          swiper.touchEvents.end,
          slideSelector,
          onGestureEnd,
          passiveListener
        );

        if (swiper.touchEvents.cancel) {
          swiper.$wrapperEl.on(
            swiper.touchEvents.cancel,
            slideSelector,
            onGestureEnd,
            passiveListener
          );
        }
      } // Move image

      swiper.$wrapperEl.on(
        swiper.touchEvents.move,
        `.${swiper.params.zoom.containerClass}`,
        onTouchMove,
        activeListenerWithCapture
      );
    }

    function disable() {
      const zoom = swiper.zoom;
      if (!zoom.enabled) return;
      const support = swiper.support;
      zoom.enabled = false;
      const { passiveListener, activeListenerWithCapture } = getListeners();
      const slideSelector = getSlideSelector(); // Scale image

      if (support.gestures) {
        swiper.$wrapperEl.off(
          swiper.touchEvents.start,
          enableGestures,
          passiveListener
        );
        swiper.$wrapperEl.off(
          swiper.touchEvents.end,
          disableGestures,
          passiveListener
        );
      } else if (swiper.touchEvents.start === "touchstart") {
        swiper.$wrapperEl.off(
          swiper.touchEvents.start,
          slideSelector,
          onGestureStart,
          passiveListener
        );
        swiper.$wrapperEl.off(
          swiper.touchEvents.move,
          slideSelector,
          onGestureChange,
          activeListenerWithCapture
        );
        swiper.$wrapperEl.off(
          swiper.touchEvents.end,
          slideSelector,
          onGestureEnd,
          passiveListener
        );

        if (swiper.touchEvents.cancel) {
          swiper.$wrapperEl.off(
            swiper.touchEvents.cancel,
            slideSelector,
            onGestureEnd,
            passiveListener
          );
        }
      } // Move image

      swiper.$wrapperEl.off(
        swiper.touchEvents.move,
        `.${swiper.params.zoom.containerClass}`,
        onTouchMove,
        activeListenerWithCapture
      );
    }

    on("init", () => {
      if (swiper.params.zoom.enabled) {
        enable();
      }
    });
    on("destroy", () => {
      disable();
    });
    on("touchStart", (_s, e) => {
      if (!swiper.zoom.enabled) return;
      onTouchStart(e);
    });
    on("touchEnd", (_s, e) => {
      if (!swiper.zoom.enabled) return;
      onTouchEnd(e);
    });
    on("doubleTap", (_s, e) => {
      if (
        !swiper.animating &&
        swiper.params.zoom.enabled &&
        swiper.zoom.enabled &&
        swiper.params.zoom.toggle
      ) {
        zoomToggle(e);
      }
    });
    on("transitionEnd", () => {
      if (swiper.zoom.enabled && swiper.params.zoom.enabled) {
        onTransitionEnd();
      }
    });
    on("slideChange", () => {
      if (
        swiper.zoom.enabled &&
        swiper.params.zoom.enabled &&
        swiper.params.cssMode
      ) {
        onTransitionEnd();
      }
    });
    Object.assign(swiper.zoom, {
      enable,
      disable,
      in: zoomIn,
      out: zoomOut,
      toggle: zoomToggle,
    });
  } // CONCATENATED MODULE: ./node_modules/swiper/modules/lazy/lazy.js
  function Lazy(_ref) {
    let { swiper, extendParams, on, emit } = _ref;
    extendParams({
      lazy: {
        checkInView: false,
        enabled: false,
        loadPrevNext: false,
        loadPrevNextAmount: 1,
        loadOnTransitionStart: false,
        scrollingElement: "",
        elementClass: "swiper-lazy",
        loadingClass: "swiper-lazy-loading",
        loadedClass: "swiper-lazy-loaded",
        preloaderClass: "swiper-lazy-preloader",
      },
    });
    swiper.lazy = {};
    let scrollHandlerAttached = false;
    let initialImageLoaded = false;

    function loadInSlide(index, loadInDuplicate) {
      if (loadInDuplicate === void 0) {
        loadInDuplicate = true;
      }

      const params = swiper.params.lazy;
      if (typeof index === "undefined") return;
      if (swiper.slides.length === 0) return;
      const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
      const $slideEl = isVirtual
        ? swiper.$wrapperEl.children(
            `.${swiper.params.slideClass}[data-swiper-slide-index="${index}"]`
          )
        : swiper.slides.eq(index);
      const $images = $slideEl.find(
        `.${params.elementClass}:not(.${params.loadedClass}):not(.${params.loadingClass})`
      );

      if (
        $slideEl.hasClass(params.elementClass) &&
        !$slideEl.hasClass(params.loadedClass) &&
        !$slideEl.hasClass(params.loadingClass)
      ) {
        $images.push($slideEl[0]);
      }

      if ($images.length === 0) return;
      $images.each((imageEl) => {
        const $imageEl = $(imageEl);
        $imageEl.addClass(params.loadingClass);
        const background = $imageEl.attr("data-background");
        const src = $imageEl.attr("data-src");
        const srcset = $imageEl.attr("data-srcset");
        const sizes = $imageEl.attr("data-sizes");
        const $pictureEl = $imageEl.parent("picture");
        swiper.loadImage(
          $imageEl[0],
          src || background,
          srcset,
          sizes,
          false,
          () => {
            if (
              typeof swiper === "undefined" ||
              swiper === null ||
              !swiper ||
              (swiper && !swiper.params) ||
              swiper.destroyed
            )
              return;

            if (background) {
              $imageEl.css("background-image", `url("${background}")`);
              $imageEl.removeAttr("data-background");
            } else {
              if (srcset) {
                $imageEl.attr("srcset", srcset);
                $imageEl.removeAttr("data-srcset");
              }

              if (sizes) {
                $imageEl.attr("sizes", sizes);
                $imageEl.removeAttr("data-sizes");
              }

              if ($pictureEl.length) {
                $pictureEl.children("source").each((sourceEl) => {
                  const $source = $(sourceEl);

                  if ($source.attr("data-srcset")) {
                    $source.attr("srcset", $source.attr("data-srcset"));
                    $source.removeAttr("data-srcset");
                  }
                });
              }

              if (src) {
                $imageEl.attr("src", src);
                $imageEl.removeAttr("data-src");
              }
            }

            $imageEl
              .addClass(params.loadedClass)
              .removeClass(params.loadingClass);
            $slideEl.find(`.${params.preloaderClass}`).remove();

            if (swiper.params.loop && loadInDuplicate) {
              const slideOriginalIndex = $slideEl.attr(
                "data-swiper-slide-index"
              );

              if ($slideEl.hasClass(swiper.params.slideDuplicateClass)) {
                const originalSlide = swiper.$wrapperEl.children(
                  `[data-swiper-slide-index="${slideOriginalIndex}"]:not(.${swiper.params.slideDuplicateClass})`
                );
                loadInSlide(originalSlide.index(), false);
              } else {
                const duplicatedSlide = swiper.$wrapperEl.children(
                  `.${swiper.params.slideDuplicateClass}[data-swiper-slide-index="${slideOriginalIndex}"]`
                );
                loadInSlide(duplicatedSlide.index(), false);
              }
            }

            emit("lazyImageReady", $slideEl[0], $imageEl[0]);

            if (swiper.params.autoHeight) {
              swiper.updateAutoHeight();
            }
          }
        );
        emit("lazyImageLoad", $slideEl[0], $imageEl[0]);
      });
    }

    function load() {
      const { $wrapperEl, params: swiperParams, slides, activeIndex } = swiper;
      const isVirtual = swiper.virtual && swiperParams.virtual.enabled;
      const params = swiperParams.lazy;
      let slidesPerView = swiperParams.slidesPerView;

      if (slidesPerView === "auto") {
        slidesPerView = 0;
      }

      function slideExist(index) {
        if (isVirtual) {
          if (
            $wrapperEl.children(
              `.${swiperParams.slideClass}[data-swiper-slide-index="${index}"]`
            ).length
          ) {
            return true;
          }
        } else if (slides[index]) return true;

        return false;
      }

      function slideIndex(slideEl) {
        if (isVirtual) {
          return $(slideEl).attr("data-swiper-slide-index");
        }

        return $(slideEl).index();
      }

      if (!initialImageLoaded) initialImageLoaded = true;

      if (swiper.params.watchSlidesProgress) {
        $wrapperEl
          .children(`.${swiperParams.slideVisibleClass}`)
          .each((slideEl) => {
            const index = isVirtual
              ? $(slideEl).attr("data-swiper-slide-index")
              : $(slideEl).index();
            loadInSlide(index);
          });
      } else if (slidesPerView > 1) {
        for (let i = activeIndex; i < activeIndex + slidesPerView; i += 1) {
          if (slideExist(i)) loadInSlide(i);
        }
      } else {
        loadInSlide(activeIndex);
      }

      if (params.loadPrevNext) {
        if (
          slidesPerView > 1 ||
          (params.loadPrevNextAmount && params.loadPrevNextAmount > 1)
        ) {
          const amount = params.loadPrevNextAmount;
          const spv = slidesPerView;
          const maxIndex = Math.min(
            activeIndex + spv + Math.max(amount, spv),
            slides.length
          );
          const minIndex = Math.max(activeIndex - Math.max(spv, amount), 0); // Next Slides

          for (let i = activeIndex + slidesPerView; i < maxIndex; i += 1) {
            if (slideExist(i)) loadInSlide(i);
          } // Prev Slides

          for (let i = minIndex; i < activeIndex; i += 1) {
            if (slideExist(i)) loadInSlide(i);
          }
        } else {
          const nextSlide = $wrapperEl.children(
            `.${swiperParams.slideNextClass}`
          );
          if (nextSlide.length > 0) loadInSlide(slideIndex(nextSlide));
          const prevSlide = $wrapperEl.children(
            `.${swiperParams.slidePrevClass}`
          );
          if (prevSlide.length > 0) loadInSlide(slideIndex(prevSlide));
        }
      }
    }

    function checkInViewOnLoad() {
      const window = getWindow();
      if (!swiper || swiper.destroyed) return;
      const $scrollElement = swiper.params.lazy.scrollingElement
        ? $(swiper.params.lazy.scrollingElement)
        : $(window);
      const isWindow = $scrollElement[0] === window;
      const scrollElementWidth = isWindow
        ? window.innerWidth
        : $scrollElement[0].offsetWidth;
      const scrollElementHeight = isWindow
        ? window.innerHeight
        : $scrollElement[0].offsetHeight;
      const swiperOffset = swiper.$el.offset();
      const { rtlTranslate: rtl } = swiper;
      let inView = false;
      if (rtl) swiperOffset.left -= swiper.$el[0].scrollLeft;
      const swiperCoord = [
        [swiperOffset.left, swiperOffset.top],
        [swiperOffset.left + swiper.width, swiperOffset.top],
        [swiperOffset.left, swiperOffset.top + swiper.height],
        [swiperOffset.left + swiper.width, swiperOffset.top + swiper.height],
      ];

      for (let i = 0; i < swiperCoord.length; i += 1) {
        const point = swiperCoord[i];

        if (
          point[0] >= 0 &&
          point[0] <= scrollElementWidth &&
          point[1] >= 0 &&
          point[1] <= scrollElementHeight
        ) {
          if (point[0] === 0 && point[1] === 0) continue; // eslint-disable-line

          inView = true;
        }
      }

      const passiveListener =
        swiper.touchEvents.start === "touchstart" &&
        swiper.support.passiveListener &&
        swiper.params.passiveListeners
          ? {
              passive: true,
              capture: false,
            }
          : false;

      if (inView) {
        load();
        $scrollElement.off("scroll", checkInViewOnLoad, passiveListener);
      } else if (!scrollHandlerAttached) {
        scrollHandlerAttached = true;
        $scrollElement.on("scroll", checkInViewOnLoad, passiveListener);
      }
    }

    on("beforeInit", () => {
      if (swiper.params.lazy.enabled && swiper.params.preloadImages) {
        swiper.params.preloadImages = false;
      }
    });
    on("init", () => {
      if (swiper.params.lazy.enabled) {
        if (swiper.params.lazy.checkInView) {
          checkInViewOnLoad();
        } else {
          load();
        }
      }
    });
    on("scroll", () => {
      if (
        swiper.params.freeMode &&
        swiper.params.freeMode.enabled &&
        !swiper.params.freeMode.sticky
      ) {
        load();
      }
    });
    on("scrollbarDragMove resize _freeModeNoMomentumRelease", () => {
      if (swiper.params.lazy.enabled) {
        if (swiper.params.lazy.checkInView) {
          checkInViewOnLoad();
        } else {
          load();
        }
      }
    });
    on("transitionStart", () => {
      if (swiper.params.lazy.enabled) {
        if (
          swiper.params.lazy.loadOnTransitionStart ||
          (!swiper.params.lazy.loadOnTransitionStart && !initialImageLoaded)
        ) {
          if (swiper.params.lazy.checkInView) {
            checkInViewOnLoad();
          } else {
            load();
          }
        }
      }
    });
    on("transitionEnd", () => {
      if (
        swiper.params.lazy.enabled &&
        !swiper.params.lazy.loadOnTransitionStart
      ) {
        if (swiper.params.lazy.checkInView) {
          checkInViewOnLoad();
        } else {
          load();
        }
      }
    });
    on("slideChange", () => {
      const {
        lazy,
        cssMode,
        watchSlidesProgress,
        touchReleaseOnEdges,
        resistanceRatio,
      } = swiper.params;

      if (
        lazy.enabled &&
        (cssMode ||
          (watchSlidesProgress &&
            (touchReleaseOnEdges || resistanceRatio === 0)))
      ) {
        load();
      }
    });
    Object.assign(swiper.lazy, {
      load,
      loadInSlide,
    });
  } // CONCATENATED MODULE: ./node_modules/swiper/modules/controller/controller.js
  /* eslint no-bitwise: ["error", { "allow": [">>"] }] */

  function Controller(_ref) {
    let { swiper, extendParams, on } = _ref;
    extendParams({
      controller: {
        control: undefined,
        inverse: false,
        by: "slide", // or 'container'
      },
    });
    swiper.controller = {
      control: undefined,
    };

    function LinearSpline(x, y) {
      const binarySearch = (function search() {
        let maxIndex;
        let minIndex;
        let guess;
        return (array, val) => {
          minIndex = -1;
          maxIndex = array.length;

          while (maxIndex - minIndex > 1) {
            guess = (maxIndex + minIndex) >> 1;

            if (array[guess] <= val) {
              minIndex = guess;
            } else {
              maxIndex = guess;
            }
          }

          return maxIndex;
        };
      })();

      this.x = x;
      this.y = y;
      this.lastIndex = x.length - 1; // Given an x value (x2), return the expected y2 value:
      // (x1,y1) is the known point before given value,
      // (x3,y3) is the known point after given value.

      let i1;
      let i3;

      this.interpolate = function interpolate(x2) {
        if (!x2) return 0; // Get the indexes of x1 and x3 (the array indexes before and after given x2):

        i3 = binarySearch(this.x, x2);
        i1 = i3 - 1; // We have our indexes i1 & i3, so we can calculate already:
        // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1

        return (
          ((x2 - this.x[i1]) * (this.y[i3] - this.y[i1])) /
            (this.x[i3] - this.x[i1]) +
          this.y[i1]
        );
      };

      return this;
    } // xxx: for now i will just save one spline function to to

    function getInterpolateFunction(c) {
      if (!swiper.controller.spline) {
        swiper.controller.spline = swiper.params.loop
          ? new LinearSpline(swiper.slidesGrid, c.slidesGrid)
          : new LinearSpline(swiper.snapGrid, c.snapGrid);
      }
    }

    function setTranslate(_t, byController) {
      const controlled = swiper.controller.control;
      let multiplier;
      let controlledTranslate;
      const Swiper = swiper.constructor;

      function setControlledTranslate(c) {
        // this will create an Interpolate function based on the snapGrids
        // x is the Grid of the scrolled scroller and y will be the controlled scroller
        // it makes sense to create this only once and recall it for the interpolation
        // the function does a lot of value caching for performance
        const translate = swiper.rtlTranslate
          ? -swiper.translate
          : swiper.translate;

        if (swiper.params.controller.by === "slide") {
          getInterpolateFunction(c); // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
          // but it did not work out

          controlledTranslate = -swiper.controller.spline.interpolate(
            -translate
          );
        }

        if (
          !controlledTranslate ||
          swiper.params.controller.by === "container"
        ) {
          multiplier =
            (c.maxTranslate() - c.minTranslate()) /
            (swiper.maxTranslate() - swiper.minTranslate());
          controlledTranslate =
            (translate - swiper.minTranslate()) * multiplier + c.minTranslate();
        }

        if (swiper.params.controller.inverse) {
          controlledTranslate = c.maxTranslate() - controlledTranslate;
        }

        c.updateProgress(controlledTranslate);
        c.setTranslate(controlledTranslate, swiper);
        c.updateActiveIndex();
        c.updateSlidesClasses();
      }

      if (Array.isArray(controlled)) {
        for (let i = 0; i < controlled.length; i += 1) {
          if (
            controlled[i] !== byController &&
            controlled[i] instanceof Swiper
          ) {
            setControlledTranslate(controlled[i]);
          }
        }
      } else if (controlled instanceof Swiper && byController !== controlled) {
        setControlledTranslate(controlled);
      }
    }

    function setTransition(duration, byController) {
      const Swiper = swiper.constructor;
      const controlled = swiper.controller.control;
      let i;

      function setControlledTransition(c) {
        c.setTransition(duration, swiper);

        if (duration !== 0) {
          c.transitionStart();

          if (c.params.autoHeight) {
            nextTick(() => {
              c.updateAutoHeight();
            });
          }

          c.$wrapperEl.transitionEnd(() => {
            if (!controlled) return;

            if (c.params.loop && swiper.params.controller.by === "slide") {
              c.loopFix();
            }

            c.transitionEnd();
          });
        }
      }

      if (Array.isArray(controlled)) {
        for (i = 0; i < controlled.length; i += 1) {
          if (
            controlled[i] !== byController &&
            controlled[i] instanceof Swiper
          ) {
            setControlledTransition(controlled[i]);
          }
        }
      } else if (controlled instanceof Swiper && byController !== controlled) {
        setControlledTransition(controlled);
      }
    }

    function removeSpline() {
      if (!swiper.controller.control) return;

      if (swiper.controller.spline) {
        swiper.controller.spline = undefined;
        delete swiper.controller.spline;
      }
    }

    on("beforeInit", () => {
      swiper.controller.control = swiper.params.controller.control;
    });
    on("update", () => {
      removeSpline();
    });
    on("resize", () => {
      removeSpline();
    });
    on("observerUpdate", () => {
      removeSpline();
    });
    on("setTranslate", (_s, translate, byController) => {
      if (!swiper.controller.control) return;
      swiper.controller.setTranslate(translate, byController);
    });
    on("setTransition", (_s, duration, byController) => {
      if (!swiper.controller.control) return;
      swiper.controller.setTransition(duration, byController);
    });
    Object.assign(swiper.controller, {
      setTranslate,
      setTransition,
    });
  } // CONCATENATED MODULE: ./node_modules/swiper/modules/a11y/a11y.js
  function A11y(_ref) {
    let { swiper, extendParams, on } = _ref;
    extendParams({
      a11y: {
        enabled: true,
        notificationClass: "swiper-notification",
        prevSlideMessage: "Previous slide",
        nextSlideMessage: "Next slide",
        firstSlideMessage: "This is the first slide",
        lastSlideMessage: "This is the last slide",
        paginationBulletMessage: "Go to slide {{index}}",
        slideLabelMessage: "{{index}} / {{slidesLength}}",
        containerMessage: null,
        containerRoleDescriptionMessage: null,
        itemRoleDescriptionMessage: null,
        slideRole: "group",
        id: null,
      },
    });
    let liveRegion = null;

    function notify(message) {
      const notification = liveRegion;
      if (notification.length === 0) return;
      notification.html("");
      notification.html(message);
    }

    function getRandomNumber(size) {
      if (size === void 0) {
        size = 16;
      }

      const randomChar = () => Math.round(16 * Math.random()).toString(16);

      return "x".repeat(size).replace(/x/g, randomChar);
    }

    function makeElFocusable($el) {
      $el.attr("tabIndex", "0");
    }

    function makeElNotFocusable($el) {
      $el.attr("tabIndex", "-1");
    }

    function addElRole($el, role) {
      $el.attr("role", role);
    }

    function addElRoleDescription($el, description) {
      $el.attr("aria-roledescription", description);
    }

    function addElControls($el, controls) {
      $el.attr("aria-controls", controls);
    }

    function addElLabel($el, label) {
      $el.attr("aria-label", label);
    }

    function addElId($el, id) {
      $el.attr("id", id);
    }

    function addElLive($el, live) {
      $el.attr("aria-live", live);
    }

    function disableEl($el) {
      $el.attr("aria-disabled", true);
    }

    function enableEl($el) {
      $el.attr("aria-disabled", false);
    }

    function onEnterOrSpaceKey(e) {
      if (e.keyCode !== 13 && e.keyCode !== 32) return;
      const params = swiper.params.a11y;
      const $targetEl = $(e.target);

      if (
        swiper.navigation &&
        swiper.navigation.$nextEl &&
        $targetEl.is(swiper.navigation.$nextEl)
      ) {
        if (!(swiper.isEnd && !swiper.params.loop)) {
          swiper.slideNext();
        }

        if (swiper.isEnd) {
          notify(params.lastSlideMessage);
        } else {
          notify(params.nextSlideMessage);
        }
      }

      if (
        swiper.navigation &&
        swiper.navigation.$prevEl &&
        $targetEl.is(swiper.navigation.$prevEl)
      ) {
        if (!(swiper.isBeginning && !swiper.params.loop)) {
          swiper.slidePrev();
        }

        if (swiper.isBeginning) {
          notify(params.firstSlideMessage);
        } else {
          notify(params.prevSlideMessage);
        }
      }

      if (
        swiper.pagination &&
        $targetEl.is(classesToSelector(swiper.params.pagination.bulletClass))
      ) {
        $targetEl[0].click();
      }
    }

    function updateNavigation() {
      if (swiper.params.loop || swiper.params.rewind || !swiper.navigation)
        return;
      const { $nextEl, $prevEl } = swiper.navigation;

      if ($prevEl && $prevEl.length > 0) {
        if (swiper.isBeginning) {
          disableEl($prevEl);
          makeElNotFocusable($prevEl);
        } else {
          enableEl($prevEl);
          makeElFocusable($prevEl);
        }
      }

      if ($nextEl && $nextEl.length > 0) {
        if (swiper.isEnd) {
          disableEl($nextEl);
          makeElNotFocusable($nextEl);
        } else {
          enableEl($nextEl);
          makeElFocusable($nextEl);
        }
      }
    }

    function hasPagination() {
      return (
        swiper.pagination &&
        swiper.pagination.bullets &&
        swiper.pagination.bullets.length
      );
    }

    function hasClickablePagination() {
      return hasPagination() && swiper.params.pagination.clickable;
    }

    function updatePagination() {
      const params = swiper.params.a11y;
      if (!hasPagination()) return;
      swiper.pagination.bullets.each((bulletEl) => {
        const $bulletEl = $(bulletEl);

        if (swiper.params.pagination.clickable) {
          makeElFocusable($bulletEl);

          if (!swiper.params.pagination.renderBullet) {
            addElRole($bulletEl, "button");
            addElLabel(
              $bulletEl,
              params.paginationBulletMessage.replace(
                /\{\{index\}\}/,
                $bulletEl.index() + 1
              )
            );
          }
        }

        if ($bulletEl.is(`.${swiper.params.pagination.bulletActiveClass}`)) {
          $bulletEl.attr("aria-current", "true");
        } else {
          $bulletEl.removeAttr("aria-current");
        }
      });
    }

    const initNavEl = ($el, wrapperId, message) => {
      makeElFocusable($el);

      if ($el[0].tagName !== "BUTTON") {
        addElRole($el, "button");
        $el.on("keydown", onEnterOrSpaceKey);
      }

      addElLabel($el, message);
      addElControls($el, wrapperId);
    };

    const handleFocus = (e) => {
      const slideEl = e.target.closest(`.${swiper.params.slideClass}`);
      if (!slideEl || !swiper.slides.includes(slideEl)) return;
      const isActive = swiper.slides.indexOf(slideEl) === swiper.activeIndex;
      const isVisible =
        swiper.params.watchSlidesProgress &&
        swiper.visibleSlides &&
        swiper.visibleSlides.includes(slideEl);
      if (isActive || isVisible) return;
      swiper.slideTo(swiper.slides.indexOf(slideEl), 0);
    };

    function init() {
      const params = swiper.params.a11y;
      swiper.$el.append(liveRegion); // Container

      const $containerEl = swiper.$el;

      if (params.containerRoleDescriptionMessage) {
        addElRoleDescription(
          $containerEl,
          params.containerRoleDescriptionMessage
        );
      }

      if (params.containerMessage) {
        addElLabel($containerEl, params.containerMessage);
      } // Wrapper

      const $wrapperEl = swiper.$wrapperEl;
      const wrapperId =
        params.id ||
        $wrapperEl.attr("id") ||
        `swiper-wrapper-${getRandomNumber(16)}`;
      const live =
        swiper.params.autoplay && swiper.params.autoplay.enabled
          ? "off"
          : "polite";
      addElId($wrapperEl, wrapperId);
      addElLive($wrapperEl, live); // Slide

      if (params.itemRoleDescriptionMessage) {
        addElRoleDescription(
          $(swiper.slides),
          params.itemRoleDescriptionMessage
        );
      }

      addElRole($(swiper.slides), params.slideRole);
      const slidesLength = swiper.params.loop
        ? swiper.slides.filter(
            (el) => !el.classList.contains(swiper.params.slideDuplicateClass)
          ).length
        : swiper.slides.length;
      swiper.slides.each((slideEl, index) => {
        const $slideEl = $(slideEl);
        const slideIndex = swiper.params.loop
          ? parseInt($slideEl.attr("data-swiper-slide-index"), 10)
          : index;
        const ariaLabelMessage = params.slideLabelMessage
          .replace(/\{\{index\}\}/, slideIndex + 1)
          .replace(/\{\{slidesLength\}\}/, slidesLength);
        addElLabel($slideEl, ariaLabelMessage);
      }); // Navigation

      let $nextEl;
      let $prevEl;

      if (swiper.navigation && swiper.navigation.$nextEl) {
        $nextEl = swiper.navigation.$nextEl;
      }

      if (swiper.navigation && swiper.navigation.$prevEl) {
        $prevEl = swiper.navigation.$prevEl;
      }

      if ($nextEl && $nextEl.length) {
        initNavEl($nextEl, wrapperId, params.nextSlideMessage);
      }

      if ($prevEl && $prevEl.length) {
        initNavEl($prevEl, wrapperId, params.prevSlideMessage);
      } // Pagination

      if (hasClickablePagination()) {
        swiper.pagination.$el.on(
          "keydown",
          classesToSelector(swiper.params.pagination.bulletClass),
          onEnterOrSpaceKey
        );
      } // Tab focus

      swiper.$el.on("focus", handleFocus, true);
    }

    function destroy() {
      if (liveRegion && liveRegion.length > 0) liveRegion.remove();
      let $nextEl;
      let $prevEl;

      if (swiper.navigation && swiper.navigation.$nextEl) {
        $nextEl = swiper.navigation.$nextEl;
      }

      if (swiper.navigation && swiper.navigation.$prevEl) {
        $prevEl = swiper.navigation.$prevEl;
      }

      if ($nextEl) {
        $nextEl.off("keydown", onEnterOrSpaceKey);
      }

      if ($prevEl) {
        $prevEl.off("keydown", onEnterOrSpaceKey);
      } // Pagination

      if (hasClickablePagination()) {
        swiper.pagination.$el.off(
          "keydown",
          classesToSelector(swiper.params.pagination.bulletClass),
          onEnterOrSpaceKey
        );
      } // Tab focus

      swiper.$el.off("focus", handleFocus, true);
    }

    on("beforeInit", () => {
      liveRegion = $(
        `<span class="${swiper.params.a11y.notificationClass}" aria-live="assertive" aria-atomic="true"></span>`
      );
    });
    on("afterInit", () => {
      if (!swiper.params.a11y.enabled) return;
      init();
    });
    on("fromEdge toEdge afterInit lock unlock", () => {
      if (!swiper.params.a11y.enabled) return;
      updateNavigation();
    });
    on("paginationUpdate", () => {
      if (!swiper.params.a11y.enabled) return;
      updatePagination();
    });
    on("destroy", () => {
      if (!swiper.params.a11y.enabled) return;
      destroy();
    });
  } // CONCATENATED MODULE: ./node_modules/swiper/modules/history/history.js
  function History(_ref) {
    let { swiper, extendParams, on } = _ref;
    extendParams({
      history: {
        enabled: false,
        root: "",
        replaceState: false,
        key: "slides",
      },
    });
    let initialized = false;
    let paths = {};

    const slugify = (text) => {
      return text
        .toString()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
    };

    const getPathValues = (urlOverride) => {
      const window = getWindow();
      let location;

      if (urlOverride) {
        location = new URL(urlOverride);
      } else {
        location = window.location;
      }

      const pathArray = location.pathname
        .slice(1)
        .split("/")
        .filter((part) => part !== "");
      const total = pathArray.length;
      const key = pathArray[total - 2];
      const value = pathArray[total - 1];
      return {
        key,
        value,
      };
    };

    const setHistory = (key, index) => {
      const window = getWindow();
      if (!initialized || !swiper.params.history.enabled) return;
      let location;

      if (swiper.params.url) {
        location = new URL(swiper.params.url);
      } else {
        location = window.location;
      }

      const slide = swiper.slides.eq(index);
      let value = slugify(slide.attr("data-history"));

      if (swiper.params.history.root.length > 0) {
        let root = swiper.params.history.root;
        if (root[root.length - 1] === "/")
          root = root.slice(0, root.length - 1);
        value = `${root}/${key}/${value}`;
      } else if (!location.pathname.includes(key)) {
        value = `${key}/${value}`;
      }

      const currentState = window.history.state;

      if (currentState && currentState.value === value) {
        return;
      }

      if (swiper.params.history.replaceState) {
        window.history.replaceState(
          {
            value,
          },
          null,
          value
        );
      } else {
        window.history.pushState(
          {
            value,
          },
          null,
          value
        );
      }
    };

    const scrollToSlide = (speed, value, runCallbacks) => {
      if (value) {
        for (let i = 0, length = swiper.slides.length; i < length; i += 1) {
          const slide = swiper.slides.eq(i);
          const slideHistory = slugify(slide.attr("data-history"));

          if (
            slideHistory === value &&
            !slide.hasClass(swiper.params.slideDuplicateClass)
          ) {
            const index = slide.index();
            swiper.slideTo(index, speed, runCallbacks);
          }
        }
      } else {
        swiper.slideTo(0, speed, runCallbacks);
      }
    };

    const setHistoryPopState = () => {
      paths = getPathValues(swiper.params.url);
      scrollToSlide(swiper.params.speed, swiper.paths.value, false);
    };

    const init = () => {
      const window = getWindow();
      if (!swiper.params.history) return;

      if (!window.history || !window.history.pushState) {
        swiper.params.history.enabled = false;
        swiper.params.hashNavigation.enabled = true;
        return;
      }

      initialized = true;
      paths = getPathValues(swiper.params.url);
      if (!paths.key && !paths.value) return;
      scrollToSlide(0, paths.value, swiper.params.runCallbacksOnInit);

      if (!swiper.params.history.replaceState) {
        window.addEventListener("popstate", setHistoryPopState);
      }
    };

    const destroy = () => {
      const window = getWindow();

      if (!swiper.params.history.replaceState) {
        window.removeEventListener("popstate", setHistoryPopState);
      }
    };

    on("init", () => {
      if (swiper.params.history.enabled) {
        init();
      }
    });
    on("destroy", () => {
      if (swiper.params.history.enabled) {
        destroy();
      }
    });
    on("transitionEnd _freeModeNoMomentumRelease", () => {
      if (initialized) {
        setHistory(swiper.params.history.key, swiper.activeIndex);
      }
    });
    on("slideChange", () => {
      if (initialized && swiper.params.cssMode) {
        setHistory(swiper.params.history.key, swiper.activeIndex);
      }
    });
  } // CONCATENATED MODULE: ./node_modules/swiper/modules/hash-navigation/hash-navigation.js
  function HashNavigation(_ref) {
    let { swiper, extendParams, emit, on } = _ref;
    let initialized = false;
    const document = getDocument();
    const window = getWindow();
    extendParams({
      hashNavigation: {
        enabled: false,
        replaceState: false,
        watchState: false,
      },
    });

    const onHashChange = () => {
      emit("hashChange");
      const newHash = document.location.hash.replace("#", "");
      const activeSlideHash = swiper.slides
        .eq(swiper.activeIndex)
        .attr("data-hash");

      if (newHash !== activeSlideHash) {
        const newIndex = swiper.$wrapperEl
          .children(`.${swiper.params.slideClass}[data-hash="${newHash}"]`)
          .index();
        if (typeof newIndex === "undefined") return;
        swiper.slideTo(newIndex);
      }
    };

    const setHash = () => {
      if (!initialized || !swiper.params.hashNavigation.enabled) return;

      if (
        swiper.params.hashNavigation.replaceState &&
        window.history &&
        window.history.replaceState
      ) {
        window.history.replaceState(
          null,
          null,
          `#${swiper.slides.eq(swiper.activeIndex).attr("data-hash")}` || ""
        );
        emit("hashSet");
      } else {
        const slide = swiper.slides.eq(swiper.activeIndex);
        const hash = slide.attr("data-hash") || slide.attr("data-history");
        document.location.hash = hash || "";
        emit("hashSet");
      }
    };

    const init = () => {
      if (
        !swiper.params.hashNavigation.enabled ||
        (swiper.params.history && swiper.params.history.enabled)
      )
        return;
      initialized = true;
      const hash = document.location.hash.replace("#", "");

      if (hash) {
        const speed = 0;

        for (let i = 0, length = swiper.slides.length; i < length; i += 1) {
          const slide = swiper.slides.eq(i);
          const slideHash =
            slide.attr("data-hash") || slide.attr("data-history");

          if (
            slideHash === hash &&
            !slide.hasClass(swiper.params.slideDuplicateClass)
          ) {
            const index = slide.index();
            swiper.slideTo(
              index,
              speed,
              swiper.params.runCallbacksOnInit,
              true
            );
          }
        }
      }

      if (swiper.params.hashNavigation.watchState) {
        $(window).on("hashchange", onHashChange);
      }
    };

    const destroy = () => {
      if (swiper.params.hashNavigation.watchState) {
        $(window).off("hashchange", onHashChange);
      }
    };

    on("init", () => {
      if (swiper.params.hashNavigation.enabled) {
        init();
      }
    });
    on("destroy", () => {
      if (swiper.params.hashNavigation.enabled) {
        destroy();
      }
    });
    on("transitionEnd _freeModeNoMomentumRelease", () => {
      if (initialized) {
        setHash();
      }
    });
    on("slideChange", () => {
      if (initialized && swiper.params.cssMode) {
        setHash();
      }
    });
  } // CONCATENATED MODULE: ./node_modules/swiper/modules/autoplay/autoplay.js
  /* eslint no-underscore-dangle: "off" */

  /* eslint no-use-before-define: "off" */

  function Autoplay(_ref) {
    let { swiper, extendParams, on, emit } = _ref;
    let timeout;
    swiper.autoplay = {
      running: false,
      paused: false,
    };
    extendParams({
      autoplay: {
        enabled: false,
        delay: 3000,
        waitForTransition: true,
        disableOnInteraction: true,
        stopOnLastSlide: false,
        reverseDirection: false,
        pauseOnMouseEnter: false,
      },
    });

    function run() {
      const $activeSlideEl = swiper.slides.eq(swiper.activeIndex);
      let delay = swiper.params.autoplay.delay;

      if ($activeSlideEl.attr("data-swiper-autoplay")) {
        delay =
          $activeSlideEl.attr("data-swiper-autoplay") ||
          swiper.params.autoplay.delay;
      }

      clearTimeout(timeout);
      timeout = nextTick(() => {
        let autoplayResult;

        if (swiper.params.autoplay.reverseDirection) {
          if (swiper.params.loop) {
            swiper.loopFix();
            autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
            emit("autoplay");
          } else if (!swiper.isBeginning) {
            autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
            emit("autoplay");
          } else if (!swiper.params.autoplay.stopOnLastSlide) {
            autoplayResult = swiper.slideTo(
              swiper.slides.length - 1,
              swiper.params.speed,
              true,
              true
            );
            emit("autoplay");
          } else {
            stop();
          }
        } else if (swiper.params.loop) {
          swiper.loopFix();
          autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
          emit("autoplay");
        } else if (!swiper.isEnd) {
          autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
          emit("autoplay");
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          autoplayResult = swiper.slideTo(0, swiper.params.speed, true, true);
          emit("autoplay");
        } else {
          stop();
        }

        if (swiper.params.cssMode && swiper.autoplay.running) run();
        else if (autoplayResult === false) {
          run();
        }
      }, delay);
    }

    function start() {
      if (typeof timeout !== "undefined") return false;
      if (swiper.autoplay.running) return false;
      swiper.autoplay.running = true;
      emit("autoplayStart");
      run();
      return true;
    }

    function stop() {
      if (!swiper.autoplay.running) return false;
      if (typeof timeout === "undefined") return false;

      if (timeout) {
        clearTimeout(timeout);
        timeout = undefined;
      }

      swiper.autoplay.running = false;
      emit("autoplayStop");
      return true;
    }

    function pause(speed) {
      if (!swiper.autoplay.running) return;
      if (swiper.autoplay.paused) return;
      if (timeout) clearTimeout(timeout);
      swiper.autoplay.paused = true;

      if (speed === 0 || !swiper.params.autoplay.waitForTransition) {
        swiper.autoplay.paused = false;
        run();
      } else {
        ["transitionend", "webkitTransitionEnd"].forEach((event) => {
          swiper.$wrapperEl[0].addEventListener(event, onTransitionEnd);
        });
      }
    }

    function onVisibilityChange() {
      const document = getDocument();

      if (document.visibilityState === "hidden" && swiper.autoplay.running) {
        pause();
      }

      if (document.visibilityState === "visible" && swiper.autoplay.paused) {
        run();
        swiper.autoplay.paused = false;
      }
    }

    function onTransitionEnd(e) {
      if (!swiper || swiper.destroyed || !swiper.$wrapperEl) return;
      if (e.target !== swiper.$wrapperEl[0]) return;
      ["transitionend", "webkitTransitionEnd"].forEach((event) => {
        swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
      });
      swiper.autoplay.paused = false;

      if (!swiper.autoplay.running) {
        stop();
      } else {
        run();
      }
    }

    function onMouseEnter() {
      if (swiper.params.autoplay.disableOnInteraction) {
        stop();
      } else {
        emit("autoplayPause");
        pause();
      }

      ["transitionend", "webkitTransitionEnd"].forEach((event) => {
        swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
      });
    }

    function onMouseLeave() {
      if (swiper.params.autoplay.disableOnInteraction) {
        return;
      }

      swiper.autoplay.paused = false;
      emit("autoplayResume");
      run();
    }

    function attachMouseEvents() {
      if (swiper.params.autoplay.pauseOnMouseEnter) {
        swiper.$el.on("mouseenter", onMouseEnter);
        swiper.$el.on("mouseleave", onMouseLeave);
      }
    }

    function detachMouseEvents() {
      swiper.$el.off("mouseenter", onMouseEnter);
      swiper.$el.off("mouseleave", onMouseLeave);
    }

    on("init", () => {
      if (swiper.params.autoplay.enabled) {
        start();
        const document = getDocument();
        document.addEventListener("visibilitychange", onVisibilityChange);
        attachMouseEvents();
      }
    });
    on("beforeTransitionStart", (_s, speed, internal) => {
      if (swiper.autoplay.running) {
        if (internal || !swiper.params.autoplay.disableOnInteraction) {
          swiper.autoplay.pause(speed);
        } else {
          stop();
        }
      }
    });
    on("sliderFirstMove", () => {
      if (swiper.autoplay.running) {
        if (swiper.params.autoplay.disableOnInteraction) {
          stop();
        } else {
          pause();
        }
      }
    });
    on("touchEnd", () => {
      if (
        swiper.params.cssMode &&
        swiper.autoplay.paused &&
        !swiper.params.autoplay.disableOnInteraction
      ) {
        run();
      }
    });
    on("destroy", () => {
      detachMouseEvents();

      if (swiper.autoplay.running) {
        stop();
      }

      const document = getDocument();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    });
    Object.assign(swiper.autoplay, {
      pause,
      run,
      start,
      stop,
    });
  } // CONCATENATED MODULE: ./node_modules/swiper/modules/thumbs/thumbs.js
  function Thumb(_ref) {
    let { swiper, extendParams, on } = _ref;
    extendParams({
      thumbs: {
        swiper: null,
        multipleActiveThumbs: true,
        autoScrollOffset: 0,
        slideThumbActiveClass: "swiper-slide-thumb-active",
        thumbsContainerClass: "swiper-thumbs",
      },
    });
    let initialized = false;
    let swiperCreated = false;
    swiper.thumbs = {
      swiper: null,
    };

    function onThumbClick() {
      const thumbsSwiper = swiper.thumbs.swiper;
      if (!thumbsSwiper || thumbsSwiper.destroyed) return;
      const clickedIndex = thumbsSwiper.clickedIndex;
      const clickedSlide = thumbsSwiper.clickedSlide;
      if (
        clickedSlide &&
        $(clickedSlide).hasClass(swiper.params.thumbs.slideThumbActiveClass)
      )
        return;
      if (typeof clickedIndex === "undefined" || clickedIndex === null) return;
      let slideToIndex;

      if (thumbsSwiper.params.loop) {
        slideToIndex = parseInt(
          $(thumbsSwiper.clickedSlide).attr("data-swiper-slide-index"),
          10
        );
      } else {
        slideToIndex = clickedIndex;
      }

      if (swiper.params.loop) {
        let currentIndex = swiper.activeIndex;

        if (
          swiper.slides
            .eq(currentIndex)
            .hasClass(swiper.params.slideDuplicateClass)
        ) {
          swiper.loopFix(); // eslint-disable-next-line

          swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
          currentIndex = swiper.activeIndex;
        }

        const prevIndex = swiper.slides
          .eq(currentIndex)
          .prevAll(`[data-swiper-slide-index="${slideToIndex}"]`)
          .eq(0)
          .index();
        const nextIndex = swiper.slides
          .eq(currentIndex)
          .nextAll(`[data-swiper-slide-index="${slideToIndex}"]`)
          .eq(0)
          .index();
        if (typeof prevIndex === "undefined") slideToIndex = nextIndex;
        else if (typeof nextIndex === "undefined") slideToIndex = prevIndex;
        else if (nextIndex - currentIndex < currentIndex - prevIndex)
          slideToIndex = nextIndex;
        else slideToIndex = prevIndex;
      }

      swiper.slideTo(slideToIndex);
    }

    function init() {
      const { thumbs: thumbsParams } = swiper.params;
      if (initialized) return false;
      initialized = true;
      const SwiperClass = swiper.constructor;

      if (thumbsParams.swiper instanceof SwiperClass) {
        swiper.thumbs.swiper = thumbsParams.swiper;
        Object.assign(swiper.thumbs.swiper.originalParams, {
          watchSlidesProgress: true,
          slideToClickedSlide: false,
        });
        Object.assign(swiper.thumbs.swiper.params, {
          watchSlidesProgress: true,
          slideToClickedSlide: false,
        });
      } else if (isObject(thumbsParams.swiper)) {
        const thumbsSwiperParams = Object.assign({}, thumbsParams.swiper);
        Object.assign(thumbsSwiperParams, {
          watchSlidesProgress: true,
          slideToClickedSlide: false,
        });
        swiper.thumbs.swiper = new SwiperClass(thumbsSwiperParams);
        swiperCreated = true;
      }

      swiper.thumbs.swiper.$el.addClass(
        swiper.params.thumbs.thumbsContainerClass
      );
      swiper.thumbs.swiper.on("tap", onThumbClick);
      return true;
    }

    function update(initial) {
      const thumbsSwiper = swiper.thumbs.swiper;
      if (!thumbsSwiper || thumbsSwiper.destroyed) return;
      const slidesPerView =
        thumbsSwiper.params.slidesPerView === "auto"
          ? thumbsSwiper.slidesPerViewDynamic()
          : thumbsSwiper.params.slidesPerView;
      const autoScrollOffset = swiper.params.thumbs.autoScrollOffset;
      const useOffset = autoScrollOffset && !thumbsSwiper.params.loop;

      if (swiper.realIndex !== thumbsSwiper.realIndex || useOffset) {
        let currentThumbsIndex = thumbsSwiper.activeIndex;
        let newThumbsIndex;
        let direction;

        if (thumbsSwiper.params.loop) {
          if (
            thumbsSwiper.slides
              .eq(currentThumbsIndex)
              .hasClass(thumbsSwiper.params.slideDuplicateClass)
          ) {
            thumbsSwiper.loopFix(); // eslint-disable-next-line

            thumbsSwiper._clientLeft = thumbsSwiper.$wrapperEl[0].clientLeft;
            currentThumbsIndex = thumbsSwiper.activeIndex;
          } // Find actual thumbs index to slide to

          const prevThumbsIndex = thumbsSwiper.slides
            .eq(currentThumbsIndex)
            .prevAll(`[data-swiper-slide-index="${swiper.realIndex}"]`)
            .eq(0)
            .index();
          const nextThumbsIndex = thumbsSwiper.slides
            .eq(currentThumbsIndex)
            .nextAll(`[data-swiper-slide-index="${swiper.realIndex}"]`)
            .eq(0)
            .index();

          if (typeof prevThumbsIndex === "undefined") {
            newThumbsIndex = nextThumbsIndex;
          } else if (typeof nextThumbsIndex === "undefined") {
            newThumbsIndex = prevThumbsIndex;
          } else if (
            nextThumbsIndex - currentThumbsIndex ===
            currentThumbsIndex - prevThumbsIndex
          ) {
            newThumbsIndex =
              thumbsSwiper.params.slidesPerGroup > 1
                ? nextThumbsIndex
                : currentThumbsIndex;
          } else if (
            nextThumbsIndex - currentThumbsIndex <
            currentThumbsIndex - prevThumbsIndex
          ) {
            newThumbsIndex = nextThumbsIndex;
          } else {
            newThumbsIndex = prevThumbsIndex;
          }

          direction =
            swiper.activeIndex > swiper.previousIndex ? "next" : "prev";
        } else {
          newThumbsIndex = swiper.realIndex;
          direction = newThumbsIndex > swiper.previousIndex ? "next" : "prev";
        }

        if (useOffset) {
          newThumbsIndex +=
            direction === "next" ? autoScrollOffset : -1 * autoScrollOffset;
        }

        if (
          thumbsSwiper.visibleSlidesIndexes &&
          thumbsSwiper.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0
        ) {
          if (thumbsSwiper.params.centeredSlides) {
            if (newThumbsIndex > currentThumbsIndex) {
              newThumbsIndex =
                newThumbsIndex - Math.floor(slidesPerView / 2) + 1;
            } else {
              newThumbsIndex =
                newThumbsIndex + Math.floor(slidesPerView / 2) - 1;
            }
          } else if (
            newThumbsIndex > currentThumbsIndex &&
            thumbsSwiper.params.slidesPerGroup === 1
          ) {
            // newThumbsIndex = newThumbsIndex - slidesPerView + 1;
          }

          thumbsSwiper.slideTo(newThumbsIndex, initial ? 0 : undefined);
        }
      } // Activate thumbs

      let thumbsToActivate = 1;
      const thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;

      if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides) {
        thumbsToActivate = swiper.params.slidesPerView;
      }

      if (!swiper.params.thumbs.multipleActiveThumbs) {
        thumbsToActivate = 1;
      }

      thumbsToActivate = Math.floor(thumbsToActivate);
      thumbsSwiper.slides.removeClass(thumbActiveClass);

      if (
        thumbsSwiper.params.loop ||
        (thumbsSwiper.params.virtual && thumbsSwiper.params.virtual.enabled)
      ) {
        for (let i = 0; i < thumbsToActivate; i += 1) {
          thumbsSwiper.$wrapperEl
            .children(`[data-swiper-slide-index="${swiper.realIndex + i}"]`)
            .addClass(thumbActiveClass);
        }
      } else {
        for (let i = 0; i < thumbsToActivate; i += 1) {
          thumbsSwiper.slides
            .eq(swiper.realIndex + i)
            .addClass(thumbActiveClass);
        }
      }
    }

    on("beforeInit", () => {
      const { thumbs } = swiper.params;
      if (!thumbs || !thumbs.swiper) return;
      init();
      update(true);
    });
    on("slideChange update resize observerUpdate", () => {
      update();
    });
    on("setTransition", (_s, duration) => {
      const thumbsSwiper = swiper.thumbs.swiper;
      if (!thumbsSwiper || thumbsSwiper.destroyed) return;
      thumbsSwiper.setTransition(duration);
    });
    on("beforeDestroy", () => {
      const thumbsSwiper = swiper.thumbs.swiper;
      if (!thumbsSwiper || thumbsSwiper.destroyed) return;

      if (swiperCreated) {
        thumbsSwiper.destroy();
      }
    });
    Object.assign(swiper.thumbs, {
      init,
      update,
    });
  } // CONCATENATED MODULE: ./node_modules/swiper/modules/free-mode/free-mode.js
  function freeMode(_ref) {
    let { swiper, extendParams, emit, once } = _ref;
    extendParams({
      freeMode: {
        enabled: false,
        momentum: true,
        momentumRatio: 1,
        momentumBounce: true,
        momentumBounceRatio: 1,
        momentumVelocityRatio: 1,
        sticky: false,
        minimumVelocity: 0.02,
      },
    });

    function onTouchStart() {
      const translate = swiper.getTranslate();
      swiper.setTranslate(translate);
      swiper.setTransition(0);
      swiper.touchEventsData.velocities.length = 0;
      swiper.freeMode.onTouchEnd({
        currentPos: swiper.rtl ? swiper.translate : -swiper.translate,
      });
    }

    function onTouchMove() {
      const { touchEventsData: data, touches } = swiper; // Velocity

      if (data.velocities.length === 0) {
        data.velocities.push({
          position: touches[swiper.isHorizontal() ? "startX" : "startY"],
          time: data.touchStartTime,
        });
      }

      data.velocities.push({
        position: touches[swiper.isHorizontal() ? "currentX" : "currentY"],
        time: now(),
      });
    }

    function onTouchEnd(_ref2) {
      let { currentPos } = _ref2;
      const {
        params,
        $wrapperEl,
        rtlTranslate: rtl,
        snapGrid,
        touchEventsData: data,
      } = swiper; // Time diff

      const touchEndTime = now();
      const timeDiff = touchEndTime - data.touchStartTime;

      if (currentPos < -swiper.minTranslate()) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }

      if (currentPos > -swiper.maxTranslate()) {
        if (swiper.slides.length < snapGrid.length) {
          swiper.slideTo(snapGrid.length - 1);
        } else {
          swiper.slideTo(swiper.slides.length - 1);
        }

        return;
      }

      if (params.freeMode.momentum) {
        if (data.velocities.length > 1) {
          const lastMoveEvent = data.velocities.pop();
          const velocityEvent = data.velocities.pop();
          const distance = lastMoveEvent.position - velocityEvent.position;
          const time = lastMoveEvent.time - velocityEvent.time;
          swiper.velocity = distance / time;
          swiper.velocity /= 2;

          if (Math.abs(swiper.velocity) < params.freeMode.minimumVelocity) {
            swiper.velocity = 0;
          } // this implies that the user stopped moving a finger then released.
          // There would be no events with distance zero, so the last event is stale.

          if (time > 150 || now() - lastMoveEvent.time > 300) {
            swiper.velocity = 0;
          }
        } else {
          swiper.velocity = 0;
        }

        swiper.velocity *= params.freeMode.momentumVelocityRatio;
        data.velocities.length = 0;
        let momentumDuration = 1000 * params.freeMode.momentumRatio;
        const momentumDistance = swiper.velocity * momentumDuration;
        let newPosition = swiper.translate + momentumDistance;
        if (rtl) newPosition = -newPosition;
        let doBounce = false;
        let afterBouncePosition;
        const bounceAmount =
          Math.abs(swiper.velocity) * 20 * params.freeMode.momentumBounceRatio;
        let needsLoopFix;

        if (newPosition < swiper.maxTranslate()) {
          if (params.freeMode.momentumBounce) {
            if (newPosition + swiper.maxTranslate() < -bounceAmount) {
              newPosition = swiper.maxTranslate() - bounceAmount;
            }

            afterBouncePosition = swiper.maxTranslate();
            doBounce = true;
            data.allowMomentumBounce = true;
          } else {
            newPosition = swiper.maxTranslate();
          }

          if (params.loop && params.centeredSlides) needsLoopFix = true;
        } else if (newPosition > swiper.minTranslate()) {
          if (params.freeMode.momentumBounce) {
            if (newPosition - swiper.minTranslate() > bounceAmount) {
              newPosition = swiper.minTranslate() + bounceAmount;
            }

            afterBouncePosition = swiper.minTranslate();
            doBounce = true;
            data.allowMomentumBounce = true;
          } else {
            newPosition = swiper.minTranslate();
          }

          if (params.loop && params.centeredSlides) needsLoopFix = true;
        } else if (params.freeMode.sticky) {
          let nextSlide;

          for (let j = 0; j < snapGrid.length; j += 1) {
            if (snapGrid[j] > -newPosition) {
              nextSlide = j;
              break;
            }
          }

          if (
            Math.abs(snapGrid[nextSlide] - newPosition) <
              Math.abs(snapGrid[nextSlide - 1] - newPosition) ||
            swiper.swipeDirection === "next"
          ) {
            newPosition = snapGrid[nextSlide];
          } else {
            newPosition = snapGrid[nextSlide - 1];
          }

          newPosition = -newPosition;
        }

        if (needsLoopFix) {
          once("transitionEnd", () => {
            swiper.loopFix();
          });
        } // Fix duration

        if (swiper.velocity !== 0) {
          if (rtl) {
            momentumDuration = Math.abs(
              (-newPosition - swiper.translate) / swiper.velocity
            );
          } else {
            momentumDuration = Math.abs(
              (newPosition - swiper.translate) / swiper.velocity
            );
          }

          if (params.freeMode.sticky) {
            // If freeMode.sticky is active and the user ends a swipe with a slow-velocity
            // event, then durations can be 20+ seconds to slide one (or zero!) slides.
            // It's easy to see this when simulating touch with mouse events. To fix this,
            // limit single-slide swipes to the default slide duration. This also has the
            // nice side effect of matching slide speed if the user stopped moving before
            // lifting finger or mouse vs. moving slowly before lifting the finger/mouse.
            // For faster swipes, also apply limits (albeit higher ones).
            const moveDistance = Math.abs(
              (rtl ? -newPosition : newPosition) - swiper.translate
            );
            const currentSlideSize = swiper.slidesSizesGrid[swiper.activeIndex];

            if (moveDistance < currentSlideSize) {
              momentumDuration = params.speed;
            } else if (moveDistance < 2 * currentSlideSize) {
              momentumDuration = params.speed * 1.5;
            } else {
              momentumDuration = params.speed * 2.5;
            }
          }
        } else if (params.freeMode.sticky) {
          swiper.slideToClosest();
          return;
        }

        if (params.freeMode.momentumBounce && doBounce) {
          swiper.updateProgress(afterBouncePosition);
          swiper.setTransition(momentumDuration);
          swiper.setTranslate(newPosition);
          swiper.transitionStart(true, swiper.swipeDirection);
          swiper.animating = true;
          $wrapperEl.transitionEnd(() => {
            if (!swiper || swiper.destroyed || !data.allowMomentumBounce)
              return;
            emit("momentumBounce");
            swiper.setTransition(params.speed);
            setTimeout(() => {
              swiper.setTranslate(afterBouncePosition);
              $wrapperEl.transitionEnd(() => {
                if (!swiper || swiper.destroyed) return;
                swiper.transitionEnd();
              });
            }, 0);
          });
        } else if (swiper.velocity) {
          emit("_freeModeNoMomentumRelease");
          swiper.updateProgress(newPosition);
          swiper.setTransition(momentumDuration);
          swiper.setTranslate(newPosition);
          swiper.transitionStart(true, swiper.swipeDirection);

          if (!swiper.animating) {
            swiper.animating = true;
            $wrapperEl.transitionEnd(() => {
              if (!swiper || swiper.destroyed) return;
              swiper.transitionEnd();
            });
          }
        } else {
          swiper.updateProgress(newPosition);
        }

        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      } else if (params.freeMode.sticky) {
        swiper.slideToClosest();
        return;
      } else if (params.freeMode) {
        emit("_freeModeNoMomentumRelease");
      }

      if (!params.freeMode.momentum || timeDiff >= params.longSwipesMs) {
        swiper.updateProgress();
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }
    }

    Object.assign(swiper, {
      freeMode: {
        onTouchStart,
        onTouchMove,
        onTouchEnd,
      },
    });
  } // CONCATENATED MODULE: ./node_modules/swiper/modules/effect-cube/effect-cube.js
  function EffectCube(_ref) {
    let { swiper, extendParams, on } = _ref;
    extendParams({
      cubeEffect: {
        slideShadows: true,
        shadow: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      },
    });

    const setTranslate = () => {
      const {
        $el,
        $wrapperEl,
        slides,
        width: swiperWidth,
        height: swiperHeight,
        rtlTranslate: rtl,
        size: swiperSize,
        browser,
      } = swiper;
      const params = swiper.params.cubeEffect;
      const isHorizontal = swiper.isHorizontal();
      const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
      let wrapperRotate = 0;
      let $cubeShadowEl;

      if (params.shadow) {
        if (isHorizontal) {
          $cubeShadowEl = $wrapperEl.find(".swiper-cube-shadow");

          if ($cubeShadowEl.length === 0) {
            $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
            $wrapperEl.append($cubeShadowEl);
          }

          $cubeShadowEl.css({
            height: `${swiperWidth}px`,
          });
        } else {
          $cubeShadowEl = $el.find(".swiper-cube-shadow");

          if ($cubeShadowEl.length === 0) {
            $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
            $el.append($cubeShadowEl);
          }
        }
      }

      for (let i = 0; i < slides.length; i += 1) {
        const $slideEl = slides.eq(i);
        let slideIndex = i;

        if (isVirtual) {
          slideIndex = parseInt($slideEl.attr("data-swiper-slide-index"), 10);
        }

        let slideAngle = slideIndex * 90;
        let round = Math.floor(slideAngle / 360);

        if (rtl) {
          slideAngle = -slideAngle;
          round = Math.floor(-slideAngle / 360);
        }

        const progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
        let tx = 0;
        let ty = 0;
        let tz = 0;

        if (slideIndex % 4 === 0) {
          tx = -round * 4 * swiperSize;
          tz = 0;
        } else if ((slideIndex - 1) % 4 === 0) {
          tx = 0;
          tz = -round * 4 * swiperSize;
        } else if ((slideIndex - 2) % 4 === 0) {
          tx = swiperSize + round * 4 * swiperSize;
          tz = swiperSize;
        } else if ((slideIndex - 3) % 4 === 0) {
          tx = -swiperSize;
          tz = 3 * swiperSize + swiperSize * 4 * round;
        }

        if (rtl) {
          tx = -tx;
        }

        if (!isHorizontal) {
          ty = tx;
          tx = 0;
        }

        const transform = `rotateX(${
          isHorizontal ? 0 : -slideAngle
        }deg) rotateY(${
          isHorizontal ? slideAngle : 0
        }deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;

        if (progress <= 1 && progress > -1) {
          wrapperRotate = slideIndex * 90 + progress * 90;
          if (rtl) wrapperRotate = -slideIndex * 90 - progress * 90;
        }

        $slideEl.transform(transform);

        if (params.slideShadows) {
          // Set shadows
          let shadowBefore = isHorizontal
            ? $slideEl.find(".swiper-slide-shadow-left")
            : $slideEl.find(".swiper-slide-shadow-top");
          let shadowAfter = isHorizontal
            ? $slideEl.find(".swiper-slide-shadow-right")
            : $slideEl.find(".swiper-slide-shadow-bottom");

          if (shadowBefore.length === 0) {
            shadowBefore = $(
              `<div class="swiper-slide-shadow-${
                isHorizontal ? "left" : "top"
              }"></div>`
            );
            $slideEl.append(shadowBefore);
          }

          if (shadowAfter.length === 0) {
            shadowAfter = $(
              `<div class="swiper-slide-shadow-${
                isHorizontal ? "right" : "bottom"
              }"></div>`
            );
            $slideEl.append(shadowAfter);
          }

          if (shadowBefore.length)
            shadowBefore[0].style.opacity = Math.max(-progress, 0);
          if (shadowAfter.length)
            shadowAfter[0].style.opacity = Math.max(progress, 0);
        }
      }

      $wrapperEl.css({
        "-webkit-transform-origin": `50% 50% -${swiperSize / 2}px`,
        "transform-origin": `50% 50% -${swiperSize / 2}px`,
      });

      if (params.shadow) {
        if (isHorizontal) {
          $cubeShadowEl.transform(
            `translate3d(0px, ${swiperWidth / 2 + params.shadowOffset}px, ${
              -swiperWidth / 2
            }px) rotateX(90deg) rotateZ(0deg) scale(${params.shadowScale})`
          );
        } else {
          const shadowAngle =
            Math.abs(wrapperRotate) -
            Math.floor(Math.abs(wrapperRotate) / 90) * 90;
          const multiplier =
            1.5 -
            (Math.sin((shadowAngle * 2 * Math.PI) / 360) / 2 +
              Math.cos((shadowAngle * 2 * Math.PI) / 360) / 2);
          const scale1 = params.shadowScale;
          const scale2 = params.shadowScale / multiplier;
          const offset = params.shadowOffset;
          $cubeShadowEl.transform(
            `scale3d(${scale1}, 1, ${scale2}) translate3d(0px, ${
              swiperHeight / 2 + offset
            }px, ${-swiperHeight / 2 / scale2}px) rotateX(-90deg)`
          );
        }
      }

      const zFactor =
        browser.isSafari || browser.isWebView ? -swiperSize / 2 : 0;
      $wrapperEl.transform(
        `translate3d(0px,0,${zFactor}px) rotateX(${
          swiper.isHorizontal() ? 0 : wrapperRotate
        }deg) rotateY(${swiper.isHorizontal() ? -wrapperRotate : 0}deg)`
      );
    };

    const setTransition = (duration) => {
      const { $el, slides } = swiper;
      slides
        .transition(duration)
        .find(
          ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
        )
        .transition(duration);

      if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
        $el.find(".swiper-cube-shadow").transition(duration);
      }
    };

    effectInit({
      effect: "cube",
      swiper,
      on,
      setTranslate,
      setTransition,
      perspective: () => true,
      overwriteParams: () => ({
        slidesPerView: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        resistanceRatio: 0,
        spaceBetween: 0,
        centeredSlides: false,
        virtualTranslate: true,
      }),
    });
  } // CONCATENATED MODULE: ./node_modules/swiper/shared/create-shadow.js
  function create_shadow_createShadow(params, $slideEl, side) {
    const shadowClass = `swiper-slide-shadow${side ? `-${side}` : ""}`;
    const $shadowContainer = params.transformEl
      ? $slideEl.find(params.transformEl)
      : $slideEl;
    let $shadowEl = $shadowContainer.children(`.${shadowClass}`);

    if (!$shadowEl.length) {
      $shadowEl = $(
        `<div class="swiper-slide-shadow${side ? `-${side}` : ""}"></div>`
      );
      $shadowContainer.append($shadowEl);
    }

    return $shadowEl;
  } // CONCATENATED MODULE: ./node_modules/swiper/modules/effect-flip/effect-flip.js
  function EffectFlip(_ref) {
    let { swiper, extendParams, on } = _ref;
    extendParams({
      flipEffect: {
        slideShadows: true,
        limitRotation: true,
        transformEl: null,
      },
    });

    const setTranslate = () => {
      const { slides, rtlTranslate: rtl } = swiper;
      const params = swiper.params.flipEffect;

      for (let i = 0; i < slides.length; i += 1) {
        const $slideEl = slides.eq(i);
        let progress = $slideEl[0].progress;

        if (swiper.params.flipEffect.limitRotation) {
          progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
        }

        const offset = $slideEl[0].swiperSlideOffset;
        const rotate = -180 * progress;
        let rotateY = rotate;
        let rotateX = 0;
        let tx = swiper.params.cssMode ? -offset - swiper.translate : -offset;
        let ty = 0;

        if (!swiper.isHorizontal()) {
          ty = tx;
          tx = 0;
          rotateX = -rotateY;
          rotateY = 0;
        } else if (rtl) {
          rotateY = -rotateY;
        }

        $slideEl[0].style.zIndex =
          -Math.abs(Math.round(progress)) + slides.length;

        if (params.slideShadows) {
          // Set shadows
          let shadowBefore = swiper.isHorizontal()
            ? $slideEl.find(".swiper-slide-shadow-left")
            : $slideEl.find(".swiper-slide-shadow-top");
          let shadowAfter = swiper.isHorizontal()
            ? $slideEl.find(".swiper-slide-shadow-right")
            : $slideEl.find(".swiper-slide-shadow-bottom");

          if (shadowBefore.length === 0) {
            shadowBefore = createShadow(
              params,
              $slideEl,
              swiper.isHorizontal() ? "left" : "top"
            );
          }

          if (shadowAfter.length === 0) {
            shadowAfter = createShadow(
              params,
              $slideEl,
              swiper.isHorizontal() ? "right" : "bottom"
            );
          }

          if (shadowBefore.length)
            shadowBefore[0].style.opacity = Math.max(-progress, 0);
          if (shadowAfter.length)
            shadowAfter[0].style.opacity = Math.max(progress, 0);
        }

        const transform = `translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        const $targetEl = effectTarget(params, $slideEl);
        $targetEl.transform(transform);
      }
    };

    const setTransition = (duration) => {
      const { transformEl } = swiper.params.flipEffect;
      const $transitionElements = transformEl
        ? swiper.slides.find(transformEl)
        : swiper.slides;
      $transitionElements
        .transition(duration)
        .find(
          ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
        )
        .transition(duration);
      effectVirtualTransitionEnd({
        swiper,
        duration,
        transformEl,
      });
    };

    effectInit({
      effect: "flip",
      swiper,
      on,
      setTranslate,
      setTransition,
      perspective: () => true,
      overwriteParams: () => ({
        slidesPerView: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        spaceBetween: 0,
        virtualTranslate: !swiper.params.cssMode,
      }),
    });
  } // CONCATENATED MODULE: ./node_modules/swiper/modules/effect-coverflow/effect-coverflow.js
  function EffectCoverflow(_ref) {
    let { swiper, extendParams, on } = _ref;
    extendParams({
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        scale: 1,
        modifier: 1,
        slideShadows: true,
        transformEl: null,
      },
    });

    const setTranslate = () => {
      const {
        width: swiperWidth,
        height: swiperHeight,
        slides,
        slidesSizesGrid,
      } = swiper;
      const params = swiper.params.coverflowEffect;
      const isHorizontal = swiper.isHorizontal();
      const transform = swiper.translate;
      const center = isHorizontal
        ? -transform + swiperWidth / 2
        : -transform + swiperHeight / 2;
      const rotate = isHorizontal ? params.rotate : -params.rotate;
      const translate = params.depth; // Each slide offset from center

      for (let i = 0, length = slides.length; i < length; i += 1) {
        const $slideEl = slides.eq(i);
        const slideSize = slidesSizesGrid[i];
        const slideOffset = $slideEl[0].swiperSlideOffset;
        const centerOffset = (center - slideOffset - slideSize / 2) / slideSize;
        const offsetMultiplier =
          typeof params.modifier === "function"
            ? params.modifier(centerOffset)
            : centerOffset * params.modifier;
        let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
        let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier; // var rotateZ = 0

        let translateZ = -translate * Math.abs(offsetMultiplier);
        let stretch = params.stretch; // Allow percentage to make a relative stretch for responsive sliders

        if (typeof stretch === "string" && stretch.indexOf("%") !== -1) {
          stretch = (parseFloat(params.stretch) / 100) * slideSize;
        }

        let translateY = isHorizontal ? 0 : stretch * offsetMultiplier;
        let translateX = isHorizontal ? stretch * offsetMultiplier : 0;
        let scale = 1 - (1 - params.scale) * Math.abs(offsetMultiplier); // Fix for ultra small values

        if (Math.abs(translateX) < 0.001) translateX = 0;
        if (Math.abs(translateY) < 0.001) translateY = 0;
        if (Math.abs(translateZ) < 0.001) translateZ = 0;
        if (Math.abs(rotateY) < 0.001) rotateY = 0;
        if (Math.abs(rotateX) < 0.001) rotateX = 0;
        if (Math.abs(scale) < 0.001) scale = 0;
        const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
        const $targetEl = effectTarget(params, $slideEl);
        $targetEl.transform(slideTransform);
        $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;

        if (params.slideShadows) {
          // Set shadows
          let $shadowBeforeEl = isHorizontal
            ? $slideEl.find(".swiper-slide-shadow-left")
            : $slideEl.find(".swiper-slide-shadow-top");
          let $shadowAfterEl = isHorizontal
            ? $slideEl.find(".swiper-slide-shadow-right")
            : $slideEl.find(".swiper-slide-shadow-bottom");

          if ($shadowBeforeEl.length === 0) {
            $shadowBeforeEl = createShadow(
              params,
              $slideEl,
              isHorizontal ? "left" : "top"
            );
          }

          if ($shadowAfterEl.length === 0) {
            $shadowAfterEl = createShadow(
              params,
              $slideEl,
              isHorizontal ? "right" : "bottom"
            );
          }

          if ($shadowBeforeEl.length)
            $shadowBeforeEl[0].style.opacity =
              offsetMultiplier > 0 ? offsetMultiplier : 0;
          if ($shadowAfterEl.length)
            $shadowAfterEl[0].style.opacity =
              -offsetMultiplier > 0 ? -offsetMultiplier : 0;
        }
      }
    };

    const setTransition = (duration) => {
      const { transformEl } = swiper.params.coverflowEffect;
      const $transitionElements = transformEl
        ? swiper.slides.find(transformEl)
        : swiper.slides;
      $transitionElements
        .transition(duration)
        .find(
          ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
        )
        .transition(duration);
    };

    effectInit({
      effect: "coverflow",
      swiper,
      on,
      setTranslate,
      setTransition,
      perspective: () => true,
      overwriteParams: () => ({
        watchSlidesProgress: true,
      }),
    });
  } // CONCATENATED MODULE: ./node_modules/swiper/modules/effect-creative/effect-creative.js
  function EffectCreative(_ref) {
    let { swiper, extendParams, on } = _ref;
    extendParams({
      creativeEffect: {
        transformEl: null,
        limitProgress: 1,
        shadowPerProgress: false,
        progressMultiplier: 1,
        perspective: true,
        prev: {
          translate: [0, 0, 0],
          rotate: [0, 0, 0],
          opacity: 1,
          scale: 1,
        },
        next: {
          translate: [0, 0, 0],
          rotate: [0, 0, 0],
          opacity: 1,
          scale: 1,
        },
      },
    });

    const getTranslateValue = (value) => {
      if (typeof value === "string") return value;
      return `${value}px`;
    };

    const setTranslate = () => {
      const { slides, $wrapperEl, slidesSizesGrid } = swiper;
      const params = swiper.params.creativeEffect;
      const { progressMultiplier: multiplier } = params;
      const isCenteredSlides = swiper.params.centeredSlides;

      if (isCenteredSlides) {
        const margin =
          slidesSizesGrid[0] / 2 - swiper.params.slidesOffsetBefore || 0;
        $wrapperEl.transform(`translateX(calc(50% - ${margin}px))`);
      }

      for (let i = 0; i < slides.length; i += 1) {
        const $slideEl = slides.eq(i);
        const slideProgress = $slideEl[0].progress;
        const progress = Math.min(
          Math.max($slideEl[0].progress, -params.limitProgress),
          params.limitProgress
        );
        let originalProgress = progress;

        if (!isCenteredSlides) {
          originalProgress = Math.min(
            Math.max($slideEl[0].originalProgress, -params.limitProgress),
            params.limitProgress
          );
        }

        const offset = $slideEl[0].swiperSlideOffset;
        const t = [
          swiper.params.cssMode ? -offset - swiper.translate : -offset,
          0,
          0,
        ];
        const r = [0, 0, 0];
        let custom = false;

        if (!swiper.isHorizontal()) {
          t[1] = t[0];
          t[0] = 0;
        }

        let data = {
          translate: [0, 0, 0],
          rotate: [0, 0, 0],
          scale: 1,
          opacity: 1,
        };

        if (progress < 0) {
          data = params.next;
          custom = true;
        } else if (progress > 0) {
          data = params.prev;
          custom = true;
        } // set translate

        t.forEach((value, index) => {
          t[index] = `calc(${value}px + (${getTranslateValue(
            data.translate[index]
          )} * ${Math.abs(progress * multiplier)}))`;
        }); // set rotates

        r.forEach((value, index) => {
          r[index] = data.rotate[index] * Math.abs(progress * multiplier);
        });
        $slideEl[0].style.zIndex =
          -Math.abs(Math.round(slideProgress)) + slides.length;
        const translateString = t.join(", ");
        const rotateString = `rotateX(${r[0]}deg) rotateY(${r[1]}deg) rotateZ(${r[2]}deg)`;
        const scaleString =
          originalProgress < 0
            ? `scale(${1 + (1 - data.scale) * originalProgress * multiplier})`
            : `scale(${1 - (1 - data.scale) * originalProgress * multiplier})`;
        const opacityString =
          originalProgress < 0
            ? 1 + (1 - data.opacity) * originalProgress * multiplier
            : 1 - (1 - data.opacity) * originalProgress * multiplier;
        const transform = `translate3d(${translateString}) ${rotateString} ${scaleString}`; // Set shadows

        if ((custom && data.shadow) || !custom) {
          let $shadowEl = $slideEl.children(".swiper-slide-shadow");

          if ($shadowEl.length === 0 && data.shadow) {
            $shadowEl = createShadow(params, $slideEl);
          }

          if ($shadowEl.length) {
            const shadowOpacity = params.shadowPerProgress
              ? progress * (1 / params.limitProgress)
              : progress;
            $shadowEl[0].style.opacity = Math.min(
              Math.max(Math.abs(shadowOpacity), 0),
              1
            );
          }
        }

        const $targetEl = effectTarget(params, $slideEl);
        $targetEl.transform(transform).css({
          opacity: opacityString,
        });

        if (data.origin) {
          $targetEl.css("transform-origin", data.origin);
        }
      }
    };

    const setTransition = (duration) => {
      const { transformEl } = swiper.params.creativeEffect;
      const $transitionElements = transformEl
        ? swiper.slides.find(transformEl)
        : swiper.slides;
      $transitionElements
        .transition(duration)
        .find(".swiper-slide-shadow")
        .transition(duration);
      effectVirtualTransitionEnd({
        swiper,
        duration,
        transformEl,
        allSlides: true,
      });
    };

    effectInit({
      effect: "creative",
      swiper,
      on,
      setTranslate,
      setTransition,
      perspective: () => swiper.params.creativeEffect.perspective,
      overwriteParams: () => ({
        watchSlidesProgress: true,
        virtualTranslate: !swiper.params.cssMode,
      }),
    });
  } // CONCATENATED MODULE: ./node_modules/swiper/modules/effect-cards/effect-cards.js
  function EffectCards(_ref) {
    let { swiper, extendParams, on } = _ref;
    extendParams({
      cardsEffect: {
        slideShadows: true,
        transformEl: null,
        rotate: true,
      },
    });

    const setTranslate = () => {
      const { slides, activeIndex } = swiper;
      const params = swiper.params.cardsEffect;
      const { startTranslate, isTouched } = swiper.touchEventsData;
      const currentTranslate = swiper.translate;

      for (let i = 0; i < slides.length; i += 1) {
        const $slideEl = slides.eq(i);
        const slideProgress = $slideEl[0].progress;
        const progress = Math.min(Math.max(slideProgress, -4), 4);
        let offset = $slideEl[0].swiperSlideOffset;

        if (swiper.params.centeredSlides && !swiper.params.cssMode) {
          swiper.$wrapperEl.transform(`translateX(${swiper.minTranslate()}px)`);
        }

        if (swiper.params.centeredSlides && swiper.params.cssMode) {
          offset -= slides[0].swiperSlideOffset;
        }

        let tX = swiper.params.cssMode ? -offset - swiper.translate : -offset;
        let tY = 0;
        const tZ = -100 * Math.abs(progress);
        let scale = 1;
        let rotate = -2 * progress;
        let tXAdd = 8 - Math.abs(progress) * 0.75;
        const slideIndex =
          swiper.virtual && swiper.params.virtual.enabled
            ? swiper.virtual.from + i
            : i;
        const isSwipeToNext =
          (slideIndex === activeIndex || slideIndex === activeIndex - 1) &&
          progress > 0 &&
          progress < 1 &&
          (isTouched || swiper.params.cssMode) &&
          currentTranslate < startTranslate;
        const isSwipeToPrev =
          (slideIndex === activeIndex || slideIndex === activeIndex + 1) &&
          progress < 0 &&
          progress > -1 &&
          (isTouched || swiper.params.cssMode) &&
          currentTranslate > startTranslate;

        if (isSwipeToNext || isSwipeToPrev) {
          const subProgress =
            (1 - Math.abs((Math.abs(progress) - 0.5) / 0.5)) ** 0.5;
          rotate += -28 * progress * subProgress;
          scale += -0.5 * subProgress;
          tXAdd += 96 * subProgress;
          tY = `${-25 * subProgress * Math.abs(progress)}%`;
        }

        if (progress < 0) {
          // next
          tX = `calc(${tX}px + (${tXAdd * Math.abs(progress)}%))`;
        } else if (progress > 0) {
          // prev
          tX = `calc(${tX}px + (-${tXAdd * Math.abs(progress)}%))`;
        } else {
          tX = `${tX}px`;
        }

        if (!swiper.isHorizontal()) {
          const prevY = tY;
          tY = tX;
          tX = prevY;
        }

        const scaleString =
          progress < 0
            ? `${1 + (1 - scale) * progress}`
            : `${1 - (1 - scale) * progress}`;
        const transform = `
        translate3d(${tX}, ${tY}, ${tZ}px)
        rotateZ(${params.rotate ? rotate : 0}deg)
        scale(${scaleString})
      `;

        if (params.slideShadows) {
          // Set shadows
          let $shadowEl = $slideEl.find(".swiper-slide-shadow");

          if ($shadowEl.length === 0) {
            $shadowEl = createShadow(params, $slideEl);
          }

          if ($shadowEl.length)
            $shadowEl[0].style.opacity = Math.min(
              Math.max((Math.abs(progress) - 0.5) / 0.5, 0),
              1
            );
        }

        $slideEl[0].style.zIndex =
          -Math.abs(Math.round(slideProgress)) + slides.length;
        const $targetEl = effectTarget(params, $slideEl);
        $targetEl.transform(transform);
      }
    };

    const setTransition = (duration) => {
      const { transformEl } = swiper.params.cardsEffect;
      const $transitionElements = transformEl
        ? swiper.slides.find(transformEl)
        : swiper.slides;
      $transitionElements
        .transition(duration)
        .find(".swiper-slide-shadow")
        .transition(duration);
      effectVirtualTransitionEnd({
        swiper,
        duration,
        transformEl,
      });
    };

    effectInit({
      effect: "cards",
      swiper,
      on,
      setTranslate,
      setTransition,
      perspective: () => true,
      overwriteParams: () => ({
        watchSlidesProgress: true,
        virtualTranslate: !swiper.params.cssMode,
      }),
    });
  } // CONCATENATED MODULE: ./node_modules/swiper/swiper.esm.js // CONCATENATED MODULE: ./src/js/files/sliders.js
  /**
   * Swiper 8.1.1
   * Most modern mobile touch slider and framework with hardware accelerated transitions
   * https://swiperjs.com
   *
   * Copyright 2014-2022 Vladimir Kharlampidi
   *
   * Released under the MIT License
   *
   * Released on: April 15, 2022
   */

  /*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

  // Подключаем слайдер Swiper из node_modules
  // При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
  // Пример: { Navigation, Autoplay }

  /*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

  // Стили Swiper
  // Базовые стили

  // import "../../scss/base/swiper.scss";

  // Полный набор стилей из scss/libs/swiper.scss
  // import "../../scss/libs/swiper.scss";
  // Полный набор стилей из node_modules
  // import 'swiper/css';

  // Добавление классов слайдерам
  // swiper главному блоку, swiper-wrapper оболочке, swiper-slide для слайдов
  function bildSliders() {
    //BildSlider
    let sliders = document.querySelectorAll(
      '[class*="__swiper"]:not(.swiper-wrapper)'
    );
    if (sliders) {
      sliders.forEach((slider) => {
        slider.parentElement.classList.add("swiper");
        slider.classList.add("swiper-wrapper");
        for (const slide of slider.children) {
          slide.classList.add("swiper-slide");
        }
      });
    }
  }
  // Инициализация слайдеров
  function initSliders() {
    // Добавление классов слайдера
    // при необходимости отключить
    bildSliders();

    // Перечень слайдеров

    // Главный слайдер
    if (
      document.querySelector(".main-slider") &&
      document.querySelectorAll(".main-slider__slide").length > 1
    ) {
      new core(".main-slider__slider", {
        // Подключаем модули слайдера
        // для конкретного случая
        modules: [Navigation, Pagination],
        /*
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 0,
        // autoHeight: true,
        speed: 800,
        //touchRatio: 0,
        //simulateTouch: false,
        loop: true,
        preloadImages: false,
        lazy: true,
        // Dotts
        pagination: {
          el: ".slider-dotts",
          clickable: true,
        },
        // Arrows
        navigation: {
          nextEl: ".controls-main-slider__arrow_next",
          prevEl: ".controls-main-slider__arrow_prev",
        },
        /*
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
        on: {},
      });
    }

    if (window.innerWidth < 1365.98) {
      // Слайдер новостей
      if (document.querySelector(".news-aside__slider")) {
        new core(".news-aside__slider", {
          // Подключаем модули слайдера
          // для конкретного случая
          modules: [Pagination],
          /*
				effect: 'fade',
				autoplay: {
					delay: 3000,
					disableOnInteraction: false,
				},
				*/
          observer: true,
          observeParents: true,
          slidesPerView: 1,
          spaceBetween: 0,
          // autoHeight: true,
          speed: 800,
          //touchRatio: 0,
          //simulateTouch: false,
          loop: true,
          //preloadImages: false,
          //lazy: true,
          // Dotts
          pagination: {
            el: ".slider-dotts",
            clickable: true,
          },
          // Arrows
          // navigation: {
          // 	nextEl: '.controls-main-slider__arrow_next',
          // 	prevEl: '.controls-main-slider__arrow_prev',
          // },
          /*
				breakpoints: {
					320: {
						slidesPerView: 1,
						spaceBetween: 0,
						autoHeight: true,
					},
					768: {
						slidesPerView: 2,
						spaceBetween: 20,
					},
					992: {
						slidesPerView: 3,
						spaceBetween: 20,
					},
					1268: {
						slidesPerView: 4,
						spaceBetween: 30,
					},
				},
				*/
          on: {},
        });
      }
    }
  }
  // Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
  function initSlidersScroll() {
    // Добавление классов слайдера
    // при необходимости отключить
    bildSliders();

    let sliderScrollItems = document.querySelectorAll(".swiper_scroll");
    if (sliderScrollItems.length > 0) {
      for (let index = 0; index < sliderScrollItems.length; index++) {
        const sliderScrollItem = sliderScrollItems[index];
        const sliderScrollBar =
          sliderScrollItem.querySelector(".swiper-scrollbar");
        const sliderScroll = new Swiper(sliderScrollItem, {
          observer: true,
          observeParents: true,
          direction: "vertical",
          slidesPerView: "auto",
          freeMode: {
            enabled: true,
          },
          scrollbar: {
            el: sliderScrollBar,
            draggable: true,
            snapOnRelease: false,
          },
          mousewheel: {
            releaseOnEdges: true,
          },
        });
        sliderScroll.scrollbar.updateSize();
      }
    }
  }
  initSliders(); // CONCATENATED MODULE: ./src/js/libs/popup.js
  // window.addEventListener("load", function (e) {
  // 	// Запуск инициализации слайдеров
  // 	initSliders();
  // 	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
  // 	//initSlidersScroll();
  // });
  // Модуль попапов
  // (c) Фрилансер по жизни, Хмурый Кот
  // Документация по работе в шаблоне:
  // data-popup - Атрибут для кнопки, которая вызывает попап
  // data-close - Атрибут для кнопки, которая закрывает попап
  // data-youtube - Атрибут для кода youtube
  // Сниппет (HTML): pl

  // Подключение функционала "Чертогов Фрилансера"

  // Класс Popup
  class Popup {
    constructor(options) {
      let config = {
        logging: true,
        init: true,
        // Для кнопок
        attributeOpenButton: "data-popup", // Атрибут для кнопки, которая вызывает попап
        attributeCloseButton: "data-close", // Атрибут для кнопки, которая закрывает попап
        // Для сторонних объектов
        fixElementSelector: "[data-lp]", // Атрибут для элементов с левым паддингом (которые fixed)
        // Для объекта попапа
        youtubeAttribute: "data-youtube", // Атрибут для кода youtube
        youtubePlaceAttribute: "data-youtube-place", // Атрибут для вставки ролика youtube
        setAutoplayYoutube: true,
        // Изменение классов
        classes: {
          popup: "popup",
          // popupWrapper: 'popup__wrapper',
          popupContent: "popup__content",
          popupActive: "popup_show", // Добавляется для попапа, когда он открывается
          bodyActive: "popup-show", // Добавляется для боди, когда попап открыт
        },
        focusCatch: true, // Фокус внутри попапа зациклен
        closeEsc: true, // Закрытие по ESC
        bodyLock: true, // Блокировка скролла
        bodyLockDelay: 500, // Задержка блокировки скролла

        hashSettings: {
          location: true, // Хэш в адресной строке
          goHash: true, // Переход по наличию в адресной строке
        },
        on: {
          // События
          beforeOpen: function () {},
          afterOpen: function () {},
          beforeClose: function () {},
          afterClose: function () {},
        },
      };
      this.isOpen = false;
      // Текущее окно
      this.targetOpen = {
        selector: false,
        element: false,
      };
      // Предыдущее открытое
      this.previousOpen = {
        selector: false,
        element: false,
      };
      // Последнее закрытое
      this.lastClosed = {
        selector: false,
        element: false,
      };
      this._dataValue = false;
      this.hash = false;

      this._reopen = false;
      this._selectorOpen = false;

      this.lastFocusEl = false;
      this._focusEl = [
        "a[href]",
        'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
        "button:not([disabled]):not([aria-hidden])",
        "select:not([disabled]):not([aria-hidden])",
        "textarea:not([disabled]):not([aria-hidden])",
        "area[href]",
        "iframe",
        "object",
        "embed",
        "[contenteditable]",
        '[tabindex]:not([tabindex^="-"])',
      ];
      //this.options = Object.assign(config, options);
      this.options = {
        ...config,
        ...options,
        classes: {
          ...config.classes,
          ...options?.classes,
        },
        hashSettings: {
          ...config.hashSettings,
          ...options?.hashSettings,
        },
        on: {
          ...config.on,
          ...options?.on,
        },
      };
      this.options.init ? this.initPopups() : null;
    }
    initPopups() {
      this.popupLogging(`Проснулся`);
      this.eventsPopup();
    }
    eventsPopup() {
      // Клик на всем документе
      document.addEventListener(
        "click",
        function (e) {
          // Клик по кнопке "открыть"
          const buttonOpen = e.target.closest(
            `[${this.options.attributeOpenButton}]`
          );
          if (buttonOpen) {
            e.preventDefault();
            this._dataValue = buttonOpen.getAttribute(
              this.options.attributeOpenButton
            )
              ? buttonOpen.getAttribute(this.options.attributeOpenButton)
              : "error";
            if (this._dataValue !== "error") {
              if (!this.isOpen) this.lastFocusEl = buttonOpen;
              this.targetOpen.selector = `${this._dataValue}`;
              this._selectorOpen = true;
              this.open();
              return;
            } else
              this.popupLogging(
                `Ой ой, не заполнен атрибут у ${buttonOpen.classList}`
              );

            return;
          }
          // Закрытие на пустом месте (popup__wrapper) и кнопки закрытия (popup__close) для закрытия
          const buttonClose = e.target.closest(
            `[${this.options.attributeCloseButton}]`
          );
          if (
            buttonClose ||
            (!e.target.closest(`.${this.options.classes.popupContent}`) &&
              this.isOpen)
          ) {
            e.preventDefault();
            this.close();
            return;
          }
        }.bind(this)
      );
      // Закрытие по ESC
      document.addEventListener(
        "keydown",
        function (e) {
          if (
            this.options.closeEsc &&
            e.which == 27 &&
            e.code === "Escape" &&
            this.isOpen
          ) {
            e.preventDefault();
            this.close();
            return;
          }
          if (this.options.focusCatch && e.which == 9 && this.isOpen) {
            this._focusCatch(e);
            return;
          }
        }.bind(this)
      );

      // Открытие по хешу
      if (this.options.hashSettings.goHash) {
        // Проверка изменения адресной строки
        window.addEventListener(
          "hashchange",
          function () {
            if (window.location.hash) {
              this._openToHash();
            } else {
              this.close(this.targetOpen.selector);
            }
          }.bind(this)
        );

        window.addEventListener(
          "load",
          function () {
            if (window.location.hash) {
              this._openToHash();
            }
          }.bind(this)
        );
      }
    }
    open(selectorValue) {
      // Если ввести значение селектора (селектор настраивается в options)
      if (
        selectorValue &&
        typeof selectorValue === "string" &&
        selectorValue.trim() !== ""
      ) {
        this.targetOpen.selector = selectorValue;
        this._selectorOpen = true;
      }
      if (this.isOpen) {
        this._reopen = true;
        this.close();
      }
      if (!this._selectorOpen)
        this.targetOpen.selector = this.lastClosed.selector;
      if (!this._reopen) this.previousActiveElement = document.activeElement;

      this.targetOpen.element = document.querySelector(
        this.targetOpen.selector
      );

      if (this.targetOpen.element) {
        // YouTube
        if (
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute)
        ) {
          const codeVideo = this.targetOpen.element.getAttribute(
            this.options.youtubeAttribute
          );

          const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`;

          const iframe = document.createElement("iframe");
          iframe.setAttribute("allowfullscreen", "");

          const autoplay = this.options.setAutoplayYoutube ? "autoplay;" : "";
          iframe.setAttribute("allow", `${autoplay}; encrypted-media`);

          iframe.setAttribute("src", urlVideo);

          if (
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            )
          )
            this.targetOpen.element
              .querySelector(`[${this.options.youtubePlaceAttribute}]`)
              .appendChild(iframe);
        }
        if (this.options.hashSettings.location) {
          // Получение хэша и его выставление
          this._getHash();
          this._setHash();
        }

        // До открытия
        this.options.on.beforeOpen(this);

        this.targetOpen.element.classList.add(this.options.classes.popupActive);
        document.body.classList.add(this.options.classes.bodyActive);

        if (!this._reopen) bodyLockToggle();
        else this._reopen = false;

        this.targetOpen.element.setAttribute("aria-hidden", "false");

        // // Запоминаю это открытое окно. Оно будет последним открытым
        this.previousOpen.selector = this.targetOpen.selector;
        this.previousOpen.element = this.targetOpen.element;

        this._selectorOpen = false;

        this.isOpen = true;

        setTimeout(() => {
          this._focusTrap();
        }, 50);

        // После открытия
        //this.options.on.afterOpen(this);

        // Создаем свое событие после открытия попапа
        document.dispatchEvent(
          new CustomEvent("afterPopupOpen", {
            detail: {
              popup: this,
            },
          })
        );
        this.popupLogging(`Открыл попап`);
      } else
        this.popupLogging(
          `Ой ой, такого попапа нет. Проверьте корректность ввода. `
        );
    }
    close(selectorValue) {
      if (
        selectorValue &&
        typeof selectorValue === "string" &&
        selectorValue.trim() !== ""
      ) {
        this.previousOpen.selector = selectorValue;
      }
      if (!this.isOpen || !bodyLockStatus) {
        return;
      }
      // До закрытия
      this.options.on.beforeClose(this);
      // YouTube
      if (this.targetOpen.element.hasAttribute(this.options.youtubeAttribute)) {
        if (
          this.targetOpen.element.querySelector(
            `[${this.options.youtubePlaceAttribute}]`
          )
        )
          this.targetOpen.element.querySelector(
            `[${this.options.youtubePlaceAttribute}]`
          ).innerHTML = "";
      }
      this.previousOpen.element.classList.remove(
        this.options.classes.popupActive
      );
      // aria-hidden
      this.previousOpen.element.setAttribute("aria-hidden", "true");
      if (!this._reopen) {
        document.body.classList.remove(this.options.classes.bodyActive);
        bodyLockToggle();
        // bodyLock();
        this.isOpen = false;
      }
      // Очищение адресной строки
      this._removeHash();
      if (this._selectorOpen) {
        this.lastClosed.selector = this.previousOpen.selector;
        this.lastClosed.element = this.previousOpen.element;
      }
      // После закрытия
      this.options.on.afterClose(this);
      setTimeout(() => {
        this._focusTrap();
      }, 50);

      this.popupLogging(`Закрыл попап`);
    }
    // Получение хэша
    _getHash() {
      if (this.options.hashSettings.location) {
        this.hash = this.targetOpen.selector.includes("#")
          ? this.targetOpen.selector
          : this.targetOpen.selector.replace(".", "#");
      }
    }
    _openToHash() {
      let classInHash = document.querySelector(
        `.${window.location.hash.replace("#", "")}`
      )
        ? `.${window.location.hash.replace("#", "")}`
        : document.querySelector(`${window.location.hash}`)
        ? `${window.location.hash}`
        : null;

      const buttons = document.querySelector(
        `[${this.options.attributeOpenButton}="${classInHash}"]`
      );
      if (buttons) {
        if (classInHash) this.open(classInHash);
      }
    }
    // Утсановка хэша
    _setHash() {
      history.pushState("", "", this.hash);
    }
    _removeHash() {
      history.pushState("", "", window.location.href.split("#")[0]);
    }
    _focusCatch(e) {
      const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
      const focusArray = Array.prototype.slice.call(focusable);
      const focusedIndex = focusArray.indexOf(document.activeElement);

      if (e.shiftKey && focusedIndex === 0) {
        focusArray[focusArray.length - 1].focus();
        e.preventDefault();
      }
      if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
        focusArray[0].focus();
        e.preventDefault();
      }
    }
    _focusTrap() {
      const focusable = this.previousOpen.element.querySelectorAll(
        this._focusEl
      );
      if (!this.isOpen && this.lastFocusEl) {
        this.lastFocusEl.focus();
      } else {
        focusable[0].focus();
      }
    }
    // Функция вывода в консоль
    popupLogging(message) {
      this.options.logging ? functions_FLS(`[Попапос]: ${message}`) : null;
    }
  }
  // Запускаем и добавляем в объект модулей
  modules_flsModules.popup = new Popup({}); // CONCATENATED MODULE: ./src/js/files/scroll/gotoblock.js
  // Подключение функционала "Чертогов Фрилансера"

  // Подключение дополнения для увеличения возможностей
  // Документация: https://github.com/cferdinandi/smooth-scroll
  // import SmoothScroll from 'smooth-scroll';
  //==============================================================================================================================================================================================================================================================================================================================

  // Модуль плавной проктутки к блоку
  let gotoblock_gotoBlock = (
    targetBlock,
    noHeader = false,
    speed = 500,
    offset = 0
  ) => {
    const targetBlockElement =
      typeof targetBlock === "string"
        ? document.querySelector(targetBlock)
        : targetBlock;
    if (targetBlockElement) {
      let headerItem = "";
      let headerItemHeight = 0;
      if (noHeader) {
        headerItem = "header.header";
        headerItemHeight = document.querySelector(headerItem).offsetHeight;
      }
      let options = {
        speedAsDuration: true,
        speed: speed,
        header: headerItem,
        offset: offset,
        easing: "easeOutQuad",
      };
      // Закрываем меню, если оно открыто
      document.documentElement.classList.contains("menu-open")
        ? menuClose()
        : null;

      if (typeof SmoothScroll !== "undefined") {
        // Прокрутка с использованием дополнения
        new SmoothScroll().animateScroll(targetBlockElement, "", options);
      } else {
        // Прокрутка стандартными средствами
        let targetBlockElementPosition =
          targetBlockElement.getBoundingClientRect().top + scrollY;
        window.scrollTo({
          top: headerItemHeight
            ? targetBlockElementPosition - headerItemHeight
            : targetBlockElementPosition,
          behavior: "smooth",
        });
      }
      FLS(`[gotoBlock]: Юхуу...едем к ${targetBlock}`);
    } else {
      FLS(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${targetBlock}`);
    }
  }; // CONCATENATED MODULE: ./src/js/files/forms/forms.js
  // Подключение функционала "Чертогов Фрилансера"
  // Подключение списка активных модулей

  // Вспомогательные функции

  // Модуль прокрутки к блоку

  //================================================================================================================================================================================================================================================================================================================================

  /*
Чтобы поле участвовало в валидации добавляем атрибут data-required
Особые проверки:
data-required="email" - вадидация E-mail

Чтобы поле валидировалось при потере фокуса, 
к атрибуту data-required добавляем атрибут data-validate

Чтобы вывести текст ошибки, нужно указать его в атрибуте data-error

data-popup-message - указываем селектор попапа который нужно показать после отправки формы (режимы data-ajax или data-dev) ! необходимо подключить функционал попапов в app.js
data-ajax - отправляем данные формы AJAX запросом по адресу указанному в action методом указанным в method
data-dev - режим разработчика - эмитируем отправку формы
data-goto-error - прокрутить страницу к ошибке
*/

  // Работа с полями формы. Добавление классов, работа с placeholder
  function formFieldsInit() {
    const formFields = document.querySelectorAll(
      "input[placeholder],textarea[placeholder]"
    );
    if (formFields.length) {
      formFields.forEach((formField) => {
        formField.dataset.placeholder = formField.placeholder;
      });
    }
    document.body.addEventListener("focusin", function (e) {
      const targetElement = e.target;
      if (
        targetElement.tagName === "INPUT" ||
        targetElement.tagName === "TEXTAREA"
      ) {
        if (targetElement.dataset.placeholder) {
          targetElement.placeholder = "";
        }
        targetElement.classList.add("_form-focus");
        targetElement.parentElement.classList.add("_form-focus");

        formValidate.removeError(targetElement);
      }
    });
    document.body.addEventListener("focusout", function (e) {
      const targetElement = e.target;
      if (
        targetElement.tagName === "INPUT" ||
        targetElement.tagName === "TEXTAREA"
      ) {
        if (targetElement.dataset.placeholder) {
          targetElement.placeholder = targetElement.dataset.placeholder;
        }
        targetElement.classList.remove("_form-focus");
        targetElement.parentElement.classList.remove("_form-focus");

        // Моментальная валидация
        if (targetElement.hasAttribute("data-validate")) {
          formValidate.validateInput(targetElement);
        }
      }
    });
  }
  // Валидация форм
  let formValidate = {
    getErrors(form) {
      let error = 0;
      let formRequiredItems = form.querySelectorAll("*[data-required]");
      if (formRequiredItems.length) {
        formRequiredItems.forEach((formRequiredItem) => {
          if (
            (formRequiredItem.offsetParent !== null ||
              formRequiredItem.tagName === "SELECT") &&
            !formRequiredItem.disabled
          ) {
            error += this.validateInput(formRequiredItem);
          }
        });
      }
      return error;
    },
    validateInput(formRequiredItem) {
      let error = 0;
      if (formRequiredItem.dataset.required === "email") {
        formRequiredItem.value = formRequiredItem.value.replace(" ", "");
        if (this.emailTest(formRequiredItem)) {
          this.addError(formRequiredItem);
          error++;
        } else {
          this.removeError(formRequiredItem);
        }
      } else if (
        formRequiredItem.type === "checkbox" &&
        !formRequiredItem.checked
      ) {
        this.addError(formRequiredItem);
        error++;
      } else {
        if (!formRequiredItem.value) {
          this.addError(formRequiredItem);
          error++;
        } else {
          this.removeError(formRequiredItem);
        }
      }
      return error;
    },
    addError(formRequiredItem) {
      formRequiredItem.classList.add("_form-error");
      formRequiredItem.parentElement.classList.add("_form-error");
      let inputError =
        formRequiredItem.parentElement.querySelector(".form__error");
      if (inputError) formRequiredItem.parentElement.removeChild(inputError);
      if (formRequiredItem.dataset.error) {
        formRequiredItem.parentElement.insertAdjacentHTML(
          "beforeend",
          `<div class="form__error">${formRequiredItem.dataset.error}</div>`
        );
      }
    },
    removeError(formRequiredItem) {
      formRequiredItem.classList.remove("_form-error");
      formRequiredItem.parentElement.classList.remove("_form-error");
      if (formRequiredItem.parentElement.querySelector(".form__error")) {
        formRequiredItem.parentElement.removeChild(
          formRequiredItem.parentElement.querySelector(".form__error")
        );
      }
    },
    formClean(form) {
      form.reset();
      setTimeout(() => {
        let inputs = form.querySelectorAll("input,textarea");
        for (let index = 0; index < inputs.length; index++) {
          const el = inputs[index];
          el.parentElement.classList.remove("_form-focus");
          el.classList.remove("_form-focus");
          formValidate.removeError(el);
        }
        let checkboxes = form.querySelectorAll(".checkbox__input");
        if (checkboxes.length > 0) {
          for (let index = 0; index < checkboxes.length; index++) {
            const checkbox = checkboxes[index];
            checkbox.checked = false;
          }
        }
        if (modules_flsModules.select) {
          let selects = form.querySelectorAll(".select");
          if (selects.length) {
            for (let index = 0; index < selects.length; index++) {
              const select = selects[index].querySelector("select");
              modules_flsModules.select.selectBuild(select);
            }
          }
        }
      }, 0);
    },
    emailTest(formRequiredItem) {
      return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(
        formRequiredItem.value
      );
    },
  };
  /* Отправка форм */
  function formSubmit(validate) {
    if (flsModules.popup) {
      flsModules.popup.open("some");
    }
    const forms = document.forms;
    if (forms.length) {
      for (const form of forms) {
        form.addEventListener("submit", function (e) {
          const form = e.target;
          formSubmitAction(form, e);
        });
        form.addEventListener("reset", function (e) {
          const form = e.target;
          formValidate.formClean(form);
        });
      }
    }
    async function formSubmitAction(form, e) {
      const error = validate ? formValidate.getErrors(form) : 0;
      if (error === 0) {
        const ajax = form.hasAttribute("data-ajax");
        if (ajax) {
          // Если режим ajax
          e.preventDefault();
          const formAction = form.getAttribute("action")
            ? form.getAttribute("action").trim()
            : "#";
          const formMethod = form.getAttribute("method")
            ? form.getAttribute("method").trim()
            : "GET";
          const formData = new FormData(form);

          form.classList.add("_sending");
          const response = await fetch(formAction, {
            method: formMethod,
            body: formData,
          });
          if (response.ok) {
            let responseResult = await response.json();
            form.classList.remove("_sending");
            formSent(form);
          } else {
            alert("Ошибка");
            form.classList.remove("_sending");
          }
        } else if (form.hasAttribute("data-dev")) {
          // Если режим разработки
          e.preventDefault();
          formSent(form);
        }
      } else {
        e.preventDefault();
        const formError = form.querySelector("._form-error");
        if (formError && form.hasAttribute("data-goto-error")) {
          gotoBlock(formError, true, 1000);
        }
      }
    }
    // Действия после отправки формы
    function formSent(form) {
      // Создаем событие отправки формы
      document.dispatchEvent(
        new CustomEvent("formSent", {
          detail: {
            form: form,
          },
        })
      );
      // Показываем попап, если подключен модуль попапов
      // и для формы указана настройка
      setTimeout(() => {
        if (flsModules.popup) {
          const popup = form.dataset.popupMessage;
          popup ? flsModules.popup.open(popup) : null;
        }
      }, 0);
      // Очищаем форму
      formValidate.formClean(form);
      // Сообщаем в консоль
      formLogging(`Форма отправлена!`);
    }
    function formLogging(message) {
      FLS(`[Формы]: ${message}`);
    }
  }
  /* Модуь формы "показать пароль" */
  function formViewpass() {
    document.addEventListener("click", function (e) {
      let targetElement = e.target;
      if (targetElement.closest('[class*="__viewpass"]')) {
        let inputType = targetElement.classList.contains("active")
          ? "password"
          : "text";
        targetElement.parentElement
          .querySelector("input")
          .setAttribute("type", inputType);
        targetElement.classList.toggle("active");
      }
    });
  }
  /* Модуь формы "колличество" */
  function formQuantity() {
    document.addEventListener("click", function (e) {
      let targetElement = e.target;
      if (targetElement.closest(".quantity__button")) {
        let value = parseInt(
          targetElement.closest(".quantity").querySelector("input").value
        );
        if (targetElement.classList.contains("quantity__button_plus")) {
          value++;
        } else {
          --value;
          if (value < 1) value = 1;
        }
        targetElement.closest(".quantity").querySelector("input").value = value;
      }
    });
  }
  /* Модуь звездного рейтинга */
  function formRating() {
    const ratings = document.querySelectorAll(".rating");
    if (ratings.length > 0) {
      initRatings();
    }
    // Основная функция
    function initRatings() {
      let ratingActive, ratingValue;
      // "Бегаем" по всем рейтингам на странице
      for (let index = 0; index < ratings.length; index++) {
        const rating = ratings[index];
        initRating(rating);
      }
      // Инициализируем конкретный рейтинг
      function initRating(rating) {
        initRatingVars(rating);

        setRatingActiveWidth();

        if (rating.classList.contains("rating_set")) {
          setRating(rating);
        }
      }
      // Инициализайция переменных
      function initRatingVars(rating) {
        ratingActive = rating.querySelector(".rating__active");
        ratingValue = rating.querySelector(".rating__value");
      }
      // Изменяем ширину активных звезд
      function setRatingActiveWidth(index = ratingValue.innerHTML) {
        const ratingActiveWidth = index / 0.05;
        ratingActive.style.width = `${ratingActiveWidth}%`;
      }
      // Возможность указать оценку
      function setRating(rating) {
        const ratingItems = rating.querySelectorAll(".rating__item");
        for (let index = 0; index < ratingItems.length; index++) {
          const ratingItem = ratingItems[index];
          ratingItem.addEventListener("mouseenter", function (e) {
            // Обновление переменных
            initRatingVars(rating);
            // Обновление активных звезд
            setRatingActiveWidth(ratingItem.value);
          });
          ratingItem.addEventListener("mouseleave", function (e) {
            // Обновление активных звезд
            setRatingActiveWidth();
          });
          ratingItem.addEventListener("click", function (e) {
            // Обновление переменных
            initRatingVars(rating);

            if (rating.dataset.ajax) {
              // "Отправить" на сервер
              setRatingValue(ratingItem.value, rating);
            } else {
              // Отобразить указанную оцнку
              ratingValue.innerHTML = index + 1;
              setRatingActiveWidth();
            }
          });
        }
      }
      async function setRatingValue(value, rating) {
        if (!rating.classList.contains("rating_sending")) {
          rating.classList.add("rating_sending");

          // Отправика данных (value) на сервер
          let response = await fetch("rating.json", {
            method: "GET",

            //body: JSON.stringify({
            //	userRating: value
            //}),
            //headers: {
            //	'content-type': 'application/json'
            //}
          });
          if (response.ok) {
            const result = await response.json();

            // Получаем новый рейтинг
            const newRating = result.newRating;

            // Вывод нового среднего результата
            ratingValue.innerHTML = newRating;

            // Обновление активных звезд
            setRatingActiveWidth();

            rating.classList.remove("rating_sending");
          } else {
            alert("Ошибка");

            rating.classList.remove("rating_sending");
          }
        }
      }
    }
  } // CONCATENATED MODULE: ./src/js/libs/watcher.js
  // Подключение функционала "Чертогов Фрилансера"

  // Наблюдатель объектов [всевидещее око]
  // data-watch - можно писать значение для применения кастомного кода
  // data-watch-root - родитель внутри которого налюдать за объектом
  // data-watch-margin - отступ
  // data-watch-threshold - процент показа объекта для срабатывания
  // data-watch-once - наблюдать только один раз
  // _watcher-view - класс который добавляется при появлении объекта

  class ScrollWatcher {
    constructor(props) {
      let defaultConfig = {
        logging: true,
      };
      this.config = Object.assign(defaultConfig, props);
      this.observer;
      !document.documentElement.classList.contains("watcher")
        ? this.scrollWatcherRun()
        : null;
    }
    // Обновляем конструктор
    scrollWatcherUpdate() {
      this.scrollWatcherRun();
    }
    // Запускаем конструктор
    scrollWatcherRun() {
      document.documentElement.classList.add("watcher");
      this.scrollWatcherConstructor(document.querySelectorAll("[data-watch]"));
    }
    // Конструктор наблюдателей
    scrollWatcherConstructor(items) {
      if (items.length) {
        this.scrollWatcherLogging(
          `Проснулся, слежу за объектами (${items.length})...`
        );
        // Уникализируем параметры
        let uniqParams = uniqArray(
          Array.from(items).map(function (item) {
            return `${
              item.dataset.watchRoot ? item.dataset.watchRoot : null
            }|${item.dataset.watchMargin ? item.dataset.watchMargin : "0px"}|${item.dataset.watchThreshold ? item.dataset.watchThreshold : 0}`;
          })
        );
        // Получаем группы объектов с одинаковыми параметрами,
        // создаем настройки, инициализируем наблюдатель
        uniqParams.forEach((uniqParam) => {
          let uniqParamArray = uniqParam.split("|");
          let paramsWatch = {
            root: uniqParamArray[0],
            margin: uniqParamArray[1],
            threshold: uniqParamArray[2],
          };
          let groupItems = Array.from(items).filter(function (item) {
            let watchRoot = item.dataset.watchRoot
              ? item.dataset.watchRoot
              : null;
            let watchMargin = item.dataset.watchMargin
              ? item.dataset.watchMargin
              : "0px";
            let watchThreshold = item.dataset.watchThreshold
              ? item.dataset.watchThreshold
              : 0;
            if (
              String(watchRoot) === paramsWatch.root &&
              String(watchMargin) === paramsWatch.margin &&
              String(watchThreshold) === paramsWatch.threshold
            ) {
              return item;
            }
          });

          let configWatcher = this.getScrollWatcherConfig(paramsWatch);

          // Инициализация наблюдателя со своими настройками
          this.scrollWatcherInit(groupItems, configWatcher);
        });
      } else {
        this.scrollWatcherLogging("Сплю, нет объектов для слежения. ZzzZZzz");
      }
    }
    // Функция создания настроек
    getScrollWatcherConfig(paramsWatch) {
      // Создаем настройки
      let configWatcher = {};
      // Родитель, внутри которого ведется наблюдение
      if (document.querySelector(paramsWatch.root)) {
        configWatcher.root = document.querySelector(paramsWatch.root);
      } else if (paramsWatch.root !== "null") {
        this.scrollWatcherLogging(
          `Эмм... родительского объекта ${paramsWatch.root} нет на странице`
        );
      }
      // Отступ срабатывания
      configWatcher.rootMargin = paramsWatch.margin;
      if (
        paramsWatch.margin.indexOf("px") < 0 &&
        paramsWatch.margin.indexOf("%") < 0
      ) {
        this.scrollWatcherLogging(
          `Ой ой, настройку data-watch-margin нужно задавать в PX или %`
        );
        return;
      }
      // Точки срабатывания
      if (paramsWatch.threshold === "prx") {
        // Режим параллакса
        paramsWatch.threshold = [];
        for (let i = 0; i <= 1.0; i += 0.005) {
          paramsWatch.threshold.push(i);
        }
      } else {
        paramsWatch.threshold = paramsWatch.threshold.split(",");
      }
      configWatcher.threshold = paramsWatch.threshold;

      return configWatcher;
    }
    // Функция создания нового наблюдателя со своими настройками
    scrollWatcherCreate(configWatcher) {
      this.observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          this.scrollWatcherCallback(entry, observer);
        });
      }, configWatcher);
    }
    // Функция инициализации наблюдателя со своими настройками
    scrollWatcherInit(items, configWatcher) {
      // Создание нового наблюдателя со своими настройками
      this.scrollWatcherCreate(configWatcher);
      // Передача наблюдателю элементов
      items.forEach((item) => this.observer.observe(item));
    }
    // Функция обработки базовых действий точек срабатываения
    scrollWatcherIntersecting(entry, targetElement) {
      if (entry.isIntersecting) {
        // Видим объект
        // Добавляем класс
        !targetElement.classList.contains("_watcher-view")
          ? targetElement.classList.add("_watcher-view")
          : null;
        this.scrollWatcherLogging(
          `Я вижу ${targetElement.classList}, добавил класс _watcher-view`
        );
      } else {
        // Не видим объект
        // Убираем класс
        targetElement.classList.contains("_watcher-view")
          ? targetElement.classList.remove("_watcher-view")
          : null;
        this.scrollWatcherLogging(
          `Я не вижу ${targetElement.classList}, убрал класс _watcher-view`
        );
      }
    }
    // Функция отключения слежения за объектом
    scrollWatcherOff(targetElement, observer) {
      observer.unobserve(targetElement);
      this.scrollWatcherLogging(
        `Я перестал следить за ${targetElement.classList}`
      );
    }
    // Функция вывода в консоль
    scrollWatcherLogging(message) {
      this.config.logging ? functions_FLS(`[Наблюдатель]: ${message}`) : null;
    }
    // Функция обработки наблюдения
    scrollWatcherCallback(entry, observer) {
      const targetElement = entry.target;
      // Обработка базовых действий точек срабатываения
      this.scrollWatcherIntersecting(entry, targetElement);
      // Если есть атрибут data-watch-once убираем слежку
      targetElement.hasAttribute("data-watch-once") && entry.isIntersecting
        ? this.scrollWatcherOff(targetElement, observer)
        : null;
      // Создаем свое событие отбратной связи
      document.dispatchEvent(
        new CustomEvent("watcherCallback", {
          detail: {
            entry: entry,
          },
        })
      );

      /*
		// Выбираем нужные объекты
		if (targetElement.dataset.watch === 'some value') {
			// пишем уникальную специфику
		}
		if (entry.isIntersecting) {
			// Видим объект
		} else {
			// Не видим объект
		}
		*/
    }
  }
  // Запускаем и добавляем в объект модулей
  modules_flsModules.watcher = new ScrollWatcher({}); // CONCATENATED MODULE: ./src/js/files/scroll/scroll.js

  // Подключение функционала "Чертогов Фрилансера"

  // Импорт класса наблюдателя.

  // Модуль прокрутки к блоку

  // Переменная контроля добавления события window scroll.
  let addWindowScrollEvent = false;
  //====================================================================================================================================================================================================================================================================================================
  // Плавная навигация по странице
  function pageNavigation() {
    // data-goto - указать ID блока
    // data-goto-header - учитывать header
    // data-goto-speed - скорость (только если используется доп плагин)
    // Работаем при клике на пункт
    document.addEventListener("click", pageNavigationAction);
    // Если подключен scrollWatcher, подсвечиваем текущий пукт меню
    document.addEventListener("watcherCallback", pageNavigationAction);
    // Основная функция
    function pageNavigationAction(e) {
      if (e.type === "click") {
        const targetElement = e.target;
        if (targetElement.closest("[data-goto]")) {
          const gotoLink = targetElement.closest("[data-goto]");
          const gotoLinkSelector = gotoLink.dataset.goto
            ? gotoLink.dataset.goto
            : "";
          const noHeader = gotoLink.hasAttribute("data-goto-header")
            ? true
            : false;
          const gotoSpeed = gotoLink.dataset.gotoSpeed
            ? gotoLink.dataset.gotoSpeed
            : "500";
          gotoBlock(gotoLinkSelector, noHeader, gotoSpeed);
          e.preventDefault();
        }
      } else if (e.type === "watcherCallback") {
        if (e.detail) {
          const entry = e.detail.entry;
          const targetElement = entry.target;
          // Обработка пунктов навигации, если указано значение navigator подсвечиваем текущий пукт меню
          if (targetElement.dataset.watch === "navigator") {
            const navigatorItem = targetElement.id;
            const navigatorActiveItem = document.querySelector(
              `[data-goto]._navigator-active`
            );
            const navigatorCurrentItem = document.querySelector(
              `[data-goto="${navigatorItem}"]`
            );
            if (entry.isIntersecting) {
              // Видим объект
              // navigatorActiveItem ? navigatorActiveItem.classList.remove('_navigator-active') : null;
              navigatorCurrentItem
                ? navigatorCurrentItem.classList.add("_navigator-active")
                : null;
            } else {
              // Не видим объект
              navigatorCurrentItem
                ? navigatorCurrentItem.classList.remove("_navigator-active")
                : null;
            }
          }
        }
      }
    }
  }
  // Работа с шапкой при скроле
  function headerScroll() {
    addWindowScrollEvent = true;
    const header = document.querySelector("header.header");
    const headerShow = header.hasAttribute("data-scroll-show"); // Добавить
    const headerShowTimer = header.dataset.scrollShow
      ? header.dataset.scrollShow
      : 500;
    // const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
    const startPoint = 1;
    // const startPoint = headerHeigth;
    // const startPoint = 200;
    let scrollDirection = 100;
    let timer;

    if (window.innerWidth > 1023.98) {
      document.addEventListener("windowScroll", function (e) {
        const scrollTop = window.scrollY;
        clearTimeout(timer);

        if (scrollTop >= startPoint) {
          !header.classList.contains("_header-scroll")
            ? header.classList.add("_header-scroll")
            : null;

          // scrollTop >= 250 ? header.classList.add('fixed-header') : null;
          if (headerShow) {
            if (scrollTop < scrollDirection) {
              // downscroll code
              header.classList.contains("_header-show")
                ? header.classList.remove("_header-show")
                : null;
            } else {
              // upscroll code
              !header.classList.contains("_header-show")
                ? header.classList.add("_header-show")
                : null;
            }
            // timer = setTimeout(() => {
            // 	!header.classList.contains('_header-show') ? header.classList.add('_header-show') : null;
            // }, headerShowTimer);
          }
        } else {
          header.classList.contains("_header-scroll")
            ? header.classList.remove("_header-scroll")
            : null;
          // main.style.paddingTop = 0;
          if (headerShow) {
            header.classList.contains("_header-show")
              ? header.classList.remove("_header-show")
              : null;
          }
        }
        // scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
      });
    }
  }
  // Прилипающий блок
  function stickyBlock() {
    addWindowScrollEvent = true;
    // data-sticky для родителя внутри которого прилипает блок *
    // data-sticky-header для родителя, учитываем высоту хедера
    // data-sticky-top="" для родителя, можно указать отступ сверху
    // data-sticky-bottom="" для родителя, можно указать отступ снизу
    // data-sticky-item для прилипающего блока *
    function stickyBlockInit() {
      const stickyParents = document.querySelectorAll("[data-sticky]");
      if (stickyParents.length) {
        stickyParents.forEach((stickyParent) => {
          let stickyConfig = {
            top: stickyParent.dataset.stickyTop
              ? parseInt(stickyParent.dataset.stickyTop)
              : 0,
            bottom: stickyParent.dataset.stickyBottom
              ? parseInt(stickyParent.dataset.stickyBottom)
              : 0,
            header: stickyParent.hasAttribute("data-sticky-header")
              ? document.querySelector("header.header").offsetHeight
              : 0,
          };
          stickyBlockItem(stickyParent, stickyConfig);
        });
      }
    }
    function stickyBlockItem(stickyParent, stickyConfig) {
      const stickyBlockItem = stickyParent.querySelector("[data-sticky-item]");
      const headerHeight = stickyConfig.header;
      const offsetTop = headerHeight + stickyConfig.top;
      const startPoint =
        stickyBlockItem.getBoundingClientRect().top + scrollY - offsetTop;
      document.addEventListener("windowScroll", function (e) {
        const endPoint =
          stickyParent.offsetHeight +
          stickyParent.getBoundingClientRect().top +
          scrollY -
          (offsetTop + stickyBlockItem.offsetHeight + stickyConfig.bottom);
        let stickyItemValues = {
          position: "relative",
          bottom: "auto",
          top: "0px",
          left: "0px",
          width: "auto",
        };
        if (
          offsetTop + stickyConfig.bottom + stickyBlockItem.offsetHeight <
          window.innerHeight
        ) {
          if (scrollY >= startPoint && scrollY <= endPoint) {
            stickyItemValues.position = `fixed`;
            stickyItemValues.bottom = `auto`;
            stickyItemValues.top = `${offsetTop}px`;
            stickyItemValues.left = `${
              stickyBlockItem.getBoundingClientRect().left
            }px`;
            stickyItemValues.width = `${stickyBlockItem.offsetWidth}px`;
          } else if (scrollY >= endPoint) {
            stickyItemValues.position = `absolute`;
            stickyItemValues.bottom = `${stickyConfig.bottom}px`;
            stickyItemValues.top = `auto`;
            stickyItemValues.left = `0px`;
            stickyItemValues.width = `${stickyBlockItem.offsetWidth}px`;
          }
        }
        stickyBlockType(stickyBlockItem, stickyItemValues);
      });
    }
    function stickyBlockType(stickyBlockItem, stickyItemValues) {
      stickyBlockItem.style.cssText = `position:${stickyItemValues.position};bottom:${stickyItemValues.bottom};top:${stickyItemValues.top};left:${stickyItemValues.left};width:${stickyItemValues.width};`;
    }
    stickyBlockInit();
  }
  // При подключении модуля обработчик события запустится автоматически
  setTimeout(() => {
    if (addWindowScrollEvent) {
      let windowScroll = new Event("windowScroll");
      window.addEventListener("scroll", function (e) {
        document.dispatchEvent(windowScroll);
      });
    }
  }, 0); // CONCATENATED MODULE: ./src/js/libs/dynamic_adapt.js

  // Dynamic Adapt v.1
  // HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
  // e.x. data-da=".item,992,2"
  // Andrikanych Yevhen 2020
  // https://www.youtube.com/c/freelancerlifestyle

  function DynamicAdapt(type) {
    this.type = type;
  }
  DynamicAdapt.prototype.init = function () {
    const _this = this;
    // массив объектов
    this.оbjects = [];
    this.daClassname = "_dynamic_adapt_";
    // массив DOM-элементов
    this.nodes = document.querySelectorAll("[data-da]");
    // наполнение оbjects объктами
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      const data = node.dataset.da.trim();
      const dataArray = data.split(",");
      const оbject = {};
      оbject.element = node;
      оbject.parent = node.parentNode;
      оbject.destination = document.querySelector(dataArray[0].trim());
      оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
      оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
      оbject.index = this.indexInParent(оbject.parent, оbject.element);
      this.оbjects.push(оbject);
    }
    this.arraySort(this.оbjects);
    // массив уникальных медиа-запросов
    this.mediaQueries = Array.prototype.map.call(
      this.оbjects,
      function (item) {
        return (
          "(" +
          this.type +
          "-width: " +
          item.breakpoint +
          "px)," +
          item.breakpoint
        );
      },
      this
    );
    this.mediaQueries = Array.prototype.filter.call(
      this.mediaQueries,
      function (item, index, self) {
        return Array.prototype.indexOf.call(self, item) === index;
      }
    );
    // навешивание слушателя на медиа-запрос
    // и вызов обработчика при первом запуске
    for (let i = 0; i < this.mediaQueries.length; i++) {
      const media = this.mediaQueries[i];
      const mediaSplit = String.prototype.split.call(media, ",");
      const matchMedia = window.matchMedia(mediaSplit[0]);
      const mediaBreakpoint = mediaSplit[1];
      // массив объектов с подходящим брейкпоинтом
      const оbjectsFilter = Array.prototype.filter.call(
        this.оbjects,
        function (item) {
          return item.breakpoint === mediaBreakpoint;
        }
      );
      matchMedia.addListener(function () {
        _this.mediaHandler(matchMedia, оbjectsFilter);
      });
      this.mediaHandler(matchMedia, оbjectsFilter);
    }
  };
  DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
    if (matchMedia.matches) {
      for (let i = 0; i < оbjects.length; i++) {
        const оbject = оbjects[i];
        оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.moveTo(оbject.place, оbject.element, оbject.destination);
      }
    } else {
      //for (let i = 0; i < оbjects.length; i++) {
      for (let i = оbjects.length - 1; i >= 0; i--) {
        const оbject = оbjects[i];
        if (оbject.element.classList.contains(this.daClassname)) {
          this.moveBack(оbject.parent, оbject.element, оbject.index);
        }
      }
    }
  };
  // Функция перемещения
  DynamicAdapt.prototype.moveTo = function (place, element, destination) {
    element.classList.add(this.daClassname);
    if (place === "last" || place >= destination.children.length) {
      destination.insertAdjacentElement("beforeend", element);
      return;
    }
    if (place === "first") {
      destination.insertAdjacentElement("afterbegin", element);
      return;
    }
    destination.children[place].insertAdjacentElement("beforebegin", element);
  };
  // Функция возврата
  DynamicAdapt.prototype.moveBack = function (parent, element, index) {
    element.classList.remove(this.daClassname);
    if (parent.children[index] !== undefined) {
      parent.children[index].insertAdjacentElement("beforebegin", element);
    } else {
      parent.insertAdjacentElement("beforeend", element);
    }
  };
  // Функция получения индекса внутри родителя
  DynamicAdapt.prototype.indexInParent = function (parent, element) {
    const array = Array.prototype.slice.call(parent.children);
    return Array.prototype.indexOf.call(array, element);
  };
  // Функция сортировки массива по breakpoint и place
  // по возрастанию для this.type = min
  // по убыванию для this.type = max
  DynamicAdapt.prototype.arraySort = function (arr) {
    if (this.type === "min") {
      Array.prototype.sort.call(arr, function (a, b) {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }

          if (a.place === "first" || b.place === "last") {
            return -1;
          }

          if (a.place === "last" || b.place === "first") {
            return 1;
          }

          return a.place - b.place;
        }

        return a.breakpoint - b.breakpoint;
      });
    } else {
      Array.prototype.sort.call(arr, function (a, b) {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }

          if (a.place === "first" || b.place === "last") {
            return 1;
          }

          if (a.place === "last" || b.place === "first") {
            return -1;
          }

          return b.place - a.place;
        }

        return b.breakpoint - a.breakpoint;
      });
      return;
    }
  };
  const da = new DynamicAdapt("max");
  da.init(); // CONCATENATED MODULE: ./src/js/libs/simplebar.js
  /**
   * SimpleBar.js - v5.3.6
   * Scrollbars, simpler.
   * https://grsmto.github.io/simplebar/
   *
   * Made by Adrien Denat from a fork by Jonathan Nicol
   * Under MIT License
   */

  !(function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = e())
      : "function" == typeof define && define.amd
      ? define(e)
      : ((t = t || self).SimpleBar = e());
  })(undefined, function () {
    "use strict";
    var t =
      "undefined" != typeof globalThis
        ? globalThis
        : "undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : "undefined" != typeof self
        ? self
        : {};
    function e(t, e) {
      return t((e = { exports: {} }), e.exports), e.exports;
    }
    var r,
      i,
      n,
      o = "object",
      s = function (t) {
        return t && t.Math == Math && t;
      },
      a =
        s(typeof globalThis == o && globalThis) ||
        s(typeof window == o && window) ||
        s(typeof self == o && self) ||
        s(typeof t == o && t) ||
        Function("return this")(),
      c = function (t) {
        try {
          return !!t();
        } catch (t) {
          return !0;
        }
      },
      l = !c(function () {
        return (
          7 !=
          Object.defineProperty({}, "a", {
            get: function () {
              return 7;
            },
          }).a
        );
      }),
      u = {}.propertyIsEnumerable,
      f = Object.getOwnPropertyDescriptor,
      h = {
        f:
          f && !u.call({ 1: 2 }, 1)
            ? function (t) {
                var e = f(this, t);
                return !!e && e.enumerable;
              }
            : u,
      },
      d = function (t, e) {
        return {
          enumerable: !(1 & t),
          configurable: !(2 & t),
          writable: !(4 & t),
          value: e,
        };
      },
      p = {}.toString,
      v = function (t) {
        return p.call(t).slice(8, -1);
      },
      g = "".split,
      b = c(function () {
        return !Object("z").propertyIsEnumerable(0);
      })
        ? function (t) {
            return "String" == v(t) ? g.call(t, "") : Object(t);
          }
        : Object,
      y = function (t) {
        if (null == t) throw TypeError("Can't call method on " + t);
        return t;
      },
      m = function (t) {
        return b(y(t));
      },
      x = function (t) {
        return "object" == typeof t ? null !== t : "function" == typeof t;
      },
      E = function (t, e) {
        if (!x(t)) return t;
        var r, i;
        if (e && "function" == typeof (r = t.toString) && !x((i = r.call(t))))
          return i;
        if ("function" == typeof (r = t.valueOf) && !x((i = r.call(t))))
          return i;
        if (!e && "function" == typeof (r = t.toString) && !x((i = r.call(t))))
          return i;
        throw TypeError("Can't convert object to primitive value");
      },
      w = {}.hasOwnProperty,
      S = function (t, e) {
        return w.call(t, e);
      },
      O = a.document,
      k = x(O) && x(O.createElement),
      A = function (t) {
        return k ? O.createElement(t) : {};
      },
      T =
        !l &&
        !c(function () {
          return (
            7 !=
            Object.defineProperty(A("div"), "a", {
              get: function () {
                return 7;
              },
            }).a
          );
        }),
      L = Object.getOwnPropertyDescriptor,
      z = {
        f: l
          ? L
          : function (t, e) {
              if (((t = m(t)), (e = E(e, !0)), T))
                try {
                  return L(t, e);
                } catch (t) {}
              if (S(t, e)) return d(!h.f.call(t, e), t[e]);
            },
      },
      R = function (t) {
        if (!x(t)) throw TypeError(String(t) + " is not an object");
        return t;
      },
      _ = Object.defineProperty,
      M = {
        f: l
          ? _
          : function (t, e, r) {
              if ((R(t), (e = E(e, !0)), R(r), T))
                try {
                  return _(t, e, r);
                } catch (t) {}
              if ("get" in r || "set" in r)
                throw TypeError("Accessors not supported");
              return "value" in r && (t[e] = r.value), t;
            },
      },
      C = l
        ? function (t, e, r) {
            return M.f(t, e, d(1, r));
          }
        : function (t, e, r) {
            return (t[e] = r), t;
          },
      W = function (t, e) {
        try {
          C(a, t, e);
        } catch (r) {
          a[t] = e;
        }
        return e;
      },
      j = e(function (t) {
        var e = a["__core-js_shared__"] || W("__core-js_shared__", {});
        (t.exports = function (t, r) {
          return e[t] || (e[t] = void 0 !== r ? r : {});
        })("versions", []).push({
          version: "3.2.1",
          mode: "global",
          copyright: "© 2019 Denis Pushkarev (zloirock.ru)",
        });
      }),
      N = j("native-function-to-string", Function.toString),
      I = a.WeakMap,
      B = "function" == typeof I && /native code/.test(N.call(I)),
      D = 0,
      P = Math.random(),
      F = function (t) {
        return (
          "Symbol(" +
          String(void 0 === t ? "" : t) +
          ")_" +
          (++D + P).toString(36)
        );
      },
      V = j("keys"),
      X = function (t) {
        return V[t] || (V[t] = F(t));
      },
      H = {},
      q = a.WeakMap;
    if (B) {
      var $ = new q(),
        Y = $.get,
        G = $.has,
        U = $.set;
      (r = function (t, e) {
        return U.call($, t, e), e;
      }),
        (i = function (t) {
          return Y.call($, t) || {};
        }),
        (n = function (t) {
          return G.call($, t);
        });
    } else {
      var Q = X("state");
      (H[Q] = !0),
        (r = function (t, e) {
          return C(t, Q, e), e;
        }),
        (i = function (t) {
          return S(t, Q) ? t[Q] : {};
        }),
        (n = function (t) {
          return S(t, Q);
        });
    }
    var K = {
        set: r,
        get: i,
        has: n,
        enforce: function (t) {
          return n(t) ? i(t) : r(t, {});
        },
        getterFor: function (t) {
          return function (e) {
            var r;
            if (!x(e) || (r = i(e)).type !== t)
              throw TypeError("Incompatible receiver, " + t + " required");
            return r;
          };
        },
      },
      J = e(function (t) {
        var e = K.get,
          r = K.enforce,
          i = String(N).split("toString");
        j("inspectSource", function (t) {
          return N.call(t);
        }),
          (t.exports = function (t, e, n, o) {
            var s = !!o && !!o.unsafe,
              c = !!o && !!o.enumerable,
              l = !!o && !!o.noTargetGet;
            "function" == typeof n &&
              ("string" != typeof e || S(n, "name") || C(n, "name", e),
              (r(n).source = i.join("string" == typeof e ? e : ""))),
              t !== a
                ? (s ? !l && t[e] && (c = !0) : delete t[e],
                  c ? (t[e] = n) : C(t, e, n))
                : c
                ? (t[e] = n)
                : W(e, n);
          })(Function.prototype, "toString", function () {
            return (
              ("function" == typeof this && e(this).source) || N.call(this)
            );
          });
      }),
      Z = a,
      tt = function (t) {
        return "function" == typeof t ? t : void 0;
      },
      et = function (t, e) {
        return arguments.length < 2
          ? tt(Z[t]) || tt(a[t])
          : (Z[t] && Z[t][e]) || (a[t] && a[t][e]);
      },
      rt = Math.ceil,
      it = Math.floor,
      nt = function (t) {
        return isNaN((t = +t)) ? 0 : (t > 0 ? it : rt)(t);
      },
      ot = Math.min,
      st = function (t) {
        return t > 0 ? ot(nt(t), 9007199254740991) : 0;
      },
      at = Math.max,
      ct = Math.min,
      lt = function (t) {
        return function (e, r, i) {
          var n,
            o = m(e),
            s = st(o.length),
            a = (function (t, e) {
              var r = nt(t);
              return r < 0 ? at(r + e, 0) : ct(r, e);
            })(i, s);
          if (t && r != r) {
            for (; s > a; ) if ((n = o[a++]) != n) return !0;
          } else
            for (; s > a; a++)
              if ((t || a in o) && o[a] === r) return t || a || 0;
          return !t && -1;
        };
      },
      ut = { includes: lt(!0), indexOf: lt(!1) }.indexOf,
      ft = function (t, e) {
        var r,
          i = m(t),
          n = 0,
          o = [];
        for (r in i) !S(H, r) && S(i, r) && o.push(r);
        for (; e.length > n; ) S(i, (r = e[n++])) && (~ut(o, r) || o.push(r));
        return o;
      },
      ht = [
        "constructor",
        "hasOwnProperty",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "toLocaleString",
        "toString",
        "valueOf",
      ],
      dt = ht.concat("length", "prototype"),
      pt = {
        f:
          Object.getOwnPropertyNames ||
          function (t) {
            return ft(t, dt);
          },
      },
      vt = { f: Object.getOwnPropertySymbols },
      gt =
        et("Reflect", "ownKeys") ||
        function (t) {
          var e = pt.f(R(t)),
            r = vt.f;
          return r ? e.concat(r(t)) : e;
        },
      bt = function (t, e) {
        for (var r = gt(e), i = M.f, n = z.f, o = 0; o < r.length; o++) {
          var s = r[o];
          S(t, s) || i(t, s, n(e, s));
        }
      },
      yt = /#|\.prototype\./,
      mt = function (t, e) {
        var r = Et[xt(t)];
        return r == St || (r != wt && ("function" == typeof e ? c(e) : !!e));
      },
      xt = (mt.normalize = function (t) {
        return String(t).replace(yt, ".").toLowerCase();
      }),
      Et = (mt.data = {}),
      wt = (mt.NATIVE = "N"),
      St = (mt.POLYFILL = "P"),
      Ot = mt,
      kt = z.f,
      At = function (t, e) {
        var r,
          i,
          n,
          o,
          s,
          c = t.target,
          l = t.global,
          u = t.stat;
        if ((r = l ? a : u ? a[c] || W(c, {}) : (a[c] || {}).prototype))
          for (i in e) {
            if (
              ((o = e[i]),
              (n = t.noTargetGet ? (s = kt(r, i)) && s.value : r[i]),
              !Ot(l ? i : c + (u ? "." : "#") + i, t.forced) && void 0 !== n)
            ) {
              if (typeof o == typeof n) continue;
              bt(o, n);
            }
            (t.sham || (n && n.sham)) && C(o, "sham", !0), J(r, i, o, t);
          }
      },
      Tt = function (t) {
        if ("function" != typeof t)
          throw TypeError(String(t) + " is not a function");
        return t;
      },
      Lt = function (t, e, r) {
        if ((Tt(t), void 0 === e)) return t;
        switch (r) {
          case 0:
            return function () {
              return t.call(e);
            };
          case 1:
            return function (r) {
              return t.call(e, r);
            };
          case 2:
            return function (r, i) {
              return t.call(e, r, i);
            };
          case 3:
            return function (r, i, n) {
              return t.call(e, r, i, n);
            };
        }
        return function () {
          return t.apply(e, arguments);
        };
      },
      zt = function (t) {
        return Object(y(t));
      },
      Rt =
        Array.isArray ||
        function (t) {
          return "Array" == v(t);
        },
      _t =
        !!Object.getOwnPropertySymbols &&
        !c(function () {
          return !String(Symbol());
        }),
      Mt = a.Symbol,
      Ct = j("wks"),
      Wt = function (t) {
        return Ct[t] || (Ct[t] = (_t && Mt[t]) || (_t ? Mt : F)("Symbol." + t));
      },
      jt = Wt("species"),
      Nt = function (t, e) {
        var r;
        return (
          Rt(t) &&
            ("function" != typeof (r = t.constructor) ||
            (r !== Array && !Rt(r.prototype))
              ? x(r) && null === (r = r[jt]) && (r = void 0)
              : (r = void 0)),
          new (void 0 === r ? Array : r)(0 === e ? 0 : e)
        );
      },
      It = [].push,
      Bt = function (t) {
        var e = 1 == t,
          r = 2 == t,
          i = 3 == t,
          n = 4 == t,
          o = 6 == t,
          s = 5 == t || o;
        return function (a, c, l, u) {
          for (
            var f,
              h,
              d = zt(a),
              p = b(d),
              v = Lt(c, l, 3),
              g = st(p.length),
              y = 0,
              m = u || Nt,
              x = e ? m(a, g) : r ? m(a, 0) : void 0;
            g > y;
            y++
          )
            if ((s || y in p) && ((h = v((f = p[y]), y, d)), t))
              if (e) x[y] = h;
              else if (h)
                switch (t) {
                  case 3:
                    return !0;
                  case 5:
                    return f;
                  case 6:
                    return y;
                  case 2:
                    It.call(x, f);
                }
              else if (n) return !1;
          return o ? -1 : i || n ? n : x;
        };
      },
      Dt = {
        forEach: Bt(0),
        map: Bt(1),
        filter: Bt(2),
        some: Bt(3),
        every: Bt(4),
        find: Bt(5),
        findIndex: Bt(6),
      },
      Pt = function (t, e) {
        var r = [][t];
        return (
          !r ||
          !c(function () {
            r.call(
              null,
              e ||
                function () {
                  throw 1;
                },
              1
            );
          })
        );
      },
      Ft = Dt.forEach,
      Vt = Pt("forEach")
        ? function (t) {
            return Ft(this, t, arguments.length > 1 ? arguments[1] : void 0);
          }
        : [].forEach;
    At(
      { target: "Array", proto: !0, forced: [].forEach != Vt },
      { forEach: Vt }
    );
    var Xt = {
      CSSRuleList: 0,
      CSSStyleDeclaration: 0,
      CSSValueList: 0,
      ClientRectList: 0,
      DOMRectList: 0,
      DOMStringList: 0,
      DOMTokenList: 1,
      DataTransferItemList: 0,
      FileList: 0,
      HTMLAllCollection: 0,
      HTMLCollection: 0,
      HTMLFormElement: 0,
      HTMLSelectElement: 0,
      MediaList: 0,
      MimeTypeArray: 0,
      NamedNodeMap: 0,
      NodeList: 1,
      PaintRequestList: 0,
      Plugin: 0,
      PluginArray: 0,
      SVGLengthList: 0,
      SVGNumberList: 0,
      SVGPathSegList: 0,
      SVGPointList: 0,
      SVGStringList: 0,
      SVGTransformList: 0,
      SourceBufferList: 0,
      StyleSheetList: 0,
      TextTrackCueList: 0,
      TextTrackList: 0,
      TouchList: 0,
    };
    for (var Ht in Xt) {
      var qt = a[Ht],
        $t = qt && qt.prototype;
      if ($t && $t.forEach !== Vt)
        try {
          C($t, "forEach", Vt);
        } catch (t) {
          $t.forEach = Vt;
        }
    }
    var Yt = !(
        "undefined" == typeof window ||
        !window.document ||
        !window.document.createElement
      ),
      Gt = Wt("species"),
      Ut = Dt.filter;
    At(
      {
        target: "Array",
        proto: !0,
        forced: !(function (t) {
          return !c(function () {
            var e = [];
            return (
              ((e.constructor = {})[Gt] = function () {
                return { foo: 1 };
              }),
              1 !== e[t](Boolean).foo
            );
          });
        })("filter"),
      },
      {
        filter: function (t) {
          return Ut(this, t, arguments.length > 1 ? arguments[1] : void 0);
        },
      }
    );
    var Qt =
        Object.keys ||
        function (t) {
          return ft(t, ht);
        },
      Kt = l
        ? Object.defineProperties
        : function (t, e) {
            R(t);
            for (var r, i = Qt(e), n = i.length, o = 0; n > o; )
              M.f(t, (r = i[o++]), e[r]);
            return t;
          },
      Jt = et("document", "documentElement"),
      Zt = X("IE_PROTO"),
      te = function () {},
      ee = function () {
        var t,
          e = A("iframe"),
          r = ht.length;
        for (
          e.style.display = "none",
            Jt.appendChild(e),
            e.src = String("javascript:"),
            (t = e.contentWindow.document).open(),
            t.write("<script>document.F=Object</script>"),
            t.close(),
            ee = t.F;
          r--;

        )
          delete ee.prototype[ht[r]];
        return ee();
      },
      re =
        Object.create ||
        function (t, e) {
          var r;
          return (
            null !== t
              ? ((te.prototype = R(t)),
                (r = new te()),
                (te.prototype = null),
                (r[Zt] = t))
              : (r = ee()),
            void 0 === e ? r : Kt(r, e)
          );
        };
    H[Zt] = !0;
    var ie = Wt("unscopables"),
      ne = Array.prototype;
    null == ne[ie] && C(ne, ie, re(null));
    var oe,
      se,
      ae,
      ce = function (t) {
        ne[ie][t] = !0;
      },
      le = {},
      ue = !c(function () {
        function t() {}
        return (
          (t.prototype.constructor = null),
          Object.getPrototypeOf(new t()) !== t.prototype
        );
      }),
      fe = X("IE_PROTO"),
      he = Object.prototype,
      de = ue
        ? Object.getPrototypeOf
        : function (t) {
            return (
              (t = zt(t)),
              S(t, fe)
                ? t[fe]
                : "function" == typeof t.constructor &&
                  t instanceof t.constructor
                ? t.constructor.prototype
                : t instanceof Object
                ? he
                : null
            );
          },
      pe = Wt("iterator"),
      ve = !1;
    [].keys &&
      ("next" in (ae = [].keys())
        ? (se = de(de(ae))) !== Object.prototype && (oe = se)
        : (ve = !0)),
      null == oe && (oe = {}),
      S(oe, pe) ||
        C(oe, pe, function () {
          return this;
        });
    var ge = { IteratorPrototype: oe, BUGGY_SAFARI_ITERATORS: ve },
      be = M.f,
      ye = Wt("toStringTag"),
      me = function (t, e, r) {
        t &&
          !S((t = r ? t : t.prototype), ye) &&
          be(t, ye, { configurable: !0, value: e });
      },
      xe = ge.IteratorPrototype,
      Ee = function () {
        return this;
      },
      we =
        Object.setPrototypeOf ||
        ("__proto__" in {}
          ? (function () {
              var t,
                e = !1,
                r = {};
              try {
                (t = Object.getOwnPropertyDescriptor(
                  Object.prototype,
                  "__proto__"
                ).set).call(r, []),
                  (e = r instanceof Array);
              } catch (t) {}
              return function (r, i) {
                return (
                  R(r),
                  (function (t) {
                    if (!x(t) && null !== t)
                      throw TypeError(
                        "Can't set " + String(t) + " as a prototype"
                      );
                  })(i),
                  e ? t.call(r, i) : (r.__proto__ = i),
                  r
                );
              };
            })()
          : void 0),
      Se = ge.IteratorPrototype,
      Oe = ge.BUGGY_SAFARI_ITERATORS,
      ke = Wt("iterator"),
      Ae = function () {
        return this;
      },
      Te = function (t, e, r, i, n, o, s) {
        !(function (t, e, r) {
          var i = e + " Iterator";
          (t.prototype = re(xe, { next: d(1, r) })), me(t, i, !1), (le[i] = Ee);
        })(r, e, i);
        var a,
          c,
          l,
          u = function (t) {
            if (t === n && g) return g;
            if (!Oe && t in p) return p[t];
            switch (t) {
              case "keys":
              case "values":
              case "entries":
                return function () {
                  return new r(this, t);
                };
            }
            return function () {
              return new r(this);
            };
          },
          f = e + " Iterator",
          h = !1,
          p = t.prototype,
          v = p[ke] || p["@@iterator"] || (n && p[n]),
          g = (!Oe && v) || u(n),
          b = ("Array" == e && p.entries) || v;
        if (
          (b &&
            ((a = de(b.call(new t()))),
            Se !== Object.prototype &&
              a.next &&
              (de(a) !== Se &&
                (we ? we(a, Se) : "function" != typeof a[ke] && C(a, ke, Ae)),
              me(a, f, !0))),
          "values" == n &&
            v &&
            "values" !== v.name &&
            ((h = !0),
            (g = function () {
              return v.call(this);
            })),
          p[ke] !== g && C(p, ke, g),
          (le[e] = g),
          n)
        )
          if (
            ((c = {
              values: u("values"),
              keys: o ? g : u("keys"),
              entries: u("entries"),
            }),
            s)
          )
            for (l in c) (!Oe && !h && l in p) || J(p, l, c[l]);
          else At({ target: e, proto: !0, forced: Oe || h }, c);
        return c;
      },
      Le = K.set,
      ze = K.getterFor("Array Iterator"),
      Re = Te(
        Array,
        "Array",
        function (t, e) {
          Le(this, { type: "Array Iterator", target: m(t), index: 0, kind: e });
        },
        function () {
          var t = ze(this),
            e = t.target,
            r = t.kind,
            i = t.index++;
          return !e || i >= e.length
            ? ((t.target = void 0), { value: void 0, done: !0 })
            : "keys" == r
            ? { value: i, done: !1 }
            : "values" == r
            ? { value: e[i], done: !1 }
            : { value: [i, e[i]], done: !1 };
        },
        "values"
      );
    (le.Arguments = le.Array), ce("keys"), ce("values"), ce("entries");
    var _e = Object.assign,
      Me =
        !_e ||
        c(function () {
          var t = {},
            e = {},
            r = Symbol();
          return (
            (t[r] = 7),
            "abcdefghijklmnopqrst".split("").forEach(function (t) {
              e[t] = t;
            }),
            7 != _e({}, t)[r] ||
              "abcdefghijklmnopqrst" != Qt(_e({}, e)).join("")
          );
        })
          ? function (t, e) {
              for (
                var r = zt(t), i = arguments.length, n = 1, o = vt.f, s = h.f;
                i > n;

              )
                for (
                  var a,
                    c = b(arguments[n++]),
                    u = o ? Qt(c).concat(o(c)) : Qt(c),
                    f = u.length,
                    d = 0;
                  f > d;

                )
                  (a = u[d++]), (l && !s.call(c, a)) || (r[a] = c[a]);
              return r;
            }
          : _e;
    At(
      { target: "Object", stat: !0, forced: Object.assign !== Me },
      { assign: Me }
    );
    var Ce = Wt("toStringTag"),
      We =
        "Arguments" ==
        v(
          (function () {
            return arguments;
          })()
        ),
      je = function (t) {
        var e, r, i;
        return void 0 === t
          ? "Undefined"
          : null === t
          ? "Null"
          : "string" ==
            typeof (r = (function (t, e) {
              try {
                return t[e];
              } catch (t) {}
            })((e = Object(t)), Ce))
          ? r
          : We
          ? v(e)
          : "Object" == (i = v(e)) && "function" == typeof e.callee
          ? "Arguments"
          : i;
      },
      Ne = {};
    Ne[Wt("toStringTag")] = "z";
    var Ie =
        "[object z]" !== String(Ne)
          ? function () {
              return "[object " + je(this) + "]";
            }
          : Ne.toString,
      Be = Object.prototype;
    Ie !== Be.toString && J(Be, "toString", Ie, { unsafe: !0 });
    var De = "\t\n\v\f\r                　\u2028\u2029\ufeff",
      Pe = "[" + De + "]",
      Fe = RegExp("^" + Pe + Pe + "*"),
      Ve = RegExp(Pe + Pe + "*$"),
      Xe = function (t) {
        return function (e) {
          var r = String(y(e));
          return (
            1 & t && (r = r.replace(Fe, "")),
            2 & t && (r = r.replace(Ve, "")),
            r
          );
        };
      },
      He = { start: Xe(1), end: Xe(2), trim: Xe(3) }.trim,
      qe = a.parseInt,
      $e = /^[+-]?0[Xx]/,
      Ye =
        8 !== qe(De + "08") || 22 !== qe(De + "0x16")
          ? function (t, e) {
              var r = He(String(t));
              return qe(r, e >>> 0 || ($e.test(r) ? 16 : 10));
            }
          : qe;
    At({ global: !0, forced: parseInt != Ye }, { parseInt: Ye });
    var Ge = function (t) {
        return function (e, r) {
          var i,
            n,
            o = String(y(e)),
            s = nt(r),
            a = o.length;
          return s < 0 || s >= a
            ? t
              ? ""
              : void 0
            : (i = o.charCodeAt(s)) < 55296 ||
              i > 56319 ||
              s + 1 === a ||
              (n = o.charCodeAt(s + 1)) < 56320 ||
              n > 57343
            ? t
              ? o.charAt(s)
              : i
            : t
            ? o.slice(s, s + 2)
            : n - 56320 + ((i - 55296) << 10) + 65536;
        };
      },
      Ue = { codeAt: Ge(!1), charAt: Ge(!0) },
      Qe = Ue.charAt,
      Ke = K.set,
      Je = K.getterFor("String Iterator");
    Te(
      String,
      "String",
      function (t) {
        Ke(this, { type: "String Iterator", string: String(t), index: 0 });
      },
      function () {
        var t,
          e = Je(this),
          r = e.string,
          i = e.index;
        return i >= r.length
          ? { value: void 0, done: !0 }
          : ((t = Qe(r, i)), (e.index += t.length), { value: t, done: !1 });
      }
    );
    var Ze = function (t, e, r) {
        for (var i in e) J(t, i, e[i], r);
        return t;
      },
      tr = !c(function () {
        return Object.isExtensible(Object.preventExtensions({}));
      }),
      er = e(function (t) {
        var e = M.f,
          r = F("meta"),
          i = 0,
          n =
            Object.isExtensible ||
            function () {
              return !0;
            },
          o = function (t) {
            e(t, r, { value: { objectID: "O" + ++i, weakData: {} } });
          },
          s = (t.exports = {
            REQUIRED: !1,
            fastKey: function (t, e) {
              if (!x(t))
                return "symbol" == typeof t
                  ? t
                  : ("string" == typeof t ? "S" : "P") + t;
              if (!S(t, r)) {
                if (!n(t)) return "F";
                if (!e) return "E";
                o(t);
              }
              return t[r].objectID;
            },
            getWeakData: function (t, e) {
              if (!S(t, r)) {
                if (!n(t)) return !0;
                if (!e) return !1;
                o(t);
              }
              return t[r].weakData;
            },
            onFreeze: function (t) {
              return tr && s.REQUIRED && n(t) && !S(t, r) && o(t), t;
            },
          });
        H[r] = !0;
      }),
      rr =
        (er.REQUIRED, er.fastKey, er.getWeakData, er.onFreeze, Wt("iterator")),
      ir = Array.prototype,
      nr = Wt("iterator"),
      or = function (t, e, r, i) {
        try {
          return i ? e(R(r)[0], r[1]) : e(r);
        } catch (e) {
          var n = t.return;
          throw (void 0 !== n && R(n.call(t)), e);
        }
      },
      sr = e(function (t) {
        var e = function (t, e) {
          (this.stopped = t), (this.result = e);
        };
        (t.exports = function (t, r, i, n, o) {
          var s,
            a,
            c,
            l,
            u,
            f,
            h,
            d = Lt(r, i, n ? 2 : 1);
          if (o) s = t;
          else {
            if (
              "function" !=
              typeof (a = (function (t) {
                if (null != t) return t[nr] || t["@@iterator"] || le[je(t)];
              })(t))
            )
              throw TypeError("Target is not iterable");
            if (void 0 !== (h = a) && (le.Array === h || ir[rr] === h)) {
              for (c = 0, l = st(t.length); l > c; c++)
                if (
                  (u = n ? d(R((f = t[c]))[0], f[1]) : d(t[c])) &&
                  u instanceof e
                )
                  return u;
              return new e(!1);
            }
            s = a.call(t);
          }
          for (; !(f = s.next()).done; )
            if ((u = or(s, d, f.value, n)) && u instanceof e) return u;
          return new e(!1);
        }).stop = function (t) {
          return new e(!0, t);
        };
      }),
      ar = function (t, e, r) {
        if (!(t instanceof e))
          throw TypeError("Incorrect " + (r ? r + " " : "") + "invocation");
        return t;
      },
      cr = Wt("iterator"),
      lr = !1;
    try {
      var ur = 0,
        fr = {
          next: function () {
            return { done: !!ur++ };
          },
          return: function () {
            lr = !0;
          },
        };
      (fr[cr] = function () {
        return this;
      }),
        Array.from(fr, function () {
          throw 2;
        });
    } catch (t) {}
    var hr = function (t, e, r, i, n) {
        var o = a[t],
          s = o && o.prototype,
          l = o,
          u = i ? "set" : "add",
          f = {},
          h = function (t) {
            var e = s[t];
            J(
              s,
              t,
              "add" == t
                ? function (t) {
                    return e.call(this, 0 === t ? 0 : t), this;
                  }
                : "delete" == t
                ? function (t) {
                    return !(n && !x(t)) && e.call(this, 0 === t ? 0 : t);
                  }
                : "get" == t
                ? function (t) {
                    return n && !x(t) ? void 0 : e.call(this, 0 === t ? 0 : t);
                  }
                : "has" == t
                ? function (t) {
                    return !(n && !x(t)) && e.call(this, 0 === t ? 0 : t);
                  }
                : function (t, r) {
                    return e.call(this, 0 === t ? 0 : t, r), this;
                  }
            );
          };
        if (
          Ot(
            t,
            "function" != typeof o ||
              !(
                n ||
                (s.forEach &&
                  !c(function () {
                    new o().entries().next();
                  }))
              )
          )
        )
          (l = r.getConstructor(e, t, i, u)), (er.REQUIRED = !0);
        else if (Ot(t, !0)) {
          var d = new l(),
            p = d[u](n ? {} : -0, 1) != d,
            v = c(function () {
              d.has(1);
            }),
            g = (function (t, e) {
              if (!e && !lr) return !1;
              var r = !1;
              try {
                var i = {};
                (i[cr] = function () {
                  return {
                    next: function () {
                      return { done: (r = !0) };
                    },
                  };
                }),
                  t(i);
              } catch (t) {}
              return r;
            })(function (t) {
              new o(t);
            }),
            b =
              !n &&
              c(function () {
                for (var t = new o(), e = 5; e--; ) t[u](e, e);
                return !t.has(-0);
              });
          g ||
            (((l = e(function (e, r) {
              ar(e, l, t);
              var n = (function (t, e, r) {
                var i, n;
                return (
                  we &&
                    "function" == typeof (i = e.constructor) &&
                    i !== r &&
                    x((n = i.prototype)) &&
                    n !== r.prototype &&
                    we(t, n),
                  t
                );
              })(new o(), e, l);
              return null != r && sr(r, n[u], n, i), n;
            })).prototype = s),
            (s.constructor = l)),
            (v || b) && (h("delete"), h("has"), i && h("get")),
            (b || p) && h(u),
            n && s.clear && delete s.clear;
        }
        return (
          (f[t] = l),
          At({ global: !0, forced: l != o }, f),
          me(l, t),
          n || r.setStrong(l, t, i),
          l
        );
      },
      dr = er.getWeakData,
      pr = K.set,
      vr = K.getterFor,
      gr = Dt.find,
      br = Dt.findIndex,
      yr = 0,
      mr = function (t) {
        return t.frozen || (t.frozen = new xr());
      },
      xr = function () {
        this.entries = [];
      },
      Er = function (t, e) {
        return gr(t.entries, function (t) {
          return t[0] === e;
        });
      };
    xr.prototype = {
      get: function (t) {
        var e = Er(this, t);
        if (e) return e[1];
      },
      has: function (t) {
        return !!Er(this, t);
      },
      set: function (t, e) {
        var r = Er(this, t);
        r ? (r[1] = e) : this.entries.push([t, e]);
      },
      delete: function (t) {
        var e = br(this.entries, function (e) {
          return e[0] === t;
        });
        return ~e && this.entries.splice(e, 1), !!~e;
      },
    };
    var wr = {
        getConstructor: function (t, e, r, i) {
          var n = t(function (t, o) {
              ar(t, n, e),
                pr(t, { type: e, id: yr++, frozen: void 0 }),
                null != o && sr(o, t[i], t, r);
            }),
            o = vr(e),
            s = function (t, e, r) {
              var i = o(t),
                n = dr(R(e), !0);
              return !0 === n ? mr(i).set(e, r) : (n[i.id] = r), t;
            };
          return (
            Ze(n.prototype, {
              delete: function (t) {
                var e = o(this);
                if (!x(t)) return !1;
                var r = dr(t);
                return !0 === r
                  ? mr(e).delete(t)
                  : r && S(r, e.id) && delete r[e.id];
              },
              has: function (t) {
                var e = o(this);
                if (!x(t)) return !1;
                var r = dr(t);
                return !0 === r ? mr(e).has(t) : r && S(r, e.id);
              },
            }),
            Ze(
              n.prototype,
              r
                ? {
                    get: function (t) {
                      var e = o(this);
                      if (x(t)) {
                        var r = dr(t);
                        return !0 === r ? mr(e).get(t) : r ? r[e.id] : void 0;
                      }
                    },
                    set: function (t, e) {
                      return s(this, t, e);
                    },
                  }
                : {
                    add: function (t) {
                      return s(this, t, !0);
                    },
                  }
            ),
            n
          );
        },
      },
      Sr =
        (e(function (t) {
          var e,
            r = K.enforce,
            i = !a.ActiveXObject && "ActiveXObject" in a,
            n = Object.isExtensible,
            o = function (t) {
              return function () {
                return t(this, arguments.length ? arguments[0] : void 0);
              };
            },
            s = (t.exports = hr("WeakMap", o, wr, !0, !0));
          if (B && i) {
            (e = wr.getConstructor(o, "WeakMap", !0)), (er.REQUIRED = !0);
            var c = s.prototype,
              l = c.delete,
              u = c.has,
              f = c.get,
              h = c.set;
            Ze(c, {
              delete: function (t) {
                if (x(t) && !n(t)) {
                  var i = r(this);
                  return (
                    i.frozen || (i.frozen = new e()),
                    l.call(this, t) || i.frozen.delete(t)
                  );
                }
                return l.call(this, t);
              },
              has: function (t) {
                if (x(t) && !n(t)) {
                  var i = r(this);
                  return (
                    i.frozen || (i.frozen = new e()),
                    u.call(this, t) || i.frozen.has(t)
                  );
                }
                return u.call(this, t);
              },
              get: function (t) {
                if (x(t) && !n(t)) {
                  var i = r(this);
                  return (
                    i.frozen || (i.frozen = new e()),
                    u.call(this, t) ? f.call(this, t) : i.frozen.get(t)
                  );
                }
                return f.call(this, t);
              },
              set: function (t, i) {
                if (x(t) && !n(t)) {
                  var o = r(this);
                  o.frozen || (o.frozen = new e()),
                    u.call(this, t) ? h.call(this, t, i) : o.frozen.set(t, i);
                } else h.call(this, t, i);
                return this;
              },
            });
          }
        }),
        Wt("iterator")),
      Or = Wt("toStringTag"),
      kr = Re.values;
    for (var Ar in Xt) {
      var Tr = a[Ar],
        Lr = Tr && Tr.prototype;
      if (Lr) {
        if (Lr[Sr] !== kr)
          try {
            C(Lr, Sr, kr);
          } catch (t) {
            Lr[Sr] = kr;
          }
        if ((Lr[Or] || C(Lr, Or, Ar), Xt[Ar]))
          for (var zr in Re)
            if (Lr[zr] !== Re[zr])
              try {
                C(Lr, zr, Re[zr]);
              } catch (t) {
                Lr[zr] = Re[zr];
              }
      }
    }
    var Rr = "Expected a function",
      _r = NaN,
      Mr = "[object Symbol]",
      Cr = /^\s+|\s+$/g,
      Wr = /^[-+]0x[0-9a-f]+$/i,
      jr = /^0b[01]+$/i,
      Nr = /^0o[0-7]+$/i,
      Ir = parseInt,
      Br = "object" == typeof t && t && t.Object === Object && t,
      Dr = "object" == typeof self && self && self.Object === Object && self,
      Pr = Br || Dr || Function("return this")(),
      Fr = Object.prototype.toString,
      Vr = Math.max,
      Xr = Math.min,
      Hr = function () {
        return Pr.Date.now();
      };
    function qr(t, e, r) {
      var i,
        n,
        o,
        s,
        a,
        c,
        l = 0,
        u = !1,
        f = !1,
        h = !0;
      if ("function" != typeof t) throw new TypeError(Rr);
      function d(e) {
        var r = i,
          o = n;
        return (i = n = void 0), (l = e), (s = t.apply(o, r));
      }
      function p(t) {
        var r = t - c;
        return void 0 === c || r >= e || r < 0 || (f && t - l >= o);
      }
      function v() {
        var t = Hr();
        if (p(t)) return g(t);
        a = setTimeout(
          v,
          (function (t) {
            var r = e - (t - c);
            return f ? Xr(r, o - (t - l)) : r;
          })(t)
        );
      }
      function g(t) {
        return (a = void 0), h && i ? d(t) : ((i = n = void 0), s);
      }
      function b() {
        var t = Hr(),
          r = p(t);
        if (((i = arguments), (n = this), (c = t), r)) {
          if (void 0 === a)
            return (function (t) {
              return (l = t), (a = setTimeout(v, e)), u ? d(t) : s;
            })(c);
          if (f) return (a = setTimeout(v, e)), d(c);
        }
        return void 0 === a && (a = setTimeout(v, e)), s;
      }
      return (
        (e = Yr(e) || 0),
        $r(r) &&
          ((u = !!r.leading),
          (o = (f = "maxWait" in r) ? Vr(Yr(r.maxWait) || 0, e) : o),
          (h = "trailing" in r ? !!r.trailing : h)),
        (b.cancel = function () {
          void 0 !== a && clearTimeout(a), (l = 0), (i = c = n = a = void 0);
        }),
        (b.flush = function () {
          return void 0 === a ? s : g(Hr());
        }),
        b
      );
    }
    function $r(t) {
      var e = typeof t;
      return !!t && ("object" == e || "function" == e);
    }
    function Yr(t) {
      if ("number" == typeof t) return t;
      if (
        (function (t) {
          return (
            "symbol" == typeof t ||
            ((function (t) {
              return !!t && "object" == typeof t;
            })(t) &&
              Fr.call(t) == Mr)
          );
        })(t)
      )
        return _r;
      if ($r(t)) {
        var e = "function" == typeof t.valueOf ? t.valueOf() : t;
        t = $r(e) ? e + "" : e;
      }
      if ("string" != typeof t) return 0 === t ? t : +t;
      t = t.replace(Cr, "");
      var r = jr.test(t);
      return r || Nr.test(t) ? Ir(t.slice(2), r ? 2 : 8) : Wr.test(t) ? _r : +t;
    }
    var Gr = function (t, e, r) {
        var i = !0,
          n = !0;
        if ("function" != typeof t) throw new TypeError(Rr);
        return (
          $r(r) &&
            ((i = "leading" in r ? !!r.leading : i),
            (n = "trailing" in r ? !!r.trailing : n)),
          qr(t, e, { leading: i, maxWait: e, trailing: n })
        );
      },
      Ur = "Expected a function",
      Qr = NaN,
      Kr = "[object Symbol]",
      Jr = /^\s+|\s+$/g,
      Zr = /^[-+]0x[0-9a-f]+$/i,
      ti = /^0b[01]+$/i,
      ei = /^0o[0-7]+$/i,
      ri = parseInt,
      ii = "object" == typeof t && t && t.Object === Object && t,
      ni = "object" == typeof self && self && self.Object === Object && self,
      oi = ii || ni || Function("return this")(),
      si = Object.prototype.toString,
      ai = Math.max,
      ci = Math.min,
      li = function () {
        return oi.Date.now();
      };
    function ui(t) {
      var e = typeof t;
      return !!t && ("object" == e || "function" == e);
    }
    function fi(t) {
      if ("number" == typeof t) return t;
      if (
        (function (t) {
          return (
            "symbol" == typeof t ||
            ((function (t) {
              return !!t && "object" == typeof t;
            })(t) &&
              si.call(t) == Kr)
          );
        })(t)
      )
        return Qr;
      if (ui(t)) {
        var e = "function" == typeof t.valueOf ? t.valueOf() : t;
        t = ui(e) ? e + "" : e;
      }
      if ("string" != typeof t) return 0 === t ? t : +t;
      t = t.replace(Jr, "");
      var r = ti.test(t);
      return r || ei.test(t) ? ri(t.slice(2), r ? 2 : 8) : Zr.test(t) ? Qr : +t;
    }
    var hi = function (t, e, r) {
        var i,
          n,
          o,
          s,
          a,
          c,
          l = 0,
          u = !1,
          f = !1,
          h = !0;
        if ("function" != typeof t) throw new TypeError(Ur);
        function d(e) {
          var r = i,
            o = n;
          return (i = n = void 0), (l = e), (s = t.apply(o, r));
        }
        function p(t) {
          var r = t - c;
          return void 0 === c || r >= e || r < 0 || (f && t - l >= o);
        }
        function v() {
          var t = li();
          if (p(t)) return g(t);
          a = setTimeout(
            v,
            (function (t) {
              var r = e - (t - c);
              return f ? ci(r, o - (t - l)) : r;
            })(t)
          );
        }
        function g(t) {
          return (a = void 0), h && i ? d(t) : ((i = n = void 0), s);
        }
        function b() {
          var t = li(),
            r = p(t);
          if (((i = arguments), (n = this), (c = t), r)) {
            if (void 0 === a)
              return (function (t) {
                return (l = t), (a = setTimeout(v, e)), u ? d(t) : s;
              })(c);
            if (f) return (a = setTimeout(v, e)), d(c);
          }
          return void 0 === a && (a = setTimeout(v, e)), s;
        }
        return (
          (e = fi(e) || 0),
          ui(r) &&
            ((u = !!r.leading),
            (o = (f = "maxWait" in r) ? ai(fi(r.maxWait) || 0, e) : o),
            (h = "trailing" in r ? !!r.trailing : h)),
          (b.cancel = function () {
            void 0 !== a && clearTimeout(a), (l = 0), (i = c = n = a = void 0);
          }),
          (b.flush = function () {
            return void 0 === a ? s : g(li());
          }),
          b
        );
      },
      di = "Expected a function",
      pi = "__lodash_hash_undefined__",
      vi = "[object Function]",
      gi = "[object GeneratorFunction]",
      bi = /^\[object .+?Constructor\]$/,
      yi = "object" == typeof t && t && t.Object === Object && t,
      mi = "object" == typeof self && self && self.Object === Object && self,
      xi = yi || mi || Function("return this")();
    var Ei = Array.prototype,
      wi = Function.prototype,
      Si = Object.prototype,
      Oi = xi["__core-js_shared__"],
      ki = (function () {
        var t = /[^.]+$/.exec((Oi && Oi.keys && Oi.keys.IE_PROTO) || "");
        return t ? "Symbol(src)_1." + t : "";
      })(),
      Ai = wi.toString,
      Ti = Si.hasOwnProperty,
      Li = Si.toString,
      zi = RegExp(
        "^" +
          Ai.call(Ti)
            .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              "$1.*?"
            ) +
          "$"
      ),
      Ri = Ei.splice,
      _i = Di(xi, "Map"),
      Mi = Di(Object, "create");
    function Ci(t) {
      var e = -1,
        r = t ? t.length : 0;
      for (this.clear(); ++e < r; ) {
        var i = t[e];
        this.set(i[0], i[1]);
      }
    }
    function Wi(t) {
      var e = -1,
        r = t ? t.length : 0;
      for (this.clear(); ++e < r; ) {
        var i = t[e];
        this.set(i[0], i[1]);
      }
    }
    function ji(t) {
      var e = -1,
        r = t ? t.length : 0;
      for (this.clear(); ++e < r; ) {
        var i = t[e];
        this.set(i[0], i[1]);
      }
    }
    function Ni(t, e) {
      for (var r, i, n = t.length; n--; )
        if ((r = t[n][0]) === (i = e) || (r != r && i != i)) return n;
      return -1;
    }
    function Ii(t) {
      return (
        !(!Fi(t) || ((e = t), ki && ki in e)) &&
        ((function (t) {
          var e = Fi(t) ? Li.call(t) : "";
          return e == vi || e == gi;
        })(t) ||
        (function (t) {
          var e = !1;
          if (null != t && "function" != typeof t.toString)
            try {
              e = !!(t + "");
            } catch (t) {}
          return e;
        })(t)
          ? zi
          : bi
        ).test(
          (function (t) {
            if (null != t) {
              try {
                return Ai.call(t);
              } catch (t) {}
              try {
                return t + "";
              } catch (t) {}
            }
            return "";
          })(t)
        )
      );
      var e;
    }
    function Bi(t, e) {
      var r,
        i,
        n = t.__data__;
      return (
        "string" == (i = typeof (r = e)) ||
        "number" == i ||
        "symbol" == i ||
        "boolean" == i
          ? "__proto__" !== r
          : null === r
      )
        ? n["string" == typeof e ? "string" : "hash"]
        : n.map;
    }
    function Di(t, e) {
      var r = (function (t, e) {
        return null == t ? void 0 : t[e];
      })(t, e);
      return Ii(r) ? r : void 0;
    }
    function Pi(t, e) {
      if ("function" != typeof t || (e && "function" != typeof e))
        throw new TypeError(di);
      var r = function () {
        var i = arguments,
          n = e ? e.apply(this, i) : i[0],
          o = r.cache;
        if (o.has(n)) return o.get(n);
        var s = t.apply(this, i);
        return (r.cache = o.set(n, s)), s;
      };
      return (r.cache = new (Pi.Cache || ji)()), r;
    }
    function Fi(t) {
      var e = typeof t;
      return !!t && ("object" == e || "function" == e);
    }
    (Ci.prototype.clear = function () {
      this.__data__ = Mi ? Mi(null) : {};
    }),
      (Ci.prototype.delete = function (t) {
        return this.has(t) && delete this.__data__[t];
      }),
      (Ci.prototype.get = function (t) {
        var e = this.__data__;
        if (Mi) {
          var r = e[t];
          return r === pi ? void 0 : r;
        }
        return Ti.call(e, t) ? e[t] : void 0;
      }),
      (Ci.prototype.has = function (t) {
        var e = this.__data__;
        return Mi ? void 0 !== e[t] : Ti.call(e, t);
      }),
      (Ci.prototype.set = function (t, e) {
        return (this.__data__[t] = Mi && void 0 === e ? pi : e), this;
      }),
      (Wi.prototype.clear = function () {
        this.__data__ = [];
      }),
      (Wi.prototype.delete = function (t) {
        var e = this.__data__,
          r = Ni(e, t);
        return !(r < 0) && (r == e.length - 1 ? e.pop() : Ri.call(e, r, 1), !0);
      }),
      (Wi.prototype.get = function (t) {
        var e = this.__data__,
          r = Ni(e, t);
        return r < 0 ? void 0 : e[r][1];
      }),
      (Wi.prototype.has = function (t) {
        return Ni(this.__data__, t) > -1;
      }),
      (Wi.prototype.set = function (t, e) {
        var r = this.__data__,
          i = Ni(r, t);
        return i < 0 ? r.push([t, e]) : (r[i][1] = e), this;
      }),
      (ji.prototype.clear = function () {
        this.__data__ = {
          hash: new Ci(),
          map: new (_i || Wi)(),
          string: new Ci(),
        };
      }),
      (ji.prototype.delete = function (t) {
        return Bi(this, t).delete(t);
      }),
      (ji.prototype.get = function (t) {
        return Bi(this, t).get(t);
      }),
      (ji.prototype.has = function (t) {
        return Bi(this, t).has(t);
      }),
      (ji.prototype.set = function (t, e) {
        return Bi(this, t).set(t, e), this;
      }),
      (Pi.Cache = ji);
    var Vi,
      Xi = Pi,
      Hi = [],
      qi = "ResizeObserver loop completed with undelivered notifications.";
    !(function (t) {
      (t.BORDER_BOX = "border-box"),
        (t.CONTENT_BOX = "content-box"),
        (t.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box");
    })(Vi || (Vi = {}));
    var $i,
      Yi = function (t) {
        return Object.freeze(t);
      },
      Gi = function (t, e) {
        (this.inlineSize = t), (this.blockSize = e), Yi(this);
      },
      Ui = (function () {
        function t(t, e, r, i) {
          return (
            (this.x = t),
            (this.y = e),
            (this.width = r),
            (this.height = i),
            (this.top = this.y),
            (this.left = this.x),
            (this.bottom = this.top + this.height),
            (this.right = this.left + this.width),
            Yi(this)
          );
        }
        return (
          (t.prototype.toJSON = function () {
            var t = this;
            return {
              x: t.x,
              y: t.y,
              top: t.top,
              right: t.right,
              bottom: t.bottom,
              left: t.left,
              width: t.width,
              height: t.height,
            };
          }),
          (t.fromRect = function (e) {
            return new t(e.x, e.y, e.width, e.height);
          }),
          t
        );
      })(),
      Qi = function (t) {
        return t instanceof SVGElement && "getBBox" in t;
      },
      Ki = function (t) {
        if (Qi(t)) {
          var e = t.getBBox(),
            r = e.width,
            i = e.height;
          return !r && !i;
        }
        var n = t,
          o = n.offsetWidth,
          s = n.offsetHeight;
        return !(o || s || t.getClientRects().length);
      },
      Ji = function (t) {
        var e, r;
        if (t instanceof Element) return !0;
        var i =
          null ===
            (r = null === (e = t) || void 0 === e ? void 0 : e.ownerDocument) ||
          void 0 === r
            ? void 0
            : r.defaultView;
        return !!(i && t instanceof i.Element);
      },
      Zi = "undefined" != typeof window ? window : {},
      tn = new WeakMap(),
      en = /auto|scroll/,
      rn = /^tb|vertical/,
      nn = /msie|trident/i.test(Zi.navigator && Zi.navigator.userAgent),
      on = function (t) {
        return parseFloat(t || "0");
      },
      sn = function (t, e, r) {
        return (
          void 0 === t && (t = 0),
          void 0 === e && (e = 0),
          void 0 === r && (r = !1),
          new Gi((r ? e : t) || 0, (r ? t : e) || 0)
        );
      },
      an = Yi({
        devicePixelContentBoxSize: sn(),
        borderBoxSize: sn(),
        contentBoxSize: sn(),
        contentRect: new Ui(0, 0, 0, 0),
      }),
      cn = function (t, e) {
        if ((void 0 === e && (e = !1), tn.has(t) && !e)) return tn.get(t);
        if (Ki(t)) return tn.set(t, an), an;
        var r = getComputedStyle(t),
          i = Qi(t) && t.ownerSVGElement && t.getBBox(),
          n = !nn && "border-box" === r.boxSizing,
          o = rn.test(r.writingMode || ""),
          s = !i && en.test(r.overflowY || ""),
          a = !i && en.test(r.overflowX || ""),
          c = i ? 0 : on(r.paddingTop),
          l = i ? 0 : on(r.paddingRight),
          u = i ? 0 : on(r.paddingBottom),
          f = i ? 0 : on(r.paddingLeft),
          h = i ? 0 : on(r.borderTopWidth),
          d = i ? 0 : on(r.borderRightWidth),
          p = i ? 0 : on(r.borderBottomWidth),
          v = f + l,
          g = c + u,
          b = (i ? 0 : on(r.borderLeftWidth)) + d,
          y = h + p,
          m = a ? t.offsetHeight - y - t.clientHeight : 0,
          x = s ? t.offsetWidth - b - t.clientWidth : 0,
          E = n ? v + b : 0,
          w = n ? g + y : 0,
          S = i ? i.width : on(r.width) - E - x,
          O = i ? i.height : on(r.height) - w - m,
          k = S + v + x + b,
          A = O + g + m + y,
          T = Yi({
            devicePixelContentBoxSize: sn(
              Math.round(S * devicePixelRatio),
              Math.round(O * devicePixelRatio),
              o
            ),
            borderBoxSize: sn(k, A, o),
            contentBoxSize: sn(S, O, o),
            contentRect: new Ui(f, c, S, O),
          });
        return tn.set(t, T), T;
      },
      ln = function (t, e, r) {
        var i = cn(t, r),
          n = i.borderBoxSize,
          o = i.contentBoxSize,
          s = i.devicePixelContentBoxSize;
        switch (e) {
          case Vi.DEVICE_PIXEL_CONTENT_BOX:
            return s;
          case Vi.BORDER_BOX:
            return n;
          default:
            return o;
        }
      },
      un = function (t) {
        var e = cn(t);
        (this.target = t),
          (this.contentRect = e.contentRect),
          (this.borderBoxSize = Yi([e.borderBoxSize])),
          (this.contentBoxSize = Yi([e.contentBoxSize])),
          (this.devicePixelContentBoxSize = Yi([e.devicePixelContentBoxSize]));
      },
      fn = function (t) {
        if (Ki(t)) return 1 / 0;
        for (var e = 0, r = t.parentNode; r; ) (e += 1), (r = r.parentNode);
        return e;
      },
      hn = function () {
        var t = 1 / 0,
          e = [];
        Hi.forEach(function (r) {
          if (0 !== r.activeTargets.length) {
            var i = [];
            r.activeTargets.forEach(function (e) {
              var r = new un(e.target),
                n = fn(e.target);
              i.push(r),
                (e.lastReportedSize = ln(e.target, e.observedBox)),
                n < t && (t = n);
            }),
              e.push(function () {
                r.callback.call(r.observer, i, r.observer);
              }),
              r.activeTargets.splice(0, r.activeTargets.length);
          }
        });
        for (var r = 0, i = e; r < i.length; r++) {
          (0, i[r])();
        }
        return t;
      },
      dn = function (t) {
        Hi.forEach(function (e) {
          e.activeTargets.splice(0, e.activeTargets.length),
            e.skippedTargets.splice(0, e.skippedTargets.length),
            e.observationTargets.forEach(function (r) {
              r.isActive() &&
                (fn(r.target) > t
                  ? e.activeTargets.push(r)
                  : e.skippedTargets.push(r));
            });
        });
      },
      pn = function () {
        var t,
          e = 0;
        for (
          dn(e);
          Hi.some(function (t) {
            return t.activeTargets.length > 0;
          });

        )
          (e = hn()), dn(e);
        return (
          Hi.some(function (t) {
            return t.skippedTargets.length > 0;
          }) &&
            ("function" == typeof ErrorEvent
              ? (t = new ErrorEvent("error", { message: qi }))
              : ((t = document.createEvent("Event")).initEvent("error", !1, !1),
                (t.message = qi)),
            window.dispatchEvent(t)),
          e > 0
        );
      },
      vn = [],
      gn = function (t) {
        if (!$i) {
          var e = 0,
            r = document.createTextNode("");
          new MutationObserver(function () {
            return vn.splice(0).forEach(function (t) {
              return t();
            });
          }).observe(r, { characterData: !0 }),
            ($i = function () {
              r.textContent = "" + (e ? e-- : e++);
            });
        }
        vn.push(t), $i();
      },
      bn = 0,
      yn = { attributes: !0, characterData: !0, childList: !0, subtree: !0 },
      mn = [
        "resize",
        "load",
        "transitionend",
        "animationend",
        "animationstart",
        "animationiteration",
        "keyup",
        "keydown",
        "mouseup",
        "mousedown",
        "mouseover",
        "mouseout",
        "blur",
        "focus",
      ],
      xn = function (t) {
        return void 0 === t && (t = 0), Date.now() + t;
      },
      En = !1,
      wn = new ((function () {
        function t() {
          var t = this;
          (this.stopped = !0),
            (this.listener = function () {
              return t.schedule();
            });
        }
        return (
          (t.prototype.run = function (t) {
            var e = this;
            if ((void 0 === t && (t = 250), !En)) {
              En = !0;
              var r,
                i = xn(t);
              (r = function () {
                var r = !1;
                try {
                  r = pn();
                } finally {
                  if (((En = !1), (t = i - xn()), !bn)) return;
                  r ? e.run(1e3) : t > 0 ? e.run(t) : e.start();
                }
              }),
                gn(function () {
                  requestAnimationFrame(r);
                });
            }
          }),
          (t.prototype.schedule = function () {
            this.stop(), this.run();
          }),
          (t.prototype.observe = function () {
            var t = this,
              e = function () {
                return t.observer && t.observer.observe(document.body, yn);
              };
            document.body ? e() : Zi.addEventListener("DOMContentLoaded", e);
          }),
          (t.prototype.start = function () {
            var t = this;
            this.stopped &&
              ((this.stopped = !1),
              (this.observer = new MutationObserver(this.listener)),
              this.observe(),
              mn.forEach(function (e) {
                return Zi.addEventListener(e, t.listener, !0);
              }));
          }),
          (t.prototype.stop = function () {
            var t = this;
            this.stopped ||
              (this.observer && this.observer.disconnect(),
              mn.forEach(function (e) {
                return Zi.removeEventListener(e, t.listener, !0);
              }),
              (this.stopped = !0));
          }),
          t
        );
      })())(),
      Sn = function (t) {
        !bn && t > 0 && wn.start(), !(bn += t) && wn.stop();
      },
      On = (function () {
        function t(t, e) {
          (this.target = t),
            (this.observedBox = e || Vi.CONTENT_BOX),
            (this.lastReportedSize = { inlineSize: 0, blockSize: 0 });
        }
        return (
          (t.prototype.isActive = function () {
            var t,
              e = ln(this.target, this.observedBox, !0);
            return (
              (t = this.target),
              Qi(t) ||
                (function (t) {
                  switch (t.tagName) {
                    case "INPUT":
                      if ("image" !== t.type) break;
                    case "VIDEO":
                    case "AUDIO":
                    case "EMBED":
                    case "OBJECT":
                    case "CANVAS":
                    case "IFRAME":
                    case "IMG":
                      return !0;
                  }
                  return !1;
                })(t) ||
                "inline" !== getComputedStyle(t).display ||
                (this.lastReportedSize = e),
              this.lastReportedSize.inlineSize !== e.inlineSize ||
                this.lastReportedSize.blockSize !== e.blockSize
            );
          }),
          t
        );
      })(),
      kn = function (t, e) {
        (this.activeTargets = []),
          (this.skippedTargets = []),
          (this.observationTargets = []),
          (this.observer = t),
          (this.callback = e);
      },
      An = new WeakMap(),
      Tn = function (t, e) {
        for (var r = 0; r < t.length; r += 1) if (t[r].target === e) return r;
        return -1;
      },
      Ln = (function () {
        function t() {}
        return (
          (t.connect = function (t, e) {
            var r = new kn(t, e);
            An.set(t, r);
          }),
          (t.observe = function (t, e, r) {
            var i = An.get(t),
              n = 0 === i.observationTargets.length;
            Tn(i.observationTargets, e) < 0 &&
              (n && Hi.push(i),
              i.observationTargets.push(new On(e, r && r.box)),
              Sn(1),
              wn.schedule());
          }),
          (t.unobserve = function (t, e) {
            var r = An.get(t),
              i = Tn(r.observationTargets, e),
              n = 1 === r.observationTargets.length;
            i >= 0 &&
              (n && Hi.splice(Hi.indexOf(r), 1),
              r.observationTargets.splice(i, 1),
              Sn(-1));
          }),
          (t.disconnect = function (t) {
            var e = this,
              r = An.get(t);
            r.observationTargets.slice().forEach(function (r) {
              return e.unobserve(t, r.target);
            }),
              r.activeTargets.splice(0, r.activeTargets.length);
          }),
          t
        );
      })(),
      zn = (function () {
        function t(t) {
          if (0 === arguments.length)
            throw new TypeError(
              "Failed to construct 'ResizeObserver': 1 argument required, but only 0 present."
            );
          if ("function" != typeof t)
            throw new TypeError(
              "Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function."
            );
          Ln.connect(this, t);
        }
        return (
          (t.prototype.observe = function (t, e) {
            if (0 === arguments.length)
              throw new TypeError(
                "Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present."
              );
            if (!Ji(t))
              throw new TypeError(
                "Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element"
              );
            Ln.observe(this, t, e);
          }),
          (t.prototype.unobserve = function (t) {
            if (0 === arguments.length)
              throw new TypeError(
                "Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present."
              );
            if (!Ji(t))
              throw new TypeError(
                "Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element"
              );
            Ln.unobserve(this, t);
          }),
          (t.prototype.disconnect = function () {
            Ln.disconnect(this);
          }),
          (t.toString = function () {
            return "function ResizeObserver () { [polyfill code] }";
          }),
          t
        );
      })(),
      Rn = function (t) {
        return function (e, r, i, n) {
          Tt(r);
          var o = zt(e),
            s = b(o),
            a = st(o.length),
            c = t ? a - 1 : 0,
            l = t ? -1 : 1;
          if (i < 2)
            for (;;) {
              if (c in s) {
                (n = s[c]), (c += l);
                break;
              }
              if (((c += l), t ? c < 0 : a <= c))
                throw TypeError("Reduce of empty array with no initial value");
            }
          for (; t ? c >= 0 : a > c; c += l) c in s && (n = r(n, s[c], c, o));
          return n;
        };
      },
      _n = { left: Rn(!1), right: Rn(!0) }.left;
    At(
      { target: "Array", proto: !0, forced: Pt("reduce") },
      {
        reduce: function (t) {
          return _n(
            this,
            t,
            arguments.length,
            arguments.length > 1 ? arguments[1] : void 0
          );
        },
      }
    );
    var Mn = M.f,
      Cn = Function.prototype,
      Wn = Cn.toString,
      jn = /^\s*function ([^ (]*)/;
    !l ||
      "name" in Cn ||
      Mn(Cn, "name", {
        configurable: !0,
        get: function () {
          try {
            return Wn.call(this).match(jn)[1];
          } catch (t) {
            return "";
          }
        },
      });
    var Nn,
      In,
      Bn = function () {
        var t = R(this),
          e = "";
        return (
          t.global && (e += "g"),
          t.ignoreCase && (e += "i"),
          t.multiline && (e += "m"),
          t.dotAll && (e += "s"),
          t.unicode && (e += "u"),
          t.sticky && (e += "y"),
          e
        );
      },
      Dn = RegExp.prototype.exec,
      Pn = String.prototype.replace,
      Fn = Dn,
      Vn =
        ((Nn = /a/),
        (In = /b*/g),
        Dn.call(Nn, "a"),
        Dn.call(In, "a"),
        0 !== Nn.lastIndex || 0 !== In.lastIndex),
      Xn = void 0 !== /()??/.exec("")[1];
    (Vn || Xn) &&
      (Fn = function (t) {
        var e,
          r,
          i,
          n,
          o = this;
        return (
          Xn && (r = new RegExp("^" + o.source + "$(?!\\s)", Bn.call(o))),
          Vn && (e = o.lastIndex),
          (i = Dn.call(o, t)),
          Vn && i && (o.lastIndex = o.global ? i.index + i[0].length : e),
          Xn &&
            i &&
            i.length > 1 &&
            Pn.call(i[0], r, function () {
              for (n = 1; n < arguments.length - 2; n++)
                void 0 === arguments[n] && (i[n] = void 0);
            }),
          i
        );
      });
    var Hn = Fn;
    At({ target: "RegExp", proto: !0, forced: /./.exec !== Hn }, { exec: Hn });
    var qn = Wt("species"),
      $n = !c(function () {
        var t = /./;
        return (
          (t.exec = function () {
            var t = [];
            return (t.groups = { a: "7" }), t;
          }),
          "7" !== "".replace(t, "$<a>")
        );
      }),
      Yn = !c(function () {
        var t = /(?:)/,
          e = t.exec;
        t.exec = function () {
          return e.apply(this, arguments);
        };
        var r = "ab".split(t);
        return 2 !== r.length || "a" !== r[0] || "b" !== r[1];
      }),
      Gn = function (t, e, r, i) {
        var n = Wt(t),
          o = !c(function () {
            var e = {};
            return (
              (e[n] = function () {
                return 7;
              }),
              7 != ""[t](e)
            );
          }),
          s =
            o &&
            !c(function () {
              var e = !1,
                r = /a/;
              return (
                (r.exec = function () {
                  return (e = !0), null;
                }),
                "split" === t &&
                  ((r.constructor = {}),
                  (r.constructor[qn] = function () {
                    return r;
                  })),
                r[n](""),
                !e
              );
            });
        if (!o || !s || ("replace" === t && !$n) || ("split" === t && !Yn)) {
          var a = /./[n],
            l = r(n, ""[t], function (t, e, r, i, n) {
              return e.exec === Hn
                ? o && !n
                  ? { done: !0, value: a.call(e, r, i) }
                  : { done: !0, value: t.call(r, e, i) }
                : { done: !1 };
            }),
            u = l[0],
            f = l[1];
          J(String.prototype, t, u),
            J(
              RegExp.prototype,
              n,
              2 == e
                ? function (t, e) {
                    return f.call(t, this, e);
                  }
                : function (t) {
                    return f.call(t, this);
                  }
            ),
            i && C(RegExp.prototype[n], "sham", !0);
        }
      },
      Un = Ue.charAt,
      Qn = function (t, e, r) {
        return e + (r ? Un(t, e).length : 1);
      },
      Kn = function (t, e) {
        var r = t.exec;
        if ("function" == typeof r) {
          var i = r.call(t, e);
          if ("object" != typeof i)
            throw TypeError(
              "RegExp exec method returned something other than an Object or null"
            );
          return i;
        }
        if ("RegExp" !== v(t))
          throw TypeError("RegExp#exec called on incompatible receiver");
        return Hn.call(t, e);
      };
    Gn("match", 1, function (t, e, r) {
      return [
        function (e) {
          var r = y(this),
            i = null == e ? void 0 : e[t];
          return void 0 !== i ? i.call(e, r) : new RegExp(e)[t](String(r));
        },
        function (t) {
          var i = r(e, t, this);
          if (i.done) return i.value;
          var n = R(t),
            o = String(this);
          if (!n.global) return Kn(n, o);
          var s = n.unicode;
          n.lastIndex = 0;
          for (var a, c = [], l = 0; null !== (a = Kn(n, o)); ) {
            var u = String(a[0]);
            (c[l] = u),
              "" === u && (n.lastIndex = Qn(o, st(n.lastIndex), s)),
              l++;
          }
          return 0 === l ? null : c;
        },
      ];
    });
    var Jn = Math.max,
      Zn = Math.min,
      to = Math.floor,
      eo = /\$([$&'`]|\d\d?|<[^>]*>)/g,
      ro = /\$([$&'`]|\d\d?)/g;
    Gn("replace", 2, function (t, e, r) {
      return [
        function (r, i) {
          var n = y(this),
            o = null == r ? void 0 : r[t];
          return void 0 !== o ? o.call(r, n, i) : e.call(String(n), r, i);
        },
        function (t, n) {
          var o = r(e, t, this, n);
          if (o.done) return o.value;
          var s = R(t),
            a = String(this),
            c = "function" == typeof n;
          c || (n = String(n));
          var l = s.global;
          if (l) {
            var u = s.unicode;
            s.lastIndex = 0;
          }
          for (var f = []; ; ) {
            var h = Kn(s, a);
            if (null === h) break;
            if ((f.push(h), !l)) break;
            "" === String(h[0]) && (s.lastIndex = Qn(a, st(s.lastIndex), u));
          }
          for (var d, p = "", v = 0, g = 0; g < f.length; g++) {
            h = f[g];
            for (
              var b = String(h[0]),
                y = Jn(Zn(nt(h.index), a.length), 0),
                m = [],
                x = 1;
              x < h.length;
              x++
            )
              m.push(void 0 === (d = h[x]) ? d : String(d));
            var E = h.groups;
            if (c) {
              var w = [b].concat(m, y, a);
              void 0 !== E && w.push(E);
              var S = String(n.apply(void 0, w));
            } else S = i(b, a, y, m, E, n);
            y >= v && ((p += a.slice(v, y) + S), (v = y + b.length));
          }
          return p + a.slice(v);
        },
      ];
      function i(t, r, i, n, o, s) {
        var a = i + t.length,
          c = n.length,
          l = ro;
        return (
          void 0 !== o && ((o = zt(o)), (l = eo)),
          e.call(s, l, function (e, s) {
            var l;
            switch (s.charAt(0)) {
              case "$":
                return "$";
              case "&":
                return t;
              case "`":
                return r.slice(0, i);
              case "'":
                return r.slice(a);
              case "<":
                l = o[s.slice(1, -1)];
                break;
              default:
                var u = +s;
                if (0 === u) return e;
                if (u > c) {
                  var f = to(u / 10);
                  return 0 === f
                    ? e
                    : f <= c
                    ? void 0 === n[f - 1]
                      ? s.charAt(1)
                      : n[f - 1] + s.charAt(1)
                    : e;
                }
                l = n[u - 1];
            }
            return void 0 === l ? "" : l;
          })
        );
      }
    });
    var io = function (t) {
      return Array.prototype.reduce.call(
        t,
        function (t, e) {
          var r = e.name.match(/data-simplebar-(.+)/);
          if (r) {
            var i = r[1].replace(/\W+(.)/g, function (t, e) {
              return e.toUpperCase();
            });
            switch (e.value) {
              case "true":
                t[i] = !0;
                break;
              case "false":
                t[i] = !1;
                break;
              case void 0:
                t[i] = !0;
                break;
              default:
                t[i] = e.value;
            }
          }
          return t;
        },
        {}
      );
    };
    function no(t) {
      return t && t.ownerDocument && t.ownerDocument.defaultView
        ? t.ownerDocument.defaultView
        : window;
    }
    function oo(t) {
      return t && t.ownerDocument ? t.ownerDocument : document;
    }
    var so = null,
      ao = null;
    function co(t) {
      if (null === so) {
        var e = oo(t);
        if (void 0 === e) return (so = 0);
        var r = e.body,
          i = e.createElement("div");
        i.classList.add("simplebar-hide-scrollbar"), r.appendChild(i);
        var n = i.getBoundingClientRect().right;
        r.removeChild(i), (so = n);
      }
      return so;
    }
    Yt &&
      window.addEventListener("resize", function () {
        ao !== window.devicePixelRatio &&
          ((ao = window.devicePixelRatio), (so = null));
      });
    var lo = (function () {
      function t(e, r) {
        var i = this;
        (this.onScroll = function () {
          var t = no(i.el);
          i.scrollXTicking ||
            (t.requestAnimationFrame(i.scrollX), (i.scrollXTicking = !0)),
            i.scrollYTicking ||
              (t.requestAnimationFrame(i.scrollY), (i.scrollYTicking = !0));
        }),
          (this.scrollX = function () {
            i.axis.x.isOverflowing &&
              (i.showScrollbar("x"), i.positionScrollbar("x")),
              (i.scrollXTicking = !1);
          }),
          (this.scrollY = function () {
            i.axis.y.isOverflowing &&
              (i.showScrollbar("y"), i.positionScrollbar("y")),
              (i.scrollYTicking = !1);
          }),
          (this.onMouseEnter = function () {
            i.showScrollbar("x"), i.showScrollbar("y");
          }),
          (this.onMouseMove = function (t) {
            (i.mouseX = t.clientX),
              (i.mouseY = t.clientY),
              (i.axis.x.isOverflowing || i.axis.x.forceVisible) &&
                i.onMouseMoveForAxis("x"),
              (i.axis.y.isOverflowing || i.axis.y.forceVisible) &&
                i.onMouseMoveForAxis("y");
          }),
          (this.onMouseLeave = function () {
            i.onMouseMove.cancel(),
              (i.axis.x.isOverflowing || i.axis.x.forceVisible) &&
                i.onMouseLeaveForAxis("x"),
              (i.axis.y.isOverflowing || i.axis.y.forceVisible) &&
                i.onMouseLeaveForAxis("y"),
              (i.mouseX = -1),
              (i.mouseY = -1);
          }),
          (this.onWindowResize = function () {
            (i.scrollbarWidth = i.getScrollbarWidth()), i.hideNativeScrollbar();
          }),
          (this.hideScrollbars = function () {
            (i.axis.x.track.rect = i.axis.x.track.el.getBoundingClientRect()),
              (i.axis.y.track.rect = i.axis.y.track.el.getBoundingClientRect()),
              i.isWithinBounds(i.axis.y.track.rect) ||
                (i.axis.y.scrollbar.el.classList.remove(i.classNames.visible),
                (i.axis.y.isVisible = !1)),
              i.isWithinBounds(i.axis.x.track.rect) ||
                (i.axis.x.scrollbar.el.classList.remove(i.classNames.visible),
                (i.axis.x.isVisible = !1));
          }),
          (this.onPointerEvent = function (t) {
            var e, r;
            (i.axis.x.track.rect = i.axis.x.track.el.getBoundingClientRect()),
              (i.axis.y.track.rect = i.axis.y.track.el.getBoundingClientRect()),
              (i.axis.x.isOverflowing || i.axis.x.forceVisible) &&
                (e = i.isWithinBounds(i.axis.x.track.rect)),
              (i.axis.y.isOverflowing || i.axis.y.forceVisible) &&
                (r = i.isWithinBounds(i.axis.y.track.rect)),
              (e || r) &&
                (t.preventDefault(),
                t.stopPropagation(),
                "mousedown" === t.type &&
                  (e &&
                    ((i.axis.x.scrollbar.rect =
                      i.axis.x.scrollbar.el.getBoundingClientRect()),
                    i.isWithinBounds(i.axis.x.scrollbar.rect)
                      ? i.onDragStart(t, "x")
                      : i.onTrackClick(t, "x")),
                  r &&
                    ((i.axis.y.scrollbar.rect =
                      i.axis.y.scrollbar.el.getBoundingClientRect()),
                    i.isWithinBounds(i.axis.y.scrollbar.rect)
                      ? i.onDragStart(t, "y")
                      : i.onTrackClick(t, "y"))));
          }),
          (this.drag = function (e) {
            var r = i.axis[i.draggedAxis].track,
              n = r.rect[i.axis[i.draggedAxis].sizeAttr],
              o = i.axis[i.draggedAxis].scrollbar,
              s = i.contentWrapperEl[i.axis[i.draggedAxis].scrollSizeAttr],
              a = parseInt(i.elStyles[i.axis[i.draggedAxis].sizeAttr], 10);
            e.preventDefault(), e.stopPropagation();
            var c =
              ((("y" === i.draggedAxis ? e.pageY : e.pageX) -
                r.rect[i.axis[i.draggedAxis].offsetAttr] -
                i.axis[i.draggedAxis].dragOffset) /
                (n - o.size)) *
              (s - a);
            "x" === i.draggedAxis &&
              ((c =
                i.isRtl && t.getRtlHelpers().isRtlScrollbarInverted
                  ? c - (n + o.size)
                  : c),
              (c =
                i.isRtl && t.getRtlHelpers().isRtlScrollingInverted ? -c : c)),
              (i.contentWrapperEl[i.axis[i.draggedAxis].scrollOffsetAttr] = c);
          }),
          (this.onEndDrag = function (t) {
            var e = oo(i.el),
              r = no(i.el);
            t.preventDefault(),
              t.stopPropagation(),
              i.el.classList.remove(i.classNames.dragging),
              e.removeEventListener("mousemove", i.drag, !0),
              e.removeEventListener("mouseup", i.onEndDrag, !0),
              (i.removePreventClickId = r.setTimeout(function () {
                e.removeEventListener("click", i.preventClick, !0),
                  e.removeEventListener("dblclick", i.preventClick, !0),
                  (i.removePreventClickId = null);
              }));
          }),
          (this.preventClick = function (t) {
            t.preventDefault(), t.stopPropagation();
          }),
          (this.el = e),
          (this.minScrollbarWidth = 20),
          (this.options = Object.assign({}, t.defaultOptions, {}, r)),
          (this.classNames = Object.assign(
            {},
            t.defaultOptions.classNames,
            {},
            this.options.classNames
          )),
          (this.axis = {
            x: {
              scrollOffsetAttr: "scrollLeft",
              sizeAttr: "width",
              scrollSizeAttr: "scrollWidth",
              offsetSizeAttr: "offsetWidth",
              offsetAttr: "left",
              overflowAttr: "overflowX",
              dragOffset: 0,
              isOverflowing: !0,
              isVisible: !1,
              forceVisible: !1,
              track: {},
              scrollbar: {},
            },
            y: {
              scrollOffsetAttr: "scrollTop",
              sizeAttr: "height",
              scrollSizeAttr: "scrollHeight",
              offsetSizeAttr: "offsetHeight",
              offsetAttr: "top",
              overflowAttr: "overflowY",
              dragOffset: 0,
              isOverflowing: !0,
              isVisible: !1,
              forceVisible: !1,
              track: {},
              scrollbar: {},
            },
          }),
          (this.removePreventClickId = null),
          t.instances.has(this.el) ||
            ((this.recalculate = Gr(this.recalculate.bind(this), 64)),
            (this.onMouseMove = Gr(this.onMouseMove.bind(this), 64)),
            (this.hideScrollbars = hi(
              this.hideScrollbars.bind(this),
              this.options.timeout
            )),
            (this.onWindowResize = hi(this.onWindowResize.bind(this), 64, {
              leading: !0,
            })),
            (t.getRtlHelpers = Xi(t.getRtlHelpers)),
            this.init());
      }
      (t.getRtlHelpers = function () {
        var e = document.createElement("div");
        e.innerHTML =
          '<div class="hs-dummy-scrollbar-size"><div style="height: 200%; width: 200%; margin: 10px 0;"></div></div>';
        var r = e.firstElementChild;
        document.body.appendChild(r);
        var i = r.firstElementChild;
        r.scrollLeft = 0;
        var n = t.getOffset(r),
          o = t.getOffset(i);
        r.scrollLeft = 999;
        var s = t.getOffset(i);
        return {
          isRtlScrollingInverted: n.left !== o.left && o.left - s.left != 0,
          isRtlScrollbarInverted: n.left !== o.left,
        };
      }),
        (t.getOffset = function (t) {
          var e = t.getBoundingClientRect(),
            r = oo(t),
            i = no(t);
          return {
            top: e.top + (i.pageYOffset || r.documentElement.scrollTop),
            left: e.left + (i.pageXOffset || r.documentElement.scrollLeft),
          };
        });
      var e = t.prototype;
      return (
        (e.init = function () {
          t.instances.set(this.el, this),
            Yt &&
              (this.initDOM(),
              this.setAccessibilityAttributes(),
              (this.scrollbarWidth = this.getScrollbarWidth()),
              this.recalculate(),
              this.initListeners());
        }),
        (e.initDOM = function () {
          var t = this;
          if (
            Array.prototype.filter.call(this.el.children, function (e) {
              return e.classList.contains(t.classNames.wrapper);
            }).length
          )
            (this.wrapperEl = this.el.querySelector(
              "." + this.classNames.wrapper
            )),
              (this.contentWrapperEl =
                this.options.scrollableNode ||
                this.el.querySelector("." + this.classNames.contentWrapper)),
              (this.contentEl =
                this.options.contentNode ||
                this.el.querySelector("." + this.classNames.contentEl)),
              (this.offsetEl = this.el.querySelector(
                "." + this.classNames.offset
              )),
              (this.maskEl = this.el.querySelector("." + this.classNames.mask)),
              (this.placeholderEl = this.findChild(
                this.wrapperEl,
                "." + this.classNames.placeholder
              )),
              (this.heightAutoObserverWrapperEl = this.el.querySelector(
                "." + this.classNames.heightAutoObserverWrapperEl
              )),
              (this.heightAutoObserverEl = this.el.querySelector(
                "." + this.classNames.heightAutoObserverEl
              )),
              (this.axis.x.track.el = this.findChild(
                this.el,
                "." + this.classNames.track + "." + this.classNames.horizontal
              )),
              (this.axis.y.track.el = this.findChild(
                this.el,
                "." + this.classNames.track + "." + this.classNames.vertical
              ));
          else {
            for (
              this.wrapperEl = document.createElement("div"),
                this.contentWrapperEl = document.createElement("div"),
                this.offsetEl = document.createElement("div"),
                this.maskEl = document.createElement("div"),
                this.contentEl = document.createElement("div"),
                this.placeholderEl = document.createElement("div"),
                this.heightAutoObserverWrapperEl =
                  document.createElement("div"),
                this.heightAutoObserverEl = document.createElement("div"),
                this.wrapperEl.classList.add(this.classNames.wrapper),
                this.contentWrapperEl.classList.add(
                  this.classNames.contentWrapper
                ),
                this.offsetEl.classList.add(this.classNames.offset),
                this.maskEl.classList.add(this.classNames.mask),
                this.contentEl.classList.add(this.classNames.contentEl),
                this.placeholderEl.classList.add(this.classNames.placeholder),
                this.heightAutoObserverWrapperEl.classList.add(
                  this.classNames.heightAutoObserverWrapperEl
                ),
                this.heightAutoObserverEl.classList.add(
                  this.classNames.heightAutoObserverEl
                );
              this.el.firstChild;

            )
              this.contentEl.appendChild(this.el.firstChild);
            this.contentWrapperEl.appendChild(this.contentEl),
              this.offsetEl.appendChild(this.contentWrapperEl),
              this.maskEl.appendChild(this.offsetEl),
              this.heightAutoObserverWrapperEl.appendChild(
                this.heightAutoObserverEl
              ),
              this.wrapperEl.appendChild(this.heightAutoObserverWrapperEl),
              this.wrapperEl.appendChild(this.maskEl),
              this.wrapperEl.appendChild(this.placeholderEl),
              this.el.appendChild(this.wrapperEl);
          }
          if (!this.axis.x.track.el || !this.axis.y.track.el) {
            var e = document.createElement("div"),
              r = document.createElement("div");
            e.classList.add(this.classNames.track),
              r.classList.add(this.classNames.scrollbar),
              e.appendChild(r),
              (this.axis.x.track.el = e.cloneNode(!0)),
              this.axis.x.track.el.classList.add(this.classNames.horizontal),
              (this.axis.y.track.el = e.cloneNode(!0)),
              this.axis.y.track.el.classList.add(this.classNames.vertical),
              this.el.appendChild(this.axis.x.track.el),
              this.el.appendChild(this.axis.y.track.el);
          }
          (this.axis.x.scrollbar.el = this.axis.x.track.el.querySelector(
            "." + this.classNames.scrollbar
          )),
            (this.axis.y.scrollbar.el = this.axis.y.track.el.querySelector(
              "." + this.classNames.scrollbar
            )),
            this.options.autoHide ||
              (this.axis.x.scrollbar.el.classList.add(this.classNames.visible),
              this.axis.y.scrollbar.el.classList.add(this.classNames.visible)),
            this.el.setAttribute("data-simplebar", "init");
        }),
        (e.setAccessibilityAttributes = function () {
          var t = this.options.ariaLabel || "scrollable content";
          this.contentWrapperEl.setAttribute("tabindex", "0"),
            this.contentWrapperEl.setAttribute("role", "region"),
            this.contentWrapperEl.setAttribute("aria-label", t);
        }),
        (e.initListeners = function () {
          var t = this,
            e = no(this.el);
          this.options.autoHide &&
            this.el.addEventListener("mouseenter", this.onMouseEnter),
            ["mousedown", "click", "dblclick"].forEach(function (e) {
              t.el.addEventListener(e, t.onPointerEvent, !0);
            }),
            ["touchstart", "touchend", "touchmove"].forEach(function (e) {
              t.el.addEventListener(e, t.onPointerEvent, {
                capture: !0,
                passive: !0,
              });
            }),
            this.el.addEventListener("mousemove", this.onMouseMove),
            this.el.addEventListener("mouseleave", this.onMouseLeave),
            this.contentWrapperEl.addEventListener("scroll", this.onScroll),
            e.addEventListener("resize", this.onWindowResize);
          var r = !1,
            i = e.ResizeObserver || zn;
          (this.resizeObserver = new i(function () {
            r && t.recalculate();
          })),
            this.resizeObserver.observe(this.el),
            this.resizeObserver.observe(this.contentEl),
            e.requestAnimationFrame(function () {
              r = !0;
            }),
            (this.mutationObserver = new e.MutationObserver(this.recalculate)),
            this.mutationObserver.observe(this.contentEl, {
              childList: !0,
              subtree: !0,
              characterData: !0,
            });
        }),
        (e.recalculate = function () {
          var t = no(this.el);
          (this.elStyles = t.getComputedStyle(this.el)),
            (this.isRtl = "rtl" === this.elStyles.direction);
          var e = this.heightAutoObserverEl.offsetHeight <= 1,
            r = this.heightAutoObserverEl.offsetWidth <= 1,
            i = this.contentEl.offsetWidth,
            n = this.contentWrapperEl.offsetWidth,
            o = this.elStyles.overflowX,
            s = this.elStyles.overflowY;
          (this.contentEl.style.padding =
            this.elStyles.paddingTop +
            " " +
            this.elStyles.paddingRight +
            " " +
            this.elStyles.paddingBottom +
            " " +
            this.elStyles.paddingLeft),
            (this.wrapperEl.style.margin =
              "-" +
              this.elStyles.paddingTop +
              " -" +
              this.elStyles.paddingRight +
              " -" +
              this.elStyles.paddingBottom +
              " -" +
              this.elStyles.paddingLeft);
          var a = this.contentEl.scrollHeight,
            c = this.contentEl.scrollWidth;
          (this.contentWrapperEl.style.height = e ? "auto" : "100%"),
            (this.placeholderEl.style.width = r ? i + "px" : "auto"),
            (this.placeholderEl.style.height = a + "px");
          var l = this.contentWrapperEl.offsetHeight;
          (this.axis.x.isOverflowing = c > i),
            (this.axis.y.isOverflowing = a > l),
            (this.axis.x.isOverflowing =
              "hidden" !== o && this.axis.x.isOverflowing),
            (this.axis.y.isOverflowing =
              "hidden" !== s && this.axis.y.isOverflowing),
            (this.axis.x.forceVisible =
              "x" === this.options.forceVisible ||
              !0 === this.options.forceVisible),
            (this.axis.y.forceVisible =
              "y" === this.options.forceVisible ||
              !0 === this.options.forceVisible),
            this.hideNativeScrollbar();
          var u = this.axis.x.isOverflowing ? this.scrollbarWidth : 0,
            f = this.axis.y.isOverflowing ? this.scrollbarWidth : 0;
          (this.axis.x.isOverflowing = this.axis.x.isOverflowing && c > n - f),
            (this.axis.y.isOverflowing =
              this.axis.y.isOverflowing && a > l - u),
            (this.axis.x.scrollbar.size = this.getScrollbarSize("x")),
            (this.axis.y.scrollbar.size = this.getScrollbarSize("y")),
            (this.axis.x.scrollbar.el.style.width =
              this.axis.x.scrollbar.size + "px"),
            (this.axis.y.scrollbar.el.style.height =
              this.axis.y.scrollbar.size + "px"),
            this.positionScrollbar("x"),
            this.positionScrollbar("y"),
            this.toggleTrackVisibility("x"),
            this.toggleTrackVisibility("y");
        }),
        (e.getScrollbarSize = function (t) {
          if ((void 0 === t && (t = "y"), !this.axis[t].isOverflowing))
            return 0;
          var e,
            r = this.contentEl[this.axis[t].scrollSizeAttr],
            i = this.axis[t].track.el[this.axis[t].offsetSizeAttr],
            n = i / r;
          return (
            (e = Math.max(~~(n * i), this.options.scrollbarMinSize)),
            this.options.scrollbarMaxSize &&
              (e = Math.min(e, this.options.scrollbarMaxSize)),
            e
          );
        }),
        (e.positionScrollbar = function (e) {
          if ((void 0 === e && (e = "y"), this.axis[e].isOverflowing)) {
            var r = this.contentWrapperEl[this.axis[e].scrollSizeAttr],
              i = this.axis[e].track.el[this.axis[e].offsetSizeAttr],
              n = parseInt(this.elStyles[this.axis[e].sizeAttr], 10),
              o = this.axis[e].scrollbar,
              s = this.contentWrapperEl[this.axis[e].scrollOffsetAttr],
              a =
                (s =
                  "x" === e &&
                  this.isRtl &&
                  t.getRtlHelpers().isRtlScrollingInverted
                    ? -s
                    : s) /
                (r - n),
              c = ~~((i - o.size) * a);
            (c =
              "x" === e &&
              this.isRtl &&
              t.getRtlHelpers().isRtlScrollbarInverted
                ? c + (i - o.size)
                : c),
              (o.el.style.transform =
                "x" === e
                  ? "translate3d(" + c + "px, 0, 0)"
                  : "translate3d(0, " + c + "px, 0)");
          }
        }),
        (e.toggleTrackVisibility = function (t) {
          void 0 === t && (t = "y");
          var e = this.axis[t].track.el,
            r = this.axis[t].scrollbar.el;
          this.axis[t].isOverflowing || this.axis[t].forceVisible
            ? ((e.style.visibility = "visible"),
              (this.contentWrapperEl.style[this.axis[t].overflowAttr] =
                "scroll"))
            : ((e.style.visibility = "hidden"),
              (this.contentWrapperEl.style[this.axis[t].overflowAttr] =
                "hidden")),
            this.axis[t].isOverflowing
              ? (r.style.display = "block")
              : (r.style.display = "none");
        }),
        (e.hideNativeScrollbar = function () {
          (this.offsetEl.style[this.isRtl ? "left" : "right"] =
            this.axis.y.isOverflowing || this.axis.y.forceVisible
              ? "-" + this.scrollbarWidth + "px"
              : 0),
            (this.offsetEl.style.bottom =
              this.axis.x.isOverflowing || this.axis.x.forceVisible
                ? "-" + this.scrollbarWidth + "px"
                : 0);
        }),
        (e.onMouseMoveForAxis = function (t) {
          void 0 === t && (t = "y"),
            (this.axis[t].track.rect =
              this.axis[t].track.el.getBoundingClientRect()),
            (this.axis[t].scrollbar.rect =
              this.axis[t].scrollbar.el.getBoundingClientRect()),
            this.isWithinBounds(this.axis[t].scrollbar.rect)
              ? this.axis[t].scrollbar.el.classList.add(this.classNames.hover)
              : this.axis[t].scrollbar.el.classList.remove(
                  this.classNames.hover
                ),
            this.isWithinBounds(this.axis[t].track.rect)
              ? (this.showScrollbar(t),
                this.axis[t].track.el.classList.add(this.classNames.hover))
              : this.axis[t].track.el.classList.remove(this.classNames.hover);
        }),
        (e.onMouseLeaveForAxis = function (t) {
          void 0 === t && (t = "y"),
            this.axis[t].track.el.classList.remove(this.classNames.hover),
            this.axis[t].scrollbar.el.classList.remove(this.classNames.hover);
        }),
        (e.showScrollbar = function (t) {
          void 0 === t && (t = "y");
          var e = this.axis[t].scrollbar.el;
          this.axis[t].isVisible ||
            (e.classList.add(this.classNames.visible),
            (this.axis[t].isVisible = !0)),
            this.options.autoHide && this.hideScrollbars();
        }),
        (e.onDragStart = function (t, e) {
          void 0 === e && (e = "y");
          var r = oo(this.el),
            i = no(this.el),
            n = this.axis[e].scrollbar,
            o = "y" === e ? t.pageY : t.pageX;
          (this.axis[e].dragOffset = o - n.rect[this.axis[e].offsetAttr]),
            (this.draggedAxis = e),
            this.el.classList.add(this.classNames.dragging),
            r.addEventListener("mousemove", this.drag, !0),
            r.addEventListener("mouseup", this.onEndDrag, !0),
            null === this.removePreventClickId
              ? (r.addEventListener("click", this.preventClick, !0),
                r.addEventListener("dblclick", this.preventClick, !0))
              : (i.clearTimeout(this.removePreventClickId),
                (this.removePreventClickId = null));
        }),
        (e.onTrackClick = function (t, e) {
          var r = this;
          if ((void 0 === e && (e = "y"), this.options.clickOnTrack)) {
            var i = no(this.el);
            this.axis[e].scrollbar.rect =
              this.axis[e].scrollbar.el.getBoundingClientRect();
            var n = this.axis[e].scrollbar.rect[this.axis[e].offsetAttr],
              o = parseInt(this.elStyles[this.axis[e].sizeAttr], 10),
              s = this.contentWrapperEl[this.axis[e].scrollOffsetAttr],
              a = ("y" === e ? this.mouseY - n : this.mouseX - n) < 0 ? -1 : 1,
              c = -1 === a ? s - o : s + o;
            !(function t() {
              var n, o;
              -1 === a
                ? s > c &&
                  ((s -= r.options.clickOnTrackSpeed),
                  r.contentWrapperEl.scrollTo(
                    (((n = {})[r.axis[e].offsetAttr] = s), n)
                  ),
                  i.requestAnimationFrame(t))
                : s < c &&
                  ((s += r.options.clickOnTrackSpeed),
                  r.contentWrapperEl.scrollTo(
                    (((o = {})[r.axis[e].offsetAttr] = s), o)
                  ),
                  i.requestAnimationFrame(t));
            })();
          }
        }),
        (e.getContentElement = function () {
          return this.contentEl;
        }),
        (e.getScrollElement = function () {
          return this.contentWrapperEl;
        }),
        (e.getScrollbarWidth = function () {
          try {
            return "none" ===
              getComputedStyle(this.contentWrapperEl, "::-webkit-scrollbar")
                .display ||
              "scrollbarWidth" in document.documentElement.style ||
              "-ms-overflow-style" in document.documentElement.style
              ? 0
              : co(this.el);
          } catch (t) {
            return co(this.el);
          }
        }),
        (e.removeListeners = function () {
          var t = this,
            e = no(this.el);
          this.options.autoHide &&
            this.el.removeEventListener("mouseenter", this.onMouseEnter),
            ["mousedown", "click", "dblclick"].forEach(function (e) {
              t.el.removeEventListener(e, t.onPointerEvent, !0);
            }),
            ["touchstart", "touchend", "touchmove"].forEach(function (e) {
              t.el.removeEventListener(e, t.onPointerEvent, {
                capture: !0,
                passive: !0,
              });
            }),
            this.el.removeEventListener("mousemove", this.onMouseMove),
            this.el.removeEventListener("mouseleave", this.onMouseLeave),
            this.contentWrapperEl &&
              this.contentWrapperEl.removeEventListener(
                "scroll",
                this.onScroll
              ),
            e.removeEventListener("resize", this.onWindowResize),
            this.mutationObserver && this.mutationObserver.disconnect(),
            this.resizeObserver && this.resizeObserver.disconnect(),
            this.recalculate.cancel(),
            this.onMouseMove.cancel(),
            this.hideScrollbars.cancel(),
            this.onWindowResize.cancel();
        }),
        (e.unMount = function () {
          this.removeListeners(), t.instances.delete(this.el);
        }),
        (e.isWithinBounds = function (t) {
          return (
            this.mouseX >= t.left &&
            this.mouseX <= t.left + t.width &&
            this.mouseY >= t.top &&
            this.mouseY <= t.top + t.height
          );
        }),
        (e.findChild = function (t, e) {
          var r =
            t.matches ||
            t.webkitMatchesSelector ||
            t.mozMatchesSelector ||
            t.msMatchesSelector;
          return Array.prototype.filter.call(t.children, function (t) {
            return r.call(t, e);
          })[0];
        }),
        t
      );
    })();
    return (
      (lo.defaultOptions = {
        autoHide: !0,
        forceVisible: !1,
        clickOnTrack: !0,
        clickOnTrackSpeed: 40,
        classNames: {
          contentEl: "simplebar-content",
          contentWrapper: "simplebar-content-wrapper",
          offset: "simplebar-offset",
          mask: "simplebar-mask",
          wrapper: "simplebar-wrapper",
          placeholder: "simplebar-placeholder",
          scrollbar: "simplebar-scrollbar",
          track: "simplebar-track",
          heightAutoObserverWrapperEl: "simplebar-height-auto-observer-wrapper",
          heightAutoObserverEl: "simplebar-height-auto-observer",
          visible: "simplebar-visible",
          horizontal: "simplebar-horizontal",
          vertical: "simplebar-vertical",
          hover: "simplebar-hover",
          dragging: "simplebar-dragging",
        },
        scrollbarMinSize: 25,
        scrollbarMaxSize: 0,
        timeout: 1e3,
      }),
      (lo.instances = new WeakMap()),
      (lo.initDOMLoadedElements = function () {
        document.removeEventListener(
          "DOMContentLoaded",
          this.initDOMLoadedElements
        ),
          window.removeEventListener("load", this.initDOMLoadedElements),
          Array.prototype.forEach.call(
            document.querySelectorAll("[data-simplebar]"),
            function (t) {
              "init" === t.getAttribute("data-simplebar") ||
                lo.instances.has(t) ||
                new lo(t, io(t.attributes));
            }
          );
      }),
      (lo.removeObserver = function () {
        this.globalObserver.disconnect();
      }),
      (lo.initHtmlApi = function () {
        (this.initDOMLoadedElements = this.initDOMLoadedElements.bind(this)),
          "undefined" != typeof MutationObserver &&
            ((this.globalObserver = new MutationObserver(lo.handleMutations)),
            this.globalObserver.observe(document, {
              childList: !0,
              subtree: !0,
            })),
          "complete" === document.readyState ||
          ("loading" !== document.readyState &&
            !document.documentElement.doScroll)
            ? window.setTimeout(this.initDOMLoadedElements)
            : (document.addEventListener(
                "DOMContentLoaded",
                this.initDOMLoadedElements
              ),
              window.addEventListener("load", this.initDOMLoadedElements));
      }),
      (lo.handleMutations = function (t) {
        t.forEach(function (t) {
          Array.prototype.forEach.call(t.addedNodes, function (t) {
            1 === t.nodeType &&
              (t.hasAttribute("data-simplebar")
                ? !lo.instances.has(t) &&
                  document.documentElement.contains(t) &&
                  new lo(t, io(t.attributes))
                : Array.prototype.forEach.call(
                    t.querySelectorAll("[data-simplebar]"),
                    function (t) {
                      "init" !== t.getAttribute("data-simplebar") &&
                        !lo.instances.has(t) &&
                        document.documentElement.contains(t) &&
                        new lo(t, io(t.attributes));
                    }
                  ));
          }),
            Array.prototype.forEach.call(t.removedNodes, function (t) {
              1 === t.nodeType &&
                ("init" === t.getAttribute("data-simplebar")
                  ? lo.instances.has(t) &&
                    !document.documentElement.contains(t) &&
                    lo.instances.get(t).unMount()
                  : Array.prototype.forEach.call(
                      t.querySelectorAll('[data-simplebar="init"]'),
                      function (t) {
                        lo.instances.has(t) &&
                          !document.documentElement.contains(t) &&
                          lo.instances.get(t).unMount();
                      }
                    ));
            });
        });
      }),
      (lo.getOptions = io),
      Yt && lo.initHtmlApi(),
      lo
    );
  }); // CONCATENATED MODULE: ./src/js/files/script.js
  // Подключение функционала "Чертогов Фрилансера"
  // import { cli } from "webpack-dev-server";

  // Подключение списка активных модулей

  // //темная тема
  // document.querySelector('.themetoggle').addEventListener('click', (e) => {
  //     if(localStorage.getItem('theme') === 'dark') {
  //         localStorage.removeItem('theme');
  //     } else {
  //         localStorage.setItem('theme', 'dark');
  //     }
  //     addDarkClassToHTML();
  // });

  // function addDarkClassToHTML() {
  //     try {
  //         const slideOnHome = document.querySelector('.slide-main-slider');
  //         let header = document.querySelector('.header');

  //         if(localStorage.getItem('theme') === 'dark') {
  //             document.querySelector('html').classList.add('dark');

  //             if( slideOnHome ) {
  //                 const headerBackground = document.querySelector('.header__background');
  //                 headerBackground.style.display = "none";
  //                 header.style.position = "absolute";
  //             }
  //         } else {
  //             document.querySelector('html').classList.remove('dark');
  //             header.style.position = "relative";
  //         }
  //     } catch (err) {}
  // }
  // addDarkClassToHTML();

  let listUl = document.querySelectorAll(".menu__sub-list");
  listUl.forEach(function (item, i, listUl) {
    if (item) {
      item.insertAdjacentHTML(
        "afterbegin",
        '<div class="menu__sub-list-back _icon-arrow-r">Назад</div>'
      );
      item.parentElement.insertAdjacentHTML(
        "beforeend",
        '<div class="menu__button-sub-open _icon-arrow-r"></div>'
      );
    }
  });

  // addTouchClass();
  // длинное меню
  // function menuDotts() {
  //     if(window.innerWidth > 1023.98) {
  //         let enumeration = [];
  //         const menuItem = document.querySelector('.menu__list').children;
  //         const menu = document.querySelector('.menu');
  //         const menuWidth = menu.offsetWidth;
  //         const menuBody = document.querySelector('.menu__body');
  //         let left = 75;

  //         menuItem.forEach(function(item, i, menuItem) {
  //             let width = item.clientWidth;
  //             console.log(`ширина айтема ${width}`);
  //             left +=  width;

  //             if(window.innerWidth > 1023.98 && window.innerWidth < 1365.98) {
  //                 left +=  12;
  //                 console.log(`margin - 12 ---${left}`);
  //             } else
  //             if (window.innerWidth > 1365.98 && window.innerWidth < 1919.98) {
  //                 left +=  16;
  //                 console.log(`margin - 16 ---${left}`);
  //             } else if(window.innerWidth > 1919.98) {
  //                 left +=  29;
  //                 console.log(`margin - 29 ---${left}`);
  //             }

  //             // let touch = document.querySelector('.touch');
  //             // if(touch) {
  //             //     if(item.lastChild.className == "menu__button-sub-open _icon-arrow-r") {
  //             //         console.log(` ---> ${left}`);
  //             //         left += 36;
  //             //     }
  //             // }

  //             console.log(`лево ${left}`);
  //             if( menuWidth < left ) {
  //                 console.log('скрыть');
  //                 enumeration.push(item);
  //             };
  //         });

  //         console.log(`${menuWidth} ширина меню < ${left} айтем`);
  //         if(menuWidth < left) {
  //             menuBody.insertAdjacentHTML("beforeend",'<div class="menu__more"><div class="menu__more-btn _icon-ellipsis-vertical"></div><ul class="menu__list"></ul></div>');
  //         }
  //         const more = document.querySelector('.menu__more>.menu__list');
  //         for (let i = 0; i < enumeration.length; i++) {
  //             more.append(enumeration[i]);
  //         }
  //     }
  // }
  // menuDotts();

  // const iconMore = document.querySelector(".menu__more-btn");
  // if(iconMore) {
  // 	iconMore.addEventListener('click', function(e) {
  //         closeAllSubMenu();
  // 		document.documentElement.classList.toggle('menu-more');
  // 	});
  // }

  window.onload = function () {
    document.addEventListener("click", documentActions);

    //Actions делегирование события click
    function documentActions(e) {
      const targetElement = e.target;
      if (targetElement.classList.contains("search-menu__icon")) {
        document.querySelector(".search-menu").classList.toggle("_active");
        document.documentElement.classList.add("search-open");

        // закрыть если проскролил
        document.addEventListener("windowScroll", function (e) {
          const startPoint = 0;
          const scrollTop = window.scrollY;
          if (scrollTop >= startPoint) {
            document.querySelector(".search-menu").classList.remove("_active");
            document.documentElement.classList.remove("search-open");
          }
        });
      } else if (
        !targetElement.closest(".form-search") &&
        document.querySelectorAll(".search-open")
      ) {
        document.querySelector(".search-menu").classList.remove("_active");
        document.documentElement.classList.remove("search-open");
      }

      const btnContacts = document.querySelector(".button-contacts-header");
      const numberContacts = document.querySelector(".contacts-block__call");
      const contacts = document.querySelector(".contacts");

      if (btnContacts.contains(e.target) || numberContacts.contains(e.target)) {
        const windowWidth = document.documentElement.clientWidth;
        const btnRight = btnContacts.getBoundingClientRect().right;
        const btnBottom = btnContacts.getBoundingClientRect().bottom;
        const right = windowWidth - btnRight;

        console.log(bodyLockStatus);
        if (window.innerWidth > 767.98 && window.innerWidth < 1023.98) {
          contacts.style.top = btnBottom + 20 + "px";
          contacts.style.right = right + "px";
        } else if (window.innerWidth > 1023.98) {
          contacts.style.top = btnBottom + 35 + "px";
          contacts.style.right = right + "px";
        }

        document.documentElement.classList.toggle("contacts-open");

        if (window.innerWidth < 767.98) {
          if (document.querySelector(".menu-open")) {
            document.documentElement.classList.remove("menu-open");
            document.querySelector(".menu__body").onmouseleave =
              closeAllSubMenu;
          }
        }
      } else if (
        (!targetElement.closest(".contacts") &&
          document.querySelectorAll(".contacts-open")) ||
        targetElement.closest(".call-back")
      ) {
        document.documentElement.classList.remove("contacts-open");
      }
    }
  };

  document.querySelector(".menu__body").addEventListener("click", (e) => {
    const targetElement = e.target;
    const parentElement = targetElement.parentElement;
    const subMenuList = parentElement.querySelector(".menu__sub-list");
    if (targetElement.classList.contains("menu__button-sub-open")) {
      if (parentElement && subMenuList) {
        closeAllSubMenu(subMenuList);
        subMenuList.classList.toggle("_open");
        parentElement.classList.toggle("_hover");
      }
    }

    if (
      targetElement.classList.contains("menu__sub-list-back") &&
      !targetElement.closest("menu__item")
    ) {
      targetElement.parentNode.classList.remove("_open");
    }
  });
  document.querySelector(".menu").onmouseleave = closeAllSubMenu;

  function closeAllSubMenu(current = null) {
    let parents = [];
    if (current) {
      let currentParent = current.parentNode;
      while (currentParent) {
        if (currentParent.classList.contains("menu__list")) break;
        if (currentParent.nodeName === "UL") parents.push(currentParent);
        currentParent = currentParent.parentNode;
      }
    }
    const subMenu = document.querySelectorAll(".menu__sub-list");
    // проверка родителей
    subMenu.forEach((item) => {
      if (item != current && !parents.includes(item)) {
        item.classList.remove("_open");
        item.parentElement.classList.remove("_hover");
      }
    });
  }

  // подменю
  function SubMenu() {
    const windowWidth = document.documentElement.clientWidth;
    let subMenu = document.querySelectorAll(".menu__sub-list");
    subMenu.forEach(function (item, i, subMenu) {
      let left = item.getBoundingClientRect().left;
      let width = item.clientWidth;
      let check = left + width;

      if (windowWidth < check) {
        item.classList.add("_left");
      }
    });
  }
  SubMenu();

  var buttons = document.querySelectorAll(".language-header__item");
  for (var script_button of buttons) {
    script_button.addEventListener("click", function () {
      buttons.forEach((i) => {
        i.classList.remove("language-header__item_active");
      });
      this.classList.toggle("language-header__item_active");
      console.log(this.dataset.language);
    });
  }

  const iconMenu = document.querySelector(".burger");
  const menu = document.querySelector(".menu__list");
  const search = document.querySelector(".search-menu__form");

  document.addEventListener("click", function (e) {
    const target = e.target;
    const its_btnMenu = target == iconMenu || iconMenu.contains(target);
    const its_menu = target == menu || menu.contains(target);
    const its_search = target == search || search.contains(target);
    const menu_is_active =
      document.documentElement.classList.contains("menu-open");

    if (!its_menu && !its_btnMenu && !its_search && menu_is_active) {
      document.documentElement.classList.toggle("menu-open");
    }
  }); // CONCATENATED MODULE: ./src/js/app.js
  /*
(i) Код попадает в итоговый файл,
только когда вызвана функция,
например flsFunctions.spollers();
Или когда импортирован весь файл,
например import "files/script.js";
Неиспользуемый (не вызванный)
код в итоговый файл не попадает.

Если мы хотим добавить модуль
следует его расскоментировать
*/

  // Включить/выключить FLS (Full Logging System) (в работе)
  window["FLS"] = true;

  // Подключение основного файла стилей

  // ========================================================================================================================================================================================================================================================
  // Функционал ========================================================================================================================================================================================================================================================
  // ========================================================================================================================================================================================================================================================

  //темная тема
  document.querySelector(".themetoggle").addEventListener("click", (e) => {
    if (localStorage.getItem("theme") === "dark") {
      localStorage.removeItem("theme");
    } else {
      localStorage.setItem("theme", "dark");
    }
    addDarkClassToHTML();
  });

  function addDarkClassToHTML() {
    try {
      const slideOnHome = document.querySelector(".slide-main-slider");
      let header = document.querySelector(".header");

      if (localStorage.getItem("theme") === "dark") {
        document.querySelector("html").classList.add("dark");

        if (slideOnHome) {
          const headerBackground = document.querySelector(
            ".header__background"
          );
          headerBackground.style.display = "none";
          header.style.position = "absolute";
        }
      } else {
        document.querySelector("html").classList.remove("dark");
        header.style.position = "relative";
      }
    } catch (err) {}
  }
  addDarkClassToHTML();

  /* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
  /* (i) необходимо для корректного отображения webp из css  */
  isWebp();
  /* Добавление класса touch для HTML если браузер мобильный */
  addTouchClass();
  /* Добавление loaded для HTML после полной загрузки страницы */
  addLoadedClass();
  /* Модуль для работы с меню (Бургер) */
  menuInit();
  /* Учет плавающей панели на мобильных устройствах при 100vh */
  // flsFunctions.fullVHfix();

  /*
Модуль работы со спойлерами
Документация:
Сниппет (HTML): spollers
*/
  spollers();

  /*
Модуль работы с табами
Документация:
Сниппет (HTML): tabs
*/
  // flsFunctions.tabs();

  /*
Модуль "показать еще"
Документация по работе в шаблоне:
Сниппет (HTML): showmore
*/
  // flsFunctions.showMore();

  /*
Попапы
Документация по работе в шаблоне:
Сниппет (HTML): pl
*/

  /*
Модуль параллакса мышью
Документация по работе в шаблоне:
Сниппет (HTML): 
*/
  // import './libs/parallax-mouse.js'

  // ========================================================================================================================================================================================================================================================
  // Работа с формами ========================================================================================================================================================================================================================================================
  // ========================================================================================================================================================================================================================================================

  /* Работа с полями формы: добавление классов, работа с placeholder. */
  // flsForms.formFieldsInit();

  /* Oтправка формы со встроенной валидацией полей. false - отключит валидацию */
  // flsForms.formSubmit(true);

  /* Модуль формы "колличество" */
  // flsForms.formQuantity();

  /* Модуль формы "показать пароль" */
  // flsForms.formViewpass();

  /* Модуль звездного рейтинга */
  // flsForms.formRating();

  /* Модуль работы с select. */
  // import './libs/select.js'

  /* (В работе) Модуль работы с масками.*/
  /*
Подключение и настройка выполняется в файле js/files/forms/inputmask.js
Документация по работе в шаблоне:
Документация плагина: https://github.com/RobinHerbots/inputmask
Сниппет(HTML):
*/
  // import "./files/forms/inputmask.js";

  /* Модуль работы с ползунком */
  /*
Подключение и настройка выполняется в файле js/files/forms/range.js
Документация по работе в шаблоне:
Документация плагина: https://refreshless.com/nouislider/
Сниппет (HTML): range
*/
  // import "./files/forms/range.js";

  /* Модуль работы с подсказками (tippy) */
  /*
Подключение плагина Tippy.js и настройка выполняется в файле js/files/tippy.js
Документация по работе в шаблоне:
Документация плагина: https://atomiks.github.io/tippyjs/
Сниппет (HTML): tip (добавляет атрибут с подсказкой для html тега)
*/
  // import "./files/tippy.js";

  // ========================================================================================================================================================================================================================================================
  // Работа со слайдером (Swiper) ========================================================================================================================================================================================================================================================
  // ========================================================================================================================================================================================================================================================
  /*
Настройка подключения плагина слайдера Swiper и новых слайдеров выполняется в файле js/files/sliders.js
Документация по работе в шаблоне:
Документация плагина: https://swiperjs.com/
Сниппет(HTML): swiper
*/
  // import "./files/sliders.js";

  // ========================================================================================================================================================================================================================================================
  // Модули работы с прокруткой страницы ========================================================================================================================================================================================================================================================
  // ========================================================================================================================================================================================================================================================

  /*
Изменение дизайна скроллбара
Документация по работе в шаблоне: В HTML добавляем к блоку атрибут data-simplebar
Документация плагина: https://github.com/Grsmto/simplebar/tree/master/packages/simplebar
Сниппет(HTML): 
*/
  // import './files/scroll/simplebar.js';

  // Ленивая (отложенная) загрузка картинок
  // Документация по работе в шаблоне: В HTML добавляем img, video, audio, iframe но вместо src пишем data-src
  // Документация плагина: https://github.com/verlok/vanilla-lazyload
  // Сниппет(HTML):
  // import './files/scroll/lazyload.js';

  // Наблюдатель за объектами c атрибутом data-watch
  // Документация по работе в шаблоне: js/libs/watcher.js
  // Сниппет(HTML):
  // import './libs/watcher.js'

  // Функции работы скроллом

  // Плавная навигация по странице
  // flsScroll.pageNavigation();

  // Функционал добавления классов к хедеру при прокрутке
  headerScroll();

  // Функционал липкого блока
  // flsScroll.stickyBlock();

  // ========================================================================================================================================================================================================================================================
  // Галерея ========================================================================================================================================================================================================================================================
  // ========================================================================================================================================================================================================================================================
  /*
Документация по работе в шаблоне: https://www.lightgalleryjs.com/docs/
Документация плагина: https://www.lightgalleryjs.com/docs/
Сниппет(HTML):
*/
  // import "./files/gallery.js";

  // ========================================================================================================================================================================================================================================================
  // Прочие плагины ============================================================================================================================================================================================================================================================================================================
  // ========================================================================================================================================================================================================================================================

  /* Динамический адаптив */

  /* Форматирование чисел */
  // import './libs/wNumb.min.js';

  /* СимплБар */

  // ========================================================================================================================================================================================================================================================
  // Прочее ========================================================================================================================================================================================================================================================
  // ========================================================================================================================================================================================================================================================
  /* Подключаем файлы со своим кодом */

  //============================================================================================================================================================================================================================================
  /******/
})();
