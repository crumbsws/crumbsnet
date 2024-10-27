<?php
function createProfile($conn, $user, $points){
    $image = 'default.png';
    $sql = "INSERT INTO profile (name, point, description, home, relation, club, photo) VALUES ('$user', '$points', '', '', '', '', '$image')";
    mysqli_query($conn, $sql);
  }
  function getProfile($conn, $user, $element){
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
  function addPoint($conn, $user, $amount){
    $sql = "UPDATE profile SET point = point + '$amount' WHERE name='$user'";
    mysqli_query($conn, $sql);
  }
  function getClub($conn, $user){
    $sql = "SELECT * FROM clubs WHERE name=(SELECT club FROM profile WHERE name='$user')";
    $result = mysqli_query($conn, $sql);
    $data = array();
    while($row = mysqli_fetch_array($result)) {
      $data[] = $row;
    }
    return $data;
  }
  function setClub($conn, $user, $club){
    $sql = "UPDATE profile SET club='$club' WHERE name='$user'";
    mysqli_query($conn, $sql);
  }
  function createClub($conn, $name, $founder, $description, $card, $point){
    $sql = "INSERT INTO clubs (name, founder, description, card, point) VALUES ('$name', '$founder', '$description', '$card','$point')";//points will be set to the points of the user
    mysqli_query($conn, $sql);
  }

  function getRequests($conn, $user){
    $sql = "SELECT * FROM requests WHERE receiver='$user' OR sender='$user' ORDER BY date DESC";
    $result = mysqli_query($conn, $sql);
    $data = array();
    while($row = mysqli_fetch_array($result)) {
      $data[] = $row;
    }
    return $data;
  }
  function getSentRequests($conn, $user){
    $sql = "SELECT receiver FROM requests WHERE sender='$user' ORDER BY date DESC";
    $result = mysqli_query($conn, $sql);
    $data = array();
    while($row = mysqli_fetch_array($result)) {
      $data[] = $row;
    }
    return $data;
  }
  function checkFriends($conn, $friend_1, $friend_2){  
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
