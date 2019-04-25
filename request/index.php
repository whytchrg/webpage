<? //echo "php: ".$_REQUEST['q'];

$str_json = file_get_contents('php://input');
$json = json_decode($str_json, true);

$json['server'] = date('U');

echo '<code>{ ';
echo 'name: &#160; "'.$json['name'].'",<br>';
echo '&#160; url: &#160; &#160;"'.$json['url'].'",<br>';
echo '&#160; client: "'. substr($json['client'], 0, -3).'",<br>';
echo '&#160; server: "'.$json['server'].' '.date_default_timezone_get().'",<br>';
echo '&#160; state: &#160;"'.$json['state'].'",<br>';
if($json['data'] == '""') {

} else {
  echo '&#160; data: &#160; "'.$json['data'].'"';
}

echo ' }</code><br>';
?>
