<?php
session_start();
error_reporting(E_ALL);
include('connector.php');
include('library.php');
function setResponse($state){
  $response = 
  [
      'state' => $state
  ];
  echo (json_encode($response));

}

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if(!empty($data['user']) && !empty($data['channel']) && !empty($data['message']) && !empty($data['url']))
{
$user = $data['user'];
$channel = $data['channel'];
$message = $data['message'];
$url = $data['url'];
$date = date("Y-m-d h:i");
$amount = 1;
addPoint($conn, $user, $amount);
if(isset($data['reply'])) {
    $reply = $data['reply'];
}
else
{
    $reply = null;
}

//media handling too pls


$sql = "INSERT INTO messages (user, channel, url, message, reply, date) VALUES ('$user','$channel', '$url', '$message', '$reply', '$date')";
if(mysqli_query($conn, $sql)) {
    $state= 'success';
    setResponse($state);
}
else {
    $state= 'fail';
    setResponse($state);
}
}

?>