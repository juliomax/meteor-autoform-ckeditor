Package.describe({
  name: 'vchitai:autoform-mathanswerbox',
  version: '0.0.4',
  // Brief, one-line summary of the package.
  summary: 'Fast Math Answer Box for aldeed:autoform',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/vchitai/meteor-autoform-mathanswerbox',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.5.1');
  api.use('ecmascript');
    api.use([
        'templating@1.3.1',
        'jquery',
        'aldeed:autoform@5.8.1',
    ], 'client');

    api.addFiles([
        'client/afMathText.html',
        'client/afMathText.js',
        'client/mathquill.css',
        'client/mathquill.js',
       
    ], 'client');

    api.addAssets([
       'client/font/Symbola.eot',
       'client/font/Symbola.otf',
       'client/font/Symbola.svg',
       'client/font/Symbola.ttf',
       'client/font/Symbola.woff',
       'client/font/Symbola.woff2',
       'client/font/Symbola-basic.eot',
       'client/font/Symbola-basic.ttf',
       'client/font/Symbola-basic.woff',
       'client/font/Symbola-basic.woff2',
      ],'client');
});