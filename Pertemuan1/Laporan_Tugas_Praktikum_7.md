# Laporan Tugas Praktikum Bab 7: Akses Fitur Perangkat

**Nama:** [Isi Nama Anda]
**NPM:** [Isi NPM Anda]
**Mata Kuliah:** [Isi Mata Kuliah]

---

## 1. Latihan 1: Membuat Halaman Profile (Avatar & Data Pribadi)
Pada latihan ini, halaman Profile dibuat dengan kemampuan untuk memperbarui foto avatar menggunakan fitur perangkat asli.
- **expo-camera:** Digunakan untuk mengambil foto langsung dari kamera (dengan *permission*).
- **expo-image-picker:** Digunakan untuk mengambil foto dari galeri.
- Pengguna diberikan opsi (melalui `Alert`) untuk memilih dari Galeri, Kamera, atau Batal saat mengeklik ikon *Edit* di profilnya.

*[Tangkapan Layar (Screenshot) Halaman Profile & Opsi Edit]*
_(Silakan sisipkan screenshot di sini)_

*[Tangkapan Layar (Screenshot) Hasil Avatar Berubah]*
_(Silakan sisipkan screenshot di sini)_

---

## 2. Latihan 2: Fitur QR Scanner (Membaca QR Code Buku)
Menu `Scan QR` telah ditambahkan di Drawer. Halaman ini menggunakan komponen `<CameraView>` dari `expo-camera` yang dikonfigurasi untuk membaca *barcodeType* `qr`.
- Saat kamera menyorot QR code, *handler* `onBarcodeScanned` akan menangkap datanya.
- Jika data (misal: "1") adalah ID buku yang valid, aplikasi langsung me-redirect (`router.push`) ke halaman detail buku tersebut.

*[Tangkapan Layar (Screenshot) Kamera QR Scanner Terbuka]*
_(Silakan sisipkan screenshot di sini)_

---

## 3. Latihan 3: Implementasi Audio-Book (Text-to-Speech)
Pada halaman Detail Buku, fitur pemutar Audio-Book ditambahkan menggunakan `expo-speech`.
- Teks dari sinopsis diubah menjadi ucapan (*text-to-speech*).
- Disediakan tombol Play, Pause, dan Stop.
- Saat audio dimainkan, status teks berubah (ter-highlight) untuk memberikan umpan balik visual bahwa bacaan sedang berlangsung.

*[Tangkapan Layar (Screenshot) Halaman Detail dengan Pemutar Audio]*
_(Silakan sisipkan screenshot di sini)_

---

## 4. Eksplorasi: Peta Interaktif (Location-Based Service)
Selain ketiga latihan utama, menu **Explore** telah diimplementasikan sesuai modul 7.3.
- Menggunakan `expo-maps` (`GoogleMaps` / `AppleMaps`) untuk merender peta.
- `expo-location` meminta izin lokasi lalu mendapatkan koordinat dan *reverse-geocoding* pengguna saat ini.
- `BottomSheet` digunakan untuk menampilkan daftar toko buku di lokasi sekitar.

*[Tangkapan Layar (Screenshot) Halaman Peta Explore]*
_(Silakan sisipkan screenshot di sini)_

---

## Kesimpulan
Praktikum Bab 7 melatih integrasi *library* Expo dengan fungsionalitas native perangkat seperti *Camera*, *Gallery*, *Location*, *Maps*, dan *Speech*. Penggunaan fitur native tersebut membuat aplikasi menjadi lebih dinamis dan interaktif.
