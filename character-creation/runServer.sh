#!/usr/bin/env bash
#the idea of this is to make http://localhost:8080/Humans-and-Heroes/character-creation/point-counter.html
#debuggable with react plugin but only thing it does is profile and show me the keys etc

#cd to script location (so that it works no matter previous pwd)
cd $(dirname "$0")
#cd to root's parent
cd ../..
echo 'http://localhost:8080/Humans-and-Heroes/character-creation/point-counter.html'
#for some reason this prints nothing when run in IDE but still works
python3 -m http.server 8080 --bind localhost
