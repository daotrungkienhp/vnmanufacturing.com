/**
 * @class net
 * 
 * The client library to work with object service api.
 * - require util.js, user.js
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
    var getUserAccessInfo = net.user.getUserAccessInfo;

    /**
     * Init new object.
     * 
     * @param {string} name - name of object
     * @param {string} [containerId] - container Id
     * @param {boolean} [schema] - use standard object schema or is not. Default is `true`
     * */
    sobj.new = function(name, containerId, schema = true) {
        let ctrId = containerId || net.user.currentContainer;
        let obj = (net.obj.schema[name] || {});
        obj.spaceLoc = `${ctrId}-${name}`;

        return obj;
    };

    /**
     * Create space loc
     * 
     * @param {string} name - name of object
     * @param {string} [containerId] - container Id
     * */
    sobj.spaceLoc = function(name, containerId) {
        return `${containerId || net.user.currentContainer}-${name}`;
    }

    /**
     * Save or add new object
     * 
     * @param {object} obj - object to save or add
     * @return {object} 
     * - { code: 0, data: { loc:'...' } }
     * - { code: 1, error: "error message" }
     * */
    sobj.save = function(obj, callback) {
        let info = getUserAccessInfo(obj.loc || obj.spaceLoc);
        if (obj.loc) {
            return util.post(`update`, info, obj, callback);
        }
        util.post(`insert`, info, obj, callback);
    };

    /**
     * Get an object
     * 
     * @param {string} loc - location code of object
     * @return {object} 
     * - { code: 0, data: data }
     * - { code: 1, error: "error messge" }
     * 
     * @example 
     * // return status of a server
     * {
     *      "code": 0,
     *      "data": {
     *          "text": "hello world",
     *          "sender": "objspace"
     *      }
     * }
     * */
    sobj.get = function(loc, callback) {
        let info = getUserAccessInfo(loc);
        util.post(`get`, info, { loc: loc }, callback);
    };

    /**
     * Remove an object
     * 
     * @param {string} loc - location code of object
     * @return {objec} 
     * - { code: 0 }
     * - { code: 1, error: 'error message' }
     * */
    sobj.remove = function(loc, callback) {
        let info = getUserAccessInfo(loc);
        util.post(`remove`, info, { loc: loc }, callback);
    };

    /**
     * Search objects
     * 
     * @param {object} option - condition of searching
     * @param {string} option.spaceLoc - space of searching eg: 'containerId-post'
     * @param {string} option.where - where condition eg: 'k1=v1&k2>=v2'
     * @param {number} [option.limit=50] - limit number to get, default value is 50
     * @param {string} [option.offset] - offset value to search
     * @return {object} 
     * - { code: 0, data: {list: []} }
     * */
    sobj.search = function(option, callback) {
        let info = getUserAccessInfo(option.spaceLoc);
        util.post(`search`, info, option, callback);
    };

    /**
     * Get a list of object
     * 
     * @param {string} locs - list of location code of object, eg: 'loc1,loc2,...'
     * @return {object} 
     * - { code: 0, data: {list: []} }
     * - { code: 1, error: "error message" }
     * */
    sobj.getList = function(locs, callback) {
        let info = getUserAccessInfo(locs);
        util.post(`get-list`, info, { locs: locs }, callback);
    };

    /**
     * Remove a list of object
     * 
     * @param {string} locs - list of location code of object, eg: 'loc1,loc2,...'
     * @return {object} 
     * - { code: 0, errors: [] }
     * - { code: 1, errors: "Error message" }
     * */
    sobj.removeList = function(locs, callback) {
        let info = getUserAccessInfo(locs);
        util.post(`remove-list`, info, { locs: locs }, callback);
    };

    /**
     * 
     * Share an object to consumers.
     * 
     * @param {string} loc - Location of object.
     * @param {string} option - option of api.
     * @param {string} option.userIds - List of local userLoc. Eg: "userId1,userId2,...".
     * @param {string} [option.accessRight] - Access permission of sharing, default {insert: 1, update: 1, remove: 1, read: 1}
     * Notes:
     * - accesRight = undefined to unshare.
     * - accessRight = undefined and userIds = '*' to unshare with all users.
     * 
     * @param {string} [option.subnames] - The list name of subitem of object will be changed. Eg: "childs,subnode,..."
     * - example of object to share for subnames = "childs,subnode":
     * {
     *  ...
     *   "childs": "child-1,child-2,...",
     *   "subnode": "subnode"
     * }
     * @return {object} 
     * - { code: 0, data: { loc:'...' } }
     * - { code: 1, error: "error message" }
     * 
     * */
    sobj.shareObjectItem = function(loc, option, callback) {
        let info = getUserAccessInfo(loc);
        option.loc = loc;
        util.post(`share-object-item`, info, option, callback);
    };

    /**
     * Unshare an object.
     * 
     * @param {string} loc - location of object.
     * @param {string} option - option of api.
     * @param {string} [option.userIds] - List of local userLoc. Eg: "userId1,userId2,...". userIds = '*' to unshare for all.
     * @param {string} [option.subnames] - The list name of subitem of object will be changed. Eg: "childs,subnode,..."
     * @return {object} 
     * - { code: 0, data: { loc:'...' } }
     * - { code: 1, error: "error message" }
     * */
    sobj.unshareObjectItem = function(loc, option, callback) {
        sobj.shareObjectItem(loc, option, callback);
    };

    /**
     * Quickly publish an object to the public.
     * 
     * @param {string} loc - location of object.
     * @param {string} [subnames] - The list name of subitem of object will be changed. Eg: "childs,subnode,..."
     * @return {object} 
     * - { code: 0, data: { loc:'...' } }
     * - { code: 1, error: "error message" }
     * */
    sobj.publicObjectItem = function(loc, subnames, callback) {
        let opt = {
            userIds: 'guest',
            accessRight: { 'read': 1 },
            subnames: subnames
        };
        sobj.shareObjectItem(loc, opt, callback);
    };

    /**
     * Quickly un publish an object.
     * 
     * @param {string} loc - location of object.
     * @param {string} [subnames] - The list name of subitem of object will be changed. Eg: "childs,subnode,..."
     * @return {object} 
     * - { code: 0, data: { loc:'...' } }
     * - { code: 1, error: "error message" }
     * */
    sobj.unpublicObjectItem = function(loc, subnames, callback) {
        sobj.unshareObjectItem(loc, { userIds: '*', subnames: subnames }, callback);
    };

    /**
     * Share or publish an object space to consumers.
     * 
     * @param {string} spaceLoc - Location of object space.
     * @param {string} option - option of api.
     * @param {string} option.userIds - List of local userLoc. Eg: "userId1,userId2,...".
     * @param {string} option.accessRight - Access permission of sharing, default {insert: 1, update: 1, remove: 1, read: 1, [rate: 1, comment: 1, share: 1]}
     * @return {object} 
     * - { code: 0, data: { loc:'...' } }
     * - { code: 1, error: "error message" }
     * 
     * */
    sobj.shareObjectSpace = function(spaceLoc, option, callback) {
        let info = getUserAccessInfo(spaceLoc);
        option.spaceLoc = spaceLoc;
        util.post(`share-object-space`, info, option, callback);
    };

    /**
     * Unshare an object space.
     * 
     * @param {string} spaceLoc - location of object space.
     * @return {object} 
     * - { code: 0, data: { loc:'...' } }
     * - { code: 1, error: "error message" }
     * */
    sobj.unshareObjectSpace = function(spaceLoc, callback) {
        let info = getUserAccessInfo(spaceLoc);
        util.post(`unshare-object-space`, info, { spaceLoc: spaceLoc }, callback);
    };

    /**
     * 
     * Upload files to static part of specified object.
     * 
     * Url: {@link http://localhost/add-file-to-object?loc=container-object-0-0-0&path=folder/name.jpg}
     * 
     * @param {array} loc - the location code of object.
     * @param {array} files - the list of file upload to object.
     * @param {string} [folder] - related folder to save file.
     * 
     * @return {object} - upload result
     * - Success { code: 0, error: null, files: [] }
     * - Error { code: 1, error: [] }
     *  */
    sobj.addFileToObject = function(loc, folder, files, callback, progressUpdate) {
        if (!loc) { return callback({ code: 1, error: 'Invalid request' }); }

        let info = getUserAccessInfo(loc);
        let url = `https://${info.host}/obj/add-file-to-object`;
        url += `?loc=${loc}`;
        if (folder) {
            url += `&folder=${folder}`;
        }

        const formData = new FormData();
        Array.from(files).forEach(file => {
            formData.append("files", file);
        });

        // post form data
        const xhr = new XMLHttpRequest();

        // log response
        xhr.onload = () => {
            let res = JSON.parse(xhr.responseText);
            callback(res);
            // console.log('res', res);
        };


        // Todo: temporary do not support update progress 20/12/2023
        if (0) {
            // upload progress
            if (progressUpdate) {
                let percent = 0;
                xhr.upload.onloadstart = (evt) => { progressUpdate(0); };
                xhr.upload.onloadend = (evt) => { progressUpdate(100); };
                xhr.upload.onprogress = (evt) => {
                    percent = Math.ceil((evt.loaded / evt.total) * 100);
                    progressUpdate(percent);
                };
            }
        }

        // create and send the request
        xhr.open('POST', url);
        if (info.utk) { xhr.setRequestHeader('utk', info.utk); }
        xhr.send(formData);
        return xhr;
    };

    /**
     * 
     * Url: {@link http://localhost/remove-file-of-object}
     * 
     * Remove files of object.
     * 
     * @param {string} loc - location of object.
     * @param {string} file - relative path to file. Value `*` to remove all files of object (with .ext).
     * 
     * @return {object} 
     * - { code: 0 }
     * - { code: 1, error: "error message" }
     * 
     * */
    sobj.removeFileOfObject = function(loc, file, callback) {
        let info = getUserAccessInfo(loc);
        util.post(`remove-file-of-object`, info, { loc: loc, file: file }, callback);
    };

    /**
     * Url: {@link http://localhost/add-data-segment-to-file}
     * 
     * Add string data segment to static part of object.
     * 
     * @param {string} loc - location of object.
     * @param {string} option - option of request.
     * @param {string} option.filePath - relative path of file to store data eg: folder/name.json.
     * @param {string} [option.dataId] - id of data.
     * @param {string} option.dataSegment - data segment will be add to static, each segment separated by ','. eg: "segment-1,segment-2,..."
     * @param {string} [option.dataType] - `shortLoc` or `loc` or undefined.
     * 
     * @return {object} 
     * - { code: 0 }
     * - { code: 1, error: "error message" }
     * 
     * @example 
     * // structure of the file to storage data.
     * {
     *      "__array": ["data1", "data2", ...],
     * 
     *      "dataId1": "data1",
     *      "dataId2": "data2"
     * }
     * */
    sobj.addDataSegmentToFile = function(loc, option, callback) {
        let info = getUserAccessInfo(loc);
        option.loc = loc;
        util.post(`add-data-segment-to-file`, info, option, callback);
    };

    /**
     * Url: {@link http://localhost/remove-data-segment-from-file}
     * 
     * Remove one data segment from specified file of object.
     * 
     * @param {string} loc - location of object.
     * @param {string} option - option of request.
     * @param {string} option.filePath - relative path of file to store data eg: folder/name.json.
     * @param {string} [option.dataId] - id of data to remove.
     * @param {string} [option.dataSegment] - data segment will be remove from file. eg: "segment-1,segment-2,..."
     * 
     * @return {object} 
     * - { code: 0 }
     * - { code: 1, error: "error message" }
     * 
     * @example 
     * // structure of the file to storage data.
     * {
     *      "__array": ["data1", "data2", ...],
     * 
     *      "dataId1": "data1",
     *      "dataId2": "data2"
     * }
     * */
    sobj.removeDataSegmentFromFile = function(loc, option, callback) {
        let info = getUserAccessInfo(loc);
        option.loc = loc;
        util.post(`remove-data-segment-from-file`, info, option, callback);
    };

})();