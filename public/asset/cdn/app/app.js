/**
 * ===========================================================================================
 * entry of app lib
 * ===========================================================================================
 */

var app = app || {};

(function() {
    app.register = function(object) {
        let type = object.type + 's';
        if (!app[type]) {
            app[type] = {};
        }
        app[type][object.name] = object;
    };

    app.start = function() {
        app.loadPage();
    }
})();