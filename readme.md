This is a test project to find a way to keep an entire workflow to a docker container to avoid convoluting the local machine. 

Gulpfile setup is mainly inspired by https://jonsuh.com/blog/integrating-react-with-gulp/

Docker container is inspired by http://jdlm.info/articles/2016/03/06/lessons-building-node-app-docker.html

It is not meant to be ready for anything, perhaps a boiler plate for getting started with the development of an app and not needing to set everything up and figuring everything out. But mainly a tool to be inspired to create your own to save some hair on the top of your head. Also a place for learning.

## What
This will start a docker container and fire up gulp (connect) with a webserver and start gulp watch in the src directory. Only the __docker toolkit__ (docker, docker machine, docker compose and their subdependencies) is needed on the local machine for devs, the rest is within the container. Any changes in the src folder on the local machine is synced to the container so you still develop as usual. Only difference is that when checking the change you point your browser to the ip:port of the container rather than localhost.

## How
This package requires docker with the toolkit. Use it by running
```
docker-compose build
docker-compose up -d
```
