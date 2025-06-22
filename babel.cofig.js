module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        edge: '17',
        ie: '11',
        firefox: '50',
        chrome: '64',
        safari: '11.1',
      },
      useBuiltIns: 'entry',
      corejs: 3 // хорошо указать явно, если используете useBuiltIns
    }]
  ],
  plugins: [
    [
      'babel-plugin-root-import',
      {
        rootPathPrefix: '~',
        rootPathSuffix: 'src',
      }
    ]
  ],
};