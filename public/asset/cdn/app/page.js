/**
 * ===========================================================================================
 * Config view of a page, depend module.js
 * ===========================================================================================
 */
(function() {
    "use strict";

    class Page {
        static get type() { return 'page'; };
        static get name() { return 'Page'; };

        //--- region
        // get top() {
        //     return [{ module: "common", com: "app-topbar" url:"https://domain.com/ctr-lib-0-0-0/" }];
        // }
        // get left() {
        //     return [{ module: "common", com: "wg-menu" }];
        // }
        // get center() { return []; }
    }

    // export
    app.Page = Page;
})();