const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  sendKey: (keyCode) => ipcRenderer.send('game-key', keyCode),
});
