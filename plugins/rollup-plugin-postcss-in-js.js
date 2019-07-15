import { walk } from 'estree-walker';
import { generate } from 'astring';
import postcss from 'postcss';
import postcssrc from 'postcss-load-config';

import deasync from './utils/deasync';

export default (ctx = {}) => ({
  name: 'rollup-plugin-postcss-in-js',

  async transform(source) {
    const ast = this.parse(source);

    walk(ast, {
      enter(node) {
        if (node.type === 'TaggedTemplateExpression' && node.tag.name === 'css') {
          walk(node.quasi.quasis, {
            enter(node) {
              if (node.type === 'TemplateElement') {
                const { raw } = node.value;

                const { plugins, options } = deasync(postcssrc(ctx));
                const { css } = deasync(
                  postcss(plugins).process(raw, { ...options, from: undefined }),
                );

                node.value.raw = css;
              }
            },
          });
        }
      },
    });

    return {
      code: generate(ast),
      map: { mappings: '' },
    };
  },
});
