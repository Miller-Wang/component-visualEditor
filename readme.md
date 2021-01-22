# 可视化拖拽组件训练营

## 训练营说明

- 可视化拖拽实战训练营明天(本周六 2021/01/23)正式开始，时长为一周时间，下周日结束；
- 内容视频介绍：[https://www.bilibili.com/video/BV1BK4y1W7Eu/](https://www.bilibili.com/video/BV1BK4y1W7Eu/)
- Vue版本项目预览：[http://martsforever-pot.gitee.io/vue-visual-editor/](http://martsforever-pot.gitee.io/vue-visual-editor/)
- React版本项目预览：[http://martsforever-pot.gitee.io/react-visual-editor/](http://martsforever-pot.gitee.io/react-visual-editor/)
- 本次训练营学分是30分，可以单兵做战，完成作业返回45分，也可以结成两个人的学死党团队做战，如果两个人都完成，每个返回60分，如果有一个没有完成，则不返回学分。
- 需要参加的请填写表格：[https://shimo.im/sheets/TWkG9PNmfo0yyMsI/MODOC/](https://shimo.im/sheets/TWkG9PNmfo0yyMsI/MODOC/)，填完后扫描表格中的二维码进正式群。

## 流程说明

- 训练内容以录制的视频为主，本次录制的视频为Vue版本。年后会提供React版本视频。
- 视频分两次发布，第一次为周六早上，第二次为周日晚上或者周一早上；时长为一周时间，下周日结束的时候提交作业。
- 作业的话提交任意一个版本（Vue或者React）就可以，但是必须每一行代码都是自己敲出来的。

> 训练主要流程（中途可能会补充或者调整顺序）

- [ ] 主页面结构：左侧可选组件列表、中间容器画布、右侧编辑组件定义好的属性
- [ ] 从菜单拖拽组件到容器；
- [ ] Block的选中状态；
- [ ] 容器内的组件可以拖拽移动位置；
- [ ] 命令队列以及对应的快捷键；
- [ ] 单选、多选；
- [ ] 设计好操作栏按钮：
    - [ ] 撤销、重做；
    - [ ] 导入、导出；
    - [ ] 置顶、置底；
    - [ ] 置顶、置底；
    - [ ] 删除、清空；
- [ ] 拖拽贴边；
- [ ] 组件可以设置预定义好的属性；
- [ ] 右键操作菜单；
- [ ] 拖拽调整宽高；
- [ ] 组件绑定值；
- [ ] 根据组件标识，通过作用域插槽自定义某个组件的行为
- [ ] 根据组件标识，通过作用域插槽自定义某个组件的行为
    - [ ] 输入框：双向绑定值、调整宽度；
    - [ ] 输入框：双向绑定值、调整宽度；
    - [ ] 图片：自定义图片地址，拖拽调整图片宽高；
    - [ ] 图片：自定义图片地址，拖拽调整图片宽高；

## 技能要求

本次可视化拖拽组件没有用额外的拖拽库。比如Vue中仅使用了ElementPlus，React仅使用了Ant Design，其他所有功能要求同学跟着视频手写。视频中不会讲解太多基础知识，所以要求同学们基本一定的相关知识技能；

> 通用技能

- 能够熟练使用Typescript，本次Vue3.0以及React版本的训练会全部使用Typescript开发，并且不会讲解Typescript的基础知识点；
- 熟练使用css预处理语言，本次以Sass为主（当然喜欢使用Less或者Stylus的同学可以使用自己擅长的语言，本次仅使用了Sass的一些基础语法）；
- 熟练使用js操作dom，比如通过js读取dom的位置信息，通过js修改dom的位置信息。了解js的事件冒泡、事件捕获机制以及 mouse 事件与 drag事件的区别以及用法。

> Vue3.0

- 能够基本掌握Vue3.0的响应式原理、template中的基本语法、vue-jsx的基本语法、组件封装等知识点。
- 能够熟练使用 CompositionAPI；并且基于 CompositionAPI+Typescript封装具有严格类型声明的Vue组件；

> React

- 熟悉React基本语法；
- 熟练使用React hook + Typescript封装组件；

## 相关资料

> 以下排名不分先后

- [React官方文档](https://react.docschina.org/docs/hello-world.html)
- [React Hook官方文档](https://react.docschina.org/docs/hooks-intro.html)
- [Vue3.0官方文档（中文）](https://v3.cn.vuejs.org/guide/introduction.html)
- [Vue3.0文档（中文）](http://martsforever-snapshot.gitee.io/vue-docs-next-zh-cn/)：我在码云上同步过来的中文文档，不用翻墙，访问快很多；
- [渲染函数：官方文档](https://v3.vuejs.org/guide/render-function.html#jsx)
- [渲染函数：jsx-next github](https://github.com/vuejs/jsx-next#installation)
- [Composition API](http://martsforever-snapshot.gitee.io/vue-docs-next-zh-cn/guide/composition-api-introduction.html)：在Vue3.0文档中一样可以找到，这里给出直接访问地址。
- [Typescript Deep Dive](http://martsforever-snapshot.gitee.io/typescript-book-chinese/)：我在码云上同步过来的 `Typescript Deep Dive`一书的中文文档，不用翻墙访问很快；
- [@vue/cli Vue官方脚手架](https://cli.vuejs.org/zh/)：官方推荐的用于创建Vue工程脚手架工具
- [Vite](https://www.npmjs.com/package/vite)：尤雨溪大佬新出的，旨在替代webpack-dev的开发工具，本次的React版本就是用vite搭建的，在全引入antd的情况下可以秒速启动（第一次慢一点）并且自带React热更新的功能；Vue版本因为ElementPlus安装有问题，暂时无法使用；