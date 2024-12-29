<?php
session_start();
include('connector.php');

include('library.php');




$user = $_SESSION['user'];
updateRequests($conn, $user);
$data = getRequests($conn, $user);


    
echo (json_encode($data));
?>