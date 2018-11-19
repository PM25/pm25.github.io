$(document).ready(function()
{
    function checkFinish(left){
        if(!left) $.getScript("https://pm25.github.io/js/main.js")
            .fail(function(){ checkFinish(0); }); // If fail loading the script, then try again!
    }

    var includes = $("[data-include]");
    var count = includes.length;
    jQuery.each(includes, function(){
        var file = "https://pm25.github.io/html/" + $(this).data("include") + ".html";
        $(this).load(file, checkFinish(--count));
    });
});