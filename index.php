<?php
include 'config.php';
$type = isset($_GET['type']) ? $_GET['type'] : 'Personal';
$stmt = $conn->prepare("SELECT * FROM tasks WHERE type = :type ORDER BY id DESC");
$stmt->execute(['type' => $type]);
$tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>My Todo List - E04</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<header>
    <p class="small-title">ARAH HIDUP</p>
    <h1>My Todo List</h1>
    <p>Daftar kegiatanmu biar gak malas.</p>
    <button id="modeButton" type="button" aria-label="Ganti Tema Tampilan">🌞 Light Mode</button>
</header>

<main>
    <aside>
        <h2>Menu</h2>
        <ul class="menu-list">
            <li><a href="index.php?type=Personal">Personal</a></li>
            <li><a href="index.php?type=Shared">Shared</a></li>
        </ul>
    </aside>

    <section class="detail">
        <div class="detail-header">
            <h2>Daftar Tugas (<?= htmlspecialchars($type) ?>)</h2>
        </div>

        <?php if (count($tasks) === 0): ?>
            <p>Belum ada tugas.</p>
        <?php else: ?>
            <?php foreach ($tasks as $task): ?>
                <div class="task">
                    <div class="task-content">
                        <b><?= htmlspecialchars($task['name']) ?></b>
                        <p><?= htmlspecialchars($task['description']) ?></p>
                    </div>
                    <div class="task-actions">
                        <span class="<?= $task['status'] === 'Completed' ? 'done' : 'pending' ?>">
                            <?= $task['status'] ?>
                        </span>
                        <a href="edit.php?id=<?= $task['id'] ?>" class="btn-edit">Edit</a>
                        <a href="delete.php?id=<?= $task['id'] ?>&type=<?= $type ?>" class="btn-delete" onclick="return confirm('Yakin hapus?')">Delete</a>
                    </div>
                </div>
            <?php endforeach; ?>
        <?php endif; ?>

        <div class="add-box">
            <h2>Tambah Tugas Baru</h2>
            <form action="add.php" method="POST">
                <input type="hidden" name="type" value="<?= htmlspecialchars($type) ?>">
                
                <label for="taskName">Task Name</label>
                <input id="taskName" type="text" name="name" required>
                
                <label for="taskDescription">Short Description</label>
                <input id="taskDescription" type="text" name="description" required>
                
                <label for="taskStatus">Status</label>
                <select id="taskStatus" name="status">
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>

                <button type="submit">Add Task</button>
            </form>
        </div>
    </section>
</main>

<footer>
    <p>Todo List E04</p>
</footer>

<script src="script.js"></script>
</body>
</html>