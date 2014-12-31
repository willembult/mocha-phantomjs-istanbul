# mocha-phantomjs-istanbul
> Collect [istanbul](https://github.com/gotwarlost/istanbul) coverage stats from client-side [Mocha](https://github.com/visionmedia/mocha)) tests with [PhantomJS](https://github.com/ariya/phantomjs)) using [mocha-phantomjs](https://github.com/metaskills/mocha-phantomjs).

## Installation
### node
```shell
$ npm install mocha-phantomjs-istanbul --save-dev
```

## Usage
```shell
phantomjs ./node_modules/mocha-phantomjs/lib/mocha-phantomjs.coffee test-runner.html spec '{"hooks": "mocha-phantomjs-istanbul", "coverageFile": ".coverage.json"}'
```

Or running it from [gulp](https://github.com/wearefractal/gulp) with [gulp-mocha-phantomjs](https://github.com/mrhooray/gulp-mocha-phantomjs):
```javascript
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

Use together with [gulp-istanbul-json](https://github.com/willembult/gulp-istanbul-json) to create a report from the coverage file afterwards.

## License
MIT
