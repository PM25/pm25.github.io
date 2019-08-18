$(function(){
    $.get( get_md_url(), function( md ) {
        var html = window.marked(md);

        $("#blog").html(html);
        console.log( "Blog content was Loaded." );
    });
});


function get_md_url()
{
    var curr_url = $(location).attr('href');
    var html_filename = curr_url.split("/").pop();
    var filename = html_filename.split('.', 1);
    var md_filename = filename + ".md";
    var md_url = "https://pm25.github.io/articles/md/" + md_filename;
    
    return md_url;
}