/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function signinCallback(authResult) {
    $('#loader').show();

    if (authResult['access_token']) {

        gapi.auth.setToken(authResult);
        gapi.client.load('plus', 'v1', function() {
            getName();
        });

        getEmail();

        $('.info').css("display", "block");
        $('#signinButton').css('display', 'none');

        $('#email').trigger('contentchanged');
        $('#name').trigger('contentchanged');
        $('#pic').trigger('contentchanged');
    } else if (authResult[ 'error' ]) {
        console.log('Sign-in state: ' + authResult[ 'error' ]);
    }

    $('#loader').hide();
}

function disconnectUser(access_token) {
    var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' + access_token;

    $.ajax({
        type: 'GET',
        url: revokeUrl,
        async: false,
        contentType: "application/json",
        dataType: 'jsonp',
        success: function(nullResponse) {
            alert('This app has had its G+ access revoked');
        },
        error: function(e) {
            console.log(e);
        }
    });
}

function getName() {

    var request = gapi.client.plus.people.get({'userId': 'me'});
    request.execute(function(resp) {
        var username = String(resp.displayName).split(' ');
        $('#name').text(username[0] + ' ' + username[1]);
        $('#pic').html('<img id="user_photo" src="' + resp['image']['url'] + '" />');
    });
}

function getEmail() {

    gapi.client.load('oauth2', 'v2', function() {
        var request = gapi.client.oauth2.userinfo.get({'userId': 'me'});
        request.execute(function(resp) {
            $('#email').text(resp['email']);
        });
    });
}

$('#revoke').click(function() {

    $('#loader').show();
    disconnectUser(gapi.auth.getToken().access_token);
    $('#loader').hide();

    $('.info').css("display", "none");
    $('#signinButton').show();

});

function userToParse() {
    if (findUser() !== '') {
        console.log("Authorised!");
        return;
    }

    var User = Parse.Object.extend("User");
    var Wallet = Parse.Object.extend("Wallet");

    // Create a new instance of that class.
    var wallet = new Wallet();
    wallet.set("total", 3);

    var user = new User();

    user.set("username", uname);
    user.set("email", uemail);
    user.set("avatar", upic);
    user.set("password", "my-pass");
    user.set("wallet", wallet);

    user.save();
    wallet.save();
    console.log("SAVE!");

    findUser();
}

var uname, upic, uemail, u, counter = 0;
$(document).ready(function() {

    $('#name').bind('contentchanged', function() {
        // do something after the div content has changed
        setTimeout(function() {
            uname = String($('#name').text()).substring(5);
            console.log(uname);

            agregateUserInfo();
        }, 3000);
    });

    $('#pic').bind('contentchanged', function() {
        // do something after the div content has changed
        setTimeout(function() {
            upic = String($('#user_photo').prop('src'));
            console.log(upic);

            agregateUserInfo();
        }, 3000);
    });

    $('#email').bind('contentchanged', function() {
        // do something after the div content has changed
        setTimeout(function() {
            uemail = String($('#email').text()).split(' ')[1];
            console.log(uemail);

            agregateUserInfo();
        }, 3000);
    });

    function agregateUserInfo() {
        counter++;
        console.log(counter);

        if (counter === 3) {
            counter = 0;
            userToParse();
        }
    }
});

function findUser() {
    var User = Parse.Object.extend("User");

    var query = new Parse.Query(User);
    query.equalTo("email", uemail);

    query.find({
        success: function(results) {
            // Do something with the returned Parse.Object values
            var object = results[0];
            u = object;

            return true;
        },
        error: function(error) {
            console.log("Error: " + error.code + " " + error.message);
            return false;
        }
    });
}