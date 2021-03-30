## user 用户表

- username 用户名
- password 用户密码
- userid 用户 id

## blog 博客列表

- id 博客 id
- authid 作者 id(即 userid 用户 id)
- content 文章内容
- theme 主题(即博客分类)
- title 标题
- likes 点赞数
- commentNum 评论数
- browserNum 浏览数

## comment 评论表

- id 博客 id
- comments 评论内容

```js
comments: [
  {
    user: "",
    content: "",
    children: {
      user: "",
      content: "",
    },
  },
  {
    user: "",
    content: "",
  },
];
```

## category 博客分类

- id 分类 id
- name 名称
- num 数量
