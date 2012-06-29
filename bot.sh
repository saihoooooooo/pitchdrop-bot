#! /bin/bash

echo 'process start'

cd "${0%/*}"

if [ -f data.json.old ]; then
    data=`diff data.json.old data.json -c | sed -e '/^\+/!d;s/^\+//;s/ //g' | tr -d '\012' | sed -e 's/,$//'`
    if [ "$data" != "" ]; then
        IFS=','
        set $data
        for arg in "$@"
        do
            curl -X POST -d "$arg" -H "Content-Type: application/json" http://localhost:5984/pitchdrop-bot
        done
    fi
fi

cp -a data.json data.json.old

node bot.js

echo 'process end'
