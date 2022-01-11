module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    runtimeCompiler: true,
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                "appId": "MyApp",
                "mac": {
                    "category": "your.app.category.type"
                },
                "extends": null,
                "files": [
                    "**/*"
                ],
            }
        }
    },
}

