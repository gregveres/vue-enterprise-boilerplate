const _ = require('lodash');
// Use a random port number for the mock API by default,
// to support multiple instances of Jest running
// simultaneously, like during pre-commit lint.
process.env.MOCK_API_PORT = process.env.MOCK_API_PORT || _.random(9000, 9999);

module.exports = {
  setupFiles: ['<rootDir>/tests/unit/setup'],
  globalSetup: '<rootDir>/tests/unit/global-setup',
  globalTeardown: '<rootDir>/tests/unit/global-teardown',
  setupFilesAfterEnv: ['<rootDir>/tests/unit/matchers'],
  testMatch: ['**/(*.)unit.ts'],
  moduleFileExtensions: ['ts', 'json', 'vue', 'js'],

  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
    '.*\\.ts$': 'ts-jest',
    '.+\\.(css|scss|jpe?g|png|gif|webp|svg|mp4|webm|ogg|mp3|wav|flac|aac|woff2?|eot|ttf|otf)$':
      'jest-transform-stub',
  },

  moduleNameMapper: require('./aliases.config').jest,
  snapshotSerializers: ['jest-serializer-vue'],
  coverageDirectory: '<rootDir>/tests/unit/coverage',

  collectCoverageFrom: [
    'src/**/*.{ts,vue}',
    '!**/node_modules/**',
    '!src/main.ts',
    '!src/app.vue',
    '!src/router/index.ts',
    '!src/router/routes.ts',
    '!src/state/store.ts',
    '!src/state/helpers.ts',
    '!src/state/modules/index.ts',
    '!src/components/_globals.ts',
  ],

  // https://facebook.github.io/jest/docs/en/configuration.html#testurl-string
  // Set the `testURL` to a provided base URL if one exists, or the mock API base URL
  // Solves: https://stackoverflow.com/questions/42677387/jest-returns-network-error-when-doing-an-authenticated-request-with-axios
  testURL:
    process.env.API_BASE_URL || `http://localhost:${process.env.MOCK_API_PORT}`,

  // https://github.com/jest-community/jest-watch-typeahead
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],

  globals: {
    'vue-jest': {
      // Compilation errors in the <style> tags of Vue components will
      // already result in failing builds, so compiling CSS during unit
      // tests doesn't protect us from anything. It only complicates
      // and slows down our unit tests.
      experimentalCSSCompile: false,
    },
  },

  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
};
