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

if(!empty($data['value']) && !empty($data['url'])) 
{
    $user = $_SESSION['user'];
    $url = $data['url'];
    $amount = 1;
    $date = date("Y-m-d h:i");
    $rating = mysqli_real_escape_string($conn, $data['value']);
    $sql = "INSERT IGNORE INTO reaction (name, rating, url, date) VALUES ('$user', '$rating', '$url', '$date')";
    if(mysqli_query($conn, $sql)){
    $state= 'success';
    setResponse($state);
    addPoint($conn, $user, $amount);
    }
    else {
        $state= 'fail';
        setResponse($state);
    }  

}
?>
