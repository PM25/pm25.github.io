$(document).ready(function()
{
    var includes = $("[data-include]");
    jQuery.each(includes, function(){
      var file = "https://pm25.github.io/html/" + $(this).data("include") + ".html";
      $(this).load(file);
    });
});