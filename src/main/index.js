import { app, BrowserWindow, Menu, MenuItem, ipcMain } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development' ?
    `http://localhost:9080` :
    `file://${__dirname}/index.html`

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        useContentSize: true,
        width: 924,
        height: 592,
        minWidth: 584,
        minHeight: 592,
        resizable: true,
        frame: false,
        titleBarStyle: 'hidden'
    })


    if (process.platform === 'darwin') {
        const template = [
            {
                label: "Application",
                submenu: [
                    { label: "Quit", accelerator: "Command+Q", click: function () { app.quit(); } }
                ]
            },
            {
                label: "Edit",
                submenu: [
                    { role: 'undo' },
                    { role: 'redo' },
                    { type: 'separator' },
                    { role: 'cut' },
                    { role: 'copy' },
                    { role: 'paste' },
                    { role: 'pasteandmatchstyle' },
                    { role: 'delete' },
                    { role: 'selectall' }
                ]
            }
        ];
        Menu.setApplicationMenu(Menu.buildFromTemplate(template))
    } else {
        Menu.setApplicationMenu(null)
    }
    
    let webContents = mainWindow.webContents;
    webContents.on('did-finish-load',()=>{
        webContents.setZoomFactor(1);
        webContents.setVisualZoomLevelLimits(1,1);
        webContents.setLayoutZoomLevelLimits(0,0);
    })

    mainWindow.loadURL(winURL)

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

// const menu = new Menu()
// menu.append(new MenuItem({ label: 'Hello' }))
// menu.append(new MenuItem({ type: 'separator' }))
// menu.append(new MenuItem({ label: 'Electron', type: 'checkbox', checked: true }))

// app.on('browser-window-created', function (event, win) {
//     win.webContents.on('context-menu', function (e, params) {
//         menu.popup(win, params.x, params.y)
//     })
// })

ipcMain.on('show-context-menu', function (event) {
    const win = BrowserWindow.fromWebContents(event.sender)
    menu.popup(win)
})

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})