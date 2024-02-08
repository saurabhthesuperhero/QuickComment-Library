<?php
// Database connection settings
ini_set('display_errors', 0); // Turn off error displaying
error_reporting(E_ALL); // Report all errors
ini_set('log_errors', 1); // Enable error logging
ini_set('error_log', 'php-error.log'); // Specify the log file path


$host = '';
$dbname = '';
$username = '';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // echo json_encode(['status' => 'Connected successfully']); // For debugging: Remove in production!
} catch (PDOException $e) {
    error_log("Connection failed: " . $e->getMessage()); // Log connection error
    die(json_encode(['status' => 'Connection failed', 'error' => $e->getMessage()]));
}

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    try {
        $stmt = $pdo->prepare("INSERT INTO comments (post_url, name, email, comment) VALUES (?, ?, ?, ?)");
        if ($stmt->execute([$data['post_url'], $data['name'], $data['email'], $data['comment']])) {
            // echo json_encode(['status' => 'Comment successfully added']);
        } else {
            echo json_encode(['status' => 'Failed to add comment']);
        }
    } catch (PDOException $e) {
        error_log("Insert failed: " . $e->getMessage()); // Log insert error
        echo json_encode(['status' => 'Insert failed', 'error' => $e->getMessage()]);
    }
} else {
    $post_url = $_GET['post_url'] ?? '';
    try {
        $stmt = $pdo->prepare("SELECT name, comment, posted_at FROM comments WHERE post_url = ? ORDER BY posted_at DESC");
        $stmt->execute([$post_url]);
        $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($comments);
    } catch (PDOException $e) {
        error_log("Fetch failed: " . $e->getMessage()); // Log fetch error
        echo json_encode(['status' => 'Fetch failed', 'error' => $e->getMessage()]);
    }
}
?>
