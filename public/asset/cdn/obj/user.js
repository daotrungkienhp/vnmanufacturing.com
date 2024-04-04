/*
 * ===========================================================================================
 * user
 * - require  util.js, container.js, forge.min.js
 * ===========================================================================================
 */
var net = (net || {});

(function() {
    "use strict";
    var user = net.user = net.user || { cached: {}, config: {}, get root() { return net.os2; } };
    var cached = user.cached;


    user.isLogged = function() {
        return (net.os2 && net.os2.utk && net.os2.host);
    };

    /**
     * Register one user at the specified container.
     * 
     * Url: {@link http://localhost/register-user}
     * 
     * @param {string} userId - Id of root user. eg: user@domain.com
     * @param {string} [password] - password of user. If the password is empty, a random password will be generated.
     * @param {string} [containerId] - Id of container (for working with other containers of the network.).
     * 
     * @return {object} - 
     * - { code: 0, data: { loc:'...' } }
     * - { code: 1, error: "error message" }
     * 
     * */
    user.register = function(userId, password, containerId, callback) {
        var option = {
            userId: userId
        };
        if (password) {
            option.password = getHash(password);
        }
        if (containerId) {
            option.containerId = containerId;
        }

        var access = { host: net.os2.host };

        net.util.post(`user-register`, access, option, (res) => {
            callback(res);
        });
    }

    /**
     * User login to the specified container.
     * 
     * Url: {@link http://localhost/register-user}
     * 
     * @param {string} userId - Id of root user. eg: user@domain.com
     * @param {string} password - password of user.
     * 
     * @return {object} - 
     * - { code: 0, data: { loc, userId, utk } }
     * - { code: 1, error: "error message" }
     * 
     * */
    user.login = function(userId, password, callback) {
        var option = {
            userId: userId,
            password: getHash(password)
        };

        var access = { host: net.os2.host };

        net.util.post(`user-login`, access, option, (res) => {
            if (res.code !== 0) { return callback(res); }
            let row = (res.data || {});

            net.os2.utk = row.utk;
            net.os2.loc = (row.utk || "").slice(128 + 1);
            loadUserConfig(() => {
                saveSession();
                user.loadSession(() => {
                    callback(res);
                });
            });
        });
    };

    user.getUserAccessInfo = function(strContainer) {

        //Fixed Me: Hard code for 25/12/2023
        if (strContainer && strContainer.startsWith('0x00190x')) {
            return { host: "s1.thechangan.net", containerId: "0x00190x" };
        }
        if (strContainer && strContainer.startsWith('0x0020x')) {
            return { host: "s1.thechangan.net", containerId: "0x0020x" };
        }
        //-- End
        
        if (!strContainer || strContainer.indexOf(net.os2.containerId) === 0) { return net.os2; }

        let index = strContainer.indexOf('-');
        let ctr = (index < 0) ? strContainer : strContainer.slice(0, index);
        return cached[ctr];
    }

    user.clearSession = function() {
        localStorage.removeItem('utk');
        localStorage.removeItem('ctr');
        delete net.os2.utk;
        delete user.currentContainer;

        location.reload();
    }

    user.loadSession = function(callback) {
        let utk = localStorage.getItem('utk');
        let ctr = localStorage.getItem('ctr');

        if (!utk) { if (callback) { callback(); } return; }

        net.os2.utk = utk;
        net.os2.loc = (utk || "").slice(128 + 1);
        user.currentContainer = ctr;

        loadUserTokens(() => {
            if (callback) { callback(); }
        });

        function loadUserTokens(done) {
            let url = `${utk.slice(128+1)}/containers.json`;
            net.util.get(url, (file) => {
                try {
                    let rows = JSON.parse(file);

                    let arr;
                    Object.keys(rows).forEach((ctrId) => {
                        if (ctrId[0] !== '0') { return; }
                        arr = rows[ctrId].split(',');
                        cached[ctrId] = { containerId: ctrId, host: arr[0], utk: arr[1], loc: arr[2] };
                    });
                } catch (err) {}
                done();
            });
        }
    }

    user.switchToContainer = function(containerId, reload) {
        if (containerId === net.os2.containerId || cached[containerId]) {
            user.currentContainer = containerId;
            saveSession();
        }
        if (reload) {
            location.reload();
        }
    };

    function loadUserConfig(callback) {
        let utk = net.os2.utk;
        let url = `${utk.slice(128+1)}/user-config.json`;

        let config = {};
        net.util.get(url, (file) => {
            try { config = JSON.parse(file); } catch (err) {}
            user.config = config;
            if (!user.currentContainer) {
                user.currentContainer = (config.defaultContainer || net.os2.containerId);
            }
            callback();
        });
    }

    function saveSession() {
        localStorage.setItem('utk', net.os2.utk);
        if (user.currentContainer) {
            localStorage.setItem('ctr', user.currentContainer);
        }
    }

    function getHash(text) {
        var md = forge.md.sha512.sha256.create();
        md.update(text);
        return md.digest().toHex();
    };
})();