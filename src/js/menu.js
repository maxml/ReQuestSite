    // HIDE
    function hide(){
        var div = document.getElementById("menu").style.display;
        var link1 = document.getElementById("link1").innerHTML;

        if ( div == "block"){
            div="none";
        }

        document.getElementById("menu").style.display = div;
        // document.getElementById("link1").innerHTML = link;
    }

    // SHOW
    function show(){
        var div = document.getElementById("menu").style.display;
        var link2 = document.getElementById("link2").innerHTML;

        if ( div == "none"){
            div="block";
        }

        document.getElementById("menu").style.display = div;
        // document.getElementById("link2").innerHTML = link;
    }