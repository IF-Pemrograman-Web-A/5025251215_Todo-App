# Todo List

## Identitas

Nama: M Adhwa Athallah Tsani Anargya

NRP: 50252512125

Kelas: A

## Deskripsi
# Todo App - E03 The Lost Cavern

## Fitur yang Diimplementasikan:
1. **Web Storage (IndexedDB):** Data Todo List disimpan secara persisten menggunakan IndexedDB (`TodoAppDB`), termasuk menyimpan gambar dalam format Base64.
2. **Web Storage (LocalStorage):** Menyimpan preferensi tema (Light/Dark Mode) menggunakan key `todo-theme`.
3. **Media Capture API:** Menambahkan fitur untuk mengambil gambar menggunakan kamera perangkat langsung dari form input (`capture="environment"`).
4. **Service Worker & Notification:** Mengimplementasikan `sw.js` untuk berjalan di background thread. Digunakan untuk menjadwalkan notifikasi pengingat tugas sesuai dengan waktu yang diinputkan pengguna.
5. **Accessibility (Aksesibilitas):** Menerapkan atribut `aria-label`, `role`, dan sinkronisasi `<label for>` dengan `<input id>` agar ramah pengguna *screen reader*.

---

## Bukti Pengerjaan (Screenshot)

### 1. Penerapan IndexedDB & Gambar
*(Menunjukkan data Todo List beserta gambar Base64 tersimpan di database browser)*

<img width="1444" height="542" alt="Screenshot 2026-10-19 at 19 55 28" src="https://github.com/user-attachments/assets/f9bdb660-e4e4-4002-9b8f-ebd0578eea81" />

*Keterangan: Data tersimpan di `Application > IndexedDB > TodoAppDB > todos`.*

### 2. Penerapan LocalStorage (Dark/Light Mode)
*(Menunjukkan preferensi tema tersimpan di LocalStorage)*

<img width="1468" height="496" alt="Screenshot 2026-10-19 at 20 01 41" src="https://github.com/user-attachments/assets/7d681286-a341-4a1f-a691-566e5fb3bfb2" />

*Keterangan: Key `todo-theme` dengan value `dark` (atau `light`).*

### 3. Penerapan Media Capture API (Kamera)
*(Menunjukkan fitur pengambilan gambar dari kamera perangkat)*

<img width="686" height="674" alt="Screenshot 2026-10-19 at 20 03 12" src="https://github.com/user-attachments/assets/8e30c61b-99e8-4802-8c1a-812db26ded08" />

*Keterangan: Preview gambar tugas setelah diambil menggunakan kamera.*

### 4. Penerapan Service Worker & Notifikasi
*(Menunjukkan Service Worker aktif dan notifikasi berjalan)*

<img width="427" height="128" alt="Screenshot 2026-10-19 at 20 05 05" src="https://github.com/user-attachments/assets/e314785e-32d3-4ab8-bd94-4988edf8b083" />
