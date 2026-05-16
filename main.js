const { app, BrowserWindow, shell } = require('electron');
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
      contextIsolation: false,
      nodeIntegration: false,
      webSecurity: false,           // needed for CDN game assets
      allowRunningInsecureContent: true,
    }
  });

  win.loadFile('index.html');

  // Open external links in browser, not in app
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
