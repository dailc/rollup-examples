const DEFAULT_INTERVAL = 1000 / 60;

export const requestAnimationFrame = (() => window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        // if all else fails, use setTimeout
        function (callback) {
            return window.setTimeout(callback, (callback.interval || DEFAULT_INTERVAL) / 2); // make interval as precise as possible.
        })();

export const cancelAnimationFrame = (() => window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.oCancelAnimationFrame ||
        function (id) {
            window.clearTimeout(id);
        })();