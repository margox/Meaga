const config = require('./config')
const electron = require('electron')
const { app, Tray, BrowserWindow } = electron

let isQuitting = false
let mainWindow = null
let trayButton = null
let trayWindow = null

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

  mainWindow = new BrowserWindow(config.mainWindow)
  mainWindow.loadURL(config.entry)
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
  mainWindow.on('will-navigate', (event) => {
    event.preventDefault()
  })
  mainWindow.on('closed', () => {
    app.quit()
  })

	// NEXT
	// trayWindow = new BrowserWindow(config.trayWindow)
	// trayWindow.on('blur', () => {
	// 	trayWindow.hide()
	// })
	// 
	// trayButton = new Tray(config.trayIcon) 
	// trayButton.on('click', (event, payload) => {
	// 
	// 	let { x, y, width } = payload
	// 	x = x - config.trayWindow.width / 2 + width / 2
	// 
	// 	if (trayWindow) {
	// 		if (trayWindow.isVisible()) {
	// 			trayWindow.hide()
	// 		} else {
	// 			trayWindow.setPosition(x, -3)
	// 			trayWindow.show()
	// 		}
	// 	}
	// })

})
