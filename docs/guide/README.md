# 1、ES6 简介

ECMAScript 6.0（以下简称 ES6）是 JavaScript 语言的下一代标准，已经在 2015 年 6 月正式发布了。它的目标，是使得 JavaScript 语言可以用来编写复杂的大型应用程序，成为企业级开发语言。

## 1.1、ECMAScript 和 JavaScript 的关系

- ECMA 是 European Computer Manufacturers Association 的缩写，即欧洲计算机制造商协会。欧洲计算机制造商协会是制定信息传输与通讯的国际化标准组织。

- 1996 年 11 月，JavaScript 的创造者 Netscape 公司，决定将 JavaScript 提交给 ECMA，希望这种语言能够成为国际标准。次年，ECMA 发布 262 号标准文件（ECMA-262）的第一版，规定了浏览器脚本语言的标准，并将这种语言称为 ECMAScript，这个版本就是 1.0 版。
- 该标准从一开始就是针对 JavaScript 语言制定的，但之所以不叫 Java Script，有两个原因。一是商标，Java 是 Sun 公司的商标，根据授权协议，只有 Netscape 公司可以合法地使用 JavaScript 这个名字，且 JavaScript 本身也已经被 Netscape 公司注册为商标。二是想体现这门语言的 制定者是 ECMA，不是 Netscape，这样有利于保证这门语言的开放性和中立性。
- 因此，ECMAScript 和 JavaScript 的关系是，ECMA 是 JavaScript 的 标准， JavaScript 是 ECMA 的一种实现。

## 1.2、ECMAScript 历史版本

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

## 1.3、语法提案的批准流程

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

## 1.4、部署进度

