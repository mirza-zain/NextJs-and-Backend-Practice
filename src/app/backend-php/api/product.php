<?php
// This header is CRUCIAL. It tells the browser to allow requests from other origins.
// Your Next.js app (localhost:3000) and your PHP app (localhost:8000) are different "origins".
// Without this, you will get a CORS error.
header("Access-Control-Allow-Origin: *");

// This tells the browser that the response is in JSON format.
header("Content-Type: application/json; charset=UTF-8");

// We're creating the same array of products, using PHP syntax.
$products = [
  ['id' => 1, 'name' => 'PHP-Powered T-Shirt', 'price' => 17.99, 'stock' => 150],
  ['id' => 2, 'name' => 'PHP-Powered Jeans', 'price' => 54.99, 'stock' => 100],
  ['id' => 3, 'name' => 'PHP-Powered Sneakers', 'price' => 99.99, 'stock' => 75]
];

// `json_encode` is the PHP equivalent of `JSON.stringify`.
// `echo` prints the output.
echo json_encode($products);
?>