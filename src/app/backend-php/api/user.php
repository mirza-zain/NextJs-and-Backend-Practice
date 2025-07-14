<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset = UTF-8");

$db_host = "127.0.0.1";
$db_name = "user";
$db_username = "shoes_user";
$db_password = "kachan786";
try {

    $pdo = new PDO("mysql:host=$db_host; dbname=$db_name", $db_username, $db_password);

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $data = $pdo->prepare("SELECT name, title FROM user_info WHERE id = 1");

    $data->execute();

    $users = $data->fetch(PDO::FETCH_ASSOC);

    echo json_encode($users);

} catch(PDOException $e) {
    echo json_encode(['Error' => 'Database Error: ', $e->getMessage()]);
}

?>