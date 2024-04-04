var fs = require('fs');
const Path = require('path');
var UglifyJS = require('uglify-js');

const out = __dirname + '/obj.min.js';

fs.writeFileSync(out, UglifyJS.minify([
    fs.readFileSync(__dirname + '/net.js', "utf8"),
    fs.readFileSync(__dirname + '/util.js', "utf8"),
    fs.readFileSync(__dirname + '/user.js', "utf8"),
    fs.readFileSync(__dirname + '/obj.js', "utf8"),
    fs.readFileSync(__dirname + '/container.js', "utf8"),
    fs.readFileSync(__dirname + '/transfer.js', "utf8"),
    fs.readFileSync(__dirname + '/notify.js', "utf8"),
    fs.readFileSync(__dirname + '/schema.js', "utf8"),

    fs.readFileSync(__dirname + '/../store/store.js', "utf8")
]).code, "utf8");

console.log('minify ---> obj.min.js done');


// node admin/asset/net/_minify.js