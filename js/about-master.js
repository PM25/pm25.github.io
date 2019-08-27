require.config({
    paths : {
        "jquery" : "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min",
        "simplebar" : "https://unpkg.com/simplebar@latest/dist/simplebar",
        "gtm" : "https://www.googletagmanager.com/gtag/js?id=UA-129342449-2",
        "firebase": "https://www.gstatic.com/firebasejs/6.4.1/firebase"
    },
    shim: {
        "common": {
            deps:["jquery"]
        }
    }
});
 
 
require(["jquery", "firebase", "simplebar", "common", "gtm", "ga"], function($, firebase){
    $(function(){
        // View Counter
        $.getJSON("https://plusmore-view-counter.herokuapp.com", function(data){});
        
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyC_PsGVyb044JCGNuO2AYEfNBStYE559xQ",
            authDomain: "plusmore-website.firebaseapp.com",
            databaseURL: "https://plusmore-website.firebaseio.com",
            projectId: "plusmore-website",
            storageBucket: "plusmore-website.appspot.com",
            messagingSenderId: "971689883643"
        }; firebase.initializeApp(config);
        main(firebase.database());

        console.log("all js files loaded!");
    });
});


// Main function
function main(db)
{
    // Show client's IP data
    $.getJSON("https://plusmore-view-counter.herokuapp.com/", function(data) {
        clientIP = data["ip"].replace(/\./g, '-');
        
        $("#site-statics").find(".ip").text(data["ip"]);
        $("#site-statics").find(".city").text(data["city"]);
        db.ref("/ipData/ip/" + clientIP).once("value", (snapshot) => {
            $("#site-statics").find(".view").text(snapshot.val()["count"]);
        });
    });
    
    // Show site's overview data
    db.ref("/ipData/ip/total").on("value", (snapshot) => {
        $("#site-statics").find(".total-ip").text(snapshot.val()["ip"]);
        $("#site-statics").find(".total-view").text(snapshot.val()["view"]);
    });

    // Show how long since the first time site started
    var createdTime = new Date(2018, 5, 24);
    $("#site-statics").find(".running-time").text(msToTime(new Date - createdTime));
    setInterval(function(){
        $("#site-statics").find(".running-time").text(msToTime(new Date - createdTime));
    }, 1000);
}

function msToTime(duration) 
{
    var sec = Math.floor((duration / 1000) % 60);
    var min = Math.floor((duration / 60000) % 60);
    var hr = Math.floor((duration / 3600000) % 24);
    var day = Math.floor(duration / 86400000);
    
    return day + "天 " + hr + "小時 " + min + "分鐘 " + sec + "秒";
}