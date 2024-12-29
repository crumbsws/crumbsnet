<?php
function createProfile($conn, $user, $points){
    $image = 'default.png';
    $sql = "INSERT INTO profile (name, point, description, home, relation, photo) VALUES ('$user', '$points', '', '', '', '$image')";
    mysqli_query($conn, $sql);
  }
  function addPoint($conn, $user, $amount){
    $sql = "UPDATE profile SET point = point + '$amount' WHERE name='$user'";
    mysqli_query($conn, $sql);
  }
  function getClub($conn, $user){
    $sql = "SELECT * FROM clubs WHERE name IN(SELECT club FROM club_user WHERE user='$user')";
    $result = mysqli_query($conn, $sql);
    $data = array();
    while($row = mysqli_fetch_array($result)) {
      $data[] = $row;
    }
    return $data;
  }
  function getOwnedClub($conn, $user){
    $sql = "SELECT * FROM clubs WHERE founder='$user'";
    $result = mysqli_query($conn, $sql);
    $data = array();
    while($row = mysqli_fetch_array($result)) {
      $data[] = $row;
    }
    return $data;
  }
  function setClub($conn, $user, $club){
    $sql = "INSERT IGNORE INTO club_user (user, club) VALUES ('$user', '$club')";
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
  function updateRequests($conn, $user){
    $sql = "UPDATE requests SET status='pending' WHERE status='unseen' AND receiver='$user'";
    mysqli_query($conn, $sql);
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
function getContacts($conn, $user){  
  $sql = "SELECT url FROM channel_user WHERE user='$user'";
  $result = mysqli_query($conn, $sql);
  $data = array();
  while($row = mysqli_fetch_array($result)) {
    $data[] = $row;
  }
  return $data;
}
?>
