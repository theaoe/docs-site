# 4、字符串的扩展

ES6 加强了对 Unicode 的支持，并且扩展了字符串对象

## 4.1、字符的 Unicode 表示法

JavaScript 允许采用\uxxxx 形式表示一个字符，其中“xxxx”表示字符的码点。

```js
'\u0061'
// "a"
```

但是，这种表示法只限于\u0000——\uFFFF之间的字符。超出这个范围的字符，必须用两个双字节的形式表达。

```js
"\uD842\uDFB7"
// "𠮷"

"\u20BB7"
// " 7"
```
上面代码表示，如果直接在\u后面跟上超过`0xFFFF`的数值（比如`\u20BB7`），JavaScript会理解成`\u20BB+7`。由于`\u20BB`是一个不可打印字符，所以只会显示一个空格，后面跟着一个`7`。

ES6 对这一点做出了改进，只要将码点放入大括号，就能正确解读该字符。

```js
"\u{20BB7}"
// "𠮷"

"\u{41}\u{42}\u{43}"
// "ABC"

let hello = 123;
hell\u{6F} // 123

'\u{1F680}' === '\uD83D\uDE80'
// true
```

上面代码中，最后一个例子表明，大括号表示法与四字节的UTF-16编码是等价的。

有了这种表示法之后，JavaScript共有6种方法可以表示一个字符。

```js
'\z' === 'z'  // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true
```

## 4.2、codePointAt()

JavaScript内部，字符以UTF-16的格式储存，每个字符固定为`2`个字节。对于那些需要`4`个字节储存的字符（Unicode码点大于0xFFFF的字符），JavaScript会认为它们是两个字符。

```js
var s = "𠮷";

s.length // 2
s.charAt(0) // ''
s.charAt(1) // ''
s.charCodeAt(0) // 55362
s.charCodeAt(1) // 57271
```

上面代码中，汉字“𠮷”（注意，这个字不是”吉祥“的”吉“）的码点是`0x20BB7`，UTF-16编码为`0xD842 0xDFB7`（十进制为`55362 57271`），需要4个字节储存。对于这种4个字节的字符，JavaScript不能正确处理，字符串长度会误判为2，而且`charAt`方法无法读取整个字符，`charCodeAt`方法只能分别返回前两个字节和后两个字节的值。

ES6提供了`codePointAt`方法，能够正确处理4个字节储存的字符，返回一个字符的码点。

```js
var s = '𠮷a';

s.codePointAt(0) // 134071
s.codePointAt(1) // 57271

s.codePointAt(2) // 97
```

`codePointAt`方法的参数，是字符在字符串中的位置（从0开始）。上面代码中，JavaScript将“𠮷a”视为三个字符，codePointAt方法在第一个字符上，正确地识别了“𠮷”，返回了它的十进制码点134071（即十六进制的20BB7）。在第二个字符（即“𠮷”的后两个字节）和第三个字符“a”上，`codePointAt`方法的结果与charCodeAt方法相同。

codePointAt方法返回的是码点的十进制值，如果想要十六进制的值，可以使用toString方法转换一下。

```js
var s = '𠮷a';

s.codePointAt(0).toString(16) // "20bb7"
s.codePointAt(2).toString(16) // "61"
```
你可能注意到了，`codePointAt`方法的参数，仍然是不正确的。比如，上面代码中，字符a在字符串s的正确位置序号应该是1，但是必须向`codePointAt`方法传入2。解决这个问题的一个办法是使用for...of循环，因为它会正确识别32位的UTF-16字符。

```js
var s = '𠮷a';
for (let ch of s) {
  console.log(ch.codePointAt(0).toString(16));
}
// 20bb7
// 61
```

`codePointAt`方法是测试一个字符由两个字节还是由四个字节组成的最简单方法。

```js
function is32Bit(c) {
  return c.codePointAt(0) > 0xFFFF;
}

is32Bit("𠮷") // true
is32Bit("a") // false
```

