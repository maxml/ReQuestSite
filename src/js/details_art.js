/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var article;

var id = getURLParameter("a");

if (typeof id === 'undefined') {
    alert("Try one more time...");
    console.log(id);
//    try{
    throw new Error("Id is undefined");
//    }catch(e){}
}
console.log(id);

Parse.initialize("V10TgoAKTJ7B8H8YjJhgucaXdGiDeROgxACn6aA2", "1gGbFOhUUrgeVp7JkqLP4XkOc8mBWkrQCU1uKAi8");
var Art = Parse.Object.extend("Articles");

var query = new Parse.Query(Art);
query.equalTo("objectId", id);
query.find({
    success: function(results) {
        // Do something with the returned Parse.Object values
        var object = results[0];
        article = object;
        showDetails();
    },
    error: function(error) {
        console.log("Error: " + error.code + " " + error.message);
    }
});


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
    
    link = document.createTextNode("По материалам " + article.get("link"));
    linkParagraph = document.createElement("p");
//    linkParagraph.className = "vacancy_salary";
    linkParagraph.appendChild(link);
    
    articleDiv.appendChild(nameParagraph);
//    articleDiv.appendChild(descriptionParagraph);
    articleDiv.appendChild(textParagraph);
    articleDiv.appendChild(linkParagraph);
    
    articleField.appendChild(articleDiv);
}

function getURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}