# Laporan Tugas Praktikum Bab 8: Penyimpanan Data Lokal & Konsumsi API

**Nama:** [Isi Nama Anda]
**NPM:** [Isi NPM Anda]
**Mata Kuliah:** [Isi Mata Kuliah]

---

## 1. Latihan 1 & Praktikum 8.3: Halaman Sign-Up dan Sign-In (Konsumsi API)
Aplikasi telah dihubungkan dengan backend *FakeStoreAPI* untuk memproses autentikasi.
- **Halaman Sign-Up (`signup.jsx`):** Menerima input Username, Email, dan Password dari pengguna, lalu melakukan POST request menggunakan `axios` ke endpoint `/users`. Jika berhasil, pengguna diarahkan ke halaman Sign-In.
- **Halaman Sign-In (`signin.jsx`):** Menerima input kredensial, melakukan POST request ke `/auth/login`. Jika sukses, token otorisasi dan data *username* disimpan ke `AsyncStorage`.

*[Tangkapan Layar (Screenshot) Halaman Sign-Up]*
_(Silakan sisipkan screenshot di sini)_

*[Tangkapan Layar (Screenshot) Halaman Sign-In]*
_(Silakan sisipkan screenshot di sini)_

---

## 2. Penyimpanan Session & Modifikasi Header
Setelah login berhasil, `AsyncStorage` digunakan untuk menyimpan *session* (objek `userData`).
- Komponen **Header** telah dimodifikasi agar dapat mengambil data dari `AsyncStorage`.
- Tulisan sapaan "Discover Books" secara dinamis berubah menjadi **username pengguna** jika data sesi ditemukan (contoh: "Good Morning mor_2314").

*[Tangkapan Layar (Screenshot) Header yang Menampilkan Nama User]*
_(Silakan sisipkan screenshot di sini)_

---

## 3. Latihan 2: Pembatasan Akses Detail Buku (Auth Guard)
Mekanisme **Authentication Guard** telah diimplementasikan pada halaman **Detail Buku**.
- Fungsi `checkAuth()` berjalan setiap kali halaman `detail/[id].jsx` dimuat menggunakan *useEffect*.
- Jika `AsyncStorage` tidak memiliki data sesi yang sah, aplikasi akan langsung menendang / me-*redirect* (*route protection*) pengunjung kembali ke halaman Sign-In. Hal ini memastikan bahwa buku hanya bisa dibaca oleh pengguna terdaftar.

*[Tangkapan Layar (Screenshot) Kondisi Terlempar ke Sign-In Saat Memaksa Buka Detail (jika memungkinkan)]*
_(Silakan sisipkan screenshot di sini)_

---

## 4. Latihan 3: Fitur Sign-Out
Tombol **Sign Out** telah ditambahkan di halaman **Profile**.
- Saat ditekan, tombol ini memicu fungsi untuk membersihkan (`removeItem`) seluruh data *session* dan *token* yang tersimpan di dalam `AsyncStorage`.
- Pengguna kemudian diarahkan kembali ke halaman Sign-In, dan sesi dinyatakan berakhir.

*[Tangkapan Layar (Screenshot) Halaman Profile dengan Tombol Sign-Out]*
_(Silakan sisipkan screenshot di sini)_

---

## Kesimpulan
Praktikum Bab 8 melatih penguasaan integrasi frontend dengan layanan backend secara riil. Penggunaan `axios` memudahkan proses request HTTP secara asinkron, dan pengelolaan sesi (`AsyncStorage`) bersama *route protection* menjadi pondasi utama keamanan akses di dalam aplikasi mobile.
