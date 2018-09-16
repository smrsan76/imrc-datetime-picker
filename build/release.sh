#!/bin/bash
#
# ( ! ) These scripts are for author/maintainer's usage.
# 
# ( ! ) These scripts are unsafe !!!
# Please enter the necessary ones manually in bash shell.
#
set -e
echo "Enter release version: "
read -r VERSION

read -p "Releasing ${VERSION} - are you sure? (y/n)" -n 1 -r
echo
if [[ "${REPLY}" =~ ^[Yy]$ ]]; then
    echo "Releasing ${VERSION}..."

    # build
    VERSION=${VERSION} npm run build

    # release/version
    npm version --allow-same-version "${VERSION}" --message "[release] ${VERSION}"

    # commit
    git checkout "v${VERSION}"
    git add -A
    git commit -m "[build] ${VERSION}"
    git checkout master

    # publish
    git push origin "v${VERSION}"
    git push origin master
    npm publish --registry=https://registry.npmjs.org
fi