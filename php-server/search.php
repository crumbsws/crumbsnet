<?php
error_reporting(E_ALL);
include('connector.php');
session_start();

$json = file_get_contents('php://input');
$data = json_decode($json, true);
$value = $data['value'];
$type = $data['type'];
if(isset($data['value']) && isset($data['type']))
{
    if($type == 'people'){
    $sql = "SELECT * FROM profile WHERE name LIKE '%$value%' ORDER BY point DESC"; //IMPROVE THIS OPTIOAL, BUT HANDLE PARAMETERS IN SEARCH
    }
    else if($type == 'clubs'){
    $sql = "SELECT * FROM clubs WHERE name LIKE '%$value%' ORDER BY point DESC"; //IMPROVE THIS OPTIOAL, BUT HANDLE PARAMETERS IN SEARCH
    }
    else {
    $sql = "SELECT * FROM paths WHERE title OR body OR name OR collect OR url LIKE '%$value%' OR body LIKE '%$value%' OR name LIKE '%$value%' OR collect LIKE '%$value%' OR url LIKE '%$value%' ORDER BY date DESC";
    }
    
    $result = mysqli_query($conn, $sql);
    $data = array();
    
    while($row = mysqli_fetch_array($result)) {
        $data[] = $row;
    }

}
echo (json_encode($data));
?>