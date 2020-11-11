window.addEventListener("DOMContentLoaded", main);

function main() {
    read_file("data/list.json", function (content) {
        var data = JSON.parse(content);
        for (let i = 0; i < data.length; i++) {
            let url = data[i].url,
                finish_date = data[i].date,
                github_url = data[i].github;

            let frame = document.createElement("a");
            frame.href = url;
            frame.target = "_blank";

            let date = document.createElement("span");
            date.classList.add("project-date");
            let month_day = document.createElement("div");
            month_day.classList.add("month-day");
            month_day.innerHTML = finish_date.split("-")[0];
            date.appendChild(month_day);
            let year = document.createElement("div");
            year.classList.add("year");
            year.innerHTML = finish_date.split("-")[1];
            date.appendChild(year);

            let title = document.createElement("span");
            title.classList.add("project-title");
            title.innerHTML = get_title(github_url);
            frame.appendChild(date);
            frame.appendChild(title);

            document.querySelector("#projects").appendChild(frame);
        }
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

function get_title(github_url) {
    let paths = github_url.split("/");
    let title = paths[paths.length - 1];
    title = title.replace(/---/g, " _ ");
    title = title.replace(/-/g, " ");
    title = title.replace(/_/g, "-");

    return title;
}
