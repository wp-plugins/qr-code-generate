<?php 
/*
* Plugin Name: QR Generate Link
* Plugin URI: http://nativamultimidia.com.br/plugin/qr-generate
* Description: Plugin usado para gerar link em qr para baixar conteúdo por mobile.
* Version: 1.0
* Author: Danilo Pastor
* Author URI: http://nativamultimidia.com.br/wp-plugins
* License: GPLv2 or later
* Text Domain: qr-generate-link
* Domain Path: languages/
*/

if(! defined( 'ABSPATH' )){
   exit;
}
define( 'QR_GENERATE__PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'QR_GENERATE__PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

function qr_load_language() {
  load_plugin_textdomain('qr-generate-link', FALSE, basename(dirname(__FILE__)).'/languages');
}
add_action( 'plugins_loaded', 'qr_load_language' );

function qr_g_shortcode($attrs){
     
	 extract( shortcode_atts(
	 array(
	 'link' => '',
	 'redundacia' => '',
	 'size_pixel' => '',
	 'type_img' => '',
	 'label' => __( 'Donwload File', 'qr-generate-link')
	 ),$attrs ) );
	 
	        $aux = QR_GENERATE__PLUGIN_URL.'include-files/php/qr_img.php?';
			$aux .= 'd='.$link.'&';
			$aux .= 'e='.$redundacia.'&';
			$aux .= 's='.$size_pixel.'&';
			$aux .= 't='.$type_img;

return '<img src="'.$aux.'" alt="'.$label.'" title="'.$label.'" />';
}
add_shortcode('qr_code','qr_g_shortcode');

//teste
add_action('admin_menu', 'register_my_custom_submenu_page');

function register_my_custom_submenu_page() {
	add_submenu_page( 'plugins.php', 'QR Generate', 'QR Code Generate', 'manage_options', 'qr-generate_link-page', 'qr_generate_link_page_callback' );
}

function qr_generate_link_page_callback() {
	
	echo '<div class="wrap"><div id="icon-tools" class="icon32"></div>
		<h2>My QR Code Generate</h2>
		<p>Plugin criado por <a href="hrrp://nativamultimidia.com.br">Nativa Muitimidia</a>, desenvolvedor Danilo Pastor</p>
		<p>Este plugin esta sendo distribuido de forma gratuíta se você comprou por favor avise-nos <a href="mailto:danilopastor@nativamultimidia.com.br">danilopastor@nativamultimidia.com.br</a></p>
	    <h2>Doação</h2>
		<p>Se você gostou deste plugin, ajude a continuar desenvolvendo e melhorando faça uma doaçao para nós.</p>
		</br>
		<!-- INICIO FORMULARIO BOTAO PAGSEGURO -->
<form action="https://pagseguro.uol.com.br/checkout/v2/donation.html" method="post">
<!-- NÃO EDITE OS COMANDOS DAS LINHAS ABAIXO -->
<input type="hidden" name="currency" value="BRL" />
<input type="hidden" name="receiverEmail" value="yguinhos@hotmail.com" />
<input type="image" src="https://p.simg.uol.com.br/out/pagseguro/i/botoes/doacoes/120x53-doar.gif" name="submit" alt="Pague com PagSeguro - é rápido, grátis e seguro!" />
</form>
<!-- FINAL FORMULARIO BOTAO PAGSEGURO -->
		</br>
		<p>Desde já ficamos muito grato pela sua doação</p>
	</div>';

}

/* Plugin Name: My TinyMCE Buttons */
function qr_admin_ajax() {
  echo"
  <script>
    var qr_plugin_url = '".QR_GENERATE__PLUGIN_URL."';
	var qr_plugin_title = '".__( 'Change for QR Code', 'qr-generate-link')."';
  </script>";
  
}
add_action('admin_head', 'qr_admin_ajax');

add_action( 'admin_init', 'qr_tinymce_button' );

function qr_tinymce_button() {
     if ( current_user_can( 'edit_posts' ) && current_user_can( 'edit_pages' ) ) {
          add_filter( 'mce_buttons', 'qr_register_tinymce_button' );
          add_filter( 'mce_external_plugins', 'qr_add_tinymce_button' );
     }
}

function qr_register_tinymce_button( $buttons ) {
     array_push( $buttons, "button_eek", "button_green" );
     return $buttons;
}

function qr_add_tinymce_button( $plugin_array ) {
     $plugin_array['qr_button_script'] = QR_GENERATE__PLUGIN_URL . '/js/qr_editor_button.js';
     return $plugin_array;
}