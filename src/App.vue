<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="less">
/* 在这里引入字体图标文件 */
@import url("http://at.alicdn.com/t/font_1426139_h6vn3jbl5q.css");
//  公共样式
* {
  margin: 0;
  padding: 0;
}

a {
  color: inherit;
}

a:hover {
  text-decoration: none;
}

ul,
li,
ol {
  list-style: none;
}
.nav + div {
  padding-top: 16.111vw;
}
</style>
