<?php
include('connector.php');
include('library.php');
session_start();

function setResponse($state, $message, $data){
    $response = 
    [
        'state' => $state,
        'message' => $message,
        'data' => $data
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
    $sql = "INSERT INTO account (user, password) VALUES ('$user', '$hashedPassword')";
    mysqli_query($conn, $sql);
    createProfile($conn, $user, 1);
    createToken($conn, $user);
    $_SESSION['user'] = $user;
    $message = 'Created account';
    $state = 'loggedin';

    $sql = "SELECT * FROM profile WHERE name='$user'";
    if($result = mysqli_query($conn, $sql)){
      while ($row = mysqli_fetch_assoc($result)) {
          $data[] = $row;
      }}

    setResponse($state, $message, $data);


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
