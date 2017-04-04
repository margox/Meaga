const electron = require('electron')
const config = require('./config')
const { profile } = config
const { app, Tray, BrowserWindow, ipcMain } = electron

let isQuitting = false
let mainWindow = null
let trayButton = null
let trayWindow = null

// 禁止重复启动应用
const isAlreadyRunning = app.makeSingleInstance(() => {

	if (mainWindow) {
		if (mainWindow.isMinimized()) {
			mainWindow.restore()
		}
		mainWindow.show()
	}

})

if (isAlreadyRunning) {
  app.quit()
}

app.on('window-all-closed', () => {

  if (process.platform != 'darwin') {
    app.quit()
  }

})

app.on('ready', () => {

	// 初始化应用主窗口
  mainWindow = new BrowserWindow(config.mainWindow)
  mainWindow.loadURL(config.mainWindowEntry)

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on('will-navigate', (event) => {
    event.preventDefault()
  })

	mainWindow.on('enter-full-screen', (event) => {
		mainWindow.webContents.send(config.communication.mainChannel, {
			action: 'enter-full-screen'
		})
	})

	mainWindow.on('leave-full-screen', (event) => {
		mainWindow.webContents.send(config.communication.mainChannel, {
			action: 'leave-full-screen'
		})
	})

  mainWindow.on('close', (event) => {

		if (!isQuitting) {
			event.preventDefault()
			process.platform === 'darwin' ? app.hide() : mainWindow.hide()
		}

  })

	// 只在OSX平台显示托盘窗口
	if (process.platform === '_darwin') {

		// 初始化托盘图标和托盘窗口
		trayButton = new Tray(config.trayIcon) 
		trayWindow = new BrowserWindow(config.trayWindow)
		trayWindow.loadURL(config.trayWindowEntry)

		trayButton.on('click', (event, payload) => {

			let { x, y, width } = payload
			x = x - config.trayWindow.width / 2 + width / 2

			if (trayWindow) {
				if (trayWindow.isVisible()) {
					trayWindow.hide()
				} else {
					trayWindow.setPosition(x, y - 10)
					trayWindow.show()
				}
			}

			event.preventDefault()

		})

		trayWindow.on('blur', () => {
			trayWindow.hide()
		})

		// 接受主窗口通信
		ipcMain.on(config.communication.mainChannel, (event, payload) => {
			// 将消息发送给托盘窗口
			trayWindow.webContents.send(config.communication.trayChannel, payload)
		})

		// 接受托盘窗口通信
		ipcMain.on(config.communication.trayChannel, (event, payload) => {
			// 将消息发送给主窗口
			mainWindow.webContents.send(config.communication.mainChannel, payload)
		})

	}

})

app.on('before-quit', () => {

	isQuitting = true

	if (!mainWindow.isFullScreen()) {
		profile.set('mainWindowState', mainWindow.getBounds())
	}

})
