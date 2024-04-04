/**
 * ===========================================================================================
 * helper.js
 * ===========================================================================================
 */
(function() {
    "use strict";

    class Helper {

        static random(length) {
            var ran = '';
            var chat = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var leng = chat.length;
            for (var i = 0; i < length; i++) {
                ran += chat.charAt(Math.floor(Math.random() * leng));
            }
            return ran;
        }

        static getParameterByName(name, url) {
            if (!url) url = window.location.search;
            name = name.replace(/[\[\]]/g, '\\$&');
            var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        }

        static addScript(list, callback) {
            var self = this;

            let js = list.shift();
            if (js === undefined) { return callback(); }

            let script = document.createElement('script');
            script.type = "text/javascript";
            script.src = js;
            script.onload = function() {
                // console.log('mc load', name);
                self.addScript(list, callback); // next
            }
            script.onerror = function() {
                console.error('load script', script.src, 'error');
            }
            document.body.appendChild(script);
        }

        static addStyleSheet(list, callback) {
            var self = this;

            let css = list.shift();
            if (css === undefined) { return callback(); }

            let link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = css;
            link.media = 'all';

            link.onload = function() {
                // console.log('mc load', name);
                self.addStyleSheet(list, callback); // next
            }
            link.onerror = function() {
                console.error('load link', link.href, 'error');
            }

            document.head.appendChild(link);
        }
    }

    // export
    app.Helper = Helper;
})();