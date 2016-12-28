var logs = false;

var employees = [];

$(document).ready(function() {
  init();
}); // end doc ready

var init = function() {
  if (logs) console.log('in init');
  getEmployees();
  //Event Listeners
  $('.find').on('click', displayAllEmployees);
}; // end init

var addEmployee = function(e){
  e.preventDefault();
  if (logs) console.log('in addEmployee');
  //create employe object:
  var newEmployee = {
    first_name: $('#employeeFirstName').val(),
    last_name: $('#employeeLastName').val(),
    number: $('#employeeId').val(),
    annual_salary: $('#employeeSalary').val(),
    rating: Number($("#employeeRating").val())
  }; // end newEmployee
  //post to the server via ajax
  $.ajax({
    url: '/employee',
    type: 'POST',
    data: newEmployee,
    success: function(response) {
      if (logs) console.log('Post success:', response);
      getEmployees();
      //clear input and select values
      $('#newEmployee input, #newEmployee select').val('');
    }, //end success
    error: function(err) {
      if (logs) console.log(err);
    } // end error
  }); // end ajax
}; //end addEmployee

var addSelectOptions = function(array){
  if (logs) console.log('in addSelectOptions');
  var htmlString = '<option value="" selected disabled>Choose an Employee:</option>';
  for (var i = 0; i < array.length; i++) {
    //if (logs) console.log(employees);
    htmlString += "<option value='" + array[i].first_name + "' >"+ array[i].first_name + ' ' + array[i].last_name + "</option>";
  } // end for
  $("#employeeSelect").html(htmlString);
}; // end addSelectOptions

var adjustForCap = function(bonusPercent) {
  if (logs) console.log('in adjustForCap');
  if (logs) console.log("Calculating bonus from percent: " + bonusPercent);
  if (bonusPercent > 0.13) {
    bonusPercent = 0.13;
  } else if (bonusPercent < 0) {
    bonusPercent = 0;
  } // end else if
  return bonusPercent;
}; // end adjustForCap

var adjustForSalary = function(bonusPercent, salary) {
  if (logs) console.log('in adjustForSalary');
  if (logs) console.log("Calculating bonus from salary: " + salary + " and percent: " + bonusPercent);
  if (salary > 65000) {
    bonusPercent -= 0.01;
  } // end if
  return bonusPercent;
}; // end adjustForSalary

var calcBonusAmount = function(bonusPercent, salary) {
  if (logs) console.log("Calculating bonus amount with percent " + bonusPercent + " and salary $" + salary);
  var bonusAmount = salary * bonusPercent;
  return bonusAmount;
};// end calcBonusAmount

var calcBonusFromRating = function(bonusPercent, rating) {
  if (logs) console.log("Calculating bonus from rating: " + rating + " and percent: " + bonusPercent);
  if (rating <= 2) {
    bonusPercent = 0;
  } else if (rating === 3) {
    bonusPercent = 0.04;
  } else if (rating === 4) {
    bonusPercent = 0.06;
  } else if (rating === 5) {
    bonusPercent = 0.10;
  } // end else if
  return bonusPercent;
}; // end calcBonusAmount

var calcBonusFromYears = function(bonusPercent, employeeNum) {
  if (logs) console.log("Calculating bonus from employee number: " + employeeNum + " and percent: " + bonusPercent);
  if (employeeNum.length === 4) {
    bonusPercent += 0.05;
  } // end if
  return bonusPercent;
}; // end calcBonusFromYears

var calcBonusPercent = function(rating, employeeNum, salary) {
  if (logs) console.log("In calcBonusPercent with " + rating + ", " + employeeNum + ", " + salary);
  var bonusPercent = 0;
  bonusPercent = calcBonusFromRating(bonusPercent, rating);
  bonusPercent = calcBonusFromYears(bonusPercent, employeeNum);
  bonusPercent = adjustForSalary(bonusPercent, salary);
  bonusPercent = adjustForCap(bonusPercent);
  return bonusPercent;
};// end calcBonusPercent

