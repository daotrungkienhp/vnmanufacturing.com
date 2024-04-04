/**
 * @class net
 * 
 * The client library to work with selling service.
 * - require net.obj.min.js
 */
var net = net || {};

//------------------------------------------- obj
(function() {
    "use strict";

    var util = net.util;

    /**
     * @class obj
     * 
     * For working with selling service.
     * */
    var store = net.store = net.store || {};
    var getUserAccessInfo = net.user.getUserAccessInfo;

    /**
     * Create new store for specified user.
     * 
     * Url: {@link http://localhost/create-store}
     * 
     * @return {object} - 
     * - { code: 0, data: { containerId:'...', utk:'...' } }
     * - { code: 1, error: "error message" }
     * 
     * */
    store.createStore = function(callback) {
        // 1) create new container.
        net.ctr.createContainer((res) => {
            if (res.code !== 0) { return callback(res); }

            // 2) create store on the container.
            let ctr = res.data;
            net.user.switchToContainer(ctr.containerId);

            let item = {
                name: "My Store",
                title: "My Store",
                language: "en-US",
                country: "us",
                timezone: "America/Los_Angeles",
                owner: net.user.root.loc,
                spaceLoc: net.obj.spaceLoc('store')
            };
            net.obj.save(item, (res) => {
                if (res.code !== 0) { return callback(res); }

                addDefaultDataStore(res.data.loc, () => {
                    callback(res);
                });
            });
        });

        function addDefaultDataStore(storeLoc, done) {
            let opt = { dataId: "owner", dataSegment: net.user.root.loc };

            opt.filePath = "profile.json";
            net.obj.addDataSegmentToFile(storeLoc, opt, (res) => {
                opt.filePath = "config.json";
                net.obj.addDataSegmentToFile(storeLoc, opt, (res) => {
                    done();
                });
            });
        }
    }







































    //
})();