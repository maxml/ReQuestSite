Parse.initialize("V10TgoAKTJ7B8H8YjJhgucaXdGiDeROgxACn6aA2", "1gGbFOhUUrgeVp7JkqLP4XkOc8mBWkrQCU1uKAi8");
var uname, upic, uemail, u, counter = 0;

function logout()
{
    gapi.auth.signOut();

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

            uname = resp['displayName'];
//            console.log("Name " + uname);

            upic = resp['image']['url'];
//            console.log("Pic " + upic);

            uemail = email;
//            console.log("Email " + uemail);

            $('#email').text(uemail);
            $('#name').text(uname);
            $('#pic').html('<img id="user_photo" src="' + upic + '" />');

            $('.info').css("display", "block");
            $('#signinButton').css('display', 'none');

            toParse();
        });
    }

}
function onLoadCallback()
{
    //gapi.client.setApiKey('AIzaSyAHtIQcOBrfA-OYZXYxfnPKvG8bL_gfa_U');
    gapi.client.load('plus', 'v1', function() {
    });
}

function toParse() {
    var User = Parse.Object.extend("User");
    var Wallet = Parse.Object.extend("Wallet");

    // Create a new instance of that class.
    var user = new User();
//    console.log("userToParse " + uname + uemail + upic);

    user.set("username", uname);
    user.set("email", uemail);
    user.set("avatar", upic);

    user.set("password", "my-pass");

    user.signUp(null, {
        success: function(user) {

            var wallet = new Wallet();
            wallet.set("total", 0);

            user.set('wallet', wallet);
            user.save();
        },
        error: function(buff, error) {
            Parse.User.logIn(uname, "my-pass", {
                success: function(regUser) {
                },
                error: function(buff, error) {
                    console.log("Auto " + error);
                }
            });
        }
    });
}