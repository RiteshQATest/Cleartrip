# Changelog

## [1.0.0] - 2024-01-01

### Added
- Complete BDD testing framework using Playwright and Cucumber.js
- Hotel search feature file with 7 test scenarios
- Flight search feature file with 5 test scenarios
- Train search feature file with 4 test scenarios
- Common navigation feature file with 4 test scenarios
- Page Object Model implementation for Hotels, Flights, Trains, and Common pages
- Step definition files for all modules
- Cucumber World class for browser context management
- Before/After hooks for test lifecycle management
- Configuration management with dotenv support
- Logging utility with file-based logging
- Utility helpers for date manipulation and file operations
- Multiple Cucumber profiles (default, smoke, regression, hotels, flights, trains)
- npm scripts for different test execution modes
- Automatic screenshot capture on test failures
- HTML/JSON report generation
- Multi-browser support (Chromium, Firefox, WebKit)
- Parallel test execution support
- Tag-based test filtering (@smoke, @regression, @hotels, @flights, @trains)
- Environment variable management (.env.example)
- Comprehensive documentation (README.md, SETUP.md)

## [Unreleased]

### Planned
- Additional hotel filtering scenarios
- Price comparison tests
- User authentication tests
- Booking flow end-to-end tests
- Mobile viewport testing
- Visual regression testing
- Performance metrics collection
