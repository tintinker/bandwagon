/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./views/home.page.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/path-browserify/index.js":
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n// resolves . and .. elements in a path array with directory names there\n// must be no slashes, empty elements, or device names (c:\\) in the array\n// (so also no leading and trailing slashes - it does not distinguish\n// relative and absolute paths)\nfunction normalizeArray(parts, allowAboveRoot) {\n  // if the path tries to go above the root, `up` ends up > 0\n  var up = 0;\n  for (var i = parts.length - 1; i >= 0; i--) {\n    var last = parts[i];\n    if (last === '.') {\n      parts.splice(i, 1);\n    } else if (last === '..') {\n      parts.splice(i, 1);\n      up++;\n    } else if (up) {\n      parts.splice(i, 1);\n      up--;\n    }\n  }\n\n  // if the path is allowed to go above the root, restore leading ..s\n  if (allowAboveRoot) {\n    for (; up--; up) {\n      parts.unshift('..');\n    }\n  }\n\n  return parts;\n}\n\n// Split a filename into [root, dir, basename, ext], unix version\n// 'root' is just a slash, or nothing.\nvar splitPathRe =\n    /^(\\/?|)([\\s\\S]*?)((?:\\.{1,2}|[^\\/]+?|)(\\.[^.\\/]*|))(?:[\\/]*)$/;\nvar splitPath = function(filename) {\n  return splitPathRe.exec(filename).slice(1);\n};\n\n// path.resolve([from ...], to)\n// posix version\nexports.resolve = function() {\n  var resolvedPath = '',\n      resolvedAbsolute = false;\n\n  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {\n    var path = (i >= 0) ? arguments[i] : process.cwd();\n\n    // Skip empty and invalid entries\n    if (typeof path !== 'string') {\n      throw new TypeError('Arguments to path.resolve must be strings');\n    } else if (!path) {\n      continue;\n    }\n\n    resolvedPath = path + '/' + resolvedPath;\n    resolvedAbsolute = path.charAt(0) === '/';\n  }\n\n  // At this point the path should be resolved to a full absolute path, but\n  // handle relative paths to be safe (might happen when process.cwd() fails)\n\n  // Normalize the path\n  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {\n    return !!p;\n  }), !resolvedAbsolute).join('/');\n\n  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';\n};\n\n// path.normalize(path)\n// posix version\nexports.normalize = function(path) {\n  var isAbsolute = exports.isAbsolute(path),\n      trailingSlash = substr(path, -1) === '/';\n\n  // Normalize the path\n  path = normalizeArray(filter(path.split('/'), function(p) {\n    return !!p;\n  }), !isAbsolute).join('/');\n\n  if (!path && !isAbsolute) {\n    path = '.';\n  }\n  if (path && trailingSlash) {\n    path += '/';\n  }\n\n  return (isAbsolute ? '/' : '') + path;\n};\n\n// posix version\nexports.isAbsolute = function(path) {\n  return path.charAt(0) === '/';\n};\n\n// posix version\nexports.join = function() {\n  var paths = Array.prototype.slice.call(arguments, 0);\n  return exports.normalize(filter(paths, function(p, index) {\n    if (typeof p !== 'string') {\n      throw new TypeError('Arguments to path.join must be strings');\n    }\n    return p;\n  }).join('/'));\n};\n\n\n// path.relative(from, to)\n// posix version\nexports.relative = function(from, to) {\n  from = exports.resolve(from).substr(1);\n  to = exports.resolve(to).substr(1);\n\n  function trim(arr) {\n    var start = 0;\n    for (; start < arr.length; start++) {\n      if (arr[start] !== '') break;\n    }\n\n    var end = arr.length - 1;\n    for (; end >= 0; end--) {\n      if (arr[end] !== '') break;\n    }\n\n    if (start > end) return [];\n    return arr.slice(start, end - start + 1);\n  }\n\n  var fromParts = trim(from.split('/'));\n  var toParts = trim(to.split('/'));\n\n  var length = Math.min(fromParts.length, toParts.length);\n  var samePartsLength = length;\n  for (var i = 0; i < length; i++) {\n    if (fromParts[i] !== toParts[i]) {\n      samePartsLength = i;\n      break;\n    }\n  }\n\n  var outputParts = [];\n  for (var i = samePartsLength; i < fromParts.length; i++) {\n    outputParts.push('..');\n  }\n\n  outputParts = outputParts.concat(toParts.slice(samePartsLength));\n\n  return outputParts.join('/');\n};\n\nexports.sep = '/';\nexports.delimiter = ':';\n\nexports.dirname = function(path) {\n  var result = splitPath(path),\n      root = result[0],\n      dir = result[1];\n\n  if (!root && !dir) {\n    // No dirname whatsoever\n    return '.';\n  }\n\n  if (dir) {\n    // It has a dirname, strip trailing slash\n    dir = dir.substr(0, dir.length - 1);\n  }\n\n  return root + dir;\n};\n\n\nexports.basename = function(path, ext) {\n  var f = splitPath(path)[2];\n  // TODO: make this comparison case-insensitive on windows?\n  if (ext && f.substr(-1 * ext.length) === ext) {\n    f = f.substr(0, f.length - ext.length);\n  }\n  return f;\n};\n\n\nexports.extname = function(path) {\n  return splitPath(path)[3];\n};\n\nfunction filter (xs, f) {\n    if (xs.filter) return xs.filter(f);\n    var res = [];\n    for (var i = 0; i < xs.length; i++) {\n        if (f(xs[i], i, xs)) res.push(xs[i]);\n    }\n    return res;\n}\n\n// String.prototype.substr - negative index don't work in IE8\nvar substr = 'ab'.substr(-1) === 'b'\n    ? function (str, start, len) { return str.substr(start, len) }\n    : function (str, start, len) {\n        if (start < 0) start = str.length + start;\n        return str.substr(start, len);\n    }\n;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///./node_modules/path-browserify/index.js?");

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n//# sourceURL=webpack:///./node_modules/process/browser.js?");

