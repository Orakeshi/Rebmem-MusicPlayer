const { app, BrowserWindow, ipcMain, dialog  } = require('electron')

try {
// Enable live reload for all the files inside your project directory
    require('electron-reload')(__dirname);
} catch (_) {}

let win

function createWindow () {
    win = new BrowserWindow({
        width: 900,
        height: 600,
        minHeight: 600,
        minWidth: 900,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false,
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