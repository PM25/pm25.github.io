require.config({
    paths : {
        "jquery" : "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min",
        "simplebar" : "https://unpkg.com/simplebar@latest/dist/simplebar",
        "gtm" : "https://www.googletagmanager.com/gtag/js?id=UA-129342449-2",
        "marked" : "https://cdn.jsdelivr.net/npm/marked/marked.min"
    },
    shim: {
        'common': {
            deps: ["jquery"]
        },
        'articles': {
            deps: ["jquery", "marked"]
        }
    }
});
 
 
require(["jquery", "marked", "simplebar", "common", "gtm", "ga"], function($, marked){
    // Load markdown content.
    $.get( get_md_url(), function( md ) {
        var html = marked(md);

        $("#blog").html(html);
        console.log( "Blog content was Loaded." );
    });

    // View Counter
    $.getJSON("https://plusmore-view-counter.herokuapp.com", function(data){});
    console.log("all js files loaded!");
});

// Find corresponding markdown file.
function get_md_url()
{
    var curr_url = $(location).attr('href');
    var html_filename = curr_url.split("/").pop();
    var filename = html_filename.split('.', 1);
    var md_filename = filename + ".md";
    var md_url = "https://pm25.github.io/articles/md/" + md_filename;
    
    return md_url;
}