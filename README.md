# 热门资讯源排行榜

目前支持的资讯源\*：

* GitHub Trending
* GitHub 仓库排行榜\*\*
* 微博热搜
* 百度热搜
* 知乎热榜

计划支持：

* Many more...

\* 每小时定时更新

\* results 文件夹中的 latest.json 表示最新的结果，与当天最新的结果相同

\*\* 每天 5 点更新一次

## 安装与部署

```shell
yarn
yarn deploy
```

### Docker 部署

```
docker run --restart=always realfrancisyan/news
```

