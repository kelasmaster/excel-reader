// script.js

document.getElementById('uploadButton').addEventListener('click', function () {
  const fileInput = document.getElementById('excelFileInput');
  const file = fileInput.files[0];

  if (!file) {
    alert('Please select an Excel file.');
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });

    // Assuming the first sheet contains the data
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert worksheet to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // Display data in a table
    displayDataInTable(jsonData);
  };

  reader.readAsArrayBuffer(file);
});

function displayDataInTable(data) {
  const container = document.getElementById('dataContainer');
  container.innerHTML = ''; // Clear previous content

  if (data.length === 0) {
    container.innerHTML = '<p class="text-danger">No data found in the Excel file.</p>';
    return;
  }

  const table = document.createElement('table');
  table.classList.add('table', 'table-striped');

  // Create table header
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  data[0].forEach(header => {
    const th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body
  const tbody = document.createElement('tbody');
  for (let i = 1; i < data.length; i++) {
    const row = document.createElement('tr');
    data[i].forEach(cell => {
      const td = document.createElement('td');
      td.textContent = cell;
      row.appendChild(td);
    });
    tbody.appendChild(row);
  }
  table.appendChild(tbody);

  container.appendChild(table);
}
