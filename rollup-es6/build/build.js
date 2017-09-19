const fs = require('fs');
const path = require('path');
const rollup = require('rollup');
const pkg = require('../package.json');
const babel = require('rollup-plugin-babel');
const uglify = require('uglify-js');
const zlib = require('zlib');
const RELEASE_ROOT_PATH = 'dist';
const SOURCE_ROOT_PATH = 'src';
const RELEASE_FILE_NAME = pkg.name;
const SOURCE_ENTRY_FILE = SOURCE_ROOT_PATH + '/index.js';

if (!fs.existsSync(RELEASE_ROOT_PATH)) {
    fs.mkdirSync(RELEASE_ROOT_PATH);
}

function resolve(p) {
    return path.resolve(__dirname, '../', p);
}

const banner = ['/*!',
    ' * <%= pkg.name %> v<%= pkg.version %>',
    ' * (c) 2017-<%= date %> <%= pkg.author %>',
    ' * Released under the <%= pkg.license %> License.',
    ' * <%= pkg.homepage %>',
    ' */',
    ''
].join('\n').replace(/<%=\s([^%]+)\s%>/g, ($0, $1) => {
    // easy to read
    console.log($1);
    return $1 === 'date' ? new Date().getFullYear() : (pkg[$1.split('.')[1]] || '');
});


const buildOptions = [{
    input: resolve(SOURCE_ENTRY_FILE),
    format: 'umd',
    output: {
        file: resolve(RELEASE_ROOT_PATH + '/' + RELEASE_FILE_NAME + '.js'),
        format: 'umd',
    },
    name: 'hello',
    plugins: [
        babel({
            // only transpile our source code
            exclude: 'node_modules/**',
        })
    ],
    banner,
}, {
    input: resolve(SOURCE_ENTRY_FILE),
    format: 'umd',
    output: {
        file: resolve(RELEASE_ROOT_PATH + '/' + RELEASE_FILE_NAME + '.min.js'),
        format: 'umd',
    },
    name: 'hello',
    plugins: [
        babel({
            // only transpile our source code
            exclude: 'node_modules/**',
        })
    ],
    banner,
}];

module.exports.buildOptions = buildOptions;

function walk(buildOptions) {
    let built = 0;
    const total = buildOptions.length;
    const next = () => {
        buildEntry(buildOptions[built]).then(() => {
        built++
        if (built < total) {
            next()
        }
    }).catch(logError);
  };

  next();
}

function buildEntry(config) {
    const dest = config.output.file;
    const isProd = /min\.js$/.test(dest);
    
    return rollup.rollup(config).then((bundle) => {
        return bundle.generate(config);
    }).then((res) => {
        if (isProd) {
            let minified = (config.banner ? config.banner : '') + uglify.minify(res.code, {
                output: {
                    ascii_only: true
                },
                compress: {
                    pure_funcs: ['makeMap']
                }
            }).code;
            
          return write(dest, minified, true);
        } else {
          return write(dest, res.code);
        }
    }).catch(logError);
}

function write(dest, code, zip) {
    return new Promise((resolve, reject) => {
        function report(extra) {
            console.log(blue(path.relative(process.cwd(), dest)) + ' ' + getSize(code) + (extra || ''));
            resolve();
        }

        fs.writeFile(dest, code, (err) => {
            if (err) {
                return reject(err);
            }
            if (zip) {
                zlib.gzip(code, (err, zipped) => {
                    if (err) return reject(err)
                    report(' (gzipped: ' + getSize(zipped) + ')')
                });
            } else {
                report();
            }
        });
  });
}

function getSize(code) {
    return (code.length / 1024).toFixed(2) + 'kb';
}

function blue(str) {
    return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m';
}

function logError(e) {
    console.log(e);
}

walk(buildOptions);

module.exports.rebuild = () => {
    walk(buildOptions);
};
