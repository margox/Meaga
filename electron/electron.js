var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var mainWindow = null

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit()
  }
})

app.on('ready', function() {

  mainWindow = new BrowserWindow({
    width: 800,
    height: 580,
    minWidth: 600,
    minHeight: 480,
    frame: false,
    vibrancy: "dark",
    icon: "../view/assets/images/app_icon.png",
    resizable: true,
    maximizable: false,
    webPreferences: {
      webSecurity: false,
      defaultEncoding: "UTF-8"
    }
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  if (process.env.NODE_ENV === 'production') {
    mainWindow.loadURL('file://' + __dirname + '/../dist/index.html')
  } else {
    mainWindow.loadURL('http://localhost:8080/')
  }

  //mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    //mainWindow = null;
    app.quit()
  })

})
