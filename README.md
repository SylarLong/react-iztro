<div align="center">

# 📦 react-iztro

基于 [iztro](https://github.com/SylarLong/iztro) 实现的react组件，用于生成一张紫微斗数星盘。

react component of [iztro](https://github.com/SylarLong/iztro) used to generate an astrolabe of Zi Wei Dou Shu.

</div>

<div align="center">

[![npm](https://img.shields.io/npm/v/react-iztro?logo=npm&logoColor=%23CB3837)](https://www.npmjs.com/package/react-iztro) 
[![npm](https://img.shields.io/npm/dt/react-iztro?logo=npm&logoColor=%23CB3837)](https://www.npmjs.com/package/react-iztro) 
[![GitHub](https://img.shields.io/github/license/sylarlong/react-iztro)](https://www.npmjs.com/package/react-iztro) 
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/SylarLong/react-iztro)](https://www.npmjs.com/package/react-iztro) 
[![Package Quality](https://packagequality.com/shield/react-iztro.svg)](https://packagequality.com/#?package=react-iztro) 

</div>

---

## 功能

- 展示完整紫微斗数星盘
  
  包含所有 `主星`，`辅星`，`杂耀`，`四化`，`神煞`，`流耀` 以及星耀的 `亮度`。高亮显示重要的星耀，比如 `桃花星`，`解神`，`禄存` 和 `天马`。

- 合理的星耀分布

  用不同的颜色和字号来将 `星耀`，`宫名`，`宫干` 等分区域显示，解盘一目了然，直击重点。

- 清晰的运限指示

  在宫位中明显的标示出 `大限`、`小限`、`流年`、`流月`、`流日`、`流时` 所在宫位，点击运限指示按钮以后会显示重排后的运限宫名以及运限四化，更加方便的使用叠宫技巧解盘。

- 流耀显示

  展示出各个流派都需要的 `流耀`，可自行选择自己熟悉的流耀进行解盘。

- 三方四正指示线

  在中宫会显示 `三方四正` 指示线，点击运限时指示线的指向会动态跟随选中的最小那个运限流动，比如同时选择 `流年` 和 `流月`，指示线会跟随 `流月`。

- 强大的动态运限

  在 `中宫` 里，除了显示基本信息和三方四正线以外，还加入了可以调整运限的按钮组，可以非常方便的移动各个维度的运限。

- 实用的飞星展示

  点击宫干，可以看到宫干飞化出去的四化（以星耀背景色表示，红色：`禄`，蓝色：`权`，绿色：`科`，黑色：`忌`）。宫干有自化的时候会在星耀前面显示一条代表四化的色条。

- 简单易用的组件

  零配置快速集成到你的页面中，对于集成几乎没有学习成本。你可以根据自己的页面风格自行调整样式，或控制各个元素的显示与隐藏（通过覆盖默认样式）。

集成到页面中的界面如下图所示。你也可以直接访问官方的 [紫微派 - 紫微斗数在线排盘](https://ziwei.pub/astrolabe) 查看效果。

<img width="928" alt="react-iztro" src="https://github.com/SylarLong/react-iztro/assets/6510425/2817bb0c-89b5-4f33-ac5c-75481ad33209">

如果你觉得该组件对你有用，希望给个⭐️⭐️鼓励一下。

## 安装

```sh
npm install react-iztro -S
```

当然你也可以使用 yarn

```sh
yarn add react-iztro
```

## 使用

```ts
import {Iztrolabe} from "react-iztro"

function App() {
  return (
    <div className="App" style={{ width: 1024, margin: '50px auto', boxShadow: '0 0 25px rgba(0,0,0,0.25)'}}>
      <Iztrolabe 
        birthday="2003-10-12" 
        birthTime={1} 
        birthdayType="solar" 
        gender="male" 
        horoscopeDate={new Date()} // 新增参数，设置运限日期【可选，默认为当前时间】
        horoscopeHour={1}  // 新增参数，设置流时时辰的索引【可选，默认会获取 horoscopeDate 时间】
      />
    </div>
  );
}

export default App;

```

## 克隆到本地

如果你想将代码克隆到本地查看或者修改代码，可以fork本仓库到你自己的仓库里，然后用以下步骤进行

1. 克隆代码

  ```
  git clone https://github.com/SylarLong/react-iztro.git
  ```

2. 安装依赖

  ```
  npm install
  ```

  或者

  ```
  yarn
  ```

3. 启动

   ```
   npm run storybook
   ```

   或者

   ```
   yarn storybook
   ```

4. 预览

   打开浏览器，输入 http://localhost:6006 即可预览。

## 贡献

如果你想对本程序进行贡献，可以 `fork` 本仓库到你的仓库里进行改进，完成开发或者修复以后提交 `pull request` 到本仓库。

