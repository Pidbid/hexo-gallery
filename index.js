'use strict';

const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

if (typeof hexo === 'undefined') {
  return;
}

/**
 * 根据背景色十六进制码计算出与之对比度高的字体颜色（深色或浅色）.
 * @param {string} hex - 十六进制颜色码 (e.g., "#FFF", "#3a3a3a").
 * @returns {string} - 返回深色 '#1d1d1f' 或浅色 '#f5f5f7'.
 */
function getContrastingFontColor(hex) {
  if (!hex) return '#f5f5f7';
  let color = hex.startsWith('#') ? hex.substring(1) : hex;
  if (color.length === 3) {
    color = color.split('').map(char => char + char).join('');
  }
  if (color.length !== 6) return '#f5f5f7';
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b);
  return luminance > 140 ? '#1d1d1f' : '#f5f5f7';
}

/**
 * 解析 "key:value" 格式的参数.
 * @param {string[]} args - 从Hexo获取的原始参数数组.
 * @returns {object} - 一个包含元数据的对象.
 */
function parseArgs(args) {
  const result = {};
  // [新增] 添加 show 参数
  const metaKeys = ['title', 'author', 'site', 'date', 'platform', 'col', 'background', 'titlecolor', 'desccolor', 'show'];
  
  args.forEach(arg => {
    let isMeta = false;
    for (const key of metaKeys) {
      const prefix = key + ':';
      if (arg.toLowerCase().startsWith(prefix)) {
        const value = arg.substring(prefix.length).trim();
        if (value) {
          result[key] = value;
        }
        isMeta = true;
        break;
      }
    }
  });
  return result;
}

// 注册一个成对的块标签
hexo.extend.tag.register('gallery', function(args, content) {
  const data = parseArgs(args);

  const imageUrls = content.split('\n')
                           .map(url => url.trim())
                           .filter(url => url.length > 0);
  data.images = imageUrls;

  // --- 智能颜色与样式逻辑 ---
  data.col = data.col || 3;
  data.background = data.background || '#6e6e63';

  if (data.background && !data.titlecolor) {
    data.titlecolor = getContrastingFontColor(data.background);
  } else {
    data.titlecolor = data.titlecolor || '#f5f5f7';
  }

  if (data.titlecolor && !data.desccolor) {
    if (data.titlecolor === '#f5f5f7') {
      data.desccolor = '#c7c7cc';
    } else {
      data.desccolor = '#6e6e73';
    }
  } else {
    data.desccolor = data.desccolor || '#c7c7cc';
  }

  data.galleryId = 'gallery_' + Math.random().toString(36).substring(2, 9);
  
  const templatePath = path.join(__dirname, 'lib/gallery.ejs');
  const template = fs.readFileSync(templatePath, 'utf-8');
  
  return ejs.render(template, data);
}, { ends: true });

// --- 静态资源管理部分 (无变化) ---
hexo.extend.generator.register('gallery_assets', function() {
  const assets = [
    { path: 'css/gallery.css', data: path.join(__dirname, 'source/css/gallery.css') },
    { path: 'js/gallery.js', data: path.join(__dirname, 'source/js/gallery.js') }
  ];
  return assets.map(asset => ({
    path: asset.path,
    data: () => fs.createReadStream(asset.data)
  }));
});

hexo.extend.injector.register('head_end', `
    <link rel="stylesheet" href="/css/gallery.css" media="print" onload="this.media='all'">
`, 'default');

hexo.extend.injector.register('body_end', `
    <script src="/js/gallery.js" async></script>
`, 'default');
