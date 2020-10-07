<?php
include "conn.php";
if(isset($_POST['username'])){
    $user = $_POST['username'];//获取前端传来的用户名。
    $result = $conn->query("select * from media-registry where name='$user'");
    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false;
    };
}
if(isset($_POST['submit'])){
        $user = $_POST['username'];
        $pass = $_POST['password'];
        $email = $_POST['email'];
        $conn->query("insert media-registry values(default,'$user','$pass','$email',NOW())");
}