## 4.3、String.fromCodePoint()

ES5提供`String.fromCharCode`方法，用于从码点返回对应字符，但是这个方法不能识别32位的UTF-16字符（Unicode编号大于0xFFFF）。

```js
String.fromCharCode(0x20BB7)
// "ஷ"
```

上面代码中，`String.fromCharCode`不能识别大于`0xFFFF`的码点，所以`0x20BB7`就发生了溢出，最高位2被舍弃了，最后返回码点`U+0BB7`对应的字符，而不是码点`U+20BB7`对应的字符。

ES6提供了`String.fromCodePoint`方法，可以识别`0xFFFF`的字符，弥补了`String.fromCharCode`方法的不足。在作用上，正好与`codePointAt`方法相反。

```js
String.fromCodePoint(0x20BB7)
// "𠮷"
String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'
// true
```
上面代码中，如果`String.fromCodePoint`方法有多个参数，则它们会被合并成一个字符串返回。

注意，`fromCodePoint`方法定义在`String`对象上，而`codePointAt`方法定义在字符串的实例对象上。

## 4.4、字符串的遍历器接口

ES6为字符串添加了遍历器接口（详见《 [Iterator](./command.md)》一章），使得字符串可以被for...of循环遍历。

```js
for (let codePoint of 'foo') {
  console.log(codePoint)
}
// "f"
// "o"
// "o"
```
除了遍历字符串，这个遍历器最大的优点是可以识别大于0xFFFF的码点，传统的for循环无法识别这样的码点。

```js
var text = String.fromCodePoint(0x20BB7);

for (let i = 0; i < text.length; i++) {
  console.log(text[i]);
}
// " "
// " "

for (let i of text) {
  console.log(i);
}
// "𠮷"
```

上面代码中，字符串text只有一个字符，但是`for`循环会认为它包含两个字符（都不可打印），而`for...of`循环会正确识别出这一个字符。

## 4.5、at()

ES5对字符串对象提供charAt方法，返回字符串给定位置的字符。该方法不能识别码点大于`0xFFFF`的字符。

```js
'abc'.charAt(0) // "a"
'𠮷'.charAt(0) // "\uD842"
```

上面代码中，`charAt`方法返回的是UTF-16编码的第一个字节，实际上是无法显示的。

目前，有一个提案，提出字符串实例的`at`方法，可以识别Unicode编号大于`0xFFFF`的字符，返回正确的字符。

```js
'abc'.at(0) // "a"
'𠮷'.at(0) // "𠮷"
```

## 4.6、normalize()

许多欧洲语言有语调符号和重音符号。为了表示它们，Unicode提供了两种方法。一种是直接提供带重音符号的字符，比如Ǒ（\u01D1）。另一种是提供合成符号（combining character），即原字符与重音符号的合成，两个字符合成一个字符，比如`O`（\u004F）和ˇ（\u030C）合成`Ǒ`（\u004F\u030C）。

这两种表示方法，在视觉和语义上都等价，但是JavaScript不能识别。

```js
'\u01D1'==='\u004F\u030C' //false

'\u01D1'.length // 1
'\u004F\u030C'.length // 2
```

上面代码表示，JavaScript将合成字符视为两个字符，导致两种表示方法不相等。

ES6提供字符串实例的`normalize()`方法，用来将字符的不同表示方法统一为同样的形式，这称为Unicode正规化。

```js
'\u01D1'.normalize() === '\u004F\u030C'.normalize()
// true
```
`normalize`方法可以接受一个参数来指定`normalize`的方式，参数的四个可选值如下：

