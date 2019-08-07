const mdText = `# 欢迎使用 笔墨 BiMo.io


![bimo](http://ww1.sinaimg.cn/large/005Bpb8ily1g3c5zx3mvfj31lk1341kx.jpg)

**笔墨** 是一款专为 Markdown 打造的编辑器，通过精心的设计与技术实现，特点概述：
 
- **功能丰富** ：支持高亮代码块、导出HTML/PDF等，工作笔记好帮手；
- **多种平台** ：简洁高效的编辑器，提供 Mac + Windows 两个版本；
- **简单易用** ：上手简单，使用简洁，编写高亮。

---

## Markdown 简介

> Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档，然后转换成格式丰富的HTML页面,Markdown文件的后缀名便是“.md”    —— [维基百科](https://zh.wikipedia.org/wiki/Markdown)


## 笔墨 的功能演示

---

### 标题演示

# 标题H1

## 标题H2

### 标题H3

#### 标题H4

##### 标题H5

###### 标题H6

---

### 字符效果和横线等

~~删除线~~ <s>删除线（开启识别HTML标签时）</s>

*斜体字*      _斜体字_

**粗体**  __粗体__

***粗斜体*** ___粗斜体___

上标：X<sub>2</sub>，下标：O<sup>2</sup>

**缩写(同HTML的abbr标签)**
> 即更长的单词或短语的缩写形式，前提是开启识别HTML标签时，已默认开启

The <abbr title="Hyper Text Markup Language">HTML</abbr> specification is maintained by the <abbr title="World Wide Web Consortium">W3C</abbr>.

--- 

### 引用 Blockquotes

> 引用文本 Blockquotes

引用的行内混合 Blockquotes

> 引用：如果想要插入空白换行\`即<br />标签\`，在插入处先键入两个以上的空格然后回车即可，[普通链接](https://www.mdeditor.com/)。

---

### 锚点与链接 Links

[普通链接](https://www.mdeditor.com/)

[普通链接带标题](https://www.mdeditor.com/ "普通链接带标题")

直接链接：<https://www.mdeditor.com>

邮箱地址自动链接 test.test@gmail.com  www@vip.qq.com

---

### 多语言代码高亮 Codes

\`\`\`javascript
function test() {
    console.log("Hello world!");
}
\`\`\`

\`\`\`html
<!DOCTYPE html>
<html>
    <head>
        <mate charest="utf-8" />
        <meta name="keywords" content="Editor.md, Markdown, Editor" />
        <title>Hello world!</title>
        <style type="text/css">
            body{font-size:14px;color:#444;font-family: "Microsoft Yahei", Tahoma, "Hiragino Sans GB", Arial;background:#fff;}
            ul{list-style: none;}
            img{border:none;vertical-align: middle;}
        </style>
    </head>
    <body>
        <h1 class="text-xxl">Hello world!</h1>
        <p class="text-green">Plain text</p>
    </body>
</html>
\`\`\`

\`\`\` python
@requires_authorization
def somefunc(param1='', param2=0):
    '''A docstring'''
    if param1 > param2: # interesting
        print 'Greater'
    return (param2 - param1 + 1) or None
class SomeClass:
    pass
>>> message = '''interpreter
\`\`\`

--- 

### 图片 Images

图片加链接 (Image + Link)：


[![](http://ww1.sinaimg.cn/large/005Bpb8ily1g3bm1wt6huj30m80b4abg.jpg)](https://bimo.io "bimo")

---

### 列表 Lists

#### 无序列表（减号）Unordered Lists (-)

- 列表一
- 列表二
- 列表三

#### 无序列表（星号）Unordered Lists (*)

* 列表一
* 列表二
* 列表三

#### 无序列表（加号和嵌套）Unordered Lists (+)

+ 列表一
+ 列表二
    + 列表二-1
    + 列表二-2
    + 列表二-3
+ 列表三
    * 列表一
    * 列表二
    * 列表三

#### 有序列表 Ordered Lists (-)

1. 第一行
2. 第二行
3. 第三行

#### GFM task list

- [x] GFM task list 1
- [x] GFM task list 2
- [ ] GFM task list 3
    - [ ] GFM task list 3-1
    - [ ] GFM task list 3-2
    - [ ] GFM task list 3-3
- [ ] GFM task list 4
    - [ ] GFM task list 4-1
    - [ ] GFM task list 4-2

---

### 绘制表格 Tables

| 项目        | 价格   |  数量  |
| --------   | -----:  | :----:  |
| 计算机      | $1600   |   5     |
| 手机        |   $12   |   12   |
| 管线        |    $1    |  234  |

First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell

| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |

| Function name | Description                    |
| ------------- | ------------------------------ |
| \`help()\`      | Display the help window.       |
| \`destroy()\`   | **Destroy your computer!**     |

| Left-Aligned  | Center Aligned  | Right Aligned |
| :------------ |:---------------:| -----:|
| col 3 is      | some wordy text | $1600 |
| col 2 is      | centered        |   $12 |
| zebra stripes | are neat        |    $1 |

| Item      | Value |
| --------- | -----:|
| Computer  | $1600 |
| Phone     |   $12 |
| Pipe      |    $1 |

---

### 反斜杠 Escape

\\*literal asterisks\\*

---

## 编辑器相关

### 快捷键

打开文档 <kbd>Cmd + O</kbd>

新建文档 <kbd>Cmd + N</kbd>

标题 <kbd>Cmd + 1-6</kbd>

粗体 <kbd>Cmd + B</kbd>

斜体 <kbd>Cmd + I</kbd>

链接 <kbd>Cmd + L</kbd>

图片 <kbd>Cmd + G</kbd>

代码块 <kbd>Cmd + K</kbd>

## 反馈与建议

- 邮箱：<service@c.team>
- Github：https://github.com/cteams/BiMo

---------
感谢阅读这份帮助文档, 请开启您的编写吧。
`;

export default {
    mdText: mdText
}