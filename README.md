# react-iztro
react component of iztro

<img width="1147" alt="image" src="https://github.com/SylarLong/react-iztro/assets/6510425/df940fcc-2cda-434f-b9a2-fbcf21c31c24">

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
