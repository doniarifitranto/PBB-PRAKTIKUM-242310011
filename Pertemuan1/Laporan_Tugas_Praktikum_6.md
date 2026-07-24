# Laporan Tugas Praktikum Bab 6: Navigasi Aplikasi

**Nama:** [Isi Nama Anda]
**NPM:** [Isi NPM Anda]
**Mata Kuliah:** [Isi Mata Kuliah]

---

## 1. Latihan 1: Membuat Struktur Drawer Navigasi
Pada latihan pertama, telah dibuat kontainer navigasi utama berbasis Drawer. Struktur file yang sebelumnya berfokus pada navigasi tab telah di-nested ke dalam Drawer Navigation sebagai "Global Navigation" sesuai instruksi modul.

**Penjelasan Singkat:**
- `app/module-latihan/latihan6/_layout.jsx` digunakan sebagai Stack pembungkus dasar.
- `app/module-latihan/latihan6/index.jsx` digunakan untuk me-redirect aplikasi ke menu Drawer utama.
- `app/module-latihan/latihan6/(drawer)/_layout.jsx` berisi komponen `<Drawer>` yang mengatur konfigurasi side-menu.

*[Tangkapan Layar (Screenshot) Kode _layout.jsx Drawer]*
_(Silakan sisipkan screenshot di sini)_

*[Tangkapan Layar (Screenshot) Tampilan UI Drawer Terbuka]*
_(Silakan sisipkan screenshot di sini)_

---

## 2. Latihan 2: Menentukan Halaman yang Dibungkus oleh Drawer
Telah ditentukan 3 buah menu utama pada kontainer Drawer, yaitu:
1. **Home (E-Catalog Buku):** Menggunakan Nested Navigation Tabs yang diarahkan ke komponen praktikum katalog buku sebelumnya.
2. **Buku Premium:** Halaman statis yang menampilkan informasi terkait buku premium.
3. **Profile:** Halaman statis yang menampilkan profil pengguna.

**Penjelasan Singkat:**
- Ketiga halaman tersebut didaftarkan dalam `<Drawer.Screen>` pada file `(drawer)/_layout.jsx`.
- Folder `(tabs)` dimasukkan ke dalam `(drawer)` agar bertindak sebagai salah satu item dalam navigasi global Drawer.

*[Tangkapan Layar (Screenshot) Kode Daftar Menu di Drawer]*
_(Silakan sisipkan screenshot di sini)_

*[Tangkapan Layar (Screenshot) UI Masing-Masing Layar]*
_(Silakan sisipkan screenshot di sini)_

---

## 3. Latihan 3: Mengirimkan Parameter Antar Screen
Halaman Detail Buku telah berhasil dibuat untuk membaca parameter `id` yang dikirim dari Home (Katalog). Ketika pengguna menekan tombol "Read Now" atau cover buku, aplikasi akan berpindah ke halaman Detail yang menampilkan informasi rinci mengenai buku tersebut (cover, judul, penulis, rating, dan sinopsis).

**Penjelasan Singkat:**
- Tombol `<ButtonRead />` pada `CTABook.jsx` dan komponen `<BookList />` pada `BookCollections.jsx` menggunakan hook `useRouter()` dan event handler `onPress` untuk memanggil `router.push('/module-latihan/latihan6/detail/${book.id}')`.
- Halaman Detail (`app/module-latihan/latihan6/detail/[id].jsx`) menangkap nilai parameter menggunakan `useLocalSearchParams()`, kemudian method `find()` digunakan untuk mencari informasi buku di array `ListBook`.

*[Tangkapan Layar (Screenshot) Kode Pengiriman Parameter]*
_(Silakan sisipkan screenshot di sini)_

*[Tangkapan Layar (Screenshot) Tampilan UI Halaman Detail]*
_(Silakan sisipkan screenshot di sini)_

---

## Kesimpulan
Melalui praktikum kali ini, aplikasi e-catalog telah berhasil menerapkan konsep *Nested Navigation* yang menggabungkan Stack, Drawer, dan Tabs secara terstruktur dan modular. Pengiriman parameter antar halaman mempermudah pembuatan komponen yang dinamis berdasarkan data spesifik.
