# ARKAN STORE — starter transaksi

## Menjalankan di komputer
1. Install Node.js.
2. Buka terminal di folder ini.
3. Jalankan:
   npm install
   npm start
4. Buka http://localhost:3000

## Struktur
- public/       website pelanggan
- server.js     backend Express
- data/         penyimpanan order untuk testing

## Agar menjadi transaksi sungguhan
1. Hosting backend di server publik dengan HTTPS.
2. Gunakan akun merchant payment gateway yang sah (untuk pengguna di bawah umur, gunakan akun orang tua/wali/pemilik usaha yang memenuhi syarat).
3. Simpan Server Key/credential hanya sebagai environment variable di server.
4. Implementasikan endpoint /api/payment/create.
5. Atur Payment Notification/Webhook provider ke:
   https://DOMAIN-KAMU/api/payment/webhook
6. Verifikasi signature webhook di server sebelum mengubah payment_status.
7. Setelah status "paid/settlement", ubah order_status menjadi "diproses".
8. Tambahkan database produksi (PostgreSQL/MySQL) sebelum toko digunakan serius.

Catatan:
- File data/orders.json hanya cocok untuk testing.
- Jangan menaruh secret key di HTML/JavaScript frontend.
- Jangan menganggap halaman sukses/redirect sebagai bukti pembayaran; gunakan webhook/API status dari provider.
