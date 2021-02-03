@REM fetch react-components repo
git submodule add https://github.com/pm25/react-components src/components
git pull --recurse-submodules

@REM install packages
del package.json
COPY src\components\package.json package.json
npm install