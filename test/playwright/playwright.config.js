const { devices } = require('@playwright/test');
const config = {
    projects: [
      {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'],headless:false },
      },
      {
        name: 'firefox',
        use: { ...devices['Desktop Firefox'],headless:false },
      },
      {
        name: 'webkit',
        use: { ...devices['Desktop Safari'],headless:false },
      },
    ],
  };
  
  module.exports = config;