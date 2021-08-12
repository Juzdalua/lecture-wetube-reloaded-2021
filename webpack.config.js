const path = require("path");
//console.log(path.resolve(__dirname, "assets", "js"));
//path.resolve -> 경로를 만들어주는 역할.
//path는 상대경로가 아닌 절대경로를 요구함.

//entry : 작성한 코드
//output : webpack으로 변환된 코드
module.exports = {
    entry: "./src/client/js/main.js",
    output: {
        filename:"main.js",
        path: path.resolve(__dirname, "assets", "js"),
    },
};
