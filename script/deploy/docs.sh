#!/bin/sh
set -ex

SOURCE_DIR_OR_FILE=$1
TARGET_DIR=$2
HOST_NAME=$3
HOST_PWD=$4


SOURCE_FILES=

if [[ -f "$SOURCE_DIR_OR_FILE" ]]; then
  SOURCE_FILES="$SOURCE_DIR_OR_FILE"
elif [[ -d "$SOURCE_DIR_OR_FILE" ]]; then
  SOURCE_FILES="$SOURCE_DIR_OR_FILE/*"
else
  echo "ERROR: SOURCE_DIR_OR_FILE 不为目录或文件"
  exit 1
fi

expect -c "
        set timeout 1200;
        spawn bash -c \"scp -P 36000 -r $SOURCE_FILES root@$HOST_NAME:$TARGET_DIR\"
        expect {
                \"*yes/no*\" {send \"yes\r\"; exp_continue}
                \"*password*\" {send \"$HOST_PWD\r\";}
                \"*Password*\" {send \"$HOST_PWD\r\";}
               }
expect eof;"
