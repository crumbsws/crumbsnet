<?php
session_start();
include('connector.php');

include('library.php');


$json = file_get_contents('php://input');
$data = json_decode($json, true);
if(isset($data['item'])) {
    $user = $_SESSION['user'];
    $item = $data['item'];
        if($item == 'user') {
            $data = $user;
        }
        else if($item == 'club') {
            $data = getClub($user);
        }
        else if($item == 'requests') {
            $data = getRequests($user);
        }
    }
    echo (json_encode($data));
?>