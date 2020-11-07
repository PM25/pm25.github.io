doc_ready(main);

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

const _ = undefined;

// require.config({
//     paths: {
//         // simplebar: "https://unpkg.com/simplebar@latest/dist/simplebar",
//         // gtm: "https://www.googletagmanager.com/gtag/js?id=UA-129342449-2",
//         // common: "/js/common",
//         master: "/js/master",
//         // ga: "/js/ga"
//     },
// });

// require(["master"], function (data) {
//     // main();
// });

// start from here
function main() { 
    
    console.log("*executing script.js: main()");
    // english page or chinese page
    let url = new URL(window.location.href),
        lang = url.searchParams.get("lang");

    if (lang == "en") {
        // fill website content with info.json
        fill_content("resource/info_eng.json");
    } else if (lang == "ch") {
        fill_content("resource/info_chi.json");
    } else {
        fill_content("resource/info_chi.json");
    }
    fill_bibliography("resource/publications.bib");
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
                show_exp_info(getIndex(this));
            });
        });

        let exp_items = Array.from(exp_titles.children);
        show_exp_info(0);

        function show_exp_info(idx) {
            // show hover background
            exp_items.forEach((item) => { 
                item.style.background = "inherit";
            });
            exp_items[idx].style.background = "#364f6b33";
            
            // show information
            let experience = info.experiences[idx];
            exp_period.innerHTML = "<i>" + experience.period + "</i>";
            exp_description.innerHTML = '';
            experience.description.forEach((item)=>{
                let li = document.createElement("li");
                li.innerHTML = item;
                exp_description.appendChild(li);
            });
        }

        skills(info);
        activities(info);
    });

    // get current position among children
    function getIndex(node) {
        let idx = Array.from(node.parentNode.children).indexOf(node);
        return idx;
    }
}

// skills section
function skills(info) {
    let skills_header = create_element("h2", "header", "Skills"),
        skills_content = create_element("div", "content");

    let skills_details = create_element("div", "details");    
    for(key in info.skills) {
        if(key != "level") {
            let header = key.replace('_', ' ');
            let skills_details_content = create_element("h3", _, header, _, ["div"]),
                myskills = create_element("div", _, info.skills[key]);
            skills_details_content.appendChild(myskills);

            skills_details.appendChild(skills_details_content);
        }
    }
    skills_content.appendChild(skills_details);

    // skills level progress bar
    let progress_bar = create_element("ul");
    info.skills.level.forEach(item => {
        let logo = create_element("div", "logo-wrapper", _, [create_element("img", _, _, _, _, item.image)]);
        let name = create_element("span", _, item.name);
        let progess_bar = create_element("div", "progress-bar-fill")
        progess_bar.style = "width: " + item.percentage + "%";
        progess_bar = create_element("div", "progress-bar", _, [progess_bar]);
        let li = create_element("li", _, _, [logo, name, progess_bar]);
        progress_bar.appendChild(li);
    });
    skills_content.appendChild(progress_bar);

    let skills = document.querySelector("#skills");
    skills.innerHTML = "";
    skills.appendChild(skills_header);
    skills.appendChild(skills_content);

    // Show animation when scroll to skills section
    let win_height = window.innerHeight;
    window.addEventListener("scroll", function () {
        let current_pos = window.scrollY,
            skills_section_pos =
                document.querySelector("#skills").offsetTop - win_height;
        if (current_pos > skills_section_pos) {
            document
                .querySelector("#skills .content")
                .querySelectorAll(".progress-bar-fill")
                .forEach((bar) => {
                    bar.style.transform = "scaleX(1)";
                });
        } else {
            document
                .querySelector("#skills .content")
                .querySelectorAll(".progress-bar-fill")
                .forEach((bar) => {
                    bar.style.transform = "scaleX(0)";
                });
        }
    });
}

// activities section
function activities(info) {    
    let activities_header = create_element("h2", "header", "Activities"),
        activities_content = create_element("div", "content");

    info.activities.forEach(item => {
        let title_block = create_element("div", "title", item.title);

        let map_icon = create_element("span", "fa fa-map-marker-alt icons");
        let location_block = create_element("div", _, _, [map_icon, item.location]),
            time_block = create_element("i", _, item.time);
        let info_block = create_element("div", "info", _, [location_block, time_block]);
        
        let img_block = create_element("img", _, _, _, ["div"], item.image);

        let item_block = create_element("div", "item", _, [title_block, info_block, img_block]);
        item_block.addEventListener("click", function () {
            show_activities_info(this);
        });

        activities_content.append(item_block);
    });

    let activities = document.querySelector("#activities");
    activities.innerHTML = "" // Clear
    activities.appendChild(activities_header);
    activities.appendChild(activities_content);

    // show activities description & image
    function show_activities_info(node) {
        node.querySelector("img").style.display = "block";

        Array.from(activities.children).forEach((item) => {
            item.style.boxShadow = "none";
        });
        node.style.boxShadow =
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
    }
}

