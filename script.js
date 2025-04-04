document.getElementById('uploadButton').addEventListener('click', function () {
  const fileInput = document.getElementById('excelFileInput');
  const file = fileInput.files[0];

  if (!file) {
    alert('Please select an Excel file.');
    return;
  }

  console.log('File selected:', file.name); // Log the file name

  const reader = new FileReader();

  reader.onload = function (e) {
    console.log('File read successfully.'); // Confirm file reading

    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      console.log('Workbook parsed successfully.'); // Confirm parsing

      // Assuming the first sheet contains the data
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convert worksheet to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      console.log('Data extracted:', jsonData); // Log the extracted data

      // Display data in a table
      displayDataInTable(jsonData);
    } catch (error) {
      console.error('Error parsing Excel file:', error);
      alert('An error occurred while parsing the Excel file. Please check the console for details.');
    }
  };

  reader.onerror = function (error) {
    console.error('Error reading file:', error);
    alert('An error occurred while reading the file. Please try again.');
  };

  reader.readAsArrayBuffer(file);
});
