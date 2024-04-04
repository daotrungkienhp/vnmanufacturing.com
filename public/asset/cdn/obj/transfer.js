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

    /**
     * @class obj
     * 
     * For working with object data in the space.
     * */
    var sobj = net.obj = net.obj || {};


    // /**
    //  * Send message broadcast
    //  * 
    //  * @param {object} msg - the message
    //  * {
    //  *    to: "comId,orgId,eid",
    //  *    content: "{
    //  *          action: 'new',
    //  *          dataType: 'name of space',
    //  *          originLoc: '',
    //  *          item: {}
    //  * 
    //  *          //action: 'update',
    //  *          dataType: 'name of space',
    //  *          originLoc: '',
    //  *          item: {}
    //  * 
    //  *          //action: 'remove',
    //  *          originLoc: '',
    //  * 
    //  *          //action: 'adjust',
    //  *          originLoc: '',
    //  *          field: 'like|...',
    //  *          value: -2,
    //  *    }",
    //  *    //status: {}
    //  * }
    //  * 
    //  * @return {object} callback 
    //  * - {code: 0} success
    //  * - {code: 1, error: ''} error
    //  * */
    // sobj.broadcast = function(msg, callback) {
    //     if (!msg.to || !msg.content) {
    //         return callback({ code: 1, error: "invalid message" });
    //     }
    //     util.post(`broadcast-msg`, msg, callback);
    // };

})();