'use strict';

/**
 * Centralized test data for bus search tests.
 * Uses popular Cleartrip bus routes for reliable test results.
 */

function getTomorrowDate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
}

const testData = {
  busSearch: {
    source: 'Mumbai',
    destination: 'Pune',
    travelDate: getTomorrowDate(),
  },
};

module.exports = testData;
