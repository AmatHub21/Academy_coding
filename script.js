
const navButtons = document.querySelectorAll("nav button");

// Berpindah antara Gallery dan Pendaftaran
function showView(id) {
  document.querySelectorAll(".view").forEach(view => {
    view.classList.toggle("active", view.id === id);
  });

  navButtons.forEach(button => {
    button.classList.toggle("active", button.dataset.view === id);
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

navButtons.forEach(button => {
  button.addEventListener("click", () => {
    showView(button.dataset.view);
  });
});

// Tombol menuju pendaftaran
document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => {
    showView(button.dataset.go);
  });
});

// Tombol melihat kegiatan
document.getElementById("exploreBtn").addEventListener("click", () => {
  document.getElementById("activities").scrollIntoView({
    behavior: "smooth"
  });
});

const form = document.getElementById("registrationForm");
const result = document.getElementById("result");
const resultGrid = document.getElementById("resultGrid");

// Proses pendaftaran
form.addEventListener("submit", function(event) {
  event.preventDefault();

  // Validasi seluruh formulir
  if (!form.reportValidity()) {
    return;
  }

  // Dialog konfirmasi sebelum menyimpan
  const yakin = confirm(
    "Apakah Anda sudah yakin untuk menyimpan?"
  );

  // Jika memilih Tidak, batalkan proses
  if (!yakin) {
    return;
  }

  const data = new FormData(form);

  const entries = [
    ["NIK", data.get("nik")],
    ["Nama Lengkap", data.get("nama")],
    ["Jenis Kelamin", data.get("gender")],
    ["Nomor HP", data.get("hp")],
    ["Alamat", data.get("alamat")],
    ["Bahasa Pemrograman", data.get("bahasa")]
  ];

  // Bersihkan hasil sebelumnya
  resultGrid.replaceChildren();

  // Tampilkan data sesuai isian formulir
  entries.forEach(([label, value]) => {
    const item = document.createElement("div");
    item.className = "result-item";

    const small = document.createElement("small");
    small.textContent = label;

    const strong = document.createElement("strong");
    strong.textContent = value;

    item.append(small, strong);
    resultGrid.appendChild(item);
  });

  // Tampilkan hasil pendaftaran
  result.classList.add("show");

  result.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

// Tombol mengubah data
document.getElementById("editBtn").addEventListener("click", () => {
  result.classList.remove("show");

  form.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

// Tombol cetak hasil
document.getElementById("printBtn").addEventListener("click", () => {
  window.print();
});
