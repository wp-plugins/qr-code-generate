(function() {
     /* Register the buttons */
     tinymce.create('tinymce.plugins.MyButtons', {
          init : function(ed, url) {
               /**
               * Inserts shortcode content
			   
			   
               */
			   
			   var img_button = qr_plugin_url+'img/icon_tools.png';
			   
               ed.addButton( 'button_eek', {
                    title : qr_plugin_title,
                    image : img_button,
                    onclick : function() {
                         //ed.selection.setContent('[qr_code link="'+ed.selection.getContent()+'"]');
						 var value_link = ed.selection.getContent();
						 var width = jQuery(window).width(), H = jQuery(window).height(), W = ( 720 < width ) ? 720 : width;
						W = W - 80;
						H = H - 84;
						tb_show( qr_plugin_title, '#TB_inline?width=' + W + '&height=' + H + '&inlineId=qr-gen' );
						jQuery('#qr-link').val(value_link);
					
                    }
               });
               /**
               * Adds HTML tag to selected content
               */
			   /*
               ed.addButton( 'button_green', {
                    title : 'Add span',
                    image : '../wp-includes/images/smilies/icon_mrgreen.gif',
                    cmd: 'button_green_cmd'
               });
               ed.addCommand( 'button_green_cmd', function() {
                    var selected_text = ed.selection.getContent();
                    var return_text = '';
                    return_text = '<h1>' + selected_text + '</h1>';
                    ed.execCommand('mceInsertContent', 0, return_text);
               });*/
          },
          createControl : function(n, cm) {
               return null;
          },
     });
     /* Start the buttons */
     tinymce.PluginManager.add( 'qr_button_script', tinymce.plugins.MyButtons );
	 
	 //teste plugin externo
	 
	 
	jQuery(function(){
		// creates a form to be displayed everytime the button is clicked
		// you should achieve this using AJAX instead of direct html code like this
		
		var form = jQuery('<div id="qr-gen">\
		<table id="qr-table" class="form-table">\
		<tr>\
				<th><label for="qr-link">Link</label></th>\
				<td><input type="text" id="qr-link" name="link" value="" /><br />\
				<small>place the full link, example: http//www.yourlink.com.br </small></td>\
			</tr>\
						<tr>\
				<th><label for="qr-redundacia">Redundacia</label></th>\
				<td><select name="redundacia" id="qr-redundacia">\
					<option value="L">L</option>\
					<option value="M">M</option>\
					<option value="Q">Q</option>\
					<option value="H">H</option>\
				</select><br />\
				<small>specify the redundancy in the code generation.</small></td>\
			</tr>\
			 <tr>\
				<th><label for="qr-size_pixel">Size pixel</label></th>\
				<td><select name="size" id="qr-size_pixel">\
					<option value="1">1</option>\
					<option value="2">2</option>\
					<option value="3">3</option>\
					<option value="4">4</option>\
					<option value="5">5</option>\
					<option value="6">6</option>\
					<option value="7">7</option>\
					<option value="8">8</option>\
					<option value="9">9</option>\
					<option value="10">10</option>\
					<option value="11">11</option>\
					<option value="12">12</option>\
					<option value="13">13</option>\
					<option value="14">14</option>\
					<option value="15">15</option>\
					<option value="16">16</option>\
				</select><br />\
				<small>specify the image size to use for the QR display.</small></td>\
			</tr>\
			<tr>\
				<th><label for="qr-type_img">Type image</label></th>\
				<td><select name="type_img" id="qr-type_img">\
					<option value="P">PNG</option>\
					<option value="J">JPEG</option>\
				</select><br />\
				<small>choose the type of QR image.</small></td>\
			</tr>\
		</table>\
		<p class="submit">\
			<input type="button" id="qrgallery-submit" class="button-primary" value="Insert Gallery" name="submit" />\
		</p>\
		</div>');
		
		//
		
		var table = form.find('table');
		form.appendTo('body').hide();
		
		// handles the click event of the submit button
		form.find('#qrgallery-submit').click(function(){
			// defines the options and their default values
			// again, this is not the most elegant way to do this
			// but well, this gets the job done nonetheless
			
			var options = { 
				'link' : '',
				'redundacia' : '',
				'size_pixel' : '',
				'type_img' : ''
				};
			var shortcode = '[qr_code ';
			
			for( var index in options) {
				var value = table.find('#qr-' + index).val();
				
				// attaches the attribute to the shortcode only if it's different from the default value
				if ( value !== options[index] )
					shortcode += ' ' + index + '="' + value + '"';
			}
			
			shortcode += ']';
			
			// inserts the shortcode into the active editor
			tinyMCE.activeEditor.execCommand('mceInsertContent', 0, shortcode);
			
			// closes Thickbox
			tb_remove();
		});
	});
})();      