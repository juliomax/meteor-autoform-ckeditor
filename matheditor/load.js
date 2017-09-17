$(window).load(function(){
		var i = 0;
		var ckeditor = document.getElementById("ckeditor");
		while (ckeditor){
				ckeditor.id = "ckeditor" + i;
				CKEDITOR.replace( ckeditor.id, {
					extraPlugins: 'mathjax',
					mathJaxLib: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_HTML',
					height: 320
				} );
				if ( CKEDITOR.env.ie && CKEDITOR.env.version == 8 ) {
						document.getElementById( 'ie8-warning' ).className = 'tip alert';
				}
				ckeditor = document.getElementById("ckeditor");
				i++;
			}
		
  });