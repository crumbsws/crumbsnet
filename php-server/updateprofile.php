<?php
error_reporting(E_ALL);
include('connector.php');
session_start();
function setResponse($state, $message){
    $response = 
    [
        'state' => $state,
        'message' => $message
    ];
    echo (json_encode($response));
  
  }

$user = $_POST['user'];

if (!empty($_FILES['photo'])) {

    $directory = $_SERVER["DOCUMENT_ROOT"] . "/profiles/";

    $file = $directory . basename($_FILES["photo"]["name"]);
    if (move_uploaded_file($_FILES["photo"]["tmp_name"], $file)) {
        $photo = $_FILES["photo"]["name"];
        $sql = "UPDATE profile SET photo='$photo' WHERE name='$user'";
        $result = mysqli_query($conn, $sql);
    }
}

if(!empty($_POST['relationship']) && $_POST['relationship'] != '')
{
    if($_POST['relationship'] === 'yes'){
        $relationship = 'Single';
    }
    else if($_POST['relationship'] === 'no'){
        $relationship = 'In a relationship';
    }
    else {
        $relationship = 'Has no idea';
    }
    $sql = "UPDATE profile SET relation='$relationship' WHERE name='$user'"; 
    $result = mysqli_query($conn, $sql);

}
if(!empty($_POST['description']) && $_POST['description'] != '')
{
 
    $description = $_POST['description'];
    $sql = "UPDATE profile SET description='$description' WHERE name='$user'"; 
    $result = mysqli_query($conn, $sql);

}
if(!empty($_POST['home']) && $_POST['home'] != '')
{
 
    $home = $_POST['home'];
    $sql = "UPDATE profile SET home='$home' WHERE name='$user'"; 
    $result = mysqli_query($conn, $sql);

}
$state= 'success';
$message = 'Profile updated.';//Imp
setResponse($state, $message);
?>