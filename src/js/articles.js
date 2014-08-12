/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Parse.initialize("V10TgoAKTJ7B8H8YjJhgucaXdGiDeROgxACn6aA2", "1gGbFOhUUrgeVp7JkqLP4XkOc8mBWkrQCU1uKAi8");
var Articles = Parse.Object.extend("Articles");

var name, description, link, date;
var nameParagraph, descriptionParagraph, linkParagraph, dateParagraph, moveParagraph;

var query = new Parse.Query(Articles);
query.limit(10);
query.descending("createdAt");

query.find({
    success: function(results) {
        results.forEach(function(entry) {
            articleDiv = $("<div></div>", {
                class: "article",
                click: function() {
                    window.location.href = "../article/details/?a=" + entry.id;
                    //articleClicked(entry.id);
                }
            }).appendTo($('#main'));

            nameParagraph = $("<p></p>", {
                class: "article_title",
                text: entry.get("name")
            });

            moveParagraph = $("<a></a>", {
                class: "article_move",
                href: "#",
                text: ">"
            });

            descriptionParagraph = $("<p></p>", {
                class: "article_description",
                text: entry.get("description")
            });

            linkParagraph = $("<p></p>", {
                class: "article_link",
                text: "Автор: " + entry.get("author")
            });

            dateParagraph = $("<p></p>", {
                class: "article_date",
                text: "Дата: " + ("" + entry.createdAt).substring(0, 25)
            });

            articleDiv.append(moveParagraph);
            articleDiv.append(nameParagraph);
            articleDiv.append(descriptionParagraph);
            articleDiv.append(dateParagraph);
            articleDiv.append(linkParagraph);

        });
    },
    error: function(error) {
        alert('Server error! Please, refresh page!');
    }
});

