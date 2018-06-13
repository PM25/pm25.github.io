$(document).ready(function()
{
    $(".sidenav-btn").click(function(){
        $("#side-nav").toggleClass("show-sidenav");
    });

    $("main").click(function(){
        if($("#side-nav").hasClass("show-sidenav")){
            $("#side-nav").removeClass("show-sidenav");
        }
    });
});