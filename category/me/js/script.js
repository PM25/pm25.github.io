window.addEventListener("load", main);

function main() {
    // Show Experiences
    let experiences = document.querySelector("#exp"),
        exp_infos = experiences.querySelectorAll(".info"),
        exp_items = experiences.querySelectorAll(".item");

    show_exp_info(0);
    exp_items.forEach(function (item) {
        item.addEventListener("mouseover", function () {
            show_exp_info(getIndex(this));
        });
    });

    // Show Activities
    let activities = document.querySelector("#activities"),
        activities_item = activities.querySelectorAll(".item");
    activities_item.forEach(function (item) {
        item.addEventListener("click", function () {
            show_activities_info(this);
        });
    });

    // Show animation when scroll to skills section
    let win_height = window.innerHeight;
    window.addEventListener("scroll", function () {
        let current_pos = window.scrollY,
            skills_section_pos =
                document.querySelector("#skills").offsetTop - win_height;
        if (current_pos > skills_section_pos) {
            document
                .querySelector("#skills")
                .querySelectorAll(".progress-bar-fill")
                .forEach((bar) => {
                    bar.style.transform = "scaleX(1)";
                });
        } else {
            document
                .querySelector("#skills")
                .querySelectorAll(".progress-bar-fill")
                .forEach((bar) => {
                    bar.style.transform = "scaleX(0)";
                });
        }
    });

    // Functions
    function getIndex(node) {
        let idx = Array.from(node.parentNode.children).indexOf(node);
        return idx;
    }

    function show_exp_info(idx) {
        exp_items.forEach((item) => {
            item.style.background = "inherit";
        });
        exp_infos.forEach((info) => {
            info.style.display = "none";
        });

        exp_items[idx].style.background = "#364f6b33";
        exp_infos[idx].style.display = "block";
    }

    function show_activities_info(node) {
        node.querySelector("img").style.display = "block";

        activities_item.forEach((item) => {
            item.style.boxShadow = "none";
        });
        node.style.boxShadow =
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
    }
}
