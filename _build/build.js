var async  = require('async');
var csso   = require('csso');
var ff     = require('ff');
var fs     = require('fs');
var jade   = require('jade');
var nib    = require('nib');
var stylus = require('stylus');
var uglify = require('uglify-js');

var files = require(__dirname + '/files');

var f = ff(function () {
  async.eachSeries(Object.keys(files.html), function (file, next) {
    console.log('Generating ' + file + '...');
    var filename = __dirname + '/html/' + files.html[file];
    var html     = jade.compile(fs.readFileSync(filename), { filename: filename })();
    fs.writeFileSync(__dirname + '/../' + file, html, { encoding: 'utf8' });
    setImmediate(next);
  }, f.wait());

}, function () {
  async.eachSeries(Object.keys(files.css), function (file, next) {
    console.log('Generating ' + file + '...');
    var styl = files.css[file].map(function (src) { return fs.readFileSync(__dirname + '/css/' + src); }).join('\n');
    stylus(styl).use(nib()).render(function (err, css) {
      if (err) { console.log('Error with ', file, ': ', err); }
      css = csso.justDoIt(css);
      fs.writeFileSync(__dirname + '/../css/' + file, css, { encoding: 'utf8' });
      setImmediate(next);
    });
  }, f.wait());

}, function () {
  async.eachSeries(Object.keys(files.js), function (file, next) {
    console.log('Generating ' + file + '...');
    var js = files.js[file].map(function (src) { return fs.readFileSync(__dirname + '/js/' + src); }).join('\n');
    if (file.indexOf('vendor.js') === -1) { js = uglify.minify(js, { fromString: true }).code; }
    fs.writeFileSync(__dirname + '/../js/' + file, js, { encoding: 'utf8' });
    setImmediate(next);
  }, f.wait());

}).onSuccess(function () {
  console.log('Done!');

}).onError(function (err) {
  console.log('Error: ' + (err.stack || err));

}).onComplete(function () {
  process.exit();
});
