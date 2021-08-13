const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
//console.log(path.resolve(__dirname, "assets", "js"));
//path.resolve -> 경로를 만들어주는 역할.
//path는 상대경로가 아닌 절대경로를 요구함.

//entry : 작성한 코드
//output : webpack으로 변환된 코드
module.exports = {
    entry: {
        main: "./src/client/js/main.js",
        videoPlayer: "./src/client/js/videoPlayer.js",
    }, //작성하는 코드
    mode: "development", //저장되는 코드가 압축되지 않게
    watch: true, //터미널을 계속 실행
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/styles.css",
        }),
    ],
    output: {
        filename:"js/[name].js",
        path: path.resolve(__dirname, "assets"),
        clean:true,        
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [["@babel/preset-env", {targets: "defaults"}]],
                    },
                },
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"] //역순으로 입력.
            },
        ],
    },
};
