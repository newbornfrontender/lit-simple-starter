import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import indexHTML from 'rollup-plugin-index-html';

import postCSSInJS from './plugins/postcss-in-js';

const production = !process.env.ROLLUP_WATCH;

export default {
  // input: 'src/index.js',
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
  ],
  treeshake: production,
};
