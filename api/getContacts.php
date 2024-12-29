<?php

session_start();
include('connector.php');
$json = file_get_contents('php://input');
$data = json_decode($json, true);


    $user = $_SESSION['user']; 
    $sql = "SELECT * FROM profile WHERE name IN(SELECT url FROM )";
    $result = mysqli_query($conn, $sql);
    $response = array();
    
    while($row = mysqli_fetch_assoc($result)) {
        $response[] = $row;
    }

  
    
echo (json_encode($response));

?>
