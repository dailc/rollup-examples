const rollup = require('rollup');
const build = require('./build.js');
const buildOptions = build.buildOptions;

const watcher = rollup.watch(buildOptions);

watcher.on('event', event => {
    console.log(event.code);
});