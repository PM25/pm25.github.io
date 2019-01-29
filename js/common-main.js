$(document).ready(function()
{

    timer = setTimeout(function() {
        if($(".sidenav-btn").is(":visible")) {
            $(".sidenav-btn").mousedown(function (event) {
                if(event.which === 1){
                    $ripple_div = $("<div></div>");
                    $ripple_div.addClass("ripple-effect");
                    $(this).append($ripple_div);
                }
            });
            $(".sidenav-btn").mouseup(function(event){
                if(event.which === 1){
                    window.setTimeout(function(){
                        $(".sidenav-btn").children(".ripple-effect").remove();
                        $("#side-nav").toggleClass("show-sidenav");
                    }, 100);
                }
            });

            clearInterval(timer);
            if(window.console) console.log("sidenav-btn loaded!");
        }
    }, 500);
        

    $(".search-btn").click(function () {
        if ($(this).closest("#home-nav").length) {
            $search_input = $(this).prev(".search-input");
            $search_container = $(this).parent(".search-container");
            
            if($search_input.length){
                $search_input.remove();
                $search_container.css({"border-color": "transparent"});
                $(this).removeClass("spin-effect");
            } else {
                $search_container.css({ "border-color": "black" });
                $(this).before("<input class='search-input' type='text' placeholder='Search..'>");
                $(this).addClass("spin-effect");
            }            
        }
    });

    $("main").click(function(){
        if($("#side-nav").hasClass("show-sidenav")){
            $("#side-nav").removeClass("show-sidenav");
        }
    });
});