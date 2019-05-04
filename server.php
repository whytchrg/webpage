<?

// set timezone
date_default_timezone_set('Europe/Berlin');

// create $home path
function home($path){
	$ho = explode('/', dirname($path));
	$hom = array_reverse($ho);
	if($hom[0]!='public_html' && $hom[0]!='homepage') return($hom[0]);
}
$home = home($_SERVER['SCRIPT_FILENAME']);

// remove all subdomains
if(preg_match('/floriandebruen\.com/', $_SERVER['SERVER_NAME'])):
	// floriandebruen.com -> debruen.com
	header('Location: http://debruen.com/'.$home);
	exit;
elseif(preg_match('/\.debruen\.com/', $_SERVER['SERVER_NAME'])):
	header('Location: http://debruen.com/'.$home);
	exit;
elseif(preg_match('/whyturbocharge\.de/', $_SERVER['SERVER_NAME']) || preg_match('/whyturbocharge\.org/', $_SERVER['SERVER_NAME'])):
	// whyturbocharge.de & whyturbocharge.org -> whyturbocharge.com
	header('Location: http://whyturbocharge.com/'.$home);
	exit;
elseif(preg_match('/\.whyturbocharge\.com/', $_SERVER['SERVER_NAME'])):
	header('Location: http://whyturbocharge.com/'.$home);
	exit;
endif;

?>
