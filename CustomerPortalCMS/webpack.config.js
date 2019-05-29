/*DO NOT MODIFY*/
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const DEVELOPMENT = require('./webpack.dev.js');
const PRODUCTION = require('./webpack.prod.js');

var BUILD = null;

if (process.env.NODE_ENV == 'production') {
    BUILD = merge(common, PRODUCTION);
} else if (process.env.NODE_ENV == 'development') {
    BUILD = merge(common, DEVELOPMENT);
} else {
    console.log('VSTS fallback build for production')
    BUILD = merge(common, PRODUCTION);
}

module.exports = BUILD;