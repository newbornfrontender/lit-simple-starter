module.exports = {
  presets: [
    [
      '@babel/env',
      {
        // exclude: ['@babel/transform-template-literals'],
        // targets: {
        //   esmodules: true,
        // },
        modules: false,
      },
    ],
  ],
  plugins: [
    [
      '@babel/proposal-decorators',
      {
        decoratorsBeforeExport: true,
      },
    ],
    '@babel/proposal-class-properties',
    '@babel/proposal-private-methods',
  ],
};
