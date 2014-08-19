/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var name, description, link, date;
var textParagraph, nameParagraph, descriptionParagraph, linkParagraph, dateParagraph;

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

    articleDiv = $("<div></div>", {
        class: "article_full"
    }).appendTo($('#main'));

    nameParagraph = $("<p></p>", {
        class: "article_title_details",
        text: article.get("name")
    });

    textParagraph = $("<p></p>", {
        class: "article_full_details"
    }).html(article.get("text"));

    linkParagraph = $("<p></p>", {
        class: "article_date",
        text: "По материалам " + article.get("link")
    });

    moveParagraphUp = $("<a></a>", {
        class: "article_back_move",
        href: "../",
        text: "<"
    });

    moveParagraphDown = $("<a></a>", {
        class: "article_back_move",
        href: "../",
        text: "<"
    });


    articleDiv.append(moveParagraphUp);
    articleDiv.append(nameParagraph);
    articleDiv.append(textParagraph);
    articleDiv.append(moveParagraphDown);
    articleDiv.append(linkParagraph);

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