/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var vacancy;
function linkClicked(id) {

    var Req = Parse.Object.extend("Requests");

    var query = new Parse.Query(Req);
    query.equalTo("objectId", id);

    query.find({
        success: function(results) {
            // Do something with the returned Parse.Object values
            var object = results[0];
            vacancy = object;
            console.log(vacancy);

            showDetails();
        },
        error: function(error) {
            console.log("Error: " + error.code + " " + error.message);
        }
    });
}

function showDetails() {
    $('#main').empty();
    $('#main').load('form/details.html #details_form > *');

    console.log(vacancy.get("expire"));
    setTimeout(function() {
        $("#vName").html(vacancy.get("title"));
        $("#vExpireDate").html(String(vacancy.get("expire")).substring(0, 24));
        $("#vReward").html(vacancy.get("reward"));
        $("#vCompanyName").html(vacancy.get("company"));
        $("#vDesc").html(vacancy.get("company_description"));
        $("#vDemands").html(vacancy.get("demands"));
        $("#vTerms").html(vacancy.get("terms"));
        $("#vSalary").html(vacancy.get("salary"));
        $("#vCity").html(vacancy.get("city"));
        $("#vAdress").html(vacancy.get("company_address"));
    }, 1500);

}

function getRespondForm() {
    $('#main').empty();
    $('#main').load('form/new_respond.html #respond_form > *');

}