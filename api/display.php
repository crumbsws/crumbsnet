<?php
session_start();
include('connector.php');
include('library.php');
$json = file_get_contents('php://input');
$data = json_decode($json, true);
$name = $_SESSION['user']; 
if(isset($data['type']) && $data['type'] === 'posts')
{

    if(isset($data['parent'])){
        $parent = $data['parent'];
        if(isset($data['user']))
        {
            $user = $data['user'];
            $sql = "SELECT * FROM paths WHERE parent='$parent' AND name='$user' AND (access = 'public' 
                         OR (access = 'friends' AND name IN 
                            (SELECT CASE 
                                    WHEN user_2 = '$name' THEN user_1 
                                    ELSE user_2 
                                    END AS friend 
                             FROM friends 
                             WHERE user_1 = '$name' 
                             OR user_2 = '$name'))) OR ('$user' = '$name' AND name='$name')  ORDER BY date DESC";
        }
        else if(isset($data['club']))
        {
            $club = $data['club'];
            $sql = "SELECT * FROM paths WHERE parent='$parent' AND access='public' AND name IN (SELECT name FROM profile WHERE club='$club') ORDER BY date DESC";
        }
        else 
        {
            $sql = "SELECT * FROM paths WHERE parent='$parent' AND (access = 'public' 
                         OR (access = 'friends' AND name IN 
                            (SELECT CASE 
                                    WHEN user_2 = '$name' THEN user_1 
                                    ELSE user_2 
                                    END AS friend 
                             FROM friends 
                             WHERE user_1 = '$name' 
                             OR user_2 = '$name')))  ORDER BY date DESC";
        }
    }
    else {
        $club = getClub($conn, $name);
        $sql = "SELECT * FROM paths WHERE name IN (SELECT CASE 
        WHEN user_2 = '$name' THEN user_1 
        ELSE user_2 
        END AS friend FROM friends WHERE user_1='$name' OR user_2='$name') ORDER BY date DESC";
    }
}

else if($data['type'] === 'clubs')
{
    $sql = "SELECT * FROM clubs ORDER BY point DESC";
}

else if($data['type'] === 'friends')
{
    if(isset($data['user'])) {
        $user = $data['user'];
        $sql = "SELECT * FROM profile WHERE name IN (SELECT CASE 
        WHEN user_2 = '$user' THEN user_1 
        ELSE user_2 
        END AS friend FROM friends WHERE user_1='$user' OR user_2='$user')";
    }
}
else if($data['type'] === 'gossip')
{
    if(isset($data['club'])) {
        $club = $data['club'];
        $sql = "SELECT * FROM gossip WHERE STR_TO_DATE(date, '%Y-%m-%d %h:%i:%s%p') >= NOW() - INTERVAL 8 HOUR AND name IN (SELECT name FROM profile WHERE club='$club')";
    }
}
else if($data['type'] === 'gallery')
{
    if(isset($data['club'])) {
        $club = $data['club'];
        $sql = "SELECT conf, url FROM paths WHERE conf!='' AND name IN (SELECT name FROM profile WHERE club='$club')";
    }
    else if(isset($data['user'])) {
        $user = $data['user'];
        $sql = "SELECT conf, url FROM paths WHERE conf!='' AND name='$user'";
    }
}




$result = mysqli_query($conn, $sql);
$data = array();

while($row = mysqli_fetch_array($result)) {
    $data[] = $row;
}


echo (json_encode($data));
?>
