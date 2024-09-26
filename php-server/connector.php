<?php 
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Headers: Content-Type');
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
$conn = mysqli_connect('192.168.1.103', 'root', '', 'database');
?>