const Path = require('path');
var mergeFiles = require('merge-files');


const outputPath = __dirname + '/obj.min.js';
const inputPathList = [
    __dirname + '/net.js',
    __dirname + '/util.js',
    __dirname + '/user.js',
    __dirname + '/obj.js',
    __dirname + '/container.js',
    __dirname + '/transfer.js',
    __dirname + '/notify.js',
    __dirname + '/schema.js',
    __dirname + '/../store/store.js'
];

(async () => {

    for (var i = inputPathList.length - 1; i >= 0; i--) {
        inputPathList[i] = Path.normalize(inputPathList[i]);
    }

    const status = await mergeFiles(inputPathList, outputPath);
    mergeFiles(inputPathList, outputPath).then((status) => {
        console.log('merge ---> obj.min.js done', status);
    });
})();


// node admin/asset/net/_merge.js