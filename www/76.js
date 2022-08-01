(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[76],{

/***/ "./node_modules/@ionic/core/dist/esm-es5/ion-spinner.entry.js":
/*!********************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm-es5/ion-spinner.entry.js ***!
  \********************************************************************/
/*! exports provided: ion_spinner */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_spinner", function() { return Spinner; });
/* harmony import */ var _core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core-feeeff0d.js */ "./node_modules/@ionic/core/dist/esm-es5/core-feeeff0d.js");
/* harmony import */ var _config_3c7f3790_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config-3c7f3790.js */ "./node_modules/@ionic/core/dist/esm-es5/config-3c7f3790.js");
/* harmony import */ var _theme_18cbe2cc_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./theme-18cbe2cc.js */ "./node_modules/@ionic/core/dist/esm-es5/theme-18cbe2cc.js");



var spinners = {
    'bubbles': {
        dur: 1000,
        circles: 9,
        fn: function (dur, index, total) {
            var animationDelay = (dur * index / total) - dur + "ms";
            var angle = 2 * Math.PI * index / total;
            return {
                r: 5,
                style: {
                    'top': 9 * Math.sin(angle) + "px",
                    'left': 9 * Math.cos(angle) + "px",
                    'animation-delay': animationDelay,
                }
            };
        }
    },
    'circles': {
        dur: 1000,
        circles: 8,
        fn: function (dur, index, total) {
            var step = index / total;
            var animationDelay = (dur * step) - dur + "ms";
            var angle = 2 * Math.PI * step;
            return {
                r: 5,
                style: {
                    'top': 9 * Math.sin(angle) + "px",
                    'left': 9 * Math.cos(angle) + "px",
                    'animation-delay': animationDelay,
                }
            };
        }
    },
    'circular': {
        dur: 1400,
        elmDuration: true,
        circles: 1,
        fn: function () {
            return {
                r: 20,
                cx: 44,
                cy: 44,
                fill: 'none',
                viewBox: '22 22 44 44',
                transform: 'translate(0,0)',
                style: {}
            };
        }
    },
    'crescent': {
        dur: 750,
        circles: 1,
        fn: function () {
            return {
                r: 26,
                style: {}
            };
        }
    },
    'dots': {
        dur: 750,
        circles: 3,
        fn: function (_, index) {
            var animationDelay = -(110 * index) + 'ms';
            return {
                r: 6,
                style: {
                    'left': 9 - (9 * index) + "px",
                    'animation-delay': animationDelay,
                }
            };
        }
    },
    'lines': {
        dur: 1000,
        lines: 12,
        fn: function (dur, index, total) {
            var transform = "rotate(" + (30 * index + (index < 6 ? 180 : -180)) + "deg)";
            var animationDelay = (dur * index / total) - dur + "ms";
            return {
                y1: 17,
                y2: 29,
                style: {
                    'transform': transform,
                    'animation-delay': animationDelay,
                }
            };
        }
    },
    'lines-small': {
        dur: 1000,
        lines: 12,
        fn: function (dur, index, total) {
            var transform = "rotate(" + (30 * index + (index < 6 ? 180 : -180)) + "deg)";
            var animationDelay = (dur * index / total) - dur + "ms";
            return {
                y1: 12,
                y2: 20,
                style: {
                    'transform': transform,
                    'animation-delay': animationDelay,
                }
            };
        }
    }
};
var SPINNERS = spinners;
var Spinner = /** @class */ (function () {
    function Spinner(hostRef) {
        Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        /**
         * If `true`, the spinner's animation will be paused.
         */
        this.paused = false;
    }
    Spinner.prototype.getName = function () {
        var spinnerName = this.name || _config_3c7f3790_js__WEBPACK_IMPORTED_MODULE_1__["b"].get('spinner');
        var mode = Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this);
        if (spinnerName) {
            return spinnerName;
        }
        return (mode === 'ios') ? 'lines' : 'circular';
    };
    Spinner.prototype.render = function () {
        var _a;
        var self = this;
        var mode = Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["c"])(self);
        var spinnerName = self.getName();
        var spinner = SPINNERS[spinnerName] || SPINNERS['lines'];
        var duration = (typeof self.duration === 'number' && self.duration > 10 ? self.duration : spinner.dur);
        var svgs = [];
        if (spinner.circles !== undefined) {
            for (var i = 0; i < spinner.circles; i++) {
                svgs.push(buildCircle(spinner, duration, i, spinner.circles));
            }
        }
        else if (spinner.lines !== undefined) {
            for (var i = 0; i < spinner.lines; i++) {
                svgs.push(buildLine(spinner, duration, i, spinner.lines));
            }
        }
        return (Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["H"], { class: Object.assign(Object.assign({}, Object(_theme_18cbe2cc_js__WEBPACK_IMPORTED_MODULE_2__["c"])(self.color)), (_a = {}, _a[mode] = true, _a["spinner-" + spinnerName] = true, _a['spinner-paused'] = !!self.paused || _config_3c7f3790_js__WEBPACK_IMPORTED_MODULE_1__["b"].getBoolean('_testing'), _a)), role: "progressbar", style: spinner.elmDuration ? { animationDuration: duration + 'ms' } : {} }, svgs));
    };
    Object.defineProperty(Spinner, "style", {
        get: function () { return ":host{display:inline-block;position:relative;width:28px;height:28px;color:var(--color);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host(.ion-color){color:var(--ion-color-base)}svg{left:0;top:0;-webkit-transform-origin:center;transform-origin:center;position:absolute;width:100%;height:100%;-webkit-transform:translateZ(0);transform:translateZ(0)}:host-context([dir=rtl]) svg,[dir=rtl] svg{left:unset;right:unset;right:0;-webkit-transform-origin:calc(100% - center);transform-origin:calc(100% - center)}:host(.spinner-lines) line,:host(.spinner-lines-small) line{stroke-width:4px;stroke-linecap:round;stroke:currentColor}:host(.spinner-lines) svg,:host(.spinner-lines-small) svg{-webkit-animation:spinner-fade-out 1s linear infinite;animation:spinner-fade-out 1s linear infinite}:host(.spinner-bubbles) svg{-webkit-animation:spinner-scale-out 1s linear infinite;animation:spinner-scale-out 1s linear infinite;fill:currentColor}:host(.spinner-circles) svg{-webkit-animation:spinner-fade-out 1s linear infinite;animation:spinner-fade-out 1s linear infinite;fill:currentColor}:host(.spinner-crescent) circle{fill:transparent;stroke-width:4px;stroke-dasharray:128px;stroke-dashoffset:82px;stroke:currentColor}:host(.spinner-crescent) svg{-webkit-animation:spinner-rotate 1s linear infinite;animation:spinner-rotate 1s linear infinite}:host(.spinner-dots) circle{stroke-width:0;fill:currentColor}:host(.spinner-dots) svg{-webkit-animation:spinner-dots 1s linear infinite;animation:spinner-dots 1s linear infinite}:host(.spinner-circular){-webkit-animation:spinner-circular linear infinite;animation:spinner-circular linear infinite}:host(.spinner-circular) circle{-webkit-animation:spinner-circular-inner ease-in-out infinite;animation:spinner-circular-inner ease-in-out infinite;stroke:currentColor;stroke-dasharray:80px,200px;stroke-dashoffset:0px;stroke-width:3.6;fill:none}:host(.spinner-paused),:host(.spinner-paused) circle,:host(.spinner-paused) svg{-webkit-animation-play-state:paused;animation-play-state:paused}\@-webkit-keyframes spinner-fade-out{0%{opacity:1}to{opacity:0}}\@keyframes spinner-fade-out{0%{opacity:1}to{opacity:0}}\@-webkit-keyframes spinner-scale-out{0%{-webkit-transform:scale(1);transform:scale(1)}to{-webkit-transform:scale(0);transform:scale(0)}}\@keyframes spinner-scale-out{0%{-webkit-transform:scale(1);transform:scale(1)}to{-webkit-transform:scale(0);transform:scale(0)}}\@-webkit-keyframes spinner-rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}\@keyframes spinner-rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}\@-webkit-keyframes spinner-dots{0%{-webkit-transform:scale(1);transform:scale(1);opacity:.9}50%{-webkit-transform:scale(.4);transform:scale(.4);opacity:.3}to{-webkit-transform:scale(1);transform:scale(1);opacity:.9}}\@keyframes spinner-dots{0%{-webkit-transform:scale(1);transform:scale(1);opacity:.9}50%{-webkit-transform:scale(.4);transform:scale(.4);opacity:.3}to{-webkit-transform:scale(1);transform:scale(1);opacity:.9}}\@-webkit-keyframes spinner-circular{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}\@keyframes spinner-circular{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}\@-webkit-keyframes spinner-circular-inner{0%{stroke-dasharray:1px,200px;stroke-dashoffset:0px}50%{stroke-dasharray:100px,200px;stroke-dashoffset:-15px}to{stroke-dasharray:100px,200px;stroke-dashoffset:-125px}}\@keyframes spinner-circular-inner{0%{stroke-dasharray:1px,200px;stroke-dashoffset:0px}50%{stroke-dasharray:100px,200px;stroke-dashoffset:-15px}to{stroke-dasharray:100px,200px;stroke-dashoffset:-125px}}"; },
        enumerable: true,
        configurable: true
    });
    return Spinner;
}());
var buildCircle = function (spinner, duration, index, total) {
    var data = spinner.fn(duration, index, total);
    data.style['animation-duration'] = duration + 'ms';
    return (Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["h"])("svg", { viewBox: data.viewBox || '0 0 64 64', style: data.style }, Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["h"])("circle", { transform: data.transform || 'translate(32,32)', cx: data.cx, cy: data.cy, r: data.r, style: spinner.elmDuration ? { animationDuration: duration + 'ms' } : {} })));
};
var buildLine = function (spinner, duration, index, total) {
    var data = spinner.fn(duration, index, total);
    data.style['animation-duration'] = duration + 'ms';
    return (Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["h"])("svg", { viewBox: data.viewBox || '0 0 64 64', style: data.style }, Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["h"])("line", { transform: "translate(32,32)", y1: data.y1, y2: data.y2 })));
};



/***/ })

}]);
//# sourceMappingURL=76.js.map