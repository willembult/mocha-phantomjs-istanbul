# mocha-phantomjs-istanbul
> Collect [istanbul](https://github.com/gotwarlost/istanbul) coverage stats from client-side [Mocha](https://github.com/visionmedia/mocha) tests with [PhantomJS](https://github.com/ariya/phantomjs) using [mocha-phantomjs](https://github.com/metaskills/mocha-phantomjs).

Collects coverage data from a istanbul-instrumented test suite run in the browser and saves it to a .json file for further processing (for example with [gulp-istanbul-json](https://github.com/willembult/gulp-istanbul-json)).

Works as a hook into mocha-phantomjs. See these discussions for more info: https://github.com/metaskills/mocha-phantomjs/issues/99, https://github.com/metaskills/mocha-phantomjs/pull/113. 

[![Build Status](https://travis-ci.org/willembult/mocha-phantomjs-istanbul.svg?branch=master)](https://travis-ci.org/willembult/mocha-phantomjs-istanbul)

## Installation
```shell
$ npm install mocha-phantomjs-istanbul --save-dev
```

## Usage
You'll need to specify two things when running mocha-phantomjs: 
* this module as the hook to use
* the destination file for the coverage info. This is passed as an option to mocha-phantomjs. It's a bit of a hack, because it's not an option mocha-phantomjs actually recognizes, but this allows our hook to find it again.

### shell
You'll probably not be running this from the command line, but you could:
```shell
phantomjs ./node_modules/mocha-phantomjs/lib/mocha-phantomjs.coffee test-runner.html spec '{"hooks": "mocha-phantomjs-istanbul", "coverageFile": ".coverage.json"}'
```

### gulp
It's more likely you'll run this from [gulp](https://github.com/wearefractal/gulp) with [gulp-mocha-phantomjs](https://github.com/mrhooray/gulp-mocha-phantomjs). The options get passed through using `phantomjs`.

```javascript
var mochaPhantomJS = require('gulp-mocha-phantomjs');

gulp.task('test', function () {
  gulp.src('test-runner.html', {read: false})
    .pipe(mochaPhantomJS({
      phantomjs: {
        hooks: 'mocha-phantomjs-istanbul',
        coverageFile: './coverage/coverage.json'
      },
      reporter: 'spec'
  }));
});
```

### What to do with the coverageFile? 
Use it with some other plugin to turn the JSON file into a full report. If you use gulp, you could use [gulp-istanbul-json](https://github.com/willembult/gulp-istanbul-json).

## License
MIT
