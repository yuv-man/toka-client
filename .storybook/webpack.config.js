const webpack = require('webpack');

module.exports = ({ config }) => {
  config.plugins = config.plugins.filter(
    plugin => plugin.constructor.name !== 'ProgressPlugin'
  );

  return config;
};