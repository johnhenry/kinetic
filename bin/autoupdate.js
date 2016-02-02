var path = require('path');
var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.mysql;
ds.autoupdate(function(err) {
  if (err) throw err;
  var programs = require('./preload.json').programs;
  var exercises = require('./preload.json').exercises;
  var count = programs.length + exercises.length;
  if(!count) return ds.disconnect();
  programs.forEach(function(account) {
    app.models.Program.create(account, function(err, model) {
      if (err) throw err;
      console.log('Created:', model);
      count--;
      if (count <= 0)
        ds.disconnect();
    });
  });
  exercises.forEach(function(account) {
    app.models.Exercise.create(account, function(err, model) {
      if (err) throw err;
      console.log('Created:', model);
      count--;
      if (count <= 0)
        ds.disconnect();
    });
  });
  ds.disconnect();
});
