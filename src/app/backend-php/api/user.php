<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset = UTF-8");

$user = ["name" => "Mirza Zain", "title" => "Full Stack Developer"];

echo json_encode($user);

?>