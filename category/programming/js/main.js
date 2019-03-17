$(function(){
    $.getJSON("https://pm25.github.io/category/programming/links.json", function(data){
        var $article_blocks = $("#articles").children("div")
        for(var idx=0; idx < $article_blocks.length && data["links"].length; ++idx) {
            $article_blocks.eq(idx).css("display", "block");
            $article_blocks.eq(idx).children(".article-title").attr("href", data["links"][idx])
            $article_blocks.eq(idx).children(".article-title").html("Test-Title");
            $article_blocks.eq(idx).children(".date").html("2019-03-16");
            $article_blocks.eq(idx).children(".preview").html("bla bla bla ...");
        }
    });
});