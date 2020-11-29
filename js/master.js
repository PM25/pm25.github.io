require.config({
    paths: {
        simplebar: "https://unpkg.com/simplebar@latest/dist/simplebar",
        gtm: "https://www.googletagmanager.com/gtag/js?id=UA-129342449-2",
    },
});

require(["https://unpkg.com/simplebar@5.3.0/dist/simplebar.min.js", "common", "gtm", "ga"], function () {
    console.log("all js files loaded!");
});
