$(document).ready(function()
{
    var includes = $("[data-include]");
    var count = includes.length;
    jQuery.each(includes, function(){
        // Load externel HTML files
        var file = "https://pm25.github.io/html/" + $(this).data("include") + ".html";
        // Load common-main.js
        $(this).load(file, checkFinish(--count));
    });
});


function checkFinish(left){
    if(!left) $.getScript("https://pm25.github.io/js/common-main.js")
        .fail(function(){ // If fail loading the script, then try again! 
            setTimeout(function(){
                if(window.console) console.log("*Error: Failed loading common-main.js");
                checkFinish(0);
            }, 100); 
        }).done(function(){
            if(window.console) console.log("common-main.js loaded!");
        }); 
}