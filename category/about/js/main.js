$(document).ready(function()
{
    function msToTime(duration) {
        var sec = Math.floor((duration / 1000) % 60);
        var min = Math.floor((duration / 60000) % 60);
        var hr = Math.floor((duration / 3600000) % 24);
        var day = Math.floor(duration / 86400000);
        
        return day + "天 " + hr + "小時 " + min + "分鐘 " + sec + "秒";
    }

    var start = new Date(2018, 5, 24);

    $(".running-time").text(msToTime(new Date - start));
    setInterval(function(){
        $(".running-time").text(msToTime(new Date - start));
    }, 1000);
});