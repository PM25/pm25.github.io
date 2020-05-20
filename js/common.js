window.addEventListener("load", load_html);

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
