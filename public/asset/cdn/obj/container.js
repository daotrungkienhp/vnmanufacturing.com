/**
 * @class net
 * 
 * The client library to work with object service api.
 * - require util.js
 */
var net = net || {};

//------------------------------------------- obj
(function() {
    "use strict";

    var util = net.util;

    /**
     * @class obj
     * 
     * For working with object data in the space.
     * */
    var ctr = net.ctr = net.ctr || {};
    var getUserAccessInfo = net.user.getUserAccessInfo;

    /**
     * Create new container for specified user.
     * Note that, the user can only create containers on servers where usage quotas have been set.
     * 
     * Url: {@link http://localhost/create-container}
     * 
     * @return {object} - 
     * - { code: 0, data: { containerId:'...', utk:'...' } }
     * - { code: 1, error: "error message" }
     * 
     * */
    ctr.createContainer = function(callback) {
        let info = net.user.getUserAccessInfo(net.os2.containerId);
        net.util.post(`create-container`, info, {}, (res) => {
            if (res.code === 0) {
                let dt = res.data;
                net.user.cached[dt.containerId] = dt;
            }

            callback(res);
        });
    }

    /**
     * Remove container of user.
     * Note that, only the creator can remove his or her container.
     * 
     * Url: {@link http://localhost/remove-container}
     * 
     * @param {string} containerId - Id of container to remove.
     * 
     * @return {object} - 
     * - { code: 0, data: {} }
     * - { code: 1, error: "error message" }
     * 
     * */
    ctr.removeContainer = function(containerId, callback) {
        let info = getUserAccessInfo(net.os2.containerId);
        net.util.post(`remove-container`, info, {}, (res) => {
            callback(res);
        });
    }





































    //
})();