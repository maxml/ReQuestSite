/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Parse.initialize("V10TgoAKTJ7B8H8YjJhgucaXdGiDeROgxACn6aA2", "1gGbFOhUUrgeVp7JkqLP4XkOc8mBWkrQCU1uKAi8");
var Articles = Parse.Object.extend("Articles");
var articleField = document.getElementById("main");

var name, description, link, date;
var nameParagraph, descriptionParagraph, linkParagraph, dateParagraph;

var query = new Parse.Query(Articles);

query.find({
    success: function(results) {
        results.forEach(function(entry) {
            articleDiv = document.createElement("div");
            articleDiv.className = "article";
            articleDiv.onclick = function() {
                window.location.href = "../article/details/?a=" + entry.id;
                //articleClicked(entry.id);
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

            link = document.createTextNode(entry.get("author"));
            linkParagraph = document.createElement("p");
            linkParagraph.className = "article_link";
            linkParagraph.appendChild(link);

            date = document.createTextNode(("" + entry.updatedAt).substring(0, 25));
            dateParagraph = document.createElement("p");
            dateParagraph.className = "article_date";
            dateParagraph.appendChild(date);


            articleDiv.appendChild(nameParagraph);
            articleDiv.appendChild(descriptionParagraph);
            articleDiv.appendChild(dateParagraph);
            articleDiv.appendChild(linkParagraph);

            articleField.appendChild(articleDiv);
        });
    },
    error: function(error) {
        alert('Server error! Please, refresh page!');
    }
});

