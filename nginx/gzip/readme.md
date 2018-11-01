# gzip

### nginx配置

```s
  gzip on;
  # 启用gzip压缩的最小文件，小于设置值的文件将不会压缩
  gzip_min_length 1k;
  # gzip 压缩级别，1-10，数字越大压缩的越好，也越占用CPU时间，后面会有详细说明
  gzip_comp_level 2;
  # 进行压缩的文件类型。javascript有多种形式。其中的值可以在 mime.types 文件中找到。
  gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png font/ttf font/otf image/svg+xml;
  # 是否在http header中添加Vary: Accept-Encoding，建议开启
  gzip_vary on;
  # 禁用IE 6 gzip
  gzip_disable "MSIE [1-6]\.";
```

### 关于Gzip

  gzip的过程：

  - 1）客户端的request-header中携带accept-encoding:gzip。
  - 2）服务器通过accept-encoding判断是否采用gzip。
  - 3) 客户端通过content-encoding:gzip，判断是否进行gzip.