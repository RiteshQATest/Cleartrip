# Cleartrip BDD Testing Framework

A complete BDD (Behavior-Driven Development) testing framework for the Cleartrip website using Playwright and Cucumber.js.

## Overview

This framework provides a scalable, maintainable, and professional test automation solution with:

- **Cucumber.js** for Gherkin-based BDD test writing
- **Playwright** for cross-browser automation (Chromium, Firefox, WebKit)
- **Page Object Model (POM)** pattern for maintainability
- **Comprehensive reporting** with HTML/JSON reports and screenshots

## Project Structure

```
Cleartrip/
├── features/
│   ├── hotelSearch.feature        # Hotel search scenarios
│   ├── flightSearch.feature       # Flight search scenarios
│   ├── trainSearch.feature        # Train search scenarios
│   ├── common.feature             # Common navigation scenarios
│   └── step-definitions/
│       ├── hotelSearch.steps.js   # Hotel search step implementations
│       ├── flightSearch.steps.js  # Flight search step implementations
│       ├── trainSearch.steps.js   # Train search step implementations
│       └── commonSteps.js         # Common navigation steps
├── support/
│   ├── config.js                  # Configuration management
│   ├── logger.js                  # Logging utility
│   ├── utils.js                   # Helper utilities
│   ├── world.js                   # Cucumber World class
│   ├── hooks.js                   # Before/After hooks
│   └── pages/
│       ├── CommonPage.js          # Base page object
│       ├── HotelSearchPage.js     # Hotel search page object
│       ├── FlightSearchPage.js    # Flight search page object
│       └── TrainSearchPage.js     # Train search page object
├── reports/
│   ├── screenshots/               # Failure screenshots
│   ├── videos/                    # Test recordings
│   ├── logs/                      # Test logs
│   └── html-snapshots/            # Page HTML snapshots
├── cucumber.js                    # Cucumber configuration
├── package.json                   # Dependencies and scripts
├── .env.example                   # Environment variables template
└── README.md                      # This file
```

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browsers
npx playwright install chromium

# 3. Configure environment
cp .env.example .env

# 4. Run smoke tests
npm run test:smoke
```

## Test Execution

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:smoke` | Run @smoke tagged tests |
| `npm run test:regression` | Run @regression tagged tests |
| `npm run test:hotels` | Run @hotels tagged tests |
| `npm run test:flights` | Run @flights tagged tests |
| `npm run test:trains` | Run @trains tagged tests |
| `npm run test:headed` | Run with browser visible |
| `npm run test:debug` | Debug mode with slow motion |
| `npm run test:firefox` | Run with Firefox browser |
| `npm run test:webkit` | Run with Safari/WebKit |
| `npm run test:parallel` | Run tests in parallel |
| `npm run test:single` | Run tests sequentially |
| `npm run clean` | Clean all reports |

### Running Specific Scenarios

```bash
# Run by tag
npx cucumber-js --tags @smoke
npx cucumber-js --tags "@hotels and @smoke"
npx cucumber-js --tags "@hotels or @flights"
npx cucumber-js --tags "not @regression"

# Run specific feature file
npx cucumber-js features/hotelSearch.feature

# Run with specific profile
npx cucumber-js --profile hotels
npx cucumber-js --profile smoke
```

## Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

| Variable | Default | Description |
|----------|---------|-------------|
| `BASE_URL` | `https://www.cleartrip.com` | Application base URL |
| `BROWSER` | `chromium` | Browser type (chromium/firefox/webkit) |
| `HEADLESS` | `true` | Run browser in headless mode |
| `SLOW_MO` | `0` | Slow down actions (ms) |
| `TIMEOUT` | `30000` | Default action timeout (ms) |
| `SCREENSHOT` | `true` | Capture screenshots on failure |
| `VIDEO` | `false` | Record test videos |
| `TRACING` | `false` | Enable Playwright tracing |
| `ENVIRONMENT` | `staging` | Test environment |

## Test Scenarios

### Hotel Search (7 scenarios)
- ✅ Search with valid dates and location (Mumbai)
- ✅ Search in multiple cities (Delhi, Bangalore, Goa, Chennai)
- ✅ Filter by price range
- ✅ Filter by star rating
- ✅ Filter by amenities (Free WiFi)
- ✅ Multiple guests and rooms
- ✅ Advanced filtering options

### Flight Search (5 scenarios)
- ✅ One-way flight search
- ✅ Round-trip flight search
- ✅ Cabin class selection (Economy, Business, First)
- ✅ Multiple passengers (adults + children)
- ✅ Different route variations

### Train Search (4 scenarios)
- ✅ Single journey train search
- ✅ Round-trip train search
- ✅ Multiple passengers
- ✅ Class selection (Sleeper, 3A, 2A, 1A)

### Common Navigation (4 scenarios)
- ✅ Navigate to home page
- ✅ Navigate to hotels page
- ✅ Navigate to flights page
- ✅ Navigate to trains page

## Framework Features

- **Page Object Model**: Maintainable, reusable page interactions
- **Automatic screenshots**: Captured on test failures
- **Detailed logging**: Timestamped logs saved to `reports/logs/`
- **HTML/JSON reports**: Generated after each test run at `reports/cucumber-report.html`
- **Environment management**: `.env` file support via dotenv
- **Multi-browser support**: Chromium, Firefox, WebKit
- **Parallel execution**: Configurable worker count
- **Tag filtering**: Run specific test subsets
- **Error resilience**: Graceful handling of UI variations

## Reports

After running tests, reports are available at:
- **HTML Report**: `reports/cucumber-report.html`
- **JSON Report**: `reports/cucumber-report.json`
- **Screenshots**: `reports/screenshots/`
- **Logs**: `reports/logs/`

## Contributing

1. Write feature files in `features/` using Gherkin syntax
2. Implement step definitions in `features/step-definitions/`
3. Add page interactions in `support/pages/`
4. Tag scenarios appropriately (`@smoke`, `@regression`, `@hotels`, etc.)
