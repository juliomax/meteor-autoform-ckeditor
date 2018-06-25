Package.describe({
  name: 'juliomax:autoform-ckeditor',
  version: '0.0.1',
  summary: 'CkEditor for aldeed:autoform',
  git: 'https://github.com/juliomax/meteor-autoform-ckeditor',
  documentation: 'README.md',
});

Package.onUse(function(api) {
  api.versionsFrom('1.5.1');
  api.use('ecmascript');
  api.use('aldeed:autoform@4.0.0 || 5.0.0 || 6.0.0');
  api.use([
    'templating',
    'jquery',
    'reactive-var',
    'aldeed:autoform',
  ], 'client');

  api.addFiles([
    'import/plugin.js',
    'client/afCkEditor.html',
    'client/afCkEditor.js',
    'client/afCkEditor.css',
  ], 'client');

});
