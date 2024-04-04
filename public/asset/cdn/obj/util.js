//
var net = net || {};

//------------------ xhr
(function() {
    "use strict";

    var util = net.util = net.util || {};

    /**
     * Get static data of specified object.
     * 
     * @param {string} url - path of file. Format `container-object-0-0-0` or `container-object-0-0-0/file-name.ext`
     * @param {object} callback - 
     * */
    util.get = function(url, callback) {
        // console.log('get', url);

        let index = url.indexOf('-');
        let containerId = (index > 0) ? url.slice(0, index) : url;
        let info = net.user.getUserAccessInfo(containerId);

        url = `https://${info.host}/obj/${url}`;

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === 4) {
                let resp;
                if (this.status === 200) {
                    callback(this.responseText);
                } else {
                    callback("");
                }
            }
        };
        xhr.open("GET", url, true);
        if (info.utk) { xhr.setRequestHeader('utk', info.utk); }
        xhr.send();
    };

    util.post = function(api, access, option, callback) {
        if (api === 'search' && option.where) {
            option.where = parseWhere(option.where);
        }
        let url = `https://${access.host}/obj/${api}`;

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {
                // console.warn(url, this.status, this.statusText);
                return callback({ code: 1, error: this.status });
            }

            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                let resp = {};
                try {
                    resp = JSON.parse(this.responseText);
                    if (resp.data) {
                        resp.data = adjustResponseData(resp.data);
                    }
                } catch (error) {
                    // console.error(error, url, this.status, this.statusText, this.responseText);
                }
                return callback(resp || { code: 1, error: this.responseText });
            }
        };

        xhr.open("POST", url, true);
        // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        if (access.utk) { xhr.setRequestHeader('utk', access.utk); }
        xhr.send(toRequestString(option));
    }

    function adjustResponseData(data) {
        if (!data) { return data; }

        if (data.list && Array.isArray(data.list)) {
            var list = data.list;
            for (var i = list.length - 1; i >= 0; i--) {
                list[i] = adjustObject(list[i]);
            }
        }

        if (typeof(data) === 'object') {
            data = adjustObject(data);
        }

        return data;

        function adjustObject(obj) {
            for (var key in obj) {
                // skip loop if the property is from prototype
                if (!obj.hasOwnProperty(key)) continue;

                if (isJsonString(obj[key])) {
                    try {
                        obj[key] = JSON.parse(obj[key]);
                    } catch (err) { console.log(err); }
                }
            }
            return obj;
        }

        function isJsonString(str) {
            // return (typeof(str) === 'string' && str.substr(0, 9).indexOf('{') > -1);
            return (typeof(str) === 'string' && (str[0] === '{' || str[0] === '['));
        }
    }

    function toRequestString(obj) {
        let o = {};
        for (var key in obj) {
            // skip loop if the property is from prototype
            if (!obj.hasOwnProperty(key)) continue;

            if (typeof(obj[key]) === 'object') {
                o[key] = JSON.stringify(obj[key]);
            } else {
                o[key] = obj[key];
            }
        }
        return JSON.stringify(o);
    };

    const ops = {
        ">=": "ge",
        "<=": "le",
        "<>": "ct",
        "!=": "ne",
        ">": "gt",
        "<": "lt",
        "=": "eq"
    };

    function parseWhere(where) {

        if (typeof(where) !== 'string') { return where; }

        let arr = where.split(/[&|]/g).filter(Boolean);
        let logic = (where[arr[0].length] === '||') ? 'or' : 'and';
        let ex, kv, op, exs = [];

        for (var i = arr.length - 1; i >= 0; i--) {
            kv = arr[i];

            ex = kv.split(/>=|<=|<>|!=|>|<|=/g).filter(Boolean);

            op = ops[kv.substring(ex[0].length, kv.length - ex[1].length)];

            ex[1] = ex[1].trim();

            if (ex[1] === '""' || ex[1] === "''") {
                ex[1] = '';
            }

            exs.push({ name: ex[0].trim(), op: op, val: ex[1] });
        }

        return {
            [logic]: exs
        }
    }

})();