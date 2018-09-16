#!/bin/bash
#
# ( ! ) Before execution, please make sure you've
# cloned the 'gh-pages' branch into
# '/path/to/repo/js.org' folder.
#
# Go to js.org folder (for 'gh-pages' branch)
cd ./js.org

rm -rf *
git rm -rf --cached *
cp ../CNAME ./CNAME
# git fetch
# git checkout origin/gh-pages -- ./CNAME

# Go back to main repo folder
cd ..