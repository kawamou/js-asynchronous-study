# js-asynchronous-study

## 目的
- いつも忘れがちな非同期周りの知識を整理して文章化しておく

## 非同期処理
```
Javascriptはシングルスレッドな言語なので基本的に同期的な処理しかできない(WebWorkers除く)。
なのでメチャ重処理が入ってきた場合、実行時間が直列になりツライ。

メチャ重処理：CPUバウンド、I/Oバウンド

CPUバウンドな処理は前述の通りシングルスレッドなので厳しい(並列/並行)。
だが、I/Oバウンドに関しては、OS等からの返事を待つなんてバカなことせず、その間に自分の処理進めれば良いのでは？
ということで、I/Oバウンドな処理は非同期関数として準備されている。
```

## Promiseとasync/await
```
非同期関数に差し掛かると、JS処理系はその完了を待たずに処理を進めるが、そんな非同期関数にも順序性を持たせたい(同期的に処理したい)ときがある。
例えばaxiosの結果を待って画面に表示したい等。
Promiseやasync/awaitで実現したいのは、「非同期な処理が完了した後にある処理を実行する」こと。
非同期なxxxの後にxxxを実行し、その後にxxxを実行し...を通常はコールバックで書き連ねていたが(コールバック地獄)、Promiseではthenのチェーンで繋ぎ可読性が向上。
async/awaitではasync内にawaitを書くだけでawait以降の処理は待つようになるので、より同期処理っぽく書けるようになってステキ。
```

## Promise
### 概要
- Futureパターン。ある処理を別スレッド等で実行し、結果を受け取りたいときに使うデザインパターン。
- Promiseは3つの状態を持つオブジェクト
    - apending：初期状態。実行されていない
    - fullfilled：処理が完了した状態。resolve()が呼ばれるとfullfilledに。then()が呼ばれる
    - rejected：処理が失敗した状態。reject()が呼ばれるとrejectedに。catch()が呼ばれる
### 構文
- 順序性を持たせたい非同期処理をthen()で繋ぐ。コールバック地獄より可読性が高い
- setTimeoutのコールバックがresolveなのでthen()が呼ばれる
- then()で繋ぐことで非同期処理があるにも関わらず処理①〜③を順次実行できる
```xxx.ts
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const asyncFunc = () => {
    sleep(10) // 処理①(非同期)
        .then(
            () => {
                sleep(10) // 処理②(非同期)
            })
        .then(
            () => {
                console.log("async") // 処理③(同期)
            }
        )
}

const syncFunc = () => {
    console.log("sync")
}

asyncFunc()
syncFunc()
```

## async/await
### 概要
- asyncはPromiseのシンタックスシュガー。awaitと組み合わせることで可読性が圧倒的に上がる
### 構文
- 順序性を持たせたい非同期処理の前にawait
- async内に実行したい順に非同期/同期関係なく処理を並べる。then()で繋ぐよりも直感的
```xxx.ts
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const asyncFunc = async () => {
    await sleep(10); // 処理①(非同期)
    await sleep(10); // 処理②(非同期)
    console.log("async"); // 処理③(同期)
}

const syncFunc = () => {
    console.log("sync");
}

asyncFunc();
syncFunc();

```

## 実行
```
❯ docker-compose up

Promiseバージョン
❯ docker-compose run node tsc promise.ts --lib es6,dom
❯ docker-compose run node node promise.js # 実行
sync
async

async/awaitバージョン
❯ docker-compose run node tsc async.ts --lib es6,dom
❯ docker-compose run node node async.js

```

## 参考
- [JavaScriptの非同期処理をできる限り正確に理解する](https://qiita.com/UTDoi/items/d49ea919818d9b519f93)