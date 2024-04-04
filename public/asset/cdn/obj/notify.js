/**
 * @class net
 * 
 * The client library to work with object service api.
 * 
 * - require util.js
 */
var net = net || {};

//------------------------------------------- obj
(function() {
    "use strict";

    var util = net.util;
    var addCTRID = util.addCTRID;

    /**
     * @class obj
     * 
     * For working with object data in the space.
     * */
    var sobj = net.obj = net.obj || {};

    /**
     * Register to listen to new notifications.
     * 
     * Working mechanism of polling:
     *    1) ping: to the server to know have news or not.
     *    2) ask: to get news from the server.
     *    3) emit: to the listeners.
     * @param {function} callback - listener
     */
    net.onNotify = function(callback) {
        if (!net.__notifier) {
            net.__notifier = initNotifier();
        }
        net.__notifier.register(callback);
    };

    function initNotifier() {
        var listeners = [];
        var esid = getesid();
        var host = location.origin;
        var delay = 3;

        function ping() {
            var msg = { esid: esid };
            util.post(`${host}/ping`, msg, (res) => {
                // console.log('ping', msg, res);
                if (res.news) {
                    return ask(); // ask what new ?
                }

                delay = (res.code) ? ++delay : 3;
                esid = res.esid; // update
                next();
            });
        }

        function ask() {
            var msg = { esid: esid };
            util.post(`${host}/ask`, msg, (res) => {
                // console.log('ask', msg, res);
                if (res.code === 0) {
                    esid = res.esid; // update
                    emit(res.data);
                }
                next();
            });
        }

        function emit(items) {
            listeners.forEach(cb => {
                if (cb) { cb(items); }
            });
        }

        function next() {
            setTimeout(function() {
                if (listeners.length > 0) {
                    ping(); // continue
                }
            }, delay * 1000); // * 1 second
        }

        function register(callback) {
            if (callback) {
                listeners.push(callback);
                next();
            }
        }

        function getesid() {
            var str = (net.user.links || "").split(',').filter(Boolean).map(id => { return id + ',-1'; }).join(',');
            str = (`${net.user.ctr},-1`) + ((str) ? `,${str}` : "");
            console.log('esid', str);
            return str;
        }

        // export
        return { register: register };
    }

})();