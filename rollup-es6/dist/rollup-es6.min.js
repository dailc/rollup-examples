/*!
 * rollup-es6 v1.0.0
 * (c) 2017-2017 dailc
 * Released under the mit License.
 * https://github.com/dailc/rollup-examples
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.hello = factory());
}(this, (function () { 'use strict';

function warn(msg) {
    // 模板字符串
    console.error("[quick error]: " + msg);
}

var ejs = {};

warn('init ejs');

ejs.Version = '3.0.0';

return ejs;

})));
