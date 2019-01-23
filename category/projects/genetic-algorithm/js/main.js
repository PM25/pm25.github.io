$(function() {
    function check_hit(x1, y1, x2, y2){
        if((x1 == x2) || (y1 == y2)) return true;
        else if(Math.abs(x2-x1) == Math.abs(y2-y1)) return true;
        else return false;
    }

    function fitness(seq){
        var len = seq.length;
        nonattack_pair = 0;

        for(i=0; i<len; ++i){
            for(other=0; other<len; ++other){
                if(!check_hit(i, seq[i], other, seq[other])){
                    nonattack_pair += 1;
                }
            }
        } nonattack_pair /= 2;

        return nonattack_pair;
    }

    function goal_score(seq){
        var queen_count = seq.length;
        return (queen_count * (queen_count-1)) / 2;
    }

    function create_chessboard(seq){
        var size = seq.length;
        var width = $("#chessboard").width();
        var unit = width / size;
        var canvas = document.getElementById("chessboard");
        var ctx = canvas.getContext("2d");
        var queen_img = document.getElementById("queen-img");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for(row=0; row<size; ++row){
            for(col=0; col<size; ++col){
                if((row+col)%2){
                    ctx.fillStyle = "#888888";
                    ctx.fillRect(col*unit, row*unit, unit, unit);
                }
                if(seq[col] == row){
                    ctx.drawImage(queen_img, col*unit, row*unit, unit, unit);
                }
            }
        }
    }

    $("#confirm-btn").click( function(){
        var seq_str = $("#input-seq").val();
        var seq = seq_str.split(",").map(Number);
        $("#result span").empty();
        $("#error-msg").empty();
        if(seq_str == ""){
            $("#error-msg").append("*Please at least enter a number!");
            return;
        }
        $("#result").css("display", "block");

        $("#show-seq").append(seq_str);
        $("#show-info").append(seq.length);
        $("#show-goal").append(goal_score(seq));
        $("#show-score").append(fitness(seq));
        if(goal_score(seq) == fitness(seq)) $("#show-isans").append("Yes");
        else  $("#show-isans").append("No");
        create_chessboard(seq);
        $("#input-seq").val("");
    });
});