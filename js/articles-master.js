require.config({
    paths : {
        "jquery" : "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min",
        "simplebar" : "https://unpkg.com/simplebar@latest/dist/simplebar",
        "gtm" : "https://www.googletagmanager.com/gtag/js?id=UA-129342449-2",
        "marked" : "https://cdn.jsdelivr.net/npm/marked/marked.min"
    },
    shim: {
        'common': {
            deps: ["jquery"]
        },
        'articles': {
            deps: ["jquery", "marked"]
        }
    }
});
 
 
require(["jquery", "marked", "simplebar", "common", "gtm", "ga", "articles"], function($, marked){
    window.marked = marked;
    // View Counter
    $.getJSON("https://plusmore-view-counter.herokuapp.com", function(data){});
    console.log("all js files loaded!");
});