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

    net.obj = net.obj || {};
    if (net.obj.schema) { return; }
    const schema = net.obj.schema = {}

    schema.user = {
        userId: 'user@domain.com', // same with all container of the service.
        token: '', // same with all container of the service.
        passOrg: '', // 
        // password: '',            //
        accessRights: 'userId,containerid-data_access_permit-x-y-z'
    };

    schema.server = {
        ip: 'xx.yy.zz.tt',
        name: 'si.thechangan.com',
        serverId: 'si'
    };

    schema.container = {
        name: '',
        containerId: '0x....0x',
        userId: 'user@domain.com',
        userLoc: 'container-user-x-y-z',
        host: 'serverId.domain.com'
    };

    schema.product = {
        name: '',
        sku: ''
    };

    schema.message = {
        name: '',
        content: ''
    };

    schema.domain = {
        name: 'domain.com',
        webLoc: '',
        // wasSetup: ''
    };

})();