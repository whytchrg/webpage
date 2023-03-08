
<? date_default_timezone_set('Europe/Berlin');

// Make sure that it is a POST request.
if(strcasecmp($_SERVER['REQUEST_METHOD'], 'POST') != 0){
  throw new Exception('Request method must be POST!');
}
// Make sure that the content type of the POST request has been set to application/json
$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
if(strcasecmp($contentType, 'application/json') != 0){
  throw new Exception('Content type must be: application/json');
}
// Receive the RAW post data.
$content = trim(file_get_contents("php://input"));
// Attempt to decode the incoming RAW post data from JSON.
$decoded = json_decode($content, true);
// If json_decode failed, the JSON is invalid.
if(!is_array($decoded)){
  throw new Exception('Received content contained invalid JSON!');
}

include 'my_data.php';

// MySQL settings
$mysql_sev = $my_sev;
$mysql_usr = $my_usr;
$mysql_key = $my_key;
$mysql_dbs = $my_dbs;

if($decoded['client'] === 'manager' || $decoded['client'] === 'homepage') {
  $conn = new mysqli($mysql_sev, $mysql_usr, $mysql_key, $mysql_dbs); // connect to Database
  if($conn->connect_error) die('Connection failed: '.$conn->connect_error);

  $table = $decoded['table'];

  if($decoded['request'] === 'init') {

    if($decoded['client'] === 'manager') {
      $sql = "CREATE TABLE IF NOT EXISTS ".$table." ( id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        filename VARCHAR(255) CHARACTER SET utf8,
        name VARCHAR(255) CHARACTER SET utf8,

        display VARCHAR(255) CHARACTER SET utf8,
        thumbnail VARCHAR(255) CHARACTER SET utf8,

        tags VARCHAR(255) CHARACTER SET utf8,
        orientation VARCHAR(255) CHARACTER SET utf8,

        views LONGTEXT CHARACTER SET utf8,
        created BIGINT(20),
        modified BIGINT(20),
        algorithm FLOAT,
        description VARCHAR(255) CHARACTER SET utf8 )";
      if($conn->query($sql) !== TRUE) {
        echo 'Error creating table: ' . $conn->error;
      }
    }

    $sql = "SELECT * FROM $table";
    $result = $conn->query($sql);

    $dbdata = array();
    //Fetch into associative array
    while($row = $result->fetch_assoc())  {
      $dbdata[]=$row;
    }

    $data = json_encode($dbdata);
    $decoded['data'] = $data;

  } // init

}

if($decoded['client'] === 'manager') {

  if($decoded['request'] === 'insert') {
    $data = json_decode($decoded['data'], true);

    for($i = 0; $i < count($data); $i++) {
      $filename = $conn->real_escape_string($data[$i]['filename']);
      $name = $conn->real_escape_string($data[$i]['name']);
      $tags = $conn->real_escape_string($data[$i]['tags']);
      $display = $conn->real_escape_string($data[$i]['display']);
      $thumbnail = $conn->real_escape_string($data[$i]['thumbnail']);
      $created = intval($data[$i]['created'], 10);
      $modified = intval($data[$i]['modified'], 10);
      $algorithm = floatval($data[$i]['algorithm']);
      $orientation = $conn->real_escape_string($data[$i]['orientation']);
      $description = $conn->real_escape_string($data[$i]['description']);
      $sql = "INSERT INTO $table (filename, name, tags, display, thumbnail, created, modified, algorithm, orientation, description) VALUES ('$filename', '$name', '$tags', '$display', '$thumbnail', $created, $modified, $algorithm, '$orientation', '$description')";
      $result = $conn->query($sql);
    }

    $decoded['data'] = count($data);

  } // insert

  if($decoded['request'] === 'update') {
    $data = json_decode($decoded['data'], true);

    for($i = 0; $i < count($data); $i++) {
      $filename = $conn->real_escape_string($data[$i]['filename']);
      $name = $conn->real_escape_string($data[$i]['name']);
      $tags = $conn->real_escape_string($data[$i]['tags']);
      $display = $conn->real_escape_string($data[$i]['display']);
      $thumbnail = $conn->real_escape_string($data[$i]['thumbnail']);
      $created = intval($data[$i]['created'], 10);
      $modified = intval($data[$i]['modified'], 10);
      $algorithm = floatval($data[$i]['algorithm']);
      $orientation = $conn->real_escape_string($data[$i]['orientation']);
      $description = $conn->real_escape_string($data[$i]['description']);
      $sql = "UPDATE $table SET name = '$name', tags = '$tags', display = '$display', thumbnail = '$thumbnail', created = $created, algorithm = $algorithm, orientation = '$orientation', description = '$description' WHERE filename = '$filename'";
      $result = $conn->query($sql);
    }

    $decoded['data'] = count($data);

  } // update

  if($decoded['request'] === 'delete') {

    $data = json_decode($decoded['data'], true);

    for($i = 0; $i < count($data); $i++) {
      $filename = $data[$i]['filename'];
      $sql = "DELETE FROM $table WHERE filename = '$filename'";
      $result = $conn->query($sql);
    }

    $decoded['data'] = count($data);

  } // delete

}

if($decoded['client'] === 'homepage') {

  if($decoded['request'] === 'views') {

    $filename = $decoded['filename'];

    $date = new DateTime();
    $sTime = $date->getTimestamp();

    $newView  = '{ "client": "'.$decoded['cTime'].'", "server": "'.$sTime.'" }';

    $sql = "SELECT views FROM $table WHERE filename = '$filename'";
    $result = $conn->query($sql);

    $raw = mysqli_fetch_array($result);

    $array = explode(';', $raw['views']);
    $array[] = $newView;

    $views = array();
    for($i = 0; $i < count($array); $i++) {
      if (strpos($array[$i], 'server') !== false) {
        $views[] = $array[$i];
      }
    }

    $newViews = implode(';', $views);

    $sql = "UPDATE $table SET views = '$newViews' WHERE filename = '$filename'";
    $result = $conn->query($sql);

    $decoded['data'] = true;
  } // delete

}

if($decoded['client'] === 'manager' || $decoded['client'] === 'homepage') {

  $conn->close();

  header('Content-Type: application/json');
  echo json_encode($decoded);
}

?>
