// Modules to control application life and create native browser window
const {app, BrowserWindow, globalShortcut} = require('electron')
const os = require('os')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function registerShortcut(win) {
  const shortcutMap = {
    'MediaNextTrack': 'next',
    'MediaPreviousTrack': 'prev',
    'MediaPlayPause': 'togglePlaying'
  }
  for (const key in shortcutMap) {
    globalShortcut.register(key, () => {
      win.webContents.send(shortcutMap[key])
    })
  }
}

function createWindow() {
  process.env.NODE_ENV === 'development' && BrowserWindow.addDevToolsExtension(
    path.join(os.homedir(), '/software/lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.0_0')
  )
  // Create the browser window.
  const isWin = os.platform().includes('win')
  const windowConfig = {
    show: false,
    frame: !isWin,
    webPreferences: {webSecurity: false}, // 为了解决 audio 获取不到远程的文件作为音频解析，不推荐，待改善
    titleBarStyle: 'hidden',
    backgroundColor: isWin ? '#F0444444' : 'none',
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    transparent: true,
    width: 964,
    height: 608
  }
  mainWindow = new BrowserWindow(windowConfig)
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    mainWindow.webContents.openDevTools()
  })
  mainWindow.setVibrancy('ultra-dark')
  mainWindow.setOpacity(0.99)
  const winUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : url.format({
    pathname: path.join(__dirname, './build/index.html'),
    protocol: 'file:',
    slashes: true
  })
  // and load the index.html of the app.
  mainWindow.loadURL(winUrl)
  registerShortcut(mainWindow)
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.