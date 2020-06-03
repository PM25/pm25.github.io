window.addEventListener("DOMContentLoaded", main);

const PagesPerScreen = 5;
var page = 0;
var max_page = 0;

function main() {
    read_file("/articles/links.json", function (content) {
        let data = JSON.parse(content);
        max_page = Math.ceil(data.length / PagesPerScreen);

        page = get_index();
        load_blocks(data, page);

        let prev_btns = document.querySelectorAll(".prev");
        prev_btns.forEach(function (btn) {
            btn.addEventListener("click", function () {
                if (page - 1 >= 0) {
                    load_blocks(data, --page);
                }
            });
        });

        let next_btns = document.querySelectorAll(".next");
        next_btns.forEach(function (btn) {
            btn.addEventListener("click", function () {
                if (page + 1 < max_page) {
                    load_blocks(data, ++page);
                }
            });
        });
    });
}
function read_file(fpath, callback) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", fpath, true);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status == "200") {
            callback(this.responseText);
        }
    };
    xmlhttp.send();
}

function get_link(title) {
    let md_fname = title.replace(/ /g, "-"),
        md_fpath = "/articles/?id=" + md_fname.toLowerCase();

    return md_fpath;
}

function get_index() {
    let url = new URL(window.location.href),
        index = url.searchParams.get("idx");
    if (index == null) index = 0;

    return parseInt(index, 10);
}

function load_blocks(data, page) {
    // Clear Existing Blocks
    document.querySelector("#article-blocks").innerHTML = "";

    // Load Blocks
    for (
        let i = page * PagesPerScreen;
        i < (page + 1) * PagesPerScreen && i < data.length;
        ++i
    ) {
        let title = data[i].title,
            create_date = data[i].date;

        let block = document.createElement("div");

        let title_link = document.createElement("a");
        title_link.href = get_link(title);
        title_link.target = "_blank";
        title_link.innerHTML = title;

        let date = document.createElement("span");
        date.classList.add("date");
        date.innerHTML = create_date;

        let preview = document.createElement("p");
        preview.classList.add("preview");
        preview.innerHTML = "...";

        block.appendChild(title_link);
        block.appendChild(date);
        block.appendChild(preview);

        document.querySelector("#article-blocks").appendChild(block);
    }

    // Update Pages Information
    document.querySelector("#articles .info").innerHTML =
        "Page " + (page + 1) + " of " + max_page;
}
