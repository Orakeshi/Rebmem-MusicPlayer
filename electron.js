const { app, BrowserWindow, ipcMain, dialog  } = require('electron')
const fs = require('fs')
try {
    require('electron-reloader')(module)
} catch (_) {}

const path = require('path')
const walkdir = require('walkdir');

const storage = require('electron-json-storage');

/*
storage.set('foobar', { foo: 'bar' }).then(function() {
    // Read
    storage.get('foobar').then(function(object) {
        console.log(object.foo);
        // will print "bar"
    });
});
*/


let win


function createWindow () {
    win = new BrowserWindow({
        width: 900,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: process.env.NODE_ENV !== 'development',
        },
    })

    win.loadFile('dist/index.html')

    win.webContents.openDevTools()

    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})


function readFileSync(filepath, format){
    const data = fs.readFileSync(filepath, format);
    return data;
}
//writeToFileSync("./songs/test.txt", 'Hello\nworld')
console.log(readFileSync("./src/assets/songs/songs.json", "utf8"))