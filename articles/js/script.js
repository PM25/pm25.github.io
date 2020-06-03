window.addEventListener("DOMContentLoaded", main);

function main() {
    let url = new URL(window.location.href),
        id = url.searchParams.get("id");

    let title = id.replace(/-/g, " ");
    document.querySelector("#header .title").innerHTML = title;
    document.title = title;

    let md_fpath = "md/" + id.toLowerCase() + ".md";
    get_file(md_fpath, function (md) {
        let html = marked(md);
        document.querySelector("#blog").innerHTML = html;
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
