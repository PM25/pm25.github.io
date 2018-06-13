$(document).ready(function()
{
    $("#show-sidenav-btn").click(function(){
        $("#side-nav").addClass("show-sidenav");
    });

    $("#hide-sidenav-btn").click(function(){
        $("#side-nav").removeClass("show-sidenav");
    });
});