<?php
include "conn.php";
header('Access-Control-Allow-Origin:*');   //任意地址都可以访问
header('Access-Control-Allow-Method:POST,GET');  //跨越请求的方式

if(isset($_POST['username'])){
    $user = $_POST['username'];//获取前端传来的用户名。
    echo $user;
    $result = $conn->query("select * from registry where username='$user'");
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