// fill publications section with information in {fname.bib} file
function fill_bibliography(fname) {
    read_file(fname, (bibtex)=>{
        let bibobj = parse_latex(bibtex);
        
        let publications_header = create_element("h2", "header", "Publications"),
            publications_content = create_element("div", "content");
        
        let counter = 0
        bibobj.forEach((publication) => {
            counter += 1

            // preprocessing authors name and make my name bold
            let authors = []
            publication.author.split('and').forEach((author) => {
                let name = author.split(',');
                if(name.length > 1) {
                    let first_name = name[1].trim(),
                    last_name = name[0].trim();
                    name = first_name + " " + last_name;
                }
                if(name == "Pin-Yen Huang") name = "<b>" + name + "</b>";
                authors.push(name);
            });
            if(authors.length >= 2) {
                authors[authors.length - 2] = authors[authors.length - 2] + " and " + authors[authors.length - 1];
                authors.pop();
            } 

            let citation = [];
            if("inproceedings" in publication) {
                ["author", "title", "booktitle", "year", "pages"].forEach((key)=>{
                    if(key in publication) {
                        if(key == "author") publication[key] = authors.join(', ');
                        if(key == "title") publication[key] = '"' + publication.title + '"';
                        if(key == "booktitle") publication[key] = "<i>" + publication.booktitle + "</i>";
                        if(key == "volume") publication[key] = "vol. " + publication.volume;
                        if(key == "number") publication[key] = "no. " + publication.number;
                        if(key == "pages") publication[key] = "pp. " + publication.pages.replace("--", "-");

                        citation.push(publication[key]);
                    }
                });
            } else if("article" in publication) {
                ["author", "title", "journal", "year", "volume", "number", "pages"].forEach((key)=>{
                    if(key in publication) {
                        if(key == "author") publication[key] = authors.join(', ');
                        if(key == "title") publication[key] = '"' + publication.title + '"';
                        if(key == "journal") publication[key] = "<i>" + publication.journal + "</i>";
                        if(key == "volume") publication[key] = "vol. " + publication.volume;
                        if(key == "number") publication[key] = "no. " + publication.number;
                        if(key == "pages") publication[key] = "pp. " + publication.pages.replace("--", "-");

                        citation.push(publication[key]);
                    }
                });
            } else {
                counter -= 1;
                console.log('*Unsupported bibtex format.')
                return;
            }
            citation = citation.join(", ");
            citation = "[" + counter + "] " + citation;
            
            let publication_block = create_element("a", _, citation)
            if("url" in publication) publication_block.href = publication.url;
            publications_content.appendChild(publication_block);
        });

        let publications = document.querySelector("#publications");
        publications.innerHTML = "" // Clear
        publications.appendChild(publications_header);
        publications.appendChild(publications_content);
    });

    // transform bibtex format to json 
    function parse_latex(bibtex) {
        let bibjson = bibtex.replace(/(\w+)\s*=\s*\{/g, "\"$1\": \"")
          .replace(/\}(?=\s*[,\}])/g, "\"")
          .replace(/@(\w+)\s*\{([^,]*)/g, ",{\"$1\": \"$2\"");

        // remove first ',' and turn it into a list
        bibjson = '[' + bibjson.substring(1) + ']';
        let bibobj = JSON.parse(bibjson);

        return bibobj;
    }
}

// create HTML element
function create_element(type, classlist=null, innerHTML=null, append=null, wrapped=null ,src=null) {
    let element = document.createElement(type);
    if(classlist != null) element.classList = classlist;
    if(innerHTML != null) element.innerHTML = innerHTML;
    if(src != null) element.src = src;
    // append elements
    if(append != null) { 
        append.forEach(item => {
            element.append(item);
        })
    }; 
    // wrapped with elements
    if(wrapped != null) {
        wrapped.forEach(type => {
            let container = document.createElement(type);
            container.appendChild(element);
            element = container;
        });
    }
    return element;
}