#!/bin/bash
#
# ( ! ) Before execution, please make sure you've
# cloned the 'gh-pages' branch into
# '/path/to/repo/js.org' folder.
#

bash build/clean-docs.sh

webpack -p --config ./webpack.config.doc.babel.js --env=production

#
# ( ! ) After the last execution, please make sure
# you've added all new doc files into 'gh-pages'
# branch.
#
# e.g. Execute these commands in bash:
# ====================================
# cd ./js.org
# git add .
# git commit -m "commit message..."
# git push
# ====================================
#