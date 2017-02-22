import {platform} from '@walmart/ern-util'
import {generateApi} from '@walmart/ern-api-gen'
const log = require('console-log-level')();

exports.command = 'init <apiName>';
exports.desc = 'Create a new api';

exports.builder = function (yargs) {
    return yargs.option('modelSchemaPath', {
        alias: 'm',
        describe: 'Path to model schema'
    }).option('scope', {
        alias: 'n',
        describe: 'NPM scope of project'
    }).option('apiVersion', {
        alias: 'a',
        describe: 'Initial npm version'
    }).option('apiAuthor', {
        alias: 'u',
        describe: `Author of library default is : ${process.env['EMAIL'] || process.env['USER']}`
    }).demandCommand(1, 'Must have an apiName');
};

exports.handler = async function (argv) {
    const bridgeDep = platform.getPlugin('@walmart/react-native-electrode-bridge');
    const reactNative = platform.getPlugin('react-native');

    await generateApi({
        bridgeVersion: `${bridgeDep.version}`,
        reactNativeVersion: reactNative.version,
        name: argv.apiName,
        npmScope: argv.scope,
        modelSchemaPath: argv.modelSchemaPath,
        apiVersion: argv.apiVersion,
        apiAuthor: argv.apiAuthor
    });

};
