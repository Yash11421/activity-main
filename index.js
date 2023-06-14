const employees = []; // Array to store employee objects

const deletedemployeesID=[]; // Array to store deleted employee IDs


// ...
const resetButton = document.getElementById("add1");
resetButton.addEventListener("click", function(event) {
  event.preventDefault();
  editButton.style.display = "none";
  addButton.style.display = "block";
  

  resetForm();
});

const editButton = document.getElementById("edit");
// editButton.addEventListener("click", function(event) {
//   event.preventDefault();
//   editClicked();
// });


const addButton = document.getElementById("add");
addButton.addEventListener("click", (e) => {
  e.preventDefault();

  var employeeID = document.getElementById("employeeID").value;
  var employeeName = document.getElementById("employeeName").value;
  var employeeAge = document.getElementById("employeeAge").value;
  var employeeGender = document.getElementById("employeeGender").value;
  var errorMessage = document.getElementsByClassName("errorMessage");

  // console.log(errorMessage,errorMessage[0],errorMessage[0].innerHTML);

  // for (var i = 0; i < errorMessage.length; i++) {
  //   errorMessage[i].innerHTML = "";
  // }
  var regex=/^(0*[1-9]\d*)$/;

  if (employeeID === "") {
    errorMessage[0].innerHTML = "Employee ID is required";
    return false;
  }
  console.log(errorMessage,errorMessage[0],errorMessage[0].innerHTML);

  if(!regex.test(employeeID)){
    errorMessage[0].innerHTML = "Employee ID must be a number ";
    return false;
  }


  if (employeeName === "") {
    errorMessage[1].innerHTML = "Enter a valid Name";
    return false;
  }
  
  var nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
  if (!nameRegex.test(employeeName)) {
    errorMessage[1].innerHTML = "Enter a valid Name";
    return false;
  }
  
  if (employeeAge === "" || isNaN(employeeAge) || employeeAge < 18 || employeeAge > 65) {
    errorMessage[2].innerHTML = "Age must be between 18 and 65";
    return false;
  }

  if (employeeGender === "") {
    errorMessage[3].innerHTML = "Gender is required";
    return false;
  }

  function readFormData() {
    var formData = {};
    formData["employeeID"] = employeeID;
    formData["employeeName"] = employeeName;
    formData["employeeAge"] = employeeAge;
    formData["employeeGender"] = employeeGender;
    return formData;
  }

  var formData = readFormData();
  insertNewRecord(formData, errorMessage);
  // resetForm();
});



//<-------------------------------------------------RESET THE FORM ------------------------------------------------------------------------->
function resetForm() {
  document.getElementById("employeeID").value = "";
  document.getElementById("employeeName").value = "";
  document.getElementById("employeeAge").value = "";
  document.getElementById("employeeGender").value = "";

  var errorMessages = document.getElementsByClassName("errorMessage");
  for (var i = 0; i < errorMessages.length; i++) {
    errorMessages[i].textContent = "";
  }
}


// <--------------------------------------------------Insert the data----------------------------------------------------------------------->
function insertNewRecord(data,errorMessage) {

  var employee = {
    employeeID: data.employeeID,
    employeeName: data.employeeName,
    employeeAge: data.employeeAge,
    employeeGender: data.employeeGender
  };


  var existingEmployee = employees.some(function(employee) {
    return employee.employeeID === data.employeeID;
  });

  // var existingEmployee1 = employees.some(function(employee) {
  //   return employee.employeeName === data.employeeName;
  // });

  var deletedEmployee = deletedemployeesID.includes(data.employeeID);


  if (existingEmployee || deletedEmployee) {
    document.getElementById("complex").innerHTML="ID is already in use";
  
    console.log("Done")
    return false;
    // existingEmployee.employeeName = data.employeeName;
    // existingEmployee.employeeAge = data.employeeAge;
    // existingEmployee.employeeGender = data.employeeGender;
    // return false;

  } else {
    // var employee = {
    //   employeeID: data.employeeID,
    //   employeeName: data.employeeName,
    //   employeeAge: data.employeeAge,
    //   employeeGender: data.employeeGender
    // };
    employees.push(employee); // Add employee object to the array
  }

  employees.sort(function(a, b) {
    return a.employeeID - b.employeeID;
  });

  // console.log(employees);

  updateTable();

}
//<---------------------------------------------------Update the table---------------------------------------------------------------------->
function updateTable() {
  var table = document.getElementById("employeeTable");
  var tbody = table.getElementsByTagName("tbody")[0];

  tbody.innerHTML = "";

  employees.sort(function (a, b) {
    return a.employeeID - b.employeeID;
  });




  employees.forEach( (emp , index ) => {

    var newRow = tbody.insertRow(-1); // Insert new row after table headers

    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = emp.employeeID;
    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = emp.employeeName;
    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = emp.employeeAge;
    var cell4 = newRow.insertCell(3);
    cell4.innerHTML = emp.employeeGender;
    var cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<button class="edit" onclick="onEdit(this , ${index})">Edit</button> <button class="delete" onclick="onDelete(this)">Delete</button>`;

  });
}


// Update the data
function onEdit(button, index) {
  // Hide the "ADD" button
  addButton.style.display = "none";

  // Display the "Edit" button
  editButton.style.display = "block";

  var row = button.closest("tr");
  var cells = row.cells;
  var employeeID1 = cells[0].innerHTML;
  var employeeName1 = cells[1].innerHTML;
  var employeeAge1 = cells[2].innerHTML;
  var employeeGender1 = cells[3].innerHTML;

  // Set the values in the form for editing
  document.getElementById("employeeID").value = employeeID1;
  document.getElementById("employeeName").value = employeeName1;
  document.getElementById("employeeAge").value = employeeAge1;
  document.getElementById("employeeGender").value = employeeGender1;

  editButton.onclick = (e) => {
    e.preventDefault();
    var newEmployeeID = document.getElementById("employeeID").value;
    var existingEmployee = employees.some(function (employee) {
      return employee.employeeID === newEmployeeID;
    });

    if (existingEmployee) {
      document.getElementById("complex").innerHTML="ID is already in use";
      return false;
    }

    employees[index].employeeID = newEmployeeID;
    employees[index].employeeName = document.getElementById("employeeName").value;
    employees[index].employeeAge = document.getElementById("employeeAge").value;
    employees[index].employeeGender = document.getElementById("employeeGender").value;

    updateTable();
    resetForm();
    addButton.style.display = "block";
    editButton.style.display = "none";
  };
}


// Delete the data
function onDelete(td) {
    row = td.parentElement.parentElement;
    var index = row.rowIndex - 1;
    var deletedemployeeID = employees[index].employeeID;
    deletedemployeesID.push(deletedemployeeID);
    employees.splice(index, 1);

    document.getElementById("employeeTable").deleteRow(row.rowIndex);
  }