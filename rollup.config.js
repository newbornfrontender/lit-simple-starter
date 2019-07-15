import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

import postcssInJs from './plugins/postcss-in-js';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/index.js',
  output: {
    format: 'esm',
    dir: 'public',
    preferConst: true,
  },
  plugins: [
    nodeResolve({
      browser: true,
      modulesOnly: true,
    }),
    babel(),
    postcssInJs({ production }),
  ],
  treeshake: production,
};
