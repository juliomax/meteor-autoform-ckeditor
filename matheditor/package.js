Package.describe({
    name: 'matheditor',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: '',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.5.1');
    api.use('ecmascript');
    api.use([
        'templating',
        'jquery',
        'underscore',
        'reactive-var',
        'aldeed:autoform',
    ], 'client');

    api.addFiles([
        'load.js'
    ], 'web.browser');
    api.addFiles([
        'client/mathinputbox.html', 
        'client/mathinputbox.js',
        'lib/client/templates.html',
        'lib/client/templates.js',
        'lib/client/autoform-ckeditor.js',
    ], 'client');

});