$(function(){
    var $article_blocks = $("#articles").children("div")
    for(var idx=0; idx < $article_blocks.length; ++idx){
        $article_blocks.eq(idx).css("display", "block");
        $article_blocks.eq(idx).children(".article-title").html("Test-Title");
        $article_blocks.eq(idx).children(".date").html("2019-03-16");
        $article_blocks.eq(idx).children(".preview").html("bla bla bla ...");
    }
});