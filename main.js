// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

let win = null;


function createWindow () {
    win = new BrowserWindow({width: 800, height: 600})

    // load the dist folder from Angular
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
    // Specify entry point
    //win.loadURL('http://localhost:4200');

    // Open the DevTools optionally:
     win.webContents.openDevTools()

    win.on('closed', function () {
        win = null;
    });
    // create menu items
   /* const menuTemplate = [
        {
            label: "File"//,
            //submenu: [{role: 'TODO'}]
        }
    ];

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);*/
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
    app.quit()
}
});

app.on('activate', function (){
    if (win === null) {
        createWindow();
    }
});