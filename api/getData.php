<?php
session_start();
include('connector.php');

include('library.php');
function setResponse($state, $data, $clubs, $contacts){
    $response = 
    [   
        'state' => $state,
        'data' => $data,
        'clubs' => $clubs,
        'contacts' => $contacts
    ];
    echo (json_encode($response));
}
$json = file_get_contents('php://input');
$data = json_decode($json, true);

    if(!empty($_SESSION['user'])){
    $user = $_SESSION['user'];
    $sql = "SELECT * FROM profile WHERE name='$user'";
    if($result = mysqli_query($conn, $sql)){
    if(mysqli_num_rows($result) === 1) {
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;  
    }
    $contacts = getContacts($conn, $user);
    $clubs = getClub($conn, $user);
    $state = 'success';
    setResponse($state, $data, $clubs, $contacts);
    }
    else {
        $state = 'error';
        $data = [];
        $clubs = [];
        $contacts = [];
        setResponse($state, $data, $clubs, $contacts);       
    }
    }
    } else {
        $state = 'error';
        $data = [];
        $clubs = [];
        $contacts = [];
        setResponse($state, $data, $clubs, $contacts);  
    }



    
    
?>
