@REM fetch react-components repo
git submodule add https://github.com/pm25/react-components src/components
git submodule add https://github.com/pm25/home src/home
git submodule add https://github.com/pm25/article src/article
git submodule add https://github.com/pm25/project src/project
git pull --recurse-submodules

@REM install packages
del package.json
COPY src\components\package.json package.json
npm install