'use strict';

import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
// import includePaths from 'rollup-plugin-includepaths';
import eslint from 'rollup-plugin-eslint';
import commonjs from 'rollup-plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import string from 'rollup-plugin-string';
import builtins from 'rollup-plugin-node-builtins';
import json from 'rollup-plugin-json';

var includePathOptions = {
    paths: ['node_modules'],
};

export default {
    external: ['react', 'react-dom', 'react-redux'],
    input: 'src/scripts/app.js',
    output: {
        format: 'iife',
        name: 'rune',
        file: './dist/app.min.js',
        globals: {
            react: 'RuneModules.React',
            'react-dom': 'RuneModules.ReactDOM',
            'react-redux': 'RuneModules.ReactRedux',
        },
    },
    plugins: [
        resolve({
            jsnext: true,
            main: true,
            browser: true,
        }),
        json(),
        // globals(),
        builtins(),
        string({
            // Required to be specified
            include: ['**/*.svg'],
        }),
        commonjs({
            include: './node_modules/**',
            namedExports: {
                'node_modules/react-dom/index.js': ['findDOMNode'],
                'node_modules/react/index.js': ['Component'],
            },
        }),
        babel({
            externalHelpers: true,
            exclude: 'node_modules/**',
        }),
        // eslint(),
    ],
};
