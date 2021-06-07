function getJsonValueByNode() {
    if which node; then
        local json="$1"
        local key="$2"
        # node -pe "JSON.stringify(eval($json).$key)" | awk '{print ($0 == "undefined" ? "" : $0)}'
        node -pe "JSON.stringify(JSON.parse(process.argv[1]).$key)" "$json" | awk '{print ($0 == "undefined" ? "null" : $0)}'
        return 0
    else
        return 1
    fi
}

cd `dirname $0`

json=$(cat package.json)
version=$(getJsonValueByNode "$json" "version")
echo $version

# git stash
# git pull
# git stash pop

# npm publish
# if [ $? -ne 0 ]; then
#   git add .
#   git commit -m "$version"
#   git push
# else
#   echo '发布失败'
# fi
