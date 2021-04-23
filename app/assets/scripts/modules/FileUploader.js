function Upload() {
    //Reference the FileUpload element.
    var fileUpload = document.getElementById("fileUpload");

    //Validate whether File is valid Excel file.
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();

            //For Browsers other than IE.
            if (reader.readAsBinaryString) {
                reader.onload = function (e) {
                    ProcessExcel(e.target.result);
                };
                reader.readAsBinaryString(fileUpload.files[0]);
            } else {
                //For IE Browser.
                reader.onload = function (e) {
                    var data = "";
                    var bytes = new Uint8Array(e.target.result);
                    for (var i = 0; i < bytes.byteLength; i++) {
                        data += String.fromCharCode(bytes[i]);
                    }
                    ProcessExcel(data);
                };
                reader.readAsArrayBuffer(fileUpload.files[0]);
            }
        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        alert("Please upload a valid Excel file.");
    }
};
function ProcessExcel(data) {
    //Read the Excel File data.
    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
// console.log(excelRows);
    //Create a HTML Table element.
    var table = document.createElement("table");
    table.border = "1";

    //Add the header row.
    var row = table.insertRow(-1);

    //Add the header cells.
    headerCell = document.createElement("TH");
    headerCell.innerHTML = "Sr. No.";
    row.appendChild(headerCell);

    var headerCell = document.createElement("TH");
    headerCell.innerHTML = "Datetime";
    row.appendChild(headerCell);

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "Issue";
    row.appendChild(headerCell);


var count = 1;
    //Add the data rows from Excel file.excelRows.length
    for (var i = 1; i < excelRows.length-1; i++) {
        //Add the data row.
        let diff = (Date.parse(excelRows[i+1].Timestamp) - Date.parse(excelRows[i].Timestamp))/60000
        console.log(diff);
      if (diff == 1) {
                if (excelRows[i].CO2 == "NA"){
                    var row = table.insertRow(-1);

        //Add the data cells.
        var cell = row.insertCell(-1);
        cell.innerHTML = count;
        count++;

        var cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].Timestamp;

        cell = row.insertCell(-1);
        cell.innerHTML = "Data Not available";

                }
      }
      else if (diff == 2){

        let preTIme = new Date(excelRows[i].Timestamp) 
        var dt = new Date(preTIme.getTime() + 1*60000);
        var row = table.insertRow(-1);

        //Add the data cells.
        var cell = row.insertCell(-1);
        cell.innerHTML = count;
        count++;

        var cell = row.insertCell(-1);
        cell.innerHTML = `${dt.getFullYear().toString().padStart(4, '0')}-${(dt.getMonth()+1).toString().padStart(2, '0')}-${
            dt.getDate().toString().padStart(2, '0')} ${
            dt.getHours().toString().padStart(2, '0')}:${
            dt.getMinutes().toString().padStart(2, '0')}:${
            dt.getSeconds().toString().padStart(2, '0')}`

        cell = row.insertCell(-1);
        cell.innerHTML = "Downtime";
      }
      else if (diff == 3){
        let preTIme = new Date(excelRows[i].Timestamp) 
        var dt = new Date(preTIme.getTime() + 1*60000);
        var dt2 = new Date(preTIme.getTime() + 2*60000);
        var row = table.insertRow(-1);

        //Add the data cells.
        var cell = row.insertCell(-1);
        cell.innerHTML = count;
        count++;

        var cell = row.insertCell(-1);
        cell.innerHTML = `${dt.getFullYear().toString().padStart(4, '0')}-${(dt.getMonth()+1).toString().padStart(2, '0')}-${
            dt.getDate().toString().padStart(2, '0')} ${
            dt.getHours().toString().padStart(2, '0')}:${
            dt.getMinutes().toString().padStart(2, '0')}:${
            dt.getSeconds().toString().padStart(2, '0')}`

        cell = row.insertCell(-1);
        cell.innerHTML = "Downtime";
        //dt2
        var cell = row.insertCell(-1);
        cell.innerHTML = count;
        count++;

        var cell = row.insertCell(-1);
        cell.innerHTML = `${dt2.getFullYear().toString().padStart(4, '0')}-${(dt2.getMonth()+1).toString().padStart(2, '0')}-${
            dt2.getDate().toString().padStart(2, '0')} ${
            dt2.getHours().toString().padStart(2, '0')}:${
            dt2.getMinutes().toString().padStart(2, '0')}:${
            dt2.getSeconds().toString().padStart(2, '0')}`

        cell = row.insertCell(-1);
        cell.innerHTML = "Downtime";




      }


        

    }

    var dvExcel = document.getElementById("dvExcel");
    dvExcel.innerHTML = "";
    dvExcel.appendChild(table);
};
//new
export default Upload;

