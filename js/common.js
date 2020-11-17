doc_ready(load_html);

function doc_ready(fn) {
    // see if DOM is already available
    if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
    ) {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

function load_html() {
    let includes = document.querySelectorAll("[data-include]"),
        count = includes.length;

    includes.forEach((include) => {
        let value = include.getAttribute("data-include"),
            fpath = "/html/" + value + ".html";
        // After loading all externel HTML files then load common-main.js
        get_file(fpath, (data) => {
            include.innerHTML = data;

            if (--count == 0) {
                main();
            }
        });
    });
}

function get_file(fpath, callback) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", fpath, true);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status == "200") {
            callback(this.responseText);
        }
    };
    xmlhttp.send();
}

function main() {
    sidenav();
    toolbar();
    new language();
}

function sidenav() {
    let sidenav = document.querySelector("#side-nav");
    let sidenav_btns = document.querySelectorAll(".sidenav-btn");

    let ripple_effect = document.createElement("div");
    ripple_effect.classList.add("ripple-effect");

    sidenav_btns.forEach(function (sidenav_btn) {
        sidenav_btn.addEventListener("mousedown", function () {
            sidenav_btn.appendChild(ripple_effect);
        });
        sidenav_btn.addEventListener("mouseup", function () {
            setTimeout(function () {
                sidenav_btn.removeChild(ripple_effect);
                sidenav.classList.toggle("show-sidenav");

                // Fixed problem that cursor will change to default after sidenav-btn clicked.
                sidenav.classList.add("btn");
                setTimeout(function () {
                    sidenav.classList.remove("btn");
                }, 500);
            }, 150);
        });
    });

    document.querySelector("main").addEventListener("click", function () {
        sidenav.classList.remove("show-sidenav");
    });
}

// toolbar button: show or hide toolbar
function toolbar() {
    let toolbar_btn = document.querySelector("#toolbar-btn"),
        toolbar_btn_icon = toolbar_btn.querySelector(".icons");
    let toolbar = document.querySelectorAll(".toolbar");
    toolbar_btn.addEventListener("click", function() {
        toolbar.forEach(btn => {btn.classList.toggle("toolbar")});
        toolbar_btn_icon.classList.toggle("fa-caret-right");
        toolbar_btn_icon.classList.toggle("fa-caret-left");
    });
}

// language button
function language() {
    if (typeof fill_content === "function") {
        let url = new URL(window.location.href),
            lang = url.searchParams.get("lang");

        if(lang == "ch") {
            fill_content("resource/info_chi.json");
        } else if (lang == "en") {
            fill_content("resource/info_eng.json");
        } else {
            let prefer_lang = default_language();
            if(prefer_lang.indexOf('zh') < prefer_lang.indexOf('en')) {
                fill_content("resource/info_chi.json");
            } else {
                fill_content("resource/info_eng.json");
            }
        }
    }

    let language_btn = document.querySelector("#language-btn");
    language_btn.addEventListener("click", function() {
        if (typeof fill_content === "function") {
            // window.location.replace('?lang=en');
            if(language_btn.classList.contains("active")) {
                fill_content("resource/info_eng.json");
            } else {
                fill_content("resource/info_chi.json");
            }
            language_btn.classList.toggle("active");
        } else if (typeof fill_content === "undefined") {
            console.log("*function: fill_content() has not loaded yet.");
        }
    });
}

// get browser default preference language
function default_language() {
    let lang = window.navigator.languages ? window.navigator.languages : null;
    lang = lang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;

    let prefer_lang = [];
    lang.forEach((short_lang)=>{
        if (short_lang.indexOf('-') !== -1)
        short_lang = short_lang.split('-')[0];
        if (short_lang.indexOf('_') !== -1)
            short_lang = short_lang.split('_')[0];

        if(prefer_lang.indexOf(short_lang) === -1) {
            prefer_lang.push(short_lang);
        }
    });
    
    return prefer_lang;
}