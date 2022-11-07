# Release Steps 

## Pre-Commit
* update package.json with new version
* update Changelog with version details
* update Readme version number in links

## Commit and tag
    git commit -m "version details"
    git push origin master
    git tag -am "version details" v2.0.2
    git push --tags

## Packaging Binaries
    npm pack
    gunzip sutton-signwriting-font-db-2.0.2.tgz
    tar -xvf sutton-signwriting-font-db-2.0.2.tar
    mv package sutton-signwriting-font-db-2.0.2
    zip -r sutton-signwriting-font-db-2.0.2.zip sutton-signwriting-font-db-2.0.2
    tar -zcvf sutton-signwriting-font-db-2.0.2.tar.gz sutton-signwriting-font-db-2.0.2

## Create Github Release
* Go to https://github.com/sutton-signwriting/font-db/tags
* Create release from Tag
* Upload .ZIP and .TAR.GZ
* Publish

## NPM Publish
    npm publish --access public
