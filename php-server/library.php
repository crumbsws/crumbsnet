<?php
function createProfile($user, $points){
    $conn = mysqli_connect('192.168.1.103', 'root', '', 'database');
    $image = 'default.png';
    $sql = "INSERT INTO profile VALUES ('$user', '$points', '', '', '', '', '$image')";
    mysqli_query($conn, $sql);
  }
  function getProfile($user, $element){
    $conn = mysqli_connect('192.168.1.103', 'root', '', 'database');
    if($element === '*'){
      $sql = "SELECT * FROM profile WHERE name='$user'";
    }
    else {
      $sql = "SELECT '$element' FROM profile WHERE name='$user'";
    }

    $result = mysqli_query($conn, $sql);
    $data = array();
    while($row = mysqli_fetch_array($result)) {
      $data[] = $row;
    }
    return $data;
  }
  function addPoint($user, $amount){
    $conn = mysqli_connect('192.168.1.103', 'root', '', 'database');
    $sql = "UPDATE profile SET point = point + '$amount' WHERE name='$user'";
    mysqli_query($conn, $sql);
  }
  function getClub($user){
    $conn = mysqli_connect('192.168.1.103', 'root', '', 'database');
    $sql = "SELECT * FROM clubs WHERE name=(SELECT club FROM profile WHERE name='$user')";
    $result = mysqli_query($conn, $sql);
    $data = array();
    while($row = mysqli_fetch_array($result)) {
      $data[] = $row;
    }
    return $data;
  }
  function setClub($user, $club){
    $conn = mysqli_connect('192.168.1.103', 'root', '', 'database');
    $sql = "UPDATE profile SET club='$club' WHERE name='$user'";
    mysqli_query($conn, $sql);
  }
  function createClub($name, $founder, $description, $card, $point){
    $conn = mysqli_connect('192.168.1.103', 'root', '', 'database');
    $sql = "INSERT INTO clubs VALUES ('$name', '$founder', '$description', '$card','$point')";//points will be set to the points of the user
    mysqli_query($conn, $sql);
  }

  function getRequests($user){
    $conn = mysqli_connect('192.168.1.103', 'root', '', 'database');
    $sql = "SELECT * FROM requests WHERE receiver='$user' ORDER BY date DESC";
    $result = mysqli_query($conn, $sql);
    $data = array();
    while($row = mysqli_fetch_array($result)) {
      $data[] = $row;
    }
    return $data;
  }
  function getSentRequests($user){
    $conn = mysqli_connect('192.168.1.103', 'root', '', 'database');
    $sql = "SELECT receiver FROM requests WHERE sender='$user' ORDER BY date DESC";
    $result = mysqli_query($conn, $sql);
    $data = array();
    while($row = mysqli_fetch_array($result)) {
      $data[] = $row;
    }
    return $data;
  }
  function checkFriends($friend_1, $friend_2){  
  $conn = mysqli_connect('192.168.1.103', 'root', '', 'database');
  $sql = "SELECT * FROM friends WHERE (user_1='$friend_1' OR user_2='$friend_1') AND (user_1='$friend_2' OR user_2='$friend_2')";
  $result = mysqli_query($conn, $sql);
  if(mysqli_num_rows($result) === 0) {
    return false;
  }
  else {
   return true;
  }
}
?>
