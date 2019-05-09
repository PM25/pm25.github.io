baseLink = "https://pm25.github.io/category/articles/"

$(function(){
    $.getJSON(baseLink + "links.json", function(data){
        var $article_blocks = $("#article-blocks").children("div"); // Elements of article block
        var $control_panel = $("#articles .control");
        var articles_data = data["articles"]; // Data related to article (eg: title, date ...)
        
        var blog = new Blog($article_blocks, $control_panel, articles_data);
        blog.init();
    });
});


// Blog Object
var Blog = function($article_blocks, $control_panel, articles_data)
{
    this.$article_blocks = $article_blocks;
    this.$control_panel = $control_panel;
    this.articles_data = articles_data;
    this.base_idx = 0;
    this.per_page_count = this.$article_blocks.length;
    this.total_count = this.articles_data.length;
    this.page_idx = 0;
    this.max_page = Math.ceil(this.total_count / this.per_page_count);

    // Behavior
    var self = this;
    this.$control_panel.find(".prev").click(function(){
        self.prev_page();
    });
    this.$control_panel.find(".next").click(function(){
        self.next_page();
    });
}

// Initialize
Blog.prototype.init = function()
{
    this.update_page();
}

// Load the page base on {base_idx}
Blog.prototype.load_page = function()
{
    this.clear_page();
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

// Change to next page
Blog.prototype.next_page = function()
{
    this.page_idx += 1;
    if(this.page_idx < this.max_page) {
        this.base_idx = this.page_idx * this.per_page_count;
        this.load_page();
    } else {
        this.page_idx = this.max_page - 1;
    }

    this.update_page();
}

// Change to previous page
Blog.prototype.prev_page = function()
{
    this.page_idx -= 1;
    if(this.page_idx >= 0) {
        this.base_idx = this.page_idx * this.per_page_count;
        this.load_page();
    } else {
        this.page_idx = 0;
    }

    this.update_page();
}

// Clear the page
Blog.prototype.clear_page = function()
{
    for(var idx=0; idx < this.per_page_count; ++idx) {
        this.$article_blocks.eq(idx).css("display", "none");
    }
}

// Update page information & reload the page
Blog.prototype.update_page = function()
{
    this.load_page();

    var page_info = "Page " + (this.page_idx+1) + " of " + this.max_page;
    this.$control_panel.find(".info").html(page_info);
}