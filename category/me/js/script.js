window.addEventListener("DOMContentLoaded", main);

const _ = undefined;

// start from here
function main() {
    console.log("*executing main()");
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
    const _ = undefined;
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

        // skills
        let skills_programming = document.querySelector("#skills-programming"),
            skills_tools = document.querySelector("#skills-tools"),
            skills_others = document.querySelector("#skills-others"); 
        
        let programming_skills = document.createElement("div");
        programming_skills.innerHTML = info.skills.programming_languages;
        skills_programming.append(
            programming_skills    
        );
        skills_tools.append(
            info.skills.tools
        );
        skills_others.append(
            info.skills.others
        );

        // activities
        let activities = document.querySelector("#activities");
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
            activities.append(item_block);
        });

        // show activities description & image
        function show_activities_info(node) {
            node.querySelector("img").style.display = "block";

            Array.from(activities.children).forEach((item) => {
                item.style.boxShadow = "none";
            });
            node.style.boxShadow =
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
        }
    });

    // get current position among children
    function getIndex(node) {
        let idx = Array.from(node.parentNode.children).indexOf(node);
        return idx;
    }
}

// fill publications section with information in {fname.bib} file
function fill_bibliography(fname) {
    read_file(fname, (bibtex)=>{
        // transform bibtex format to json 
        let bibjson = bibtex.replace(/(\w+)\s*=\s*\{/g, "\"$1\": \"")
          .replace(/\}(?=\s*[,\}])/g, "\"")
          .replace(/@(\w+)\s*\{([^,]*)/g, ",{\"$1\": \"$2\"");

        // remove first ',' and turn it into a list
        bibjson = '[' + bibjson.substring(1) + ']';
        let bibobj = JSON.parse(bibjson);
        
        let publications = document.querySelector("#publications");
        let counter = 0
        bibobj.forEach((publication) => {
            counter += 1

            // preprocessing authors name and make my name bold
            let authors = []
            publication.author.split('and').forEach((author) => {
                let name = author.split(',');
                let first_name = name[1].trim(),
                    last_name = name[0].trim();
                name = first_name + " " + last_name;
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
                        if(key == "booktitle") publication[key] = "<i>" + publication.journal + "</i>";
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
            publications.appendChild(publication_block);
        });
    });
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