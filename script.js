// ==========================================
// CINEBOOK - JAVASCRIPT
// ==========================================

let selectedSeats = [];
const hargaTiket = 50000;

// ==========================================
// PILIH FILM
// ==========================================
function pilihFilm(namaFilm) {
    document.getElementById("filmSelect").value = namaFilm;
    document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
}

// ==========================================
// PILIH KURSI
// ==========================================
const seats = document.querySelectorAll(".seat");

seats.forEach(function(seat) {
    seat.addEventListener("click", function() {
        if (seat.classList.contains("occupied")) return;

        const nomorKursi = seat.textContent.trim();

        if (seat.classList.contains("selected")) {
            seat.classList.remove("selected");
            selectedSeats = selectedSeats.filter(item => item !== nomorKursi);
        } else {
            seat.classList.add("selected");
            selectedSeats.push(nomorKursi);
        }

        hitungTotal();
    });
});

// ==========================================
// HITUNG TOTAL
// ==========================================
function hitungTotal() {
    const totalHarga = selectedSeats.length * hargaTiket;
    document.getElementById("total").innerText =
        "Rp " + totalHarga.toLocaleString("id-ID");
}

// ==========================================
// KONFIRMASI RESERVASI
// ==========================================
function pesanTiket() {
    const film = document.getElementById("filmSelect").value;
    const bioskop = document.getElementById("bioskop").value;
    const tanggal = document.getElementById("tanggal").value;
    const jam = document.getElementById("jam").value;
    const nama = document.getElementById("nama").value;
    const email = document.getElementById("email").value;

    if (
        film === "" ||
        bioskop === "" ||
        tanggal === "" ||
        jam === "" ||
        nama === "" ||
        email === "" ||
        selectedSeats.length === 0
    ) {
        alert("⚠️ Silakan lengkapi semua data dan pilih kursi terlebih dahulu!");
        return;
    }

    const dataReservasi = {
        id: "CB" + Date.now(),
        film: film,
        bioskop: bioskop,
        tanggal: tanggal,
        jam: jam,
        nama: nama,
        email: email,
        kursi: [...selectedSeats],
        total: selectedSeats.length * hargaTiket,
        waktuPembelian: new Date().toLocaleString("id-ID")
    };

    document.getElementById("ticketFilm").innerText = film;
    document.getElementById("ticketCinema").innerText = bioskop;
    document.getElementById("ticketDate").innerText = tanggal;
    document.getElementById("ticketTime").innerText = jam;
    document.getElementById("ticketSeat").innerText = selectedSeats.join(", ");
    document.getElementById("ticketName").innerText = nama;

    document.getElementById("ticket").style.display = "flex";
    document.getElementById("ticket").scrollIntoView({ behavior: "smooth" });

    // ==========================================
    // SIMPAN SEMUA RIWAYAT, BUKAN HANYA 1 DATA
    // ==========================================
    let riwayat = JSON.parse(
        localStorage.getItem("riwayatCineBook") || "[]"
    );

    riwayat.unshift(dataReservasi);

    localStorage.setItem(
        "riwayatCineBook",
        JSON.stringify(riwayat)
    );

    // Tetap simpan transaksi terakhir untuk kompatibilitas
    localStorage.setItem(
        "reservasiCineBook",
        JSON.stringify(dataReservasi)
    );

    alert(
        "🎉 Reservasi berhasil!\n\n" +
        "Tiket kamu sudah dibuat dan disimpan di Riwayat Pembelian."
    );
}
