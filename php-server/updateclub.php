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

$user = $_SESSION['user'];
if(!empty($_POST['card']))
{
    if($_POST['card'] === 'pumpkin'){
        $card = 'pumpkin';
    }//GEREKSIZ, DIREKT SET YAP DEĞERI
    else if($_POST['card'] === 'cardinal'){
        $card = 'cardinal';
    }
    else if($_POST['card'] === 'night'){
        $card = 'night';
    }
    else if($_POST['card'] === 'pacific'){
        $card = 'pacific';
    }
    else {
        $card = 'crumbs';
    }
    $sql = "UPDATE clubs SET card='$card' WHERE founder='$user'"; //IMPROVE THIS OPTIOAL, BUT HANDLE PARAMETERS IN SEARCH
    $result = mysqli_query($conn, $sql);

}
if(!empty($_POST['description']))
{
 
    $description = $_POST['description'];
    $sql = "UPDATE clubs SET description='$description' WHERE founder='$user'"; //IMPROVE THIS OPTIOAL, BUT HANDLE PARAMETERS IN SEARCH
    $result = mysqli_query($conn, $sql);

}
$state= 'success';
$message = 'Club updated.';//Imp
setResponse($state, $message);
?>