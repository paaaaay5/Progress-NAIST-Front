#!/bin/sh
ROOT_DIR="/usr/src/app"
APP_DIR="$ROOT_DIR/react-app"

if [ ! -e $APP_DIR ]; then
    cd $ROOT_DIR
    echo "[START] create react app..."
    npm install -g create-react-app
    create-react-app react-app
    echo "[END] create react app"
fi

cd $APP_DIR
echo "[START] yarn start..."
yarn start

exec "$@"