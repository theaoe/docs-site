---
sidebarDepth: 2
sidebar: auto
---

# ECMAScript6 入门

## 1、ES6 简介

ECMAScript 6.0（以下简称 ES6）是 JavaScript 语言的下一代标准，已经在 2015 年 6 月正式发布了。它的目标，是使得 JavaScript 语言可以用来编写复杂的大型应用程序，成为企业级开发语言。

### 1.1、ECMAScript 和 JavaScript 的关系

- ECMA 是 European Computer Manufacturers Association 的缩写，即欧洲计算机制造商协会。欧洲计算机制造商协会是制定信息传输与通讯的国际化标准组织。

- 1996 年 11 月，JavaScript 的创造者 Netscape 公司，决定将 JavaScript 提交给 ECMA，希望这种语言能够成为国际标准。次年，ECMA 发布 262 号标准文件（ECMA-262）的第一版，规定了浏览器脚本语言的标准，并将这种语言称为 ECMAScript，这个版本就是 1.0 版。
- 该标准从一开始就是针对 JavaScript 语言制定的，但之所以不叫 Java Script，有两个原因。一是商标，Java 是 Sun 公司的商标，根据授权协议，只有 Netscape 公司可以合法地使用 JavaScript 这个名字，且 JavaScript 本身也已经被 Netscape 公司注册为商标。二是想体现这门语言的 制定者是 ECMA，不是 Netscape，这样有利于保证这门语言的开放性和中立性。
- 因此，ECMAScript 和 JavaScript 的关系是，ECMA 是 JavaScript 的 标准， JavaScript 是 ECMA 的一种实现。

### 1.2、ECMAScript 历史版本

| 时间    |  版本  |                        详情                                        |
| ------- | :----: | ---------------------------------------------------------------:  |
| 1996.11 | ES 1.0 |                    Netscape 将 JS 提 交给 ECMA 组织，ES 正式出现    |
| 1998.06 | ES 2.0 |                                                    ES2 正 式发布   |
| 1999.12 | ES 3.0 |                                                   ES3 被广泛支持   |
| 2007.10 | ES 4.0 |                                               ES4 过于激进被废弃    |
| 2008.07 | ES 3.1 |      4.0 退化为严重 缩水版的 3.1， ES 3.1 代号为 Harmony（和谐）     |
| 2009.12 | ES 5.0 | ES 5.0 正式发布，同时公布了 JavaScript .next 也就是后来的 ES 6.0     |
| 2011.06 | ES 5.1 |                                         ES 5.1 成为 ISO 国际标准    |
| 2013.03 | ES 6.0 |                                                  ES    6.0 草案定稿 |
| 2013.12 | ES 6.0 |                                                  ES 6.0 草案发布    |
| 2015.06 | ES 6.0 |                ES 6.0 预计发布正式版，JavaScript 开始指向 ES 7.0      |

因此，ES6 既是一个历史名词，也是一个泛指，含义是 5.1 版以后的 JavaScript 的下一代标准，涵盖了</br> ES2015、ES2016、ES2017 等等，而 ES2015 则是正式名称，特指该年发布的正式版本的语言标准。</br>本书中提到 ES6 的地方，一般是指 ES2015 标准，但有时也是泛指“下一代 JavaScript 语言”。

### 1.3、语法提案的批准流程

任何人都可以向标准委员会（又称 TC39 委员会）提案，要求修改语言标准。</br>
一种新的语法从提案到变成正式标准，需要经历五个阶段。每个阶段的变动都需要由 TC39 委员会批准。</br>

::: tip
- Stage 0 - Strawman（展示阶段）
- Stage 1 - Proposal（征求意见阶段）
- Stage 2 - Draft（草案阶段）
- Stage 3 - Candidate（候选人阶段）
- Stage 4 - Finished（定案阶段）
:::

一个提案只要能进入Stage 2，就差不多等于肯定会包括在以后的正式标准里面。</br>ECMAScript当前的所有提案，可以在TC39的官方网站Github.com/tc39/ecma262查看。

### 1.4、部署进度

各大浏览器的最新版本，对ES6的支持可以查看  [ES6支持](https://kangax.github.io/es5-compat-table/es6/)。随着时间的推移，支持度己经越来越高，超过 90% ES6 语法特性都实现了。

Node.js是JavaScript语言的服务器运行环境，对ES6的支持度比浏览器更高。通过Node，可以体验更多ES6的特性。建议使用版本管理工具 [nvm](https://github.com/creationix/nvm)，来安装Node，因为可以自由切换版本。不过，nvm不支持Windows系统，如果你使用Windows系统，下面的操作可以改用 [nvmw](https://github.com/hakobera/nvmw)或 [nvmw-windows](https://github.com/coreybutler/nvm-windows)代替。

1. 创建并进入一个新目录

   ``` bash
   mkdir vuepress-starter && cd vuepress-starter
   ```

2. 使用你喜欢的包管理器进行初始化

   ``` bash
   yarn init # npm init
   ```

