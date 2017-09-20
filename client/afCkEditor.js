Template.afCkEditor.onCreated(function() {
    this.value = new ReactiveVar(this.data.value);
});

Template.afCkEditor.onRendered(function() {
    var $editor = $(this.firstNode);
    var editorId = $editor.attr('id');
    $editor.closest('form').on('reset', function() {
        $editor.setData('');
    });
    CKEDITOR.replace( editorId, {
        extraPlugins: 'mathjax',
        mathJaxLib: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_HTML',
        height: 320
    } );
    if ( CKEDITOR.env.ie && CKEDITOR.env.version == 8 ) {
        document.getElementById( 'ie8-warning' ).className = 'tip alert';
    }
});

AutoForm.addInputType('ckeditor', {
    template: 'afCkEditor',
    valueOut: function() {
        return CKEDITOR.instances[this.attr('id')].getData();
    }
});
