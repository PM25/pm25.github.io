$(document).ready(function()
{
    function checkFinish(left){
        if(!left) $.getScript("https://pm25.github.io/js/main.js")
            .fail(function(){ // If fail loading the script, then try again! 
                setTimeout(function(){
                    if(window.console) console.log("*Error: Failed loading main.js");
                    checkFinish(0);
                }, 100); 
            }).done(function(){
                if(window.console) console.log("main.js loaded!");
            }); 
    }

    var includes = $("[data-include]");
    var count = includes.length;
    jQuery.each(includes, function(){
        var file = "https://pm25.github.io/html/" + $(this).data("include") + ".html";
        $(this).load(file, checkFinish(--count));
    });
});