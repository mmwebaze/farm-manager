// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu,  ipcMain} = require('electron');
const url = require('url');
const path = require('path');
const uuid = require('uuid4');

let knex = require('./database');
let menuTemplate = require('./MainMenu');

let win = null;
//let addWindow = null;


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

//handle database requests

ipcMain.on('newAnimal', function(e, item){

	console.log(item['cat']+' - '+item['type']);
	/*let result = knex.knex.select("name").from("stock_type");

	result.then(function (rows) {
		console.log(rows);
    });*/
	knex.knex('livestock_type').insert([{NAME: item, UUID: uuid()}])
		.then(() => console.log("data inserted"))
			.catch((err) => { console.log(err); throw err })
			.finally(() => {
			    console.log('Should close connection and not destroy');
			    //knex.knex.destroy();
			}
	);
});
/*ipcMain.on("mainWindowLoaded", function(){
			
		});*/

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