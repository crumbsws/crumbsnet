<?php
include('connector.php');
include('library.php');
session_start();

function setResponse($state, $message, $user = []){
    $response = 
    [
        'state' => $state,
        'message' => $message,
        'user' => $user
    ];
    echo (json_encode($response)); 
}

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if(!empty($data['user']) && !empty($data['password']))
{
  $user = str_replace(' ', '', $data['user']);
  $password = $data['password'];
  $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
  $sql = "SELECT * FROM account WHERE user = '$user'";
  $result = mysqli_query($conn, $sql);
  if(mysqli_num_rows($result) === 0) {
    $sql = "INSERT INTO account VALUES ('$user', '$hashedPassword')";
    mysqli_query($conn, $sql);
    createProfile($user, 1);
    $_SESSION['user'] = $user;
    $message = 'Created account';
    $state = 'loggedin';
    setResponse($state, $message, $_SESSION['user']);


  }
  else
  {
    $state = 'error';
    $message = 'An account with that name already exists.';
    setResponse($state, $message, []);
  }

}
else
{
  $state = 'error';
  $message = 'Please fill everything.';
  setResponse($state, $message, []);
}
?>