- `NFC`，默认参数，表示“标准等价合成”（Normalization Form Canonical Composition），返回多个简单字符的合成字符。所谓“标准等价”指的是视觉和语义上的等价。
- `NFD`，表示“标准等价分解”（Normalization Form Canonical Decomposition），即在标准等价的前提下，返回合成字符分解的多个简单字符。
- `NFKC`，表示“兼容等价合成”（Normalization Form Compatibility Composition），返回合成字符。所谓“兼容等价”指的是语义上存在等价，但视觉上不等价，比如“囍”和“喜喜”。（这只是用来举例，normalize方法不能识别中文。）
- `NFKD`，表示“兼容等价分解”（Normalization Form Compatibility Decomposition），即在兼容等价的前提下，返回合成字符分解的多个简单字符。

```js
'\u004F\u030C'.normalize('NFC').length // 1
'\u004F\u030C'.normalize('NFD').length // 2
```

上面代码表示，`NFC`参数返回字符的合成形式，`NFD`参数返回字符的分解形式。

不过，`normalize`方法目前不能识别三个或三个以上字符的合成。这种情况下，还是只能使用正则表达式，通过Unicode编号区间判断。

## 4.7、includes()、startsWith()、endsWith()

传统上，JavaScript只有indexOf方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6又提供了三种新方法。

- includes()：返回布尔值，表示是否找到了参数字符串。
- startsWith()：返回布尔值，表示参数字符串是否在源字符串的头部。
- endsWith()：返回布尔值，表示参数字符串是否在源字符串的尾部。

```js
var s = 'Hello world!';

s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true
```
这三个方法都支持第二个参数，表示开始搜索的位置。

```js
var s = 'Hello world!';

s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false
```

上面代码表示，使用第二个参数n时，endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。

## 4.8、repeat()

repeat方法返回一个新字符串，表示将原字符串重复n次。
```js
'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""
```

参数如果是小数，会被取整。

```js
'na'.repeat(2.9) // "nana"
```

如果repeat的参数是负数或者Infinity，会报错。

```js
'na'.repeat(Infinity)
// RangeError
'na'.repeat(-1)
// RangeError
```
但是，如果参数是0到-1之间的小数，则等同于0，这是因为会先进行取整运算。0到-1之间的小数，取整以后等于`-0`，`repeat`视同为0。

```js
'na'.repeat(-0.9) // ""
```
参数NaN等同于0。

```js
'na'.repeat(NaN) // ""
```

如果`repeat`的参数是字符串，则会先转换成数字。

```js
'na'.repeat('na') // ""
'na'.repeat('3') // "nanana"
```
## 4.9 padStart()、padEnd()

ES7推出了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。`padStart`用于头部补全，`padEnd`用于尾部补全。

```js
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'
```

上面代码中，`padStart`和`padEnd`一共接受两个参数，第一个参数用来指定字符串的最小长度，第二个参数是用来补全的字符串。

如果原字符串的长度，等于或大于指定的最小长度，则返回原字符串。

```js
'xxx'.padStart(2, 'ab') // 'xxx'
'xxx'.padEnd(2, 'ab') // 'xxx'
```

如果用来补全的字符串与原字符串，两者的长度之和超过了指定的最小长度，则会截去超出位数的补全字符串。

```js
'abc'.padStart(10, '0123456789')
// '0123456abc'
```

如果省略第二个参数，则会用空格补全长度。

```js
'x'.padStart(4) // '   x'
'x'.padEnd(4) // 'x   '
```

`padStart`的常见用途是为数值补全指定位数。下面代码生成10位的数值字符串。

```js
'1'.padStart(10, '0') // "0000000001"
'12'.padStart(10, '0') // "0000000012"
'123456'.padStart(10, '0') // "0000123456"
```

另一个用途是提示字符串格式。

```js
'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
```

## 4.10 模板字符串

传统的JavaScript语言，输出模板通常是这样写的。

```js
$('#result').append(
  'There are <b>' + basket.count + '</b> ' +
  'items in your basket, ' +
  '<em>' + basket.onSale +
  '</em> are on sale!'
);
```

## 4.11 实例：模板编译

## 4.12 标签模板

## 4.13 String.raw()

## 4.14 模板字符串的限制
