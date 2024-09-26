<?php
session_start();
include('connector.php');


$sql = "SELECT collect, COUNT(*) as count FROM paths WHERE STR_TO_DATE(date, '%Y-%m-%d %h:%i:%s%p') >= NOW() - INTERVAL 1 DAY GROUP BY collect ORDER BY count DESC LIMIT 10";
$result = mysqli_query($conn, $sql);
$data = array();

while($row = mysqli_fetch_array($result)) {
    $data[] = $row;
}

echo (json_encode($data));
?>