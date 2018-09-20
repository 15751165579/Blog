# CSS中文字截断的方式

### 单行文字截断

  块级元素

```css
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
```

### 多行截断

  旧的flex标准

```css
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
```

