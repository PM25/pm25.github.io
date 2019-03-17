baseLink = "https://pm25.github.io/category/programming/articles/"

$(function(){
    $.getJSON(baseLink + "links.json", function(data){
        var $article_blocks = $("#articles").children("div"); // Elements of article block
        var articles_data = data["articles"]; // Data related to article (eg: title, date ...)
        var article = new Article($article_blocks, articles_data);

        article.next_page();
        article.load_page();
    });
});


// Article Object
var Article = function(article_blocks, articles_data)
{
    this.$article_blocks = article_blocks;
    this.articles_data = articles_data;
    this.page = 0;
    this.curr_count = 0;
    this.per_page_count = this.$article_blocks.length;
    this.total_count = this.articles_data.length;
}

Article.prototype.load_page = function()
{
    for(var idx=0; idx < this.per_page_count; ++idx) {
        var real_idx = this.curr_count + idx;
        if(real_idx >= this.total_count) break;
        console.log(this.articles_data[real_idx]["link"]);
        this.$article_blocks.eq(idx).css("display", "block");
        this.$article_blocks.eq(idx).children(".article-title").attr("href", baseLink + this.articles_data[real_idx]["link"])
        this.$article_blocks.eq(idx).children(".article-title").html(this.articles_data[real_idx]["title"]);
        this.$article_blocks.eq(idx).children(".date").html(this.articles_data[real_idx]["date"]);
        this.$article_blocks.eq(idx).children(".preview").html(this.articles_data[real_idx]["preview"]);
    }
}

Article.prototype.next_page = function()
{
    this.page += 1;
    this.curr_count = this.page * this.per_page_count;
}

Article.prototype.prev_page = function()
{
    this.page -= 1;
    this.curr_count = this.page * this.per_page_count;
}