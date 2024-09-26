<?php
error_reporting(E_ALL);
include('connector.php');
session_start();
include('library.php');

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if(isset($data['user']))
{
    $user = $data['user'];
    $data = getProfile($user, '*');

}
echo (json_encode($data));


?>