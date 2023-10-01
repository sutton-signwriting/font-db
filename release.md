# Release Steps 

## Pre-Commit
* update package.json with new version
* update Changelog with version details
* npm run docs

## Commit and tag
    git add ...
    git commit -m "version details"
    git push origin master
    git tag -am "version details" v2.0.4
    git push --tags

## Packaging Binaries
    npm pack
    gunzip sutton-signwriting-font-db-2.0.4.tgz
    tar -xvf sutton-signwriting-font-db-2.0.4.tar
    mv package sutton-signwriting-font-db-2.0.4
    zip -r sutton-signwriting-font-db-2.0.4.zip sutton-signwriting-font-db-2.0.4
    tar -zcvf sutton-signwriting-font-db-2.0.4.tar.gz sutton-signwriting-font-db-2.0.4

## Create Github Release
* Go to https://github.com/sutton-signwriting/font-db/tags
* Create release from Tag
* Upload .ZIP and .TAR.GZ
* Publish

## NPM Publish
    npm publish --access public
