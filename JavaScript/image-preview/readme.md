### 前端小贴士 - 本地图片预览的两种处理方式

### 一、前言

  &emsp;&emsp;随着前端蓬勃的发展，前端开发者面对的开发需求也越来越复杂，本文介绍的本地图片预览功能则是其中之一。

  &emsp;&emsp;下面逐一介绍实现本地图片预览功能涉及的知识点：

### 二、选择本地图片

  &emsp;&emsp;HTML5主要提供file类型的input标签使得用户可以选择一个或者多个文件：

```HTML
  <input type="file" id="js-file" accept="image/*" multiple>
```

  &emsp;&emsp;设置accept属性可以限制用户可以选择的文件类型，例如上述标签则限制了用户只能选择图片文件。

  &emsp;&emsp;设置mutiple属性则支持用户同时选中多个文件。

  &emsp;&emsp;监听input的change事件可以拿到本地文件对象：

```JavaScript
document.getElementById('js-file').addEventListener('change', e => {
  const event = e || window.event
  const target = event.target || event.srcElement
  const files = target.files // 类数组
}, false)
```

  &emsp;&emsp;需要特别注意files是一个不常见的类数组对象。

  &emsp;&emsp;拿到本地图片文件并不能直接将图片显示出来，因为无论是通过img标签还是backgroundImage属性，都需要图片的URL，那么一起看看JavaScript中提供哪些API生成URL。

### 三、URL

  &emsp;&emsp;JavaScript中提供了URL接口来生成URLs，这里可以通过URL的静态方法createObjectURL()生成一个Blob URL：

```JavaScript
function createObjectURL (file) {
  if (typeof window === 'undefined') {
    new Error('非浏览器环境')
  }
  if (window.URL) {
    return window.URL.createObjectURL(file)
  } else if (window.webkitURL) {
    return window.webkitURL.createObjectURL(file)
  } else {
    return ''
  }
}
```

  &emsp;&emsp;Blob URL只能由JavaScript生成，指向浏览器当前内存中的数据，所以再不需要Blob URL时，需要通过调用revokeObjectURL()方法释放内存。

### 四、FileReader

  &emsp;&emsp;JavaScript还提供了FileReader对象来异步读取本地文件。它拥有以下几个方法：

  - FileReader.abort(): 终止读取操作。
  - FileReader.readAsDataURL(): 开始读取指定Blob中的内容。一旦完成，result属性中将包含一个Data URL格式的字符串以表示所读取文件的内容。
  - FileReader.readAsText(): 开始读取指定的Blob中的内容。一旦完成，result属性中将包含一个字符串以表示所读取的文件内容。
  - FileReader.readAsBinaryString(): 开始读取指定的Blob中的内容。一旦完成，result属性中将包含所读取文件的原始二进制数据。
  - FileReader.readAsArrayBuffer(): 开始读取指定的Blob中的内容, 一旦完成, result属性中保存的将是被读取文件ArrayBuffer 数据对象。

  &emsp;&emsp;这里我们采用readAsDataURL()方法生成Data URL来展示本地图片：

```JavaScript
const reader = new FileReader()
reader.onloadend = function (e) {
  const { target } = e
  console.log(target.result) // Data URL
}
reader.onprogress = function (e) {
  const { lengthComputable, loaded, total } = e
  if (lengthComputable) {
    console.log(`总结字节数：${total}, 已经加载字节数：${loaded}`)
  }
}
reader.readAsDataURL(file)
```

  &emsp;&emsp;Data URL对于前端应该不陌生，在Web优化中，通常会将小图转化为Data URL内嵌在网页中，从而解决HTTP请求过多造成的性能问题。另外在FileReader对象读取文件的过程中，可以监听progress事件，获取文件读取的进度。

### 五、总结

  &emsp;&emsp;以上便是本地图片预览的解决方案，本质上就是生成URL的两种方式：

  - URL.createObjectURL(): 生成Blob URL。
  - FileReader.readAsDataURL(): 生成Data URL。




