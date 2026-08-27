# 上传 ipa 到 devclound

set -ex

# 文件路径
FILE=/Users/yang/Downloads/press-ui.ipa
# 目标
TARGET_PATH=/data/workspace/p-30ff30b405b24a228b4fa22cb05b7db3/src

scp -P 36000 -r $FILE root@my:$TARGET_PATH