<?php
session_start();
error_reporting(E_ALL);
include('connector.php');
include('config.php');
include('library.php');
function setResponse($state, $url){
  $response = 
  [
      'id' => $url,
      'state' => $state
  ];
  echo (json_encode($response));

}


if (isset($_POST['title']) && !empty($_POST['body']) && isset($_POST['collect']) && !empty($_SESSION['user']) && !empty($_SESSION['user'])) {

$directory = $_SERVER["DOCUMENT_ROOT"] . "/images/";

if (isset($_FILES['conf'])) {
    $file = $directory . basename($_FILES["conf"]["name"]);
    if (move_uploaded_file($_FILES["conf"]["tmp_name"], $file)) {
        $conf = $_FILES["conf"]["name"];
    }
}
else {
    $conf = null;
}


$title = mysqli_real_escape_string($conn, $_POST['title']);
$collect = mysqli_real_escape_string($conn, $_POST['collect']);
$user = $_SESSION['user'];

$url = uniqid();
$body = mysqli_real_escape_string($conn, $_POST['body']);
$date = date("Y-m-d h:i:sa");
if(!empty($_POST['parent'])){
    $parent = $_POST['parent'];
}
else {
    $parent = 'public';
}

    $sql = "INSERT INTO paths VALUES ('$user', '$title', '$parent', '$url', '$body', '$date', '$conf', '$collect')";
    $state= 'success';
    setResponse($state, $url);
    addPoint($user, $postPoint);
    mysqli_query($conn, $sql);
    mysqli_close($conn);

}
else {
    $state= 'failed2';
    setResponse($state, []);
    }
?>