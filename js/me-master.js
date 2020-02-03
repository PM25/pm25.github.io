require.config({
  paths: {
    jquery: "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min",
    simplebar: "https://unpkg.com/simplebar@latest/dist/simplebar"
  },
  him: {
    common: {
      deps: ["jquery"]
    }
  }
});

require(["jquery", "simplebar", "common"], function($) {
  $(function() {
    main();
    console.log("all js files loaded!");
  });
});

// Main function
function main() {
  show(0);
  $("#exp .title").mouseover(function() {
    var idx = $("#exp .title").index(this);
    show(idx);
  });

  function show(idx) {
    $("#exp .info").css("display", "none");
    $("#exp .info")
      .eq(idx)
      .css("display", "block");

    $("#exp .title").css("background", "inherit");
    $("#exp .title")
      .eq(idx)
      .css("background", "#364f6b33");
  }
}
