#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

#创建.nojekyll 防止Github Pages build错误
touch .nojekyll

git init
git add -A
git commit -m 'update'

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f "git@github.com:theaoe/docs-site.git" master:gh-pages

cd -
