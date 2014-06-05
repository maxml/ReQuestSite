/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var article;
function articleClicked(id) {

    var Art = Parse.Object.extend("Articles");

    var query = new Parse.Query(Art);
    query.equalTo("objectId", id);

    query.find({
        success: function(results) {
            // Do something with the returned Parse.Object values
            var object = results[0];
            article = object;
            console.log(article);
            showDetails();
        },
        error: function(error) {
            console.log("Error: " + error.code + " " + error.message);
        }
    });
}

function showDetails() {
    $('#main').empty();
    
    articleDiv = document.createElement("div");
    articleDiv.className = "article_full";

    var articleField = document.getElementById("main");
    
    nameParagraph = document.createElement("p");
    nameParagraph.className = "article_title";
    nameParagraph.appendChild(document.createTextNode(article.get("name")));
    
    text = article.get("text");
    textParagraph = document.createElement("p");
    textParagraph.innerHTML = text;

//    link = document.createTextNode(article.get("link"));
//    linkParagraph = document.createElement("p");
//    linkParagraph.className = "vacancy_salary";
//    linkParagraph.appendChild(link);

    articleDiv.appendChild(nameParagraph);
    articleDiv.appendChild(descriptionParagraph);
 //   articleDiv.appendChild(linkParagraph);
    articleDiv.appendChild(textParagraph);
    articleField.appendChild(articleDiv);



}

//function getRespondForm() {
//    $('#main').empty();
//    $('#main').load('../form/new_respond.html #respond_form > *');
//
//}
