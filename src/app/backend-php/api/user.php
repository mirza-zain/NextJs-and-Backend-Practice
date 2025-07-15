<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset = UTF-8");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");



$db_host = "127.0.0.1";
$db_name = "user";
$db_username = "shoes_user";
$db_password = "kachan786";


try {

    $pdo = new PDO("mysql:host=$db_host; dbname=$db_name", $db_username, $db_password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $method = $_SERVER["REQUEST_METHOD"];

    if($method == 'GET')
    {
        $data = $pdo->prepare("SELECT name, title FROM user_info WHERE id = 2");
        $data->execute();
        $users = $data->fetch(PDO::FETCH_ASSOC);
        echo json_encode($users);
    } 
    elseif($method == 'POST')
    {
        $data = json_decode(file_get_contents("php://input"));

        if(empty($data->name) || empty($data->title))
        {
            echo json_encode("One of your details is empty");
            exit;
        }

        $sql = $pdo->prepare("INSERT INTO user_info (name, title) VALUES (?, ?)");
        $sql->execute([$data->name, $data->title]);

        echo json_encode(['message' => 'New User Added']);
    }


} catch(PDOException $e) {
    echo json_encode(['Error' => 'Database Error: ', $e->getMessage()]);
}

?>