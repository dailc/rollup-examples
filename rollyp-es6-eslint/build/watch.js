const rollup = require('rollup');
const build = require('./build.js');
const buildOptions = build.buildOptions;
const rebuild = build.rebuild;

const watcher = rollup.watch(buildOptions);

watcher.on('event', event => {
    event.code === 'START' && rebuild();
});