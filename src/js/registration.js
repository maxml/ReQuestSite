Parse.initialize("V10TgoAKTJ7B8H8YjJhgucaXdGiDeROgxACn6aA2", "1gGbFOhUUrgeVp7JkqLP4XkOc8mBWkrQCU1uKAi8");
var user = {};

$(document).ready(function() {

    var JSON = JSON || {};

    // implement JSON.stringify serialization
    JSON.stringify = JSON.stringify || function(obj) {
        var t = typeof (obj);
        if (t != "object" || obj === null) {
            // simple data type
            if (t == "string")
                obj = '"' + obj + '"';
            return String(obj);
        }
        else {
            // recurse array or object
            var n, v, json = [], arr = (obj && obj.constructor == Array);
            for (n in obj) {
                v = obj[n];
                t = typeof (v);
                if (t == "string")
                    v = '"' + v + '"';
                else if (t == "object" && v !== null)
                    v = JSON.stringify(v);
                json.push((arr ? "" : '"' + n + '":') + String(v));
            }
            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    };

    // implement JSON.parse de-serialization
    JSON.parse = JSON.parse || function(str) {
        if (str === "")
            str = '""';
        eval("var p=" + str + ";");
        return p;
    };

    user = JSON.parse(window.localStorage['user']);
    if (!window.user) {
        return;
    }
    if ((typeof user.name !== 'undefined') || (typeof user.email !== 'undefined') || (typeof user.pic !== 'undefined')) {
        initialise();
    }
});

function initialise() {
    $('#email').text(user.email);
    $('#name').text(user.name);
    $('#pic').html('<img id="user_photo" src="' + user.pic + '" />');
    $('.info').css("display", "block");
    $('#signinButton').css('display', 'none');
}

function logout()
{
    gapi.auth.signOut();
    window.localStorage['user'] = null;

    $('.info').css("display", "none");
    $('#signinButton').show();
//    location.reload();
}
function login()
{
    var myParams = {
        'clientid': '543719723243-g5d4k6aic1ugr5rf506t9rh2ohptgsf3.apps.googleusercontent.com',
        'cookiepolicy': 'single_host_origin',
        'callback': 'loginCallback',
        'approvalprompt': 'force',
        'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
    };
    gapi.auth.signIn(myParams);
}

function loginCallback(result)
{
    if (result['status']['signed_in'])
    {
        var request = gapi.client.plus.people.get({
            'userId': 'me'
        });
        request.execute(function(resp)
        {
            var email = '';
            if (resp['emails'])
            {
                for (i = 0; i < resp['emails'].length; i++)
                {
                    if (resp['emails'][i]['type'] == 'account')
                    {
                        email = resp['emails'][i]['value'];
                    }
                }
            }

            user = {
                name: resp['displayName'],
                pic: resp['image']['url'],
                email: email
            }
            window.localStorage['user'] = JSON.stringify(user);

            initialise();
            toParse();
        });
    }

}
function onLoadCallback()
{
    gapi.client.load('plus', 'v1', function() {
    });
}

function toParse() {
    var User = Parse.Object.extend("User");
    var Wallet = Parse.Object.extend("Wallet");
    // Create a new instance of that class.
    var parseUser = new User();
//    console.log("userToParse " + uname + uemail + upic);

    parseUser.set("username", user.email); //THIS IS WRIGHT!!!
    parseUser.set("name", user.name);
    parseUser.set("avatar", user.pic);
    parseUser.set("password", "my-pass");

    parseUser.signUp(null, {
        success: function(buff) {

            var wallet = new Wallet();
            wallet.set("total", 0);
            buff.set('wallet', wallet);
            buff.save();
        },
        error: function(buff, error) {
            Parse.User.logIn(user.name, "my-pass", {
                success: function(regUser) {
                },
                error: function(buff, error) {
                    console.log("Auto " + error);
                }
            });
        }
    });
}

