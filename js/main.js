$(document).ready(function()
{
    $(".sidenav-btn").mousedown(function () {
        ripple_div = $("<div></div>");
        ripple_div.addClass("ripple-effect");
        $(this).append(ripple_div);
    });
    $(".sidenav-btn").mouseup(function(){
        window.setTimeout(function(){
            ripple_div.remove();
            $("#side-nav").toggleClass("show-sidenav");
        }, 100);
    });

    $("main").click(function(){
        if($("#side-nav").hasClass("show-sidenav")){
            $("#side-nav").removeClass("show-sidenav");
        }
    });
});