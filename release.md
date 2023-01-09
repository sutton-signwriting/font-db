# Release Steps 

## Pre-Commit
* update package.json with new version
* update Changelog with version details

## Commit and tag
    git commit -m "version details"
    git push origin master
    git tag -am "version details" v2.0.3
    git push --tags

## Packaging Binaries
    npm pack
    gunzip sutton-signwriting-font-db-2.0.3.tgz
    tar -xvf sutton-signwriting-font-db-2.0.3.tar
    mv package sutton-signwriting-font-db-2.0.3
    zip -r sutton-signwriting-font-db-2.0.3.zip sutton-signwriting-font-db-2.0.3
    tar -zcvf sutton-signwriting-font-db-2.0.3.tar.gz sutton-signwriting-font-db-2.0.3

## Create Github Release
* Go to https://github.com/sutton-signwriting/font-db/tags
* Create release from Tag
* Upload .ZIP and .TAR.GZ
* Publish

## NPM Publish
    npm publish --access public
