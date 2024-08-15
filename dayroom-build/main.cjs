const { app, BrowserWindow } = require('electron');
var path = require('path');


const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(app.getAppPath(), 'preload.cjs')

        }
    });
    win.loadURL('http://localhost:3000');
}
app.whenReady().then(() => {
    createWindow()
  })


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  