/***/ }),

/***/ "./views/components/LoginView.js":
/*!***************************************!*\
  !*** ./views/components/LoginView.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"react-dom\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\nvar path = __webpack_require__(/*! path */ \"./node_modules/path-browserify/index.js\");\n\nvar constants = __webpack_require__(/*! ./../constants.js */ \"./views/constants.js\");\n\nvar LoginView =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(LoginView, _React$Component);\n\n  function LoginView() {\n    _classCallCheck(this, LoginView);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(LoginView).apply(this, arguments));\n  }\n\n  _createClass(LoginView, [{\n    key: \"render\",\n    value: function render() {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"main-container container\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"row\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h2\", {\n        className: \"display-1\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", null, \"Hey! Please login :)\"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"row\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\", {\n        className: \"btn btn-success\",\n        href: constants.urls.login\n      }, \"Login\")));\n    }\n  }]);\n\n  return LoginView;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (LoginView);\n\n//# sourceURL=webpack:///./views/components/LoginView.js?");

/***/ }),

/***/ "./views/components/UserInfo.js":
/*!**************************************!*\
  !*** ./views/components/UserInfo.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"react-dom\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\nvar constants = __webpack_require__(/*! ./../constants.js */ \"./views/constants.js\");\n\nvar UserInfo =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(UserInfo, _React$Component);\n\n  function UserInfo(props) {\n    var _this;\n\n    _classCallCheck(this, UserInfo);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(UserInfo).call(this, props));\n    _this.state = {\n      artistlist: [],\n      logged_in: true,\n      avg_popularity: 0.0\n    };\n    return _this;\n  }\n\n  _createClass(UserInfo, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      var _this2 = this;\n\n      axios__WEBPACK_IMPORTED_MODULE_2___default.a.get(\"http://localhost:4321/sauce/api/favartists\").then(function (response) {\n        if (response.status === 200) {\n          var data = response.data;\n          var alist = [],\n              i = 0,\n              total_popularity = 0.0;\n          data.map(function (artist, index) {\n            if (index < 10) {\n              alist.push({\n                name: artist.name,\n                popularity: artist.popularity,\n                ranking: index\n              });\n              total_popularity += artist.popularity * (index + 1);\n            }\n          });\n          alist.sort(function (a, b) {\n            return b.popularity - a.popularity;\n          });\n\n          _this2.setState({\n            artistlist: alist,\n            logged_in: true,\n            avg_popularity: (total_popularity / 55).toFixed(1)\n          });\n\n          console.log(_this2.state);\n        } else {\n          console.log(response);\n        }\n      });\n      /*.catch(error => {\r\n        if(error.response && error.response.status && error.response.status === 401) {\r\n          this.setState({\r\n            artistlist: [],\r\n            logged_in: false,\r\n            avg_popularity: 0.0\r\n          });\r\n        } else {\r\n          console.log(\"unidentified error coming\");\r\n          console.log(JSON.stringify(error));\r\n        }\r\n      });*/\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      if (!this.state.logged_in) {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(LoginView, null);\n      }\n\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"main-container container\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"row\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"col-md-4\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n        className: \"img-fluid rounded-circle\",\n        src: this.props.picture\n      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"col-md-6\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\", {\n        className: \"display-1\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n        className: \"align-middle\"\n      }, this.props.name))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"col-md-2\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\", {\n        className: \"btn btn-danger\",\n        href: constants.urls.logout\n      }, \"Logout\"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"row\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"col-md-8\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"card\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h4\", null, \"Your Basic Rating: \", this.state.avg_popularity), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ol\", {\n        className: \"list-unstyled\"\n      }, this.state.artistlist.map(function (artist, index) {\n        if (index < 10) return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"row rating\"\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"col-md-8\"\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"progress\"\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"progress-bar progress-bar-striped \".concat(artist.popularity < 65 ? '' : artist.popularity < 75 ? 'bg-success' : artist.popularity < 85 ? 'bg-info' : artist.popularity < 95 ? 'bg-warning' : 'bg-danger'),\n          style: {\n            width: artist.popularity + '%'\n          }\n        }, artist.name, \" : \", artist.popularity))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"col-md-4\"\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", null, \"Your #\", artist.ranking + 1)));\n      }))))));\n    }\n  }]);\n\n  return UserInfo;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (UserInfo);\n\n//# sourceURL=webpack:///./views/components/UserInfo.js?");

