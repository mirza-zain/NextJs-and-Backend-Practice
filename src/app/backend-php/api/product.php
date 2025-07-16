<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// NEW: Allow POST method
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


// --- Database Connection Details ---
$db_host = '127.0.0.1';
$db_name = 'my_ecommerce';
$db_user = 'shoes_user'; // Or your correct user
$db_pass = 'kachan786';   // Your correct password

try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // --- Check the request method ---
    $method = $_SERVER['REQUEST_METHOD'];

    if ($method == 'GET') {
        // This is the logic we already had
        $stmt = $pdo->prepare("SELECT id, name, price, stock FROM products");
        $stmt->execute();
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($products);
    } 
    elseif ($method == 'POST') {
        // This is our new logic for creating a product
        
        // 1. Get the incoming JSON data from the request body
        $data = json_decode(file_get_contents("php://input"));
        
        // Basic validation (in a real app, this would be more robust)
        if (empty($data->name) || empty($data->price) || empty($data->stock)) {
            http_response_code(400); // Bad Request
            echo json_encode(['error' => 'Incomplete data. Please provide name, price, and stock.']);
            exit;
        }

        // 2. Prepare the SQL INSERT statement
        // Using placeholders (?) prevents SQL injection
        $sql = "INSERT INTO products (name, price, stock) VALUES (?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        
        // 3. Execute the statement with the data
        $stmt->execute([$data->name, $data->price, $data->stock]);
        
        // 4. Send a success response
        http_response_code(201); // Created
        echo json_encode(['message' => 'Product created successfully.']);
    } 
    elseif($method == 'PUT')
    {
        $data = json_decode(file_get_contents('php://input'));
        $id = isset($_GET['id']) ? $_GET['id'] : null;
        
        if(!$id)
        {
            http_response_code(400);
            echo json_encode(['error' => 'Product ID not specified']);
            exit;
        }

        $sql = $pdo->prepare("UPDATE products SET name = ?, price = ?, stocks = ? WHERE id = ?");
        $sql->execute([$data->name, $data->price, $data->stock, $id]);

        http_response_code(200);
        echo json_encode(['message' => 'Product updated successfully.']);
    }

} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>