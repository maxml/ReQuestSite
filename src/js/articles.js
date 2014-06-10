/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Parse.initialize("V10TgoAKTJ7B8H8YjJhgucaXdGiDeROgxACn6aA2", "1gGbFOhUUrgeVp7JkqLP4XkOc8mBWkrQCU1uKAi8");

var Articles = Parse.Object.extend("Articles");
var articleField = document.getElementById("main");;

var name, description, link, creationDate;
var nameParagraph, descriptionParagraph, linkParagraph, creationParagraph;

var query = new Parse.Query(Articles);

query.find({
    success: function(results) {
        results.forEach(function(entry) {
            articleDiv = document.createElement("div");
            articleDiv.className = "article";
            articleDiv.onclick = function() {
                articleClicked(entry.id);
            };

            nameParagraph = document.createElement("p");
            nameParagraph.className = "article_title";
            nameParagraph.appendChild(document.createTextNode(entry.get("name")));
            
//            creationDate = entry.createdAt.toString();
//            creationParagraph = document.createElement("p");
//            creationParagraph.className = "vacancy_reward";
//            creationParagraph.appendChild(creationDate);

            description = document.createTextNode(entry.get("description"));
            descriptionParagraph = document.createElement("p");
            descriptionParagraph.className = "article_description";
            descriptionParagraph.appendChild(description);

            link = document.createTextNode(entry.get("link"));
            linkParagraph = document.createElement("p");
            linkParagraph.className = "article_link";
            linkParagraph.appendChild(link);

            articleDiv.appendChild(nameParagraph);
        //    articleDiv.appendChild(creationParagraph);
            articleDiv.appendChild(descriptionParagraph);
            articleDiv.appendChild(linkParagraph);

            articleField.appendChild(articleDiv);
        });
    },
    error: function(error) {
        alert('Server error! Please, refresh page!');
    }
});

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
