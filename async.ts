const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const asyncFunc = async () => {
    await sleep(10);
    await sleep(10);
    console.log("async");
}

const syncFunc = () => {
    console.log("sync");
}

asyncFunc();
syncFunc();