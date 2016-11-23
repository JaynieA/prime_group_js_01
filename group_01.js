var atticus = ["Atticus", "2405", "47000", 3];
var jem = ["Jem", "62347", "63500", 4];
var boo = ["Boo", "11435", "54000", 3];
var scout = ["Scout", "6243", "74750", 5];
var robert = ["Robert", "26835", "66000", 1];
var mayella = ["Mayella", "89068", "35000", 2];

var employees = [atticus, jem, boo, scout, robert, mayella];

function returnBonus(employeeArray) {
  console.log("In returnBonus with " + employeeArray);
  var bonusArray = [];
  // Add the employees name to the array
  var name = employeeArray[0];
  console.log(name);

  // Calculate the percent bonus
  var bonusPercent = calcBonusPercent(employeeArray[3], employeeArray[1], employeeArray[2]);

  // Calculate bonus amount
  var bonusAmount = calcBonusAmount(bonusPercent, employeeArray[2]);

  // Calculate the total salary
  var totalSalary = calcTotalSalary(bonusAmount, employeeArray[2]);

  //Round to the nearest %
  bonusPercent = Math.round(bonusPercent*100)/100;

  bonusAmount = Math.round(bonusAmount);
  // Rounds to the nearest penny
  totalSalary = Math.round(totalSalary * 100)/100;

  bonusArray.push(name, bonusPercent, totalSalary, bonusAmount);
  return bonusArray;
}

function calcBonusPercent(rating, employeeNum, salary) {
  console.log("In calcBonusPercent with " + rating + ", " + employeeNum + ", " + salary);
  var bonusPercent = 0;

  bonusPercent = calcBonusFromRating(bonusPercent, rating);
  bonusPercent = calcBonusFromYears(bonusPercent, employeeNum);
  bonusPercent = adjustForSalary(bonusPercent, salary);
  bonusPercent = adjustForCap(bonusPercent);
  return bonusPercent;
}

function calcBonusAmount(bonusPercent, salary) {
  console.log("Calculating bonus amount with percent " + bonusPercent + " and salary $" + salary);
  var bonusAmount = salary * bonusPercent;
  return bonusAmount;
}

function calcTotalSalary(bonusAmount, salary) {
  console.log("Calculating total compensation with salary $" + salary + " and bonus $" + bonusAmount);
  var totalSalary = bonusAmount + Number(salary);
  return totalSalary;
}

function calcBonusFromRating(bonusPercent, rating) {
  console.log("Calculating bonus from rating: " + rating + " and percent: " + bonusPercent);
  if (rating <= 2) {
    bonusPercent = 0;
  } else if (rating === 3) {
    bonusPercent = 0.04;
  } else if (rating === 4) {
    bonusPercent = 0.06;
  } else if (rating === 5) {
    bonusPercent = 0.10;
  }
  return bonusPercent;
}

function calcBonusFromYears(bonusPercent, employeeNum) {
  console.log("Calculating bonus from employee number: " + employeeNum + " and percent: " + bonusPercent);
  if (employeeNum.length === 4) {
    bonusPercent += 0.05;
  }
  return bonusPercent;
}

function adjustForSalary(bonusPercent, salary) {
  console.log("Calculating bonus from salary: " + salary + " and percent: " + bonusPercent);
  if (salary > 65000) {
    bonusPercent -= 0.01;
  }
  return bonusPercent;
}

function adjustForCap(bonusPercent) {
  console.log("Calculating bonus from percent: " + bonusPercent);
  if (bonusPercent > 0.13) {
    bonusPercent = 0.13;
  } else if (bonusPercent < 0) {
    bonusPercent = 0;
  }
  return bonusPercent;
}

var displayEmployee = function(thisEmployee){
  var htmlString = "<tr>";
  for (var j = 0; j < thisEmployee.length; j++) {
      htmlString += "<td>" + thisEmployee[j] + "</td>";
  }
  htmlString += "</tr>";
  return htmlString;
}

var displayAllEmployees = function() {

  var table = document.getElementById("employeeTable");
  var htmlString = "<table><tr><th>Name</th><th>Bonus %</th><th>Total Salary</th><th>Bonus Amount</th></tr>";
  for (var i = 0; i < employees.length; i++) {
    console.log(returnBonus(employees[i]));
    var employee = returnBonus(employees[i]);
    htmlString += displayEmployee(employee);
  }
  htmlString += "</table>";
  table.innerHTML = htmlString;
};

var addSelectOptions = function(){
  var htmlString = "";
  for (var i = 0; i < employees.length; i++) {
    console.log(employees[i][0]);
    htmlString += "<option value='" + employees[i][0] + "' >" + employees[i][0] + "</option>";
  }
  document.getElementById("employeeSelect").innerHTML = htmlString;
}

var searchEmployee = function (){
  var selectedEmployee = document.getElementById("employeeSelect").value;
  console.log(selectedEmployee);
  for (var i = 0; i < employees.length; i++) {
    if (employees[i][0] == selectedEmployee){
      var employeeBonus = returnBonus(employees[i]);
    }
  }
    var table = document.getElementById("employeeTable");
    var htmlString = "<table><tr><th>Name</th><th>Bonus %</th><th>Total Salary</th><th>Bonus Amount</th></tr>";
    table.innerHTML = htmlString + displayEmployee(employeeBonus) + "</table>";

}

var addEmployee = function(){
  //get inputs
  var newName = document.getElementById("employeeName").value;
  var newId = document.getElementById("employeeId").value;
  var newSalary = document.getElementById("employeeSalary").value;
  var newRating = Number(document.getElementById("employeeRating").value); // rest of array were integers not strings
  console.log(newName, newId, newSalary, newRating);

  //push new values to employee array
  employees.push([newName, newId, newSalary, newRating]);
  console.log(employees);

  addSelectOptions();// reload our employ search options
} //end of addEmployee

addSelectOptions();
