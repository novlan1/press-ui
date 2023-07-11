SOURCE_DIR=$1
TARGET_DIR=$2
HOST_NAME=$3
HOST_PWD=$4


expect -c "
        set timeout 1200;
        spawn bash -c \"scp -P 36000 -r $SOURCE_DIR/* root@$HOST_NAME:/root/html/$TARGET_DIR\"
        expect {
                \"*yes/no*\" {send \"yes\r\"; exp_continue}
                \"*password*\" {send \"$HOST_PWD\r\";}
               }
expect eof;"
