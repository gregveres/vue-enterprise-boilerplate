import fs from 'fs';
import path from 'path';
import Vue from 'vue';
import axios from 'axios';

// ===
// Utility functions
// ===

// https://lodash.com/
const _ = require('lodash');
_.mixin({
  pascalCase: _.flow(_.camelCase, _.upperFirst),
});

// ===
// Configure Axios
// ===

// Force Axios to use the XHR adapter so that it behaves
// more like it would in a browser environment.
axios.defaults.adapter = require('axios/lib/adapters/xhr');

// ===
// Configure Vue
// ===

// Don't warn about not using the production build of Vue, as
// we care more about the quality of errors than performance
// for tests.
Vue.config.productionTip = false;

// ===
// Register global components
// ===

const globalComponentFiles = fs
  .readdirSync(path.join(__dirname, '../../src/components'))
  .filter((fileName) => /^_base-.+\.vue$/.test(fileName));

for (const fileName of globalComponentFiles) {
  const componentName = _.pascalCase(fileName.match(/^_(base-.+)\.vue$/)[1]);
  const componentConfig = require('../../src/components/' + fileName);
  Vue.component(componentName, componentConfig.default || componentConfig);
}

// ===
// Mock window properties not handled by jsdom
// ===
// TODO: do we need this? I believe this was added to Jest in mid 2018

Object.defineProperty(window, 'localStorage', {
  value: (function() {
    let store = {};
    return {
      getItem: function(key) {
        return store[key] || null;
      },
      setItem: function(key, value) {
        store[key] = value.toString();
      },
      clear: function() {
        store = {};
      },
    };
  })(),
});

// ===
// Console handlers
// ===

// Make console.error throw, so that Jest tests fail
const error = console.error;
console.error = function(message) {
  error.apply(console, arguments);
  // NOTE: You can whitelist some `console.error` messages here
  //       by returning if the `message` value is acceptable.
  throw message instanceof Error ? message : new Error(message);
};

// Make console.warn throw, so that Jest tests fail
const warn = console.warn;
console.warn = function(message) {
  warn.apply(console, arguments);
  // NOTE: You can whitelist some `console.warn` messages here
  //       by returning if the `message` value is acceptable.
  throw message instanceof Error ? message : new Error(message);
};