var calcTotalSalary = function(bonusAmount, salary) {
  if (logs) console.log("Calculating total compensation with salary $" + salary + " and bonus $" + bonusAmount);
  var totalSalary = bonusAmount + Number(salary);
  //totalSalary = totalSalary.toLocaleString('en-US', {style: 'currency',currency: 'USD'});
  return totalSalary;
}; // end calcTotalSalary

var displayAllEmployees = function() {
  if (logs) console.log('in displayAllEmployees');
  var table = $("#employeeTable");
  var htmlString = '<table class="table table-striped table-bordered"><thead><tr><th>Name</th><th>Bonus %</th><th>Total Salary</th><th>Bonus Amount</th></tr></thead><tbody>';
  for (var i = 0; i < employees.length; i++) {
    if (logs) console.log(returnBonus(employees[i]));
    var employee = returnBonus(employees[i]);
    htmlString += displayEmployee(employee);
  } // end for
  htmlString += "</tbody></table>";
  table.html(htmlString);
};// end displayAllEmployees

var displayEmployee = function(thisEmployee){
  if (logs) console.log('in displayEmployee:');
  var table = $("#employeeTable");
  var htmlString = "<tr>";
  for (var j = 0; j < thisEmployee.length; j++) {
    if (j != 1) {
      //display as currency
      htmlString += "<td>" + thisEmployee[j].toLocaleString('en-US', {style: 'currency',currency: 'USD'}) + "</td>";
    } else if (j === 1) {
      //display as a percent
      htmlString += "<td>" + thisEmployee[j] + "%</td>";
    } else {
      //display as is
      htmlString += "<td>" + thisEmployee[j] + "</td>";
    } // end else
  } // end for
  htmlString += "</tr>";
  return htmlString;
}; // end displayEmployee

var getEmployees = function() {
  if (logs) console.log('in getEmployees');
  $.ajax({
    url:'/employee',
    type: 'GET',
    success: function(response) {
      if (logs) console.log(response.employees);
      addSelectOptions(response.employees);
      //empty employees array
      employees = [];
      //push employees into array
      for (var i = 0; i < response.employees.length; i++) {
        employees.push(response.employees[i]);
      } // end for
      if (logs) console.log(employees);
    }, // end success
    error: function(err) {
      if (logs) console.log(err);
    } // end error
  }); // end ajax
}; // end getEmployees

var returnBonus = function(employeeObject) {
  if (logs) console.log("In returnBonus with " + employeeObject.first_name);
  var bonusArray = [];
  // Add the employees name to the array
  var name = employeeObject.first_name + ' ' + employeeObject.last_name;
  //TODO: left off here
  //employeeName, idNumber, annualSalary, rating
  // Calculate the percent bonus
  var bonusPercent = calcBonusPercent(employeeObject.rating, employeeObject.employee_number, employeeObject.annual_salary);
  // Calculate bonus amount
  var bonusAmount = calcBonusAmount(bonusPercent, employeeObject.annual_salary);
  // Calculate the total salary
  var totalSalary = calcTotalSalary(bonusAmount, employeeObject.annual_salary);
  //Round to the nearest %
  bonusPercent = Math.round(bonusPercent*100)/100;
  bonusAmount = Math.round(bonusAmount);
  // Rounds to the nearest penny
  totalSalary = Math.round(totalSalary * 100)/100;
  bonusArray.push(name, bonusPercent, totalSalary, bonusAmount);
  return bonusArray;
}; // end returnBonus

var searchEmployee = function (e){
  if (logs) console.log('in searchEmployee');
  e.preventDefault();
  var employeeBonus;
  var selectedEmployee = $("#employeeSelect").val();
  for (var i = 0; i < employees.length; i++) {
    if (employees[i].first_name == selectedEmployee){
      employeeBonus = returnBonus(employees[i]);
    } // end if
  } // end for
  var table = $("#employeeTable");
  var htmlString = '<table class="table table-striped table-bordered"><thead><tr><th>Name</th><th>Bonus %</th><th>Total Salary</th><th>Bonus Amount</th></tr></thead><tbody>';
  table.html(htmlString + displayEmployee(employeeBonus) + "</tbody></table>");
}; // end searchEmployee
