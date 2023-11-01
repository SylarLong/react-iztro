<div align="center">

# 📦 react-iztro

基于iztro的react组件库，用于生成一张紫微斗数星盘。react component of iztro used to generate an astrolabe of Zi Wei Dou Shu.

</div>

<div align="center">

[![npm](https://img.shields.io/npm/v/react-iztro?logo=npm&logoColor=%23CB3837)](https://www.npmjs.com/package/react-iztro) 
[![npm](https://img.shields.io/npm/dt/react-iztro?logo=npm&logoColor=%23CB3837)](https://www.npmjs.com/package/react-iztro) 
[![GitHub](https://img.shields.io/github/license/sylarlong/react-iztro)](https://www.npmjs.com/package/react-iztro) 
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/SylarLong/react-iztro)](https://www.npmjs.com/package/react-iztro) 
[![Package Quality](https://packagequality.com/shield/react-iztro.svg)](https://packagequality.com/#?package=react-iztro) 

</div>

---

<img width="966" alt="image" src="https://github.com/SylarLong/react-iztro/assets/6510425/f4335997-fdd8-42e2-bb1a-600942f9b0ba">

### 安装

```sh
npm install react-iztro -S
```

当然你也可以使用 yarn

```sh
yarn add react-iztro
```

### 使用

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

如此你就得到了上图所示的一张星盘。有兴趣的同学可以持续关注。记得给⭐️⭐️哦

### 克隆到本地

如果你想将代码克隆到本地查看，可以用以下步骤进行

1. 克隆代码

  ```
  git clone https://github.com/SylarLong/iztro-docs.git
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

### 贡献

如果你想对本程序进行贡献，可以 `fork` 本仓库到你的仓库里进行改进，完成开发或者修复以后提交 `pull request` 到本仓库。