/***/ }),

/***/ "./views/constants.js":
/*!****************************!*\
  !*** ./views/constants.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var root_url = \"http://localhost:4321\";\nmodule.exports = {\n  urls: {\n    root: root_url,\n    redirect: root_url + '/callback',\n    login: root_url + '/login',\n    logout: root_url + '/logout'\n  },\n  cookies: {\n    access_token: 'access_token',\n    refresh_token: 'refresh_token'\n  },\n  messages: {\n    login_required: 'login_required'\n  },\n  defaults: {\n    picture: \"http://cdn.techgyd.com/ft.png\"\n  },\n  general: {\n    scope: 'user-read-private user-read-email user-top-read'\n  }\n};\n\n//# sourceURL=webpack:///./views/constants.js?");

/***/ }),

/***/ "./views/home.page.js":
/*!****************************!*\
  !*** ./views/home.page.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"react-dom\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_UserInfo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/UserInfo */ \"./views/components/UserInfo.js\");\n/* harmony import */ var _components_LoginView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/LoginView */ \"./views/components/LoginView.js\");\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constants.js */ \"./views/constants.js\");\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_constants_js__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nvar app = document.getElementById(\"app\");\naxios.get(\"http://localhost:4321/sauce/api/userinfo\").then(function (response) {\n  if (response.status === 200) {\n    console.log(response.data);\n    react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_UserInfo__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n      name: response.data.name,\n      picture: response.data.picture ? response.data.picture : constants.defaults.picture\n    }), app);\n  } else {\n    console.log(response);\n  }\n}).catch(function (error) {\n  if (error.response && error.response.status && error.response.status === 401) {\n    react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_LoginView__WEBPACK_IMPORTED_MODULE_3__[\"default\"], null), app);\n  } else {\n    console.log(JSON.stringify(error));\n  }\n});\n\n//# sourceURL=webpack:///./views/home.page.js?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = axios;\n\n//# sourceURL=webpack:///external_%22axios%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = React;\n\n//# sourceURL=webpack:///external_%22React%22?");

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = ReactDOM;\n\n//# sourceURL=webpack:///external_%22ReactDOM%22?");

/***/ })

/******/ });