// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu,  ipcManin} = require('electron');
const url = require('url');
const path = require('path');

let menuTemplate = require('./MainMenu');

let win = null;


function createWindow () {
    win = new BrowserWindow({fullscreen: true, transparent: true})

    // load the dist folder from Angular
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    win.on('closed', function(){
    	app.quit()
    });
    

    // Open the DevTools optionally:
     win.webContents.openDevTools()

    win.on('closed', function () {
        win = null;
    });
    

    if(process.platform === 'darwin'){
    
  		menuTemplate.menuTemplate.unshift({});

	}

	const menu = Menu.buildFromTemplate(menuTemplate.menuTemplate);
    Menu.setApplicationMenu(menu);
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

if (process.env.NODE_ENV !== 'production'){
	menuTemplate.menuTemplate.push({
		label: 'Developer tools',
		submenu: [
			{
				label: 'Toggle DevTools',
				accelerator: process.platform === 'darwin' ? 'Command+I' : 'Ctrl+I',
				click(item, focusedWindow){
					focusedWindow.toggleDevTools();
				}
			},
			{
				role: 'reload'
			}
		]
	});
}