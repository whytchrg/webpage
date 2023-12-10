
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

// get: $mysql_sev, $mysql_usr, $mysql_key, $mysql_dbs
include 'data.php';

if($decoded['client'] === 'manager' || $decoded['client'] === 'homepage') {
    $conn = new mysqli($mysql_sev, $mysql_usr, $mysql_key, $mysql_dbs); // connect to Database
    if($conn->connect_error) die('Connection failed: '.$conn->connect_error);

    $table = $decoded['table'];

    if($decoded['request'] === 'init') {

        if($decoded['client'] === 'manager') {
            $sql = "CREATE TABLE IF NOT EXISTS ".$table." (
                id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,

                name VARCHAR(255) CHARACTER SET utf8,
                type VARCHAR(255) CHARACTER SET utf8,
                created BIGINT(20),
                modified BIGINT(20),
                title VARCHAR(255) CHARACTER SET utf8,
                keywords VARCHAR(255) CHARACTER SET utf8,
                description VARCHAR(255) CHARACTER SET utf8,
                algorithm FLOAT,
                seen_value FLOAT,
                orientation VARCHAR(255) CHARACTER SET utf8,
                display VARCHAR(255) CHARACTER SET utf8,
                medium VARCHAR(255) CHARACTER SET utf8,
                thumbnail VARCHAR(255) CHARACTER SET utf8,
                views LONGTEXT CHARACTER SET utf8,
                seen LONGTEXT CHARACTER SET utf8
            )";
            if($conn->query($sql) !== TRUE) {
                echo 'Error creating table: ' . $conn->error;
            }
        }

        $sql = "SELECT * FROM $table";
        $result = $conn->query($sql);

        // empty seen and views on manager initialization
        if($decoded['client'] === 'manager') {
            $sql = "UPDATE $table set seen = NULL";
            if($conn->query($sql) !== TRUE) {
                echo 'Error deleting seen: ' . $conn->error;
            }
            $sql = "UPDATE $table set views = NULL";
            if($conn->query($sql) !== TRUE) {
                echo 'Error deleting views: ' . $conn->error;
            }
        }

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
      $name = $conn->real_escape_string($data[$i]['name']);
      $type = $conn->real_escape_string($data[$i]['type']);
      $created = intval($data[$i]['created'], 10);
      $modified = intval($data[$i]['modified'], 10);
      $title = $conn->real_escape_string($data[$i]['title']);
      $keywords = $conn->real_escape_string($data[$i]['keywords']);
      $description = $conn->real_escape_string($data[$i]['description']);
      $algorithm = floatval($data[$i]['algorithm']);
      $seen_value = floatval($data[$i]['seen_value']);
      $orientation = $conn->real_escape_string($data[$i]['orientation']);
      $display = $conn->real_escape_string($data[$i]['display']);
      $medium = $conn->real_escape_string($data[$i]['medium']);
      $thumbnail = $conn->real_escape_string($data[$i]['thumbnail']);
      $sql = "INSERT INTO $table (type, name, created, modified, title, keywords, description, algorithm, seen_value, orientation, display, medium, thumbnail) VALUES ('$type',  '$name', '$created', '$modified', '$title', '$keywords', '$description', $algorithm, '$seen_value', '$orientation', '$display', '$medium', '$thumbnail')";
      $result = $conn->query($sql);
    }

    $decoded['data'] = count($data);

  } // insert

  if($decoded['request'] === 'update') {
    $data = json_decode($decoded['data'], true);

    for($i = 0; $i < count($data); $i++) {
      $name = $conn->real_escape_string($data[$i]['name']);
      $type = $conn->real_escape_string($data[$i]['type']);
      $created = intval($data[$i]['created'], 10);
      $modified = intval($data[$i]['modified'], 10);
      $title = $conn->real_escape_string($data[$i]['title']);
      $keywords = $conn->real_escape_string($data[$i]['keywords']);
      $description = $conn->real_escape_string($data[$i]['description']);
      $algorithm = floatval($data[$i]['algorithm']);
      $seen_value = floatval($data[$i]['seen_value']);
      $orientation = $conn->real_escape_string($data[$i]['orientation']);
      $display = $conn->real_escape_string($data[$i]['display']);
      $medium = $conn->real_escape_string($data[$i]['medium']);
      $thumbnail = $conn->real_escape_string($data[$i]['thumbnail']);
      $sql = "UPDATE $table SET title = '$title', type = '$type', keywords = '$keywords', display = '$display', medium = '$medium', thumbnail = '$thumbnail', created = '$created', algorithm = '$algorithm', seen_value = '$seen_value', orientation = '$orientation', description = '$description' WHERE name = '$name'";
      $result = $conn->query($sql);
    }

    $decoded['data'] = count($data);

  } // update

  if($decoded['request'] === 'delete') {

    $data = json_decode($decoded['data'], true);

    for($i = 0; $i < count($data); $i++) {
      $name = $data[$i]['name'];
      $sql = "DELETE FROM $table WHERE name = '$name'";
      $result = $conn->query($sql);
    }

    $decoded['data'] = count($data);

  } // delete

}

if($decoded['client'] === 'homepage') {

  if($decoded['request'] === 'views') {

    $name = $decoded['name'];

    // $date = new DateTime();
    $sTime = floor(microtime(true) * 1000);

    $newView  = '{ "client": "'.$decoded['cTime'].'", "server": "'.$sTime.'" }';

    $sql = "SELECT views FROM $table WHERE name = '$name'";
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

    $sql = "UPDATE $table SET views = '$newViews' WHERE name = '$name'";
    $result = $conn->query($sql);

    $myObj->type = gettype($name);
    $myObj->content = $name;
    $myObj->result = $result;
    $myObj->sTime = $sTime;
    $myObj->cTime = $cTime;
    
    $myJSON = json_encode($myObj);

    $decoded['data'] = $myJSON;

    // $decoded['data'] = true;
  } // delete

}

if($decoded['client'] === 'homepage' && $decoded['request'] === 'seen') {

    $names = $decoded['names'];
    $names = str_replace('[', '', $names);
    $names = str_replace(']', '', $names);
    $names = str_replace('"', '', $names);
    $names = explode(',', $names);
    // $names = json_decode($$decoded['names'], true);
    // $date = new DateTime();
    $sTime = floor(microtime(true) * 1000);
    $cTime = $decoded['cTime'];
    for($i = 0; $i < count($names); $i++) {
        $newseen  = '{ "client": "'.$cTime.'", "server": "'.$sTime.'" }';
        $name = $names[$i];
        $sql = "SELECT seen FROM $table WHERE name = '$name'";
        $result = $conn->query($sql);
        $raw = mysqli_fetch_array($result);
        $array = explode(';', $raw['seen']);
        $array[] = $newseen;
        $seen = array();
        for($j = 0; $j < count($array); $j++) {
            if (strpos($array[$j], 'server') !== false) {
                $seen[] = $array[$j];
            }
        }
        $newseens = implode(';', $seen);
        $sql = "UPDATE $table SET seen = '$newseens' WHERE name = '$name'";
        $result = $conn->query($sql);
    }
    $myObj->type = gettype($names);
    $myObj->name = $name;
    $myObj->newseens = $newseens;
    $myObj->content = $names;
    $myObj->result = $result;
    $myObj->sTime = $sTime;
    $myObj->cTime = $cTime;
    $myObj->first = $names[0];
    
    $myJSON = json_encode($myObj);

    $decoded['data'] = $myJSON;
}

if($decoded['client'] === 'manager' || $decoded['client'] === 'homepage') {

  $conn->close();

  header('Content-Type: application/json');
  echo json_encode($decoded);
}

?>
