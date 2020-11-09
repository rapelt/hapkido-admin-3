// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular', "karma-typescript"],
    plugins: [
      require('karma-jasmine'),
      require('karma-typescript'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-mocha-reporter')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage'),
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    reporters: ['mocha', 'kjhtml', "karma-typescript"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless', 'Chrome'],
    autoWatch: true,
    concurrency: Infinity,
    singleRun: false,
    preprocessors: {
      "**/*.ts": "karma-typescript"
    },
    files: [
      // 'node_modules/zone.js/dist/jasmine-patch.js'

      // Adapter

      // simple patterns to load the needed testfiles
      // '**/*.ts',
      // '**/*.spec.ts',
      // './**.*'

      // this file gets served but will be ignored by the watcher
      // {pattern: 'compiled/index.html', watched: false},

      // this file only gets watched but otherwise ignored
      // {pattern: 'app/index.html', included: false, served: false}
    ]
  });



};
