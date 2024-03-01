/* eslint-disable */
const tsConfig = require('./tsconfig.json');
const tsConfigPaths = require('tsconfig-paths');
/* eslint-enable */

const baseUrl = './dist'; // Either absolute or relative path. If relative it's resolved to current working directory.
tsConfigPaths.register({
    baseUrl,
    paths: tsConfig.compilerOptions.paths,
});
