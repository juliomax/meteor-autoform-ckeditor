AutoForm.addInputType('ckeditor', {
	template: 'afCkEditor',
	valueOut: function() {
		return CKEDITOR.instances[this.attr('id')].getData();
	}
});

