module.exports = {
  default: {
    timeout: 60 * 1000, // 60 seconds default timeout
    require: ['features/support/**/*.js', 'features/step-definitions/**/*.js'],
    format: ['progress-bar', 'html:cucumber-report.html'],
    parallel: 1
  }
};
