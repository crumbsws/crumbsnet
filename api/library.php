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


function createToken($conn, $name){
  $token = bin2hex(random_bytes(16));
  $expiry = date('Y-m-d h:i', strtotime('+30 days'));
  $sql = "INSERT INTO auth_token (user, token, expiry) VALUES ('$name', '$token', '$expiry')";
  setcookie('auth_token', $token, time() + (30 * 24 * 60 * 60), "/", "", true, true);

  mysqli_query($conn, $sql);
}

function checkToken($conn){
  if(isset($_COOKIE['auth_token'])){
    $token = $_COOKIE['auth_token'];
    $date = date('Y-m-d h:i');
    $sql = "SELECT user FROM auth_token WHERE token='$token' AND expiry > '$date'";
    $result = mysqli_query($conn, $sql);
  while($row = mysqli_fetch_array($result)) {
    return $row['user'];
  }}
  
  return null;

}

function clearToken($conn){
  if(isset($_COOKIE['auth_token'])){
    $token = $_COOKIE['auth_token'];
    $sql = "DELETE FROM auth_token WHERE token='$token'";
    $result = mysqli_query($conn, $sql);
  }
}
?>
