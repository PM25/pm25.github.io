baseLink = "https://pm25.github.io/articles/"

$(function(){
    $.getJSON(baseLink + "links.json", function(data){
        var $article_blocks = $("#article-blocks").children("div"); // Elements of article block
        var $control_panel = $("#articles .control");
        var articles_data = data["articles"]; // Data related to article (eg: title, date ...)
        
        var blog = new Blog($article_blocks, $control_panel, articles_data);
        blog.init();
    });
});