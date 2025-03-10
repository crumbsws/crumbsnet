<?php
include('connector.php');
include('library.php');
session_start();
function setResponse($state, $message){
    $response = 
    [
        'state' => $state,
        'message' => $message
    ];
    echo (json_encode($response));
  }

if(!empty($_POST['message'])) 
{
    $user = $_SESSION['user'];
    $amount = 1;
    $date = date("Y-m-d h:i");
    $message = mysqli_real_escape_string($conn, $_POST['message']);
    $sql = "DELETE FROM diary WHERE name='$user'";
    if(mysqli_query($conn, $sql)){
        $sql = "INSERT INTO diary (name, message, date) VALUES ('$user', '$message', '$date')";    
        if(mysqli_query($conn, $sql)){
            $state= 'success';
            $message= 'Diary Updated';
            setResponse($state, $message);
            addPoint($conn, $user, $amount);
        }
        else {
            $state= 'error';
            $message= 'errored';
            setResponse($state, $message);
        }  
    }
    else {
        $state= 'error';
        $message= 'errored';
        setResponse($state, $message);
    }  

}
?>
