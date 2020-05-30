var sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
var asyncFunc = function () {
    sleep(10)
        .then(function () {
        sleep(10);
    })
        .then(function () {
        console.log("async");
    });
};
var syncFunc = function () {
    console.log("sync");
};
asyncFunc();
syncFunc();
