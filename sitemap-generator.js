require("babel-register")({
    presets: ["es2015", "react"],
});

const fetch = require("node-fetch").default;
const router = require("./sitemap-routes").default;
const Sitemap = require("react-router-sitemap").default;
const projectList = require("./src/project/source/list.json");

async function generateSitemap() {
    fetch("https://pm25.github.io/my-articles/index.json")
        .then((res) => res.json())
        .then(
            (articleList) => {
                let articleIdMap = [];
                for (let article_title in articleList) {
                    articleIdMap.push({ id: article_title.replace(/ /g, "-") });
                } // console.log(articleIdMap)

                let projectIdMap = projectList
                    .filter((project) => {
                        let splittedPath = project.url.split("/");
                        let rootPath = splittedPath[splittedPath.length - 2];
                        if (rootPath === "pm25.github.io") {
                            return true;
                        } else {
                            return false;
                        }
                    })
                    .map((project, key) => {
                        let splittedPath = project.url.split("/");
                        let path = splittedPath[splittedPath.length - 1];
                        return { path: path };
                    });

                const paramsConfig = {
                    "/#/article/:id": articleIdMap,
                    "/:path": projectIdMap,
                };

                return new Sitemap(router)
                    .applyParams(paramsConfig)
                    .build("https://pm25.github.io")
                    .save("./public/sitemap.xml");
            },
            (error) => {
                console.log(error);
            }
        );
}

generateSitemap();
