$(document).ready(function()
{
    var db = firebase.database();
    var createdTime = new Date(2018, 5, 24);

    db.ref("/ipData/ip/total").on("value", (snapshot) => {
        $("#site-statics").find(".total-ip").text(snapshot.val()["ip"]);
        $("#site-statics").find(".total-view").text(snapshot.val()["view"]);
    });
    $.getJSON("https://plusmore-view-counter.herokuapp.com/", function(data) {
        clientIP = data["ip"].replace(/\./g, '-');
        
        $("#site-statics").find(".ip").text(data["ip"]);
        $("#site-statics").find(".city").text(data["city"]);
        db.ref("/ipData/ip/" + clientIP).once("value", (snapshot) => {
            $("#site-statics").find(".view").text(snapshot.val()["count"]);
        });
    });

    $("#site-statics").find(".running-time").text(msToTime(new Date - createdTime));
    setInterval(function(){
        $("#site-statics").find(".running-time").text(msToTime(new Date - createdTime));
    }, 1000);
});


function msToTime(duration) {
    var sec = Math.floor((duration / 1000) % 60);
    var min = Math.floor((duration / 60000) % 60);
    var hr = Math.floor((duration / 3600000) % 24);
    var day = Math.floor(duration / 86400000);
    
    return day + "天 " + hr + "小時 " + min + "分鐘 " + sec + "秒";
}