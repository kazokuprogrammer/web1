<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Website Pembelajaran</title>
    <link rel="stylesheet" href="web1.css"> <!-- Tautan ke file CSS eksternal -->
</head>
<body>
    <header>
        <h1>Selamat Datang di Website Pembelajaran</h1>
        <nav>
            <ul>
                <li><a href="#home">Beranda</a></li>
                <li><a href="#materi">Materi</a></li>
                <li><a href="#kontak">Kontak</a></li>
            </ul>
        </nav>
    </header>

    <section id="home">
        <h2>Beranda</h2>
        <p>Apa kabar kawan kawan perkenalkan saya azis, saya ingin mengajak kalian semua untuk bareng bareng belajar di website ini. Jika ada materi yang kurang, silahka komen di kolom yang tersedia.Terimakasih...</p>
    </section>

    <!-- Section untuk menampilkan kotak-kotak materi -->
    <section id="materi">
        <h2>Materi Pembelajaran</h2>
        <div class="container-kotak">
            <div class="kotak">
                <h3>Mengenal Watak Seseorang Berdasarkan Cara Berpakaian</h3>
                <p>Apakah Kamu tahu, Bahwa gaya berpakaian sesungguhnya bukanlah hanya sebuah trend semata. Tetapi....</p>
                <a href="web12.html">Baca lebih lanjut</a>
            </div>
            <div class="kotak">
                <h3>CSS Dasar</h3>
                <p>CSS adalah bahasa yang digunakan untuk mengatur tampilan halaman web...</p>
                <a href="#">Baca lebih lanjut</a>
            </div>
            <div class="kotak">
                <h3>JavaScript Dasar</h3>
                <p>JavaScript digunakan untuk membuat interaksi dinamis pada website...</p>
                <a href="#">Baca lebih lanjut</a>
            </div>
            <div class="kotak">
                <h3>Python untuk Web</h3>
                <p>Pelajari bagaimana Python digunakan dalam pengembangan web dengan framework seperti Django dan Flask...</p>
                <a href="#">Baca lebih lanjut</a>
            </div>
        </div>
    </section>

    <section id="kontak">
        <h2>Kontak Kami</h2>
        <p>Jika Anda memiliki pertanyaan, silakan hubungi kami melalui formulir di bawah ini:</p>
        <form>
            <label for="nama">Nama:</label>
            <input type="text" id="nama" name="nama" required>
            <br>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            <br>
            <label for="pesan">Pesan:</label>
            <textarea id="pesan" name="pesan" required></textarea>
            <br>
            <button type="submit">Kirim</button>
        </form>
    </section>

    <footer>
        <p>&copy; 2024 Website Pembelajaran. All Rights Reserved.</p>
    </footer>
</body>
</html>
