Package.describe({
    name: 'vchitai:autoform-ckeditor',
    version: '0.0.2',
    // Brief, one-line summary of the package.
    summary: 'CkEditor for aldeed:autoform',
    // URL to the Git repository containing the source code for this package.
    git: 'https://github.com/vchitai/meteor-autoform-ckeditor',
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
        'reactive-var',
        'aldeed:autoform@5.8.1',
    ], 'client');

    api.addFiles([
    	'import/plugin.js',
    	'import/vi.js',
        'client/afCkEditor.html',
        'client/afCkEditor.js',
        'client/afCkEditor.css'
    ], 'client');
});