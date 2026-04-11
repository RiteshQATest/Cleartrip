module.exports = {
  default: {
    timeout: 60 * 1000, // 60 seconds default timeout
    require: [
      'support/world.js',
      'support/hooks.js',
      'features/step-definitions/**/*.js'
    ],
    format: [
      'progress-bar',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json'
    ],
    parallel: 1,
    publishQuiet: true
  },
  smoke: {
    timeout: 60 * 1000,
    require: [
      'support/world.js',
      'support/hooks.js',
      'features/step-definitions/**/*.js'
    ],
    tags: '@smoke',
    format: [
      'progress-bar',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json'
    ],
    parallel: 1,
    publishQuiet: true
  },
  regression: {
    timeout: 90 * 1000,
    require: [
      'support/world.js',
      'support/hooks.js',
      'features/step-definitions/**/*.js'
    ],
    tags: '@regression',
    format: [
      'progress-bar',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json'
    ],
    parallel: 2,
    publishQuiet: true
  },
  hotels: {
    timeout: 60 * 1000,
    require: [
      'support/world.js',
      'support/hooks.js',
      'features/step-definitions/**/*.js'
    ],
    tags: '@hotels',
    format: [
      'progress-bar',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json'
    ],
    parallel: 1,
    publishQuiet: true
  },
  flights: {
    timeout: 60 * 1000,
    require: [
      'support/world.js',
      'support/hooks.js',
      'features/step-definitions/**/*.js'
    ],
    tags: '@flights',
    format: [
      'progress-bar',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json'
    ],
    parallel: 1,
    publishQuiet: true
  },
  trains: {
    timeout: 60 * 1000,
    require: [
      'support/world.js',
      'support/hooks.js',
      'features/step-definitions/**/*.js'
    ],
    tags: '@trains',
    format: [
      'progress-bar',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json'
    ],
    parallel: 1,
    publishQuiet: true
  }
};

