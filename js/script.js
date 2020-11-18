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
        fill_content("resource/info_eng.json");
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
        profile_section(info);
        education_intro_section(info);
        experiences_section(info);
        skills_section(info);
        activities_section(info);
    });
}

// intro section
function profile_section(info) {
        // profile
        let profile_img = create_element("div", "profile-img", _, [create_element("img", _, _, _, _, info.profile)]);
        // my name
        let main_name = create_element("span", "main", info.name + "<br>"),
            alt_name = create_element("span", "alt", info.alt_name);
        let name = create_element("span", "name", _, [main_name, alt_name]);
        // current title
        let title = create_element("span", "title", info.title);
        // links
        let urls = create_element("div", "info");
        info.urls.forEach(item => {
            let url =  create_element("i", item.icon, _, _, ["a"]);
            url.href = item.url;
            urls.appendChild(url);
        })
        // name & links
        let title_box = create_element("div", "title-box", _, [name, title, urls]);
        let name_info = create_element("div", "basic-info", _, [title_box]);
        // profile & name & links
        let intro_header = create_element("div", "header", _, [profile_img, name_info]);

        let profile = document.querySelector("#profile");
        profile.innerHTML = "" // Clear
        profile.appendChild(intro_header);
}

// education & bio introduction
function education_intro_section(info) {
    let education = education_section(info);
    let bio  = bio_section(info);
    
    // insert HTML
    let intro = document.querySelector("#intro");
    intro.innerHTML = "" // Clear
    intro.appendChild(education);
    intro.appendChild(bio);
}

// education timeline
function education_section(info) {
    let edu_timeline = create_element("div", "edu-timeline");
    let timeline_container = create_element("div", "timeline-container", _, [edu_timeline]);

    info.education.forEach((item, idx) => {
        let edu_container = create_element("div");
        if (idx == 0) {
            edu_container.classList = "container current";
        } else {
            edu_container.classList = "container before";
        }
        let content = create_element("div", "content");
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

    let education_header = create_element("h2", "header", "Education"),
        education_content = create_element("div", "content", _, [timeline_container]);

    // insert HTML
    let education = create_element("div", "education", _, [education_header, education_content]);
    return education;
}

// bio
function bio_section(info) {
    let bio_info = create_element("div", "info");
    info.bio.forEach(item => {
        let icon = create_element("i", item.icon),
            item_info = create_element("span", _, " " + item.content);
        let info_block = create_element("div", "info-block", _, [icon, item_info]);
        bio_info.appendChild(info_block);
    });
    let introduction = create_element("div", "paragraph", info.introduction);

    let bio_header = create_element("h2", "header", "Introduction"),
        bio_content = create_element("div", "content", _, [bio_info, introduction]);

    // insert HTML
    let bio = create_element("div", "bio", _, [bio_header, bio_content]);
    return bio;
}

// experiences section
function experiences_section(info) {
    let exp_header = create_element("h2", "header", "Experiences"),
        exp_content = create_element("div", "content");

    // detail information of expererience
    let exp_period = create_element("div", "period"),
        exp_supervisor = create_element("div", "supervisor"),
        exp_description = create_element("ul", "description");
    let exp_info = create_element("div", "info", _, [exp_period, exp_supervisor, exp_description]);

    // list of expereriences
    let exp_titles = create_element("div", "title-list")
    info.experiences.forEach((experience) => {
        // logo
        let logo = create_element("img", _, _, _, _, experience.logo);
        // title & organization
        let job_title = create_element("span", _, experience.title + "<br>");
        let organization = create_element("span", _, experience.organization);
        let title = create_element("div", "title", _, [job_title, organization]);
        // append title & logo to title-list
        let exp_block = create_element("div", "item", _, [logo, title]);
        exp_titles.appendChild(exp_block);

        // show info when hover on experience blocks
        exp_block.addEventListener("mouseenter", function () {
            show_exp_info(getIndex(this));
        });
    });
    let exp_items = Array.from(exp_titles.children);
    show_exp_info(0);

    exp_content.appendChild(exp_titles); // left part in experiences section
    exp_content.appendChild(exp_info); // right part in experiences section

    let exp = document.querySelector("#exp");
    exp.innerHTML = "" // Clear
    exp.appendChild(exp_header);
    exp.appendChild(exp_content);
    
    
    // show experience detail information
    function show_exp_info(idx) {
        // show hover background
        exp_items.forEach((item) => { 
            item.style.background = "inherit";
        });
        exp_items[idx].style.background = "#364f6b33";

        // show information
        let experience = info.experiences[idx];
        exp_period.innerHTML = "<i>" + experience.period + "</i>";
        exp_supervisor.innerHTML = experience.supervisor;
        exp_description.innerHTML = '';
        experience.description.forEach((item)=>{
            let li = document.createElement("li");
            li.innerHTML = item;
            exp_description.appendChild(li);
        });
    }
}

// skills section
function skills_section(info) {
    let skills_header = create_element("h2", "header", "Skills"),
        skills_content = create_element("div", "content");

    let skills_details = create_element("div", "details");    
    for(key in info.skills) {
        if(key != "level") {
            let icon = create_element("i", info.skills[key].icon),
                header_text = create_element("span", _, " " + key.replace('_', ' '))
                header = create_element("h3", _, _, [icon, header_text]);
            let skills_details_content = create_element("div", _, _, [header]),
                myskills = create_element("div", _, info.skills[key].content);
            skills_details_content.appendChild(myskills);

            skills_details.appendChild(skills_details_content);
        }
    }
    skills_content.appendChild(skills_details);

    // FIXME: simplebar loaded twice in /js/master.js and here
    // scroller
    require(["https://unpkg.com/simplebar@latest/dist/simplebar"], function(SimpleBar) {
        new SimpleBar(skills_details);
    });

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
function activities_section(info) {    
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

// get current position among children
function getIndex(node) {
    let idx = Array.from(node.parentNode.children).indexOf(node);
    return idx;
}