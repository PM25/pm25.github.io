window.addEventListener("DOMContentLoaded", main);

// start from here
function main() {
    // english page or chinese page
    let url = new URL(window.location.href),
        lang = url.searchParams.get("lang");

    if (lang == "en") {
        // fill website content with info.json
        fill_content("/category/me/resource/info_eng.json");
    } else if (lang == "ch") {
        fill_content("/category/me/resource/info_chi.json");
    } else {
        fill_content("/category/me/resource/info_chi.json");
    }

    // // Show Experiences
    // let experiences = document.querySelector("#exp"),
    //     exp_infos = experiences.querySelectorAll(".info"),
    //     exp_items = experiences.querySelectorAll(".item");

    // show_exp_info(0);
    // exp_items.forEach(function (item) {
    //     item.addEventListener("mouseover", function () {
    //         show_exp_info(getIndex(this));
    //     });
    // });

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

// read external files
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

// fill website content with information in {fname.json} file
function fill_content(fname) {
    read_file(fname, function (content) {
        let info = JSON.parse(content);

        // my name
        let header = document.querySelector("#header"),
            main_name = header.querySelector(".name .main"),
            alt_name = header.querySelector(".name .alt");

        main_name.innerHTML = info.name;
        alt_name.innerHTML = info.alt_name;

        // links
        let linkedin_url = document.querySelector("#linkedin"),
            googlescholar_url = document.querySelector("#googlescholar"),
            cv_url = document.querySelector("#cv"),
            github_url = document.querySelector("#github"),
            facebook_url = document.querySelector("#facebook");

        linkedin_url.href = info.url.linkedin;
        googlescholar_url.href = info.url.googlescholar;
        cv_url.href = info.url.cv;
        github_url.href = info.url.github;
        facebook_url.href = info.url.facebook;

        // bio info
        let residence = document.querySelector("#residence"),
            hometown = document.querySelector("#hometown"),
            birthplace = document.querySelector("#birthplace"),
            email = document.querySelector("#email"),
            email_url = document.querySelector("#email_url"),
            introduction = document.querySelector("#introduction");

        residence.innerHTML = info.residence;
        hometown.innerHTML = info.hometown;
        birthplace.innerHTML = info.birthplace;
        email.innerHTML = info.email;
        email_url.href = "mailto:" + info.email;
        introduction.innerHTML = info.introduction;

        // create education-timeline blocks
        let edu_timeline = document.querySelector("#edu-timeline");
        info.education.forEach((item, idx) => {
            let edu_container = document.createElement("div");
            if (idx == 0) {
                edu_container.classList = "container current";
            } else {
                edu_container.classList = "container before";
            }
            let content = document.createElement("div");
            content.classList = "content";
            edu_container.appendChild(content);

            let school = document.createElement("div");
            school.classList = "school";
            let logo = document.createElement("img");
            logo.src = item.logo;
            let school_name = document.createElement("span");
            school_name.innerHTML = item.school;
            school.appendChild(logo);
            school.appendChild(school_name);

            content.appendChild(school);

            let major = document.createElement("div");
            major.classList = "major";
            let department = document.createElement("span");
            department.innerHTML = item.degree + ", " + item.department;
            let period = document.createElement("span");
            period.innerHTML = "<br>" + item.period;
            major.appendChild(department);
            major.appendChild(period);

            content.appendChild(major);

            edu_timeline.appendChild(edu_container);
        });

        // experiences
        let exp_period = document.querySelector("#exp-period"),
            exp_description = document.querySelector("#exp-description"),
            exp_titles = document.querySelector("#exp > .title-list");
        info.experiences.forEach((experience) => {
            let exp_block = document.createElement("div");
            exp_block.classList = "item";
            
            // logo
            let logo = document.createElement("img");
            logo.src = experience.logo;
            // title & organization
            let title = document.createElement("div");
            title.classList = "title";
            let job_title = document.createElement("span");
            job_title.innerHTML = experience.title + "<br>";
            let organization = document.createElement("span");
            organization.innerHTML = experience.organization;
            title.appendChild(job_title);
            title.appendChild(organization);

            // append title & logo to title-list
            exp_block.appendChild(logo);
            exp_block.appendChild(title);
            exp_titles.appendChild(exp_block);

            // show info when hover on experience blocks
            exp_block.addEventListener("mouseenter", function () {
                show_exp_bg(getIndex(this));
                exp_block.style.background = "#364f6b33";
                exp_period.innerHTML = "<i>" + experience.period + "</i>";
                exp_description.innerHTML = '';
                experience.description.forEach((item)=>{
                    let li = document.createElement("li");
                    li.innerHTML = item;
                    exp_description.appendChild(li);
                });
            });
        });

        let exp_items = Array.from(exp_titles.children);

        function show_exp_bg(idx) {
            exp_items.forEach((item) => { 
                item.style.background = "inherit";
            });
            exp_items[idx].style.background = "#364f6b33";
        }
    });

    // Functions
    function getIndex(node) {
        let idx = Array.from(node.parentNode.children).indexOf(node);
        return idx;
    }
}
