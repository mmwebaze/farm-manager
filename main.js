// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require('electron');
const url = require('url');
const path = require('path');
let menuTemplate = require('./MainMenu');

let win = null;

// create menu items
   /*const menuTemplate = [
   		{
   			label: 'File',
   			submenu:[
   			{
   				label: 'Quit',
   				accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
   				click(){
   					app.quit();
   				}
   			}
   			]
   		},
        {
            label: 'Animals',
            submenu: [
            {
            	label: 'Add',
            	click(){
            		let addWin = animal.addAnimal(win);
            		//addWin.show();
            		//win.show();

            	}
            	//role: 'hello'
            },
            {
            	type: 'separator'
            },
            {
            	role: 'UNDO'
            }
            ]
        },
        {
            label: 'Health',
            submenu: [{role: 'help'}]
        },
        {
            label: 'Financials',
            submenu: [{role: 'TODO'}]
        },
        {
            label: 'Reports',
            submenu: [{role: 'TODO'}]
        },
        {
            label: 'Settings',
            submenu: [{role: 'TODO'}]
        }
    ];/*/



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