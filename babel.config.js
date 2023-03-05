const presets = [
  [
    '@babel/preset-env', // Which preset to use
    {
      targets: {
        // Which browsers to support
        edge: '17',
        ie: '11',
        firefox: '50',
        chrome: '64',
        safari: '11.1',
      },
      
      // Use polyfills from core-js to support target browsers
      useBuiltIns: 'entry',
    },
  ],
];

module.exports = { presets };
