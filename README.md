# Hexo Tag Gallery

[![npm version](https://img.shields.io/npm/v/hexo-gallery.svg)](https://www.npmjs.com/package/hexo-gallery)

一个功能强大且高度可定制的 Hexo 标签插件，用于在您的文章中以优雅的瀑布流形式展示图片画廊。

## ✨ 特性

- **✍️ 块标签语法**: 使用成对的 `{% gallery %}` ... `{% endgallery %}` 标签，让您可以在 Markdown 中整洁地管理图片列表。
- **🎨 高度可定制**: 支持自定义列数、背景色、标题颜色和描述文字颜色。
- **🧠 智能颜色系统**: 只需设置背景色，插件会自动计算出对比度最佳的字体颜色，确保可读性。
- **📱 响应式设计**: 基础样式确保画廊在不同设备上都有良好的展示效果。
- **🚀 性能优化**: 自动为图片添加 `loading="lazy"` 属性，实现浏览器原生懒加载。

## 📦 安装

在您的 Hexo 博客根目录下运行以下命令：

```bash
npm install hexo-gallery --save
```

## 🚀 使用方法

本插件使用块标签（Block Tag）的形式。您可以在文章的 Markdown 文件中按以下格式使用：

```
{% gallery "参数1:值1" "参数2:值2" ... %}
图片URL_1
图片URL_2
图片URL_3
...
{% endgallery %}
```

### 参数选项

所有参数都在起始标签 `{% gallery %}` 中设置，格式为 `"key:value"`。

| 参数       | 描述                                                           | 默认值      | 示例                   |
| :--------- | :------------------------------------------------------------- | :---------- | :--------------------- |
| `title`    | 画廊的标题                                                     | (无)        | `"title:我的摄影集"`   |
| `author`   | 作者                                                           | (无)        | `"author:wicos"`       |
| `site`     | 地点                                                           | (无)        | `"site:雅加达"`        |
| `date`     | 日期                                                           | (无)        | `"date:2025年"`        |
| `platform` | 设备平台                                                       | (无)        | `"platform:iPhone"`    |
| `col`      | 图片显示的列数                                                 | `3`         | `"col:4"`              |
| `background` | 画廊的背景颜色                                                 | `#6e6e73`   | `"background:#ffffff"` |
| `titlecolor` | **(可选)** 手动指定标题颜色。不设置时会根据背景色自动计算。     | (自动计算)  | `"titlecolor:#ff6347"` |
| `desccolor`  | **(可选)** 手动指定描述文字颜色。不设置时会自动设为比标题更柔和的颜色。 | (自动计算)  | `"desccolor:#aaa"`      |

### 使用示例

#### 示例 1: 智能亮色主题

设置了白色背景，插件会自动将标题颜色切换为深色，描述文字颜色切换为中灰色。

```
{% gallery "title:智能亮色主题" "author:wicos" "background:#ffffff" "col:4" %}
https://.../image1.jpg
https://.../image2.jpg
https://.../image3.jpg
{% endgallery %}
```

#### 示例 2: 手动指定所有颜色

创建一个自定义的深色主题，手动指定标题为青色，描述为灰色。

```
{% gallery "title:自定义颜色" "background:#2c3e50" "titlecolor:cyan" "desccolor:gray" %}
https://.../image4.jpg
https://.../image5.jpg
{% endgallery %}
```

#### 示例 3: 使用默认的深色主题

不提供任何颜色参数，将使用默认的深灰色背景和自动计算出的浅色字体。

```
{% gallery "title:默认深色主题" "site:巴厘岛" %}
https://.../image6.jpg
https://.../image7.jpg
{% endgallery %}
```

## 📄 许可证

[MIT](LICENSE)
