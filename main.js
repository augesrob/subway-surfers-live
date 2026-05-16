const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');

let win;

app.whenReady().then(() => {
  win = new BrowserWindow({
    width: 1024,
    height: 660,
    minWidth: 800,
    minHeight: 520,
    title: 'Subway Surfers LIVE',
    backgroundColor: '#231F20',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: false,
      allowRunningInsecureContent: true,
    }
  });

  win.loadFile('game/index.html');

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
});

// Inject real trusted OS-level keystrokes — bypasses isTrusted=false limitation
ipcMain.on('game-key', (event, keyCode) => {
  if (!win || win.isDestroyed()) return;
  win.webContents.sendInputEvent({ type: 'keyDown', keyCode });
  setTimeout(() => win.webContents.sendInputEvent({ type: 'keyUp', keyCode }), 120);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
