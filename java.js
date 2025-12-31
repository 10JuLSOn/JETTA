document.addEventListener("DOMContentLoaded", () => {
  console.log("JS działa");

  fetch("Kosztorys.xlsx")
    .then(res => {
      if (!res.ok) throw new Error("Nie znaleziono pliku Excel");
      return res.arrayBuffer();
    })
    .then(data => {
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const table = document.getElementById("outputTable");
      table.innerHTML = "";

      rows.forEach((row, i) => {
        const tr = document.createElement("tr");

        row.forEach(cell => {
          const el = document.createElement(i === 0 ? "th" : "td");
          el.textContent = cell ?? "";
          tr.appendChild(el);
        });

        table.appendChild(tr);
      });
    })
    .catch(err => {
      console.error(err);
      document.getElementById("outputTable").innerHTML =
        "<tr><td>Błąd ładowania tabeli</td></tr>";
    });
});