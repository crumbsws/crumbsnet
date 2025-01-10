<?php
session_start();
include('connector.php');
include('library.php');
$json = file_get_contents('php://input');
$data = json_decode($json, true);
function setResponse($state){
    $response = 
    [
        'state' => $state
    ];
    echo (json_encode($response));
  }

  if(isset($data['identifier']) && !empty($data['identifier'])) {
    $sql = "SELECT email FROM account WHERE user='$user' OR email='$email'";
    $result = mysqli_query($conn, $sql);
    if(mysqli_num_rows($result) === 1) {
        //lol
    }  }
?>