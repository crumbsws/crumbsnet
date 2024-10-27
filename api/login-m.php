<?php
session_start();
include('connector.php');
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
  $user = $data['user'];
  $password = $data['password'];

  $sql = "SELECT * FROM account WHERE user='$user'";
  $result = mysqli_query($conn, $sql);
  if(mysqli_num_rows($result) === 1) {
    $row = mysqli_fetch_assoc($result);
    if(password_verify($password, $row['password']))
    {
    $_SESSION['user'] = $user;
    $message = 'Logged in';
    $state = 'loggedin';
    setResponse($state, $message, $_SESSION['user']);
    }
    else
    {
      $message = 'Wrong password, try again.';
      setResponse('error', $message, []);
    }
  }
  else
  {
    $message = 'Account not found, try again.';
    setResponse('error', $message, []);
  }

}
else
{
  $state = 'error';
  $message = 'Please fill everything.';
  setResponse($state, $message, []);
}

?>
