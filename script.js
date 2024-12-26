let barangList = [];
const namaToko = "FlowFalcon";
const footerText = `TERIMA KASIH TELAH BELANJA Di\n${namaToko}`;

function tambahBarang() {
    const namaBarang = document.getElementById("namaBarang").value;
    const hargaBarang = parseInt(document.getElementById("hargaBarang").value);

    if (namaBarang && hargaBarang) {
        barangList.push({ nama: namaBarang, harga: hargaBarang });

        updateBarangList();

        document.getElementById("namaBarang").value = "";
        document.getElementById("hargaBarang").value = "";
    } else {
        alert("Isi nama dan harga barang terlebih dahulu!");
    }
}

function updateBarangList() {
    let barangHTML = `<h4>Daftar Barang:</h4>`;
    barangList.forEach((item, index) => {
        barangHTML += `<p>${index + 1}. ${item.nama} - Rp${item.harga}</p>`;
    });
    document.getElementById("barangList").innerHTML = barangHTML;
}

function buatStruk() {
    const idTransaksi = document.getElementById("idTransaksi").value;
    const hargaAdmin = parseInt(document.getElementById("hargaAdmin").value);
    const nomorTujuan = document.getElementById("nomorTujuan").value;

    if (!idTransaksi || !hargaAdmin || !nomorTujuan || barangList.length === 0) {
        alert("Lengkapi semua data sebelum membuat struk!");
        return;
    }

    let totalHarga = barangList.reduce((acc, item) => acc + item.harga, 0);
    let totalKeseluruhan = totalHarga + hargaAdmin;

    // Tanggal dan waktu
    const now = new Date();
    const tanggalCetak = now.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
    const waktuCetak = now.toLocaleTimeString("id-ID");

    // Gambar struk di canvas
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 350;
    canvas.height = 550 + barangList.length * 40;

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#000";
    ctx.textAlign = "center";

    // Header toko
    ctx.font = "bold 16px Courier";
    ctx.fillText(namaToko, canvas.width / 2, 30);
    ctx.font = "12px Courier";
    ctx.fillText(tanggalCetak + " " + waktuCetak, canvas.width / 2, 50);

    // Konten struk
    ctx.textAlign = "left";
    ctx.font = "14px Courier";
    let y = 80;
    ctx.fillText(`ID Transaksi: ${idTransaksi}`, 20, y);
    y += 20;
    ctx.fillText(`Nomor Tujuan: ${nomorTujuan}`, 20, y);
    y += 20;

    // Separator
    y += 10;
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(20, y);
    ctx.lineTo(canvas.width - 20, y);
    ctx.stroke();
    y += 20;

    // Daftar barang dengan space antar barang
    barangList.forEach((item, index) => {
        ctx.fillText(`${index + 1}. ${item.nama} - Rp${item.harga}`, 20, y);
        y += 40; // Space lebih besar antar barang
    });

    // Separator sebelum total
    y -= 20;
    ctx.beginPath();
    ctx.moveTo(20, y);
    ctx.lineTo(canvas.width - 20, y);
    ctx.stroke();
    y += 30;

    // Total dan admin
    ctx.fillText(`Total: Rp${totalHarga}`, 20, y);
    y += 20;
    ctx.fillText(`Admin: Rp${hargaAdmin}`, 20, y);
    y += 20;
    ctx.fillText(`Total Keseluruhan: Rp${totalKeseluruhan}`, 20, y);

    // Footer
    y += 40;
    ctx.textAlign = "center";
    ctx.font = "12px Courier";
    footerText.split("\n").forEach(line => {
        ctx.fillText(line, canvas.width / 2, y);
        y += 20;
    });
}

function resetForm() {
    document.getElementById("formData").reset();
    barangList = [];
    document.getElementById("barangList").innerHTML = "";
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    alert("Form dan struk berhasil direset!");
}

function cetakGambar() {
    const canvas = document.getElementById("canvas");
    const link = document.createElement("a");
    link.download = "struk-pembayaran.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}