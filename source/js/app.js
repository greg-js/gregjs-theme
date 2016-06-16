/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	var hamburgerMenu = document.getElementById('hamburger');
	var navMenu = document.getElementById('navMenu');
	var submenuLinks = Array.from(document.querySelectorAll('.menu-item-submenu'));

	hamburgerMenu.addEventListener('click', function () {
	  var navClass = navMenu.className;
	  navMenu.className = /active/.test(navClass) ? navClass.replace(/ active/, '') : navClass + ' active';
	});

	submenuLinks.forEach(function (link) {
	  link.addEventListener('click', function (e) {
	    e.preventDefault();
	    var submenu = link.nextElementSibling;
	    if (window.getComputedStyle(hamburgerMenu).getPropertyValue('display') == 'block') {
	      var submenuClass = submenu.className;
	      submenu.className = /active/.test(submenuClass) ? submenuClass.replace(/ active/, '') : submenuClass + ' active';
	    }
	  });
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
	  //addEventListener polyfill 1.0 / Eirik Backer / MIT Licence
	  (function (win, doc) {
	    if (win.addEventListener) return; //No need to polyfill

	    function docHijack(p) {
	      var old = doc[p];doc[p] = function (v) {
	        return addListen(old(v));
	      };
	    }
	    function addEvent(on, fn, self) {
	      return (self = this).attachEvent('on' + on, function (e) {
	        var e = e || win.event; // eslint-disable-line
	        e.preventDefault = e.preventDefault || function () {
	          e.returnValue = false;
	        };
	        e.stopPropagation = e.stopPropagation || function () {
	          e.cancelBubble = true;
	        };
	        fn.call(self, e);
	      });
	    }
	    function addListen(obj, i) {
	      if (i = obj.length) while (i--) {
	        obj[i].addEventListener = addEvent;
	      } // eslint-disable-line
	      else obj.addEventListener = addEvent;
	      return obj;
	    }

	    addListen([doc, win]);
	    if ('Element' in win) win.Element.prototype.addEventListener = addEvent; //IE8
	    else {
	        //IE < 8
	        doc.attachEvent('onreadystatechange', function () {
	          addListen(doc.all);
	        }); //Make sure we also init at domReady
	        docHijack('getElementsByTagName');
	        docHijack('getElementById');
	        docHijack('createElement');
	        addListen(doc.all);
	      }
	  })(window, document);

	  // Source: https://github.com/Alhadis/Snippets/blob/master/js/polyfills/IE8-child-elements.js
	  if (!("nextElementSibling" in document.documentElement)) {
	    Object.defineProperty(Element.prototype, "nextElementSibling", {
	      get: function get() {
	        var e = this.nextSibling;
	        while (e && 1 !== e.nodeType) {
	          e = e.nextSibling;
	        }return e;
	      }
	    });
	  }
	};

/***/ }
/******/ ]);