各大浏览器的最新版本，对ES6的支持可以查看  [ES6支持](https://kangax.github.io/es5-compat-table/es6/)。随着时间的推移，支持度己经越来越高，超过 90% ES6 语法特性都实现了。

Node.js是JavaScript语言的服务器运行环境，对ES6的支持度比浏览器更高。通过Node，可以体验更多ES6的特性。建议使用版本管理工具 [nvm](https://github.com/creationix/nvm)，来安装Node，因为可以自由切换版本。不过，nvm不支持Windows系统，如果你使用Windows系统，下面的操作可以改用 [nvmw](https://github.com/hakobera/nvmw)或 [nvmw-windows](https://github.com/coreybutler/nvm-windows)代替。

1. 安装nvm需要打开命令行窗口，运行下面的命令。

``` bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/<version number>/install.sh | bash
```
::: warning 注意
   上面命令的version number处，需要用版本号替换。本节写作时的版本号是v0.29.0。该命令运行后，nvm会默认安装在用户主目录的.nvm子目录。
:::

2. 然后，激活nvm。

``` bash
$ source ~/.nvm/nvm.sh
```

3. 激活以后，安装Node的最新版。

``` bash
$ nvm install node
```

4. 安装完成后，切换到该版本。

``` bash
$ nvm use node
```
5. 使用下面的命令，可以查看Node所有已经实现的ES6特性。

``` bash
$ node --v8-options | grep harmony
  -- harmony_typeof
  -- harmony_scoping
  --harmony_modules
  --harmony_symbols
  --harmony_proxies
  --harmony_collections
  --harmony_observation
  --harmony_generators
  --harmony_iteration
  --harmony_numeric_literals
  --harmony_strings
  --harmony_arrays
  --harmony_maths
  --harmony
```

上面命令的输出结果，会因为版本的不同而有所不同。

阮一峰写了一个 [ES-Checker](https://github.com/ruanyf/es-checker)模块，用来检查各种运行环境对ES6的支持情况。访问 [ES-Checker](https://github.com/ruanyf/es-checker)
可以看到您的浏览器支持ES6的程度。运行下面的命令，可以查看你正在使用的Node环境对ES6的支持程度。

``` bash
$ npm install -g es-checker
$ es-checker

=========================================
Passes 24 feature Dectations
Your runtime supports 57% of ECMAScript 6
=========================================
```

## 1.5、Babel转码器

[Babel](https://babeljs.io/)是一个广泛使用的ES6转码器，可以将ES6代码转为ES5代码，从而在现有环境执行。这意味着，你可以用ES6的方式编写程序，又不用担心现有环境是否支持。下面是一个例子。

``` js
// 转码前
Array.map(item => item + 1);

// 转码后
Array.map(function (item) {
  return item + 1;
});
```
上面的原始代码用了箭头函数，这个特性还没有得到广泛支持，Babel将其转为普通函数，就能在现有的JavaScript环境执行了。

### 1.5.1、配置文件.babelrc

- Babel的配置文件是.babelrc，存放在项目的根目录下。使用Babel的第一步，就是配置这个文件。
该文件用来设置转码规则和插件，基本格式如下。

``` js
{
  "presets": [],
  "plugins": []
}
```
- presets字段设定转码规则，官方提供以下的规则集，你可以根据需要安装。

``` bash
# ES2015转码规则
$ npm install --save-dev babel-preset-es2015

# react转码规则
$ npm install --save-dev babel-preset-react

# ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个
$ npm install --save-dev babel-preset-stage-0
$ npm install --save-dev babel-preset-stage-1
$ npm install --save-dev babel-preset-stage-2
$ npm install --save-dev babel-preset-stage-3
```
- 然后，将这些规则加入.babelrc。
``` js
{
    "presets": [
      "es2015",
      "react",
      "stage-2"
    ],
    "plugins": []
  }
```

::: warning 注意
以下所有Babel工具和模块的使用，都必须先写好.babelrc。
:::

### 1.5.2、命令行转码babel-cli
Babel提供babel-cli工具，用于命令行转码。它的安装命令如下：

``` js
$ npm install --global babel-cli
```
基本用法如下。

``` js
// 转码结果输出到标准输出
$ babel example.js

// 转码结果写入一个文件
// --out-file 或 -o 参数指定输出文件
$ babel example.js --out-file compiled.js
// 或者
$ babel example.js -o compiled.js

// 整个目录转码
// --out-dir 或 -d 参数指定输出目录
$ babel src --out-dir lib
// 或者
$ babel src -d lib

// -s 参数生成source map文件
$ babel src -d lib -s
```
上面代码是在全局环境下，进行Babel转码。这意味着，如果项目要运行，全局环境必须有Babel，也就是说项目产生了对环境的依赖。另一方面，这样做也无法支持不同项目使用不同版本的Babel。

一个解决办法是将babel-cli安装在项目之中。
```js
// 安装
$ npm install --save-dev babel-cli
```
然后，改写package.json。

```js
{
  // ...
  "devDependencies": {
    "babel-cli": "^6.0.0"
  },
  "scripts": {
    "build": "babel src -d lib"
  },
}
```
转码的时候，就执行下面的命令。
```js
$ npm run build
```

### 1.5.3、babel-node
- babel-cli工具自带一个babel-node命令，提供一个支持ES6的REPL环境。它支持Node的REPL环境的所有功能，而且可以直接运行ES6代码。
- 它不用单独安装，而是随babel-cli一起安装。然后，执行babel-node就进入REPL环境。

``` js
$ babel-node
> (x => x * 2)(1)
2
```
::: warning 注意
   babel-node命令可以直接运行ES6脚本。将上面的代码放入脚本文件es6.js，然后直接运行。
:::

``` js
$ babel-node es6.js
2
```
babel-node也可以安装在项目中。

```js
{
  "scripts": {
    "script-name": "babel-node script.js"
  }
}
```

上面代码中，使用babel-node替代node，这样script.js本身就不用做任何转码处理。

### 1.5.4、babel-register

babel-register模块改写require命令，为它加上一个钩子。此后，每当使用require加载.js、.jsx、.es和.es6后缀名的文件，就会先用Babel进行转码。

```js
$ npm install --save-dev babel-register
```

使用时，必须首先加载babel-register。

```js
// 例如这样
require("babel-register");
require("./index.js");
```

然后，就不需要手动对index.js转码了。

::: warning 需要注意的是
   babel-register只会对require命令加载的文件转码，而不会对当前文件转码。另外，由于它是实时转码，所以只适合在开发环境使用。
:::

### 1.5.5、babel-core

如果某些代码需要调用Babel的API进行转码，就要使用babel-core模块。

- 安装命令如下：

```js
$ npm install babel-core --save
```

- 然后，在项目中就可以调用babel-core。

```js
var babel = require('babel-core');

// 字符串转码
babel.transform('code();', options);
// => { code, map, ast }

// 文件转码（异步）
babel.transformFile('filename.js', options, function(err, result) {
  result; // => { code, map, ast }
});

// 文件转码（同步）
babel.transformFileSync('filename.js', options);
// => { code, map, ast }

// Babel AST转码
babel.transformFromAst(ast, code, options);
// => { code, map, ast }
```
配置对象options，可以参看官方文档 [配置对象options](http://babeljs.io/docs/usage/options/)。

下面是一个例子:

```js
var es6Code = 'let x = n => n + 1';
var es5Code = require('babel-core')
  .transform(es6Code, {
    presets: ['es2015']
  })
  .code;
// '"use strict";\n\nvar x = function x(n) {\n  return n + 1;\n};'
```

上面代码中，transform方法的第一个参数是一个字符串，表示需要被转换的ES6代码，第二个参数是转换的配置对象。


### 1.5.6、babel-polyfill

Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。

举例来说，ES6在Array对象上新增了Array.from方法。Babel就不会转码这个方法。如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个垫片。

安装命令如下：

``` bash
$ npm install --save babel-polyfill
```

然后，在脚本头部，加入如下一行代码。

```js
import 'babel-polyfill';
// 或者
require('babel-polyfill');
```

Babel默认不转码的API非常多，详细清单可以查看babel-plugin-transform-runtime模块的 [definitions.js](https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-runtime/src/runtime-corejs2-definitions.js)文件。

### 1.5.7、浏览器环境
Babel也可以用于浏览器环境。但是，从Babel 6.0开始，不再直接提供浏览器版本，而是要用构建工具构建出来。如果你没有或不想使用构建工具，可以通过安装5.x版本的babel-core模块获取。

```js
$ npm install babel-core@5
```
运行上面的命令以后，就可以在当前目录的node_modules/babel-core/子目录里面，找到babel的浏览器版本 
<span style="color: #7ec699;">browser.js（未精简）</span>和 <span style="color:#f08d49">browser.min.js（已精简）</span>。

然后，将下面的代码插入网页。

```js
<script src="node_modules/babel-core/browser.js"></script>
<script type="text/babel">
// Your ES6 code
</script>
```
上面代码中，`browser.js`是Babel提供的转换器脚本，可以在浏览器运行。用户的ES6脚本放在`script`标签之中，但是要注明`type="text/babel"`。

另一种方法是使用 [babel-standalone](https://github.com/Daniel15/babel-standalone) 模块提供的浏览器版本，将其插入网页。

::: warning 注意
   网页中实时将ES6代码转为ES5，对性能会有影响。生产环境需要加载已经转码完成的脚本。
:::

下面是如何将代码打包成浏览器可以使用的脚本，以`Babel`配合`Browserify`为例。首先，安装`babelify`模块。

```js
$ npm install --save-dev babelify babel-preset-es2015
```

然后，再用命令行转换ES6脚本。

```js
$  browserify script.js -o bundle.js \
  -t [ babelify --presets [ es2015 ] ]
```

上面代码将ES6脚本`script.js`，转为`bundle.js`，浏览器直接加载后者就可以了。

在`package.json`设置下面的代码，就不用每次命令行都输入参数了。

```js
{
  "browserify": {
    "transform": [["babelify", { "presets": ["es2015"] }]]
  }
}
```

### 1.5.8、在线转换

Babel提供一个 [REPL在线编译器](https://babeljs.io/repl/)，可以在线将ES6代码转为ES5代码。转换后的代码，可以直接作为ES5代码插入网页运行。

### 1.5.9、与其他工具的配合

许多工具需要Babel进行前置转码，这里举两个例子：`ESLint`和`Mocha`。

ESLint用于静态检查代码的语法和风格，安装命令如下：

```js
$ npm install --save-dev eslint babel-eslint
```
然后，在项目根目录下，新建一个配置文件`.eslintrc`，在其中加入`parser`字段。

```js
{
  "parser": "babel-eslint",
  "rules": {
    ...
  }
}
```

再在`package.json`之中，加入相应的`scripts`脚本。

```js
 {
    "name": "my-module",
    "scripts": {
      "lint": "eslint my-files.js"
    },
    "devDependencies": {
      "babel-eslint": "...",
      "eslint": "..."
    }
  }
```
Mocha则是一个测试框架，如果需要执行使用ES6语法的测试脚本，可以修改`package.json`的`scripts.test`。

```js
"scripts": {
  "test": "mocha --ui qunit --compilers js:babel-core/register"
}
```
上面命令中，`--compilers`参数指定脚本的转码器，规定后缀名为`js`的文件，都需要使用`babel-core/register`先转码。

## 1.6、Traceur转码器
Google公司的 [Traceur](https://github.com/google/traceur-compiler)转码器，也可以将ES6代码转为ES5代码。

### 1.6.1、直接插入网页

首先，必须在网页头部 Traceur 库文

```js
<script src="https://google.github.io/traceur-compiler/bin/traceur.js"></script>
<script src="https://google.github.io/traceur-compiler/bin/BrowserSystem.js"></script>
<script src="https://google.github.io/traceur-compiler/src/bootstrap.js"></script>
<script type="module">
  import './Greeter.js';
</script>
```
上面代码中，一共有4个`script`标签。第一个是加载`Traceur`的库文件，第二个和第三个是将这个库文件用于浏览器环境，第四个则是加载用户脚本，这个脚本里面可以使用ES6代码。

注意，第四个`script`标签的`type`属性的值是`module`，而不是`text/javascript`。这是Traceur编译器识别ES6代码的标志，编译器会自动将所有`type=module`的代码编译为ES5，然后再交给浏览器执行。

除了引用外部ES6脚本，也可以直接在网页中放置ES6代码。

```js
<script type="module">
  class Calc {
    constructor(){
      console.log('Calc constructor');
    }
    add(a, b){
      return a + b;
    }
  }

  var c = new Calc();
  console.log(c.add(4,5));
  
  // 正常情况下，上面代码会在控制台打印出9。
</script>
```
如果想对Traceur的行为有精确控制，可以采用下面参数配置的写法。

```js
<script>
  // Create the System object
  window.System = new traceur.runtime.BrowserTraceurLoader();
  // Set some experimental options
  var metadata = {
    traceurOptions: {
      experimental: true,
      properTailCalls: true,
      symbols: true,
      arrayComprehension: true,
      asyncFunctions: true,
      asyncGenerators: exponentiation,
      forOn: true,
      generatorComprehension: true
    }
  };
  // Load your module
  System.import('./myModule.js', {metadata: metadata}).catch(function(ex) {
    console.error('Import failed', ex.stack || ex);
  });
</script>
```

上面代码中，首先生成Traceur的全局对象`window.System`，然后`System.import`方法可以用来加载ES6模块。加载的时候，需要传入一个配置对象`metadata`，该对象的`traceurOptions`属性可以配置支持ES6功能。如果设为`experimental: true`，就表示除了ES6以外，还支持一些实验性的新功能。

### 1.6.2、在线转换

Traceur也提供一个 [在线编译器](http://google.github.io/traceur-compiler/demo/repl.html)，可以在线将ES6代码转为ES5代码。转换后的代码，可以直接作为ES5代码插入网页运行。

上面的例子转为ES5代码运行，就是下面这个样子：

```js
<script src="https://google.github.io/traceur-compiler/bin/traceur.js"></script>
<script src="https://google.github.io/traceur-compiler/bin/BrowserSystem.js"></script>
<script src="https://google.github.io/traceur-compiler/src/bootstrap.js"></script>
<script>
$traceurRuntime.ModuleStore.getAnonymousModule(function() {
  "use strict";

  var Calc = function Calc() {
    console.log('Calc constructor');
  };

  ($traceurRuntime.createClass)(Calc, {add: function(a, b) {
    return a + b;
  }}, {});

  var c = new Calc();
  console.log(c.add(4, 5));
  return {};
});
</script>
```

### 1.6.3、命令行转换

作为命令行工具使用时，Traceur是一个Node的模块，首先需要用Npm安装。

```bash
$ npm install -g traceur
```
安装成功后，就可以在命令行下使用Traceur了。

Traceur直接运行es6脚本文件，会在标准输出显示运行结果，以前面的calc.js为例。

```bash
$ traceur calc.js
Calc constructor
9
```
如果要将ES6脚本转为ES5保存，要采用下面的写法。

```bash
$ traceur --script calc.es6.js --out calc.es5.js
```

上面代码的`--script`选项表示指定输入文件，`--out`选项表示指定输出文件。

为了防止有些特性编译不成功，最好加上`--experimental`选项。

```bash
$ traceur --script calc.es6.js --out calc.es5.js --experimental
```
命令行下转换生成的文件，就可以直接放到浏览器中运行。

### 1.6.4、Node 环境的用法

Traceur的Node.js用法如下（假定已安装traceur模块）。

```js
var traceur = require('traceur');
var fs = require('fs');

// 将ES6脚本转为字符串
var contents = fs.readFileSync('es6-file.js').toString();

var result = traceur.compile(contents, {
  filename: 'es6-file.js',
  sourceMap: true,
  // 其他设置
  modules: 'commonjs'
});

if (result.error)
  throw result.error;

// result对象的js属性就是转换后的ES5代码
fs.writeFileSync('out.js', result.js);
// sourceMap属性对应map文件
fs.writeFileSync('out.js.map', result.sourceMap);
```