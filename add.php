<?php
include 'config.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name        = $_POST['name'];
    $description = $_POST['description'];
    $status      = $_POST['status'];
    $type        = $_POST['type'];

    $log = "[" . date('Y-m-d H:i:s') . "] Tugas baru ditambahkan: $name ($type)\n";
    file_put_contents('log.txt', $log, FILE_APPEND);

    $sql = "INSERT INTO tasks (name, description, status, type) VALUES (:name, :description, :status, :type)";
    $stmt = $conn->prepare($sql);
    $stmt->execute(['name' => $name, 'description' => $description, 'status' => $status, 'type' => $type]);

    header("Location: index.php?type=$type");
    exit;
}
?>