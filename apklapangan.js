document.addEventListener('DOMContentLoaded', function() {
    const locationStatus = document.getElementById('location-status');
    const latitudeInput = document.getElementById('latitude');
    const longitudeInput = document.getElementById('longitude');
    const reportForm = document.getElementById('reportForm');

    // Fungsi untuk mendapatkan lokasi
    function getLocation() {
        if (navigator.geolocation) {
            locationStatus.textContent = "Mencari lokasi..."; // Tampilkan status awal
            locationStatus.style.color = '#777'; // Warna default
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    locationStatus.textContent = `Lokasi ditemukan: ${lat}, ${lon}`;
                    locationStatus.style.color = 'green'; // Beri warna hijau jika sukses
                    latitudeInput.value = lat;
                    longitudeInput.value = lon;
                },
                (error) => {
                    let errorMessage = "Tidak dapat mengambil lokasi Anda.";
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            errorMessage = "Izin lokasi ditolak oleh pengguna.";
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMessage = "Informasi lokasi tidak tersedia.";
                            break;
                        case error.TIMEOUT:
                            errorMessage = "Waktu permintaan lokasi habis.";
                            break;
                        case error.UNKNOWN_ERROR:
                            errorMessage = "Terjadi kesalahan yang tidak diketahui saat mengambil lokasi.";
                            break;
                    }
                    locationStatus.textContent = errorMessage;
                    locationStatus.style.color = 'red'; // Beri warna merah jika error
                    // Opsional: Jika lokasi sangat penting, bisa nonaktifkan tombol submit
                    // reportForm.querySelector('button[type="submit"]').disabled = true;
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
        } else {
            locationStatus.textContent = "Geolocation tidak didukung oleh browser ini.";
            locationStatus.style.color = 'red';
        }
    }

    // Panggil fungsi lokasi saat halaman dimuat
    getLocation();

    // Bagian pengiriman formulir ke Google Apps Script
    reportForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // Mencegah submit default

        const submitButton = this.querySelector('button[type="submit"]');
        submitButton.disabled = true; // Nonaktifkan tombol saat mengirim
        submitButton.textContent = 'Mengirim...';

        const formData = new FormData(this); // Mengambil semua data dari form

        // Validasi dan ambil file foto
        const fotoInput = document.getElementById('fotoTempat');
        if (fotoInput.files.length > 0) {
            formData.append('fotoTempat', fotoInput.files[0], fotoInput.files[0].name);
        } else {
            alert('Mohon unggah foto lokasi/kegiatan.');
            submitButton.disabled = false;
            submitButton.textContent = 'Kirim Laporan';
            return; // Hentikan proses jika tidak ada foto
        }

        // Menambahkan timestamp otomatis dengan zona waktu yang jelas
        formData.append('timestamp', new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })); 

        // --- PENTING: URL ini adalah URL deployment skrip Google Apps Script Anda ---
        // Ganti dengan URL deployment Web App Anda yang sudah di-deploy.
        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzGNininjOHkoP7gw4C-H8pky3OBuI-aRYhnvE1Nn7Et3QG4ONWE9eMOtq6Qdr87m15/exec'; // Ganti dengan URL Anda!

        try {
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                body: formData // FormData akan otomatis mengatur Content-Type sebagai multipart/form-data
            });

            // Periksa apakah respons HTTP OK (status 200-299)
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error: ${response.status} - ${errorText}`);
            }

            const result = await response.json(); // Asumsi GAS merespon dengan JSON

            if (result.status === 'success') {
                alert('Laporan berhasil dikirim!');
                reportForm.reset(); // Reset form
                // Reset status lokasi dan panggil ulang untuk mendapatkan lokasi baru
                locationStatus.textContent = "Mencari lokasi..."; 
                locationStatus.style.color = '#777';
                latitudeInput.value = "";
                longitudeInput.value = "";
                getLocation(); // Panggil ulang untuk mengisi lokasi baru
            } else {
                alert('Gagal mengirim laporan: ' + (result.message || 'Terjadi kesalahan yang tidak diketahui.'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan jaringan atau server Google Apps Script: ' + error.message);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Kirim Laporan';
        }
    });
});