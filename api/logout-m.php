<?php
session_start();
include('connector.php');
include('library.php');

session_destroy();
setcookie("auth_token", "", time()-3600);



?>