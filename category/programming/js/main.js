baseLink = "https://pm25.github.io/category/programming/articles/"

$(function(){
    $.getJSON(baseLink + "links.json", function(data){
        var $article_blocks = $("#articles").children("div")
        var articles_data = data["articles"];
        for(var idx=page; idx < $article_blocks.length && idx < articles_data.length; ++idx) {
            $article_blocks.eq(idx).css("display", "block");
            $article_blocks.eq(idx).children(".article-title").attr("href", baseLink + articles_data[idx]["link"])
            $article_blocks.eq(idx).children(".article-title").html(articles_data[idx]["title"]);
            $article_blocks.eq(idx).children(".date").html(articles_data[idx]["date"]);
            $article_blocks.eq(idx).children(".preview").html(articles_data[idx]["preview"]);
        }
    });
});


// Article Object
var Article = function()
{
    this.page = 0;
}

Article.prototype.next_page = function()
{

}