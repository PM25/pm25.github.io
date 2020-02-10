require.config({
  paths: {
    jquery: "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min",
    simplebar: "https://unpkg.com/simplebar@latest/dist/simplebar",
    gtm: "https://www.googletagmanager.com/gtag/js?id=UA-129342449-2",
    firebase: "https://www.gstatic.com/firebasejs/6.4.1/firebase"
  },
  him: {
    common: {
      deps: ["jquery"]
    }
  }
});

require(["jquery", "simplebar", "common", "gtm", "ga"], function($) {
  $(function() {
    main();
    console.log("all js files loaded!");
  });
});

// Main function
function main() {
  show_exp_info(0);
  $("#exp .item").mouseover(function() {
    var idx = $("#exp .item").index(this);
    show_exp_info(idx);
  });

  $("#activities .item").click(function() {
    show_activities_info($(this));
  });

  $win_height = $(window).height();
  $(window).scroll(function() {
    if ($(document).scrollTop() > $("#skills").offset().top - $win_height) {
      $("#skills .progress-bar-fill").css("transform", "scaleX(1)");
    } else {
      $("#skills .progress-bar-fill").css("transform", "scaleX(0)");
    }
  });

  function show_exp_info(idx) {
    $("#exp .info").css("display", "none");
    $("#exp .info")
      .eq(idx)
      .css("display", "block");

    $("#exp .item").css("background", "inherit");
    $("#exp .item")
      .eq(idx)
      .css("background", "#364f6b33");
  }

  function show_activities_info($this) {
    $("#activities .item img").css("display", "none");
    $this.find("img").css("display", "block");

    $("#activities .item").css("box-shadow", "none");
    $this.css(
      "box-shadow",
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    );
  }
}
