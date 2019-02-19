/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/main.js","vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/BarbaViews.js":
/*!******************************!*\
  !*** ./src/js/BarbaViews.js ***!
  \******************************/
/*! exports provided: BarbaViews */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BarbaViews\", function() { return BarbaViews; });\n/* harmony import */ var barba__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! barba */ \"./node_modules/barba.js/dist/barba.js\");\n/* harmony import */ var barba__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(barba__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var scrollmonitor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! scrollmonitor */ \"./node_modules/scrollmonitor/scrollMonitor.js\");\n/* harmony import */ var scrollmonitor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(scrollmonitor__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _RevealerTransition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RevealerTransition */ \"./src/js/RevealerTransition.js\");\nfunction _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError(\"Cannot call a class as a function\");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if(\"value\"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}var BarbaViews=/*#__PURE__*/function(){function BarbaViews(){_classCallCheck(this,BarbaViews);this.scrollMonitor=scrollmonitor__WEBPACK_IMPORTED_MODULE_1___default.a;}_createClass(BarbaViews,[{key:\"init\",value:function init(){/* -- Common View -- */ // Methodology from https://github.com/luruke/barba.js/issues/146\nvar CommonView=barba__WEBPACK_IMPORTED_MODULE_0___default.a.BaseView.extend({namespace:'common',scrollWatchers:[],onEnterCompleted:function onEnterCompleted(){try{$('body').addClass('animations-enabled');window.scrollTo(0,0);var _instance=this;if(typeof ga==='function'){ga('send','pageview',location.pathname);}// run element animations when in viewport\n$('.animatable').each(function(index){// create two watchers - one with an offset for enter events, and one without an offset for exit events\n// lets us add visibility classes with an offset, and remove them when the element is completely outside the visible viewport\nvar enterScrollWatcher=scrollMonitor.create($(this).get(0),-100);var exitScrollWatcher=scrollMonitor.create($(this).get(0),100);_instance.scrollWatchers.push(enterScrollWatcher);_instance.scrollWatchers.push(exitScrollWatcher);enterScrollWatcher.enterViewport(function(){$(this.watchItem).addClass('is-active');});exitScrollWatcher.exitViewport(function(){$(this.watchItem).removeClass('is-active');});// If any of the elements are visible, add the active class (after an initial delay, to facilitate page transition animation)\n$(this).addClass('will-animate');$(this).removeClass('is-active');if(exitScrollWatcher.isInViewport){setTimeout(function(){$(exitScrollWatcher.watchItem).addClass('is-active');},50);}});}catch(e){console.log(e);}},/* Clean up scripts */onLeave:function onLeave(){try{// destroy element animation scroll watchers \nfor(var i=0;i<this.scrollWatchers.length;i++){this.scrollWatchers[i].destroy();}this.scrollWatchers=[];}catch(e){console.log(e);}}});/* -- Home View -- */var HomeView=CommonView.extend({namespace:'home'});// initialize views\nCommonView.init();HomeView.init();// initialize barba\nbarba__WEBPACK_IMPORTED_MODULE_0___default.a.Pjax.init();barba__WEBPACK_IMPORTED_MODULE_0___default.a.Pjax.getTransition=function(){return _RevealerTransition__WEBPACK_IMPORTED_MODULE_2__[\"default\"];};// hide preloader \n$('.revealer').removeClass('show').addClass('animate-out');setTimeout(function(){$('.revealer').removeClass('animate-out');},600);}}]);return BarbaViews;}();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\")))\n\n//# sourceURL=webpack:///./src/js/BarbaViews.js?");

/***/ }),

/***/ "./src/js/RevealerTransition.js":
/*!**************************************!*\
  !*** ./src/js/RevealerTransition.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var barba__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! barba */ \"./node_modules/barba.js/dist/barba.js\");\n/* harmony import */ var barba__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(barba__WEBPACK_IMPORTED_MODULE_0__);\nvar RevealerTransition=barba__WEBPACK_IMPORTED_MODULE_0___default.a.BaseTransition.extend({start:function start(){Promise.all([this.newContainerLoading,this.animateIn()]).then(this.animateOut.bind(this));},animateIn:function animateIn(){$('.revealer').addClass('animate-in');// TODO: show preloader animation after transition finishes. \nreturn new Promise(function(resolve,reject){var newResolve=resolve;setTimeout(function(){resolve();},600);});},animateOut:function animateOut(){var _this=this;_this.done();// remove old container before transitioning in.\n$('.revealer').removeClass('animate-in').addClass('animate-out');// TODO: show preloader animation after transition finishes. \nreturn new Promise(function(resolve,reject){setTimeout(function(){$('.revealer').removeClass('animate-out');resolve();},600);});}});/* harmony default export */ __webpack_exports__[\"default\"] = (RevealerTransition);\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\")))\n\n//# sourceURL=webpack:///./src/js/RevealerTransition.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/style.scss */ \"./src/scss/style.scss\");\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_style_scss__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _js_BarbaViews__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/BarbaViews */ \"./src/js/BarbaViews.js\");\n/* global site imports */$(function(){var barbaViews=new _js_BarbaViews__WEBPACK_IMPORTED_MODULE_1__[\"BarbaViews\"]();barbaViews.init();});\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\")))\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/scss/style.scss?");

/***/ })

/******/ });