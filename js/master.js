require.config({
    paths : {
        "jquery" : "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min",
        "simplebar" : "https://unpkg.com/simplebar@latest/dist/simplebar",
        "gtm" : "https://www.googletagmanager.com/gtag/js?id=UA-129342449-2",
    },
    shim: {
        'common':{
            deps:["jquery"]
        }
    }
});
 
 
require(["jquery", "simplebar", "common", "gtm", "ga"], function(){
    console.log("all js files loaded!");
});
