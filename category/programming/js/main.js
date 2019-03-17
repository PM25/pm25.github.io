baseLink = "https://pm25.github.io/category/programming/articles/"

$(function(){
    $.getJSON(baseLink + "links.json", function(data){
        var $article_blocks = $("#articles").children("div"); // Elements of article block
        var articles_data = data["articles"]; // Data related to article (eg: title, date ...)
        var blog = new Blog($article_blocks, articles_data);

        blog.load_page();
    });
});


// Blog Object
var Blog = function(article_blocks, articles_data)
{
    this.$article_blocks = article_blocks;
    this.articles_data = articles_data;
    this.page = 0;
    this.base_idx = 0;
    this.per_page_count = this.$article_blocks.length;
    this.total_count = this.articles_data.length;
}

Blog.prototype.load_page = function()
{
    for(var idx=0; idx < this.per_page_count; ++idx) {
        var curr_idx = this.base_idx + idx;
        if(curr_idx >= this.total_count) break;
        var curr_article = this.articles_data[curr_idx];

        this.$article_blocks.eq(idx).css("display", "block");
        this.$article_blocks.eq(idx).children(".article-title").attr("href", baseLink + curr_article["link"])
        this.$article_blocks.eq(idx).children(".article-title").html(curr_article["title"]);
        this.$article_blocks.eq(idx).children(".date").html(curr_article["date"]);
        this.$article_blocks.eq(idx).children(".preview").html(curr_article["preview"]);
    }
}

Blog.prototype.next_page = function()
{
    this.page += 1;
    this.base_idx = this.page * this.per_page_count;
}

Blog.prototype.prev_page = function()
{
    this.page -= 1;
    this.base_idx = this.page * this.per_page_count;
}