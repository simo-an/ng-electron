import { app, BrowserWindow } from 'electron';
import * as path from 'path';

let win: BrowserWindow = null;

const isDevelopment = process.env.NODE_ENV === 'development';

function createWindow(): BrowserWindow {
  win = new BrowserWindow({
    center: true,
    width: 800,
    height: 550,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: isDevelopment,
      contextIsolation: false,
      enableRemoteModule : false
    },
  });

  const winURL = isDevelopment
    ? 'http://localhost:4200'
    : `file://${path.join(__dirname, '/../renderer/index.html')}`;
  if (isDevelopment) {win.webContents.openDevTools();}

  win.loadURL(winURL).then();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win;
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window.
  // More details at https://github.com/electron/electron/issues/15947
  app.on('ready', () => setTimeout(createWindow, 400));

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
