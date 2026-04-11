# Setup Guide

## Prerequisites

- **Node.js** v18 or higher
- **npm** v8 or higher
- Internet access to https://www.cleartrip.com

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Cleartrip
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Playwright Browsers

```bash
# Install all browsers
npx playwright install

# Or install only Chromium (default)
npx playwright install chromium
```

### 4. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` to customize settings:

```env
BASE_URL=https://www.cleartrip.com
BROWSER=chromium
HEADLESS=true
TIMEOUT=30000
SCREENSHOT=true
```

## Running Tests

### Smoke Tests (Quick Validation)

```bash
npm run test:smoke
```

### All Tests

```bash
npm test
```

### Specific Module Tests

```bash
npm run test:hotels
npm run test:flights
npm run test:trains
```

### Debug Mode (Visible Browser)

```bash
npm run test:debug
```

## Viewing Reports

After tests complete:

```bash
# Open HTML report
open reports/cucumber-report.html

# View screenshots
ls reports/screenshots/

# View logs
cat reports/logs/*.log
```

## Troubleshooting

### Browser Not Found

```bash
npx playwright install chromium
```

### Timeout Errors

Increase timeout in `.env`:

```env
TIMEOUT=60000
```

### No Tests Found

Ensure feature files exist in `features/` and step definitions in `features/step-definitions/`.

### Network Issues

If running in a restricted network, ensure access to `https://www.cleartrip.com`.

## CI/CD Integration

Set these environment variables in your CI pipeline:

```env
HEADLESS=true
BROWSER=chromium
SCREENSHOT=true
TIMEOUT=60000
```

Run tests with:

```bash
npm ci
npx playwright install chromium
npm run test:smoke
```
