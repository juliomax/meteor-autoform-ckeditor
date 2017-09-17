export var activeEditor = 0;

Template.afCkEditor.onCreated(function() {
    this.value = new ReactiveVar(this.data.value);
    activeEditor++;
    if (activeEditor == 1) {
    	var script = document.createElement('script');
		script.setAttribute('type', 'text/javascript'); 
		script.setAttribute('src', '//cdn.ckeditor.com/4.7.0/standard-all/ckeditor.js');
		document.getElementsByTagName('head')[0].appendChild(script);

		var script2 = document.createElement('script');
		script2.setAttribute('type', 'text/javascript');  
		script2.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML');
		document.getElementsByTagName('head')[0].appendChild(script2);
    }
});

Template.afCkEditor.onRendered(function() {
    var $editor = $(this.firstNode);
    $editor.attr('id','ckeditor');
    $editor.closest('form').on('reset', function() {
        $editor.setData('');
    });
});

Template.afCkEditor.onDestroyed(function() {
	activeEditor--;
})