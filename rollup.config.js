import nodeResolve from 'rollup-plugin-node-resolve';
import indexHTML from 'rollup-plugin-index-html';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

import postCSSInJS from './plugins/rollup-plugin-postcss-in-js';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/index.html',
  output: {
    format: 'esm',
    dir: 'public',
    preferConst: true,
    sourcemap: true,
  },
  plugins: [
    nodeResolve({
      browser: true,
      modulesOnly: true,
    }),
    indexHTML({
      minify: production,
    }),
    babel(),
    postCSSInJS({ production }),
    babel({
      babelrc: false,
      env: {
        production: {
          plugins: [
            [
              'template-html-minifier',
              {
                modules: {
                  'lit-html': ['html'],
                  'lit-element': ['html', { name: 'css', encapsulation: 'style' }],
                },
                htmlMinifier: {
                  collapseWhitespace: true,
                  removeComments: true,
                  caseSensitive: true,
                  minifyCSS: true,
                },
              },
            ],
          ],
        },
      },
    }),
    production &&
      terser({
        module: true,
        mangle: {
          module: true,
        },
      }),
  ],
  treeshake: production,
};
