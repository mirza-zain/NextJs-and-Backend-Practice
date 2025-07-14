<?php
// This header is CRUCIAL. It tells the browser to allow requests from other origins.
// Your Next.js app (localhost:3000) and your PHP app (localhost:8000) are different "origins".
// Without this, you will get a CORS error.
header("Access-Control-Allow-Origin: *");

// This tells the browser that the response is in JSON format.
header("Content-Type: application/json; charset=UTF-8");

//Database connection
$db_host = '127.0.0.1';
$db_name = 'my_ecommerce';
$db_username = 'shoes_user';
$db_password = 'kachan786';

try {
  $pdo = new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);

  $pdo -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $stmt = $pdo -> prepare("SELECT id, name, price, stock FROM products");

  $stmt -> execute();

  $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
  
  // `json_encode` is the PHP equivalent of `JSON.stringify`.
  // `echo` prints the output.
  echo json_encode($products);
} catch(PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Database Error:', $e->getMessage()]);
}

?>