$(function(){
    $("#enter-survey").mouseup(function(event){
        $("#bg-left").animate({
            width: "100vw"
        }, 1000);
        $("#bg-right").animate({
            width: "0vw"
        }, 1000);
        cleanAll();
    });
    $("#create-survey").mouseup(function(event){
        $("#bg-left").animate({
            width: "0vw"
        }, 1000);
        $("#bg-right").animate({
            width: "100vw"
        }, 1000);
        cleanAll();
    });
});


function cleanAll()
{
    $("#bg-middle").css("display", "none");
    $("#enter-survey").css("display", "none");
    $("#create-survey").css("display", "none");
}

function createSurvey()
{

}

function enterSurvey()
{
    
}