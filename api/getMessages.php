<?php
error_reporting(E_ALL);
include('connector.php');
session_start();
include('library.php');
$json = file_get_contents('php://input');
$data = json_decode($json, true);

$user = $_SESSION['user'];
if(isset($_GET['status']) && $_GET['status'] === 'unseen') {
    $sql = "SELECT * FROM messages WHERE channel IN(SELECT url FROM channel_user WHERE user='$user') AND status='unseen' AND user!='$user'";
    $result = mysqli_query($conn, $sql);
    $data = array();
    
    while($row = mysqli_fetch_array($result)) {
        $data[] = $row;
    }
  }
else {
if(isset($data['channel'])){

    
    $channel = $data['channel'];
    $sql = "SELECT * FROM messages WHERE channel='$channel'";
    $result = mysqli_query($conn, $sql);
    $data = array();
    
    while($row = mysqli_fetch_array($result)) {
        $data[] = $row;
    }
    $sql = "UPDATE messages SET status='seen' WHERE channel='$channel' AND status='unseen' AND user!='$user'";
    mysqli_query($conn, $sql);
    

}
else{
    $data[] = 0;
}    
}   
echo (json_encode($data));

?>
