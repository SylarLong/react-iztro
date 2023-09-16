# react-iztro
react component of iztro

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
      <Iztrolabe birthday="2003-10-12" birthTime={1} birthdayType="solar" gender="male" />
    </div>
  );
}

export default App;
```

如此你就得到了上图所示的一张星盘。怎么样，集成起来是不是很方便？当然这只是第一个版本，后面会陆续更新，并且完善文档。有兴趣的同学可以持续关注。记得给⭐️⭐️哦

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

