<?php
include 'config.php';
$id = isset($_GET['id']) ? $_GET['id'] : 0;
$type = isset($_GET['type']) ? $_GET['type'] : 'Personal';

$stmt = $conn->prepare("DELETE FROM tasks WHERE id = :id");
$stmt->execute(['id' => $id]);

header("Location: index.php?type=$type");
exit;
?>