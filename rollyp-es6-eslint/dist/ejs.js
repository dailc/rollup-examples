/*!
 * ejs v3.0.0
 * (c) 2017-2017 dailc
 * Released under the GPL-3.0 License.
 * https://github.com/dailc/ejs
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ejs = factory());
}(this, (function () { 'use strict';

function warn(msg) {
    // 模板字符串
    console.error("[BScroll warn]: " + msg);
}

var ejs = {};

warn('init ejs');

ejs.Version = '3.0.0';

return ejs;

})));
