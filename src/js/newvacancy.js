/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var vacancyName;
var companyName;
var description;
var demands;
var terms;
var salary;
var city;
var address;
var reward;
var expireDate;


$(document).ready(function() {

    $('#new_vacancy').click(function() {

        $('#main').empty();
        $('#main').load('form/new_vacancy_step1.html #vacancy_form1 > *');
    });

});

function getFirstData() {
    vacancyName = document.getElementById("vacancyName").value;
    companyName = document.getElementById("companyName").value;
    description = document.getElementById("description").value;
    demands = document.getElementById("demands").value;
    terms = document.getElementById("terms").value;
    salary = document.getElementById("salary").value;
    city = document.getElementById("city").value;
    address = document.getElementById("address").value;

    console.log(vacancyName + "|" + demands + "|" + terms + "|"
            + salary + "|" + city + "|" + address + "|" + companyName + "|" + description + "|");

//    if (trim(vacancyName) === null || trim(vacancyName) === "" || trim(description) === null || trim(description) === "") {
//        alert("There were not atl the required fields filled.");
//    }
//    else {
    $('#main').empty();
    $('#main').load('form/new_vacancy_step2.html #form2 > *');
    //   }
}

function getSecondData() {

    reward = document.getElementById("reward").value;
    expireDate = document.getElementById("expireDate").value;

    console.log(reward + " " + expireDate);
    makeVacancy();
}

function makeVacancy() {
    Parse.initialize("V10TgoAKTJ7B8H8YjJhgucaXdGiDeROgxACn6aA2", "1gGbFOhUUrgeVp7JkqLP4XkOc8mBWkrQCU1uKAi8");

    var Requests = Parse.Object.extend("Requests");
    var request = new Requests();

    request.set("title", vacancyName);
    //request.set("expire", expireDate);
    request.set("company", companyName);
    request.set("reward", parseInt(reward));
    request.set("salary", salary);
    request.set("demands", demands);
    request.set("terms", terms);
    request.set("city", city);
    request.set("company_address", address);
    request.set("company_description", description);
    request.set("user", u);

    request.save(null, {
        success: function(request) {
            // Execute any logic that should take place after the object is saved.
            console.log('New object created with objectId: ' + request.id);
        },
        error: function(request, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and description.
            console.log('Failed to create new object, with error code: ' + error.message);
            console.log(error);
        }
    });

    //window.setTimeout('location.reload()', 3000);
}