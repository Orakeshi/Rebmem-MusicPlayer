const { app, BrowserWindow, ipcMain, dialog, protocol  } = require('electron')
const {createProtocol} = require('vue-cli-plugin-electron-builder/lib');
const {installExtension, VUEJS_DEVTOOLS} = require('electron-devtools-installer');
const path = require('path');
const url = require('url');
const isDevelopment = process.env.NODE_ENV !== 'production'
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    { scheme: 'app', privileges: { secure: true, standard: true } }
])

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