<?php
include 'config.php';
$id = isset($_GET['id']) ? $_GET['id'] : 0;

$stmt = $conn->prepare("SELECT * FROM tasks WHERE id = :id");
$stmt->execute(['id' => $id]);
$task = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$task) die("Tugas tidak ditemukan.");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $sql = "UPDATE tasks SET name = :name, description = :description, status = :status WHERE id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->execute([
        'name' => $_POST['name'], 'description' => $_POST['description'], 
        'status' => $_POST['status'], 'id' => $id
    ]);
    header("Location: index.php?type=" . $task['type']);
    exit;
}
?>
<!DOCTYPE html>
<html>
<head><link rel="stylesheet" href="style.css"><title>Edit</title></head>
<body>
<main style="display:block; width: 50%;">
    <section class="detail">
        <h2>Edit Tugas</h2>
        <form method="POST">
            <label>Task Name</label>
            <input type="text" name="name" value="<?= htmlspecialchars($task['name']) ?>" required>
            <label>Description</label>
            <textarea name="description" required><?= htmlspecialchars($task['description']) ?></textarea>
            <label>Status</label>
            <select name="status">
                <option value="Pending" <?= $task['status'] == 'Pending' ? 'selected' : '' ?>>Pending</option>
                <option value="Completed" <?= $task['status'] == 'Completed' ? 'selected' : '' ?>>Completed</option>
            </select>
            <button type="submit">Save Changes</button>
            <a href="index.php?type=<?= $task['type'] ?>" style="margin-left:10px;">Batal</a>
        </form>
    </section>
</main>
</body>
</html>