# E05 - The Offline Abyss (Progressive Web App)

## Fitur yang Diimplementasikan
Pada tugas ini, aplikasi Todo List dikembangkan menjadi sebuah Progressive Web App (PWA). Terdapat beberapa fitur utama yang diimplementasikan:

1. **Web App Manifest:** Menambahkan file `manifest.json` beserta icon (192x192 dan 512x512) untuk memenuhi syarat *installability*, sehingga aplikasi dapat dipasang (install) pada perangkat pengguna dengan mode tampilan `standalone`.
2. **Service Worker (Precaching):** Mengimplementasikan `sw.js` untuk melakukan *precaching* pada aset *App Shell* (file CSS, JS, Icon) serta menyediakan halaman `offline.html` sebagai cadangan.
3. **Strategi Caching:** Menerapkan strategi *Network First* dengan *fallback to cache*. Aplikasi akan selalu mengutamakan pengambilan data terbaru dari server. Apabila koneksi terputus, Service Worker akan mengambil aset dari Cache Storage atau menampilkan halaman `offline.html`.
4. **Custom Install Button:** Menambahkan tombol install pada antarmuka yang memanfaatkan event `beforeinstallprompt` dari browser.

---

## Bukti Pengerjaan (Screenshots)

### 1. DevTools - Manifest
<img width="1470" height="956" alt="Screenshot 2026-11-02 at 16 43 42" src="https://github.com/user-attachments/assets/a8a00061-318c-473d-8b16-16a85a2b0bc9" />


**Penjelasan:** 
Berdasarkan hasil inspeksi pada tab *Application > Manifest*, browser berhasil membaca file `manifest.json` dengan baik. Informasi identitas aplikasi seperti *name*, *short_name*, *theme_color*, serta *icons* (192x192 dan 512x512) termuat dengan sempurna. Hal ini membuktikan bahwa aplikasi telah memenuhi kriteria dasar sebagai PWA yang dapat di-install.

### 2. DevTools - Cache Storage
<img width="1470" height="956" alt="Screenshot 2026-11-02 at 16 43 29" src="https://github.com/user-attachments/assets/27ac3bc3-3e64-455a-a469-6756e972be43" />


**Penjelasan:** 
Berdasarkan inspeksi pada tab *Application > Cache Storage* (folder `todo-pwa-v1`), Service Worker berhasil menyimpan aset *App Shell* ke dalam memori browser. Aset yang berhasil di-cache meliputi `style.css`, `script.js`, `offline.html`, serta file icon. Hal ini membuktikan bahwa proses *precaching* berjalan dengan sukses.

### 3. Tombol Install PWA
<img width="444" height="237" alt="Screenshot 2026-11-02 at 16 44 18" src="https://github.com/user-attachments/assets/72f3aac4-f13a-4553-90f7-f6cca45fd4b5" />


**Penjelasan:** 
Gambar di atas menunjukkan antarmuka tombol **"📲 Install App"** yang muncul di bawah tombol *Light Mode*. Tombol ini muncul secara otomatis karena browser mendeteksi adanya event `beforeinstallprompt` (kriteria PWA terpenuhi). Apabila tombol ditekan, browser akan memunculkan dialog untuk meng-install aplikasi web ini.

### 4. Uji Coba Mode Offline
<img width="1470" height="956" alt="Screenshot 2026-11-02 at 16 44 56" src="https://github.com/user-attachments/assets/ccc031e5-b8d7-4e95-8cd2-aae8856bbd19" />


**Penjelasan:** 
Pengujian dilakukan dengan mengaktifkan mode *"Offline"* pada DevTools, kemudian melakukan *refresh* halaman `index.php`. Karena halaman tersebut membutuhkan koneksi ke database MySQL (*server-side*), data tugas tidak dapat dimuat. Namun, Service Worker berhasil mencegat *request* yang gagal tersebut dan mengembalikan halaman `offline.html` dari Cache Storage. Dengan demikian, aplikasi tidak mengalami *blank screen* saat koneksi terputus.

