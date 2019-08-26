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
        },
        "about": {
            deps: ["jquery", "firebase"]
        }
    }
});
 
 
require(["jquery", "firebase", "simplebar", "common", "gtm", "ga", "about"], function($, firebase){
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyC_PsGVyb044JCGNuO2AYEfNBStYE559xQ",
        authDomain: "plusmore-website.firebaseapp.com",
        databaseURL: "https://plusmore-website.firebaseio.com",
        projectId: "plusmore-website",
        storageBucket: "plusmore-website.appspot.com",
        messagingSenderId: "971689883643"
    }; firebase.initializeApp(config);

    // View Counter
    $.getJSON("https://plusmore-view-counter.herokuapp.com", function(data){});
    console.log("all js files loaded!");
});