<?php
session_start();
include('connector.php');
$json = file_get_contents('php://input');
$data = json_decode($json, true);

function setResponse($state, $name, $message){
    $response = 
    [
        'state' => $state,
        'name' => $name,
        'message' => $message
    ];
    echo (json_encode($response));
  
  }

if(isset($data['user']))
{
    $sender = $data['user'];
    $receiver = $_SESSION['user'];
    $date = date("Y-m-d h:i:sa");
    $sql = "SELECT * FROM requests WHERE sender = '$sender' AND receiver = '$receiver'";
    $result = mysqli_query($conn, $sql);
    if(mysqli_num_rows($result) === 1) {
      $sql = "INSERT INTO friends VALUES ('$sender', '$receiver', 0)";
      if(mysqli_query($conn, $sql)){
      $sql = "UPDATE requests SET status='accepted' WHERE sender = '$sender' AND receiver = '$receiver'";
      mysqli_query($conn, $sql);
      $message = 'Accepted ' . $sender;
      $state = 'success';
      setResponse($state, $message, $_SESSION['user']);
    }
  
    }
    else
    {
      $state = 'error';
      $message = 'No request';
      setResponse($state, $message, []);
    }
}
?>