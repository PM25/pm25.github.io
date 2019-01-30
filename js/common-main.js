$(document).ready(function()
{
    // Constantly check whether "sidenav-btn" is ready.
    timer_sidenavbtn = setInterval(function() {
        if($(".sidenav-btn").is(":visible")) {
            $(".sidenav-btn").mousedown(function(event){
                if(event.which === 1){
                    // Show the ripple effect.
                    $ripple_div = $("<div></div>");
                    $ripple_div.addClass("ripple-effect");
                    $(this).append($ripple_div);
                }
            });
            $(".sidenav-btn").mouseup(function(event){
                if(event.which === 1){
                    window.setTimeout(function(){
                        //  Remove the ripple effect.
                        $(".sidenav-btn").children(".ripple-effect").remove();
                        // Show or Hide side navigator menu
                        $("#side-nav").toggleClass("show-sidenav");
                    }, 100);

                    // Fixed problem that cursor will change to default after sidenav-btn clicked.
                    $("#side-nav").addClass("sidenav-btn");
                    window.setTimeout(function(){
                        $("#side-nav").removeClass("sidenav-btn");
                    }, 1000);
                }
            });

            clearInterval(timer_sidenavbtn);
            if(window.console) console.log("sidenav-btn loaded!");
        }
    }, 500);
        
    // Constantly check whether "search-btn" is ready.
    timer_searchbtn = setInterval(function() {
        if($(".search-btn").is(":visible")) {
            $(".search-btn").click(function() {
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

            clearInterval(timer_searchbtn);
            if(window.console) console.log("search-btn loaded!");
        }
    }, 500);

    $("main").click(function(){
        if($("#side-nav").hasClass("show-sidenav")){
            $("#side-nav").removeClass("show-sidenav");
        }
    });
});