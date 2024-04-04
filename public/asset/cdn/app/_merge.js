var mergeFiles = require('merge-files');


const outputPath = __dirname + '/app.min.js';
const inputPathList = [
    __dirname + '/app.js',
    __dirname + '/event.js',
    __dirname + '/helper.js',
    __dirname + '/render.js',
    __dirname + '/com.js',
    __dirname + '/page.js'
];

(async () => {
    const status = await mergeFiles(inputPathList, outputPath);
    mergeFiles(inputPathList, outputPath).then((status) => {
        console.log('build ---> app.min.js done', status);
    });
})();


// run: node origin/asset/app/_merge.js
