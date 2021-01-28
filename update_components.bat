git submodule update --init --recursive
git pull
git submodule foreach --recursive git checkout master
git submodule foreach --recursive git pull