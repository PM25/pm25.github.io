$(document).ready(function()
{
    function checkFinish(left){
        if(!left){
            $.getScript("main.js", function(){
                alert("Finish load main.js!");
            });
        }
    }

    var includes = $("[data-include]");
    var count = includes.length;
    jQuery.each(includes, function(){
        var file = "https://pm25.github.io/html/" + $(this).data("include") + ".html";
        $(this).load(file, checkFinish(--count));
    });
});