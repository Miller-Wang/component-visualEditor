# 可视化拖拽组件训练营

## 入营须知
- 本训练营共计一周，从21年01月23日晚8点开始到21年01月30日晚8点结束 
- 参加本训练营需要支付30学分(视情况而决定)
- 第一部分由周六(23号)上午发布相关的文档视频，第二部分由下周一(25号)中午发布剩下的文档视频，届时全部发送完毕
- 目前先讲解的内容版本是vue3版本，React版本后续会安排，请大家敬候佳音
- 上交作业的时间是下周六(30号)晚八点，过时不候
- 交作业的版本可以是vue版本或是react版本，不过还是建议大家多多挑战自己呀！
- 上交作业的时候个人的话就按照正常的交作业的格式就好，小组的话，请把名字和学号写在一起
- 完成作业的同学可以把表格的学分填好呀
- 要参加的同学要填写表格[https://shimo.im/sheets/TWkG9PNmfo0yyMsI/MODOC](https://shimo.im/sheets/TWkG9PNmfo0yyMsI/MODOC)
- 本次训练营学分是30分，可以单兵做战，完成作业返回45分，也可以结成两个人的学死党团队做战，如果两个人都完成，每个返回60分，如果有一个没有完成，则不返回学分。

## 训练营说明

- 内容视频介绍：[https://www.bilibili.com/video/BV1BK4y1W7Eu/](https://www.bilibili.com/video/BV1BK4y1W7Eu/)
- Vue版本项目预览：[http://martsforever-pot.gitee.io/vue-visual-editor/](http://martsforever-pot.gitee.io/vue-visual-editor/)
- React版本项目预览：[http://martsforever-pot.gitee.io/react-visual-editor/](http://martsforever-pot.gitee.io/react-visual-editor/)

## 训练目标

训练主要流程（中途可能会补充或者调整顺序）

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
    - [ ] 删除、清空；
- [ ] 拖拽贴边；
- [ ] 组件可以设置预定义好的属性；
- [ ] 右键操作菜单；
- [ ] 拖拽调整宽高；
- [ ] 组件绑定值；
- [ ] 根据组件标识，通过作用域插槽自定义某个组件的行为
    - [ ] 输入框：双向绑定值、调整宽度；
    - [ ] 按钮：类型、文字、大小尺寸、拖拽调整宽高；
    - [ ] 图片：自定义图片地址，拖拽调整图片宽高；
    - [ ] 下拉框：预定义选项值，双向绑定字段；

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

## 入营要求
- 保证入营期间和老师保持通信联系，不许无故缺席失联
- 每天有至少2个小时的独立学习时间
- 保证入营期间积极参与讨论和整理学习成果或是想法


## 训练流程
- 1. 先将训练营的仓库代码仓库 `Fork` 到自己的码云账号下 [https://gitee.com/zhufeng-training/zhufeng-vue-drops-2101](https://gitee.com/zhufeng-training/zhufeng-vue-drops-2101)
- 2. 将 Fork 后的仓库 Clone 到本地
- 3. 在项目根目录下创建自己的项目并完成当天的任务，第1天是创建，后面就是添加代码了
- 4. 把实践总结(学到了什么？收获了什么?遇到了什么问题?如何解决的?)写在当天目录的`学习总结.md`文件里
- 4. 在本地仓库完成作业后，push 到自己的码云远程仓库中
- 5. 最后将自己最后的commit链接地址添加到训练营仓库的当天issue中
- 6. 完成后在微信群中打卡，并`@`助教加学分如果不会操作的可以看操作视频  [https://img.zhufengpeixun.com/submitwork.mp4](https://img.zhufengpeixun.com/submitwork.mp4)