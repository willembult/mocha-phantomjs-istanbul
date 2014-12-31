'use strict';

describe('mocha-phantomjs-istanbul', function() {
  var expect = require('chai').expect;
  var fs     = require('fs');
  var path = require('path');
  var spawn = require('child_process').spawn;
 
  var baseDir = path.join(__dirname, '../');
      
  var phantomPath = './node_modules/.bin/phantomjs';
  var mochaPhantomPath = './node_modules/mocha-phantomjs/lib/mocha-phantomjs.coffee';
  var hookPath = baseDir + '/index.js';
  var covFile = baseDir + '/test/covFile.json';
 
  before( function() {
    this.runner = function(done, fixture, callback) {
      var phantomArgs = [
        mochaPhantomPath,
        fixture,
        'spec',
        '{"hooks": "' + hookPath + '", "coverageFile": "' + covFile + '"}'
      ];

      var phantom = spawn(phantomPath, phantomArgs);

      var stdout = '';
      var stderr = ''; 
      phantom.stdout.on('data', function(data) {stdout = stdout.concat(data.toString());});
      phantom.stderr.on('data', function(data) {stderr = stderr.concat(data.toString());});

      phantom.on('exit', function (code) {
        callback(code, stdout, stderr);
        done();
      });
    };
  });

  function cleanFile() {
    try {
      fs.unlinkSync(covFile);
    } catch (Exception) { }
  }

  beforeEach(cleanFile);
  afterEach(cleanFile);

  it("should write the coverage to the specified file", function(done) {
    var fixturePath = baseDir + '/test/fixture.html';
    this.runner(done, fixturePath, function(code, stdout, stderr){
      // make sure we exited ok
      expect(code).to.equal(0);

      // make sure the coverageFile is there
      var covContents = fs.readFileSync(covFile, {encoding: "utf-8"});
      expect(covContents).to.equal(JSON.stringify({foo: 'bar'}));
    }); 
  });

  it("should fail gracefully when there is no coverage report", function(done) {
    var fixturePath = baseDir + '/test/fixture-no-coverage.html';
    this.runner(done, fixturePath, function(code, stdout, stderr){
      // make sure we exited ok
      expect(code).to.equal(0);

      // make sure there's no coverageFile
      expect(fs.existsSync(covFile)).to.equal(false);
    });
  });

});      
